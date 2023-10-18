---
title: mallchat学习
date: 2023-10-19
category:
  - 项目学习
---

参考：<a href='https://github.com/zongzibinbin/MallChat'>点击跳转</a>，大部分代码复制mallchat实战文档

## 03-docker-compose搭建

#### 先装docker

yum设置阿里源

```shell
yum-config-manager --add-rep https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

装docker：

```shell
yum install -y docker-ce
```

启动：

```sh
systemctl enable docker.service
```

设置国内镜像：

```sh
vi  /etc/docker/daemon.json
```

添加：

```json
{
    "registry-mirrors": ["https://mirror.ccs.tencentyun.com"],
    "live-restore": true
}
```

重启检查是否生效

```sh
systemctl daemon-reload
service docker restart
docker info
```

![image-20231019064838934](http://www.iocaop.com/images/2023-10/202310190648966.png)

### 再装docker compose

```sh
curl -L https://github.com/docker/compose/releases/download/1.28.6/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

太慢了直接下载再上传到`/usr/local/bin`：<a href='https://github.com/docker/compose/releases/download/1.28.6/docker-compose-Linux-x86_64'>点击跳转</a>

> rz命令可以导入文件