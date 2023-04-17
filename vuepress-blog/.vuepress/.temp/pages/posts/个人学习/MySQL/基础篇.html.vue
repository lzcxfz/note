<template><div><p>B站视频:<a href = 'https://www.bilibili.com/video/BV1iq4y1u7vj/?p=2&spm_id_from=pageDriver&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a></p>
<h2 id="p2-为什么要使用数据库及数据库常用概念" tabindex="-1"><a class="header-anchor" href="#p2-为什么要使用数据库及数据库常用概念" aria-hidden="true">#</a> p2-为什么要使用数据库及数据库常用概念</h2>
<ul>
<li>持久化，<span style="background-color:pink;">把数据保存到可掉电式存储设备中供之后使用</span>。数据持久化意味着将内存中的数据保存到硬盘加以固化。</li>
<li>持久化的主要作用是<span style="background-color:pink;">将内存中的数据存储在关系型数据库中</span>,也可以存在磁盘文件，xml数据中。</li>
</ul>
<p>为什么非要数据库不存文件？查找方便，读取快，易打开，数据类型复杂存文件不好区分。</p>
<h3 id="_2-1-数据库相关概念" tabindex="-1"><a class="header-anchor" href="#_2-1-数据库相关概念" aria-hidden="true">#</a> 2-1 数据库相关概念</h3>
<ul>
<li>
<p>DB：数据库</p>
<p>存储数据的仓库，本质是一个文件系统，保存了一系列有组织的数据。</p>
</li>
<li>
<p>DBMS：数据库管理系统</p>
<p>是操纵和管理数据的大型软件，用于<span style="background-color:pink;">建立、使用和维护数据库</span>，对数据进行同一管理和控制。用户通过数据库管理系统访问数据库中表内的数据。</p>
</li>
<li>
<p>SQL结构化查询语言(structured query language)</p>
<p>专门用来与数据库通信的语言</p>
</li>
</ul>
<h3 id="_2-2-数据库与数据库管理系统的关系" tabindex="-1"><a class="header-anchor" href="#_2-2-数据库与数据库管理系统的关系" aria-hidden="true">#</a> 2-2 数据库与数据库管理系统的关系</h3>
<p>数据库管理系统可以管理多个数据库，关系如图：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209230646492.png" alt="image-20220923064621360"></p>
<p><img src="http://www.iocaop.com/images/2022-09/202209230646776.png" alt="image-20220923064629692"></p>
<h3 id="_2-3-为什么选择mysql" tabindex="-1"><a class="header-anchor" href="#_2-3-为什么选择mysql" aria-hidden="true">#</a> 2-3 为什么选择MySQL？</h3>
<ul>
<li>开源，使用成本低。</li>
<li>性能卓越、使用成本低。</li>
<li>软件体积小，使用简单，易于维护。</li>
<li>历史悠久、社区活跃度高，遇到问题可以寻求帮助。</li>
<li>许多互联网公司用，经历了时间的验证。</li>
</ul>
<h3 id="_2-4-oracle和mysql" tabindex="-1"><a class="header-anchor" href="#_2-4-oracle和mysql" aria-hidden="true">#</a> 2-4 Oracle和MySQL</h3>
<p>Oracle适合大型跨国企业使用，因为他们对费用不敏感，但是对性能要求和安全性有更高的要求。</p>
<p>MySQL<span style="background-color:pink;">体积小、速度快、总体拥有成本低，可处理成千上万条记录的大型数据库，开源</span>，使得很多互联网公司、中小型网站选择MySQL作为网站数据库。如阿里、去哪儿、美团外卖、腾讯。</p>
<h2 id="p4-关系型数据库和非关系型数据库" tabindex="-1"><a class="header-anchor" href="#p4-关系型数据库和非关系型数据库" aria-hidden="true">#</a> p4-关系型数据库和非关系型数据库</h2>
<p>参考redis课程笔记：<a href = 'http://www.iocaop.com/posts/2022-my/%E4%B8%AD%E9%97%B4%E4%BB%B6/redis-b%E7%AB%99%E9%BB%91%E9%A9%AC2022%E7%89%88.html#p3-%E8%AE%A4%E8%AF%86nosql'>点击跳转</a></p>
<h2 id="p5-er模型与表记录的4种关系" tabindex="-1"><a class="header-anchor" href="#p5-er模型与表记录的4种关系" aria-hidden="true">#</a> p5-ER模型与表记录的4种关系</h2>
<h3 id="_5-1-表、记录、字段" tabindex="-1"><a class="header-anchor" href="#_5-1-表、记录、字段" aria-hidden="true">#</a> 5-1 表、记录、字段</h3>
<ul>
<li>
<p>ER（实体-联系）三个概念 ：实体集、属性、联系集</p>
</li>
<li>
<p>一个实体集对应数据库中的一个表，一个实体对应于数据库表中的一条记录(row)，一个属性对应一个字段(column)。</p>
</li>
<li>
<p>orm思想(Object Relational Mapping)</p>
<p>表-&gt;类</p>
<p>记录-&gt;对象</p>
<p>字段-&gt;成员变量</p>
</li>
</ul>
<h3 id="_5-2-表的关联关系" tabindex="-1"><a class="header-anchor" href="#_5-2-表的关联关系" aria-hidden="true">#</a> 5-2 表的关联关系</h3>
<ul>
<li>一对一</li>
<li>一对多</li>
<li>多对多</li>
<li>自引用</li>
</ul>
<h2 id="p12-sql概述和分类" tabindex="-1"><a class="header-anchor" href="#p12-sql概述和分类" aria-hidden="true">#</a> p12-SQL概述和分类</h2>
<h3 id="_12-1-sql概述" tabindex="-1"><a class="header-anchor" href="#_12-1-sql概述" aria-hidden="true">#</a> 12-1 SQL概述</h3>
<p>sql是一种规范，是访问数据库的标准计算机语言，mysql特有的语法是方言。sql标准在迭代，如sql89，sql92，sql99。</p>
<h3 id="_12-2-sql分类" tabindex="-1"><a class="header-anchor" href="#_12-2-sql分类" aria-hidden="true">#</a> 12-2 SQL分类</h3>
<ul>
<li>DDL数据定义语句(create、alter、drop、rename、truncate)</li>
<li>DML数据操作语言(insert、delete、update、select)</li>
<li>DCL数据控制语言(commit、rollback、savepoint、grant、revoke)</li>
<li>DQL数据库查询语言(select)</li>
<li>TCL事务控制语言(commit、rollback)</li>
</ul>
<p>参考w3c：<a href = 'https://www.w3school.com.cn/sql/sql_syntax.asp'>点击跳转</a></p>
<h3 id="_12-3-sql基本规则" tabindex="-1"><a class="header-anchor" href="#_12-3-sql基本规则" aria-hidden="true">#</a> 12-3 SQL基本规则</h3>
<ul>
<li>SQL可以写在一行或多行，为了提高可读性，各字句分行写，必要时使用缩进</li>
<li><span style="background-color:pink;">每条命令以;或\g或\G结束</span></li>
<li>关键字不能被缩进也不能分行</li>
<li>关于标点符号
<ul>
<li>必须保证所有的括号，单引号，双引号是成对的</li>
<li>使用英文半角输入方式</li>
<li>字符型和日期时间类型的数据可以使用单引号表示</li>
<li><span style="background-color:pink;">列的别名尽量使用双引号，不建议省略as</span></li>
</ul>
</li>
</ul>
<h3 id="_12-4-sql大小写规范" tabindex="-1"><a class="header-anchor" href="#_12-4-sql大小写规范" aria-hidden="true">#</a> 12-4 SQL大小写规范</h3>
<ul>
<li>MySQL在Windows环境下大小写不敏感</li>
<li>MySQL在linux环境下大小写敏感
<ul>
<li>数据库名、表名、表的别名、变量名是严格区分大小写的</li>
<li>关键字、函数名、列名、列的别名是忽略大小写的</li>
</ul>
</li>
<li>推荐采用的书写规范
<ul>
<li>数据库名、表名、表别名、字段名、字段别名等用小写</li>
<li>SQL关键字、函数名、绑定变量等用大写</li>
</ul>
</li>
</ul>
<h2 id="p14-最基本的select-from" tabindex="-1"><a class="header-anchor" href="#p14-最基本的select-from" aria-hidden="true">#</a> p14-最基本的SELECT FROM</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token number">1</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token operator">*</span><span class="token number">2</span> <span class="token keyword">from</span> dual<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>dual是伪表。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209231749429.png" alt="image-20220923174915354"></p>
<h3 id="_14-1-去重" tabindex="-1"><a class="header-anchor" href="#_14-1-去重" aria-hidden="true">#</a> 14-1 去重</h3>
<p>在需要去重的字段前加上<span style="background-color:pink;">DISTINCT</span>：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 
<span class="token keyword">DISTINCT</span> job_id 
<span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">`</span>employees<span class="token punctuation">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209231915978.png" alt="image-20220923191540896"></p>
<h3 id="_14-2-空值参与运算" tabindex="-1"><a class="header-anchor" href="#_14-2-空值参与运算" aria-hidden="true">#</a> 14-2 空值参与运算</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> employee_id<span class="token punctuation">,</span>
salary <span class="token keyword">as</span> <span class="token string">'月工资'</span><span class="token punctuation">,</span>
commission_pct <span class="token keyword">as</span> <span class="token string">'奖金率'</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">+</span>commission_pct<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">12</span><span class="token operator">*</span>salary <span class="token keyword">as</span> <span class="token string">'年工资'</span> 
<span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">`</span>employees<span class="token punctuation">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209231916617.png" alt="image-20220923191620548"></p>
<p>可以看到，有些员工没有奖金率，年工资被算成了null，显然不合理。所以引入<span style="background-color:pink;">IFNULL函数</span></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 
employee_id<span class="token punctuation">,</span>
salary <span class="token keyword">as</span> <span class="token string">'月工资'</span><span class="token punctuation">,</span>
commission_pct <span class="token keyword">as</span> <span class="token string">'奖金率'</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">+</span>IFNULL<span class="token punctuation">(</span>commission_pct<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">12</span><span class="token operator">*</span>salary <span class="token keyword">as</span> <span class="token string">'年工资'</span> 
<span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">`</span>employees<span class="token punctuation">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209231916157.png" alt="image-20220923191639089"></p>
<h3 id="_14-3-显示表结构" tabindex="-1"><a class="header-anchor" href="#_14-3-显示表结构" aria-hidden="true">#</a> 14-3 显示表结构</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DESCRIBE</span> employees
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209231916342.png" alt="image-20220923191652273"></p>
<h3 id="_14-4-mysql大小写不敏感" tabindex="-1"><a class="header-anchor" href="#_14-4-mysql大小写不敏感" aria-hidden="true">#</a> 14-4 MySql大小写不敏感</h3>
<p><img src="http://www.iocaop.com/images/2022-09/202209231917008.png" alt="image-20220923191712931"></p>
<h2 id="p25-为什么需要多表查询" tabindex="-1"><a class="header-anchor" href="#p25-为什么需要多表查询" aria-hidden="true">#</a> p25-为什么需要多表查询？</h2>
<p><img src="http://www.iocaop.com/images/2022-09/202209231917880.png" alt="image-20220923191735824"></p>
<p>现在要查某个员工所在城市的名字，需要先根据员工姓名到employees表查询员工拿到员工的department_id，再到departments表根据department_id查询到的记录拿到location_id，到locations表，根据location_id查询记录，拿到city。如果不进行多表查询，就需要查询三次。</p>
<p>如果不进行多表查询，需要进行三次单表查询，如下：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> employees <span class="token keyword">where</span> last_name <span class="token operator">=</span><span class="token string">'Abel'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> departments <span class="token keyword">where</span> departments_id <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> locations <span class="token keyword">where</span> location_id <span class="token operator">=</span> <span class="token number">2500</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们知道，一般我们查询数据库是通过编程语言进行查询，web服务器和数据库就需要进行三次交互，期间的http请求就需要有三次，耗费时间变长，所以使用多表查询，就只需要一次请求。</p>
<blockquote>
<p>既然需要查询三次，为什么不把上面的三张表合成一张表？</p>
</blockquote>
<p>大部分查询不需要所有字段，会有很多冗余字段，对于不常用的字段，可以放在另外的表。减少orm加载字段的个数，除此之外还会有锁表的问题。</p>
<h2 id="p26-笛卡尔积多表连接" tabindex="-1"><a class="header-anchor" href="#p26-笛卡尔积多表连接" aria-hidden="true">#</a> p26-笛卡尔积多表连接</h2>
<h3 id="_26-1-笛卡尔积-交叉连接-的理解" tabindex="-1"><a class="header-anchor" href="#_26-1-笛卡尔积-交叉连接-的理解" aria-hidden="true">#</a> 26-1 笛卡尔积(交叉连接)的理解</h3>
<p>数学运算，假设有两个集合X(a,b,c)、Y(x,y)，他们中的元素的所有可能的组合，就是笛卡尔积。</p>
<h3 id="_26-2-多表查询-关联查询" tabindex="-1"><a class="header-anchor" href="#_26-2-多表查询-关联查询" aria-hidden="true">#</a> 26-2 多表查询(关联查询)</h3>
<p>笛卡尔积后加上连接条件才是正确的多表查询方式，<span style="background-color:pink;">连接条件至少有n-1个，n是表的个数</span>。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees<span class="token punctuation">,</span>
	departments 
