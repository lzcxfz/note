<template><div><ul>
<li>docker的redis多实例：</li>
</ul>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>docker run -p 6378:6379 -d redis redis-server --appendonly yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>v2-ui</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-Ls</span> https://raw.githubusercontent.com/vaxilu/x-ui/master/install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>阿里云oss：</li>
</ul>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">AccessKeyId</span><span class="token punctuation">=</span><span class="token value attr-value">LTAI5tGbtWFPkUbaN65DPPdh</span>
<span class="token key attr-name">AccessKeySecret</span><span class="token punctuation">=</span><span class="token value attr-value">R5aYDBDQc04AcYRQ4eOjtGOXnYrBq2</span>
<span class="token key attr-name">aliyun.oss.bucketName</span><span class="token punctuation">=</span><span class="token value attr-value">srb-file-lzc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>maven打包插件：</li>
</ul>
<p>插件版本要和springboot一致</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.1.6.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">></span></span>repackage<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>linux黑洞</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> hfb-1.0.0.jar <span class="token operator">></span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>Windows查看端口占用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-ano</span> <span class="token operator">|</span> findstr <span class="token number">8060</span> 其中8060是我服务的端口号
taskkill /pid <span class="token number">4344</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-f</span> 终止进程
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>OPENSSL:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--global</span> http.proxy <span class="token number">127.0</span>.0.1:37062
<span class="token function">git</span> config <span class="token parameter variable">--global</span> https.proxy <span class="token number">127.0</span>.0.1:37062
再
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> http.proxy
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> https.proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查ip的api</p>
<div class="language-txt ext-txt line-numbers-mode"><pre v-pre class="language-txt"><code>http://api.k780.com/?app=ip.local&amp;appkey=10003&amp;sign=b59bc3ef6191eb9f747dd4e83c99f2a4&amp;format=json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>docker安装nacos</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull nacos/nacos-server
<span class="token function">docker</span> run <span class="token parameter variable">--env</span> <span class="token assign-left variable">MODE</span><span class="token operator">=</span>standalone <span class="token parameter variable">--name</span> nacos <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8848</span>:8848 nacos/nacos-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>docker安装redis</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull redis:latest
<span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">--name</span> redis-test <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 redis
config <span class="token builtin class-name">set</span> requirepass <span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>docker安装zipkin</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull openzipkin/zipkin
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--restart</span> always <span class="token parameter variable">-p</span> <span class="token number">9411</span>:9411 <span class="token parameter variable">--name</span> zipkin openzipkin/zipkin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>docker安装sentinel</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull bladex/sentinel-dashboard:1.7.1
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> sentinel <span class="token parameter variable">-d</span>  <span class="token parameter variable">-p</span> <span class="token number">8858</span>:8858  bladex/sentinel-dashboard:1.7.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>docker安装mysql</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull mysql:5.7
<span class="token function">sudo</span> <span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">--name</span> mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root <span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>docker安装SQLserver</p>
<p><a href = 'https://learn.microsoft.com/zh-cn/sql/linux/quickstart-install-connect-docker?view=sql-server-linux-ver15&preserve-view=true&pivots=cs1-bash'>点击跳转</a></p>
<p><a href = 'https://blog.51cto.com/YangPC/5579240'>点击跳转</a></p>
<p>如果跑不起来，把密码设置复杂点，不行再查日志看原因</p>
</li>
<li>
<p>原生安装SQLserver</p>
<p><a href = 'https://cloud.tencent.com/developer/article/1911796'>点击跳转</a></p>
</li>
</ul>
</div></template>


