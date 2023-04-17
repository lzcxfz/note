<template><div><p>课程地址：<a href = 'https://www.bilibili.com/video/BV18E411x7eT/?p=3&spm_id_from=pageDriver&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a></p>
<p>参考笔记：<a href = 'https://blog.csdn.net/u011863024/article/details/114298270'>点击跳转</a></p>
<p>我的Netflix版笔记：<a href='http://www.iocaop.com/posts/2022-my/%E5%BE%AE%E6%9C%8D%E5%8A%A1/cloud%E7%AC%94%E8%AE%B0.html'>点击跳转</a></p>
<h2 id="p95-cloud-alibaba简介" tabindex="-1"><a class="header-anchor" href="#p95-cloud-alibaba简介" aria-hidden="true">#</a> p95-Cloud Alibaba简介</h2>
<p>为什么出现cloud alibaba？</p>
<p>官网链接：<a href='https://spring.io/blog/2018/12/12/spring-cloud-greenwich-rc1-available-now'>点击跳转</a>，netfix版进入了维护模式，意味着Spring Cloud团队将不会再向模块添加新功能。</p>
<p>Spring Cloud Netfix将不在开发新的组件，新组件将以其他平台替代的方式实现。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130173526615.png" alt="image-20230130173526615"></p>
<p>spring cloud alibaba能干嘛：</p>
<ul>
<li>服务限流降级：默认支持 WebServlet、WebFlux, OpenFeign、RestTemplate、Spring Cloud Gateway, Zuul, Dubbo 和 RocketMQ 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。</li>
<li>服务注册与发现：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。</li>
<li>分布式配置管理：支持分布式系统中的外部化配置，配置更改时自动刷新。</li>
<li>消息驱动能力：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。</li>
<li>分布式事务：使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。</li>
<li>阿里云对象存储：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。</li>
<li>分布式任务调度：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker（schedulerx-client）上执行。</li>
<li>阿里云短信服务：覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。</li>
</ul>
<p>官网：<a href='https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/README-zh.md'>点击跳转</a></p>
<p>需要注意构建时版本，版本说明：<a href='https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E'>点击跳转</a></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130233506151.png" alt="image-20230130233506151"></p>
<h2 id="p96-nacos简介和下载" tabindex="-1"><a class="header-anchor" href="#p96-nacos简介和下载" aria-hidden="true">#</a> p96-Nacos简介和下载</h2>
<p>为什么叫Nacos？</p>
<p>前四个字母分别为Naming和Configuration的前两个字母，最后的s为Service。</p>
<p>是什么？</p>
<p>注册中心+配置中心，也就是netfix版本中eureka+config+bus。</p>
<p>jar包下载：<a href='https://github.com/alibaba/nacos/releases'>点击跳转</a></p>
<p>官方文档：<a href='https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring%20cloud%20alibaba%20nacos_discovery'>点击跳转</a></p>
<p>nacos官网：<a href='https://nacos.io/zh-cn/'>点击跳转</a></p>
<p>为了和课程保持一致，这里使用1.1.4版本：<a href='https://github.com/alibaba/nacos/releases?expanded=true&page=2&q=1.1.4'>点击跳转</a></p>
<h2 id="p97-nacos安装" tabindex="-1"><a class="header-anchor" href="#p97-nacos安装" aria-hidden="true">#</a> p97-nacos安装</h2>
<p>本地需要java8以上，和maven环境。</p>
<p>解压后运行startup.cmd</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130235202977.png" alt="image-20230130235202977"></p>
<p>访问8848端口：http://localhost:8848/nacos/#/login，默认账号和密码都是nacos</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130235236071.png" alt="image-20230130235236071"></p>
<h2 id="p98-nacos之服务提供者注册" tabindex="-1"><a class="header-anchor" href="#p98-nacos之服务提供者注册" aria-hidden="true">#</a> p98-Nacos之服务提供者注册</h2>
<p>到spring官网找到springcloud alibaba，找到对应版本的参考文档，会有教程。</p>
<p>父工程pom，拷贝一下依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-alibaba-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.1.0.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建module：cloudalibaba-provider-payment9001</p>
<p>pom引入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--SpringCloud ailibaba nacos --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!-- SpringBoot整合Web组件 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!--日常通用jar包配置--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来写配置文件：导入依赖、启动类和配置文件在官网都会有说明和示例：<a href='https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html'>点击跳转</a></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>provider
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span> <span class="token comment">#配置Nacos地址</span>

<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">'*'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentApplication9001</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">PaymentApplication9001</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${server.port}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverPort<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/payment/nacos/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPayment</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"nacos registry, serverPort: "</span><span class="token operator">+</span> serverPort<span class="token operator">+</span><span class="token string">"\t id"</span><span class="token operator">+</span>id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动微服务，到nacos查看：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131001136245.png" alt="image-20230131001136245"></p>
<p>自此，服务提供者注册到nacos完毕，需要演示负载均衡，参照9001在创建一个9002。或者启动时拷贝配置，以9002端口启动。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131001734363.png" alt="image-20230131001734363"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131001750883.png" alt="image-20230131001750883"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131001817034.png" alt="image-20230131001817034"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131001835544.png" alt="image-20230131001835544"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131001847237.png" alt="image-20230131001847237"></p>
<p>这样就可以直接复制一份，以9002端口启动。</p>
<p>到nacos查看：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131001927888.png" alt="image-20230131001927888"></p>
<p>测试业务接口返回的端口：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131002039571.png" alt="image-20230131002039571"></p>
<h2 id="p99-nacos之服务消费者注册和负载均衡" tabindex="-1"><a class="header-anchor" href="#p99-nacos之服务消费者注册和负载均衡" aria-hidden="true">#</a> p99-Nacos之服务消费者注册和负载均衡</h2>
<p>先说，nacos自带负载均衡，为什么？因为spring-cloud-starter-alibaba-nacos-discovery<span style="background-color:pink;">内含netflix-ribbon包</span>。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131003008784.png" alt="image-20230131003008784"></p>
<p>只要有ribbon包，就可以负载均衡了，也可以restTemplate通过服务名调用，负载均衡。</p>
<p>新建Module ：cloudalibaba-consumer-nacos-order83</p>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--SpringCloud ailibaba nacos --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- 引入自己定义的api通用包，可以使用Payment支付Entity --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.lzc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>cloud-api-commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- SpringBoot整合Web组件 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--日常通用jar包配置--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">83</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>order<span class="token punctuation">-</span>consumer
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>

<span class="token comment">#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者) 用来调用是使用@Value读取而已，没什么</span>
<span class="token key atrule">service-url</span><span class="token punctuation">:</span>
  <span class="token key atrule">nacos-user-service</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//nacos<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>provider

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderNacosApplication83</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">OrderNacosApplication83</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>RestTemplate配置负载均衡：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务类：使用RestTemplate通过服务名称(使用配置文件读取了一些而已)调用：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderNacosController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 读服务器url
     */</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${service-url.nacos-user-service}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverURL<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/consumer/payment/nacos/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfo</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 通过服务名调用</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span>serverURL<span class="token operator">+</span><span class="token string">"/payment/nacos/"</span><span class="token operator">+</span>id<span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动3个微服务：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230131004026599.png" alt="image-20230131004026599"></p>
<p>消费者调用生产者，看看是否默认轮询负载均衡：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token keyword">for</span><span class="token variable"><span class="token punctuation">((</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">))</span></span>
<span class="token keyword">do</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">"http://localhost:83/consumer/payment/nacos/1"</span>
<span class="token keyword">done</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-01/image-20230131004623390.png" alt="image-20230131004623390"></p>
<h2 id="p100-nacos注册中心对比提升" tabindex="-1"><a class="header-anchor" href="#p100-nacos注册中心对比提升" aria-hidden="true">#</a> p100-Nacos注册中心对比提升</h2>
<p>Nacos同时支持CP和AP，可以切换。</p>
<p>Nacos与其他注册中心特性对比：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201104214408.png" alt="image-20230201104214408"></p>
<p>Nacos服务发现实例模型：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201104333200.png" alt="image-20230201104333200"></p>
<p>Nacos支持AP和CP模式的切换：</p>
<p>C是所有节点在同一时间看到的数据是<span style="background-color:pink;">一致</span>的，而A的定义是所有的请求都会收到响应(<span style="background-color:pink;">不存在不可用的</span>)。</p>
<p>何时选用何种模式？</p>
<p>—般来说，如果<span style="background-color:pink;">不需要存储服务级别的信息</span>且服务实例是<span style="background-color:pink;">通过nacos-client注册</span>，并能够<span style="background-color:pink;">保持心跳上报</span>，那么就可以选择AP模式。当前主流的服务如Spring cloud和Dubbo服务，都适用于AP模式，AP模式为了服务的可能性而减弱了一致性，因此AP模式下只支持注册临时实例。</p>
<p>如果<span style="background-color:pink;">需要在服务级别编辑或者存储配置信息</span>，那么<span style="background-color:pink;">CP是必须</span>，K8S服务和DNS服务则适用于CP模式。CP模式下则支持注册持久化实例，此时则是以Raft协议为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错误。</p>
<p>切换命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> PUT <span class="token string">'localhost:8848/nacos/v1/ns/operator/switches?entry=serverMode&amp;value=CP'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="p101-nacos之服务配置中心" tabindex="-1"><a class="header-anchor" href="#p101-nacos之服务配置中心" aria-hidden="true">#</a> p101-Nacos之服务配置中心</h2>
<p>Nacos替代了Spring Cloud Config配置中心。</p>
<p>在使用Spring Cloud Config时，是把配置放在git仓库中，使用config+bus实现定点刷新。</p>
<p>有了nacos可以直接把配置写在nacos中：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201150213750.png" alt="image-20230201150213750"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201150225553.png" alt="image-20230201150225553"></p>
<p>基础配置：</p>
<p>cloudalibaba-config-nacos-client3377</p>
<p>依赖：增加了spring-cloud-starter-alibaba-nacos-config依赖。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--nacos-config--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-config<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--nacos-discovery--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--web + actuator--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--一般基础配置--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Nacos同springcloud-config一样，在项目初始化时，要保证先从配置中心进行配置拉取，拉取配置之后，才能保证项目的正常启动、先有共性，再有个性。</p>
<p>bootstrap.yml:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># nacos配置</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3377</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>config<span class="token punctuation">-</span>client
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span> <span class="token comment">#Nacos服务注册中心地址</span>
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span> <span class="token comment">#Nacos作为配置中心地址</span>
        <span class="token key atrule">file-extension</span><span class="token punctuation">:</span> yaml <span class="token comment">#指定yaml格式的配置</span>
<span class="token comment"># ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}</span>
<span class="token comment"># nacos-config-client-dev.yaml</span>