<span class="token keyword">WHERE</span>
	employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209240931814.png" alt="image-20220924093123697"></p>
<p>在SQL优化的角度，多表查询时，<span style="background-color:pink;">每个字段前都应该指明其所在的表</span>，节省在查询过程中在表中寻找字段的时间。</p>
<blockquote>
<p>如果给表起了别名，在之后的select或者where语句中，则必须使用别名，不能再使用表的原名。</p>
</blockquote>
<h2 id="p28-sql92与sql99内连接和外连接" tabindex="-1"><a class="header-anchor" href="#p28-sql92与sql99内连接和外连接" aria-hidden="true">#</a> p28-SQL92与SQL99内连接和外连接</h2>
<h3 id="_28-1-左外连接" tabindex="-1"><a class="header-anchor" href="#_28-1-左外连接" aria-hidden="true">#</a> 28-1 左外连接</h3>
<p>上面的多表查询，相当于内连接，如果需要查询所有员工的数据，则需要使用左外连接。</p>
<p>MySQL不支持SQL92外连接的写法：</p>
<p>在最后补上(+)表示左外连接</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees<span class="token punctuation">,</span>
	departments 
<span class="token keyword">WHERE</span>
	employees<span class="token punctuation">.</span>department_id<span class="token punctuation">(</span><span class="token operator">+</span><span class="token punctuation">)</span> <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会报错。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209241101874.png" alt="image-20220924110152813"></p>
