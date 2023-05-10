---
title: java基础-IO流
date: 2023-05-10
category:
  - JavaSE
---

## 10-1-File

### 01-File和IO概述

之前存储数据都是存在内存里，不能持久化存储，程序停止数据就消失。怎么解决？

数据写入硬盘就可以持久化。

对硬盘进行操作，无非是读写文件。读写文件是否需要一些前提条件？

最起码得知道这个文件在哪。

<span style="background-color:pink;">IO可以对硬盘中的文件进行读写，File表示要读写的文件在哪，也可以创建、删除文件。</span>

IO流是什么？

* 可以将数据从本地文件中读取出来
* 可将数据从内存保存到本地文件

File类是什么？

* 在读写数据时告诉虚拟机要操作的(文件、文件夹)在哪
* 对(文件/文件夹)本身进行操作。包括创建、删除。

### 02-FIle的构造方法

File：是文件和目录路径名的抽象表示

* <span style="background-color:pink;">文件</span>和<span style="background-color:pink;">目录</span>可以通过File封装成对象
* `FIle`封装的对象<span style="background-color:pink;">仅仅是一个路径名</span>，可以是存在的，也可以是不存在的。

构造方法：

![image-20230510113558954](http://www.iocaop.com/images/2023-05/image-20230510113558954.png)

```java
public class FileDemo01 {
    public static void main(String[] args) {

        // 为什么要使用File对象？为了使用里面的方法。单纯的String，无法判断文件是否存在、对文件进行创建、删除。

        // 创建方式1
        String path = "C:\\lzc\\a.txt";
        File file = new File(path);
        System.out.println("file = " + file);
        System.out.println("file.exists() = " + file.exists());

        // 创建方式2  两个路径拼接
        String parentPath = "C:\\lzc";
        String subPath = "a.txt";
        File file1 = new File(parentPath, subPath);
        System.out.println("file1 = " + file1);
        System.out.println("file1.exists() = " + file1.exists());

        // 创建方式3 File对象和String拼接
        File parentFile = new File(parentPath);
        File file2 = new File(parentFile, subPath);
        System.out.println("file2 = " + file2);
        System.out.println("file2.exists() = " + file2.exists());

    }
}

```

![image-20230510115035494](http://www.iocaop.com/images/2023-05/image-20230510115035494.png)