<span class="token comment"># nacos-config-client-test.yaml   ----> config.info</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>application.yml:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev <span class="token comment"># 表示开发环境</span>
    <span class="token comment">#active: test # 表示测试环境</span>
    <span class="token comment">#active: info</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 配置客户端控制器
 *
 * @RefreshScope   支持Nacos的动态刷新功能。
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/01
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RefreshScope</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigClientController</span>
<span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${config.info}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> configInfo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/config/info"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConfigInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> configInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NacosConfigClientApplication3377</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">NacosConfigClientApplication3377</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到此为止，还差一步，去nacos上配置，首先要设置dataId，这个是有讲究的，不是乱来的。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201154445186.png" alt="image-20230201154445186"></p>
<p>官网文档：<a href='https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html'>点击跳转</a></p>
<p>在 Nacos Spring Cloud中,dataId的完整格式如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$<span class="token punctuation">{</span>prefix<span class="token punctuation">}</span><span class="token punctuation">-</span>$<span class="token punctuation">{</span>spring<span class="token punctuation">-</span>profile.active<span class="token punctuation">}</span>.$<span class="token punctuation">{</span>file<span class="token punctuation">-</span>extension<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>prefix</code> 默认为 <code v-pre>spring.application.name</code> 的值，也可以通过配置项 <code v-pre>spring.cloud.nacos.config.prefix</code>来配置。</li>
<li><code v-pre>spring.profiles.active</code> 即为当前环境对应的 profile，详情可以参考 <a href="https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html#boot-features-profiles" target="_blank" rel="noopener noreferrer">Spring Boot文档<ExternalLinkIcon/></a>。 <strong>注意：当 <code v-pre>spring.profiles.active</code> 为空时(<span style="background-color:pink;">配置时不要让他为空，不然会有各种问题</span>)，对应的连接符 <code v-pre>-</code> 也将不存在，dataId 的拼接格式变成 <code v-pre>${prefix}.${file-extension}</code></strong></li>
<li><code v-pre>file-exetension</code> 为配置内容的数据格式，可以通过配置项 <code v-pre>spring.cloud.nacos.config.file-extension</code> 来配置。</li>
</ul>
<p>小结：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201172736498.png" alt="image-20230201172736498"></p>
<p>根据上面bootstrap可以确定，dataId为:<code v-pre>nacos-config-client-dev.yaml</code></p>
<p>创建配置：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201172345150.png" alt="image-20230201172345150"></p>
<p>要先配置，不然启动不了，因为在application.yml和bootstrap.yml中都没有配置config.info，启动后，调用接口：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201173004835.png" alt="image-20230201173004835"></p>
<p>当我们在nacos中修改配置后，会立马生效，不需要手动进行刷新，nacos的配置中心是自动动态刷新的。</p>
<p>自己实操时的一些思考：</p>
<p>当application.yml和bootstrap.yml同时配置config.info时application覆盖了bootstrap，在这基础上nacos再配置一遍config.info，nacos又覆盖了一次，采用了nacos上的配置，这是为什么？还有，我三个一起配好，再启动，生效的也是nacos上的，又是为什么？</p>
<p>益哥的解释：<a href='https://www.cnblogs.com/wudeyun/p/14798361.html'>点击跳转</a></p>
<p>nacos架构与原理：<a href='https://developer.aliyun.com/ebook/36?spm=a2c6h.20345107.ebook-index.18.152c2984fsi5ST'>点击跳转</a></p>
<p>我的理解：application和bootstrap同时配置某个属性，后加载的覆盖先加载的，nacos再配置，会通过反射直接修改ioc中的保存配置信息的Bean，所以nacos每次修改都会生效，实现动态刷新。</p>
<h2 id="p102-nacos之命名空间、分组和dataid三者的关系" tabindex="-1"><a class="header-anchor" href="#p102-nacos之命名空间、分组和dataid三者的关系" aria-hidden="true">#</a> p102-Nacos之命名空间、分组和DataId三者的关系</h2>
<p>问题 - 多环境多项目管理</p>
<p>问题1:</p>
<p>实际开发中，通常一个系统会准备</p>
<ul>
<li>dev开发环境</li>
<li>test测试环境</li>
<li>prod生产环境。
如何保证指定环境启动时服务能正确读取到Nacos上相应环境的配置文件呢?</li>
</ul>
<p>问题2:</p>
<p>一个大型分布式微服务系统会有很多微服务子项目，每个微服务项目又都会有相应的开发环境、测试环境、预发环境、正式环境…那怎么对这些微服务配置进行管理呢?</p>
<p>在图形界面可以看到，配置列表中，可以按命名空间进行区分，命名空间里面又会有不同组的配置，最后再是Data Id。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201174946415.png" alt="image-20230201174946415"></p>
<p>nacos默认有命名空间public作为保留空间：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201175154563.png" alt="image-20230201175154563"></p>
<p>Namespace+Group+Data lD三者关系？为什么这么设计？</p>
<p><img src="http://www.iocaop.com/images/2023-02/60712abd615dd86ac6c119bf132a28d6.png" alt="img"></p>
<p>默认情况：Namespace=public，Group=DEFAULT_GROUP，默认Cluster是DEFAULT</p>
<ul>
<li>Namespace主要用来实现隔离不同的环境。</li>
<li>Group可以把不同的微服务划分到同一个分组里面去</li>
<li>Service就是微服务:一个Service可以包含多个Cluster (集群)</li>
</ul>
<p>比方说为了容灾，将Service微服务分别部署在了杭州机房和广州机房，这时就可以给杭州机房的Service微服务起一个集群名称(HZ) ，给广州机房的Service微服务起一个集群名称(GZ)，还可以尽量让同一个机房的微服务互相调用，以提升性能。</p>
<p>区分调度，划片，提升效率。</p>
<h2 id="p103-nacos之dataid配置" tabindex="-1"><a class="header-anchor" href="#p103-nacos之dataid配置" aria-hidden="true">#</a> p103-Nacos之DataId配置</h2>
<p>DataId的作用：指定<code v-pre>spring.profile.active</code>和配置文件的DatalD来使不同环境下<span style="background-color:pink;">读取不同的配置</span>，如dev环境启动（spring.profile.active=dev）就读取nacos-config-client-dev.yaml，test环境启动(spring.profile.active=test)就读取nacos-config-client-test.yaml</p>
<p>默认空间+默认分组+新建dev和test两个DatalD</p>
<p>新建两个配置文件：</p>
<p>nacos-config-client-dev.yaml：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201180808060.png" alt="image-20230201180808060"></p>
<p>nacos-config-client-test.yaml：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201180919371.png" alt="image-20230201180919371"></p>
<p>当我们以dev启动，访问接口，读取到是：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201181020636.png" alt="image-20230201181020636"></p>
<p>当我们修改配置文件，以test启动，读取到是：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201181049631.png" alt="image-20230201181049631"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230201181119862.png" alt="image-20230201181119862"></p>
<h2 id="p104-nacos之group分组方案" tabindex="-1"><a class="header-anchor" href="#p104-nacos之group分组方案" aria-hidden="true">#</a> p104-Nacos之Group分组方案</h2>
<p>新建两个配置文件，Data Id相同，但是Group不同，内容也不同：</p>
<p>第一个nacos-config-client-info.yaml分组为：DEV_GROUP，</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202101838210.png" alt="image-20230202101838210"></p>
<p>第二个nacos-config-client-info.yaml，分组为TEST_GROUP</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202101818606.png" alt="image-20230202101818606"></p>
<p>现在修改spring.profile.active：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202102043541.png" alt="image-20230202102043541"></p>
<p>给nacos配置增加分组配置：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202102134650.png" alt="image-20230202102134650"></p>
<p>启动测试：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202102206095.png" alt="image-20230202102206095"></p>
<p>修改分组：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202102230913.png" alt="image-20230202102230913"></p>
<p>启动测试：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202102243549.png" alt="image-20230202102243549"></p>
<p>结论：相同Data Id的配置，可以在不同的Group中，根据具体服务在配置nacos时的Group来拉取不同的配置。</p>
<h2 id="p105-nacos之namespace命名空间方案" tabindex="-1"><a class="header-anchor" href="#p105-nacos之namespace命名空间方案" aria-hidden="true">#</a> p105-Nacos之Namespace命名空间方案</h2>
<p>新建命名空间：会自动生成 命名空间ID</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202104424501.png" alt="image-20230202104424501"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202104439708.png" alt="image-20230202104439708"></p>
<p>接下来就到配置文件配置需要使用的命名空间：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202104803809.png" alt="image-20230202104803809"></p>
<p>启动环境改回dev：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202104830523.png" alt="image-20230202104830523"></p>
<p>我们在dev的命名空间下创建配置nacos-config-client-dev.yaml，三个分组为DEFAULT_GROUP，DEV_GROUP，TEST_GROUP</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202105200826.png" alt="image-20230202105200826"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202110004612.png" alt="image-20230202110004612"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202111211894.png" alt="image-20230202111211894"></p>
<p>目前，profile为dev，分组为TEST_GROUP，命名空间为dev，启动项目测试：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202111252573.png" alt="image-20230202111252573"></p>
<h2 id="p106-nacos集群架构说明" tabindex="-1"><a class="header-anchor" href="#p106-nacos集群架构说明" aria-hidden="true">#</a> p106-Nacos集群架构说明</h2>
<p>在实际生产环境，不可能只有一个nacos服务，会出现单点故障，这一个nacos挂了，影响整个系统运行，所以nacos要集群部署。</p>
<p>集群部署官方文档：<a href='https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html'>点击跳转</a>，<a href='https://nacos.io/zh-cn/docs/deployment.html'>点击跳转</a></p>
<p>官网的图比较抽象，阳哥画的图：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202155029507.png" alt="image-20230202155029507"></p>
<p>图中可以看出，我们需要mysql数据库来持久化nacos中的配置和数据，并且mysql是高可用的。</p>
<p>那为什么现在没有配置mysql，重启nacos数据和配置不会丢失呢？</p>
<p>因为nacos嵌入了数据库Derby。</p>
<p>那为什么还要mysql？</p>
<p>因为图中是集群部署，每个nacos都内嵌一个数据库，那么集群的数据不一致，为了一致，所有nacos节点都应该使用同一个数据库(MySql)。</p>
<h2 id="p107-nacos持久化切换配置" tabindex="-1"><a class="header-anchor" href="#p107-nacos持久化切换配置" aria-hidden="true">#</a> p107-Nacos持久化切换配置</h2>
<p>Nacos默认的数据库是derby，从pom中可以看出：</p>
<p>Nacos的pom文件：<a href='https://github.com/alibaba/nacos/blob/develop/pom.xml'>点击跳转</a></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202160959679.png" alt="image-20230202160959679"></p>
<p>现在来切换数据库为mysql，derby到mysql切换配置步骤：</p>
<ol>
<li>
<p>nacos-server-1.1.4\nacos\conf录下找到nacos-mysql.sql文件，到数据库执行脚本。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202162220870.png" alt="image-20230202162220870"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202162200633.png" alt="image-20230202162200633"></p>
</li>
<li>
<p>nacos-server-1.1.4\nacos\conf目录下找到application.properties，添加以下配置（按需修改对应值）。</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">nacos.istio.mcp.server.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>

<span class="token key attr-name">spring.datasource.platform</span><span class="token punctuation">=</span><span class="token value attr-value">mysql</span>

<span class="token key attr-name">db.num</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">db.url.0</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://www.iocaop.com:3306/nacos?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true</span>
<span class="token key attr-name">db.user</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">db.password</span><span class="token punctuation">=</span><span class="token value attr-value">911823</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>改完以后启动nacos，原来的配置没有了，现在随便创建一个配置，然后看数据库有没有保存：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202162438755.png" alt="image-20230202162438755"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202162459696.png" alt="image-20230202162459696"></p>
<h2 id="p108-p110-nacos之linux版本安装和集群部署" tabindex="-1"><a class="header-anchor" href="#p108-p110-nacos之linux版本安装和集群部署" aria-hidden="true">#</a> p108~p110-Nacos之linux版本安装和集群部署</h2>
<p>本次实验，预计需要1个Nginx+3个Nacos节点+1个MySQL。</p>
<p>这里不做nginx多机配置、mysql的主从复制，重点学习nacos集群的配置。</p>
<p>下载linux版本Nacos(1.14)：<a href="https://github.com/alibaba/nacos/releases/download/1.1.4/nacos-server-1.1.4.tar.gz" target="_blank" rel="noopener noreferrer">nacos-server-1.1.4.tar.gz<ExternalLinkIcon/></a>，<a href='https://github.com/alibaba/nacos/releases/tag/1.1.4'>点击跳转</a></p>
<p>上传到linux中，解压：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zvxf</span> nacos-server-1.1.4.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将解压后的文件夹拷贝：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cp</span>  <span class="token parameter variable">-r</span> ./nacos /mynacos/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入bin文件夹，运行<code v-pre>startup.sh</code>即可启动。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202172419715.png" alt="image-20230202172419715"></p>
<p>先用单机模式试一下能不能运行，确保环境没问题后，再配置集群。</p>
<p>修改启动参数和nacos模式问单机模式：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202180823610.png" alt="image-20230202180823610"></p>
<p>可以成功启动：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202180857463.png" alt="image-20230202180857463"></p>
<p>按照上一节课的方式，切换持久化方式为mysql，配置好数据源。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230202181855680.png" alt="image-20230202181855680"></p>
<p>还需要进行cluster.conf的配置：</p>
<p>进入conf文件夹，复制配置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cp</span> cluster.conf.example cluster.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在cluster.conf中进行配置，表示哪些节点是属于一个集群的。</p>
<p>需要注意在配置时不能使用<code v-pre>127.0.0.1</code>，需要执行命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">hostname</span> <span class="token parameter variable">-i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-02/image-20230202182647047.png" alt="image-20230202182647047"></p>
<p>修改cluster.conf为如下：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230206105850013.png" alt="image-20230206105850013"></p>
<p>接下来要手动修改启动脚本<code v-pre>startup.sh</code>，使它能够接收参数(启动端口)：</p>
<p>需要修改的地方：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230203103631612.png" alt="image-20230203103631612"></p>
<p>可以看出，这是接收参数的地方，我们手动加一个参数p，用来指定启动端口号：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230203104133106.png" alt="image-20230203104133106"></p>
<p>增加jvm启动参数：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230203104230548.png" alt="image-20230203104230548"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230203104339520.png" alt="image-20230203104339520"></p>
<p>再修改nacos启动模式为cluster：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230203110325400.png" alt="image-20230203110325400"></p>
<p>保存以后，启动三个nacos节点：</p>
<p>云主机配置不够，这里使用wsl来进行测试：</p>
<p>来配置一下nginx，用来做负载均衡：</p>
<p>首先增加一个server块：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">1111</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> nacos-cluster</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://cluster</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增加upstream：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code>   <span class="token directive"><span class="token keyword">upstream</span> cluster</span><span class="token punctuation">{</span>
   server 127.0.0.1:7777
   server 127.0.0.1:8888
   server 127.0.0.1:9999
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动7777、8888、9999三个端口的nacos集群：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /nacos/bin
./startup.sh <span class="token parameter variable">-p</span> <span class="token number">7777</span>
./startup.sh <span class="token parameter variable">-p</span> <span class="token number">8888</span>
./startup.sh <span class="token parameter variable">-p</span> <span class="token number">9999</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用网页访问这三个端口的nacos网页管理端，都没问题，可以看到：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230206110711009.png" alt="image-20230206110711009"></p>
<p>并且这个3个端口的nacos配置是一样的，因为使用的是同一个mysql数据库。</p>
<p>并且nginx端口1111，也实现了负载均衡：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230206110828567.png" alt="image-20230206110828567"></p>
<p>并且，在微服务配置中，可以直接写nginx的地址，nginx会自动转发到集群中的节点：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230206111709894.png" alt="image-20230206111709894"></p>
<h2 id="p111-sentinel是什么" tabindex="-1"><a class="header-anchor" href="#p111-sentinel是什么" aria-hidden="true">#</a> p111-Sentinel是什么</h2>
<p>仓库地址：<a href='https://github.com/alibaba/Sentinel'>点击跳转</a></p>
<p>中文文档：<a href='https://sentinelguard.io/zh-cn/docs/introduction.html'>点击跳转</a></p>
<p>介绍文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D#sentinel-%E6%98%AF%E4%BB%80%E4%B9%88'>点击跳转</a></p>
<p>其实就是阿里版的Hystrix，为什么不用Hystrix了？</p>
<ul>
<li>需要我们自己搭建web管理</li>
<li>没有一套web界面可以给我们进行更加细粒度化的配置，如流控、速率控制、服务熔断、服务降级等。</li>
</ul>
<p>所以有了sentinel，我们以前Eureka也需要自己起一个服务，Sentinel不需要，单独一个组件独立出来，直接界面化的细粒度统一配置。流控、压力等配置，都可以写在代码里面，本次还是学习配置和注解的方式。</p>
<h2 id="p112-sentinel下载安装运行" tabindex="-1"><a class="header-anchor" href="#p112-sentinel下载安装运行" aria-hidden="true">#</a> p112-Sentinel下载安装运行</h2>
<p>下载：<a href='https://github.com/alibaba/Sentinel/releases'>点击跳转</a></p>
<p>文档：<a href='https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_sentinel'>点击跳转</a></p>
<p>服务使用中的各种问题：</p>
<ul>
<li>服务雪崩</li>
<li>服务降级</li>
<li>服务熔断</li>
<li>服务限流</li>
</ul>
<p>两部分组成，一个前台界面，一个后台：</p>
<ul>
<li>核心库（Java 客户端）不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。</li>
<li>控制台（Dashboard）基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。</li>
</ul>
<p>运行：直接跑jar包</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207225936147.png" alt="image-20230207225936147"></p>
<p>进入界面：用户名和密码都是sentinel</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207230004623.png" alt="image-20230207230004623"></p>
<h2 id="p113-sentinel初始化监控" tabindex="-1"><a class="header-anchor" href="#p113-sentinel初始化监控" aria-hidden="true">#</a> p113-Sentinel初始化监控</h2>
<p>新建module：cloudalibaba-sentinel-service8401</p>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--SpringCloud ailibaba nacos --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.csp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sentinel-datasource-nacos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--SpringCloud ailibaba sentinel --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-sentinel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一些通用的依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--openfeign--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!-- SpringBoot整合Web组件+actuator --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!--日常通用jar包配置--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.6.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8401</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloudalibaba<span class="token punctuation">-</span>sentinel<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">1111</span> <span class="token comment">#Nacos服务注册中心地址</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8080</span> <span class="token comment">#配置Sentinel dashboard地址</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8719</span>

<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">'*'</span>

<span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 激活Sentinel对Feign的支持</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SentinelApplication8401</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SentinelApplication8401</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写个简单的controller：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 流量限制控制器
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/07
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlowLimitController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testA"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testA</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"------testA"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testB"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"\t"</span><span class="token operator">+</span><span class="token string">"...testB"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"------testB"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成，开始启动8401微服务，到sentinel控制台和nacos控制台查看是否注册成功：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207231442228.png" alt="image-20230207231442228"></p>
<p>sentinel刷新后并没有显示服务，为什么？因为是懒加载的，需要手动访问服务的某个接口。</p>
<p>访问一下我们的业务接口，再刷新控制台，就有了：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207231604703.png" alt="image-20230207231604703"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207231616829.png" alt="image-20230207231616829"></p>
<p>我们疯狂刷新访问一下接口，可以看到实时监控在变化：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207231728712.png" alt="image-20230207231728712"></p>
<h2 id="p114-sentinel流控规则简介" tabindex="-1"><a class="header-anchor" href="#p114-sentinel流控规则简介" aria-hidden="true">#</a> p114-Sentinel流控规则简介</h2>
<p>当我们访问了接口，在控制台的簇点链路中可以看到：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207234258807.png" alt="image-20230207234258807"></p>
<p>流控规则：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207234455270.png" alt="image-20230207234455270"></p>
<p>进一步说明：</p>
<ul>
<li>资源名：唯一名称，默认请求路径。</li>
<li>针对来源：Sentinel可以针对调用者进行限流，填写微服务名，默认default（不区分来源）。</li>
<li>阈值类型/单机阈值：
<ul>
<li>QPS(<span style="background-color:pink;">每秒钟的请求数量</span>)︰当调用该API的QPS达到阈值的时候，进行限流。</li>
<li>线程数：当调用<span style="background-color:pink;">该API的线程数</span>达到阈值的时候，进行限流。</li>
</ul>
</li>
<li>是否集群：不需要集群。</li>
<li>流控模式：
<ul>
<li>
<p>直接：API达到限流条件时，直接限流。</p>
</li>
<li>
<p>关联：当<span style="background-color:pink;">关联的资源达到阈值</span>时，就<span style="background-color:pink;">限流自己</span>。</p>
</li>
<li>
<p>链路：只记录指定链路上的流量（指定<span style="background-color:pink;">资源从入口</span>资源进来的流量，如果达到阈值，就进行限流)【API级别的针对来源】。</p>
</li>
</ul>
</li>
<li>流控效果：
<ul>
<li>快速失败：直接失败，抛异常。</li>
<li>Warm up：根据Code Factor（冷加载因子，默认3）的值，从阈值/codeFactor，经过预热时长，才达到设置的QPS阈值。</li>
<li>排队等待：匀速排队，让请求以匀速的速度通过，阈值类型必须设置为QPS，否则无效。</li>
</ul>
</li>
</ul>
<h2 id="p115-sentinel流控-qps直接失败" tabindex="-1"><a class="header-anchor" href="#p115-sentinel流控-qps直接失败" aria-hidden="true">#</a> p115-Sentinel流控-QPS直接失败</h2>
<p>直接到控制台进行添加：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207235452034.png" alt="image-20230207235452034"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207235509440.png" alt="image-20230207235509440"></p>
<p>疯狂刷新访问：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230207235545628.png" alt="image-20230207235545628"></p>
<p>失败了，很方便，不需要重启服务之类的，Hystrix修改或新增后需要重启服务。</p>
<p>思考：直接调用的是默认报错信息，技术方面ok，那么我们是否应该有自己的后续处理(类似有Hystrix的Fallback？有的，后续学习)？</p>
<h2 id="p116-sentinel-线程数直接失败" tabindex="-1"><a class="header-anchor" href="#p116-sentinel-线程数直接失败" aria-hidden="true">#</a> p116-Sentinel-线程数直接失败</h2>
<p>把原来的QPS流控删掉，添加一个线程流控：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208000503720.png" alt="image-20230208000503720"></p>
<p>到页面疯狂刷新访问接口，无论怎么刷新，都不会失败：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208000540362.png" alt="image-20230208000540362"></p>
<p>先搞清楚QPS和线程的区别：</p>
<p>QPS流控是一大堆请求访问，当请求数到达某个值就限流，而线程流控是不管多少请求访问，只会进入一个请求，再有请求进入就会失败。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208001000110.png" alt="image-20230208001000110"></p>
<p>因为我们这个接口响应很快，想要演示线程流控，需要添加延迟：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testB"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">800</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"\t"</span><span class="token operator">+</span><span class="token string">"...testB"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"------testB"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了方便测试，我们再用脚本持续访问(为了方便演示，把睡眠调到2秒，只要保证1秒内多个线程进入即可)，然后再到浏览器访问查看效果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token keyword">for</span><span class="token variable"><span class="token punctuation">((</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">))</span></span>
<span class="token keyword">do</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">"http://localhost:8401/testB"</span>
<span class="token keyword">done</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-02/image-20230208002013034.png" alt="image-20230208002013034"></p>
<h2 id="p117-sentinel流控-关联-链路流控待完成" tabindex="-1"><a class="header-anchor" href="#p117-sentinel流控-关联-链路流控待完成" aria-hidden="true">#</a> p117-Sentinel流控-关联(链路流控待完成)</h2>
<p>当关联的资源达到阈值时，就限流自己。</p>
<p>目前我们有两个接口，testA和testB，我们让他俩关联，当A关联的资源B达到阈值后，就限流A自己。</p>
<p>有什么用？在分布式链路调用当中，服务是会互相影响的，所以关联流控就发挥作用了。</p>
<p>在实际场景中，比如支付接口达到阈值，就限流下单接口。</p>
<p>直接在Sentinel控制台进行添加流控：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208161303065.png" alt="image-20230208161303065"></p>
<p>postman接口保存到collection中：<img src="http://www.iocaop.com/images/2023-02/image-20230208161952111.png" alt="image-20230208161952111"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208162414088.png" alt="image-20230208162414088"></p>
<p>启动20个线程，每间隔0.3秒就访问一次接口：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208162444063.png" alt="image-20230208162444063"></p>
<p>我们首先访问一次testA，没问题：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208162657901.png" alt="image-20230208162657901"></p>
<p>使用postman，在这20个线程访问testB期间，我们来访问testA：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208162748489.png" alt="image-20230208162748489"></p>
<p>可以看到，关联流控起作用了。</p>
<p>作业：链路：只记录指定链路上的流量（指定资源从入口资源进来的流量，如果达到阈值，就进行限流)【API级别的针对来源】</p>
<p>新建3个module：cloudalibaba-sentinel-link-service8411，cloudalibaba-sentinel-link-service8412，cloudalibaba-sentinel-link-service8413。</p>
<p>调用关系：8411-&gt;8413  ，8412-&gt;8413</p>
<p>依赖(三个都一样)：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--SpringCloud ailibaba nacos --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- SpringBoot整合Web组件 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置类（三个都一样，端口号和服务名称不一样）：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8412</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> sentinel<span class="token punctuation">-</span>link<span class="token punctuation">-</span>service8412
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">1111</span> <span class="token comment">#配置Nacos地址</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8080</span> <span class="token comment">#默认端口8719 如果被占用会依次+1扫描，直到找到没被占用的</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8719</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">'*'</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SentinelLinkApplication8411</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SentinelLinkApplication8411</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大致一样，feign调用：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"sentinel-link-service8413"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FeignOf8413</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 链路调用8413 
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/C"</span><span class="token punctuation">,</span>method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span> <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三个项目启动后，nacos注册成功，feign调用成功：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208180309076.png" alt="image-20230208180309076"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208180327042.png" alt="image-20230208180327042"></p>
<p>简单的说，就是A-&gt;C，B-&gt;C，先测试一下，是否可以调用成功：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208223407869.png" alt="image-20230208223407869"></p>
<p>可以调用成功，给A-&gt;C设置链路流控：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230208223714209.png" alt="image-20230208223714209"></p>
<p>这时候，我们疯狂刷新A-&gt;C：</p>
<p>不生效，先放一放，对链路流控理解不够。后续单独学习Sentinel。</p>
<p>其他网课教程：在一个服务中，使用注解<code v-pre>@SentinelResource</code>标记资源，试一下：</p>
<p>重新创建module：cloudalibaba-sentinel-link-service8414</p>
<p>配置和其他三个一样，只是不进行远程调用：</p>
<p>两个接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">TestService</span> testService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/test1"</span><span class="token punctuation">,</span> method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> testService<span class="token punctuation">.</span><span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/test2"</span><span class="token punctuation">,</span> method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> testService<span class="token punctuation">.</span><span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层使用注解标记资源：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">TestService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span><span class="token string">"link"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"调用成功"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-02/image-20230208233429754.png" alt="image-20230208233429754"></p>
<p>可以访问成功，给资源加链路流控：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209000327678.png" alt="image-20230209000327678"></p>
<p>参考了文章：<a href='https://blog.csdn.net/qq_31278353/article/details/124454656'>点击跳转</a></p>
<p>依然没有实现效果，可能是版本原因。</p>
<h2 id="p118-sentinel流控-预热" tabindex="-1"><a class="header-anchor" href="#p118-sentinel流控-预热" aria-hidden="true">#</a> p118-Sentinel流控-预热</h2>
<p>学习完流控规则，来学习一下流控效果：</p>
<ul>
<li>
<p>直接-&gt;快速失败(默认的流控处理)：直接失败，抛出异常，报Blocked by Sentinel (flow limiting)</p>
</li>
<li>
<p>预热：</p>
<ul>
<li>
<p>公式：阈值/coldFactor，经过预热时长后才会达到阈值，默认 <code v-pre>coldFactor</code> 为 3，即请求 QPS 从 <code v-pre>threshold / 3</code> 开始，经预热时长逐渐升至设定的 QPS 阈值。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209114012073.png" alt="image-20230209114012073"></p>
</li>
<li>
<p>Warm Up：</p>
<p>预热/冷启动方式。当系统<span style="background-color:pink;">长期处于低水位</span>的情况下，当<span style="background-color:pink;">流量突然增加</span>时，直接把系统拉升到高水位可能瞬间把系统压垮。通过&quot;冷启动&quot;，让通过的<span style="background-color:pink;">流量缓慢增加</span>，在一定时间内逐渐增加到阈值上限，给冷系统一个预热的时间，避免冷系统被压垮。参考文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E9%99%90%E6%B5%81---%E5%86%B7%E5%90%AF%E5%8A%A8'>点击跳转</a>，demo：<a href='https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/flow/WarmUpFlowDemo.java'>点击跳转</a></p>
<p><img src="http://www.iocaop.com/images/2023-02/68292392-b5b0aa00-00c6-11ea-86e1-ecacff8aab51.png" alt="image"></p>
</li>
</ul>
</li>
</ul>
<p>简单理解：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209114629701.png" alt="image-20230209114629701"></p>
<p>如图，我们设置好了阈值是10，当还属于预热时长5秒内时，阈值会是10/3=3，过完5秒，阈值才会是10。</p>
<p>测试一下：</p>
<p>刚开始会失败，后面慢慢得久能扛得住了，说明预热生效了。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209115254293.png" alt="image-20230209115254293"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209115307316.png" alt="image-20230209115307316"></p>
<p>运用：秒杀系统，开启瞬间会有很多流量进来，可能把系统打死，预热方式就是保护系统，慢慢的把流量放进来，慢慢把阈值增长到设置的阈值。</p>
<h2 id="p119-sentinel流控-排队等待" tabindex="-1"><a class="header-anchor" href="#p119-sentinel流控-排队等待" aria-hidden="true">#</a> p119-Sentinel流控-排队等待</h2>
<p>简单的说，假设服务器只允许1秒钟处理一个请求，那其他的请求就等待，在等待的请求就可能出现超时重试。</p>
<p>匀速排队，让以请求均匀的速度通过，<span style="background-color:pink;">阈值必须设置成QPS</span>，否则无效。</p>
<h4 id="匀速排队" tabindex="-1"><a class="header-anchor" href="#匀速排队" aria-hidden="true">#</a> 匀速排队</h4>
<p>匀速排队（<code v-pre>RuleConstant.CONTROL_BEHAVIOR_RATE_LIMITER</code>）方式会严格控制请求通过的间隔时间，也即是<span style="background-color:pink;">让请求以均匀的速度通过</span>，对应的是漏桶算法。详细文档可以参考 <a href="https://github.com/alibaba/Sentinel/wiki/%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6-%E5%8C%80%E9%80%9F%E6%8E%92%E9%98%9F%E6%A8%A1%E5%BC%8F" target="_blank" rel="noopener noreferrer">流量控制 - 匀速器模式<ExternalLinkIcon/></a>，具体的例子可以参见 <a href="https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/flow/PaceFlowDemo.java" target="_blank" rel="noopener noreferrer">PaceFlowDemo<ExternalLinkIcon/></a>。</p>
<p>该方式的作用如下图所示：</p>
<p><img src="http://www.iocaop.com/images/2023-02/68292442-d4af3c00-00c6-11ea-8251-d0977366d9b4.png" alt="image"></p>
<p>这种方式主要用于处理<span style="background-color:pink;">间隔性突发的流量</span>，例如消息队列。想象一下这样的场景，<span style="background-color:pink;">在某一秒有大量的请求到来，而接下来的几秒则处于空闲状态，我们希望系统能够在接下来的空闲期间逐渐处理这些请求，而不是在第一秒直接拒绝多余的请求</span>。</p>
<blockquote>
<p>注意：匀速排队模式暂时不支持 QPS &gt; 1000 的场景。</p>
</blockquote>
<p>即不会将服务器冲垮，也不会将请求拒绝。</p>
<p>来个demo：</p>
<p>还是8401微服务，接口打印信息：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testB"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
<span class="token comment">//        Thread.sleep(2000);</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"\t"</span><span class="token operator">+</span><span class="token string">"...testB"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"------testB"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到Sentinel控制台设置：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209151531012.png" alt="image-20230209151531012"></p>
<p>1秒钟只能通过一个请求，用postman，发送10个请求，不延迟，看控制台打印的信息：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209152826128.png" alt="image-20230209152826128"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209152858651.png" alt="image-20230209152858651"></p>
<p>可以看到，1秒钟只能通过1个请求，其余都在等待，并没有被拒绝。</p>
<h2 id="p120-sentinel降级简介" tabindex="-1"><a class="header-anchor" href="#p120-sentinel降级简介" aria-hidden="true">#</a> p120-Sentinel降级简介</h2>
<p>就是熔断降级，官网文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E7%86%94%E6%96%AD%E9%99%8D%E7%BA%A7'>点击跳转</a></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209155345363.png" alt="image-20230209155345363"></p>
<ul>
<li>
<p>RT（平均响应时间，秒级）</p>
<ul>
<li>
<p><span style="background-color:pink;">平均响应时间超出阈值</span> 且 在<span style="background-color:pink;">时间窗口内通过的请求</span>&gt;=5，两个条件同时满足后触发降级。</p>
</li>
<li>
<p>窗口期过后关闭断路器。</p>
</li>
<li>
<p>RT最大4900（更大的需要通过-Dcsp.sentinel.statistic.max.rt=XXXX才能生效）。</p>
</li>
</ul>
</li>
<li>
<p>异常比例（秒级）</p>
<ul>
<li>QPS &gt;= 5且<span style="background-color:pink;">异常比例（秒级统计）超过阈值</span>时，触发降级;<span style="background-color:pink;">时间窗口</span>结束后，关闭降级 。
异常数(分钟级)</li>
</ul>
</li>
<li>
<p><span style="background-color:pink;">异常数</span>(分钟统计）超过阈值时，触发降级;<span style="background-color:pink;">时间窗口</span>结束后，关闭降级</p>
</li>
</ul>
<p>Sentinel熔断降级会在调用链路中某个资源出现<span style="background-color:pink;">不稳定状态时</span>（例如调用超时或异常比例升高)，对这个资源的调用<span style="background-color:pink;">进行限制</span>，<span style="background-color:pink;">让请求快速失败</span>，避免影响到其它的资源而导致<span style="background-color:pink;">级联错误</span>。</p>
<p>当资源被降级后，在接下来的降级时间窗口之内，对该资源的调用都自动熔断（默认行为是抛出 DegradeException）。</p>
<p>Sentinei的断路器是没有类似Hystrix半开状态的。(Sentinei 1.8.0 已有半开状态)</p>
<p>半开的状态系统自动去检测是否请求有异常，没有异常就关闭断路器恢复使用，有异常则继续打开断路器不可用。</p>
<p>Hystrix笔记：<a href='http://www.iocaop.com/posts/2022-my/%E5%BE%AE%E6%9C%8D%E5%8A%A1/cloud%E7%AC%94%E8%AE%B0.html#p61-62-hystrix%E4%B9%8B%E6%9C%8D%E5%8A%A1%E7%86%94%E6%96%AD%E6%80%BB%E7%BB%93'>点击跳转</a></p>
<h2 id="p121-sentinel降级-rt" tabindex="-1"><a class="header-anchor" href="#p121-sentinel降级-rt" aria-hidden="true">#</a> p121-Sentinel降级-RT</h2>
<p>1.8版本之后，降级策略有些不一样：<a href='https://blog.csdn.net/cdxsza/article/details/120777343'>点击跳转</a>，RT平均响应时间被替换成了慢调用比例，这里先学习RT</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209155345363.png" alt="image-20230209155345363"></p>
<p>为了学习RT，我们下载1.7版本的Sentinel：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209165107987.png" alt="image-20230209165107987"></p>
<blockquote>
<p>解释：平均响应时间(DEGRADE_GRADE_RT)：当1s内持续进入5个请求，<span style="background-color:pink;">对应时刻</span>的平均响应时间（秒级）均超过阈值（ count，以ms为单位），那么在<span style="background-color:pink;">接下的时间窗口</span>（DegradeRule中的timeWindow，以s为单位）之内，对这个方法的调用都会自动地熔断(抛出DegradeException )。注意Sentinel 默认统计的RT上限是4900 ms，超出此阈值的都会算作4900ms，若需要变更此上限可以通过启动配置项-Dcsp.sentinel.statistic.max.rt=xxx来配置。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209171011071.png" alt="image-20230209171011071"></p>
<p>来测试，新增一个接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testD"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testD</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"testD 测试RT"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"testD"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增降级规则：</p>
<p>表示1秒中内，进来的所有请求的平均响应时间应该小于200ms，否则就会降级。直到下一个时间窗口，且平均响应时间能达到要求，才会恢复。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209171525828.png" alt="image-20230209171525828"></p>
<p>新增后，使用Jmeter进行压测：</p>
<p>线程组配置：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209174450401.png" alt="image-20230209174450401"></p>
<p>启动后，使用浏览器进行访问：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230209181450455.png" alt="image-20230209181450455"></p>
<p>Jemeter停止后，又可以访问了。</p>
<p>解释：</p>
<p>对照官网：</p>
<ul>
<li>当1s内持续进入5个请求：本次测试有10个</li>
<li>对应时刻的平均响应时间（秒级）均超过阈值：在接口中加了1秒钟睡眠，也就是说，每个请求的响应的时间都是1秒多，大于阈值200ms</li>
</ul>
<p>满足要求了，接下来的时间窗口就会熔断。</p>
<p>按照这个理解，我们降级规则不变，把接口中睡眠时间改成201ms，测试，也会降级，改成180ms，同样的压测配置，就不会降级了，理解正确。</p>
<h2 id="p122-sentinel降级-异常比例" tabindex="-1"><a class="header-anchor" href="#p122-sentinel降级-异常比例" aria-hidden="true">#</a> p122-Sentinel降级-异常比例</h2>
<p>异常比例1.7版本：</p>
<ul>
<li>当资源的每秒请求量 &gt;= 5</li>
<li>每秒异常总数占通过量的比值超过阈值</li>
</ul>
<p>资源进入降级状态，在接下的时间窗口之内，对这个方法的调用都会自动地返回。</p>
<p>异常比例1.8版本(有半开状态)：</p>
<ul>
<li>当单位统计时长内请求数目大于设置的最小请求数目</li>
<li>异常的比例(秒级统计)大于阈值</li>
</ul>
<p>资源进入降级状态，<span style="background-color:pink;">经过熔断时长后熔断器会进入探测恢复状态</span>，若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。</p>
<p>这节课学1.7版本的降级-异常比例：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210102505194.png" alt="image-20230210102505194"></p>
<p>新增接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testE"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">10</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"testE 测试异常比例"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"testE"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接访问是会报异常的：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210103312805.png" alt="image-20230210103312805"></p>
<p>我们到Sentinel增加降级规则：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210103349761.png" alt="image-20230210103349761"></p>
<p>使用Jmeter发送10个请求：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210103435760.png" alt="image-20230210103435760"></p>
<p>启动后，再访问接口：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210103517760.png" alt="image-20230210103517760"></p>
<p>降级了，因为满足了降级要求：</p>
<ul>
<li>请求数&gt;=5 我们是10</li>
<li>异常比例大于0.1，我们是1</li>
</ul>
<p>当关闭Jmeter以后，虽然异常比例是1，但是没有满足要求1，还是不会开启降级。</p>
<h2 id="p123-sentinel降级-异常数" tabindex="-1"><a class="header-anchor" href="#p123-sentinel降级-异常数" aria-hidden="true">#</a> p123-Sentinel降级-异常数</h2>
<p>异常数(1.7版本)：</p>
<ul>
<li>当资源近1分钟的异常数目超过阈值之后会进行熔断。</li>
<li>统计时间窗口是分钟级别的，若<code v-pre>timeWindow</code>小于60s，则结束熔断状态后可能再进入熔断状态</li>
</ul>
<blockquote>
<p><span style="background-color:pink;">时间窗口一定要大于60秒</span></p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210104626371.png" alt="image-20230210104626371"></p>
<p>异常数(1.8版本有半开状态)：</p>
<ul>
<li>当单位统计时长内的异常数目超过阈值之后会自动进行熔断。</li>
<li>经过<span style="background-color:pink;">熔断时长后</span>熔断器会进入探测恢复状态（HALF-OPEN 状态），<span style="background-color:pink;">若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断</span>。</li>
</ul>
<p>这里学习1.7版本：</p>
<p>新增接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testF"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testF</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">10</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"testF 测试异常数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"testF"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增降级规则：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210105611458.png" alt="image-20230210105611458"></p>
<p>意思是，在70秒内，连续5次访问出现异常，就会降级。</p>
<p>因为我们这个接口是百分比异常的，所以在时间窗口70秒内，第6次访问就会进行降级：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210105929493.png" alt="image-20230210105929493"></p>
<h2 id="p124-sentinel热点key-上" tabindex="-1"><a class="header-anchor" href="#p124-sentinel热点key-上" aria-hidden="true">#</a> p124-Sentinel热点key（上）</h2>
<p>官网文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E7%83%AD%E7%82%B9%E5%8F%82%E6%95%B0%E9%99%90%E6%B5%81'>点击跳转</a></p>
<p>热点：经常访问的数据。</p>
<p>统计某个热点数据中访问频次最高的 Top K 数据，并对其访问进行限制。</p>
<p>热点参数限流会<span style="background-color:pink;">统计</span>传入<span style="background-color:pink;">参数中的热点参数</span>，并根据配置的限流阈值与模式，对<span style="background-color:pink;">包含热点参数的资源</span>调用进行限流。热点参数限流可以看做是一种特殊的流量控制，仅对包含热点参数的资源调用生效。</p>
<p>举例子：</p>
<div class="language-tex ext-tex line-numbers-mode"><pre v-pre class="language-tex"><code>http://localhost:8401/test?p1=1
http://localhost:8401/test?p2=2
http://localhost:8401/test?p3=3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加入对参数p1进行限制，那么请求参数中带有p1的会被限流，其他的不会被限流。</p>
<p>在学习热点key限流规则之前，先复习一下。</p>
<p>兜底方法：</p>
<p>分为系统默认和自定义两种，之前学习的demo中，限流出现问题以后，都是使用Sentinel默认的系统提示：Blocked by Sentinel(flow limiting)。</p>
<p>类似Hystrix，某个方法出问题了，就找对应的兜底降级方法，从注解<code v-pre>@HystrixCommand</code>改成<code v-pre>@SentinelResource</code>,并且在这个注解传参<code v-pre>blockHandler</code>指定兜底方法。</p>
<p>新增接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testHotKey"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"testHotKey"</span><span class="token punctuation">,</span>blockHandler<span class="token operator">=</span> <span class="token string">"deal_testHotKey"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testHotKey</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"p1"</span><span class="token punctuation">,</span>required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> p1<span class="token punctuation">,</span>
                             <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"p2"</span><span class="token punctuation">,</span>required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> p2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//int age = 10/0;</span>
        <span class="token keyword">return</span> <span class="token string">"------testHotKey"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 兜底方法  参数和原方法一样，但是要多一个BlockException
     *
     * <span class="token keyword">@param</span> <span class="token parameter">p1</span>        p1
     * <span class="token keyword">@param</span> <span class="token parameter">p2</span>        p2
     * <span class="token keyword">@param</span> <span class="token parameter">exception</span> 异常
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> deal_testHotKey <span class="token punctuation">(</span><span class="token class-name">String</span> p1<span class="token punctuation">,</span> <span class="token class-name">String</span> p2<span class="token punctuation">,</span> <span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//sentinel系统默认的提示：Blocked by Sentinel (flow limiting)</span>
        <span class="token keyword">return</span> <span class="token string">"------deal_testHotKey,o(╥﹏╥)o"</span><span class="token punctuation">;</span>  
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动项目，增加热点规则：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210114433810.png" alt="image-20230210114433810"></p>
<p>添加完以后，访问http://localhost:8401/testHotKey，无论怎么刷新都不会限流，但是，一旦加上第一个参数p1，qps达到限制，马上就会返回我们自定义的兜底方法：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210114612161.png" alt="image-20230210114612161"></p>
<p>为什么选择在这里提到自定义兜底方法？因为热点key限流默认是返回异常信息，去掉注解中的参数：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testHotKey"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"testHotKey"</span>
<span class="token comment">//            ,blockHandler= "deal_testHotKey"</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testHotKey</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"p1"</span><span class="token punctuation">,</span>required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> p1<span class="token punctuation">,</span>
                             <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"p2"</span><span class="token punctuation">,</span>required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> p2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//int age = 10/0;</span>
        <span class="token keyword">return</span> <span class="token string">"------testHotKey"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启后，设置热点规则，当限流时，返回的不是Blocked by Sentinel(flow limiting)，而是异常信息：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210114905845.png" alt="image-20230210114905845"></p>
<p>所以，热点key限流最好是配合自定义兜底方法使用。</p>
<h2 id="p125-sentinel热点key-下" tabindex="-1"><a class="header-anchor" href="#p125-sentinel热点key-下" aria-hidden="true">#</a> p125-Sentinel热点key(下)</h2>
<p>上面学习了热点key的限流配置，现在来学高级选项：参数例外项。</p>
<p>在添加完热点规则以后，编辑时可以看到高级选项：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210151456609.png" alt="image-20230210151456609"></p>
<p>简单的说就是，在原本对某个热点key进行限流的同时，当这个key的值是某个特殊值，采用不一样的限流手段。</p>
<p>如：对参数p1限流qps为1：</p>
<ul>
<li>
<p>请求中包含参数p1则走我们限流规则，qps超过1，服务降级。</p>
</li>
<li>
<p>特殊情况：当所传的p1的值是100时，限流qps为100。</p>
</li>
</ul>
<p>现在我们来配置：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210152503453.png" alt="image-20230210152503453"></p>
<p>测试：</p>
<p>不是例外：热点key限流qps为1，疯狂刷新，降级了，返回了我们自定义的降级方法的值。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210152523187.png" alt="image-20230210152523187"></p>
<p>例外值：qps另一个值100，疯狂刷新不会降级，因为手速点不到qps100</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210152610926.png" alt="image-20230210152610926"></p>
<p>在这个方法中故意写一个报异常：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210153006976.png" alt="image-20230210153006976"></p>
<p>设置好热点key流控，在不触发降级的情况下，返回的就是分母为0的异常，而不会是我们自定义的降级方法。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210153131490.png" alt="image-20230210153131490"></p>
<ul>
<li><code v-pre>@SentinelResource</code> - 处理的是sentinel控制台配置的违规情况，有blockHandler方法配置的兜底处理;</li>
<li><code v-pre>RuntimeException</code> int age = 10/0，这个是java运行时报出的运行时异常RunTimeException，@SentinelResource不管</li>
</ul>
<blockquote>
<p>总结 - @SentinelResource主管配置出错，运行出错该走异常走异常</p>
</blockquote>
<h2 id="p126-sentinel系统规则" tabindex="-1"><a class="header-anchor" href="#p126-sentinel系统规则" aria-hidden="true">#</a> p126-Sentinel系统规则</h2>
<p>官网文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E7%B3%BB%E7%BB%9F%E8%87%AA%E9%80%82%E5%BA%94%E9%99%90%E6%B5%81'>点击跳转</a></p>
<p>系统自适应限流：从<span style="background-color:pink;">整体维度</span>对应用入口流量进行控制。</p>
<p>之前的限流都是细化到某一个接口，甚至是方法的。系统自适应限流是整体的，也就是对整个系统所有的接口、方法做一个入口的限流。</p>
<p>系统保护规则是应用整体维度的，而不是资源维度的，并且<strong>仅对入口流量生效</strong>。入口流量指的是进入应用的流量（<code v-pre>EntryType.IN</code>），比如 Web 服务或 Dubbo 服务端接收的请求，都属于入口流量。</p>
<p>系统规则支持以下的模式(官网拷贝来的)：</p>
<ul>
<li><strong>Load 自适应</strong>（仅对 Linux/Unix-like 机器生效）：系统的 load1 作为启发指标，进行自适应系统保护。当系统 load1 超过设定的启发值，且系统当前的并发线程数超过估算的系统容量时才会触发系统保护（BBR 阶段）。系统容量由系统的 <code v-pre>maxQps * minRt</code> 估算得出。设定参考值一般是 <code v-pre>CPU cores * 2.5</code>。</li>
<li><strong>CPU usage</strong>（1.5.0+ 版本）：当系统 CPU 使用率超过阈值即触发系统保护（取值范围 0.0-1.0），比较灵敏。</li>
<li><strong>平均 RT</strong>：当单台机器上所有入口流量的平均 RT 达到阈值即触发系统保护，单位是毫秒。</li>
<li><strong>并发线程数</strong>：当单台机器上所有入口流量的并发线程数达到阈值即触发系统保护。</li>
<li><strong>入口 QPS</strong>：当单台机器上所有入口流量的 QPS 达到阈值即触发系统保护。</li>
</ul>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210155809325.png" alt="image-20230210155809325"></p>
<p>测试：</p>
<p>对下面两个接口进行测试：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210160117199.png" alt="image-20230210160117199"></p>
<p>接口比较简单，并且不对接口做单独的流控。新增系统规则：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210160224178.png" alt="image-20230210160224178"></p>
<p>疯狂刷新，降级了，整个系统的入口qps超过1，直接降级，所有接口都降级：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210160307836.png" alt="image-20230210160307836"></p>
<h2 id="p127-sentinelresource配置-上" tabindex="-1"><a class="header-anchor" href="#p127-sentinelresource配置-上" aria-hidden="true">#</a> p127-SentinelResource配置(上)</h2>
<p>学习按资源名称进行限流。</p>
<p>导入依赖：用于返回结果</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.lzc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>cloud-api-commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/byResource"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"byResource"</span><span class="token punctuation">,</span>blockHandler <span class="token operator">=</span> <span class="token string">"handleException"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">byResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"操作成功"</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">2020L</span><span class="token punctuation">,</span><span class="token string">"serial001"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">handleException</span><span class="token punctuation">(</span><span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">444</span><span class="token punctuation">,</span>exception<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getCanonicalName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"\t 服务不可用"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启后访问：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210162022276.png" alt="image-20230210162022276"></p>
<p>新增流控：主要这里的资源名是byResource而不是接口路径/byResource，说明这是通过资源名称进行限流。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210162321149.png" alt="image-20230210162321149"></p>
<p>疯狂刷新：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210162434320.png" alt="image-20230210162434320"></p>
<p>走了降级方法，返回了我们自定义的信息。</p>
<p>现在有个问题，我们关闭8401微服务，刷新Sentinel控制台，流控规则消失了？？？？---后续学习</p>
<p>关于兜底方法：如果我们自定义了，就会走自定义的降级方法，如果没有自定义，则返回默认的降级方法信息。</p>
<p>如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/rateLimit/byUrl"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"byUrl"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">byUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"按url限流测试OK"</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">2020L</span><span class="token punctuation">,</span><span class="token string">"serial002"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>限流时，返回的降级方法信息是默认的：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210162952001.png" alt="image-20230210162952001"></p>
<blockquote>
<p>目前存在的问题：1 降级方法和业务方法代码耦合 2 每个资源或接口都要写一个降级方法，代码膨胀，需要搞一个全局统一处理。</p>
</blockquote>
<h2 id="p128-sentinelresource配置-中" tabindex="-1"><a class="header-anchor" href="#p128-sentinelresource配置-中" aria-hidden="true">#</a> p128-SentinelResource配置(中)</h2>
<p>针对上面的问题，可以使用注解SentinelResource来解决。</p>
<p>创建一个类CustomerBlockHandler，用于自定义限流处理逻辑。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomerBlockHandler</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">CommonResult</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">4444</span><span class="token punctuation">,</span><span class="token string">"按客戶自定义,global handlerException----1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">CommonResult</span> <span class="token function">handlerException2</span><span class="token punctuation">(</span><span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">4444</span><span class="token punctuation">,</span><span class="token string">"按客戶自定义,global handlerException----2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增加接口：这里注意，使用<code v-pre>blockHandlerClass</code>指定自定义限流处理逻辑方法所在的类，<code v-pre>blockHandler</code>指定用于处理的方法。相当于指定了哪个类的哪个方法是降级方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/rateLimit/customerBlockHandler"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"customerBlockHandler"</span><span class="token punctuation">,</span>
            blockHandlerClass <span class="token operator">=</span> <span class="token class-name">CustomerBlockHandler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            blockHandler <span class="token operator">=</span> <span class="token string">"handlerException2"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">customerBlockHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"按客戶自定义"</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">2020L</span><span class="token punctuation">,</span><span class="token string">"serial003"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接口qps限流为1，当触发限流规则，降级方法：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210164654119.png" alt="image-20230210164654119"></p>
<blockquote>
<p>需要注意，这里限流的是SentinelResource上的资源名称，而不是url</p>
</blockquote>
<p>url不会返回自定义的降级方法。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210164757412.png" alt="image-20230210164757412"></p>
<p>总结：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230210165021548.png" alt="image-20230210165021548"></p>
<h2 id="p129-sentinelresource配置-下" tabindex="-1"><a class="header-anchor" href="#p129-sentinelresource配置-下" aria-hidden="true">#</a> p129-SentinelResource配置(下)</h2>
<p>除了在界面上配置规则，可以也可以在代码中配置，但是不推荐，耦合了，很傻逼。</p>
<p>这节课什么也没讲，资料在这：<a href='https://github.com/alibaba/Sentinel/wiki/%E6%B3%A8%E8%A7%A3%E6%94%AF%E6%8C%81#sentinelresource-%E6%B3%A8%E8%A7%A3'>点击跳转</a>，有空看。</p>
<h2 id="p130-sentinel服务熔断ribbon环境预说" tabindex="-1"><a class="header-anchor" href="#p130-sentinel服务熔断ribbon环境预说" aria-hidden="true">#</a> p130-Sentinel服务熔断Ribbon环境预说</h2>
<p>springboot+sentinel+openfeign+ribbon+fallback</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213110251657.png" alt="image-20230213110251657"></p>
<p>新建服务提供者cloudalibaba-provider-payment9003/9004，两个一样的做法。</p>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.lzc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>cloud-api-commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--SpringCloud ailibaba nacos --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!--openfeign--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- SpringBoot整合Web组件+actuator --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--日常通用jar包配置--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.6.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9003</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>provider
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">1111</span> <span class="token comment">#Nacos服务注册中心地址</span>

<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">'*'</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${server.port}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverPort<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 模拟数据库
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Payment</span><span class="token punctuation">></span></span> hashMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span>
    <span class="token punctuation">{</span>
        hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span><span class="token string">"28a8c1e3bc2742d8848569891fb42181"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span><span class="token string">"bba8c1e3bc2742d8848569891ac32182"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">3L</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">3L</span><span class="token punctuation">,</span><span class="token string">"6ua8c1e3bc2742d8848569891xt92183"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/paymentSQL/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">paymentSQL</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Payment</span> payment <span class="token operator">=</span> hashMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"from mysql,serverPort:  "</span><span class="token operator">+</span>serverPort<span class="token punctuation">,</span>payment<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建cloudalibaba-consumer-nacos-order84</p>
<p>依赖：(先不用feign，用restTemplate实现负载均衡)</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--SpringCloud openfeign --></span>
        <span class="token comment">&lt;!--
        &lt;dependency>
            &lt;groupId>org.springframework.cloud&lt;/groupId>
            &lt;artifactId>spring-cloud-starter-openfeign&lt;/artifactId>
        &lt;/dependency>
		--></span>

        <span class="token comment">&lt;!--SpringCloud ailibaba nacos --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--SpringCloud ailibaba sentinel --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-sentinel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- SpringBoot整合Web组件 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--日常通用jar包配置--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">84</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>order<span class="token punctuation">-</span>consumer
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">1111</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token comment">#配置Sentinel dashboard地址</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8080</span>
        <span class="token comment">#默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8719</span>

<span class="token comment">#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)</span>
<span class="token key atrule">service-url</span><span class="token punctuation">:</span>
  <span class="token key atrule">nacos-user-service</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//nacos<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>provider

<span class="token comment"># 激活Sentinel对Feign的支持</span>
<span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>restTemplate配置负载均衡：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">getRestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制层：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CircleBreakerController</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">SERVICE_URL</span> <span class="token operator">=</span> <span class="token string">"http://nacos-payment-provider"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/fallback/{id}"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"fallback"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">fallback</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span><span class="token constant">SERVICE_URL</span> <span class="token operator">+</span> <span class="token string">"/paymentSQL/"</span><span class="token operator">+</span>id<span class="token punctuation">,</span> <span class="token class-name">CommonResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span> <span class="token punctuation">(</span><span class="token string">"IllegalArgumentException,非法参数异常...."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span> <span class="token punctuation">(</span><span class="token string">"NullPointerException,该ID没有对应记录,空指针异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动测试三个微服务：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213142842476.png" alt="image-20230213142842476"></p>
<h2 id="p131-sentinel服务熔断-无配置" tabindex="-1"><a class="header-anchor" href="#p131-sentinel服务熔断-无配置" aria-hidden="true">#</a> p131-Sentinel服务熔断-无配置</h2>
<p><code v-pre>@SentinelResource</code>注解没有进行任何配置，当访问出现异常时，页面是这样的，非常不友好：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213143439259.png" alt="image-20230213143439259"></p>
<h2 id="p132-sentinel服务熔断-只配置fallback" tabindex="-1"><a class="header-anchor" href="#p132-sentinel服务熔断-只配置fallback" aria-hidden="true">#</a> p132-Sentinel服务熔断-只配置fallback</h2>
<p>写一个fallback方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">handlerFallback</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span>  <span class="token class-name">Long</span> id<span class="token punctuation">,</span><span class="token class-name">Throwable</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Payment</span> payment <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span><span class="token string">"null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">444</span><span class="token punctuation">,</span><span class="token string">"兜底异常handlerFallback,exception内容  "</span><span class="token operator">+</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>payment<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>@SentinelResource</code>配置使用该方法：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213152911031.png" alt="image-20230213152911031"></p>
<p>加上fallback以后，再报错就会返回我们自定义fallback方法的值了：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213154911732.png" alt="image-20230213154911732"></p>
<blockquote>
<p>fallback会在java程序出现运行时异常时调用降级方法，而blockHandler会在Sentinel规则出现违规时调用降级方法。</p>
</blockquote>
<h2 id="p133-sentinel服务熔断-只配置blockhandler" tabindex="-1"><a class="header-anchor" href="#p133-sentinel服务熔断-只配置blockhandler" aria-hidden="true">#</a> p133-Sentinel服务熔断-只配置blockHandler</h2>
<p>只负责Sentinel控制台配置违规。</p>
<p>增加blockHandler方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">blockHandler</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span>  <span class="token class-name">Long</span> id<span class="token punctuation">,</span> <span class="token class-name">BlockException</span> blockException<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Payment</span> payment <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span><span class="token string">"null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">445</span><span class="token punctuation">,</span><span class="token string">"blockHandler-sentinel限流,无此流水: blockException  "</span><span class="token operator">+</span>blockException<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>payment<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>@SentinelResource</code>配置使用该方法：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213160502422.png" alt="image-20230213160502422"></p>
<p>重启，Sentinel控制台添加降级规则：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213160604056.png" alt="image-20230213160604056"></p>
<p>第一次访问：没有降级，但是异常了，直接返回</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213160853020.png" alt="image-20230213160853020"></p>
<p>第二次：降级了</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213160937687.png" alt="image-20230213160937687"></p>
<h2 id="p134-sentinel服务熔断-fallback和blockhandler都配置" tabindex="-1"><a class="header-anchor" href="#p134-sentinel服务熔断-fallback和blockhandler都配置" aria-hidden="true">#</a> p134-Sentinel服务熔断-fallback和blockHandler都配置</h2>
<p>需要思考：错误冲突，即可能有java异常，又可能有限流违规，结果会怎么样</p>
<p>配置fallback和blockHandler：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213162713540.png" alt="image-20230213162713540"></p>
<p>添加限流规则：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213163200649.png" alt="image-20230213163200649"></p>
<p>正常访问(不会抛出java异常，但是qps违规)：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213163320909.png" alt="image-20230213163320909"></p>
<p>java异常，但qps不违规：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213163345014.png" alt="image-20230213163345014"></p>
<p>java异常，qps也违规：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213163402729.png" alt="image-20230213163402729"></p>
<p>结论：当fallback和blockHandler都进行了配置，被限流降级抛出BlockException时，只会进入blockHandler处理逻辑，不会进入fallback方法。</p>
<h2 id="p135-sentinel服务熔断-exceptionstoignore" tabindex="-1"><a class="header-anchor" href="#p135-sentinel服务熔断-exceptionstoignore" aria-hidden="true">#</a> p135-Sentinel服务熔断-exceptionsToIgnore</h2>
<p>排除异常，也就是当报了指定的异常时，不进入fallback处理方法。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213163931347.png" alt="image-20230213163931347"></p>
<p>重启以后，这时候，当抛出这个异常，不会进入fallback方法，直接返回error页面了。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213164029667.png" alt="image-20230213164029667"></p>
<p>其他异常还是会进入fallback方法：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213164048873.png" alt="image-20230213164048873"></p>
<h2 id="p136-sentinel服务熔断-openfeign" tabindex="-1"><a class="header-anchor" href="#p136-sentinel服务熔断-openfeign" aria-hidden="true">#</a> p136-Sentinel服务熔断-OpenFeign</h2>
<p>引入feign：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--SpringCloud openfeign --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>激活Sentinel对Feign的支持：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 激活Sentinel对Feign的支持</span>
<span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类激活Feign：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderNacosApplicaton84</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">OrderNacosApplicaton84</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>feign接口创建：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"http://nacos-payment-provider"</span><span class="token punctuation">,</span>fallback <span class="token operator">=</span> <span class="token class-name">PaymentFallback</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentFeign</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 付款微服务调用
     *
     * <span class="token keyword">@param</span> <span class="token parameter">id</span> id
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">CommonResult</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">Payment}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/paymentSQL/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">paymentSQL</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>feign的fallback：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentFallback</span> <span class="token keyword">implements</span> <span class="token class-name">PaymentFeign</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">paymentSQL</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">44444</span><span class="token punctuation">,</span><span class="token string">"服务降级返回,---PaymentFallbackService"</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span><span class="token string">"errorSerial"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加控制层方法，使用Feign调用支付微服务：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">PaymentFeign</span> paymentFeign<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/consumer/paymentSQL/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">paymentSQL</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentFeign<span class="token punctuation">.</span><span class="token function">paymentSQL</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动测试是否可以远程调用，且会ribbon会采用默认负载均衡轮询调用：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213165727365.png" alt="image-20230213165727365"></p>
<p>现在我我们故意关掉支付微服务9003和9004：</p>
<p>再进行调用：Sentinel会进行fallback</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213170507396.png" alt="image-20230213170507396"></p>
<p>如果没有fallback，先检查配置文件有没有开启Sentinel对Feign的支持。</p>
<blockquote>
<p>在netfix版本中，是Hystrix进行降级，这里是Sentinel，但是都是配合OpenFeign来做，写fallback方法，只不过Sentinel需要在配置文件启动Sentinel对Feign的支持。</p>
</blockquote>
<p><strong>熔断框架比较</strong>(copy来的)</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213172644753.png" alt="image-20230213172644753"></p>
<h2 id="p137-sentinel持久化规则" tabindex="-1"><a class="header-anchor" href="#p137-sentinel持久化规则" aria-hidden="true">#</a> p137-Sentinel持久化规则</h2>
<p>在前面多次实验中，发现每次服务重启，原来配置好的Sentinel规则都消失了 ，都是临时的，需要持久化。</p>
<p>我们可以把Sentinel的流控规则持久化到nacos中，先添加依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.csp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sentinel-datasource-nacos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloudalibaba<span class="token punctuation">-</span>sentinel<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">1111</span> <span class="token comment">#Nacos服务注册中心地址</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8080</span> <span class="token comment">#默认端口8719 如果被占用会依次+1扫描，直到找到没被占用的</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8719</span>
      <span class="token key atrule">datasource</span><span class="token punctuation">:</span> <span class="token comment">#&lt;---------------------------关注点，添加Nacos数据源配置</span>
        <span class="token key atrule">ds1</span><span class="token punctuation">:</span>
          <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
            <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">1111</span>
            <span class="token key atrule">dataId</span><span class="token punctuation">:</span> cloudalibaba<span class="token punctuation">-</span>sentinel<span class="token punctuation">-</span>service
            <span class="token key atrule">groupId</span><span class="token punctuation">:</span> DEFAULT_GROUP
            <span class="token key atrule">data-type</span><span class="token punctuation">:</span> json
            <span class="token key atrule">rule-type</span><span class="token punctuation">:</span> flow
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置后，到nacos新建配置，cloudalibaba-sentinel-service，注意这里是用json类型，和之前的yaml不一样，命名也不一样。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token property">"resource"</span><span class="token operator">:</span> <span class="token string">"/rateLimit/byUrl"</span><span class="token punctuation">,</span>
    <span class="token property">"limitApp"</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
    <span class="token property">"grade"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"count"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> 
    <span class="token property">"strategy"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"controlBehavior"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"clusterMode"</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-02/image-20230213173152495.png" alt="image-20230213173152495"></p>
<blockquote>
<p>resource：资源名称；
limitApp：来源应用；
grade：阈值类型，0表示线程数, 1表示QPS；
count：单机阈值；
strategy：流控模式，0表示直接，1表示关联，2表示链路；
controlBehavior：流控效果，0表示快速失败，1表示Warm Up，2表示排队等待；
clusterMode：是否集群。</p>
</blockquote>
<p>重启多次8401，可以看到，流控规则依然存在(需要手动访问接口，因为Sentinel是懒加载)：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213174738916.png" alt="image-20230213174738916"></p>
<p>但是，如果我们手动在界面上添加，重启以后还是会小时，所以还得到nacos上进行配置。</p>
<h2 id="p138-分布式事务的由来" tabindex="-1"><a class="header-anchor" href="#p138-分布式事务的由来" aria-hidden="true">#</a> p138-分布式事务的由来</h2>
<p>三个阶段：</p>
<ul>
<li>一个java程序对应一个数据库：没有分布式事务问题</li>
<li>一个java程序对应多个数据库(随着业务增多分库)：也没有问题</li>
<li>多个微服务对应多个数据库：比如订单微服务下单，订单微服务需要增加一条数据，而库存微服务需要进行库存扣除，修改数据库，这在逻辑是应该属于一个事务，但是在不同的数据库，所以有了分布式事务的问题。</li>
</ul>
<p>单体应用被拆分成微服务应用，原来的三个模块被拆分成三个独立的应用,分别使用三个独立的数据源，业务操作需要调用三个服务来完成。此时<strong>每个服务内部的数据一致性由本地事务来保证， 但是全局的数据一致性问题没法保证</strong>。</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230213181105839.png" alt="image-20230213181105839"></p>
<p>一句话：<strong>一次业务操作需要跨多个数据源或需要跨多个系统进行远程调用，就会产生分布式事务问题</strong>。</p>
<p>全局数据一致性的保障。</p>
<h2 id="p139-seata术语" tabindex="-1"><a class="header-anchor" href="#p139-seata术语" aria-hidden="true">#</a> p139-Seata术语</h2>
<p>Seata是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。</p>
<p>官网文档：<a href='http://seata.io/zh-cn/'>点击跳转</a></p>
<p>一个典型的分布式事务过程</p>
<p>分布式事务处理过程的一ID+三组件模型：</p>
<ul>
<li>Transaction ID XID 全局唯一的事务ID</li>
<li>三组件概念(来自官网)
<ul>
<li>TC (Transaction Coordinator) - 事务协调者：维护全局和分支事务的状态，<span style="background-color:pink;">驱动全局事务提交或回滚</span>。</li>
<li>TM (Transaction Manager) - 事务管理器：<span style="background-color:pink;">定义全局事务的范围</span>：开始全局事务、提交或回滚全局事务。</li>
<li>RM (Resource Manager) - 资源管理器：<span style="background-color:pink;">管理分支事务处理的资源</span>，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。</li>
</ul>
</li>
</ul>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230214104136100.png" alt="image-20230214104136100"></p>
<h2 id="p140-seata-server安装" tabindex="-1"><a class="header-anchor" href="#p140-seata-server安装" aria-hidden="true">#</a> p140-Seata-Server安装</h2>
<p>下载：<a href='https://github.com/seata/seata/releases/tag/v1.6.1'>点击跳转</a>，下载后解压，注意下载0.9版本的，和课程一致，后续版本配置不一样，参考：<a href='http://seata.io/zh-cn/docs/user/configurations.html'>点击跳转</a>。</p>
<p>本地事务：<code v-pre>@Transactional</code>属于spring的</p>
<p>全局事务：<code v-pre>@GlobalTransactional</code>阿里巴巴的</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230214104812656.png" alt="image-20230214104812656"></p>
<p>下载解压后，需要修改配置：先备份conf下的feile.conf文件，<span style="background-color:pink;">主要修改</span>：自定义事务组名称+事务日志存储模式为db(默认是存储到文件)+数据库连接信息</p>
<p>file.conf需要修改的地方：</p>
<ul>
<li>
<p>service模块：修改分组名字，随便起名字都行：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">service</span> <span class="token value attr-value">{</span>
<span class="token comment">  #vgroup->rgroup 下面这行是需要修改的</span>
<span class="token key attr-name">  vgroup_mapping.my_test_tx_group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"fsp_tx_group"</span>
<span class="token comment">  #only support single node</span>
<span class="token key attr-name">  default.grouplist</span> <span class="token punctuation">=</span> <span class="token value attr-value">"127.0.0.1:8091"</span>
<span class="token comment">  #degrade current not support</span>
<span class="token key attr-name">  enableDegrade</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
<span class="token comment">  #disable</span>
<span class="token key attr-name">  disable</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
<span class="token comment">  #unit ms,s,m,h,d represents milliseconds, seconds, minutes, hours, days, default permanent</span>
<span class="token key attr-name">  max.commit.retry.timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">"-1"</span>
<span class="token key attr-name">  max.rollback.retry.timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">"-1"</span>
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>store模块：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">store</span> <span class="token value attr-value">{</span>
<span class="token comment">  ## store mode: file、db 下面这行，需要修改为db 存储到数据库中</span>
<span class="token key attr-name">  mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">"db"</span>

<span class="token comment">  ## file store</span>
<span class="token key attr-name">  file</span> <span class="token value attr-value">{</span>
<span class="token key attr-name">    dir</span> <span class="token punctuation">=</span> <span class="token value attr-value">"sessionStore"</span>

<span class="token comment">    # branch session size , if exceeded first try compress lockkey, still exceeded throws exceptions</span>
<span class="token key attr-name">    max-branch-session-size</span> <span class="token punctuation">=</span> <span class="token value attr-value">16384</span>
<span class="token comment">    # globe session size , if exceeded throws exceptions</span>
<span class="token key attr-name">    max-global-session-size</span> <span class="token punctuation">=</span> <span class="token value attr-value">512</span>
<span class="token comment">    # file buffer size , if exceeded allocate new buffer</span>
<span class="token key attr-name">    file-write-buffer-cache-size</span> <span class="token punctuation">=</span> <span class="token value attr-value">16384</span>
<span class="token comment">    # when recover batch read size</span>
<span class="token key attr-name">    session.reload.read_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
<span class="token comment">    # async, sync</span>
<span class="token key attr-name">    flush-disk-mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">async</span>
  }

<span class="token comment">  ## database store</span>
<span class="token key attr-name">  db</span> <span class="token value attr-value">{</span>
<span class="token comment">    ## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp) etc.</span>
<span class="token key attr-name">    datasource</span> <span class="token punctuation">=</span> <span class="token value attr-value">"dbcp"</span>
<span class="token comment">    ## mysql/oracle/h2/oceanbase etc. 修改为自己的数据库信息</span>
<span class="token key attr-name">    db-type</span> <span class="token punctuation">=</span> <span class="token value attr-value">"mysql"</span>
<span class="token key attr-name">    driver-class-name</span> <span class="token punctuation">=</span> <span class="token value attr-value">"com.mysql.jdbc.Driver"</span>
<span class="token key attr-name">    url</span> <span class="token punctuation">=</span> <span class="token value attr-value">"jdbc:mysql://www.iocaop.com:3306/seata"</span>
<span class="token key attr-name">    user</span> <span class="token punctuation">=</span> <span class="token value attr-value">"root"</span>
<span class="token key attr-name">    password</span> <span class="token punctuation">=</span> <span class="token value attr-value">"911823"</span>
<span class="token key attr-name">    min-conn</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
<span class="token key attr-name">    max-conn</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span>
<span class="token key attr-name">    global.table</span> <span class="token punctuation">=</span> <span class="token value attr-value">"global_table"</span>
<span class="token key attr-name">    branch.table</span> <span class="token punctuation">=</span> <span class="token value attr-value">"branch_table"</span>
<span class="token key attr-name">    lock-table</span> <span class="token punctuation">=</span> <span class="token value attr-value">"lock_table"</span>
<span class="token key attr-name">    query-limit</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>数据库新建一个库名字为seata，在seata库里建表，sql已经提供了。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- the table to store GlobalSession data</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> <span class="token identifier"><span class="token punctuation">`</span>global_table<span class="token punctuation">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">`</span>global_table<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span>  <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span> <span class="token keyword">tinyint</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>application_id<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>transaction_service_group<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>transaction_name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>timeout<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>begin_time<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>application_data<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span><span class="token punctuation">,</span>
  <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">key</span> <span class="token identifier"><span class="token punctuation">`</span>idx_gmt_modified_status<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">key</span> <span class="token identifier"><span class="token punctuation">`</span>idx_transaction_id<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- the table to store BranchSession data</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> <span class="token identifier"><span class="token punctuation">`</span>branch_table<span class="token punctuation">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">`</span>branch_table<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span> <span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>resource_group_id<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>resource_id<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span> <span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>lock_key<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>branch_type<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span> <span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span> <span class="token keyword">tinyint</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>client_id<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>application_data<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span><span class="token punctuation">,</span>
  <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">key</span> <span class="token identifier"><span class="token punctuation">`</span>idx_xid<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- the table to store lock data</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> <span class="token identifier"><span class="token punctuation">`</span>lock_table<span class="token punctuation">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">`</span>lock_table<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>row_key<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">96</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span> long <span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span> long<span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>resource_id<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span> <span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>pk<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span><span class="token punctuation">,</span>
  <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>row_key<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-02/image-20230216231818856.png" alt="image-20230216231818856"></p>
</li>
<li>
<p>修改registry.conf：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230216235813925.png" alt="image-20230216235813925"></p>
</li>
</ul>
<p>启动，注意需要java8，11会报错：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230216235852570.png" alt="image-20230216235852570"></p>
<p>到nacos中，可以看到：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230217000031683.png" alt="image-20230217000031683"></p>
<h2 id="p141-seata业务数据库准备" tabindex="-1"><a class="header-anchor" href="#p141-seata业务数据库准备" aria-hidden="true">#</a> p141-Seata业务数据库准备</h2>
<p>Seata需要注册到Nacos，所以先准备好Nacos，这里还会创建3个微服务，一个订单微服务，一个库存微服务，一个账户微服务。</p>
<p>当用户下单，订单微服务会创建一个订单，然后远程调用扣减库存，再远程调用扣除账户余额，最后再订单微服务中修改订单状态。</p>
<blockquote>
<p>操作跨越了3个数据库，且有2次远程调用，会有分布式事务问题。</p>
</blockquote>
<p>创建3个数据库：seata_order、seata_storage、seata_account：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> seata_order<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> seata_storage<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> seata_account<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>seata_order库下建t_order表:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t_order <span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>product_id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'产品id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>count<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'数量'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>money<span class="token punctuation">`</span></span> <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'金额'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'订单状态: 0:创建中; 1:已完结'</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t_order<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>seata_storage库下建t_storage表:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t_storage <span class="token punctuation">(</span>
<span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>product_id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'产品id'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>total<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'总库存'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>used<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'已用库存'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>residue<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'剩余库存'</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> seata_storage<span class="token punctuation">.</span>t_storage<span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>product_id<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>total<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>used<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>residue<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token string">'100'</span><span class="token punctuation">,</span> <span class="token string">'0'</span><span class="token punctuation">,</span><span class="token string">'100'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t_storage<span class="token punctuation">;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>seata_account库下建t_account表:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t_account<span class="token punctuation">(</span>
	<span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">COMMENT</span> <span class="token string">'id'</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户id'</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">`</span>total<span class="token punctuation">`</span></span> <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'总额度'</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">`</span>used<span class="token punctuation">`</span></span> <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'已用余额'</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">`</span>residue<span class="token punctuation">`</span></span> <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'剩余可用额度'</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> seata_account<span class="token punctuation">.</span>t_account<span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>total<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>used<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>residue<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token string">'1000'</span><span class="token punctuation">,</span> <span class="token string">'0'</span><span class="token punctuation">,</span> <span class="token string">'1000'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t_account<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述3库分别建对应的回滚日志表(0.9版本Seata提供，在conf文件夹下db_undo_log.sql):</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- the table to store seata xid data</span>
<span class="token comment">-- 0.7.0+ add context</span>
<span class="token comment">-- you must to init this sql for you business databese. the seata server not need it.</span>
<span class="token comment">-- 此脚本必须初始化在你当前的业务数据库中，用于AT 模式XID记录。与server端无关（注：业务数据库）</span>
<span class="token comment">-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">`</span>undo_log<span class="token punctuation">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>undo_log<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>context<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>rollback_info<span class="token punctuation">`</span></span> <span class="token keyword">longblob</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>log_status<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>log_created<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>log_modified<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>ext<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">UNIQUE</span> <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>ux_undo_log<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230220232154286.png" alt="image-20230220232154286"></p>
<h2 id="p142-p146-seata之module配置搭建" tabindex="-1"><a class="header-anchor" href="#p142-p146-seata之module配置搭建" aria-hidden="true">#</a> p142~p146-Seata之Module配置搭建</h2>
<p>操作流程：下订单 -&gt; 减库存 -&gt; 扣余额 -&gt; 改订单状态</p>
<h2 id="创建订单微服务-seata-order-service2001" tabindex="-1"><a class="header-anchor" href="#创建订单微服务-seata-order-service2001" aria-hidden="true">#</a> 创建订单微服务:seata-order-service2001</h2>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--nacos--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!--seata--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.9.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!--feign--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!--web-actuator--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!--mysql-druid--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.1.37<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.1.10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis.spring.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">2001</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> seata<span class="token punctuation">-</span>order<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">alibaba</span><span class="token punctuation">:</span>
      <span class="token key atrule">seata</span><span class="token punctuation">:</span>
        <span class="token comment">#自定义事务组名称需要与seata-server中的对应</span>
        <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> fsp_tx_group
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">1111</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//www.iocaop.com<span class="token punctuation">:</span>3306/seata_order
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>

<span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">hystrix</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">io</span><span class="token punctuation">:</span>
      <span class="token key atrule">seata</span><span class="token punctuation">:</span> info

<span class="token key atrule">mybatis</span><span class="token punctuation">:</span>
  <span class="token key atrule">mapperLocations</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>mapper/<span class="token important">*.xml</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把Seata0.9版本conf下的file.conf和registry.conf复制到resource下：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230220233258422.png" alt="image-20230220233258422"></p>
<p>新建统一返回结果类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 统一返回结果
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/20
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> code<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> data<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> code<span class="token punctuation">,</span> <span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> message<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>订单实体类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 订单
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/20
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> productId<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Integer</span> count<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> money<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 订单状态：0：创建中；1：已完结
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> status<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>持久层接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 订单持久层接口
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/20
 */</span>
<span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderDao</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 新建订单
     *
     * <span class="token keyword">@param</span> <span class="token parameter">order</span> 订单
     */</span>
    <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Order</span> order<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 修改订单状态，从零改为1
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userId</span> 用户id
     * <span class="token keyword">@param</span> <span class="token parameter">status</span> 状态
     */</span>
    <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"userId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> userId<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"status"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> status<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>持久层实现：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8" ?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mapper</span> <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Mapper 3.0//EN"</span> <span class="token string">"http://mybatis.org/dtd/mybatis-3-mapper.dtd"</span> <span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.lzc.springcloud.alibaba.dao.OrderDao<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resultMap</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BaseResultMap<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.lzc.springcloud.alibaba.domain.Order<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user_id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>userId<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>product_id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>productId<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>count<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>count<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INTEGER<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>money<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>money<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DECIMAL<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>status<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>status<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INTEGER<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resultMap</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>insert</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>create<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        insert into t_order (id,user_id,product_id,count,money,status)
        values (null,#{userId},#{productId},#{count},#{money},0);
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>insert</span><span class="token punctuation">></span></span>


    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>update</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>update<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        update t_order set status = 1
        where user_id=#{userId} and status = #{status};
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>update</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mapper</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 订单服务
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/20
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 创建
     *
     * <span class="token keyword">@param</span> <span class="token parameter">order</span> 订单
     */</span>
    <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Order</span> order<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层实现类(其他微服务还未建好，暂时先这样写，不完整)：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 创建
     * 创建订单->调用库存服务扣减库存->调用账户服务扣减账户余额->修改订单状态
     * 简单说：下订单->扣库存->减余额->改状态
     *
     * <span class="token keyword">@param</span> <span class="token parameter">order</span> 订单
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Order</span> order<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"----->开始新建订单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//1 新建订单</span>
        orderDao<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制层：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 订单控制层
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/21
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>


    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/order/create"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Order</span> order<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        orderService<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"订单创建成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置类： 参考：<a href='https://github.com/seata/seata-samples/blob/master/doc/quick-integration-with-spring-cloud.md'>点击跳转</a></p>
<ul>
<li>
<p>MyBatisConfig</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * ibatis配置
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/21
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"com.atguigu.springcloud.alibaba.dao"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyBatisConfig</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>DataSourceProxyConfig</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSourceProxyConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"spring.datasource"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DruidDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceProxy</span> <span class="token function">dataSourceProxy</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceProxy</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">sqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token class-name">DataSourceProxy</span> dataSourceProxy<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">SqlSessionFactoryBean</span> sqlSessionFactoryBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSourceProxy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类需加注解，不自动装配数据源，而是手动配置:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 启动类
 * 取消数据源的自动创建，而是使用自己定义的
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/21
 */</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token annotation punctuation">@SpringBootApplication</span><span class="token punctuation">(</span>exclude <span class="token operator">=</span> <span class="token class-name">DataSourceAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SeataOrderMainApplication2001</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SeataOrderMainApplication2001</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动验证：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230222230123673.png" alt="image-20230222230123673"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230222230148361.png" alt="image-20230222230148361"></p>
</li>
</ul>
<h2 id="创建库存微服务-seata-storage-service2002" tabindex="-1"><a class="header-anchor" href="#创建库存微服务-seata-storage-service2002" aria-hidden="true">#</a> 创建库存微服务:seata-storage-service2002</h2>
<p>依赖和seata-order-service2001模块相同：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--nacos--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--seata--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.9.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--feign--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--web-actuator--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--mysql-druid--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.1.37<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.1.10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis.spring.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.lzc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>cloud-api-commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：与seata-order-service2001模块大致相同,数据库不同</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">2002</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> seata<span class="token punctuation">-</span>storage<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">alibaba</span><span class="token punctuation">:</span>
      <span class="token key atrule">seata</span><span class="token punctuation">:</span>
        <span class="token comment"># 自定义事务组名称需要与seata-server中的对应</span>
        <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> fsp_tx_group
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">1111</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token comment"># 当前数据源操作类型</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
    <span class="token comment"># mysql驱动类</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//www.iocaop.com<span class="token punctuation">:</span>3306/seata_storage<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=UTF-8&amp;useSSL=false&amp;serverTimezone=GMT%2B8</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>

<span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">io</span><span class="token punctuation">:</span>
      <span class="token key atrule">seata</span><span class="token punctuation">:</span> info

<span class="token key atrule">mybatis</span><span class="token punctuation">:</span>
  <span class="token key atrule">mapperLocations</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>mapper/<span class="token important">*.xml</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>file.conf 和 registry.conf（与seata-order-service2001模块大致相同，直接拷贝过来）</p>
<p>实体类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Storage</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 产品id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> productId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 总库存
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> total<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 已用库存
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> used<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 剩余库存
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> residue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>持久层接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">StorageDao</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * 扣减库存
     *
     * <span class="token keyword">@param</span> <span class="token parameter">productId</span> 产品id
     * <span class="token keyword">@param</span> <span class="token parameter">count</span>     数
     */</span>
    <span class="token keyword">void</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"productId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> productId<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"count"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>持久层实现类：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8" ?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mapper</span> <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Mapper 3.0//EN"</span> <span class="token string">"http://mybatis.org/dtd/mybatis-3-mapper.dtd"</span> <span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.lzc.springcloud.alibaba.dao.StorageDao<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resultMap</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BaseResultMap<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.lzc.springcloud.alibaba.domain.Storage<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>product_id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>productId<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>total<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>total<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INTEGER<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>used<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>used<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INTEGER<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>residue<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>residue<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INTEGER<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resultMap</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>update</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>decrease<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        UPDATE
        t_storage
        SET
        used = used + #{count},residue = residue - #{count}
        WHERE
        product_id = #{productId}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>update</span><span class="token punctuation">></span></span>
    
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mapper</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">StorageService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 扣减库存
     *
     * <span class="token keyword">@param</span> <span class="token parameter">productId</span> 产品id
     * <span class="token keyword">@param</span> <span class="token parameter">count</span>     数
     */</span>
    <span class="token keyword">void</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token class-name">Long</span> productId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层实现类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StorageServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">StorageService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> <span class="token constant">LOGGER</span> <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">StorageServiceImpl</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">StorageDao</span> storageDao<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 扣减库存
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token class-name">Long</span> productId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> count<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"------->storage-service中扣减库存开始"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        storageDao<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>productId<span class="token punctuation">,</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"------->storage-service中扣减库存结束"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制层：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StorageController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StorageService</span> storageService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 扣减库存
     */</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/storage/decrease"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token class-name">Long</span> productId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> count<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        storageService<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>productId<span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"扣减库存成功！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Config配置:与seata-order-service2001模块相同，直接拷贝过来。</p>
<p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token annotation punctuation">@SpringBootApplication</span><span class="token punctuation">(</span>exclude <span class="token operator">=</span> <span class="token class-name">DataSourceAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SeataStorageMainApplication2002</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SeataStorageMainApplication2002</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动测试：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230222235307072.png" alt="image-20230222235307072"></p>
<h2 id="创建账户微服务seata-account-service2003" tabindex="-1"><a class="header-anchor" href="#创建账户微服务seata-account-service2003" aria-hidden="true">#</a> 创建账户微服务seata-account-service2003</h2>
<p>依赖和seata-order-service2001相同：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--nacos--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--seata--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.9.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--feign--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--web-actuator--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--mysql-druid--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.1.37<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.1.10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis.spring.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.lzc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>cloud-api-commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">2003</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> seata<span class="token punctuation">-</span>account<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">alibaba</span><span class="token punctuation">:</span>
      <span class="token key atrule">seata</span><span class="token punctuation">:</span>
        <span class="token comment"># 自定义事务组名称需要与seata-server中的对应</span>
        <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> fsp_tx_group
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">1111</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token comment"># 当前数据源操作类型</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
    <span class="token comment"># mysql驱动类</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//www.iocaop.com<span class="token punctuation">:</span>3306/seata_account<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=UTF-8&amp;useSSL=false&amp;serverTimezone=GMT%2B8</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>

<span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">hystrix</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">io</span><span class="token punctuation">:</span>
      <span class="token key atrule">seata</span><span class="token punctuation">:</span> info

<span class="token key atrule">mybatis</span><span class="token punctuation">:</span>
  <span class="token key atrule">mapperLocations</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>mapper/<span class="token important">*.xml</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实体类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 账户
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/23
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Account</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 总额度
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> total<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 已用额度
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> used<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 剩余额度
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> residue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>持久层接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AccountDao</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * 扣减账户余额
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userId</span> 用户id
     * <span class="token keyword">@param</span> <span class="token parameter">money</span>  钱
     */</span>
    <span class="token keyword">void</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"userId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> userId<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"money"</span><span class="token punctuation">)</span> <span class="token class-name">BigDecimal</span> money<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>持久层实现类：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8" ?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mapper</span> <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Mapper 3.0//EN"</span> <span class="token string">"http://mybatis.org/dtd/mybatis-3-mapper.dtd"</span> <span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.lzc.springcloud.alibaba.dao.AccountDao<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resultMap</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BaseResultMap<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.lzc.springcloud.alibaba.domain.Account<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user_id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>userId<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>total<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>total<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DECIMAL<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>used<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>used<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DECIMAL<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>residue<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>residue<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DECIMAL<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resultMap</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>update</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>decrease<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        UPDATE t_account
        SET
        residue = residue - #{money},used = used + #{money}
        WHERE
        user_id = #{userId};
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>update</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mapper</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AccountService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 扣减账户余额
     * <span class="token keyword">@param</span> <span class="token parameter">userId</span> 用户id
     * <span class="token keyword">@param</span> <span class="token parameter">money</span> 金额
     */</span>
    <span class="token keyword">void</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"userId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> userId<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"money"</span><span class="token punctuation">)</span> <span class="token class-name">BigDecimal</span> money<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层实现类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AccountServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">AccountService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> <span class="token constant">LOGGER</span> <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">AccountServiceImpl</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">AccountDao</span> accountDao<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token class-name">Long</span> userId<span class="token punctuation">,</span> <span class="token class-name">BigDecimal</span> money<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"------->account-service中扣减账户余额开始"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        accountDao<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span>money<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"------->account-service中扣减账户余额结束"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制层：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AccountController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">AccountService</span> accountService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 扣减账户余额
     */</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/account/decrease"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"userId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> userId<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"money"</span><span class="token punctuation">)</span> <span class="token class-name">BigDecimal</span> money<span class="token punctuation">)</span><span class="token punctuation">{</span>
        accountService<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span>money<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"扣减账户余额成功！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Config配置、file.conf、registry.conf直接拷贝原来的。</p>
<p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token annotation punctuation">@SpringBootApplication</span><span class="token punctuation">(</span>exclude <span class="token operator">=</span> <span class="token class-name">DataSourceAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SeataAccountMainApplication2002</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SeataAccountMainApplication2002</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动测试：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230223004011034.png" alt="image-20230223004011034"></p>
<h2 id="业务代码" tabindex="-1"><a class="header-anchor" href="#业务代码" aria-hidden="true">#</a> 业务代码</h2>
<p>业务流程是：下单-&gt;库存扣减-&gt;余额扣减-&gt;订单状态修改</p>
<p>微服务调用链路：这里统一由订单调用其他微服务</p>
<ul>
<li>order创建订单</li>
<li>order-&gt;storage 扣除库存</li>
<li>order-&gt;account 扣减余额</li>
<li>order 修改订单状态</li>
</ul>
<p>在order微服务创建feign：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 库存微服务远程调用
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/23
 */</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"seata-storage-service2002"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">StorageFeign</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 扣减库存
     *
     * <span class="token keyword">@param</span> <span class="token parameter">productId</span> 产品id
     * <span class="token keyword">@param</span> <span class="token parameter">count</span>     数
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">CommonResult</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/storage/decrease"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token class-name">Long</span> productId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 账户微服务远程调用
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/23
 */</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"seata-account-service2003"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AccountFeign</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 扣除余额
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userId</span> 用户id
     * <span class="token keyword">@param</span> <span class="token parameter">money</span>  钱
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">CommonResult</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/account/decrease"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"userId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> userId<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"money"</span><span class="token punctuation">)</span> <span class="token class-name">BigDecimal</span> money<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 创建
     * 创建订单->调用库存服务扣减库存->调用账户服务扣减账户余额->修改订单状态
     * 简单说：下订单->扣库存->减余额->改状态
     *
     * <span class="token keyword">@param</span> <span class="token parameter">order</span> 订单
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Order</span> order<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"----->开始新建订单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 1 新建订单</span>
        orderDao<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 2 远程调用库存微服务 扣减库存</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"----->订单微服务开始调用库存，做扣减Count"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        storageFeign<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getProductId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"----->订单微服务开始调用库存，做扣减end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 3 远程调用账户微服务 扣除余额</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"----->订单微服务开始调用账户，做扣减Money"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        accountFeign<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"----->订单微服务开始调用账户，做扣减end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//4 修改订单状态，从零到1,1代表已经完成</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"----->修改订单状态开始"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderDao<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"----->修改订单状态结束"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"----->下订单结束了，O(∩_∩)O哈哈~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据库初始情况：</p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230223235102115.png" alt="image-20230223235102115"></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230223235125763.png" alt=""></p>
<p><img src="http://www.iocaop.com/images/2023-02/image-20230223235202585.png" alt="image-20230223235202585"></p>
<ul>
<li>先不加全局事务注解来测试：
<ul>
<li>
<p>正常下单：不加<code v-pre>@GlobalTransactional</code>注解，三个服务都正常时，访问：<a href='http://localhost:2001/order/create?userId=1&productId=1&count=10&money=100'>订单微服务</a>，创建订单</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309001913747.png" alt="image-20230309001913747"></p>
<p>核对数据：没问题</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309002426916.png" alt="image-20230309002426916"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309002448849.png" alt="image-20230309002448849"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309002503222.png" alt="image-20230309002503222"></p>
</li>
<li>
<p>异常下单：不加<code v-pre>GlobalTransactional</code>注解，账户微服务接口模拟超时(睡眠20秒)，再来下单：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309003749788.png" alt="image-20230309003749788"></p>
<p>核对数据：异常。库存和余额都扣减了，但是订单状态没有改为已支付，因为抛出异常了，没有往下走了，<span style="background-color:pink;">由于feign存在重试机制，余额可能会被扣减多次</span>。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309003816113.png" alt="image-20230309003816113"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309003853878.png" alt="image-20230309003853878"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309003931295.png" alt="image-20230309003931295"></p>
</li>
<li>
<p>异常下单，添加注解<code v-pre>GlobalTransactional</code>:</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309004522611.png" alt="image-20230309004522611"></p>
<p>调用接口下单：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230309004626656.png" alt="image-20230309004626656"></p>
<p>还是报错，核对数据：三个表没有发生任何变化。</p>
</li>
</ul>
</li>
</ul>
</div></template>