<p>oracle是支持的。</p>
<p>MySQL使用SQL99进行外连接。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_28-2-满外连接" tabindex="-1"><a class="header-anchor" href="#_28-2-满外连接" aria-hidden="true">#</a> 28-2 满外连接</h3>
<p>MySQL不支持<span style="background-color:pink;">FULL OUTER JOIN</span></p>
<p>需要配合<span style="background-color:pink;">UNION</span>来实现。将两个查询的结果集合并，并且<span style="background-color:pink;">去重</span>，去重效率会低一些。</p>
<p><span style="background-color:pink;">UNION ALL</span>合并查询结果集，<span style="background-color:pink;">不去重</span>。</p>
<h2 id="p29-7种join" tabindex="-1"><a class="header-anchor" href="#p29-7种join" aria-hidden="true">#</a> p29-7种join</h2>
<p><img src="http://www.iocaop.com/images/2022-09/202209241121989.png" alt="image-20220924112124859"></p>
<p>用下面两张表来写SQL</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209241124202.png" alt="image-20220924112426097"></p>
<p>左上图为左外连接：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">LEFT</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>右上图为右外连接</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">RIGHT</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>左中图为左外连接再去除右边表的数据可以使用<span style="background-color:pink;">IS NULL</span>来实现：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">LEFT</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id 
<span class="token keyword">WHERE</span>
	departments<span class="token punctuation">.</span>department_id <span class="token operator">IS</span> <span class="token boolean">NULL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>中图为内连接：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>右中图为右外连接再去除左表数据，也是使用<span style="background-color:pink;">IS NULL</span>来过滤左表的数据:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">RIGHT</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id 
