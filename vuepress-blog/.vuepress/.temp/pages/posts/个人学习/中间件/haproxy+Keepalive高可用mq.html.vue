<template><div><h2 id="安装haproxy" tabindex="-1"><a class="header-anchor" href="#安装haproxy" aria-hidden="true">#</a> 安装HAProxy</h2>
<p>安装参考文档：<a href='https://www.jianshu.com/p/b42ab4f39e95'>点击跳转</a></p>
<p>该文档使用的是编译的方式安装，期间出现了一些问题，所以使用下面配置文档中的yum一键安装的方式。</p>
<h2 id="配置负载均衡" tabindex="-1"><a class="header-anchor" href="#配置负载均衡" aria-hidden="true">#</a> 配置负载均衡</h2>
<p>参考文档：<a href='https://zhuanlan.zhihu.com/p/345479364'>点击跳转</a></p>
<p>在rabbitMQ的教程中已经配置好mq集群，两个节点分别是lzc、oldhu</p>
<p>直接安装haproxy</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> haproxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/haproxy/
<span class="token function">cp</span> haproxy.cfg haproxy.cfg.bak
<span class="token function">vim</span> haproxy.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Global settings</span>
<span class="token comment">#---------------------------------------------------------------------</span>
global
log <span class="token number">127.0</span>.0.1 local2
<span class="token function">chroot</span> /var/lib/haproxy <span class="token comment"># 改变当前工作目录</span>
pidfile /var/run/haproxy.pid <span class="token comment"># haproxy的pid存放路径,启动进程的用户必须有权限访问此文件</span>
maxconn <span class="token number">4000</span> <span class="token comment"># 最大连接数，默认4000</span>
user root <span class="token comment"># 默认用户</span>
group root <span class="token comment"># 默认组</span>
daemon <span class="token comment"># 创建1个进程进入deamon模式运行。此参数要求将运行模式设置为daemon</span>
stats socket /var/lib/haproxy/stats <span class="token comment"># 创建监控所用的套接字目录</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># defaults settings</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># 注意：因为要使用tcp的负载，屏蔽掉与http相关的默认配置</span>
defaults
mode http <span class="token comment"># 默认的模式mode { tcp|http|health }，tcp是4层，http是7层，health只会返回OK</span>
log global
<span class="token comment"># option httplog # 采用http日志格式</span>
option dontlognull <span class="token comment"># 启用该项，日志中将不会记录空连接。所谓空连接就是在上游的负载均衡器</span>
<span class="token comment"># option http-server-close # 每次请求完毕后主动关闭http通道</span>
<span class="token comment"># option forwardfor except 127.0.0.0/8 # 如果后端服务器需要获得客户端真实ip需要配置的参数，可以从Http Header中获得客户端ip</span>
option redispatch <span class="token comment"># serverId对应的服务器挂掉后,强制定向到其他健康的服务器</span>
retries <span class="token number">3</span> <span class="token comment"># 3次连接失败就认为服务不可用，也可以通过后面设置</span>
<span class="token comment"># timeout http-request 10s </span>
<span class="token function">timeout</span> queue 1m
<span class="token function">timeout</span> connect 10s <span class="token comment"># 连接超时时间</span>
<span class="token function">timeout</span> client 1m <span class="token comment"># 客户端连接超时时间</span>
<span class="token function">timeout</span> server 1m <span class="token comment"># 服务器端连接超时时间</span>
<span class="token comment"># timeout http-keep-alive 10s</span>
<span class="token function">timeout</span> check 10s
maxconn <span class="token number">3000</span> <span class="token comment"># 最大连接数</span>
<span class="token comment">###################### 打开haproxy的监测界面###############################</span>
listen status
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:9188
mode http
stats <span class="token builtin class-name">enable</span>
stats refresh 30s
stats uri /stats <span class="token comment">#设置haproxy监控地址为http://localhost:9188/stats</span>
stats auth admin:123456 <span class="token comment">#添加用户名密码认证</span>
stats realm <span class="token punctuation">(</span>Haproxy<span class="token punctuation">\</span> statistic<span class="token punctuation">)</span>
stats admin <span class="token keyword">if</span> TRUE
<span class="token comment">######################监听rabbitmq的web操作页面############################</span>
listen rabbitmq_admin
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:15670
server oldhu <span class="token number">120.76</span>.241.131:15672
server lzc www.iocaop.com:15672
<span class="token comment">#######################监听rabbimq_cluster #################################</span>
listen rabbitmq_cluster
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:5670
mode tcp
<span class="token comment">#负载均衡算法（#banlance roundrobin 轮询，balance source 保存session值，支持static-rr，leastconn，first，uri等参数）</span>
balance roundrobin

