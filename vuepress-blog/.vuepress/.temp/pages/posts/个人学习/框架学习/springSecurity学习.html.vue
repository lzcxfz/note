<template><div><h2 id="_2-1认证和授权的概念" tabindex="-1"><a class="header-anchor" href="#_2-1认证和授权的概念" aria-hidden="true">#</a> 2-1认证和授权的概念</h2>
<p>认证：用户是登录、用户名密码校验</p>
<p>授权：用户当前身份是否有权限访问</p>
<p>创建一个SpringBoot项目，写一个简单接口，当然可以访问，当我们SpringSecurity依赖后，项目的所有接口都会加上保护。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.7.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-security<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/hello"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"v1"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">v1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"v1"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置日志输出级别和登录的用户名、密码：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
<span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">org</span><span class="token punctuation">:</span>
      <span class="token key atrule">springframework</span><span class="token punctuation">:</span>
        <span class="token key atrule">security</span><span class="token punctuation">:</span> debug
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">security</span><span class="token punctuation">:</span>
    <span class="token key atrule">user</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
      <span class="token key atrule">password</span><span class="token punctuation">:</span> admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-11/202211072252735.png" alt="image-20221107225257673"></p>
<p><img src="http://www.iocaop.com/images/2022-11/202211072253092.png" alt="image-20221107225352014"></p>
<p>登录后即可访问接口（认证成功）：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211072257183.png" alt="image-20221107225733149"></p>
<p>加一个配置类，新版配置方式：<a href = 'https://blog.csdn.net/qiaohao0206/article/details/125571568'>点击跳转</a></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * SpringSecurity配置  ---在新版SpringBoot2.7.x中已经过时了
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/11/07
 */</span>
<span class="token annotation punctuation">@Deprecated</span>
<span class="token annotation punctuation">@EnableWebSecurity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfig</span> <span class="token keyword">extends</span> <span class="token class-name">WebSecurityConfigurerAdapter</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http<span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req<span class="token operator">-></span>req<span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/v1"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给这个路径加上了权限校验，用户需要有ADMIN角色才能访问，重启访问403：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211072305559.png" alt="image-20221107230553516"></p>
<h2 id="_2-2过滤器和过滤器链" tabindex="-1"><a class="header-anchor" href="#_2-2过滤器和过滤器链" aria-hidden="true">#</a> 2-2过滤器和过滤器链</h2>
<p>任何Spring Web应用本质是servlet，Security Filter在http请求到达controller之前过滤每一个传入的http请求。</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211072238728.png" alt="image-20221107223826676"></p>
<ul>
<li>
<p>过滤器：一般认证过滤器，可以拿到HttpRequest，从中提取HTTP头、表单字段或者Cookie等然后和数据库进行对比，成功后检查用户身份和请求的路径是否授权，如果通过了这些检查就会chain.doFilter(request,response);进行放行，让请求进入DispatchServlet，再分发到具体的Controller或者RequestController。</p>
</li>
<li>
<p>过滤器链：把上面的过滤器拆解成多个过滤器链，如认证有专门的认证过滤器，授权有专门的授权过滤器，等等。好处是职责单一、形成职责链。</p>
</li>
</ul>
<p>当我们只引入，不对SpringSecurity进行其他配置，会采用DefaultSecurityFilterChain这个过滤器链，里面包含了很多过滤器。</p>
<p>SpringSecurity包含了很多过滤器，其中常见的有：</p>
<ul>
<li>BasicAuthenticationFilter：在请求头中找到一个 Basic Auth HTTP头，就尝试用该头中的用户名和密码验证用户</li>
<li>UsernamePasswordAuthenticationFilter：在请求参数或者POST的请求体中找到用户名/密码，则尝试验证</li>
<li>DefaultLoginPageGeneratingFilter：默认登录页生成，如果没有明确禁用，就会生成登录页面。</li>
<li>DefaultLogoutPageGeneratingFilter：如果没有明确禁用，会生成一个注销页面。</li>
<li>FilterSecurityInterceptor：过滤安全拦截器。用于授权逻辑。</li>
</ul>
<h2 id="_2-3-2-4http协议" tabindex="-1"><a class="header-anchor" href="#_2-3-2-4http协议" aria-hidden="true">#</a> 2-3 ~2-4HTTP协议</h2>
<p>看旧笔记：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?# 《慕课 Security》'>点击跳转</a></p>
<h2 id="_2-5-springsecurity配置" tabindex="-1"><a class="header-anchor" href="#_2-5-springsecurity配置" aria-hidden="true">#</a> 2-5 SpringSecurity配置</h2>
<p>配置分三段，and连接，或者lamda表达式配置，示例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http
                <span class="token comment">// 授权配置</span>
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req<span class="token operator">-></span>req<span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/v1"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 表单配置</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>form<span class="token operator">-></span>form<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// HTTP配置</span>
                <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token class-name">Customizer</span><span class="token punctuation">.</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 跨域配置</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf<span class="token operator">-></span>csrf<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开启调试信息输出:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableWebSecurity</span><span class="token punctuation">(</span>debug <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置Security用户信息</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">security</span><span class="token punctuation">:</span>
    <span class="token key atrule">user</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
      <span class="token key atrule">password</span><span class="token punctuation">:</span> admin
      <span class="token key atrule">roles</span><span class="token punctuation">:</span> ADMIN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>某些请求不需要经过过滤器链（css、js等静态资源），可以在WebSecurity配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">WebSecurity</span> web<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/api/**"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-6-定制登录页" tabindex="-1"><a class="header-anchor" href="#_2-6-定制登录页" aria-hidden="true">#</a> 2-6 定制登录页</h2>