<span class="token keyword">WHERE</span>
	employees<span class="token punctuation">.</span>department_id <span class="token operator">IS</span> <span class="token boolean">NULL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>左下图为<span style="background-color:pink;">满外连接</span>可以用左上图<span style="background-color:pink;">UNION ALL</span>右中图：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">LEFT</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
<span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">RIGHT</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id 
<span class="token keyword">WHERE</span>
	employees<span class="token punctuation">.</span>department_id <span class="token operator">IS</span> <span class="token boolean">NULL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>右下图则可以用左中图<span style="background-color:pink;">UNION ALL</span>右中图：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">LEFT</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id 
<span class="token keyword">WHERE</span>
	departments<span class="token punctuation">.</span>department_id <span class="token operator">IS</span> <span class="token boolean">NULL</span> <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
<span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">RIGHT</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id 
<span class="token keyword">WHERE</span>
	employees<span class="token punctuation">.</span>department_id <span class="token operator">IS</span> <span class="token boolean">NULL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p30-sql99语法新特性自然连接和using" tabindex="-1"><a class="header-anchor" href="#p30-sql99语法新特性自然连接和using" aria-hidden="true">#</a> p30-SQL99语法新特性自然连接和using</h2>
<h3 id="_30-1-自然连接" tabindex="-1"><a class="header-anchor" href="#_30-1-自然连接" aria-hidden="true">#</a> 30-1 自然连接</h3>
<p>自然连接可以理解为等值连接，但是会<span style="background-color:pink;">自动查询表中所有相同的字段，进行等值连接</span>。</p>
<p>用下面两张表来写SQL</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209241124202.png" alt="image-20220924112426097"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employees<span class="token punctuation">.</span>employee_id<span class="token punctuation">,</span>
	departments<span class="token punctuation">.</span>department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">NATURAL</span> <span class="token keyword">JOIN</span> departments
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和下面的sql查询结果是一样的：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employees<span class="token punctuation">.</span>employee_id<span class="token punctuation">,</span>
	departments<span class="token punctuation">.</span>department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id 
	<span class="token operator">AND</span> employees<span class="token punctuation">.</span>manager_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>manager_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_30-2-using" tabindex="-1"><a class="header-anchor" href="#_30-2-using" aria-hidden="true">#</a> 30-2 using</h3>
<p>与自然连接不同的是，using指定了连接时表中具体的相同字段的名称。</p>
<p>以下sql的结果是一样的</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employees<span class="token punctuation">.</span>employee_id<span class="token punctuation">,</span>
	departments<span class="token punctuation">.</span>department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">USING</span><span class="token punctuation">(</span>department_id<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employees<span class="token punctuation">.</span>employee_id<span class="token punctuation">,</span>
	departments<span class="token punctuation">.</span>department_name 
<span class="token keyword">FROM</span>
	employees
	<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">ON</span> employees<span class="token punctuation">.</span>department_id <span class="token operator">=</span> departments<span class="token punctuation">.</span>department_id 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p39-常用聚合函数" tabindex="-1"><a class="header-anchor" href="#p39-常用聚合函数" aria-hidden="true">#</a> p39-常用聚合函数</h2>
<h3 id="_39-1-avg、sum、count" tabindex="-1"><a class="header-anchor" href="#_39-1-avg、sum、count" aria-hidden="true">#</a> 39-1 AVG、SUM、COUNT</h3>
<p>求某列的平均数，相当于SUM/COUNT</p>
<p>SUM会统计不为NULL的行数的总和，COUNT会统计<span style="background-color:pink;">不为NULL</span>的行数</p>
<p>在使用count时，尽量不适用count(字段名)，因为有的记录该字段可能为NULL，导致求总数的结果不对。</p>
<h2 id="p40-group-by" tabindex="-1"><a class="header-anchor" href="#p40-group-by" aria-hidden="true">#</a> p40-GROUP BY</h2>
<p>用下面的表来写sql</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209241254094.png" alt="image-20220924125423029"></p>
<h3 id="_40-1-分组简单使用" tabindex="-1"><a class="header-anchor" href="#_40-1-分组简单使用" aria-hidden="true">#</a> 40-1 分组简单使用</h3>
<p>查询各个部门的员工的平均工资：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	<span class="token function">AVG</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209241255784.png" alt="image-20220924125500722"></p>
<p>现在又要查询各个部门的各个工种的平均工资,在group by中加字段就好了：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	job_id<span class="token punctuation">,</span>
	<span class="token function">AVG</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id<span class="token punctuation">,</span>
	job_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209241256827.png" alt="image-20220924125618743"></p>
