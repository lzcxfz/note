---
title: git-基本使用
date: 2023-03-21
category:
  - git
---

黑马2022资料阶段一：java基础-第六章

## 6-1Git介绍

### 01-为什么使用代码版本控制系统

代码不仅要本地备份，还要云端备份。可以回滚，回到之前版本。协同工作。明确代码的提交人、提交时间。

### 02-Git和SVN对比

SVN是集中式版本控制系统，<span style="background-color:pink;">版本库是集中放在中央服务器的</span>，而开发人员工作的时候，用
的都是自己的电脑， 所以首先要从中央服务器下载最新的版本，然后开发，开发完后，需要
把自己开发的代码提交到中央服务器。

![image-20230313220029593](http://www.iocaop.com/images/2023-03/image-20230313220029593.png)

* 服务器单点故障
  将会导致所有人员无法工作
* 而服务器硬盘损坏
  这意味着，你可能失去了该项目的所有历史记录，这是毁灭性的

Git是在2005年，Linux系统的创建者Linus Torvalds,为了帮助全球的开发者，维护Linux系统
内核的开发 而开发了自己的开源分布式版本控制工具,分为两种类型的仓库：本地仓库和远程
仓库

![image-20230313220021491](http://www.iocaop.com/images/2023-03/image-20230313220021491.png)

* 每一个客户端都保存了完整的历史记录
  服务器的故障，都可以通过客户端的记录得以恢复。

## 6-2Git基操

### 05-Git本地仓库基本工作流程

![image-20230313232117800](http://www.iocaop.com/images/2023-03/image-20230313232117800.png)

### 06-Git常用命令

| 命令                     | 作用                                           |
| ------------------------ | ---------------------------------------------- |
| git init                 | 初始化，创建 git 仓库                          |
| git status               | 查看 git 状态 （文件是否进行了添加、提交操作） |
| git add 文件名           | 添加，将指定文件添加到暂存区                   |
| git commit -m '提交信息' | 提交，将暂存区文件提交到历史仓库               |
| git log                  | 查看日志（ git 提交的历史日志）                |

创建文件夹，初始化，会多出一个`.git`文件夹，创建一个文件，不添加到暂存区，再执行git status查看：(红色代表没有添加到暂存区的文件)

![image-20230313232510009](http://www.iocaop.com/images/2023-03/image-20230313232510009.png)

使用git add命令添加文件到暂存区后会变成绿色：

![image-20230313232622259](http://www.iocaop.com/images/2023-03/image-20230313232622259.png)

使用git commit命令提交暂存区致本地仓库，再使用git log命令查看日志：

![image-20230313232808310](http://www.iocaop.com/images/2023-03/image-20230313232808310.png)

哈希值是版本标识，唯一值。

修改文件内容，添加到暂存区，再提交，会有新的哈希值：

![image-20230313233031122](http://www.iocaop.com/images/2023-03/image-20230313233031122.png)

这个哈希值可以在将来做版本切换时使用。

### 08-Git历史版本管理

![image-20230313233919770](http://www.iocaop.com/images/2023-03/image-20230313233919770.png)

有了历史版本就可以恢复代码，先查看历史记录：

<span style="background-color:pink;">git reflog ：可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录的
操作）</span>

![image-20230313234126471](http://www.iocaop.com/images/2023-03/image-20230313234126471.png)

随便改一下代码，再来查看日志：

![image-20230313234241404](http://www.iocaop.com/images/2023-03/image-20230313234241404.png)

现在要将代码恢复到最初的版本：

<span style="background-color:pink;">指令：git reset --hard 版本唯一索引值</span>

![image-20230313234354874](http://www.iocaop.com/images/2023-03/image-20230313234354874.png)

### 09-分支管理介绍

![image-20230313234740902](http://www.iocaop.com/images/2023-03/image-20230313234740902.png)

+ 分支
  + 由每次提交的代码，串成的一条时间线
  + 使用分支意味着你<span style="background-color:pink;">可以把你的工作从开发主线上分离开来,以免影响开发主线</span>
+ 分支的使用场景
  1. 周期较长的模块开发
     假设你准备开发一个新功能，但是需要一个月才能完成
     第一周写了20%的代码，突然发现原来已经写好的功能出现了一个严重的Bug
     那现在就需要放下手中的新功能，去修复Bug
     但这20%的代码不能舍弃，并且也担心丢失，这就需要开启一个新的版本控制。
  2. 尝试性的模块开发
     业务人员给我们提出了一个需求，经过我们的思考和分析
     该需求应该可以使用技术手段进行实现。
     但是我们还不敢确定，我们就可以去创建一个分支基于分支进行尝试性开发。

### 10-分支工作流程

<span style="background-color:pink;">Master: 指向提交的代码版本</span>

<span style="background-color:pink;">Header: 指向当前所使用的的分支</span>

![image-20230313235930062](http://www.iocaop.com/images/2023-03/image-20230313235930062.png)

第三个版本开始，开启了新的分支Dev，这时候Head指针就指向了Dev，Dev指向了Dev的当前版本。

Master指针不受影响，不会变化。

当我们开发完了Dev，想要合并到Master主分支，只需要将Master指向Dev，Head再指向Master即可：

![image-20230314000306898](http://www.iocaop.com/images/2023-03/image-20230314000306898.png)

然后就可以把Dev分支删掉了，没有必要存在了。

![image-20230314000347439](http://www.iocaop.com/images/2023-03/image-20230314000347439.png)

### 11-创建和切换分支

* 创建和切换

  创建命令：git branch 分支名
  切换命令：git checkout 分支名

创建分支:

```bash
git branch xiaoming
```

创建后查看分支:

```bash
git branch
```

再切换到xiaoming分支：

```bash
git checkout xiaoming
```

![image-20230314001125340](http://www.iocaop.com/images/2023-03/image-20230314001125340.png)

> 现在我们在xiaoming分支，在这个分支下创建一个test2.txt文件并提交到本地仓库，再切换回master分支，master分支下会有这个文件吗？并没有，因为分支之间各不影响。

```bash
touch test2.txt
git add ./test2.txt
git commit -m 'xiaoming分支下创建test2.txt'
# 切换回master
git checkout master
```

![image-20230314001542612](http://www.iocaop.com/images/2023-03/image-20230314001542612.png)

<span style="background-color:pink;">总结：不同分支之间的关系是平行的关系，不会相互影响</span>

### 12-合并和删除分支

* 合并分支

  git merge 分支名

  ![image-20230314235702535](http://www.iocaop.com/images/2023-03/image-20230314235702535.png)

把xiaoming分支合并到master后，xiaoming分支可以删除了

* 分支删除

  git branch -d分支名

  ![image-20230314235901856](http://www.iocaop.com/images/2023-03/image-20230314235901856.png)

之前在05学习的git本地仓库工作流程中，未补充我问号就是，在本地仓库和工作目录之间进行的操作是分支切换：

![image-20230315000258534](http://www.iocaop.com/images/2023-03/image-20230315000258534.png)

### 13-远程仓库的工作流程

![image-20230315000422816](http://www.iocaop.com/images/2023-03/image-20230315000422816.png)

### 15-ssh公钥配置

1. 设置Git账户
   git config user.name（查看git账户）
   git config user.email（查看git邮箱）
   git config --global user.name “账户名”（设置全局账户名）
   git config --global user.email “邮箱”（设置全局邮箱）
   cd ~/.ssh（查看是否生成过SSH公钥）

2. 生成命令: ssh-keygen –t rsa –C “邮箱” ( 注意：这里需要敲3次回车)

  查看命令: cat ~/.ssh/id_rsa.pub

3. 在远程仓库平台添加生成的公钥

4. 测试公钥

  命令: ssh -T git@gitee.com

5. 命令 git remote add 远程名称 远程仓库URL git push -u 仓库名称 分支名

### 16-代码冲突

两个程序员操作同一个文件,其中一个程序员在修改文件后,push到远程仓库,另一个程序
员<span style="background-color:pink;">应该先pull将最新的代码更新到本地仓库后,在修改代码</span>,之后push到远程仓库,结果他<span style="background-color:pink;">没
有</span>先pull将最新的代码更新到本地仓库,而是直接将自己的代码push到远程仓库,这样就可
能<span style="background-color:pink;">会导致代码冲突</span>

![image-20230315001553605](http://www.iocaop.com/images/2023-03/image-20230315001553605.png)

当发生冲突时进行push，会提示冲突：

![image-20230315001820794](http://www.iocaop.com/images/2023-03/image-20230315001820794.png)

* 如何解决冲突
  <<<<<<<和>>>>>>>中间的内容,就是冲突部分

1. 修改冲突行，保存，即可解决冲突。
2. <span style="background-color:pink;">重新add</span>冲突文件并commit到本地仓库，重新push到远程