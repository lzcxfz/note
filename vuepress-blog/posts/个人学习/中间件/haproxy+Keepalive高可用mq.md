---
title: haproxy+Keepalive高可用mq
date: 2022-09-17
order: 1
category:
  - 负载均衡
  - RabbitMQ
---

## 安装HAProxy

安装参考文档：<a href='https://www.jianshu.com/p/b42ab4f39e95'>点击跳转</a>

该文档使用的是编译的方式安装，期间出现了一些问题，所以使用下面配置文档中的yum一键安装的方式。

## 配置负载均衡

参考文档：<a href='https://zhuanlan.zhihu.com/p/345479364'>点击跳转</a>

在rabbitMQ的教程中已经配置好mq集群，两个节点分别是lzc、oldhu

直接安装haproxy

```bash
yum install -y haproxy
```

```bash
cd /etc/haproxy/
cp haproxy.cfg haproxy.cfg.bak
vim haproxy.cfg
```

```bash
#---------------------------------------------------------------------
# Global settings
#---------------------------------------------------------------------
global
log 127.0.0.1 local2
chroot /var/lib/haproxy # 改变当前工作目录
pidfile /var/run/haproxy.pid # haproxy的pid存放路径,启动进程的用户必须有权限访问此文件
maxconn 4000 # 最大连接数，默认4000
user root # 默认用户
group root # 默认组
daemon # 创建1个进程进入deamon模式运行。此参数要求将运行模式设置为daemon
stats socket /var/lib/haproxy/stats # 创建监控所用的套接字目录
#---------------------------------------------------------------------
# defaults settings
#---------------------------------------------------------------------
# 注意：因为要使用tcp的负载，屏蔽掉与http相关的默认配置
defaults
mode http # 默认的模式mode { tcp|http|health }，tcp是4层，http是7层，health只会返回OK
log global
# option httplog # 采用http日志格式
option dontlognull # 启用该项，日志中将不会记录空连接。所谓空连接就是在上游的负载均衡器
# option http-server-close # 每次请求完毕后主动关闭http通道
# option forwardfor except 127.0.0.0/8 # 如果后端服务器需要获得客户端真实ip需要配置的参数，可以从Http Header中获得客户端ip
option redispatch # serverId对应的服务器挂掉后,强制定向到其他健康的服务器
retries 3 # 3次连接失败就认为服务不可用，也可以通过后面设置
# timeout http-request 10s 
timeout queue 1m
timeout connect 10s # 连接超时时间
timeout client 1m # 客户端连接超时时间
timeout server 1m # 服务器端连接超时时间
# timeout http-keep-alive 10s
timeout check 10s
maxconn 3000 # 最大连接数
###################### 打开haproxy的监测界面###############################
listen status
bind 0.0.0.0:9188
mode http
stats enable
stats refresh 30s
stats uri /stats #设置haproxy监控地址为http://localhost:9188/stats
stats auth admin:123456 #添加用户名密码认证
stats realm (Haproxy\ statistic)
stats admin if TRUE
######################监听rabbitmq的web操作页面############################
listen rabbitmq_admin
bind 0.0.0.0:15670
server oldhu 120.76.241.131:15672
server lzc www.iocaop.com:15672
#######################监听rabbimq_cluster #################################
listen rabbitmq_cluster
bind 0.0.0.0:5670
mode tcp
#负载均衡算法（#banlance roundrobin 轮询，balance source 保存session值，支持static-rr，leastconn，first，uri等参数）
balance roundrobin

#check inter 2000 是检测心跳频率
#rise 2是2次正确认为服务器可用
#fall 2是2次失败认为服务器不可用
server oldhu 120.76.241.131:5672 check inter 5000 rise 2 fall 2
server lzc www.iocaop.com:5672 check inter 5000 rise 2 fall 2

```

![image-20220917024650870](http://www.iocaop.com/images/2022-09/202209170246976.png)

## 安装Keepalived

```bash
yum install -y keepalived
cd /etc/keepalived
cp keepalived.conf keepalived.conf.bak
```

```sh
vim keepalived.conf
```

```bash
# 主节点lzc
global_defs {
     router_id NodeA      # 起一个唯一的名字，不能与备机相同
}

vrrp_script chk_haproxy {
    script "/etc/keepalived/check_haproxy.sh"
    interval 5
    weight 2
}

vrrp_instance VI_1 {
    state MASTER           # 这里标记为主
    interface eth0      # 这里的必须和你的网卡一致，ipconfig获得
    virtual_router_id 1  # 这里表示路由的唯一标识与备机一致
    priority 100                 # 配置优先级
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass root  # 配置认证密码
    }
    virtual_ipaddress { # 配置虚拟ip地址，就是开放的地址，与本机ip不同
        www.iocaop.com
    }

    track_script {
        chk_haproxy
    }
}
```

```
# 从节点oldhu
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
```

```bash
# 编写脚本内容，自动重启HAProxy的服务，如果不成功则关闭Keepalived服务
vim /etc/keepalived/check_haproxy.sh
#!/bin/bash
if [ $(ps -C haproxy --no-header | wc -l) -eq 0 ];then
haproxy -f /etc/haproxy/haproxy.cfg
fi
sleep 2
if [ $(ps -C haproxy --no-header | wc -l) -eq 0 ];then
service keepalived stop
fi
```

```bash
# 启动
service keepalived start
```

当我们关闭节点时，会收到通知：

![image-20220917025040798](http://www.iocaop.com/images/2022-09/202209170250865.png)

其他资料：<a href='http://www.ha97.com/5646.html'>点击跳转</a>