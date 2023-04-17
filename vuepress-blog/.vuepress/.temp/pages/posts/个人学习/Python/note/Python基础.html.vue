<template><div><h4 id="python语言介绍" tabindex="-1"><a class="header-anchor" href="#python语言介绍" aria-hidden="true">#</a> python语言介绍</h4>
<ul>
<li>
<p>编译型语言和解释型语言的区别</p>
<p>编译型：把程序转成机器可以执行的语言，如c-&gt;汇编-&gt;机器码，编译一次之后可以脱离编译环境。</p>
<p>解释型语言:程序在运行时，把程序转成机器可以执行的语言，一边解释，一遍运行，运行时需要带上编译器。</p>
<p>比喻：外国人读金瓶梅，编译型：整本书翻译，读的时候可以一下读完。解释型：带个翻译官，边翻译边读，每次读都需要带上翻译官。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182352343.png" alt="image-20220617203450149"></p>
</li>
</ul>
<h4 id="基础语法" tabindex="-1"><a class="header-anchor" href="#基础语法" aria-hidden="true">#</a> 基础语法</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"run"</span><span class="token punctuation">,</span>i<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型" aria-hidden="true">#</a> 基本数据类型</h4>
<p><img src="http://www.iocaop.com/images/2022-08/202208182352094.png" alt="image-20220617215212791"></p>
<ul>
<li>
<p>整型：<img src="http://www.iocaop.com/images/2022-08/202208182352168.png" alt="image-20220617220209512"></p>
</li>
<li>
<p>字符串</p>
<ul>
<li>
<p>python中所有加了引号的字符都是字符串</p>
</li>
<li>
<p>字符串的特性：</p>
<ul>
<li>
<p>1、不可修改(只是把原来变量的指向改变了，而并没有在内存中修改字符串的值)</p>
</li>
<li>
<p>2、有索引，可切片(有下表，可以substring)</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> name <span class="token operator">=</span> <span class="token string">"lzcnb"</span>
<span class="token operator">>></span><span class="token operator">></span> name
<span class="token string">'lzcnb'</span>
<span class="token operator">>></span><span class="token operator">></span> <span class="token builtin">id</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
<span class="token number">1941796141552</span>
<span class="token comment"># id是一个函数，相当于C语言中的&amp;，取内存地址</span>
<span class="token operator">>></span><span class="token operator">></span> name <span class="token operator">=</span> <span class="token string">"lzc123"</span>
<span class="token operator">>></span><span class="token operator">></span> <span class="token builtin">id</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
<span class="token number">1941796142128</span>
<span class="token comment"># 可以看出两次地址不一样，实际改变的是指针的指向，而不是改变了字符串的值</span>
<span class="token operator">>></span><span class="token operator">></span> name<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token string">'z'</span>
<span class="token comment"># 按下标取</span>
<span class="token operator">>></span><span class="token operator">></span> name<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span>
<span class="token string">'zc'</span>
<span class="token comment"># 字符串截取，相当于Java中的substring 取首不取尾</span>
<span class="token operator">>></span><span class="token operator">></span> name<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"1"</span>
Traceback <span class="token punctuation">(</span>most recent call last<span class="token punctuation">)</span><span class="token punctuation">:</span>
  File <span class="token string">"&lt;stdin>"</span><span class="token punctuation">,</span> line <span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">></span>
TypeError<span class="token punctuation">:</span> <span class="token string">'str'</span> <span class="token builtin">object</span> does <span class="token keyword">not</span> support item assignment
<span class="token comment"># 不可更改，不像C语言中的字符串数组。python中不可更改</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>多行字符串</p>
<p>用三个单引号或双引号包裹</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> name <span class="token operator">=</span> <span class="token triple-quoted-string string">"""lzc
... nb
... 123"""</span>
<span class="token operator">>></span><span class="token operator">></span> name
<span class="token string">'lzc\nnb\n123'</span>
<span class="token operator">>></span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>字符串拼接，使用+即可</p>
</li>
<li>
<p>引用外部变量</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>name <span class="token operator">=</span><span class="token string">"赖卓成"</span>
age <span class="token operator">=</span> <span class="token number">24</span>
school <span class="token operator">=</span> <span class="token string">"南大科院"</span>

<span class="token comment"># 现在想打印出我的个人信息 格式如下，如何实现？</span>
<span class="token comment"># --------个人信息---------</span>
<span class="token comment"># 姓名: 赖卓成</span>
<span class="token comment"># 年龄：24</span>
<span class="token comment"># 学校：南大科院</span>
<span class="token comment"># ------------------------</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"python2输出个人信息"</span><span class="token punctuation">)</span>
msg <span class="token operator">=</span> <span class="token triple-quoted-string string">"""
--------个人信息---------
姓名: %s
年龄：%d
学校：%s
------------------------
"""</span><span class="token operator">%</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>school<span class="token punctuation">)</span>
<span class="token comment"># 需要注意 结束的时候有个百分号，不要漏了</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"python3输出个人信息"</span><span class="token punctuation">)</span>
<span class="token comment"># 上面是python2的写法 python3写法如下</span>
msg <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"""
--------个人信息---------
姓名: </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">
年龄：</span><span class="token interpolation"><span class="token punctuation">{</span>age<span class="token punctuation">}</span></span><span class="token string">
学校：</span><span class="token interpolation"><span class="token punctuation">{</span>school<span class="token punctuation">}</span></span><span class="token string">
------------------------
"""</span></span>
<span class="token keyword">print</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
<li>
<p>布尔</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>score <span class="token operator">=</span><span class="token number">10</span>
<span class="token keyword">if</span> score<span class="token operator">>=</span><span class="token number">10</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"score大于等于10"</span><span class="token punctuation">)</span>
<span class="token keyword">else</span> <span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"score小于10"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>列表</p>
<ul>
<li>基本存取</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>nameList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"name0"</span><span class="token punctuation">,</span><span class="token string">"name1"</span><span class="token punctuation">,</span><span class="token string">"name2"</span><span class="token punctuation">,</span><span class="token string">"name3"</span><span class="token punctuation">,</span><span class="token string">"name4"</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment"># 索引取，结果："name0"</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
<span class="token comment">#全部输出，结果：['name0', 'name1', 'name2', 'name3', 'name4']</span>

