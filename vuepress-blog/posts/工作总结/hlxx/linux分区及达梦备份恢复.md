---
title: 麒麟系统卷组损坏修复及达梦数据库安装、备份还原
date: 2024-09-17
category:
- 运维
---

### lvm操作

物理磁盘分区：

![image-20240915140242134](http://www.iocaop.com/images/2024-09/202409151402213.png)

创建vg：

```bash
sudo vgcreate db_data_group /dev/vdb1
```

![image-20240915140428980](http://www.iocaop.com/images/2024-09/202409151404014.png)

创建lv：

```bash
lvcreate -n lv0 -l +100%free /dev/db_data_group
```

![image-20240915140820907](http://www.iocaop.com/images/2024-09/202409151408947.png)

格式化lv：

```bash
mkfs.xfs /dev/db_data_group/lv0 
```

![image-20240915141110490](http://www.iocaop.com/images/2024-09/202409151411544.png)

挂载：

![image-20240915141138452](http://www.iocaop.com/images/2024-09/202409151411496.png)

scp远程拷贝：<a href='https://blog.csdn.net/qq_14910065/article/details/133781645'>点击跳转</a>

```java 
scp -r lzc@10.224.207.166:/dmdata/dmdb/bak /
```

![image-20240915141725574](http://www.iocaop.com/images/2024-09/202409151417632.png)

### 达梦卸载

达梦卸载：

先停止、删除实例

到达梦bin目录下查看之前创建的服务，检查状态，如果在运行中，则停止。

![image-20240916195817324](http://www.iocaop.com/images/2024-09/202409161958385.png)

再到脚本目录，运行脚本，指定实例名称，删除实例：

![image-20240916195951137](http://www.iocaop.com/images/2024-09/202409161959187.png)



然后卸载数据库：

![image-20240916200216612](http://www.iocaop.com/images/2024-09/202409162002667.png)

删除原来的安装目录：

![image-20240916200307209](http://www.iocaop.com/images/2024-09/202409162003233.png)

### 达梦安装

重新安装：

使用scp命令拷贝安装包到这台服务器(166)：

先到165建一个用户：

![image-20240916200651020](http://www.iocaop.com/images/2024-09/202409162006053.png)

把安装包拷过来

![image-20240916200844284](http://www.iocaop.com/images/2024-09/202409162008324.png)

解压：

![image-20240916200930647](http://www.iocaop.com/images/2024-09/202409162009691.png)

挂载安装包：

![image-20240916201033549](http://www.iocaop.com/images/2024-09/202409162010576.png)

创建用户组，用于给dmdba用户安装达梦（达梦不允许root用户安装，如果没有dmdba就创建一个用户）：

![image-20240916201206300](http://www.iocaop.com/images/2024-09/202409162012335.png)

这里已经创建，则将用户加入到用户组：

![image-20240916201311864](http://www.iocaop.com/images/2024-09/202409162013885.png)

创建一个文件夹，用来存达梦数据：

![image-20240916201451865](http://www.iocaop.com/images/2024-09/202409162014902.png)

给权限：

![image-20240916201537910](http://www.iocaop.com/images/2024-09/202409162015944.png)

检查更改安装用户ulimit的资源限制：

![image-20240916201648702](http://www.iocaop.com/images/2024-09/202409162016745.png)

切换达梦用户，进行安装：

![image-20240916201825659](http://www.iocaop.com/images/2024-09/202409162018692.png)

![image-20240916202741762](http://www.iocaop.com/images/2024-09/202409162027807.png)

![image-20240916202757788](http://www.iocaop.com/images/2024-09/202409162027830.png)

![image-20240916202808431](http://www.iocaop.com/images/2024-09/202409162028465.png)

切换到root用户，执行这个脚本：

![image-20240916202912160](http://www.iocaop.com/images/2024-09/202409162029194.png)

切换到dmdba用户，进行初始化，如果是从旧库恢复数据，那新库最好和旧库初始化配置一致：

![image-20240916203718592](http://www.iocaop.com/images/2024-09/202409162037646.png)

![image-20240916204147244](http://www.iocaop.com/images/2024-09/202409162041309.png)

切换到root用户，创建实例：

![image-20240916204401592](http://www.iocaop.com/images/2024-09/202409162044638.png)

启动一下看看：

![image-20240916204511427](http://www.iocaop.com/images/2024-09/202409162045479.png)

### 备份还原

先停掉，接下来做备份还原：

![image-20240916210136532](http://www.iocaop.com/images/2024-09/202409162101578.png)

拷贝完后，重给权限，切换到dmdba用户进行还原：

运行：

![image-20240916210745689](http://www.iocaop.com/images/2024-09/202409162107723.png)

![image-20240916211129442](http://www.iocaop.com/images/2024-09/202409162111492.png)

recover时失败:

![image-20240916211815522](http://www.iocaop.com/images/2024-09/202409162118574.png)

再重给权限:

![image-20240916212029411](http://www.iocaop.com/images/2024-09/202409162120443.png)

改完后重进dmrman:

![image-20240916212053387](http://www.iocaop.com/images/2024-09/202409162120437.png)

更新魔数：

![image-20240916212302144](http://www.iocaop.com/images/2024-09/202409162123181.png)

启动实例：

![image-20240916212408494](http://www.iocaop.com/images/2024-09/202409162124546.png)