<template><div><p>B站教程地址：<a href='https://www.bilibili.com/video/BV1cr4y1671t?spm_id_from=333.337.search-card.all.click&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a></p>
<h4 id="基础篇" tabindex="-1"><a class="header-anchor" href="#基础篇" aria-hidden="true">#</a> 基础篇</h4>
<h2 id="p3-认识nosql" tabindex="-1"><a class="header-anchor" href="#p3-认识nosql" aria-hidden="true">#</a> p3-认识NoSQL</h2>
<p>关系型数据库 VS 非关系型数据库</p>
<table>
<thead>
<tr>
<th></th>
<th>SQL</th>
<th>NoSQL</th>
</tr>
</thead>
<tbody>
<tr>
<td>结构化(Structured)</td>
<td>结构化：比如定义用户表:id、name、age。并且可以给id加主键约束，name加唯一约束，age加上无符号整型约束，等等约束。<strong>约束定义好了，表的结构就定下来了，插入数据都需要严格遵守这些规定</strong>，数据库会对数据进行校验，不符合约束则会报错。结构化数据带来的问题之一：表结构在项目设计之初就应该定下来，后面有修改影响较大。</td>
<td>非结构化：如redis是典型的k-v键值存储数据库。对于key-value<strong>没有那么强的约束</strong>。除了kv还有document型，如json，字段可以是任意的，内容也是任意的，字段约束较为松散。除此之外，还有图graph。</td>
</tr>
<tr>
<td>关联(Relational)</td>
<td>eg：现在有用户(id,name,age)、商品(id,title,price)、订单(id,user_id,item_id)三张表，订单表关联用户表id和商品表id，就知道谁买了什么商品。<strong>表之间通过外键关联</strong>，一旦建立关系，当删除数据的时候，不允许，因为在其他表有关联，数据库则会维护他们的关系，关联后可以节省存储空间，在另一张表只需要存储关联表的id就好了。</td>
<td>没有表和表之间的外键关系，没有关联。但是有个缺点，数据会重复，如张三买了苹果12.李四也买了。但是手机信息要在两条数据中都保存。数据库不会帮助维护表和表之间的关系，是非关联的。</td>
</tr>
<tr>
<td>SQL查询</td>
<td>支持SQL查询，格式是固定的，语法也是固定的，只要是关系型数据库，都可以使用相同的语句进行查询。</td>
<td>非SQL，没有固定的语法格式。如redis get user:1 ，MongoDb db.users.find({_id:1})，es GET http://localhost:9200/users/1</td>
</tr>
<tr>
<td>事务</td>
<td>关系型数据库满足ACID特性</td>
<td>无事务或无法满足事务的强一致性</td>
</tr>
<tr>
<td>存储方式(大多数)</td>
<td>磁盘存储</td>
<td>内存存储</td>
</tr>
<tr>
<td>使用场景</td>
<td>数据结构固定、业务数据安全性、一致性要求高</td>
<td>数据结构不固定、一致性、安全性要求不高、性能要求高</td>
</tr>
<tr>
<td>扩展性</td>
<td>垂直(设计之初没有考虑分布式、数据分片需求，存储在本机，虽然支持主从，只是提升了机器数量、无法提升数据存储的量，因为主从是同步的，一样的数据) 可以基于第三方组件实现分库、但是会增加开发难度</td>
<td>水平(redis、es在设计之初考虑了数据拆分的需求，在插入数据的时候，会基于数据的id或唯一标识，做哈希运算，根据哈希结果判断数据应该存储在哪个节点上)</td>
</tr>
</tbody>
</table>
<p>{% gi 3%}</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182337544.png" alt="结构化的"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182337743.png" alt="关系型的"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182337620.png" alt="非关系型的"></p>
<p>{% endgi %}</p>
<h2 id="p4-认识redis" tabindex="-1"><a class="header-anchor" href="#p4-认识redis" aria-hidden="true">#</a> p4-认识redis</h2>
<p>特征：</p>
<ol>
<li>键值型(key-value)，value支持多种不同数据结构，功能丰富</li>
<li>单线程，每个命令具备原子性。(redis6多线程是指网络连接是多线程的，命令执行还是单线程)</li>
<li>低延迟，速度快(基于内存、IO多路复用、C语言良好的编码)</li>
<li>支持数据持久化(rdb,aof)</li>
<li>redis支持主从集群、分片集群(多态机器存数据，如总共1T，分别存在不同的服务器)</li>
</ol>
<h2 id="p5-安装redis及三种启动的方式" tabindex="-1"><a class="header-anchor" href="#p5-安装redis及三种启动的方式" aria-hidden="true">#</a> p5-安装redis及三种启动的方式</h2>
<ul>
<li><a class="btn" href="http://www.iocaop.com/2022/06/24/2022-my/%E8%B5%84%E6%96%99/Redis%E5%AE%89%E8%A3%85%E8%AF%B4%E6%98%8E/#Redis%E5%AE%89%E8%A3%85%E8%AF%B4%E6%98%8E" title="安装说明文档" style="color:blue;">安装说明文档</a></li>
</ul>
<h2 id="p6-redis命令行客户端" tabindex="-1"><a class="header-anchor" href="#p6-redis命令行客户端" aria-hidden="true">#</a> p6-redis命令行客户端</h2>
<p>在安装说明中有详细介绍</p>
<ul>
<li>
<p>连接</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>redis-cli <span class="token parameter variable">-h</span> <span class="token number">127.0</span>.0.1 <span class="token parameter variable">-p</span> <span class="token number">6379</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>连接后使用ping命令，提示未鉴权。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182337735.png" alt="image-20220627220000708"></p>
<p>如果设置了密码，需要在命令中加上-a来输入密码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>redis-cli <span class="token parameter variable">-h</span> <span class="token number">127.0</span>.0.1 <span class="token parameter variable">-p</span> <span class="token number">6379</span> <span class="token parameter variable">-a</span> <span class="token number">911823</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是会提示不安全:</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182337293.png" alt="image-20220627220202021"></p>
<p>所以使用-u来指定密码,或者不指定密码，进入后使用AUTH指定密码:</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182337959.png" alt="image-20220627220302275"></p>
</li>
<li>
<p>简单命令</p>
<p>选择库:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token keyword">select</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>简单存取：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">set</span> <span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token punctuation">[</span>value<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182337169.png" alt="image-20220627220405090"></p>
<h2 id="p8-数据结构介绍" tabindex="-1"><a class="header-anchor" href="#p8-数据结构介绍" aria-hidden="true">#</a> p8-数据结构介绍</h2>
</li>
</ul>
<p>redis是一个key-value的数据库，key一般是String类型，不过value的类型多种多样:</p>
<table>
<thead>
<tr>
<th>value的类型</th>
<th>举例</th>
</tr>
</thead>
<tbody>
<tr>
<td>String</td>
<td>hello world</td>
</tr>
<tr>
<td>Hash</td>
<td>{name:&quot;lzc&quot;,age:24}</td>
</tr>
<tr>
<td>List</td>
<td>[A-&gt;B-&gt;C-&gt;D]</td>
</tr>
<tr>
<td>Set</td>
<td>{A,B,C}</td>
</tr>
<tr>
<td>SortedSet</td>
<td>{A:1,B:2,C:3}</td>
</tr>
<tr>
<td>GEO(地图坐标)</td>
<td>{A:(120.3,30.5)}</td>
</tr>
<tr>
<td>BitMap</td>
<td>01101001010001101</td>
</tr>
<tr>
<td>HyperLog</td>
<td>01101001010001101</td>
</tr>
</tbody>
</table>
<p>初步学习可以在官方文档查找命令:<a  href="https://redis.io/commands/?group=string" title="redis官方命令文档" style="color:blue;">redis官方命令文档</a>，或者在redis-cli输入help @数据类型,如:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">help</span> @string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182337522.png" alt="image-20220627221621379"></p>
<h2 id="p9-通用命令" tabindex="-1"><a class="header-anchor" href="#p9-通用命令" aria-hidden="true">#</a> p9-通用命令</h2>
<p>在官方文档过滤generic或者cli输入help @generic可以查看通用命令使用说明。</p>
<ul>
<li>
<p>keys 查找符合模板的所有key，<span style="color:red;">不建议在生成环境设备上使用，如果在主节点上使用会阻塞所有的请求</span></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182337372.png" alt="image-20220627222020611"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys n* <span class="token comment"># 查找n开头的key</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys * <span class="token comment"># 查找所有的key</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>del 删除指定的key 可以删除多个key</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys * <span class="token comment"># 当前所有key</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> mset k1 v1 k2 v2 k3 v3 k4 v4 批量插入key-value
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys * <span class="token comment"># 查找所有key</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"k2"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"k1"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"k3"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">"k4"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> del k1 k2 k3 k4 <span class="token comment"># 删除多个key</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">4</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys * <span class="token comment"># 查找所有key</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>exists 判断key是否存在</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> EXISTS  name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span> <span class="token comment"># 存在返回1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> EXISTS  k1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span> <span class="token comment"># 不存在返回0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>expire 给一个key设置有效期，有效期到时key会被自动删除。因为redis是基于内存存储，如果在插入key时不设置有效期，默认是永久存储，给key设置有效期可以节省内存空间，如短信验证码，可以设置五分钟，具体根据业务需求设置。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">help</span> expire <span class="token comment"># 查询命令</span>

  EXPIRE key seconds
  summary: Set a key's <span class="token function">time</span> to live <span class="token keyword">in</span> seconds
  since: <span class="token number">1.0</span>.0
  group: generic

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> expire name <span class="token number">600</span> <span class="token comment"># 给key设置有效期(秒)</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>ttl 查看一个key的剩余有效期</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name <span class="token comment"># 查询命令有效期</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">485</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="p10-string类型" tabindex="-1"><a class="header-anchor" href="#p10-string类型" aria-hidden="true">#</a> p10-String类型</h2>
<p>String类型，也就是字符串类型，是redis中最简单的存储类型。</p>
<p>其value是字符串，不通过根据字符串的格式不同，又可以分为3类:</p>
<ul>
<li>string：普通字符串</li>
<li>int：整数型，可以做自增、自减操作</li>
<li>float：浮点类型，可以做自增、自减操作</li>
</ul>
<p>不管是哪种格式，底层都是字节数组存储形式，只不过是编码方式不同。字符串类型的最大空间不能超过512M。</p>
<table>
<thead>
<tr>
<th>KEY</th>
<th>VALUE</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>msg</td>
<td>hello world</td>
<td>将字符转成对应的字节码。如果你愿意，甚至可以将一张图片转成字节，存在redis的string中。</td>
</tr>
<tr>
<td>num</td>
<td>10</td>
<td>将字节数组直接转为2进制，一个字节(8位)可以表达很大的数字了。</td>
</tr>
<tr>
<td>score</td>
<td>92.5</td>
<td>将字节数组直接转为2进制</td>
</tr>
</tbody>
</table>
<p>String常见的命令有:</p>
<ul>
<li>
<p>set 添加或者修改意见存在的一个String类型的键值对</p>
</li>
<li>
<p>get 根据key获取String类型的value</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> exam exam
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get exam
<span class="token string">"exam"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>mset 批量添加多个String类型的键值对</p>
</li>
<li>
<p>mget 根据多个key获取多个String类型的value</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> mset k1 v1 k2 v2 k3 v3
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> mget k1 k2 k3
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"v1"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"v2"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"v3"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>incr 让一个整型的key自增1</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> num <span class="token number">1</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incr num
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incr num
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incr num
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">4</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> DECR num <span class="token comment"># 自减</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> DECRBY num <span class="token number">2</span> <span class="token comment"># 自减</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>incrby 让一个key自增指定步长，如 incrby num 2，让num自增2，自减decrby或者自增时给负数即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incrby num <span class="token number">2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">6</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>incrbyfloat 让一个浮点型的数字自增指定步长，自减给负数即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incr floatnum <span class="token comment"># 浮点型不可用该命令自增</span>
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> ERR value is not an integer or out of range 
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incrbyfloat floatnum <span class="token number">0.1</span>
<span class="token string">"1.2"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>setnx 添加一个String类型的键值对，前提是这个key不存在，否则不执行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"exam"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"num"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"k2"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"k1"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">"k3"</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">"float"</span>
<span class="token number">7</span><span class="token punctuation">)</span> <span class="token string">"floatnum"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setnx exam examnx
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span> <span class="token comment"># exam已经存在，不执行，返回0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setnx name lzc
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span> <span class="token comment"># name不存在，执行，返回1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> name lzc nx <span class="token comment"># set后面跟nx和setnx效果类似</span>
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span> <span class="token comment"># 已存在，不执行</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> name1 lzc nx
OK <span class="token comment"># 不存在，执行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>setex 添加一个String类型的键值对，在保存key的同时指定有效期，相当于set 和expire结合</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setex name2 <span class="token number">100</span> lzc
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name2
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">97</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="p11-key的层级格式" tabindex="-1"><a class="header-anchor" href="#p11-key的层级格式" aria-hidden="true">#</a> p11-Key的层级格式</h2>
<p>Redis中没有类似MySQL中Table的概念，我们该如何区分不同类型的key呢？</p>
<ul>
<li>例如，需要存储用户、商品信息到redis中，有一个用户id是1，有一个商品的id恰好也是1</li>
</ul>
<p>key的结构：redis中的key允许多个单词形成层级结构，多个单词之间用<span style="color:red">:</span>隔开，格式如下：</p>
<div class="language-tex ext-tex line-numbers-mode"><pre v-pre class="language-tex"><code>项目名:业务名:类型:id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个格式非固定的，也可以根据自己的需求来添加或删除词条，例如项目名字叫heima，有user和product两种不同类型的数据，我们可以这样定义key:</p>
<ul>
<li>user相关的key:heima:user:1</li>
<li>product相关的key:heima:product:1</li>
</ul>
<p>如果value是一个Java对象，例如一个User对象，则可以将对象序列化为json字符串后存储:</p>
<table>
<thead>
<tr>
<th>KEY</th>
<th>VALUE</th>
</tr>
</thead>
<tbody>
<tr>
<td>heima:user:1</td>
<td>{&quot;id&quot;:1,&quot;name&quot;:&quot;lzc&quot;,&quot;age&quot;:24}</td>
</tr>
<tr>
<td>heima:product:1</td>
<td>{&quot;id&quot;:1,&quot;name&quot;:&quot;IPhone12&quot;,&quot;price&quot;:8499}</td>
</tr>
</tbody>
</table>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> heima:user:1 <span class="token string">'{"id":1,"name":"lzc","age":24}'</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> heima:product:1 <span class="token string">'{"id":1,"name":"IPhone12","price":8499}'</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> mget heima:user:1 heima:product:1
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"{<span class="token entity" title="\&quot;">\"</span>id<span class="token entity" title="\&quot;">\"</span>:1,<span class="token entity" title="\&quot;">\"</span>name<span class="token entity" title="\&quot;">\"</span>:<span class="token entity" title="\&quot;">\"</span>lzc<span class="token entity" title="\&quot;">\"</span>,<span class="token entity" title="\&quot;">\"</span>age<span class="token entity" title="\&quot;">\"</span>:24}"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"{<span class="token entity" title="\&quot;">\"</span>id<span class="token entity" title="\&quot;">\"</span>:1,<span class="token entity" title="\&quot;">\"</span>name<span class="token entity" title="\&quot;">\"</span>:<span class="token entity" title="\&quot;">\"</span>IPhone12<span class="token entity" title="\&quot;">\"</span>,<span class="token entity" title="\&quot;">\"</span>price<span class="token entity" title="\&quot;">\"</span>:8499}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当通过图形化界面查看时，可以很好的区分层级：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182337490.png" alt="图形化界面查看"></p>
<h2 id="p12-hash类型" tabindex="-1"><a class="header-anchor" href="#p12-hash类型" aria-hidden="true">#</a> p12-Hash类型</h2>
<p>Hash类型，也叫散列，其value是一个无序字典，类似Java中的HashMap结构。</p>
<p>String结构是将对象序列化为json字符串后存储，当需要<strong>修改对象某个字段时很不方便</strong>:</p>
<table>
<thead>
<tr>
<th>KEY</th>
<th>VALUE</th>
</tr>
</thead>
<tbody>
<tr>
<td>heima:user:1</td>
<td>{name:&quot;jack&quot;,age:21}</td>
</tr>
<tr>
<td>heima:user:2</td>
<td>{name:&quot;rose&quot;,age:18}</td>
</tr>
</tbody>
</table>
<p>Hash结构可以将对象中的每个字段独立存储。可以针对单个字段做CRUD:</p>
<table>
    <tr> 
    	<th>KEY</th>
        <th colspan="2" style="text-align:center">VALUE</th>
   </tr>
	<tr> 
    	<td>KEY</td>
        <td >field</td>
        <td >value</td>
   </tr>
    <tr> 
    	<td rowspan="2">heima:user:1</td>
        <td >name</td>
        <td >jack</td>
   </tr>
    <tr> 
        <td>age</td>
        <td >21</td>
    </tr>
        <tr> 
    	<td rowspan="2">heima:user:2</td>
        <td >name</td>
        <td >rose</td>
   </tr>
    <tr> 
        <td>age</td>
        <td >18</td>
    </tr>
 </table>
