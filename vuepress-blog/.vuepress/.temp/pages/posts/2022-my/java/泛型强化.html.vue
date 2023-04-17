<template><div><p>B站黑马教程:<a href = 'https://www.bilibili.com/video/BV1xJ411n77R?spm_id_from=333.337.search-card.all.click&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a></p>
<h5 id="p1-概述" tabindex="-1"><a class="header-anchor" href="#p1-概述" aria-hidden="true">#</a> p1-概述</h5>
<p>java推出泛型钱，List&lt;Object&gt; list，可以存储任意类型对象，但是在使用过程中，需要明确知道数据类型，不然会发生类型转换异常。而且，编译期间不会报错，是运行时出现异常。</p>
<p>代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainClass</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Object</span> o <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208302013830.png" alt="不使用泛型，发生类型转换异常"></p>
<p>JDK5引入新特性，泛型在编译时安全检测，可以检测非法的类型。</p>
<p>泛型的本质就是参数类型化，操作的数据类型被指定为一个参数，否则则在编译期间就报错了。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208302017406.png" alt="采用泛型"></p>
<p>总结：</p>
<ul>
<li>编译期间检查类型</li>
<li>减少数据类型转换</li>
</ul>
<h5 id="p2-泛型类" tabindex="-1"><a class="header-anchor" href="#p2-泛型类" aria-hidden="true">#</a> p2-泛型类</h5>
<p>泛型定义语法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ClassName</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常用泛型标识:T、E、K、V</p>
<p>demo</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 泛型类
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span> 泛型参数，在创建对象时指定，由外部使用类时指定
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/30
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">T</span> t<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">getT</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setT</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>t <span class="token operator">=</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Generic</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>t <span class="token operator">=</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Generic{"</span> <span class="token operator">+</span>
            <span class="token string">"t="</span> <span class="token operator">+</span> t <span class="token operator">+</span>
            <span class="token char">'}'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> generic <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> t <span class="token operator">=</span> generic<span class="token punctuation">.</span><span class="token function">getT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        generic<span class="token punctuation">.</span><span class="token function">setT</span><span class="token punctuation">(</span><span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>generic<span class="token punctuation">.</span><span class="token function">getT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208302030874.png" alt="泛型类使用"></p>
<p>最大的有点就是代码复用、减少类型转换。如果不指定泛型，<strong>默认是Object</strong>，不支持基本数据类型。</p>
<p>同一泛型类，根据不同数据类型创建的对象，本质上是同一类型：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> stringGeneric <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> integerGeneric <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"stringGeneric.getClass() = "</span> <span class="token operator">+</span> stringGeneric<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"integerGeneric.getClass() = "</span> <span class="token operator">+</span> integerGeneric<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>stringGeneric<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> integerGeneric<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208302036130.png" alt="image-20220830203637046"></p>
<h5 id="p3-泛型类的使用" tabindex="-1"><a class="header-anchor" href="#p3-泛型类的使用" aria-hidden="true">#</a> p3-泛型类的使用</h5>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 抽奖，泛型类。包含奖品、奖品池、随机抽取
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/30
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProductGetter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Random</span> random <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 奖品
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> product<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 奖品池
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取奖品
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">T</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">getProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">T</span> t <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        product <span class="token operator">=</span> t<span class="token punctuation">;</span>
        <span class="token keyword">return</span> product<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 设置奖品池
     *
     * <span class="token keyword">@param</span> <span class="token parameter">list</span> 列表
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setList</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> list<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ProductGetter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> stringProductGetter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductGetter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> strings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> strArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"苹果手机"</span><span class="token punctuation">,</span><span class="token string">"华为手机"</span><span class="token punctuation">,</span><span class="token string">"小米手机"</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        strings<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>strArray<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stringProductGetter<span class="token punctuation">.</span><span class="token function">setList</span><span class="token punctuation">(</span>strings<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"恭喜抽到："</span> <span class="token operator">+</span> stringProductGetter<span class="token punctuation">.</span><span class="token function">getProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">ProductGetter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> integerProductGetter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductGetter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> integers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        integers<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token number">300</span><span class="token punctuation">,</span><span class="token number">400</span><span class="token punctuation">,</span><span class="token number">500</span><span class="token punctuation">,</span><span class="token number">600</span><span class="token punctuation">,</span><span class="token number">700</span><span class="token punctuation">,</span><span class="token number">800</span><span class="token punctuation">,</span><span class="token number">900</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        integerProductGetter<span class="token punctuation">.</span><span class="token function">setList</span><span class="token punctuation">(</span>integers<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"恭喜抽到："</span> <span class="token operator">+</span> integerProductGetter<span class="token punctuation">.</span><span class="token function">getProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"元"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208302234054.png" alt="image-20220830223449981"></p>
<h5 id="p4-泛型类派生子类" tabindex="-1"><a class="header-anchor" href="#p4-泛型类派生子类" aria-hidden="true">#</a> p4-泛型类派生子类</h5>
<ul>
<li>
<p>子类也是泛型类，子类和父类的泛型类型要一致</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ChildGeneric</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>子类不是泛型类，父类要明确泛型的数据类型</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ChildGeneric</span> <span class="token keyword">extends</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</div></template>