<span class="token keyword">for</span> name <span class="token keyword">in</span> nameList<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
<span class="token comment"># 遍历，结果：</span>
<span class="token comment"># name0</span>
<span class="token comment"># name1</span>
<span class="token comment"># name2</span>
<span class="token comment"># name3</span>
<span class="token comment"># name4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>crud</p>
<ul>
<li>
<p>增加</p>
<p>nameList.append(值),nameList.insert(下标,值);</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>nameList<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">"name5"</span><span class="token punctuation">)</span>
nameList<span class="token punctuation">.</span>insert<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token string">"name00"</span><span class="token punctuation">)</span>    
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
<span class="token comment"># append是追加 insert 在指定下标插入某个值</span>
<span class="token comment"># 结果：['name00', 'name0', 'name1', 'name2', 'name3', 'name4', 'name5']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>修改</p>
<p>nameList[下标]  = &quot;值&quot;</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>nameList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"name000"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
<span class="token comment">#结果：['name000', 'name0', 'name1', 'name2', 'name3', 'name4', 'name5']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查</p>
<p>nameList.index(值)，返回下标</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>index <span class="token operator">=</span> nameList<span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token string">"name5"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"name5的下标为</span><span class="token interpolation"><span class="token punctuation">{</span>index<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token comment"># 结果 :name5的下标为6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除</p>
<p>del 变量名、del nameList[下标]， nameList.remove(值)</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>nameList<span class="token punctuation">.</span>remove<span class="token punctuation">(</span><span class="token string">"name2"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
<span class="token comment"># 结果： ['name000', 'name0', 'name1', 'name3', 'name4', 'name5']</span>
<span class="token keyword">del</span> nameList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
<span class="token comment"># 结果：['name0', 'name1', 'name3', 'name4', 'name5']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>切片</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>subNameList <span class="token operator">=</span> nameList<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>subNameList<span class="token punctuation">)</span>
<span class="token comment"># 结果：['name1', 'name3'] 取首不取尾</span>

subNameList <span class="token operator">=</span> nameList<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>subNameList<span class="token punctuation">)</span>
<span class="token comment"># 结果：['name3', 'name4'] 取首不取尾 倒数取</span>
subNameList <span class="token operator">=</span> nameList<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>subNameList<span class="token punctuation">)</span>
<span class="token comment"># 结果：['name3', 'name4'] 取首不取尾 倒数取 不写默认是倒数第一个</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>嵌套</p>
<p>python的列表可以嵌套，没有泛型</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>nameList<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"赖卓成"</span><span class="token punctuation">,</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">312</span><span class="token punctuation">,</span><span class="token string">"nb"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
<span class="token comment"># 结果： ['name0', 'name1', 'name3', 'name4', 'name5', ['赖卓成', 12, 312, 'nb']]</span>

<span class="token comment">#嵌套修改</span>
nameList<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">123</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
<span class="token comment"># 结果：['name0', 'name1', 'name2', 'name3', 'name4', ['赖卓成', 12, 123, 'nb']]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="常用运算符" tabindex="-1"><a class="header-anchor" href="#常用运算符" aria-hidden="true">#</a> 常用运算符</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 100内的偶数</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token comment"># 2的8次方</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token operator">**</span><span class="token number">8</span><span class="token punctuation">)</span>
<span class="token comment"># 整除 返回商的整数部分</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token operator">//</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment"># 不整除</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment"># 集合中是否存在成员</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"name1"</span> <span class="token keyword">in</span> nameList<span class="token punctuation">)</span>
<span class="token comment"># True</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"name10"</span> <span class="token keyword">in</span> nameList<span class="token punctuation">)</span>
<span class="token comment"># False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="接收用户指令" tabindex="-1"><a class="header-anchor" href="#接收用户指令" aria-hidden="true">#</a> 接收用户指令</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 读取用户信息并打印</span>
name <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"请输入用户名："</span><span class="token punctuation">)</span><span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span>
age <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"请输入年龄："</span><span class="token punctuation">)</span><span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span>
school <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"请输入学校："</span><span class="token punctuation">)</span><span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># .strip()去除空格</span>
msg <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"""
---------个人信息---------
姓名:</span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">
年龄:</span><span class="token interpolation"><span class="token punctuation">{</span>age<span class="token punctuation">}</span></span><span class="token string">
学校:</span><span class="token interpolation"><span class="token punctuation">{</span>school<span class="token punctuation">}</span></span><span class="token string">
-------------------------
"""</span></span>

<span class="token keyword">print</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
<span class="token comment"># 运行结果如下：</span>
<span class="token comment"># 请输入用户名：赖卓成</span>
<span class="token comment"># 请输入年龄：24</span>
<span class="token comment"># 请输入学校：南大科院</span>
<span class="token comment"># </span>
<span class="token comment"># ---------个人信息---------</span>
<span class="token comment"># 姓名:赖卓成</span>
<span class="token comment"># 年龄:24</span>
<span class="token comment"># 学校:南大科院</span>
<span class="token comment"># -------------------------</span>
<span class="token comment"># age输入进来的字符串类型 需要转成int型</span>
ageInt <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>ageInt<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">#结果： &lt;class 'int'></span>
<span class="token comment"># isdigit()判断是否为数字</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制" aria-hidden="true">#</a> 流程控制</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>budget <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"你有多少钱？ 输入数字"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> budget <span class="token operator">>=</span><span class="token number">1298</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"可以尝试2398的，服务好"</span><span class="token punctuation">)</span>
<span class="token keyword">elif</span> budget<span class="token operator">>=</span><span class="token number">688</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"688的性价比高"</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"搞不了搞不了"</span><span class="token punctuation">)</span>    

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="基础阶段作业" tabindex="-1"><a class="header-anchor" href="#基础阶段作业" aria-hidden="true">#</a> 基础阶段作业</h4>
<ul>
<li>
<p>作业1： 猜年龄游戏</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"你有10次机会猜年龄"</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
     age <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"请输入你猜的年龄:"</span><span class="token punctuation">)</span>
     <span class="token keyword">if</span> age<span class="token punctuation">.</span>isdigit<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span>
        <span class="token comment"># 假设年龄是24</span>
        age <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
        <span class="token keyword">if</span> age <span class="token operator">></span> <span class="token number">24</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"太大了"</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> age <span class="token operator">&lt;</span><span class="token number">24</span><span class="token punctuation">:</span> 
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"太小了"</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> age <span class="token operator">==</span><span class="token number">24</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"猜对了"</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
     <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"输入错误，请输入数字"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>作业2 ：读取 用户输入的工资，根据工资打印字符串</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    salary <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"请输入你的工资:"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> salary<span class="token punctuation">.</span>isdigit<span class="token punctuation">:</span>
        salary <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span>
        <span class="token keyword">if</span> salary <span class="token operator">==</span> <span class="token number">1000</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"老板,我是你爹"</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> salary <span class="token operator">==</span> <span class="token number">2000</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"老板,wqnmlgbxxx"</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> salary <span class="token operator">==</span><span class="token number">5000</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"老板脑子有坑，背后说坏话"</span><span class="token punctuation">)</span>   
        <span class="token keyword">elif</span> salary <span class="token operator">==</span><span class="token number">10000</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"老板说的有点点问题，但我不说话"</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> salary <span class="token operator">==</span> <span class="token number">20000</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"老板说啥就是啥吧，给钱就行"</span><span class="token punctuation">)</span> 
        <span class="token keyword">elif</span> salary <span class="token operator">==</span> <span class="token number">30000</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"老板老板说什么都是对的。如果有人错了，那一定是我"</span><span class="token punctuation">)</span> 
        <span class="token keyword">elif</span> salary <span class="token operator">==</span> <span class="token number">50000</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"996就像呼吸一样自然"</span><span class="token punctuation">)</span>    
        <span class="token keyword">elif</span> salary <span class="token operator">==</span> <span class="token number">100000</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"公司就是我家"</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"无法判断"</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"输入错误"</span><span class="token punctuation">)</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环" aria-hidden="true">#</a> for循环</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token comment"># range(10)是生成了一个列表[0,1,2,3,4,5,6,7,8,9]    </span>
<span class="token comment"># 把列表里的每一个变量赋值给了i</span>

