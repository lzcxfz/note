<template><div><h1 id="redis安装说明" tabindex="-1"><a class="header-anchor" href="#redis安装说明" aria-hidden="true">#</a> Redis安装说明</h1>
<p>大多数企业都是基于Linux服务器来部署项目，而且Redis官方也没有提供Windows版本的安装包。因此课程中我们会基于Linux系统来安装Redis.</p>
<p>此处选择的Linux版本为CentOS 7.</p>
<p>Redis的官方网站地址：https://redis.io/</p>
<h1 id="_1-单机安装redis" tabindex="-1"><a class="header-anchor" href="#_1-单机安装redis" aria-hidden="true">#</a> 1.单机安装Redis</h1>
<h2 id="_1-1-安装redis依赖" tabindex="-1"><a class="header-anchor" href="#_1-1-安装redis依赖" aria-hidden="true">#</a> 1.1.安装Redis依赖</h2>
<p>Redis是基于C语言编写的，因此首先需要安装Redis所需要的gcc依赖：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> gcc tcl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_1-2-上传安装包并解压" tabindex="-1"><a class="header-anchor" href="#_1-2-上传安装包并解压" aria-hidden="true">#</a> 1.2.上传安装包并解压</h2>
<p>然后将课前资料提供的Redis安装包上传到虚拟机的任意目录：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182350117.png" alt="image-20211211071712536"></p>
<p>例如，我放到了/usr/local/src 目录：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182350062.png" alt="image-20211211080151539"></p>
<p>解压缩：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xzf</span> redis-6.2.6.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解压后：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182350861.png" alt="image-20211211080339076"></p>
<p>进入redis目录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> redis-6.2.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行编译命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有出错，应该就安装成功了。</p>
<p>默认的安装路径是在 <code v-pre>/usr/local/bin</code>目录下：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182350329.png" alt="image-20211211080603710"></p>
<p>该目录以及默认配置到环境变量，因此可以在任意目录下运行这些命令。其中：</p>
<ul>
<li>redis-cli：是redis提供的命令行客户端</li>
<li>redis-server：是redis的服务端启动脚本</li>
<li>redis-sentinel：是redis的哨兵启动脚本</li>
</ul>
<h2 id="_1-3-启动" tabindex="-1"><a class="header-anchor" href="#_1-3-启动" aria-hidden="true">#</a> 1.3.启动</h2>
<p>redis的启动方式有很多种，例如：</p>
<ul>
<li>默认启动</li>
<li>指定配置启动</li>
<li>开机自启</li>
</ul>
<h3 id="_1-3-1-默认启动" tabindex="-1"><a class="header-anchor" href="#_1-3-1-默认启动" aria-hidden="true">#</a> 1.3.1.默认启动</h3>
<p>安装完成后，在任意目录输入redis-server命令即可启动Redis：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>redis-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如图：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182350011.png" alt="image-20211211081716167"></p>
<p>这种启动属于<code v-pre>前台启动</code>，会阻塞整个会话窗口，窗口关闭或者按下<code v-pre>CTRL + C</code>则Redis停止。不推荐使用。</p>
<h3 id="_1-3-2-指定配置启动" tabindex="-1"><a class="header-anchor" href="#_1-3-2-指定配置启动" aria-hidden="true">#</a> 1.3.2.指定配置启动</h3>
<p>如果要让Redis以<code v-pre>后台</code>方式启动，则必须修改Redis配置文件，就在我们之前解压的redis安装包下（<code v-pre>/usr/local/src/redis-6.2.6</code>），名字叫redis.conf：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182350683.png" alt="image-20211211082225509"></p>
<p>我们先将这个配置文件备份一份：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cp redis.conf redis.conf.bck
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后修改redis.conf文件中的一些配置：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment"># 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0</span>
<span class="token key attr-name">bind</span> <span class="token value attr-value">0.0.0.0</span>
<span class="token comment"># 守护进程，修改为yes后即可后台运行</span>
<span class="token key attr-name">daemonize</span> <span class="token value attr-value">yes </span>
<span class="token comment"># 密码，设置后访问Redis必须输入密码</span>
<span class="token key attr-name">requirepass</span> <span class="token value attr-value">123321</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Redis的其它常见配置：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment"># 监听的端口</span>
<span class="token key attr-name">port</span> <span class="token value attr-value">6379</span>
<span class="token comment"># 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志、持久化等文件会保存在这个目录</span>
<span class="token key attr-name">dir</span> <span class="token value attr-value">.</span>
<span class="token comment"># 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15</span>
<span class="token key attr-name">databases</span> <span class="token value attr-value">1</span>
<span class="token comment"># 设置redis能够使用的最大内存</span>
<span class="token key attr-name">maxmemory</span> <span class="token value attr-value">512mb</span>
<span class="token comment"># 日志文件，默认为空，不记录日志，可以指定日志文件名</span>
<span class="token key attr-name">logfile</span> <span class="token value attr-value">"redis.log"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动Redis：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 进入redis安装目录 </span>
<span class="token builtin class-name">cd</span> /usr/local/src/redis-6.2.6
<span class="token comment"># 启动</span>
redis-server redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>停止服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 利用redis-cli来执行 shutdown 命令，即可停止 Redis 服务，</span>
<span class="token comment"># 因为之前配置了密码，因此需要通过 -u 来指定密码</span>
redis-cli <span class="token parameter variable">-u</span> <span class="token number">123321</span> <span class="token function">shutdown</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-3-开机自启" tabindex="-1"><a class="header-anchor" href="#_1-3-3-开机自启" aria-hidden="true">#</a> 1.3.3.开机自启</h3>
<p>我们也可以通过配置来实现开机自启。</p>
<p>首先，新建一个系统服务文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vi</span> /etc/systemd/system/redis.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>内容如下：</p>
<div class="language-conf ext-conf line-numbers-mode"><pre v-pre class="language-conf"><code>[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后重载系统服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们可以用下面这组命令来操作redis了：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 启动</span>
systemctl start redis
<span class="token comment"># 停止</span>
systemctl stop redis
<span class="token comment"># 重启</span>
systemctl restart redis
<span class="token comment"># 查看状态</span>
systemctl status redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行下面的命令，可以让redis开机自启：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="_2-redis客户端" tabindex="-1"><a class="header-anchor" href="#_2-redis客户端" aria-hidden="true">#</a> 2.Redis客户端</h1>
<p>安装完成Redis，我们就可以操作Redis，实现数据的CRUD了。这需要用到Redis客户端，包括：</p>
<ul>
<li>命令行客户端</li>
<li>图形化桌面客户端</li>
<li>编程客户端</li>
</ul>
<h2 id="_2-1-redis命令行客户端" tabindex="-1"><a class="header-anchor" href="#_2-1-redis命令行客户端" aria-hidden="true">#</a> 2.1.Redis命令行客户端</h2>
<p>Redis安装完成后就自带了命令行客户端：redis-cli，使用方式如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>redis-cli <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>commonds<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中常见的options有：</p>
<ul>
<li><code v-pre>-h 127.0.0.1</code>：指定要连接的redis节点的IP地址，默认是127.0.0.1</li>
<li><code v-pre>-p 6379</code>：指定要连接的redis节点的端口，默认是6379</li>
<li><code v-pre>-a 123321</code>：指定redis的访问密码</li>
</ul>
<p>其中的commonds就是Redis的操作命令，例如：</p>
<ul>
<li><code v-pre>ping</code>：与redis服务端做心跳测试，服务端正常会返回<code v-pre>pong</code></li>
</ul>
<p>不指定commond时，会进入<code v-pre>redis-cli</code>的交互控制台：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351240.png" alt="image-20211211110439353"></p>
<h2 id="_2-2-图形化桌面客户端" tabindex="-1"><a class="header-anchor" href="#_2-2-图形化桌面客户端" aria-hidden="true">#</a> 2.2.图形化桌面客户端</h2>
<p>GitHub上的大神编写了Redis的图形化桌面客户端，地址：https://github.com/uglide/RedisDesktopManager</p>
<p>不过该仓库提供的是RedisDesktopManager的源码，并未提供windows安装包。</p>
<p>在下面这个仓库可以找到安装包：https://github.com/lework/RedisDesktopManager-Windows/releases</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351792.png" alt="image-20211211111351885"></p>
<h3 id="_2-2-1-安装" tabindex="-1"><a class="header-anchor" href="#_2-2-1-安装" aria-hidden="true">#</a> 2.2.1.安装</h3>
<p>在课前资料中可以找到Redis的图形化桌面客户端：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351789.png" alt="image-20211214154938770"></p>
<p>解压缩后，运行安装程序即可安装：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351166.png" alt="image-20211214155123841"></p>
<p>此处略。</p>
<p>安装完成后，在安装目录下找到rdm.exe文件：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351390.png" alt="image-20211211110935819"></p>
<p>双击即可运行：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351819.png" alt="image-20211214155406692"></p>
<h3 id="_2-2-2-建立连接" tabindex="-1"><a class="header-anchor" href="#_2-2-2-建立连接" aria-hidden="true">#</a> 2.2.2.建立连接</h3>
<p>点击左上角的<code v-pre>连接到Redis服务器</code>按钮：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351163.png" alt="image-20211214155424842"></p>
<p>在弹出的窗口中填写Redis服务信息：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351278.png" alt="image-20211211111614483"></p>
<p>点击确定后，在左侧菜单会出现这个链接：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351349.png" alt="image-20211214155804523"></p>
<p>点击即可建立连接了：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208182351900.png" alt="image-20211214155849495"></p>
<p>Redis默认有16个仓库，编号从0至15.  通过配置文件可以设置仓库数量，但是不超过16，并且不能自定义仓库名称。</p>
<p>如果是基于redis-cli连接Redis服务，可以通过select命令来选择数据库：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 选择 0号库</span>
<span class="token keyword">select</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


