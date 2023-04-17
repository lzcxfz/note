<template><div><h5 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令" aria-hidden="true">#</a> 基本命令</h5>
<ul>
<li>启动容器：docker run 镜像名字
<ul>
<li>-t 打开一个终端，像使用交换机一样使用容器</li>
<li>-i 交互式访问</li>
<li>--name 容器名字</li>
<li>--network 指定网络</li>
<li>--rm 容器一停 自动删除</li>
<li>-d 剥离与当前终端的关系，否则会一直占用终端。</li>
<li>-p 端口映射</li>
</ul>
</li>
</ul>
<h5 id="网络模式" tabindex="-1"><a class="header-anchor" href="#网络模式" aria-hidden="true">#</a> 网络模式</h5>
<p>docker使用Linux的Namespace技术进行资源隔离，其中Network Namespace隔离网络。一个Network Namespace提供一份独立的网络环境，包括网卡、路由、iptable规则等。</p>
<ul>
<li>host模式：容器和宿主机共用一个Network Namespace。</li>
<li>container模式：和另一个容器共用Network Namespace。</li>
<li>none模式：没有Network Namespace，相当于没有网卡、路由等。</li>
<li>bridge模式：为每一个容器创建一个Network Namespace。</li>
</ul>
<h5 id="路径映射" tabindex="-1"><a class="header-anchor" href="#路径映射" aria-hidden="true">#</a> 路径映射</h5>
<p>docker run -v 主机目录:容器目录</p>
<h5 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> Dockerfile</h5>
<p>在空目录下新建Dockerfile文件，添加内容，运行docker build -t nginx:v3 .</p>
<p>nginx表示镜像名，v3是tag ，.表示上下文路径。</p>
<ul>
<li>
<p>FROM 指定基础镜像 。如:FROM nginx</p>
</li>
<li>
<p>RUN 后面跟指令 (shell 或者exec)，会在docker build的时候运行。如:RUN tar -vxf redis.tar.gz</p>
</li>
<li>
<p>CMD 和RUN 类似，后面跟指令，是在docker run 时运行。会被docker run的命令行参数指定的指令覆盖。</p>
</li>
<li>
<p>ENTRYPOINT 与CMD类似，不会被docker run 命令行参数指定的指令覆盖。</p>
</li>
<li>
<p>COPY 从上下文目录中复制文件到容器中，可以使用正则。如:COPY hom*.txt /mydir/</p>
<ul>
<li>如果是复制目录，其内部文件和子目录会被递归复制，但是这个目录本身不会被复制。需要把目录名字加在容器路径。</li>
</ul>
</li>
<li>
<p>ADD 和COPY类似，会自动解压本地的包，网络上的包会直接下载，不解压。</p>
</li>
<li>
<p>ENV 设置环境变量,在后续的指令中可以用$使用这个变量。如:ENV NODE_VERSION=7.2.0</p>
</li>
<li>
<p>ARG 与ENV作用一样，但作用域不一样，只在Dockerfile内有效，也就是docker build 时才有效，构建好的镜像不存在此变量。</p>
</li>
<li>
<p>VOLUE 定义匿名数据卷，在启动容器时忘记加 -v参数挂载数据卷时，会自动挂载到匿名卷。</p>
</li>
<li>
<p>EXPOSE 仅仅只是声明端口。在运行时如果使用随机端口(docker run -p)，会自动随机映射到EXPOSE的端口。</p>
</li>
<li>
<p>WORKDIR 指定工作目录。</p>
</li>
<li>
<p>USER 指定执行后续命令的用户和用户组。</p>
</li>
<li>
<p>HEALTHCHECK指定某个程序或指令来监控docker容器服务的运行状态。</p>
</li>
<li>
<p>ONBUILD 延迟构建命令的执行。本次构建不执行这些命令，假设本次构建镜像名字:nginx1。</p>
<p>下次构建 FROM nginx1 。在执行构建docker build 时，就会执行ONBUILD的指令。</p>
</li>
<li>
<p>LABEL 添加元数据。如添加作者: LABEL com.lzc.image.author=&quot;lzc&quot;</p>
</li>
<li>
<p>MAINTAINER 指定制作者信息</p>
</li>
</ul>
</div></template>


