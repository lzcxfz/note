<template><div><p>课件资料：<a href = 'http://www.iocaop.com:5212/s/l5i5'>点击跳转</a></p>
<h2 id="p101-字符集的修改与底层原理说明" tabindex="-1"><a class="header-anchor" href="#p101-字符集的修改与底层原理说明" aria-hidden="true">#</a> p101-字符集的修改与底层原理说明</h2>
<p>在MySQL8.0之前，默认使用的字符集是latin1，需要在my.conf中加上<span style="background-color:pink;">character_set-server=utf8</span>。会影响我们创建库和创建表时使用的字符集(如果不显示指定字符集，默认和server一样)。</p>
<p>数据库字符集和比较规则分为：</p>
<ul>
<li>服务器级别</li>
<li>数据库级别</li>
<li>表级别</li>
<li>列级别</li>
</ul>
<p>创建时不显示指定，依次参照上一层。</p>
<h2 id="p109-mysql的逻辑架构" tabindex="-1"><a class="header-anchor" href="#p109-mysql的逻辑架构" aria-hidden="true">#</a> p109-MySQL的逻辑架构</h2>
<p>MySQL是CS架构，服务端是mysqld。无论客户端进程和服务器进程采用什么方式进行通信，最终的效果都是<span style="background-color:pink;">客户端进程向服务器进程发送一段文本(sql语句)，服务器进程处理后向客户端发送一段文本(处理结果)</span>。</p>
<p>服务器做了什么？以查询为例：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209281504592.png" alt="image-20220928150451489"></p>
<p>经典架构图(5.7)：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209281509550.png" alt="image-20220928150944485"></p>
<p>结合一条查询sql的执行来解释图中的组件：</p>
<ol>
<li>Connectors：客户端发起请求可以是各种语言的客户端，如JDBC。</li>
<li>Connection Pool：分配线程来处理sql语句。</li>
<li>SQL Interface：对接接口。</li>
<li>Caches &amp;Buffers：查询缓存，如果缓存命中，直接返回结果，未命中才执行下面的步骤。</li>
<li>Parser：解析SQL，语法分析、语义分析、生成语法树</li>
<li>Optimizer：优化器对SQL进行逻辑优化、物理优化</li>
<li>存储引擎：调用对应的API</li>
<li>文件系统：查找对应的数据，加载到内存中</li>
<li>日志文件：写日志</li>
<li>Caches &amp;Buffers：将查询结果放到缓存中</li>
<li>返回客户端</li>
</ol>
<h3 id="连接层" tabindex="-1"><a class="header-anchor" href="#连接层" aria-hidden="true">#</a> 连接层</h3>
<p>客户端和MySQL建立TCP连接，三次握手成功后，校验账号密码、身份认证、权限获取。</p>
<p>账号密码不对直接结束。通过则查询<span style="background-color:pink;">权限表</span>，之后的权限判断逻辑会依赖此时读到的权限。</p>
<blockquote>
<p>TCP连接后，会<span style="background-color:pink;">分配一个线程</span>专门与这个客户端交互。所以会有个线程池(减少创建和销毁的开销)，从线程池取一个线程，来执行后面的流程。</p>
</blockquote>
<h3 id="服务层" tabindex="-1"><a class="header-anchor" href="#服务层" aria-hidden="true">#</a> 服务层</h3>
<ul>
<li>
<p>SQL Interface</p>
<ul>
<li>接受用户SQL，返回需要的结果。</li>
<li>支持DML、DDL、存储过程、视图、触发器、自定义函数等多种SQL有语言接口。</li>
</ul>
</li>
<li>
<p>Parser：解析器</p>
<ul>
<li>对SQL进行语法分析、语义分析。将SQL分解成数据结构、传给后续步骤，如果分解出错说明SQL错误</li>
<li>验证、解析SQL<span style="background-color:pink;">生成语法树</span>，根据数据字典丰富查询语法树、<span style="background-color:pink;">验证客户端是否具有执行权限</span>。创建好语法树后，MySQL对SQL查询进行语法上的优化，进行查询重写。</li>
</ul>
</li>
<li>
<p>Optimizer：查询优化器</p>
<ul>
<li>
<p>语法解析、查询之前会使用查询优化器确定SQL语句的执行路径，生成<span style="background-color:pink;">执行计划</span>。</p>
</li>
<li>
<p>执行计划会表名<span style="background-color:pink;">使用哪些索引</span>、<span style="background-color:pink;">表的连接顺序</span>、执行引擎会按照执行计划中的步骤调用存储引擎API来执行查询，再返回结果。</p>
</li>
<li>
<p>使用<span style="background-color:pink;">选取-投影-连接</span>策略进行查询，例如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span>name <span class="token keyword">from</span> student <span class="token keyword">where</span> gender <span class="token operator">=</span> <span class="token string">'女'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>先根据where语句进行<span style="background-color:pink;">选取</span>，而不是将表中的记录全部查询出来，再过滤。根据id和那么进行属性<span style="background-color:pink;">投影</span>，而不是把所有字段查询出来再过滤。将这两个条件<span style="background-color:pink;">连接</span>起来生成最终查询结果。</p>
</li>
</ul>
</li>
<li>
<p>Caches &amp; Buffers：查询缓存组件</p>
<ul>
<li>MySQL内部维持着一些cache和buffer，比如query cache用来缓存select语句的执行结果，如果能命中缓存，就不必走后续步骤，直接返回。</li>
<li>缓存机制是一系列小缓存组成的，比如表缓存，记录缓存，key缓存、权限缓存。</li>
<li>查询缓存可以<span style="background-color:pink;">在不同客户端之间共享</span></li>
<li>MySQL5.7.20开始不推荐使用查询缓存，8.0已经删除</li>
</ul>
</li>
</ul>
<h3 id="引擎层" tabindex="-1"><a class="header-anchor" href="#引擎层" aria-hidden="true">#</a> 引擎层</h3>
<p>真正负责MySQL中数据存储和提取，对物理服务器级别维护的底层数据执行操作，服务器通过API与存储引擎进行通信，不同的存储引擎有不同的功能。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209281621674.png" alt="image-20220928162102601"></p>
<h3 id="存储层" tabindex="-1"><a class="header-anchor" href="#存储层" aria-hidden="true">#</a> 存储层</h3>
<p>所有的数据、数据库、表的定义、表的每一行内容、索引、都是在文件系统上，以文件的方式存在，并完成与存储引擎的交互。</p>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<p><img src="http://www.iocaop.com/images/2022-09/202209281623515.png" alt="image-20220928162314465"></p>
<h2 id="p110-sql执行流程" tabindex="-1"><a class="header-anchor" href="#p110-sql执行流程" aria-hidden="true">#</a> p110-SQL执行流程</h2>
<p><img src="http://www.iocaop.com/images/2022-09/202209281649882.png" alt="image-20220928164950812"></p>
<ol>
<li>
<p>查询缓存：在查询缓存中发现了这条SQL，就直接把结果返回给客户端，没有才会进入到解析器阶段。但是缓存效率命中率很低，所以MySQL8摒弃了这个功能。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209281656382.png" alt=""></p>
</li>
<li>
<p>解析器：对SQL进行语法分析、语义分析。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209281659330.png" alt="image-20220928165912270"></p>
<p>分析器会进行词法分析、语法分析生成语法树</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209281659818.png" alt="image-20220928165943762"></p>
</li>
<li>
<p>优化器：优化器会确定SQL语句的执行路径，比如是全表检索或者索引检索。在查询优化器中分为逻辑优化和物理优化。最终会生成执行计划</p>
</li>
<li>
<p>执行器：按照执行计划，去读写真实的表。执行前会判断是否有权限，执行后会将结果保存到缓存。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209281702997.png" alt="image-20220928170256936"></p>
</li>
</ol>
<p><img src="http://www.iocaop.com/images/2022-09/202209281703740.png" alt="image-20220928170313702"></p>
<h2 id="p111-mysql中sql执行流程演示" tabindex="-1"><a class="header-anchor" href="#p111-mysql中sql执行流程演示" aria-hidden="true">#</a> p111-MySQL中SQL执行流程演示</h2>
<p>查看profile开启状态，如果未开启，则开启。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> @<span class="token variable">@profiling</span>
<span class="token keyword">set</span> profiling <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看当前profile:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> profiles<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209281725861.png" alt="image-20220928172502793"></p>
<p>再执行两次下面的SQL后，查看profile：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> employees
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209281725533.png" alt="image-20220928172550477"></p>
<p>查看具体某一个profile:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> profile <span class="token keyword">for</span> query <span class="token number">77</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其实用Navicat可以直接查看剖析这一列:</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209281737700.png" alt="image-20220928173719595"></p>
<h2 id="p113-存储引擎" tabindex="-1"><a class="header-anchor" href="#p113-存储引擎" aria-hidden="true">#</a> p113-存储引擎</h2>
<h3 id="innodb-具备外键支持功能的事务存储引擎" tabindex="-1"><a class="header-anchor" href="#innodb-具备外键支持功能的事务存储引擎" aria-hidden="true">#</a> InnoDB：具备外键支持功能的事务存储引擎</h3>
<ul>
<li>默认事务性引擎，用来处理大量的短期事务，可以<span style="background-color:pink;">确保事务的完整提交和回滚</span></li>
<li>除了增加和查询，还需要更新、删除操作，就应该优先选择InnoDB</li>
<li>除非有非常特别的原因需要使用其他引擎，否则优先考虑InnoDB</li>
<li>数据文件结构
<ul>
<li>表名.frm 存储表结构</li>
<li>表名.ibd存储数据和索引</li>
</ul>
</li>
<li>InnoDB<span style="background-color:pink;">为处理大量数据的最佳性能设计</span></li>
<li>InnoDB比MyISAM写的效率差一些，并且会占用更多磁盘空间来保存数据和索引</li>
<li>MyISAM只缓存索引，不缓存真实数据，InnoDB都会缓存，对内存要求高，并且内存大小对性能有决定性影响。</li>
</ul>
<h3 id="myisam-主要的非事务处理存储引擎" tabindex="-1"><a class="header-anchor" href="#myisam-主要的非事务处理存储引擎" aria-hidden="true">#</a> MyISAM：主要的非事务处理存储引擎</h3>
<ul>
<li>全文索引、压缩、空间函数等。<span style="background-color:pink;">不支持事务、行级锁、外键。崩溃后无法安全恢复。</span></li>
<li>速度快、对事务没有完整性约束、主要以select、insert为主的应用</li>
<li>针对数据统计有额外的常数存储，所以count(*)查询效率很高</li>
<li>数据文件结构
<ul>
<li>表名.frm存储表结构</li>
<li>表名.MYD存储数据</li>
<li>表名.MYI存储索引</li>
</ul>
</li>
<li>应用场景：只读应用或者以读为主的业务</li>
</ul>
<h3 id="archive引擎-用于数据存档" tabindex="-1"><a class="header-anchor" href="#archive引擎-用于数据存档" aria-hidden="true">#</a> Archive引擎：用于数据存档</h3>
<ul>
<li>仅支持插入和查询，不能修改</li>
<li>MySQL5.5以后支持索引</li>
<li>有很好的压缩机制，使用zlib压缩库</li>
<li>同样的数据(英文)，比MyISAM小75%，比InnoDB小83%</li>
<li>行级锁，列支持自增</li>
<li>适合日志、数据采集类应用、存储大量的独立作为历史记录的数据。有很高的插入速度，但是对查询的支持较差。</li>
</ul>
<h3 id="blackhole引擎-丢弃写操作-读操作返回空内容" tabindex="-1"><a class="header-anchor" href="#blackhole引擎-丢弃写操作-读操作返回空内容" aria-hidden="true">#</a> Blackhole引擎：丢弃写操作，读操作返回空内容</h3>
<ul>
<li>没有实现任何存储机制，会丢弃所有插入的数据，不做任何保存</li>
<li>服务器会记录Blackhole表的日志，可以用于复制数据到备库，或者简单的记录日志。</li>
</ul>
<h3 id="csv引擎-存储数据时-以逗号分割" tabindex="-1"><a class="header-anchor" href="#csv引擎-存储数据时-以逗号分割" aria-hidden="true">#</a> CSV引擎：存储数据时，以逗号分割</h3>
<ul>
<li>可以将普通csv文件作为MySQL的表来处理，但不支持索引</li>
<li>可以做数据交换和机制</li>
<li>可以用文本编辑器或者Excel读取</li>
<li>快速导入导出</li>
</ul>
<h3 id="memory引擎-置于内存的表" tabindex="-1"><a class="header-anchor" href="#memory引擎-置于内存的表" aria-hidden="true">#</a> Memory引擎：置于内存的表</h3>
<ul>
<li>同时支持hash索引(默认)和B+树索引</li>
<li>比MyISA快一个数量级</li>
<li>表大小受限制，max_rows（创建表时指定）和max_heap_table_size（默认16mb，可以按需扩大）</li>
<li>数据和索引分开存储
<ul>
<li>表结构存储在磁盘，frm类型。数据存储在内存</li>
</ul>
</li>
<li>数据易丢失，声明周期短</li>
<li>使用场景
<ul>
<li>目标数据小，频繁访问，需要调整大小，不然内存溢出。</li>
<li>数据临时的，丢失也没关系</li>
</ul>
</li>
</ul>
<h3 id="federated引擎-访问远程表" tabindex="-1"><a class="header-anchor" href="#federated引擎-访问远程表" aria-hidden="true">#</a> Federated引擎：访问远程表</h3>
<ul>
<li>是一个访问其他MySQL服务器的代理，看似提供了跨服务器的灵活性，但是经常带来问题， 默认是禁用的。</li>
</ul>
<h3 id="merge引擎-管理多个myisam表构成的表集合" tabindex="-1"><a class="header-anchor" href="#merge引擎-管理多个myisam表构成的表集合" aria-hidden="true">#</a> Merge引擎：管理多个MyISAM表构成的表集合</h3>
<h3 id="ndb引擎-mysql集群专用存储引擎" tabindex="-1"><a class="header-anchor" href="#ndb引擎-mysql集群专用存储引擎" aria-hidden="true">#</a> NDB引擎：MySQL集群专用存储引擎</h3>
<h2 id="p115-为什么使用索引及索引的优缺点" tabindex="-1"><a class="header-anchor" href="#p115-为什么使用索引及索引的优缺点" aria-hidden="true">#</a> p115-为什么使用索引及索引的优缺点</h2>
<h3 id="为什么使用索引" tabindex="-1"><a class="header-anchor" href="#为什么使用索引" aria-hidden="true">#</a> 为什么使用索引？</h3>
<p>提升查询数据的效率。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291119258.png" alt="image-20220929111934189"></p>
<p>如图：</p>
<ul>
<li>左边是不使用索引的情况，磁盘存储是散列的，要找到一个数据需要查找很多次。</li>
<li>右图是用一个简单的索引(类似数组索引)，要找到89，顺序查找的话需要6次，时间复杂度O(n)。</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-09/202209291121233.png" alt="image-20220929112135182"></p>
<p>如果使用二叉搜索树的话，时间复杂度是O(logn)。</p>
<h3 id="索引的优缺点" tabindex="-1"><a class="header-anchor" href="#索引的优缺点" aria-hidden="true">#</a> 索引的优缺点</h3>
<p>索引的定义：帮助MySQL高效获取数据的数据结构。</p>
<p>索引的本质：是一种数据结构。在这种数据结构上实现高级查找算法。</p>
<p>索引是在存储引擎中实现的，每种存储引擎的索引不一定完全相同。</p>
<p>优点：</p>
<ol>
<li>降低数据库IO成本。</li>
<li>创建唯一索引可以保证数据库中每一行的数据唯一性。</li>
<li>加速表之间的连接。</li>
<li>在使用分组和排序时，索引可以显著减少查询中分组和排序的时间，降低CPU消耗。（索引本身就是排好序的）</li>
</ol>
<p>缺点：</p>
<ol>
<li>创建索引和维护索引需要耗费时间，随着数据量增加，维护的成本也会提高。</li>
<li>索引需要占用磁盘空间。（如MyISAM，索引和数据分开存，索引放在MYI文件，InnoDB索引和数据存在一起，在idb文件）</li>
<li>索引大大提高了查询速度，同时却会降低更新表的速度。当表中数据进行增加删除修改时，索引也要动态维护，降低了数据维护的速度。</li>
</ol>
<blockquote>
<p>索引可以提高查询速度，但是会影响插入速度。可以先删除索引，再插入数据，插入完成以后再创建索引。因为大量插入时维护索引消耗的时间会比重新创建索引花的时间更多。</p>
</blockquote>
<h3 id="p116-一个简单索引的设计方案" tabindex="-1"><a class="header-anchor" href="#p116-一个简单索引的设计方案" aria-hidden="true">#</a> p116-一个简单索引的设计方案</h3>
<h3 id="innodb中索引的推演" tabindex="-1"><a class="header-anchor" href="#innodb中索引的推演" aria-hidden="true">#</a> InnoDB中索引的推演</h3>
<p>一个数据页的默认大小是16kb，所以数据会分成多个数据页来存储。</p>
<ul>
<li>假设数据比较少，都存放在一个页中，查找：
<ul>
<li>以主键作为搜索条件，可以使用二分法快速定位。</li>
<li>以其他列作为搜索条件，顺序遍历（记录是单链表的方式连接的）。</li>
</ul>
</li>
<li>数据多，就需要在多页中查找，分为两步：
<ul>
<li>定位到记录所在的页。</li>
<li>在页内查找相应的记录。</li>
</ul>
</li>
</ul>
<p>所以，在多页查找时怎么定位到记录所在的页呢？总不能一页一页挨条得去找吧？所以需要用到索引。</p>
<h3 id="设计索引" tabindex="-1"><a class="header-anchor" href="#设计索引" aria-hidden="true">#</a> 设计索引</h3>
<p>建一个表。ddl如下：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> index_demo<span class="token punctuation">(</span>c1 <span class="token keyword">INT</span><span class="token punctuation">,</span>c2 <span class="token keyword">INT</span><span class="token punctuation">,</span>c3 <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">(</span>c1<span class="token punctuation">)</span><span class="token punctuation">)</span> ROW_FORMAT <span class="token operator">=</span> Compact<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>行格式是Compact，简化了的行格式示意图如下：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291331749.png" alt="image-20220929133120668"></p>
<ul>
<li>record_type：记录的类型。0普通记录，1后面再讲，2最小记录，3最大记录</li>
<li>next_record：下一条记录相对本条记录的地址偏移量。</li>
</ul>
<p>把其他信息去掉，竖过来看，就是下面这样：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291333672.png" alt="image-20220929133329618"></p>
<p>把一些记录放到页里面：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291334409.png" alt="image-20220929133419357"></p>
<p>设计好后，我们在空页里面插入三条记录(1,4,u),(5,3,y),(3,9,d),，页示意图就如下：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291336565.png" alt="image-20220929133641506"></p>
<p>会按主键的顺序排列好，这时候页满了，又要加一条数据(4,4,a)会怎么样？</p>
<p>要重新分配一个页，而且还要按照主键重新排序，此时会发生页的分裂：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291339262.png" alt="image-20220929133918181"></p>
<p>随着数据的增加，就会变成下面这样：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291341371.png" alt="image-20220929134141310"></p>
<p>这些数据页在磁盘上存储时都是不连续的，编号也不是连续的，想快速查找数据(总不可能一页一页过一遍，去查想要的数据吧？)，就要给这些页做个目录。</p>
<p>把每页的最小记录取出来，页号取出来：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291352455.png" alt="image-20220929135246359"></p>
<p>根据最小值来，可以考虑使用二分法的方式快速找到对应的页，再到页里面去查找记录。</p>
<p>这就是索引的雏形。</p>
<h2 id="p117-索引的迭代设计方案" tabindex="-1"><a class="header-anchor" href="#p117-索引的迭代设计方案" aria-hidden="true">#</a> p117-索引的迭代设计方案</h2>
<p>上面这些目录项，随着数据量的增加，会变得很多，那么在数据维护期间，目录项也会跟着变化，那肯定是不能顺序存储的，因为插入删除要移动节点，很麻烦。所以可以把目录项页设计成数据一样，通过链表的方式连接，然后随着数据增加变成目录页。</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291402318.png" alt="image-20220929140240264"></p>
<p>那目录页和数据页怎么区分？</p>
<p>record_type为1，就是目录记录，为0就是普通记录。</p>
<p>都可以通过二分法，快速找到记录。</p>
<p>比如要找主键为20的这条记录，通过二分法可以定位到数据在页9中，再到页9中通过二分法找到这条记录。io次数为2，只需要把目录页和页9加载到内存中就好了。</p>
<p>随着数据增多，一页存不下所有的目录项了，所以目录页也会有多个：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291409372.png" alt="image-20220929140943309"></p>
<p>同样的思想：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291410387.png" alt="image-20220929141033334"></p>
<p>其实这就是一个B+树，<span style="background-color:pink;">实际B+树的生成，是先生成根节点的，为了理解方便，才这样画图迭代。</span>：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209291412837.png" alt="image-20220929141206788"></p>
<h2 id="p118-常见索引的概念" tabindex="-1"><a class="header-anchor" href="#p118-常见索引的概念" aria-hidden="true">#</a> p118-常见索引的概念</h2>
<h3 id="聚簇索引" tabindex="-1"><a class="header-anchor" href="#聚簇索引" aria-hidden="true">#</a> 聚簇索引</h3>
<p>聚簇索引并不是单独一种索引类型，而是一种数据的存储方式(所有记录都存储在叶子节点)，索引即数据，数据及索引。不需要主动创建，因为是基于主键来的，创建表时引擎会自动创建好聚簇索引。</p>
<p>聚簇索引的特点：</p>
<ul>
<li>页内的记录按照主键的大小顺序排成一个单向链表</li>
<li>各个用户记录的页根据用户记录的主键大小排成一个双向链表</li>
<li>目录记录页分为不同的层次，在同一层次也是根据主键大小排成一个双向链表。</li>
<li>B+树叶子节点存储的是完整的用户记录</li>
</ul>
<p>聚簇索引的优点：</p>
<ul>
<li>数据访问更快，聚簇索引的索引和数据保存在同一个B+树中，相比非聚簇索引（需要回表）访问会更快。</li>
<li>按照聚簇索引排列顺序查找一定范围数据的时候，由于数据都是紧密连接的，数据不需要从多个数据快中提取， 节省了大量io操作。</li>
</ul>
<p>聚簇索引的缺点：</p>
<ul>
<li>插入速度严重依赖插入顺序，按照主键的顺序插入是最快的方式，否则会出现页分裂，严重影响性能，对于InnoDB表，一般会定义一个自增的id列为主键。</li>
</ul>
<p>限制：</p>
<ul>
<li>MySQL中只有InnoDB支持聚簇索引，MyISAM不支持。</li>
<li>对于数据物理存储排序方式只有一种，所以每个MySQL表只有一个聚簇索引。</li>
<li>如果没有定义主键，InnoDB会选择非空的唯一字段来作为索引，如果没有这样的列，InnoDB会隐式定义一个主键来作为聚簇索引。</li>
<li>为了充分利用聚簇索引的特性，尽量使用有序的顺序id，不建议使用无序的。比如UUID、MD5、HASH等，无法保证数据的顺序增长。</li>
</ul>
<h3 id="二级索引-非聚簇索引、辅助索引" tabindex="-1"><a class="header-anchor" href="#二级索引-非聚簇索引、辅助索引" aria-hidden="true">#</a> 二级索引(非聚簇索引、辅助索引)</h3>
<p>聚簇索引只能在搜索条件时主键的情况下才能发挥作用，因为B+树中的数据是按照主键的顺序进行排列的。那么想要别的列作为搜索条件怎么办？</p>
<p>一个表可以建立多棵B+树，不同的B+树用不同的排序规则。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210070123994.png" alt="image-20221007012306864"></p>
<p>图中以c2建立二级索引，那么在最底层，就会按c2的内容排序，会以单链表的形式连接，并且存储对应的主键的值。再往上就是存储页号和当前页最小值。和主键索引是一样的结构，只是最底层不一样。</p>
<p>查找时，最终会查出数据所对应的主键值，这时候需要拿着个主键值到聚簇索引中去查找所有列的数据返回给用户，这个操作叫做<span style="background-color:pink;">回表</span>。为什么不在二级索引存储包含所有列的数据呢？如果二级索引有多个，就会冗余多次，浪费空间。</p>
<p>聚簇索引查询效率高，插入删除时比二级索引低。比如我们改一个没有建立二级索引的列，那么只需要维护聚簇索引就好了，二级索引不需要动。</p>
<h3 id="联合索引" tabindex="-1"><a class="header-anchor" href="#联合索引" aria-hidden="true">#</a> 联合索引</h3>
<p>同时为多个列建立索引，比如c2、c3两列。会先按c2排序，在c2相同的情况下按c3排序。本质上也是二级索引。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210070141605.png" alt="image-20221007014117528"></p>
<h2 id="p119-innodb中-b-树注意事项" tabindex="-1"><a class="header-anchor" href="#p119-innodb中-b-树注意事项" aria-hidden="true">#</a> p119-InnoDB中 B+树注意事项</h2>
<h3 id="根页面位置万年不动" tabindex="-1"><a class="header-anchor" href="#根页面位置万年不动" aria-hidden="true">#</a> 根页面位置万年不动</h3>
<p>当我们创建完表，数据不多时，页1是这样的：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210070537021.png" alt="image-20221007053713963"></p>
<p>假设现在一页满了，又来一条数据，页1会保持原来的位置，复制一份，假设是页2，会是这样的：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210070547049.png" alt="image-202210070547049"></p>
<p>同样，假设页1又满了，会再复制一份页1的数据给页4(左中页)，会是这样的：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210070547820.png" alt="image-202210070547820"></p>
<p>总结一句话就是：根页面位置不动。</p>
<h3 id="内节点中目录项记录的唯一性" tabindex="-1"><a class="header-anchor" href="#内节点中目录项记录的唯一性" aria-hidden="true">#</a> 内节点中目录项记录的唯一性</h3>
<p>当二级索引列的值重复时，就会出现下面的情况：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210070605219.png" alt="image-20221007060543165"></p>
<p>现在有2条c2列都是1的数据，这时候要再添加一条c2列也是1的数据，应该把节点加在页4还是页5？无法判断了。所以，要保证非叶子节点是唯一的，就需要把主键页保存到叶子节点中：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210070608814.png" alt="image-20221007060858761"></p>
<p>这样，再插入一条数据(9,1,c)就可以先根据二级索引找到页3，再通过主键定位到页5，最后在页5中新增节点保存索引。</p>
<h3 id="一个页面最少保存2条记录" tabindex="-1"><a class="header-anchor" href="#一个页面最少保存2条记录" aria-hidden="true">#</a> 一个页面最少保存2条记录</h3>
<p>如果一页只有一条，那就没意义了。</p>
<h2 id="p119-myisam的索引方案" tabindex="-1"><a class="header-anchor" href="#p119-myisam的索引方案" aria-hidden="true">#</a> p119-MyISAM的索引方案</h2>
<p>MySQL中支持B+树的存储引擎有：InnoDB、MyISAM、Memory</p>
<p><span style="background-color:pink;">MyISAM中(myi存储索引、myd存储数据)，B+树叶子节点的data域存储的是数据记录的地址</span>，而InnoDB中(idb文件)，聚簇索引叶子节点存储的是数据和索引，二级索引存储的是索引和主键。</p>
<p>MyISAM中没有聚簇索引，因为B+树MYI文件只需要保存索引和数据所在的地址即可，并且数据MYD文件也不需要进行数据排序，按照插入的顺序依次存就好了。</p>
<p>基于主键创建索引：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210070623927.png" alt="image-20221007062322861"></p>
<p>基于c2列创建索引：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210070623317.png" alt="image-20221007062346259"></p>
<p>7都是二级索引，没有保存数据。</p>
<h3 id="innodb索引和myisam索引对比" tabindex="-1"><a class="header-anchor" href="#innodb索引和myisam索引对比" aria-hidden="true">#</a> InnoDB索引和MyISAM索引对比</h3>
<ul>
<li>InnoDB中，可以根据主键值在聚簇索引中查找一次找到对应的记录。而MyISAM没有聚簇索引，无论是根据主键还是非主键列查询，都需要回表，所以MyISAM的索引都是二级索引。</li>
<li>InnoDB索引和数据再同一个文件(idb)，MyISAM索引文件(MYI)和数据文件(MYD)分离，索引文件不保存数据，只保存数据所在地址。</li>
<li>MyISAM回表速度很快，和数组类似，直接拿地址偏移量到文件中取数据。InnoDB回表是拿主键，再到聚簇索引中查找，速度相对慢一点。</li>
<li>InnoDB表要求必须要有主键(MyISAM可以没有)，如果没有显示指定，MySQL会自动选择非空且唯一的列做主键，如果不存在，还会生成一个隐含的列作为主键。</li>
</ul>
<p>小结：</p>
<p>了解了存储引擎索引实现对正确使用和索引优化有帮助：</p>
<p>现在我们明白为什么主键不能过长：</p>
<ul>
<li>导致每个页能存储的数据变少。</li>
<li>二级索引需要保存主键，使得二级索引变得很大。</li>
<li>主键应该是单调递增或递减，否则插入数据时需要移动节点，页分裂导致效率变低。</li>
</ul>
<p>索引的代价：</p>
<p>空间上的代价：没建立一个索引都会建立一颗B+树，B+树的每页默认占用16kb空间，一颗很大的B+树有很多页组成，就是很大的空间。</p>
<p>时间上的代价：每次对表数据进行增删改的时候，都需要去修改各个B+树索引，并且每层节点都是按照从小到大的顺序排列组成双向链表。无论是叶子节点还是内节点中的记录都是按照索引列的值从小到大的顺序形成单链表，增删改可能对节点和记录的顺序造成破坏，存储引擎需要花费时间维护，比如记录移位、页分裂、页面回收。如果建立索引过多，每个索引对应的B+树都需要相关的维护操作，会影响性能。</p>
<h2 id="p120-hash索引、avl树、b树、b-树对比" tabindex="-1"><a class="header-anchor" href="#p120-hash索引、avl树、b树、b-树对比" aria-hidden="true">#</a> p120-HASH索引、AVL树、B树、B+树对比</h2>
<h3 id="mysql数据结构选择的合理性" tabindex="-1"><a class="header-anchor" href="#mysql数据结构选择的合理性" aria-hidden="true">#</a> MySQL数据结构选择的合理性</h3>
<p>需要考虑磁盘io，让索引的数据结构尽量减少磁盘io次数，耗时就会越小。</p>
<p>为什么不一次性把所有数据加载到内存中呢？</p>
<p>当数据量大时，占用内存会很大，不可能把整个索引加载到内存，所以只能逐一加载，一页一页加载，加载一次就是一次io，那么衡量查询效率的标准就是io次数。</p>
<h3 id="全表遍历" tabindex="-1"><a class="header-anchor" href="#全表遍历" aria-hidden="true">#</a> 全表遍历</h3>
<p>不走索引，直接在叶子节点一页一页去遍历，查询对应的数据，效率极低。</p>
<h3 id="hash索引" tabindex="-1"><a class="header-anchor" href="#hash索引" aria-hidden="true">#</a> HASH索引</h3>
<p>Hash本身是一个散列函数，通过某种确定的算法，相同的输入永远可以得到相同的输出（哈希值）。</p>
<p>在数据结构中加速查找的数据常见的有两类：</p>
<ul>
<li>平衡二叉树，crud的平均时间复杂度都是O(log2N)</li>
<li>哈希，crud平均时间复杂度都是O(1)</li>
</ul>
<p>hash存储，将key按照算法计算得出哈希值，再对数据长度取模，得到数组下标。假设数组长度为16，现在有两个数据，key的哈希值为17和33，那得出来的数组下标都是1，怎么办？可以采用链表法：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071603650.png" alt="image-20221007160317592"></p>
<p>当长度超过8时，可以把链表转成红黑树。详细可以学习HashMap相关知识。</p>
<p>hash索引的效率这么高，为什么MySQL的索引要设计成树型？</p>
<ul>
<li><strong>范围查询时</strong>，哈希索引时间复杂度是O(n)，也就是有几条数据就要查询几次。而树型结构是有序的，依然可以保持O(log2N)的高效率。</li>
<li>Hash索引是没有顺序的，在ORDER BY时，还是需要重新排序</li>
<li>联合索引时，hash将联合索引合并后一起计算，无法单独一个键或者几个索引键进行查询。</li>
<li>虽然Hash索引等值查询效率高，但是如果索引的重复值很多，效率就会变低，因为重复就是hash冲突，还需要遍历链表或红黑树来查。所以hash索引一般不会用到重复值很多的列上。</li>
</ul>
<p>hash索引适用：</p>
<ul>
<li>
<p>redis</p>
</li>
<li>
<p>MySQL中的Memory引擎。我们需要用到临时表时可以使用Memory引擎把某个字段设为索引，当字段重复度低时效率也不错。</p>
</li>
<li>
<p>InnoDB有自适应hash索引。当某个数据经常访问，满足一定的条件后，就会将这个数据页的地址存放到hash表中，这样下次查询的时候就可以直接找到这个页所在的位置。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071624198.png" alt="image-20221007162424138"></p>
<p>​	如图，比如以col建立了二级索引，那每次查询的时候都需要在二级索引里面查到到对应的主键，然后回表到聚簇索引里面查询。如果查询的次数多的话，可以把col的值进行hash，并保存其所在的数据页的地址。后面查找就不需要再走二级索引和回表了，直接在hash中拿到对应的数据页地址去查询。</p>
<p>可以在MySQL中查看是否开启了自适应hash索引:</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071629459.png" alt="image-20221007162950408"></p>
</li>
</ul>
<h3 id="二叉搜索树" tabindex="-1"><a class="header-anchor" href="#二叉搜索树" aria-hidden="true">#</a> 二叉搜索树</h3>
<p>特点：左子节点比本节点小，右子节点比本节点大。如果用二叉树作为索引结构，那么磁盘的io次数也是和树的高度相关。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071633223.png" alt="image-20221007163350176"></p>
<p>有一种情况：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071635444.png" alt="image-20221007163535395"></p>
<p>当所有节点都比父节点大或者小时，就会退化成链表。树的高度也很高，查询效率很低，所以要降低树的高度。</p>
<h3 id="avl树" tabindex="-1"><a class="header-anchor" href="#avl树" aria-hidden="true">#</a> AVL树</h3>
<p>平衡二叉树：左右两颗子树的高度差绝对值不超过1，并且左右两颗子树都是平衡二叉树。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071640868.png" alt="image-20221007164023814"></p>
<p>这样就降低了树的高度，减少io次数(让树变得矮胖)，当数据量变大时，可以变成M叉树，比如三叉树：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071642162.png" alt="image-20221007164219116"></p>
<h3 id="b树" tabindex="-1"><a class="header-anchor" href="#b树" aria-hidden="true">#</a> B树</h3>
<p>多路平衡查找树。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071645649.png" alt="image-20221007164518585"></p>
<p>比如要找到9，先从根节点：</p>
<ul>
<li>9&lt;17，通过p1定位到磁盘块2。</li>
<li>9&gt;8且9&lt;12，通过p2定位到磁盘块6。</li>
<li>二分查找，定位到具体数据。</li>
</ul>
<p>小结：</p>
<ul>
<li>B树再插入或者删除节点时导致树不平衡，需要调整节点来保持平衡。</li>
<li>叶子结点和非叶子节点都会存放数据，搜索有可能在非叶子节点结束。</li>
<li>搜索性能等价于在关键字全集内做一次二分查找。</li>
</ul>
<h3 id="b-树" tabindex="-1"><a class="header-anchor" href="#b-树" aria-hidden="true">#</a> B+树</h3>
<p>也是多路搜索树，在B树上做了优化。</p>
<p>B树：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071652960.png" alt="image-20221007165205894"></p>
<p>B+树：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210071652627.png" alt="image-20221007165234561"></p>
<p>区别：</p>
<ul>
<li>B树：孩子数量=关键字数量+1，B+树：孩子数量=关键字数量。</li>
<li>B树：子节点不会出现父节点中的数据，B+树：父节点会保存子节点中的最大值或最小值。</li>
<li>B树：非叶子结点会保存数据，B+树：只有叶子节点才会有数据。</li>
<li>B树：叶子节点不能形成一个完整的有序链表，因为有一部分数据再非叶子节点上。B树：数据只存储在叶子节点，并且是有序排列的，可以形成一个完整的有序的链表。</li>
</ul>
<p>为什么说B+树更优化？</p>
<ul>
<li>B树查找时有可能在非叶子节点结束，也有可能在叶子节点结束，查询效率不稳定。B+树都是在叶子节点结束的，查询效率稳定。</li>
<li>B+树查询效率更高，因为在一页内，B+树只存储索引，B树需要存储索引和数据，B+树阶数会更大，也就是树会更矮胖，io次数更少。</li>
<li>在范围查找时，B+树查询只需要在叶子节点查找即可，因为叶子节点都是排好序的，有序链表。而B树需要在叶子结点和非叶子节点上查找，会更多io，效率更低。</li>
</ul>
<h3 id="经典面试题" tabindex="-1"><a class="header-anchor" href="#经典面试题" aria-hidden="true">#</a> 经典面试题</h3>
<ul>
<li>
<p>为了减少io，索引树会一次性加载吗？</p>
<blockquote>
<p>不会，聚簇索引包含了数据，如果数据量大，会占用很大的内存。因为磁盘页对应了索引树的节点，所以逐一加载就好了。</p>
</blockquote>
</li>
<li>
<p>B+树的存储能力如何？为何说查找行记录最多只需要1-3次磁盘io？</p>
<blockquote>
<p>InnoDB引擎页大小是16KB，一般主键INT(4字节)或BIGINT(8字节)，指针类型也为4字节或8字节，按大的算，一个节点16字节，那么一页就能存16KB/16B=1024个非叶子节点。为了方便计算，用1000来算。</p>
<p>再假设叶子节点每页存储1000个节点，那么高度为3的B+树可以存储：1000*1000*1000个叶子节点</p>
<p>实际情况，每页可能填不满，B+树高度一般是2-4层，InnoDB设计时根节点常驻内存(根页面位置是万年不动的)，所以查找某一记录最多需要1-3次io。</p>
</blockquote>
</li>
<li>
<p>为什么说B+树比B树更适合做操作系统文件索引和数据库索引？(上面已经分析过了)</p>
<blockquote>
<p>1 B+树效率更稳定</p>
<p>2 B+树更矮胖，效率更好</p>
</blockquote>
</li>
<li>
<p>Hash索引和B+树索引的区别？</p>
<blockquote>
<p>1 hash索引不支持范围查询，数据是无序的，而B+树支持，因为叶子结点是有序的链表</p>
<p>2 hash索引不支持联合索引的最左原则，hash索引会把联合索引键合并再计算hash值，而不是每个索引单独计算哈希值，联合索引无法被利用，</p>
<p>3 不支持order by 排序。数据是无序的。同理，不支持模糊查询</p>
<p>4 InnoDB不支持哈希索引，但是有自适应hash索引。</p>
</blockquote>
</li>
<li>
<p>hash索引和B+树索引在建立索引的时候是手动指定的吗？</p>
<blockquote>
<p>InnoDB不支持哈希索引，但是有自适应hash索引，不需要手动指定自适应hash索引。InnoDB和MyISAM都会默认采用B+树结构。如果是Memory和NDB引擎可以选择hash索引。</p>
</blockquote>
</li>
</ul>
<h2 id="p121-innodb数据存储结构" tabindex="-1"><a class="header-anchor" href="#p121-innodb数据存储结构" aria-hidden="true">#</a> p121-InnoDB数据存储结构</h2>
<p>不同存储引擎使用的数据存储结构不一样，主要学习InnoDB中的页就好了。</p>
<h3 id="页面结构概述" tabindex="-1"><a class="header-anchor" href="#页面结构概述" aria-hidden="true">#</a> 页面结构概述</h3>
<p>页是磁盘和内存交互的基本单位，一次最少从磁盘读取16kb的内容到内存中，一次最少把内存中16kb的数据刷新到磁盘中。也就是说，在数据库中，不论读取一行还是多行，都是将这些行所在的页进行加载，数据库管理存储空间的基本单位是页，io操作的最小单位是页。一页可以存储多行记录。</p>
<blockquote>
<p>记录是按照行来存储的，但是读取数据不会以行为单位，否则读取(io)一次只能拿到一行数据，效率低。</p>
</blockquote>
<p>不同的页不在物理结构上相连，通过双向链表相关联即可。每个数据页中的记录会按照主键值从小到大的顺序组成一个单链表。每个数据页都会为存储在他里面的记录生成一个页目录，通过主键查找记录的时候可以在页目录中使用二分法快速定位对应的页，然后遍历对页中的记录就好了。</p>
<h3 id="页面结构大小" tabindex="-1"><a class="header-anchor" href="#页面结构大小" aria-hidden="true">#</a> 页面结构大小</h3>
<p>默认一页16kb：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210072323226.png" alt="image-20221007232323171"></p>
<h3 id="页的上层结构" tabindex="-1"><a class="header-anchor" href="#页的上层结构" aria-hidden="true">#</a> 页的上层结构</h3>
<p><img src="http://www.iocaop.com/images/2022-10/202210072334691.png" alt="image-20221007233441622"></p>
<p>区：比页大一级，一个曲一般有64个连续的页，一个区的大小是16kb*64=1MB</p>
<p>段：由一个区或多个区组成。区在文件系统中是一个连续分配的空间(InnoDB中是64个连续的页)，不过段在中不要求区是练习的。段是数据库中分配的基本单位，不同类型的数据库对象以不同的段形式存在。比如创建数据表、索引的时候会创建对应的段，比如创建一个表时会创建一个表段，创建一个所以时会创建一个索引段。</p>
<p>表空间：系统表空间(5.5.7-5.6.6默认所有表数据都存在这里)，对应的文件是/var/lib/mysql/ibdata1。独立表空间则是ibd文件。还有用户表空间、撤销表空间等等。</p>
<h2 id="p122-页结构之文件头部和文件尾部" tabindex="-1"><a class="header-anchor" href="#p122-页结构之文件头部和文件尾部" aria-hidden="true">#</a> p122-页结构之文件头部和文件尾部</h2>
<h3 id="页的内部结构" tabindex="-1"><a class="header-anchor" href="#页的内部结构" aria-hidden="true">#</a> 页的内部结构</h3>
<p>按照类型划分，常见的页有：数据页、系统页、Undo页、事务数据页等。数据页(B+树的节点)是最常用的页。</p>
<p>数据页的大小16kb被划分为七个部分：文件头、页头、最大记录、最小记录、用户记录、空闲空间、页目录、文件尾。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210080049315.png" alt="image-20221008004907261"></p>
<p>各个部分的作用：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210080049641.png" alt="image-20221008004955574"></p>
<p>分为三部分来学：</p>
<ol>
<li>文件头部和文件尾部
<ul>
<li>文件头部(38B)：包含了很多变量
<ul>
<li>FIL_PAGE_OFFSET(4B)：页号</li>
<li>FIL_PAGE_TYPE(2B)：当前页的类型，如FIL_PAGE_INDEX表示索引页(数据页)</li>
<li>FIL_PAGE_PREV(4B)和FIL_PAGE_NEXT(4B)：页之间是双向链表连接的，这是前置节点指针和后置节点指针。</li>
<li>FIL_PAGE_SPECE_OR_CHKSUM(4B)：校验和，可用于比较两个页是否相同：我们学过哈希，有这样一直思想，比较两个长的数据，可以先做hash得到一个&quot;短的值&quot;，在通过比较&quot;短的值&quot;来确定这两个数据是不是相同。校验和也是如此。这个校验和有什么用？保证页的完整性，数据库是以页为单位。在刷盘(内存数据刷到磁盘)过程中，数据更新的话，假设原来的校验和为123，那原来文件头和文件尾都会是123，刷的时候，会重新计算一下校验和，数据变了，校验和也会变，假设变成了321，那刷完就能知道，在刷盘过程中是否宕机。如果没有宕机。这页的校验和都会是321，宕机的话文件头的校验和是321，文件尾就是保持原来的123，则需要恢复，后面讲解redolog、undolog。</li>
<li>FIL_PAGE_LSN(8B)：页面被最后修改时对应的日志序列位置。</li>
</ul>
</li>
<li>文件尾部(8B)
<ul>
<li>前4B：校验和</li>
<li>后4B：LSN 也是用来校验页面完整性的。比较文件头和文件尾是否一致。</li>
</ul>
</li>
</ul>
</li>
</ol>
</div></template>


