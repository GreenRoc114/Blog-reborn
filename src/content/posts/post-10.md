---
title: 博客折腾日记：个人卡片、评论区与 Telegram 碎碎念接入实录
published: 2026-06-21 13:40:00
description: 生命不息折腾不止，给博客加上了游戏化个人卡片、Giscus 评论区，还顺手把 Telegram 频道接进来当碎碎念用了。
tags: [博客建设, Giscus, 折腾, 踩坑]
category: 折腾记录
draft: false
---

> 说在前头：作为一个管不住手的电子产品和代码折腾爱好者，看到博客哪里不顺眼就总想动两刀。今天花时间把首页那个略显简陋的个人介绍卡片重构了，顺便把一直缺席的评论区给补上了。

## 一、个人卡片：加点 RPG 元素

之前博客的卡片有点太素了，而且在宽屏桌面端还出了点布局 Bug。今天索性把 UI 拆了重写。

- **假装很忙的呼吸灯**：在头像右下角焊了个绿色的呼吸状态灯，标着 `CODING`。伪造出一种我 24 小时都在线敲代码的错觉（其实可能在打游戏 /doge/）。
- **属性面板**：既然写过“十年游戏史”，干脆就把枯燥的自我介绍搞成 RPG 游戏面板。弄了个 `Lv.16 | EXP 85%` 的经验条（对应高一），然后把各种技能强行分到了 `ATK`（Pr/Ae/PS）、`INT`（C++/Java/Py）和 `AGI`（Win/Mac/Lin）三个属性槽里。
- **移动端排版**：顺手把移动端的 DOM 顺序提到了文章列表上方，省得每次要在手机上划半天才能看到我是谁。

## 二、给博客加个评论区

一个没有评论区的博客是没有灵魂的。
对比了 Waline、Twikoo 这些方案，我最后选了 **Giscus**。

主要原因是：完全免费、零服务器成本，而且基于 GitHub Discussions，自带防垃圾评论属性。唯一的门槛是访客必须有 GitHub 账号，不过考虑到这本来就是个偏技术的博客，问题不大。

配置其实也就是去官网填几个参数，然后拿到一段 `<script>` 标签扔进代码里。由于我这个站用了 `swup` 做 SPA 无刷新跳转，我还额外加了几个钩子事件去重载脚本，防止跳转下一篇文章时评论区加载失败。

一顿操作猛如虎，点开本地服务器一看：**评论区加载失败，喜提报错。**

## 三、踩坑：官方文档要仔细看

在控制台对着报错看了半天，重新核对了两遍 repo ID 也没发现问题。最后回去重读了一遍官方文档，发现人家写得清清楚楚，Giscus 运行必须满足三个条件：

1. **该仓库是公开的**（满足）
2. **giscus app 已安装**（🚨 等等，这是啥？）
3. **Discussions 功能已在你的仓库中启用**（满足）

我满脑子都是在自己仓库里点开关，完全忽略了需要去 GitHub 市场给我的仓库安装 Giscus 授权 App。不给权限，它拿头去帮你读写 Discussions 啊。

去 GitHub Apps 搜一下 `giscus`，点个 `Install` 授予仓库权限，回过头再刷新，一切正常。

## 四、UI 适配：治好强迫症

评论区是跑通了，但 Giscus 默认那股浓烈的 GitHub 原生风，跟我博客这种带点毛玻璃和圆角的风格放在一起，怎么看怎么难受。

作为理科生，遇到这种 UI 割裂感肯定是不能忍的，所以顺手做了一点微调。

**1. 去掉祖传边框**
不要用默认的 `preferred_color_scheme`。Giscus 其实内置了无边框主题 `noborder_light` 和 `noborder_dark`。换上这个之后，丑陋的外边框就没了，背景也会变成透明，看起来就像是博客自带的原生组件。

**2. 解决暗黑模式的通信问题**
因为没用 `preferred_color_scheme`，评论区也就没法自动感知系统主题了。如果博客切了暗黑模式，评论区还是个刺眼的白框，那就搞笑了。

我的解决思路很简单：因为博客切暗黑模式本质上就是在 `<html>` 标签上加减 `dark` 类名，所以弄个 `MutationObserver` 盯着它就行。一旦发生变动，直接通过 `postMessage` 给 Giscus 所在的 iframe 发信，命令它当场换装。

代码大概长这样：

```html
<script>
    // 判断当前到底是白天还是黑夜
    function getGiscusTheme() {
        return document.documentElement.classList.contains('dark') ? 'noborder_dark' : 'noborder_light';
    }

    // 跨域通讯，通知 iframe 里的 Giscus 切换主题
    function syncGiscusTheme() {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (!iframe) return;
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme: getGiscusTheme() } } },
            'https://giscus.app'
        );
    }

    // 弄个监工，死盯 <html> 标签的 class 变化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                syncGiscusTheme(); // 检测到切换，立马发包
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
</script>
```

实测效果不错，点右上角切换模式的时候，评论区基本上也是瞬间跟着变黑变白，强迫症终于舒服了。

## 五、引入 Telegram 当“碎碎念”后端

写长文太累，平时很多零碎的想法发推特又觉得没有自己的数据主权。于是盯上了 Telegram 频道，打算把它当成一个微型的无头 CMS（Headless CMS），拉取数据到博客里作为“碎碎念”。