<span class="token keyword">for</span> name <span class="token keyword">in</span> <span class="token punctuation">[</span><span class="token string">"name0"</span><span class="token punctuation">,</span> <span class="token string">"name1"</span><span class="token punctuation">,</span> <span class="token string">"name2"</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
<span class="token comment"># 将列表里的每个值 赋值给name 然后输出</span>

<span class="token keyword">for</span> char <span class="token keyword">in</span> <span class="token string">"abcdefg"</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span>
<span class="token comment"># 字符串每个下标对应的字符赋值给char然后输出</span>

<span class="token comment"># 打印50到100的偶数</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        
<span class="token comment"># 打印50到100的偶数 倒序</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="嵌套循环" tabindex="-1"><a class="header-anchor" href="#嵌套循环" aria-hidden="true">#</a> 嵌套循环</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment">#  打印楼层</span>
<span class="token keyword">for</span> floor <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"当前在</span><span class="token interpolation"><span class="token punctuation">{</span>floor<span class="token punctuation">}</span></span><span class="token string">层"</span></span><span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> room <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"当前在</span><span class="token interpolation"><span class="token punctuation">{</span>floor<span class="token punctuation">}</span></span><span class="token string">0</span><span class="token interpolation"><span class="token punctuation">{</span>room<span class="token punctuation">}</span></span><span class="token string">室"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="break和continue" tabindex="-1"><a class="header-anchor" href="#break和continue" aria-hidden="true">#</a> break和continue</h4>
<ul>
<li>continue 结束本次循环</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment">#  打印楼层</span>
<span class="token keyword">for</span> floor <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"当前在</span><span class="token interpolation"><span class="token punctuation">{</span>floor<span class="token punctuation">}</span></span><span class="token string">层"</span></span><span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> floor <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">:</span>
        <span class="token keyword">continue</span>  <span class="token comment"># 停止本次循环，进入下次循环</span>
    <span class="token keyword">for</span> room <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"当前在</span><span class="token interpolation"><span class="token punctuation">{</span>floor<span class="token punctuation">}</span></span><span class="token string">0</span><span class="token interpolation"><span class="token punctuation">{</span>room<span class="token punctuation">}</span></span><span class="token string">室"</span></span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>break 结束整个循环</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment">#  打印楼层</span>
<span class="token keyword">for</span> floor <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"当前在</span><span class="token interpolation"><span class="token punctuation">{</span>floor<span class="token punctuation">}</span></span><span class="token string">层"</span></span><span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> floor <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"不走3层"</span><span class="token punctuation">)</span>
        <span class="token keyword">continue</span>  <span class="token comment"># 停止本次循环，进入下次循环</span>
    <span class="token keyword">for</span> room <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> floor <span class="token operator">==</span> <span class="token number">4</span> <span class="token keyword">and</span> room <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"到404之后不走4层"</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"当前在</span><span class="token interpolation"><span class="token punctuation">{</span>floor<span class="token punctuation">}</span></span><span class="token string">0</span><span class="token interpolation"><span class="token punctuation">{</span>room<span class="token punctuation">}</span></span><span class="token string">室"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="打印99乘法表" tabindex="-1"><a class="header-anchor" href="#打印99乘法表" aria-hidden="true">#</a> 打印99乘法表</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 打印99乘法表</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">*</span><span class="token interpolation"><span class="token punctuation">{</span>j<span class="token punctuation">}</span></span><span class="token string">="</span></span><span class="token punctuation">,</span> i <span class="token operator">*</span> j<span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token string">" "</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="打印100内的素数" tabindex="-1"><a class="header-anchor" href="#打印100内的素数" aria-hidden="true">#</a> 打印100内的素数</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 打印100内的素数</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    flag <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> i <span class="token operator">%</span> j <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
            flag <span class="token operator">=</span> <span class="token boolean">False</span>
            <span class="token keyword">break</span>
    <span class="token keyword">if</span> flag<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">是素数"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="打印三角形" tabindex="-1"><a class="header-anchor" href="#打印三角形" aria-hidden="true">#</a> 打印三角形</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 打印三角形</span>
n <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"输入数字："</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> n <span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"* "</span> <span class="token operator">*</span> i<span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"* "</span> <span class="token operator">*</span> <span class="token punctuation">(</span>n <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">-</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="while循环猜年龄" tabindex="-1"><a class="header-anchor" href="#while循环猜年龄" aria-hidden="true">#</a> while循环猜年龄</h4>
<p>允许用户猜3次，若还不对，告诉他你真笨，还想继续猜么？如果用户选择yes，就让他继续猜，no就退出</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 允许用户猜3次，若还不对，告诉他你真笨，还想继续猜么？如果用户选择yes，就让他继续猜，no就退出</span>
<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
    i <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">while</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">:</span>
        num <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"请输入数字:"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> num <span class="token operator">!=</span> <span class="token number">9</span><span class="token punctuation">:</span>
            i <span class="token operator">+=</span> <span class="token number">1</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"猜错了"</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"猜对了"</span><span class="token punctuation">)</span>
            exit<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"你真笨，想继续猜3次吗？输入y继续"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token builtin">str</span> <span class="token operator">==</span> <span class="token string">"y"</span><span class="token punctuation">:</span>
        i <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        exit<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="for-else和while-else" tabindex="-1"><a class="header-anchor" href="#for-else和while-else" aria-hidden="true">#</a> for else和while else</h4>
<p>当循环正常结束时执行else中的语句，没有被break或exit，正常走完。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"循环正常结束"</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">:</span>
        <span class="token keyword">break</span>
<span class="token comment"># 跳出了循环，else中的语句不会执行</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"循环正常结束"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>i <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">while</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">:</span>
    i <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"循环正常结束"</span><span class="token punctuation">)</span>

i <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">while</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">:</span>
    i <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">:</span>
        <span class="token keyword">break</span>
    <span class="token comment"># 跳出了循环 else不会执行</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"循环正常结束"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># for else 求100内的素数</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">101</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> i<span class="token operator">%</span>j <span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">:</span>
            <span class="token keyword">break</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">是素数"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="基础语法阶段练习" tabindex="-1"><a class="header-anchor" href="#基础语法阶段练习" aria-hidden="true">#</a> 基础语法阶段练习</h4>
<ul>
<li>
<p>1、万本金，利息0.0325每年，问连本带息多少年能翻倍？</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 本金</span>
base <span class="token operator">=</span> <span class="token number">10000</span>
<span class="token comment"># 利率</span>
interest <span class="token operator">=</span> <span class="token number">0.0325</span>
year <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">while</span> base <span class="token operator">&lt;</span> <span class="token number">20000</span><span class="token punctuation">:</span>
    base <span class="token operator">=</span> base <span class="token operator">+</span> base <span class="token operator">*</span> interest
    year <span class="token operator">+=</span> <span class="token number">1</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>year<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>2、一个小球，从100米高空坠落，每次反弹会原来一半高度，问第10次反弹完，小球经过多少米？</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 一个小球，从100米高空坠落，每次反弹会原来一半高度，问第10次反弹完，小球经过多少米？</span>
