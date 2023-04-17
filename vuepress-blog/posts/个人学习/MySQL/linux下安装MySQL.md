---
title: linux下安装MySQL
date: 2022-09-23
category:
  - 数据库
  - MySQL
---

## 准备工作

卸载mariadb，mariadb是MySQL的另一个分支，要先卸载。

```bash
# 检测 mariadb 是否已安装
# 若已安装会看到：mariadb-libs-5.5.68-1.el7.x86_64 版本号可能有差异
rpm -qa|grep mariadb
# 卸载 mariadb
rpm -e --nodeps mariadb-libs-5.5.68-1.el7.x86_64
# 安装MySQL所需要的库
yum install -y libaio perl net-tools
```

![image-20220923074433419](http://www.iocaop.com/images/2022-09/202209230744471.png)

## 开始安装

上次压缩包到服务器。

```bash
# 进入 tar 包所在的目录
cd /opt

# 解压
tar -xvf mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar
# 安装
rpm -ivh mysql-community-common-5.7.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-5.7.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-5.7.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-server-5.7.28-1.el7.x86_64.rpm
# 查看版本
mysqladmin --version
```

![image-20220923090422568](http://www.iocaop.com/images/2022-09/202209230904666.png)

查看mysql用户：

![image-20220923090612472](http://www.iocaop.com/images/2022-09/202209230906511.png)

```bash
# 初始化 MySQL 服务
mysqld --initialize --user=mysql
# 查看初始化密码
cat /var/log/mysqld.log
```

![image-20220923090752006](http://www.iocaop.com/images/2022-09/202209230907089.png)

启动：

```bash
systemctl start mysqld.service
systemctl status mysqld.service
```



![image-20220923091023734](http://www.iocaop.com/images/2022-09/202209230910777.png)

## 修改密码及字符集设置

登录，修改密码：

```bash
mysql -u root -p
```

输入密码登录。

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '911823';
```

![image-20220923171304422](http://www.iocaop.com/images/2022-09/202209231713505.png)

重新登录后查看当前字符集：

```sql
show variables like "%char%";
```

![image-20220923171433499](http://www.iocaop.com/images/2022-09/202209231714564.png)

修改配置文件：

```bash
vim /etc/my.cnf
```

追加<span style="background-color:pink;">character_set_server=UTF8</span>

重启MySQL

```bash
systemctl restart mysqld.service
```

再次查看字符集：

![image-20220923171731450](http://www.iocaop.com/images/2022-09/202209231717502.png)

## 设置权限

登录MySQL，给root用户所有权限：

```sql
grant all privileges on *.* to root@'%' identified by '911823';
```

## 关闭防火墙

```bash
systemctl stop firewalld.service
systemctl disable firewalld.service
```

## 使用Navicat远程连接

![image-20220923172227929](http://www.iocaop.com/images/2022-09/202209231722977.png)