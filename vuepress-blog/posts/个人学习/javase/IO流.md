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

### 03-绝对路径和相对路径

绝对路径：从盘符开始。如：

```java
       	// 这个路径固定不变了
		File file = new File("C:\\lzc\\a.txt");
```

相对路径：相对当前项目下的路径

```java
        File file = new File("a.txt");
      	File file = new File("模块名\\a.txt");
```

### 04-File的创建功能

![image-20230510124600568](http://www.iocaop.com/images/2023-05/image-20230510124600568.png)

`createNewFile`方法

* 不管调用者路径是否有后缀名，<span style="background-color:pink;">创建的都是文件</span>，不是文件夹。
* 文件已存在，返回false表示创建失败，文件不存在，创建成功，返回true

```java
public class FileDemo02 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:\\lzc\\a.txt");
        boolean newFile = file.createNewFile();
        // 文件已存在，返回false表示创建失败，文件不存在，创建成功，返回true
        System.out.println("newFile = " + newFile);

        File aFile = new File("C:\\lzc\\aaa");
        boolean aNewFile = aFile.createNewFile();
        System.out.println("aNewFile = " + aNewFile);

    }
}
```

![image-20230510125118815](http://www.iocaop.com/images/2023-05/image-20230510125118815.png)

`mkdir`方法：

* <span style="background-color:pink;">只能创建单级文件夹</span>，不能创建多级文件夹
* 不管调用者有没有后缀名，<span style="background-color:pink;">只能创建单级文件夹</span>

```java
public class FileDemo02 {
    public static void main(String[] args) throws IOException {

        File dirFile = new File("C:\\lzc\\aaa\\bbb\\ccc");
        boolean mkdir = dirFile.mkdir();
        System.out.println("mkdir = " + mkdir);
    }
}
```

![image-20230510125438515](http://www.iocaop.com/images/2023-05/image-20230510125438515.png)

返回了false且文件夹没有创建成功。

```java
public class FileDemo02 {
    public static void main(String[] args) throws IOException {

        File dirFile = new File("C:\\lzc\\aaa.txt");
        boolean mkdir = dirFile.mkdir();
        System.out.println("mkdir = " + mkdir);
    }
}
```

创建成功，但是是文件夹，不是文件：

![image-20230510125715102](http://www.iocaop.com/images/2023-05/image-20230510125715102.png)

![image-20230510125725137](http://www.iocaop.com/images/2023-05/image-20230510125725137.png)

`mkdirs`方法：

* 可以创建单级文件夹，也可以创建多级文件夹

```java
public class FileDemo02 {
    public static void main(String[] args) throws IOException {

        File dirFile = new File("C:\\lzc\\aaa\\bbb\\ccc\\ddd");
        boolean mkdirs = dirFile.mkdirs();
        System.out.println("mkdir = " + mkdirs);
    }
}
```

返回了true，且文件夹也创建了：

![image-20230510130023428](http://www.iocaop.com/images/2023-05/image-20230510130023428.png)

> 既然mkdirs可以创建单级文件夹，也可以创建多级文件夹，那mkdir有什么用？确实没用，开发中，mkdirs一把梭就行了。

### 05-File的删除方法

![image-20230510130553733](http://www.iocaop.com/images/2023-05/image-20230510130553733.png)

```java
public class FileDemo03 {
    public static void main(String[] args) {
        File file = new File("C:\\lzc\\a.txt");
        boolean delete = file.delete();
        System.out.println("delete = " + delete);
    }
}
```

删除成功了。并返回了true

![image-20230510131423742](http://www.iocaop.com/images/2023-05/image-20230510131423742.png)

```java
public class FileDemo03 {
    public static void main(String[] args) {
        File file = new File("C:\\lzc");
        boolean delete = file.delete();
        System.out.println("delete = " + delete);
    }
}
```

当文件夹中有文件时，返回false，删除失败。当文件夹是空文件夹时，返回true，删除成功。

注意事项：

* 删除文件后，不会放到回收站，而是直接从硬盘删除。
* <span style="background-color:pink;">只能删除文件和空文件夹</span>，如果文件夹中还有文件，会删除失败并返回false。
* 如果要删除带文件的文件夹，则必须将文件夹中的文件先删除。

### 06-File的获取和判断方法

![image-20230510132422896](http://www.iocaop.com/images/2023-05/image-20230510132422896.png)

`getName`方法：

* 调用者是文件，获取的是文件名和后缀名
* 调用者是文件夹，获取的是文件夹名。

### 07-File的listFile方法

![image-20230510132717756](http://www.iocaop.com/images/2023-05/image-20230510132717756.png)

* 进入file对象所在的文件夹，并获取该文件夹中的所有文件和文件夹，放在File数组中，<span style="background-color:pink;">包括隐藏文件和文件夹</span>。

```java
public class FileDemo04 {
    public static void main(String[] args) {
        File file = new File("D:\\");
        File[] files = file.listFiles();
        for (File f : files) {
            System.out.println("f = " + f);
        }
    }
}
```

![image-20230510155422171](http://www.iocaop.com/images/2023-05/image-20230510155422171.png)

注意事项：

* 当调用者是一个文件时，会返回null

  ![image-20230510155839330](http://www.iocaop.com/images/2023-05/image-20230510155839330.png)

* 当调用者是一个空文件夹时，返回空数组

  ![image-20230510160130483](http://www.iocaop.com/images/2023-05/image-20230510160130483.png)

* 当调用者是一个有内容的文件夹时，上面已经试过了。
* 当调用者是一个有权限才能进入的文件夹时，没有权限则返回null。

### 08-File练习

在当前模块下的aaa文件夹下创建一个a.txt文件。