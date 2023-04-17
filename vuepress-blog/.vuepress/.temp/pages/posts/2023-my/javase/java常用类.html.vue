<template><div><p>黑马2022资料阶段一：java基础-第六章</p>
<h2 id="_4-1-string类" tabindex="-1"><a class="header-anchor" href="#_4-1-string类" aria-hidden="true">#</a> 4-1 String类</h2>
<h3 id="_03-概述" tabindex="-1"><a class="header-anchor" href="#_03-概述" aria-hidden="true">#</a> 03-概述</h3>
<p>java程序中，所有双引号字符串都是String类对象。</p>
<p>字符串是常量，创建后不能更改。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310004430528.png" alt="image-20230310004430528"></p>
<blockquote>
<p>String类内部有一个char[]，没有提供set方法给我们修改内存。上图代码中，只是讲栈内存中的s1变量指向了一个新的String类对象。</p>
</blockquote>
<h3 id="_04-string类的常见构造" tabindex="-1"><a class="header-anchor" href="#_04-string类的常见构造" aria-hidden="true">#</a> 04-String类的常见构造</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310004706791.png" alt="image-20230310004706791"></p>
<h3 id="_05-创建字符串对象的区别对比" tabindex="-1"><a class="header-anchor" href="#_05-创建字符串对象的区别对比" aria-hidden="true">#</a> 05-创建字符串对象的区别对比</h3>
<p>构造方法可以创建String对象，双引号也能直接创建字符串对象，有什么区别？</p>
<p>首先复习一下<code v-pre>==</code>比较，基本数据类型时比较的是值，引用数据类型比较的是地址。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310005844595.png" alt="image-20230310005844595"></p>
<p>以双引号方式给出的字符串，只要字符序列相同(顺序和大小写)，无论在代码中出现多少次，JVM都只会创建一个String对象，并在字符串常量池中维护。</p>
<blockquote>
<p>字符串常量池：当使用双引号创建字符串对象的时候，系统会检测该字符串是否在常量池中存在，如果存在则复用，不存在才创建。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310005600039.png" alt="image-20230310005600039"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310005808718.png" alt="image-20230310005808718"></p>
<h3 id="_06-string类常见面试题" tabindex="-1"><a class="header-anchor" href="#_06-string类常见面试题" aria-hidden="true">#</a> 06-String类常见面试题</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310010501497.png" alt="image-20230310010501497"></p>
<blockquote>
<p>为什么是2个？new一个，字符串&quot;abc&quot;本身是一个。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310010918256.png" alt="image-20230310010918256"></p>
<blockquote>
<p><em>Java 语言提供对字符串串联符号(&quot;+&quot;)以及将其他对象转换为字符串的特殊支持</em>。字符串串联是通过 StringBuilder或 StringBuffer类及其 append 方法实现的</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310011230679.png" alt="image-20230310011230679"></p>
<h2 id="_4-2-stringbuilder" tabindex="-1"><a class="header-anchor" href="#_4-2-stringbuilder" aria-hidden="true">#</a> 4-2 StringBuilder</h2>
<h3 id="_15-概述" tabindex="-1"><a class="header-anchor" href="#_15-概述" aria-hidden="true">#</a> 15-概述</h3>
<p>概述：可变字符串类，可以看做是一个String的容器。</p>
<p>学他干嘛：提高字符串操作效率。方法抽取快捷键ctrl+alt+m</p>
<p>String拼接：2933ms</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310011948990.png" alt="image-20230310011948990"></p>
<p>StringBuilder拼接：294ms</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012035703.png" alt="image-20230310012035703"></p>
<h3 id="_16-常用构造" tabindex="-1"><a class="header-anchor" href="#_16-常用构造" aria-hidden="true">#</a> 16-常用构造</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012219978.png" alt="image-20230310012219978"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012257883.png" alt="image-20230310012257883"></p>
<h3 id="_17-常用成员方法" tabindex="-1"><a class="header-anchor" href="#_17-常用成员方法" aria-hidden="true">#</a> 17-常用成员方法</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012342608.png" alt="image-20230310012342608"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012545022.png" alt="image-20230310012545022"></p>
<blockquote>
<p>append方法调用后返回的是调用该方法的StringBuilder对象的本身，所以可以链式调用。</p>
</blockquote>
<h3 id="_18-stringbuilder提高效率的原理图" tabindex="-1"><a class="header-anchor" href="#_18-stringbuilder提高效率的原理图" aria-hidden="true">#</a> 18-StringBuilder提高效率的原理图</h3>
<p>不用StringBuilder，用加号拼接，每次加号都会创建一个StringBuilder对象和一个String(因为接收的引用类型是String，所以会自动调用toString()方法)对象</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310013322142.png" alt="image-20230310013322142"></p>
<p>使用加号后，只会有一个StringBuilder对象，需要使用String，调用toString()方法即可</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310013507852.png" alt="image-20230310013507852"></p>
<h2 id="_5-1-arraylist" tabindex="-1"><a class="header-anchor" href="#_5-1-arraylist" aria-hidden="true">#</a> 5-1 ArrayList</h2>
<h3 id="_01-为什么用集合" tabindex="-1"><a class="header-anchor" href="#_01-为什么用集合" aria-hidden="true">#</a> 01-为什么用集合？</h3>
<p>数组不能动态改变大小，需要增加新数据时不能动态扩容。</p>
<p>集合特点：提供存储空间可变的存储模型，存储的数据容量可以发生改变。</p>
<p>集合和数组的区别：</p>
<ul>
<li>共同点：都是存储数据的容器</li>
<li>不同点：数组的容量是固定的，集合的容量是可变的。</li>
</ul>
<h3 id="_02-arraylist的构造方法和添加方法" tabindex="-1"><a class="header-anchor" href="#_02-arraylist的构造方法和添加方法" aria-hidden="true">#</a> 02-ArrayList的构造方法和添加方法</h3>
<p>简介：List接口的可调整大小的<span style="background-color:pink;">数组</span>实现。实现所有可选的列表操作，并允许所有元素，包括null。除了实现List接口之外，该类还提供了一些方法来操作内部用于存储列表的数组的大小。（该类大致等同于Vector，只是它是<span style="background-color:pink;">非同步</span>(线程不安全)的。）</p>
<p>构造方法：</p>
<table>
<thead>
<tr>
<th>构造方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>ArrayList()</td>
<td>构造一个初始容量为<span style="background-color:pink;">10</span>的空列表。(当超过容量时会自动扩容)</td>
</tr>
<tr>
<td>ArrayList(int initialCapacity)</td>
<td>指定容量</td>
</tr>
<tr>
<td>ArrayList(Collection&lt;?  extends E&gt; c)</td>
<td>按照集合的迭代器返回的顺序构造一个包含指定集合元素的列表。</td>
</tr>
</tbody>
</table>
<p>泛型如果不写，默认Object。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313214324735.png" alt="image-20230313214324735"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313214711977.png" alt="image-20230313214711977"></p>
<h2 id="_8-1api的基本使用与object类" tabindex="-1"><a class="header-anchor" href="#_8-1api的基本使用与object类" aria-hidden="true">#</a> 8-1API的基本使用与Object类</h2>
<h3 id="_06-object面试题" tabindex="-1"><a class="header-anchor" href="#_06-object面试题" aria-hidden="true">#</a> 06-Object面试题</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328235201345.png" alt="image-20230328235201345"></p>
<h3 id="_07-objects方法" tabindex="-1"><a class="header-anchor" href="#_07-objects方法" aria-hidden="true">#</a> 07-Objects方法</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230329001149676.png" alt="image-20230329001149676"></p>
<p>第二个头String方法，先判断参数1中的对象是否为<code v-pre>null</code>，不为空返回对象的<code v-pre>toString()</code>，为空则返回第二个参数的值。</p>
<h3 id="_08-bigdecimal构造" tabindex="-1"><a class="header-anchor" href="#_08-bigdecimal构造" aria-hidden="true">#</a> 08-BigDecimal构造</h3>
<p>想要<span style="background-color:pink;">精确计算</span>，应该使用<span style="background-color:pink;">字符串构造</span>，不然还是会不精确。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230329001606642.png" alt="image-20230329001606642"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230329001633703.png" alt="image-20230329001633703"></p>
<h3 id="_10-bigdecimal特殊方法" tabindex="-1"><a class="header-anchor" href="#_10-bigdecimal特殊方法" aria-hidden="true">#</a> 10-BigDecimal特殊方法</h3>
<p>BigDecimal是精确计算，如果出现除不尽的情况，会报错。需要手动指定。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230329001954468.png" alt="image-20230329001954468"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230329002034854.png" alt="image-20230329002034854"></p>
<h3 id="_11-基本数据类型包装类" tabindex="-1"><a class="header-anchor" href="#_11-基本数据类型包装类" aria-hidden="true">#</a> 11-基本数据类型包装类</h3>
<p>就是将基本类型包装成类。</p>
<p>好处：可以在对象中定义<span style="background-color:pink;">更多功能方法操作该数据</span>。</p>
<p>常用操作，基本数据类型和字符串之间的转换。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230329002422252.png" alt="image-20230329002422252"></p>
<h3 id="_12-integer获得对象" tabindex="-1"><a class="header-anchor" href="#_12-integer获得对象" aria-hidden="true">#</a> 12-Integer获得对象</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230329002634682.png" alt="image-20230329002634682"></p>
<h3 id="_13-integer自动装箱和自动拆箱" tabindex="-1"><a class="header-anchor" href="#_13-integer自动装箱和自动拆箱" aria-hidden="true">#</a> 13-Integer自动装箱和自动拆箱</h3>
<p>自动装箱：把一个基本数据类型变量对应包装类的时候(Integer i = 1;)，java底层会自动帮我们调用valueOf方法，创建Integer对象。</p>
<p>自动拆箱：把一个包装类变成基本数据类型(int i2 =i)</p>
<blockquote>
<p>需要注意的是，包装类型也是对象，在使用时需要进行非null判断。</p>
</blockquote>
<h3 id="_14-integer类型转换" tabindex="-1"><a class="header-anchor" href="#_14-integer类型转换" aria-hidden="true">#</a> 14-Integer类型转换</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230329003408221.png" alt="image-20230329003408221"></p>
</div></template>