<blockquote>
<p>select中出现的非组函数字段必须声明在group by 中。</p>
</blockquote>
<h3 id="_40-2-with-rollup" tabindex="-1"><a class="header-anchor" href="#_40-2-with-rollup" aria-hidden="true">#</a> 40-2 WITH ROLLUP</h3>
<p>在所有查询出的分组记录之后增加一条记录，该记录计算<span style="background-color:pink;">查询出的所有记录的总和</span>，即统计记录数量。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	<span class="token function">AVG</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id
	<span class="token keyword">WITH ROLLUP</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209241308985.png" alt="image-20220924130838903"></p>
<blockquote>
<p>需要注意使用ROLLUP时，不能同时使用ORDER BY进行结果排序，二者是互斥的。</p>
</blockquote>
<h2 id="p41-having的使用与sql语句执行过程" tabindex="-1"><a class="header-anchor" href="#p41-having的使用与sql语句执行过程" aria-hidden="true">#</a> p41-HAVING的使用与SQL语句执行过程</h2>
<h3 id="_41-1-having的使用" tabindex="-1"><a class="header-anchor" href="#_41-1-having的使用" aria-hidden="true">#</a> 41-1 HAVING的使用</h3>
<p>还是上表，需求：查出部门平均工资高于10000的部门</p>
<p>错误写法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	<span class="token function">AVG</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees 
	<span class="token keyword">where</span> 	<span class="token function">AVG</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> <span class="token operator">></span><span class="token number">10000</span>
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209241336603.png" alt="image-20220924133655549"></p>
<p>正确写法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	<span class="token function">AVG</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id 
<span class="token keyword">HAVING</span>
	<span class="token function">AVG</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">10000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209241337631.png" alt="image-20220924133715554"></p>
<blockquote>
<p>如果过滤条件中使用了聚合函数，则必须使用<span style="background-color:pink;">HAVING</span>来替换WHERE否则会报错。</p>
<p>HAVING必须写在GROUP BY的<span style="background-color:pink;">后面</span></p>
<p>HAVING一般配合GROUP BY使用，不然没有什么意义</p>
</blockquote>
<h3 id="_41-2-sql语句的执行过程" tabindex="-1"><a class="header-anchor" href="#_41-2-sql语句的执行过程" aria-hidden="true">#</a> 41-2 SQL语句的执行过程</h3>
<p>先看例子，还是之前的表，现在需要查询部门id为10、20、30、40这四个部门中，员工最高工资大于10000的信息。</p>
<p>方式1：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	<span class="token function">MAX</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">WHERE</span>
	department_id <span class="token operator">IN</span> <span class="token punctuation">(</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">40</span> <span class="token punctuation">)</span> 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id 
<span class="token keyword">HAVING</span>
	<span class="token function">MAX</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span><span class="token operator">></span> <span class="token number">10000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式2：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	<span class="token function">MAX</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id 
<span class="token keyword">HAVING</span>
	<span class="token function">MAX</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span><span class="token operator">></span> <span class="token number">10000</span> 
	<span class="token operator">AND</span> department_id <span class="token operator">IN</span> <span class="token punctuation">(</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">40</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两条sql执行结果是一样的，但是执行效率方式1更高。</p>
<blockquote>
<p>当过滤条件中有聚合函数时，此条件必须写在HAVING中，当过滤条件中没有聚合函数时，此条件可以写在WHERE中也可以写在HAVING中，但是建议写在WHERE中，效率更高</p>
</blockquote>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">#sql92语法：</span>
<span class="token keyword">SELECT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">(</span>存在聚合函数<span class="token punctuation">)</span>
<span class="token keyword">FROM</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">WHERE</span> 多表的连接条件 <span class="token operator">AND</span> 不包含聚合函数的过滤条件
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">HAVING</span> 包含聚合函数的过滤条件
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">ASC</span> <span class="token operator">/</span> <span class="token keyword">DESC</span> <span class="token punctuation">)</span>
<span class="token keyword">LIMIT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>


<span class="token comment">#sql99语法：</span>
<span class="token keyword">SELECT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">(</span>存在聚合函数<span class="token punctuation">)</span>
<span class="token keyword">FROM</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">(</span><span class="token keyword">LEFT</span> <span class="token operator">/</span> <span class="token keyword">RIGHT</span><span class="token punctuation">)</span><span class="token keyword">JOIN</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token keyword">ON</span> 多表的连接条件 
<span class="token punctuation">(</span><span class="token keyword">LEFT</span> <span class="token operator">/</span> <span class="token keyword">RIGHT</span><span class="token punctuation">)</span><span class="token keyword">JOIN</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">ON</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">WHERE</span> 不包含聚合函数的过滤条件
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">HAVING</span> 包含聚合函数的过滤条件
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">ASC</span> <span class="token operator">/</span> <span class="token keyword">DESC</span> <span class="token punctuation">)</span>
<span class="token keyword">LIMIT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SQL语句的执行过程：</p>
<ol>
<li>先找到from后面的所有表，再进行笛卡尔积</li>
<li>根据连表ON的条件过滤掉不需要的数据</li>
<li>根据JOIN的方式过滤数据</li>
<li>根据WHERE条件过滤数据</li>
<li>GROUP BY 分组</li>
<li>HAVING 条件过滤数据</li>
<li>SELECT过滤数据、DISTINCT去重</li>
<li>ORDER BY 排序</li>
<li>LIMIT分页</li>
</ol>
<p>所以可以看出，方式1是先过滤(部门id为10、20、30、40)数据再分组，方式2是先分组再过滤(部门id为10、20、30、40)数据。方式1效率高。</p>
<h2 id="p44-单行子查询案例分析" tabindex="-1"><a class="header-anchor" href="#p44-单行子查询案例分析" aria-hidden="true">#</a> p44-单行子查询案例分析</h2>
<h3 id="_44-1-查询公司工资最少的员工的信息" tabindex="-1"><a class="header-anchor" href="#_44-1-查询公司工资最少的员工的信息" aria-hidden="true">#</a> 44-1 查询公司工资最少的员工的信息</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	<span class="token operator">*</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">WHERE</span>
	salary <span class="token operator">=</span> <span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		<span class="token function">MIN</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_44-2-查询与141号员工的manager-id和department-id相同的其他员工的信息" tabindex="-1"><a class="header-anchor" href="#_44-2-查询与141号员工的manager-id和department-id相同的其他员工的信息" aria-hidden="true">#</a> 44-2 查询与141号员工的manager_id和department_id相同的其他员工的信息</h3>
<p>方式1：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	<span class="token operator">*</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">WHERE</span>
	manager_id <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> manager_id <span class="token keyword">FROM</span> employees <span class="token keyword">WHERE</span> employee_id <span class="token operator">=</span> <span class="token number">141</span> <span class="token punctuation">)</span> 
	<span class="token operator">AND</span> department_id <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> department_id <span class="token keyword">FROM</span> employees <span class="token keyword">WHERE</span> employee_id <span class="token operator">=</span> <span class="token number">141</span> <span class="token punctuation">)</span> 
	<span class="token operator">AND</span> employee_id <span class="token operator">&lt;></span> <span class="token number">141</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式2：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> employees <span class="token keyword">WHERE</span> <span class="token punctuation">(</span> manager_id<span class="token punctuation">,</span> department_id <span class="token punctuation">)</span><span class="token operator">=</span><span class="token punctuation">(</span> <span class="token keyword">SELECT</span> manager_id<span class="token punctuation">,</span> department_id <span class="token keyword">FROM</span> employees <span class="token keyword">WHERE</span> employee_id <span class="token operator">=</span> <span class="token number">141</span> <span class="token punctuation">)</span> 
