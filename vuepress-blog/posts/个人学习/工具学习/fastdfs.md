---
title: fastdfs学习
date: 2022-06-09
category:
  - 开发工具
  - 分布式存储
---



* 分布式文件存储系统

  为了满足海量的存储需求，把文件存储在不同的服务器。

* 常见的分布式文件系统

  * NFS：在客户端上映射NFS服务器驱动器，通过网络访问硬盘，完全透明(客户端不知道这是分布式的)。
  * GoogleFS:主从结构，一个GFS集群有一个master和大量的chunkserver组成。master存储数据文件的元数据，一个文件被分成了若干块存储在多个chunkserver中。用户从master获取数据元信息，再到chunkserver存储数据。
  * HDFS(hadoop分布式文件系统)：与GFS类似。

  * 主流的分布式文件系统大同小异，为了满足海量文件存储需求，所以有了分布式文件访问提供商，oss、cos、七牛云等。

* fastDFS介绍

  * C语言编写的开源分布式文件系统，作者:淘宝资深架构师余庆。
  * 优点：上面的NFS、GFS都是通用的分布式文件系统，复杂性高、性能一般。专用分布式文件系统虽然开发体验性差，但是复杂性低、性能高。fastDFS非常适合存储小文件，不对文件分块，没有分块合并的开销，采用socket通信，速度快。

* fastDFS工作原理

  * 架构图

    ![image-20220423223548756](http://www.iocaop.com/images/2022-09/202209292121297.png)

  * 工作流程

    用户想要访问文件，首先会访问tracker，而tracker管理了很多storage，tracker 会向用户返回storage的地址，用户再访问storage服务器。tracker相当于注册中心，storage相当于微服务实例。

  * storage服务器

    按组分配、组织的。同组的服务器存储的数据是一样的，会自动同步，如果一台storage服务器挂了，另一台还会有数据，保证高可用。

  * tracker

    负载均衡和调度。tracker上有每个storage的状态信息(storage状态收集机制，所有的storage会连接所有的tracker，并报告自己的状态)，根据情况向用户返回状态好的storage服务器。tracker同样支持集群，多台服务器同时向外提供服务。

  * 文件上传流程

    ![image-20220423224744449](http://www.iocaop.com/images/2022-09/202209292121993.png)

    文件上传以后storage会返回文件的id，id包括组名(group1)、虚拟磁盘路径(M00)、数据两级目录(/02/44)、文件名。例如：

    ```tex
    group1/M00/02/44/fjsdklfjklhgjsdklafghdjkslAAABBB.sh
    ```

* fastDFS安装

  参考文档:https://segmentfault.com/a/1190000022045552
