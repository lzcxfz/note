<template><div><h1 id="easyexcel" tabindex="-1"><a class="header-anchor" href="#easyexcel" aria-hidden="true">#</a> <code v-pre>EasyExcel</code></h1>
<h2 id="一、初识easyexcel" tabindex="-1"><a class="header-anchor" href="#一、初识easyexcel" aria-hidden="true">#</a> 一、初识<code v-pre>EasyExcel</code></h2>
<h3 id="_1-apache-poi" tabindex="-1"><a class="header-anchor" href="#_1-apache-poi" aria-hidden="true">#</a> 1. Apache POI</h3>
<p>先说<code v-pre>POI</code>，有过报表导入导出经验的同学，应该听过或者使用。</p>
<p><code v-pre>Apache POI</code>是Apache软件基金会的开源函式库，提供跨平台的<code v-pre>Java API</code>实现<code v-pre>Microsoft Office</code>格式档案读写。但是存在如下一些问题：</p>
<h4 id="_1-1-学习使用成本较高" tabindex="-1"><a class="header-anchor" href="#_1-1-学习使用成本较高" aria-hidden="true">#</a> 1.1 学习使用成本较高</h4>
<p>对POI有过深入了解的才知道原来POI还有SAX模式（Dom解析模式）。但SAX模式相对比较复杂，excel有03和07两种版本，两个版本数据存储方式截然不同，sax解析方式也各不一样。</p>
<p>想要了解清楚这两种解析方式，才去写代码测试，估计两天时间是需要的。再加上即使解析完，要转换到自己业务模型还要很多繁琐的代码。总体下来感觉至少需要三天，由于代码复杂，后续维护成本巨大。</p>
<p>POI的SAX模式的API可以一定程度的解决一些内存溢出的问题，但是POI还是有一些缺陷，比如07版Excel解压缩以及解压后存储都是在内存中完成的，内存消耗依然很大，一个3M的Excel用POI的SAX解析，依然需要100M左右内存。</p>
<h4 id="_1-2-poi的内存消耗较大" tabindex="-1"><a class="header-anchor" href="#_1-2-poi的内存消耗较大" aria-hidden="true">#</a> 1.2 POI的内存消耗较大</h4>
<p>大部分使用POI都是使用他的userModel模式。userModel的好处是上手容易使用简单，随便拷贝个代码跑一下，剩下就是写业务转换了，虽然转换也要写上百行代码，相对比较好理解。然而userModel模式最大的问题是在于非常大的内存消耗，一个几兆的文件解析要用掉上百兆的内存。现在很多应用采用这种模式，之所以还正常在跑一定是并发不大，并发上来后一定会OOM或者频繁的full gc。</p>
<p>总体上来说，简单写法重度依赖内存，复杂写法学习成本高。</p>
<h4 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h4>
<ol>
<li>
<p>功能强大</p>
</li>
<li>
<p>代码书写冗余繁杂</p>
</li>
<li>
<p>读写大文件耗费内存较大，容易OOM</p>
</li>
</ol>
<h3 id="_2-easyexcel" tabindex="-1"><a class="header-anchor" href="#_2-easyexcel" aria-hidden="true">#</a> 2. <code v-pre>EasyExcel</code></h3>
<h4 id="_2-1-重写了poi对07版excel的解析" tabindex="-1"><a class="header-anchor" href="#_2-1-重写了poi对07版excel的解析" aria-hidden="true">#</a> 2.1 重写了POI对07版Excel的解析</h4>
<ul>
<li>
<p>EasyExcel重写了POI对07版Excel的解析，可以把内存消耗从100M左右降低到10M以内，并且再大的Excel不会出现内存溢出，03版仍依赖POI的SAX模式。</p>
</li>
<li>
<p>下图为64M内存1分钟内读取75M(46W行25列)的Excel（当然还有急速模式能更快，但是内存占用会在100M多一点）</p>
</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-09/202209091936313.png" alt="img"></p>
<ul>
<li>在上层做了模型转换的封装，让使用者更加简单方便</li>
</ul>
<h4 id="特点-1" tabindex="-1"><a class="header-anchor" href="#特点-1" aria-hidden="true">#</a> 特点</h4>
<ol>
<li>在数据模型层面进行了封装，使用简单</li>
<li>重写了07版本的Excel的解析代码，降低内存消耗，能有效避免OOM</li>
<li>只能操作Excel</li>
<li>不能读取图片</li>
</ol>
<h2 id="二、快速入门-quickstart" tabindex="-1"><a class="header-anchor" href="#二、快速入门-quickstart" aria-hidden="true">#</a> 二、快速入门--QuickStart</h2>
<h3 id="_0、导入依赖坐标" tabindex="-1"><a class="header-anchor" href="#_0、导入依赖坐标" aria-hidden="true">#</a> 0、导入依赖坐标</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- EasyExcel --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>easyexcel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.1.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- lombok 优雅编程 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.18.10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- junit --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>导入<code v-pre>easyexcel-2.1.6</code>坐标的时候，以依赖传递导入<code v-pre>poi-3.17</code>的POI。如果	·</p>
</blockquote>
<h3 id="_1、最简单的读" tabindex="-1"><a class="header-anchor" href="#_1、最简单的读" aria-hidden="true">#</a> 1、最简单的读</h3>
<h4 id="_1-1、需求、准备工作" tabindex="-1"><a class="header-anchor" href="#_1-1、需求、准备工作" aria-hidden="true">#</a> 1.1、需求、准备工作</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 需求：单实体导入
 * 导入Excel学员信息到系统。
 * 包含如下列：姓名、性别、出生日期
 * 模板详见：杭州黑马在线202003班学员信息.xls
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 杭州黑马在线202003班学员信息.xls文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-2、编写导出数据的实体" tabindex="-1"><a class="header-anchor" href="#_1-2、编写导出数据的实体" aria-hidden="true">#</a> 1.2、编写导出数据的实体</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 基于lombok</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 学生姓名
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 学生性别
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> gender<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 学生出生日期
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> birthday<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3、-读取excel文件" tabindex="-1"><a class="header-anchor" href="#_1-3、-读取excel文件" aria-hidden="true">#</a> 1.3、 读取<code v-pre>Excel</code>文件</h4>
<p>调用<code v-pre>EasyExcel</code>的<code v-pre>API</code>读取的<code v-pre>Excel</code>文件的测试类<code v-pre>StudentReadDemo</code></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>demo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>excel<span class="token punctuation">.</span></span><span class="token class-name">EasyExcel</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>excel<span class="token punctuation">.</span>read<span class="token punctuation">.</span>builder<span class="token punctuation">.</span></span><span class="token class-name">ExcelReaderSheetBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>domain<span class="token punctuation">.</span></span><span class="token class-name">Student</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>listener<span class="token punctuation">.</span></span><span class="token class-name">StudentReadListener</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">FileNotFoundException</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @Author Vsunks.v
 * @Date 2020/3/11 23:28
 * @Description:
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentReadDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 读取文件，读取完之后会自动关闭</span>
        <span class="token comment">/*
        	pathName  		文件路径；"d:\\杭州黑马在线202003班学员信息.xls"
        	head			每行数据对应的实体；Student.class
        	readListener	读监听器，每读一样就会调用一次该监听器的invoke方法
        
        	sheet方法参数： 工作表的顺序号（从0开始）或者工作表的名字，不传默认为0
        */</span>
        <span class="token comment">// 封装工作簿对象</span>
        <span class="token class-name">ExcelReaderBuilder</span> workBook <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span>read
                <span class="token punctuation">(</span><span class="token string">"d:\\杭州黑马在线202003班学员信息.xls"</span><span class="token punctuation">,</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StudentReadListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 封装工作表</span>
        <span class="token class-name">ExcelReaderSheetBuilder</span> sheet1 <span class="token operator">=</span> workBook<span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 读取</span>
        sheet1<span class="token punctuation">.</span><span class="token function">doRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>读取Excel的监听器，用于处理读取产生的数据</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>listener</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>excel<span class="token punctuation">.</span>context<span class="token punctuation">.</span></span><span class="token class-name">AnalysisContext</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>excel<span class="token punctuation">.</span>event<span class="token punctuation">.</span></span><span class="token class-name">AnalysisEventListener</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>domain<span class="token punctuation">.</span></span><span class="token class-name">Student</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @Author Vsunks.v
 * @Date 2020/3/11 23:12
 * @Description:
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentReadListener</span> <span class="token keyword">extends</span> <span class="token class-name">AnalysisEventListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token comment">// 每读一样，会调用该invoke方法一次</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Student</span> data<span class="token punctuation">,</span> <span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"data = "</span> <span class="token operator">+</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>data <span class="token operator">+</span> <span class="token string">"保存成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 全部读完之后，会调用该方法</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterAllAnalysed</span><span class="token punctuation">(</span><span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// TODO......</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、最简单的写" tabindex="-1"><a class="header-anchor" href="#_2、最简单的写" aria-hidden="true">#</a> 2、最简单的写</h3>
<h4 id="_2-1-需求、准备工作" tabindex="-1"><a class="header-anchor" href="#_2-1-需求、准备工作" aria-hidden="true">#</a> 2.1 需求、准备工作</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 需求：单实体导出
 * 导出多个学生对象到Excel表格
 * 包含如下列：姓名、性别、出生日期
 * 模板详见：杭州黑马在线202003班学员信息.xlsx
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2、编写导出数据的实体" tabindex="-1"><a class="header-anchor" href="#_2-2、编写导出数据的实体" aria-hidden="true">#</a> 2.2、编写导出数据的实体</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 使用lombok</span>
<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>domain</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token comment">//@ExcelProperty(value = "编号",index = 3)</span>
    <span class="token annotation punctuation">@ExcelIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 学生姓名
     */</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"学生姓名"</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token comment">//@ColumnWidth(30)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 学生性别
     */</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"学生性别"</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> gender<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 学生出生日期
     */</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"学生出生日期"</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment">//@ColumnWidth(20)</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> birthday<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3、-准备数据并写入到文件" tabindex="-1"><a class="header-anchor" href="#_2-3、-准备数据并写入到文件" aria-hidden="true">#</a> 2.3、 准备数据并写入到文件</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>demo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>excel<span class="token punctuation">.</span></span><span class="token class-name">EasyExcel</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>excel<span class="token punctuation">.</span>write<span class="token punctuation">.</span>builder<span class="token punctuation">.</span></span><span class="token class-name">ExcelWriterBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>domain<span class="token punctuation">.</span></span><span class="token class-name">Student</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @Author Vsunks.v
 * @Date 2020/3/11 23:27
 * @Description:
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentWriteDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> students <span class="token operator">=</span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">/*
            String pathName 写入文件的路径
            Class head      写入文件的对象类型
            默认写入到07的xlsx中，如果想要写入xls，可以指定类型（待验证）
         */</span>
        <span class="token class-name">ExcelWriterBuilder</span> workBook <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"d:\\杭州黑马学员表.xlsx"</span><span class="token punctuation">,</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// sheet方法参数： 工作表的顺序号（从0开始）或者工作表的名字</span>
        workBook<span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doWrite</span><span class="token punctuation">(</span>students<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> students <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Student</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            data<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"杭州黑马学号0"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            data<span class="token punctuation">.</span><span class="token function">setBirthday</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            data<span class="token punctuation">.</span><span class="token function">setGender</span><span class="token punctuation">(</span><span class="token string">"男"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            students<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> students<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、文件上传和下载" tabindex="-1"><a class="header-anchor" href="#_3、文件上传和下载" aria-hidden="true">#</a> 3、文件上传和下载</h3>
<p>基于SpringMVC的文件上传和下载</p>
<p><strong>0. 导入依赖</strong></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- EasyExcel --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>easyexcel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.0.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- lombok --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.18.10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>provided<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- junit --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.slf4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>slf4j-nop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.7.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- SpringMVC（Spring） --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-webmvc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.0.5.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- Servlet --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>javax.servlet<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>javax.servlet-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.0.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>provided<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- 文件上传 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>commons-fileupload<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-fileupload<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-1-文件上传" tabindex="-1"><a class="header-anchor" href="#_3-1-文件上传" aria-hidden="true">#</a> 3.1 文件上传</h4>
<p>编写excel中每一行对应的实体类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 学生姓名
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 学生性别
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> gender<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 学生出生日期
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> birthday<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写回调监听器StudentReadListener</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span><span class="token string">"prototype"</span><span class="token punctuation">)</span>	<span class="token comment">// 作者要求每次读取都要使用新的Listener</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentReadListener</span> <span class="token keyword">extends</span> <span class="token class-name">AnalysisEventListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StudentService</span> studentService<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">BATCH_SAVE_NUM</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> students <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token keyword">private</span> <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">// 每读一样，会调用该invoke方法一次</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Student</span> data<span class="token punctuation">,</span> <span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        students<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>count <span class="token operator">%</span> <span class="token constant">BATCH_SAVE_NUM</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            studentService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>students<span class="token punctuation">)</span><span class="token punctuation">;</span>
            students<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 全部读完之后，会调用该方法</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterAllAnalysed</span><span class="token punctuation">(</span><span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// TODO......</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务代码接口StudentService和实现类StudentServiceImpl</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">StudentService</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> students<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">StudentService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> students<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"students in service = "</span> <span class="token operator">+</span> students<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring配置文件</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 组件扫描--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> <span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.itheima<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringMVC配置文件</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 组件扫描--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> <span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.itheima.demo<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

<span class="token comment">&lt;!-- MVC文件上传多部件解析器 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.web.multipart.commons.CommonsMultipartResolver<span class="token punctuation">"</span></span>
      <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>multipartResolver<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编码读取上传的Excel文件</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebUploadAndDownload</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 文件上传
     * 1. 编写excel中每一行对应的实体类
     * 2. 由于默认异步读取excel，所以需要逐行读取的回调监听器
     * 3. 开始读取Excel
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"upload"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">ExcelReaderBuilder</span> workBook <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> studentReadListener<span class="token punctuation">)</span><span class="token punctuation">;</span>
        workBook<span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"success"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-文件下载" tabindex="-1"><a class="header-anchor" href="#_3-2-文件下载" aria-hidden="true">#</a> 3.2 文件下载</h4>
<p>编写实体类并创建对象以便写入表格</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token annotation punctuation">@ExcelIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 学生姓名
     */</span>
    <span class="token comment">//@ExcelProperty({"学员信息表", "学生姓名"})</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">"学生姓名"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 学生性别
     */</span>
    <span class="token comment">//@ExcelProperty({"学员信息表", "学生性别"})</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">"学生性别"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> gender<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 学生出生日期
     */</span>
    <span class="token comment">//@ExcelProperty({"学员信息表", "学生出生日期"})</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">"学生出生日期"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> birthday<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 循环生成10个学生对象</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> students <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Student</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"杭州黑马学号0"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">setBirthday</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">setGender</span><span class="token punctuation">(</span><span class="token string">"男"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        students<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> students<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编码将数据写入到响应体实现下载</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebUploadAndDownload</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 文件下载
     * 1. 编写实体类并创建对象以便写入表格
     * 2. 设置响应参数：文件的ContentType和文件名，同时设置编码避免乱码
     * 3. 直接写，内部会调用finish方法自动关闭OutputStream
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"download"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">"application/vnd.ms-excel"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 防止中文乱码 </span>
        <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token class-name">URLEncoder</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token string">"测试"</span><span class="token punctuation">,</span> <span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Disposition"</span><span class="token punctuation">,</span> <span class="token string">"attachment; filename*=UTF-8''"</span> <span class="token operator">+</span> fileName <span class="token operator">+</span> <span class="token string">".xlsx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ExcelWriterBuilder</span> workBook <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">ExcelWriterSheetBuilder</span> sheet <span class="token operator">=</span> workBook<span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token string">"模板"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        sheet<span class="token punctuation">.</span><span class="token function">doWrite</span><span class="token punctuation">(</span><span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、自定义单元格样式" tabindex="-1"><a class="header-anchor" href="#_4、自定义单元格样式" aria-hidden="true">#</a> 4、自定义单元格样式</h3>
<p>EasyExcel支持调整行高、列宽、背景色、字体大小等内容，但是控制方式与使用原生POI无异，比较繁琐，不建议使用。</p>
<p>但是可以使用模板填充的方式，向预设样式的表格中直接写入数据，写入数据的时候会保持原有样式。</p>
<h2 id="三、填充" tabindex="-1"><a class="header-anchor" href="#三、填充" aria-hidden="true">#</a> 三、填充</h2>
<h3 id="_1、填充一组数据" tabindex="-1"><a class="header-anchor" href="#_1、填充一组数据" aria-hidden="true">#</a> 1、填充一组数据</h3>
<h4 id="_1-1-准备模板" tabindex="-1"><a class="header-anchor" href="#_1-1-准备模板" aria-hidden="true">#</a> 1.1 准备模板</h4>
<p>​	Excel表格中用{} 来表示包裹要填充的变量，如果单元格文本中本来就有<code v-pre>{</code>、<code v-pre>}</code>左右大括号，需要在括号前面使用斜杠转义<code v-pre>\{</code>、<code v-pre>\}</code>。</p>
<p>​	代码中被填充数据的实体对象的成员变量名或被填充map集合的key需要和Excel中被{}包裹的变量名称一致。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091936314.png" alt=""></p>
<h4 id="_1-2-封装数据" tabindex="-1"><a class="header-anchor" href="#_1-2-封装数据" aria-hidden="true">#</a> 1.2 封装数据</h4>
<p>编写封装填充数据的类或选用Map</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 使用实体类封装填充数据
 *
 *  实体中成员变量名称需要和Excel表各种<span class="token punctuation">{</span><span class="token punctuation">}</span>包裹的变量名匹配
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FillData</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 生成多组数据代码
 * / 
    private static List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FillData</span><span class="token punctuation">></span></span> initFillData() <span class="token punctuation">{</span>
        ArrayList<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FillData</span><span class="token punctuation">></span></span> fillDatas = new ArrayList<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FillData</span><span class="token punctuation">></span></span>();
        for (int i = 0; i &lt; 10; i++) <span class="token punctuation">{</span>
            FillData fillData = new FillData();
            fillData.setName("杭州黑马0" + i);
            fillData.setAge(10 + i);
            fillDatas.add(fillData);
        <span class="token punctuation">}</span>
        return fillDatas;
    <span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-填充" tabindex="-1"><a class="header-anchor" href="#_1-3-填充" aria-hidden="true">#</a> 1.3 填充</h4>
<p>准备数据并填充到文件</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 加载模板</span>
    <span class="token class-name">InputStream</span> templateFile <span class="token operator">=</span> <span class="token class-name">FillData</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>
            <span class="token string">"fill_data_template1"</span> <span class="token operator">+</span>
            <span class="token string">".xlsx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 写入文件</span>
    <span class="token class-name">String</span> targetFileName <span class="token operator">=</span> <span class="token string">"单组数据填充.xlsx"</span><span class="token punctuation">;</span>

    <span class="token comment">// 准备对象数据填充</span>
    <span class="token class-name">FillData</span> fillData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FillData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fillData<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"杭州黑马"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fillData<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">// 生成工作簿对象</span>
    <span class="token class-name">ExcelWriterBuilder</span> workBookWriter <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>targetFileName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withTemplate</span><span class="token punctuation">(</span>templateFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 获取工作表并填充</span>
    <span class="token comment">//workBookWriter.sheet().doFill(fillData);</span>

    <span class="token comment">// 使用Map数据填充</span>
    <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> mapFillData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mapFillData<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"杭州黑马Map"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mapFillData<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token string">"11"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 获取第一个工作表填充并自动关闭流</span>
    workBookWriter<span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doFill</span><span class="token punctuation">(</span>mapFillData<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>1.4 效果</strong></p>
<h3 id="_2、填充多组数据" tabindex="-1"><a class="header-anchor" href="#_2、填充多组数据" aria-hidden="true">#</a> 2、填充多组数据</h3>
<h4 id="_2-1-准备模板" tabindex="-1"><a class="header-anchor" href="#_2-1-准备模板" aria-hidden="true">#</a> 2.1 准备模板</h4>
<p>​	Excel表格中用<code v-pre>{.} </code>来表示包裹要填充的变量，如果单元格文本中本来就有<code v-pre>{</code>、<code v-pre>}</code>左右大括号，需要在括号前面使用斜杠转义<code v-pre>\{</code>  、<code v-pre>\}</code>。</p>
<p>​	代码中被填充数据的实体对象的成员变量名或被填充map集合的key需要和Excel中被{}包裹的变量名称一致。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091936315.png" alt=""></p>
<h4 id="_2-2-封装数据" tabindex="-1"><a class="header-anchor" href="#_2-2-封装数据" aria-hidden="true">#</a> 2.2 封装数据</h4>
<p>编写封装填充数据的类或选用Map</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 同上</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-3-填充" tabindex="-1"><a class="header-anchor" href="#_2-3-填充" aria-hidden="true">#</a> 2.3 填充</h4>
<p>准备数据并填充到文件</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 加载模板</span>
    <span class="token class-name">InputStream</span> templateFile <span class="token operator">=</span> <span class="token class-name">FillData</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>
            <span class="token string">"fill_data_template2.xlsx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 写入文件</span>
    <span class="token class-name">String</span> targetFileName <span class="token operator">=</span> <span class="token string">"多组数据填充.xlsx"</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FillData</span><span class="token punctuation">></span></span> fillDatas <span class="token operator">=</span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 生成工作簿对象</span>
    <span class="token class-name">ExcelWriterBuilder</span> workBookWriter <span class="token operator">=</span>
            <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>targetFileName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withTemplate</span><span class="token punctuation">(</span>templateFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 获取第一个工作表填充并自动关闭流</span>
    workBookWriter<span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doFill</span><span class="token punctuation">(</span>fillDatas<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、组合填充" tabindex="-1"><a class="header-anchor" href="#_3、组合填充" aria-hidden="true">#</a> 3、组合填充</h3>
<h4 id="_3-1-准备模板" tabindex="-1"><a class="header-anchor" href="#_3-1-准备模板" aria-hidden="true">#</a> 3.1 准备模板</h4>
<p>即有多组数据填充，又有单一数据填充，为了避免两者数据出现冲突覆盖的情况，在多组填充时需要通过<code v-pre>FillConfig</code>对象设置换行。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091936316.png" alt="1584207785924"></p>
<h4 id="_3-2-封装数据" tabindex="-1"><a class="header-anchor" href="#_3-2-封装数据" aria-hidden="true">#</a> 3.2 封装数据</h4>
<p>编写封装填充数据的类或选用Map</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 同上</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-3-填充" tabindex="-1"><a class="header-anchor" href="#_3-3-填充" aria-hidden="true">#</a> 3.3 填充</h4>
<p>准备数据并填充到文件</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 加载模板</span>
    <span class="token class-name">InputStream</span> templateFile <span class="token operator">=</span> <span class="token class-name">FillData</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>
            <span class="token string">"fill_data_template3.xlsx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 目标文件</span>
    <span class="token class-name">String</span> targetFileName <span class="token operator">=</span> <span class="token string">"组合数据填充.xlsx"</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FillData</span><span class="token punctuation">></span></span> fillDatas <span class="token operator">=</span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 生成工作簿对象</span>
    <span class="token class-name">ExcelWriter</span> excelWriter <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>targetFileName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withTemplate</span><span class="token punctuation">(</span>templateFile<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 生成工作表对象</span>
    <span class="token class-name">WriteSheet</span> writeSheet <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">writerSheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 组合填充时，因为多组填充的数据量不确定，需要在多组填充完之后另起一行</span>
    <span class="token class-name">FillConfig</span> fillConfig <span class="token operator">=</span> <span class="token class-name">FillConfig</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forceNewRow</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 填充并换行</span>
    excelWriter<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>fillDatas<span class="token punctuation">,</span> fillConfig<span class="token punctuation">,</span> writeSheet<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> otherData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    otherData<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"date"</span><span class="token punctuation">,</span> <span class="token string">"2020-03-14"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    otherData<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"total"</span><span class="token punctuation">,</span> <span class="token string">"100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    excelWriter<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>otherData<span class="token punctuation">,</span> writeSheet<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 关闭</span>
    excelWriter<span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、水平填充" tabindex="-1"><a class="header-anchor" href="#_4、水平填充" aria-hidden="true">#</a> 4、水平填充</h3>
<h4 id="_4-1-准备模板" tabindex="-1"><a class="header-anchor" href="#_4-1-准备模板" aria-hidden="true">#</a> 4.1 准备模板</h4>
<p>水平填充和多组填充模板一样，不一样的地方在于，填充时需要通过<code v-pre>FillConfig</code>对象设置水平填充。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209091936317.png" alt=""></p>
<h4 id="_4-2-封装数据" tabindex="-1"><a class="header-anchor" href="#_4-2-封装数据" aria-hidden="true">#</a> 4.2 封装数据</h4>
<p>编写封装填充数据的类或选用Map</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 同上</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-3-填充" tabindex="-1"><a class="header-anchor" href="#_4-3-填充" aria-hidden="true">#</a> 4.3 填充</h4>
<p>准备数据并填充到文件</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 加载模板</span>
    <span class="token class-name">InputStream</span> templateFile <span class="token operator">=</span> <span class="token class-name">FillData</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>
            <span class="token string">"fill_data_template4.xlsx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 写入文件</span>
    <span class="token class-name">String</span> targetFileName <span class="token operator">=</span> <span class="token string">"easyExcelDemo\\水平数据填充.xlsx"</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FillData</span><span class="token punctuation">></span></span> fillDatas <span class="token operator">=</span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 生成工作簿对象</span>
    <span class="token class-name">ExcelWriter</span> excelWriter <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>targetFileName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withTemplate</span><span class="token punctuation">(</span>templateFile<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 生成工作表对象</span>
    <span class="token class-name">WriteSheet</span> writeSheet <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">writerSheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">// 组合填充时，因为多组填充的数据量不确定，需要在多组填充完之后另起一行</span>
    <span class="token class-name">FillConfig</span> fillConfig <span class="token operator">=</span> <span class="token class-name">FillConfig</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">direction</span><span class="token punctuation">(</span><span class="token class-name">WriteDirectionEnum</span><span class="token punctuation">.</span><span class="token constant">HORIZONTAL</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 填充</span>
    excelWriter<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>fillDatas<span class="token punctuation">,</span> fillConfig<span class="token punctuation">,</span> writeSheet<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> otherData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    otherData<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"date"</span><span class="token punctuation">,</span> <span class="token string">"2020-03-14"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    otherData<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"total"</span><span class="token punctuation">,</span> <span class="token string">"100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    excelWriter<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>otherData<span class="token punctuation">,</span> writeSheet<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 关闭</span>
    excelWriter<span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、-注意事项" tabindex="-1"><a class="header-anchor" href="#_5、-注意事项" aria-hidden="true">#</a> 5、 注意事项</h3>
<p>​	为了节省内存，所以没有采用把整个文档在内存中组织好之后再整体写入到文件的做法，而是采用的是一行一行写入的方式，不能实现删除和移动行，也不支持备注写入。多组数据写入的时候，如果需要新增行，只能在最后一行增加，不能在中间位置添加。</p>
<h3 id="_6、填充综合练习" tabindex="-1"><a class="header-anchor" href="#_6、填充综合练习" aria-hidden="true">#</a> 6、填充综合练习</h3>
<p>见<code v-pre>report_template.xlsx</code></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * reprot综合练习
 */</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test06</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">InputStream</span> templateInputStream <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>
            <span class="token string">"report_template.xlsx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 目标文件</span>
    <span class="token class-name">String</span> targetFile <span class="token operator">=</span> <span class="token string">"模板写入6-report.xlsx"</span><span class="token punctuation">;</span>

    <span class="token comment">// 写入workbook对象</span>

    <span class="token class-name">ExcelWriter</span> workBook <span class="token operator">=</span>
            <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>targetFile<span class="token punctuation">,</span> <span class="token class-name">FillData</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withTemplate</span><span class="token punctuation">(</span>templateInputStream<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">WriteSheet</span> sheet <span class="token operator">=</span> <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">writerSheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 填充配置，开启组合填充换行</span>
    <span class="token comment">//FillConfig fillConfig = FillConfig.builder().forceNewRow(true).build();</span>

    <span class="token comment">// ****** 准备数据 *******</span>
    <span class="token comment">// 日期</span>
    <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> dateMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"date"</span><span class="token punctuation">,</span> <span class="token string">"2020-03-16"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 总会员数</span>
    <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> totalCountMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"totalCount"</span><span class="token punctuation">,</span> <span class="token string">"1000"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 新增员数</span>
    <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> increaseCountMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"increaseCount"</span><span class="token punctuation">,</span> <span class="token string">"100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 本周新增会员数</span>
    <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> increaseCountWeekMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"increaseCountWeek"</span><span class="token punctuation">,</span> <span class="token string">"50"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 本月新增会员数</span>
    <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> increaseCountMonthMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"increaseCountMonth"</span><span class="token punctuation">,</span> <span class="token string">"100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">// 新增会员数据</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> students <span class="token operator">=</span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// **** 准备数据结束****</span>

    <span class="token comment">// 写入统计数据</span>
    workBook<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>dateMap<span class="token punctuation">,</span> sheet<span class="token punctuation">)</span><span class="token punctuation">;</span>
    workBook<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>totalCountMap<span class="token punctuation">,</span> sheet<span class="token punctuation">)</span><span class="token punctuation">;</span>
    workBook<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>increaseCountMap<span class="token punctuation">,</span> sheet<span class="token punctuation">)</span><span class="token punctuation">;</span>
    workBook<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>increaseCountWeekMap<span class="token punctuation">,</span> sheet<span class="token punctuation">)</span><span class="token punctuation">;</span>
    workBook<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>increaseCountMonthMap<span class="token punctuation">,</span> sheet<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 写入新增会员</span>
    workBook<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>students<span class="token punctuation">,</span> sheet<span class="token punctuation">)</span><span class="token punctuation">;</span>
    workBook<span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、常用api及注解" tabindex="-1"><a class="header-anchor" href="#四、常用api及注解" aria-hidden="true">#</a> 四、常用API及注解</h2>
<h3 id="_1、常用类" tabindex="-1"><a class="header-anchor" href="#_1、常用类" aria-hidden="true">#</a> 1、常用类</h3>
<ul>
<li><strong>EasyExcel</strong> 入口类，用于构建开始各种操作；</li>
<li><strong>ExcelReaderBuilder</strong> 构建出一个ReadWorkbook对象，即一个工作簿对象，对应的是一个Excel文件；</li>
<li><strong>ExcelWriterBuilder</strong> 构建出一个WriteWorkbook对象，即一个工作簿对象，对应的是一个Excel文件；</li>
<li><strong>ExcelReaderSheetBuilder</strong> 构建出一个ReadSheet对象，即一个工作表的对象，对应的Excel中的每个sheet，一个工作簿可以有多个工作表；</li>
<li><strong>ExcelWriterSheetBuilder</strong> 构建出一WriteSheet对象，即一个工作表的对象，对应的Excel中的每个sheet，一个工作簿可以有多个工作表；</li>
<li><strong>ReadListener</strong> 在每一行读取完毕后都会调用ReadListener来处理数据，我们可以把调用service的代码可以写在其<strong>invoke</strong>方法内部；</li>
<li><strong>WriteHandler</strong> 在每一个操作包括创建单元格、创建表格等都会调用WriteHandler来处理数据，对使用者透明不可见；</li>
<li><strong>所有配置都是继承的</strong> Workbook的配置会被Sheet继承。所以在用EasyExcel设置参数的时候，在EasyExcel…sheet()方法之前作用域是整个sheet，之后针对单个sheet。</li>
</ul>
<h3 id="_2、读取时的注解" tabindex="-1"><a class="header-anchor" href="#_2、读取时的注解" aria-hidden="true">#</a> 2、读取时的注解</h3>
<h4 id="excelproperty" tabindex="-1"><a class="header-anchor" href="#excelproperty" aria-hidden="true">#</a> @ExcelProperty</h4>
<p><strong>使用位置</strong>：标准作用在成员变量上</p>
<p><strong>可选属性：</strong></p>
<table>
<thead>
<tr>
<th>属性名</th>
<th style="text-align:left">含义</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>index</td>
<td style="text-align:left">对应Excel表中的列数</td>
<td>默认-1，建议指定时从0开始</td>
</tr>
<tr>
<td>value</td>
<td style="text-align:left">对应Excel表中的列头</td>
<td></td>
</tr>
<tr>
<td>converter</td>
<td style="text-align:left">成员变量转换器</td>
<td>自定义转换器需要实Converter接口</td>
</tr>
</tbody>
</table>
<p><strong>使用效果</strong>：index属性可以指定当前字段对应excel中的哪一列，可以根据列名value去匹配，也可以不写。</p>
<p>如果不使用@ExcelProperty注解，成员变量从上到下的顺序，对应表格中从左到右的顺序；</p>
<p>**使用建议：**要么全部不写，要么全部用index，要么全部用名字去匹配，尽量不要三个混着用。</p>
<p><strong>代码演示：</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 1. 修改成员变量顺序读取Excel表格</span>
<span class="token comment">// 2. 修改index属性值读取Excel表格</span>
<span class="token comment">// 3. 修改value属性值读取Excel表格</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="excelignore" tabindex="-1"><a class="header-anchor" href="#excelignore" aria-hidden="true">#</a> @ExcelIgnore</h4>
<p>标注在成员变量上，默认所有字段都会和excel去匹配，加了这个注解会忽略该字段</p>
<p><strong>代码演示：</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 4. 忽略id成员变量值读取Excel表格</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="datetimeformat" tabindex="-1"><a class="header-anchor" href="#datetimeformat" aria-hidden="true">#</a> @DateTimeFormat</h4>
<p>标注在成员变量上，日期转换，代码中用<code v-pre>String类型的成员变量</code>去接收<code v-pre>excel中日期格式的数据</code>会调用这个注解。里面的<code v-pre>value</code>参照<code v-pre>java.text.SimpleDateFormat</code></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 5. 按照指定的格式写入Excel内容</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="numberformat" tabindex="-1"><a class="header-anchor" href="#numberformat" aria-hidden="true">#</a> @NumberFormat</h4>
<p>标注在成员变量上，数字转换，代码中用<code v-pre>String类型的成员变量</code>去接收<code v-pre>excel数字格式的数据</code>会调用这个注解。里面的<code v-pre>value</code>参照<code v-pre>java.text.DecimalFormat</code></p>
<h4 id="excelignoreunannotated" tabindex="-1"><a class="header-anchor" href="#excelignoreunannotated" aria-hidden="true">#</a> @ExcelIgnoreUnannotated</h4>
<p>标注在类上。</p>
<p>不标注该注解时，默认类中所有成员变量都会参与读写，无论是否在成员变量上加了<code v-pre>@ExcelProperty</code> 的注解。</p>
<p>标注该注解后，类中的成员变量如果没有标注<code v-pre>@ExcelProperty</code> 注解将不会参与读写。</p>
<h3 id="_3、-读取时通用参数" tabindex="-1"><a class="header-anchor" href="#_3、-读取时通用参数" aria-hidden="true">#</a> 3、 读取时通用参数</h3>
<p><code v-pre>ReadWorkbook</code>,<code v-pre>ReadSheet</code> 都会有的参数，如果为空，默认使用上级。</p>
<ul>
<li>
<p><code v-pre>converter</code> 转换器，默认加载了很多转换器。也可以自定义。</p>
</li>
<li>
<p><code v-pre>readListener</code> 监听器，在读取数据的过程中会不断的调用监听器。</p>
</li>
<li>
<p><code v-pre>headRowNumber</code> 指定需要读表格的 列头行数。默认有一行头，也就是认为第二行开始起为数据。</p>
</li>
<li>
<p><code v-pre>head</code> 与<code v-pre>clazz</code>二选一。读取文件头对应的列表，会根据列表匹配数据。建议使用clas，就是文件中每一行数据对应的代码中的实体类型。</p>
</li>
<li>
<p><code v-pre>clazz</code> 与<code v-pre>head</code>二选一。读取文件的头对应的class，也可以使用注解。如果两个都不指定，则会读取全部数据。</p>
</li>
<li>
<p><code v-pre>autoTrim</code> 字符串、表头等数据自动trim</p>
</li>
<li>
<p><code v-pre>password</code> 读的时候是否需要使用密码</p>
</li>
</ul>
<h3 id="_4、readworkbook-工作簿对象-参数" tabindex="-1"><a class="header-anchor" href="#_4、readworkbook-工作簿对象-参数" aria-hidden="true">#</a> 4、ReadWorkbook（工作簿对象）参数</h3>
<ul>
<li><code v-pre>excelType</code> 当前excel的类型，读取时会自动判断，无需设置。</li>
<li><code v-pre>inputStream</code> 与<code v-pre>file</code>二选一。建议使用file。</li>
<li><code v-pre>file</code> 与<code v-pre>inputStream</code>二选一。读取文件的文件。</li>
<li><code v-pre>autoCloseStream</code> 自动关闭流。</li>
<li><code v-pre>readCache</code> 默认小于5M用 内存，超过5M会使用 <code v-pre>EhCache</code>，不建议使用这个参数。</li>
<li><code v-pre>useDefaultListener</code> <code v-pre>@since 2.1.4</code> 默认会加入<code v-pre>ModelBuildEventListener</code> 来帮忙转换成传入<code v-pre>class</code>的对象，设置成<code v-pre>false</code>后将不会协助转换对象，自定义的监听器会接收到<code v-pre>Map&lt;Integer,CellData&gt;</code>对象，如果还想继续接听到<code v-pre>class</code>对象，请调用<code v-pre>readListener</code>方法，加入自定义的<code v-pre>beforeListener</code>、 <code v-pre>ModelBuildEventListener</code>、 自定义的<code v-pre>afterListener</code>即可。</li>
</ul>
<h3 id="_5、readsheet-工作表对象-参数" tabindex="-1"><a class="header-anchor" href="#_5、readsheet-工作表对象-参数" aria-hidden="true">#</a> 5、ReadSheet（工作表对象）参数</h3>
<ul>
<li><code v-pre>sheetNo</code> 需要读取Sheet的编号，建议使用这个来指定读取哪个Sheet</li>
<li><code v-pre>sheetName</code> 根据名字去匹配Sheet，excel 2003不支持根据名字去匹配</li>
</ul>
<h3 id="_6、写入时的注解注解" tabindex="-1"><a class="header-anchor" href="#_6、写入时的注解注解" aria-hidden="true">#</a> 6、写入时的注解注解</h3>
<h4 id="excelproperty-1" tabindex="-1"><a class="header-anchor" href="#excelproperty-1" aria-hidden="true">#</a> @ExcelProperty</h4>
<p><strong>使用位置</strong>：标准作用在成员变量上</p>
<p><strong>可选属性：</strong></p>
<table>
<thead>
<tr>
<th>属性名</th>
<th style="text-align:left">含义</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>index</td>
<td style="text-align:left">对应Excel表中的列数</td>
<td>默认-1，指定时建议从0开始</td>
</tr>
<tr>
<td>value</td>
<td style="text-align:left">对应Excel表中的列头</td>
<td></td>
</tr>
<tr>
<td>converter</td>
<td style="text-align:left">成员变量转换器</td>
<td>自定义转换器需要实Converter接口</td>
</tr>
</tbody>
</table>
<p><strong>使用效果</strong>：<code v-pre>index</code> 指定写到第几列，如果不指定则根据成员变量位置排序；</p>
<p>​					 <code v-pre>value</code>指定写入的列头，如果不指定则使用成员变量的名字作为列头；</p>
<p>​					如果要设置复杂的头，可以为value指定多个值。</p>
<p><strong>代码演示：</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token comment">// 5. 为《杭州黑马学员表.xlsx》文件中学生信息设置一个统一的表头“杭州黑马学员信息表”</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="其他注解" tabindex="-1"><a class="header-anchor" href="#其他注解" aria-hidden="true">#</a> 其他注解：</h4>
<p>基本和读取时一致</p>
<ul>
<li>
<p>@ContentRowHeight()	标注在类上或属性上，指定内容行高</p>
</li>
<li>
<p>@HeadRowHeight()  标注在类上或属性上，指定列头行高</p>
</li>
<li>
<p>@ColumnWidth() 标注在类上或属性上，指定列宽</p>
</li>
<li>
<p>ExcelIgnore` 默认所有字段都会写入excel，这个注解会忽略这个字段</p>
</li>
<li>
<p><code v-pre>DateTimeFormat</code> 日期转换，将<code v-pre>Date</code>写到excel会调用这个注解。里面的<code v-pre>value</code>参照<code v-pre>java.text.SimpleDateFormat</code></p>
</li>
<li>
<p><code v-pre>NumberFormat</code> 数字转换，用<code v-pre>Number</code>写excel会调用这个注解。里面的<code v-pre>value</code>参照<code v-pre>java.text.DecimalFormat</code></p>
</li>
<li>
<p><code v-pre>ExcelIgnoreUnannotated</code> 默认不加 <code v-pre>ExcelProperty</code> 的注解的都会参与读写，加了不会参与</p>
</li>
</ul>
<h3 id="_7、写入时通用参数" tabindex="-1"><a class="header-anchor" href="#_7、写入时通用参数" aria-hidden="true">#</a> 7、写入时通用参数</h3>
<p><code v-pre>WriteWorkbook</code>、<code v-pre>WriteSheet</code>都会有的参数，如果为空，默认使用上级。</p>
<ul>
<li>
<p><code v-pre>converter</code> 转换器，默认加载了很多转换器。也可以自定义。</p>
</li>
<li>
<p><code v-pre>writeHandler</code> 写的处理器。可以实现<code v-pre>WorkbookWriteHandler</code>,<code v-pre>SheetWriteHandler</code>,<code v-pre>RowWriteHandler</code>,<code v-pre>CellWriteHandler</code>，在写入excel的不同阶段会调用，对使用者透明不可见。</p>
</li>
<li>
<p><code v-pre>relativeHeadRowIndex</code> 距离多少行后开始。也就是开头空几行</p>
</li>
<li>
<p><code v-pre>needHead</code> 是否导出头</p>
</li>
<li>
<p><code v-pre>head</code> 与<code v-pre>clazz</code>二选一。写入文件的头列表，建议使用class。</p>
</li>
<li>
<p><code v-pre>clazz</code> 与<code v-pre>head</code>二选一。写入文件的头对应的class，也可以使用注解。</p>
</li>
<li>
<p><code v-pre>autoTrim</code>  字符串、表头等数据自动trim</p>
</li>
</ul>
<h3 id="_8、writeworkbook-工作簿对象-参数" tabindex="-1"><a class="header-anchor" href="#_8、writeworkbook-工作簿对象-参数" aria-hidden="true">#</a> 8、WriteWorkbook（工作簿对象）参数</h3>
<ul>
<li>
<p><code v-pre>excelType</code> 当前excel的类型，默认为<code v-pre>xlsx</code></p>
</li>
<li>
<p><code v-pre>outputStream</code> 与<code v-pre>file</code>二选一。写入文件的流</p>
</li>
<li>
<p><code v-pre>file</code> 与<code v-pre>outputStream</code>二选一。写入的文件</p>
</li>
<li>
<p><code v-pre>templateInputStream</code> 模板的文件流</p>
</li>
<li>
<p><code v-pre>templateFile</code> 模板文件</p>
</li>
<li>
<p><code v-pre>autoCloseStream</code> 自动关闭流。</p>
</li>
<li>
<p><code v-pre>password</code>  写的时候是否需要使用密码</p>
</li>
<li>
<p><code v-pre>useDefaultStyle</code> 写的时候是否是使用默认头</p>
</li>
</ul>
<h3 id="_9、writesheet-工作表对象-参数" tabindex="-1"><a class="header-anchor" href="#_9、writesheet-工作表对象-参数" aria-hidden="true">#</a> 9、WriteSheet（工作表对象）参数</h3>
<ul>
<li>
<p><code v-pre>sheetNo</code> 需要写入的编号。默认0</p>
</li>
<li>
<p><code v-pre>sheetName</code> 需要些的Sheet名称，默认同sheetNo</p>
</li>
</ul>
</div></template>


