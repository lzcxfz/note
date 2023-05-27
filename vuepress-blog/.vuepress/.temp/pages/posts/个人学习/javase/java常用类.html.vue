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
<h3 id="_16-数组的高级操作-二分查找思路分析" tabindex="-1"><a class="header-anchor" href="#_16-数组的高级操作-二分查找思路分析" aria-hidden="true">#</a> 16-数组的高级操作-二分查找思路分析</h3>
<p>二分查找的前提条件：<span style="background-color:pink;">数组的元素需要按顺序排序好</span></p>
<h4 id="元素存在-要查值为3的索引。" tabindex="-1"><a class="header-anchor" href="#元素存在-要查值为3的索引。" aria-hidden="true">#</a> 元素存在-要查值为3的索引。</h4>
<p>思路：定义两个变量min和max，确定查找的范围。根据min和max计算中间点的位置，公式：<code v-pre>mid = (min+max)/2</code>(整数)，假设min是0，max是9，mid就是4。</p>
<ul>
<li>min是0，max是9，mid为4，大于3，所以后面的不需要了，max为mid-1=3</li>
</ul>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420215712098.png" alt="image-20230420215712098"></p>
<ul>
<li>
<p>min是0，max是原来的mid-1等于3，mid是1，小于3，所以前面的不要了，min等于mid+1=2</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420215919516.png" alt="image-20230420215919516"></p>
</li>
<li>
<p>min是2，max是3，mid是2，等于3，二分查找结束。</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420220316100.png" alt="image-20230420220316100"></p>
</li>
</ul>
<h4 id="元素不存在-查找值为11的元素索引" tabindex="-1"><a class="header-anchor" href="#元素不存在-查找值为11的元素索引" aria-hidden="true">#</a> 元素不存在-查找值为11的元素索引</h4>
<ul>
<li>
<p>min是0，max是9，mid是4，值5小于11，所以左边的不要了，min改为mid+1=5</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420221405866.png" alt="image-20230420221405866"></p>
</li>
<li>
<p>min是5，max是9，mid是7，值8小于11，左边不要了，min改为mid+1=8</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420221634664.png" alt="image-20230420221634664"></p>
</li>
<li>
<p>min是8，max是9，mid是8，值9小于11，左边不要了，min=mid+1=9</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420221618926.png" alt="image-20230420221618926"></p>
</li>
<li>
<p>min=max=mid=9，值10小于11，左边不要了，min=mid+1=10</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420221826553.png" alt="image-20230420221826553"></p>
</li>
<li>
<p>min是9，max是10，可以发现，min大于max，这时可以认为查询的元素不存在。</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420222031179.png" alt="image-20230420222031179"></p>
</li>
</ul>
<h3 id="_17-数组的高级操作-二分查找代码实现" tabindex="-1"><a class="header-anchor" href="#_17-数组的高级操作-二分查找代码实现" aria-hidden="true">#</a> 17-数组的高级操作-二分查找代码实现</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 二分查找
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2023/04/20
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BinarySearch</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 待查找的数组</span>
        <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token comment">// 待查找的元素</span>
        <span class="token keyword">int</span> number <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token function">binarySearchMethod</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"元素"</span><span class="token operator">+</span>number<span class="token operator">+</span><span class="token string">"的索引为:"</span><span class="token operator">+</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">binarySearchMethod</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 确定查找的范围</span>
        <span class="token keyword">int</span> min <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 查找的条件 min&lt;max 否则就是没找到</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>min <span class="token operator">&lt;</span>max<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 计算中间位置 位运算 右移一位就是除以2</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>min<span class="token operator">+</span>max<span class="token punctuation">)</span><span class="token operator">>></span><span class="token number">1</span><span class="token punctuation">;</span>

            <span class="token comment">// 分三种情况，在左边、在右边、找到了</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token operator">></span>number<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">// 在左边，右边的不要了，最大索引范围为中间位置左边一个</span>
                max <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token operator">&lt;</span>number<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">// 在右边，左边的不要了，最小索引范围为中间位置右边一个</span>
                min <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">==</span> number<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 没找到直接返回-1</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420230140520.png" alt="image-20230420230140520"></p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230420230155527.png" alt="image-20230420230155527"></p>