> 以下的field均为redis中的hash类型的key，即 key(redis的key) field(存储的hash的key) value(存储的hash的value)
<p>Hash常见命令有：</p>
<ul>
<li>
<p>hset key field value：添加或修改hash类型key的field的值</p>
</li>
<li>
<p>hget key field：获取hash类型key的field的值</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hset examMap user:1 <span class="token number">100</span> <span class="token comment"># 设置用户id为1的考试成绩为100</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span> 
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HGET examMap user:1  <span class="token comment"># 获取用户id为1的考试成绩</span>
<span class="token string">"100"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>hmset ：批量添加多个hash类型的key的field的值，在给key赋值时可以给多个字段，值赋值</p>
</li>
<li>
<p>hmget ： 批量获取多个hash类型的key的field的值，获取key的时候可以指定获取多个字段的值。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">help</span> HMSET

  HMSET key field value <span class="token punctuation">[</span>field value <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
  summary: Set multiple <span class="token builtin class-name">hash</span> fields to multiple values
  since: <span class="token number">2.0</span>.0
  group: <span class="token builtin class-name">hash</span>
  <span class="token comment"># 批量插入考试id为1 的多个用户的考试成绩</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hmset exam:1 user:1 <span class="token number">100</span> user:2 <span class="token number">99</span> user:3 <span class="token number">98</span>
OK
  <span class="token comment"># 批量获取考试id为1 的多个用户的考试成绩</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hmget exam:1 user:1 user:2 user:3
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"100"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"99"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"98"</span>
<span class="token comment"># 设置用户id为10 的姓名、年龄 月薪</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HMSET heima:user:10 name lzc age <span class="token number">24</span> salary <span class="token number">9000</span>
<span class="token comment"># 批量获取</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HMGET heima:user:10 name age salary
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"lzc"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"24"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"9000"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>{% gi 2%}</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182337784.png" alt="hmset存储用户各种信息"></p>
</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-08/202208182338358.png" alt="hmset存储考试成绩"></p>
<p>{% endgi %}</p>
<ul>
<li>
<p>hgetall ：获取也一个hash类型中的所有的field和value，key和value依次返回。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hgetall heima:user:10
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"lzc"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"age"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"24"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">"salary"</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">"9000"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>hkeys ：获取一个hash类型中的所有的字段(field)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hkeys heima:user:10
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"age"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"salary"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>hvals ：获取一个hash类型中所有字段(field)的值</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hvals heima:user:10
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"lzc"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"24"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"9000"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>hincrby ：让hash类型中的某个字段(field)自增指定值</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hincrby heima:user:10 age <span class="token number">1</span> 年龄自增1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">25</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hget heima:user:10 age
<span class="token string">"25"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hvals heima:user:10
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"lzc"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"25"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"9000"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>hsetnx ：添加一个hash类型的字段，如果不存在则添加，存在不执行，与setnx不同的是，setnx是判断key是否存在，而hsetnx是判断某个字段(field)是否存在。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hsetnx heima:user:10 age <span class="token number">100</span> <span class="token comment"># age字段已经存在，不执行，返回0</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hsetnx heima:user:10 age1 <span class="token number">100</span> <span class="token comment"># age1字段不存在，执行，返回1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hvals heima:user:10
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"lzc"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"25"</span> <span class="token comment"># age字段已存在，不执行，不改变值</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"9000"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"100"</span> <span class="token comment"># age1字段不存在，执行，hash中多了age1这个字段</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="p13-list类型" tabindex="-1"><a class="header-anchor" href="#p13-list类型" aria-hidden="true">#</a> p13-List类型</h2>
<p>Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索，也可以支持反向检索。</p>
<p>特征也与LinkedList类似：</p>
<ul>
<li>有序</li>
<li>元素可以重复</li>
<li>插入和删除快(改变指针指向即可，无需移动元素或扩容)</li>
<li>查询速度一般(只能通过next指针逐个遍历)</li>
</ul>
<p>List的常见命令有：</p>
<ul>
<li>
<p>lpush key element ...：向列表左侧插入一个或多个元素</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lpush <span class="token function">users</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于是从左侧插入元素，所以最终结果是:3-&gt;2-&gt;1</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182338246.png" alt="从左侧插入元素"></p>
</li>
<li>
<p>rpush key element ...：向列表右侧插入一个或多个元素</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> rpush <span class="token function">users</span> <span class="token number">4</span> <span class="token number">5</span> <span class="token number">6</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于是从右侧插入元素，所以最终结果是:3-&gt;2-&gt;1-&gt;4-&gt;5-&gt;6</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182338513.png" alt="从右侧插入元素"></p>
</li>
<li>
<p>lpop key [count] ：从列表左边移除一个值，并返回(类似C语言数据结构中的栈)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lpop <span class="token function">users</span> <span class="token number">1</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"3"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182338308.png" alt="从列表左边移除一个值"></p>
</li>
<li>
<p>rpop key [count] ：从列表右边移除一个值，并返回</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> rpop <span class="token function">users</span> <span class="token number">1</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"6"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182338545.png" alt="从列表右边移除一个值"></p>
</li>
<li>
<p>lrange key [start] [end] ： 返回(不会移除)一段角标范围内的所有元素(从0开始)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lrange <span class="token function">users</span> <span class="token number">1</span> <span class="token number">2</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"1"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"4"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>blpop和brpop ：与lpop和rpop类似，只不过blpop和brpop在没有元素时等待指定时间，而不是返回nil，是阻塞式移除。</p>
<p>终端1：获取key为users2的列表中的所有元素，设置等待100秒</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182338449.png" alt="终端1阻塞式获取users2"></p>
<p>终端2：插入</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182338058.png" alt="终端2往列表中插入元素"></p>
<p>终端1：查看结果</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182338490.png" alt="返回终端1查看获取到的元素"></p>
</li>
</ul>
<p>思考：</p>
<ul>
<li>
<p>如何利用List结构模拟一个栈？</p>
<p>入口和出口在同一边。比如lpush进，lpop出</p>
</li>
<li>
<p>如何利用List结构模拟一个队列？</p>
<p>入口和出口不在同一边。比如lpush进，rpop出</p>
</li>
<li>
<p>如何利用List结构模拟一个阻塞队列？</p>
<p>出口和入口在不同边，且使用阻塞式移除。比如lpush进，brpop出。或者rpush进，blpop出。</p>
</li>
</ul>
<p>​</p>
<h2 id="p14-set类型" tabindex="-1"><a class="header-anchor" href="#p14-set类型" aria-hidden="true">#</a> p14-Set类型</h2>
<p>Redis的Set结构与Java中的HashSet类似，可以看做是一个value为null的HashMap。因为也是一个hash表，因此与HashSet类似的特征：</p>
<ul>
<li>无序</li>
<li>元素不可重复</li>
<li>查找快</li>
<li>支持交集、并集、差集等功能</li>
</ul>
<p>Set的常见命令有：</p>
<ul>
<li>
<p>sadd key member ... ：向set中添加一个或多个元素</p>
</li>
<li>
<p>smembers  key：获取set中所有元素</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd s1 a b c a <span class="token comment"># 添加了两个a</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> smembers s1
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"b"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"a"</span> <span class="token comment"># set中只有一个a，因为元素不可重复</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>srem key member ... ：移除set中指定的元素</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> srem s1 a b <span class="token comment"># 移除s1中的a和b</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> smembers s1
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"c"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>sismember key member ：判断一个元素是否存在set中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sismember s1 a <span class="token comment"># 元素a已删除，不在s1中，返回0</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sismember s1 c <span class="token comment"># 元素c在s1中，返回1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>scard key 查询set中的元素个数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> scard s1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span> <span class="token comment"># 当前有一个元素c</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd s1 d e f
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span> <span class="token comment"># 新增元素d e f</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> scard s1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">4</span> <span class="token comment"># 当前有4个元素</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>sinter key1 key2 ... ：求key1与key2的交集</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> smembers s1
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"f"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"e"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"d"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> smembers s2
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"b"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"d"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"a"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sinter s1 s2 <span class="token comment"># 求交集</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"d"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>sdiff key1 key2 ... ：求key1和key2的差集</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> smembers s1
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"f"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"e"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"d"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> smembers s2
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"b"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"d"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"a"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">sdiff</span> s1 s2
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"f"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"e"</span> <span class="token comment"># 求差集 s1有的而s2没有的</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">sdiff</span> s2 s1
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"b"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"a"</span> <span class="token comment"># 求差集 s2有的而s1没有的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>sunion key1 key2 ... ：求key1和key2的并集（去重）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sunion s1 s2
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"b"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"a"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"f"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">"e"</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">"d"</span> <span class="token comment"># 求s1和s2的并集，并去重</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>set命令练习</p>
<p>将下列数据用Redis的Set集合来存储：</p>
<ul>
<li>
<p>张三的好友有：李四、王五、赵六</p>
</li>
<li>
<p>李四的好友有：王五、麻子、二狗</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd friend:zhangsan lisi wangwu zhaoliu
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd friend:lisi wangwu mazi ergou
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>利用Set命令实现下列功能</p>
<ul>
<li>
<p>计算张三的好友有几个</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> scard friend:zhangsan
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>计算张三和李四有哪些共同好友</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sinter friend:zhangsan friend:lisi
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"wangwu"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查询哪些人是张三的好友却不是李四的好友</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">sdiff</span> friend:zhangsan friend:lisi
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"zhaoliu"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"lisi"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查询张三和李四的好友总共有那些人</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sunion friend:zhangsan friend:lisi
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"lisi"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"wangwu"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"zhaoliu"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"ergou"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">"mazi"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>判断李四是否是张三的朋友</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sismember friend:zhangsan lisi
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>判断张三是否是李四的朋友</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sismember friend:lisi zhangsan
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>将李四从张三的好友列表中移除</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> srem friend:zhangsan lisi
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> smembers friend:zhangsan
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"zhaoliu"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"wangwu"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="p15-sortedset" tabindex="-1"><a class="header-anchor" href="#p15-sortedset" aria-hidden="true">#</a> p15-SortedSet</h2>
<p>Redis的SortedSet是一个可排序的集合，和Java中的TreeSet有些类似，但底层数据结构却差别很大。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层是一个跳表(SkipList)加Hash表。</p>
<p>SortedSet具备下列特性:</p>
<ul>
<li>可排序</li>
<li>元素不重复</li>
<li>查询速度快</li>
</ul>
<p>因为SortedSet的可排序特性，经常用来实现排行榜这样的功能。</p>
<p>SortedSet命令练习</p>
<p>将班级的下列学生得分存入Redis的SortedSet中：</p>
<p>Jack 85，Lucy 89，Rose 82 ，Tom 95，Jerry 78，Amy 92，Miles 76</p>
<p>并实现下列功能</p>
<ul>
<li>删除Tom同学</li>
<li>获取Amy同学的分数</li>
<li>获取Rose同学的排名</li>
<li>查询80以下有几个学生</li>
<li>给Amy同学加2分</li>
<li>查出成绩前3名的同学</li>
<li>查出成绩80分以下的所有同学</li>
</ul>
<p>结合命令实现：</p>
<ul>
<li>存储学生成绩 ：zadd score member</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">help</span> zadd

  ZADD key <span class="token punctuation">[</span>NX<span class="token operator">|</span>XX<span class="token punctuation">]</span> <span class="token punctuation">[</span>GT<span class="token operator">|</span>LT<span class="token punctuation">]</span> <span class="token punctuation">[</span>CH<span class="token punctuation">]</span> <span class="token punctuation">[</span>INCR<span class="token punctuation">]</span> score member <span class="token punctuation">[</span>score member <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
  summary: Add one or <span class="token function">more</span> members to a sorted set, or update its score <span class="token keyword">if</span> it already exists
  since: <span class="token number">1.2</span>.0
  group: sorted_set

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd exam:E00001 <span class="token number">85</span> Jack <span class="token number">89</span> Lucy <span class="token number">82</span> Rose <span class="token number">95</span> Tom <span class="token number">78</span> Jerry <span class="token number">92</span> Amy <span class="token number">76</span> Miles
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182338347.png" alt="学生成绩"></p>
<ul>
<li>
<p>删除Tom同学</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrem exam:E00001 Tom
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182338140.png" alt="删除Tom后"></p>
</li>
<li>
<p>获取Rose同学的排名</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>降序
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrevrank exam:E00001 Rose
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span> <span class="token comment"># 倒数第四个</span>
升序
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrank exam:E00001 Rose
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span> <span class="token comment"># 第三个 从0开始计</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查询现在存储了多少学生的成绩</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zcard exam:E00001
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查询80分以下的学生有多少</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zcount exam:E00001 <span class="token number">0</span> <span class="token number">80</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token comment"># 80分以下的只有两个，Miles和Jerry</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>给Amy加2分</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zincrby exam:E00001 <span class="token number">2</span> Amy
<span class="token string">"94"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查出成绩前三名的所有同学</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 可以看到，默认是升序，所以zange查出来的是升序结果，是倒数三名</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrange exam:E00001 <span class="token number">0</span> <span class="token number">2</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"Miles"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"Jerry"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"Rose"</span>
<span class="token comment"># 查前三名应该查降序排名的前三名，所以用zrevrange</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrevrange exam:E00001 <span class="token number">0</span> <span class="token number">2</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"Amy"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"Lucy"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"Jack"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查出成绩在80以下的所有同学</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrangebyscore exam:E00001 <span class="token number">0</span> <span class="token number">80</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"Miles"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"Jerry"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="p16-redis的java客户端" tabindex="-1"><a class="header-anchor" href="#p16-redis的java客户端" aria-hidden="true">#</a> p16-Redis的Java客户端</h2>
<ul>
<li>Jedis：以Redis命令作为方法名称，比如redis中string的set方法在jedis中就是set。学习成本低，简单实用，但是Jedis实例是线程不安全的，多线程环境下需要基于连接池来使用。</li>
<li>lettuce ：基于Netty实现的，支持同步、异步和响应式编程方式，并且是线程安全的。支持Redis的哨兵模式、集群模式和管道模式。与Spring结合比较好，响应式编程、异步编程吞吐能力高。</li>
<li>Redisson：基于Redis实现的分布式、可伸缩的Java数据结构集合。包含了诸如Map、Queue、Lock、semaphore、AtomicLong等强大功能。如果在分布式环境下有使用这些数据结构的需求，就可以不用自己造轮子了。</li>
</ul>
<p>Jedis的使用：</p>
<ul>
<li>
<p>引入依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--jedis--></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>redis.clients<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jedis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.2.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 单元测试 --></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.junit.jupiter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit-jupiter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.7.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>建立连接方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 连接
     */</span>
    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 建立连接</span>
        jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">"www.iocaop.com"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置密码</span>
        jedis<span class="token punctuation">.</span><span class="token function">auth</span><span class="token punctuation">(</span><span class="token string">"****"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 选择库</span>
        jedis<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>释放连接方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 释放连接
     */</span>
    <span class="token annotation punctuation">@AfterEach</span>
    <span class="token keyword">void</span> <span class="token function">tearDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> jedis<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>测试简单set、get命令</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 测试get、set命令
     */</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> name <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182338835.png" alt="结果"></p>
</li>
<li>
<p>测试Hash</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 插入hash数据 用户id为1的姓名</span>
        <span class="token keyword">long</span> nameResult <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">hset</span><span class="token punctuation">(</span><span class="token string">"user:1"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>nameResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 插入hash数据 用户id为1的年龄</span>
        <span class="token keyword">long</span> ageResult <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">hset</span><span class="token punctuation">(</span><span class="token string">"user:1"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token string">"24"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>ageResult<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获取hash数据 用户id为1的姓名</span>
        <span class="token class-name">String</span> examLzcName <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">hget</span><span class="token punctuation">(</span><span class="token string">"user:1"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>examLzcName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取hash数据 用户id为1的年龄</span>
        <span class="token class-name">String</span> examLzcAge <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">hget</span><span class="token punctuation">(</span><span class="token string">"user:1"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>examLzcAge<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182338625.png" alt="hash命令测试结果"></p>
</li>
</ul>
<p>Jedis使用和redis-cli使用一样，方法名称就是redis的命令，需要注意的是最后需要释放连接</p>
<h2 id="p18-jedis的连接池" tabindex="-1"><a class="header-anchor" href="#p18-jedis的连接池" aria-hidden="true">#</a> p18-Jedis的连接池</h2>
<p>Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此使用Jedis连接池代替Jedis直连。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JedisConnectionFactory</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 创建连接池
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">JedisPool</span> jedisPool <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">// 使用静态代码块，初始化连接池</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">JedisPoolConfig</span> jedisPoolConfig <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JedisPoolConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 连接池中最大连接数</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMaxTotal</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 连接池中最大空闲连接数:即使没有链接的时候,也可以保持8个空闲的连接,即使不使用,也不会被清除</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMaxIdle</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 连接池中最小空闲连接数:当连接数少于此值时,连接池会创建连接来补充到该值的数量</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMinIdle</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 连接池中连接超时时间</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMaxWaitMillis</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedisPool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JedisPool</span><span class="token punctuation">(</span>jedisPoolConfig<span class="token punctuation">,</span><span class="token string">"150.158.20.104"</span><span class="token punctuation">,</span><span class="token number">6379</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">,</span><span class="token string">"911823"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取Jedis实例
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Jedis</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Jedis</span> <span class="token function">getJedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> jedisPool<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p19-springdata-redis" tabindex="-1"><a class="header-anchor" href="#p19-springdata-redis" aria-hidden="true">#</a> p19-SpringData-Redis</h2>
<p>SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SpringDataRedis。</p>
<ul>
<li>提供了对不动Redis客户端的整合(Lettuce和Jedis)</li>
<li>提供了RedisTemplate同一API来操作Redis</li>
<li>支持Redis的发布订阅模型</li>
<li>支持Redis哨兵和Redis集群</li>
<li>支持基于Lettuce的响应式编程</li>
<li>支持基于JDK、JSON、字符串、Spring对象的数据序列化和反序列化</li>
<li>支持基于Redis的JDKCollection实现</li>
</ul>
<p>​	在Jedis的Java客户端中，操作数据时，key和value都是字符串类型，或者是字节(Redis的底层编码都是字节数组，编码格式不一样而已)，Java对象需要存储，Jedis则需要手动序列化，变成字符串再存储。RedisTemplate就本身支持将Java对象序列化成字符串或字节数组往Redis中写入，或者将Redis中读取到的字节数组或字符串反序列化成Java对象。除此之外，RedisTemplate还基于Redis对集合重新做了实现(因为是跨系统的，分布式的)。</p>
<p>​	Redis中，对命令进行了分组，如字符串用set、get，哈希用hset、hget。同样，在RedisTemplate中也对命令做了分组：</p>
<table>
<thead>
<tr>
<th>API</th>
<th>返回值类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>redisTemplate.opsForValue()</td>
<td>ValueOperations</td>
<td>操作String类型数据</td>
</tr>
<tr>
<td>redisTemplate.opsForHash()</td>
<td>HashOperations</td>
<td>操作Hash类型数据</td>
</tr>
<tr>
<td>redisTemplate.opsForList()</td>
<td>ListOperations</td>
<td>操作List类型数据</td>
</tr>
<tr>
<td>redisTemplate.opsForSet()</td>
<td>SetOperations</td>
<td>操作Set类型数据</td>
</tr>
<tr>
<td>redisTemplate.opsForZSet</td>
<td>ZSetOperations</td>
<td>操作SortedSet类型数据</td>
</tr>
<tr>
<td>redisTemplate</td>
<td></td>
<td>通用命令</td>
</tr>
</tbody>
</table>
<h2 id="p20-redistemplate" tabindex="-1"><a class="header-anchor" href="#p20-redistemplate" aria-hidden="true">#</a> p20-RedisTemplate</h2>
<p>因为SpringData是基于SpringBoot的，所以需要先创建Springboot项目。</p>
<p>集成父项目:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.6.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>引入启动器依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>springboot-data-redis依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>连接池依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-pool2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--单元测试--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于现在使用了Springboot，所以不需要手动去创建Jedis/Lettuce连接对象(无论是Jedis还是Lettuce都会基于commons-pool实现连接池效果)，交给ioc管理了，所以需要创建application.yml配置连接即可。需要注意的是spring默认使用的是lettuce客户端，如果需要使用Jedis，需要额外引入Jedis依赖。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339034.png" alt="spring默认使用的是lettuce客户端"></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">data</span><span class="token punctuation">:</span>
    <span class="token key atrule">redis</span><span class="token punctuation">:</span> <span class="token comment"># redis data</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> www.iocaop.com <span class="token comment"># redis服务器地址</span>
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span> <span class="token comment"># 端口号</span>
      <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span> <span class="token comment"># 密码用password字段，而不是auth</span>
      <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment"># 数据库编号</span>
    <span class="token key atrule">lettuce</span><span class="token punctuation">:</span> 
      <span class="token key atrule">pool</span><span class="token punctuation">:</span>
        <span class="token key atrule">maxActive</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment">#最大连接数</span>
        <span class="token key atrule">minIdle</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment">#最小空闲连接数</span>
        <span class="token key atrule">maxIdle</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment">#最大空闲连接数</span>
        <span class="token key atrule">maxWait</span><span class="token punctuation">:</span> <span class="token number">1000</span> <span class="token comment">#最长等待时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建启动类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisDemoApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">RedisDemoApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">RedisDemoApplicationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RedisTemplate</span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"赖卓成"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果:</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339697.png" alt="运行结果"></p>
<h2 id="p21-redistemplata的redisserializer" tabindex="-1"><a class="header-anchor" href="#p21-redistemplata的redisserializer" aria-hidden="true">#</a> p21-RedisTemplata的RedisSerializer</h2>
<p>运行完上一节课的命令后，我们到redis-cli中查看name，发现值是lzc，而不是赖卓成：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339807.png" alt="到redis-cli中查看"></p>
<p>把所有的key显示出来，key发现，我们使用RedisTemplate保存的key不是name而是&quot;\xac\xed\x00\x05t\x00\x04name&quot;</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339655.png" alt="Java的redis客户端set值后到官方redis-cli查看，结果一样？"></p>
<p>这就不得不提到RedisTemplate的序列化。</p>
<p>点进RedisTemplate源码可以看到，有多种序列化器，默认值是null。当我们不配置序列化器时，会使用默认序列化器。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339465.png" alt="RedisTemplate中的序列化器"></p>
<p>我们可以打断点跟入：选定方法后按f7</p>
<p>{% gi 2%}</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339725.png" alt="跟入set方法-1"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339071.png" alt="跟入set方法-2"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339139.png" alt="跟入set方法-3"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339319.png" alt="跟入set方法-4"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339157.png" alt="跟入set方法-4"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339960.png" alt="跟入set方法-5"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339976.png" alt="跟入set方法-6"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339234.png" alt="跟入set方法-7"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339339.png" alt="跟入set方法-8"></p>
<p>{% endgi %}</p>
<p>到此为止可以看出最终使用的是ObjectOutputStream，也就是jdk的序列化器，将Java对象转为字节数组后存储到Redis。</p>
<p>这样的方式有什么问题？</p>
<ul>
<li>可读性差</li>
<li>出现bug，我们明明set的name是赖卓成，get时却是lzc。因为key也被序列化。</li>
<li>内存占用太大。</li>
</ul>
<p>我们希望我们set的是什么就是什么，需要怎么做？</p>
<p>更换序列化器即可。</p>
<p>在RedisTemplate中有许多成员变量，序列化器：RedisSerializer。我们进入序列化器类，按Ctrl+Alt+B查看实现类：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182339998.png" alt="RedisSerializer的实现类"></p>
<p>其中StringRedisSerializer用于将字符串转成字节数组(Redis中的数据本身也存储的是字节数组)。key一般就是字符串，所以key一般用StringRedisSerializer，如果有特殊需要可以更换key的序列化器。</p>
<p>可以在配置类中配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfig</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     *  我们默认key都是String类型，value是Object类型，所以我们需要自定义一个RedisTemplate<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String,</span> <span class="token attr-name">Object</span><span class="token punctuation">></span></span>
     *
     * <span class="token keyword">@param</span> <span class="token parameter">redisConnectionFactory</span> Redis连接工厂,SpringBoot会创建，注入就可以了
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">RedisTemplate</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">String},</span> <span class="token attr-name">{@link</span> <span class="token attr-name">Object}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
     <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">redisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> redisConnectionFactory<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 创建redisTemplate</span>
        <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> redisTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 配置连接工厂</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>redisConnectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建json序列化器</span>
        <span class="token class-name">GenericJackson2JsonRedisSerializer</span> serializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericJackson2JsonRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置key序列化器 key就是字符串类型，用stringRedisSerializer序列化器就好了</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setKeySerializer</span><span class="token punctuation">(</span><span class="token class-name">RedisSerializer</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置hashKey序列化器</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setHashKeySerializer</span><span class="token punctuation">(</span><span class="token class-name">RedisSerializer</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置value序列化器 就是我们自定义的序列化器serializer</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setValueSerializer</span><span class="token punctuation">(</span>serializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置hashValue序列化器</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setHashValueSerializer</span><span class="token punctuation">(</span>serializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置以后，我们需要在注入时带上泛型。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> redisTemplate<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>运行：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340649.png" alt="配置序列化器后运行"></p>
<p>再到官方redis-cli查看：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340172.png" alt="redis-cli查看更换序列化器后的结果"></p>
<p>可以看到，key是name666，存到redis以后也是666。</p>
<p>我们再尝试下pojo存储</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 名字
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    
    <span class="token doc-comment comment">/**
     * 年龄
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    
    <span class="token doc-comment comment">/**
     * 地址
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">RedisDemoApplicationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"赖卓成"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span><span class="token string">"广东深圳"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"testUserObject"</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 取redis值时，RedisTemplate可以根据值的第一行 "@class": "com.lzc.pojo.User",反序列化成User对象，所以这里可以直接强转，</span>
        <span class="token class-name">User</span> redisUser <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"testUserObject"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>redisUser<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182340651.png" alt="配置序列化器后存储pojo"></p>
<h2 id="p22-stringredistemplate" tabindex="-1"><a class="header-anchor" href="#p22-stringredistemplate" aria-hidden="true">#</a> p22-StringRedisTemplate</h2>
<p>尽管JSON的序列化方式可以满足我们的需求，但还是存在问题：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340616.png" alt="json序列化后存储对象"></p>
<p>为了在反序列化时知道对象的类型，JSON序列化器会将类的class类型写入json结果中，增加了内存开销。</p>
<p>为了节省内存空间，我们并不会使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value，当需要存储Java对象时，手动完成对象的序列化和反序列化。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340152.png" alt="手动序列化反序列化"></p>
<p>Spring默认提供了一个StringRedisTemplata类，它的key和value的序列化方式默认是String方式。省去了我们自定义RedisTemplate的过程：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">RedisStringTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * Spring中默认的json序列化工具
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"赖卓成"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span><span class="token string">"广东深圳"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 手动序列化并存储</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"testUserObject"</span><span class="token punctuation">,</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> jsonStr <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"testUserObject"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 手动反序列化</span>
        <span class="token class-name">User</span> redisUser <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>jsonStr<span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>redisUser<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果可以看到，手动序列化后的数据没有带class路径了：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340857.png" alt="手动序列化后用string存储"></p>
<p>Redis的两种序列化方案：</p>
<p>方案一：</p>
<ul>
<li>自定义RedisTemplate</li>
<li>修改RedisTemplate的value的序列化器为GenericJackson2JsonRedisSerializer</li>
</ul>
<p>方案二：</p>
<ul>
<li>使用StringRedisTemplate</li>
<li>写入Redis时，手动把对象序列化为Json</li>
<li>读取Redis时，手动把读取到的JSON反序列化为对象</li>
</ul>
<p>方案三(参考了公司的代码)：</p>
<ul>
<li>
<p>方案一中的GenericJackson2JsonRedisSerializer换成Jackson2JsonRedisSerializer</p>
</li>
<li>
<p><a href='https://blog.csdn.net/after_you/article/details/81086904'>GenericJackson2JsonRedisSerializer和Jackson2JsonRedisSerializer的区别</a></p>
</li>
</ul>
<h2 id="p23-redistemplate操作hash类型" tabindex="-1"><a class="header-anchor" href="#p23-redistemplate操作hash类型" aria-hidden="true">#</a> p23-RedisTemplate操作Hash类型</h2>
<p>需要注意的是官方命令是hset，但是在Java中使用的是put方法。其他方法也是接近于Java的方法。举例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"testHash"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"赖卓成"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"testHash"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token string">"24"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"testHash"</span><span class="token punctuation">,</span> <span class="token string">"address"</span><span class="token punctuation">,</span> <span class="token string">"广东深圳"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"testHash"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> age <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"testHash"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> address <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"testHash"</span><span class="token punctuation">,</span> <span class="token string">"address"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span><span class="token punctuation">;</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token string">"testHash"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>key <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token string">"testHash"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>value <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> entries <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token string">"testHash"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>key <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340192.png" alt="运行结果"></p>
<h4 id="实战篇" tabindex="-1"><a class="header-anchor" href="#实战篇" aria-hidden="true">#</a> 实战篇</h4>
<h2 id="p25-导入项目" tabindex="-1"><a class="header-anchor" href="#p25-导入项目" aria-hidden="true">#</a> p25-导入项目</h2>
<p>在资料在中导入项目，后端不使用微服务、前端在服务器nginx部署即可，导入数据库，修改配置信息，前后端项目启动后如下：</p>
<p>在服务器Nginx配置中加入server</p>
<div class="language-tex ext-tex line-numbers-mode"><pre v-pre class="language-tex"><code>    server <span class="token punctuation">{</span>
        listen       8080;
        server_name  localhost;
        # 指定前端项目所在的位置
        location / <span class="token punctuation">{</span>
            root   hmdp/hmdp;
            index  index.html index.htm;
        <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改common.js中的commonURL为本地地址，即可服务器加载页面，调用本地接口。</p>
<p>此时会出现CORS error，需要在后端项目中配置跨域：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 跨域配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/07/11
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CorsConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addCorsMappings</span><span class="token punctuation">(</span><span class="token class-name">CorsRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//设置允许跨域的路径</span>
        registry<span class="token punctuation">.</span><span class="token function">addMapping</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">allowedOrigins</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span>
            <span class="token comment">//是否允许证书</span>
            <span class="token punctuation">.</span><span class="token function">allowCredentials</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token comment">//设置允许的方法</span>
            <span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"POST"</span><span class="token punctuation">)</span>
            <span class="token comment">//设置允许的header属性</span>
            <span class="token punctuation">.</span><span class="token function">allowedHeaders</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span>
            <span class="token comment">//允许跨域时间</span>
            <span class="token punctuation">.</span><span class="token function">maxAge</span><span class="token punctuation">(</span><span class="token number">3600</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx配置中http加入允许跨域：</p>
<div class="language-tex ext-tex line-numbers-mode"><pre v-pre class="language-tex"><code>#support cross domain access
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Headers X-Requested-With;
add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>{% gi 2%}</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340464.png" alt="导入数据库"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340839.png" alt="前后端项目启动效果图"></p>
<p>{% endgi %}</p>
<p>项目中没有任何东西，只有基础的redis、MySQL、Mybatis-Puls、hutool、lombok依赖和对应的控制层、业务层、持久层类、以及工具类。</p>
<h2 id="p26-基于session实现登录" tabindex="-1"><a class="header-anchor" href="#p26-基于session实现登录" aria-hidden="true">#</a> p26-基于session实现登录</h2>
<p>知识点：ThreadLocal</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340257.png" alt="基于session登录流程"></p>
<h2 id="p-27实现验证码发送功能" tabindex="-1"><a class="header-anchor" href="#p-27实现验证码发送功能" aria-hidden="true">#</a> p-27实现验证码发送功能</h2>
<p>控制层代码:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 发送手机验证码
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"code"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">sendCode</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"phone"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> phone<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userService<span class="token punctuation">.</span><span class="token function">sendCode</span><span class="token punctuation">(</span>phone<span class="token punctuation">,</span> session<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">sendCode</span><span class="token punctuation">(</span><span class="token class-name">String</span> phone<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 正则工具校验手机号是否合法</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 手机号不合法，返回错误信息</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号不合法"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 手机号合法，hutool工具生成并发送验证码，模拟发送</span>
        <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token class-name">RandomUtil</span><span class="token punctuation">.</span><span class="token function">randomNumbers</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"发送验证码：{}"</span><span class="token punctuation">,</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 将验证码存入session，用于校验</span>
        session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"code"</span><span class="token punctuation">,</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"发送成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340985.png" alt="发送失败"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340361.png" alt="发送成功"></p>
<h2 id="p28-实现短信登录和注册用户功能" tabindex="-1"><a class="header-anchor" href="#p28-实现短信登录和注册用户功能" aria-hidden="true">#</a> p28-实现短信登录和注册用户功能</h2>
<ul>
<li>用户请求过来，通过jsessionId可以获取到用户会话</li>
<li>从会话中取出验证码code</li>
<li>校验手机号是否合法、是否一致(此处未做，要做可以在发送验证码时加入手机号到session中)、</li>
<li>校验验证码是否正确，不正确直接抛出异常</li>
<li>验证码正确，查询用户是否存在，存在则直接登录，将用户信息存入session中</li>
<li>不存在则创建用户，将用户信息存入session中</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">LoginFormDTO</span> loginForm<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1 获取session中的验证码</span>
        <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> session<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">"code"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2 正则工具校验手机号是否合法，此处不做手机号是否一致的校验了</span>
        <span class="token class-name">String</span> phone <span class="token operator">=</span> loginForm<span class="token punctuation">.</span><span class="token function">getPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 手机号不合法，返回错误信息</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号不合法"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 3 判断验证码是否正确</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>code <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>code<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>loginForm<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 验证码不正确，返回错误信息</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"验证码不正确"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 4 验证码正确，根据手机号查询用户信息</span>
        <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> wrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token operator">::</span><span class="token function">getPhone</span><span class="token punctuation">,</span> loginForm<span class="token punctuation">.</span><span class="token function">getPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> baseMapper<span class="token punctuation">.</span><span class="token function">selectOne</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 5 判断用户是否存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">==</span>user<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 用户不存在，注册</span>
            user <span class="token operator">=</span> <span class="token function">createUserByPhone</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 6 保存用户到session中</span>
        session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 7 返回登录成功信息,此处不需要返回登录凭证，因为是session登录，用户cookie中已经有JSessionId</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建用户
     *
     * <span class="token keyword">@param</span> <span class="token parameter">phone</span> 电话
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">User</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">User</span> <span class="token function">createUserByPhone</span><span class="token punctuation">(</span><span class="token class-name">String</span> phone<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> regUser <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        regUser<span class="token punctuation">.</span><span class="token function">setCreateTime</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        regUser<span class="token punctuation">.</span><span class="token function">setUpdateTime</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 雪花算法生成id</span>
        regUser<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SnowflakeGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 用户前缀+随机字符串生成用户名</span>
        regUser<span class="token punctuation">.</span><span class="token function">setNickName</span><span class="token punctuation">(</span><span class="token class-name">SystemConstants</span><span class="token punctuation">.</span><span class="token constant">USER_NICK_NAME_PREFIX</span> <span class="token operator">+</span><span class="token class-name">RandomUtil</span><span class="token punctuation">.</span><span class="token function">randomString</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        regUser<span class="token punctuation">.</span><span class="token function">setPhone</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> regUser<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此处遇到一个问题，浏览器每次访问，JSessionId都在变化：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340716.png" alt="发送验证码时的JSessionId"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182340861.png" alt="登录时的JSessionId"></p>
<p>解决：</p>
<p>这种情况有三种可能</p>
<ul>
<li>分布式环境下，session不一致(排除)</li>
<li>未设置cookie允许跨域(设置后，JSessionId依然在变)</li>
<li>跨域请求不允许携带Cookie<a href="https://blog.csdn.net/qq_31772441/article/details/122355404">跨域请求无法携带Cookie的问题</a>(配置后依然无效)</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-08/202208182341425.png" alt="跨域请求不允许携带Cookie"></p>
<blockquote>
<p>该问题无法解决，意义也不大，跳过p29、p30</p>
</blockquote>
<h2 id="p31-session共享的问题分析" tabindex="-1"><a class="header-anchor" href="#p31-session共享的问题分析" aria-hidden="true">#</a> p31-session共享的问题分析</h2>
<p>为了提升项目并发，单体项目一般会部署多个服务，运行多个Tomcat，采用nginx进行负载均衡，那么问题是这多台Tomcat的session不共享，会导致信息丢失。</p>
<blockquote>
<p>比如验证码登录问题，当一个请求第一台服务器，进行获取短信，Tomcat1生成的验证码是9527发给了用户，当用户登录请求进来，携带了验证码9527到Tomcat2，由于session不共享，Tomcat2的code为null，导致验证码错误，登录失败，这显然是不合理的。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2022-08/202208182341495.png" alt="session不共享"></p>
<p>Tomcat提供了session拷贝的功能，只需要配置好就行，但是存在问题：</p>
<ul>
<li>多台Tomcat相同的数据，却需要互相拷贝，内存浪费</li>
<li>数据拷贝会有延迟，实时性不高，若在拷贝前有请求，则会出问题。</li>
</ul>
<p>session的替代方案应该满足：</p>
<ul>
<li>数据共享</li>
<li>内存存储(读写速度快)</li>
<li>k-v结构(方便)</li>
</ul>
<p>Redis可以解决这个问题：</p>
<ul>
<li>任何Tomcat可以访问Redis、</li>
<li>基于内存存储，Redis读写延迟是微秒级别的，</li>
<li>k-v存储。</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-08/202208182341211.png" alt="Redis替代session"></p>
<h2 id="p32-redis代替session的业务流程" tabindex="-1"><a class="header-anchor" href="#p32-redis代替session的业务流程" aria-hidden="true">#</a> p32-Redis代替Session的业务流程</h2>
<p>使用手机号(唯一的即可,客户端方便携带，利于取，最好是用随机字符串)作为key，valuevalue存储用户的信息，可以是用户对象。，可以用String类型，也可以用Hash类型。</p>
<p>二者对比：</p>
<p>String需要序列化对象再存储，会更直观，但是会多出很多字符，双引号，大括号等。</p>
<p>Hash存储更方便修改对象中的字段，而且会更节省内存空间。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182341950.png" alt="Redis存储用户信息"></p>
<blockquote>
<p>使用token(或随机字符串)作为key，客户端下次再携带这个token来访问，服务器可以根据token取数据，判断用户是否登录，之前是因为cookie中携带了JsessionId，访问时Tomcat会根据JsessionId获取session。现在不需要这样了，我们把token手动setCookie到浏览器或sessionStorage即可， 浏览器访问会携带上token。</p>
</blockquote>
<h2 id="p33-基于redis实现短信登录" tabindex="-1"><a class="header-anchor" href="#p33-基于redis实现短信登录" aria-hidden="true">#</a> p33-基于Redis实现短信登录</h2>
</div></template>


