<template><div><ul>
<li>
<p>maven不足：xml配置繁琐。</p>
</li>
<li>
<p>gradle使用Groovy来声明项目设置。</p>
</li>
<li>
<p>groovy基本语法</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>println <span class="token interpolation-string"><span class="token string">"hello groovy"</span></span>

<span class="token comment">// 定义变量 弱类型</span>
<span class="token keyword">def</span> i <span class="token operator">=</span><span class="token number">1</span>
println i

<span class="token keyword">def</span> j <span class="token operator">=</span><span class="token interpolation-string"><span class="token string">"哈哈"</span></span>
println j
<span class="token comment">// 定义集合</span>
<span class="token keyword">def</span> list<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span><span class="token string">'b'</span><span class="token punctuation">]</span>
<span class="token comment">// 添加元素</span>
list <span class="token operator">&lt;&lt;</span> <span class="token string">'c'</span>
<span class="token comment">// 输出第三个</span>
println list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment">//定义 map</span>
<span class="token keyword">def</span> map<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">'key1'</span><span class="token punctuation">:</span><span class="token string">'value1'</span><span class="token punctuation">,</span><span class="token string">'key2'</span><span class="token punctuation">:</span><span class="token string">'value2'</span><span class="token punctuation">]</span>
<span class="token comment">// 添加</span>
map<span class="token punctuation">.</span>key3<span class="token operator">=</span><span class="token string">'value3'</span>
<span class="token comment">//打印 key3的值</span>
println map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">"key3"</span></span><span class="token punctuation">)</span>

<span class="token comment">// groovy中的闭包  定义一个闭包</span>
<span class="token keyword">def</span> b1<span class="token operator">=</span><span class="token punctuation">{</span>
    println <span class="token interpolation-string"><span class="token string">"hello b1"</span></span>
<span class="token punctuation">}</span>
<span class="token comment">// 定义方法 参数是一个闭包</span>
<span class="token keyword">def</span> <span class="token function">method1</span><span class="token punctuation">(</span>Closure closure<span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token comment">//    执行 b1</span>
    <span class="token function">closure</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行 method1  参数是闭包 b1</span>
    <span class="token function">method1</span><span class="token punctuation">(</span>b1<span class="token punctuation">)</span>

<span class="token comment">// 定义一个带参数的闭包</span>
<span class="token keyword">def</span> b2 <span class="token operator">=</span><span class="token punctuation">{</span>
    v<span class="token operator">-></span>
        println <span class="token interpolation-string"><span class="token string">"hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">v</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span>
<span class="token punctuation">}</span>

<span class="token comment">//定义一个方法 参数是闭包</span>
<span class="token keyword">def</span> <span class="token function">method2</span><span class="token punctuation">(</span>Closure closure<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">closure</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">"b2"</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//执行method2</span>
<span class="token function">method2</span><span class="token punctuation">(</span>b2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>gradle 在Tasks中有build 可以打jar包。打包后在build文件夹下可以找到打包好的jar包。</p>
</li>
<li>
<p>例子</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">'java'</span>
<span class="token punctuation">}</span>

group <span class="token string">'com.lzc'</span>
version <span class="token string">'1.0-SNAPSHOT'</span>

<span class="token comment">/**
 * 指定使用的仓库
 * mavenCentral()表示使用中央仓库
 *
 */</span>
repositories <span class="token punctuation">{</span>
<span class="token comment">//    mavenLocal()表示先从本地仓库找jar包</span>
    <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">/**
 * 放依赖  group、name、version
 * testCompile 表示该jar包在测试的时候作用 (作用域)
 *
 */</span>
dependencies <span class="token punctuation">{</span>
    testImplementation <span class="token string">'org.junit.jupiter:junit-jupiter-api:5.7.0'</span>
    testRuntimeOnly <span class="token string">'org.junit.jupiter:junit-jupiter-engine:5.7.0'</span>
<span class="token comment">//    导入spring的包</span>
    <span class="token comment">// https://mvnrepository.com/artifact/org.springframework/spring-context</span>
    implementation group<span class="token punctuation">:</span> <span class="token string">'org.springframework'</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">'spring-context'</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span> <span class="token string">'5.3.13'</span>

<span class="token punctuation">}</span>

test <span class="token punctuation">{</span>
    <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