<span class="token operator">AND</span> employee_id <span class="token operator">&lt;></span> <span class="token number">141</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_44-3-having中的子查询-查询最低工资大于50号部门最低工资的部门id和其最低工资" tabindex="-1"><a class="header-anchor" href="#_44-3-having中的子查询-查询最低工资大于50号部门最低工资的部门id和其最低工资" aria-hidden="true">#</a> 44-3 HAVING中的子查询：查询最低工资大于50号部门最低工资的部门id和其最低工资</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	<span class="token function">min</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id 
<span class="token keyword">HAVING</span>
	<span class="token function">min</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span><span class="token operator">></span><span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		<span class="token function">min</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
	<span class="token keyword">FROM</span>
		employees 
<span class="token keyword">WHERE</span>
	department_id <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_44-4-case中使用子查询" tabindex="-1"><a class="header-anchor" href="#_44-4-case中使用子查询" aria-hidden="true">#</a> 44-4 CASE中使用子查询</h3>
<p>显示员工的employee_id，last_name和location。其中若员工department_id与location_id为1800的员工的department_id相同，则为Canada，其余为USA.</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	last_name<span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token keyword">CASE</span> department_id <span class="token keyword">WHEN</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> department_id <span class="token keyword">FROM</span> departments <span class="token keyword">WHERE</span> location_id <span class="token operator">=</span> <span class="token number">1800</span> <span class="token punctuation">)</span> <span class="token keyword">THEN</span> <span class="token string">'Canada'</span> <span class="token keyword">ELSE</span> <span class="token string">'USA'</span> <span class="token keyword">END</span> <span class="token punctuation">)</span> <span class="token keyword">AS</span> location 
<span class="token keyword">FROM</span>
	employees
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p45多行子查询案例分析" tabindex="-1"><a class="header-anchor" href="#p45多行子查询案例分析" aria-hidden="true">#</a> p45多行子查询案例分析</h2>
<h3 id="_45-1-多行子查询比较操作符" tabindex="-1"><a class="header-anchor" href="#_45-1-多行子查询比较操作符" aria-hidden="true">#</a> 45-1 多行子查询比较操作符</h3>
<ul>
<li>IN，等于列表中的任意一个</li>
<li>ANY，和单行比较操作符一起使用，和子查询返回的<span style="background-color:pink;">某一个值</span>比较</li>
<li>ALL，和单行比较操作符一起使用，和子查询返回的<span style="background-color:pink;">所有值</span>比较</li>
<li>SOME，同ANY</li>
</ul>
<h3 id="_45-2-any和all的使用" tabindex="-1"><a class="header-anchor" href="#_45-2-any和all的使用" aria-hidden="true">#</a> 45-2 ANY和ALL的使用</h3>
<p>需求：返回其他job_id中，比job_id为‘IT_PROG’部门<span style="background-color:pink;">任一</span>工资低的，员工的员工号、姓名、job_id以及salary</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	last_name<span class="token punctuation">,</span>
	job_id<span class="token punctuation">,</span>
	salary 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">WHERE</span>
	job_id <span class="token operator">&lt;></span> <span class="token string">'IT_PROG'</span> 
	<span class="token operator">AND</span> salary <span class="token operator">&lt;</span> <span class="token keyword">ANY</span> <span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		salary 
	<span class="token keyword">FROM</span>
		employees 
