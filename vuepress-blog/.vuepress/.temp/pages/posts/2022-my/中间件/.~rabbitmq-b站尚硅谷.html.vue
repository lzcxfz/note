<template><div><p>B站教程地址：<a href='https://www.bilibili.com/video/BV1cb4y1o7zz?p=1&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a></p>
<h2 id="p2-什么是mq" tabindex="-1"><a class="header-anchor" href="#p2-什么是mq" aria-hidden="true">#</a> p2-什么是mq</h2>
<p>消息队列，本质是个队列，FIFO先进先出。队列中存放的是message，在操作系统中，是一种跨进程通信机制，用于上下游传递信息。在互联网架构中，是非常常见的上下游&quot;逻辑解耦+物理解耦&quot;的消息通信服务。使用了MQ以后，服务之间消息发送只需要依赖MQ不需要依赖其他服务。</p>
<h2 id="p3-流量削锋" tabindex="-1"><a class="header-anchor" href="#p3-流量削锋" aria-hidden="true">#</a> p3-流量削锋</h2>
<p><img src="http://www.iocaop.com/images/2022-08/202208182321556.png" alt="流量削锋"></p>
<blockquote>
<p>订单系统只能达到每秒1w次访问，为了提高并发且不宕机，采用mq进行削锋，用户先访问mq(mq并发比订单系统高，且mq是集群的)，mq存储用户下单信息在队列中。因为队列时有序的，可以保证有序性。订单系统再消费消息，为用户下单。缺点：下单有延迟。</p>
</blockquote>
<h2 id="p4-应用解耦" tabindex="-1"><a class="header-anchor" href="#p4-应用解耦" aria-hidden="true">#</a> p4-应用解耦</h2>
<p><img src="http://www.iocaop.com/images/2022-08/202208182321965.png" alt="应用解耦"></p>
<blockquote>
<p>用户下单后，订单系统直接调用支付、库存、物流等系统，如果被调用的服务其中一个出错或宕机，都会造成下单异常(需要服务恢复，用户重新下单，损失巨大)。</p>
</blockquote>
<blockquote>
<p>使用mq调用子系统，给子系统发送消息，子系统需要消费消息，计算用户下单期间，某个子系统宕机，也不会影响订单系统，等子系统恢复后，消费消息，做对应的处理即可。</p>
</blockquote>
<h2 id="p5-异步处理" tabindex="-1"><a class="header-anchor" href="#p5-异步处理" aria-hidden="true">#</a> p5-异步处理</h2>
<p><img src="http://www.iocaop.com/images/2022-08/202208182321598.png" alt="异步处理"></p>
<blockquote>
<p>有些服务的调用必须是异步的，比如A调用B需要花费很长的时间才执行完，但是A需要指定B什么时候可以执行完成。以前的实现方式是A每隔一段时间询问B是否完成，结果是什么？所以需要回调，这样并不优雅。使用MQ可以优雅的解决这个问题，如图所示，用户体验也会更好。</p>
</blockquote>
<h2 id="p6-mq的分类" tabindex="-1"><a class="header-anchor" href="#p6-mq的分类" aria-hidden="true">#</a> p6-MQ的分类</h2>
<ul>
<li>
<p>ActiveMQ</p>
<p>优点：单机吞吐量是<strong>万</strong>级别的，时效性ms级别，可用性高，基于主从架构实现高可用性，消息可靠，较低的概率丢失数据。</p>
<p>缺点：维护越来越少，高吞吐量场景较少。</p>
</li>
<li>
<p>kafka</p>
<p>优点：吞吐量高，单机写入TPS<strong>百万</strong>/秒。时效性ms级别，kafka是分布式的，一个数据多个副本，防止少数机器宕机丢失数据。消费者采用pull方式获取消息，消息有序，通过控制能保证所有消息被消费者消费且仅被消费一次。<strong>在日志领域比较成熟</strong>，在大数据领域的实时计算和<strong>日志采集</strong>被大规模使用。有优秀的第三方web管理页面kafka-manager。</p>
<p>缺点：单机超过64个队列/分区。Load会发生明显的cpu飙高现象，队列越多，load越高，发送消息响应时间边长，使用<strong>短轮询</strong>方式，实时性取决于轮询间隔时间，消费失败<strong>不支持重试</strong>(消息可能会丢失)，支持消息顺序，但是一台代理宕机后，会<strong>产生消息乱序</strong>。<strong>社区更新较慢</strong>。</p>
</li>
<li>
<p>RocketMQ</p>
<p>阿里开源，java实现，参考了kafka做出改进，被阿里广泛用于订单、交易、充值、流计算、消息推送、日志流失处理、binglog分发等。</p>
<p>优点：单机吞吐量<strong>十万</strong>级别，可用性非常高，分布式架构，<strong>消息可以做到0丢失</strong>，</p>
<p>MQ功能完善，分布式、扩展性好，<strong>支持10亿级别的消息堆积</strong>，<strong>不会因为堆积导致性能下降</strong>，Java源码，可定制。</p>
<p>缺点：支持的客户端语言较少，目前是Java和c++，c++不成熟。没有再MQ核心中实现JMS等接口，有些系统要迁移需要修改大量代码。</p>
</li>
<li>
<p>RabbitMQ</p>
<p>AMQP(高级消息队列协议)基础上完成，可复用的企业消息系统，是当前<strong>最主流的消息中间件之一</strong>。</p>
<p>优点：erlang语言编写（<strong>高并发</strong>特性），吞吐量<strong>万</strong>级别。MQ功能完善、健壮、稳定、易用、跨平台、<strong>支持多种语言</strong>。开源提供的管理界面很好、好用，<strong>社区活跃度高、更新频率高</strong></p>
<p>缺点：商业版收费、学习成本高。</p>
</li>
</ul>
<h2 id="p7-mq的选择" tabindex="-1"><a class="header-anchor" href="#p7-mq的选择" aria-hidden="true">#</a> p7-MQ的选择</h2>
<ul>
<li>
<p>kafka特点：pull模式处理消息消费，追求高吞吐量，一开始的目的就是用于日志手机和传输。适合<strong>产生大量数据</strong>的互联网服务的数据收集业务。<strong>大型公司，有日志采集功能</strong>，首选kafka。</p>
</li>
<li>
<p>RocketMQ</p>
<p>为<strong>金融互联网</strong>领域而生，对于可靠性要求高，尤其是电商里面的订单扣款、业务削峰、大量交易涌入是后端无法及时处理的情况。RocketMQ在稳定性上值得信赖，因为阿里已经经过多次双十一的考验。</p>
</li>
<li>
<p>RabbitMQ</p>
<p>结合erlang语言本身<strong>并发优势</strong>，<strong>性能时效微秒级别</strong>，<strong>社区活跃度高</strong>，管理界面方便，如果<strong>数据量没有那么大</strong>的<strong>中小型公司</strong>优先选择比较完备的RabbitMQ。</p>
</li>
</ul>
<h2 id="p8-核心概念" tabindex="-1"><a class="header-anchor" href="#p8-核心概念" aria-hidden="true">#</a> p8-核心概念</h2>
<ul>
<li>
<p>RabbitMQ概念</p>
<p>消息中间件，接受、存储和转发消息。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182321501.png" alt="RabbitMQ概念"></p>
<p>一个队列只能对应一个消费者吗？不是，可以对应多个消费者，但是消息只能被消费一次，只会有一个消费者收到消息。</p>
</li>
</ul>
<h2 id="p9-原理名词解释" tabindex="-1"><a class="header-anchor" href="#p9-原理名词解释" aria-hidden="true">#</a> p9-原理名词解释</h2>
<ul>
<li>
<p>模式</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182322452.png" alt="Rabbit的模式"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182322226.png" alt="工作原理图"></p>
<p>Broker：接受和分发消息的应用</p>
<p>Channel：信道，可以理解为：发消息的通道</p>
<p>Virtual host：出于多租户(broker可以有多个vhost)和安全因素设计，把AMQP的基本组件划分到一个虚拟的分组中，类似网络中的namespace概念，当多个不同的用户使用同一个RabbitMQ server提供服务时，可以划分出多个vhost，每个用户在自己的vhost创建exchange/queue等</p>
<p>Connection：publisher(生产者)、consumer(消费者)和broker(接受和分发消息应用)之间的的TCP连接</p>
<p>Channel：如果每一次访问，RabbitMQ都建立一次Connection，会在消息量大的时候建立很多TCP连接，开销巨大，效率低。Channel是在Connection内部建立逻辑连接，如果应用程序支持多线程，通常<strong>每个thread创建单独的channel进行通讯</strong>，AMQP method包含了<strong>channel id</strong> 帮助客户端和message broker识别channel，所以channel之间是完全隔离的。<strong>Channel作为轻量级的Connection极大减少了操作系统建立TCP连接的开销。</strong></p>
<p>Exchange：message到达broker的第一站，根据分发规则，匹配查询表中的routing key，分到消息到queue中去。常用类型有：direct,topic,fanout</p>
<p>Queue:消息存储的队列，存储消息等待consume取走</p>
<p>Binding：exchange和queue之间的虚拟连接，binding可以包含routing key，Binding信息被保存到exchange的查询表中，用于分发message。</p>
</li>
</ul>
<h2 id="p10-安装" tabindex="-1"><a class="header-anchor" href="#p10-安装" aria-hidden="true">#</a> p10-安装</h2>
<p><a href='https://rabbitmq.com/download.html'>官方网站</a></p>
<p><a href='https://blog.csdn.net/weixin_53621681/article/details/123232251'>安装参考文章</a></p>
<p>高版本mq不支持centos7，所以下载低版本的包：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182322044.png" alt="centos支持的mq"></p>
<p>然后:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装erlang</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> erlang-23.3.4.11-1.el7.x86_64.rpm
<span class="token comment"># 安装socat</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> socat-1.7.3.2-5.el7.lux.x86_64.rpm
<span class="token comment"># 安装rabbitmq-server</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> rabbitmq-server-3.9.12-1.noarch.rpm

<span class="token comment"># 开启管理界面</span>
rabbitmq-plugins <span class="token builtin class-name">enable</span> rabbitmq_management
<span class="token comment"># 启动服务</span>
<span class="token function">service</span> rabbitmq-server start 
<span class="token comment"># 服务状态</span>
<span class="token function">service</span> rabbitmq-server status 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后访问：15672端口，如果无法访问，检查防火墙(systemctl status firewalld)或者端口是否开放</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182322976.png" alt="mq管理界面"></p>
<p>提示只能在localhost登录。权限有问题。</p>
<h2 id="p12-添加用户并设置权限" tabindex="-1"><a class="header-anchor" href="#p12-添加用户并设置权限" aria-hidden="true">#</a> p12-添加用户并设置权限</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建账号 用户名 密码 自定义</span>
rabbitmqctl add_user lzc <span class="token number">911823</span>
<span class="token comment"># 设置用户角色为超级管理员</span>
rabbitmqctl set_user_tags lzc administrator
<span class="token comment"># 设置用户权限 set_permissions [-p &lt;vhostpath>] &lt;user> &lt;conf> &lt;write> &lt;read> 配置vhost、读写权限</span>
rabbitmqctl set_permissions <span class="token parameter variable">-p</span> <span class="token string">"/"</span> lzc <span class="token string">".*"</span> <span class="token string">".*"</span> <span class="token string">".*"</span>
<span class="token comment"># 查看当前用户和角色</span>
rabbitmqctl list_users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完后可以登录了，并且可以看到刚才配置的结果：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182322572.png" alt="配置结果"></p>
<h2 id="p13-创建java开发环境" tabindex="-1"><a class="header-anchor" href="#p13-创建java开发环境" aria-hidden="true">#</a> p13-创建Java开发环境</h2>
<p><a href='https://rabbitmq.com/tutorials/tutorial-one-java.html'>官方文档</a></p>
<p>创建项目后，导入maven插件:<a href='https://blog.csdn.net/Java_1710/article/details/120992614'>为什么要导入？</a></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.maven.plugins<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>maven-compiler-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">></span></span>11<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>target</span><span class="token punctuation">></span></span>11<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>target</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--rabbitmq客户端--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.rabbitmq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>amqp-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.14.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--文件操作流--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>commons-io<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-io<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.11.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p14-简单模式生产者发送消息" tabindex="-1"><a class="header-anchor" href="#p14-简单模式生产者发送消息" aria-hidden="true">#</a> p14-简单模式生产者发送消息</h2>
<p>本例子用简单模式(HelloWorld模式)：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182323892.png" alt="(P) -&gt; [|||] -&gt; (C)"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 队列名称
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_NAME</span> <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>

        <span class="token class-name">ConnectionFactory</span> connectionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span><span class="token string">"www.iocaop.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token number">5672</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"911823"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建连接</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> connectionFactory<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

         <span class="token comment">// 从原理图中可以看出，rabbitmq中，建立connection是建立了TCP连接，</span>
        <span class="token comment">// 并不是发消息的，而是在连接中创建多个信道channel来发消息。</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 调用信道，声明队列</span>
        <span class="token doc-comment comment">/**
         * 参数1：队列名称
         * 参数2：是否持久化 默认存储在内存中
         * 参数3: 是否进行消息的共享(多个队列消费)，默认是false，不共享
         * 参数4： 是否自动删除
         * 参数5： 额外的参数，可以为空
         */</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 准备消息的内容，发送消息</span>
        <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"Hello RabbitMQ"</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/**
         * 参数1：交换机名称，本例为helloworld模式，不需要交换机
         * 参数2：路由key，本次是队列名称
         * 参数3：其他参数
         * 参数4：消息内容
         */</span>
        channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span>message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发送消息："</span><span class="token operator">+</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发送后到web管理界面可以看到该条消息：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182323893.png" alt="查看消息"></p>
