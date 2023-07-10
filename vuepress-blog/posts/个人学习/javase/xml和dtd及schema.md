---
title: java基础-xml
date: 2023-07-11
category:
  - JavaSE
---

## 13-2-xml

### 01-xml-作为配置文件的优势

使用`properties`作为配置文件，当编写的配置十分多的时候，会写得很长，不方便：

 ![image-20230710215314283](http://www.iocaop.com/images/2023-07/202307102153309.png)

使用`xml`可以很方便：

![image-20230710215326910](http://www.iocaop.com/images/2023-07/202307102153951.png)

> 如果还有其他`servlet`复制一份就好了

### 02-xml-概述

参考网址：<a href='https://www.w3school.com.cn/xml/index.asp'>点击跳转</a>

万维网联盟创建的，可扩展标记语言。

* 标记语言：通过标签描述语言。
* 可扩展：标签的名字可以自定义。

作用：

* 数据的存储和传输数据。

  ![image-20230710220036882](http://www.iocaop.com/images/2023-07/202307102200900.png)

* 可作为软件的配置文件。

### 03-xml-标签的规则

* 一堆尖括号和合法标识符组成。
* 成对出现。
* 特殊标签可以不成对出现，但必须有结束标记。
* 标签中可以定义属性，属性和标签名需要空格隔开，属性值必须用引号引起来。
* 标签必须要正确嵌套

### 04-xml-语法规则

* xml文件后缀必须是xml

* <span style="background-color:pink;">文档声明必须是第一行第一列</span>

  文档声明：

  ```xml
  <?xml version = "1.0" encoding = "UTF-8" standalone = "yes" ?>
  ```

  > version必须要写，值固定是1.0 
  >
  > encoding不是必须的
  >
  > standalone表示该xml文件是否依赖其他的xml文件

* 必须存在一个根标签，<span style="background-color:pink;">有且只有一个</span>

* 可以写注释

* 特殊符号：

  ![image-20230710220843166](http://www.iocaop.com/images/2023-07/202307102208187.png)

* 可以存在`CDATA`区

  ```xml
  <![CDATA[ ...内容... ]]>
  ```

  

来个demo：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--文档声明必须第一行-->
<students>
<!-- 学生列表  属性有id、name、age、info -->
    <student id="1">
        <name>赖卓成</name>
        <age>25</age>
        <info>1&lt;2</info>
        <message><![CDATA[这里可以写特殊字符的内容 <<<<<<<>>>>''''""""]]></message>
    </student>

    <student id="2">
        <name>小明</name>
        <age>25</age>
    </student>

    <student id="3">
        <name>小红</name>
        <age>25</age>
    </student>
</students>
```

浏览器打开，正确无误：

![image-20230710221826902](http://www.iocaop.com/images/2023-07/202307102218925.png)

### 05-xml-DOM解析思想

DOM文档对象模型：把文档的各个组成部分看做城对应的对象。

最初，会把xml文件全部加载到内存，会在内存中形成一个<span style="background-color:pink;">树形结构</span>，在获取对应的值。

![image-20230710231106551](http://www.iocaop.com/images/2023-07/202307102311592.png)

绿色：document对象

蓝色：element对象

红色：属性

紫色：文本

### 06-xml-解析的准备工作

常见的解析工具：JAXP、JDOM、DOM4J、pull(用于安卓手机端)

这里使用dom4j：<a href='https://dom4j.github.io/'>点击跳转</a>

```xml
        <dependency>
            <groupId>dom4j</groupId>
            <artifactId>dom4j</artifactId>
            <version>1.6.1</version>
        </dependency>
```

### 07-xml-解析

需求：

* 解析xml
* 将解析到的数据封装到学生对象中
* 并将学生对象存储到`ArrayList`对象中
* 遍历集合

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--文档声明必须第一行-->
<students>
<!-- 学生列表  属性有id、name、age、info -->
    <student id="1">
        <name>赖卓成</name>
        <age>25</age>
        <info>1&lt;2</info>
        <message><![CDATA[这里可以写特殊字符的内容 <<<<<<<>>>>''''""""]]></message>
    </student>

    <student id="2">
        <name>小明</name>
        <age>25</age>
    </student>

    <student id="3">
        <name>小红</name>
        <age>25</age>
    </student>
    
    <aaaaa></aaaaa>
    <bbbb></bbbb>
</students>
```

```java
public class XmlDemo01 {
    public static void main(String[] args) throws DocumentException {
        SAXReader reader = new SAXReader();
        File file = new File("java-se\\src\\main\\java\\com\\lzc\\xml\\student.xml");
        if (!file.exists()){
            throw new RuntimeException("文件不存在");
        }

        Document read = reader.read(file);
        // 获取根节点
        Element rootElement = read.getRootElement();
        // 获取根节点下的所有节点
        List elements = rootElement.elements();
        System.out.println("elements = " + elements);
        // 获取students集合,我们只需要students下的student，不需要多余的aaa和bbb
        List<Element> students = rootElement.elements("student");
        System.out.println("students = " + students);

        // 获取student的属性，并且创建Java的Student对象
        List<Student> studentList = students.stream().map(s -> {
            Attribute id = s.attribute("id");
            // 这里需要注意，只有id是属性，name和age是元素，获取元素中的文本
            Element name = s.element("name");
            Element age = s.element("age");
            return new Student(id.getValue(), name.getText(), Integer.parseInt(age.getText()));
        }).collect(Collectors.toList());

        System.out.println("studentList = " + studentList);

    }
}
```

运行结果：

![image-20230710235108242](http://www.iocaop.com/images/2023-07/202307102351265.png)

### 13-3-DTD和schema

### 08-DTD-入门案例-编写DTD

用来限定xml文件中可以使用的标签以及属性。

xml有两种约束技术：

* DTD
* schema

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<persons>
    <person>
        <name>赖卓成</name>
        <age>25</age>
    </person>
</persons>
```

对上面的xml，如何写dtd？

```dtd
<!ELEMENT persons (person)>
<!ELEMENT person (name,age)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT age (#PCDATA)>
```

> 小括号中表示该元素可以有哪些子元素、\#PCDATA意思是字符串

### 09-DTD-入门案例-引入DTD

在上面的xml中引入：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE persons SYSTEM 'person.dtd'>
<persons>
    <person>
        <name>赖卓成</name>
        <age>25</age>
    </person>
</persons>
```

> `SYSTEM`表示引入本地文件

引入后，再乱定义元素就会报错：

![image-20230711003623910](http://www.iocaop.com/images/2023-07/202307110036936.png)

### 10-DTD-三种引入方式

* 引入本地dtd(上一节课的)
* 在xml文件内部引入(xml和dtd写在同一个文件)
* 引入网络dtd

内部引入：将dtd约束写在方括号中

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE persons [
        <!ELEMENT persons (person)>
        <!ELEMENT person (name,age)>
        <!ELEMENT name (#PCDATA)>
        <!ELEMENT age (#PCDATA)>
        ]>
<persons>
    <person>
        <name>赖卓成</name>
        <age>25</age>
        <a></a>
    </person>
</persons>
```

网络引入：

```xml
<DOCTYPE persons PUBLIC "dtd文件的名称" "dtd文档的url">
```

### 11-DTD-语法规则-定义元素

定义一个元素的格式为：

```dtd
<!EMELENT 元素名称 元素类型>
```

元素类型分两种：

* 简单元素：里面没有其他元素了
  * EMPTY：标签体为空
  * ANY：可为空也可不为空
  * PCDATA：内容为字符串
* 复杂元素：里面还要其他元素
  * 多个元素用,或|负号隔开
  * ,表示定义子元素的顺序。
    * ？表示出现0次或1次
    * +表示1次或多次
    * *表示0次或多次
    * 不写则表示出现1次
  * |表示子元素只能出现任意一个

根据规则，优化上面的dtd：

```dtd
<!ELEMENT persons (person+)>
<!ELEMENT person (name,age)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT age (#PCDATA)>
```

### 12-DTD-语法规则-定义属性

格式：

```dtd
<!ATTLIST 元素名称 属性名称 属性类型 属性约束>
```

属性类型：

* CDATA：普通字符串

属性约束

* \#REQUIRED 必须的
* \#IMPLED 不是必须的
* FIXED value 属性值是固定的

例如：

```dtd
<!ATTLIST person id CDATA #FIXED "p1">
```

### 13-schema-schema和dtd的区别

* schema也是一个xml文件，符合xml语法，后缀.xsd
* 一个xml可引入多个schema，多个schema使用命名空间区分(类似Java包名)

* dtd元素类型取值较为单一，常见为PCDATA，但是schema可以支持很多个数据类型

![image-20230711010132295](http://www.iocaop.com/images/2023-07/202307110101323.png)

### 14-schema-入门案例编写

还是对这个xml进行编写：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<persons>
    <person>
        <name>赖卓成</name>
        <age>25</age>
    </person>
</persons>
```

步骤：

* 创建.xsd文件
* 定义声明文档
* 根标签为\<schema\>
* 在\<schema\>中定义：xmlns=http://www.w3.org/2001/XMLSchema
* 在\<schema\>中定义属性targetNamespace=唯一url地址，指定当前这个schema文件的命名空间
* 在\<schema\>中定义属性：elementFormDefault="qualified"，表示这是一个良好的schema文件
* 通过element定义元素
* 判断当前元素是简单元素还是复杂元素

![image-20230711010819580](http://www.iocaop.com/images/2023-07/202307110108621.png)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<schema
        xmlns="http://www.w3.org/2001/XMLSchema"
        elementFormDefault="qualified"
        targetNamespace="http:www.iocaop.com/javase/xml">
    
<!--定义元素persons-->
    <element name="persons">
        <!--表示这是一个复杂元素-->
        <complexType>
        <!--表示需要按顺序写-->
            <sequence>
                <!--定义person元素-->
                <element name="person">
                    <!--复杂元素-->
                    <complexType>
                        <!--顺序-->
                        <sequence>
                            <!--定义简单元素 type指定元素类型-->
                            <element name="name" type="string"></element>
                            <element name="age" type="string"></element>
                        </sequence>
                    </complexType>
                </element>
            </sequence>
        </complexType>
    </element>
</schema>
```

### 15-schema-引入schema文件步骤

![image-20230711012624418](http://www.iocaop.com/images/2023-07/202307110126453.png)

```xml
<?xml version="1.0" encoding="UTF-8" ?>

<persons xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http:www.iocaop.com/javase/xml"
         xsi:schemaLocation="http:www.iocaop.com/javase/xml person.xsd"
>
    <person>
        <name>赖卓成</name>
        <age>25</age>
    </person>
</persons>
```

换一下顺序，看看约束生效了没：

![image-20230711013146643](http://www.iocaop.com/images/2023-07/202307110131678.png)

### 16-schema-定义属性

示例：

```xml
<attribute name="id" type="string" use="required"></attribute>
```

![image-20230711013322376](http://www.iocaop.com/images/2023-07/202307110133403.png)

在原来的xsd中加入：

![image-20230711013421824](http://www.iocaop.com/images/2023-07/202307110134863.png)

生效了：必须要id

![image-20230711013447040](http://www.iocaop.com/images/2023-07/202307110134068.png)