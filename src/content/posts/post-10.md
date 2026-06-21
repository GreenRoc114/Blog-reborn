---
title: 博客折腾日记：个人卡片大换血与 Giscus 评论区踩坑实录
published: 2026-06-21 13:40:00
description: 生命不息折腾不止，给博客加上了游戏化个人卡片和 Giscus 评论区，顺便记录下踩坑经历。
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

## 五、最后

现在文章底部已经有评论框了，并且完全支持 Markdown 语法。如果你也碰巧在搭博客，或者遇到了和我一样的报错，希望这篇记录能帮到你。

大家有什么想吐槽的，直接在下面评论区见。
