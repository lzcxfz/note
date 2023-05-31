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

### 08-File练习-文件夹不存在时创建文件

在当前模块下的aaa文件夹下创建一个a.txt文件。

 ```java
 public class FileDemo05 {
 
     public static void main(String[] args) throws IOException {
         File file = new File("java-workspace\\aaa\\a.txt");
         file.createNewFile();
     }
 }
 ```

运行报错：

![image-20230530223631960](http://www.iocaop.com/images/2023-05/image-20230530223631960.png)

> 注意：使用`createNewFile()`方法，所要创建的文件夹所在的目录必须要存在，否则就会报上面这个错。

修改后：

```java
public class FileDemo05 {

    public static void main(String[] args) throws IOException {
        File dir = new File("java-workspace\\aaa");
        if (!dir.exists()){
            dir.mkdirs();
        }
        File file = new File(dir, "aaa.txt");
        file.createNewFile();
        System.out.println("file.getAbsoluteFile() = " + file.getAbsoluteFile());
    }
}
```

![image-20230530224400092](http://www.iocaop.com/images/2023-05/image-20230530224400092.png)

### 09-File练习-删除一个多级文件夹

现在桌面有一个文件夹，里面包含多级文件夹和文件，需要完全删除这个文件夹。

能不能直接调用`delete()`方法进行删除？

我们在第6节课中已经学过了，删不了，必须把文件夹中的文件删除完毕，才能删除文件夹。

![image-20230530225226354](http://www.iocaop.com/images/2023-05/image-20230530225226354.png)

所以，需要遍历整个文件夹，把文件删除，再删除文件夹，文件夹中套娃，怎么办？递归。

```java
public class FileDemo06 {

    public static void main(String[] args) {
        File file = new File("C:\\Users\\lzc\\Desktop\\aaa1");
        System.out.println("deleteDir(file) = " + deleteDir(file));
    }


    public static boolean deleteDir(File file){
        if (Objects.isNull(file)||!file.exists()){
            return false;
        }
        // 判断是文件还是文件夹，是文件则直接删除，是文件夹则递归
        if (!file.isFile()) {
            // 如果是文件夹，则遍历
            File[] files = file.listFiles();
            for (File f : files) {
                if (!f.isFile()){
                    deleteDir(f);
                }else {
                    f.delete();
                }
            }
        }
        // 递归删除完文件夹中的文件后，再删除文件夹
        return file.delete();
    }
}
```

### 10-File练习-统计文件夹下文件类型及其个数

使用map存储。

```java
public class FileDemo07 {
    private  static Map<String, Integer> map = new HashMap<>();
    public static void main(String[] args) {
        File file = new File("D:\\study\\hello-world");
        statistical(file);
        System.out.println(map);
    }
    public static void statistical( File file){
        if (Objects.isNull(file)||!file.exists()){
            return;
        }
        if (file.isFile()){
            // 是文件则直接改变map中的值
            calc(file);
        }else if (file.isDirectory()){
            // 文件夹则遍历文件夹
            File[] files = file.listFiles();
            for (File f : files) {

                if (f.isFile()){
                    // 子文件夹中如果遍历到文件，直接改变map中的值
                    calc(f);
                }else {
                    // 子文件夹遍历到文件夹则递归
                    statistical(f);
                }
            }
        }
    }
    private static void calc(File file) {
        String fileName = file.getName();
        String ext = fileName.substring(fileName.lastIndexOf("." )+1);
        if (map.containsKey(ext)){
            Integer num = map.get(ext);
            map.replace(ext,++num);
        }else {
            map.put(ext,1);
        }
    }
}

```

![image-20230531001913099](http://www.iocaop.com/images/2023-05/image-20230531001913099.png)

## 10-2-字节流

### 12-IO概述

之前数据的存储都是在内存中，不能持久化。

学习IO流的目的：

* 将数据写入到文件中，实现数据持久化存储。
* 读取文件中已经存在的数据。

IO流中：

* I表示`Input`，是从数据从硬盘进内存的过程，称之为读。
* O表示`output`，是数据从内存到硬盘的过程，称之为写。

在数据传输的过程中，是谁在读？谁在写？这个参照物是谁？

IO的数据传输，可以看做是一种数据的流动，按照流动的方向，以内存为参照物，进行读写。

所以是：<span style="background-color:pink;">内存在读，内存在写。</span>

### 13-IO流的分类

* 按流向分

![image-20230531211233515](http://www.iocaop.com/images/2023-05/image-20230531211233515.png)

* 按数据类型分

![image-20230531211337937](http://www.iocaop.com/images/2023-05/image-20230531211337937.png)

什么是纯文本文件？

用windows记事本能打开读懂的，就是纯文本文件。

### 14-字节流-字节输出流

步骤：

* 创建字节输出流对象
* 写数据
* 释放资源

![image-20230531212351769](http://www.iocaop.com/images/2023-05/image-20230531212351769.png)

```java
public class OutPutDemo01 {
    public static void main(String[] args) {

        // 创建字节输出流
        try {
            FileOutputStream outputStream = new FileOutputStream("D:\\a.txt");
            outputStream.write(97);
            outputStream.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
```

运行结果：

![image-20230531212739840](http://www.iocaop.com/images/2023-05/image-20230531212739840.png)

### 15-字节流-注意事项

* 如果文件不存在，会<span style="background-color:pink;">自动创建</span>。

* 如果文件存在，<span style="background-color:pink;">会把文件清空</span>。
* 写数据时，<span style="background-color:pink;">如果传入的是整数，实际写入的是这个整数在ASCII对应的字符</span>。

* 释放资源：告诉操作系统，程序不需要再使用这个文件了。否则其他程序无法操作文件(如，删除)，所以每次使用完流，必须要释放资源。

### 16-字节流-一次写入多个数据

```java
public class OutPutDemo02 {
    public static void main(String[] args) {

        // 创建字节输出流
        try {
            FileOutputStream outputStream = new FileOutputStream("D:\\a.txt");
            outputStream.write(97);
            outputStream.write(98);
            outputStream.write(99);
            outputStream.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
```

这样的方式可以实现，但是数据很多，怎么办？看`write()`方法的重载：

![image-20230531213646124](http://www.iocaop.com/images/2023-05/image-20230531213646124.png)

```java
public class OutPutDemo03 {
    public static void main(String[] args) {
        FileOutputStream outputStream = null;
        try {
            outputStream= new FileOutputStream("D:\\a.txt");
            byte[] byteArray =  new byte[]{97,98,99,100,101,102};
            outputStream.write(byteArray);

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
```

运行结果：

![image-20230531214522039](http://www.iocaop.com/images/2023-05/image-20230531214522039.png)

### 17-字节流-两个问题

**在使用字节流写入数据的时候，如何换行？**

换行符：

* windows：\\r\\n
* linux:\\n
* mac:\\r

使用`String`类中的`getBytes()`方法获取字节数组。

```java
public class OutPutDemo02 {
    public static void main(String[] args) {

        // 创建字节输出流
        try {
            FileOutputStream outputStream = new FileOutputStream("D:\\a.txt");
            outputStream.write(97);
            outputStream.write("\r\n".getBytes());
            outputStream.write(98);
            outputStream.write("\r\n".getBytes());
            outputStream.write(99);
            outputStream.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
```

运行结果：

![image-20230531215142948](http://www.iocaop.com/images/2023-05/image-20230531215142948.png)

**字节流写数据如何实现追加写入？**

看`FileOutputStream`的构造：

![image-20230531215333039](http://www.iocaop.com/images/2023-05/image-20230531215333039.png)

> 默认是false，如果需要追加写入，就可以传入true。在创建`FileOutPutStream`对象时，如果没有打开续写，则创建对象时会清空文件。

### 18-字节流-try...catch...finally

在finally中释放资源，保证释放资源的代码一定执行。

### 20-字节流-字节输入流

![image-20230601004537573](http://www.iocaop.com/images/2023-06/image-20230601004537573.png)

```java
public class InputDemo01 {
    public static void main(String[] args) {
        try {
            FileInputStream fileInputStream = new FileInputStream("D:\\a.txt");
            int read = fileInputStream.read();
            System.out.println(read);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```

![image-20230601004713137](http://www.iocaop.com/images/2023-06/image-20230601004713137.png)

运行结果：

![image-20230601004725083](http://www.iocaop.com/images/2023-06/image-20230601004725083.png)

注意事项：

* 创建字节输入流时，如果文件存在不会报错，<span style="background-color:pink;">如果文件不存在，则直接报错</span>。

* `read()`方法一次读一个字节，返回值是本次读到的那个字节数据，是字符在`ASCII`码表中对应的数字。如果想看到的是`char`数据，则需要强转。

### 21-字节流-读多个字节

上面的方法，只能读一个字节，如果我想读多个字节的数据，怎么办？

首先我们有这样的一个`txt`文件：

![image-20230601005606778](http://www.iocaop.com/images/2023-06/image-20230601005606778.png)

最容易想到的思路就是循环读：

```java
public class InputDemo02 {
    public static void main(String[] args) {
        try {
            FileInputStream fileInputStream = new FileInputStream("D:\\a.txt");
            while (true){
                int read = fileInputStream.read();
                System.out.print((char)read);
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```

运行结果：

![image-20230601005647638](http://www.iocaop.com/images/2023-06/image-20230601005647638.png)

查阅api可知，当没有读到数据时，`read`方法返回的是-1，所以，修改循环跳出的条件：

```java
public class InputDemo02 {
    public static void main(String[] args) {
        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream("D:\\a.txt");
            int read;
            while ((read=fileInputStream.read())!=-1){
                System.out.print((char)read);
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                fileInputStream.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
```

运行结果：

![image-20230601010031022](http://www.iocaop.com/images/2023-06/image-20230601010031022.png)