<h2 id="p15-简单模式消费者消费消息" tabindex="-1"><a class="header-anchor" href="#p15-简单模式消费者消费消息" aria-hidden="true">#</a> p15-简单模式消费者消费消息</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 队列名称
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_NAME</span> <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">ConnectionFactory</span> connectionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token number">5672</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span><span class="token string">"www.iocaop.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"911823"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建连接</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> connectionFactory<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 从原理图可以看出，消费消息依然是要建立连接，建立信道，然后消费消息。</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/**
         *参数1：队列名称
         * 参数2：是否自动签收
         * 参数3：消费者消费失败的回调..如果消费失败，会调用此方法，可以在此方法中进行重新消费
         * 参数4：消费者取消消费的回调
         */</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 没搞懂官方的解释，但消费者消费消息时，会调用这个方法</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者消费:"</span><span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>cancellationSignal<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者取消消费"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182323765.png" alt="消费消息"></p>
<h2 id="p16-work-queues-工作队列模式解释" tabindex="-1"><a class="header-anchor" href="#p16-work-queues-工作队列模式解释" aria-hidden="true">#</a> p16-Work Queues 工作队列模式解释</h2>
<p>工作队列主要思想：避免立即执行资源密集型任务，而长时间等待。先将任务封装成消息，发送到队列，再多个线程消费消息(一个线程无法短时间处理)，一起处理这些任务。</p>
<blockquote>
<p>需要遵循的原则：每条消息只能被消费一次，否则，工作内容会重复。工作线程之间的关系，是竞争关系，挨个消费消息(轮询分发消息)。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2022-08/202208182323369.png" alt="工作队列模式"></p>
<h2 id="p17-抽取连接工厂工具类" tabindex="-1"><a class="header-anchor" href="#p17-抽取连接工厂工具类" aria-hidden="true">#</a> p17-抽取连接工厂工具类</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * MQ连接工具类-连接工厂创建信道
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/07/29
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMqUtils</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Channel</span> <span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">ConnectionFactory</span> connectionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token number">5672</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span><span class="token string">"www.iocaop.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"911823"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建连接</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> connectionFactory<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 从原理图可以看出，消费消息依然是要建立连接，建立信道，然后消费消息。</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> channel<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p18-工作队列模式-创建工作线程-消费者" tabindex="-1"><a class="header-anchor" href="#p18-工作队列模式-创建工作线程-消费者" aria-hidden="true">#</a> p18-工作队列模式-创建工作线程(消费者)</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 这是一个工作线程(消费者)
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/07/29
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Work01</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 队列名称
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_NAME</span> <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> message<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者消费:"</span><span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> cancellationSignal<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者取消消费"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p19-工作队列模式-启动多个工作线程-消费者" tabindex="-1"><a class="header-anchor" href="#p19-工作队列模式-启动多个工作线程-消费者" aria-hidden="true">#</a> p19-工作队列模式-启动多个工作线程(消费者)</h2>
<p>idea是可以同一个类，启动多个线程的。<a href='https://blog.csdn.net/qq2942713658/article/details/124064751'>设置方法</a></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182323476.png" alt="工作线程1"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182323409.png" alt="工作线程2"></p>
<h2 id="p20-工作队列模式-生产者发送消息" tabindex="-1"><a class="header-anchor" href="#p20-工作队列模式-生产者发送消息" aria-hidden="true">#</a> p20-工作队列模式-生产者发送消息</h2>
<p>发送消息时，和简单模式是一样的。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 生产者-用来发送大量消息
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/07/29
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Task01</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 队列名称
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_NAME</span> <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 写一个循环发送消息</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 发送消息 和简单模式一样的发送消息</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发送消息:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182324217.png" alt="生产者发送大量消息"></p>
<h2 id="p21-工作队列模式-工作线程消费情况" tabindex="-1"><a class="header-anchor" href="#p21-工作队列模式-工作线程消费情况" aria-hidden="true">#</a> p21-工作队列模式-工作线程消费情况</h2>
<p><img src="http://www.iocaop.com/images/2022-08/202208182324042.png" alt="消费者1消费消息"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182324633.png" alt="消费者2消费消息"></p>
<p>可以看到，是轮询的，每个线程各消费一次，就算多再多工作线程(消费者)，也是轮询的，一个消费者消费一条消息，挨个轮着来消费。</p>
<p>此处有一个问题，当我们开启两个main方法后，打印线程的名字，可以看出来，线程池都是pool2，但是我们在同一个main方法执行两个不同的线程，打印的线程池名字又是不一样的：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325815.png" alt="image-20220809233731884"></p>
<p>为什么？因为开启两个main方法，是不同的进程，两个jvm虚拟机，刚好线程池名字重名了。这样比较也没有意义。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325821.png" alt="重名"></p>
<p>只有在同一个进程中，开启两个线程消费，打印了不同的线程池名，才能推测是不是每个channel使用一个线程池。目前来看是可以这样推测的，但是不一定，后期再研究。</p>
<p><a href= 'https://wenku.baidu.com/view/a3a1810f4b2fb4daa58da0116c175f0e7dd11976.html'>mq线程池设置</a></p>
<h2 id="p22-消息应答概念" tabindex="-1"><a class="header-anchor" href="#p22-消息应答概念" aria-hidden="true">#</a> p22-消息应答概念</h2>
<p>在工作队列模式下，如果有一个工作线程(消费者)突然卡住了或者挂了，导致任务没有完成，会发生什么？如果RabbitMQ在把消息发送给消费者后，会给该消息标记为已删除。然而消费者并没有完成任务，就挂了，就会丢失这条消息，后续也无法把这条消息再发送给消费者了。</p>
<blockquote>
<p>为了保证消息在发送过程中不会丢失。RabbitMQ引入了消息应答机制：消费者在收到消息并处理消息之后，告诉MQ已经处理了，可以删除消息了。</p>
</blockquote>
<p>这样一来，消费者再接受消息后，消息不会删除，而是等消费完消息，把任务处理完了，再告诉MQ，可以删除消息了。如果在处理中挂了，也没关系，因为MQ不会删除消息，等恢复后，还能继续消费这条消息。</p>
<p><strong>自动应答机制</strong></p>
<p>在消费者接收到消息之后，自动告诉MQ，可以删除消息了。这样一来，可能会出现问题：在接受消息后，MQ把消息删除了，消费者还有后续代码没有执行完成，那么后续代码出问题了，消息也无法再消费了(丢失了)，达不到预期结果了。如图所示：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325603.png" alt="自动应答"></p>
<p>在执行channel.basicConsume这行代码以后，消息就被MQ删除了，但是后续代码可能还是会出现问题。</p>
<p>自动应答在企业，一般不会采取。</p>
<p><strong>消息应答的方法</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>     channel<span class="token punctuation">.</span><span class="token function">basicAck</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 用于肯定确认</span>
	 channel<span class="token punctuation">.</span><span class="token function">basicNack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 用于否定确认</span>
	 channel<span class="token punctuation">.</span><span class="token function">basicReject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 用于否定确认</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>basicNack比basicReject少一个参数：是否批量处理。</p>
<p>批量应答表示，如果当前有5、6、7、8四条消息未应答，批量则一次性应答这4条消息，不批量应答则应答当前这条消息。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325784.png" alt="批量应答"></p>
<p>虽然批量应答可以减少网络压力，速度快，但是会有消息丢失的可能。建议不批量应答。</p>
<h2 id="p23-消息自动重新入队" tabindex="-1"><a class="header-anchor" href="#p23-消息自动重新入队" aria-hidden="true">#</a> p23-消息自动重新入队</h2>
<p>如果消费者由于某种原因，失去连接(信道关闭或TCP丢失)，导致消息没有ACK确认。RabbitMQ将了解到消息未处理，会重新把消息放到队列，给其他消费者使用。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325130.png" alt="消息重新入队图示"></p>
<p>c1未成功消费消息1，消息1重新入队，给c2消费了。消息1并未丢失。</p>
<h2 id="p24-消息手动应答" tabindex="-1"><a class="header-anchor" href="#p24-消息手动应答" aria-hidden="true">#</a> p24-消息手动应答</h2>
<p>我们在之前消费消息的时候都是自动应答，现在需要改成手动应答：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325253.png" alt="手动应答"></p>
<p>改完后，在执行channel.basicConsume这行代码以后，就不会告诉MQ消息可以删除了。而需要在工作任务代码之后加上ack，告知mq，消息签收了。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325703.png" alt="消息手动签收"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// message.getEnvelope().getDeliveryTag() 是告诉MQ，哪条消息签收了</span>
channel<span class="token punctuation">.</span><span class="token function">basicAck</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getEnvelope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeliveryTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p25-消息手动应答-生产者" tabindex="-1"><a class="header-anchor" href="#p25-消息手动应答-生产者" aria-hidden="true">#</a> p25-消息手动应答-生产者</h2>
<p>手动签收主要修改是在消费者，和生成者关系不大，所以生产者代码没什么变化。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 消费消息在手动应答时不丢失，会放回队列重新消费
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/07/29
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Task2</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_NAME</span><span class="token operator">=</span> <span class="token string">"ack_queue"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 写一个循环发送消息</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发送消息:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p23-消息手动应答-消费者" tabindex="-1"><a class="header-anchor" href="#p23-消息手动应答-消费者" aria-hidden="true">#</a> p23-消息手动应答-消费者</h2>
<p>写两个消费者(睡眠时间不一样)，在业务代码里面睡眠不一样的时间，表示一个消费快，一个消费慢。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 消费者
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/07/29
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Work2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_NAME</span><span class="token operator">=</span> <span class="token string">"ack_queue"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"C1等待接受消息..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 消费消息时，需要注意采用手动签收模式，不然会丢失消息</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> message<span class="token punctuation">)</span> <span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 睡眠1秒，表示这是消费快的线程</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">toMillis</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者接收到消息:"</span><span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token doc-comment comment">/**
             * 参数1 消息的标识
             * 参数2 是否批量签收
             */</span>
            channel<span class="token punctuation">.</span><span class="token function">basicAck</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getEnvelope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeliveryTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> cancellationSignal<span class="token punctuation">)</span> <span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者取消消费"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p27-消息手动应答-运行验证结果" tabindex="-1"><a class="header-anchor" href="#p27-消息手动应答-运行验证结果" aria-hidden="true">#</a> p27-消息手动应答-运行验证结果</h2>
