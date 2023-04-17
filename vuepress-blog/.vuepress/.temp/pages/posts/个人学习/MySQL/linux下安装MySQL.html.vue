<template><div><h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2>
<p>卸载mariadb，mariadb是MySQL的另一个分支，要先卸载。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 检测 mariadb 是否已安装</span>
<span class="token comment"># 若已安装会看到：mariadb-libs-5.5.68-1.el7.x86_64 版本号可能有差异</span>
<span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> mariadb
<span class="token comment"># 卸载 mariadb</span>
<span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">--nodeps</span> mariadb-libs-5.5.68-1.el7.x86_64
<span class="token comment"># 安装MySQL所需要的库</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> libaio perl net-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209230744471.png" alt="image-20220923074433419"></p>
<h2 id="开始安装" tabindex="-1"><a class="header-anchor" href="#开始安装" aria-hidden="true">#</a> 开始安装</h2>
<p>上次压缩包到服务器。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 进入 tar 包所在的目录</span>
<span class="token builtin class-name">cd</span> /opt

<span class="token comment"># 解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar
<span class="token comment"># 安装</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-common-5.7.28-1.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-libs-5.7.28-1.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-client-5.7.28-1.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-server-5.7.28-1.el7.x86_64.rpm
<span class="token comment"># 查看版本</span>
mysqladmin <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209230904666.png" alt="image-20220923090422568"></p>
<p>查看mysql用户：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209230906511.png" alt="image-20220923090612472"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 初始化 MySQL 服务</span>
mysqld <span class="token parameter variable">--initialize</span> <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql
<span class="token comment"># 查看初始化密码</span>
<span class="token function">cat</span> /var/log/mysqld.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209230907089.png" alt="image-20220923090752006"></p>
<p>启动：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start mysqld.service
systemctl status mysqld.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209230910777.png" alt="image-20220923091023734"></p>
<h2 id="修改密码及字符集设置" tabindex="-1"><a class="header-anchor" href="#修改密码及字符集设置" aria-hidden="true">#</a> 修改密码及字符集设置</h2>
<p>登录，修改密码：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入密码登录。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">USER</span> <span class="token string">'root'</span><span class="token variable">@'localhost'</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">'911823'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209231713505.png" alt="image-20220923171304422"></p>
<p>重新登录后查看当前字符集：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">"%char%"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209231714564.png" alt="image-20220923171433499"></p>
<p>修改配置文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>追加<span style="background-color:pink;">character_set_server=UTF8</span></p>
<p>重启MySQL</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart mysqld.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再次查看字符集：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209231717502.png" alt="image-20220923171731450"></p>
<h2 id="设置权限" tabindex="-1"><a class="header-anchor" href="#设置权限" aria-hidden="true">#</a> 设置权限</h2>
<p>登录MySQL，给root用户所有权限：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">grant</span> <span class="token keyword">all</span> <span class="token keyword">privileges</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> root<span class="token variable">@'%'</span> identified <span class="token keyword">by</span> <span class="token string">'911823'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="关闭防火墙" tabindex="-1"><a class="header-anchor" href="#关闭防火墙" aria-hidden="true">#</a> 关闭防火墙</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl stop firewalld.service
systemctl disable firewalld.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用navicat远程连接" tabindex="-1"><a class="header-anchor" href="#使用navicat远程连接" aria-hidden="true">#</a> 使用Navicat远程连接</h2>
<p><img src="http://www.iocaop.com/images/2022-09/202209231722977.png" alt="image-20220923172227929"></p>
</div></template>


