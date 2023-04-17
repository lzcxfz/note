---
title: Jenkins学习
date: 2022-11-08
category:
  - 开发工具
  - Jenkins
  - CI/CD
---

### 启动和插件安装

下载链接：<a href = 'http://mirrors.jenkins.io/war-stable/latest/jenkins.war'>点击跳转</a>

下载好war包上传到linux服务器运行命令后台启动服务：

```sh
nohup java -jar jenkins.war &
```

启动后查看日志：

```sh
tail nohup.out -F
```

会输出一串哈希值，就代表成功。打开8080端口，输入这段哈希解锁Jenkins。

![image-20221108102204412](http://www.iocaop.com/images/2022-11/image-20221108102204412.png)

不知道选什么，直接安装推荐的插件：

![image-20221108102313625](http://www.iocaop.com/images/2022-11/image-20221108102313625.png)

等待：

![image-20221108102331316](http://www.iocaop.com/images/2022-11/image-20221108102331316.png)

设置用户：

![image-20221108103331001](http://www.iocaop.com/images/2022-11/image-20221108103331001.png)

![image-20221108103347621](http://www.iocaop.com/images/2022-11/image-20221108103347621.png)

装插件：

![image-20221108103425672](http://www.iocaop.com/images/2022-11/image-20221108103425672.png)

![image-20221108103444339](http://www.iocaop.com/images/2022-11/image-20221108103444339.png)

![image-20221108103524078](http://www.iocaop.com/images/2022-11/image-20221108103524078.png)

搜索：

* JavaDoc
* Maven Integration
* Infrastructure plugin for Publish Over X
* Publish Over SSH
* JQuery
* Git Parameter

安装并重启Jenkins。

![image-20221108104313286](http://www.iocaop.com/images/2022-11/image-20221108104313286.png)

### 环境配置

这里是windows的，linux下一样，只是路径没有盘符

![image-20221108110521506](http://www.iocaop.com/images/2022-11/image-20221108110521506.png)

jdk：

![image-20221108110729238](http://www.iocaop.com/images/2022-11/image-20221108110729238.png)

maven：

![image-20221108110743031](http://www.iocaop.com/images/2022-11/image-20221108110743031.png)

ssh配置：

![image-20221108110809607](http://www.iocaop.com/images/2022-11/image-20221108110809607.png)

点进去拉到最下面：

![image-20221108110843210](http://www.iocaop.com/images/2022-11/image-20221108110843210.png)

输入服务器地址和密码：

![image-20221108111126964](http://www.iocaop.com/images/2022-11/image-20221108111126964.png)

测试一下：

![image-20221108111012515](http://www.iocaop.com/images/2022-11/image-20221108111012515.png)

### 新建任务

![image-20221108111505750](http://www.iocaop.com/images/2022-11/image-20221108111505750.png)

配置保持构建的天数和最大个数：

![image-20221108111630820](http://www.iocaop.com/images/2022-11/image-20221108111630820.png)

配置git参数：

![image-20221108111840350](http://www.iocaop.com/images/2022-11/image-20221108111840350.png)

码来！配置一下代码仓库地址：

![image-20221108112103718](http://www.iocaop.com/images/2022-11/image-20221108112103718.png)

点这个进去添加账号和密码：

![image-20221108112155976](http://www.iocaop.com/images/2022-11/image-20221108112155976.png)

配置maven参数：

```sh
clean package -Dmaven.test.skip=true
```

![image-20221108112512819](http://www.iocaop.com/images/2022-11/image-20221108112512819.png)

运行一下试试：

![image-20221108112847530](http://www.iocaop.com/images/2022-11/image-20221108112847530.png)

![image-20221108112903717](http://www.iocaop.com/images/2022-11/image-20221108112903717.png)

![image-20221108112923660](http://www.iocaop.com/images/2022-11/image-20221108112923660.png)

好！构建成功，我们到目录下看看jar包：

![image-20221108112950826](http://www.iocaop.com/images/2022-11/image-20221108112950826.png)

这是windows，linux也是一样的。

### 把构建好的jar包传到远程服务器运行

点配置，拉到最下面：

![image-20221108113556712](http://www.iocaop.com/images/2022-11/image-20221108113556712.png)

第一个参数：每个任务会在.jenkins的workspace下创建一个同名的文件夹，所以target/*.jar可以匹配到生成的jar包。

第二个参数：简单的说就是，传到服务器后要移除的前缀![image-20221108113847965](http://www.iocaop.com/images/2022-11/image-20221108113847965.png)

第三个参数：jar包上传到远程服务器的位置

第四个参数：执行的命令，这里我先来个简单的，不用ssh脚本。

好！来跑一下：

![image-20221108114131424](http://www.iocaop.com/images/2022-11/image-20221108114131424.png)

到服务器上看一下：

![image-20221108114253865](http://www.iocaop.com/images/2022-11/image-20221108114253865.png)

文件有了，为什么没运行成功？

手动运行发现80端口已经被nginx占用了：

![image-20221108114356472](http://www.iocaop.com/images/2022-11/image-20221108114356472.png)

换了端口还是不行，最终发现命令错了,改成这样：

```sh
nohup java -jar /jenkins/warehouse.jar >/dev/null 2>&1 &
```

最终还是失败了，文件是传过去了，但是没有启动。