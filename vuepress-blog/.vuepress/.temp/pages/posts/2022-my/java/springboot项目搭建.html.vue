<template><div><h2 id="项目搭建" tabindex="-1"><a class="header-anchor" href="#项目搭建" aria-hidden="true">#</a> 项目搭建</h2>
<p>每个项目基本都能用上的依赖：</p>
<ul>
<li>
<p>继承父工程、启动器</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.7.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>JSR380</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-validation<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>mysql或sqlserver，其中sqlserver经常连不上，目前稳定使用的版本：8.2.2.jre8</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.microsoft.sqlserver<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mssql-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>8.2.2.jre8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>druid连接池,jdbc，mybatis-plus</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.2.14<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-plus-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.5.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>swagger</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.springfox<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>springfox-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>打包插件和多环境配置</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profiles</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>dev<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activation</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeByDefault</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeByDefault</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activation</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile.name</span><span class="token punctuation">></span></span>dev<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile.name</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>prod<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile.name</span><span class="token punctuation">></span></span>prod<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile.name</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profiles</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>多环境配置，一个application.yml，其他的加后缀。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8030</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">mvc</span><span class="token punctuation">:</span>
    <span class="token key atrule">pathmatch</span><span class="token punctuation">:</span>
      <span class="token key atrule">matching-strategy</span><span class="token punctuation">:</span> ant_path_matcher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>数据源配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.microsoft.sqlserver.jdbc.SQLServerDriver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>sqlserver<span class="token punctuation">:</span>//192.168.1.129<span class="token punctuation">:</span>1433;database=xxx;user=xxx;password=xxx;loginTimeout=30;
    <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
    <span class="token key atrule">druid</span><span class="token punctuation">:</span>
      <span class="token comment"># 初始化连接池大小</span>
      <span class="token key atrule">initial-size</span><span class="token punctuation">:</span> <span class="token number">10</span>
      <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">150</span>
      <span class="token comment">## 开启基础监控</span>
      <span class="token key atrule">stat-view-servlet</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token comment"># 账号密码</span>
        <span class="token key atrule">login-username</span><span class="token punctuation">:</span> admin
        <span class="token key atrule">login-password</span><span class="token punctuation">:</span> <span class="token number">123456</span>
        <span class="token comment"># 访问路径：ip:port/druid/login.html</span>
        <span class="token key atrule">url-pattern</span><span class="token punctuation">:</span> /druid/*
        <span class="token comment"># ip白名单(没有配置为空,则允许所有访问)。deny是设置黑名单</span>
        <span class="token key atrule">allow</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">filter</span><span class="token punctuation">:</span>
        <span class="token comment"># 开启sql监控</span>
        <span class="token key atrule">stat</span><span class="token punctuation">:</span>
          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">db-type</span><span class="token punctuation">:</span> sqlserver
          <span class="token comment"># 慢sql监控,sql监控，最慢会显示红色</span>
          <span class="token key atrule">log-slow-sql</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">slow-sql-millis</span><span class="token punctuation">:</span> <span class="token number">200</span>
        <span class="token comment"># 开启SQL防火墙监控</span>
        <span class="token key atrule">wall</span><span class="token punctuation">:</span>
          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">db-type</span><span class="token punctuation">:</span> sqlserver
          <span class="token key atrule">config</span><span class="token punctuation">:</span>
            <span class="token comment"># 是否允许删除</span>
            <span class="token key atrule">delete-allow</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
            <span class="token comment"># 是否允许删除表</span>
            <span class="token key atrule">drop-table-allow</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
          <span class="token comment"># 开启日志打印</span>
        <span class="token key atrule">slf4j</span><span class="token punctuation">:</span>
          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">statement-prepare-after-log-enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
          <span class="token key atrule">statement-close-after-log-enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token comment"># 开启web应用和URI监控</span>
      <span class="token key atrule">web-stat-filter</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token comment"># 排除的</span>
        <span class="token key atrule">exclusions</span><span class="token punctuation">:</span> <span class="token string">"*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*,/swagger-resources*,/webjars*,/v2*,/doc.html"</span>
        <span class="token comment"># profileEnable能够监控单个url调用的sql列表</span>
        <span class="token key atrule">profileEnable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token comment"># sessionStatEnable 开启session监控</span>
      <span class="token comment"># 开启Spring监控（需要加入aop的依赖）</span>
      <span class="token key atrule">aop-patterns</span><span class="token punctuation">:</span> com.hulian.apply.dao
     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="配置和规范" tabindex="-1"><a class="header-anchor" href="#配置和规范" aria-hidden="true">#</a> 配置和规范</h2>
<ul>
<li>
<p>允许跨域：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MvcConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addCorsMappings</span><span class="token punctuation">(</span><span class="token class-name">CorsRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">addMapping</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">allowedOrigins</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"HEAD"</span><span class="token punctuation">,</span> <span class="token string">"POST"</span><span class="token punctuation">,</span> <span class="token string">"PUT"</span><span class="token punctuation">,</span> <span class="token string">"DELETE"</span><span class="token punctuation">,</span> <span class="token string">"OPTIONS"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">maxAge</span><span class="token punctuation">(</span><span class="token number">3600</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">allowedHeaders</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">allowCredentials</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>统一返回结果</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 统一返回结果
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/11/09
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@JsonInclude</span><span class="token punctuation">(</span><span class="token class-name">JsonInclude<span class="token punctuation">.</span>Include</span><span class="token punctuation">.</span><span class="token constant">NON_NULL</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">2405172041950251807L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 返回编码
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> code<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 编码描述
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> msg<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 业务数据
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> data<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">success</span><span class="token punctuation">(</span><span class="token class-name">T</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setCode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setMsg</span><span class="token punctuation">(</span><span class="token string">"success"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">success</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> code <span class="token punctuation">,</span><span class="token class-name">String</span> msg<span class="token punctuation">,</span><span class="token class-name">T</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setCode</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setMsg</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用注解，就不用每次return都Result.ok()之类的：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 统一返回结果注解
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/11/09
 */</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">METHOD</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">ApiResult</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">""</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> <span class="token function">successCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">successMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">"success"</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Result</span><span class="token punctuation">></span></span> <span class="token function">resultClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * RestController增强
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/11/09
 */</span>

