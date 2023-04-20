---
title: java基础-常用API、集合
date: 2023-02-16
category:
  - JavaSE
---

黑马2022资料阶段一：java基础-第六章

## 4-1 String类

### 03-概述

java程序中，所有双引号字符串都是String类对象。

字符串是常量，创建后不能更改。

![image-20230310004430528](http://www.iocaop.com/images/2023-03/image-20230310004430528.png)

> String类内部有一个char[]，没有提供set方法给我们修改内存。上图代码中，只是讲栈内存中的s1变量指向了一个新的String类对象。

### 04-String类的常见构造

![image-20230310004706791](http://www.iocaop.com/images/2023-03/image-20230310004706791.png)

### 05-创建字符串对象的区别对比

构造方法可以创建String对象，双引号也能直接创建字符串对象，有什么区别？

首先复习一下`==`比较，基本数据类型时比较的是值，引用数据类型比较的是地址。

![image-20230310005844595](http://www.iocaop.com/images/2023-03/image-20230310005844595.png)

以双引号方式给出的字符串，只要字符序列相同(顺序和大小写)，无论在代码中出现多少次，JVM都只会创建一个String对象，并在字符串常量池中维护。

> 字符串常量池：当使用双引号创建字符串对象的时候，系统会检测该字符串是否在常量池中存在，如果存在则复用，不存在才创建。

![image-20230310005600039](http://www.iocaop.com/images/2023-03/image-20230310005600039.png)

![image-20230310005808718](http://www.iocaop.com/images/2023-03/image-20230310005808718.png)

### 06-String类常见面试题

![image-20230310010501497](http://www.iocaop.com/images/2023-03/image-20230310010501497.png)

> 为什么是2个？new一个，字符串"abc"本身是一个。

![image-20230310010918256](http://www.iocaop.com/images/2023-03/image-20230310010918256.png)

> *Java 语言提供对字符串串联符号("+")以及将其他对象转换为字符串的特殊支持*。字符串串联是通过 StringBuilder或 StringBuffer类及其 append 方法实现的

![image-20230310011230679](http://www.iocaop.com/images/2023-03/image-20230310011230679.png)

## 4-2 StringBuilder

### 15-概述

概述：可变字符串类，可以看做是一个String的容器。

学他干嘛：提高字符串操作效率。方法抽取快捷键ctrl+alt+m

String拼接：2933ms

![image-20230310011948990](http://www.iocaop.com/images/2023-03/image-20230310011948990.png)

StringBuilder拼接：294ms

![image-20230310012035703](http://www.iocaop.com/images/2023-03/image-20230310012035703.png)

### 16-常用构造

![image-20230310012219978](http://www.iocaop.com/images/2023-03/image-20230310012219978.png)

![image-20230310012257883](http://www.iocaop.com/images/2023-03/image-20230310012257883.png)

### 17-常用成员方法

![image-20230310012342608](http://www.iocaop.com/images/2023-03/image-20230310012342608.png)

![image-20230310012545022](http://www.iocaop.com/images/2023-03/image-20230310012545022.png)

> append方法调用后返回的是调用该方法的StringBuilder对象的本身，所以可以链式调用。

### 18-StringBuilder提高效率的原理图

不用StringBuilder，用加号拼接，每次加号都会创建一个StringBuilder对象和一个String(因为接收的引用类型是String，所以会自动调用toString()方法)对象

![image-20230310013322142](http://www.iocaop.com/images/2023-03/image-20230310013322142.png)

使用加号后，只会有一个StringBuilder对象，需要使用String，调用toString()方法即可

![image-20230310013507852](http://www.iocaop.com/images/2023-03/image-20230310013507852.png)

## 5-1 ArrayList

### 01-为什么用集合？

数组不能动态改变大小，需要增加新数据时不能动态扩容。

集合特点：提供存储空间可变的存储模型，存储的数据容量可以发生改变。

集合和数组的区别：

* 共同点：都是存储数据的容器
* 不同点：数组的容量是固定的，集合的容量是可变的。

### 02-ArrayList的构造方法和添加方法

简介：List接口的可调整大小的<span style="background-color:pink;">数组</span>实现。实现所有可选的列表操作，并允许所有元素，包括null。除了实现List接口之外，该类还提供了一些方法来操作内部用于存储列表的数组的大小。（该类大致等同于Vector，只是它是<span style="background-color:pink;">非同步</span>(线程不安全)的。）

构造方法：

| 构造方法                              | 描述                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| ArrayList()                           | 构造一个初始容量为<span style="background-color:pink;">10</span>的空列表。(当超过容量时会自动扩容) |
| ArrayList(int initialCapacity)        | 指定容量                                                     |
| ArrayList(Collection<?  extends E> c) | 按照集合的迭代器返回的顺序构造一个包含指定集合元素的列表。   |

泛型如果不写，默认Object。

![image-20230313214324735](http://www.iocaop.com/images/2023-03/image-20230313214324735.png)

![image-20230313214711977](http://www.iocaop.com/images/2023-03/image-20230313214711977.png)

## 8-1API的基本使用与Object类

### 06-Object面试题

![image-20230328235201345](http://www.iocaop.com/images/2023-03/image-20230328235201345.png)

### 07-Objects方法

![image-20230329001149676](http://www.iocaop.com/images/2023-03/image-20230329001149676.png)

第二个头String方法，先判断参数1中的对象是否为`null`，不为空返回对象的`toString()`，为空则返回第二个参数的值。

### 08-BigDecimal构造

想要<span style="background-color:pink;">精确计算</span>，应该使用<span style="background-color:pink;">字符串构造</span>，不然还是会不精确。

![image-20230329001606642](http://www.iocaop.com/images/2023-03/image-20230329001606642.png)

![image-20230329001633703](http://www.iocaop.com/images/2023-03/image-20230329001633703.png)

### 10-BigDecimal特殊方法

BigDecimal是精确计算，如果出现除不尽的情况，会报错。需要手动指定。

![image-20230329001954468](http://www.iocaop.com/images/2023-03/image-20230329001954468.png)

![image-20230329002034854](http://www.iocaop.com/images/2023-03/image-20230329002034854.png)

### 11-基本数据类型包装类

就是将基本类型包装成类。

好处：可以在对象中定义<span style="background-color:pink;">更多功能方法操作该数据</span>。

常用操作，基本数据类型和字符串之间的转换。

![image-20230329002422252](http://www.iocaop.com/images/2023-03/image-20230329002422252.png)

### 12-Integer获得对象

![image-20230329002634682](http://www.iocaop.com/images/2023-03/image-20230329002634682.png)

### 13-Integer自动装箱和自动拆箱

自动装箱：把一个基本数据类型变量对应包装类的时候(Integer i = 1;)，java底层会自动帮我们调用valueOf方法，创建Integer对象。

自动拆箱：把一个包装类变成基本数据类型(int i2 =i)

> 需要注意的是，包装类型也是对象，在使用时需要进行非null判断。

### 14-Integer类型转换

![image-20230329003408221](http://www.iocaop.com/images/2023-03/image-20230329003408221.png)

### 16-数组的高级操作-二分查找思路分析

二分查找的前提条件：<span style="background-color:pink;">数组的元素需要按顺序排序好</span>

####  元素存在-要查值为3的索引。

思路：定义两个变量min和max，确定查找的范围。根据min和max计算中间点的位置，公式：`mid = (min+max)/2`(整数)，假设min是0，max是9，mid就是4。

* min是0，max是9，mid为4，大于3，所以后面的不需要了，max为mid-1=3

![image-20230420215712098](http://www.iocaop.com/images/2023-04/image-20230420215712098.png)

* min是0，max是原来的mid-1等于3，mid是1，小于3，所以前面的不要了，min等于mid+1=2

  ![image-20230420215919516](http://www.iocaop.com/images/2023-04/image-20230420215919516.png)

* min是2，max是3，mid是2，等于3，二分查找结束。

  ![image-20230420220316100](http://www.iocaop.com/images/2023-04/image-20230420220316100.png)

#### 元素不存在-查找值为11的元素索引

* min是0，max是9，mid是4，值5小于11，所以左边的不要了，min改为mid+1=5

  ![image-20230420221405866](http://www.iocaop.com/images/2023-04/image-20230420221405866.png)

* min是5，max是9，mid是7，值8小于11，左边不要了，min改为mid+1=8

  ![image-20230420221634664](http://www.iocaop.com/images/2023-04/image-20230420221634664.png)

* min是8，max是9，mid是8，值9小于11，左边不要了，min=mid+1=9
  

  ![image-20230420221618926](http://www.iocaop.com/images/2023-04/image-20230420221618926.png)

* min=max=mid=9，值10小于11，左边不要了，min=mid+1=10

  ![image-20230420221826553](http://www.iocaop.com/images/2023-04/image-20230420221826553.png)

* min是9，max是10，可以发现，min大于max，这时可以认为查询的元素不存在。

  ![image-20230420222031179](http://www.iocaop.com/images/2023-04/image-20230420222031179.png)

### 17-数组的高级操作-二分查找代码实现

```java
/**
 * 二分查找
 *
 * @author lzc
 * @date 2023/04/20
 */
public class BinarySearch {

    public static void main(String[] args) {
        // 待查找的数组
        int [] arr = {1,2,3,4,5,6,7,8,9,10};
        // 待查找的元素
        int number = 3;
        int index = binarySearchMethod(arr,number);
        System.out.println("元素"+number+"的索引为:"+index);
    }

    private static int binarySearchMethod(int[] arr, int number) {
        // 确定查找的范围
        int min = 0;
        int max = arr.length -1;
        // 查找的条件 min<max 否则就是没找到
        while (min <max){
            // 计算中间位置 位运算 右移一位就是除以2
            int mid = (min+max)>>1;

            // 分三种情况，在左边、在右边、找到了
            if (arr[mid]>number){
                // 在左边，右边的不要了，最大索引范围为中间位置左边一个
                max = mid - 1;
            }else if (arr[mid]<number){
                // 在右边，左边的不要了，最小索引范围为中间位置右边一个
                min = mid + 1 ;
            }else if (arr[mid] == number){
                return mid;
            }
        }
        // 没找到直接返回-1
        return -1;
    }
}

```

运行测试：

![image-20230420230140520](http://www.iocaop.com/images/2023-04/image-20230420230140520.png)

![image-20230420230155527](http://www.iocaop.com/images/2023-04/image-20230420230155527.png)