height <span class="token operator">=</span> <span class="token number">100</span>
<span class="token builtin">sum</span> <span class="token operator">=</span> <span class="token number">100</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    height <span class="token operator">=</span> height <span class="token operator">/</span> <span class="token number">2</span>
    <span class="token builtin">sum</span> <span class="token operator">+=</span> height <span class="token operator">*</span> <span class="token number">2</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">sum</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>3、有一堆桃子，猴子每天吃桃子总数的一半并多吃一个，吃了10天，到第11天只剩一个，问猴子吃之前，一共有多少个桃子。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>i <span class="token operator">=</span> <span class="token number">0</span>
count <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">while</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">:</span>
    count <span class="token operator">=</span> <span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span>
    i <span class="token operator">+=</span> <span class="token number">1</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>4、计算1-2+3-4+5-6+7-8.....100的和</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 计算1-2+3-4+5-6+7-8.....100的和</span>
<span class="token builtin">sum</span> <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">sum</span> <span class="token operator">-=</span> i
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token builtin">sum</span> <span class="token operator">+=</span> i
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">sum</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>5、求列表中的最大值</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">34</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">56</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">43</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">76</span><span class="token punctuation">,</span> <span class="token number">84</span><span class="token punctuation">,</span> <span class="token number">52</span><span class="token punctuation">]</span>
maxValue <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
minValue <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> num <span class="token keyword">in</span> data<span class="token punctuation">:</span>
    <span class="token keyword">if</span> num <span class="token operator">></span> maxValue<span class="token punctuation">:</span>
        maxValue <span class="token operator">=</span> num
    <span class="token keyword">if</span> num <span class="token operator">&lt;</span> minValue<span class="token punctuation">:</span>
        minValue <span class="token operator">=</span> num
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"最大值:</span><span class="token interpolation"><span class="token punctuation">{</span>maxValue<span class="token punctuation">}</span></span><span class="token string">,最小值:</span><span class="token interpolation"><span class="token punctuation">{</span>minValue<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>6、从两个列表中各取一个数，如果这两个数的和等于10，则以列表的方式输出这两个数</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>num1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">]</span>
num2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">22</span><span class="token punctuation">]</span>

<span class="token keyword">for</span> value1 <span class="token keyword">in</span> num1<span class="token punctuation">:</span>
    <span class="token keyword">for</span> value2 <span class="token keyword">in</span> num2<span class="token punctuation">:</span>
        <span class="token keyword">if</span> value1 <span class="token operator">+</span> value2 <span class="token operator">==</span> <span class="token number">10</span><span class="token punctuation">:</span>
            result <span class="token operator">=</span> <span class="token punctuation">[</span>value1<span class="token punctuation">,</span> value2<span class="token punctuation">]</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h4>
<h5 id="字符串格式化方法" tabindex="-1"><a class="header-anchor" href="#字符串格式化方法" aria-hidden="true">#</a> 字符串格式化方法</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>s1 <span class="token operator">=</span> <span class="token string">"laizhuocheng"</span>
s2 <span class="token operator">=</span> <span class="token string">"LaiZhuoCheng"</span>
s3 <span class="token operator">=</span> <span class="token string">"lai\tzhuo\tcheng"</span>
s4 <span class="token operator">=</span> <span class="token string">"        laizhuocheng                 "</span>
<span class="token comment"># 首字母大写</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>capitalize<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 方便字符串之前比较，全变成小写</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s2<span class="token punctuation">.</span>casefold<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 规定字符串长度，两边填充字符</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 转换制表符，可以指定转换长度</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s3<span class="token punctuation">.</span>expandtabs<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 将原本的字符串往左边移动，然后填充字符</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>ljust<span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 将原本的字符串往右边移动，然后填充字符</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>rjust<span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 全变小写</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s2<span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 大小写互换</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s2<span class="token punctuation">.</span>swapcase<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 单词首字母大写</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 小写全改成大写</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 规定字符串长度，不够的用0补充,从左边开始</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>zfill<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 两边去空格</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s4<span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 左边去空格</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s4<span class="token punctuation">.</span>lstrip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 右边去空格</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s4<span class="token punctuation">.</span>rstrip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 引用外部变量</span>
msg <span class="token operator">=</span> <span class="token string">"my name is {s1},age={age}"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>s1<span class="token operator">=</span>s1<span class="token punctuation">,</span>age<span class="token operator">=</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="字符串判断方法" tabindex="-1"><a class="header-anchor" href="#字符串判断方法" aria-hidden="true">#</a> 字符串判断方法</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 是否以某字符串开头</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>startswith<span class="token punctuation">(</span><span class="token string">"lai"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 是否以某字符串结束</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">"cheng"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
s5 <span class="token operator">=</span> <span class="token string">"laizhuocheng123"</span>
<span class="token comment"># 是否全是字母或数字</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s5<span class="token punctuation">.</span>isalnum<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 是否全是字母</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s5<span class="token punctuation">.</span>isalpha<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>isalpha<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 是不是整数</span>
s6 <span class="token operator">=</span> <span class="token string">"4156456"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s6<span class="token punctuation">.</span>isdigit<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 如何判断是否是小数？直接强转，如果不报错就是小数</span>

<span class="token comment"># 判断字符串是否为合法的变量名</span>
s7 <span class="token operator">=</span> <span class="token string">"1if"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s7<span class="token punctuation">.</span>isidentifier<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 是否全小写</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>islower<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s2<span class="token punctuation">.</span>islower<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 是否是数字 与isdigit()有什么区别？中文也可以</span>
s8 <span class="token operator">=</span> <span class="token string">"二十五"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s8<span class="token punctuation">.</span>isnumeric<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 是否可以打印，比如图片不可以打印</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span>isprintable<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 是不是空格</span>
s9 <span class="token operator">=</span> <span class="token string">"         "</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s9<span class="token punctuation">.</span>isspace<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 是不是首字母大写</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Hello Jack"</span><span class="token punctuation">.</span>istitle<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 是不是全大写</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"HELLo"</span><span class="token punctuation">.</span>isupper<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="字符串查、改、计数、替换" tabindex="-1"><a class="header-anchor" href="#字符串查、改、计数、替换" aria-hidden="true">#</a> 字符串查、改、计数、替换</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 查找 返回下标</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuocheng"</span><span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">"i"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 切片查找，从3开始到最后</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuochenglaizhuocheng"</span><span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">"i"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 从右边开始找</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuochenglaizhuocheng"</span><span class="token punctuation">.</span>rfind<span class="token punctuation">(</span><span class="token string">"i"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 查找字符串的索引 与find的区别：find找不到返回-1 index找不到直接报错</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuochenglaizhuocheng"</span><span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token string">"i"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 报错实例</span>
<span class="token comment"># print("laizhuochenglaizhuocheng".index("A"))</span>
<span class="token comment"># rindex从右边开始找</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuochenglaizhuocheng"</span><span class="token punctuation">.</span>rindex<span class="token punctuation">(</span><span class="token string">"i"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 某个字符串出现几次</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuochenglaizhuocheng"</span><span class="token punctuation">.</span>count<span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># count也可以切片计数 如从第3个开始到最后</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuochenglaizhuocheng"</span><span class="token punctuation">.</span>count<span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 切片</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuochenglaizhuocheng"</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">"g"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 从右边开始切</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuochenglaizhuocheng"</span><span class="token punctuation">.</span>rsplit<span class="token punctuation">(</span><span class="token string">"g"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 按照行切片</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"lai\nzhuo\ncheng"</span><span class="token punctuation">.</span>splitlines<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 去掉前缀</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"--laizhuocheng--"</span><span class="token punctuation">.</span>removeprefix<span class="token punctuation">(</span><span class="token string">"--"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 去掉后缀</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"--laizhuocheng--"</span><span class="token punctuation">.</span>removesuffix<span class="token punctuation">(</span><span class="token string">"--"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 字符串替换 默认全部替换</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"--laizhuocheng--"</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">"-"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 字符串替换可以指定替换多少次</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"--laizhuocheng--"</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">"-"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="字符串特殊方法" tabindex="-1"><a class="header-anchor" href="#字符串特殊方法" aria-hidden="true">#</a> 字符串特殊方法</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 把列表转成字符串，在每个元素中拼接指定字符串</span>
names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"lai"</span><span class="token punctuation">,</span><span class="token string">"zhuo"</span><span class="token punctuation">,</span><span class="token string">"cheng"</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"-"</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>names<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>密码加密，首先定义可能用到的字符，用来替换的字符，然后生成密码本，在需要加密的字符串上调用加密方法，传入密码本，即可完成加密。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 加密前可能用到的字符</span>
source <span class="token operator">=</span> <span class="token string">"abcdefghij"</span>
<span class="token comment"># 加密之后替换的字符(将可能用到的字符替换为下面的字符)</span>
output <span class="token operator">=</span> <span class="token string">"0123456789"</span>
<span class="token comment"># 生成密码本 source和output长度要一样  生成后ASCII码做了变换</span>
passwordTable <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">.</span>maketrans<span class="token punctuation">(</span>source<span class="token punctuation">,</span> output<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>passwordTable<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuocheng"</span><span class="token punctuation">.</span>translate<span class="token punctuation">(</span>passwordTable<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 所有可打印的字符</span>
source2 <span class="token operator">=</span> string<span class="token punctuation">.</span>printable
<span class="token keyword">print</span><span class="token punctuation">(</span>source2<span class="token punctuation">)</span>

<span class="token comment"># 反转</span>
output2 <span class="token operator">=</span> string<span class="token punctuation">.</span>printable<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>output2<span class="token punctuation">)</span>