<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ControllerAdvice</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyResponseBodyAdvice</span> <span class="token keyword">implements</span> <span class="token class-name">ResponseBodyAdvice</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Result</span><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">isStringConverter</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">HttpMessageConverter</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span><span class="token punctuation">></span></span> converterType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> converterType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">StringHttpMessageConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">isApiResult</span><span class="token punctuation">(</span><span class="token class-name">MethodParameter</span> returnType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> returnType<span class="token punctuation">.</span><span class="token function">hasMethodAnnotation</span><span class="token punctuation">(</span><span class="token class-name">ApiResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">supports</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NotNull</span> <span class="token class-name">MethodParameter</span> returnType<span class="token punctuation">,</span> <span class="token annotation punctuation">@NotNull</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">HttpMessageConverter</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span><span class="token punctuation">></span></span> converterType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">!</span><span class="token function">isStringConverter</span><span class="token punctuation">(</span>converterType<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isApiResult</span><span class="token punctuation">(</span>returnType<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">beforeBodyWrite</span><span class="token punctuation">(</span><span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> body<span class="token punctuation">,</span> <span class="token annotation punctuation">@NotNull</span> <span class="token class-name">MethodParameter</span> returnType<span class="token punctuation">,</span> <span class="token annotation punctuation">@NotNull</span> <span class="token class-name">MediaType</span> selectedContentType<span class="token punctuation">,</span>
                                          <span class="token annotation punctuation">@NotNull</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">HttpMessageConverter</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span><span class="token punctuation">></span></span> selectedConverterType<span class="token punctuation">,</span> <span class="token annotation punctuation">@NotNull</span> <span class="token class-name">ServerHttpRequest</span> request<span class="token punctuation">,</span> <span class="token annotation punctuation">@NotNull</span> <span class="token class-name">ServerHttpResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>全局异常捕获</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 全局异常处理
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/11/09
 */</span>
<span class="token annotation punctuation">@RestControllerAdvice</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GlobalExceptionHandler</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">MethodArgumentNotValidException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">BindException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">methodArgumentNotValidHandler</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">Exception</span>  e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BindingResult</span> bindingResult<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">MethodArgumentNotValidException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            bindingResult <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">MethodArgumentNotValidException</span><span class="token punctuation">)</span> e<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBindingResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            bindingResult <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">BindException</span><span class="token punctuation">)</span> e<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBindingResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">FieldError</span> fieldError <span class="token operator">=</span> bindingResult<span class="token punctuation">.</span><span class="token function">getFieldError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">PARAMETERS_ERROR</span><span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">PARAMETERS_ERROR</span><span class="token punctuation">.</span><span class="token function">getMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token operator">+</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">!=</span>fieldError<span class="token operator">?</span><span class="token string">"["</span> <span class="token operator">+</span> fieldError<span class="token punctuation">.</span><span class="token function">getField</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"]"</span> <span class="token operator">+</span> fieldError<span class="token punctuation">.</span><span class="token function">getDefaultMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token class-name">BusinessException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">businessExceptionHandler</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">BusinessException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">defaultErrorHandler</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">UN_KNOW_ERROR</span><span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">UN_KNOW_ERROR</span><span class="token punctuation">.</span><span class="token function">getMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@EqualsAndHashCode</span><span class="token punctuation">(</span>callSuper <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BusinessException</span> <span class="token keyword">extends</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">{</span>


    <span class="token keyword">private</span> <span class="token class-name">Integer</span> code<span class="token punctuation">;</span>

    <span class="token keyword">private</span>  <span class="token class-name">String</span> message<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> code<span class="token punctuation">,</span> <span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>code <span class="token operator">=</span> code<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span> exceptionEnum<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>exceptionEnum<span class="token punctuation">.</span><span class="token function">getMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>code <span class="token operator">=</span> exceptionEnum<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> exceptionEnum<span class="token punctuation">.</span><span class="token function">getMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 业务异常枚举
 *
 * <span class="token keyword">@author</span> laizhuocheng
 * <span class="token keyword">@date</span> 2022/10/31
 */</span>
<span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">BusinessExceptionEnum</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 未知错误
     */</span>
    <span class="token function">UN_KNOW_ERROR</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"服务器开小差了~"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 失败
     */</span>
    <span class="token function">ERROR</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"失败"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 参数校验错误
     */</span>
    <span class="token function">PARAMETERS_ERROR</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token string">"参数校验错误"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 未查询到相关信息
     */</span>
    <span class="token function">NOT_FOUND</span><span class="token punctuation">(</span><span class="token number">50001</span><span class="token punctuation">,</span><span class="token string">"未查询到相关信息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>



    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> code<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> msg<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