<p>生产者：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325925.png" alt="生产者"></p>
<p>消费者C1：接受消息后，睡眠1秒再签收</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325352.png" alt="消费者C1"></p>
<p>消费者C2：接受消息后，睡眠30秒再签收</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325263.png" alt="消费者C2"></p>
<p>第一次（过去了大概几分钟，正常消费）：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325000.png" alt="C1正常消费"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325950.png" alt="C2正常消费"></p>
<p>第二次：生产者重新发送同样的消息，C2有睡眠，过几秒，等C1消费完，我们到MQ管理界面查看队列信息，可以看到有消息没有消费完，显示未签收：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325452.png" alt="管理界面查看队列信息"></p>
<p>这时我们再把C2停止，到C1查看：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325252.png" alt="查看C1消费状态"></p>
<p>由于是公平分发的，C1消费的都是双数的，C2消费的都是单数的。但是C2被我停止了，单数的消息又重新放回队列了(因为C2一旦接受到消息，消息会进入到unacked状态，但是没有被手动签收，C2的channel又被关闭了，消息就会被放回队列)，并且被C1消费了。</p>
<h2 id="p28-队列持久化" tabindex="-1"><a class="header-anchor" href="#p28-队列持久化" aria-hidden="true">#</a> p28-队列持久化</h2>
<p>在保证了消息不丢失的前提下，我们需要对RabbitMQ的队列和消息进行持久化，RabbitMQ退出或服务停止后，<strong>默认</strong>队列和消息是会<strong>丢失</strong>的。为了确保不丢失，我们<strong>需要将队列和消息标记为持久化。</strong></p>
<ul>
<li>
<p>队列如何实现持久化？</p>
<p>之前创建的队列都是非持久化的，mq重启，会被删除，如果需要持久化，需要在声明队列的时候把durable参数设置为持久化。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325405.png" alt="声明队列时设置持久化"></p>
<p>需要注意的是，如果队列已经存在，本来是非持久化的，现在改为持久化，会报错，需要删除队列重新创建(声明)。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325745.png" alt="需要删除重新声明队列"></p>
<p>删除之前看一眼队列信息：</p>
<p><img src="http://www.iocaop.com/images/2022-08/jfstHxq9rvnyk2L.png" alt="队列信息"></p>
<p>删除ack_queue队列，并且声明时设置持久化为true，再重新创建，到管理页面查看(多了 一个标识D，durable持久化的)：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182325408.png" alt="持久化的队列"></p>
</li>
</ul>
<h2 id="p29-消息持久化" tabindex="-1"><a class="header-anchor" href="#p29-消息持久化" aria-hidden="true">#</a> p29-消息持久化</h2>
<p>首先要明白，队列持久化，只是持久化了队列，MQ重启后，队列没有丢失，<strong>队列里的消息会丢失</strong>(至于为什么，现在先不纠结)。所以，要想消息不丢失，除了队列持久化、消息也要持久化。</p>
<p>我们在发消息的时候，需要通知队列中的消息是需要持久化的。</p>
<p>想要消息也持久化，需要修改代码，在发布消息的时候，设置消息持久化：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_TEXT_PLAIN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182325729.png" alt="发布消息设置消息持久化"></p>
<p>尽管设置了消息持久化，也是有可能丢失的：在消息刚准备存储到磁盘的时候，还没存完，消息还在缓存的一个间隔点。消息也会丢失。持久性保证并不强，但是对于简单任务队列已经够了。想要更强有力的持久化策略，需要<strong>确认发布机制</strong>来保障(后续章节)。</p>
<h2 id="p30-不公平分发" tabindex="-1"><a class="header-anchor" href="#p30-不公平分发" aria-hidden="true">#</a> p30-不公平分发</h2>
<p>默认情况RabbitMQ采用轮询分发(公平)，某些场景不是很好，因为消费者处理任务的速度有快有慢(MQ并不知道)，轮询分发会使处理任务快的线程长时间空闲，很浪费。</p>
<p>如何设置不公平分发？</p>
<p>在消费者这接受消息之前，需要设置basicQos为1。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326720.png" alt="不公平分发图示"></p>
<p>我们在验证手动签收的例子(C1睡眠1秒，C2睡眠30秒)上验证：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326793.png" alt="C1设置不公平分发"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326884.png" alt="C2设置不公平分发"></p>
<p>运行：</p>
<p>因为C1处理任务快，C1消费了较多消息，而C2处理慢，只消费了一条消息，不公平分发设置成功：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326685.png" alt="C1消费情况"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326464.png" alt="C2消费情况"></p>
<h2 id="p31-预取值" tabindex="-1"><a class="header-anchor" href="#p31-预取值" aria-hidden="true">#</a> p31-预取值</h2>
<ul>
<li>
<p>公平分发，一个消费者一条，轮询分发。</p>
</li>
<li>
<p>不公平分发，按消费者处理任务的速度分。</p>
</li>
<li>
<p>预取值：指定消费者消费多少条消息。(如果队列只有7条，nameC1消费2条，C2消费5条，如果队列不止7条，后面的会按不公平分发的方式消费)</p>
<p><img src="http://www.iocaop.com/images/2022-08/18HO9bEsguqjyUv.png" alt="预取值图示"></p>
</li>
</ul>
<p>预取值设定的好，可以使传送速率最佳、效率最高等。</p>
<p>还是刚才的设置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> channel<span class="token punctuation">.</span><span class="token function">basicQos</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 设置为1表示不公平分发，设置其他值表示预取值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改代码：</p>
<p>将C1预取值设置为4、C2为15，再重新发19条消息。</p>
<p>效果：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326925.png" alt="C1消费了4条消息"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326098.png" alt="C2消息迟迟没有被签收"></p>
<p>可以看到。C1虽然处理任务快，但是设置了预取值为4，及时C2消费慢，依然不会把剩下的消息给C1来消费，要保证C2拿到15条消息。</p>
<p>在C1拿到4条消息之前，一般是轮询分发的(不一定，因为消息是先堆积在channel的)，后面就都给了C2。</p>
<p>当C2接受到15条后，等他签收几条，我们再发19条，MQ会继续保持预取值，先把C2信道中填满15条，再不公平分。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326821.png" alt="再发消息，会先保证预取值"></p>
<h2 id="p32-发布确认原理" tabindex="-1"><a class="header-anchor" href="#p32-发布确认原理" aria-hidden="true">#</a> p32-发布确认原理</h2>
<p>学完队列持久化和消息持久化以后我们知道，要保证消息不丢失，需要声明队列和发送消息时标记队列持久化和消息持久化，但是消息真正保存到磁盘上是需要时间的，如果消息还没来得及保存到磁盘上MQ就宕机了，消息也会丢失，所以我们在保存到磁盘后，MQ再给生产者发送消息，告诉生产者消息已经保存到磁盘上了，就叫做发布确认。发布确认以后，就能肯定消息不会丢失。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326243.png" alt="发布确认"></p>
<p>我们需要在队列声明之前，设置开启发布确认：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>channel<span class="token punctuation">.</span><span class="token function">confirmSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 开启发布确认</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>确认发布又分三种：单个确认发布、批量确认发布、异步确认发布</p>
<h2 id="p33-单个确认发布" tabindex="-1"><a class="header-anchor" href="#p33-单个确认发布" aria-hidden="true">#</a> p33-单个确认发布</h2>
<p>同步确认的方式，发布一个消息之后，只有这个消息确认发布以后，才会进行后续消息的发布。缺点是发布速度慢，每发一条，都要等待这条发布确认后，才进行后续发布。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 单个发布确认
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sendMessage1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 开启发布确认</span>
        channel<span class="token punctuation">.</span><span class="token function">confirmSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 随机队列名称</span>
        <span class="token class-name">String</span> queueName <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 记录开始时间</span>
        <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 发布消息</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queueName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">""</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 等候确认</span>
            <span class="token keyword">boolean</span> b <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">waitForConfirms</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布成功"</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>queueName<span class="token operator">+</span><span class="token string">"：单个发布确认1000条成功，发布耗时："</span> <span class="token operator">+</span> <span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"ms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326735.png" alt="单个发布确认耗时"></p>
<p>如果我们注释掉发布确认的代码运行，耗时减少了很多，可以看出，单个发布确认耗时比较长：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326814.png" alt="不开启单个发布确认"></p>
<h2 id="p34-批量发布确认" tabindex="-1"><a class="header-anchor" href="#p34-批量发布确认" aria-hidden="true">#</a> p34-批量发布确认</h2>
<p>先批量发布一批消息，然后一起确认、可以<strong>提高吞吐量</strong>。缺点：当发生故障时，无法确认是哪条消息出问题了。</p>
<p>手动在循环里面判断，每100条确认一次：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 批量发布确认
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sendMessage2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 开启发布确认</span>
        channel<span class="token punctuation">.</span><span class="token function">confirmSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 随机队列名称</span>
        <span class="token class-name">String</span> queueName <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 记录开始时间</span>
        <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 发布消息</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queueName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">""</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 等候确认 每100条确认一次</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i<span class="token operator">%</span><span class="token number">100</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">boolean</span> b <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">waitForConfirms</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布成功"</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>queueName<span class="token operator">+</span><span class="token string">"：每100条批量发布确认1000条成功，发布耗时："</span> <span class="token operator">+</span> <span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"ms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326138.png" alt="每100条确认一次"></p>