passwordTable2 <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">.</span>maketrans<span class="token punctuation">(</span>source2<span class="token punctuation">,</span> output2<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"laizhuocheng"</span><span class="token punctuation">.</span>translate<span class="token punctuation">(</span>passwordTable2<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解密</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 解密，可能用到的字符串和用来替换的字符串反过来就好了</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"l08z7uo274n6"</span><span class="token punctuation">.</span>translate<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">.</span>maketrans<span class="token punctuation">(</span>output<span class="token punctuation">,</span> source<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>统计字符</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 统计字符串中字母、数字、空格、其他字符的个数</span>

numCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
alphaCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
spaceCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
otherCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
    msg <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"输入字符串"</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> char <span class="token keyword">in</span> msg<span class="token punctuation">:</span>
        <span class="token keyword">if</span> char<span class="token punctuation">.</span>isdigit<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            numCount <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">elif</span> char<span class="token punctuation">.</span>isalpha<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            alphaCount <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">elif</span> char<span class="token punctuation">.</span>isspace<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            spaceCount <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span> otherCount<span class="token operator">+=</span><span class="token number">1</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"数字</span><span class="token interpolation"><span class="token punctuation">{</span>numCount<span class="token punctuation">}</span></span><span class="token string">个,字母</span><span class="token interpolation"><span class="token punctuation">{</span>alphaCount<span class="token punctuation">}</span></span><span class="token string">个,空格</span><span class="token interpolation"><span class="token punctuation">{</span>spaceCount<span class="token punctuation">}</span></span><span class="token string">个,其他</span><span class="token interpolation"><span class="token punctuation">{</span>otherCount<span class="token punctuation">}</span></span><span class="token string">个"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="列表" tabindex="-1"><a class="header-anchor" href="#列表" aria-hidden="true">#</a> 列表</h4>
<h5 id="增" tabindex="-1"><a class="header-anchor" href="#增" aria-hidden="true">#</a> 增</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 追加</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"11"</span><span class="token punctuation">,</span> <span class="token string">"22"</span><span class="token punctuation">]</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">"33"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token comment"># 插入 在指定下标插入某个值</span>
data<span class="token punctuation">.</span>insert<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">"00"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将字符串转成列表：将每一个字符作为列表的元素：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>name <span class="token operator">=</span> <span class="token string">"laizhuocheng"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 结果：['l', 'a', 'i', 'z', 'h', 'u', 'o', 'c', 'h', 'e', 'n', 'g']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># clear 清空</span>
nameList<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>

<span class="token comment"># pop 默认删除最后一个元素并返回 可以指定删除某个元素，传入下标即可</span>
nameList <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> nameList<span class="token punctuation">)</span>

<span class="token comment"># remove 删除指定的值，从左到右删除第一个,没有返回值</span>
strList <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token string">"abcabc"</span><span class="token punctuation">)</span>
strList<span class="token punctuation">.</span>remove<span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>strList<span class="token punctuation">)</span>

