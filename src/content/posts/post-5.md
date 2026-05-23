---
title: 联想TB-X605FC平板备份&刷机
published: 2025-06-18 11:10:10
description: 平板备份刷机
image: 'https://alist.gr114.com/d/covers/post-dif1/cover.webp?sign=_Oydq5A17XWSIPgvVNweoPwpfsJimSe1ZKf3OlnKdEQ=:0'
tags: [备份, 刷机,联想,肠炎]
category: 瞎折腾
draft: false
---
> 这个教程仅仅在*联想TB-X605FC*上测试过，理论上来说只要是骁龙芯片，找对了刷机包和触点就能用

## 注意：本教程需要拆机

## 准备工作

- 拆机片（或者是你的手指甲）
- 一台电脑
- 你的平板
- 一根牢固的数据线
- 一个镊子（只要是能短接的金属物品都可以）
- 软件及刷机包
- 勤劳的双手，智慧的大脑

## 第一步：拆机

首先把平板关机，从边角处（或者是你觉得好拆的地方）先扣开一个角
![拆机](https://alist.gr114.com/d/covers/post-dif1/p1.png?sign=ha9Dl-gjhC6O--rEUh80Tcm2foKKFx4PdaJoIvezKKE=:0 "拆机")
然后沿着这个角把所有的塑料卡扣一一掰开（注意保护音量键和开机键，这俩在掰壳子的时候会掉下来，注意保存好他们），下面是拆开之后的样子
![拆机之后](https://alist.gr114.com/d/covers/post-dif1/p2.png?sign=2wLdu-zx-FL5Vs7xOEDfqpYT9eVYtE1icFng4I53JX0=:0 "拆机之后")

## 第二步：下载软件并激活

下载链接里的三个东西（驱动和刷机软件）[驱动](https://alist.gr114.com/d/covers/post-dif1/vivo9008drivers.exe?sign=IH_L4io_WZsF2jKxBYE5Yv2dgvjvnK5aA2g0MHLXZHY=:0)[Miko工具](https://alist.ahhf45.top/d/covers/post-dif1/MiKo_Loder%20Pro.zip?sign=xAhfndJ5tBEWQapDSipPc_lc7nXy2dk_xwtTCImZND8=:0) [QFIL](https://alist.ahhf45.top/d/covers/post-dif1/Qualcomm_Flash_Image_Loader_v2.0.3.5.zip?sign=UAzRbZ6QRYl2ih4ENPaKpbsMy7oHZRHYF8ktdNn9HNw=:0)
高通板子刷机需要安装9008驱动和adb驱动，打开并安装文件里的9008driver
![9008驱动](https://alist.gr114.com/d/covers/post-dif1/p3.jpg?sign=thNzzEsxIWJ9R32HsJWGDtX80dchKpimoen9Zc3Vamo=:0 "9008驱动")
用Miko loader制作救砖包以及救砖。找到miko文件夹，双击miko安装，直接默认就行了，记住安装路径，安装完成后把文件夹内的loader复制到miko的安装目录，创建loader的快捷方式到桌面
![Miko工具](https://alist.gr114.com/d/covers/post-dif1/p4.jpg?sign=tG1BaffuBjGxTpY7FsRvdv5yqOY-XeronRsJdcvPFiM=:0 "Miko工具")
打开Miko工具

## 第三步：短接

把右上角的屏蔽贴纸撕开（如图）你就会看到两个触点叫"1V8"和"BOOT"
![触点](https://alist.gr114.com/d/covers/post-dif1/p5.png?sign=DBHrQaeD1QpxQVGpofKOkGV4gMZ2Bf56DU4hegHCSTs=:0)
![短接](https://alist.gr114.com/d/covers/post-dif1/p6.png?sign=h2Wx3z-Z4GgsV364l91JwWa1A2FM2SLIKQhtAfyp8E0=:0)
提前把数据线公头接到电脑上，在短接的同时插入数据线，听到电脑的提示音或在设备管理器里见到了如下图这样，你就进入了9008模式（刷机的）
![插线](https://alist.gr114.com/d/covers/post-dif1/p7.png?sign=EWWB9JpNutoIVz9K-Bn6MBSpHZOeDGOM-IASYyao_Bk=:0)
![9008](https://alist.gr114.com/d/covers/post-dif1/p8.jpg?sign=rSKDvJWYjtbMxg8LAJ5lbJPWL3GvcstmGXzp6rBthEg=:0)

## 第四步：备份
**刷机不备份，机主两行泪**
这里下载[Firehose](https://alist.gr114.com/d/covers/post-dif1/prog_emmc_firehose_8953_ddr.mbn?sign=P6xJGJ5aTweq7plgujqyxYrCVQ0o78EP5-bwGBGo9iE=:0)要不然等会无法进行备份工作，把它保存在一个你能找到的地方
在miko工具里依照如下图所示顺序进行操作
![操作](https://alist.gr114.com/d/covers/post-dif1/p9.png?sign=LS4Gbh7ccLX--tz9FHsqvLQs-TOtwaiuYne8e9GWQHA=:0)
点read，partition backup，取消勾选 Auto Loader，点击三个点选择刚刚下好的Firehose，双击下面double click to open save folder，选好救砖包生成的路径，点load partition structure，点read full image就能制作刷机救砖包，耐心等待进度条跑完，保存好这个后缀名为.bin的单文件，以后要是检查平板或者是平板回收，都能靠这个文件恢复如初

## 第五步：刷机

下载[刷机包](https://alist.gr114.com/d/covers/post-dif1/TB-X605FC_S100038_210722_ROW.zip?sign=1tMO439mmNhr-e7ybNhGxqeyNZO-FxyVXYRos_N3jCE=:0)解压在一个你能找到的位置，打开QFIL（上面下载过）安下图顺序操作，即可刷机，开机后就是一个正常的平板了！

![qfil](https://alist.gr114.com/d/covers/post-dif1/p10.PNG?sign=Md8XQFMvBzXKXbPlHeBe88y0OdvardVuMhkePcuu4yY=:0)

选择9008设备（反正就一个根本不用选），选择Flat Build，选择上面用过的那个Firehose，点击LoadXml，选择刷机包解压出来的rawprogram_unsparse.xml，然后再弹出一个窗口，直接选patch0.xml，最后点击Download，等待进度条跑完，应该会自动重启，如果没自动重启的话就按住电源键和音量下重启。
