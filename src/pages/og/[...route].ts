import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const entries = await getCollection('posts');

const pages = Object.fromEntries(
  entries.map(({ slug, data }) => [slug, data])
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages: pages,
  getImageOptions: (path, page) => ({
    title: page.title,
    description: (page.description || '生命不息，折腾不止。') + '\n\n' + `gr114.com/posts/${path}`,
    bgGradient: [[245, 244, 237]],
    border: { color: [245, 244, 237], width: 20 },
    padding: 80,
    logo: {
      path: 'https://q1.qlogo.cn/g?b=qq&nk=3310149631@qq.com&s=640',
      size: [80],
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif-sc@latest/chinese-simplified-700-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif-sc@latest/chinese-simplified-400-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.ttf'
    ],
    font: {
      title: {
        color: [20, 20, 20],
        families: ['Noto Serif SC', 'JetBrains Mono'],
        weight: 'Bold',
      },
      description: {
        color: [80, 80, 80],
        families: ['Noto Serif SC', 'JetBrains Mono'],
      },
    },
  }),
});
