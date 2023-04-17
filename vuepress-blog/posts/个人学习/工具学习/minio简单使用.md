---
title: minio简单使用
date: 2023-02-15
category:
  - minio
---

参考文章：<a href='https://juejin.cn/post/7131692039493648414'>点击跳转</a>，<a href='https://juejin.cn/post/7132852449244610574'>点击跳转</a>

中文文档：<a href='http://docs.minio.org.cn/minio/baremetal/'>点击跳转</a>

教程：黑马博学谷-JavaEE在线就业班2022年+中级进修课-阶段六-黑马头条项目-MinIO

## p1-minio简介

文件的存储方式有很多，如下：

| 存储方式       | 优点                       | 缺点     |
| -------------- | -------------------------- | -------- |
| 服务器磁盘     | 开发便捷、成本低           | 扩展困难 |
| 分布式文件系统 | 容易实现扩容               | 复杂度高 |
| 第三方存储     | 开发简单、功能强大、免维护 | 收费     |

分布式文件存储系统：

| 存储方式 | 优点                                                         | 缺点                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| FastDFS  | 1.主备服务，高可用<br />2.支持主从文件，支持自定义扩展名<br />3.支持动态扩容 | 1.没有完备的官方文档，近几年没有更新<br />2.环境搭建比较麻烦 |
| MinIO    | 1.性能高，准硬件条件下它能达到55GB/s的读、35GB/s的写速率<br />2.部署自带管理界面<br />3.MinIO.Inc运营开源项目，社区活跃度高<br />4.提供了所有主流开发语言的SDK | 1.不支持动态增加节点                                         |

## p2-MinIO环境搭建

简单使用，直接docker安装：

拉取镜像：

```bash
docker pull minio/minio
```

运行容器：

```bash
docker run -p 9000:9000  --name minio -d --restart=always -e "MINIO_ACCESS_KEY=minio" -e "MINIO_SECRET_KEY=minio123" -v /home/data:/data -v /home/config:/root/.minio minio/minio server /data
```