<span class="token keyword">WHERE</span>
	job_id <span class="token operator">=</span> <span class="token string">'IT_PROG'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需求：返回其他job_id中，比job_id为‘IT_PROG’部门<span style="background-color:pink;">所有</span>工资低的，员工的员工号、姓名、job_id以及salary</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	last_name<span class="token punctuation">,</span>
	job_id<span class="token punctuation">,</span>
	salary 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">WHERE</span>
	job_id <span class="token operator">&lt;></span> <span class="token string">'IT_PROG'</span> 
	<span class="token operator">AND</span> salary <span class="token operator">&lt;</span> <span class="token keyword">ALL</span> <span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		salary 
	<span class="token keyword">FROM</span>
		employees 
<span class="token keyword">WHERE</span>
	job_id <span class="token operator">=</span> <span class="token string">'IT_PROG'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_45-3-聚合函数不能嵌套" tabindex="-1"><a class="header-anchor" href="#_45-3-聚合函数不能嵌套" aria-hidden="true">#</a> 45 -3 聚合函数不能嵌套</h3>
<p>需求：查询平均工资最低的部门id</p>
<p><span style="background-color:pink;">MySQL不支持聚合函数嵌套</span>，在oracle中可以。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	<span class="token function">min</span><span class="token punctuation">(</span> <span class="token function">avg</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> <span class="token punctuation">)</span> 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209270944341.png" alt="image-20220927094419225"></p>
<p>所以需要把第一次查询结果作为一张表，再查一次：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id 
<span class="token keyword">HAVING</span>
	<span class="token function">AVG</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		<span class="token function">min</span><span class="token punctuation">(</span> avg_sal <span class="token punctuation">)</span> 
	<span class="token keyword">FROM</span>
	<span class="token punctuation">(</span> <span class="token keyword">SELECT</span> department_id <span class="token keyword">AS</span> department_id<span class="token punctuation">,</span> <span class="token function">avg</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> <span class="token keyword">AS</span> avg_sal <span class="token keyword">FROM</span> employees <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> department_id <span class="token punctuation">)</span> t<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式2：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	department_id 
<span class="token keyword">HAVING</span>
	<span class="token function">AVG</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token keyword">ALL</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span>  <span class="token function">avg</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> <span class="token keyword">AS</span> avg_sal <span class="token keyword">FROM</span> employees <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> department_id <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p46-相关子查询案例分析" tabindex="-1"><a class="header-anchor" href="#p46-相关子查询案例分析" aria-hidden="true">#</a> p46-相关子查询案例分析</h2>
<h3 id="_46-1-查询员工中工资大于本部门平均工资的员工的last-name-salary-department-id" tabindex="-1"><a class="header-anchor" href="#_46-1-查询员工中工资大于本部门平均工资的员工的last-name-salary-department-id" aria-hidden="true">#</a> 46-1 查询员工中工资大于本部门平均工资的员工的last_name,salary,department_id</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	o<span class="token punctuation">.</span>last_name<span class="token punctuation">,</span>
	o<span class="token punctuation">.</span>salary<span class="token punctuation">,</span>
	o<span class="token punctuation">.</span>department_id 
<span class="token keyword">FROM</span>
	employees <span class="token keyword">AS</span> o 
<span class="token keyword">WHERE</span>
	o<span class="token punctuation">.</span>salary <span class="token operator">></span><span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		<span class="token function">avg</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> 
	<span class="token keyword">FROM</span>
		employees <span class="token keyword">AS</span> i 
	<span class="token keyword">WHERE</span>
		i<span class="token punctuation">.</span>department_id <span class="token operator">=</span> o<span class="token punctuation">.</span>department_id 
	<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
	i<span class="token punctuation">.</span>department_id 
	<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式2：将各部门平均工资查出来，作为一张表，进行联表查询：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	e<span class="token punctuation">.</span>last_name<span class="token punctuation">,</span>
	e<span class="token punctuation">.</span>department_id<span class="token punctuation">,</span>
	e<span class="token punctuation">.</span>salary 
<span class="token keyword">FROM</span>
	employees <span class="token keyword">AS</span> e<span class="token punctuation">,</span><span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		department_id<span class="token punctuation">,</span>
		<span class="token function">avg</span><span class="token punctuation">(</span> salary <span class="token punctuation">)</span> <span class="token keyword">AS</span> avg_sal 
	<span class="token keyword">FROM</span>
		employees 
	<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
		department_id 
	<span class="token punctuation">)</span> t 
<span class="token keyword">WHERE</span>
	e<span class="token punctuation">.</span>department_id <span class="token operator">=</span> t<span class="token punctuation">.</span>department_id 
	<span class="token operator">AND</span> e<span class="token punctuation">.</span>salary <span class="token operator">></span> t<span class="token punctuation">.</span>avg_sal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_46-2-在order-by中使用相关子查询-查询员工的employee-id-salary-department-id-并且按照department-name-在另一张表-进行排序" tabindex="-1"><a class="header-anchor" href="#_46-2-在order-by中使用相关子查询-查询员工的employee-id-salary-department-id-并且按照department-name-在另一张表-进行排序" aria-hidden="true">#</a> 46-2 在ORDER BY中使用相关子查询：查询员工的employee_id,salary,department_id,并且按照department_name（在另一张表）进行排序</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	salary<span class="token punctuation">,</span>
	department_id 