<span class="token comment"># del 可以删除变量，也可以用来删除列表</span>
<span class="token keyword">del</span> strList

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="改-切片" tabindex="-1"><a class="header-anchor" href="#改-切片" aria-hidden="true">#</a> 改(切片)</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 切片</span>
nameList <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token string">"laizhuocheng"</span><span class="token punctuation">)</span>
<span class="token comment"># 正着切，从左边开始取，取左不取右。生成新的列表，左边不写则默认第0个，右边不写则默认取到最后一个</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment"># 跳着切，如隔两个取一个</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># 从头到尾 隔两个取一个</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">8</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># 从0到8 隔两个取一个</span>
<span class="token comment"># 倒着切</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># 从倒数第四个到倒数第一个，每隔两个取一个，取左边不取右边，倒数第一个不会算进去</span>
<span class="token comment"># 反转</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># 整个字符串，从后面开始(因为步长是负数)，每隔一个取一个。</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="查" tabindex="-1"><a class="header-anchor" href="#查" aria-hidden="true">#</a> 查</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 查</span>
<span class="token comment"># 是否包含 in</span>
nameList <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token string">"laizhuocheng"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"a"</span> <span class="token keyword">in</span> nameList<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 计数，字符串中有多少个子串</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">.</span>count<span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 根据值返回下标</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token string">"g"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="特殊方法" tabindex="-1"><a class="header-anchor" href="#特殊方法" aria-hidden="true">#</a> 特殊方法</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 排序 数字排序 有字符串的话会报错</span>
numList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">54</span><span class="token punctuation">,</span> <span class="token number">5432</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">654</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">6543</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">543</span><span class="token punctuation">,</span> <span class="token number">6234</span><span class="token punctuation">]</span>
numList<span class="token punctuation">.</span>sort<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>numList<span class="token punctuation">)</span>
<span class="token comment"># 倒叙排列</span>
numList<span class="token punctuation">.</span>sort<span class="token punctuation">(</span>reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>numList<span class="token punctuation">)</span>
<span class="token comment"># 列表合并 直接相加 或extend</span>
newList <span class="token operator">=</span> nameList <span class="token operator">+</span> numList
<span class="token keyword">print</span><span class="token punctuation">(</span>newList<span class="token punctuation">)</span>
<span class="token comment"># 将参数里面的列表合并到调用者列表中</span>
nameList<span class="token punctuation">.</span>extend<span class="token punctuation">(</span>numList<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="深浅copy" tabindex="-1"><a class="header-anchor" href="#深浅copy" aria-hidden="true">#</a> 深浅copy</h5>
<p>关于深浅copy，python中讲的太浅，可以参考c/c++:</p>
<p>文章：https://blog.csdn.net/laizhuocheng/article/details/110299211</p>
<p>视频：https://www.bilibili.com/video/BV1ss411A7Dm?p=83&amp;vd_source=6b124edbdeb4ac28a33fb392c361d256</p>
<p>c浅拷贝问题 p83</p>
<p>c++浅拷贝问题 p185</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 浅拷贝</span>
a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"lai"</span><span class="token punctuation">,</span> <span class="token string">"xiao"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span>
b <span class="token operator">=</span> a<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 拷贝后打印a和b，输出的都是一样的</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token comment"># 现在对a进行修改,再打印b 结果a变了，b没变。看起来好像没问题</span>
a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1111111111111111</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token comment"># 但是，再对a中的复杂类型进行修改，打印a和b，发现都被修改了，这就是浅拷贝问题</span>
a<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"LAI"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token comment"># 复制嵌套列表，内层的列表(假设是两层)复制的是内层列表的地址(浅copy)，b中的内层列表和a中的内层列表是同一块内存，</span>
<span class="token comment"># 所以当a中的内层列表修改了元素值，也就是a的内层列表的元素换了指向，b的内层列表里面的值也换了指向，也就变了</span>

<span class="token comment"># 深拷贝 导入深拷贝方法</span>
c <span class="token operator">=</span> copy<span class="token punctuation">.</span>deepcopy<span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
a<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"XIAO"</span> <span class="token comment"># 修改a中内层列表的第0个元素</span>
<span class="token comment"># 打印a和c，发现c内层列表的第0个元素没有跟着修改，完全独立了出来，这就是深copy</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="列表生成式" tabindex="-1"><a class="header-anchor" href="#列表生成式" aria-hidden="true">#</a> 列表生成式</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 列表生成式 需求：要生成 name-1 name-2 name-3 ...name-100 如何实现？</span>
<span class="token comment"># 传统方式</span>
nameList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    nameList<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"name-</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>
<span class="token comment"># 如何更优雅的实现？</span>
nameList1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f"name--</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">"</span></span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nameList1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="列表练习" tabindex="-1"><a class="header-anchor" href="#列表练习" aria-hidden="true">#</a> 列表练习</h5>
<ul>
<li>
<p>1、列表去重</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 列表去重</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"列表去重"</span><span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 方法一</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">543</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">1232</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> data<span class="token punctuation">:</span>
    <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>count<span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        data<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"data:</span><span class="token interpolation"><span class="token punctuation">{</span>data<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token comment"># 方法二:方法一内层循环每次都会count，count会遍历，所以方法二会更优</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">543</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">1232</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">]</span>
kv <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> k <span class="token keyword">in</span> data<span class="token punctuation">:</span>
    v <span class="token operator">=</span> data<span class="token punctuation">.</span>count<span class="token punctuation">(</span>k<span class="token punctuation">)</span>
    <span class="token keyword">if</span> v <span class="token operator">></span> <span class="token number">1</span> <span class="token keyword">and</span> <span class="token punctuation">[</span>k<span class="token punctuation">,</span> v<span class="token punctuation">]</span> <span class="token keyword">not</span> <span class="token keyword">in</span> kv<span class="token punctuation">:</span>
        kv<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span>k<span class="token punctuation">,</span> v<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"kv:</span><span class="token interpolation"><span class="token punctuation">{</span>kv<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> kv<span class="token punctuation">:</span>
    k<span class="token punctuation">,</span> v <span class="token operator">=</span> i<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> i<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>v <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        data<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>k<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"data:</span><span class="token interpolation"><span class="token punctuation">{</span>data<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>2、求列表中第二大的值:</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 找到列表中第二大的值</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">543</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">1232</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">]</span>
<span class="token comment"># 方法一：先找最大值,删除最大值，再求一遍最大值</span>
maxValue <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> item <span class="token keyword">in</span> data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> maxValue <span class="token operator">&lt;</span> item<span class="token punctuation">:</span>
        maxValue <span class="token operator">=</span> item
<span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>count<span class="token punctuation">(</span>maxValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    data<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>maxValue<span class="token punctuation">)</span>
secondValue <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> item <span class="token keyword">in</span> data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> secondValue <span class="token operator">&lt;</span> item<span class="token punctuation">:</span>
        secondValue <span class="token operator">=</span> item
<span class="token keyword">print</span><span class="token punctuation">(</span>secondValue<span class="token punctuation">)</span>

<span class="token comment"># 方法二：冒泡两次</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">543</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">1232</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> data<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> data<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            iValue <span class="token operator">=</span> data<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
            data<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> data<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span>
            data<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> iValue
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token builtin">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>3、判断一个列表是不是另一个列表的子列表</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 判断一个列表是不是另一个列表的子列表</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">543</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">1232</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">]</span>
child <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1232</span><span class="token punctuation">,</span><span class="token number">222</span><span class="token punctuation">]</span>

flag <span class="token operator">=</span> <span class="token boolean">True</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> child<span class="token punctuation">:</span>
    <span class="token keyword">if</span> i <span class="token keyword">not</span> <span class="token keyword">in</span> data<span class="token punctuation">:</span>
        flag <span class="token operator">=</span> <span class="token boolean">False</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>flag<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>4、求出列表中最大值和最小值的平均值最接近的值</p>
<p>我的笨比方法：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 求出列表中最大值和最小值的平均值最接近的值</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">543</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">1232</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span>
<span class="token comment"># 去重</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> data<span class="token punctuation">:</span>
    <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>count<span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        data<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>i<span class="token punctuation">)</span>
maxValue <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
minValue <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> data<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> maxValue <span class="token operator">&lt;</span> i<span class="token punctuation">:</span> maxValue <span class="token operator">=</span> i
    <span class="token keyword">if</span> minValue <span class="token operator">></span> i<span class="token punctuation">:</span> minValue <span class="token operator">=</span> i
