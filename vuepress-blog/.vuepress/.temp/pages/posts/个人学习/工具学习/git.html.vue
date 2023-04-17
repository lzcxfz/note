<template><div><p>黑马2022资料阶段一：java基础-第六章</p>
<h2 id="_6-1git介绍" tabindex="-1"><a class="header-anchor" href="#_6-1git介绍" aria-hidden="true">#</a> 6-1Git介绍</h2>
<h3 id="_01-为什么使用代码版本控制系统" tabindex="-1"><a class="header-anchor" href="#_01-为什么使用代码版本控制系统" aria-hidden="true">#</a> 01-为什么使用代码版本控制系统</h3>
<p>代码不仅要本地备份，还要云端备份。可以回滚，回到之前版本。协同工作。明确代码的提交人、提交时间。</p>
<h3 id="_02-git和svn对比" tabindex="-1"><a class="header-anchor" href="#_02-git和svn对比" aria-hidden="true">#</a> 02-Git和SVN对比</h3>
<p>SVN是集中式版本控制系统，<span style="background-color:pink;">版本库是集中放在中央服务器的</span>，而开发人员工作的时候，用
的都是自己的电脑， 所以首先要从中央服务器下载最新的版本，然后开发，开发完后，需要
把自己开发的代码提交到中央服务器。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313220029593.png" alt="image-20230313220029593"></p>
<ul>
<li>服务器单点故障
将会导致所有人员无法工作</li>
<li>而服务器硬盘损坏
这意味着，你可能失去了该项目的所有历史记录，这是毁灭性的</li>
</ul>
<p>Git是在2005年，Linux系统的创建者Linus Torvalds,为了帮助全球的开发者，维护Linux系统
内核的开发 而开发了自己的开源分布式版本控制工具,分为两种类型的仓库：本地仓库和远程
仓库</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313220021491.png" alt="image-20230313220021491"></p>
<ul>
<li>每一个客户端都保存了完整的历史记录
服务器的故障，都可以通过客户端的记录得以恢复。</li>
</ul>
<h2 id="_6-2git基操" tabindex="-1"><a class="header-anchor" href="#_6-2git基操" aria-hidden="true">#</a> 6-2Git基操</h2>
<h3 id="_05-git本地仓库基本工作流程" tabindex="-1"><a class="header-anchor" href="#_05-git本地仓库基本工作流程" aria-hidden="true">#</a> 05-Git本地仓库基本工作流程</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313232117800.png" alt="image-20230313232117800"></p>
<h3 id="_06-git常用命令" tabindex="-1"><a class="header-anchor" href="#_06-git常用命令" aria-hidden="true">#</a> 06-Git常用命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>git init</td>
<td>初始化，创建 git 仓库</td>
</tr>
<tr>
<td>git status</td>
<td>查看 git 状态 （文件是否进行了添加、提交操作）</td>
</tr>
<tr>
<td>git add 文件名</td>
<td>添加，将指定文件添加到暂存区</td>
</tr>
<tr>
<td>git commit -m '提交信息'</td>
<td>提交，将暂存区文件提交到历史仓库</td>
</tr>
<tr>
<td>git log</td>
<td>查看日志（ git 提交的历史日志）</td>
</tr>
</tbody>
</table>
<p>创建文件夹，初始化，会多出一个<code v-pre>.git</code>文件夹，创建一个文件，不添加到暂存区，再执行git status查看：(红色代表没有添加到暂存区的文件)</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313232510009.png" alt="image-20230313232510009"></p>
<p>使用git add命令添加文件到暂存区后会变成绿色：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313232622259.png" alt="image-20230313232622259"></p>
<p>使用git commit命令提交暂存区致本地仓库，再使用git log命令查看日志：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313232808310.png" alt="image-20230313232808310"></p>
<p>哈希值是版本标识，唯一值。</p>
<p>修改文件内容，添加到暂存区，再提交，会有新的哈希值：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313233031122.png" alt="image-20230313233031122"></p>
<p>这个哈希值可以在将来做版本切换时使用。</p>
<h3 id="_08-git历史版本管理" tabindex="-1"><a class="header-anchor" href="#_08-git历史版本管理" aria-hidden="true">#</a> 08-Git历史版本管理</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313233919770.png" alt="image-20230313233919770"></p>
<p>有了历史版本就可以恢复代码，先查看历史记录：</p>
<p><span style="background-color:pink;">git reflog ：可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录的
操作）</span></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313234126471.png" alt="image-20230313234126471"></p>
<p>随便改一下代码，再来查看日志：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313234241404.png" alt="image-20230313234241404"></p>
<p>现在要将代码恢复到最初的版本：</p>
<p><span style="background-color:pink;">指令：git reset --hard 版本唯一索引值</span></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313234354874.png" alt="image-20230313234354874"></p>
<h3 id="_09-分支管理介绍" tabindex="-1"><a class="header-anchor" href="#_09-分支管理介绍" aria-hidden="true">#</a> 09-分支管理介绍</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313234740902.png" alt="image-20230313234740902"></p>
<ul>
<li>分支
<ul>
<li>由每次提交的代码，串成的一条时间线</li>
<li>使用分支意味着你<span style="background-color:pink;">可以把你的工作从开发主线上分离开来,以免影响开发主线</span></li>
</ul>
</li>
<li>分支的使用场景
<ol>
<li>周期较长的模块开发
假设你准备开发一个新功能，但是需要一个月才能完成
第一周写了20%的代码，突然发现原来已经写好的功能出现了一个严重的Bug
那现在就需要放下手中的新功能，去修复Bug
但这20%的代码不能舍弃，并且也担心丢失，这就需要开启一个新的版本控制。</li>
<li>尝试性的模块开发
业务人员给我们提出了一个需求，经过我们的思考和分析
该需求应该可以使用技术手段进行实现。
但是我们还不敢确定，我们就可以去创建一个分支基于分支进行尝试性开发。</li>
</ol>
</li>
</ul>
<h3 id="_10-分支工作流程" tabindex="-1"><a class="header-anchor" href="#_10-分支工作流程" aria-hidden="true">#</a> 10-分支工作流程</h3>
<p><span style="background-color:pink;">Master: 指向提交的代码版本</span></p>
<p><span style="background-color:pink;">Header: 指向当前所使用的的分支</span></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313235930062.png" alt="image-20230313235930062"></p>
<p>第三个版本开始，开启了新的分支Dev，这时候Head指针就指向了Dev，Dev指向了Dev的当前版本。</p>
<p>Master指针不受影响，不会变化。</p>
<p>当我们开发完了Dev，想要合并到Master主分支，只需要将Master指向Dev，Head再指向Master即可：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230314000306898.png" alt="image-20230314000306898"></p>
<p>然后就可以把Dev分支删掉了，没有必要存在了。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230314000347439.png" alt="image-20230314000347439"></p>
<h3 id="_11-创建和切换分支" tabindex="-1"><a class="header-anchor" href="#_11-创建和切换分支" aria-hidden="true">#</a> 11-创建和切换分支</h3>
<ul>
<li>
<p>创建和切换</p>
<p>创建命令：git branch 分支名
切换命令：git checkout 分支名</p>
</li>
</ul>
<p>创建分支:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> branch xiaoming
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建后查看分支:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再切换到xiaoming分支：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout xiaoming
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-03/image-20230314001125340.png" alt="image-20230314001125340"></p>
<blockquote>
<p>现在我们在xiaoming分支，在这个分支下创建一个test2.txt文件并提交到本地仓库，再切换回master分支，master分支下会有这个文件吗？并没有，因为分支之间各不影响。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">touch</span> test2.txt
<span class="token function">git</span> <span class="token function">add</span> ./test2.txt
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">'xiaoming分支下创建test2.txt'</span>
<span class="token comment"># 切换回master</span>
<span class="token function">git</span> checkout master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-03/image-20230314001542612.png" alt="image-20230314001542612"></p>
<p><span style="background-color:pink;">总结：不同分支之间的关系是平行的关系，不会相互影响</span></p>
<h3 id="_12-合并和删除分支" tabindex="-1"><a class="header-anchor" href="#_12-合并和删除分支" aria-hidden="true">#</a> 12-合并和删除分支</h3>
<ul>
<li>
<p>合并分支</p>
<p>git merge 分支名</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230314235702535.png" alt="image-20230314235702535"></p>
</li>
</ul>
<p>把xiaoming分支合并到master后，xiaoming分支可以删除了</p>
<ul>
<li>
<p>分支删除</p>
<p>git branch -d分支名</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230314235901856.png" alt="image-20230314235901856"></p>
</li>
</ul>
<p>之前在05学习的git本地仓库工作流程中，未补充我问号就是，在本地仓库和工作目录之间进行的操作是分支切换：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230315000258534.png" alt="image-20230315000258534"></p>
<h3 id="_13-远程仓库的工作流程" tabindex="-1"><a class="header-anchor" href="#_13-远程仓库的工作流程" aria-hidden="true">#</a> 13-远程仓库的工作流程</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230315000422816.png" alt="image-20230315000422816"></p>
<h3 id="_15-ssh公钥配置" tabindex="-1"><a class="header-anchor" href="#_15-ssh公钥配置" aria-hidden="true">#</a> 15-ssh公钥配置</h3>
<ol>
<li>
<p>设置Git账户
git config user.name（查看git账户）
git config user.email（查看git邮箱）
git config --global user.name “账户名”（设置全局账户名）
git config --global user.email “邮箱”（设置全局邮箱）
cd ~/.ssh（查看是否生成过SSH公钥）</p>
</li>
<li>
<p>生成命令: ssh-keygen –t rsa –C “邮箱” ( 注意：这里需要敲3次回车)</p>
</li>
</ol>
<p>查看命令: cat ~/.ssh/id_rsa.pub</p>
<ol start="3">
<li>
<p>在远程仓库平台添加生成的公钥</p>
</li>
<li>
<p>测试公钥</p>
</li>
</ol>
<p>命令: ssh -T git@gitee.com</p>
<ol start="5">
<li>命令 git remote add 远程名称 远程仓库URL git push -u 仓库名称 分支名</li>
</ol>
<h3 id="_16-代码冲突" tabindex="-1"><a class="header-anchor" href="#_16-代码冲突" aria-hidden="true">#</a> 16-代码冲突</h3>
<p>两个程序员操作同一个文件,其中一个程序员在修改文件后,push到远程仓库,另一个程序
员<span style="background-color:pink;">应该先pull将最新的代码更新到本地仓库后,在修改代码</span>,之后push到远程仓库,结果他<span style="background-color:pink;">没
有</span>先pull将最新的代码更新到本地仓库,而是直接将自己的代码push到远程仓库,这样就可
能<span style="background-color:pink;">会导致代码冲突</span></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230315001553605.png" alt="image-20230315001553605"></p>
<p>当发生冲突时进行push，会提示冲突：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230315001820794.png" alt="image-20230315001820794"></p>
<ul>
<li>如何解决冲突
&lt;&lt;&lt;&lt;&lt;&lt;&lt;和&gt;&gt;&gt;&gt;&gt;&gt;&gt;中间的内容,就是冲突部分</li>
</ul>
<ol>
<li>修改冲突行，保存，即可解决冲突。</li>
<li><span style="background-color:pink;">重新add</span>冲突文件并commit到本地仓库，重新push到远程</li>
</ol>
</div></template>