<span class="token keyword">FROM</span>
	employees <span class="token keyword">AS</span> e 
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span>
	<span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		department_name 
	<span class="token keyword">FROM</span>
		departments <span class="token keyword">AS</span> d 
	<span class="token keyword">WHERE</span>
	d<span class="token punctuation">.</span>department_id <span class="token operator">=</span> e<span class="token punctuation">.</span>department_id 
	<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>在查询中，除了GROUP BY 和LIMIT中，都可以声明子查询</p>
</blockquote>
<h3 id="_46-3-若employees表中的employee-id与job-history表中的employee-id相同的数目不小于2-则输出这些相同id的员工的employee-id-last-name和job-id" tabindex="-1"><a class="header-anchor" href="#_46-3-若employees表中的employee-id与job-history表中的employee-id相同的数目不小于2-则输出这些相同id的员工的employee-id-last-name和job-id" aria-hidden="true">#</a> 46-3 若employees表中的employee_id与job_history表中的employee_id相同的数目不小于2，则输出这些相同id的员工的employee_id，last_name和job_id</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	e<span class="token punctuation">.</span>employee_id<span class="token punctuation">,</span>
	e<span class="token punctuation">.</span>last_name<span class="token punctuation">,</span>
	e<span class="token punctuation">.</span>job_id 
<span class="token keyword">FROM</span>
	employees <span class="token keyword">AS</span> e 
<span class="token keyword">WHERE</span>
	<span class="token number">2</span> <span class="token operator">&lt;=</span><span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		<span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> 
	<span class="token keyword">FROM</span>
		job_history <span class="token keyword">AS</span> j 
<span class="token keyword">WHERE</span>
	j<span class="token punctuation">.</span>employee_id <span class="token operator">=</span> e<span class="token punctuation">.</span>employee_id<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_46-4-exist和not-exist关键字" tabindex="-1"><a class="header-anchor" href="#_46-4-exist和not-exist关键字" aria-hidden="true">#</a> 46-4 exist和not exist关键字</h3>
<blockquote>
<p>匹配每一条记录，如果满足条件，就不再往下匹配了,返回true，不满足则一直往下匹配子查询中的记录。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2022-09/202209281048990.png" alt="image-20220928104850874"></p>
<p>查询公司管理者的employee_id，last_name，job_id，department_id</p>
<p>方式1：自连接</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span>
	emp<span class="token punctuation">.</span>employee_id<span class="token punctuation">,</span>
	emp<span class="token punctuation">.</span>last_name<span class="token punctuation">,</span>
	emp<span class="token punctuation">.</span>job_id<span class="token punctuation">,</span>
	emp<span class="token punctuation">.</span>department_id 
<span class="token keyword">FROM</span>
	employees emp<span class="token punctuation">,</span>
	employees mgr 
<span class="token keyword">WHERE</span>
	emp<span class="token punctuation">.</span>employee_id <span class="token operator">=</span> mgr<span class="token punctuation">.</span>manager_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式2：子查询</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	last_name<span class="token punctuation">,</span>
	job_id<span class="token punctuation">,</span>
	department_id 
<span class="token keyword">FROM</span>
	employees 
<span class="token keyword">WHERE</span>
	employee_id <span class="token operator">IN</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> manager_id <span class="token keyword">FROM</span> employees <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式3：使用exist关键字和相关子查询</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	employee_id<span class="token punctuation">,</span>
	last_name<span class="token punctuation">,</span>
	job_id<span class="token punctuation">,</span>
	department_id 
<span class="token keyword">FROM</span>
	employees <span class="token keyword">AS</span> e1 
<span class="token keyword">WHERE</span>
	<span class="token keyword">EXISTS</span> <span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		<span class="token operator">*</span> 
	<span class="token keyword">FROM</span>
		employees <span class="token keyword">AS</span> e2 
	<span class="token keyword">WHERE</span>
	e1<span class="token punctuation">.</span>employee_id <span class="token operator">=</span> e2<span class="token punctuation">.</span>manager_id<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询departments表中不存在于employees表中的部门的department_id和department_name</p>
<p>方式1：右外连接</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	d<span class="token punctuation">.</span>department_id<span class="token punctuation">,</span>
	d<span class="token punctuation">.</span>department_name 
<span class="token keyword">FROM</span>
	employees <span class="token keyword">AS</span> e
	<span class="token keyword">RIGHT</span> <span class="token keyword">JOIN</span> departments <span class="token keyword">AS</span> d <span class="token keyword">ON</span> e<span class="token punctuation">.</span>department_id <span class="token operator">=</span> d<span class="token punctuation">.</span>department_id 
<span class="token keyword">WHERE</span>
	e<span class="token punctuation">.</span>department_id <span class="token operator">IS</span> <span class="token boolean">NULL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式2：使用not exist关键字和相关子查询</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	department_id<span class="token punctuation">,</span>
	department_name 
<span class="token keyword">FROM</span>
	departments <span class="token keyword">AS</span> d 
<span class="token keyword">WHERE</span>
	<span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span>
		<span class="token operator">*</span> 
	<span class="token keyword">FROM</span>
		employees <span class="token keyword">AS</span> e 
	<span class="token keyword">WHERE</span>
	e<span class="token punctuation">.</span>department_id <span class="token operator">=</span> d<span class="token punctuation">.</span>department_id 
	<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