<span class="token comment">#check inter 2000 是检测心跳频率</span>
<span class="token comment">#rise 2是2次正确认为服务器可用</span>
<span class="token comment">#fall 2是2次失败认为服务器不可用</span>
server oldhu <span class="token number">120.76</span>.241.131:5672 check inter <span class="token number">5000</span> rise <span class="token number">2</span> fall <span class="token number">2</span>
server lzc www.iocaop.com:5672 check inter <span class="token number">5000</span> rise <span class="token number">2</span> fall <span class="token number">2</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209170246976.png" alt="image-20220917024650870"></p>
<h2 id="安装keepalived" tabindex="-1"><a class="header-anchor" href="#安装keepalived" aria-hidden="true">#</a> 安装Keepalived</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> keepalived
<span class="token builtin class-name">cd</span> /etc/keepalived
<span class="token function">cp</span> keepalived.conf keepalived.conf.bak
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> keepalived.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 主节点lzc</span>
global_defs <span class="token punctuation">{</span>
     router_id NodeA      <span class="token comment"># 起一个唯一的名字，不能与备机相同</span>
<span class="token punctuation">}</span>

vrrp_script chk_haproxy <span class="token punctuation">{</span>
    script <span class="token string">"/etc/keepalived/check_haproxy.sh"</span>
    interval <span class="token number">5</span>
    weight <span class="token number">2</span>
<span class="token punctuation">}</span>

vrrp_instance VI_1 <span class="token punctuation">{</span>
    state MASTER           <span class="token comment"># 这里标记为主</span>
    interface eth0      <span class="token comment"># 这里的必须和你的网卡一致，ipconfig获得</span>
    virtual_router_id <span class="token number">1</span>  <span class="token comment"># 这里表示路由的唯一标识与备机一致</span>
    priority <span class="token number">100</span>                 <span class="token comment"># 配置优先级</span>
    advert_int <span class="token number">1</span>
    authentication <span class="token punctuation">{</span>
        auth_type PASS
        auth_pass root  <span class="token comment"># 配置认证密码</span>
    <span class="token punctuation">}</span>
    virtual_ipaddress <span class="token punctuation">{</span> <span class="token comment"># 配置虚拟ip地址，就是开放的地址，与本机ip不同</span>
        www.iocaop.com
    <span class="token punctuation">}</span>

    track_script <span class="token punctuation">{</span>
        chk_haproxy
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 从节点oldhu
global_defs {
   router_id NodeB
}

vrrp_script chk_haproxy {
script "/etc/keepalived/check_haproxy.sh"
interval 5
weight 2
}

vrrp_instance VI_1 {
    state BACKUP   # 通过BACKUP表示该机器为备机
    interface eth0       # 与网卡一致，ipconfig获得
    virtual_router_id 1 # 与主机一致
    priority 50
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass root
    }  
    virtual_ipaddress { # 开放的虚拟地址
        120.76.241.131
    }

    track_script {
      chk_haproxy
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 编写脚本内容，自动重启HAProxy的服务，如果不成功则关闭Keepalived服务</span>
<span class="token function">vim</span> /etc/keepalived/check_haproxy.sh
<span class="token comment">#!/bin/bash</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-C</span> haproxy --no-header <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
haproxy <span class="token parameter variable">-f</span> /etc/haproxy/haproxy.cfg
<span class="token keyword">fi</span>
<span class="token function">sleep</span> <span class="token number">2</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-C</span> haproxy --no-header <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
<span class="token function">service</span> keepalived stop
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 启动</span>
<span class="token function">service</span> keepalived start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们关闭节点时，会收到通知：</p>
<p><img src="http://www.iocaop.com/images/2022-09/202209170250865.png" alt="image-20220917025040798"></p>
<p>其他资料：<a href='http://www.ha97.com/5646.html'>点击跳转</a></p>
</div></template>


