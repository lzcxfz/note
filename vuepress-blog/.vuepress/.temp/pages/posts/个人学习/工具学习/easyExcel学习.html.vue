<template><div><p>相关视频：<a href='https://www.bilibili.com/video/BV1C7411275q?p=2&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a></p>
<p>参考文档：<a href='http://www.iocaop.com/posts/2022-my/%E8%B5%84%E6%96%99/EasyExcel.html'>点击跳转</a></p>
<h2 id="apache-poi" tabindex="-1"><a class="header-anchor" href="#apache-poi" aria-hidden="true">#</a> Apache POI</h2>
<ul>
<li>学习成本高（分SAX、DOM模式，复杂）</li>
<li>内存消耗大、读写大文件容易OOM（userModel模式上手简单内存消耗大）</li>
<li>代码书写冗余</li>
<li>功能强大</li>
</ul>
<blockquote>
<p>总的来说，简单写法重度依赖内存、复杂写法学习成本高。</p>
</blockquote>
<h2 id="easyexcel" tabindex="-1"><a class="header-anchor" href="#easyexcel" aria-hidden="true">#</a> EasyExcel</h2>
<ul>
<li>重写了POI对07版Excel的解析，降低内存消耗。03版Excel还是依赖了POI的SAX模式</li>
<li>做了模型转换的封装，开发方便</li>
<li>只能操作Excel</li>
<li>不能读取图片</li>
</ul>
<p>​	<a href='https://easyexcel.opensource.alibaba.com/'>官方文档</a></p>
<h2 id="简单的读" tabindex="-1"><a class="header-anchor" href="#简单的读" aria-hidden="true">#</a> 简单的读</h2>
<p>准备一个Excel:</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091816226.png" alt="image-20220909181658117"></p>
<p>创建项目，导入依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.18.24<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>provided<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.13.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>easyexcel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.1.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建实体类，用于存储读取到的数据:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 学生
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/09/09
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 名字
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 性别
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> gender<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 生日
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> brithday<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写测试方法:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 一个Excel就是一个工作簿(workBook)
     * 一个工作簿中可以有多个工作表(workSheet)
     */</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token comment">// 1.获得一个工作簿</span>
        <span class="token class-name">ExcelReaderBuilder</span> readerBuilder <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token string">"杭州黑马在线202003班学员信息表.xlsx"</span><span class="token punctuation">,</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StudentListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 2.获得一个工作表，默认第一个工作表</span>
        <span class="token class-name">ExcelReaderSheetBuilder</span> sheet <span class="token operator">=</span> readerBuilder<span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 3.读取数据</span>
        sheet<span class="token punctuation">.</span><span class="token function">doRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建监听器类，实现ReadListener&lt;泛型&gt;接口:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentListener</span> <span class="token keyword">implements</span> <span class="token class-name">ReadListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Student</span> data<span class="token punctuation">,</span> <span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterAllAnalysed</span><span class="token punctuation">(</span><span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091819821.png" alt="image-20220909181903772"></p>
<p>说明</p>
<p>EasyExcel.read()方法重载了很多次，这里使用的方法如下：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091821794.png" alt="image-20220909182144740"></p>
<p>我们编写的监听器类，实现了<font style="background:pink">ReadListener</font>接口，里面的<font style="background:pink">invoke</font>方法每读取一行数据，都会被调用一次：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091824661.png" alt="image-20220909182409622"></p>
<h2 id="简单的写" tabindex="-1"><a class="header-anchor" href="#简单的写" aria-hidden="true">#</a> 简单的写</h2>
<p>复制上面的Excel，重命名为：杭州黑马在线202003班学员信息表-write.xlsx</p>
<p>编写测试方法: 因为是写数据，可以不需要监听器</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test02</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token comment">// 1.获得一个工作簿</span>
        <span class="token class-name">ExcelWriterBuilder</span> writerBuilder <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"杭州黑马在线202003班学员信息表-write.xlsx"</span><span class="token punctuation">,</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.获得一个工作表</span>
        <span class="token class-name">ExcelWriterSheetBuilder</span> sheet <span class="token operator">=</span> writerBuilder<span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 准备一个list</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> students <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Student</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            student<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"张三"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            student<span class="token punctuation">.</span><span class="token function">setGender</span><span class="token punctuation">(</span><span class="token string">"男"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            student<span class="token punctuation">.</span><span class="token function">setBrithday</span><span class="token punctuation">(</span><span class="token string">"2020-03-03"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            student<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"123456789"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            students<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 3.写数据</span>
        sheet<span class="token punctuation">.</span><span class="token function">doWrite</span><span class="token punctuation">(</span>students<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>需要注意的是，读和写时，不能有其他或线程打开了该Excel文件。</p>
</blockquote>
<p>写数据的效果:</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091849035.png" alt="image-20220909184916964"></p>
<p>对于上面的优化：</p>
<p>实体类中成员变量定义的顺序就是写数据，Excel列从左到右的顺序，所以可以根据需求来跳转实体类的变量定义顺序。</p>
<p>表头和变量名是一样的，也可以使用注解<font style="background:pink">@ExcelProperty</font>自定义,value是表头名字，index指定第几列。</p>
<p>对于不需要写出的列，可以使用注解<font style="background:pink">@ExcelIgnore</font>对其进行忽略。</p>
<p>对列的宽度进行调整，使用注解<font style="background:pink">@ColumnWidth</font>，参数为int类型，可以在属性上用，也可以在类上用(每列都是同样的宽度)。</p>
<p>对内容设置行高，<font style="background:pink">@ContentRowHeight</font>，只能作用于类上。</p>
<p>表头行高，<font style="background:pink">@HeadRowHeight</font>，只能作用于类上。</p>
<p>将实体类更改成如下:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 名字
     */</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">"名字"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 性别
     */</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">"性别"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> gender<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 生日
     */</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">"生日"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> brithday<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token annotation punctuation">@ExcelIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此运行，得到的数据是这样的：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091911285.png" alt="image-20220909191141243"></p>
</div></template>


