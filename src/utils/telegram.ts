import { $fetch } from 'ofetch';
import * as cheerio from 'cheerio';
import { LRUCache } from 'lru-cache';

// 内存缓存：最多存 5 个频道，每条缓存有效 10 分钟
// 这样每次有人访问博客，不会都去爬一次 Telegram，大大降低延迟
const cache = new LRUCache<string, ReturnType<typeof getPost>[]>({
  max: 5,
  ttl: 10 * 60 * 1000, // 10 分钟
});

function modifyHTMLContent($, content) {
  $(content).find('.emoji')?.removeAttr('style');
  $(content).find('a')?.each((_index, a) => {
    $(a)?.attr('title', $(a)?.text())?.removeAttr('onclick');
    $(a)?.attr('target', '_blank');
    $(a)?.addClass('text-[var(--primary)] hover:underline transition');
  });
  return content;
}

function getPost($, item, channel) {
  item = item ? $(item).find('.tgme_widget_message') : $('.tgme_widget_message');
  const content = $(item).find('.js-message_reply_text')?.length > 0
    ? modifyHTMLContent($, $(item).find('.tgme_widget_message_text.js-message_text'))
    : modifyHTMLContent($, $(item).find('.tgme_widget_message_text'));
  
  const id = $(item).attr('data-post')?.replace(new RegExp(`${channel}/`, 'i'), '');

  // Extract images using wsrv.nl proxy to bypass Telegram hotlink protection
  const images = $(item).find('.tgme_widget_message_photo_wrap')?.map((_index, photo) => {
    const style = $(photo).attr('style');
    const url = style?.match(/url\(["'](.*?)["']/)?.[1];
    return url ? `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800` : null;
  })?.get().filter(Boolean);

  return {
    id,
    type: $(item).attr('class')?.includes('service_message') ? 'service' : 'text',
    datetime: $(item).find('.tgme_widget_message_date time')?.attr('datetime'),
    html: content?.html() || '',
    text: content?.text() || '',
    images,
  };
}

export async function fetchTelegramChannel(channel: string) {
  // 命中缓存直接返回，不用再爬 Telegram
  const cached = cache.get(channel);
  if (cached) {
    return cached;
  }

  const url = `https://t.me/s/${channel}`;
  try {
    const html = await $fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      retry: 3,
      timeout: 8000, // 最多等 8 秒，超时就放弃，不卡死页面
    });

    const $ = cheerio.load(html, {}, false);
    const posts = $('.tgme_channel_history .tgme_widget_message_wrap')?.map((index, item) => {
      return getPost($, item, channel);
    })?.get()?.reverse().filter(post => post.type === 'text' && post.id && (post.html || post.images.length > 0));

    // 存入缓存
    cache.set(channel, posts);
    return posts;
  } catch (err) {
    console.error("Failed to fetch telegram channel", err);
    return [];
  }
}