<span class="token keyword">print</span><span class="token punctuation">(</span>minValue<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>maxValue<span class="token punctuation">)</span>
avg <span class="token operator">=</span> <span class="token punctuation">(</span>minValue <span class="token operator">+</span> maxValue<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">)</span>
<span class="token comment"># 默认距离 第0个元素和平均值</span>
distance <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">if</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">></span> avg<span class="token punctuation">:</span>
    distance <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span> avg
<span class="token keyword">else</span><span class="token punctuation">:</span>
    distance <span class="token operator">=</span> avg <span class="token operator">-</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token comment"># 上一个遍历的值和平均值的举例 默认最大值到最小值的举例</span>
distance <span class="token operator">=</span> maxValue <span class="token operator">-</span> minValue
<span class="token comment"># 最终结果</span>
closeValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> data<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> avg<span class="token punctuation">:</span>
        newDistance <span class="token operator">=</span> data<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> avg
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        newDistance <span class="token operator">=</span> avg <span class="token operator">-</span> data<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> newDistance <span class="token operator">&lt;</span> distance<span class="token punctuation">:</span>
        distance <span class="token operator">=</span> newDistance
        closeValue <span class="token operator">=</span> data<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>distance<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>closeValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看视频后优化的方法：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 优化</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">543</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">1232</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span>
maxValue <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
minValue <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> data<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> maxValue <span class="token operator">&lt;</span> i<span class="token punctuation">:</span> maxValue <span class="token operator">=</span> i
    <span class="token keyword">if</span> minValue <span class="token operator">></span> i<span class="token punctuation">:</span> minValue <span class="token operator">=</span> i
<span class="token keyword">print</span><span class="token punctuation">(</span>minValue<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>maxValue<span class="token punctuation">)</span>

avg <span class="token operator">=</span> <span class="token punctuation">(</span>minValue <span class="token operator">+</span> maxValue<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"avg:</span><span class="token interpolation"><span class="token punctuation">{</span>avg<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
closeValue <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> data<span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token builtin">abs</span><span class="token punctuation">(</span>avg <span class="token operator">-</span> i<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token builtin">abs</span><span class="token punctuation">(</span>avg <span class="token operator">-</span> closeValue<span class="token punctuation">)</span><span class="token punctuation">:</span>
        closeValue <span class="token operator">=</span> i
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"找到更近的了</span><span class="token interpolation"><span class="token punctuation">{</span>closeValue<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>closeValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>5、双色球抽奖程序(重点是如何优雅的实现)</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 双色球抽奖程序 五个红球(1-32) 一个篮球(1-16) 用户选五个红球一个篮球</span>
<span class="token comment"># 列表 分别代表 [个数,最小值,最大值,"什么球"]</span>
li <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token string">"红球"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token string">"篮球"</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
redBlueBall <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> item <span class="token keyword">in</span> li<span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>item<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        red <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"请选择第</span><span class="token interpolation"><span class="token punctuation">{</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span></span><span class="token string">个</span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">(</span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">)"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">while</span> <span class="token keyword">not</span> red<span class="token punctuation">.</span>isdigit<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">or</span> <span class="token builtin">int</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span> <span class="token operator">&lt;</span> item<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">or</span> <span class="token builtin">int</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span> <span class="token operator">></span> item<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            red <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"错误,请重新选择第</span><span class="token interpolation"><span class="token punctuation">{</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span></span><span class="token string">个</span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">(1-32)"</span></span><span class="token punctuation">)</span>
        redBlueBall<span class="token punctuation">.</span>append<span class="token punctuation">(</span>red<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"你选择是双色球为：</span><span class="token interpolation"><span class="token punctuation">{</span>redBlueBall<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>6、购物车小程序</p>
<p>需求：程序实现打印商品列表，用户可以通过商品编号来选购商品，允许不断购买商品。程序启动时，让用户输入自己的工资，总购物的价格不能超过工资，用户可退出程序，退出时打印，分别买了哪些商品及余额。</p>
<p>我的垃圾代码：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 程序实现打印商品列表，用户可以通过商品编号来选购商品，允许不断购买商品。程序启动时，让用户输入自己的工资，总购物的价格不能超过工资，用户可退出程序，退出时打印，分别买了哪些商品及余额。</span>

<span class="token comment"># 商品列表 属性：编号、名字、单价</span>
goods <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1001</span><span class="token punctuation">,</span> <span class="token string">"鼠标"</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1002</span><span class="token punctuation">,</span> <span class="token string">"键盘"</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1003</span><span class="token punctuation">,</span> <span class="token string">"显示器"</span><span class="token punctuation">,</span> <span class="token number">800</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1004</span><span class="token punctuation">,</span> <span class="token string">"桌子"</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"欢迎使用购物系统"</span><span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
noList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> good <span class="token keyword">in</span> goods<span class="token punctuation">:</span>
    noList<span class="token punctuation">.</span>append<span class="token punctuation">(</span>good<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>good<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">\t</span><span class="token interpolation"><span class="token punctuation">{</span>good<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">\t</span><span class="token interpolation"><span class="token punctuation">{</span>good<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">元"</span></span><span class="token punctuation">.</span>expandtabs<span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">55</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 购物车 属性：编号、名字、单价</span>
cart <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
cast <span class="token operator">=</span> <span class="token number">0</span>
money <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"你有多少钱？"</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token keyword">not</span> money<span class="token punctuation">.</span>isdigit<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"输入错误，重新输入"</span><span class="token punctuation">)</span>
money <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>money<span class="token punctuation">)</span>
flag <span class="token operator">=</span><span class="token boolean">True</span>
<span class="token keyword">while</span> flag<span class="token punctuation">:</span>
    no <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"请输入需要加入购物车的商品编号(输入0退出):"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token builtin">int</span><span class="token punctuation">(</span>no<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">break</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> no<span class="token punctuation">.</span>isdigit<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">or</span> <span class="token builtin">int</span><span class="token punctuation">(</span>no<span class="token punctuation">)</span> <span class="token keyword">not</span> <span class="token keyword">in</span> noList<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"输入错误，重新输入"</span><span class="token punctuation">)</span>
        <span class="token keyword">continue</span>
    <span class="token keyword">for</span> good <span class="token keyword">in</span> goods<span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token builtin">int</span><span class="token punctuation">(</span>no<span class="token punctuation">)</span> <span class="token operator">==</span> good<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            cast <span class="token operator">+=</span> good<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
            <span class="token keyword">if</span> cast <span class="token operator">&lt;</span> money<span class="token punctuation">:</span>
                cart<span class="token punctuation">.</span>append<span class="token punctuation">(</span>good<span class="token punctuation">)</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                cast <span class="token operator">-=</span> good<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"消费不起咯哦"</span><span class="token punctuation">)</span>
                flag <span class="token operator">=</span> <span class="token boolean">False</span>
distinctCast <span class="token operator">=</span> copy<span class="token punctuation">.</span>deepcopy<span class="token punctuation">(</span>cart<span class="token punctuation">)</span>
<span class="token keyword">for</span> item <span class="token keyword">in</span> distinctCast<span class="token punctuation">:</span>
    <span class="token keyword">while</span> distinctCast<span class="token punctuation">.</span>count<span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">:</span>
        distinctCast<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"结账"</span><span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> item <span class="token keyword">in</span> distinctCast<span class="token punctuation">:</span>
    count <span class="token operator">=</span> cart<span class="token punctuation">.</span>count<span class="token punctuation">(</span>item<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">\t</span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">\t</span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">元\t</span><span class="token interpolation"><span class="token punctuation">{</span>count<span class="token punctuation">}</span></span><span class="token string">\t</span><span class="token interpolation"><span class="token punctuation">{</span>count <span class="token operator">*</span> item<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">.</span>expandtabs<span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"一共消费</span><span class="token interpolation"><span class="token punctuation">{</span>cast<span class="token punctuation">}</span></span><span class="token string">,余额:</span><span class="token interpolation"><span class="token punctuation">{</span>money <span class="token operator">-</span> cast<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="元组" tabindex="-1"><a class="header-anchor" href="#元组" aria-hidden="true">#</a> 元组</h4>
<p>只读列表，只能查、删，不能修改，增加。</p>
<p>声明：names = ()就是一个元组。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182352413.png" alt="元组"></p>
<p>元组是不可以修改的</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182352145.png" alt="元组不支持修改操作"></p>
<p>有一种情况是可以修改的，元组里面的列表是可以修改列表元素的，因为存储的是指向列表的指针，指针没有修改，修改的是指针指向的内存的值。<img src="http://www.iocaop.com/images/2022-08/202208182352886.png" alt="image-20220722231119843"></p>
<p>问题：在什么时候用到元组？</p>
<p>在你想定义一些数据，只能给别人用，而不想被别人修改的时候使用元组。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 元组</span>
names <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>names<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 元组只能查、删，不能增加、修改</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>names<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment"># 和列表一样吗，可以切片，取首不取尾</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>names<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># 不可以重新赋值(修改)</span>
<span class="token comment"># names[0] = 2</span>


<span class="token comment"># 元组里面的列表是可以修改的</span>
names <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>names<span class="token punctuation">)</span>
names<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">'test'</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>names<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="字典" tabindex="-1"><a class="header-anchor" href="#字典" aria-hidden="true">#</a> 字典</h4>
<p>与json类似，k-v结构，查询非常方便，而且不会因为数据量变大而查询变慢，key必须唯一。</p>
<p>key必须是不可变的、唯一的(不能重复，虽然不会报错，但是下面的会把上面的覆盖，因为是基于hash的)，可以是字符、数字、甚至是元组。python3.7是无序的，之后是有序的。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 字典的key可以是字符、数字、元组</span>
dict1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"lzc"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token string">"123"</span><span class="token punctuation">}</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>dict1<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>dict1<span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>dict1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182353806.png" alt="字典的key"></p>
<h5 id="字典的增删改查" tabindex="-1"><a class="header-anchor" href="#字典的增删改查" aria-hidden="true">#</a> 字典的增删改查</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 创建字典的方法</span>
<span class="token comment"># 方法1：</span>
person <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"lzc"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">24</span><span class="token punctuation">}</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>

<span class="token comment"># 方法2</span>
person <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">"lz1c"</span><span class="token punctuation">,</span> age<span class="token operator">=</span><span class="token number">25</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>'name'<span class="token operator">:</span> 'lzc'<span class="token punctuation">,</span> 'age'<span class="token operator">:</span> <span class="token number">24</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span>'name'<span class="token operator">:</span> 'lz1c'<span class="token punctuation">,</span> 'age'<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 字典的新增</span>
<span class="token comment"># 方法1：直接加上去就好</span>
person<span class="token punctuation">[</span><span class="token string">"salary"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">9000</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
<span class="token comment"># 方法2：检查式新增，如果key不存在则新增并返回，如果已存在则返回已存在的key和value</span>
person<span class="token punctuation">.</span>setdefault<span class="token punctuation">(</span><span class="token string">"nickName"</span><span class="token punctuation">,</span><span class="token string">"赖卓成"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
<span class="token comment"># 可以看到如果已存在，不更新，也不新增，只是返回已存在的k-v</span>
person<span class="token punctuation">.</span>setdefault<span class="token punctuation">(</span><span class="token string">"nickName"</span><span class="token punctuation">,</span><span class="token string">"赖卓成666"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>'name'<span class="token operator">:</span> 'lz1c'<span class="token punctuation">,</span> 'age'<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> 'salary'<span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span>'name'<span class="token operator">:</span> 'lz1c'<span class="token punctuation">,</span> 'age'<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> 'salary'<span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span> 'nickName'<span class="token operator">:</span> '赖卓成'<span class="token punctuation">}</span>
<span class="token punctuation">{</span>'name'<span class="token operator">:</span> 'lz1c'<span class="token punctuation">,</span> 'age'<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> 'salary'<span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span> 'nickName'<span class="token operator">:</span> '赖卓成'<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 字典的修改</span>
<span class="token comment"># 方法1：普通修改，其实和新增是一样的，只是在传参的时候，传已存在的key，重新赋值</span>
person<span class="token punctuation">[</span><span class="token string">'nickName'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"赖卓成666"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
<span class="token comment"># 字典可以嵌套</span>
person<span class="token punctuation">[</span><span class="token string">'info'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"name1"</span><span class="token punctuation">:</span><span class="token string">"nam1"</span><span class="token punctuation">,</span><span class="token string">"age1"</span><span class="token punctuation">:</span><span class="token number">222</span><span class="token punctuation">}</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
<span class="token comment"># 修改字典中的字典</span>
person<span class="token punctuation">[</span><span class="token string">'info'</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"name1"</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">"nam11111111111"</span>
<span class="token comment"># 字典中可以包含列表</span>
person<span class="token punctuation">[</span><span class="token string">"girlFriend"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"g1"</span><span class="token punctuation">,</span><span class="token string">"g2"</span><span class="token punctuation">,</span><span class="token string">"g3"</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
<span class="token comment"># 可以直接修改字典中的列表</span>
person<span class="token punctuation">[</span><span class="token string">"girlFriend"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"g333"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>'name'<span class="token operator">:</span> 'lz1c'<span class="token punctuation">,</span> 'age'<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> 'salary'<span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span> 'nickName'<span class="token operator">:</span> '赖卓成<span class="token number">666</span>'<span class="token punctuation">}</span>
<span class="token punctuation">{</span>'name'<span class="token operator">:</span> 'lz1c'<span class="token punctuation">,</span> 'age'<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> 'salary'<span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span> 'nickName'<span class="token operator">:</span> '赖卓成<span class="token number">666</span>'<span class="token punctuation">,</span> 'info'<span class="token operator">:</span> <span class="token punctuation">{</span>'name1'<span class="token operator">:</span> 'nam1'<span class="token punctuation">,</span> 'age1'<span class="token operator">:</span> <span class="token number">222</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span>'name'<span class="token operator">:</span> 'lz1c'<span class="token punctuation">,</span> 'age'<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> 'salary'<span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span> 'nickName'<span class="token operator">:</span> '赖卓成<span class="token number">666</span>'<span class="token punctuation">,</span> 'info'<span class="token operator">:</span> <span class="token punctuation">{</span>'name1'<span class="token operator">:</span> 'nam11111111111'<span class="token punctuation">,</span> 'age1'<span class="token operator">:</span> <span class="token number">222</span><span class="token punctuation">}</span><span class="token punctuation">,</span> 'girlFriend'<span class="token operator">:</span> <span class="token punctuation">[</span>'g1'<span class="token punctuation">,</span> 'g2'<span class="token punctuation">,</span> 'g3'<span class="token punctuation">]</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span>'name'<span class="token operator">:</span> 'lz1c'<span class="token punctuation">,</span> 'age'<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> 'salary'<span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span> 'nickName'<span class="token operator">:</span> '赖卓成<span class="token number">666</span>'<span class="token punctuation">,</span> 'info'<span class="token operator">:</span> <span class="token punctuation">{</span>'name1'<span class="token operator">:</span> 'nam11111111111'<span class="token punctuation">,</span> 'age1'<span class="token operator">:</span> <span class="token number">222</span><span class="token punctuation">}</span><span class="token punctuation">,</span> 'girlFriend'<span class="token operator">:</span> <span class="token punctuation">[</span>'g1'<span class="token punctuation">,</span> 'g2'<span class="token punctuation">,</span> 'g333'<span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