**1. 拒绝纯前端抓取**
最省事的做法其实是开个单独的子页面，直接嵌个 iframe 或者用纯前端拉数据。但这么做体验不好：我想把碎碎念像朋友圈一样，直接混排在首页的长篇文章列表里。
这就导致我得对博客动大刀：把原本极速纯静态（SSG）的首页，硬生生拉拽成了服务端渲染（SSR）模式。在 `astro.config.mjs` 里开启了 `hybrid` 模式，每次访问首页时，让 Vercel 服务端在后台实时扒取 `t.me/s/频道名` 的网页 DOM，用 `cheerio` 提纯出文字和图片，再和长文章按时间重新排序合并。

在代码里，只需要给首页路由打个 SSR 的标记，并手写分页逻辑：
```javascript
// src/pages/[...page].astro
export const prerender = false; // 强行关闭预渲染，开启 SSR

const allBlogPosts = await getSortedPosts();
const typedPosts = allBlogPosts.map(p => ({ ...p, _type: 'post' }));

// 实时抓取最新的 Telegram 频道数据
const memos = await fetchTelegramChannel('greenroc114life');
const typedMemos = memos.map(m => ({ ...m, _type: 'memo' }));

// 两头数据一锅炖，按发布时间降序排序
const combinedItems = [...typedPosts, ...typedMemos].sort((a, b) => {
    // ...排序逻辑略
});
```

**2. 踩坑：Telegram 祖传防盗链**
DOM 解析本身没啥难度，无非就是用正则过滤几个 class，但这期间结结实实踩了个坑：图片防盗链。
把解析出来的 `<img>` 标签直接扔进页面里，文字正常渲染，图片全裂了。控制台一看，全部报 `403 Forbidden`。Telegram 显然对外部域名的直接请求进行了防盗链拦截。
解决方法简单粗暴：套个免费的公共图片代理（比如 `wsrv.nl`）。我写了个替换逻辑，把所有 Telegram 的图片链接前缀挂到代理域名后面。顺带还能在 URL 后面加参数，让代理节点帮我压缩一下图片体积，省下一点客户端流量。

几行正则直接药到病除：
```typescript
// 把图片 URL 塞进代理节点，顺手限制宽度 800px 以减轻加载压力
const imageProxyUrl = 'https://wsrv.nl/?url=';

// 从 DOM 里提纯出的 style 包含 background-image: url('...')
const bgMatch = style.match(/url\(['"]?(.*?)['"]?\)/);
if (bgMatch) {
    let imgUrl = bgMatch[1];
    // 强制走代理绕过 403
    imgUrl = imageProxyUrl + encodeURIComponent(imgUrl) + '&w=800';
    images.push(imgUrl);
}
```

**3. 图片也得有尊严：接管原生缩放**
数据跑通后，发现从 Telegram 拉下来的图片没法放大。博客本身自带了 PhotoSwipe 插件，提供原生的点按呼出沉浸式缩放。
为了让两边体验对齐，我翻了一下博客底层布局逻辑，发现只要给外层容器套上一个 `custom-md` 的 class，PhotoSwipe 就会自动把这块区域识别为受控 DOM。加上这个类名之后，碎碎念里的梗图终于也能正常双击放大了。

组件里的代码大致就长这样，极其简单：
```astro
<!-- 加上 custom-md，假装这是通过 Markdown 渲染出来的内容 -->
<div class="custom-md grid gap-2 grid-cols-2 mt-4">
    {memo.images.map(img => (
        <a href={img.replace('&w=800', '')} target="_blank">
            <img src={img} class="w-full h-auto object-cover" loading="lazy" />
        </a>
    ))}
</div>
```

## 六、Vercel 部署连环踩坑

本来以为本地跑通了就可以直接推上云端享受了，结果 Vercel 直接给我甩了两个大嘴巴子，连续两次构建失败。

**第一坑：`astro-compress` 插件挤爆内存**
报错日志直接输出：`✘ [ERROR] The build was canceled`，前文还附带了 `Error: Cannot compress file ...`。
查了一下才发现，博客底层集成了一个叫 `astro-compress` 的压缩插件。因为我把首页改成了 SSR，Vite 打包出来的底层 JS 文件变得极其复杂，超出了这个插件里 `terser` 的解析能力，直接把 Vercel 免费版的构建内存给干崩了。
**解法**：Vite 引擎自己在打包时就已经对 JS 做了极高比例的压缩，再套一层二次压缩反而容易翻车。果断去 `astro.config.mjs` 里把它的 JS 压缩通道强制掐断：
```javascript
Compress({
  CSS: false,
  Image: false,
  JavaScript: false, // 禁用二次压缩，防止 Vercel 炸内存
})
```

**第二坑：Node.js 运行时版本过时**
内存不炸了，Vercel 又报了个新错：`The following Serverless Functions contain an invalid "runtime": - _render (nodejs18.x)`。
Vercel 最近开始强制要求新建的 Serverless 函数必须基于 Node 20 及以上。而为了兼容当前的 Astro 版本，我用了相对旧一点的 `@astrojs/vercel` 适配器。这个老适配器拿不准环境，直接 fallback 到了 `nodejs18.x`，结果被 Vercel 云端无情拦截。
**解法**：在 `package.json` 里显式声明 `engines`，按着 Vercel 的头让它用 Node 20 跑构建，强制让适配器生成合规的配置文件。
```json
{
  "engines": {
    "node": "20.x"
  }
}
```

## 七、最后

现在文章底部有评论框了（全量支持 Markdown），首页的时间线也终于充实了起来。如果你也碰巧在搭博客，或者遇到了和我一样的报错，希望这篇记录能帮到你。

大家有什么想吐槽的，直接在下面评论区见。