<h3 id="_18-数组的高级操作-冒泡排序思路分析" tabindex="-1"><a class="header-anchor" href="#_18-数组的高级操作-冒泡排序思路分析" aria-hidden="true">#</a> 18-数组的高级操作-冒泡排序思路分析</h3>
<p>相邻的数据<span style="background-color:pink;">两两比较</span>，小的放前面，大的放后面。</p>
<p>初始数据：<img src="http://www.iocaop.com/images/2023-04/image-20230421000624535.png" alt="image-20230421000624535"></p>
<p>期望数据：<img src="http://www.iocaop.com/images/2023-04/image-20230421000640440.png" alt="image-20230421000640440"></p>
<p>相邻的两个元素比较，把小的放左边，大的放右边。</p>
<ul>
<li>
<p>第一轮：可以把最大的冒泡到最右边</p>
<p>【3 5 2 1 4】</p>
<p>3 2 5 1 4</p>
<p>3 2 1 5 4</p>
<p>3 2 1 4 5</p>
</li>
<li>
<p>第二轮：把第二大的冒泡</p>
<p>【3 2 1 4】 5</p>
<p>​    2 3 1 4     5</p>
<p>​    2 1 3 4     5</p>
</li>
<li>
<p>第三轮</p>
<p>【2 1 3 】4 5</p>
<p>1  2  3     4 5</p>
</li>
<li>
<p>第四轮</p>
<p>【1 2 】3 4 5</p>
<p>​    1 2     3 4 5</p>
</li>
</ul>
<blockquote>
<p>总结：如果有n个元素需要进行排序，则需要进行n-1轮冒泡，每轮冒泡需要比较n-i次。i为第几轮。</p>
</blockquote>
<h3 id="_19-数组高级操作-冒泡排序代码实现" tabindex="-1"><a class="header-anchor" href="#_19-数组高级操作-冒泡排序代码实现" aria-hidden="true">#</a> 19-数组高级操作-冒泡排序代码实现</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 冒泡排序
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2023/04/21
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BubbleSort</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token function">bubbleSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">bubbleSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>j<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token operator">-</span>i<span class="token punctuation">;</span>j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token operator">></span>arr<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第"</span><span class="token operator">+</span>i<span class="token operator">+</span><span class="token string">"轮："</span><span class="token operator">+</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"排序后"</span><span class="token operator">+</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了更直观，打印最差的情况：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230421004844917.png" alt="image-20230421004844917"></p>
<h3 id="_20-递归-概念" tabindex="-1"><a class="header-anchor" href="#_20-递归-概念" aria-hidden="true">#</a> 20-递归-概念</h3>
<p>概述：方法定义中调用方法本身的现象。</p>
<p>思路：把复杂问题转为一个<span style="background-color:pink;">与原问题相似的规模较小的问题来求解</span>，递归策略只需少量的程序就可以描述出截图过程所需要的多次重复计算。</p>
<p>递归解决问题要找到2个内容：</p>
<ul>
<li>递归出口：否则会出现内存溢出</li>
<li>递归规则：与原问题相似的规模较小的问题</li>
</ul>
<p>求1-100的和：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 求1-100 传统写法
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/04/23
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyFactorialDemo01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sum<span class="token operator">+=</span>i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 求1-100 递归写法
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/04/23
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyFactorialDemo02</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token function">getSum</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getSum</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i<span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> i<span class="token operator">+</span><span class="token function">getSum</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_21-递归-求阶乘代码实现" tabindex="-1"><a class="header-anchor" href="#_21-递归-求阶乘代码实现" aria-hidden="true">#</a> 21-递归-求阶乘代码实现</h3>
<p>需求：用递归求5的阶乘，输出结果。</p>
<p>5! = 5*4*3*2*1</p>
<ul>
<li>递归的出口 1！=1，也就是一直拆分，直到乘1为止。</li>
<li>递归规则：n!=n*(n-1!),如5的阶乘等于5乘以4的阶乘：5!=5*4!</li>
</ul>
<p>代码实现：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 用递归求5的阶乘 5*4*3*2*1 = 120
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2023/04/25
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyFactorialDemo03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> result  <span class="token operator">=</span> <span class="token function">getResult</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getResult</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 递归出口</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i<span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 递归的规则 n! = n*(n-1)!</span>
        <span class="token keyword">return</span> i <span class="token operator">*</span> <span class="token function">getResult</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_22-递归-内存图" tabindex="-1"><a class="header-anchor" href="#_22-递归-内存图" aria-hidden="true">#</a> 22-递归-内存图</h3>
<p>上面的代码，如果递归没有出口，会发生什么？</p>
<p>栈溢出：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426133117389.png" alt="image-20230426133117389"></p>
<p>找递归规则的技巧:下一次调用一定比本次调用更靠近出口。</p>
<p>栈内存：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426133529175.png" alt="image-20230426133529175"></p>
<p>每次方法调用会压栈，调用结束返回时弹栈。如果递归没有出口，会一直调用，导致栈内存溢出。</p>
<p>返回时如图：颜色标记</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426134100346.png" alt="image-20230426134100346"></p>
<h3 id="_23-数组的高级操作-快排核心思路分析" tabindex="-1"><a class="header-anchor" href="#_23-数组的高级操作-快排核心思路分析" aria-hidden="true">#</a> 23-数组的高级操作-快排核心思路分析</h3>
<ul>
<li>在冒泡排序中一次循环结束，就确定了最大值和最大值的位置</li>
<li>快速排序中，每次递归都以<span style="background-color:pink;">第一个数为基准数</span>，找到数组中所有比它小的数和所有比它大的数，<span style="background-color:pink;">小的放左边，大的放右边</span>，来确定基准数的位置。</li>
</ul>
<p>假设有下面乱序的数组：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426230700798.png" alt="image-20230426230700798"></p>
<p>在一次递归后，应该会确定基准数6应该在数组的位置，且它左边的数都比他小(顺序不管)，它右边的数都比他大(顺序不管)。</p>
<ul>
<li>
<p>从右开始找，所以定义一个变量指向数组最大索引，开始找比6小的，找到后就停下来，不移动索引。第一次找到5比6小，停下来：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426231616203.png" alt="image-20230426231616203"></p>
</li>
<li>
<p>停下来后，就从左边开始找比6更大的，也是定义一个变量记录索引位置，第一次找到7比6大，停下来，</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426231827987.png" alt="image-20230426231827987"></p>
</li>
<li>
<p>交换两个索引位置的值：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426231915515.png" alt="image-20230426231915515"></p>
</li>
<li>
<p>交换完后，按照上面的方式继续找，从左边开始移动，找比6大的，从右变开始移动，找比6小的，第一次，找到4比6小，停下来：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426232102347.png" alt="image-20230426232102347"></p>
</li>
<li>
<p>停下来后，从左边开始移动，找比6大的，第一次找到9，停下来：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426232147622.png" alt="image-20230426232147622"></p>
</li>
<li>
<p>交换位置：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426232205220.png" alt="image-20230426232205220"></p>
</li>
<li>
<p>交换完，再从右变开始找比6小的，找到3，停下来：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426232251624.png" alt="image-20230426232251624"></p>
</li>
<li>
<p>停下来后从左往右找，发现两个索引变量重叠了：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426232328818.png" alt="image-20230426232328818"></p>
</li>
<li>
<p>当两个索引变量重叠后，基准数归位，也就是把基准数和当前索引位置的值交换：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230426232429270.png" alt="image-20230426232429270"></p>
</li>
<li>
<p>到此，一次递归结束，就确定了第一个基准数应该放的位置。</p>
</li>
</ul>
<h3 id="_24-数组的高级操作-快排核心代码实现" tabindex="-1"><a class="header-anchor" href="#_24-数组的高级操作-快排核心代码实现" aria-hidden="true">#</a> 24-数组的高级操作-快排核心代码实现</h3>
<p>先实现一次递归，基准数6在数组中应该存放的位置。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QuickSort</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 定义数组</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token function">quickSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 一次递归后，结果应该是确定了基准数6应该处于哪个位置，且左边的比6小，右边的比6大</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 快速排序 一次递归
     *
     * <span class="token keyword">@param</span> <span class="token parameter">arr</span>   数组
     * <span class="token keyword">@param</span> <span class="token parameter">left</span>  最小索引
     * <span class="token keyword">@param</span> <span class="token parameter">right</span> 最大索引
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">quickSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 从一次递归的最后一步，即两个索引重叠时可以得出循环次数：</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">!=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 从右往左找比基准数小的，可以得出以下循环，即：没找到一直移动索引，循环次数就是移动次数。找到了就停下来，即跳出循环</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                right<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 上一个循环，从右往左找到比6小的，找到后停下来，就要移动左边索引，从左往右找比6大的,没找到就一直移动索引</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">>=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                left<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 走到这一步，说明从右往左已经找到比6小的，从左往右也已经找到比6大的，此时交换两个索引位置的值</span>
            <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 两个索引重叠时，基准数归位，即交换基准数和当前索引位置的值</span>
        <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
        arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意，在移动指针后，需要处理等于的情况。即：这里遗留一个问题，即使元素没重复，不加=依然是错的，没找到原因。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 处理等于的情况  &lt;=</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
