---
title: mallchat学习
date: 2023-10-19
category:
  - 项目学习
---

参考：<a href='https://github.com/zongzibinbin/MallChat'>点击跳转</a>，大部分代码复制mallchat实战文档

## 03-docker-compose搭建

### 先装docker

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

## 04-部署mysql

创建挂载目录：

```sh
mkdir -p /data/mysql/data;
mkdir -p /data/mysql/conf;
```

在挂载目录`/data/mysql/`下创建docker-compose.yml

```yml
version: '3'
services:
  mysql:
    image: mysql:5.7 #mysql版本
    container_name: mysql
    volumes:
    # 宿主机目录：容器目录
      - /data/mysql/data:/var/lib/mysql
      - /data/mysql/conf/my.cnf:/etc/mysql/mysql.conf.d/mysqld.cnf
    restart: always
    ports:
    # 宿主机端口号：容器端口号
      - 3307:3306
    environment:
      MYSQL_ROOT_PASSWORD: 123456 #root用户密码
      TZ: Asia/Shanghai
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

在挂载目录`/data/mysql/conf`下创建`my.cnf`配置文件：

```bash
[mysqld]
default-storage-engine=INNODB  # 创建新表时将使用的默认存储引擎
character-set-server=utf8mb4      # 设置mysql服务端默认字符集
pid-file        = /var/run/mysqld/mysqld.pid  # pid文件所在目录
socket          = /var/run/mysqld/mysqld.sock # 用于本地连接的socket套接字
datadir         = /var/lib/mysql              # 数据文件存放的目录
symbolic-links=0
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION # 定义mysql应该支持的sql语法，数据校验等!

# 允许最大连接数
max_connections=200


# 同一局域网内注意要唯一
server-id=3306
# 开启二进制日志功能 & 日志位置存放位置`/var/lib/mysql`
#log-bin=mysql-bin
log-bin=/var/lib/mysql/mysql-bin
# binlog格式
# 1. STATEMENT：基于SQL语句的模式，binlog 数据量小，但是某些语句和函数在复制过程可能导致数据不一致甚至出错；
# 2. MIXED：混合模式，根据语句来选用是 STATEMENT 还是 ROW 模式；
# 3. ROW：基于行的模式，记录的是行的完整变化。安全，但 binlog 会比其他两种模式大很多；
binlog_format=ROW
# FULL：binlog记录每一行的完整变更 MINIMAL：只记录影响后的行
binlog_row_image=FULL
# 日志文件大小
max_binlog_size=100M
# 定义清除过期日志的时间(这里设置为7天)
expire_logs_days=7

# ================= ↑↑↑ mysql主从同步配置end ↑↑↑ =================

[mysql]
default-character-set=utf8mb4

[client]
default-character-set=utf8mb4  # 设置mysql客户端默认字符集
```

在`docker-compose.yml`所在目录下执行：

```bash
docker-compose up -d
```

遇到问题：

![image-20231019071434687](http://www.iocaop.com/images/2023-10/202310190714713.png)

修改`docker-compose.yml`中的容器名称`container_name`即可

![image-20231019071610252](http://www.iocaop.com/images/2023-10/202310190716283.png)

尝试连接：

![image-20231019071743529](http://www.iocaop.com/images/2023-10/202310190717557.png)

## 05-部署redis