<p>依赖添加：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-thymeleaf<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.webjars<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>bootstrap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.2.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.webjars<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>webjars-locator-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在resource的template下建一个login.html页面，简单写两句。然后到SpringSecurity配置中手动配置登录页：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http
                <span class="token comment">// 授权配置</span>
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req<span class="token operator">-></span>req<span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/v1"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 表单配置</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>form<span class="token operator">-></span>form<span class="token punctuation">.</span><span class="token function">loginPage</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// HTTP配置</span>
                <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token class-name">Customizer</span><span class="token punctuation">.</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 跨域配置</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf<span class="token operator">-></span>csrf<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再建一个mvc配置，让模板和路径映射上：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * web mvc配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/11/08
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebMvcConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addResourceHandlers</span><span class="token punctuation">(</span><span class="token class-name">ResourceHandlerRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        registry
                <span class="token comment">// 静态资源实际路径</span>
                <span class="token punctuation">.</span><span class="token function">addResourceHandler</span><span class="token punctuation">(</span><span class="token string">"/webjars/**"</span><span class="token punctuation">)</span>
                <span class="token comment">// 静态资源外部访问时的路径</span>
                <span class="token punctuation">.</span><span class="token function">addResourceLocations</span><span class="token punctuation">(</span><span class="token string">"/webjars/"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">resourceChain</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        registry<span class="token punctuation">.</span><span class="token function">setOrder</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addViewControllers</span><span class="token punctuation">(</span><span class="token class-name">ViewControllerRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry
                <span class="token comment">// 访问时的路径</span>
                <span class="token punctuation">.</span><span class="token function">addViewController</span><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">)</span>
                <span class="token comment">// 对应的资源 login.html</span>
                <span class="token punctuation">.</span><span class="token function">setViewName</span><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        registry<span class="token punctuation">.</span><span class="token function">setOrder</span><span class="token punctuation">(</span><span class="token constant">HIGHEST_PRECEDENCE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动以后已经可以看到效果了：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211082230872.png" alt="image-20221108223014732"></p>
<p>但是目前只对/hello/v1才需要认证，也就是其他页面可以访问，/hello/v1会跳转到默认登录页。</p>
<p>我们直接cv一个漂亮的登录页面：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>zh<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>th</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.thymeleaf.org<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Content-Type<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/html; charset=UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span>
            <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span>
            <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1, shrink-to-fit=no<span class="token punctuation">"</span></span>
    <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span> <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#{login.page.title}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
            <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span>
            <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/css<span class="token punctuation">"</span></span>
            <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/webjars/bootstrap/css/bootstrap.min.css<span class="token punctuation">"</span></span>
            <span class="token attr-name"><span class="token namespace">th:</span>href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@{/webjars/bootstrap/css/bootstrap.min.css}<span class="token punctuation">"</span></span>
    <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>f<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">th:</span>action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@{/login}<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
                <span class="token attr-name"><span class="token namespace">th:</span>if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${param.error}<span class="token punctuation">"</span></span>
                <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>alert alert-danger<span class="token punctuation">"</span></span>
                <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#{login.page.bad-credential}<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
            Invalid username and password.
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
                <span class="token attr-name"><span class="token namespace">th:</span>if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${param.logout}<span class="token punctuation">"</span></span>
                <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>alert alert-success<span class="token punctuation">"</span></span>
                <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#{login.page.logout.msg}<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
            You have been logged out.
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#{login.page.form.username}<span class="token punctuation">"</span></span>
            <span class="token punctuation">></span></span>Username:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span>
            <span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
                    <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span>
                    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-control<span class="token punctuation">"</span></span>
                    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span>
                    <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span>
            <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#{login.page.form.password}<span class="token punctuation">"</span></span>
            <span class="token punctuation">></span></span>Password:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span>
            <span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
                    <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span>
                    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-control<span class="token punctuation">"</span></span>
                    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span>
                    <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span>
            <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-check<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
                    <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span>
                    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-check-input<span class="token punctuation">"</span></span>
                    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>remember-me<span class="token punctuation">"</span></span>
                    <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>remember-me<span class="token punctuation">"</span></span>
            <span class="token punctuation">/></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-check-label<span class="token punctuation">"</span></span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>remember-me<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#{login.page.form.remember-me}<span class="token punctuation">"</span></span>
            <span class="token punctuation">></span></span>Remember Me:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span>
            <span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--        &lt;input--></span>
<span class="token comment">&lt;!--                type="hidden"--></span>
<span class="token comment">&lt;!--                id="csrf_token"--></span>
<span class="token comment">&lt;!--                th:name="${_csrf.parameterName}"--></span>
<span class="token comment">&lt;!--                th:value="${_csrf.token}"--></span>
<span class="token comment">&lt;!--        />--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
                <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span>
                <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-primary<span class="token punctuation">"</span></span>
                <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#{login.page.form.submit}<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
            Submit
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/webjars/jquery/jquery.min.js<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">th:</span>src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@{/webjars/jquery/jquery.min.js}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/webjars/bootstrap/js/bootstrap.min.js<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">th:</span>src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@{/webjars/bootstrap/js/bootstrap.min.js}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动直接乱码，需要加一点东西，国际化处理Resource Bundle：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211082238315.png" alt="image-20221108223818259"></p>
<p>好！启动：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211082248867.png" alt="image-20221108224850825"></p>
<p>我样式呢？哦，被我的安全策略拦住了，加一下配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">WebSecurity</span> web<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/api/**"</span><span class="token punctuation">)</span>
                <span class="token comment">// 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了</span>
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token class-name">PathRequest</span><span class="token punctuation">.</span><span class="token function">toStaticResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atCommonLocations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211082255740.png" alt="image-20221108225541681"></p>
<p>我们再配置一下登录用户名和密码参数：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211082257663.png" alt="image-20221108225718612"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http
                <span class="token comment">// 授权配置</span>
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req<span class="token operator">-></span>req<span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/v1"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 表单配置</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>form<span class="token operator">-></span>form<span class="token punctuation">.</span><span class="token function">loginPage</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>
                        <span class="token comment">// 配置用户名参数</span>
                        <span class="token comment">//.usernameParameter("username")</span>
                        <span class="token comment">// 配置密码参数</span>
                        <span class="token comment">//.passwordParameter("password")</span>
                        <span class="token comment">// 配置表单action地址</span>
                        <span class="token comment">//.loginProcessingUrl("/login")</span>
                        <span class="token comment">// 配置登录成功后跳转的页面</span>
                        <span class="token comment">//.successForwardUrl("/")</span>
                        <span class="token comment">// 配置失败后跳转的页面</span>
                        <span class="token comment">//.failureForwardUrl("/error")</span>
                           <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
                <span class="token comment">// HTTP配置</span>
                <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token class-name">Customizer</span><span class="token punctuation">.</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 跨域配置</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf<span class="token operator">-></span>csrf<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在就可以正常登录了。</p>
<h2 id="_2-7-csrf、logout、remember-me" tabindex="-1"><a class="header-anchor" href="#_2-7-csrf、logout、remember-me" aria-hidden="true">#</a> 2-7 csrf、logout、remember-me</h2>
<h3 id="csrf攻击" tabindex="-1"><a class="header-anchor" href="#csrf攻击" aria-hidden="true">#</a> csrf攻击</h3>
<p>我登录A站，在没有关闭A站的情况下，登录B，B可以拿到A站的Cookie，模拟发送请求给A，搞小动作。</p>
<p>怎么预防：</p>
<ul>
<li>每次响应返回一个csrf_token，请求需要带上，否则认为是非法请求。</li>
<li>响应设置Cookie属性：SameSite=Strict</li>
<li>无状态登录</li>
</ul>
<h3 id="remember-me" tabindex="-1"><a class="header-anchor" href="#remember-me" aria-hidden="true">#</a> Remember-me</h3>
<p>为了解决session过期，用户想不输入用户名密码直接登录的问题。</p>
<p>原理：用Cookie存储用户名，做个hash，加个过期时间。md5（用户名+过期时间+密码+key）</p>
<h3 id="logout" tabindex="-1"><a class="header-anchor" href="#logout" aria-hidden="true">#</a> logout</h3>
<p>和定制登录页差不多，可以定制退出页。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>.logout(logout->logout.logoutUrl("/perform_logout").permitAll());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置定制登录页和登出，都会调用内置的接口，不要去配置这几个路径不经过过滤器。否则会踩坑。要让这几个路径经过过滤器，如login、logout、remember-me。</p>
<p>不要深究这块，后面都是无状态登录，前后端分离，浪费一个小时。</p>
<h2 id="_2-8-定制登录、登出的处理" tabindex="-1"><a class="header-anchor" href="#_2-8-定制登录、登出的处理" aria-hidden="true">#</a> 2-8 定制登录、登出的处理</h2>
<p>认证成功有个Handler，可以重写里面的方法，函数式接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>                <span class="token comment">// 表单配置</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>form<span class="token operator">-></span>form
                                <span class="token punctuation">.</span><span class="token function">loginPage</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>
                                <span class="token punctuation">.</span><span class="token function">successHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                                    response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"auth success"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登录成功后就不会跳转到某个页面了，而是我们设置的响应内容：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211090056053.png" alt="image-20221109005613982"></p>
<p>能写文本，就能返回json咯。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>                <span class="token comment">// 表单配置</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>form<span class="token operator">-></span>form
                                <span class="token punctuation">.</span><span class="token function">loginPage</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>
                                <span class="token punctuation">.</span><span class="token function">successHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                                    response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>得到的json：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211090059093.png" alt="image-20221109005908033"></p>
<p>登录失败也是同样的：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>                <span class="token comment">// 表单配置</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>form<span class="token operator">-></span>form
                                <span class="token punctuation">.</span><span class="token function">loginPage</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>
                                <span class="token punctuation">.</span><span class="token function">successHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                                    response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                                <span class="token punctuation">.</span><span class="token function">failureHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                                    response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>exception<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-11/202211090102450.png" alt="image-20221109010221378"></p>
<h2 id="_2-9-自定义filter" tabindex="-1"><a class="header-anchor" href="#_2-9-自定义filter" aria-hidden="true">#</a> 2-9 自定义Filter</h2>
<p>上面实现了登录失败返回json但是没法通过json进行登录，因为默认使用的是<span style="background-color:pink;">UsernamePasswordAuthenticationFilter</span>来处理登录，分析源码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UsernamePasswordAuthenticationFilter</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractAuthenticationProcessingFilter</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">SPRING_SECURITY_FORM_USERNAME_KEY</span> <span class="token operator">=</span> <span class="token string">"username"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">SPRING_SECURITY_FORM_PASSWORD_KEY</span> <span class="token operator">=</span> <span class="token string">"password"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">AntPathRequestMatcher</span> <span class="token constant">DEFAULT_ANT_PATH_REQUEST_MATCHER</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AntPathRequestMatcher</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">,</span> <span class="token string">"POST"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 用户名和密码参数</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> usernameParameter <span class="token operator">=</span> <span class="token string">"username"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> passwordParameter <span class="token operator">=</span> <span class="token string">"password"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> postOnly <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">UsernamePasswordAuthenticationFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token constant">DEFAULT_ANT_PATH_REQUEST_MATCHER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">UsernamePasswordAuthenticationFilter</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManager</span> authenticationManager<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token constant">DEFAULT_ANT_PATH_REQUEST_MATCHER</span><span class="token punctuation">,</span> authenticationManager<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Authentication</span> <span class="token function">attemptAuthentication</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断请求方式 不允许post</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>postOnly <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>request<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">AuthenticationServiceException</span><span class="token punctuation">(</span><span class="token string">"Authentication method not supported: "</span> <span class="token operator">+</span> request<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// get请求则从request中获取请求</span>
            <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">obtainUsername</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
            username <span class="token operator">=</span> username <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> username<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> password <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">obtainPassword</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
            password <span class="token operator">=</span> password <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> password <span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
            <span class="token class-name">UsernamePasswordAuthenticationToken</span> authRequest <span class="token operator">=</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">.</span><span class="token function">unauthenticated</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setDetails</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> authRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 调用管理器，进行鉴权</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span>authRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Nullable</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">obtainPassword</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>passwordParameter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Nullable</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">obtainUsername</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>usernameParameter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">setDetails</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span> authRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        authRequest<span class="token punctuation">.</span><span class="token function">setDetails</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>authenticationDetailsSource<span class="token punctuation">.</span><span class="token function">buildDetails</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUsernameParameter</span><span class="token punctuation">(</span><span class="token class-name">String</span> usernameParameter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">hasText</span><span class="token punctuation">(</span>usernameParameter<span class="token punctuation">,</span> <span class="token string">"Username parameter must not be empty or null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>usernameParameter <span class="token operator">=</span> usernameParameter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setPasswordParameter</span><span class="token punctuation">(</span><span class="token class-name">String</span> passwordParameter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">hasText</span><span class="token punctuation">(</span>passwordParameter<span class="token punctuation">,</span> <span class="token string">"Password parameter must not be empty or null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>passwordParameter <span class="token operator">=</span> passwordParameter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setPostOnly</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> postOnly<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>postOnly <span class="token operator">=</span> postOnly<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token function">getUsernameParameter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>usernameParameter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token function">getPasswordParameter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>passwordParameter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以模仿他，我们自己写一个Filter来实现json登录：</p>
<p>为了减少代码量，直接继承UsernamePasswordAuthenticationFilter，重写attemptAuthentication方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RestAuthenticationFilter</span> <span class="token keyword">extends</span> <span class="token class-name">UsernamePasswordAuthenticationFilter</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 序列化时使用。@RequiredArgsConstructor构造器注入
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ObjectMapper</span> objectMapper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Authentication</span> <span class="token function">attemptAuthentication</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 模仿父类，先定义一个UsernamePasswordAuthenticationToken对象</span>
        <span class="token class-name">UsernamePasswordAuthenticationToken</span> authRequest <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 写自定义的校验方式
         * 期望的JSON格式:<span class="token punctuation">{</span>"username":"lzc","password":"123"<span class="token punctuation">}</span>
         *
         */</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 获取请求输入流</span>
            <span class="token class-name">ServletInputStream</span> is <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 利用objectObject将json转成tree 再读取用户名和密码</span>
            <span class="token class-name">JsonNode</span> jsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>is<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> username <span class="token operator">=</span> jsonNode<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">textValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> password <span class="token operator">=</span> jsonNode<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">textValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 创建一个UsernamePasswordAuthenticationToken对象，参数是用户名和密码</span>
            authRequest <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span>password<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"没有找到用户名和密码"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 模仿父类返回管理器进行鉴权</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span>authRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>过滤器写好了，需要把过滤器起效果，在springSecurity配置中，使用addFilterAt方法用我们自己写的过滤器替换掉内置的校验过滤器，然后在本类创建一个配置该过滤器的方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token class-name">RestAuthenticationFilter</span> <span class="token function">restAuthenticationFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 构造器注入objectMapper，所以需要传参，那么在本类也使用构造器注入，再传进来</span>
        <span class="token class-name">RestAuthenticationFilter</span> restAuthenticationFilter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestAuthenticationFilter</span><span class="token punctuation">(</span>objectMapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置鉴权成功处理器</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setAuthenticationSuccessHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置鉴权失败处理器</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setAuthenticationFailureHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>exception<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置认证管理器(用什么做认证)</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setAuthenticationManager</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">authenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置过滤器应用的url</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setFilterProcessesUrl</span><span class="token punctuation">(</span><span class="token string">"/auth/login"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> restAuthenticationFilter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还要把之前的表单登录配置注释掉：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http
                <span class="token comment">// 授权配置</span>
<span class="token comment">//                .authorizeHttpRequests(req->req.anyRequest().authenticated())</span>

                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req<span class="token operator">-></span>req
                        <span class="token comment">// 该路径下资源公开</span>
                        <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/auth/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 插入过滤器，替代内置的登录认证过滤器</span>
                <span class="token punctuation">.</span><span class="token function">addFilterAt</span><span class="token punctuation">(</span><span class="token function">restAuthenticationFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token class-name">UsernamePasswordAuthenticationFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf<span class="token operator">-></span>csrf<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 表单配置</span>
<span class="token comment">//                .formLogin(form->form</span>
<span class="token comment">//                                .loginPage("/login")</span>
<span class="token comment">//                                .successHandler(((request, response, authentication) -> {</span>
<span class="token comment">//                                    response.setStatus(HttpServletResponse.SC_OK);</span>
<span class="token comment">//                                    response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));</span>
<span class="token comment">//                                }))</span>
<span class="token comment">//                                .failureHandler(((request, response, exception) -> {</span>
<span class="token comment">//                                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);</span>
<span class="token comment">//                                    response.setCharacterEncoding("UTF-8");</span>
<span class="token comment">//                                    response.getWriter().println(new ObjectMapper().writeValueAsString(exception));</span>
<span class="token comment">//                                }))</span>
<span class="token comment">//                .permitAll()</span>
<span class="token comment">//                )</span>
                <span class="token comment">// HTTP配置</span>
<span class="token comment">//                .httpBasic(Customizer.withDefaults())</span>
                <span class="token comment">// 跨域配置</span>
<span class="token comment">//                .csrf(csrf->csrf.disable())</span>
<span class="token comment">//                .logout(logout->logout.logoutUrl("/perform_logout").permitAll()</span>
                <span class="token punctuation">;</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动测试：登录成功和失败都走了我们写的handler</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211142211727.png" alt="image-20221114221113616"></p>
<p><img src="http://www.iocaop.com/images/2022-11/202211142211586.png" alt="image-20221114221139498"></p>
<h2 id="_3-1密码进化史" tabindex="-1"><a class="header-anchor" href="#_3-1密码进化史" aria-hidden="true">#</a> 3-1密码进化史</h2>
<p>看旧笔记：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?#AJGeH'>点击跳转</a></p>
<h2 id="_3-2密码编码器" tabindex="-1"><a class="header-anchor" href="#_3-2密码编码器" aria-hidden="true">#</a> 3-2密码编码器</h2>
<p>先来看看什么是密码编码器，把yml中配置的用户名和密码先注释掉，在security配置类中重写void configure(AuthenticationManagerBuilder auth)方法进行配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth<span class="token punctuation">.</span><span class="token function">inMemoryAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 密码编码器-需要放到ioc中
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">PasswordEncoder</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">PasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Pbkdf2PasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打断点在这一行：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211142228960.png" alt="image-20221114222843807"></p>
<p>选定加密的表达式，右键：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211142230237.png" alt="image-20221114223022176"></p>
<p><img src="http://www.iocaop.com/images/2022-11/202211142230740.png" alt="image-20221114223030602"></p>
<p>可以看到密码被加密成这样了。依次类推，还有很多密码编码器，看PasswordEncoder的实现类即可。</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211142231517.png" alt="image-20221114223123442"></p>
<p>可以注意到有些编码器已经被弃用了，为什么还保留着呢？为了兼容老系统，而且还会存在一个问题，在一个系统中，老数据采用了旧的编码方式并且保留了下来，后面的密码用了更安全的加密方式，那么怎么兼容（新用户登录用新的编码格式，老用户登录就用老的编码格式）多种加密方式呢？</p>
<blockquote>
<p>SpringSecurity提供了多种编码器共存的方式：DelegatingPasswordEncoder</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">PasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 默认的密码编码器</span>
        <span class="token class-name">String</span> idForDefault <span class="token operator">=</span> <span class="token string">"bcrypt"</span><span class="token punctuation">;</span>
        <span class="token comment">// 该系统中支持的密码编码器</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">PasswordEncoder</span><span class="token punctuation">></span></span> passwordEncoderMap <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>idForDefault<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">"SHA-1"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MessageDigestPasswordEncoder</span><span class="token punctuation">(</span><span class="token string">"SHA-1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DelegatingPasswordEncoder</span><span class="token punctuation">(</span>idForDefault<span class="token punctuation">,</span>passwordEncoderMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过上一节的方法(打断点后右键evaluate)，获取两种编码方式的密码密文，创建两个用户：admin,admin和lzc，123456，得到密文后，设置进去。多密码编码器共存需要在密码前面加上<span style="background-color:pink;">{加密算法名称}</span>，DelegatingPasswordEncoder以{id}encodeedPassword形式存储密码。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth<span class="token punctuation">.</span><span class="token function">inMemoryAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把表单登录打开，配置csrf放开json登录的路径。因为表单登录是必须打开csrf的（防止跨域攻击），json登录不需要。这样配置:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf<span class="token operator">-></span>csrf<span class="token punctuation">.</span><span class="token function">ignoringAntMatchers</span><span class="token punctuation">(</span><span class="token string">"/auth/**"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>改动较大，记录一下SpringSecurity配置类:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableWebSecurity</span><span class="token punctuation">(</span>debug <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfig</span> <span class="token keyword">extends</span> <span class="token class-name">WebSecurityConfigurerAdapter</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ObjectMapper</span> objectMapper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http
                <span class="token comment">// 授权配置</span>
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req<span class="token operator">-></span>req<span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/auth/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">//                .authorizeHttpRequests(req->req</span>
<span class="token comment">//                        // 该路径下资源公开</span>
<span class="token comment">//                        .antMatchers("/auth/**").permitAll())</span>
                <span class="token comment">// 插入过滤器，替代内置的登录认证过滤器</span>
                <span class="token punctuation">.</span><span class="token function">addFilterAt</span><span class="token punctuation">(</span><span class="token function">restAuthenticationFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token class-name">UsernamePasswordAuthenticationFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf<span class="token operator">-></span>csrf<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 表单配置</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>form<span class="token operator">-></span>form
                                <span class="token punctuation">.</span><span class="token function">loginPage</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>
                                <span class="token punctuation">.</span><span class="token function">successHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                                    response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                                <span class="token punctuation">.</span><span class="token function">failureHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                                    response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>exception<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
<span class="token comment">//                 HTTP配置</span>
                <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token class-name">Customizer</span><span class="token punctuation">.</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">//                 跨域配置</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf<span class="token operator">-></span>csrf<span class="token punctuation">.</span><span class="token function">ignoringAntMatchers</span><span class="token punctuation">(</span><span class="token string">"/auth/**"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//                .logout(logout->logout.logoutUrl("/perform_logout").permitAll()</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">RestAuthenticationFilter</span> <span class="token function">restAuthenticationFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 构造器注入objectMapper，所以需要传参，那么在本类也使用构造器注入，再传进来</span>
        <span class="token class-name">RestAuthenticationFilter</span> restAuthenticationFilter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestAuthenticationFilter</span><span class="token punctuation">(</span>objectMapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置鉴权成功处理器</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setAuthenticationSuccessHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置鉴权失败处理器</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setAuthenticationFailureHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>exception<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置认证管理器(用什么做认证)</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setAuthenticationManager</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">authenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置过滤器应用的url</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setFilterProcessesUrl</span><span class="token punctuation">(</span><span class="token string">"/auth/login"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> restAuthenticationFilter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">WebSecurity</span> web<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/api/**"</span><span class="token punctuation">)</span>
                <span class="token comment">// 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了</span>
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token class-name">PathRequest</span><span class="token punctuation">.</span><span class="token function">toStaticResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atCommonLocations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth<span class="token punctuation">.</span><span class="token function">inMemoryAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 密码编码器-需要放到ioc中
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">PasswordEncoder</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">PasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 默认的密码编码器</span>
        <span class="token class-name">String</span> idForDefault <span class="token operator">=</span> <span class="token string">"bcrypt"</span><span class="token punctuation">;</span>
        <span class="token comment">// 该系统中支持的密码编码器</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">PasswordEncoder</span><span class="token punctuation">></span></span> passwordEncoderMap <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>idForDefault<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">"SHA-1"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MessageDigestPasswordEncoder</span><span class="token punctuation">(</span><span class="token string">"SHA-1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DelegatingPasswordEncoder</span><span class="token punctuation">(</span>idForDefault<span class="token punctuation">,</span>passwordEncoderMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在启动后，admin和lzc都可以登录，并且使用了不同的密码编码器。</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211142302449.png" alt="image-20221114230202382"></p>
<p><img src="http://www.iocaop.com/images/2022-11/202211142302639.png" alt="image-20221114230218575"></p>
<h2 id="_3-3-jsr380验证框架-验证注解和自定义验证注解" tabindex="-1"><a class="header-anchor" href="#_3-3-jsr380验证框架-验证注解和自定义验证注解" aria-hidden="true">#</a> 3-3 JSR380验证框架-验证注解和自定义验证注解</h2>
<p>项目里用了很多次了不需要做笔记了，看旧笔记：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?#VssNn'>点击跳转</a></p>
<p>代码已经在新建的项目里面写了。</p>
<h2 id="_3-4-jsr380验证框架-密码验证规则和自定义注解验证器" tabindex="-1"><a class="header-anchor" href="#_3-4-jsr380验证框架-密码验证规则和自定义注解验证器" aria-hidden="true">#</a> 3-4 JSR380验证框架-密码验证规则和自定义注解验证器</h2>
<h3 id="结合passay自定义注解校验密码" tabindex="-1"><a class="header-anchor" href="#结合passay自定义注解校验密码" aria-hidden="true">#</a> 结合passay自定义注解校验密码</h3>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.passay<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>passay<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.6.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">,</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">FIELD</span><span class="token punctuation">,</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">ANNOTATION_TYPE</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Constraint</span><span class="token punctuation">(</span>validatedBy <span class="token operator">=</span> <span class="token class-name">PasswordValid</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">ValidPassword</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> <span class="token function">message</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">"Invalid Password"</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">groups</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Payload</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">payload</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>校验类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PasswordValid</span> <span class="token keyword">implements</span> <span class="token class-name">ConstraintValidator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ValidPassword</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isValid</span><span class="token punctuation">(</span><span class="token class-name">String</span> password<span class="token punctuation">,</span> <span class="token class-name">ConstraintValidatorContext</span> constraintValidatorContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// passay框架密码校验规则创建</span>
        <span class="token class-name">PasswordValidator</span> passwordValidator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PasswordValidator</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
                <span class="token comment">// 长度规则 8-30</span>
                <span class="token keyword">new</span> <span class="token class-name">LengthRule</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token comment">// 至少1个大写字母</span>
                <span class="token keyword">new</span> <span class="token class-name">CharacterRule</span><span class="token punctuation">(</span><span class="token class-name">EnglishCharacterData<span class="token punctuation">.</span>UpperCase</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token comment">// 至少1个小写字母</span>
                <span class="token keyword">new</span> <span class="token class-name">CharacterRule</span><span class="token punctuation">(</span><span class="token class-name">EnglishCharacterData<span class="token punctuation">.</span>LowerCase</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token comment">// 至少1个小写字符</span>
                <span class="token keyword">new</span> <span class="token class-name">CharacterRule</span><span class="token punctuation">(</span><span class="token class-name">EnglishCharacterData<span class="token punctuation">.</span>Special</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token comment">// 不允许有5个连续的字符</span>
                <span class="token keyword">new</span> <span class="token class-name">IllegalSequenceRule</span><span class="token punctuation">(</span><span class="token class-name">EnglishSequenceData<span class="token punctuation">.</span>Alphabetical</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token comment">// 不允许5个连续数字</span>
                <span class="token keyword">new</span> <span class="token class-name">IllegalSequenceRule</span><span class="token punctuation">(</span><span class="token class-name">EnglishSequenceData<span class="token punctuation">.</span>Numerical</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token comment">// 不允许有键盘上连续5个如：QWERTY</span>
                <span class="token keyword">new</span> <span class="token class-name">IllegalSequenceRule</span><span class="token punctuation">(</span><span class="token class-name">EnglishSequenceData<span class="token punctuation">.</span>USQwerty</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token comment">// 不允许空格</span>
                <span class="token keyword">new</span> <span class="token class-name">WhitespaceRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 校验</span>
        <span class="token class-name">RuleResult</span> validate <span class="token operator">=</span> passwordValidator<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PasswordData</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 返回校验结果</span>
        <span class="token keyword">return</span> validate<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token class-name">ValidPassword</span> constraintAnnotation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ConstraintValidator</span><span class="token punctuation">.</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span>constraintAnnotation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注解加在字段上，控制层参数带上valid注解，启动测试：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211150037348.png" alt="image-20221115003732276"></p>
<p>来个键盘连续，直接报错：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211150038571.png" alt="image-20221115003804507"></p>
<h3 id="自定义注解校验两次密码是否一致" tabindex="-1"><a class="header-anchor" href="#自定义注解校验两次密码是否一致" aria-hidden="true">#</a> 自定义注解校验两次密码是否一致</h3>
<p>创建注解：注意Target，需要Type才能将注解加在类上。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">,</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">FIELD</span><span class="token punctuation">,</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">ANNOTATION_TYPE</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Constraint</span><span class="token punctuation">(</span>validatedBy <span class="token operator">=</span> <span class="token class-name">MatchValidator</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">MatchPassword</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">message</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">"两次密码不一致"</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">groups</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Payload</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">payload</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>校验类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MatchValidator</span> <span class="token keyword">implements</span> <span class="token class-name">ConstraintValidator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MatchPassword</span><span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token class-name">MatchPassword</span> constraintAnnotation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ConstraintValidator</span><span class="token punctuation">.</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span>constraintAnnotation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isValid</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span> userDTO<span class="token punctuation">,</span> <span class="token class-name">ConstraintValidatorContext</span> constraintValidatorContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userDTO<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">.</span><span class="token function">getMatchPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注解加在UserDTO类上，启动测试：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211150044657.png" alt="image-20221115004422581"></p>
<p>来个不一样的，直接报错：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211150044538.png" alt="image-20221115004447463"></p>
<p><img src="http://www.iocaop.com/images/2022-11/202211150045639.png" alt="image-20221115004503576"></p>
<h2 id="_3-5-验证消息的国际化" tabindex="-1"><a class="header-anchor" href="#_3-5-验证消息的国际化" aria-hidden="true">#</a> 3-5 验证消息的国际化</h2>
<h3 id="passay验证消息的国际化" tabindex="-1"><a class="header-anchor" href="#passay验证消息的国际化" aria-hidden="true">#</a> passay验证消息的国际化</h3>
<p>没有配置消息国际化之前，返回的错误信息不明确，而且是英文：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211212219801.png" alt="image-20221121221943706"></p>
<p>需要对消息进行国际化。</p>
<p>这一节旧笔记解释较为详细：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?#xsfyV'>点击跳转</a></p>
<p>步骤：</p>
<ul>
<li>创建一个消息解析器</li>
<li>配置验证器使用消息解析器</li>
<li>在对应的注解中写消息的键值</li>
</ul>
<p>在注解对应的切面类中注入，并且作为参数传递给passay的PasswordValidator的构造器：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211212223178.png" alt="image-20221121222342093"></p>
<p>将Resolver做成一个Bean，所以到配置类中添加：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">MessageSource</span> messageSource<span class="token punctuation">;</span>
    
	<span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">MessageResolver</span> <span class="token function">messageResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span>  <span class="token keyword">new</span> <span class="token class-name">SpringMessageResolver</span><span class="token punctuation">(</span>messageSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-11/202211212227825.png" alt="image-20221121222713724"></p>
<p>需要在切面中设置使用我们的消息解析器：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>        <span class="token comment">// 校验</span>
        <span class="token class-name">RuleResult</span> validate <span class="token operator">=</span> passwordValidator<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PasswordData</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 将原有的校验失败关掉</span>
        constraintValidatorContext<span class="token punctuation">.</span><span class="token function">disableDefaultConstraintViolation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置我们自己的</span>
        constraintValidatorContext<span class="token punctuation">.</span><span class="token function">buildConstraintViolationWithTemplate</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">,</span>
                passwordValidator<span class="token punctuation">.</span><span class="token function">getMessages</span><span class="token punctuation">(</span>validate<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addConstraintViolation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-11/202211212232238.png" alt="image-20221121223258150"></p>
<p>添加资源文件：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment"># Passay properties</span>
<span class="token key attr-name">HISTORY_VIOLATION</span><span class="token punctuation">=</span><span class="token value attr-value">Password matches one of {0} previous passwords.</span>
<span class="token key attr-name">ILLEGAL_WORD</span><span class="token punctuation">=</span><span class="token value attr-value">Password contains the dictionary word '{0}'.</span>
<span class="token key attr-name">ILLEGAL_WORD_REVERSED</span><span class="token punctuation">=</span><span class="token value attr-value">Password contains the reversed dictionary word '{0}'.</span>
<span class="token key attr-name">ILLEGAL_DIGEST_WORD</span><span class="token punctuation">=</span><span class="token value attr-value">Password contains a dictionary word.</span>
<span class="token key attr-name">ILLEGAL_DIGEST_WORD_REVERSED</span><span class="token punctuation">=</span><span class="token value attr-value">Password contains a reversed dictionary word.</span>
<span class="token key attr-name">ILLEGAL_MATCH</span><span class="token punctuation">=</span><span class="token value attr-value">Password matches the illegal pattern '{0}'.</span>
<span class="token key attr-name">ALLOWED_MATCH</span><span class="token punctuation">=</span><span class="token value attr-value">Password must match pattern '{0}'.</span>
<span class="token key attr-name">ILLEGAL_CHAR</span><span class="token punctuation">=</span><span class="token value attr-value">Password {1} the illegal character '{0}'.</span>
<span class="token key attr-name">ALLOWED_CHAR</span><span class="token punctuation">=</span><span class="token value attr-value">Password {1} the illegal character '{0}'.</span>
<span class="token key attr-name">ILLEGAL_QWERTY_SEQUENCE</span><span class="token punctuation">=</span><span class="token value attr-value">Password contains the illegal QWERTY sequence '{0}'.</span>
<span class="token key attr-name">ILLEGAL_ALPHABETICAL_SEQUENCE</span><span class="token punctuation">=</span><span class="token value attr-value">Password contains the illegal alphabetical sequence '{0}'.</span>
<span class="token key attr-name">ILLEGAL_NUMERICAL_SEQUENCE</span><span class="token punctuation">=</span><span class="token value attr-value">Password contains the illegal numerical sequence '{0}'.</span>
<span class="token key attr-name">ILLEGAL_USERNAME</span><span class="token punctuation">=</span><span class="token value attr-value">Password {1} the user id '{0}'.</span>
<span class="token key attr-name">ILLEGAL_USERNAME_REVERSED</span><span class="token punctuation">=</span><span class="token value attr-value">Password {1} the user id '{0}' in reverse.</span>
<span class="token key attr-name">ILLEGAL_WHITESPACE</span><span class="token punctuation">=</span><span class="token value attr-value">Password {1} a whitespace character.</span>
<span class="token key attr-name">ILLEGAL_NUMBER_RANGE</span><span class="token punctuation">=</span><span class="token value attr-value">Password {1} the number '{0}'.</span>
<span class="token key attr-name">ILLEGAL_REPEATED_CHARS</span><span class="token punctuation">=</span><span class="token value attr-value">Password contains {2} sequences of {0} or more repeated characters, but only {1} allowed: {3}.</span>
<span class="token key attr-name">INSUFFICIENT_UPPERCASE</span><span class="token punctuation">=</span><span class="token value attr-value">Password must contain {0} or more uppercase characters.</span>
<span class="token key attr-name">INSUFFICIENT_LOWERCASE</span><span class="token punctuation">=</span><span class="token value attr-value">Password must contain {0} or more lowercase characters.</span>
<span class="token key attr-name">INSUFFICIENT_ALPHABETICAL</span><span class="token punctuation">=</span><span class="token value attr-value">Password must contain {0} or more alphabetical characters.</span>
<span class="token key attr-name">INSUFFICIENT_DIGIT</span><span class="token punctuation">=</span><span class="token value attr-value">Password must contain {0} or more digit characters.</span>
<span class="token key attr-name">INSUFFICIENT_SPECIAL</span><span class="token punctuation">=</span><span class="token value attr-value">Password must contain {0} or more special characters.</span>
<span class="token key attr-name">INSUFFICIENT_CHARACTERISTICS</span><span class="token punctuation">=</span><span class="token value attr-value">Password matches {0} of {2} character rules, but {1} are required.</span>
<span class="token key attr-name">INSUFFICIENT_COMPLEXITY</span><span class="token punctuation">=</span><span class="token value attr-value">Password meets {1} complexity rules, but {2} are required.</span>
<span class="token key attr-name">INSUFFICIENT_COMPLEXITY_RULES</span><span class="token punctuation">=</span><span class="token value attr-value">No rules have been configured for a password of length {0}.</span>
<span class="token key attr-name">SOURCE_VIOLATION</span><span class="token punctuation">=</span><span class="token value attr-value">Password cannot be the same as your {0} password.</span>
<span class="token key attr-name">TOO_LONG</span><span class="token punctuation">=</span><span class="token value attr-value">Password must be no more than {1} characters in length.</span>
<span class="token key attr-name">TOO_SHORT</span><span class="token punctuation">=</span><span class="token value attr-value">Password must be {0} or more characters in length.</span>
<span class="token key attr-name">TOO_MANY_OCCURRENCES</span><span class="token punctuation">=</span><span class="token value attr-value">Password contains {1} occurrences of the character '{0}', but at most {2} are allowed.</span>

<span class="token key attr-name">jakarta.validation.constraints.AssertFalse.message</span>     <span class="token punctuation">=</span> <span class="token value attr-value">must be false</span>
<span class="token key attr-name">jakarta.validation.constraints.AssertTrue.message</span>      <span class="token punctuation">=</span> <span class="token value attr-value">must be true</span>
<span class="token key attr-name">jakarta.validation.constraints.DecimalMax.message</span>      <span class="token punctuation">=</span> <span class="token value attr-value">must be less than ${inclusive == true ? 'or equal to ' : ''}{value}</span>
<span class="token key attr-name">jakarta.validation.constraints.DecimalMin.message</span>      <span class="token punctuation">=</span> <span class="token value attr-value">must be greater than ${inclusive == true ? 'or equal to ' : ''}{value}</span>
<span class="token key attr-name">jakarta.validation.constraints.Digits.message</span>          <span class="token punctuation">=</span> <span class="token value attr-value">numeric value out of bounds (&lt;{integer} digits>.&lt;{fraction} digits> expected)</span>
<span class="token key attr-name">jakarta.validation.constraints.Email.message</span>           <span class="token punctuation">=</span> <span class="token value attr-value">must be a well-formed email address</span>
<span class="token key attr-name">jakarta.validation.constraints.Future.message</span>          <span class="token punctuation">=</span> <span class="token value attr-value">must be a future date</span>
<span class="token key attr-name">jakarta.validation.constraints.FutureOrPresent.message</span> <span class="token punctuation">=</span> <span class="token value attr-value">must be a date in the present or in the future</span>
<span class="token key attr-name">jakarta.validation.constraints.Max.message</span>             <span class="token punctuation">=</span> <span class="token value attr-value">must be less than or equal to {value}</span>
<span class="token key attr-name">jakarta.validation.constraints.Min.message</span>             <span class="token punctuation">=</span> <span class="token value attr-value">must be greater than or equal to {value}</span>
<span class="token key attr-name">jakarta.validation.constraints.Negative.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">must be less than 0</span>
<span class="token key attr-name">jakarta.validation.constraints.NegativeOrZero.message</span>  <span class="token punctuation">=</span> <span class="token value attr-value">must be less than or equal to 0</span>
<span class="token key attr-name">jakarta.validation.constraints.NotBlank.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">must not be blank</span>
<span class="token key attr-name">jakarta.validation.constraints.NotEmpty.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">must not be empty</span>
<span class="token key attr-name">jakarta.validation.constraints.NotNull.message</span>         <span class="token punctuation">=</span> <span class="token value attr-value">must not be null</span>
<span class="token key attr-name">jakarta.validation.constraints.Null.message</span>            <span class="token punctuation">=</span> <span class="token value attr-value">must be null</span>
<span class="token key attr-name">jakarta.validation.constraints.Past.message</span>            <span class="token punctuation">=</span> <span class="token value attr-value">must be a past date</span>
<span class="token key attr-name">jakarta.validation.constraints.PastOrPresent.message</span>   <span class="token punctuation">=</span> <span class="token value attr-value">must be a date in the past or in the present</span>
<span class="token key attr-name">jakarta.validation.constraints.Pattern.message</span>         <span class="token punctuation">=</span> <span class="token value attr-value">must match "{regexp}"</span>
<span class="token key attr-name">jakarta.validation.constraints.Positive.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">must be greater than 0</span>
<span class="token key attr-name">jakarta.validation.constraints.PositiveOrZero.message</span>  <span class="token punctuation">=</span> <span class="token value attr-value">must be greater than or equal to 0</span>
<span class="token key attr-name">jakarta.validation.constraints.Size.message</span>            <span class="token punctuation">=</span> <span class="token value attr-value">size must be between {min} and {max}</span>

<span class="token key attr-name">org.hibernate.validator.constraints.CreditCardNumber.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">invalid credit card number</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Currency.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">invalid currency (must be one of {value})</span>
<span class="token key attr-name">org.hibernate.validator.constraints.EAN.message</span>                     <span class="token punctuation">=</span> <span class="token value attr-value">invalid {type} barcode</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Email.message</span>                   <span class="token punctuation">=</span> <span class="token value attr-value">not a well-formed email address</span>
<span class="token key attr-name">org.hibernate.validator.constraints.ISBN.message</span>                    <span class="token punctuation">=</span> <span class="token value attr-value">invalid ISBN</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Length.message</span>                  <span class="token punctuation">=</span> <span class="token value attr-value">length must be between {min} and {max}</span>
<span class="token key attr-name">org.hibernate.validator.constraints.CodePointLength.message</span>         <span class="token punctuation">=</span> <span class="token value attr-value">length must be between {min} and {max}</span>
<span class="token key attr-name">org.hibernate.validator.constraints.LuhnCheck.message</span>               <span class="token punctuation">=</span> <span class="token value attr-value">the check digit for ${validatedValue} is invalid, Luhn Modulo 10 checksum failed</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Mod10Check.message</span>              <span class="token punctuation">=</span> <span class="token value attr-value">the check digit for ${validatedValue} is invalid, Modulo 10 checksum failed</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Mod11Check.message</span>              <span class="token punctuation">=</span> <span class="token value attr-value">the check digit for ${validatedValue} is invalid, Modulo 11 checksum failed</span>
<span class="token key attr-name">org.hibernate.validator.constraints.ModCheck.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">the check digit for ${validatedValue} is invalid, {modType} checksum failed</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Normalized.message</span>              <span class="token punctuation">=</span> <span class="token value attr-value">must be normalized</span>
<span class="token key attr-name">org.hibernate.validator.constraints.NotBlank.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">may not be empty</span>
<span class="token key attr-name">org.hibernate.validator.constraints.NotEmpty.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">may not be empty</span>
<span class="token key attr-name">org.hibernate.validator.constraints.ParametersScriptAssert.message</span>  <span class="token punctuation">=</span> <span class="token value attr-value">script expression "{script}" didn't evaluate to true</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Range.message</span>                   <span class="token punctuation">=</span> <span class="token value attr-value">must be between {min} and {max}</span>
<span class="token key attr-name">org.hibernate.validator.constraints.ScriptAssert.message</span>            <span class="token punctuation">=</span> <span class="token value attr-value">script expression "{script}" didn't evaluate to true</span>
<span class="token key attr-name">org.hibernate.validator.constraints.UniqueElements.message</span>          <span class="token punctuation">=</span> <span class="token value attr-value">must only contain unique elements</span>
<span class="token key attr-name">org.hibernate.validator.constraints.URL.message</span>                     <span class="token punctuation">=</span> <span class="token value attr-value">must be a valid URL</span>

<span class="token key attr-name">org.hibernate.validator.constraints.br.CNPJ.message</span>                 <span class="token punctuation">=</span> <span class="token value attr-value">invalid Brazilian corporate taxpayer registry number (CNPJ)</span>
<span class="token key attr-name">org.hibernate.validator.constraints.br.CPF.message</span>                  <span class="token punctuation">=</span> <span class="token value attr-value">invalid Brazilian individual taxpayer registry number (CPF)</span>
<span class="token key attr-name">org.hibernate.validator.constraints.br.TituloEleitoral.message</span>      <span class="token punctuation">=</span> <span class="token value attr-value">invalid Brazilian Voter ID card number</span>

<span class="token key attr-name">org.hibernate.validator.constraints.pl.REGON.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">invalid Polish Taxpayer Identification Number (REGON)</span>
<span class="token key attr-name">org.hibernate.validator.constraints.pl.NIP.message</span>                  <span class="token punctuation">=</span> <span class="token value attr-value">invalid VAT Identification Number (NIP)</span>
<span class="token key attr-name">org.hibernate.validator.constraints.pl.PESEL.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">invalid Polish National Identification Number (PESEL)</span>

<span class="token key attr-name">org.hibernate.validator.constraints.time.DurationMax.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">must be shorter than${inclusive == true ? ' or equal to' : ''}${days == 0 ? '' : days == 1 ? ' 1 day' : ' ' += days += ' days'}${hours == 0 ? '' : hours == 1 ? ' 1 hour' : ' ' += hours += ' hours'}${minutes == 0 ? '' : minutes == 1 ? ' 1 minute' : ' ' += minutes += ' minutes'}${seconds == 0 ? '' : seconds == 1 ? ' 1 second' : ' ' += seconds += ' seconds'}${millis == 0 ? '' : millis == 1 ? ' 1 milli' : ' ' += millis += ' millis'}${nanos == 0 ? '' : nanos == 1 ? ' 1 nano' : ' ' += nanos += ' nanos'}</span>
<span class="token key attr-name">org.hibernate.validator.constraints.time.DurationMin.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">must be longer than${inclusive == true ? ' or equal to' : ''}${days == 0 ? '' : days == 1 ? ' 1 day' : ' ' += days += ' days'}${hours == 0 ? '' : hours == 1 ? ' 1 hour' : ' ' += hours += ' hours'}${minutes == 0 ? '' : minutes == 1 ? ' 1 minute' : ' ' += minutes += ' minutes'}${seconds == 0 ? '' : seconds == 1 ? ' 1 second' : ' ' += seconds += ' seconds'}${millis == 0 ? '' : millis == 1 ? ' 1 milli' : ' ' += millis += ' millis'}${nanos == 0 ? '' : nanos == 1 ? ' 1 nano' : ' ' += nanos += ' nanos'}</span>

<span class="token key attr-name">ValidEmail.email</span><span class="token punctuation">=</span><span class="token value attr-value">Invalid Email</span>
<span class="token key attr-name">PasswordMatches.userDto</span><span class="token punctuation">=</span><span class="token value attr-value">Passwords do not match</span>

<span class="token key attr-name">login.page.title</span><span class="token punctuation">=</span><span class="token value attr-value">Login</span>
<span class="token key attr-name">login.page.logout.msg</span><span class="token punctuation">=</span><span class="token value attr-value">You have logged out.</span>
<span class="token key attr-name">login.page.bad-credential</span><span class="token punctuation">=</span><span class="token value attr-value">Username or password is wrong</span>
<span class="token key attr-name">login.page.form.username</span><span class="token punctuation">=</span><span class="token value attr-value">Username</span>
<span class="token key attr-name">login.page.form.password</span><span class="token punctuation">=</span><span class="token value attr-value">Password</span>
<span class="token key attr-name">login.page.form.submit</span><span class="token punctuation">=</span><span class="token value attr-value">Login</span>
<span class="token key attr-name">index.page.menu.sign-out</span><span class="token punctuation">=</span><span class="token value attr-value">Sign Out</span>
<span class="token key attr-name">login.page.form.remember-me</span><span class="token punctuation">=</span><span class="token value attr-value">Remember me</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment"># Passay 属性</span>
<span class="token key attr-name">HISTORY_VIOLATION</span><span class="token punctuation">=</span><span class="token value attr-value">密码和您最近用过的 {0} 个密码之一重复。</span>
<span class="token key attr-name">ILLEGAL_WORD</span><span class="token punctuation">=</span><span class="token value attr-value">密码包含了黑名单字典中的词 {0}。</span>
<span class="token key attr-name">ILLEGAL_WORD_REVERSED</span><span class="token punctuation">=</span><span class="token value attr-value">密码包含了保留字典中的词 {0}。</span>
<span class="token key attr-name">ILLEGAL_DIGEST_WORD</span><span class="token punctuation">=</span><span class="token value attr-value">密码包含了字典中的词。</span>
<span class="token key attr-name">ILLEGAL_DIGEST_WORD_REVERSED</span><span class="token punctuation">=</span><span class="token value attr-value">密码包含了保留字典中的词。</span>
<span class="token key attr-name">ILLEGAL_MATCH</span><span class="token punctuation">=</span><span class="token value attr-value">密码匹配了非法结构 {0}。</span>
<span class="token key attr-name">ALLOWED_MATCH</span><span class="token punctuation">=</span><span class="token value attr-value">密码必须要匹配结构 {0}。</span>
<span class="token key attr-name">ILLEGAL_CHAR</span><span class="token punctuation">=</span><span class="token value attr-value">密码 {1} 非法字符 {0}。</span>
<span class="token key attr-name">ALLOWED_CHAR</span><span class="token punctuation">=</span><span class="token value attr-value">密码 {1} 非法字符 {0}。</span>
<span class="token key attr-name">ILLEGAL_QWERTY_SEQUENCE</span><span class="token punctuation">=</span><span class="token value attr-value">密码包含非法的QWERTY序列 {0}。</span>
<span class="token key attr-name">ILLEGAL_ALPHABETICAL_SEQUENCE</span><span class="token punctuation">=</span><span class="token value attr-value">密码包含非法的字母序列 {0}。</span>
<span class="token key attr-name">ILLEGAL_NUMERICAL_SEQUENCE</span><span class="token punctuation">=</span><span class="token value attr-value">密码包含非法的数字序列 {0}。</span>
<span class="token key attr-name">ILLEGAL_USERNAME</span><span class="token punctuation">=</span><span class="token value attr-value">密码 {1} 用户 id {0}。</span>
<span class="token key attr-name">ILLEGAL_USERNAME_REVERSED</span><span class="token punctuation">=</span><span class="token value attr-value">密码 {1} 倒序的用户 id {0}。</span>
<span class="token key attr-name">ILLEGAL_WHITESPACE</span><span class="token punctuation">=</span><span class="token value attr-value">密码 {1} 空格。</span>
<span class="token key attr-name">ILLEGAL_NUMBER_RANGE</span><span class="token punctuation">=</span><span class="token value attr-value">密码 {1} 数字 {0}.</span>
<span class="token key attr-name">ILLEGAL_REPEATED_CHARS</span><span class="token punctuation">=</span><span class="token value attr-value">密码中包含 {2} 序列 {0} 的一个或多个重复字符, 但仅允许 {1} 个: {3}。</span>
<span class="token key attr-name">INSUFFICIENT_UPPERCASE</span><span class="token punctuation">=</span><span class="token value attr-value">密码中必须包含至少 {0} 个大写字母。</span>
<span class="token key attr-name">INSUFFICIENT_LOWERCASE</span><span class="token punctuation">=</span><span class="token value attr-value">密码中必须包含至少 {0} 个小写字母。</span>
<span class="token key attr-name">INSUFFICIENT_ALPHABETICAL</span><span class="token punctuation">=</span><span class="token value attr-value">密码中必须包含至少 {0} 个字母。</span>
<span class="token key attr-name">INSUFFICIENT_DIGIT</span><span class="token punctuation">=</span><span class="token value attr-value">密码中必须包含至少 {0} 个数字。</span>
<span class="token key attr-name">INSUFFICIENT_SPECIAL</span><span class="token punctuation">=</span><span class="token value attr-value">密码中必须包含至少 {0} 个特殊字符。</span>
<span class="token key attr-name">INSUFFICIENT_CHARACTERISTICS</span><span class="token punctuation">=</span><span class="token value attr-value">密码匹配了 {0} of {2} 字符规则, 但只允许 {1} 个。</span>
<span class="token key attr-name">INSUFFICIENT_COMPLEXITY</span><span class="token punctuation">=</span><span class="token value attr-value">密码符合了 {1} 个复杂规则, 但需要符合 {2} 个。</span>
<span class="token key attr-name">INSUFFICIENT_COMPLEXITY_RULES</span><span class="token punctuation">=</span><span class="token value attr-value">对于密码长度 {0}，没有配置规则。</span>
<span class="token key attr-name">SOURCE_VIOLATION</span><span class="token punctuation">=</span><span class="token value attr-value">密码不能和之前的 {0} 个历史密码相同。</span>
<span class="token key attr-name">TOO_LONG</span><span class="token punctuation">=</span><span class="token value attr-value">密码长度不能超过 {1} 个字符。</span>
<span class="token key attr-name">TOO_SHORT</span><span class="token punctuation">=</span><span class="token value attr-value">密码长度不能少于 {0} 个字符。</span>
<span class="token key attr-name">TOO_MANY_OCCURRENCES</span><span class="token punctuation">=</span><span class="token value attr-value">密码包含 {1} 个 {0}, 但是至多只允许 {2} 个。</span>

<span class="token key attr-name">jakarta.validation.constraints.AssertFalse.message</span>     <span class="token punctuation">=</span> <span class="token value attr-value">\u53ea\u80fd\u4e3afalse</span>
<span class="token key attr-name">jakarta.validation.constraints.AssertTrue.message</span>      <span class="token punctuation">=</span> <span class="token value attr-value">\u53ea\u80fd\u4e3atrue</span>
<span class="token key attr-name">jakarta.validation.constraints.DecimalMax.message</span>      <span class="token punctuation">=</span> <span class="token value attr-value">\u5fc5\u987b\u5c0f\u4e8e\u6216\u7b49\u4e8e{value}</span>
<span class="token key attr-name">jakarta.validation.constraints.DecimalMin.message</span>      <span class="token punctuation">=</span> <span class="token value attr-value">\u5fc5\u987b\u5927\u4e8e\u6216\u7b49\u4e8e{value}</span>
<span class="token key attr-name">jakarta.validation.constraints.Digits.message</span>          <span class="token punctuation">=</span> <span class="token value attr-value">\u6570\u5b57\u7684\u503c\u8d85\u51fa\u4e86\u5141\u8bb8\u8303\u56f4(\u53ea\u5141\u8bb8\u5728{integer}\u4f4d\u6574\u6570\u548c{fraction}\u4f4d\u5c0f\u6570\u8303\u56f4\u5185)</span>
<span class="token key attr-name">jakarta.validation.constraints.Email.message</span>           <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u662f\u4e00\u4e2a\u5408\u6cd5\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740</span>
<span class="token key attr-name">jakarta.validation.constraints.Future.message</span>          <span class="token punctuation">=</span> <span class="token value attr-value">\u9700\u8981\u662f\u4e00\u4e2a\u5c06\u6765\u7684\u65f6\u95f4</span>
<span class="token key attr-name">jakarta.validation.constraints.FutureOrPresent.message</span> <span class="token punctuation">=</span> <span class="token value attr-value">\u9700\u8981\u662f\u4e00\u4e2a\u5c06\u6765\u6216\u73b0\u5728\u7684\u65f6\u95f4</span>
<span class="token key attr-name">jakarta.validation.constraints.Max.message</span>             <span class="token punctuation">=</span> <span class="token value attr-value">\u6700\u5927\u4e0d\u80fd\u8d85\u8fc7{value}</span>
<span class="token key attr-name">jakarta.validation.constraints.Min.message</span>             <span class="token punctuation">=</span> <span class="token value attr-value">\u6700\u5c0f\u4e0d\u80fd\u5c0f\u4e8e{value}</span>
<span class="token key attr-name">jakarta.validation.constraints.Negative.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">\u5fc5\u987b\u662f\u8d1f\u6570</span>
<span class="token key attr-name">jakarta.validation.constraints.NegativeOrZero.message</span>  <span class="token punctuation">=</span> <span class="token value attr-value">\u5fc5\u987b\u662f\u8d1f\u6570\u6216\u96f6</span>
<span class="token key attr-name">jakarta.validation.constraints.NotBlank.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u80fd\u4e3a\u7a7a</span>
<span class="token key attr-name">jakarta.validation.constraints.NotEmpty.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u80fd\u4e3a\u7a7a</span>
<span class="token key attr-name">jakarta.validation.constraints.NotNull.message</span>         <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u80fd\u4e3anull</span>
<span class="token key attr-name">jakarta.validation.constraints.Null.message</span>            <span class="token punctuation">=</span> <span class="token value attr-value">\u5fc5\u987b\u4e3anull</span>
<span class="token key attr-name">jakarta.validation.constraints.Past.message</span>            <span class="token punctuation">=</span> <span class="token value attr-value">\u9700\u8981\u662f\u4e00\u4e2a\u8fc7\u53bb\u7684\u65f6\u95f4</span>
<span class="token key attr-name">jakarta.validation.constraints.PastOrPresent.message</span>   <span class="token punctuation">=</span> <span class="token value attr-value">\u9700\u8981\u662f\u4e00\u4e2a\u8fc7\u53bb\u6216\u73b0\u5728\u7684\u65f6\u95f4</span>
<span class="token key attr-name">jakarta.validation.constraints.Pattern.message</span>         <span class="token punctuation">=</span> <span class="token value attr-value">\u9700\u8981\u5339\u914d\u6b63\u5219\u8868\u8fbe\u5f0f"{regexp}"</span>
<span class="token key attr-name">jakarta.validation.constraints.Positive.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">\u5fc5\u987b\u662f\u6b63\u6570</span>
<span class="token key attr-name">jakarta.validation.constraints.PositiveOrZero.message</span>  <span class="token punctuation">=</span> <span class="token value attr-value">\u5fc5\u987b\u662f\u6b63\u6570\u6216\u96f6</span>
<span class="token key attr-name">jakarta.validation.constraints.Size.message</span>            <span class="token punctuation">=</span> <span class="token value attr-value">\u4e2a\u6570\u5fc5\u987b\u5728{min}\u548c{max}\u4e4b\u95f4</span>

<span class="token key attr-name">org.hibernate.validator.constraints.CreditCardNumber.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u5408\u6cd5\u7684\u4fe1\u7528\u5361\u53f7\u7801</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Currency.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u5408\u6cd5\u7684\u8d27\u5e01 (\u5fc5\u987b\u662f{value}\u5176\u4e2d\u4e4b\u4e00)</span>
<span class="token key attr-name">org.hibernate.validator.constraints.EAN.message</span>                     <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u5408\u6cd5\u7684{type}\u6761\u5f62\u7801</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Email.message</span>                   <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u662f\u4e00\u4e2a\u5408\u6cd5\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Length.message</span>                  <span class="token punctuation">=</span> <span class="token value attr-value">\u957f\u5ea6\u9700\u8981\u5728{min}\u548c{max}\u4e4b\u95f4</span>
<span class="token key attr-name">org.hibernate.validator.constraints.CodePointLength.message</span>         <span class="token punctuation">=</span> <span class="token value attr-value">\u957f\u5ea6\u9700\u8981\u5728{min}\u548c{max}\u4e4b\u95f4</span>
<span class="token key attr-name">org.hibernate.validator.constraints.LuhnCheck.message</span>               <span class="token punctuation">=</span> <span class="token value attr-value">${validatedValue}\u7684\u6821\u9a8c\u7801\u4e0d\u5408\u6cd5, Luhn\u6a2110\u6821\u9a8c\u548c\u4e0d\u5339\u914d</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Mod10Check.message</span>              <span class="token punctuation">=</span> <span class="token value attr-value">${validatedValue}\u7684\u6821\u9a8c\u7801\u4e0d\u5408\u6cd5, \u6a2110\u6821\u9a8c\u548c\u4e0d\u5339\u914d</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Mod11Check.message</span>              <span class="token punctuation">=</span> <span class="token value attr-value">${validatedValue}\u7684\u6821\u9a8c\u7801\u4e0d\u5408\u6cd5, \u6a2111\u6821\u9a8c\u548c\u4e0d\u5339\u914d</span>
<span class="token key attr-name">org.hibernate.validator.constraints.ModCheck.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">${validatedValue}\u7684\u6821\u9a8c\u7801\u4e0d\u5408\u6cd5, {modType}\u6821\u9a8c\u548c\u4e0d\u5339\u914d</span>
<span class="token key attr-name">org.hibernate.validator.constraints.NotBlank.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u80fd\u4e3a\u7a7a</span>
<span class="token key attr-name">org.hibernate.validator.constraints.NotEmpty.message</span>                <span class="token punctuation">=</span> <span class="token value attr-value">\u4e0d\u80fd\u4e3a\u7a7a</span>
<span class="token key attr-name">org.hibernate.validator.constraints.ParametersScriptAssert.message</span>  <span class="token punctuation">=</span> <span class="token value attr-value">\u6267\u884c\u811a\u672c\u8868\u8fbe\u5f0f"{script}"\u6ca1\u6709\u8fd4\u56de\u671f\u671b\u7ed3\u679c</span>
<span class="token key attr-name">org.hibernate.validator.constraints.Range.message</span>                   <span class="token punctuation">=</span> <span class="token value attr-value">\u9700\u8981\u5728{min}\u548c{max}\u4e4b\u95f4</span>
<span class="token key attr-name">org.hibernate.validator.constraints.ScriptAssert.message</span>            <span class="token punctuation">=</span> <span class="token value attr-value">\u6267\u884c\u811a\u672c\u8868\u8fbe\u5f0f"{script}"\u6ca1\u6709\u8fd4\u56de\u671f\u671b\u7ed3\u679c</span>
<span class="token key attr-name">org.hibernate.validator.constraints.URL.message</span>                     <span class="token punctuation">=</span> <span class="token value attr-value">\u9700\u8981\u662f\u4e00\u4e2a\u5408\u6cd5\u7684URL</span>

<span class="token key attr-name">org.hibernate.validator.constraints.time.DurationMax.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">\u5fc5\u987b\u5c0f\u4e8e${inclusive == true ? '\u6216\u7b49\u4e8e' : ''}${days == 0 ? '' : days += '\u5929'}${hours == 0 ? '' : hours += '\u5c0f\u65f6'}${minutes == 0 ? '' : minutes += '\u5206\u949f'}${seconds == 0 ? '' : seconds += '\u79d2'}${millis == 0 ? '' : millis += '\u6beb\u79d2'}${nanos == 0 ? '' : nanos += '\u7eb3\u79d2'}</span>
<span class="token key attr-name">org.hibernate.validator.constraints.time.DurationMin.message</span>        <span class="token punctuation">=</span> <span class="token value attr-value">\u5fc5\u987b\u5927\u4e8e${inclusive == true ? '\u6216\u7b49\u4e8e' : ''}${days == 0 ? '' : days += '\u5929'}${hours == 0 ? '' : hours += '\u5c0f\u65f6'}${minutes == 0 ? '' : minutes += '\u5206\u949f'}${seconds == 0 ? '' : seconds += '\u79d2'}${millis == 0 ? '' : millis += '\u6beb\u79d2'}${nanos == 0 ? '' : nanos += '\u7eb3\u79d2'}</span>

<span class="token key attr-name">ValidEmail.email</span><span class="token punctuation">=</span><span class="token value attr-value">非法电子邮件地址</span>
<span class="token key attr-name">PasswordMatches.userDto</span><span class="token punctuation">=</span><span class="token value attr-value">密码输入不一致</span>

<span class="token key attr-name">login.page.title</span><span class="token punctuation">=</span><span class="token value attr-value">登录</span>
<span class="token key attr-name">login.page.logout.msg</span><span class="token punctuation">=</span><span class="token value attr-value">您已退出登录</span>
<span class="token key attr-name">login.page.bad-credential</span><span class="token punctuation">=</span><span class="token value attr-value">用户名或密码不正确</span>
<span class="token key attr-name">login.page.form.username</span><span class="token punctuation">=</span><span class="token value attr-value">用户名</span>
<span class="token key attr-name">login.page.form.password</span><span class="token punctuation">=</span><span class="token value attr-value">密码</span>
<span class="token key attr-name">login.page.form.submit</span><span class="token punctuation">=</span><span class="token value attr-value">登录</span>
<span class="token key attr-name">index.page.menu.sign-out</span><span class="token punctuation">=</span><span class="token value attr-value">退出登录</span>
<span class="token key attr-name">login.page.form.remember-me</span><span class="token punctuation">=</span><span class="token value attr-value">记住我</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动，看到打印的信息已经进行了国际化：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211212239219.png" alt="image-20221121223920155"></p>
<h3 id="jsr380验证消息的国际化" tabindex="-1"><a class="header-anchor" href="#jsr380验证消息的国际化" aria-hidden="true">#</a> jsr380验证消息的国际化</h3>
<p>上面我们只配置了passay的验证消息国际化，那还有jsr380消息验证也想国际化，就需要再配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">LocalValidatorFactoryBean</span> <span class="token function">localValidatorFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">LocalValidatorFactoryBean</span> localValidatorFactoryBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalValidatorFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        localValidatorFactoryBean<span class="token punctuation">.</span><span class="token function">setValidationMessageSource</span><span class="token punctuation">(</span>messageSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> localValidatorFactoryBean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-11/202211212248798.png" alt="image-20221121224829739"></p>
<p>之前已经添加好国际化消息的键值，现在来测试一下，把校验邮箱的改一下：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211212250426.png" alt="image-20221121225031355"></p>
<p>重启，测试一下：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211212251904.png" alt="image-20221121225121841"></p>
<p>也实现了国际化。</p>
<h2 id="_3-6异常的处理" tabindex="-1"><a class="header-anchor" href="#_3-6异常的处理" aria-hidden="true">#</a> 3-6异常的处理</h2>
<p>导入异常处理框架：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.zalando<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>problem-spring-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.27.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个处理器，实现ProblemHandling接口，用于处理非Security的异常：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@ControllerAdvice</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionHandler</span> <span class="token keyword">implements</span> <span class="token class-name">ProblemHandling</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 是否返回堆栈信息
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isCausalChainsEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个处理器，用于处理Security的异常：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityAdviceHandler</span> <span class="token keyword">implements</span> <span class="token class-name">SecurityAdviceTrait</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Security配置中添加：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211212324736.png" alt="image-20221121232414658"></p>
<p>启动测试结果，打印了堆栈信息，和比较有结构的异常信息：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211212324937.png" alt="image-20221121232443867"></p>
<p>但是还是会返回堆栈信息，查资料后，需要在WebMvcConfigurer添加如下代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">ObjectMapper</span> <span class="token function">objectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        objectMapper<span class="token punctuation">.</span><span class="token function">registerModules</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ProblemModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ConstraintViolationProblemModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> objectMapper<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-7-多个安全配置共存" tabindex="-1"><a class="header-anchor" href="#_3-7-多个安全配置共存" aria-hidden="true">#</a> 3-7 多个安全配置共存</h2>
<p>我们之前做的是即支持json登录，也支持页面上表单的方式登录。那要将这两种方式的配置进行分离，怎么做？</p>
<p>抽取配置文件：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableWebSecurity</span><span class="token punctuation">(</span>debug <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginSecurityConfig</span> <span class="token keyword">extends</span> <span class="token class-name">WebSecurityConfigurerAdapter</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">PasswordEncoder</span> passwordEncoder<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>auth<span class="token operator">-></span>auth<span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 表单配置</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>form<span class="token operator">-></span>form
                        <span class="token punctuation">.</span><span class="token function">loginPage</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>

                                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">//                        .successHandler(((request, response, authentication) -> {</span>
<span class="token comment">//                            response.setStatus(HttpServletResponse.SC_OK);</span>
<span class="token comment">//                            response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));</span>
<span class="token comment">//                        }))</span>
<span class="token comment">//                        .failureHandler(((request, response, exception) -> {</span>
<span class="token comment">//                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);</span>
<span class="token comment">//                            response.setCharacterEncoding("UTF-8");</span>
<span class="token comment">//                            response.getWriter().println(new ObjectMapper().writeValueAsString(exception));</span>
<span class="token comment">//                        }))</span>



                <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf <span class="token operator">-></span> csrf<span class="token punctuation">.</span><span class="token function">ignoringAntMatchers</span><span class="token punctuation">(</span><span class="token string">"/auth/**"</span><span class="token punctuation">,</span> <span class="token string">"/admin/**"</span><span class="token punctuation">,</span> <span class="token string">"/api/**"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">WebSecurity</span> web<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 配置不需要经过过滤器链的路径</span>
        web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token comment">// 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了</span>
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token class-name">PathRequest</span><span class="token punctuation">.</span><span class="token function">toStaticResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atCommonLocations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth<span class="token punctuation">.</span><span class="token function">inMemoryAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span>passwordEncoder<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableWebSecurity</span><span class="token punctuation">(</span>debug <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">SecurityProblemSupport</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfig</span> <span class="token keyword">extends</span> <span class="token class-name">WebSecurityConfigurerAdapter</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ObjectMapper</span> objectMapper<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">SecurityProblemSupport</span> securityProblemSupport<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span>req <span class="token operator">-></span> req<span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/api/**"</span><span class="token punctuation">,</span> <span class="token string">"/admin/**"</span><span class="token punctuation">,</span> <span class="token string">"/auth/**"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exceptionHandling</span><span class="token punctuation">(</span>exp <span class="token operator">-></span>
                        exp<span class="token punctuation">.</span><span class="token function">authenticationEntryPoint</span><span class="token punctuation">(</span>securityProblemSupport<span class="token punctuation">)</span>
                                <span class="token punctuation">.</span><span class="token function">accessDeniedHandler</span><span class="token punctuation">(</span>securityProblemSupport<span class="token punctuation">)</span>
                <span class="token punctuation">)</span>

                <span class="token comment">// 授权配置</span>
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req <span class="token operator">-></span> req
                        <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/auth/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/admin/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/api/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"USER"</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
<span class="token comment">//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))</span>
                <span class="token punctuation">.</span><span class="token function">addFilterAt</span><span class="token punctuation">(</span><span class="token function">restAuthenticationFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">UsernamePasswordAuthenticationFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>

                <span class="token comment">// 插入过滤器，替代内置的登录认证过滤器</span>
<span class="token comment">//                .csrf(csrf -> csrf.disable())</span>

<span class="token comment">//                 HTTP配置</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf <span class="token operator">-></span> csrf<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">//                 跨域配置</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>csrf <span class="token operator">-></span> csrf<span class="token punctuation">.</span><span class="token function">ignoringAntMatchers</span><span class="token punctuation">(</span><span class="token string">"/auth/**"</span><span class="token punctuation">,</span> <span class="token string">"/admin/**"</span><span class="token punctuation">,</span> <span class="token string">"/api/**"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//                .logout(logout->logout.logoutUrl("/perform_logout").permitAll()</span>
    <span class="token punctuation">}</span>


<span class="token comment">//    @Override</span>
<span class="token comment">//    protected void configure(HttpSecurity http) throws Exception {</span>
<span class="token comment">//        http</span>
<span class="token comment">//                .requestMatchers(req -> req.mvcMatchers("/api/**", "/admin/**", "/auth/**"))</span>
<span class="token comment">//                .sessionManagement(sessionManagement -> sessionManagement</span>
<span class="token comment">//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))</span>
<span class="token comment">//                .exceptionHandling(exceptionHandling -> exceptionHandling</span>
<span class="token comment">//                        .authenticationEntryPoint(securityProblemSupport)</span>
<span class="token comment">//                        .accessDeniedHandler(securityProblemSupport))</span>
<span class="token comment">//                .authorizeRequests(authorizeRequests -> authorizeRequests</span>
<span class="token comment">//                        .antMatchers("/auth/**").permitAll()</span>
<span class="token comment">//                        .antMatchers("/admin/**").hasRole("ADMIN")</span>
<span class="token comment">//                        .antMatchers("/api/**").hasRole("USER")</span>
<span class="token comment">//                        .anyRequest().authenticated())</span>
<span class="token comment">//                .addFilterAt(restAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)</span>
<span class="token comment">//                .csrf(csrf -> csrf.ignoringAntMatchers("/auth/**", "/admin/**", "/api/**"))</span>
<span class="token comment">//                .formLogin(AbstractHttpConfigurer::disable)</span>
<span class="token comment">//                .httpBasic(AbstractHttpConfigurer::disable);</span>
<span class="token comment">//    }</span>

    <span class="token keyword">private</span> <span class="token class-name">RestAuthenticationFilter</span> <span class="token function">restAuthenticationFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 构造器注入objectMapper，所以需要传参，那么在本类也使用构造器注入，再传进来</span>
        <span class="token class-name">RestAuthenticationFilter</span> restAuthenticationFilter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestAuthenticationFilter</span><span class="token punctuation">(</span>objectMapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置鉴权成功处理器</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setAuthenticationSuccessHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置鉴权失败处理器</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setAuthenticationFailureHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>exception<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置认证管理器(用什么做认证)</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setAuthenticationManager</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">authenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置过滤器应用的url</span>
        restAuthenticationFilter<span class="token punctuation">.</span><span class="token function">setFilterProcessesUrl</span><span class="token punctuation">(</span><span class="token string">"/auth/login"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> restAuthenticationFilter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">WebSecurity</span> web<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span> <span class="token string">"/error/**"</span><span class="token punctuation">)</span>
<span class="token comment">//                .mvcMatchers("/auth/**");</span>
        <span class="token comment">// 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了</span>
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token class-name">PathRequest</span><span class="token punctuation">.</span><span class="token function">toStaticResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atCommonLocations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth<span class="token punctuation">.</span><span class="token function">inMemoryAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 密码编码器-需要放到ioc中
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">PasswordEncoder</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">PasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 默认的密码编码器</span>
        <span class="token class-name">String</span> idForDefault <span class="token operator">=</span> <span class="token string">"bcrypt"</span><span class="token punctuation">;</span>
        <span class="token comment">// 该系统中支持的密码编码器</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">PasswordEncoder</span><span class="token punctuation">></span></span> passwordEncoderMap <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>idForDefault<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">"SHA-1"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MessageDigestPasswordEncoder</span><span class="token punctuation">(</span><span class="token string">"SHA-1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DelegatingPasswordEncoder</span><span class="token punctuation">(</span>idForDefault<span class="token punctuation">,</span> passwordEncoderMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，使用表单登录和使用json登录两种方式的配置就分开了，不写在一起，但是需要设置顺序Order()，不然会报错。</p>
<h2 id="_4-1-核心组件securitycontext" tabindex="-1"><a class="header-anchor" href="#_4-1-核心组件securitycontext" aria-hidden="true">#</a> 4-1 核心组件SecurityContext</h2>
<h3 id="springsecurity中的包" tabindex="-1"><a class="header-anchor" href="#springsecurity中的包" aria-hidden="true">#</a> SpringSecurity中的包：</h3>
<ul>
<li>
<p>Remoting、CAS、OpenID、LDAP、ACL、</p>
</li>
<li>
<p>Web、Core、Config</p>
</li>
<li>
<p>OAuth2 Core、OAuth2 Client、OAuth JOSE、OAuth2 Resource Server</p>
</li>
</ul>
<h3 id="核心组件" tabindex="-1"><a class="header-anchor" href="#核心组件" aria-hidden="true">#</a> 核心组件：</h3>
<ul>
<li>SecurityContext：安全上下文，用来存储当前认证的用户的详细信息</li>
<li>SecurityContextHolder：工具类，提供了对安全上下文SecurityContext的访问，默认是ThreadLocal对象存储上下文。</li>
<li>Authentication
<ul>
<li>存储了当前用户的详细信息</li>
<li>Principal 可以理解为用户的信息</li>
<li>Credentials 可以理解为密码</li>
<li>Authorities 可以理解为权限</li>
</ul>
</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-11/202211222208799.png" alt="image-20221122220830728"></p>
<h3 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication" aria-hidden="true">#</a> Authentication</h3>
<p>是认证体系中的核心元素，SpringSecurity内建了很多派生类，比如用户名密码的那个UsernamePasswordAuthenticationToken</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211222215858.png" alt="image-20221122221556716"></p>
<p>Principal定义了一个接口，用来存储用户信息，相比Object就多了一个getName方法，其他的由实现类具体实现。</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211222222164.png" alt="image-20221122222205123"></p>
<p>Authentication也是一个接口：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211222225944.png" alt="image-20221122222509903"></p>
<p>AbstractAuthenticationToken抽象类实现了一部分Authentication的方法，后面我们做自定义认证时直接继承这个类，会很方便，比如UsernamePasswordAuthenticationToken就是继承了这个类。</p>
<p>Principal是一个Object可以放任意的东西。UserDetails就是其中一种。</p>
<h2 id="_4-2-userdetails和userdetaisservice" tabindex="-1"><a class="header-anchor" href="#_4-2-userdetails和userdetaisservice" aria-hidden="true">#</a> 4-2 UserDetails和UserDetaisService</h2>
<p>UserDetails是什么？放用户信息，是SpringSecurity定义的一个接口，用来约束我们，需要提供用户的这些信息。</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211222233350.png" alt="image-20221122223324306"></p>
<p>UserDetailsService是什么？用来获取用户信息。只有一个方法，根据用户名获取用户信息。</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211222234400.png" alt="image-20221122223437355"></p>
<p>这两个接口不负责认证，只是提供数据，一般都是通过扩展这两个接口来实现自定义的数据库结构。</p>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>来配置一下基于数据库的认证，原来是内存的。之类使用H2，后面再切换mysql</p>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code> 		<span class="token comment">&lt;!--    jdbc    --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--   h2数据库     --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.h2database<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>h2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置类：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.h2.Driver
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">''</span>
    <span class="token comment"># MODE=MySQL 兼容Mysql</span>
    <span class="token comment"># DATABASE_TO_LOWER=TRUE 表名转为小写</span>
    <span class="token comment"># CASE_INSENSITIVE_IDENTIFIERS=TRUE 不区分大小写</span>
    <span class="token comment"># DB_CLOSE_DELAY=-1不自动关闭数据库连接</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>h2<span class="token punctuation">:</span>mem<span class="token punctuation">:</span>test;MODE=MySQL;DATABASE_TO_LOWER=TRUE;CASE_INSENSITIVE_IDENTIFIERS=TRUE;DB_CLOSE_DELAY=<span class="token punctuation">-</span><span class="token number">1</span>
    <span class="token comment"># 数据库用户名</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> sa
  <span class="token key atrule">devtools</span><span class="token punctuation">:</span>
    <span class="token key atrule">livereload</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">h2</span><span class="token punctuation">:</span>
    <span class="token key atrule">console</span><span class="token punctuation">:</span>
      <span class="token comment"># 显示 H2 嵌入式 UI 管理界面</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token comment"># 访问 H2 管理界面的路径</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /h2<span class="token punctuation">-</span>console
      <span class="token key atrule">settings</span><span class="token punctuation">:</span>
        <span class="token comment"># 禁止输出 Trace 信息</span>
        <span class="token key atrule">trace</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
        <span class="token comment"># 禁止远程访问 H2 管理界面</span>
        <span class="token key atrule">web-allow-others</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置使用jdbc进行认证:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth
<span class="token comment">//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())</span>
                <span class="token punctuation">.</span><span class="token function">jdbcAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 数据源</span>
                <span class="token punctuation">.</span><span class="token function">dataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span>
                <span class="token comment">// 使用默认表结构</span>
                <span class="token punctuation">.</span><span class="token function">withDefaultSchema</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                
                <span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置h2数据库不拦截：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">WebSecurity</span> web<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span> <span class="token string">"/error/**"</span><span class="token punctuation">,</span><span class="token string">"/h2-console/**"</span><span class="token punctuation">)</span>
<span class="token comment">//                .mvcMatchers("/auth/**");</span>
        <span class="token comment">// 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了</span>
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token class-name">PathRequest</span><span class="token punctuation">.</span><span class="token function">toStaticResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atCommonLocations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置sql打印：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
<span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">org.springframework.security</span><span class="token punctuation">:</span> debug
    <span class="token key atrule">org.springframework.jdbc.core</span><span class="token punctuation">:</span> trace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动，调用登录接口/auth/login，进入我们自定义的json登录的过滤器，可以看到打印了sql执行语句：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211222313134.png" alt="image-20221122231327058"></p>
<p>进入h2的web控制台，可以看到创建了默认的用户表和权限表，我们配置的用户也自动插入了：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211222316757.png" alt="image-20221122231609690"></p>
<h2 id="_4-3-定制化数据库" tabindex="-1"><a class="header-anchor" href="#_4-3-定制化数据库" aria-hidden="true">#</a> 4-3 定制化数据库</h2>
<p>上一节用的是默认表结构，下面我们把默认的ddl拷贝过来，放在resource目录下，命名为schema.sql，项目启动时这个脚本就会自动运行。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> users<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> users  <span class="token punctuation">(</span>
                          username <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
                          password <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
                          enabled <span class="token keyword">tinyint</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token number">1</span><span class="token punctuation">,</span>
                          <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>username<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span><span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> authorities<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> authorities  <span class="token punctuation">(</span>
                                username <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
                                authority <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
                                <span class="token keyword">CONSTRAINT</span> fk_authorities_users <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>username<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> users <span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">UNIQUE</span> <span class="token keyword">INDEX</span> ix_auth_username <span class="token keyword">on</span> authorities<span class="token punctuation">(</span>username<span class="token punctuation">,</span> authority<span class="token punctuation">)</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后还需要往表里加数据，同理，在resource创建data.sql，启动项目时会自动运行：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span>  <span class="token keyword">into</span> users<span class="token punctuation">(</span>username<span class="token punctuation">,</span>password<span class="token punctuation">,</span>enabled<span class="token punctuation">)</span> <span class="token keyword">values</span>
<span class="token punctuation">(</span><span class="token string">'admin'</span><span class="token punctuation">,</span><span class="token string">'{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS'</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'lzc'</span><span class="token punctuation">,</span><span class="token string">'{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a'</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">insert</span>  <span class="token keyword">into</span> authorities<span class="token punctuation">(</span>username<span class="token punctuation">,</span>authority<span class="token punctuation">)</span> <span class="token keyword">values</span>
<span class="token punctuation">(</span><span class="token string">'admin'</span><span class="token punctuation">,</span><span class="token string">'ROLE_ADMIN'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'lzc'</span><span class="token punctuation">,</span><span class="token string">'ROLE_ADMIN'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token comment"># 在使用嵌入式数据库时加载脚本</span>
    <span class="token key atrule">initialization-mode</span><span class="token punctuation">:</span> embedded
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>版本不一样可能配置时候有区别：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212012354665.png" alt="image-20221201235434586"></p>
<p>加完以后，我们把原来配置的默认表结构和添加的用户注释掉：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth
<span class="token comment">//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())</span>
                <span class="token punctuation">.</span><span class="token function">jdbcAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 数据源</span>
                <span class="token punctuation">.</span><span class="token function">dataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span>
<span class="token comment">//                // 使用默认表结构</span>
<span class="token comment">//                .withDefaultSchema()</span>
<span class="token comment">//</span>
<span class="token comment">//                .withUser("admin")</span>
<span class="token comment">//                .roles("ADMIN")</span>
<span class="token comment">//                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")</span>
<span class="token comment">//                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")</span>
<span class="token comment">//                .roles("ADMIN")</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动项目，进入h2-console看看有没有运行：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212020016002.png" alt="image-20221201235634918"></p>
<p>postman登陆一下试试：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212012357257.png" alt="image-20221201235733188"></p>
<p>接下来，修改一下表结构，给这两个表加前缀security_，再给user表加一个字段：full_name</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> security_users<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> security_users  <span class="token punctuation">(</span>
                        username <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
                        password <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
                        enabled <span class="token keyword">tinyint</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token number">1</span><span class="token punctuation">,</span>
                        full_name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
                        <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>username<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span><span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> security_authorities<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> security_authorities  <span class="token punctuation">(</span>
                              username <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
                              authority <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
                              <span class="token keyword">CONSTRAINT</span> fk_authorities_users <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>username<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> security_users <span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">UNIQUE</span> <span class="token keyword">INDEX</span> ix_auth_username <span class="token keyword">on</span> security_authorities<span class="token punctuation">(</span>username<span class="token punctuation">,</span> authority<span class="token punctuation">)</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> security_users<span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">,</span> enabled<span class="token punctuation">,</span>full_name<span class="token punctuation">)</span>
<span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">'admin'</span><span class="token punctuation">,</span> <span class="token string">'{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'管理员'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token punctuation">(</span><span class="token string">'lzc'</span><span class="token punctuation">,</span> <span class="token string">'{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'赖卓成'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">insert</span> <span class="token keyword">into</span> security_authorities<span class="token punctuation">(</span>username<span class="token punctuation">,</span> authority<span class="token punctuation">)</span>
<span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">'admin'</span><span class="token punctuation">,</span> <span class="token string">'ROLE_ADMIN'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token punctuation">(</span><span class="token string">'lzc'</span><span class="token punctuation">,</span> <span class="token string">'ROLE_ADMIN'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再配置一下根据用户名查询用户和根据用户名查询用户权限的SQL:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth
<span class="token comment">//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())</span>
                <span class="token punctuation">.</span><span class="token function">jdbcAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 数据源</span>
                <span class="token punctuation">.</span><span class="token function">dataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">usersByUsernameQuery</span><span class="token punctuation">(</span><span class="token string">"select username,password,enabled from security_users where username = ? "</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">authoritiesByUsernameQuery</span><span class="token punctuation">(</span><span class="token string">"select username,authority from security_authorities where username = ?"</span><span class="token punctuation">)</span>
<span class="token comment">//                // 使用默认表结构</span>
<span class="token comment">//                .withDefaultSchema()</span>
<span class="token comment">//</span>
<span class="token comment">//                .withUser("admin")</span>
<span class="token comment">//                .roles("ADMIN")</span>
<span class="token comment">//                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")</span>
<span class="token comment">//                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")</span>
<span class="token comment">//                .roles("ADMIN")</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启看数据库，表名和数据已经变了：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212020010213.png" alt="image-20221202001038127"></p>
<p>以上是最基础的数据库定制化，已经非常强大了，但是后面还会有更强大的定制化方式。</p>
<h2 id="_4-4-深度定制化数据库-创建实体类实现-userdetails-和-grantedauthority" tabindex="-1"><a class="header-anchor" href="#_4-4-深度定制化数据库-创建实体类实现-userdetails-和-grantedauthority" aria-hidden="true">#</a> 4-4 深度定制化数据库-创建实体类实现 UserDetails 和 GrantedAuthority</h2>
<p>为什么在配置类使用withUser方法可以配置用户？</p>
<p>其实是通过JdbcUserDetailsManager来的，里面内置了一些sql语句，包括usersByUsernameQuery、authoritiesByUsernameQuery也是一样的：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212101452981.png" alt="image-20221210145253800"></p>
<p>现在我们不用内建的withDefaultSchema了，我们自己创建数据库来保存用户信息，就要去替换JdbcDaoImpl中的一些query，可以通过下面的方法来替换：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212101458818.png" alt="image-20221210145801712"></p>
<p>我们要定制，就实现自己的UserDetail和UserDetailService，课程用的是JPA。</p>
<p>导入JPA依赖，把原来的JDBC的依赖删掉。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-jpa<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置jpa：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
   <span class="token key atrule">jpa</span><span class="token punctuation">:</span>
    <span class="token key atrule">database</span><span class="token punctuation">:</span> h2
    <span class="token key atrule">database-platform</span><span class="token punctuation">:</span> org.hibernate.dialect.H2Dialect
    <span class="token key atrule">hibernate</span><span class="token punctuation">:</span>
      <span class="token key atrule">ddl-auto</span><span class="token punctuation">:</span> create<span class="token punctuation">-</span>drop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为hibernate也会自动创建表，所以原来的建表sql可以不需要了，删掉即可。</p>
<p>现在我们把User类改造成符合UserDetails，就是实现该接口，需要重写方法，先不管isAccountNonExpired、isAccountNonLocked、isCredentialsNonExpired这三个方法，因为现在不需要数据库来管理用户过期、锁定、密码过期之类的，直接返回true，如果要交给数据库来管理这几个字段，只需要定义基本类型布尔的字段就好，不需要重写了，因为lombok会帮忙重写。</p>
<p>因为我们使用JPA，所以可以用注解@Table来指定表名，hibernate会自动帮我们建表。处理一下报错，比如需要添加主键之类的，字段限制等，最终还剩一个方法没有重写，就是获取用户角色，后续处理：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>appliesTo <span class="token operator">=</span> <span class="token string">"security_users"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span><span class="token punctuation">,</span> <span class="token class-name">UserDetails</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"password_hash"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">255</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 启用 因为是基本类型，lombok生成的方法就是isEnabled 刚好重写了UserDetails的isEnabled方法，
     * 所以可以删除快捷键生成的isEnabled，也就是不需要我们手动重写了。包装类型不能这样。
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> enabled<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 下面三个字段也是同理
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"account_non_locked"</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> accountNonLocked<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"account_non_expired"</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> accountNonExpired<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"credentials_non_expired"</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> credentialsNonExpired<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 指定主键和生成策略为自增
     */</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> <span class="token function">getAuthorities</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token comment">//    @Override</span>
<span class="token comment">//    public boolean isAccountNonLocked() {</span>
<span class="token comment">//        return true;</span>
<span class="token comment">//    }</span>
<span class="token comment">//</span>
<span class="token comment">//    @Override</span>
<span class="token comment">//    public boolean isCredentialsNonExpired() {</span>
<span class="token comment">//        return true;</span>
<span class="token comment">//    }</span>

<span class="token comment">//    @Override</span>
<span class="token comment">//    public boolean isEnabled() {</span>
<span class="token comment">//        return false;</span>
<span class="token comment">//    }</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建角色表，和实体类,角色类需要实现GrantedAuthority接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 角色
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/10
 */</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span><span class="token string">"security_role"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Role</span> <span class="token keyword">implements</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">,</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"role_name"</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authority<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAuthority</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在需要进行表关联，需要一个中间表，users_roles,因为使用了Hibernate，可以直接在User类中进行定义，刚好类型是Set&lt;Role&gt;，lombok也会帮我们定义方法，也不需要手动实现getAuthorities方法了。但是需要用注解手动配置关联关系，最终用户表和角色表如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 用户
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/11/14
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"security_user"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span><span class="token punctuation">,</span> <span class="token class-name">UserDetails</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 指定主键和生成策略为自增
     */</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"password_hash"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">255</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 启用 因为是基本类型，lombok生成的方法就是isEnabled 刚好重写了UserDetails的isEnabled方法，
     * 所以可以删除快捷键生成的isEnabled，也就是不需要我们手动重写了。包装类型不能这样。
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> enabled<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 下面三个字段也是同理
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"account_non_locked"</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> accountNonLocked<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"account_non_expired"</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> accountNonExpired<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"credentials_non_expired"</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> credentialsNonExpired<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ManyToMany</span>
    <span class="token comment">// 用join的方式查询</span>
    <span class="token annotation punctuation">@Fetch</span><span class="token punctuation">(</span><span class="token class-name">FetchMode</span><span class="token punctuation">.</span><span class="token constant">JOIN</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@JoinTable</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"security_user_role"</span><span class="token punctuation">,</span>
            <span class="token comment">// User表的 关联字段 可以是数组，里面再用注解进行配置</span>
            joinColumns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>
                    <span class="token comment">// 关联的字段在中间表是user_id 引自security_users表的id</span>
                    name <span class="token operator">=</span> <span class="token string">"user_id"</span><span class="token punctuation">,</span>referencedColumnName <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// Role表的关联字段</span>
            inverseJoinColumns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>
                    <span class="token comment">// 关联字段在中间表是role_id，引自security_role表的id</span>
                    name <span class="token operator">=</span> <span class="token string">"role_id"</span><span class="token punctuation">,</span>referencedColumnName <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Role</span><span class="token punctuation">></span></span> authorities<span class="token punctuation">;</span>




<span class="token comment">//    @Override</span>
<span class="token comment">//    public boolean isAccountNonLocked() {</span>
<span class="token comment">//        return true;</span>
<span class="token comment">//    }</span>
<span class="token comment">//</span>
<span class="token comment">//    @Override</span>
<span class="token comment">//    public boolean isCredentialsNonExpired() {</span>
<span class="token comment">//        return true;</span>
<span class="token comment">//    }</span>

<span class="token comment">//    @Override</span>
<span class="token comment">//    public boolean isEnabled() {</span>
<span class="token comment">//        return false;</span>
<span class="token comment">//    }</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 角色
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/10
 */</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"security_role"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Role</span> <span class="token keyword">implements</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">,</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"role_name"</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authority<span class="token punctuation">;</span>

<span class="token comment">//    @Override</span>
<span class="token comment">//    public String getAuthority() {</span>
<span class="token comment">//        return null;</span>
<span class="token comment">//    }</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动以后，没问题的话会自动建表：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212101606930.png" alt="image-20221210160642817"></p>
<p>因为这里使用h2嵌入数据库，hibernate创建表，springboot datasource的init执行插入数据的sql总是报错，说表不存在，而实际登录查看又存在，所以改用了持久化数据库mysql，添加一下jdbc依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--jdbc--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注释h2配置和启动建表配置，并添加mysql连接配置:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> com.zaxxer.hikari.HikariDataSource           <span class="token comment"># 当前数据源操作类型</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver           <span class="token comment"># mysql驱动包</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//www.iocaop.com<span class="token punctuation">:</span>3306/imooc_security<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=utf-8&amp;useSSL=false</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置方言：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">jpa</span><span class="token punctuation">:</span>
    <span class="token key atrule">database</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">database-platform</span><span class="token punctuation">:</span> org.hibernate.dialect.MySQL5InnoDBDialect
    <span class="token key atrule">hibernate</span><span class="token punctuation">:</span>
    	<span class="token comment"># 因为存在外键，所以不要每次启动都删除重新创建，在有必要修改是进行修改即可</span>
      <span class="token key atrule">ddl-auto</span><span class="token punctuation">:</span> update
    <span class="token key atrule">show-sql</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 启动时不查询数据库</span>
    <span class="token key atrule">open-in-view</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后会自动建表，手动加一下数据:</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212130021416.png" alt="image-20221213002135310"></p>
<p><img src="http://www.iocaop.com/images/2022-12/202212130021342.png" alt="image-20221213002149283"></p>
<p><img src="http://www.iocaop.com/images/2022-12/202212130021805.png" alt="image-20221213002158746"></p>
<h2 id="_4-5-深度定制化下-userdetailsservice-和-userdetailspasswordservice" tabindex="-1"><a class="header-anchor" href="#_4-5-深度定制化下-userdetailsservice-和-userdetailspasswordservice" aria-hidden="true">#</a> 4-5 深度定制化下 - UserDetailsService 和 UserDetailsPasswordService</h2>
<p>创建好了实体类，就需要创建持久层和业务层。</p>
<p>UserRepo:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 持久层-用户
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/13
 */</span>
<span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserRepo</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">,</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * 通过用户名查询用户信息
     *
     * <span class="token keyword">@param</span> <span class="token parameter">username</span> 用户名
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Optional</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">findOptionalByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>RoleRepo:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 角色-持久层
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/13
 */</span>
<span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">RoleRepo</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Role</span><span class="token punctuation">,</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建用户的业务层接口UserService，继承UserDetailsService：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 用户业务层接口
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/12/13
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserService</span> <span class="token keyword">extends</span> <span class="token class-name">UserDetailsService</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建实现类，实现UserService接口，并重写其父类方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 用户-业务层实现类
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/13
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserRepo</span> userRepo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">UserDetails</span> <span class="token function">loadUserByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UsernameNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">findOptionalByUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span>
                <span class="token comment">// 返回的是Optional类型，可以用orElseThrow抛出异常 如果为空就会抛异常</span>
                <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token keyword">new</span> <span class="token class-name">UsernameNotFoundException</span><span class="token punctuation">(</span><span class="token string">"未找到用户名"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写好业务层和持久层，既可以进行配置，让SpringSecurity使用我们自定义的UserDetailsService,把原来的配置换成下面的：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth<span class="token punctuation">.</span><span class="token function">userDetailsService</span><span class="token punctuation">(</span>userService<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())</span>
<span class="token comment">//                .jdbcAuthentication().passwordEncoder(this.passwordEncoder())</span>
<span class="token comment">//                // 数据源</span>
<span class="token comment">//                .dataSource(dataSource)</span>
<span class="token comment">//                .usersByUsernameQuery("select username,password,enabled from security_users where username = ? ")</span>
<span class="token comment">//                .authoritiesByUsernameQuery("select username,authority from security_authorities where username = ?")</span>
<span class="token comment">//                // 使用默认表结构</span>
<span class="token comment">//                .withDefaultSchema()</span>
<span class="token comment">//</span>
<span class="token comment">//                .withUser("admin")</span>
<span class="token comment">//                .roles("ADMIN")</span>
<span class="token comment">//                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")</span>
<span class="token comment">//                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")</span>
<span class="token comment">//                .roles("ADMIN")</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启，发请求验证一下，是否生效，中文乱码先不管：</p>
<p><img src="http://www.iocaop.com/images/2022-12/image-20221213181832426.png" alt="image-20221213181832426"></p>
<p>密码被带出来了，所以在password加上注解<span style="background-color:pink;">@JsonIgnore</span>，序列化时忽略密码字段。</p>
<p>还可以创建一个UserDetailsPasswordService的实现类，用来做密码升级：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * UserDetailsPasswordService 实现类
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/13
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDetailsPasswordImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserDetailsPasswordService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserRepo</span> userRepo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">UserDetails</span> <span class="token function">updatePassword</span><span class="token punctuation">(</span><span class="token class-name">UserDetails</span> userDetails<span class="token punctuation">,</span> <span class="token class-name">String</span> newPassword<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">findOptionalByUsername</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>user <span class="token operator">-></span> <span class="token punctuation">(</span><span class="token class-name">UserDetails</span><span class="token punctuation">)</span>userRepo<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">withPassword</span><span class="token punctuation">(</span>newPassword<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在SecurityConfig中注入UserDetailsPasswordService，配置密码自动升级：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">UserService</span> userService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">UserDetailsPasswordService</span> userDetailsPasswordService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth<span class="token punctuation">.</span><span class="token function">userDetailsService</span><span class="token punctuation">(</span>userService<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">userDetailsPasswordManager</span><span class="token punctuation">(</span>userDetailsPasswordService<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动项目，登录sha-1加密的用户，会自动升级为默认的bcrypt加密方式：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212140012433.png" alt="image-20221214001232308"></p>
<p><img src="http://www.iocaop.com/images/2022-12/202212140013389.png" alt="image-20221214001313323"></p>
<p>这里重写方法用的lamda表达式，可以解释为如下代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">UserDetails</span> <span class="token function">updatePassword111</span><span class="token punctuation">(</span><span class="token class-name">UserDetails</span> userDetails<span class="token punctuation">,</span> <span class="token class-name">String</span> newPassword<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> userOptional <span class="token operator">=</span> userRepo<span class="token punctuation">.</span><span class="token function">findOptionalByUsername</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> userOptional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">==</span>user<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> userDetails<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        user<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span>newPassword<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">User</span> saveUser <span class="token operator">=</span> userRepo<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> saveUser<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">UserDetails</span> <span class="token function">updatePassword</span><span class="token punctuation">(</span><span class="token class-name">UserDetails</span> userDetails<span class="token punctuation">,</span> <span class="token class-name">String</span> newPassword<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">findOptionalByUsername</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 因为是Optional，可以像stream一样，使用map</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>user <span class="token operator">-></span>
                        <span class="token comment">// 只有一行，所以省略return,将User类型转为父类类型</span>
                        <span class="token punctuation">(</span><span class="token class-name">UserDetails</span><span class="token punctuation">)</span>
                                <span class="token comment">// hibernated save返回值是更新或保存后的对象，而不是row影响行数</span>
                                userRepo<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>
                                        <span class="token comment">// 配合@with注解，使用withXxx后，返回一个新的user对象</span>
                                        user<span class="token punctuation">.</span><span class="token function">withPassword</span><span class="token punctuation">(</span>newPassword<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 如果findOptionalByUsername没有找到对应的user，则返回该方法参数中的userDetails</span>
                <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-6-环境和环境变量" tabindex="-1"><a class="header-anchor" href="#_4-6-环境和环境变量" aria-hidden="true">#</a> 4-6 环境和环境变量</h2>
<p>Spring中的环境配置：application-{profile}.yml</p>
<p>使用系统环境变量：${DB_SCHEMA:test}，先读取系统，没有则使用默认值test</p>
<p>例如:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>SERVER_PORT<span class="token punctuation">:</span><span class="token number">8080</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果系统中有SERVER_PORT的环境变量，就用系统的值启动程序，没有则用8080进行启动。</p>
<p>我们实际开发时，会把公用的一些配置写在application.yml中，在其他application-{profile}.yml中配置特定的，配置好以后需要在application-{profile}.yml配置当前使用的是哪个配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就可以在java类中使用注解，在特定的环境下启用某些配置，如：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212142350774.png" alt="image-20221214235044657"></p>
<p>我们再application.yml中配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>SPRING_ACTIVE_PROFILE<span class="token punctuation">:</span>dev<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就可以指定程序使用哪个配置启动。</p>
<h2 id="_4-7-自动化测试" tabindex="-1"><a class="header-anchor" href="#_4-7-自动化测试" aria-hidden="true">#</a> 4-7 自动化测试</h2>
<p>不重要，看旧笔记：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?#hMvix'>点击跳转</a></p>
<h2 id="_5-1-认证流程和源码解析" tabindex="-1"><a class="header-anchor" href="#_5-1-认证流程和源码解析" aria-hidden="true">#</a> 5-1 认证流程和源码解析</h2>
<p>文字说明：</p>
<ol>
<li>
<p>有请求进入，会到认证过滤器AuthenticationFilter中，这个过滤器主要是获取登录信息，如用户名、密码，无论是表单登录还是json方式登录，最终都会构建成UserPasswordAuthenticationToken(他实现了Authentication接口)，构建后，并没有完全初始化，只是加入了用户名和密码，还有角色、是否已认证等信息</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212150015462.png" alt="image-20221215001549394"></p>
</li>
<li>
<p>所以，AuthenticationFilter又会把UserPasswordAuthenticationToken放到AuthenticationManager中真正的去执行认证，AuthenticationManager是一个接口类，它里面有一组AuthenticationProviders(可以理解为一种具体的认证机制，对于不同认证过程，会有不同的认证方式，如数据库对比用户名密码、第三方集成认证)。会循环，逐个使用这组AuthenticationProviders进行认证，只要有一个认证成功，就算认证成功。在AuthenticationProviders认证的过程中会调用UserDetailsService去查询UserDetails（这个过程可能是查询数据库，也可能是别的），逐步返回，到AuthenticationFilter时，会把完整的UserPasswordAuthenticationToken也就是Authentication，放到SecurityContext中</p>
</li>
</ol>
<p>流程图：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212150053987.png" alt="image-20221215005349883"></p>
<p>源码打断点调试，注意使用表单登录进行调试，因为json登录的方式被我们替换成了自定义过滤器。</p>
<p>先到UsernamePasswordAuthenticationFilter类：</p>
<p>从请求中获取用户名和密码，构建UsernamePasswordAuthenticationToken，并交给AuthenticationManager</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152307436.png" alt="image-20221215230720316"></p>
<p>UsernamePasswordAuthenticationToken继承了AbstractAuthenticationToken，并实现了Authentication接口：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152309031.png" alt="image-20221215230946967"></p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152310051.png" alt="image-20221215231001993"></p>
<p>AuthenticationManager也是一个接口，在SpringSecurity中具体的实现类是：ProviderManager</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152315396.png" alt="image-20221215231525276"></p>
<p>所以我们需要到该类找到重写的authenticate方法：</p>
<p>可以看到，UserNamePasswordAuthenticationToken是部分初始化的，并且在该方法中，遍历了Providers，进行认证：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152321334.png" alt="image-20221215232124223"></p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152322847.png" alt="image-20221215232219778"></p>
<p>遍历时，首先判断当前Provider是否支持该类型的Authentication(UserNamePasswordAuthenticationToken)：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152325652.png" alt="image-20221215232558576"></p>
<p>放行，直到DaoAuthenticationProvider（SpringSecurity默认的数据库的认证方式）才支持，走到下面，就会调用Provider中的认证方法authenticate，所以我们到DaoAuthenticationProvider类去看authenticate方法，在本类没找到，所以肯定在抽象类AbstractUserDetailsAuthenticationProvider中有默认实现：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152336990.png" alt="image-20221215233625896"></p>
<p>实现该方法的，正是DaoAuthenticationProvider：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152338904.png" alt="image-20221215233827778"></p>
<p>完了以后，回到父类AbstractUserDetailsAuthenticationProvider：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152342966.png" alt="image-20221215234255828"></p>
<p>到最后，会创建一个成功的Authentication，跟进去看(注意，这里要看子类的，因为子类重写了。多态)，可以看到：</p>
<p>进行了密码升级，然后再创建一个完整的Authentication</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212152346064.png" alt="image-20221215234559999"></p>
<p>最终，这个完整的Authentication会被放到SecurityContext当中。</p>
<h2 id="_5-2-ldap-配置和多-authenticationprovider-共存" tabindex="-1"><a class="header-anchor" href="#_5-2-ldap-配置和多-authenticationprovider-共存" aria-hidden="true">#</a> 5-2  LDAP 配置和多 AuthenticationProvider 共存</h2>
<p>存储用户信息的不只有SQL数据库，还有NoSQL数据库，LDAP等方式，SpringSecurity是支持多种异构数据库并且整合起来进行认证。这里用LDAP主要是用来演示多 AuthenticationProvider 共存。</p>
<h3 id="ldap基础知识" tabindex="-1"><a class="header-anchor" href="#ldap基础知识" aria-hidden="true">#</a> LDAP基础知识</h3>
<p>LDAP是<strong>Lightweight Directory Access Protocol</strong>，<strong>轻型目录访问协议</strong>很多企业用来存储用户组织架构信息，树型结构。</p>
<ul>
<li>
<p>Entry(Object)</p>
<p>LDAP目录的一个基本单位，一个节点就是一个Entry，每个条目由它的区别名称(DN)来限定，举例：</p>
<div class="language-tex ext-tex line-numbers-mode"><pre v-pre class="language-tex"><code>dn:uid=bob,ou=people,dc=acme,dc=org
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>Attributes</p>
<p>与一个条目相关的信息，比如一个组织的地址或者员工的电话号码</p>
</li>
<li>
<p>ObjectClass</p>
<p>特殊类型的属性，LADP中所有对象都必须有一个ObjectClass属性，<span style="background-color:pink;">ObjectClass定义指定了LDAP需要哪些属性</span>，它指定了一个条目的对象类。</p>
</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-12/202212160016990.png" alt="image-20221216001634907"></p>
<h3 id="ldap配置" tabindex="-1"><a class="header-anchor" href="#ldap配置" aria-hidden="true">#</a> LDAP配置</h3>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-ldap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.ldap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-ldap-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--ldap嵌入式数据库--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.unboundid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>unboundid-ldapsdk<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在resource下添加文件：test-ldap-server.ldif</p>
<div class="language-ldif ext-ldif line-numbers-mode"><pre v-pre class="language-ldif"><code>dn: dc=imooc,dc=com
objectClass: top
objectClass: domain

dn: uid=zhaoliu,dc=imooc,dc=com
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn: liu zhao
sn: liu
uid: zhaoliu
userPassword: 123

dn: uid=mike,dc=imooc,dc=com
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn: joe mike
sn: joe
uid: mike
userPassword: 123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span> 
  <span class="token key atrule">ldap</span><span class="token punctuation">:</span>
    <span class="token key atrule">base</span><span class="token punctuation">:</span> dc=imooc<span class="token punctuation">,</span>dc=com
    <span class="token key atrule">embedded</span><span class="token punctuation">:</span>
      <span class="token key atrule">base-dn</span><span class="token punctuation">:</span> dc=imooc<span class="token punctuation">,</span>dc=com
      <span class="token key atrule">ldif</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>test<span class="token punctuation">-</span>ldap<span class="token punctuation">-</span>server.ldif
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8389</span>
    <span class="token key atrule">urls</span><span class="token punctuation">:</span> ldap<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>8389/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建实体类，实现UserDetails接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * ldap认证user实体
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/16
 */</span>
<span class="token annotation punctuation">@Entry</span><span class="token punctuation">(</span>
        <span class="token comment">// 指定具有哪些objectClasses的节点，才能作为该实体</span>
        objectClasses <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"inetOrgPerson"</span><span class="token punctuation">,</span><span class="token string">"organizationalPerson"</span><span class="token punctuation">,</span><span class="token string">"person"</span><span class="token punctuation">,</span><span class="token string">"top"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LDAPUser</span> <span class="token keyword">implements</span> <span class="token class-name">UserDetails</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * id  javax.naming.Name类型 不序列化这个字段
     */</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">Name</span> id<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 用户名 注解类似column
     */</span>
    <span class="token annotation punctuation">@Attribute</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"uid"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 密码
     */</span>
    <span class="token annotation punctuation">@Attribute</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"userPassword"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> <span class="token function">getAuthorities</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 做示例，写死，返回用户角色</span>
      <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SimpleGrantedAuthority</span><span class="token punctuation">(</span><span class="token string">"ROLE_USER"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isAccountNonExpired</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 做示例，直接返回true</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isAccountNonLocked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 做示例，直接返回true</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isCredentialsNonExpired</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 做示例，直接返回true</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 做示例，直接返回true</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建持久层：LDAPUserRepo，并加一个方法，查询用户：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">LDAPUserRepo</span> <span class="token keyword">extends</span> <span class="token class-name">LdapRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LDAPUser</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * 查询用户
     *
     * <span class="token keyword">@param</span> <span class="token parameter">username</span> 用户名
     * <span class="token keyword">@param</span> <span class="token parameter">password</span> 密码
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Optional</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">LDAPUser}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LDAPUser</span><span class="token punctuation">></span></span> <span class="token function">findByUserNameAndPassword</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span><span class="token class-name">String</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，先写个测试类测试一下能不能查询得到：</p>
<p>导入依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>  <span class="token comment">&lt;!-- 用于测试 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.security<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-security-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.junit.vintage<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit-vintage-engine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@DataLdapTest</span>
<span class="token annotation punctuation">@DirtiesContext</span><span class="token punctuation">(</span>classMode <span class="token operator">=</span> <span class="token class-name">DirtiesContext<span class="token punctuation">.</span>ClassMode</span><span class="token punctuation">.</span><span class="token constant">AFTER_CLASS</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LDAPUserRepoTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">LDAPUserRepo</span> ldapUserRepo<span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token string">"zhaoliu"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> password <span class="token operator">=</span> <span class="token string">"123"</span><span class="token punctuation">;</span>
        <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LDAPUser</span><span class="token punctuation">></span></span> user <span class="token operator">=</span> ldapUserRepo<span class="token punctuation">.</span><span class="token function">findByUsernameAndPassword</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试失败了两次：</p>
<ol>
<li>LDAPUserRepo继承了JpaRepository&lt;LDAPUer,Name&gt;，错了，改成LdapRepository&lt;LDAPUser&gt;</li>
<li>方法名中字段不存在，findByUserNameAndPassword改成findByUsernameAndPassword</li>
</ol>
<p>测试成功：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212160112287.png" alt="image-20221216011253193"></p>
<p>再给LDAPUser加上final关键字。</p>
<p>再测一个不存在的用户：</p>
<p><img src="http://www.iocaop.com/images/2022-12/image-20221216144334938.png" alt="image-20221216144334938"></p>
<p>接着就可以创建自己的Provider，继承AbstractUserDetailsAuthenticationProvider，结合上面的认证流程和源码分析，就会明白为什么要重写retrieveUser方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * LDAP 多Provider认证
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/12/16
 */</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LDAPMultiAuthenticationProvider</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractUserDetailsAuthenticationProvider</span> <span class="token punctuation">{</span>


    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">LDAPUserRepo</span> ldapUserRepo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">additionalAuthenticationChecks</span><span class="token punctuation">(</span><span class="token class-name">UserDetails</span> userDetails<span class="token punctuation">,</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span> authentication<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span> <span class="token punctuation">{</span>

        <span class="token comment">// 认证检查、先忽略了</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">UserDetails</span> <span class="token function">retrieveUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span> authentication<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 传参时 用户名直接使用参数中的，密码使用authentication中的credentials</span>
        <span class="token keyword">return</span> ldapUserRepo<span class="token punctuation">.</span><span class="token function">findByUsernameAndPassword</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> authentication<span class="token punctuation">.</span><span class="token function">getCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token keyword">new</span> <span class="token class-name">BadCredentialsException</span><span class="token punctuation">(</span><span class="token string">"用户名或密码错误!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写完以后，就需要回到Security配置中配置使用了：</p>
<p>先把两个Provider加进来：一个是我们自定义的LDAP的LDAPMultiAuthenticationProvider，另一个是默认的DaoAuthenticationProvider</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">LDAPUserRepo</span> ldapUserRepo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">LDAPMultiAuthenticationProvider</span> <span class="token function">ldapMultiAuthenticationProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 因为在LDAPMultiAuthenticationProvider使用构造器注入了ldapUserRepo，所以这里需要传入</span>
        <span class="token class-name">LDAPMultiAuthenticationProvider</span> ldapMultiAuthenticationProvider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LDAPMultiAuthenticationProvider</span><span class="token punctuation">(</span>ldapUserRepo<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ldapMultiAuthenticationProvider<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">DaoAuthenticationProvider</span> <span class="token function">daoAuthenticationProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DaoAuthenticationProvider</span> daoAuthenticationProvider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DaoAuthenticationProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置密码加密编辑器</span>
        daoAuthenticationProvider<span class="token punctuation">.</span><span class="token function">setPasswordEncoder</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置UserService</span>
        daoAuthenticationProvider<span class="token punctuation">.</span><span class="token function">setUserDetailsService</span><span class="token punctuation">(</span>userService<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 密码自动升级</span>
        daoAuthenticationProvider<span class="token punctuation">.</span><span class="token function">setUserDetailsPasswordService</span><span class="token punctuation">(</span>userDetailsPasswordService<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> daoAuthenticationProvider<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把SecurityConfig配置换成这样：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth<span class="token punctuation">.</span><span class="token function">authenticationProvider</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">daoAuthenticationProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">authenticationProvider</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ldapMultiAuthenticationProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//                .userDetailsService(userService)</span>
<span class="token comment">//                .userDetailsPasswordManager(userDetailsPasswordService)</span>
<span class="token comment">//                .passwordEncoder(this.passwordEncoder())</span>
<span class="token comment">//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())</span>
<span class="token comment">//                .jdbcAuthentication().passwordEncoder(this.passwordEncoder())</span>
<span class="token comment">//                // 数据源</span>
<span class="token comment">//                .dataSource(dataSource)</span>
<span class="token comment">//                .usersByUsernameQuery("select username,password,enabled from security_users where username = ? ")</span>
<span class="token comment">//                .authoritiesByUsernameQuery("select username,authority from security_authorities where username = ?")</span>
<span class="token comment">//                // 使用默认表结构</span>
<span class="token comment">//                .withDefaultSchema()</span>
<span class="token comment">//</span>
<span class="token comment">//                .withUser("admin")</span>
<span class="token comment">//                .roles("ADMIN")</span>
<span class="token comment">//                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")</span>
<span class="token comment">//                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")</span>
<span class="token comment">//                .roles("ADMIN")</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就实现了多Provider共存。</p>
<p>由于当前配置是用来做rest登录的，想要表单登录也生效，就在表单登录的配置LoginSecurityConfig也加上：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">DaoAuthenticationProvider</span> daoAuthenticationProvider<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">LDAPMultiAuthenticationProvider</span> ldapMultiAuthenticationProvider<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth<span class="token punctuation">.</span><span class="token function">authenticationProvider</span><span class="token punctuation">(</span>daoAuthenticationProvider<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">authenticationProvider</span><span class="token punctuation">(</span>ldapMultiAuthenticationProvider<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成，进行测试，预期效果应该是表单登录和rest登录都能实现mysql和ldap共存，即用户lzc密码123456可以登录(mysql)，用户zhaoliu密码123也可以登录(ldap)。</p>
<p>测试结果：</p>
<p>表单登录lzc成功(mysql)：</p>
<p><img src="http://www.iocaop.com/images/2022-12/image-20221216152326095.png" alt="image-20221216152326095"></p>
<p>表单登录zhaoliu成功(ldap)：</p>
<p><img src="http://www.iocaop.com/images/2022-12/image-20221216152528781.png" alt="image-20221216152528781"></p>
<p>rest登录lzc成功(mysql)：</p>
<p><img src="http://www.iocaop.com/images/2022-12/image-20221216152620302.png" alt="image-20221216152620302"></p>
<p>rest登录zhaoliu成功(ldap)：</p>
<p><img src="http://www.iocaop.com/images/2022-12/image-20221216152656582.png" alt="image-20221216152656582"></p>
<h2 id="_5-3-jwt-的概念和创建以及解析" tabindex="-1"><a class="header-anchor" href="#_5-3-jwt-的概念和创建以及解析" aria-hidden="true">#</a> 5-3 JWT 的概念和创建以及解析</h2>
<p>官网：<a href='https://jwt.io/'>点击跳转</a></p>
<p>较为成熟的类库：<a href='https://github.com/jwtk/jjwt'>点击跳转</a></p>
<p>jwt工作流程：</p>
<p><img src="http://www.iocaop.com/images/2022-12/image-20221216155513312.png" alt="image-20221216155513312"></p>
<p>jwt数据结构：</p>
<p>以.分割，分三段：</p>
<p><img src="http://www.iocaop.com/images/2022-12/image-20221216155858108.png" alt="image-20221216155858108"></p>
<p>jwt中的一些声明：</p>
<p>保留声明：lss签发者，exp过期时间，sub主题，aud目标</p>
<p>私有声明：claim(key,value)添加任意键值对到jwt中</p>
<p>导入依赖(GitHub上复制)：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.11.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt-impl<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.11.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt-jackson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- or jjwt-gson if Gson is preferred --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.11.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写工具类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * jwt工具
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/12/16
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JwtUtil</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 用于签名
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Key</span> key <span class="token operator">=</span> <span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token function">secretKeyFor</span><span class="token punctuation">(</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS512</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">UserDetails</span> userDetails<span class="token punctuation">)</span> <span class="token punctuation">{</span>

       <span class="token keyword">return</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span>
                <span class="token comment">// 载荷里放角色</span>
                <span class="token punctuation">.</span><span class="token function">claim</span><span class="token punctuation">(</span><span class="token string">"authorities"</span><span class="token punctuation">,</span> userDetails<span class="token punctuation">.</span><span class="token function">getAuthorities</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>a <span class="token operator">-></span> a<span class="token punctuation">.</span><span class="token function">getAuthority</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 设置主题为用户名</span>
                <span class="token punctuation">.</span><span class="token function">setSubject</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 设置签发时间为当前时间</span>
                <span class="token punctuation">.</span><span class="token function">setIssuedAt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 设置过期时间60秒</span>
                <span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">60_000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 签名</span>
                <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS512</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>单元测试：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">SpringExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">JwtUtilTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">JwtUtil</span> jwtUtil<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>jwtUtil <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">JwtUtil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 创建角色</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Role</span><span class="token punctuation">></span></span> authorities <span class="token operator">=</span> <span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Role</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authority</span><span class="token punctuation">(</span><span class="token string">"ROLE_USER"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Role</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authority</span><span class="token punctuation">(</span><span class="token string">"ROLE_ADMIN"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建用户，把角色设置好</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">username</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authorities</span><span class="token punctuation">(</span>authorities<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 生成token</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> jwtUtil<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 解析token</span>
        <span class="token class-name">Claims</span> claims <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parserBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token comment">// 签名使用静态变量key，和创建token时一致</span>
                <span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span><span class="token class-name">JwtUtil</span><span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span>
                <span class="token comment">// 获取载荷使用getBody()方法</span>
                <span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 对比用户名和主题是否一致</span>
       <span class="token function">assertEquals</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>claims<span class="token punctuation">.</span><span class="token function">getSubject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">"解析后subject应该是用户名"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试通过：</p>
<p><img src="http://www.iocaop.com/images/2022-12/image-20221216165411063.png" alt="image-20221216165411063"></p>
<h2 id="_5-4-访问令牌和刷新令牌以及jwt外部配置" tabindex="-1"><a class="header-anchor" href="#_5-4-访问令牌和刷新令牌以及jwt外部配置" aria-hidden="true">#</a> 5-4 访问令牌和刷新令牌以及JWT外部配置</h2>
<p>jwt在客户端或浏览器不暴露给他人看到是很难做到的，需要结合服务器做一些安全校验，如多因子认证、常用ip校验等。一般来说会把访问令牌设置较短的有效期，就算令牌被偷了，等别人拿到的时候，令牌已经过期了,就算没过期，令牌生命周期较短，能做的事也比较少。</p>
<p>有了访问令牌为什么还要有刷新令牌？</p>
<p>刷新令牌和访问令牌是用不同的key来签发的，刷新令牌是没法直接访问的，而是用来调用接口重新获取一个访问令牌。</p>
<p>访问令牌周期：一般是几分钟或几个小时。</p>
<p>刷新令牌周期：一般是几周到不超过一年。</p>
<p>令牌如何存放：</p>
<p>理论上直接放在store(内存中最安全，就没有地方会显性的暴露，如vuex)最安全，但是刷新浏览器需要重新登录。</p>
<p>直接由服务器设置在Cookie中也是比较安全的。</p>
<p>都不合适的场景下建议<span style="background-color:pink;">加密</span>后存在SessionStorage中。</p>
<p>LocalStorage其实是不安全的，不关我们自己的web应用可以访问，其他的应用也可以访问，而且关闭浏览器不会清空。</p>
<p>SessionStorage相对LocalStorage会稍微安全一点，关闭浏览器后会清空。</p>
<h3 id="编写jwt工具类" tabindex="-1"><a class="header-anchor" href="#编写jwt工具类" aria-hidden="true">#</a> 编写Jwt工具类</h3>
<p>SpringSecurity中没有内建的JwtFilter，OAuth中是有的，所以现在这里要自己实现。</p>
<p>在做之前，需要完善一下JwtUtil，因为还有一个刷新令牌。</p>
<p>创建配置类，使令牌过期时间可以在外部配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 应用程序属性  在yaml中配置，如lzc.jwt.access-token-expire-time=111
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/12/16
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"lzc"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationProperties</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token class-name">Jwt</span> jwt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Jwt</span><span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 访问令牌到期时间 默认 60 秒
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">long</span> accessTokenExpireTime <span class="token operator">=</span> <span class="token number">60_000</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 刷新令牌到期时间 默认 30 天
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">long</span> refreshTokenExpireTime <span class="token operator">=</span> <span class="token number">30</span><span class="token operator">*</span><span class="token number">24</span><span class="token operator">*</span><span class="token number">3600</span><span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改造JwtUtil，方法，增加key，注入配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * jwt工具
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/12/16
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JwtUtil</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 用于访问令牌签名
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Key</span> key <span class="token operator">=</span> <span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token function">secretKeyFor</span><span class="token punctuation">(</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS512</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 应用程序属性
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ApplicationProperties</span> applicationProperties<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 用于刷新令牌签名
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Key</span> refreshKey <span class="token operator">=</span> <span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token function">secretKeyFor</span><span class="token punctuation">(</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS512</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">createJwtToken</span><span class="token punctuation">(</span><span class="token class-name">UserDetails</span> userDetails<span class="token punctuation">,</span> <span class="token keyword">long</span> timeToExpire<span class="token punctuation">,</span><span class="token class-name">Key</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>

       <span class="token keyword">return</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"lzc"</span><span class="token punctuation">)</span>
                <span class="token comment">// 载荷里放角色</span>
                <span class="token punctuation">.</span><span class="token function">claim</span><span class="token punctuation">(</span><span class="token string">"authorities"</span><span class="token punctuation">,</span> userDetails<span class="token punctuation">.</span><span class="token function">getAuthorities</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>a <span class="token operator">-></span> a<span class="token punctuation">.</span><span class="token function">getAuthority</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 设置主题为用户名</span>
                <span class="token punctuation">.</span><span class="token function">setSubject</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 设置签发时间为当前时间</span>
                <span class="token punctuation">.</span><span class="token function">setIssuedAt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 设置过期时间60秒</span>
                <span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span>timeToExpire<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 签名</span>
                <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS512</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建访问令牌
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userDetails</span> 用户信息
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">createAccessToken</span><span class="token punctuation">(</span><span class="token class-name">UserDetails</span> userDetails<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createJwtToken</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">,</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAccessTokenExpireTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建刷新令牌
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userDetails</span> 用户信息
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">createRefreshToken</span><span class="token punctuation">(</span><span class="token class-name">UserDetails</span> userDetails<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createJwtToken</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">,</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRefreshTokenExpireTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>refreshKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">lzc</span><span class="token punctuation">:</span>
  <span class="token key atrule">jwt</span><span class="token punctuation">:</span>
    <span class="token key atrule">access-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">600</span>
    <span class="token key atrule">refresh-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">2592000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-5-创建jwtfilter" tabindex="-1"><a class="header-anchor" href="#_5-5-创建jwtfilter" aria-hidden="true">#</a> 5-5 创建JwtFilter</h2>
<p>这里先不继承AbstractAuthenticationProcessingFilter，先创建一个过滤器继承OncePerRequestFilter，重写方法：先检查token再放行，token在请求头中以何种形式开头(前缀)，可以自定义，所以加到配置中，在自建的ApplicationProperties类中加入属性:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 应用程序属性  在yaml中配置，如lzc.jwt.access-token-expire-time=111
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/12/16
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"lzc"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationProperties</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token class-name">Jwt</span> jwt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Jwt</span><span class="token punctuation">{</span>

        <span class="token doc-comment comment">/**
         * token的开头 如： Authentication:Bearer xxxx
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> header <span class="token operator">=</span> <span class="token string">"Authentication"</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 前缀
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> prefix <span class="token operator">=</span> <span class="token string">"Bearer"</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 访问令牌到期时间 默认 60 秒
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">long</span> accessTokenExpireTime <span class="token operator">=</span> <span class="token number">60_000</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 刷新令牌到期时间 默认 30 天
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">long</span> refreshTokenExpireTime <span class="token operator">=</span> <span class="token number">30</span><span class="token operator">*</span><span class="token number">24</span><span class="token operator">*</span><span class="token number">3600</span><span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了方便后面从载荷中取出的角色列表(Object类型)转为List，编写一个工具类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * 集合工具类
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/21
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CollectionUtils</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">convertObjectToList</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> objects <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> obj<span class="token punctuation">;</span>
            list<span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>objects<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Collection</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">Collection</span> collection <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token punctuation">)</span> obj<span class="token punctuation">;</span>
            list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>collection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> list<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请求进来，先校验token是否合法:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 检查令牌是否合法
     *
     * <span class="token keyword">@param</span> <span class="token parameter">request</span> 请求
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">checkToken</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> header <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">!=</span>header<span class="token operator">&amp;&amp;</span>header<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果合法，再验证token，从token中获取载荷(body即Claims)：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 验证令牌
     *
     * <span class="token keyword">@param</span> <span class="token parameter">request</span> 请求
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Optional</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">Claims}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Claims</span><span class="token punctuation">></span></span> <span class="token function">validateToken</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> header <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 去掉前缀</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> header<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 解析token</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parserBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span><span class="token class-name">JwtUtil</span><span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取载荷返回Optional对象，进行过滤authorities，过滤后，使用ifPresentOrElse，进行分情况处理，如果有值则处理后创建UsernamePasswordAuthenticationToken放入context，如果没有值则清除当前Context中的Authentication</p>
<p>有值：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 处理jwt载荷中有角色的情况
     *
     * <span class="token keyword">@param</span> <span class="token parameter">claims</span> 载荷
     */</span>
    <span class="token keyword">private</span>  <span class="token keyword">void</span> <span class="token function">setUpSpringAuthentication</span><span class="token punctuation">(</span><span class="token class-name">Claims</span> claims<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 过滤完以后有值的情况</span>
        <span class="token class-name">Object</span> authorities <span class="token operator">=</span> claims<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"authorities"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> authorityList  <span class="token operator">=</span> <span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">convertObjectToList</span><span class="token punctuation">(</span>authorities<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 泛型处理，转为GrantedAuthority</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> grantedAuthorityList <span class="token operator">=</span> authorityList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">valueOf</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">SimpleGrantedAuthority</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建UsernamePasswordAuthenticationToken 该构造函数默认authenticated为true</span>
        <span class="token class-name">UsernamePasswordAuthenticationToken</span> usernamePasswordAuthenticationToken <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span>claims<span class="token punctuation">.</span><span class="token function">getSubject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span>grantedAuthorityList<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置上下文中的Authentication</span>
        <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAuthentication</span><span class="token punctuation">(</span>usernamePasswordAuthenticationToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没值：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">SecurityContextHolder</span><span class="token operator">::</span><span class="token function">clearContext</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完整代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * jwt过滤器
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/21
 */</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JwtFilter</span> <span class="token keyword">extends</span> <span class="token class-name">OncePerRequestFilter</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 构造器注入自定义配置
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ApplicationProperties</span> applicationProperties<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doFilterInternal</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token comment">// 检查token 期望：Authentication:Bearer XXXXX</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">checkToken</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// token合法，验证token</span>
            <span class="token function">validateToken</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>claims <span class="token operator">-></span>
                    <span class="token comment">// 没有角色权限的过滤掉 没有意义</span>
                    claims<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"authorities"</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">ifPresentOrElse</span><span class="token punctuation">(</span>
                            <span class="token comment">// 有值的情况 创建token</span>
                            <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">setUpSpringAuthentication</span><span class="token punctuation">,</span>
<span class="token comment">//                            ()->{</span>
<span class="token comment">//                        // 过滤完以后没有值的情况，可以写成方法引用</span>
<span class="token comment">//                        SecurityContextHolder.clearContext();</span>
<span class="token comment">//                    }</span>
                            <span class="token class-name">SecurityContextHolder</span><span class="token operator">::</span><span class="token function">clearContext</span>
                    <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 最后放行</span>
        filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 处理jwt载荷中有角色的情况
     *
     * <span class="token keyword">@param</span> <span class="token parameter">claims</span> 载荷
     */</span>
    <span class="token keyword">private</span>  <span class="token keyword">void</span> <span class="token function">setUpSpringAuthentication</span><span class="token punctuation">(</span><span class="token class-name">Claims</span> claims<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 过滤完以后有值的情况</span>
        <span class="token class-name">Object</span> authorities <span class="token operator">=</span> claims<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"authorities"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> authorityList  <span class="token operator">=</span> <span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">convertObjectToList</span><span class="token punctuation">(</span>authorities<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 泛型处理，转为GrantedAuthority</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> grantedAuthorityList <span class="token operator">=</span> authorityList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">valueOf</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">SimpleGrantedAuthority</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建UsernamePasswordAuthenticationToken 该构造函数默认authenticated为true</span>
        <span class="token class-name">UsernamePasswordAuthenticationToken</span> usernamePasswordAuthenticationToken <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span>claims<span class="token punctuation">.</span><span class="token function">getSubject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span>grantedAuthorityList<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置上下文中的Authentication</span>
        <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAuthentication</span><span class="token punctuation">(</span>usernamePasswordAuthenticationToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 检查令牌是否合法
     *
     * <span class="token keyword">@param</span> <span class="token parameter">request</span> 请求
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">checkToken</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> header <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">!=</span>header<span class="token operator">&amp;&amp;</span>header<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 验证令牌
     *
     * <span class="token keyword">@param</span> <span class="token parameter">request</span> 请求
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Optional</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">Claims}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Claims</span><span class="token punctuation">></span></span> <span class="token function">validateToken</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> header <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 去掉前缀</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> header<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 解析token</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parserBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span><span class="token class-name">JwtUtil</span><span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写好filter后，注入到SecurityConfig中，添加该过滤器到UsernamePasswordAuthenticationFilter之前：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * jwt过滤器 构造器注入
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">JwtFilter</span> jwtFilter<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-12/202212211128491.png" alt="image-20221221112804378"></p>
<h2 id="_5-6-实现登录接口和刷新令牌接口-上" tabindex="-1"><a class="header-anchor" href="#_5-6-实现登录接口和刷新令牌接口-上" aria-hidden="true">#</a> 5-6 实现登录接口和刷新令牌接口(上)</h2>
<p>要验证我们上面的jwtFilter是否有效，需要先写一个登录接口来生成jwt，然后携带token来访问其他需要鉴权的接口，首先创建登录接口的Ao和Vo:</p>
<p>LoginAo：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 登录ao
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/21
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Accessors</span><span class="token punctuation">(</span>chain <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginAo</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 用户名
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 密码
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>LoginVo:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 登录vo
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/21
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Accessors</span><span class="token punctuation">(</span>chain <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginVo</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 访问令牌
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accessToken<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 刷新令牌
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> refreshToken<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们之前配置了放行的路径：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212211219654.png" alt="image-20221221121957566"></p>
<p>所以在这个路径下创建登录接口，不会经过过滤器链：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212211307317.png" alt="image-20221221130755233"></p>
<p>service层代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 用户-业务层实现类
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/13
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token annotation punctuation">@Lazy</span>
    <span class="token keyword">private</span> <span class="token class-name">PasswordEncoder</span> passwordEncoder<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">JwtUtil</span> jwtUtil<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserRepo</span> userRepo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">UserDetails</span> <span class="token function">loadUserByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UsernameNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">findOptionalByUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span>
                <span class="token comment">// 返回的是Optional类型，可以用orElseThrow抛出异常 如果为空就会抛异常</span>
                <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token keyword">new</span> <span class="token class-name">UsernameNotFoundException</span><span class="token punctuation">(</span><span class="token string">"未找到用户名"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">LoginVo</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">findOptionalByUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>user <span class="token operator">-></span>
                        <span class="token comment">// 密码加密编辑器匹配，参数1未加密密码，参数2已加密密码</span>
                        passwordEncoder<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>password<span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 匹配成功则有值，否则过滤掉就不会走map里面的了</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>user <span class="token operator">-></span> <span class="token keyword">new</span> <span class="token class-name">LoginVo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAccessToken</span><span class="token punctuation">(</span>jwtUtil<span class="token punctuation">.</span><span class="token function">createAccessToken</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setRefreshToken</span><span class="token punctuation">(</span>jwtUtil<span class="token punctuation">.</span><span class="token function">createRefreshToken</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 没有值，抛出异常</span>
                <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BadCredentialsException</span><span class="token punctuation">(</span><span class="token string">"用户名或密码错误"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后测试：可以进行登录生成token</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212211310402.png" alt="image-20221221131027301"></p>
<h2 id="_5-7-实现登录接口和刷新令牌接口-下" tabindex="-1"><a class="header-anchor" href="#_5-7-实现登录接口和刷新令牌接口-下" aria-hidden="true">#</a> 5-7 实现登录接口和刷新令牌接口(下)</h2>
<p>前面讲过，token设置一个比较短的有效期，可以有效防止token被盗后他人能有足够的时间来操作。那当本人使用的时候就需要有一个机制来不断刷新令牌，所以还需要写一个刷新令牌的接口，用户携带访问令牌和刷新令牌进入接口进行刷新，获取新的访问令牌。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/token/refresh"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">LoginVo</span> <span class="token function">refresh</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestHeader</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> accessToken<span class="token punctuation">,</span> <span class="token annotation punctuation">@NotBlank</span> <span class="token class-name">String</span> refreshToken<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AccessDeniedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userService<span class="token punctuation">.</span><span class="token function">refresh</span><span class="token punctuation">(</span>accessToken<span class="token punctuation">,</span> refreshToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先需要校验访问令牌和刷新令牌，所以在JwtUtil中增加方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 验证访问令牌
     *
     * <span class="token keyword">@param</span> <span class="token parameter">accessToken</span> 访问令牌
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">validateAccessToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> accessToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">validateToken</span><span class="token punctuation">(</span>accessToken<span class="token punctuation">,</span>key<span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 验证访问令牌 忽略过期时间
     *
     * <span class="token keyword">@param</span> <span class="token parameter">accessToken</span> 访问令牌
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">validateAccessTokenWithoutExpiration</span><span class="token punctuation">(</span><span class="token class-name">String</span> accessToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">validateToken</span><span class="token punctuation">(</span>accessToken<span class="token punctuation">,</span>key<span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 验证刷新令牌
     *
     * <span class="token keyword">@param</span> <span class="token parameter">refreshToken</span> 刷新令牌
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">validateRefreshToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> refreshToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">validateToken</span><span class="token punctuation">(</span>refreshToken<span class="token punctuation">,</span>refreshKey<span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 验证令牌
     *
     * <span class="token keyword">@param</span> <span class="token parameter">token</span>            令牌
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>              关键
     * <span class="token keyword">@param</span> <span class="token parameter">isExpiredInvalid</span> 过期无效
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">validateToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> token<span class="token punctuation">,</span><span class="token class-name">Key</span> key<span class="token punctuation">,</span><span class="token keyword">boolean</span> isExpiredInvalid<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNullOrEmpty</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parserBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">ExpiredJwtException</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token operator">!</span>isExpiredInvalid<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果验证通过，则创建新的令牌返回,在JwtUtil中添加方法，通过刷新令牌创建访问令牌：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 通过刷新令牌的载荷创建访问令牌
     *
     * <span class="token keyword">@param</span> <span class="token parameter">token</span> 令牌
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">createAccessTokenWithRefreshToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> token<span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">parseClaims</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span>refreshKey<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>claims <span class="token operator">-></span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setClaims</span><span class="token punctuation">(</span>claims<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getJwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAccessTokenExpireTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setIssuedAt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS512</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token keyword">new</span> <span class="token class-name">AccessDeniedException</span><span class="token punctuation">(</span><span class="token string">"访问被拒绝"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 解析token获取载荷
     *
     * <span class="token keyword">@param</span> <span class="token parameter">token</span> 令牌
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>   关键
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Optional</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">Claims}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Claims</span><span class="token punctuation">></span></span> <span class="token function">parseClaims</span><span class="token punctuation">(</span><span class="token class-name">String</span> token<span class="token punctuation">,</span><span class="token class-name">Key</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token class-name">Claims</span> claims <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parserBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>claims<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在service层中加上：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">LoginVo</span> <span class="token function">refresh</span><span class="token punctuation">(</span><span class="token class-name">String</span> accessToken<span class="token punctuation">,</span> <span class="token class-name">String</span> refreshToken<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AccessDeniedException</span> <span class="token punctuation">{</span>

        <span class="token keyword">boolean</span> validateAccessToken <span class="token operator">=</span> jwtUtil<span class="token punctuation">.</span><span class="token function">validateAccessTokenWithoutExpiration</span><span class="token punctuation">(</span>accessToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> validateRefreshToken <span class="token operator">=</span> jwtUtil<span class="token punctuation">.</span><span class="token function">validateRefreshToken</span><span class="token punctuation">(</span>refreshToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>validateAccessToken <span class="token operator">&amp;&amp;</span> validateRefreshToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">LoginVo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setRefreshToken</span><span class="token punctuation">(</span>refreshToken<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAccessToken</span><span class="token punctuation">(</span>jwtUtil<span class="token punctuation">.</span><span class="token function">createAccessTokenWithRefreshToken</span><span class="token punctuation">(</span>refreshToken<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">AccessDeniedException</span><span class="token punctuation">(</span><span class="token string">"访问被拒绝"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动测试：可以通过刷新令牌创建访问令牌</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212211427154.png" alt="image-20221221142734036"></p>
<h2 id="_5-8-完成注册接口" tabindex="-1"><a class="header-anchor" href="#_5-8-完成注册接口" aria-hidden="true">#</a> 5-8 完成注册接口</h2>
<p>首先需要校验注册信息是否已存在，在持久层UserRepo创建三个方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 计数-用户名
     *
     * <span class="token keyword">@param</span> <span class="token parameter">username</span> 用户名
     * <span class="token keyword">@return</span> long
     */</span>
    <span class="token keyword">long</span> <span class="token function">countByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     *  计数-电子邮件地址
     *
     * <span class="token keyword">@param</span> <span class="token parameter">email</span> 电子邮件
     * <span class="token keyword">@return</span> long
     */</span>
    <span class="token keyword">long</span> <span class="token function">countByEmail</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 计数-手机号
     *
     * <span class="token keyword">@param</span> <span class="token parameter">mobile</span> 移动
     * <span class="token keyword">@return</span> long
     */</span>
    <span class="token keyword">long</span> <span class="token function">countByMobile</span><span class="token punctuation">(</span><span class="token class-name">String</span> mobile<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层创建三个私有方法用于校验：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 用户名是否已存在
     *
     * <span class="token keyword">@param</span> <span class="token parameter">username</span> 用户名
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isUsernameExisted</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">countByUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token operator">></span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 电子邮件地址是否已存在
     *
     * <span class="token keyword">@param</span> <span class="token parameter">email</span> 电子邮件
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isEmailExisted</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">countByEmail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token operator">></span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 手机号是否已存在
     *
     * <span class="token keyword">@param</span> <span class="token parameter">mobile</span> 移动
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isMobileExisted</span><span class="token punctuation">(</span><span class="token class-name">String</span> mobile<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">countByMobile</span><span class="token punctuation">(</span>mobile<span class="token punctuation">)</span><span class="token operator">></span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重复的话需要抛出异常，所以建立一个异常类：DuplicateProblem 继承AbstractThrowableProblem</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 数据重复时抛出的异常
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/22
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DuplicateProblem</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractThrowableProblem</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">URI</span> <span class="token constant">TYPE</span> <span class="token operator">=</span> <span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">PROBLEM_BASE_URI</span> <span class="token operator">+</span> <span class="token string">"/duplicate"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">DuplicateProblem</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token constant">TYPE</span><span class="token punctuation">,</span> <span class="token string">"发现重复数据"</span><span class="token punctuation">,</span> <span class="token class-name">Status</span><span class="token punctuation">.</span><span class="token constant">CONFLICT</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所用到的常量类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 常量
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/22
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Constants</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PROBLEM_BASE_URI</span> <span class="token operator">=</span> <span class="token string">"https://www.iocaop.com"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PATTERN_MOBILE</span> <span class="token operator">=</span> <span class="token string">"^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ROLE_USER</span> <span class="token operator">=</span> <span class="token string">"用户"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ROLE_ADMIN</span> <span class="token operator">=</span> <span class="token string">"管理员"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CACHE_MFA</span> <span class="token operator">=</span> <span class="token string">"cacheMfa"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层创建接口并实现方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span> userDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> username <span class="token operator">=</span> userDto<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> email <span class="token operator">=</span> userDto<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> mobile <span class="token operator">=</span> userDto<span class="token punctuation">.</span><span class="token function">getMobile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> name <span class="token operator">=</span> userDto<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isUsernameExisted</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">DuplicateProblem</span><span class="token punctuation">(</span><span class="token string">"用户名重复"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmailExisted</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">DuplicateProblem</span><span class="token punctuation">(</span><span class="token string">"电子邮件地址重复"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isMobileExisted</span><span class="token punctuation">(</span>mobile<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">DuplicateProblem</span><span class="token punctuation">(</span><span class="token string">"手机号重复"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// UserDTO转为User并保存到数据库</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withEmail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withMobile</span><span class="token punctuation">(</span>mobile<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withFullName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 给一个默认角色</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到此</p>
<p>已经做好了校验，还缺角色和密码加密，为了确保角色存在，需要先到数据库查一下，所以在RoleRepo中加入方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 角色-持久层
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/13
 */</span>
<span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">RoleRepo</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Role</span><span class="token punctuation">,</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 通过角色名称查找角色实体
     *
     * <span class="token keyword">@param</span> <span class="token parameter">authority</span> 角色
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Optional</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">Role}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Role</span><span class="token punctuation">></span></span> <span class="token function">findOptionalByAuthority</span><span class="token punctuation">(</span><span class="token class-name">String</span> authority<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过修改，最终注册用户业务层代码为：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span> userDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> username <span class="token operator">=</span> userDto<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> email <span class="token operator">=</span> userDto<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> mobile <span class="token operator">=</span> userDto<span class="token punctuation">.</span><span class="token function">getMobile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> name <span class="token operator">=</span> userDto<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> password <span class="token operator">=</span> userDto<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isUsernameExisted</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">DuplicateProblem</span><span class="token punctuation">(</span><span class="token string">"用户名重复"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmailExisted</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">DuplicateProblem</span><span class="token punctuation">(</span><span class="token string">"电子邮件地址重复"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isMobileExisted</span><span class="token punctuation">(</span>mobile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">DuplicateProblem</span><span class="token punctuation">(</span><span class="token string">"手机号重复"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// UserDTO转为User并保存到数据库</span>
        <span class="token comment">// 给一个默认角色</span>
        roleRepo<span class="token punctuation">.</span><span class="token function">findOptionalByAuthority</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">ROLE_USER</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>role <span class="token operator">-></span><span class="token punctuation">{</span>
                            <span class="token class-name">User</span> u <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withEmail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withMobile</span><span class="token punctuation">(</span>mobile<span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withFullName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withAuthorities</span><span class="token punctuation">(</span><span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>role<span class="token punctuation">)</span><span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withPassword</span><span class="token punctuation">(</span>passwordEncoder<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                           <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"注册失败，不存在默认角色"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动进行注册：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212222320972.png" alt="image-20221222232025782"></p>
<p><img src="http://www.iocaop.com/images/2022-12/202212222320366.png" alt="image-20221222232035219"></p>
<p><img src="http://www.iocaop.com/images/2022-12/202212222320244.png" alt="image-20221222232046124"></p>
<p>出现问题，几个布尔值为FALSE，原因：默认值，创建用户对象时自己赋值就好了：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>              						<span class="token punctuation">.</span><span class="token function">withEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withAccountNonExpired</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withAccountNonLocked</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withCredentialsNonExpired</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新注册的用户可以用来登录获取token：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212222327347.png" alt="image-20221222232737221"></p>
<h2 id="_6-1多因子登录和totp" tabindex="-1"><a class="header-anchor" href="#_6-1多因子登录和totp" aria-hidden="true">#</a> 6-1多因子登录和TOTP</h2>
<p><img src="http://www.iocaop.com/images/2022-12/202212222335703.png" alt="image-20221222233547463"></p>
<p><img src="http://www.iocaop.com/images/2022-12/202212222338775.png" alt="image-20221222233815500"></p>
<p>totp是什么玩意？</p>
<p>简单的说，通过一个key和时间，生成一个密码，在规定的密码有效时长内，再次生成，还会是同一个密码。比如：</p>
<p>totp有效时间10分钟，我早上8点用key=lzc(不会是字符串，这里假设是这样)和当前时间生成的密码是123456，那么再过五分钟也就是8：05我再生成一次，密码还是123456，在这个教程里面，用来生成短信验证码。</p>
<p>导入opt算法依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.eatthepath<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>java-otp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.4.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导入redis客户端依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.redisson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>redisson-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.12.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，每个用户用不同的key生成密码就好了，有效期是5分钟，五分钟后同样的key生成的密码会是不一样的。就实现了每个用户在同一时间收到的验证码是不一样的，并且有效期过后验证码是变化的。</p>
<p>因为Key是java中security包中的，所以需要序列化，在工具类中使用base64转换Key的字节数组为字符串存在数据库中了。</p>
<p>创建工具类TotpUtil：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * totp工具类
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TotpUtil</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span>  <span class="token class-name">KeyGenerator</span> keyGenerator<span class="token punctuation">;</span>

    <span class="token keyword">private</span>  <span class="token class-name">TimeBasedOneTimePasswordGenerator</span> totp<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 密码多久不变
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">TIME_STEP</span> <span class="token operator">=</span> <span class="token number">60</span><span class="token operator">*</span><span class="token number">5</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 密码长度
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">PASSWORD_LENGTH</span> <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 编译器会把这种非静态代码块拷贝到构造函数最开始的地方
     */</span>
    <span class="token punctuation">{</span>
        totp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TimeBasedOneTimePasswordGenerator</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token constant">TIME_STEP</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token constant">PASSWORD_LENGTH</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            keyGenerator <span class="token operator">=</span> <span class="token class-name">KeyGenerator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>totp<span class="token punctuation">.</span><span class="token function">getAlgorithm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// SHA-1或SHA-256需要64字节(512位)的key</span>
            <span class="token comment">// SHA-512需要128字节(1024位)的key</span>
            keyGenerator<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token number">512</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NoSuchAlgorithmException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"没有找到算法{}"</span><span class="token punctuation">,</span>e<span class="token punctuation">.</span><span class="token function">getLocalizedMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 生成totp
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>  生成totp的key
     * <span class="token keyword">@param</span> <span class="token parameter">time</span> 生成totp的时间
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">InvalidKeyException</span></span> 无效key异常
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">createTotp</span><span class="token punctuation">(</span><span class="token class-name">Key</span> key<span class="token punctuation">,</span> <span class="token class-name">Instant</span> time<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InvalidKeyException</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> password <span class="token operator">=</span> totp<span class="token punctuation">.</span><span class="token function">generateOneTimePassword</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 因为生成的密码是int型，所以需要进行格式化，使用字符串格式化方法，位数不够就在前面添0</span>
       <span class="token class-name">String</span> format <span class="token operator">=</span>  <span class="token string">"%0"</span><span class="token operator">+</span><span class="token constant">PASSWORD_LENGTH</span><span class="token operator">+</span><span class="token string">"d"</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>format<span class="token punctuation">,</span>password<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 通过字符串形式的Key生成密码code
     *
     * <span class="token keyword">@param</span> <span class="token parameter">strKey</span> 从数据库取出来的字符串形式的key
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Optional</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">String}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token function">createTotp</span><span class="token punctuation">(</span><span class="token class-name">String</span> strKey<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createTotp</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stringToKey</span><span class="token punctuation">(</span>strKey<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InvalidKeyException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 验证totp
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>  key
     * <span class="token keyword">@param</span> <span class="token parameter">code</span> 密码
     * <span class="token keyword">@return</span> boolean
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">InvalidKeyException</span></span> 无效key异常
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">verifyTotp</span><span class="token punctuation">(</span><span class="token class-name">Key</span> key<span class="token punctuation">,</span><span class="token class-name">String</span> code<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InvalidKeyException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Instant</span> now <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 验证totp，思路：拿之前的key和现在的时间再创建一次密码，如果原来的密码没有过期，那么当前拿当前时间创建的和之前的会是一样的，否则就是不一样的</span>
        <span class="token keyword">return</span> code<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createTotp</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>now<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 生成key
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Key</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Key</span> <span class="token function">generateKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> keyGenerator<span class="token punctuation">.</span><span class="token function">generateKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * Key转字符串
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 关键
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">keyToString</span><span class="token punctuation">(</span><span class="token class-name">Key</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">getEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encodeToString</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">getEncoded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取字符串形式的key
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">keyToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">keyToString</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">generateKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 字符串形式的key转成Key对象
     *
     * <span class="token keyword">@param</span> <span class="token parameter">base64StrKey</span> base64 str关键
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Key</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Key</span> <span class="token function">stringToKey</span><span class="token punctuation">(</span><span class="token class-name">String</span> base64StrKey<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SecretKeySpec</span><span class="token punctuation">(</span><span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">getDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>base64StrKey<span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token comment">// 需要和生成时使用同样的方法</span>
                totp<span class="token punctuation">.</span><span class="token function">getAlgorithm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-2-发送totp-阿里云短信" tabindex="-1"><a class="header-anchor" href="#_6-2-发送totp-阿里云短信" aria-hidden="true">#</a> 6-2 发送TOTP-阿里云短信</h2>
<p>阿里云短信平台：<a href = 'https://cn.aliyun.com/product/sms?from_alibabacloud=&scm=20140722.S_function@@product@@80687._.ID_function@@product@@80687-RL_??-LOC_bar-OR_ser-V_2-P0_0'>点击跳转</a></p>
<p>用户认证的逻辑：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212230116671.png" alt="image-20221223011607475"></p>
<h2 id="_6-3-短信发送服务-阿里云和leancloud" tabindex="-1"><a class="header-anchor" href="#_6-3-短信发送服务-阿里云和leancloud" aria-hidden="true">#</a> 6-3 短信发送服务-阿里云和LeanCloud</h2>
<p>首先创建一个接口（两个短信平台，不同实现即可），定义一个方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 短信服务
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">SmsService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 发送
     *
     * <span class="token keyword">@param</span> <span class="token parameter">mobile</span> 手机号
     * <span class="token keyword">@param</span> <span class="token parameter">code</span>   验证码
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">String</span> mobile<span class="token punctuation">,</span><span class="token class-name">String</span>  code<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="阿里短信平台" tabindex="-1"><a class="header-anchor" href="#阿里短信平台" aria-hidden="true">#</a> 阿里短信平台</h3>
<p>先写一个阿里的实现，导入SDK依赖：</p>
<p>有原版和升级版，参考地址：<a href = 'https://next.api.aliyun.com/api-tools/sdk/Dysmsapi?version=2017-05-25&language=java'>点击跳转</a>，这里使用原版</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.aliyun<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>aliyun-java-sdk-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.6.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增加配置类:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 阿里配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AliConfig</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ApplicationProperties</span> applicationProperties<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 使用阿里的服务，需要配置这个bean，不光是短信平台，其他平台也可以用
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IAcsClient</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">IAcsClient</span> <span class="token function">iAcsClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 参数1是区域，参数2是key，参数3是secret，这里在yaml中配置</span>
        <span class="token class-name">DefaultProfile</span> profile <span class="token operator">=</span> <span class="token class-name">DefaultProfile</span><span class="token punctuation">.</span><span class="token function">getProfile</span><span class="token punctuation">(</span><span class="token string">"cn-shenzhen"</span><span class="token punctuation">,</span> applicationProperties<span class="token punctuation">.</span><span class="token function">getAli</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAppKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">,</span> applicationProperties<span class="token punctuation">.</span><span class="token function">getAli</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAppSecret</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DefaultAcsClient</span><span class="token punctuation">(</span>profile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以ApplicationProperties中我们需要改成这样：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 应用程序属性
 * 应用程序属性  在yaml中配置，如lzc.jwt.access-token-expire-time=111
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/12/16
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"lzc"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationProperties</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token class-name">Ali</span> ali <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Ali</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Ali</span><span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * key
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> appKey<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * secret
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> appSecret<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token class-name">Jwt</span> jwt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jwt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Jwt</span><span class="token punctuation">{</span>

        <span class="token doc-comment comment">/**
         * token的开头 如： Authentication:Bearer xxxx
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> header <span class="token operator">=</span> <span class="token string">"Authorization"</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 前缀
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> prefix <span class="token operator">=</span> <span class="token string">"Bearer "</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 访问令牌到期时间 默认 60 秒
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">long</span> accessTokenExpireTime <span class="token operator">=</span> <span class="token number">60_000</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 刷新令牌到期时间 默认 30 天
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">long</span> refreshTokenExpireTime <span class="token operator">=</span> <span class="token number">30</span><span class="token operator">*</span><span class="token number">24</span><span class="token operator">*</span><span class="token number">3600</span><span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然秘钥在yaml中配置，但是不建议写明文，所以可以使用系统环境变量（或者在.env文件中配置，并且gitIgnore该文件）进行配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">lzc</span><span class="token punctuation">:</span>
  <span class="token key atrule">jwt</span><span class="token punctuation">:</span>
    <span class="token key atrule">access-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">60000000</span>
    <span class="token key atrule">refresh-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">2592000000</span>
  <span class="token key atrule">ali</span><span class="token punctuation">:</span>
    <span class="token key atrule">app-key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ALI_APP_KEY<span class="token punctuation">}</span>
    <span class="token key atrule">app-secret</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ALI_APP_SECRET<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>.env文件不能直接用，需要安装插件：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212230140877.png" alt="image-20221223014002696"></p>
<p>并且需要配置启动时读取：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212230141152.png" alt="image-20221223014131998"></p>
<p>配置好以后就可以正式开始编写发送验证码的代码了：</p>
<p>要思考一个问题，有两个平台，一个接口两个实现类，如何判断使用哪一个呢？</p>
<p>使用配置文件进行配置，配合注解@ConditionalOnProperty，参考：<a href = 'https://blog.csdn.net/weixin_42666837/article/details/115011297'>点击跳转</a>，如阿里实现类需要生效应该这样写，满足时才会生效</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 阿里短信平台服务实现类
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"lzc"</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"sms-provider.name"</span><span class="token punctuation">,</span>havingValue <span class="token operator">=</span> <span class="token string">"ali"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SmsServiceAliImpl</span> <span class="token keyword">implements</span> <span class="token class-name">SmsService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">IAcsClient</span> iAcsClient<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">String</span> mobile<span class="token punctuation">,</span> <span class="token class-name">String</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>


    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以ApplicationProperties又要加上：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token class-name">SmsProvider</span> smsProvider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SmsProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SmsProvider</span><span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 名字
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * url
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> url<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">lzc</span><span class="token punctuation">:</span>
  <span class="token key atrule">jwt</span><span class="token punctuation">:</span>
    <span class="token key atrule">access-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">60000000</span>
    <span class="token key atrule">refresh-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">2592000000</span>
  <span class="token key atrule">ali</span><span class="token punctuation">:</span>
    <span class="token key atrule">app-key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ALI_APP_KEY<span class="token punctuation">}</span>
    <span class="token key atrule">app-secret</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ALI_APP_SECRET<span class="token punctuation">}</span>
  <span class="token key atrule">sms-provider</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> ali
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">String</span> mobile<span class="token punctuation">,</span> <span class="token class-name">String</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 阿里帮我们屏蔽了很多鉴权的操作，这里只需要调用即可</span>
        <span class="token class-name">CommonRequest</span> commonRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CommonRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置请求方式</span>
        commonRequest<span class="token punctuation">.</span><span class="token function">setSysMethod</span><span class="token punctuation">(</span><span class="token class-name">MethodType</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置服务名称</span>
        commonRequest<span class="token punctuation">.</span><span class="token function">setSysAction</span><span class="token punctuation">(</span><span class="token string">"SendSms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 官网提供的version</span>
        commonRequest<span class="token punctuation">.</span><span class="token function">setSysVersion</span><span class="token punctuation">(</span><span class="token string">"2017-05-25"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 地区</span>
        commonRequest<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"RegionId"</span><span class="token punctuation">,</span> <span class="token string">"cn-hangzhou"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 手机号</span>
        commonRequest<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"PhoneNumbers"</span><span class="token punctuation">,</span> mobile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 签名名称</span>
        commonRequest<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"SignName"</span><span class="token punctuation">,</span> <span class="token string">"登录验证"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 模板code</span>
        commonRequest<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"TemplateCode"</span><span class="token punctuation">,</span> <span class="token string">"SMS_1610048"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 消息体</span>
        commonRequest<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"TemplateParam"</span><span class="token punctuation">,</span> <span class="token string">"{\"code\":\""</span> <span class="token operator">+</span>
                code <span class="token operator">+</span>
                <span class="token string">"\",\"product\":\"赖卓成的笔记\"}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 获取发送的结果</span>
            val response <span class="token operator">=</span> iAcsClient<span class="token punctuation">.</span><span class="token function">getCommonResponse</span><span class="token punctuation">(</span>commonRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"短信发送结果 {}"</span><span class="token punctuation">,</span> response<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ServerException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"发送短信时产生服务端异常 {}"</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getLocalizedMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClientException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"发送短信时产生客户端异常 {}"</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getLocalizedMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于没有申请，无法测试，后续再说。</p>
<h3 id="leancloud短信平台" tabindex="-1"><a class="header-anchor" href="#leancloud短信平台" aria-hidden="true">#</a> leancloud短信平台</h3>
<p>地址：<a href = 'https://console.leancloud.cn/apps/fkCaH5DlK0hwtTA6DgG7HX8i-gzGzoHsz/'>点击跳转</a></p>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.leancloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>storage-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>6.5.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写配置类，</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * LeanCloud配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LeanCloudConfig</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ApplicationProperties</span> applicationProperties<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">AVOSCloud</span><span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getLeanCloud</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAppId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getLeanCloud</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAppKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ApplicationProperties增加：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token class-name">LeanCloud</span> leanCloud <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LeanCloud</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">LeanCloud</span><span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * appId
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> appId<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * appKey
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> appKey<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：需要配置正确的id和key，否则项目启动会报错</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">lzc</span><span class="token punctuation">:</span>
  <span class="token key atrule">jwt</span><span class="token punctuation">:</span>
    <span class="token key atrule">access-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">60000000</span>
    <span class="token key atrule">refresh-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">2592000000</span>
  <span class="token key atrule">ali</span><span class="token punctuation">:</span>
    <span class="token key atrule">app-key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ALI_APP_KEY<span class="token punctuation">}</span>
    <span class="token key atrule">app-secret</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ALI_APP_SECRET<span class="token punctuation">}</span>
  <span class="token key atrule">lean-cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">app-id</span><span class="token punctuation">:</span> fkCaH5DlK0hwtTA6DgG7HX8i<span class="token punctuation">-</span>gzGzoHsz
    <span class="token key atrule">app-key</span><span class="token punctuation">:</span> bc2AFd8UOgwvaxlaoDnSt9OY
  <span class="token key atrule">sms-provider</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> ali
  <span class="token key atrule">email-provider</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> smtp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建实现类，重写方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * LeanCloud短信平台服务实现类
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"lzc"</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"sms-provider.name"</span><span class="token punctuation">,</span>havingValue <span class="token operator">=</span> <span class="token string">"lean-cloud"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SmsServiceLeanCloudImpl</span> <span class="token keyword">implements</span> <span class="token class-name">SmsService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">String</span> mobile<span class="token punctuation">,</span> <span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        val option <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AVSMSOption</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        option<span class="token punctuation">.</span><span class="token function">setTtl</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        option<span class="token punctuation">.</span><span class="token function">setApplicationName</span><span class="token punctuation">(</span><span class="token string">"慕课网实战Spring Security"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        option<span class="token punctuation">.</span><span class="token function">setOperation</span><span class="token punctuation">(</span><span class="token string">"两步验证"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        option<span class="token punctuation">.</span><span class="token function">setTemplateName</span><span class="token punctuation">(</span><span class="token string">"登录验证"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        option<span class="token punctuation">.</span><span class="token function">setSignatureName</span><span class="token punctuation">(</span><span class="token string">"慕课网"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        option<span class="token punctuation">.</span><span class="token function">setType</span><span class="token punctuation">(</span><span class="token constant">AVSMS</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">.</span><span class="token constant">TEXT_SMS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        option<span class="token punctuation">.</span><span class="token function">setEnvMap</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"smsCode"</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">AVSMS</span><span class="token punctuation">.</span><span class="token function">requestSMSCodeInBackground</span><span class="token punctuation">(</span>mobile<span class="token punctuation">,</span> option<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>
                        <span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">-></span> log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"短信发送成功 {}"</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">-></span> log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"发送短信时产生服务端异常 {}"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">getLocalizedMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没有申请开通短信平台，无法测试，先跳过。</p>
<h2 id="_6-4-email-发送服务smtp-和-api-方式" tabindex="-1"><a class="header-anchor" href="#_6-4-email-发送服务smtp-和-api-方式" aria-hidden="true">#</a> 6-4 Email 发送服务SMTP 和 API 方式.</h2>
<p>创建邮件服务接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 电子邮件服务
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EmailService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 发送
     *
     * <span class="token keyword">@param</span> <span class="token parameter">email</span> 电子邮件
     * <span class="token keyword">@param</span> <span class="token parameter">msg</span>   消息
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">,</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样也是两种实现，一种是API形式一种是SMTP形式。同理也是按条件加载Bean，所以ApplicationProperties增加：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token class-name">EmailProvider</span> emailProvider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EmailProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">EmailProvider</span><span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 名字
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * apiKey
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> apiKey<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件这样写：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">lzc</span><span class="token punctuation">:</span>
  <span class="token key atrule">jwt</span><span class="token punctuation">:</span>
    <span class="token key atrule">access-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">60000000</span>
    <span class="token key atrule">refresh-token-expire-time</span><span class="token punctuation">:</span> <span class="token number">2592000000</span>
  <span class="token key atrule">ali</span><span class="token punctuation">:</span>
    <span class="token key atrule">app-key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ALI_APP_KEY<span class="token punctuation">}</span>
    <span class="token key atrule">app-secret</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ALI_APP_SECRET<span class="token punctuation">}</span>
  <span class="token key atrule">sms-provider</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> ali
  <span class="token key atrule">email-provider</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> smtp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>引入SMTP依赖包:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-mail<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>API形式发送邮件的依赖包：sendgrid</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.sendgrid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sendgrid-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用SMTP需要配置，参考：<a href = 'https://blog.csdn.net/qq_51553982/article/details/126456685'>点击跳转</a></p>
<p>增加配置（可通过环境变量来配置）:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">mail</span><span class="token punctuation">:</span>
    <span class="token key atrule">default-encoding</span><span class="token punctuation">:</span> UTF<span class="token punctuation">-</span><span class="token number">8</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> smtp.qq.com
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">587</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> 911823616@qq.com
    <span class="token key atrule">password</span><span class="token punctuation">:</span> xxxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写SMTP发送邮件的方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 电子邮件服务smtp实现类
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"lzc"</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"email-provider.name"</span><span class="token punctuation">,</span>havingValue <span class="token operator">=</span> <span class="token string">"smtp"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmailServiceSmtpImpl</span> <span class="token keyword">implements</span> <span class="token class-name">EmailService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">JavaMailSender</span> javaMailSender<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">,</span> <span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SimpleMailMessage</span> simpleMailMessage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleMailMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 收件人</span>
        simpleMailMessage<span class="token punctuation">.</span><span class="token function">setTo</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 发件人</span>
        simpleMailMessage<span class="token punctuation">.</span><span class="token function">setFrom</span><span class="token punctuation">(</span><span class="token string">"911823616@qq.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 主题</span>
        simpleMailMessage<span class="token punctuation">.</span><span class="token function">setSubject</span><span class="token punctuation">(</span><span class="token string">"测试SMTP发送邮件的主题"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 正文</span>
        simpleMailMessage<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token string">"验证码为"</span><span class="token operator">+</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        javaMailSender<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>simpleMailMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用API的形式，需要引入他的Bean：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 邮件配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmailConfig</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ApplicationProperties</span> applicationProperties<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token comment">// 当有api-key时才创建这个Bean 否则会报错</span>
    <span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"lzc.email-provider"</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"api-key"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SendGrid</span> <span class="token function">sendGrid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SendGrid</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getEmailProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getApiKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重写API形式发送邮件的方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 电子邮件服务api 服务实现
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"lzc"</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">"email-provider.name"</span><span class="token punctuation">,</span> havingValue <span class="token operator">=</span> <span class="token string">"api"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmailServiceApiImpl</span> <span class="token keyword">implements</span> <span class="token class-name">EmailService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">SendGrid</span> sendGrid<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">,</span> <span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 发送者</span>
        <span class="token class-name">Email</span> from <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Email</span><span class="token punctuation">(</span><span class="token string">"911823616@qq.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 主题</span>
        <span class="token class-name">String</span> subject <span class="token operator">=</span> <span class="token string">"测试sendgrid发送邮件的主题"</span><span class="token punctuation">;</span>
        <span class="token comment">// 接受者</span>
        <span class="token class-name">Email</span> <span class="token keyword">to</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Email</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 内容</span>
        <span class="token class-name">Content</span> content <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Content</span><span class="token punctuation">(</span><span class="token string">"text/plain"</span><span class="token punctuation">,</span> <span class="token string">"验证码为"</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建邮件对象</span>
        <span class="token class-name">Mail</span> mail <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Mail</span><span class="token punctuation">(</span>from<span class="token punctuation">,</span> subject<span class="token punctuation">,</span> <span class="token keyword">to</span><span class="token punctuation">,</span> content<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Request</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            request<span class="token punctuation">.</span><span class="token function">setMethod</span><span class="token punctuation">(</span><span class="token class-name">Method</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            request<span class="token punctuation">.</span><span class="token function">setEndpoint</span><span class="token punctuation">(</span><span class="token string">"mail/send"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            request<span class="token punctuation">.</span><span class="token function">setBody</span><span class="token punctuation">(</span>mail<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Response</span> response <span class="token operator">=</span> sendGrid<span class="token punctuation">.</span><span class="token function">api</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">202</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"邮件发送成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"邮件发送异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-5-多因子认证逻辑-整体逻辑和实体类改造" tabindex="-1"><a class="header-anchor" href="#_6-5-多因子认证逻辑-整体逻辑和实体类改造" aria-hidden="true">#</a> 6-5 多因子认证逻辑 ---整体逻辑和实体类改造</h2>
<p>如何判断一个用户是否需要两步认证？</p>
<p>给User对象增加一个属性usingMfa，保存在数据库中，为true则需要进行两步验证。可以分情况设置是否需要启用两步验证，如后台用户需要两步验证，或者账户风险(上次登录ip与当前ip区别较大)时需要两步验证。</p>
<p>生成TOTP：</p>
<p>数据库中保存Key字节数组的base64形式，用于生成TOTP。</p>
<p>选择发送方式：</p>
<p>根据用户的选择来决定是发送短信还是电子邮件</p>
<p>通知客户端二次验证：</p>
<p>通过用户名和密码登录成功以后返回一个未授权的响应，在响应头中加入自定义头X-Authenticate:mfa,realm=请求id，这个请求id会放在redis缓存中。</p>
<p>开始操作，首先在User实体类中加入属性：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 使用mfa,是否启用两步验证
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"using_mfa"</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Builder.Default</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> usingMfa <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用于生成TOTP的Key的字节数组的Base64字符串
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"mfa_key"</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mfaKey<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，注册的时候就需要给用户生成mfaKey，所以在注册的方法中加入：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">TotpUtil</span> totpUtil<span class="token punctuation">;</span>

	                            <span class="token class-name">User</span> u <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                                    <span class="token punctuation">.</span><span class="token function">withMfaKey</span><span class="token punctuation">(</span>totpUtil<span class="token punctuation">.</span><span class="token function">keyToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，我们还需要改造登录方法，因为需要两步验证的时候不能直接返回token给用户，而是返回一个未授权的响应,首先UserService中添加一个方法，用于判断用户名密码是否能匹配上,然后再判断是否需要两步登录，不需要则调用原来的登录方法，返回token，需要则返回一个未授权的响应：</p>
<p>改造登录Controller：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/token"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NotBlank</span> <span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token annotation punctuation">@NotBlank</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> userService<span class="token punctuation">.</span><span class="token function">findByUsernameAndPassword</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>差异如下：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212231622861.png" alt="image-20221223162238732"></p>
<p>findByUsernameAndPassword方法实现：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">findByUsernameAndPassword</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span>  userRepo<span class="token punctuation">.</span><span class="token function">findOptionalByUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>user <span class="token operator">-></span> passwordEncoder<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>password<span class="token punctuation">,</span>user<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>user <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token comment">// 升级密码编码</span>
                    <span class="token comment">// 验证</span>
                    <span class="token comment">// 判断是否需要两步验证 如果不需要就直接返回token</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">.</span><span class="token function">isUsingMfa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span>password<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">// 如果需要两步验证，则先redis缓存用户信息，并返回一个请求id</span>
                    <span class="token class-name">String</span> requestId <span class="token operator">=</span> <span class="token class-name">UserCacheService</span><span class="token punctuation">.</span><span class="token function">cache</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 需要认证，则给客户端一个未授权的响应</span>
                    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">"X-Authenticate"</span><span class="token punctuation">,</span><span class="token string">"mfa"</span><span class="token punctuation">,</span><span class="token string">"realm="</span><span class="token operator">+</span>requestId<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token keyword">new</span> <span class="token class-name">BadCredentialsException</span><span class="token punctuation">(</span><span class="token string">"用户名或密码错误"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>暂时先这样。</p>
<h2 id="_6-6-多因子认证逻辑-使用-redis-缓存" tabindex="-1"><a class="header-anchor" href="#_6-6-多因子认证逻辑-使用-redis-缓存" aria-hidden="true">#</a> 6-6 多因子认证逻辑---使用 Redis 缓存</h2>
<p>编写用户缓存业务层代码：</p>
<p>作用：当用户需要两步验证时，生成一个随机的请求id，并以这个id作为redis中map的key，保存用户的信息，包括了用户的totp的mfaKey，所以可以利用这个mfaKey来验证验证码是否正确。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 用户缓存服务
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/23
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserCacheService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">RedissonClient</span> redissonClient<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">TotpUtil</span> totpUtil<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">CryptoUtil</span> cryptoUtil<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 缓存用户信息到redis
     *
     * <span class="token keyword">@param</span> <span class="token parameter">user</span> 用户
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span>  <span class="token class-name">String</span> <span class="token function">cache</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> requestId <span class="token operator">=</span> cryptoUtil<span class="token punctuation">.</span><span class="token function">randomAlphanumeric</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">RMapCache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">User</span><span class="token punctuation">></span></span> cache <span class="token operator">=</span> redissonClient<span class="token punctuation">.</span><span class="token function">getMapCache</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">CACHE_MFA</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 判断当前是否已存在缓存</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 不存在则加入</span>
            cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>requestId<span class="token punctuation">,</span>user<span class="token punctuation">,</span>totpUtil<span class="token punctuation">.</span><span class="token function">getTimeStep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> requestId<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 检索用户信息
     *
     * <span class="token keyword">@param</span> <span class="token parameter">requestId</span> 请求id
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Optional</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">User}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">retrieveUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> requestId<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">RMapCache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">User</span><span class="token punctuation">></span></span> cache <span class="token operator">=</span> redissonClient<span class="token punctuation">.</span><span class="token function">getMapCache</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">CACHE_MFA</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 校验验证码
     *
     * <span class="token keyword">@param</span> <span class="token parameter">requestId</span> 请求id
     * <span class="token keyword">@param</span> <span class="token parameter">code</span>      代码
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Optional</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">User}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">verifyTotp</span><span class="token punctuation">(</span><span class="token class-name">String</span> requestId<span class="token punctuation">,</span><span class="token class-name">String</span> code<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">RMapCache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">User</span><span class="token punctuation">></span></span> cache <span class="token operator">=</span> redissonClient<span class="token punctuation">.</span><span class="token function">getMapCache</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">CACHE_MFA</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cache<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token operator">||</span>cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 如果请求id对应的用户信息为空或整个map为空，则返回空</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">boolean</span> verify <span class="token operator">=</span> totpUtil<span class="token punctuation">.</span><span class="token function">verifyTotp</span><span class="token punctuation">(</span>totpUtil<span class="token punctuation">.</span><span class="token function">stringToKey</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getMfaKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>verify<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 验证成功了，需要从cache中移除，并返回用户信息</span>
            cache<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动项目，报错了，需要添加redisson的配置：说明文档：<a href = 'https://github.com/redisson/redisson/tree/master/redisson-spring-boot-starter'>点击跳转</a></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> www.iocaop.com
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>
    <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后重新注册一个用户：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212231850091.png" alt="image-20221223185014954"></p>
<p>可以看到，改造后的注册方法已经生效，用户在注册时已经生成了一个Base64加密的Key的字节数组：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212231851633.png" alt="image-20221223185105528"></p>
<p>两步验证为否，我们手动开启（将using_mfa设置为1），然后尝试登录：</p>
<p>报错了，因为少了一个build()</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212231856898.png" alt="image-20221223185635743"></p>
<p>修改重启后，再次登录，返回了一个未授权的响应，并且响应头包含了我们设置的内容：</p>
<p><img src="http://www.iocaop.com/images/2022-12/202212231857490.png" alt="image-20221223185742298"></p>
<h2 id="_6-7-多因子认证逻辑-选择发送方式和验证" tabindex="-1"><a class="header-anchor" href="#_6-7-多因子认证逻辑-选择发送方式和验证" aria-hidden="true">#</a> 6-7 多因子认证逻辑---选择发送方式和验证</h2>
<p>首先增加一下登录时密码升级的操作，校验用户是否可用，这里就简单校验，实际根据业务来做验证：</p>
<p><img src="http://www.iocaop.com/images/2023-01/202301032319678.png" alt="image-20230103231911542"></p>
<p>在上面，当用户需要两步验证时，返回了一个未授权的响应，前端要提示用户选择验证的方式(手机或邮箱)，所以需要增加接口，用于发送验证码：</p>
<p>控制层：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@PutMapping</span><span class="token punctuation">(</span><span class="token string">"/totp"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendTotp</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Valid</span> <span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">SendTotpDTO</span> sendTotpDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
        userService<span class="token punctuation">.</span><span class="token function">sendTotp</span><span class="token punctuation">(</span>sendTotpDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传参：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SendTotpDTO</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 请求id 用于获取用户信息（放在redis中）
     */</span>
    <span class="token annotation punctuation">@NotBlank</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> requestId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 验证方式
     */</span>
    <span class="token annotation punctuation">@NotNull</span>
    <span class="token keyword">private</span> <span class="token class-name">MfaType</span> mfaType<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务层：</p>
<p>flatMap解释：<a href='https://cloud.tencent.com/developer/article/2167553'>点击跳转</a>，map()会包装一层Optional。你用flatMap返回的是Optional&lt;T&gt;,map会返回Optional&lt;Optional&lt;T&gt;&gt;</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendTotp</span><span class="token punctuation">(</span><span class="token class-name">SendTotpDTO</span> sendTotpDTO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> requestId <span class="token operator">=</span> sendTotpDTO<span class="token punctuation">.</span><span class="token function">getRequestId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MfaType</span> mfaType <span class="token operator">=</span> sendTotpDTO<span class="token punctuation">.</span><span class="token function">getMfaType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获取用户信息</span>
       userCacheService<span class="token punctuation">.</span><span class="token function">retrieveUser</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>u<span class="token operator">-></span>
               <span class="token comment">// 因为这里返回的也是一个流，所以需要使用flatMap，转成新的流</span>
            totpUtil<span class="token punctuation">.</span><span class="token function">createTotp</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">getMfaKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token comment">// Pair表示一对，可以返回多个值，而不需要重新建一个对象</span>
                    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>t<span class="token operator">-></span><span class="token class-name">Pair</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
               <span class="token comment">// 是否有值</span>
               <span class="token punctuation">.</span><span class="token function">ifPresentOrElse</span><span class="token punctuation">(</span>p<span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>mfaType<span class="token operator">==</span><span class="token class-name">MfaType</span><span class="token punctuation">.</span><span class="token constant">SMS</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                smsService<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">getLeft</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMobile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>p<span class="token punctuation">.</span><span class="token function">getRight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                emailService<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">getLeft</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>p<span class="token punctuation">.</span><span class="token function">getRight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
       <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"发送验证码失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成验证码和发送验证码的代码之前已经写好，所以直接运行测试：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230104110436766.png" alt="image-20230104110436766"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230104110625596.png" alt="image-20230104110625596"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230104110654063.png" alt="image-20230104110654063"></p>
<p>还需要一个验证登录的接口：</p>
<p>根据请求id拿到redis中用户信息，再根据用户信息中的key和前端传入的验证码，使用totp工具验证验证码是否有效。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/totp/verify"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">LoginVo</span> <span class="token function">verifyTotp</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Valid</span> <span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">VerifyTotpDTO</span> verifyTotpDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token keyword">return</span>  userService<span class="token punctuation">.</span><span class="token function">verifyTotp</span><span class="token punctuation">(</span>verifyTotpDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VerifyTotpDTO</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 请求id
     */</span>
    <span class="token annotation punctuation">@NotNull</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> requestId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 代码
     */</span>
    <span class="token annotation punctuation">@NotNull</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> code<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">LoginVo</span> <span class="token function">verifyTotp</span><span class="token punctuation">(</span><span class="token class-name">VerifyTotpDTO</span> verifyTotpDTO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> code <span class="token operator">=</span> verifyTotpDTO<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> requestId <span class="token operator">=</span> verifyTotpDTO<span class="token punctuation">.</span><span class="token function">getRequestId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> userCacheService<span class="token punctuation">.</span><span class="token function">verifyTotp</span><span class="token punctuation">(</span>requestId<span class="token punctuation">,</span> code<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>user <span class="token operator">-></span>
               <span class="token keyword">new</span> <span class="token class-name">LoginVo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAccessToken</span><span class="token punctuation">(</span>jwtUtil<span class="token punctuation">.</span><span class="token function">createAccessToken</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setRefreshToken</span><span class="token punctuation">(</span>jwtUtil<span class="token punctuation">.</span><span class="token function">createRefreshToken</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span>
       <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"登录失败"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登录结果：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230104142119827.png" alt="image-20230104142119827"></p>
<h2 id="_6-9-前端集成-跨域处理" tabindex="-1"><a class="header-anchor" href="#_6-9-前端集成-跨域处理" aria-hidden="true">#</a> 6-9 前端集成---跨域处理.</h2>
<p>集成前端项目后，简单修改好对应的请求地址，进行登录，会报错：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105113059413.png" alt="image-20230105113059413"></p>
<p>可以在WebMvcConfigurer实现类中进行配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 使用 Sprig Mvc 配置 CORS
     *
     * <span class="token keyword">@param</span> <span class="token parameter">registry</span> Cors 注册表
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addCorsMappings</span><span class="token punctuation">(</span><span class="token class-name">CorsRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断当前环境</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>environment<span class="token punctuation">.</span><span class="token function">acceptsProfiles</span><span class="token punctuation">(</span><span class="token class-name">Profiles</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"dev"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            registry<span class="token punctuation">.</span><span class="token function">addMapping</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">allowedHeaders</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">exposedHeaders</span><span class="token punctuation">(</span><span class="token string">"X-Authenticate"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">allowCredentials</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">,</span> <span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"PUT"</span><span class="token punctuation">,</span> <span class="token string">"DELETE"</span><span class="token punctuation">,</span> <span class="token string">"OPTIONS"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">allowedOrigins</span><span class="token punctuation">(</span><span class="token string">"http://localhost:4001"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            registry<span class="token punctuation">.</span><span class="token function">addMapping</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">allowedHeaders</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">exposedHeaders</span><span class="token punctuation">(</span><span class="token string">"X-Authenticate"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">,</span> <span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"PUT"</span><span class="token punctuation">,</span> <span class="token string">"DELETE"</span><span class="token punctuation">,</span> <span class="token string">"OPTIONS"</span><span class="token punctuation">)</span>
                    <span class="token comment">// 生产主机域名</span>
                    <span class="token punctuation">.</span><span class="token function">allowedOrigins</span><span class="token punctuation">(</span><span class="token string">"https://www.iocaop.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没有生效，原因未知。可能原因：<a href='https://blog.csdn.net/qq_24427099/article/details/106261979'>点击跳转</a></p>
<p>使用SpringSecurity配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 跨域配置
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">CorsConfigurationSource</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">CorsConfigurationSource</span> <span class="token function">corsConfigurationSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 配置对象</span>
        <span class="token class-name">CorsConfiguration</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CorsConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 允许跨域访问的主机</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>environment<span class="token punctuation">.</span><span class="token function">acceptsProfiles</span><span class="token punctuation">(</span><span class="token class-name">Profiles</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"dev"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            configuration<span class="token punctuation">.</span><span class="token function">setAllowedOrigins</span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">"http://localhost:4001"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            configuration<span class="token punctuation">.</span><span class="token function">setAllowedOrigins</span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">"https://www.iocaop.com"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        configuration<span class="token punctuation">.</span><span class="token function">setAllowedMethods</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"POST"</span><span class="token punctuation">,</span> <span class="token string">"PUT"</span><span class="token punctuation">,</span> <span class="token string">"DELETE"</span><span class="token punctuation">,</span> <span class="token string">"OPTIONS"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        configuration<span class="token punctuation">.</span><span class="token function">setAllowedHeaders</span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 允许暴露的响应头 不设置在响应中是看不到的</span>
        configuration<span class="token punctuation">.</span><span class="token function">addExposedHeader</span><span class="token punctuation">(</span><span class="token string">"X-Authenticate"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Bean</span>
        <span class="token class-name">UrlBasedCorsConfigurationSource</span> source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UrlBasedCorsConfigurationSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        source<span class="token punctuation">.</span><span class="token function">registerCorsConfiguration</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">,</span> configuration<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> source<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-01/image-20230105121106100.png" alt="image-20230105121106100"></p>
<p>配置后，前端进行登录：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105121226961.png" alt="image-20230105121226961"></p>
<p>多因子认证选择，这里注意，传数字也是可以的，按下标来取，传1就是EMAIL</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105151023563.png" alt="image-20230105151023563"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105121256418.png" alt="image-20230105121256418"></p>
<p>验证码发送给后端，进行登录：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105121304868.png" alt="image-20230105121304868"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105121312282.png" alt="image-20230105121312282"></p>
<p>登录成功了，但是没有权限。</p>
<h2 id="_7-1-授权的概念和安全表达式的应用" tabindex="-1"><a class="header-anchor" href="#_7-1-授权的概念和安全表达式的应用" aria-hidden="true">#</a> 7-1 授权的概念和安全表达式的应用</h2>
<p>前面学习的都是认证，后面要开始授权了。什么是授权？举例：你能刷卡进入小区，但你不能进入小区里面任何一个人的家里。决定你能进入谁家，就是授权。</p>
<h4 id="accessdecisionmanager" tabindex="-1"><a class="header-anchor" href="#accessdecisionmanager" aria-hidden="true">#</a> AccessDecisionManager</h4>
<p>AccessDecisionManager根据相关信息作出授权决定，主要方法是decide，接收的参数是一个Object，意味着可以传入任何授权相关的信息，如MethodInvocation(通过方法参数实现某种安全逻辑)。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105163630918.png" alt="image-20230105163630918"></p>
<p>授权的机制，是基于投票的，通过一组AccessDecisionVoter实现轮询授权决定，根据投票评估，决定是否抛出授权异常AccessDeniedException。</p>
<p>其中，有三种投票策略：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105164213481.png" alt="image-20230105164213481"></p>
<p>AccessDecisionVoter投票器接口：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105164440170.png" alt="image-20230105164440170"></p>
<h4 id="rolevoter" tabindex="-1"><a class="header-anchor" href="#rolevoter" aria-hidden="true">#</a> RoleVoter</h4>
<p>SpringSecurity中默认实现了角色投票：RoleVoter</p>
<ul>
<li>如果任何ConfigAttribute以前缀ROLE_开头，它将进行投票</li>
<li>如果有一个GrantedAuthority返回的字符串表示正好有一个或多个ROLE_开头的ConfigAttribute，则通过，授予访问权限</li>
<li>没有任何ROLE_开头的ConfigAttribute完全匹配，则拒绝票</li>
<li>没有任何ROLE_开头的ConfigAttribute，则弃权票，相当于在配置中没有配置这个url需要哪些角色才能访问。</li>
</ul>
<p>在我们配置时，这样的一条：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/admin/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>就是一个ConfigAttribute，hasRole中的值会自动加上前缀ROLE_。</p>
<p>当访问url的时候，会检查当前角色GrantedAuthority(Role类实现了GrantedAuthority接口)，有没有url配置的ConfigAttribute。</p>
<p>总结流程：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230105170323692.png" alt="image-20230105170323692"></p>
<p>SecurityConfig配置url需要哪些角色，也就是配置ConfigAttribute，AccessDecisionManager中进行轮询投票，投票器会根据配置类中配置的ConfigAttribute来投票，最后AccessDecisionManager根据策略决定是否抛出授权异常。</p>
<h4 id="安全表达式" tabindex="-1"><a class="header-anchor" href="#安全表达式" aria-hidden="true">#</a> 安全表达式</h4>
<p><span style="background-color:pink;">越广泛的规则越要放后</span>，避免其他规则失效。</p>
<p>类似permitAll的函数：</p>
<ul>
<li>denyAll 拒绝用户访问</li>
<li>isAnonymous 是否为匿名用户</li>
<li>isRememberMe 是否为记住我用户</li>
<li>isAuthenticate 是否为已认证用户</li>
<li>isFullyAuthenticate 是否既不是匿名也不是记住我的用户</li>
</ul>
<p>hasRole，hasAuthority，hasAnyRole，hasAnyAuthority</p>
<ul>
<li>
<p>规定需要的角色，ROLE_这个前缀是不需要添加的</p>
</li>
<li>
<p>等价于hasAuthority(&quot;ROLE_ADMIN&quot;)</p>
</li>
</ul>
<p>access</p>
<ul>
<li>
<p>支持更复杂的表达式，支持SpEL表达式</p>
</li>
<li>
<p>可以引用HttpServletRequest中的属性，也可以引用Bean</p>
</li>
<li>
<p>需要注意authorizeRequests和authorizeHttpRequests配置方式不一样，具体：<a href='https://blog.51cto.com/u_14558366/5177293'>点击跳转</a>，<a href='https://maimai.cn/article/detail?fid=1684534271&efid=zU7_mH0-MphK87pGRpzuLQ'>点击跳转</a></p>
</li>
</ul>
<p>使用authorizeHttpRequests来做：</p>
<p>创建接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/user/{username}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCurrentUsername</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> username<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"当前用户："</span><span class="token operator">+</span>username<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>                        <span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/user/{username}"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">access</span><span class="token punctuation">(</span><span class="token punctuation">(</span>authenticationSupplier<span class="token punctuation">,</span> requestAuthorizationContext<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                            <span class="token comment">// 当前用户的权限信息 比如角色</span>
                            <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> authorities <span class="token operator">=</span> authenticationSupplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAuthorities</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token comment">// 当前请求上下文</span>
                            <span class="token comment">// 我们可以获取携带的参数</span>
                            <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> variables <span class="token operator">=</span> requestAuthorizationContext<span class="token punctuation">.</span><span class="token function">getVariables</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token comment">// 我们可以获取原始request对象</span>
                            <span class="token class-name">HttpServletRequest</span> request <span class="token operator">=</span> requestAuthorizationContext<span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token comment">// 根据这些信息 和业务写逻辑即可 最终决定是否授权 isGranted</span>
                            <span class="token keyword">boolean</span> isGranted <span class="token operator">=</span> authorities<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">GrantedAuthority</span><span class="token operator">::</span><span class="token function">getAuthority</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-></span> s<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"用户"</span><span class="token punctuation">)</span> <span class="token operator">||</span> s<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"管理员"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isGranted<span class="token punctuation">)</span><span class="token punctuation">{</span>
                                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">AccessDeniedException</span><span class="token punctuation">(</span><span class="token string">"Access Denied"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AuthorizationDecision</span><span class="token punctuation">(</span>isGranted<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动测试未生效，原因未知，卡了比较久，先注释掉，跳过。</p>
<p>使用authorizeRequests来做：</p>
<p>接口一样，配置时：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/user/{username}"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">access</span><span class="token punctuation">(</span><span class="token string">"hasRole('ADMIN') or #username=='赖卓成'"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>#username是参数</p>
<p>测试：</p>
<p>使用角色TEST访问失败，</p>
<p>使用角色ADMIN访问成功，</p>
<p>使用角色TEST访问并且参数为'赖卓成'，访问成功。</p>
<h2 id="_7-2-方法级注解" tabindex="-1"><a class="header-anchor" href="#_7-2-方法级注解" aria-hidden="true">#</a> 7-2 方法级注解</h2>
<p>之前是限制url的权限，在访问url的时候会检查身份是否授权，但是有些场景需要对方法进行限制。</p>
<p>要使用方法级别的注解，先创建一个配置类，用来开启这个功能：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 方法安全性配置  用于开启方法级别安全注解：@PreAuthorize、@PreFilter、@PostAuthorize、@PostFilter
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2023/01/06
 */</span>
<span class="token annotation punctuation">@EnableMethodSecurity</span><span class="token punctuation">(</span>prePostEnabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodSecurityConfig</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法之前校验权限" tabindex="-1"><a class="header-anchor" href="#方法之前校验权限" aria-hidden="true">#</a> 方法之前校验权限</h3>
<p>写一个接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/user/findAll"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span>  userService<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制层不做权限设置，在业务层的方法上加上注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@PreAuthorize</span><span class="token punctuation">(</span><span class="token string">"hasRole('管理员')"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepo<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请求进来，就会校验用户权限，我用游客访问这个接口，报错了：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230106171735049.png" alt="image-20230106171735049"></p>
<p>可以看到，web请求是认证成功了，但是方法没有认证成功：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230106172128658.png" alt="image-20230106172128658"></p>
<h3 id="方法之后校验权限" tabindex="-1"><a class="header-anchor" href="#方法之后校验权限" aria-hidden="true">#</a> 方法之后校验权限</h3>
<p>因为是先对数据进行操作，再进行权限校验，不推荐在对数据进行变更的方法上使用，不安全。</p>
<p>写个demo测试一下：</p>
<p>配置类先配置该接口需要认证，然后再来看授权：</p>
<p>认证后会对用户进行授权，我们用PostAuthorize注解，条件是方法返回值中的username和认证成功的Authentication对象中的name相同才授权。</p>
<p>在接口上加上注解：根据方法的返回值对接口进行授权认证</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/user/by-email/{email}/v2"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@PostAuthorize</span><span class="token punctuation">(</span><span class="token string">"returnObject.username==authentication.name"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">getUserByEmailV2</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> userService<span class="token punctuation">.</span><span class="token function">findByEmail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用admin用户的token对接口进行访问：</p>
<p>通过邮箱查询用户，如果用户名和已认证的相同，则授权：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107173828358.png" alt="image-20230107173828358"></p>
<p>不相同则抛出授权异常：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107173917061.png" alt="image-20230107173917061"></p>
<p>数据库信息：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107173939554.png" alt="image-20230107173939554"></p>
<h3 id="方法安全级别和路径安全级别冲突的情况" tabindex="-1"><a class="header-anchor" href="#方法安全级别和路径安全级别冲突的情况" aria-hidden="true">#</a> 方法安全级别和路径安全级别冲突的情况</h3>
<p>接口上的注解要求管理员身份：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/user/by-email/{email}"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@PreAuthorize</span><span class="token punctuation">(</span><span class="token string">"hasRole('ADMIN')"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">getUserByEmail</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> userService<span class="token punctuation">.</span><span class="token function">findByEmail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件中要求用户身份：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>                                <span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/user/by-email/{email}"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"USER"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动项目后使用USER角色访问会怎么样？</p>
<p>授权异常：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107175153468.png" alt="image-20230107175153468"></p>
<p>教程中，在单元测试用可以看到投票的过程和结果，懒得做了。结论：需要全票通过才行，在url授权成功了，但是在方法上授权失败了。</p>
<h3 id="在调试时遇到的问题" tabindex="-1"><a class="header-anchor" href="#在调试时遇到的问题" aria-hidden="true">#</a> 在调试时遇到的问题</h3>
<h4 id="异常捕获的问题" tabindex="-1"><a class="header-anchor" href="#异常捕获的问题" aria-hidden="true">#</a> 异常捕获的问题</h4>
<p>在调试时遇到这样的一个问题：以同样的配置方式进行url匹配权限，得到了不一样的结果：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>        http
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span>req <span class="token operator">-></span> req<span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/api/**"</span><span class="token punctuation">,</span> <span class="token string">"/admin/**"</span><span class="token punctuation">,</span> <span class="token string">"/auth/**"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exceptionHandling</span><span class="token punctuation">(</span>exp <span class="token operator">-></span>
                        exp<span class="token punctuation">.</span><span class="token function">authenticationEntryPoint</span><span class="token punctuation">(</span>securityProblemSupport<span class="token punctuation">)</span>
                                <span class="token punctuation">.</span><span class="token function">accessDeniedHandler</span><span class="token punctuation">(</span>securityProblemSupport<span class="token punctuation">)</span>
                <span class="token punctuation">)</span>

                <span class="token comment">// 授权配置</span>
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req <span class="token operator">-></span> req
                        <span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/admin/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/api/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"USER"</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/admin"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AdminController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"v1"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">v1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"v1"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/hello"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"v1"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">v1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"v1"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用同一个不具备权限的用户进行访问，得到了不一样的结果：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107162022510.png" alt="image-20230107162022510"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107162042955.png" alt="image-20230107162042955"></p>
<p>经过各种调试，最终找到问题：异常捕获</p>
<p>当使用了异常捕获配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>        http
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span>req <span class="token operator">-></span> req<span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/api/**"</span><span class="token punctuation">,</span> <span class="token string">"/admin/**"</span><span class="token punctuation">,</span> <span class="token string">"/auth/**"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exceptionHandling</span><span class="token punctuation">(</span>exp <span class="token operator">-></span>
                        exp<span class="token punctuation">.</span><span class="token function">authenticationEntryPoint</span><span class="token punctuation">(</span>securityProblemSupport<span class="token punctuation">)</span>
                                <span class="token punctuation">.</span><span class="token function">accessDeniedHandler</span><span class="token punctuation">(</span>securityProblemSupport<span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对异常进行捕获时，路径中没有匹配上的异常讲不会抛出，被放行了，所以hello接口会正常返回数据，解决方案：在异常捕获匹配中加入该接口的路径：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107162243447.png" alt="image-20230107162243447"></p>
<p>或者直接注释掉，不使用这个异常捕获，就会正常返回403：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107162321286.png" alt="image-20230107162321286"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107162336615.png" alt="image-20230107162336615"></p>
<h4 id="mvcmatchers的问题" tabindex="-1"><a class="header-anchor" href="#mvcmatchers的问题" aria-hidden="true">#</a> mvcMatchers的问题</h4>
<p>当使用了mvcMatchers，需要配置好对应的servlet-path，默认为/</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">mvc</span><span class="token punctuation">:</span>
    <span class="token key atrule">servlet</span><span class="token punctuation">:</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果手动配置了这个path，且path不是默认的/，则需要在进行匹配时加上：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">servletPath</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="hasrole匹配不上的问题" tabindex="-1"><a class="header-anchor" href="#hasrole匹配不上的问题" aria-hidden="true">#</a> hasRole匹配不上的问题</h4>
<p>还是上面的配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>                <span class="token comment">// 授权配置</span>
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req <span class="token operator">-></span> req
                        <span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/admin/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/api/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"USER"</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用用户角色为ADMIN的用户进行访问hello的接口：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107163721486.png" alt="image-20230107163721486"></p>
<p>报错了，提示没有权限：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107163738621.png" alt="image-20230107163738621"></p>
<p>但是可以看到，在日志中已经打印了，SecurityContextHolder中存储的用户角色明明是ADMIN：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">023</span><span class="token operator">-</span><span class="token number">01</span><span class="token operator">-</span><span class="token number">07</span> <span class="token number">16</span><span class="token operator">:</span><span class="token number">36</span><span class="token operator">:</span><span class="token number">09.839</span> <span class="token constant">DEBUG</span> <span class="token number">20316</span> <span class="token operator">--</span><span class="token operator">-</span> <span class="token punctuation">[</span>nio<span class="token operator">-</span><span class="token number">8080</span><span class="token operator">-</span>exec<span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token class-name"><span class="token namespace">s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>w<span class="token punctuation">.</span>c<span class="token punctuation">.</span></span>SecurityContextPersistenceFilter</span> <span class="token operator">:</span> <span class="token class-name">Set</span> <span class="token class-name">SecurityContextHolder</span> <span class="token keyword">to</span> <span class="token class-name">SecurityContextImpl</span> <span class="token punctuation">[</span><span class="token class-name">Authentication</span><span class="token operator">=</span><span class="token class-name">UsernamePasswordAuthenticationToken</span> <span class="token punctuation">[</span><span class="token class-name">Principal</span><span class="token operator">=</span>admin<span class="token punctuation">,</span> <span class="token class-name">Credentials</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token constant">PROTECTED</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token class-name">Authenticated</span><span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token class-name">Details</span><span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">Granted</span> <span class="token class-name">Authorities</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token constant">ADMIN</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token number">2023</span><span class="token operator">-</span><span class="token number">01</span><span class="token operator">-</span><span class="token number">07</span> <span class="token number">16</span><span class="token operator">:</span><span class="token number">36</span><span class="token operator">:</span><span class="token number">09.843</span> <span class="token constant">ERROR</span> <span class="token number">20316</span> <span class="token operator">--</span><span class="token operator">-</span> <span class="token punctuation">[</span>nio<span class="token operator">-</span><span class="token number">8080</span><span class="token operator">-</span>exec<span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>z<span class="token punctuation">.</span>problem<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span>AdviceTraits</span>   <span class="token operator">:</span> <span class="token class-name">Internal</span> <span class="token class-name">Server</span> <span class="token class-name">Error</span>

<span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>access<span class="token punctuation">.</span></span>AccessDeniedException</span><span class="token operator">:</span> <span class="token class-name">Access</span> <span class="token class-name">Denied</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么还会报错？因为使用hasRole方法，会在授权投票时自动加上ROLE_前缀，也就是.hasRole(&quot;ADMIN&quot;)期待的是ROLE_ADMIN，但是数据库中查出来的却是ADMIN，导致授权失败，</p>
<p>解决方法：使用另一个方法：这个方法不会自动填充上ROLE_前缀</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token function">hasAuthority</span><span class="token punctuation">(</span><span class="token string">"ADMIN"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者在数据库角色名称中加上前缀ROLE_，如下：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107164112675.png" alt="image-20230107164112675"></p>
<p>更深入了解，可以查看角色投票器：RoleVoter</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230107164159581.png" alt="image-20230107164159581"></p>
<h2 id="_7-3-rbac-和角色分级" tabindex="-1"><a class="header-anchor" href="#_7-3-rbac-和角色分级" aria-hidden="true">#</a> 7-3 RBAC 和角色分级</h2>
<h3 id="rbac基础知识" tabindex="-1"><a class="header-anchor" href="#rbac基础知识" aria-hidden="true">#</a> RBAC基础知识</h3>
<p>如何理解：角色其实是权限的集合，一个角色可以用多种不同的权限，一个用户可以有不同的角色。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230108112209403.png" alt="image-20230108112209403"></p>
<p>RBAC只是一个基础建模，可以在这基础上加，如加组织、部门等。</p>
<p>SpringSecurity中有hasRole和hasAuthority两个方法，其实本质是一样的，但是hasRole需要在数据库角色字段的值中加前缀ROLE_使得看起来，这就是一个角色，如ROLE_ADMIN，但是还是这个字段，使用hasAuthority就不需要加前缀，我们可以把值设置为：删除、修改等表示权限，就不会是：ROLE_删除，使得看起来像是一个角色，有语义上的一个限制。</p>
<p>动态配置权限：</p>
<p>其实是把不同的权限的组合配置给某个用户，其实就是角色的分配。不管怎么动态，最后都是需要一个固定的权限，来决定权限的组合，来限制用户访问哪些接口。也就是最终都会有固定的”原子“权限。</p>
<p>RBAC其实可以简化，也就是分配的时候，只分配到角色这一层，权限这一层就不管了。如果实际业务没有细粒度的要求控制到某一个角色对资源的增删改查，就可以这样做，不需要原子权限这一层了。</p>
<h3 id="角色分级" tabindex="-1"><a class="header-anchor" href="#角色分级" aria-hidden="true">#</a> 角色分级</h3>
<p>在RBAC中，如果角色非常多，几百上千个，那么管理起来很麻烦，所以需要对角色进行分级，在SpringSecurity中，使用的是包含的方式来分级。可以显著减轻管理角色和权限时的负担。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230108115504462.png" alt="image-20230108115504462"></p>
<p>代码实战，实现RoleHierarchy接口，重写方法：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230108115746624.png" alt="image-20230108115746624"></p>
<p>把Role层级对应的所有权限拿出来。</p>
<p>SpringSecurity默认有实现，RoleHierarchyImpl类。</p>
<p>需要在SpringSecurity的配置类中配置一下Bean，就用默认的实现类来设置角色层级：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RoleHierarchy</span> <span class="token function">roleHierarchy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">RoleHierarchyImpl</span> roleHierarchy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RoleHierarchyImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置角色层级</span>
        roleHierarchy<span class="token punctuation">.</span><span class="token function">setHierarchy</span><span class="token punctuation">(</span>
                <span class="token string">"ROLE_ADMIN > ROLE_MANAGER"</span> <span class="token operator">+</span>
                <span class="token string">"\n"</span> <span class="token operator">+</span>
                <span class="token string">"ROLE_MANAGER > ROLE_USER"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> roleHierarchy<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里定义了角色层级为：ADMIN包含MANAGER的权限，MANAGER包含了USER的权限，然后再创建一个接口，对接口url限定权限为MANAGER才可以访问：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/user/manager"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Hi"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token punctuation">.</span><span class="token function">mvcMatchers</span><span class="token punctuation">(</span><span class="token string">"/hello/user/manager"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"MANAGER"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>先使用TEST角色访问：没有权限</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">2023</span><span class="token operator">-</span><span class="token number">01</span><span class="token operator">-</span><span class="token number">08</span> <span class="token number">12</span><span class="token operator">:</span><span class="token number">08</span><span class="token operator">:</span><span class="token number">30.188</span> <span class="token constant">DEBUG</span> <span class="token number">10148</span> <span class="token operator">--</span><span class="token operator">-</span> <span class="token punctuation">[</span>nio<span class="token operator">-</span><span class="token number">8080</span><span class="token operator">-</span>exec<span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">]</span> <span class="token class-name"><span class="token namespace">s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>w<span class="token punctuation">.</span>c<span class="token punctuation">.</span></span>SecurityContextPersistenceFilter</span> <span class="token operator">:</span> <span class="token class-name">Set</span> <span class="token class-name">SecurityContextHolder</span> <span class="token keyword">to</span> <span class="token class-name">SecurityContextImpl</span> <span class="token punctuation">[</span><span class="token class-name">Authentication</span><span class="token operator">=</span><span class="token class-name">UsernamePasswordAuthenticationToken</span> <span class="token punctuation">[</span><span class="token class-name">Principal</span><span class="token operator">=</span>test2<span class="token punctuation">,</span> <span class="token class-name">Credentials</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token constant">PROTECTED</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token class-name">Authenticated</span><span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token class-name">Details</span><span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">Granted</span> <span class="token class-name">Authorities</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token constant">ROLE_TEST</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token number">2023</span><span class="token operator">-</span><span class="token number">01</span><span class="token operator">-</span><span class="token number">08</span> <span class="token number">12</span><span class="token operator">:</span><span class="token number">08</span><span class="token operator">:</span><span class="token number">30.197</span> <span class="token constant">ERROR</span> <span class="token number">10148</span> <span class="token operator">--</span><span class="token operator">-</span> <span class="token punctuation">[</span>nio<span class="token operator">-</span><span class="token number">8080</span><span class="token operator">-</span>exec<span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">]</span> <span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>z<span class="token punctuation">.</span>problem<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span>AdviceTraits</span>   <span class="token operator">:</span> <span class="token class-name">Internal</span> <span class="token class-name">Server</span> <span class="token class-name">Error</span>

<span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>access<span class="token punctuation">.</span></span>AccessDeniedException</span><span class="token operator">:</span> <span class="token class-name">Access</span> <span class="token class-name">Denied</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再将用户角色修改为MANAGER进行访问：授权成功</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230108121335710.png" alt="image-20230108121335710"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230108121401831.png" alt="image-20230108121401831"></p>
<p>再将用户角色改为ADMIN进行访问：授权成功</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230109161359882.png" alt="image-20230109161359882"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230109161458581.png" alt="image-20230109161458581"></p>
<p>调试期间遇到了问题，一直访问失败，一开始以为是版本问题，最终确定问题是：</p>
<p>在授权配置时使用的是authorizeHttpRequests，<strong>authorizeHttpRequests</strong> 和 <strong>RoleHierarchy</strong> 结合是没有效果的。需要注意。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230109161839874.png" alt="image-20230109161839874"></p>
<p>参考链接：<a href='https://blog.csdn.net/WLNMYR/article/details/122430201'>点击跳转</a></p>
<h2 id="_7-4-数据库和实体类的-rbac-改造" tabindex="-1"><a class="header-anchor" href="#_7-4-数据库和实体类的-rbac-改造" aria-hidden="true">#</a> 7-4 数据库和实体类的 RBAC 改造</h2>
<p>之前的数据库是：用户-&gt;角色，现在要做成：用户-&gt;角色-&gt;权限</p>
<p>需要修改表结构，由于是JPA所以要修改实体类，原来是Role实现了GrantedAuthority，不实现了，用role做permission的&quot;容器&quot;，也就是角色包含了权限。</p>
<p>新建实体类Permission，实现GrantedAuthority接口，定义好字段、表关联关系：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 权限 实体类
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/01/10
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@With</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Builder</span>
<span class="token annotation punctuation">@ToString</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"security_permission"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Permission</span> <span class="token keyword">implements</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">,</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 权限
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"permission_name"</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authority<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 权限名称--前端展示
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"display_name"</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> displayName<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 角色集合
     * 多对多关系，互相包含，所以添加上 @JsonIgnore 注解，不然会无限循环查数据库进行序列化
     * mappedBy用于设置映射时使用的名称
     *
     */</span>
    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token annotation punctuation">@ManyToMany</span><span class="token punctuation">(</span>mappedBy <span class="token operator">=</span> <span class="token string">"permissions"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Role</span><span class="token punctuation">></span></span> roles<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>需要注意的是@ManyToMany(mappedBy = &quot;permissions&quot;)的使用，这里是Permission和Role互相包含，在Permission类的roles字段上的注解参数mappedBy应该填写Role中Permission集合的字段名称：</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230110144606656.png" alt="image-20230110144606656"></p>
<p>Role不实现GrantedAuthority：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230109180810672.png" alt="image-20230109180810672"></p>
<p>改Role造类，注解配置好与Permission的多对多关系：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 角色
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/12/10
 */</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"security_role"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@Builder</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Role</span> <span class="token keyword">implements</span>  <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 角色名
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"role_name"</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> roleName<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 角色名称--前端展示
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"display_name"</span><span class="token punctuation">,</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> displayName<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 建在
     */</span>
    <span class="token annotation punctuation">@NotNull</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"built_in"</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> builtIn<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 权限
     */</span>
    <span class="token annotation punctuation">@ManyToMany</span>
    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token comment">// 用join的方式查询</span>
    <span class="token annotation punctuation">@Fetch</span><span class="token punctuation">(</span><span class="token class-name">FetchMode</span><span class="token punctuation">.</span><span class="token constant">JOIN</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@JoinTable</span><span class="token punctuation">(</span>
            <span class="token comment">// 中间表名称</span>
            name <span class="token operator">=</span> <span class="token string">"security_role_permission"</span><span class="token punctuation">,</span>
            <span class="token comment">// Role表的 关联字段 可以是数组，里面再用注解进行配置</span>
            joinColumns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>
                    <span class="token comment">// 关联的字段在中间表是role_id 引自security_role表的id</span>
                    name <span class="token operator">=</span> <span class="token string">"role_id"</span><span class="token punctuation">,</span>referencedColumnName <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// Permission表的关联字段</span>
            inverseJoinColumns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>
                    <span class="token comment">// 关联字段在中间表是permission_id，引自security_permission表的id</span>
                    name <span class="token operator">=</span> <span class="token string">"permission_id"</span><span class="token punctuation">,</span>referencedColumnName <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Permission</span><span class="token punctuation">></span></span> permissions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 用户集合，多对多关系
     */</span>
    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token annotation punctuation">@ManyToMany</span><span class="token punctuation">(</span>mappedBy <span class="token operator">=</span> <span class="token string">"roles"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> users<span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改造User类，原来UserDetails中的方法重写是由lombok完成的，因为配置多对多关系时用户-&gt;角色是直接使用角色集合作为authorities的：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230110145603946.png" alt="image-20230110145603946"></p>
<p>现在增加了权限表Permission，用户与角色多对多，角色与权限多对多，就需要手动重写方法获取用户权限：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 获取权限
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Collection</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">?}</span> <span class="token attr-name">{@link</span> <span class="token attr-name">extends}</span> <span class="token attr-name">{@link</span> <span class="token attr-name">GrantedAuthority}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> <span class="token function">getAuthorities</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>roles<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token comment">// 返回的是一个流，所以使用flatMap</span>
                <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>role <span class="token operator">-></span> 
                <span class="token comment">// 将两个流合并(链接)</span>
                <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>
                        <span class="token comment">// 用户角色，如ROLE_ADMIN也作为一种权限</span>
                        <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SimpleGrantedAuthority</span><span class="token punctuation">(</span>role<span class="token punctuation">.</span><span class="token function">getRoleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token comment">// 角色中的权限(实现了GrantedAuthority接口)集合</span>
                        role<span class="token punctuation">.</span><span class="token function">getPermissions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改与Role多对多关系字段的名称为roles后，User类代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@With</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Builder</span>
<span class="token annotation punctuation">@ToString</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"security_user"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span><span class="token punctuation">,</span> <span class="token class-name">UserDetails</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 指定主键和生成策略为自增
     */</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">255</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">"password_hash"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">255</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">255</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mobile<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">"full_name"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> fullName<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 使用mfa,是否启用两步验证
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"using_mfa"</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Builder.Default</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> usingMfa <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用于生成TOTP的Key的字节数组的Base64字符串
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"mfa_key"</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mfaKey<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 启用 因为是基本类型，lombok生成的方法就是isEnabled 刚好重写了UserDetails的isEnabled方法，
     * 所以可以删除快捷键生成的isEnabled，也就是不需要我们手动重写了。包装类型不能这样。
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> enabled<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 下面三个字段也是同理
     */</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"account_non_locked"</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> accountNonLocked<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"account_non_expired"</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> accountNonExpired<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"credentials_non_expired"</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> credentialsNonExpired<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ManyToMany</span>
    <span class="token comment">// 用join的方式查询</span>
    <span class="token annotation punctuation">@Fetch</span><span class="token punctuation">(</span><span class="token class-name">FetchMode</span><span class="token punctuation">.</span><span class="token constant">JOIN</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@JoinTable</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"security_user_role"</span><span class="token punctuation">,</span>
            <span class="token comment">// User表的 关联字段 可以是数组，里面再用注解进行配置</span>
            joinColumns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>
                    <span class="token comment">// 关联的字段在中间表是user_id 引自security_users表的id</span>
                    name <span class="token operator">=</span> <span class="token string">"user_id"</span><span class="token punctuation">,</span> referencedColumnName <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// Role表的关联字段</span>
            inverseJoinColumns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>
                    <span class="token comment">// 关联字段在中间表是role_id，引自security_role表的id</span>
                    name <span class="token operator">=</span> <span class="token string">"role_id"</span><span class="token punctuation">,</span> referencedColumnName <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 缓存</span>
    <span class="token annotation punctuation">@Cache</span><span class="token punctuation">(</span>usage <span class="token operator">=</span> <span class="token class-name">CacheConcurrencyStrategy</span><span class="token punctuation">.</span><span class="token constant">NONSTRICT_READ_WRITE</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@BatchSize</span><span class="token punctuation">(</span>size <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Role</span><span class="token punctuation">></span></span> roles<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取权限
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Collection</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">?}</span> <span class="token attr-name">{@link</span> <span class="token attr-name">extends}</span> <span class="token attr-name">{@link</span> <span class="token attr-name">GrantedAuthority}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> <span class="token function">getAuthorities</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>roles<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token comment">// 返回的是一个流，所以使用flatMap</span>
                <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>role <span class="token operator">-></span>
                <span class="token comment">// 将两个流合并(链接)</span>
                <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>
                        <span class="token comment">// 用户角色，如ROLE_ADMIN也作为一种权限</span>
                        <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SimpleGrantedAuthority</span><span class="token punctuation">(</span>role<span class="token punctuation">.</span><span class="token function">getRoleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token comment">// 角色中的权限(实现了GrantedAuthority接口)集合</span>
                        role<span class="token punctuation">.</span><span class="token function">getPermissions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//    @Override</span>
<span class="token comment">//    public boolean isAccountNonLocked() {</span>
<span class="token comment">//        return true;</span>
<span class="token comment">//    }</span>
<span class="token comment">//</span>
<span class="token comment">//    @Override</span>
<span class="token comment">//    public boolean isCredentialsNonExpired() {</span>
<span class="token comment">//        return true;</span>
<span class="token comment">//    }</span>

<span class="token comment">//    @Override</span>
<span class="token comment">//    public boolean isEnabled() {</span>
<span class="token comment">//        return false;</span>
<span class="token comment">//    }</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将修改实体类后影响项目启动的代码注释掉，启动项目后，表结构被JPA自动修改了：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230110150315347.png" alt="image-20230110150315347"></p>
<p>运行数据库脚本，初始化数据：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> security_permission <span class="token punctuation">(</span> id<span class="token punctuation">,</span> permission_name<span class="token punctuation">,</span> display_name <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
	<span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'USER_READ'</span><span class="token punctuation">,</span> <span class="token string">'查询用户信息'</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'USER_CREATE'</span><span class="token punctuation">,</span> <span class="token string">'新建用户'</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'USER_UPDATE'</span><span class="token punctuation">,</span> <span class="token string">'编辑用户信息'</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">'USER_ADMIN'</span><span class="token punctuation">,</span> <span class="token string">'用户管理'</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> security_user <span class="token punctuation">(</span> id<span class="token punctuation">,</span> username<span class="token punctuation">,</span> full_name<span class="token punctuation">,</span> mobile<span class="token punctuation">,</span> password_hash<span class="token punctuation">,</span> enabled<span class="token punctuation">,</span> account_non_expired<span class="token punctuation">,</span> account_non_locked<span class="token punctuation">,</span> credentials_non_expired<span class="token punctuation">,</span> using_mfa<span class="token punctuation">,</span> mfa_key<span class="token punctuation">,</span> email <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
	<span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'user'</span><span class="token punctuation">,</span> <span class="token string">'Zhang San'</span><span class="token punctuation">,</span> <span class="token string">'13012341234'</span><span class="token punctuation">,</span> <span class="token string">'{bcrypt}$2a$10$jhS817qUHgOR4uQSoEBRxO58.rZ1dBCmCTjG8PeuQAX4eISf.zowm'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">TRUE</span><span class="token punctuation">,</span> <span class="token string">'8Uy+OZUaZur9WwcP0z+YxNy+QdsWbtfqA70GQMxMfLeisTd8Na6C7DkjhJWLrGyEyBsnEmmkza6iorytQRh7OQ=='</span><span class="token punctuation">,</span> <span class="token string">'zhangsan@local.dev'</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'old_user'</span><span class="token punctuation">,</span> <span class="token string">'Li Si'</span><span class="token punctuation">,</span> <span class="token string">'13812341234'</span><span class="token punctuation">,</span> <span class="token string">'{SHA-1}7ce0359f12857f2a90c7de465f40a95f01cb5da9'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">FALSE</span><span class="token punctuation">,</span> <span class="token string">'8Uy+OZUaZur9WwcP0z+YxNy+QdsWbtfqA70GQMxMfLeisTd8Na6C7DkjhJWLrGyEyBsnEmmkza6iorytQRh7OQ=='</span><span class="token punctuation">,</span> <span class="token string">'lisi@local.dev'</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> security_role <span class="token punctuation">(</span> id<span class="token punctuation">,</span> role_name<span class="token punctuation">,</span> display_name<span class="token punctuation">,</span> built_in <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
	<span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'ROLE_USER'</span><span class="token punctuation">,</span> <span class="token string">'客户端用户'</span><span class="token punctuation">,</span> <span class="token boolean">TRUE</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'ROLE_ADMIN'</span><span class="token punctuation">,</span> <span class="token string">'超级管理员'</span><span class="token punctuation">,</span> <span class="token boolean">TRUE</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'ROLE_STAFF'</span><span class="token punctuation">,</span> <span class="token string">'管理后台用户'</span><span class="token punctuation">,</span> <span class="token boolean">TRUE</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> security_user_role <span class="token punctuation">(</span> user_id<span class="token punctuation">,</span> role_id <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
	<span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
	
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> security_role_permission <span class="token punctuation">(</span> role_id<span class="token punctuation">,</span> permission_id <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
	<span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动项目登录：</p>
<p>死循环，导致栈溢出，参考：<a href='https://blog.csdn.net/qq_21568515/article/details/124103794'>点击跳转</a></p>
<p>但是加上@JsonIgnore注解也没效果，所以注释掉，不使用双向关联了。</p>
<h2 id="_7-5-元注解简化权限表达式的使用" tabindex="-1"><a class="header-anchor" href="#_7-5-元注解简化权限表达式的使用" aria-hidden="true">#</a> 7-5 元注解简化权限表达式的使用</h2>
<p>简单的说，就是我们可以新建一个注解来包含原来的方法级别的注解，达到代码优化的效果。</p>
<p>我们新建一个接口用来修改用户信息，管理员或者拥有修改权限的用户可以修改任何用户的信息，其他只能修改自己的信息所以这个接口是这样的(为了测试，不严格遵循RestFul)：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/user/update"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@PreAuthorize</span><span class="token punctuation">(</span><span class="token string">"authentication.name==#user.username or hasAnyAuthority('ROLE_ADMIN','USER_UPDATE')"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">saveUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"允许修改"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果还有其他接口也是一样的权限规则，又要重新写一遍注解，而且可读性不好，所以我可以再创建一个注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 授权需要：管理员或具有更新权限
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/01/11
 */</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@PreAuthorize</span><span class="token punctuation">(</span><span class="token string">"authentication.name==#user.username or hasAnyAuthority('ROLE_ADMIN','USER_UPDATE')"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">RoleAdminOrUpdate</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将接口上的注解改为我们自定义的注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/user/update"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@RoleAdminOrUpdate</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">saveUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"允许修改"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行后，效果是一样的。测试过了，图片上传了，没什么意义。</p>
<h2 id="_7-6-使用-aop-动态刷新角色层级-未完成" tabindex="-1"><a class="header-anchor" href="#_7-6-使用-aop-动态刷新角色层级-未完成" aria-hidden="true">#</a> 7-6 使用 AOP 动态刷新角色层级-未完成</h2>
<p>虽然在User类中重写了UserDetails的方法getAuthorities，使得角色和权限都保存在了SecurityContextHolder中，也就是说，现在登录用户后，会将用户角色和用户角色对应的权限都添加到UsernamePasswordAuthenticationToken的authorities中：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230111154706747.png" alt="image-20230111154706747"></p>
<p>创建token时，将GrantedAuthority的是String存进去了。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230111155102951.png" alt="image-20230111155102951"></p>
<p>认证成功后，再用之前存的String，new了GrantedAuthority保存在UsernamePasswordAuthenticationToken中：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230111155119261.png" alt="image-20230111155119261"></p>
<p>为了学习角色层级和AOP刷新层级，我们还是新建了一个Service，用于刷新角色层级，可以在没有把用户角色对应的用户权限加入UsernamePasswordAuthenticationToken中的情况让授权正常进行。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 角色层级 业务层实现类
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/01/11
 */</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RoleHierarchyServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">RoleHierarchyService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">RoleRepo</span> roleRepo<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getRoleHierarchyExpr</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取所有用户的角色，给每个角色设置层级为角色名包含权限，如ROLE_ADMIN > USER_READ ROLE_ADMIN > USER_CREATE 等等</span>
        val roles <span class="token operator">=</span> roleRepo<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> roles<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>role <span class="token operator">-></span> role<span class="token punctuation">.</span><span class="token function">getPermissions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>permission <span class="token operator">-></span> role<span class="token punctuation">.</span><span class="token function">getRoleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" > "</span> <span class="token operator">+</span> permission<span class="token punctuation">.</span><span class="token function">getAuthority</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">//上面是角色和权限之间的包含关系， 最后手动加上角色之间的包含关系</span>
                <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span>
                        <span class="token comment">// 分隔符</span>
                        <span class="token string">""</span><span class="token punctuation">,</span>
                        <span class="token comment">// 前缀</span>
                        <span class="token constant">ROLE_ADMIN</span> <span class="token operator">+</span> <span class="token string">" > "</span> <span class="token operator">+</span> <span class="token constant">ROLE_STAFF</span><span class="token operator">+</span> <span class="token string">"\n"</span><span class="token punctuation">,</span>
                        <span class="token comment">// 后缀</span>
                        <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改角色层级配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RoleHierarchy</span> <span class="token function">roleHierarchy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">RoleHierarchyImpl</span> roleHierarchy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RoleHierarchyImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置角色层级</span>
<span class="token comment">//        roleHierarchy.setHierarchy(</span>
<span class="token comment">//                "ROLE_ADMIN > ROLE_MANAGER" +</span>
<span class="token comment">//                "\n" +</span>
<span class="token comment">//                "ROLE_MANAGER > ROLE_USER");</span>

        roleHierarchy<span class="token punctuation">.</span><span class="token function">setHierarchy</span><span class="token punctuation">(</span>roleHierarchyService<span class="token punctuation">.</span><span class="token function">getRoleHierarchyExpr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> roleHierarchy<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>处理完后，是这样的：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230111163609980.png" alt="image-20230111163609980"></p>
<p>假设我们在User类中的getAuthorities方法中没有将权限和角色进行合并，而是只返回了角色，那么在SecurityContextHolder中，就没有保存权限在authorities,需要通过设置角色层级来进行授权，就会有一个问题，假设我们修改了角色，就需要刷新角色层级，所以练习一下AOP刷新角色层级：</p>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!-- Spring AOP --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-aop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
		
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>建立切面：</p>
<p>装配获取角色层级表达式的Service和已有的RoleHierarchyImpl类型的Bean，设置好切点，后置通知：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 角色等级重新加载 切面
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/01/11
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RoleHierarchyReloadAspect</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">RoleHierarchyImpl</span> roleHierarchy<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">RoleHierarchyService</span> roleHierarchyService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 在表达式 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">></span></span><span class="token code-section">* <span class="token line"><span class="token code language-java">com<span class="token punctuation">.</span>lzc<span class="token punctuation">.</span>security<span class="token punctuation">.</span>service<span class="token punctuation">.</span>*<span class="token punctuation">.</span>*<span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">></span></span> 中
     * 第一个 * 的位置表示方法的返回类型，* 指的是任意类型
     * 然后 com.lzc.security.service.*.* 指定的是方法，这里要指定完整的方法名，*.* 表示 package 下任意方法
     * 最后 (..) 指定的是方法参数
     */</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"execution(* com.lzc.security.service.*.*(..))"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">applicationPackagePointcut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 刷新角色层级
     */</span>
    <span class="token annotation punctuation">@AfterReturning</span><span class="token punctuation">(</span><span class="token string">"applicationPackagePointcut() &amp;&amp; @annotation(com.lzc.security.annotation.ReloadRoleHierarchy)"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reloadRoleHierarchy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        val roleMap <span class="token operator">=</span> roleHierarchyService<span class="token punctuation">.</span><span class="token function">getRoleHierarchyExpr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        roleHierarchy<span class="token punctuation">.</span><span class="token function">setHierarchy</span><span class="token punctuation">(</span>roleMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"RoleHierarchy Reloaded"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 重新加载角色层次结构
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/01/11
 */</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">METHOD</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">ReloadRoleHierarchy</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>未完成，存在循环依赖问题，老子不干了！</p>
<h2 id="_7-7-前端的安全" tabindex="-1"><a class="header-anchor" href="#_7-7-前端的安全" aria-hidden="true">#</a> 7-7 前端的安全</h2>
<p>前端内容，跳过</p>
<h2 id="_7-8-授权流程源码解析和用户组的思路扩展" tabindex="-1"><a class="header-anchor" href="#_7-8-授权流程源码解析和用户组的思路扩展" aria-hidden="true">#</a> 7-8 授权流程源码解析和用户组的思路扩展.</h2>
<p>先看PreInvocationAuthorizationAdviceVoter：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230112212912868.png" alt="image-20230112212912868"></p>
<p>可以看到这一步，是在获取当前访问的方法或者url上的安全表达式，这里取到的是hasRole('ADMIN')，然后再去检查，看是否允许授权，点击进入方法，或者F7，跳到了子类ExpressionBasedPreInvocationAdvice，</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230112213615000.png" alt="image-20230112213615000"></p>
<p>F8返回刚才父类的断点，在点下一步，跳到了AffirmativeBased：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230112214107904.png" alt="image-20230112214107904"></p>
<p>可以看到循环了Voter，并且可以看到switch中，只要有一个投票器授权了，就return，这是一票以上即可通过策略，否则会走到最下面进行判断，抛出异常。</p>
<h2 id="_8-1-oauth2-的主要角色和流程" tabindex="-1"><a class="header-anchor" href="#_8-1-oauth2-的主要角色和流程" aria-hidden="true">#</a> 8-1 OAuth2 的主要角色和流程.</h2>
<p>简书可以使用微博登录。</p>
<ul>
<li>客户端：简书</li>
<li>资源服务器：微博中的资源</li>
<li>授权服务器：就是登录页面，提示是否允许授权时访问的服务器</li>
<li>用户</li>
</ul>
<p>一般来说，需要申请客户端，得到key和secret。</p>
<p>授权类型：</p>
<ul>
<li>
<p>授权码流程：先在客户端携带key进行跳转到授权服务器，授权服务器返回登录页，登录成功后，返回授权码，客户端再使用授权码获取授权服务器的token获取资源，最后客户端生成token返回给前端。可参考另一篇笔记：<a href='http://www.iocaop.com/posts/2022-hlxx/%E5%B9%BF%E4%B8%9C%E7%9C%81%E7%BB%9F%E4%B8%80%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E5%B9%B3%E5%8F%B0%E5%AF%B9%E6%8E%A5.html'>点击跳转</a></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230112175355822.png" alt="image-20230112175355822"></p>
</li>
<li>
<p>资源所有者密码流程(适合官方应用)：直接用用户名和密码登录，不需要跳转到授权服务器。</p>
</li>
<li>
<p>客户端凭证流程(适合无用户参与的应用)：静态资源服务器，自己的服务进行访问，只需要key，不用secret。</p>
</li>
<li>
<p>刷新令牌流程：访问令牌过期后需要刷新令牌</p>
</li>
</ul>
<h2 id="_8-2-jws和jwk" tabindex="-1"><a class="header-anchor" href="#_8-2-jws和jwk" aria-hidden="true">#</a> 8-2 JWS和JWK</h2>
<h3 id="oauth介绍" tabindex="-1"><a class="header-anchor" href="#oauth介绍" aria-hidden="true">#</a> Oauth介绍</h3>
<p>在SpringSecurity5.1之前所有啊Oauth(包括1.0和2.0)功能集成在SpringSecurity OAuth2，单独一个包，支持搭建授权服务器和资源服务器。</p>
<p>5.1之后，SpringSecurity把所有的Oauth2.0（1.0已经不支持了）的功能集成了，不需要单独一个包，在SpringSecurity的包里就有了，提供了资源服务器和客户端类库支持。</p>
<p>目前全新的项目，Spring Authorization Server正在开发中。</p>
<h3 id="什么是jws和jwk" tabindex="-1"><a class="header-anchor" href="#什么是jws和jwk" aria-hidden="true">#</a> 什么是JWS和JWK</h3>
<p>JWS：S代表secret，描述了验证数据完整性的不同加密机制。关于JWT签名的验证数据完整性的标准。</p>
<p>JWK：K代表Key，表示加密秘钥的json结构，JWT加密秘钥。</p>
<p>一对秘钥(非对称加密)，分别保存在服务器和客户端。</p>
<h3 id="公钥和私钥" tabindex="-1"><a class="header-anchor" href="#公钥和私钥" aria-hidden="true">#</a> 公钥和私钥</h3>
<ul>
<li>
<p>非对称加密：私钥在自己这，公钥可以公开出去。</p>
<p>用私钥签名，用公钥解签名。私钥加密的签名，很多人有公钥，很多人可以解。</p>
<p>或者公钥加密，私钥解密。很多人加密了内容，给我，我有私钥，只能有我来解，公钥不能互相解。</p>
</li>
</ul>
<h3 id="jws和jwk在加密时的作用" tabindex="-1"><a class="header-anchor" href="#jws和jwk在加密时的作用" aria-hidden="true">#</a> JWS和JWK在加密时的作用</h3>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230112182558582.png" alt="image-20230112182558582"></p>
<p>流程：</p>
<ol>
<li>客户端访问授权服务器，返回了一个使用JWS签名的JWT，里面包含了Kid，Kid：一种加密形式的秘钥的标识，包含秘钥的结构，比如使用何种方式进行加密。</li>
<li>客户端请求资源服务器(携带了JWT(JWS签名的))</li>
<li>资源服务器请求授权服务器，返回了一个JWK。</li>
<li>资源服务器再验证签名。</li>
<li>资源服务器验证权限。</li>
</ol>
<p>使用JWS的标准进行签名---JWT创建流程：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230112221351156.png" alt="image-20230112221351156"></p>
<p>使用JWS的标准进行签名---JWT解析流程：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230112221602428.png" alt="image-20230112221602428"></p>
<h2 id="_8-3-搭建授权服务器-一-依赖和表结构" tabindex="-1"><a class="header-anchor" href="#_8-3-搭建授权服务器-一-依赖和表结构" aria-hidden="true">#</a> 8-3 搭建授权服务器（一）依赖和表结构.</h2>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>security.oauth2.version</span><span class="token punctuation">></span></span>2.5.2.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>security.oauth2.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>security.oauth2.autoconfigure.version</span><span class="token punctuation">></span></span>2.6.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>security.oauth2.autoconfigure.version</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- Spring Security OAuth2 依赖 --></span>
        <span class="token comment">&lt;!-- 注意，Spring 已经在开发 Spring Authorization Server，下面三个依赖以后逐渐会弃用 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.security.oauth.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-security-oauth2-autoconfigure<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${security.oauth2.autoconfigure.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.security.oauth<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-security-oauth2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${security.oauth2.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 新版 Resource Server 类库 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-oauth2-resource-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>建表：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> oauth_client_details<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> oauth_client_details
<span class="token punctuation">(</span>
    client_id               <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    client_name             <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    resource_ids            <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    client_secret           <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    scope                   <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    authorized_grant_types  <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    web_server_redirect_uri <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    authorities             <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    access_token_validity   <span class="token keyword">INTEGER</span><span class="token punctuation">,</span>
    refresh_token_validity  <span class="token keyword">INTEGER</span><span class="token punctuation">,</span>
    additional_information  <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    autoapprove             <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8mb4<span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> oauth_client_token<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> oauth_client_token
<span class="token punctuation">(</span>
    token_id          <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    token             <span class="token keyword">BLOB</span><span class="token punctuation">,</span>
    authentication_id <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    user_name         <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    client_id         <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>authentication_id<span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8mb4<span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> oauth_access_token<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> oauth_access_token
<span class="token punctuation">(</span>
    token_id          <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    token             <span class="token keyword">BLOB</span><span class="token punctuation">,</span>
    authentication_id <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    user_name         <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    client_id         <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    authentication    <span class="token keyword">BLOB</span><span class="token punctuation">,</span>
    refresh_token     <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8mb4<span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> oauth_refresh_token<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> oauth_refresh_token
<span class="token punctuation">(</span>
    token_id       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    token          <span class="token keyword">BLOB</span><span class="token punctuation">,</span>
    authentication <span class="token keyword">BLOB</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8mb4<span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> oauth_code<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> oauth_code
<span class="token punctuation">(</span>
    code           <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    authentication <span class="token keyword">BLOB</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8mb4<span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> oauth_approvals<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> oauth_approvals
<span class="token punctuation">(</span>
    userid         <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    clientid       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    scope          <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>         <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    expiresat      <span class="token keyword">TIMESTAMP</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span><span class="token punctuation">,</span>
    lastmodifiedate <span class="token keyword">TIMESTAMP</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8mb4<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不学了</p>
</div></template>


