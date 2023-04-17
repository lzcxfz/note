<template><div><h3 id="启动和插件安装" tabindex="-1"><a class="header-anchor" href="#启动和插件安装" aria-hidden="true">#</a> 启动和插件安装</h3>
<p>下载链接：<a href = 'http://mirrors.jenkins.io/war-stable/latest/jenkins.war'>点击跳转</a></p>
<p>下载好war包上传到linux服务器运行命令后台启动服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> jenkins.war <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动后查看日志：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tail</span> nohup.out <span class="token parameter variable">-F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会输出一串哈希值，就代表成功。打开8080端口，输入这段哈希解锁Jenkins。</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108102204412.png" alt="image-20221108102204412"></p>
<p>不知道选什么，直接安装推荐的插件：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108102313625.png" alt="image-20221108102313625"></p>
<p>等待：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108102331316.png" alt="image-20221108102331316"></p>
<p>设置用户：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108103331001.png" alt="image-20221108103331001"></p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108103347621.png" alt="image-20221108103347621"></p>
<p>装插件：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108103425672.png" alt="image-20221108103425672"></p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108103444339.png" alt="image-20221108103444339"></p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108103524078.png" alt="image-20221108103524078"></p>
<p>搜索：</p>
<ul>
<li>JavaDoc</li>
<li>Maven Integration</li>
<li>Infrastructure plugin for Publish Over X</li>
<li>Publish Over SSH</li>
<li>JQuery</li>
<li>Git Parameter</li>
</ul>
<p>安装并重启Jenkins。</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108104313286.png" alt="image-20221108104313286"></p>
<h3 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置" aria-hidden="true">#</a> 环境配置</h3>
<p>这里是windows的，linux下一样，只是路径没有盘符</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108110521506.png" alt="image-20221108110521506"></p>
<p>jdk：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108110729238.png" alt="image-20221108110729238"></p>
<p>maven：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108110743031.png" alt="image-20221108110743031"></p>
<p>ssh配置：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108110809607.png" alt="image-20221108110809607"></p>
<p>点进去拉到最下面：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108110843210.png" alt="image-20221108110843210"></p>
<p>输入服务器地址和密码：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108111126964.png" alt="image-20221108111126964"></p>
<p>测试一下：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108111012515.png" alt="image-20221108111012515"></p>
<h3 id="新建任务" tabindex="-1"><a class="header-anchor" href="#新建任务" aria-hidden="true">#</a> 新建任务</h3>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108111505750.png" alt="image-20221108111505750"></p>
<p>配置保持构建的天数和最大个数：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108111630820.png" alt="image-20221108111630820"></p>
<p>配置git参数：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108111840350.png" alt="image-20221108111840350"></p>
<p>码来！配置一下代码仓库地址：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108112103718.png" alt="image-20221108112103718"></p>
<p>点这个进去添加账号和密码：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108112155976.png" alt="image-20221108112155976"></p>
<p>配置maven参数：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>clean package <span class="token parameter variable">-Dmaven.test.skip</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-11/image-20221108112512819.png" alt="image-20221108112512819"></p>
<p>运行一下试试：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108112847530.png" alt="image-20221108112847530"></p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108112903717.png" alt="image-20221108112903717"></p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108112923660.png" alt="image-20221108112923660"></p>
<p>好！构建成功，我们到目录下看看jar包：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108112950826.png" alt="image-20221108112950826"></p>
<p>这是windows，linux也是一样的。</p>
<h3 id="把构建好的jar包传到远程服务器运行" tabindex="-1"><a class="header-anchor" href="#把构建好的jar包传到远程服务器运行" aria-hidden="true">#</a> 把构建好的jar包传到远程服务器运行</h3>
<p>点配置，拉到最下面：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108113556712.png" alt="image-20221108113556712"></p>
<p>第一个参数：每个任务会在.jenkins的workspace下创建一个同名的文件夹，所以target/*.jar可以匹配到生成的jar包。</p>
<p>第二个参数：简单的说就是，传到服务器后要移除的前缀<img src="http://www.iocaop.com/images/2022-11/image-20221108113847965.png" alt="image-20221108113847965"></p>
<p>第三个参数：jar包上传到远程服务器的位置</p>
<p>第四个参数：执行的命令，这里我先来个简单的，不用ssh脚本。</p>
<p>好！来跑一下：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108114131424.png" alt="image-20221108114131424"></p>
<p>到服务器上看一下：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108114253865.png" alt="image-20221108114253865"></p>
<p>文件有了，为什么没运行成功？</p>
<p>手动运行发现80端口已经被nginx占用了：</p>
<p><img src="http://www.iocaop.com/images/2022-11/image-20221108114356472.png" alt="image-20221108114356472"></p>
<p>换了端口还是不行，最终发现命令错了,改成这样：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> /jenkins/warehouse.jar <span class="token operator">></span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最终还是失败了，文件是传过去了，但是没有启动。</p>
</div></template>


