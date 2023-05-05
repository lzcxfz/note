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

### 18-数组的高级操作-冒泡排序思路分析

相邻的数据<span style="background-color:pink;">两两比较</span>，小的放前面，大的放后面。

初始数据：![image-20230421000624535](http://www.iocaop.com/images/2023-04/image-20230421000624535.png)

期望数据：![image-20230421000640440](http://www.iocaop.com/images/2023-04/image-20230421000640440.png)

相邻的两个元素比较，把小的放左边，大的放右边。

* 第一轮：可以把最大的冒泡到最右边

  【3 5 2 1 4】

     3 2 5 1 4

     3 2 1 5 4

     3 2 1 4 5

* 第二轮：把第二大的冒泡

  【3 2 1 4】 5

  ​    2 3 1 4     5

  ​    2 1 3 4     5

* 第三轮
  
  【2 1 3 】4 5
  
     1  2  3     4 5
  
* 第四轮
  
  【1 2 】3 4 5
  
  ​    1 2     3 4 5
>总结：如果有n个元素需要进行排序，则需要进行n-1轮冒泡，每轮冒泡需要比较n-i次。i为第几轮。

  

### 19-数组高级操作-冒泡排序代码实现

```java
/**
 * 冒泡排序
 *
 * @author lzc
 * @date 2023/04/21
 */
public class BubbleSort {
    public static void main(String[] args) {
        int [] arr = {9,8,7,6,5,4,3,2,1,0};

        bubbleSort(arr);
    }

    private static void bubbleSort(int[] arr) {
        for (int i=1;i<arr.length-1;i++){
            for (int j = 0;j<arr.length-i;j++){
                if (arr[j]>arr[j+1]){
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
            System.out.println("第"+i+"轮："+Arrays.toString(arr));

        }

        System.out.println("排序后"+Arrays.toString(arr));
    }
}
```

为了更直观，打印最差的情况：

![image-20230421004844917](http://www.iocaop.com/images/2023-04/image-20230421004844917.png)

### 20-递归-概念

概述：方法定义中调用方法本身的现象。

思路：把复杂问题转为一个<span style="background-color:pink;">与原问题相似的规模较小的问题来求解</span>，递归策略只需少量的程序就可以描述出截图过程所需要的多次重复计算。

递归解决问题要找到2个内容：

* 递归出口：否则会出现内存溢出
* 递归规则：与原问题相似的规模较小的问题

求1-100的和：

```java
/**
 * 求1-100 传统写法
 *
 * @author 赖卓成
 * @date 2023/04/23
 */
public class MyFactorialDemo01 {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 0; i <= 100; i++) {
            sum+=i;
        }
        System.out.println(sum);
    }
}

```

```java
/**
 * 求1-100 递归写法
 *
 * @author 赖卓成
 * @date 2023/04/23
 */
public class MyFactorialDemo02 {
    public static void main(String[] args) {
        int sum = getSum(100);
        System.out.println(sum);
    }

    private static int getSum(int i) {
        if (i==1){
            return 1;
        }else {
            return i+getSum(i-1);
        }

    }
}
```

### 21-递归-求阶乘代码实现

需求：用递归求5的阶乘，输出结果。

5! = 5\*4\*3\*2\*1

* 递归的出口 1！=1，也就是一直拆分，直到乘1为止。
* 递归规则：n!=n*(n-1!),如5的阶乘等于5乘以4的阶乘：5!=5\*4!

代码实现：

```java
/**
 * 用递归求5的阶乘 5*4*3*2*1 = 120
 *
 * @author lzc
 * @date 2023/04/25
 */
public class MyFactorialDemo03 {
    public static void main(String[] args) {
        int result  = getResult(5);
        System.out.println(result);
    }

    private static int getResult(int i) {
        // 递归出口
        if (i==1){
            return 1;
        }
        // 递归的规则 n! = n*(n-1)!
        return i * getResult(i-1);
    }
}
```

### 22-递归-内存图

上面的代码，如果递归没有出口，会发生什么？

栈溢出：

![image-20230426133117389](http://www.iocaop.com/images/2023-04/image-20230426133117389.png)

找递归规则的技巧:下一次调用一定比本次调用更靠近出口。

栈内存：

![image-20230426133529175](http://www.iocaop.com/images/2023-04/image-20230426133529175.png)

每次方法调用会压栈，调用结束返回时弹栈。如果递归没有出口，会一直调用，导致栈内存溢出。

返回时如图：颜色标记

![image-20230426134100346](http://www.iocaop.com/images/2023-04/image-20230426134100346.png)

### 23-数组的高级操作-快排核心思路分析

* 在冒泡排序中一次循环结束，就确定了最大值和最大值的位置
* 快速排序中，每次递归都以<span style="background-color:pink;">第一个数为基准数</span>，找到数组中所有比它小的数和所有比它大的数，<span style="background-color:pink;">小的放左边，大的放右边</span>，来确定基准数的位置。

假设有下面乱序的数组：

![image-20230426230700798](http://www.iocaop.com/images/2023-04/image-20230426230700798.png)

在一次递归后，应该会确定基准数6应该在数组的位置，且它左边的数都比他小(顺序不管)，它右边的数都比他大(顺序不管)。

* 从右开始找，所以定义一个变量指向数组最大索引，开始找比6小的，找到后就停下来，不移动索引。第一次找到5比6小，停下来：

  ![image-20230426231616203](http://www.iocaop.com/images/2023-04/image-20230426231616203.png)
  
* 停下来后，就从左边开始找比6更大的，也是定义一个变量记录索引位置，第一次找到7比6大，停下来，

  ![image-20230426231827987](http://www.iocaop.com/images/2023-04/image-20230426231827987.png)

* 交换两个索引位置的值：

  ![image-20230426231915515](http://www.iocaop.com/images/2023-04/image-20230426231915515.png)

* 交换完后，按照上面的方式继续找，从左边开始移动，找比6大的，从右变开始移动，找比6小的，第一次，找到4比6小，停下来：

  ![image-20230426232102347](http://www.iocaop.com/images/2023-04/image-20230426232102347.png)

* 停下来后，从左边开始移动，找比6大的，第一次找到9，停下来：

  ![image-20230426232147622](http://www.iocaop.com/images/2023-04/image-20230426232147622.png)

* 交换位置：

  ![image-20230426232205220](http://www.iocaop.com/images/2023-04/image-20230426232205220.png)

* 交换完，再从右变开始找比6小的，找到3，停下来：

  ![image-20230426232251624](http://www.iocaop.com/images/2023-04/image-20230426232251624.png)

* 停下来后从左往右找，发现两个索引变量重叠了：

  ![image-20230426232328818](http://www.iocaop.com/images/2023-04/image-20230426232328818.png)

* 当两个索引变量重叠后，基准数归位，也就是把基准数和当前索引位置的值交换：

  ![image-20230426232429270](http://www.iocaop.com/images/2023-04/image-20230426232429270.png)

* 到此，一次递归结束，就确定了第一个基准数应该放的位置。

### 24-数组的高级操作-快排核心代码实现

先实现一次递归，基准数6在数组中应该存放的位置。

```java
public class QuickSort {
    public static void main(String[] args) {
        // 定义数组
        int[] arr = {6, 1, 2, 7, 9, 3, 4, 5, 10, 8};

        quickSort(arr, 0, arr.length - 1);

        // 一次递归后，结果应该是确定了基准数6应该处于哪个位置，且左边的比6小，右边的比6大
        System.out.println(Arrays.toString(arr));
    }

    /**
     * 快速排序 一次递归
     *
     * @param arr   数组
     * @param left  最小索引
     * @param right 最大索引
     */
    private static void quickSort(int[] arr, int left, int right) {

        // 从一次递归的最后一步，即两个索引重叠时可以得出循环次数：
        while (left != right) {
            // 从右往左找比基准数小的，可以得出以下循环，即：没找到一直移动索引，循环次数就是移动次数。找到了就停下来，即跳出循环
            while (arr[0] <= arr[right] && left < right) {
                right--;
            }

            // 上一个循环，从右往左找到比6小的，找到后停下来，就要移动左边索引，从左往右找比6大的,没找到就一直移动索引
            while (arr[0] >= arr[left] && left < right) {
                left++;
            }

            // 走到这一步，说明从右往左已经找到比6小的，从左往右也已经找到比6大的，此时交换两个索引位置的值
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        }
        // 两个索引重叠时，基准数归位，即交换基准数和当前索引位置的值
        int temp = arr[left];
        arr[left] = arr[0];
        arr[0] = temp;
    }
}
```

需要注意，在移动指针后，需要处理等于的情况。即：这里遗留一个问题，即使元素没重复，不加=依然是错的，没找到原因。

```java
// 处理等于的情况  <=
while (arr[0] <= arr[right] && left < right){...}
// 处理等于的情况  <=
while (arr[0] >= arr[left] && left < right){...}
```

递归一次后，记得把基准数归位。

经过调试，发现问题，在做比较时，左指针left初始为0，也就是拿arr[0]和基准数自己比较了一次，导致了交换。

解决：要么加上= ，要么初始指针+1。

![9ecc1bf6d25fcf1af87963d8af6d926](http://www.iocaop.com/images/2023-04/9ecc1bf6d25fcf1af87963d8af6d926.png)

![b74cf9585b839b5433b428aca739e73](http://www.iocaop.com/images/2023-04/b74cf9585b839b5433b428aca739e73.png)

### 25-数组的高级操作-快排完整实现

上面代码，也就是快排中的代码只调用一次后，形成的效果如下图：

![image-20230427013502785](http://www.iocaop.com/images/2023-04/image-20230427013502785.png)

接下来我们就要再次选取基准数，确定基准数位置，我们选择下标为0的，也就是3为基准数，在整个范围中来确定它的位置。

依然是从右往左找，即arr[arr.length-1]开始，即最右的位置往左移动，遇到比3小的则停下来，再从左往右找到比3大的数停下来，左交换。

不难发现，经过第一次循环操作，现在根本不需要从最右边开始找，因为6右边的都大于6，左边都小于6，可以得到0索引的值小于6，即3<6，而6右边都大于6，得6右边都大于3。

![image-20230427014011700](http://www.iocaop.com/images/2023-04/image-20230427014011700.png)

右边的也是同理：

![image-20230427014237434](http://www.iocaop.com/images/2023-04/image-20230427014237434.png)

什么时候递归结束？

当3元素位置确定后，下一次需要递归的范围如下图：

![image-20230427014330165](http://www.iocaop.com/images/2023-04/image-20230427014330165.png)

再确定2元素的位置，得下一次需要递归将基准数归位的范围：

![image-20230427014446314](http://www.iocaop.com/images/2023-04/image-20230427014446314.png)

1元素位置确定后，下一次基准数归位需要递归的范围：

![image-20230427014542989](http://www.iocaop.com/images/2023-04/image-20230427014542989.png)

可以看到，数组越界了，这时候应该结束递归了。即left>right时结束递归。

代码实现：

```java
public class QuickSort {
    public static void main(String[] args) {
        // 定义数组
        int[] arr = {6, 1, 2, 7, 9, 3, 4, 5, 10, 8};

        quickSort(arr, 0, arr.length - 1);

        // 一次递归后，结果应该是确定了基准数6应该处于哪个位置，且左边的比6小，右边的比6大
        System.out.println(Arrays.toString(arr));
    }

    /**
     * 快速排序 一次递归
     *
     * @param arr   数组
     * @param left  最小索引
     * @param right 最大索引
     */
    private static void quickSort(int[] arr, int left, int right) {
        if (left>right){
            return;
        }
        int left0 = left;
        int max = right;
        int baseNumber = arr[left0];
        // 从一次递归的最后一步，即两个索引重叠时可以得出循环次数：
        while (left != right) {
            // 从右往左找比基准数小的，可以得出以下循环，即：没找到一直移动索引，循环次数就是移动次数。找到了就停下来，即跳出循环
            while (baseNumber <= arr[right] && left < right) {
                right--;
            }

            // 上一个循环，从右往左找到比6小的，找到后停下来，就要移动左边索引，从左往右找比6大的,没找到就一直移动索引
            while (baseNumber >= arr[left] && left < right) {
                left++;
            }

            // 走到这一步，说明从右往左已经找到比6小的，从左往右也已经找到比6大的，此时交换两个索引位置的值
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        }
        // 两个索引重叠时，基准数归位，即交换基准数和当前索引位置的值
        int temp = arr[left];
        arr[left] = baseNumber;
        arr[left0] = temp;

        // 递归处理左边
        quickSort(arr,left0,left-1);
        // 递归处理右边
        quickSort(arr,left+1,max);
    }
}
```

这里，进入方法时判断递归条件，定义了left0和max记录基准数位置和递归索引最大值。为什么要这样？因为基准数位置不是每次都是0索引，当确定第一次递归，即6元素右边的元素的范围时，基准数位置每次都在变化。至于max，范围有不一样的情况，6左边的元素确定位置时没必要从数组尾部开始移动，直接从6元素索引-1的位置移动即可。

### 26-Arrays

没有构造，全是静态方法。

* toString

  ![image-20230427015736962](http://www.iocaop.com/images/2023-04/image-20230427015736962.png)

* 二分查找，数组应该是顺序的

  ![image-20230427015825996](http://www.iocaop.com/images/2023-04/image-20230427015825996.png)

* 排序，底层是快排

  ![image-20230427015947531](http://www.iocaop.com/images/2023-04/image-20230427015947531.png)

## 8-4-时间日期类

### 01-时间概述

世界标准时间：格林威治天文台时间，简称GMT。现在已经有点偏差了，现在标准时间是原子钟提供的时间。

中国时间：世界标准时间+8小时

计算机中的时间原点：1970年1月1日 00:00:00 C语言的生日。了解更多：<a href='http://www.binsky.net/index.php/287.html'>点击跳转</a>

### 02-Date类概述和构造方法

Date代表了一个特定的时间，精确到毫秒。

空参构造，表示<span style="background-color:pink;">电脑当前时间</span>。

带参构造，从计算机的时间原点,过了指定<span style="background-color:pink;">毫秒</span>的那个时间

```java
public class DateDemo01 {
    public static void main(String[] args) {
        // 电脑的当前时间
        Date date = new Date();
        // Thu May 04 13:36:14 CST 2023
        System.out.println(date);

        // 计算机的时间原点,过了指定毫秒的那个时间
        Date date1 = new Date(0L);
        // Thu Jan 01 08:00:00 CST 1970  为什么是8点？东八区
        System.out.println(date1);

        // 1970年早上九点
        Date date2 = new Date(3600*1000);
        // Thu Jan 01 09:00:00 CST 1970
        System.out.println(date2);

    }
}
```

### 03-Date成员方法

![image-20230504133902128](http://www.iocaop.com/images/2023-05/image-20230504133902128.png)

```java
public class DateDemo02 {
    public static void main(String[] args) {
        Date date = new Date();
        // Thu May 04 13:42:07 CST 2023
        System.out.println(date);
        
        // 获取毫秒数
        long time = date.getTime();
        // 1683178927205
        System.out.println(time);
        // 与下面这条等价
        System.currentTimeMillis();

        // 设置时间毫秒数
        date.setTime(0L);
        // Thu Jan 01 08:00:00 CST 1970
        System.out.println(date);
    }
}
```

### 04-SimpleDateFormat

可以对Date对象进行<span style="background-color:pink;">格式化和解析</span>。

![image-20230504134658748](http://www.iocaop.com/images/2023-05/image-20230504134658748.png)

常用模式字母对应关系如下：

* y  年
* M  月
* d  日
* H  时
* m  分
* s  秒

如：

* 2020-11-11 13:27:06 对应模式：yyyy-MM-dd HH:mm:ss
* 2020年11月11日 13:27:06 对应模式yyyy年MM月dd日 HH:mm:ss

SimpleDateFormat的构造方法：

![image-20230504135102568](http://www.iocaop.com/images/2023-05/image-20230504135102568.png)

```java
public class DateDemo03 {
    public static void main(String[] args) {
        // 创建时间
        Date date = new Date();

        // 创建日期格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
    }
}
```

创建好了，就需要调用成员方法进行格式化和解析：

![image-20230504135404024](http://www.iocaop.com/images/2023-05/image-20230504135404024.png)

```java
public class DateDemo03 {
    public static void main(String[] args) {
        // 创建时间
        Date date = new Date();

        // 创建日期格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");

        // 格式化
        String format = sdf.format(date);
        // 2023年05月04日 13:54:56
        System.out.println(format);
    }
}
```

反过来也是一样，将字符串解析成Date对象：

需要注意sdf的格式需要和时间字符串格式一致，否则会报异常。

```java
public class DateDemo03 {
    public static void main(String[] args) throws ParseException {
        // 创建时间
        Date date = new Date();

        // 创建日期格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");

        // 格式化
        String format = sdf.format(date);
        // 2023年05月04日 13:54:56
        System.out.println(format);

        // 解析
        Date parse = sdf.parse(format);
        // Thu May 04 13:56:07 CST 2023
        System.out.println(parse);
    }
}
```

### 05-练习

![image-20230504140615023](http://www.iocaop.com/images/2023-05/image-20230504140615023.png)

付款时间：2020年11月11日 0:03:47和2020年11月11日 0:10:11哪个秒杀成功？

需要判断时间是否在秒杀范围，如何判断？可以转成毫秒值进行比较。

```java
public class DateDemo04 {
    public static void main(String[] args) throws ParseException {
        // 秒杀活动的开始时间和结束时间字符串
        String start = "2020年11月11日 0:0:0";
        String end = "2020年11月11日 0:10:0";

        // 两个下单时间字符串
        String one = "2020年11月11日 0:03:47";
        String two = "2020年11月11日 0:10:11";

        // 创建时间格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");

        // 解析城Date对象并获取毫秒值
        long startTime = sdf.parse(start).getTime();
        long endTime = sdf.parse(end).getTime();
        long oneTime = sdf.parse(one).getTime();
        long twoTime = sdf.parse(two).getTime();

        if (oneTime <= endTime && oneTime >= startTime) {
            System.out.println("one秒杀成功");
        } else {
            System.out.println("one秒杀失败");
        }

        if (twoTime <= endTime && twoTime >= startTime) {
            System.out.println("two秒杀成功");
        } else {
            System.out.println("two秒杀失败");
        }

    }
}
```

![image-20230504141658583](http://www.iocaop.com/images/2023-05/image-20230504141658583.png)

### 06-JDK8的体验

假如有字符串表示的时间 2020年11月11日 0:00:00  现在需要将时间往后一天。在jdk7中需要这样做：

在Date类中没有提供相应的方法，需要获取Date对应的毫秒数手动计算进行相加：

![image-20230504225523893](http://www.iocaop.com/images/2023-05/image-20230504225523893.png)

```java
    private static void jdk7Time() throws ParseException {
        String strTime = "2020年11月11日 0:00:00";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        Date date = sdf.parse(strTime);
        long time = date.getTime();
        date.setTime(time+1000*60*60*24);
        // 2020年11月12日 00:00:00
        System.out.println(sdf.format(date));
    }
```

而在jdk8中，可以使用`LocalDateTime`中的方法进行计算：

```java
    private static void jdk8Time() {
        String strTime = "2020年11月11日 00:00:00";
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.parse(strTime, dateTimeFormatter);
        LocalDateTime newLocalDateTime = localDateTime.plusDays(1);
        String result = newLocalDateTime.format(dateTimeFormatter);
        // 2020年11月12日 00:00:00
        System.out.println(result);
    }
```

需要注意的是，jdk8格式化要严格一点：保留两位，否则报错。

![image-20230504230437046](http://www.iocaop.com/images/2023-05/image-20230504230437046.png)

### 07-JDK8新增时间类-获取时间对象

在jdk8，jdk7中的Date被拆分成了三个类：![image-20230504230845577](http://www.iocaop.com/images/2023-05/image-20230504230845577.png)

![image-20230504230955007](http://www.iocaop.com/images/2023-05/image-20230504230955007.png)

```java
public class JDK8DateDemo02 {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        // 2023-05-04T23:12:45.785872500
        System.out.println(now);

        // 如果写错，会报错 如13月 32日 等
        LocalDateTime time = LocalDateTime.of(2020, 11, 11, 1, 1, 1);
        // 2020-11-11T01:01:01
        System.out.println(time);
    }
}
```

### 08-获取时间中的每个值

![image-20230505065717735](http://www.iocaop.com/images/2023-05/image-20230505065717735.png)

```java
/**
 * jdk8 获取时间中的每个值
 *
 * @author lzc
 * @date 2023/05/05
 */
public class JDK8DateDemo03 {
    public static void main(String[] args) {
        LocalDateTime localDateTime = LocalDateTime.of(2020, 11, 11, 11, 11);

        // 获取年
        int year = localDateTime.getYear();
        System.out.println("year = " + year);

        // 月
        Month month = localDateTime.getMonth();
        System.out.println("month = " + month);
        int monthValue = localDateTime.getMonthValue();
        System.out.println("monthValue = " + monthValue);

        // 日
        int dayOfMonth = localDateTime.getDayOfMonth();
        System.out.println("dayOfMonth = " + dayOfMonth);

        // 星期
        DayOfWeek dayOfWeek = localDateTime.getDayOfWeek();
        System.out.println("dayOfWeek = " + dayOfWeek);
        int dayOfYear = localDateTime.getDayOfYear();
        System.out.println("dayOfYear = " + dayOfYear);

        // 小时
        int hour = localDateTime.getHour();
        System.out.println("hour = " + hour);

        //分钟
        int minute = localDateTime.getMinute();
        System.out.println("minute = " + minute);
    }
}

```

### 09-时间转换方法

![image-20230505070958423](http://www.iocaop.com/images/2023-05/image-20230505070958423.png)

```java
/**
 * jdk8 时间转换方法
 *
 * @author lzc
 * @date 2023/05/05
 */
public class JDK8DateDemo04 {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        System.out.println("now = " + now);
        LocalDate localDate = now.toLocalDate();
        System.out.println("localDate = " + localDate);
        LocalTime localTime = now.toLocalTime();
        System.out.println("localTime = " + localTime);
    }
}
```

![image-20230505071139338](http://www.iocaop.com/images/2023-05/image-20230505071139338.png)

### 10-格式化和解析

![image-20230505071438756](http://www.iocaop.com/images/2023-05/image-20230505071438756.png)

在jdk7中，日期格式化器是`SimpleDateFormat`，而在jdk8中是`DateTimeFormatter`

![image-20230505071502212](http://www.iocaop.com/images/2023-05/image-20230505071502212.png)

```java
    private static void parse() {
        String strTime = "2020年11月11日 11:11:11";
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(strTime, dateTimeFormatter);
        System.out.println("dateTime = " + dateTime);
    }

    private static void format() {
        LocalDateTime now = LocalDateTime.now();
        // 直接输出  now = 2023-05-05T07:22:50.455788700
        System.out.println("now = " + now);
        // 格式化输出  format = 2023年05月05日 07:22:50
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");
        String format = now.format(dateTimeFormatter);
        System.out.println("format = " + format);
    }
```

### 11-plus系列方法

```java
public class JDK8DateDemo06 {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime years2024 = now.plusYears(1);
        System.out.println("years2024 = " + years2024);
        LocalDateTime  years2022= now.plusYears(-1);
        System.out.println("years2022 = " + years2022);
    }
}
```

![image-20230505073535041](http://www.iocaop.com/images/2023-05/image-20230505073535041.png)

> 需要注意的就是，参数可以是正数也可以是负数。正数则往后一年，负数则是前一年。

类似方法：

![image-20230505073618861](http://www.iocaop.com/images/2023-05/image-20230505073618861.png)

### 12-minus系列方法

与plus方法相反，用法一样。一个加，一个减。

```java
public class JDK8DateDemo07 {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime year2022 = now.minusYears(1);
        System.out.println("year2022 = " + year2022);
        LocalDateTime year2024 = now.minusYears(-1);
        System.out.println("year2024 = " + year2024);
    }
}
```

![image-20230505074401862](http://www.iocaop.com/images/2023-05/image-20230505074401862.png)

> 参数是正数则是以前的时间，为负数则是以后的时间。

类似的方法还有：

![image-20230505074434754](http://www.iocaop.com/images/2023-05/image-20230505074434754.png)

### 13-with系列方法

直接修改时间

![image-20230505075507734](http://www.iocaop.com/images/2023-05/image-20230505075507734.png)

```java
public class JDK8DateDemo08 {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        System.out.println("now = " + now);
        LocalDateTime localDateTime = now.withYear(2222);
        System.out.println("localDateTime = " + localDateTime);
        LocalDateTime localDateTime1 = now.withMonth(20);
    }
}
```

![image-20230505075455470](http://www.iocaop.com/images/2023-05/image-20230505075455470.png)

> 需要注意，如果超出范围，会报异常。<span style="background-color:pink;">plus、minus、with方法不会修改原来的对象，而是返回一个新的时间对象，原来的对象还是原来的时间</span>

### 14-时间间隔对象

* Period 

  ![image-20230505082911741](http://www.iocaop.com/images/2023-05/image-20230505082911741.png)

  传入两个`LocalDate`对象，获得时间间隔

  ```java
  public class JDK8DateDemo09 {
      public static void main(String[] args) {
          LocalDate now = LocalDate.now();
          LocalDate localDate2022 = LocalDate.of(2020, 11, 11);
          Period period = Period.between(localDate2022, now);
          // period = P2Y5M24D
          System.out.println("period = " + period);
          
          // 获得间隔的年数
          int years = period.getYears();
          System.out.println("years = " + years);
  
          // 获得间隔的月数
          int months = period.getMonths();
          System.out.println("months = " + months);
  
          // 获得间隔的天数
          int days = period.getDays();
          System.out.println("days = " + days);
      }
  }
  ```

* Duration

  ![image-20230505083232993](http://www.iocaop.com/images/2023-05/image-20230505083232993.png)

  ![image-20230505093600988](http://www.iocaop.com/images/2023-05/image-20230505093600988.png)
  
  ```java
  public class JDK8DateDemo10 {
      public static void main(String[] args) {
          LocalDateTime now = LocalDateTime.now();
          LocalDateTime localDateTime = LocalDateTime.of(2020, 11, 11, 11, 11, 11);
          Duration duration = Duration.between(now, localDateTime);
          // duration = PT-21717H-23M-19.7687483S
          System.out.println("duration = " + duration);
  
          // 获得间隔的秒
          long seconds = duration.toSeconds();
          System.out.println("seconds = " + seconds);
  
          // 获得间隔的微秒
          long millis = duration.toMillis();
          System.out.println("millis = " + millis);
  
          // 获得间隔的纳秒
          long nanos = duration.toNanos();
          System.out.println("nanos = " + nanos);
  
      }
  }
  ```

  其他方法：
  
  ![image-20230505083647918](http://www.iocaop.com/images/2023-05/image-20230505083647918.png)
