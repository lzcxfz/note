import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,b as e}from"./app.4c83cca6.js";const i={},l=e(`<h2 id="\u5B89\u88C5haproxy" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5haproxy" aria-hidden="true">#</a> \u5B89\u88C5HAProxy</h2><p>\u5B89\u88C5\u53C2\u8003\u6587\u6863\uFF1A<a href="https://www.jianshu.com/p/b42ab4f39e95">\u70B9\u51FB\u8DF3\u8F6C</a></p><p>\u8BE5\u6587\u6863\u4F7F\u7528\u7684\u662F\u7F16\u8BD1\u7684\u65B9\u5F0F\u5B89\u88C5\uFF0C\u671F\u95F4\u51FA\u73B0\u4E86\u4E00\u4E9B\u95EE\u9898\uFF0C\u6240\u4EE5\u4F7F\u7528\u4E0B\u9762\u914D\u7F6E\u6587\u6863\u4E2D\u7684yum\u4E00\u952E\u5B89\u88C5\u7684\u65B9\u5F0F\u3002</p><h2 id="\u914D\u7F6E\u8D1F\u8F7D\u5747\u8861" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u8D1F\u8F7D\u5747\u8861" aria-hidden="true">#</a> \u914D\u7F6E\u8D1F\u8F7D\u5747\u8861</h2><p>\u53C2\u8003\u6587\u6863\uFF1A<a href="https://zhuanlan.zhihu.com/p/345479364">\u70B9\u51FB\u8DF3\u8F6C</a></p><p>\u5728rabbitMQ\u7684\u6559\u7A0B\u4E2D\u5DF2\u7ECF\u914D\u7F6E\u597Dmq\u96C6\u7FA4\uFF0C\u4E24\u4E2A\u8282\u70B9\u5206\u522B\u662Flzc\u3001oldhu</p><p>\u76F4\u63A5\u5B89\u88C5haproxy</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> haproxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/haproxy/
<span class="token function">cp</span> haproxy.cfg haproxy.cfg.bak
<span class="token function">vim</span> haproxy.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Global settings</span>
<span class="token comment">#---------------------------------------------------------------------</span>
global
log <span class="token number">127.0</span>.0.1 local2
<span class="token function">chroot</span> /var/lib/haproxy <span class="token comment"># \u6539\u53D8\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55</span>
pidfile /var/run/haproxy.pid <span class="token comment"># haproxy\u7684pid\u5B58\u653E\u8DEF\u5F84,\u542F\u52A8\u8FDB\u7A0B\u7684\u7528\u6237\u5FC5\u987B\u6709\u6743\u9650\u8BBF\u95EE\u6B64\u6587\u4EF6</span>
maxconn <span class="token number">4000</span> <span class="token comment"># \u6700\u5927\u8FDE\u63A5\u6570\uFF0C\u9ED8\u8BA44000</span>
user root <span class="token comment"># \u9ED8\u8BA4\u7528\u6237</span>
group root <span class="token comment"># \u9ED8\u8BA4\u7EC4</span>
daemon <span class="token comment"># \u521B\u5EFA1\u4E2A\u8FDB\u7A0B\u8FDB\u5165deamon\u6A21\u5F0F\u8FD0\u884C\u3002\u6B64\u53C2\u6570\u8981\u6C42\u5C06\u8FD0\u884C\u6A21\u5F0F\u8BBE\u7F6E\u4E3Adaemon</span>
stats socket /var/lib/haproxy/stats <span class="token comment"># \u521B\u5EFA\u76D1\u63A7\u6240\u7528\u7684\u5957\u63A5\u5B57\u76EE\u5F55</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># defaults settings</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># \u6CE8\u610F\uFF1A\u56E0\u4E3A\u8981\u4F7F\u7528tcp\u7684\u8D1F\u8F7D\uFF0C\u5C4F\u853D\u6389\u4E0Ehttp\u76F8\u5173\u7684\u9ED8\u8BA4\u914D\u7F6E</span>
defaults
mode http <span class="token comment"># \u9ED8\u8BA4\u7684\u6A21\u5F0Fmode { tcp|http|health }\uFF0Ctcp\u662F4\u5C42\uFF0Chttp\u662F7\u5C42\uFF0Chealth\u53EA\u4F1A\u8FD4\u56DEOK</span>
log global
<span class="token comment"># option httplog # \u91C7\u7528http\u65E5\u5FD7\u683C\u5F0F</span>
option dontlognull <span class="token comment"># \u542F\u7528\u8BE5\u9879\uFF0C\u65E5\u5FD7\u4E2D\u5C06\u4E0D\u4F1A\u8BB0\u5F55\u7A7A\u8FDE\u63A5\u3002\u6240\u8C13\u7A7A\u8FDE\u63A5\u5C31\u662F\u5728\u4E0A\u6E38\u7684\u8D1F\u8F7D\u5747\u8861\u5668</span>
<span class="token comment"># option http-server-close # \u6BCF\u6B21\u8BF7\u6C42\u5B8C\u6BD5\u540E\u4E3B\u52A8\u5173\u95EDhttp\u901A\u9053</span>
<span class="token comment"># option forwardfor except 127.0.0.0/8 # \u5982\u679C\u540E\u7AEF\u670D\u52A1\u5668\u9700\u8981\u83B7\u5F97\u5BA2\u6237\u7AEF\u771F\u5B9Eip\u9700\u8981\u914D\u7F6E\u7684\u53C2\u6570\uFF0C\u53EF\u4EE5\u4ECEHttp Header\u4E2D\u83B7\u5F97\u5BA2\u6237\u7AEFip</span>
option redispatch <span class="token comment"># serverId\u5BF9\u5E94\u7684\u670D\u52A1\u5668\u6302\u6389\u540E,\u5F3A\u5236\u5B9A\u5411\u5230\u5176\u4ED6\u5065\u5EB7\u7684\u670D\u52A1\u5668</span>
retries <span class="token number">3</span> <span class="token comment"># 3\u6B21\u8FDE\u63A5\u5931\u8D25\u5C31\u8BA4\u4E3A\u670D\u52A1\u4E0D\u53EF\u7528\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7\u540E\u9762\u8BBE\u7F6E</span>
<span class="token comment"># timeout http-request 10s </span>
<span class="token function">timeout</span> queue 1m
<span class="token function">timeout</span> connect 10s <span class="token comment"># \u8FDE\u63A5\u8D85\u65F6\u65F6\u95F4</span>
<span class="token function">timeout</span> client 1m <span class="token comment"># \u5BA2\u6237\u7AEF\u8FDE\u63A5\u8D85\u65F6\u65F6\u95F4</span>
<span class="token function">timeout</span> server 1m <span class="token comment"># \u670D\u52A1\u5668\u7AEF\u8FDE\u63A5\u8D85\u65F6\u65F6\u95F4</span>
<span class="token comment"># timeout http-keep-alive 10s</span>
<span class="token function">timeout</span> check 10s
maxconn <span class="token number">3000</span> <span class="token comment"># \u6700\u5927\u8FDE\u63A5\u6570</span>
<span class="token comment">###################### \u6253\u5F00haproxy\u7684\u76D1\u6D4B\u754C\u9762###############################</span>
listen status
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:9188
mode http
stats <span class="token builtin class-name">enable</span>
stats refresh 30s
stats uri /stats <span class="token comment">#\u8BBE\u7F6Ehaproxy\u76D1\u63A7\u5730\u5740\u4E3Ahttp://localhost:9188/stats</span>
stats auth admin:123456 <span class="token comment">#\u6DFB\u52A0\u7528\u6237\u540D\u5BC6\u7801\u8BA4\u8BC1</span>
stats realm <span class="token punctuation">(</span>Haproxy<span class="token punctuation">\\</span> statistic<span class="token punctuation">)</span>
stats admin <span class="token keyword">if</span> TRUE
<span class="token comment">######################\u76D1\u542Crabbitmq\u7684web\u64CD\u4F5C\u9875\u9762############################</span>
listen rabbitmq_admin
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:15670
server oldhu <span class="token number">120.76</span>.241.131:15672
server lzc www.iocaop.com:15672
<span class="token comment">#######################\u76D1\u542Crabbimq_cluster #################################</span>
listen rabbitmq_cluster
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:5670
mode tcp
<span class="token comment">#\u8D1F\u8F7D\u5747\u8861\u7B97\u6CD5\uFF08#banlance roundrobin \u8F6E\u8BE2\uFF0Cbalance source \u4FDD\u5B58session\u503C\uFF0C\u652F\u6301static-rr\uFF0Cleastconn\uFF0Cfirst\uFF0Curi\u7B49\u53C2\u6570\uFF09</span>
balance roundrobin

<span class="token comment">#check inter 2000 \u662F\u68C0\u6D4B\u5FC3\u8DF3\u9891\u7387</span>
<span class="token comment">#rise 2\u662F2\u6B21\u6B63\u786E\u8BA4\u4E3A\u670D\u52A1\u5668\u53EF\u7528</span>
<span class="token comment">#fall 2\u662F2\u6B21\u5931\u8D25\u8BA4\u4E3A\u670D\u52A1\u5668\u4E0D\u53EF\u7528</span>
server oldhu <span class="token number">120.76</span>.241.131:5672 check inter <span class="token number">5000</span> rise <span class="token number">2</span> fall <span class="token number">2</span>
server lzc www.iocaop.com:5672 check inter <span class="token number">5000</span> rise <span class="token number">2</span> fall <span class="token number">2</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-09/202209170246976.png" alt="image-20220917024650870"></p><h2 id="\u5B89\u88C5keepalived" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5keepalived" aria-hidden="true">#</a> \u5B89\u88C5Keepalived</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> keepalived
<span class="token builtin class-name">cd</span> /etc/keepalived
<span class="token function">cp</span> keepalived.conf keepalived.conf.bak
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vim</span> keepalived.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4E3B\u8282\u70B9lzc</span>
global_defs <span class="token punctuation">{</span>
     router_id NodeA      <span class="token comment"># \u8D77\u4E00\u4E2A\u552F\u4E00\u7684\u540D\u5B57\uFF0C\u4E0D\u80FD\u4E0E\u5907\u673A\u76F8\u540C</span>
<span class="token punctuation">}</span>

vrrp_script chk_haproxy <span class="token punctuation">{</span>
    script <span class="token string">&quot;/etc/keepalived/check_haproxy.sh&quot;</span>
    interval <span class="token number">5</span>
    weight <span class="token number">2</span>
<span class="token punctuation">}</span>

vrrp_instance VI_1 <span class="token punctuation">{</span>
    state MASTER           <span class="token comment"># \u8FD9\u91CC\u6807\u8BB0\u4E3A\u4E3B</span>
    interface eth0      <span class="token comment"># \u8FD9\u91CC\u7684\u5FC5\u987B\u548C\u4F60\u7684\u7F51\u5361\u4E00\u81F4\uFF0Cipconfig\u83B7\u5F97</span>
    virtual_router_id <span class="token number">1</span>  <span class="token comment"># \u8FD9\u91CC\u8868\u793A\u8DEF\u7531\u7684\u552F\u4E00\u6807\u8BC6\u4E0E\u5907\u673A\u4E00\u81F4</span>
    priority <span class="token number">100</span>                 <span class="token comment"># \u914D\u7F6E\u4F18\u5148\u7EA7</span>
    advert_int <span class="token number">1</span>
    authentication <span class="token punctuation">{</span>
        auth_type PASS
        auth_pass root  <span class="token comment"># \u914D\u7F6E\u8BA4\u8BC1\u5BC6\u7801</span>
    <span class="token punctuation">}</span>
    virtual_ipaddress <span class="token punctuation">{</span> <span class="token comment"># \u914D\u7F6E\u865A\u62DFip\u5730\u5740\uFF0C\u5C31\u662F\u5F00\u653E\u7684\u5730\u5740\uFF0C\u4E0E\u672C\u673Aip\u4E0D\u540C</span>
        www.iocaop.com
    <span class="token punctuation">}</span>

    track_script <span class="token punctuation">{</span>
        chk_haproxy
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># \u4ECE\u8282\u70B9oldhu
global_defs {
   router_id NodeB
}

vrrp_script chk_haproxy {
script &quot;/etc/keepalived/check_haproxy.sh&quot;
interval 5
weight 2
}

vrrp_instance VI_1 {
    state BACKUP   # \u901A\u8FC7BACKUP\u8868\u793A\u8BE5\u673A\u5668\u4E3A\u5907\u673A
    interface eth0       # \u4E0E\u7F51\u5361\u4E00\u81F4\uFF0Cipconfig\u83B7\u5F97
    virtual_router_id 1 # \u4E0E\u4E3B\u673A\u4E00\u81F4
    priority 50
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass root
    }  
    virtual_ipaddress { # \u5F00\u653E\u7684\u865A\u62DF\u5730\u5740
        120.76.241.131
    }

    track_script {
      chk_haproxy
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u7F16\u5199\u811A\u672C\u5185\u5BB9\uFF0C\u81EA\u52A8\u91CD\u542FHAProxy\u7684\u670D\u52A1\uFF0C\u5982\u679C\u4E0D\u6210\u529F\u5219\u5173\u95EDKeepalived\u670D\u52A1</span>
<span class="token function">vim</span> /etc/keepalived/check_haproxy.sh
<span class="token comment">#!/bin/bash</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-C</span> haproxy --no-header <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
haproxy <span class="token parameter variable">-f</span> /etc/haproxy/haproxy.cfg
<span class="token keyword">fi</span>
<span class="token function">sleep</span> <span class="token number">2</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-C</span> haproxy --no-header <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
<span class="token function">service</span> keepalived stop
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8</span>
<span class="token function">service</span> keepalived start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u6211\u4EEC\u5173\u95ED\u8282\u70B9\u65F6\uFF0C\u4F1A\u6536\u5230\u901A\u77E5\uFF1A</p><p><img src="http://www.iocaop.com/images/2022-09/202209170250865.png" alt="image-20220917025040798"></p><p>\u5176\u4ED6\u8D44\u6599\uFF1A<a href="http://www.ha97.com/5646.html">\u70B9\u51FB\u8DF3\u8F6C</a></p>`,21),c=[l];function t(p,d){return s(),a("div",null,c)}const v=n(i,[["render",t],["__file","haproxy+Keepalive\u9AD8\u53EF\u7528mq.html.vue"]]);export{v as default};
