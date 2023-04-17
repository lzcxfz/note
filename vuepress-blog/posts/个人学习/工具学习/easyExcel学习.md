---
title: EasyExcel学习
date: 2022-09-09
category:
  - 开发工具
---

相关视频：<a href='https://www.bilibili.com/video/BV1C7411275q?p=2&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a>

参考文档：<a href='http://www.iocaop.com/posts/2022-my/%E8%B5%84%E6%96%99/EasyExcel.html'>点击跳转</a>

## Apache POI

* 学习成本高（分SAX、DOM模式，复杂）
* 内存消耗大、读写大文件容易OOM（userModel模式上手简单内存消耗大）
* 代码书写冗余
* 功能强大

> 总的来说，简单写法重度依赖内存、复杂写法学习成本高。

## EasyExcel

* 重写了POI对07版Excel的解析，降低内存消耗。03版Excel还是依赖了POI的SAX模式
* 做了模型转换的封装，开发方便
* 只能操作Excel
* 不能读取图片

​	<a href='https://easyexcel.opensource.alibaba.com/'>官方文档</a>

## 简单的读

准备一个Excel:

![image-20220909181658117](http://www.iocaop.com/images/2022-09/202209091816226.png)

创建项目，导入依赖:

```xml
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>easyexcel</artifactId>
            <version>3.1.1</version>
        </dependency>
```

创建实体类，用于存储读取到的数据:

```java
/**
 * 学生
 *
 * @author lzc
 * @date 2022/09/09
 */
@Data
public class Student {

    /**
     * 名字
     */
    private String name;

    /**
     * 性别
     */
    private String gender;

    /**
     * 生日
     */
    private String brithday;

    /**
     * id
     */
    private String id;

}
```

编写测试方法:

```java
    /**
     * 一个Excel就是一个工作簿(workBook)
     * 一个工作簿中可以有多个工作表(workSheet)
     */
    @Test
    public void test(){

        // 1.获得一个工作簿
        ExcelReaderBuilder readerBuilder = EasyExcel.read("杭州黑马在线202003班学员信息表.xlsx", Student.class, new StudentListener());

        // 2.获得一个工作表，默认第一个工作表
        ExcelReaderSheetBuilder sheet = readerBuilder.sheet();

        // 3.读取数据
        sheet.doRead();
    }
```

创建监听器类，实现ReadListener<泛型>接口:

```java
public class StudentListener implements ReadListener<Student> {

    @Override
    public void invoke(Student data, AnalysisContext context) {
        System.out.println(data);
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {

    }
}
```



运行效果：

![image-20220909181903772](http://www.iocaop.com/images/2022-09/202209091819821.png)

说明

EasyExcel.read()方法重载了很多次，这里使用的方法如下：

![image-20220909182144740](http://www.iocaop.com/images/2022-09/202209091821794.png)

我们编写的监听器类，实现了<font style="background:pink">ReadListener</font>接口，里面的<font style="background:pink">invoke</font>方法每读取一行数据，都会被调用一次：

![image-20220909182409622](http://www.iocaop.com/images/2022-09/202209091824661.png)

## 简单的写

复制上面的Excel，重命名为：杭州黑马在线202003班学员信息表-write.xlsx

编写测试方法: 因为是写数据，可以不需要监听器

```java
    @Test
    public void test02(){

        // 1.获得一个工作簿
        ExcelWriterBuilder writerBuilder = EasyExcel.write("杭州黑马在线202003班学员信息表-write.xlsx", Student.class);
        // 2.获得一个工作表
        ExcelWriterSheetBuilder sheet = writerBuilder.sheet();

        // 准备一个list
        List<Student> students = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            Student student = new Student();
            student.setName("张三" + i);
            student.setGender("男");
            student.setBrithday("2020-03-03");
            student.setId("123456789" + i);
            students.add(student);
        }
        // 3.写数据
        sheet.doWrite(students);
    }

}
```

> 需要注意的是，读和写时，不能有其他或线程打开了该Excel文件。

写数据的效果:

![image-20220909184916964](http://www.iocaop.com/images/2022-09/202209091849035.png)

对于上面的优化：

实体类中成员变量定义的顺序就是写数据，Excel列从左到右的顺序，所以可以根据需求来跳转实体类的变量定义顺序。

表头和变量名是一样的，也可以使用注解<font style="background:pink">@ExcelProperty</font>自定义,value是表头名字，index指定第几列。

对于不需要写出的列，可以使用注解<font style="background:pink">@ExcelIgnore</font>对其进行忽略。

对列的宽度进行调整，使用注解<font style="background:pink">@ColumnWidth</font>，参数为int类型，可以在属性上用，也可以在类上用(每列都是同样的宽度)。

对内容设置行高，<font style="background:pink">@ContentRowHeight</font>，只能作用于类上。

表头行高，<font style="background:pink">@HeadRowHeight</font>，只能作用于类上。



将实体类更改成如下:

```java
@Data
public class Student {

    /**
     * 名字
     */
    @ExcelProperty("名字")
    @ColumnWidth(20)
    private String name;

    /**
     * 性别
     */
    @ExcelProperty("性别")
    @ColumnWidth(10)
    private String gender;

    /**
     * 生日
     */
    @ExcelProperty("生日")
    @ColumnWidth(20)
    private String brithday;

    /**
     * id
     */
    @ExcelIgnore
    private String id;

}
```

在此运行，得到的数据是这样的：

![image-20220909191141243](http://www.iocaop.com/images/2022-09/202209091911285.png)

