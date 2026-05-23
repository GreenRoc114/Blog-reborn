---
title: 博客新变化
published: 2025-03-11
updated: 2025-03-11
description: '添加随机图片api'
image: ''
tags: [Markdown, Blog]
category: '瞎折腾'
draft: false 
---

# 有什么变化？
现在当你打开我的博客主页，你会发现`GreenRoc`字样的上方头像图片一直在变化，而且都是Avicii歌曲的封面

# 咋做的？
自建了一个随机图片api，里面全是鸽子封面

## 直接用
想用的话可以直接用我的这个api`https://cd.ahhf45.top/r.php`

## 自己建
在你网站根目录建一个php文档，名称随意，再建一个名为`img`的文件夹，里面放上你想要随机的图片，下面是源码
```php

<?php
// 配置图片目录和允许的扩展名
$imageFolder = 'img/';
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

// 检查目录是否存在
if (!is_dir($imageFolder)) {
    header("HTTP/1.1 500 Internal Server Error");
    exit('错误：图片目录不存在');
}

// 扫描目录获取有效图片文件
$imageList = [];
foreach (scandir($imageFolder) as $file) {
    $filePath = $imageFolder . $file;
    
    // 过滤隐藏文件和目录
    if ($file[0] === '.' || !is_file($filePath)) continue;
    
    // 验证文件扩展名
    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if (in_array($extension, $allowedExtensions)) {
        $imageList[] = $file;
    }
}

// 处理无图片情况
if (empty($imageList)) {
    header("HTTP/1.1 404 Not Found");
    exit('错误：未找到任何图片文件');
}

// 随机选择图片并重定向
$randomImage = $imageList[array_rand($imageList)];
$encodedFileName = rawurlencode($randomImage);  // 处理特殊字符
header('Location: ' . $imageFolder . $encodedFileName);
exit;
?>
```
复制到前面那个PHP文件里使用即可。