<h2 id="p35-异步发布确认原理" tabindex="-1"><a class="header-anchor" href="#p35-异步发布确认原理" aria-hidden="true">#</a> p35-异步发布确认原理</h2>
<p>异步发布确认在编程上要比上面两个要复杂，但是无论可靠性还是效率都很好。利用回调函数来达到消息可靠性传递的，MQ通过函数回调来保证是否投递成功。</p>
<p>生产者在发送消息后，会有一个map存了消息的序号和消息内容，发送给MQ，MQ通过序号区分消息。MQ确认收到后，会回调ackCallback，告诉生产者已经收到消息了。未收到的也会通过回调nackCallBack，通知生产者未收到，再重发。而且回调是异步的。所以生产者只需要发就好了，确认有broker来完成。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326610.png" alt="异步确认原理"></p>
<h2 id="p36-异步发布确认代码编写" tabindex="-1"><a class="header-anchor" href="#p36-异步发布确认代码编写" aria-hidden="true">#</a> p36-异步发布确认代码编写</h2>
<p>步骤：</p>
<ul>
<li>开始发布确认</li>
<li>创建监听器</li>
<li>发布消息</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 异步发布确认
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sendMessage3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 开启发布确认</span>
        channel<span class="token punctuation">.</span><span class="token function">confirmSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 随机队列名称</span>
        <span class="token class-name">String</span> queueName <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 准备消息监听器，监听消息发布</span>

        channel<span class="token punctuation">.</span><span class="token function">addConfirmListener</span><span class="token punctuation">(</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">,</span>multiple<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 监听成功的消息</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布成功，编号"</span><span class="token operator">+</span>deliveryTag<span class="token operator">+</span><span class="token string">"，是否批量："</span><span class="token operator">+</span>multiple<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">,</span>multiple<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 监听失败的消息</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布失败，编号"</span><span class="token operator">+</span>deliveryTag<span class="token operator">+</span><span class="token string">"，是否批量："</span><span class="token operator">+</span>multiple<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 记录开始时间</span>
        <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 发布消息</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queueName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">""</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
        <span class="token keyword">long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"异步发布确认1000条成功，发布耗时："</span> <span class="token operator">+</span> <span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"ms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182326631.png" alt="监听器"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326249.png" alt="回调函数"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182326478.png" alt="运行结果"></p>
<h2 id="p37-如何处理异步发布确认中未确认的消息" tabindex="-1"><a class="header-anchor" href="#p37-如何处理异步发布确认中未确认的消息" aria-hidden="true">#</a> p37-如何处理异步发布确认中未确认的消息</h2>
<p>最好的解决方案就是把未确认的消息放到一个基于内存的，能被发布线程访问的队列。比如ConcurrentLinkedQueue，这个队列在confirm callbacks与发布线程之间进行消息传递。</p>
<p>发布线程和回调函数的监听线程，是两个线程。所以只能使用并发链式队列，可以在发布和监听线程之间数据传递。</p>
<p><strong>ConcurrentSkipListMap</strong>：线程安全有序的哈希表，适用于高并发情况。</p>
<ul>
<li>可以轻松将序号于消息关联 k-v</li>
<li>可以轻松批量删除</li>
<li>支持高并发</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 异步发布确认
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sendMessage3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 开启发布确认</span>
        channel<span class="token punctuation">.</span><span class="token function">confirmSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 随机队列名称</span>
        <span class="token class-name">String</span> queueName <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 准备消息监听器，监听消息发布</span>

        <span class="token class-name">ConcurrentSkipListMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentSkipListMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">addConfirmListener</span><span class="token punctuation">(</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">,</span>multiple<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 监听成功的消息</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布成功，编号"</span><span class="token operator">+</span>deliveryTag<span class="token operator">+</span><span class="token string">"，是否批量："</span><span class="token operator">+</span>multiple<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 先判断是否为批量，批量则批量删除，一般不会批量，不然会丢失消息</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>multiple<span class="token punctuation">)</span><span class="token punctuation">{</span>
              <span class="token comment">// 发布成功则删除键值对，剩下的就是失败的消息</span>
              <span class="token class-name">ConcurrentNavigableMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> headMap <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">headMap</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
              headMap<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token comment">// 不批量则直接删掉这一个键值对</span>
                map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">,</span>multiple<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 监听失败的消息</span>
            <span class="token class-name">String</span> message <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布失败，编号"</span><span class="token operator">+</span>deliveryTag<span class="token operator">+</span><span class="token string">"，消息为："</span><span class="token operator">+</span>message<span class="token operator">+</span><span class="token string">"，是否批量："</span><span class="token operator">+</span>multiple<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 记录开始时间</span>
        <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 发布消息</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 通过信道可以获取到下一次消息的编号</span>
            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>channel<span class="token punctuation">.</span><span class="token function">getNextPublishSeqNo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queueName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">""</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
        <span class="token keyword">long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"异步发布确认1000条成功，发布耗时："</span> <span class="token operator">+</span> <span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"ms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两种情况：</p>
<ul>
<li>批量确认，则需要通过deliveryTag获取到headMap，进行clear</li>
<li>不批量，则直接通过deliveryTag进行remove</li>
</ul>
<h2 id="p38-三种发布确认对比" tabindex="-1"><a class="header-anchor" href="#p38-三种发布确认对比" aria-hidden="true">#</a> p38-三种发布确认对比</h2>
<ul>
<li>
<p>单独发布消息：</p>
<p>同步等待确认，简单，但吞吐量有限</p>
</li>
<li>
<p>批量发布消息</p>
<p>批量同步等待确认，简单，需要合理的吞吐量，一旦出现问题很难判断是哪条消息出了问题</p>
</li>
<li>
<p>异步处理</p>
<p>最佳性能和资源利用，出错情况可以很好的控制，但是实现起来稍微难一些。</p>
</li>
</ul>
<h2 id="p39-交换机的作用" tabindex="-1"><a class="header-anchor" href="#p39-交换机的作用" aria-hidden="true">#</a> p39-交换机的作用</h2>
<p>之前不需要指定(空串)交换机是因为使用了默认交换机(AMQP default)</p>
<p>原来一个消息只能被一个消费者消费：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327255.png" alt="一个消息还能消费一次，简单模式"></p>
<p>如果想要一个消息被消费两次，就需要两个队列，各存一份消息：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327624.png" alt="一个消息可以被消费多次，发布订阅模式"></p>
<h2 id="p40-交换机的介绍" tabindex="-1"><a class="header-anchor" href="#p40-交换机的介绍" aria-hidden="true">#</a> p40-交换机的介绍</h2>
<p>RabbitMQ消息传递模型核心思想：<strong>生产者的消息不会直接发送到队列</strong>，通常生成者甚至都不知道这些消息传递到了哪些队列中。</p>
<p><strong>生成者只能将消息发送到交换机</strong>，交换机工作内容：接受生产者的消息，将消息推入队列。交换机要知道如何处理消息，就由交换机的类型类决定。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327231.png" alt="交换机图示"></p>
<ul>
<li>
<p>交换机的类型</p>
<p>直接(direct)、主题(topic)、标题(header)、扇出(fanout)</p>
</li>
<li>
<p>无名交换机</p>
<p>前面我们没有指定(空串)exchange，仍然可以发送消息到队列，因为我们使用了默认交换机(空串标识)。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queueName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">""</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>消息能路由发送到队列中其实是有routingkey绑定key的(如果存在的话)。</p>
</li>
<li>
<p>临时队列</p>
<p>一旦断开了消费者的连接，队列会被自动删除。(未持久化,名称随机)</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h2 id="p41-绑定" tabindex="-1"><a class="header-anchor" href="#p41-绑定" aria-hidden="true">#</a> p41-绑定</h2>
<p>一个交换机可以往不同的队列发送消息，所以要用routingKey做区分，想发给谁就发给谁。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327236.png" alt="绑定"></p>
<p>在管理页面手动绑定：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327613.png" alt="添加队列"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327557.png" alt="添加交换机"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327410.png" alt="绑定"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327530.png" alt="结果"></p>
<h2 id="p42-fanout模式" tabindex="-1"><a class="header-anchor" href="#p42-fanout模式" aria-hidden="true">#</a> p42-fanout模式</h2>
<p>广播模式，将接收到的所有消息<strong>广播</strong>到它知道（绑定）的所有队列中。系统中有默认的广播模式交换机(amq.fanout)。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327653.png" alt="广播模式图示"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327641.png" alt="管理界面查看绑定关系"></p>
<h2 id="p42-fanout模式生产者" tabindex="-1"><a class="header-anchor" href="#p42-fanout模式生产者" aria-hidden="true">#</a> p42-fanout模式生产者:</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 生产者
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/04
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmitLog</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_NAME</span> <span class="token operator">=</span> <span class="token string">"logs"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">"fanout"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 发布消息</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 广播模式不需要指定routingKey</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">""</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布成功"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p43-fanout模式消费者-2个一样的" tabindex="-1"><a class="header-anchor" href="#p43-fanout模式消费者-2个一样的" aria-hidden="true">#</a> p43-fanout模式消费者(2个一样的)</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 消费者1
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/04
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReceiveLogs1</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_NAME</span> <span class="token operator">=</span> <span class="token string">"logs"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">"fanout"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明临时队列 队列名随机，消费者断开连接后自动删除</span>
        <span class="token class-name">String</span> queueName <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 绑定交换机和队列 routingKey为空</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> <span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 消费消息</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> delivery<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token comment">// 接受消息回调</span>
            <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>delivery<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"01接受消息:"</span> <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> delivery<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token comment">// 取消消费回调</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"01取消消费:"</span> <span class="token operator">+</span> consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>启动时需要注意，先启动消费者，再启动生产者，因为是临时队列，消费者断开连接后队列会自动删除。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327160.png" alt="消费者1"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327581.png" alt="消费者2"></p>
<blockquote>
<p>可以看到两个消费者都消费了1000次，而生产者只发送了1000次消息。也就是说一个消费被消费了两次，因为是广播模式，消息会向绑定的队列中各发1000条。</p>
</blockquote>
<h2 id="p44-direct路由模式" tabindex="-1"><a class="header-anchor" href="#p44-direct路由模式" aria-hidden="true">#</a> p44-direct路由模式</h2>
<p>和fanout不同的是，routingKey是不同的。如果direct模式的routingKey，那么就和fanout几乎一样。</p>
<blockquote>
<p>fanout模式是一个生成者发消息，多个消费者接受(一个交换机往所有的绑定的队列发消息)。direct是指定的消费者接受(交换机往指定的队列(可以是多个)中发消息)。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327077.png" alt="路由模式图示"></p>
<p>举例：</p>
<p>生产者发消息：有三个routingKey分别为：info、warning 、error。都发往交换机(exchange)direct_logs再发送到不同的队列。</p>
<p>info、warning 绑定的队列为console，error绑定的队列为disk</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327771.png" alt="direct模式绑定"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 路由模式 生产者
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/08
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DirectLogs</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_NAME</span> <span class="token operator">=</span> <span class="token string">"direct_logs"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">confirmSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//kv对应 消息编号-消息内容</span>
        <span class="token class-name">ConcurrentSkipListMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentSkipListMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">long</span> infoNextPublishSeqNo <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">getNextPublishSeqNo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">"info"</span><span class="token punctuation">,</span> <span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_TEXT_PLAIN</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token string">"info:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>infoNextPublishSeqNo<span class="token punctuation">,</span> <span class="token string">"info:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发出info:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">long</span> errorNextPublishSeqNo <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">getNextPublishSeqNo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">"error"</span><span class="token punctuation">,</span> <span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_TEXT_PLAIN</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token string">"error: "</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>errorNextPublishSeqNo<span class="token punctuation">,</span> <span class="token string">"error: "</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发出error:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">long</span> warningNextPublishSeqNo <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">getNextPublishSeqNo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">"warning"</span><span class="token punctuation">,</span> <span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_TEXT_PLAIN</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token string">"warning:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>warningNextPublishSeqNo<span class="token punctuation">,</span> <span class="token string">"warning:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发出warning:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        channel<span class="token punctuation">.</span><span class="token function">addConfirmListener</span><span class="token punctuation">(</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">,</span> multiple<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布成功，deliveryTag:"</span> <span class="token operator">+</span> deliveryTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>multiple<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ConcurrentNavigableMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> headMap <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">headMap</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
                headMap<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> multiple<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布失败，deliveryTag:"</span> <span class="token operator">+</span> consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三个消费者：两个消费的是console队列，一个消费disk队列。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReceiveLogsDirect1</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_NAME</span> <span class="token operator">=</span> <span class="token string">"direct_logs"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token class-name">BuiltinExchangeType</span><span class="token punctuation">.</span><span class="token constant">DIRECT</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token string">"console"</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 绑定队列到交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token string">"console"</span><span class="token punctuation">,</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span><span class="token string">"info"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 消费</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token string">"console"</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 消费消息回调</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"console队列消费info消息："</span><span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 取消消费回调</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"取消消费:"</span><span class="token operator">+</span>consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReceiveLogsDirect2</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_NAME</span> <span class="token operator">=</span> <span class="token string">"direct_logs"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token class-name">BuiltinExchangeType</span><span class="token punctuation">.</span><span class="token constant">DIRECT</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token string">"console"</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 绑定队列到交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token string">"console"</span><span class="token punctuation">,</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span><span class="token string">"warning"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 消费</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token string">"console"</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 消费消息回调</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"console队列消费warning消息："</span><span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 取消消费回调</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"取消消费:"</span><span class="token operator">+</span>consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReceiveLogsDirect3</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_NAME</span> <span class="token operator">=</span> <span class="token string">"direct_logs"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token class-name">BuiltinExchangeType</span><span class="token punctuation">.</span><span class="token constant">DIRECT</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token string">"disk"</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 绑定队列到交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token string">"disk"</span><span class="token punctuation">,</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span><span class="token string">"error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 消费</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token string">"disk"</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 消费消息回调</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"error队列消费error消息："</span><span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 取消消费回调</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"取消消费:"</span><span class="token operator">+</span>consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：绑定了info和warning交换机的队列console收到了消息info和warning的消息。绑定了error的disk队列收到了error的消息。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327404.png" alt="console队列消费"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182327912.png" alt="disk队列消息消费"></p>
<blockquote>
<p>需要注意的是：direct模式，消费者可以根据不同的routingKey消费消息吗？还是说只能指定队列来消费？</p>
</blockquote>
<p>答：<a href='https://www.zhihu.com/question/51409120'>不可以</a></p>
<h2 id="p45-topic主题交换机" tabindex="-1"><a class="header-anchor" href="#p45-topic主题交换机" aria-hidden="true">#</a> p45-topic主题交换机</h2>
<p>对于direct模式，虽然一个交换机可以绑定多个队列，但是同一个routingKey(不能重复)没法同时路由两个队列。所以出现了topic模式。</p>
<p>topic模式的routingKey不能乱写，</p>
<ul>
<li>单词之间需要用.隔开</li>
<li>星号*可以代替一个单词</li>
<li>井号#可以代替零个或多个单词</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328331.png" alt="topic例子"></p>
<blockquote>
<p>需要注意的是：</p>
<p>如果队列绑定的routingKey是#，那这个队列会接受所有的数据，有点像fanout了</p>
<p>如果队列绑定的routingKey中没有出现#或者*，这个队列只会接受指定的routingKey，有点像direct模式了。</p>
</blockquote>
<p>下面来实现一下：</p>
<p>首先是消费者1，需要声明交换机，声明队列</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Topic消费者 C1
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/10
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReceiveLogsTopic1</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_NAME</span> <span class="token operator">=</span> <span class="token string">"topic_logs"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE1_NAME</span> <span class="token operator">=</span> <span class="token string">"Q1"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE2_NAME</span> <span class="token operator">=</span> <span class="token string">"Q2"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>

        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token class-name">BuiltinExchangeType</span><span class="token punctuation">.</span><span class="token constant">TOPIC</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">QUEUE1_NAME</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">QUEUE2_NAME</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 绑定队列到交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token constant">QUEUE1_NAME</span><span class="token punctuation">,</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span><span class="token string">"*.orange.*"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 消费消息</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token constant">QUEUE1_NAME</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Q1消费消息,routingKey为："</span><span class="token operator">+</span>message<span class="token punctuation">.</span><span class="token function">getEnvelope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRoutingKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">",消息体："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> sig<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Q1取消消费消息"</span> <span class="token operator">+</span> consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消费者2：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Topic消费者 C2
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/10
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReceiveLogsTopic2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_NAME</span> <span class="token operator">=</span> <span class="token string">"topic_logs"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE1_NAME</span> <span class="token operator">=</span> <span class="token string">"Q1"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE2_NAME</span> <span class="token operator">=</span> <span class="token string">"Q2"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 声明交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token class-name">BuiltinExchangeType</span><span class="token punctuation">.</span><span class="token constant">TOPIC</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">QUEUE2_NAME</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 绑定队列到交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token constant">QUEUE2_NAME</span><span class="token punctuation">,</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span><span class="token string">"*.*.rabbit"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token constant">QUEUE2_NAME</span><span class="token punctuation">,</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span><span class="token string">"lazy.#"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 消费消息</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token constant">QUEUE2_NAME</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Q2消费消息,routingKey为："</span><span class="token operator">+</span>message<span class="token punctuation">.</span><span class="token function">getEnvelope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRoutingKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">","</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> sig<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Q2取消消费消息"</span> <span class="token operator">+</span> consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生产者</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 生产者 topic模式
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/10
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TopicLogs</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_NAME</span> <span class="token operator">=</span> <span class="token string">"topic_logs"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">confirmSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">"test.orange.ppp"</span><span class="token punctuation">,</span> <span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_TEXT_PLAIN</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token string">"消息test.orange.ppp"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">"test.orange.rabbit"</span><span class="token punctuation">,</span> <span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_TEXT_PLAIN</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token string">"消息test.orange.ppp"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">"lazy.orange.ppp"</span><span class="token punctuation">,</span> <span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_TEXT_PLAIN</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token string">"消息lazy.orange.ppp"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_NAME</span><span class="token punctuation">,</span> <span class="token string">"lazy"</span><span class="token punctuation">,</span> <span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_TEXT_PLAIN</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token string">"消息lazy"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发出hello topic"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        channel<span class="token punctuation">.</span><span class="token function">addConfirmListener</span><span class="token punctuation">(</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">,</span> multiple<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布成功，deliveryTag:"</span> <span class="token operator">+</span> deliveryTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> multiple<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"发布失败，deliveryTag:"</span> <span class="token operator">+</span> consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328875.png" alt="topic运行结果"></p>
<p>较为简单，记住*代表任意单词，#代表0个或多个单词，单词之间用.隔开即可</p>
<h2 id="p49-死信队列" tabindex="-1"><a class="header-anchor" href="#p49-死信队列" aria-hidden="true">#</a> p49-死信队列</h2>
<p>死信，就是无法被消费的消息。一般来说，producer投递消息到broker或到queue了，consumer从queue取出消息进行消费，但是某些时候由于特定的原因导致queue中的某些<strong>消息无法被消费</strong>，这样的消息如果<strong>没有后续的处理</strong>，就变成了死信，有死信就有了死信队列。</p>
<p>应用场景：</p>
<ul>
<li>为了保证订单业务的消息数据不丢失。</li>
<li>消息消费发生异常，将消息投入死信队列中。</li>
<li>支付订单在指定时间未支付自动失效(延迟消息)</li>
</ul>
<p>死信的来源:</p>
<ul>
<li>消息TTL过期</li>
<li>队列达到最大长度(队列满了，无法再添加数据到mq中)</li>
<li>消息被拒绝，(basic.reject或base.nack)并且requeue=false</li>
</ul>
<h2 id="p50-死信队列架构图" tabindex="-1"><a class="header-anchor" href="#p50-死信队列架构图" aria-hidden="true">#</a> p50-死信队列架构图</h2>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328585.png" alt="死信队列图示"></p>
<p>说明：c1正常消费生产者发过来的消息，当出现消息过期、队列已满、消息应答被拒，三种情况时，需要将正常队列中的消息(死信)转发给死信交换机，再由死信交换机投递给死信队列，给c2来处理消息。</p>
<h2 id="p51-死信队列-正常队列消费者c1" tabindex="-1"><a class="header-anchor" href="#p51-死信队列-正常队列消费者c1" aria-hidden="true">#</a> p51-死信队列-正常队列消费者c1</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * consumer01
 * 死信队列 消费者1 消费正常队列的消息
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/16
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer01</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEAD_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"dead_exchange"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NORMAL_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"normal_exchange"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEAD_QUEUE</span> <span class="token operator">=</span> <span class="token string">"dead_queue"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NORMAL_QUEUE</span> <span class="token operator">=</span> <span class="token string">"normal_queue"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 声明正常队列和正常交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">NORMAL_EXCHANGE</span><span class="token punctuation">,</span> <span class="token class-name">BuiltinExchangeType</span><span class="token punctuation">.</span><span class="token constant">DIRECT</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置正常队列中的消息成为死信后转发到死信交换机</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 这个地方可以设置正常队列的过期时间，但是一般是由生产者发送消息时设置，因为发送时可以给每条消息设置过期时间，更灵活</span>
        <span class="token comment">// map.put("x-dead-letter-ttl",100000);</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-exchange"</span><span class="token punctuation">,</span> <span class="token constant">DEAD_EXCHANGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-routing-key"</span><span class="token punctuation">,</span> <span class="token string">"lisi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">NORMAL_QUEUE</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 声明死信队列和死信交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">DEAD_EXCHANGE</span><span class="token punctuation">,</span> <span class="token class-name">BuiltinExchangeType</span><span class="token punctuation">.</span><span class="token constant">DIRECT</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">DEAD_QUEUE</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 绑定正常队列到正常交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token constant">NORMAL_QUEUE</span><span class="token punctuation">,</span><span class="token constant">NORMAL_EXCHANGE</span><span class="token punctuation">,</span><span class="token string">"zhangsan"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 绑定死信队列到死信交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token constant">DEAD_QUEUE</span><span class="token punctuation">,</span><span class="token constant">DEAD_EXCHANGE</span><span class="token punctuation">,</span><span class="token string">"lisi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 正常队列消费</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token constant">NORMAL_QUEUE</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"正常队列消费："</span><span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"取消消费："</span><span class="token operator">+</span>consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>交换机、队列、都是按照之前的方式来声明，正常交换机和正常队列绑定，死信交换机和死信交换机绑定。不同的是，在声明正常队列的时候需要传入参数，是一个map，指定正常队列中的消息死亡以后发往的交换机和routingKey(用于发往死信队列)。</p>
</blockquote>
<h2 id="p52-死信队列-生产者" tabindex="-1"><a class="header-anchor" href="#p52-死信队列-生产者" aria-hidden="true">#</a> p52-死信队列-生产者</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 
 * 死信队列 生产者 发送消息到正常交换机 再到正常队列
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/16
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEAD_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"dead_exchange"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NORMAL_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"normal_exchange"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEAD_QUEUE</span> <span class="token operator">=</span> <span class="token string">"dead_queue"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NORMAL_QUEUE</span> <span class="token operator">=</span> <span class="token string">"normal_queue"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 在消费者中已经声明了正常队列、正常交换机、死信队列、死信交换机，这里不需要重新声明，直接发送消息指定过期时间就好了</span>
        <span class="token comment">// 设置过期时间</span>
        <span class="token class-name">AMQP<span class="token punctuation">.</span>BasicProperties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AMQP<span class="token punctuation">.</span>BasicProperties<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">expiration</span><span class="token punctuation">(</span><span class="token string">"100000"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token constant">NORMAL_EXCHANGE</span><span class="token punctuation">,</span><span class="token string">"zhangsan"</span><span class="token punctuation">,</span> properties<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">"消息"</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>生产者只需要往正常交换机发消息，再到正常队列即可。消息死亡以后会被转发给死信交换机。在发送时可以通过AMQP.BasicProperties指定消息的过期时间。</p>
</blockquote>
<h2 id="p53-死信队列-死信队列消费者c2" tabindex="-1"><a class="header-anchor" href="#p53-死信队列-死信队列消费者c2" aria-hidden="true">#</a> p53-死信队列-死信队列消费者c2</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * consumer02
 * 死信队列 消费者1 消费死信队列的消息
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/16
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer02</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEAD_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"dead_exchange"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NORMAL_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"normal_exchange"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEAD_QUEUE</span> <span class="token operator">=</span> <span class="token string">"dead_queue"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NORMAL_QUEUE</span> <span class="token operator">=</span> <span class="token string">"normal_queue"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>

        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token constant">DEAD_QUEUE</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"死信队列消费："</span><span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"取消消费："</span><span class="token operator">+</span>consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>死信队列的消费者没有什么特殊的，就是正常消费。</p>
</blockquote>
<h2 id="死信队列操作说明" tabindex="-1"><a class="header-anchor" href="#死信队列操作说明" aria-hidden="true">#</a> 死信队列操作说明</h2>
<p>首先运行消费者c1，创建好正常交换机、正常队列、死信交换机、死信队列以及他们之间的绑定关系。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328887.png" alt="正常队列绑定正常交换机"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328258.png" alt="死信队列绑定死信交换机"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328115.png" alt="正常队列"></p>
<blockquote>
<p>正常队列为什么和其他正常队列显示的不一样？DLX表示消息没有被正常消费会被转发给死信交换机，DLK表示转发时带有routingKey</p>
</blockquote>
<p>创建完以后，我们关闭c1进程(模拟宕机)，运行生产者，进行消息发送。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328850.png" alt="消息到达正常队列"></p>
<blockquote>
<p>正常队列接收到了消息，但是正常队列的消费者c1已经被我们关闭，并且消息是10秒钟的有消息，所以10秒钟以后，消息会被正常队列转发到死信交换机再发到死信队列。</p>
</blockquote>
<p>我们可以在消费图中查看过去一分钟消息的情况：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328288.png" alt="消息情况"></p>
<blockquote>
<p>可以看到，接受到消息10秒钟后，消息没了。再到死信队列查看：</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328049.png" alt="死信队列情况"></p>
<blockquote>
<p>由于我没有启动消费者c2，但是我为了截图操作过三次，所以有多段消息增多的折线，最后一次为本次操作。</p>
</blockquote>
<blockquote>
<p>最后我们再启动消费者c2进行消费，把之前的消息都消费完</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328459.png" alt="消费者c2消费"></p>
<p>至此，消息过期的死信队列演示完毕。</p>
<h2 id="p54-死信队列-队列达到最大长度" tabindex="-1"><a class="header-anchor" href="#p54-死信队列-队列达到最大长度" aria-hidden="true">#</a> p54-死信队列-队列达到最大长度</h2>
<p>我们知道消息有三种情况会成为死信，已经演示过了消息过期，接下来演示一下队列达到最大长度的情况。</p>
<p>在给声明队列(正常队列)时，给队列传参时，增加以下属性：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-max-length"</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦达到最大长度，超出的部分将会成为死信。</p>
<p>我们把原来的队列删除，重新运行消费者c1创建队列。</p>
<p><img src="http://www.iocaop.com/images/2022-08/RSq837OZ9W42Hhl.png" alt="创建指定长度的队列"></p>
<p>指定了队列的最大长度为6，停止正常队列消费者c1(使消息积压在正常队列中)，运行生产者，往队列里发10条不过期的消息，就会有四条成为死信，被转发到死信交换机，再发到死信队列。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328581.png" alt="正常队列达到最大长度"></p>
<p>由图可以看出，正常队列达到最大长度以后，不会再接收消息，再往这个队列发消息，将会被转发给死信交换机，再到死信队列。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328206.png" alt="死信队列增加了4条消息"></p>
<p>运行死信队列的消费者c2：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328160.png" alt="死信队列消费者消费"></p>
<p>默认是队首的消息出队转发到死信队列，设置一下参数:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-overflow"</span><span class="token punctuation">,</span> <span class="token string">"reject-publish-dlx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>就可以让后面发的消息直接转发到死信队列。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182328195.png" alt="队满后发送的消息直接进入死信队列"></p>
<h2 id="p55-死信队列-消息被拒" tabindex="-1"><a class="header-anchor" href="#p55-死信队列-消息被拒" aria-hidden="true">#</a> p55-死信队列-消息被拒</h2>
<p>为了演示消息拒收成为死信，我们需要把之前队列里面的消息消费掉或者把队列删除，重新创建。创建队列时不指定队列中消息的过期时间和队列的最大长度。</p>
<p>发送消息也不知道消息过期时间。</p>
<p>消费者c1需要注释的代码如下:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token comment">// map.put("x-dead-letter-ttl",100000);</span>
 <span class="token comment">// map.put("x-max-length",6);</span>
 <span class="token comment">// map.put("x-overflow", "reject-publish-dlx");</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将正常队列和死信队列删除。重新发送消息</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182329404.png" alt="重新往不限制长度的队列中发送10条消息"></p>
<p>我们在正常队列的消费者代码中拒绝签收消息5：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer01</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEAD_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"dead_exchange"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NORMAL_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"normal_exchange"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEAD_QUEUE</span> <span class="token operator">=</span> <span class="token string">"dead_queue"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NORMAL_QUEUE</span> <span class="token operator">=</span> <span class="token string">"normal_queue"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token class-name">RabbitMqUtils</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 声明正常队列和正常交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">NORMAL_EXCHANGE</span><span class="token punctuation">,</span> <span class="token class-name">BuiltinExchangeType</span><span class="token punctuation">.</span><span class="token constant">DIRECT</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置正常队列中的消息成为死信后转发到死信交换机</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 这个地方可以设置正常队列的过期时间，但是一般是由生产者发送消息时设置，因为发送时可以给每条消息设置过期时间，更灵活</span>
        <span class="token comment">// map.put("x-dead-letter-ttl",100000);</span>
        <span class="token comment">// 指定队列长度</span>
        <span class="token comment">// map.put("x-max-length",6);</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-exchange"</span><span class="token punctuation">,</span> <span class="token constant">DEAD_EXCHANGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-routing-key"</span><span class="token punctuation">,</span> <span class="token string">"lisi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// map.put("x-overflow", "reject-publish-dlx");</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">NORMAL_QUEUE</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 声明死信队列和死信交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span><span class="token constant">DEAD_EXCHANGE</span><span class="token punctuation">,</span> <span class="token class-name">BuiltinExchangeType</span><span class="token punctuation">.</span><span class="token constant">DIRECT</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token constant">DEAD_QUEUE</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 绑定正常队列到正常交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token constant">NORMAL_QUEUE</span><span class="token punctuation">,</span> <span class="token constant">NORMAL_EXCHANGE</span><span class="token punctuation">,</span> <span class="token string">"zhangsan"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 绑定死信队列到死信交换机</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token constant">DEAD_QUEUE</span><span class="token punctuation">,</span> <span class="token constant">DEAD_EXCHANGE</span><span class="token punctuation">,</span> <span class="token string">"lisi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 正常队列消费</span>
        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token constant">NORMAL_QUEUE</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> message<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"消息5"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"正常队列拒绝消费："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                channel<span class="token punctuation">.</span><span class="token function">basicNack</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getEnvelope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeliveryTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"正常队列消费："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                channel<span class="token punctuation">.</span><span class="token function">basicAck</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getEnvelope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeliveryTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>consumerTag<span class="token punctuation">,</span> message<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"取消消费："</span> <span class="token operator">+</span> consumerTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208182310423.png" alt="启动正常队列消费者c1"></p>
<p>消费完后，死信队列增加了一条消息</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182310424.png" alt="被拒绝的消息被放到了死信队列"></p>
<p>启动死信队列的消费者c2，验证消息是不是我们再c1拒收的消息</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182310741.png" alt="死信队列消费者消费情况"></p>
<p>验证成功了，说明消息被拒收且reqeue为false(不放回原队列)，就会成为死信。</p>
<h2 id="p56-延迟队列" tabindex="-1"><a class="header-anchor" href="#p56-延迟队列" aria-hidden="true">#</a> p56-延迟队列</h2>
<p>我们知道消息有三种情况会成为死信，其中一种就是消息过期成为死信。那么如果在上面的死信队列结构中，正常队列消费者c1永远都不消费消息。就成了延迟队列。</p>
<p>延迟队列的使用场景，</p>
<ul>
<li>如订单10分钟内未支付则自动取消。</li>
<li>用户注册后三天未登录，则短信提醒。</li>
<li>用户发起退款，三天内没有处理，则通知相关人员。</li>
<li>预定会议，指定时间后通知相关人员</li>
</ul>
<p>这些场景都有一个特点，就是在<strong>指定场景之前或之后完成某一项任务</strong>。</p>
<p>如果对时间要求不是很严格(不准确)，数据量不大(服务器、数据库压力大)、时效性不高的任务，也可以用定时任务。</p>
<p>火车票购买也是类似。</p>
<h2 id="p57-延迟消息-rabbitmq整合springboot" tabindex="-1"><a class="header-anchor" href="#p57-延迟消息-rabbitmq整合springboot" aria-hidden="true">#</a> p57-延迟消息-rabbitMQ整合springboot</h2>
<p>创建module，继承父工程:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.6.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>relativePath</span><span class="token punctuation">/></span></span> <span class="token comment">&lt;!-- lookup parent from repository --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>web启动器:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整合mq需要用到的依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>           <span class="token comment">&lt;!-- rabbitmq依赖 --></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
               <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
               <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href='http://www.iocaop.com/2022/08/22/2022-my/%E4%B8%AD%E9%97%B4%E4%BB%B6/springboot%E6%95%B4%E5%90%88swagger3/'>整合swagger文档</a>:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.springfox<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>springfox-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>fastjson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.0.10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目配置文件:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> www.iocaop.com
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> lzc
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>
    <span class="token key atrule">virtual-host</span><span class="token punctuation">:</span> /
  <span class="token key atrule">mvc</span><span class="token punctuation">:</span>
    <span class="token key atrule">pathmatch</span><span class="token punctuation">:</span>
      <span class="token key atrule">matching-strategy</span><span class="token punctuation">:</span> ant_path_matcher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p58-延迟消息-架构图" tabindex="-1"><a class="header-anchor" href="#p58-延迟消息-架构图" aria-hidden="true">#</a> p58-延迟消息-架构图</h2>
<p><img src="http://www.iocaop.com/images/2022-08/202208222235967.png" alt="延迟消息架构图"></p>
<p>我们为了实现不同场景的业务，可能会有不同时长的延迟需求，所以这里设计了两个正常队列QA和QB，分别对应路由键XA和XB，需要注意的是QA和AB中的消息都是限制了有效期的，并且没有消费者消费消息，才能保证QA和QB中的消息必然成为死信。</p>
<p>Y为死信交换机、QD为死信队列、C为死信队列的消费者。</p>
<h2 id="p59-延迟消息-配置类代码" tabindex="-1"><a class="header-anchor" href="#p59-延迟消息-配置类代码" aria-hidden="true">#</a> p59-延迟消息-配置类代码</h2>
<p>我们之前创建队列、交换机都是在消费者代码里面通过信道channel来实现的，现在整合了spring框架，就不需要这样了。声明队列、交换机以及他们之间的绑定关系都有专门的配置类来做。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * ttl队列配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/22
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TtlQueueConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 正常队列QA名称
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_QA_NORMAL</span> <span class="token operator">=</span> <span class="token string">"QA"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 正常队列QB名称
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_QB_NORMAL</span> <span class="token operator">=</span> <span class="token string">"QB"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 正常交换机Y名称
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_X_NORMAL</span> <span class="token operator">=</span> <span class="token string">"X"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 正常交换机和QA绑定的路由key
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ROUTING_KEY_XA_NORMAL</span> <span class="token operator">=</span> <span class="token string">"XA"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 正常交换机和QB绑定的路由key
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ROUTING_KEY_XB_NORMAL</span> <span class="token operator">=</span> <span class="token string">"XB"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 死信交换机Y名称
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_Y_DEAD</span> <span class="token operator">=</span> <span class="token string">"Y"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 正常队列中消息成为死信后转发到死信交换机的路由key
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ROUTING_KEY_YD_DEAD</span> <span class="token operator">=</span> <span class="token string">"YD"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 死信队列QD名称
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_QD_DEAD</span> <span class="token operator">=</span> <span class="token string">"QD"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 声明正常交换机X
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"xExchange"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DirectExchange</span> <span class="token function">xExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DirectExchange</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_X_NORMAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 声明死信交换机Y
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"yExchange"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DirectExchange</span> <span class="token function">yExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DirectExchange</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_Y_DEAD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 声明正常队列QA
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"qaQueue"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">qaQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置消息过期时间</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-message-ttl"</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置消息成为死信后转发的交换机</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-exchange"</span><span class="token punctuation">,</span> <span class="token constant">EXCHANGE_Y_DEAD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置消息成为死信后转发的路由key</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-routing-key"</span><span class="token punctuation">,</span> <span class="token constant">ROUTING_KEY_YD_DEAD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token constant">QUEUE_QA_NORMAL</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withArguments</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 声明正常队列QB
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"qbQueue"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">qbQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置消息过期时间</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-message-ttl"</span><span class="token punctuation">,</span> <span class="token number">30000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置消息成为死信后转发的交换机</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-exchange"</span><span class="token punctuation">,</span> <span class="token constant">EXCHANGE_Y_DEAD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置消息成为死信后转发的路由key</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-routing-key"</span><span class="token punctuation">,</span> <span class="token constant">ROUTING_KEY_YD_DEAD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token constant">QUEUE_QB_NORMAL</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withArguments</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 声明死信队列QD
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"qdQueue"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">qdQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token constant">QUEUE_QD_DEAD</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 正常队列QA和正常交换机X绑定
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
     * Qualifier注解可以从ioc中通过名称获取bean，获取我们刚才声明的队列和交换机
     *
     * <span class="token keyword">@param</span> <span class="token parameter">qaQueue</span>   qa队列
     * <span class="token keyword">@param</span> <span class="token parameter">xExchange</span> x交换机
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Binding</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">bindingQaBindX</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"qaQueue"</span><span class="token punctuation">)</span> <span class="token class-name">Queue</span> qaQueue<span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"xExchange"</span><span class="token punctuation">)</span> <span class="token class-name">DirectExchange</span> xExchange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>qaQueue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span>xExchange<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token constant">ROUTING_KEY_XA_NORMAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 正常队列QB和正常交换机X绑定
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
     * Qualifier注解可以从ioc中通过名称获取bean，获取我们刚才声明的队列和交换机
     *
     * <span class="token keyword">@param</span> <span class="token parameter">qbQueue</span>   qb队列
     * <span class="token keyword">@param</span> <span class="token parameter">xExchange</span> x交换机
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Binding</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">bindingQbBindX</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"qbQueue"</span><span class="token punctuation">)</span> <span class="token class-name">Queue</span> qbQueue<span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"xExchange"</span><span class="token punctuation">)</span> <span class="token class-name">DirectExchange</span> xExchange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>qbQueue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span>xExchange<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token constant">ROUTING_KEY_XB_NORMAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
    * 死信队列QD和死信交换机Y绑定
    */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">bindingQdBindY</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"qdQueue"</span><span class="token punctuation">)</span> <span class="token class-name">Queue</span> qdQueue<span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"yExchange"</span><span class="token punctuation">)</span> <span class="token class-name">DirectExchange</span> yExchange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>qdQueue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span>yExchange<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token constant">ROUTING_KEY_YD_DEAD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p60-延迟消息-生产者" tabindex="-1"><a class="header-anchor" href="#p60-延迟消息-生产者" aria-hidden="true">#</a> p60-延迟消息-生产者</h2>
<p>这里为了测试，直接在controller中调用http接口发送消息。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * ttl控制器发送信息
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/22
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/ttl"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Api</span><span class="token punctuation">(</span>tags <span class="token operator">=</span> <span class="token string">"延迟队列控制器"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TtlSendMessageController</span> <span class="token punctuation">{</span>
    
    <span class="token doc-comment comment">/**
     * 正常交换机Y名称
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXCHANGE_X_NORMAL</span> <span class="token operator">=</span> <span class="token string">"X"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 正常交换机和QA绑定的路由key
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ROUTING_KEY_XA_NORMAL</span> <span class="token operator">=</span> <span class="token string">"XA"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 正常交换机和QB绑定的路由key
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ROUTING_KEY_XB_NORMAL</span> <span class="token operator">=</span> <span class="token string">"XB"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/send/{message}"</span><span class="token punctuation">,</span>method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"发送消息到不同的消息过期时间的队列"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_X_NORMAL</span><span class="token punctuation">,</span> <span class="token constant">ROUTING_KEY_XA_NORMAL</span><span class="token punctuation">,</span> <span class="token string">"消息来自延迟队列XA(延迟10秒):"</span><span class="token operator">+</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_X_NORMAL</span><span class="token punctuation">,</span> <span class="token constant">ROUTING_KEY_XB_NORMAL</span><span class="token punctuation">,</span> <span class="token string">"消息来自延迟队列XB(延迟30秒):"</span><span class="token operator">+</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"{}:发送消息：{},给了QA(延迟10秒)和QB(延迟30秒)两个队列"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"success"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p64-延迟队列-消费者" tabindex="-1"><a class="header-anchor" href="#p64-延迟队列-消费者" aria-hidden="true">#</a> p64-延迟队列-消费者</h2>
<p>springboot整合rabbitMQ以后，消息的消费是由监听器来完成的，所以需要加一个监听器。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 死信队列消费者
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/22
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeadQueueConsumer</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * 死信队列QD名称
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_QD_DEAD</span> <span class="token operator">=</span> <span class="token string">"QD"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token constant">QUEUE_QD_DEAD</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receiveD</span><span class="token punctuation">(</span><span class="token class-name">Message</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"接收到死信队列消息：{},当前时间{}"</span><span class="token punctuation">,</span> msg<span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>需要注意的是导包应该是AMQP中的包，如果报错，配置文件中加上如下代码</p>
</blockquote>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">listener</span><span class="token punctuation">:</span>
      <span class="token key atrule">acknowledge-mode</span><span class="token punctuation">:</span> manual
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动项目，通过swagger调用接口发送消息到两个队列，可以看到监听器打印出来的日志，分别过了10秒和30秒消费消息，延迟队列实现完毕。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208222349959.png" alt="延迟队列消费"></p>
<h2 id="p62-延迟队列优化-过期时间由消息来指定" tabindex="-1"><a class="header-anchor" href="#p62-延迟队列优化-过期时间由消息来指定" aria-hidden="true">#</a> p62-延迟队列优化-过期时间由消息来指定</h2>
<p>上面我我们是在队列的属性中设置了消息的过期时间，如果又有其他的不同时间的需求，又要增加队列，这是不合理的。在创建队列时，不设置消息的过期时间，而是由生产者在发消息时指定消息的属性来设置当前发送的消息的过期时间。</p>
<blockquote>
<p>我们再创建一个队列QC来实现不同延迟需求的延迟队列。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2022-08/202208232137471.png" alt="延迟队列话-队列不设置过期时间"></p>
<h2 id="p63-延迟队列优化-配置类代码" tabindex="-1"><a class="header-anchor" href="#p63-延迟队列优化-配置类代码" aria-hidden="true">#</a> p63-延迟队列优化-配置类代码</h2>
<p>在原有代码基础上，增加一个队列QC</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 正常队列QC名称
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">QUEUE_QC_NORMAL</span> <span class="token operator">=</span> <span class="token string">"QC"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 正常交换机和QC绑定的路由key
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ROUTING_KEY_XC_NORMAL</span> <span class="token operator">=</span> <span class="token string">"XC"</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 声明正常队列QC
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"qcQueue"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">qcQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置消息过期时间</span>
<span class="token comment">//        map.put("x-message-ttl", 5000);</span>
        <span class="token comment">// 设置消息成为死信后转发的交换机</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-exchange"</span><span class="token punctuation">,</span> <span class="token constant">EXCHANGE_Y_DEAD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置消息成为死信后转发的路由key</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-routing-key"</span><span class="token punctuation">,</span> <span class="token constant">ROUTING_KEY_YD_DEAD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token constant">QUEUE_QC_NORMAL</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withArguments</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 正常队列QC和正常交换机X绑定
     *
     * <span class="token keyword">@param</span> <span class="token parameter">qcQueue</span>   qc队列
     * <span class="token keyword">@param</span> <span class="token parameter">xExchange</span> x交换
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Binding</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">bindingQCBindX</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"qcQueue"</span><span class="token punctuation">)</span> <span class="token class-name">Queue</span> qcQueue<span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"xExchange"</span><span class="token punctuation">)</span> <span class="token class-name">DirectExchange</span> xExchange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>qcQueue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span>xExchange<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token constant">ROUTING_KEY_XC_NORMAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-08/202208232142486.png" alt="创建结果"></p>
<p>可以看到，QC没有TTL，即不在队列上设置消息的过期时间。</p>
<h2 id="p64-延迟队列优化-生产者" tabindex="-1"><a class="header-anchor" href="#p64-延迟队列优化-生产者" aria-hidden="true">#</a> p64-延迟队列优化-生产者</h2>
<p>之前发消息没有再生产者指定消息的过期时间，因为是在队列中设置了消息过期时间，现在刚好相反：不在队列设置过期时间，而是在生产者发送消息时指定消息过期时间。</p>
<p>我们再写一个controller接口，发送指定过期时间的消息。</p>
<p>在发送消息的方法rabbitTemplate.convertAndSend()进入源码查看之前使用的方法：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232158115.png" alt="之前使用的"></p>
<p>现在需要设置消息的过期时间，所以需要使用它的重载方法:</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232158155.png" alt="重载方法，可以设置消息的属性"></p>
<p>第四个参数是一个函数式接口，可以使用λ表达式</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232200273.png" alt="参数4"></p>
<p>关键代码:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">MessageProperties</span> messageProperties <span class="token operator">=</span> msg<span class="token punctuation">.</span><span class="token function">getMessageProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 设置消息过期时间</span>
            messageProperties<span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span>ttlSeconds<span class="token operator">*</span><span class="token number">1000</span><span class="token operator">+</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    		<span class="token comment">// 返回值根据函数式接口可以确定 </span>
            <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 正常交换机和QC绑定的路由key
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ROUTING_KEY_XC_NORMAL</span> <span class="token operator">=</span> <span class="token string">"XC"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/send/{message}/ttl"</span><span class="token punctuation">,</span>method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"发送不同过期时间的消息到不设置过期时间的队列"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> message<span class="token punctuation">,</span><span class="token class-name">Integer</span> ttlSeconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token constant">EXCHANGE_X_NORMAL</span><span class="token punctuation">,</span> <span class="token constant">ROUTING_KEY_XC_NORMAL</span><span class="token punctuation">,</span> <span class="token string">"消息来自延迟队列XC(延迟"</span><span class="token operator">+</span>ttlSeconds<span class="token operator">+</span><span class="token string">"秒):"</span><span class="token operator">+</span>message<span class="token punctuation">,</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">MessageProperties</span> messageProperties <span class="token operator">=</span> msg<span class="token punctuation">.</span><span class="token function">getMessageProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 设置消息过期时间</span>
            messageProperties<span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span>ttlSeconds<span class="token operator">*</span><span class="token number">1000</span><span class="token operator">+</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"{}:发送消息：{},给了QC队列,过期时间:{}"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">,</span>ttlSeconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"success"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动运行，效果：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232211930.png" alt="优化后的延迟队列运行效果"></p>
<p>结果出乎了意料。因为如果在消息属性上设置TTL的方式，<strong>消息可能并不会按时死亡，因为RabbitMQ只会检查第一个消息是否过期，如果过期则丢到死信队列，那么如果第一个消息过期时间很长，而第二个消息过期时间很短，那么第二个消息并不会优先得到死亡(不会按时死亡)</strong>。</p>
<h2 id="p66-基于插件的延迟队列" tabindex="-1"><a class="header-anchor" href="#p66-基于插件的延迟队列" aria-hidden="true">#</a> p66-基于插件的延迟队列</h2>
<p>要想实现不一样的延迟需求，又不想创建队列。基于上面的优化，还是存在问题，是rabbitmq的缺陷，那么就要借助插件来实现更完美的延迟队列了。</p>
<p><a href='https://www.rabbitmq.com/community-plugins.html'>插件下载</a>在页面中找到<strong>rabbitmq_delayed_message_exchange</strong>，进入<a href ='https://github.com/rabbitmq/rabbitmq-delayed-message-exchange'>github页面</a>。</p>
<p>在release版本(不用实时更新)中下载<a href="https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.10.2/rabbitmq_delayed_message_exchange-3.10.2.ez" target="_blank" rel="noopener noreferrer">rabbitmq_delayed_message_exchange-3.10.2.ez<ExternalLinkIcon/></a></p>
<p>传到linux中的mq插件文件夹下。我的是：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/usr/lib/rabbitmq/lib/rabbitmq_server-3.9.12/plugins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后运行命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmq-plugins <span class="token builtin class-name">enable</span> rabbitmq_delayed_message_exchange
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>失败了：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232237137.png" alt="延迟队列插件安装失败"></p>
<p>所以重新下载一个低版本的插件。重新上传，并删除高本版的插件。再运行命令。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232239774.png" alt="延迟队列插件安装成功"></p>
<p>重启rabbitmq</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart rabbitmq-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重启后，到web界面增加交换机可以看到，出现了一个新的类型。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232244364.png" alt="安装插件后新增的交换机类型"></p>
<p>为什么是交换机类型？</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232248195.png" alt="原来的延迟队列"></p>
<p>原来的延迟队列，是基于死信的，也就是消息死亡后转发到死信交换机。</p>
<p>现在，我们用插件来实现，和之前的不同。是在交换机上进行了延迟。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232251230.png" alt="插件延迟队列"></p>
<h2 id="p67-基于插件的延迟队列-配置类" tabindex="-1"><a class="header-anchor" href="#p67-基于插件的延迟队列-配置类" aria-hidden="true">#</a> p67-基于插件的延迟队列-配置类</h2>
<p><img src="http://www.iocaop.com/images/2022-08/202208232252391.png" alt="基于插件的延迟消息架构图"></p>
<p>和之前不一样的是，这里是通过交换机来进行延迟的，安装插件以后，mq中多了一种交换机的类型，所以我们在配置类中需要注意交换机的配置。</p>
<p>因为自定义的交换机类型，所以不用之前的mq自带的交换机类型了，而是使用CustomExchange，我们可以在构造函数中看参数:</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232315575.png" alt="自定义交换机构造函数"></p>
<p>需要注意的是最后一个参数，是让我们设置交换机的参数，这里只需要设置延迟交换机的类型为direct即可(根据业务场景设置):</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>       map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-delayed-type"</span><span class="token punctuation">,</span><span class="token string">"direct"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完整代码:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 基于插件的延迟队列配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/23
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DelayQueueConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 延迟队列
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DELAY_QUEUE</span> <span class="token operator">=</span> <span class="token string">"delay.queue"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 延迟交换机
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DELAY_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"delay.exchange"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 延迟交换机类型
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DELAY_EXCHANGE_TYPE</span> <span class="token operator">=</span> <span class="token string">"x-delayed-message"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 延迟交换机绑定延迟队列的路由key
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DELAY_ROUTING_KEY</span> <span class="token operator">=</span> <span class="token string">"delay.routing.key"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 延迟队列
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Queue</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"delayQueue"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">delayQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token constant">DELAY_QUEUE</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 延迟交换机
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">CustomExchange</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"delayExchange"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CustomExchange</span> <span class="token function">delayExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-delayed-type"</span><span class="token punctuation">,</span><span class="token string">"direct"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CustomExchange</span><span class="token punctuation">(</span><span class="token constant">DELAY_EXCHANGE</span><span class="token punctuation">,</span><span class="token constant">DELAY_EXCHANGE_TYPE</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 绑定
     *
     * <span class="token keyword">@param</span> <span class="token parameter">delayQueue</span>    延迟队列
     * <span class="token keyword">@param</span> <span class="token parameter">delayExchange</span> 延迟交换
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Binding</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">binding</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span> <span class="token punctuation">(</span><span class="token string">"delayQueue"</span><span class="token punctuation">)</span> <span class="token class-name">Queue</span> delayQueue<span class="token punctuation">,</span> <span class="token annotation punctuation">@Qualifier</span> <span class="token punctuation">(</span><span class="token string">"delayExchange"</span><span class="token punctuation">)</span> <span class="token class-name">Exchange</span> delayExchange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>delayQueue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span>delayExchange<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token constant">DELAY_ROUTING_KEY</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">noargs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行，到管理界面查看交换机和队列的信息:</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232335129.png" alt="基于插件实现的延迟队列"></p>
<h2 id="p68-基于插件的延迟队列-生产者" tabindex="-1"><a class="header-anchor" href="#p68-基于插件的延迟队列-生产者" aria-hidden="true">#</a> p68-基于插件的延迟队列-生产者</h2>
<p>发送消息到基于插件实现的延迟队列，需要注意的是此处给消息设置过期时间时使用的方法是(基于死信的延迟队列是使用setExpiration):</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>			<span class="token comment">// 设置消息过期时间</span>
            messageProperties<span class="token punctuation">.</span><span class="token function">setDelay</span><span class="token punctuation">(</span>ttlSeconds<span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 延迟交换机绑定延迟队列的路由key
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DELAY_ROUTING_KEY</span> <span class="token operator">=</span> <span class="token string">"delay.routing.key"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 延迟交换机
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DELAY_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"delay.exchange"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/send/{message}/delay"</span><span class="token punctuation">,</span>method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"发送消息给基于插件的延迟队列"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">sendDelay</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> message<span class="token punctuation">,</span><span class="token class-name">Integer</span> ttlSeconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token constant">DELAY_EXCHANGE</span><span class="token punctuation">,</span> <span class="token constant">DELAY_ROUTING_KEY</span><span class="token punctuation">,</span> <span class="token string">"消息来自基于插件的延迟队列(延迟"</span><span class="token operator">+</span>ttlSeconds<span class="token operator">+</span><span class="token string">"秒):"</span><span class="token operator">+</span>message<span class="token punctuation">,</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">MessageProperties</span> messageProperties <span class="token operator">=</span> msg<span class="token punctuation">.</span><span class="token function">getMessageProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 设置消息过期时间</span>
            messageProperties<span class="token punctuation">.</span><span class="token function">setDelay</span><span class="token punctuation">(</span>ttlSeconds<span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"{}:发送消息：{},给了QC队列,过期时间:{}"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">,</span>ttlSeconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"success"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p69-基于插件的延迟队列-消费者" tabindex="-1"><a class="header-anchor" href="#p69-基于插件的延迟队列-消费者" aria-hidden="true">#</a> p69-基于插件的延迟队列-消费者</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 基于插件的延迟队列消费者
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/23
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DelayQueueConsumer</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 延迟队列
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DELAY_QUEUE</span> <span class="token operator">=</span> <span class="token string">"delay.queue"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token constant">DELAY_QUEUE</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receiveD</span><span class="token punctuation">(</span><span class="token class-name">Message</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"接收到基于插件的延迟队列消息：{},当前时间{}"</span><span class="token punctuation">,</span> msg<span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：先发一条20秒的延迟消息，再发一条2秒的延迟消息。看看会不会出现基于死信的延迟队列的那种问题。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208232344620.png" alt="基于插件的延迟消息"></p>
<p>符合预期</p>
<h2 id="p70-延迟消息总结" tabindex="-1"><a class="header-anchor" href="#p70-延迟消息总结" aria-hidden="true">#</a> p70-延迟消息总结</h2>
<p>本次学习了两种延迟消息：</p>
<ul>
<li>基于死信的延迟队列</li>
<li>基于插件的延迟队列</li>
</ul>
<p>延迟消息在需要延迟处理的场景下非常有用，因为rabbitmq可以利用特性：<strong>消息可靠发送</strong>、<strong>消息可靠投递</strong>、<strong>消息持久化</strong>，<strong>死信队列</strong>可以保障消息至少被消费一次以及未被处理的消息不会丢失，以及<strong>手动签收</strong>来保证消息至少被消费一次，另外利用<strong>mq集群</strong>，可以解决mq单点故障。</p>
<p>当然，延迟队列还有其他选择：</p>
<ul>
<li>java的delayQueue(无法保证消息不丢失)</li>
<li>redis的zset</li>
<li>Quartz</li>
<li>kafka时间轮</li>
</ul>
<p>看场景选择。</p>
<h2 id="p71-发布高级确认" tabindex="-1"><a class="header-anchor" href="#p71-发布高级确认" aria-hidden="true">#</a> p71-发布高级确认</h2>
<p>之前学习的单个发布确认、批量发布确认、异步发布确认只是打印了发布失败的消息，并没有处理。现在来学一下。</p>
<p>我们知道，当发送消息给mq时，如果mq挂了或者重启了(不明原因)，接受不到消息导致生产者消息投递失败，消息丢失 ，那么我们只能手动处理消息、恢复了，那么怎么更好的保证消息投递的可靠性呢？</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242050113.png" alt="确认机制方案"></p>
<p>分析一下：</p>
<ul>
<li>当生产者发送消息给交换机，交换机挂了，消息会丢失，应该放到缓存。</li>
<li>当生产者发送消息给交换机，交换机没挂，队列挂了，消息也会丢弃，也应该放到缓存。</li>
<li>当生产者发送消息给交换机，交换机和队列都挂了，消息也会丢弃，更应该放到缓存。</li>
<li>当交换机恢复，收到消息后，应该从缓存中删除消息，队列又不存在，消息也会丢弃。</li>
</ul>
<p>缓存中的消息用定时任务，重新投递。</p>
<p>问题是：生产者根本不知道交换机和队列挂没挂，消息发完，就没有回音了，怎么办？</p>
<h2 id="p72-发布确认高级-配置类" tabindex="-1"><a class="header-anchor" href="#p72-发布确认高级-配置类" aria-hidden="true">#</a> p72-发布确认高级-配置类</h2>
<p>本次实验的架构图：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242058343.png" alt="实验架构图"></p>
<p>先把上面这个图的效果实现一下：</p>
<p>创建队列和交换机:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 发布确认交换机和队列的配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/24
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfirmConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 交换机名称
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"confirm.exchange"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发布确认队列和交换机的路由key
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_ROUTING_KEY</span> <span class="token operator">=</span> <span class="token string">"key1"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发布确认队列
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_QUEUE</span> <span class="token operator">=</span> <span class="token string">"confirm.queue"</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 确认队列
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Queue</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"confirmQueue"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">confirmQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token constant">CONFIRM_QUEUE</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 确认交换机
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">DirectExchange</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"confirmExchange"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DirectExchange</span> <span class="token function">confirmExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DirectExchange</span><span class="token punctuation">(</span><span class="token constant">CONFIRM_EXCHANGE</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">queueBindExchange</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"confirmQueue"</span><span class="token punctuation">)</span> <span class="token class-name">Queue</span> confirmQueue<span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"confirmExchange"</span><span class="token punctuation">)</span> <span class="token class-name">DirectExchange</span> confirmExchange<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>confirmQueue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span>confirmExchange<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token constant">CONFIRM_ROUTING_KEY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p73发布确认高级-生产者和消费者" tabindex="-1"><a class="header-anchor" href="#p73发布确认高级-生产者和消费者" aria-hidden="true">#</a> p73发布确认高级-生产者和消费者</h2>
<p>生产者：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 确认控制器发送信息
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/24
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/confirm"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Api</span><span class="token punctuation">(</span>tags <span class="token operator">=</span> <span class="token string">"高级确认发布消息队列控制器"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfirmSendMessageController</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 交换机名称
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"confirm.exchange"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发布确认队列和交换机的路由key
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_ROUTING_KEY</span> <span class="token operator">=</span> <span class="token string">"key1"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发布确认队列
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_QUEUE</span> <span class="token operator">=</span> <span class="token string">"confirm.queue"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/send/{message}"</span><span class="token punctuation">,</span>method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"发送消息到不同的消息过期时间的队列"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token constant">CONFIRM_EXCHANGE</span><span class="token punctuation">,</span> <span class="token constant">CONFIRM_ROUTING_KEY</span><span class="token punctuation">,</span> <span class="token string">"消息来自确认发布队列:"</span><span class="token operator">+</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"{}:发送消息：{},确认发布队列"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"success"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消费者:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 确认队列使用者
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/24
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfirmQueueConsumer</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 发布确认队列
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_QUEUE</span> <span class="token operator">=</span> <span class="token string">"confirm.queue"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token constant">CONFIRM_QUEUE</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receiveD</span><span class="token punctuation">(</span><span class="token class-name">Message</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"接收到发布确认队列消息：{},当前时间{}"</span><span class="token punctuation">,</span> msg<span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试一下，没问题</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242121565.png" alt="发布确认实验开始前测试"></p>
<h2 id="p75-发布确认高级-回调接口" tabindex="-1"><a class="header-anchor" href="#p75-发布确认高级-回调接口" aria-hidden="true">#</a> p75-发布确认高级-回调接口</h2>
<p>目前是没问题的，就怕交换机或者队列出问题。所以需要一个回调，通知生产者消息发送的状态。</p>
<p>在RabbitTemplate中有一个内部接口，ConfirmCallback：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242153494.png" alt="ConfirmCallback内部接口"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242153696.png" alt="内部接口定义"></p>
<p>我们给这个接口写一个实现类，并交给ioc管理：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 交换机确认回调
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/24
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyCallBack</span> <span class="token keyword">implements</span> <span class="token class-name">RabbitTemplate<span class="token punctuation">.</span>ConfirmCallback</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">setConfirmCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 交换机确认回调的方法
     *
     * <span class="token keyword">@param</span> <span class="token parameter">correlationData</span> 消息相关的信息，如tag
     * <span class="token keyword">@param</span> <span class="token parameter">ack</span>             是否发布成功
     * <span class="token keyword">@param</span> <span class="token parameter">cause</span>           发布失败的异常信息，发布成功的话是null
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token class-name">CorrelationData</span> correlationData<span class="token punctuation">,</span> <span class="token keyword">boolean</span> ack<span class="token punctuation">,</span> <span class="token class-name">String</span> cause<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>ack<span class="token punctuation">)</span><span class="token punctuation">{</span>
           log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"交换机已经收到了消息,id:{}"</span><span class="token punctuation">,</span>correlationData<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
           log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"交换机没有收到消息,id:{},异常信息:{}"</span><span class="token punctuation">,</span>correlationData<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>cause<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>需要注意的是，除了重写confirm方法，还需要给rabbitTemplate设置回调方法的对象。首先注入rabbitTemplate，在调用被@PostConstruct所注解的方法来设置ConfirmCallback对象。</p>
</blockquote>
<h2 id="p75-发布确认高级-交换机确认" tabindex="-1"><a class="header-anchor" href="#p75-发布确认高级-交换机确认" aria-hidden="true">#</a> p75-发布确认高级-交换机确认</h2>
<p>我们要知道，这个回调方法是生产者发布消息以后，进行回调的，那么，就需要修改生产者发送消息时的代码，使用重载的方法:</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242214381.png" alt="带有消息关联数据的发布方法"></p>
<p>将方法调用修改为：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>        <span class="token class-name">CorrelationData</span> correlationData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CorrelationData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        correlationData<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token constant">CONFIRM_EXCHANGE</span><span class="token punctuation">,</span> <span class="token constant">CONFIRM_ROUTING_KEY</span><span class="token punctuation">,</span> <span class="token string">"消息来自确认发布队列:"</span><span class="token operator">+</span>message<span class="token punctuation">,</span>correlationData<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们重启，发现并没有回调成功，因为还没有配置。</p>
<p>修改application.yml，增加下面的配置</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>publisher<span class="token operator">-</span>confirm<span class="token operator">-</span>type<span class="token operator">:</span> correlated
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果是SIMPLE，对应了单个发布确认和异步发布确认，详细解释：<a href = 'https://blog.csdn.net/yaomingyang/article/details/108410286'>配置值的解释</a></p>
<p>配置后启动，发送消息：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242227622.png" alt="发布到交换机成功，队列成功"></p>
<p>我们把生产者发送时的交换机改成一个不存在的值,可以看到打印了异常信息：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242229165.png" alt="发布到交换机失败"></p>
<p>我们再把交换机改成正确的，把routingKey改成不正确的：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242232712.png" alt="发布到交换机成功，到队列失败"></p>
<p>发现，交换机的回调显示成功，但并没有消费消息。可以看出，是消息到达了交换机，但没有到达队列。</p>
<h2 id="p76-发布确认高级-回退消息" tabindex="-1"><a class="header-anchor" href="#p76-发布确认高级-回退消息" aria-hidden="true">#</a> p76-发布确认高级(回退消息)</h2>
<p>如果交换机在给队列投递消息时，发现该消息不可路由，即队列不存在，或没有绑定对应的routingKey的队列，消息就会丢失。为了不丢失，需要回退消息。</p>
<p>需要在application.yml，增加下面的配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">publisher-returns</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>并且在刚才的实现类MyCallBack上，再实现一个接口:RabbitTemplate.ReturnsCallback并重写方法，设置rabbitTemplate的returnsCallback回调对象为当前对象。</p>
<p>完整代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 交换机确认回调
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/24
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyCallBack</span> <span class="token keyword">implements</span> <span class="token class-name">RabbitTemplate<span class="token punctuation">.</span>ConfirmCallback</span><span class="token punctuation">,</span><span class="token class-name">RabbitTemplate<span class="token punctuation">.</span>ReturnsCallback</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">setConfirmCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">setReturnsCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 交换机确认回调的方法
     *
     * <span class="token keyword">@param</span> <span class="token parameter">correlationData</span> 消息相关的信息，如tag
     * <span class="token keyword">@param</span> <span class="token parameter">ack</span>             是否发布成功
     * <span class="token keyword">@param</span> <span class="token parameter">cause</span>           发布失败的异常信息，发布成功的话是null
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token class-name">CorrelationData</span> correlationData<span class="token punctuation">,</span> <span class="token keyword">boolean</span> ack<span class="token punctuation">,</span> <span class="token class-name">String</span> cause<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>ack<span class="token punctuation">)</span><span class="token punctuation">{</span>
           log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"交换机已经收到了消息,id:{}"</span><span class="token punctuation">,</span>correlationData<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
           log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"交换机没有收到消息,id:{},异常信息:{}"</span><span class="token punctuation">,</span>correlationData<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>cause<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">returnedMessage</span><span class="token punctuation">(</span><span class="token class-name">ReturnedMessage</span> returned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Message</span> message <span class="token operator">=</span> returned<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> exchange <span class="token operator">=</span> returned<span class="token punctuation">.</span><span class="token function">getExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> routingKey <span class="token operator">=</span> returned<span class="token punctuation">.</span><span class="token function">getRoutingKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> replyCode <span class="token operator">=</span> returned<span class="token punctuation">.</span><span class="token function">getReplyCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> replyText <span class="token operator">=</span> returned<span class="token punctuation">.</span><span class="token function">getReplyText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"消息:\"{}\",被交换机{}返回,key为{},replyText为{}"</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>exchange<span class="token punctuation">,</span>routingKey<span class="token punctuation">,</span>replyText<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再来发一个能到交换机却不能到队列的消息：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242309993.png" alt="效果图"></p>
<p>在回调方法里，可以把消息保存到缓存中，设置定时任务重新发送。或者使用备份交换机</p>
<h2 id="p77-备份交换机-配置类" tabindex="-1"><a class="header-anchor" href="#p77-备份交换机-配置类" aria-hidden="true">#</a> p77-备份交换机(配置类)</h2>
<p>当交换机无法路由消息到队列时，我们可以把消息转发给备份交换机，再利用广播模式 路由给备份队列和报警队列，进行处理。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242320413.png" alt="备份交换机架构图"></p>
<p>修改配置类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 发布确认交换机和队列的配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/24
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfirmConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 交换机名称
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"confirm.exchange"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发布确认队列和交换机的路由key
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_ROUTING_KEY</span> <span class="token operator">=</span> <span class="token string">"key1"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发布确认队列
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONFIRM_QUEUE</span> <span class="token operator">=</span> <span class="token string">"confirm.queue"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 备份交换机
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">BACKUP_EXCHANGE</span> <span class="token operator">=</span> <span class="token string">"backup.exchange"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 备份队列
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">BACKUP_QUEUE</span> <span class="token operator">=</span> <span class="token string">"backup.queue"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 报警队列
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">WARING_QUEUE</span> <span class="token operator">=</span> <span class="token string">"waring.queue"</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 确认队列
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Queue</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"confirmQueue"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">confirmQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token constant">CONFIRM_QUEUE</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 确认交换机
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">DirectExchange</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"confirmExchange"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DirectExchange</span> <span class="token function">confirmExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"alternate-exchange"</span><span class="token punctuation">,</span><span class="token constant">BACKUP_EXCHANGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span>  <span class="token class-name">ExchangeBuilder</span><span class="token punctuation">.</span><span class="token function">fanoutExchange</span><span class="token punctuation">(</span><span class="token constant">CONFIRM_EXCHANGE</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withArguments</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 队列绑定交换
     *
     * <span class="token keyword">@param</span> <span class="token parameter">confirmQueue</span>    确认队列
     * <span class="token keyword">@param</span> <span class="token parameter">confirmExchange</span> 确认交易
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Binding</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">queueBindExchange</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"confirmQueue"</span><span class="token punctuation">)</span> <span class="token class-name">Queue</span> confirmQueue<span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"confirmExchange"</span><span class="token punctuation">)</span> <span class="token class-name">DirectExchange</span> confirmExchange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>confirmQueue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span>confirmExchange<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token constant">CONFIRM_ROUTING_KEY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 备份队列
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Queue</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"backupQueue"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">backupQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token constant">BACKUP_QUEUE</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 报警队列
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Queue</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"warningQueue"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">warningQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span><span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token constant">WARING_QUEUE</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 备份交换机
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">"backupExchange"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">FanoutExchange</span> <span class="token function">backupExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FanoutExchange</span><span class="token punctuation">(</span><span class="token constant">BACKUP_EXCHANGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 备份交换机绑定备份队列
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">backupQueueBindBackupExchange</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"backupQueue"</span><span class="token punctuation">)</span> <span class="token class-name">Queue</span> queue<span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"backupExchange"</span><span class="token punctuation">)</span> <span class="token class-name">FanoutExchange</span> fanoutExchange<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span>fanoutExchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 备份交换机绑定报警队列
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">warningQueueBindBackupExchange</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"warningQueue"</span><span class="token punctuation">)</span> <span class="token class-name">Queue</span> queue<span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"backupExchange"</span><span class="token punctuation">)</span> <span class="token class-name">FanoutExchange</span> fanoutExchange<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span>fanoutExchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，确认队列需要设置备份交换机，在创建交换机时指定参数：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"alternate-exchange"</span><span class="token punctuation">,</span><span class="token constant">BACKUP_EXCHANGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>消息就会在路由失败时转发给备份交换机，再路由到备份队列和报警队列。</p>
<p>报警队列消费者：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 消息路由失败消费者
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/24
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WarningConsumer</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 报警队列
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">WARING_QUEUE</span> <span class="token operator">=</span> <span class="token string">"waring.queue"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token constant">WARING_QUEUE</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receiveD</span><span class="token punctuation">(</span><span class="token class-name">Message</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"消息：{},路由失败,已备份至备份队列当前时间{}"</span><span class="token punctuation">,</span> msg<span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p78-备份交换机-结果分析" tabindex="-1"><a class="header-anchor" href="#p78-备份交换机-结果分析" aria-hidden="true">#</a> p78-备份交换机-结果分析</h2>
<p>删除原来的确认交换机，重启服务。</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242345313.png" alt="配置了备份交换机"></p>
<p>发一条路由失败的消息试试：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242347938.png" alt="效果"></p>
<p><img src="http://www.iocaop.com/images/2022-08/202208242349205.png" alt="备份队列"></p>
<p>备份队列有消息了(发了4次)，报警消息已经消费，并且没有打印消息回退的信息，说明没有调用消息回退的callback，而是由原来的交换机转发给了备份交换机，再广播给了备份队列和报警队列。</p>
</div></template>