<span class="token comment">// 处理等于的情况  &lt;=</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">>=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>递归一次后，记得把基准数归位。</p>
<p>经过调试，发现问题，在做比较时，左指针left初始为0，也就是拿arr[0]和基准数自己比较了一次，导致了交换。</p>
<p>解决：要么加上= ，要么初始指针+1。</p>
<p><img src="http://www.iocaop.com/images/2023-04/9ecc1bf6d25fcf1af87963d8af6d926.png" alt="9ecc1bf6d25fcf1af87963d8af6d926"></p>
<p><img src="http://www.iocaop.com/images/2023-04/b74cf9585b839b5433b428aca739e73.png" alt="b74cf9585b839b5433b428aca739e73"></p>
<h3 id="_25-数组的高级操作-快排完整实现" tabindex="-1"><a class="header-anchor" href="#_25-数组的高级操作-快排完整实现" aria-hidden="true">#</a> 25-数组的高级操作-快排完整实现</h3>
<p>上面代码，也就是快排中的代码只调用一次后，形成的效果如下图：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230427013502785.png" alt="image-20230427013502785"></p>
<p>接下来我们就要再次选取基准数，确定基准数位置，我们选择下标为0的，也就是3为基准数，在整个范围中来确定它的位置。</p>
<p>依然是从右往左找，即arr[arr.length-1]开始，即最右的位置往左移动，遇到比3小的则停下来，再从左往右找到比3大的数停下来，左交换。</p>
<p>不难发现，经过第一次循环操作，现在根本不需要从最右边开始找，因为6右边的都大于6，左边都小于6，可以得到0索引的值小于6，即3&lt;6，而6右边都大于6，得6右边都大于3。</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230427014011700.png" alt="image-20230427014011700"></p>
<p>右边的也是同理：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230427014237434.png" alt="image-20230427014237434"></p>
<p>什么时候递归结束？</p>
<p>当3元素位置确定后，下一次需要递归的范围如下图：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230427014330165.png" alt="image-20230427014330165"></p>
<p>再确定2元素的位置，得下一次需要递归将基准数归位的范围：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230427014446314.png" alt="image-20230427014446314"></p>
<p>1元素位置确定后，下一次基准数归位需要递归的范围：</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230427014542989.png" alt="image-20230427014542989"></p>
<p>可以看到，数组越界了，这时候应该结束递归了。即left&gt;right时结束递归。</p>
<p>代码实现：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QuickSort</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 定义数组</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token function">quickSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 一次递归后，结果应该是确定了基准数6应该处于哪个位置，且左边的比6小，右边的比6大</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 快速排序 一次递归
     *
     * <span class="token keyword">@param</span> <span class="token parameter">arr</span>   数组
     * <span class="token keyword">@param</span> <span class="token parameter">left</span>  最小索引
     * <span class="token keyword">@param</span> <span class="token parameter">right</span> 最大索引
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">quickSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>left<span class="token operator">></span>right<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">int</span> left0 <span class="token operator">=</span> left<span class="token punctuation">;</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> right<span class="token punctuation">;</span>
        <span class="token keyword">int</span> baseNumber <span class="token operator">=</span> arr<span class="token punctuation">[</span>left0<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// 从一次递归的最后一步，即两个索引重叠时可以得出循环次数：</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">!=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 从右往左找比基准数小的，可以得出以下循环，即：没找到一直移动索引，循环次数就是移动次数。找到了就停下来，即跳出循环</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>baseNumber <span class="token operator">&lt;=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                right<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 上一个循环，从右往左找到比6小的，找到后停下来，就要移动左边索引，从左往右找比6大的,没找到就一直移动索引</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>baseNumber <span class="token operator">>=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                left<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 走到这一步，说明从右往左已经找到比6小的，从左往右也已经找到比6大的，此时交换两个索引位置的值</span>
            <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 两个索引重叠时，基准数归位，即交换基准数和当前索引位置的值</span>
        <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
        arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> baseNumber<span class="token punctuation">;</span>
        arr<span class="token punctuation">[</span>left0<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>

        <span class="token comment">// 递归处理左边</span>
        <span class="token function">quickSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>left0<span class="token punctuation">,</span>left<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 递归处理右边</span>
        <span class="token function">quickSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>left<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，进入方法时判断递归条件，定义了left0和max记录基准数位置和递归索引最大值。为什么要这样？因为基准数位置不是每次都是0索引，当确定第一次递归，即6元素右边的元素的范围时，基准数位置每次都在变化。至于max，范围有不一样的情况，6左边的元素确定位置时没必要从数组尾部开始移动，直接从6元素索引-1的位置移动即可。</p>
<h3 id="_26-arrays" tabindex="-1"><a class="header-anchor" href="#_26-arrays" aria-hidden="true">#</a> 26-Arrays</h3>
<p>没有构造，全是静态方法。</p>
<ul>
<li>
<p>toString</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230427015736962.png" alt="image-20230427015736962"></p>
</li>
<li>
<p>二分查找，数组应该是顺序的</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230427015825996.png" alt="image-20230427015825996"></p>
</li>
<li>
<p>排序，底层是快排</p>
<p><img src="http://www.iocaop.com/images/2023-04/image-20230427015947531.png" alt="image-20230427015947531"></p>
</li>
</ul>
<h2 id="_8-4-时间日期类" tabindex="-1"><a class="header-anchor" href="#_8-4-时间日期类" aria-hidden="true">#</a> 8-4-时间日期类</h2>
<h3 id="_01-时间概述" tabindex="-1"><a class="header-anchor" href="#_01-时间概述" aria-hidden="true">#</a> 01-时间概述</h3>
<p>世界标准时间：格林威治天文台时间，简称GMT。现在已经有点偏差了，现在标准时间是原子钟提供的时间。</p>
<p>中国时间：世界标准时间+8小时</p>
<p>计算机中的时间原点：1970年1月1日 00:00:00 C语言的生日。了解更多：<a href='http://www.binsky.net/index.php/287.html'>点击跳转</a></p>
<h3 id="_02-date类概述和构造方法" tabindex="-1"><a class="header-anchor" href="#_02-date类概述和构造方法" aria-hidden="true">#</a> 02-Date类概述和构造方法</h3>
<p>Date代表了一个特定的时间，精确到毫秒。</p>
<p>空参构造，表示<span style="background-color:pink;">电脑当前时间</span>。</p>
<p>带参构造，从计算机的时间原点,过了指定<span style="background-color:pink;">毫秒</span>的那个时间</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DateDemo01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 电脑的当前时间</span>
        <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Thu May 04 13:36:14 CST 2023</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 计算机的时间原点,过了指定毫秒的那个时间</span>
        <span class="token class-name">Date</span> date1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">0L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Thu Jan 01 08:00:00 CST 1970  为什么是8点？东八区</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>date1<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 1970年早上九点</span>
        <span class="token class-name">Date</span> date2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">3600</span><span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Thu Jan 01 09:00:00 CST 1970</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>date2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_03-date成员方法" tabindex="-1"><a class="header-anchor" href="#_03-date成员方法" aria-hidden="true">#</a> 03-Date成员方法</h3>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230504133902128.png" alt="image-20230504133902128"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DateDemo02</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Thu May 04 13:42:07 CST 2023</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 获取毫秒数</span>
        <span class="token keyword">long</span> time <span class="token operator">=</span> date<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 1683178927205</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 与下面这条等价</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置时间毫秒数</span>
        date<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span><span class="token number">0L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Thu Jan 01 08:00:00 CST 1970</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_04-simpledateformat" tabindex="-1"><a class="header-anchor" href="#_04-simpledateformat" aria-hidden="true">#</a> 04-SimpleDateFormat</h3>
<p>可以对Date对象进行<span style="background-color:pink;">格式化和解析</span>。</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230504134658748.png" alt="image-20230504134658748"></p>
<p>常用模式字母对应关系如下：</p>
<ul>
<li>y  年</li>
<li>M  月</li>
<li>d  日</li>
<li>H  时</li>
<li>m  分</li>
<li>s  秒</li>
</ul>
<p>如：</p>
<ul>
<li>2020-11-11 13:27:06 对应模式：yyyy-MM-dd HH:mm:ss</li>
<li>2020年11月11日 13:27:06 对应模式yyyy年MM月dd日 HH:mm:ss</li>
</ul>
<p>SimpleDateFormat的构造方法：</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230504135102568.png" alt="image-20230504135102568"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DateDemo03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建时间</span>
        <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建日期格式</span>
        <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">"yyyy年MM月dd日 HH:mm:ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建好了，就需要调用成员方法进行格式化和解析：</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230504135404024.png" alt="image-20230504135404024"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DateDemo03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建时间</span>
        <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建日期格式</span>
        <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">"yyyy年MM月dd日 HH:mm:ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 格式化</span>
        <span class="token class-name">String</span> format <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2023年05月04日 13:54:56</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>format<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>反过来也是一样，将字符串解析成Date对象：</p>
<p>需要注意sdf的格式需要和时间字符串格式一致，否则会报异常。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DateDemo03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建时间</span>
        <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建日期格式</span>
        <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">"yyyy年MM月dd日 HH:mm:ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 格式化</span>
        <span class="token class-name">String</span> format <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2023年05月04日 13:54:56</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>format<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 解析</span>
        <span class="token class-name">Date</span> parse <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>format<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Thu May 04 13:56:07 CST 2023</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>parse<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_05-练习" tabindex="-1"><a class="header-anchor" href="#_05-练习" aria-hidden="true">#</a> 05-练习</h3>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230504140615023.png" alt="image-20230504140615023"></p>
<p>付款时间：2020年11月11日 0:03:47和2020年11月11日 0:10:11哪个秒杀成功？</p>
<p>需要判断时间是否在秒杀范围，如何判断？可以转成毫秒值进行比较。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DateDemo04</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 秒杀活动的开始时间和结束时间字符串</span>
        <span class="token class-name">String</span> start <span class="token operator">=</span> <span class="token string">"2020年11月11日 0:0:0"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> end <span class="token operator">=</span> <span class="token string">"2020年11月11日 0:10:0"</span><span class="token punctuation">;</span>

        <span class="token comment">// 两个下单时间字符串</span>
        <span class="token class-name">String</span> one <span class="token operator">=</span> <span class="token string">"2020年11月11日 0:03:47"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> two <span class="token operator">=</span> <span class="token string">"2020年11月11日 0:10:11"</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建时间格式</span>
        <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">"yyyy年MM月dd日 HH:mm:ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 解析城Date对象并获取毫秒值</span>
        <span class="token keyword">long</span> startTime <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> endTime <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>end<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> oneTime <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>one<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> twoTime <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>two<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>oneTime <span class="token operator">&lt;=</span> endTime <span class="token operator">&amp;&amp;</span> oneTime <span class="token operator">>=</span> startTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"one秒杀成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"one秒杀失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>twoTime <span class="token operator">&lt;=</span> endTime <span class="token operator">&amp;&amp;</span> twoTime <span class="token operator">>=</span> startTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"two秒杀成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"two秒杀失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230504141658583.png" alt="image-20230504141658583"></p>
<h3 id="_06-jdk8的体验" tabindex="-1"><a class="header-anchor" href="#_06-jdk8的体验" aria-hidden="true">#</a> 06-JDK8的体验</h3>
<p>假如有字符串表示的时间 2020年11月11日 0:00:00  现在需要将时间往后一天。在jdk7中需要这样做：</p>
<p>在Date类中没有提供相应的方法，需要获取Date对应的毫秒数手动计算进行相加：</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230504225523893.png" alt="image-20230504225523893"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">jdk7Time</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> strTime <span class="token operator">=</span> <span class="token string">"2020年11月11日 0:00:00"</span><span class="token punctuation">;</span>
        <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">"yyyy年MM月dd日 HH:mm:ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Date</span> date <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>strTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> time <span class="token operator">=</span> date<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        date<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span>time<span class="token operator">+</span><span class="token number">1000</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2020年11月12日 00:00:00</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sdf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而在jdk8中，可以使用<code v-pre>LocalDateTime</code>中的方法进行计算：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">jdk8Time</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> strTime <span class="token operator">=</span> <span class="token string">"2020年11月11日 00:00:00"</span><span class="token punctuation">;</span>
        <span class="token class-name">DateTimeFormatter</span> dateTimeFormatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">"yyyy年MM月dd日 HH:mm:ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>strTime<span class="token punctuation">,</span> dateTimeFormatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> newLocalDateTime <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">plusDays</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> newLocalDateTime<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>dateTimeFormatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2020年11月12日 00:00:00</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，jdk8格式化要严格一点：保留两位，否则报错。</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230504230437046.png" alt="image-20230504230437046"></p>
<h3 id="_07-jdk8新增时间类-获取时间对象" tabindex="-1"><a class="header-anchor" href="#_07-jdk8新增时间类-获取时间对象" aria-hidden="true">#</a> 07-JDK8新增时间类-获取时间对象</h3>
<p>在jdk8，jdk7中的Date被拆分成了三个类：<img src="http://www.iocaop.com/images/2023-05/image-20230504230845577.png" alt="image-20230504230845577"></p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230504230955007.png" alt="image-20230504230955007"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDK8DateDemo02</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDateTime</span> now <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2023-05-04T23:12:45.785872500</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 如果写错，会报错 如13月 32日 等</span>
        <span class="token class-name">LocalDateTime</span> time <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2020</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2020-11-11T01:01:01</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_08-获取时间中的每个值" tabindex="-1"><a class="header-anchor" href="#_08-获取时间中的每个值" aria-hidden="true">#</a> 08-获取时间中的每个值</h3>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505065717735.png" alt="image-20230505065717735"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * jdk8 获取时间中的每个值
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2023/05/05
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDK8DateDemo03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2020</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获取年</span>
        <span class="token keyword">int</span> year <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"year = "</span> <span class="token operator">+</span> year<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 月</span>
        <span class="token class-name">Month</span> month <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"month = "</span> <span class="token operator">+</span> month<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> monthValue <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">getMonthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"monthValue = "</span> <span class="token operator">+</span> monthValue<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 日</span>
        <span class="token keyword">int</span> dayOfMonth <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"dayOfMonth = "</span> <span class="token operator">+</span> dayOfMonth<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 星期</span>
        <span class="token class-name">DayOfWeek</span> dayOfWeek <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">getDayOfWeek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"dayOfWeek = "</span> <span class="token operator">+</span> dayOfWeek<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> dayOfYear <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">getDayOfYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"dayOfYear = "</span> <span class="token operator">+</span> dayOfYear<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 小时</span>
        <span class="token keyword">int</span> hour <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">getHour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"hour = "</span> <span class="token operator">+</span> hour<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//分钟</span>
        <span class="token keyword">int</span> minute <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">getMinute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"minute = "</span> <span class="token operator">+</span> minute<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_09-时间转换方法" tabindex="-1"><a class="header-anchor" href="#_09-时间转换方法" aria-hidden="true">#</a> 09-时间转换方法</h3>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505070958423.png" alt="image-20230505070958423"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * jdk8 时间转换方法
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2023/05/05
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDK8DateDemo04</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDateTime</span> now <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"now = "</span> <span class="token operator">+</span> now<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDate</span> localDate <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">toLocalDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"localDate = "</span> <span class="token operator">+</span> localDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalTime</span> localTime <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">toLocalTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"localTime = "</span> <span class="token operator">+</span> localTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505071139338.png" alt="image-20230505071139338"></p>
<h3 id="_10-格式化和解析" tabindex="-1"><a class="header-anchor" href="#_10-格式化和解析" aria-hidden="true">#</a> 10-格式化和解析</h3>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505071438756.png" alt="image-20230505071438756"></p>
<p>在jdk7中，日期格式化器是<code v-pre>SimpleDateFormat</code>，而在jdk8中是<code v-pre>DateTimeFormatter</code></p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505071502212.png" alt="image-20230505071502212"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> strTime <span class="token operator">=</span> <span class="token string">"2020年11月11日 11:11:11"</span><span class="token punctuation">;</span>
        <span class="token class-name">DateTimeFormatter</span> dateTimeFormatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">"yyyy年MM月dd日 HH:mm:ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> dateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>strTime<span class="token punctuation">,</span> dateTimeFormatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"dateTime = "</span> <span class="token operator">+</span> dateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">format</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDateTime</span> now <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 直接输出  now = 2023-05-05T07:22:50.455788700</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"now = "</span> <span class="token operator">+</span> now<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 格式化输出  format = 2023年05月05日 07:22:50</span>
        <span class="token class-name">DateTimeFormatter</span> dateTimeFormatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">"yyyy年MM月dd日 HH:mm:ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> format <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>dateTimeFormatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"format = "</span> <span class="token operator">+</span> format<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-plus系列方法" tabindex="-1"><a class="header-anchor" href="#_11-plus系列方法" aria-hidden="true">#</a> 11-plus系列方法</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDK8DateDemo06</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDateTime</span> now <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> years2024 <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">plusYears</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"years2024 = "</span> <span class="token operator">+</span> years2024<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span>  years2022<span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">plusYears</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"years2022 = "</span> <span class="token operator">+</span> years2022<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505073535041.png" alt="image-20230505073535041"></p>
<blockquote>
<p>需要注意的就是，参数可以是正数也可以是负数。正数则往后一年，负数则是前一年。</p>
</blockquote>
<p>类似方法：</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505073618861.png" alt="image-20230505073618861"></p>
<h3 id="_12-minus系列方法" tabindex="-1"><a class="header-anchor" href="#_12-minus系列方法" aria-hidden="true">#</a> 12-minus系列方法</h3>
<p>与plus方法相反，用法一样。一个加，一个减。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDK8DateDemo07</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDateTime</span> now <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> year2022 <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">minusYears</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"year2022 = "</span> <span class="token operator">+</span> year2022<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> year2024 <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">minusYears</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"year2024 = "</span> <span class="token operator">+</span> year2024<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505074401862.png" alt="image-20230505074401862"></p>
<blockquote>
<p>参数是正数则是以前的时间，为负数则是以后的时间。</p>
</blockquote>
<p>类似的方法还有：</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505074434754.png" alt="image-20230505074434754"></p>
<h3 id="_13-with系列方法" tabindex="-1"><a class="header-anchor" href="#_13-with系列方法" aria-hidden="true">#</a> 13-with系列方法</h3>
<p>直接修改时间</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505075507734.png" alt="image-20230505075507734"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDK8DateDemo08</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDateTime</span> now <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"now = "</span> <span class="token operator">+</span> now<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">withYear</span><span class="token punctuation">(</span><span class="token number">2222</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"localDateTime = "</span> <span class="token operator">+</span> localDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> localDateTime1 <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">withMonth</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505075455470.png" alt="image-20230505075455470"></p>
<blockquote>
<p>需要注意，如果超出范围，会报异常。<span style="background-color:pink;">plus、minus、with方法不会修改原来的对象，而是返回一个新的时间对象，原来的对象还是原来的时间</span></p>
</blockquote>
<h3 id="_14-时间间隔对象" tabindex="-1"><a class="header-anchor" href="#_14-时间间隔对象" aria-hidden="true">#</a> 14-时间间隔对象</h3>
<ul>
<li>
<p>Period</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505082911741.png" alt="image-20230505082911741"></p>
<p>传入两个<code v-pre>LocalDate</code>对象，获得时间间隔</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDK8DateDemo09</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDate</span> now <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDate</span> localDate2022 <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2020</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Period</span> period <span class="token operator">=</span> <span class="token class-name">Period</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>localDate2022<span class="token punctuation">,</span> now<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// period = P2Y5M24D</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"period = "</span> <span class="token operator">+</span> period<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 获得间隔的年数</span>
        <span class="token keyword">int</span> years <span class="token operator">=</span> period<span class="token punctuation">.</span><span class="token function">getYears</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"years = "</span> <span class="token operator">+</span> years<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获得间隔的月数</span>
        <span class="token keyword">int</span> months <span class="token operator">=</span> period<span class="token punctuation">.</span><span class="token function">getMonths</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"months = "</span> <span class="token operator">+</span> months<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获得间隔的天数</span>
        <span class="token keyword">int</span> days <span class="token operator">=</span> period<span class="token punctuation">.</span><span class="token function">getDays</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"days = "</span> <span class="token operator">+</span> days<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Duration</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505083232993.png" alt="image-20230505083232993"></p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505093600988.png" alt="image-20230505093600988"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDK8DateDemo10</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDateTime</span> now <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2020</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Duration</span> duration <span class="token operator">=</span> <span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>now<span class="token punctuation">,</span> localDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// duration = PT-21717H-23M-19.7687483S</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"duration = "</span> <span class="token operator">+</span> duration<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获得间隔的秒</span>
        <span class="token keyword">long</span> seconds <span class="token operator">=</span> duration<span class="token punctuation">.</span><span class="token function">toSeconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"seconds = "</span> <span class="token operator">+</span> seconds<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获得间隔的微秒</span>
        <span class="token keyword">long</span> millis <span class="token operator">=</span> duration<span class="token punctuation">.</span><span class="token function">toMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"millis = "</span> <span class="token operator">+</span> millis<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获得间隔的纳秒</span>
        <span class="token keyword">long</span> nanos <span class="token operator">=</span> duration<span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"nanos = "</span> <span class="token operator">+</span> nanos<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他方法：</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505083647918.png" alt="image-20230505083647918"></p>
</li>
</ul>
<h2 id="_8-5-异常" tabindex="-1"><a class="header-anchor" href="#_8-5-异常" aria-hidden="true">#</a> 8-5-异常</h2>
<h3 id="_16-异常的体系和异常的分类" tabindex="-1"><a class="header-anchor" href="#_16-异常的体系和异常的分类" aria-hidden="true">#</a> 16-异常的体系和异常的分类</h3>
<p>异常：程序中出现了不正常的情况，程序在执行过程中出现非正常的情况，最终<span style="background-color:pink;">会导致jvm非正常停止</span>。</p>
<blockquote>
<p>注意：语法错误不算在异常体系中。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505095306158.png" alt="image-20230505095306158"></p>
<ul>
<li>Error：严重问题，通过代码无法处理，比如内存溢出</li>
<li>Exception：称为异常类，表示程序本身可以处理的问题
<ul>
<li>RuntimeException及其子类：运行时异常。（空指针异常，数组越界异常）。</li>
<li>除RuntimeException之外所有的异常：编译期间必须处理的，否则程序不能通过编译。</li>
</ul>
</li>
</ul>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505095658693.png" alt="image-20230505095658693"></p>
<p>运行时异常和编译时异常：</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505100102940.png" alt="image-20230505100102940"></p>
<h3 id="_17-虚拟机默认处理异常的方式" tabindex="-1"><a class="header-anchor" href="#_17-虚拟机默认处理异常的方式" aria-hidden="true">#</a> 17-虚拟机默认处理异常的方式</h3>
<p>思考：为什么出现异常时，控制台会出现红色警告？</p>
<p>在出现异常时，出现什么异常，就会在出现异常的位置创建对应的异常对象。</p>
<p>创建完异常对象后：</p>
<ul>
<li>首先会看程序中有没有自己处理异常的代码</li>
<li>如果么有就交给本方法的调用者处理</li>
<li>如果还是没有，最终这个异常交给虚拟机默认处理</li>
<li>JVM默认处理异常做了什么？</li>
</ul>
<p>JVM默认处理异常：</p>
<ul>
<li>将异常名称、异常信息、异常出现的位置等信息以红色字体输出在控制台</li>
<li>停止程序运行。（哪里出现异常，程序就在哪里停止）</li>
</ul>
<h3 id="_18-throws声明异常" tabindex="-1"><a class="header-anchor" href="#_18-throws声明异常" aria-hidden="true">#</a> 18-throws声明异常</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 异常demo06
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/05/05
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionDemo06</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
        <span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 如果出现异常，不处理，则会交给虚拟机默认处理</span>
        <span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     *
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">ParseException</span></span> 用于告知调用者，调用该方法将会出现异常，如果没有出现，程序照常运行，如果出现异常，异常由调用者处理
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
        <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">"yyyy年MM月dd日 HH:mm:ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">"2020年11月11日 11:11:11"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     *
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> 用于告知调用者，调用该方法将会出现异常，如果没有出现，程序照常运行，如果出现异常，异常由调用者处理
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> length <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_19-声明异常的注意事项" tabindex="-1"><a class="header-anchor" href="#_19-声明异常的注意事项" aria-hidden="true">#</a> 19-声明异常的注意事项</h3>
<p>如果是运行时异常，<code v-pre>throws</code>可以省略不写，如果是编译时异常，则必须要写。</p>
<p>运行时异常，省略不写，没问题：</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505111247603.png" alt="image-20230505111247603"></p>
<p>编译时异常，省略不写，报红，必须手动<code v-pre>throws</code>：</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505111305393.png" alt="image-20230505111305393"></p>
<h3 id="_20-throw抛出异常" tabindex="-1"><a class="header-anchor" href="#_20-throw抛出异常" aria-hidden="true">#</a> 20-throw抛出异常</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 异常demo01
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/05/05
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionDemo01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"哈哈哈1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"哈哈哈2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"哈哈哈3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 代码执行到这，手动抛出了运行时异常，并且自己没有处理，交给了jvm默认处理。下面的代码不会再执行，且编译会提示无法访问的语句</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"哈哈哈4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>throws和throw区别</p>
<p>throws：</p>
<ul>
<li>用在方法声明后面，跟的是异常类名</li>
<li>表示声明异常，告知调用者，调用该方法可能会出现这样的异常</li>
</ul>
<p>throw：</p>
<ul>
<li>用在方法体内，跟的是异常对象名。</li>
<li>表示手动抛出异常对象，由方法体内的语句处理。</li>
</ul>
<p>抛出异常的意义：</p>
<ul>
<li>在方法中，如果出现业务错误或参数错误，没有继续运行下去的意义，则采取抛出处理，让改方法结束。</li>
<li>告知调用者该方法出现了问题。</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionDemo02</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        int[] arr = {1,2,3,4,5};</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token function">printArr</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printArr</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"数组不能为null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Arrays.toString(arr) = "</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505113132857.png" alt="image-20230505113132857"></p>
<h3 id="_21-try-catch" tabindex="-1"><a class="header-anchor" href="#_21-try-catch" aria-hidden="true">#</a> 21-try...catch</h3>
<p>目的：为了让程序继续往下执行。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 异常demo02
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/05/05
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionDemo02</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        int[] arr = {1,2,3,4,5};</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// 自己处理异常，目的就是为了让代码不终止，继续往下执行。</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token comment">// 有可能出现异常的代码</span>
            <span class="token function">printArr</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">RuntimeException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 如果出现异常，打印一句话</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"参数不能为null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 测试后面的代码会不会执行</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"哈哈哈"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printArr</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"数组不能为null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Arrays.toString(arr) = "</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_22-try-catch常见问题" tabindex="-1"><a class="header-anchor" href="#_22-try-catch常见问题" aria-hidden="true">#</a> 22-try...catch常见问题</h3>
<ul>
<li>
<p>如果try中没有遇到问题，怎么执行？</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionDemo03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> line <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"测试123"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"出现异常咯"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"测试456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505201705165.png" alt="image-20230505201705165"></p>
<p>正常执行，把try中的代码执行完，再执行try...catch体系外的代码，catch中的代码不会执行。</p>
</li>
<li>
<p>如果try中遇到了问题，那么try下面的代码还会执行吗？</p>
<p>和上面一样的代码。</p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505201740019.png" alt="image-20230505201740019"></p>
<p>try中，出现异常的代码后面的都不执行了，跳到catch块中执行，执行完以后再执行try...catch体系外的代码</p>
</li>
<li>
<p>如果出现的问题没有被捕获，那么程序如何运行？</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionDemo03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> line <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"测试123"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NullPointerException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"出现异常咯"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"测试456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505202114735.png" alt="image-20230505202114735"></p>
<p>没有被捕获，则会交给虚拟机默认处理</p>
</li>
<li>
<p>同时有可能出现多个异常，怎么处理？</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionDemo03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> line <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"测试123"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"出现number异常咯"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ArithmeticException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"出现zero异常咯"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"测试456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505202404503.png" alt="image-20230505202404503"></p>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505202344485.png" alt="image-20230505202344485"></p>
<p>需要多个catch块来捕获，或者直接捕获父类异常<code v-pre>Exception</code>，但需要根据实际业务来捕获，是否需要分情况处理异常。</p>
</li>
</ul>
<h3 id="_23-throwable的成员方法" tabindex="-1"><a class="header-anchor" href="#_23-throwable的成员方法" aria-hidden="true">#</a> 23-Throwable的成员方法</h3>
<p><img src="http://www.iocaop.com/images/2023-05/image-20230505205852589.png" alt="image-20230505205852589"></p>
<p>这是异常的最顶级父类的成员方法，所以所有的异常都可以调用这三个方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionDemo04</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"arr[10] = "</span> <span class="token operator">+</span> arr<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 这不是虚拟机异常默认处理方式，打印完后，下面的代码还会执行</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"e.toString() = "</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"e.getMessage() = "</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505210253601.png" alt="image-20230505210253601"></p>
<blockquote>
<p>选定代码后可以按快捷键ctrl+alt+t快捷生成try...catch代码块</p>
</blockquote>
<h3 id="_24-异常的小练习" tabindex="-1"><a class="header-anchor" href="#_24-异常的小练习" aria-hidden="true">#</a> 24-异常的小练习</h3>
<p>需求：键盘录入学生的姓名和年龄，其中年龄为18-25岁，超出这个范围是异常数据，不能赋值，需要重新录入，一直到录入正确为止。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionDemo05</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">Student</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        student<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"赖卓成"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> line <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                age <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>age <span class="token operator">&lt;</span> <span class="token number">18</span> <span class="token operator">||</span> age <span class="token operator">></span> <span class="token number">25</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"请输入18-25范围的年龄"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span> numberFormatException<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入一个整数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">RuntimeException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            student<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Data</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505211724603.png" alt="image-20230505211724603"></p>
<h3 id="_25-自定义异常" tabindex="-1"><a class="header-anchor" href="#_25-自定义异常" aria-hidden="true">#</a> 25-自定义异常</h3>
<p>上面练习的例子中，当年龄超出范围时，抛出的是<code v-pre>RuntimeException</code>，范围太大了，需要自定义异常。</p>
<p>自定义异常需要继承<code v-pre>RuntimeException</code>，只需要定义好构造方法就行了，如果有其他字段需求，可以增加，如异常码、异常信息等。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AgeOutOfRangeException</span> <span class="token keyword">extends</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">AgeOutOfRangeException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">AgeOutOfRangeException</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-05/image-20230505212529737.png" alt="image-20230505212529737"></p>
</div></template>


