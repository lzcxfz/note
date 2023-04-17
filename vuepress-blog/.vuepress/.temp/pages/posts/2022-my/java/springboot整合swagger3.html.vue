<template><div><p>创建好springboot项目以后，导入swagger依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.springfox<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>springfox-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类加注解:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableOpenApi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在启动，会报错，使用springboot2.6.0后，配置swagger，不论是2.9.2还是3.0.0都报错</p>
<p>需要在配置文件加入:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code> <span class="token key atrule">spring</span><span class="token punctuation">:</span> 
  <span class="token key atrule">mvc</span><span class="token punctuation">:</span>
    <span class="token key atrule">pathmatch</span><span class="token punctuation">:</span>
      <span class="token key atrule">matching-strategy</span><span class="token punctuation">:</span> ant_path_matcher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加入后，启动成功。可以进入swagger-ui项目下的/swagger-ui/index.html查看接口</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208222157451.png" alt="swagger页面"></p>
<p>稍微添加一下配置类:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * swagger3配置
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/22
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Swagger3Configuration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Docket</span> <span class="token function">docket</span><span class="token punctuation">(</span><span class="token class-name">Environment</span> environment<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        Profiles profiles = Profiles.of("dev", "test");</span>
<span class="token comment">//        // 判断是否处于自己设置的环境中</span>
<span class="token comment">//        boolean flag = environment.acceptsProfiles(profiles);</span>

        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Docket</span><span class="token punctuation">(</span><span class="token class-name">DocumentationType</span><span class="token punctuation">.</span><span class="token constant">SWAGGER_2</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">// 根据环境是否开启swagger</span>
            <span class="token punctuation">.</span><span class="token function">enable</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">groupName</span><span class="token punctuation">(</span><span class="token string">"rabbitmq"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment">//RequestHandlerSelectors配置要扫描接口的方式</span>
            <span class="token comment">//basePackage() 扫描指定路径下的包</span>
            <span class="token comment">//any() 扫描所有</span>
            <span class="token comment">//none() 都不扫描</span>
            <span class="token comment">//withClassAnnotation()扫描指定的注解</span>
            <span class="token comment">// GetMapping()扫描方法上的注解</span>
            <span class="token punctuation">.</span><span class="token function">apis</span><span class="token punctuation">(</span><span class="token class-name">RequestHandlerSelectors</span><span class="token punctuation">.</span><span class="token function">basePackage</span><span class="token punctuation">(</span><span class="token string">"com.lzc.rabbit.controller"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">//                过滤掉一些路径扫描</span>
<span class="token comment">//                .paths(PathSelectors.ant("/test/**"))</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 配置swagger信息apiInfo，作者信息
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">ApiInfo</span> <span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Contact</span> contact <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Contact</span><span class="token punctuation">(</span><span class="token string">"赖卓成"</span><span class="token punctuation">,</span> <span class="token string">"https://www.iocaop.com/"</span><span class="token punctuation">,</span> <span class="token string">"911823616@qq.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ApiInfo</span><span class="token punctuation">(</span><span class="token string">"swaggerApi文档测试"</span><span class="token punctuation">,</span>
            <span class="token string">"..."</span><span class="token punctuation">,</span>
            <span class="token string">"1.0"</span><span class="token punctuation">,</span>
            <span class="token string">"www.iocaop.com"</span><span class="token punctuation">,</span>
            contact<span class="token punctuation">,</span>
            <span class="token string">"Apache 2.0"</span><span class="token punctuation">,</span>
            <span class="token string">"http://localhost:8080/test/admin"</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写一个测试controller：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 测试控制器
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/08/22
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/test"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Api</span><span class="token punctuation">(</span>tags <span class="token operator">=</span> <span class="token string">"测试控制器"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"测试方法"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"test"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动即可看见效果:</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208222223085.png" alt="swagger界面"></p>
</div></template>


