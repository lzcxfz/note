<template><div><h1 id="黑马2022资料阶段一-java基础" tabindex="-1"><a class="header-anchor" href="#黑马2022资料阶段一-java基础" aria-hidden="true">#</a> 黑马2022资料阶段一：java基础</h1>
<h2 id="_3-1-面向对象基础上" tabindex="-1"><a class="header-anchor" href="#_3-1-面向对象基础上" aria-hidden="true">#</a> 3-1 面向对象基础上</h2>
<h3 id="_07-两个对象内存图" tabindex="-1"><a class="header-anchor" href="#_07-两个对象内存图" aria-hidden="true">#</a> 07-两个对象内存图</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310001124213.png" alt="image-20230310001124213"></p>
<blockquote>
<p>需要注意的是，第二次创建对象时，类的字节码文件不需要再次加载到方法区。调用成员变量方法的时候，在堆内存中保存的是同一个成员方法的地址(方法区)，只是堆内存地址(指向方法区的指针)不一样。且每次执行都会压栈，执行完会弹栈。</p>
</blockquote>
<h3 id="_08-两个引用指向同一个对象内存图" tabindex="-1"><a class="header-anchor" href="#_08-两个引用指向同一个对象内存图" aria-hidden="true">#</a> 08-两个引用指向同一个对象内存图</h3>
<p>定义学生类：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310000009738.png" alt="image-20230310000009738"></p>
<p>在main方法创建一个对象stu1，再用这个类的引用stu2指向stu1,改变stu2的name属性：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310000156658.png" alt="image-20230310000156658"></p>
<blockquote>
<p>stu1的name属性会变化吗为什么？</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310000402253.png" alt="image-20230310000402253"></p>
<p>会变化，打印出来是:阿珍...阿珍。</p>
<p>因为stu1和stu2都指向了堆内存的同一块地址。</p>
<h2 id="_3-2面向对象基础下" tabindex="-1"><a class="header-anchor" href="#_3-2面向对象基础下" aria-hidden="true">#</a> 3-2面向对象基础下</h2>
<h3 id="_12-this关键字" tabindex="-1"><a class="header-anchor" href="#_12-this关键字" aria-hidden="true">#</a> 12-this关键字</h3>
<p>当方法局部变量和类成员变量重名时，会采用就近原则，导致set方法失效：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310001711631.png" alt="image-20230310001711631"></p>
<p>想要将成员变量的值改为set方法传参的值，可以使用this关键字：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310001823315.png" alt="image-20230310001823315"></p>
<p>this的作用：调用本类的成员(变量和方法)，解决局部变量和成员变量的重名问题。</p>
<p>this代表所在类的对象引用，方法被哪个对象调用，this就代表哪个对象。</p>
<h3 id="_13-this的内存原理" tabindex="-1"><a class="header-anchor" href="#_13-this的内存原理" aria-hidden="true">#</a> 13-this的内存原理</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310002604905.png" alt="image-20230310002604905"></p>
<h3 id="_15-17-构造方法格式、调用时机和作用、注意事项" tabindex="-1"><a class="header-anchor" href="#_15-17-构造方法格式、调用时机和作用、注意事项" aria-hidden="true">#</a> 15~17-构造方法格式、调用时机和作用、注意事项</h3>
<p>是什么：构建创造对象的时候所调用的方法。</p>
<p>格式：方法名与类名相同，大小写也一致。没有返回值类型，连void都没有。没有具体的返回值。</p>
<p>执行时机：创建对象的时候调用，每创建一次对象，就会执行一次构造方法。不能手动调用构造方法。</p>
<p>作用：给对象的属性做初始化，在new对象时传参数，在构造函数内执行初始化逻辑。</p>
<p>注意事项：如果没有定义构造方法，会默认给出一个默认构造方法。一旦定义了构造方法，系统不会提供默认构造方法(无参的)，构造方法是可以重载的，如果自定义了有参构造，还要使用无参构造的话需要自己再定义一个无参构造。</p>
<h2 id="_4-1-string类" tabindex="-1"><a class="header-anchor" href="#_4-1-string类" aria-hidden="true">#</a> 4-1 String类</h2>
<h3 id="_03-概述" tabindex="-1"><a class="header-anchor" href="#_03-概述" aria-hidden="true">#</a> 03-概述</h3>
<p>java程序中，所有双引号字符串都是String类对象。</p>
<p>字符串是常量，创建后不能更改。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310004430528.png" alt="image-20230310004430528"></p>
<blockquote>
<p>String类内部有一个char[]，没有提供set方法给我们修改内存。上图代码中，只是讲栈内存中的s1变量指向了一个新的String类对象。</p>
</blockquote>
<h3 id="_04-string类的常见构造" tabindex="-1"><a class="header-anchor" href="#_04-string类的常见构造" aria-hidden="true">#</a> 04-String类的常见构造</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310004706791.png" alt="image-20230310004706791"></p>
<h3 id="_05-创建字符串对象的区别对比" tabindex="-1"><a class="header-anchor" href="#_05-创建字符串对象的区别对比" aria-hidden="true">#</a> 05-创建字符串对象的区别对比</h3>
<p>构造方法可以创建String对象，双引号也能直接创建字符串对象，有什么区别？</p>
<p>首先复习一下<code v-pre>==</code>比较，基本数据类型时比较的是值，引用数据类型比较的是地址。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310005844595.png" alt="image-20230310005844595"></p>
<p>以双引号方式给出的字符串，只要字符序列相同(顺序和大小写)，无论在代码中出现多少次，JVM都只会创建一个String对象，并在字符串常量池中维护。</p>
<blockquote>
<p>字符串常量池：当使用双引号创建字符串对象的时候，系统会检测该字符串是否在常量池中存在，如果存在则复用，不存在才创建。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310005600039.png" alt="image-20230310005600039"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310005808718.png" alt="image-20230310005808718"></p>
<h3 id="_06-string类常见面试题" tabindex="-1"><a class="header-anchor" href="#_06-string类常见面试题" aria-hidden="true">#</a> 06-String类常见面试题</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310010501497.png" alt="image-20230310010501497"></p>
<blockquote>
<p>为什么是2个？new一个，字符串&quot;abc&quot;本身是一个。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310010918256.png" alt="image-20230310010918256"></p>
<blockquote>
<p><em>Java 语言提供对字符串串联符号(&quot;+&quot;)以及将其他对象转换为字符串的特殊支持</em>。字符串串联是通过 StringBuilder或 StringBuffer类及其 append 方法实现的</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310011230679.png" alt="image-20230310011230679"></p>
<h2 id="_4-2-stringbuilder" tabindex="-1"><a class="header-anchor" href="#_4-2-stringbuilder" aria-hidden="true">#</a> 4-2 StringBuilder</h2>
<h3 id="_15-概述" tabindex="-1"><a class="header-anchor" href="#_15-概述" aria-hidden="true">#</a> 15-概述</h3>
<p>概述：可变字符串类，可以看做是一个String的容器。</p>
<p>学他干嘛：提高字符串操作效率。方法抽取快捷键ctrl+alt+m</p>
<p>String拼接：2933ms</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310011948990.png" alt="image-20230310011948990"></p>
<p>StringBuilder拼接：294ms</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012035703.png" alt="image-20230310012035703"></p>
<h3 id="_16-常用构造" tabindex="-1"><a class="header-anchor" href="#_16-常用构造" aria-hidden="true">#</a> 16-常用构造</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012219978.png" alt="image-20230310012219978"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012257883.png" alt="image-20230310012257883"></p>
<h3 id="_17-常用成员方法" tabindex="-1"><a class="header-anchor" href="#_17-常用成员方法" aria-hidden="true">#</a> 17-常用成员方法</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012342608.png" alt="image-20230310012342608"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310012545022.png" alt="image-20230310012545022"></p>
<blockquote>
<p>append方法调用后返回的是调用该方法的StringBuilder对象的本身，所以可以链式调用。</p>
</blockquote>
<h3 id="_18-stringbuilder提高效率的原理图" tabindex="-1"><a class="header-anchor" href="#_18-stringbuilder提高效率的原理图" aria-hidden="true">#</a> 18-StringBuilder提高效率的原理图</h3>
<p>不用StringBuilder，用加号拼接，每次加号都会创建一个StringBuilder对象和一个String(因为接收的引用类型是String，所以会自动调用toString()方法)对象</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310013322142.png" alt="image-20230310013322142"></p>
<p>使用加号后，只会有一个StringBuilder对象，需要使用String，调用toString()方法即可</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310013507852.png" alt="image-20230310013507852"></p>
<h2 id="_5-1-arraylist" tabindex="-1"><a class="header-anchor" href="#_5-1-arraylist" aria-hidden="true">#</a> 5-1 ArrayList</h2>
<h3 id="_01-为什么用集合" tabindex="-1"><a class="header-anchor" href="#_01-为什么用集合" aria-hidden="true">#</a> 01-为什么用集合？</h3>
<p>数组不能动态改变大小，需要增加新数据时不能动态扩容。</p>
<p>集合特点：提供存储空间可变的存储模型，存储的数据容量可以发生改变。</p>
<p>集合和数组的区别：</p>
<ul>
<li>共同点：都是存储数据的容器</li>
<li>不同点：数组的容量是固定的，集合的容量是可变的。</li>
</ul>
<h3 id="_02-arraylist的构造方法和添加方法" tabindex="-1"><a class="header-anchor" href="#_02-arraylist的构造方法和添加方法" aria-hidden="true">#</a> 02-ArrayList的构造方法和添加方法</h3>
<p>简介：List接口的可调整大小的<span style="background-color:pink;">数组</span>实现。实现所有可选的列表操作，并允许所有元素，包括null。除了实现List接口之外，该类还提供了一些方法来操作内部用于存储列表的数组的大小。（该类大致等同于Vector，只是它是<span style="background-color:pink;">非同步</span>(线程不安全)的。）</p>
<p>构造方法：</p>
<table>
<thead>
<tr>
<th>构造方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>ArrayList()</td>
<td>构造一个初始容量为<span style="background-color:pink;">10</span>的空列表。(当超过容量时会自动扩容)</td>
</tr>
<tr>
<td>ArrayList(int initialCapacity)</td>
<td>指定容量</td>
</tr>
<tr>
<td>ArrayList(Collection&lt;?  extends E&gt; c)</td>
<td>按照集合的迭代器返回的顺序构造一个包含指定集合元素的列表。</td>
</tr>
</tbody>
</table>
<p>泛型如果不写，默认Object。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313214324735.png" alt="image-20230313214324735"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230313214711977.png" alt="image-20230313214711977"></p>
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
<h2 id="_7-1面向对象进阶-分类和static" tabindex="-1"><a class="header-anchor" href="#_7-1面向对象进阶-分类和static" aria-hidden="true">#</a> 7-1面向对象进阶-分类和static</h2>
<h3 id="_01-分类思想概述" tabindex="-1"><a class="header-anchor" href="#_01-分类思想概述" aria-hidden="true">#</a> 01-分类思想概述</h3>
<p>分工协作、专人干专事。</p>
<h2 id="_02-分类思想之黑马信息管理系统" tabindex="-1"><a class="header-anchor" href="#_02-分类思想之黑马信息管理系统" aria-hidden="true">#</a> 02-分类思想之黑马信息管理系统</h2>
<ul>
<li>Student类 标准学生类,封装键盘录入的学生信息(id , name , age , birthday)</li>
<li>StudentDao类 Dao : (Data Access Object 缩写) 用于访问存储数据的数组或集合</li>
<li>StudentService类 用来进行业务逻辑的处理(例如: 判断录入的id是否存在)</li>
<li>StudentController类 和用户打交道(接收用户需求,采集用户信息,打印数据到控制台)</li>
</ul>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230316002216534.png" alt="image-20230316002216534"></p>
<h3 id="_03-分包思想" tabindex="-1"><a class="header-anchor" href="#_03-分包思想" aria-hidden="true">#</a> 03-分包思想</h3>
<p>如果将所有的类文件都放在同一个包下,不利于管理和后期维护,所以,对于<span style="background-color:pink;">不同功能的类文件,可以放在不同的包下</span>进行管理</p>
<ul>
<li>
<p>包</p>
<p>本质上就是文件夹</p>
</li>
<li>
<p>创建包</p>
<p>多级包之间使用 &quot; . &quot; 进行分割
多级包的定义规范：公司的网站地址翻转(去掉www)
比如：我的网站址为www.iocaop.com
后期我们所定义的包的结构就是：com.iocaop.其他的包名</p>
</li>
<li>
<p>包的命名规则</p>
<p><span style="background-color:pink;">字母都是小写</span></p>
</li>
</ul>
<h3 id="_04-包的注意事项、类之间的访问" tabindex="-1"><a class="header-anchor" href="#_04-包的注意事项、类之间的访问" aria-hidden="true">#</a> 04-包的注意事项、类之间的访问</h3>
<p>包的注意事项：</p>
<ul>
<li>package语句必须是程序的第一条可执行的代码</li>
<li>package语句在一个java文件中<span style="background-color:pink;">只能有一个 </span></li>
<li><span style="background-color:pink;">如果没有package,默认表示无包名 (如果类在某个包下，必须有package，否则报错，反之亦然，不在包下，不能有package)</span></li>
</ul>
<p>类之间的访问：</p>
<ul>
<li>
<p>同一个包下的访问</p>
<p>不需要导包，直接使用即可</p>
</li>
<li>
<p>不同包下的访问</p>
<p>1.import 导包后访问</p>
<p>2.通过全类名（包名 + 类名）访问</p>
</li>
<li>
<p>注意：import 、package 、class 三个关键字的摆放位置存在顺序关系</p>
<p>package 必须是程序的<span style="background-color:pink;">第一条可执行的</span>代码</p>
<p><span style="background-color:pink;">import 需要写在 package 下面</span></p>
<p><span style="background-color:pink;">class 需要在 import 下面</span></p>
</li>
</ul>
<h3 id="_05-07学生信息管理系统" tabindex="-1"><a class="header-anchor" href="#_05-07学生信息管理系统" aria-hidden="true">#</a> 05-07学生信息管理系统</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230316004248204.png" alt="image-20230316004248204"></p>
<p>需求说明：</p>
<ul>
<li>
<p>添加学生: 键盘录入学生信息(id，name，age，birthday)</p>
<p>使用数组存储学生信息,要求学生的id不能重复</p>
</li>
<li>
<p>删除学生: 键盘录入要删除学生的id值,将该学生从数组中移除,如果录入的id在数组中不存在,需要重新录入</p>
</li>
<li>
<p>修改学生: 键盘录入要修改学生的id值和修改后的学生信息</p>
<p>将数组中该学生的信息修改,如果录入的id在数组中不存在,需要重新录入</p>
</li>
<li>
<p>查询学生: 将数组中存储的所有学生的信息输出到控制台</p>
</li>
</ul>
<p>分包：<span style="background-color:pink;">这里只是简单的项目，不是Spring三层架构项目，主要目的是学习分类、分包思想</span>。</p>
<table>
<thead>
<tr>
<th>包</th>
<th>存储的类</th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>com.lzc.edu.info.manager.domain</td>
<td>Student.java</td>
<td>封装学生信息</td>
</tr>
<tr>
<td>com.lzc.edu.info.manager.dao</td>
<td>StudentDao.java</td>
<td>访问存储数据的数组，进行赠删改查（库管）</td>
</tr>
<tr>
<td>com.lzc.edu.info.manager.service</td>
<td>StudentService.java</td>
<td>业务的逻辑处理（业务员）</td>
</tr>
<tr>
<td>com.lzc.edu.info.manager.controller</td>
<td>StudentController.java</td>
<td>和用户打交道（客服接待）</td>
</tr>
<tr>
<td>com.lzc.edu.info.manager.entry</td>
<td>InfoManagerEntry.java</td>
<td>程序的入口类，提供一个main方法</td>
</tr>
</tbody>
</table>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230316235654799.png" alt="image-20230316235654799"></p>
<p>启动菜单的打印，循环可以用标号跳出：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230317000324329.png" alt="image-20230317000324329"></p>
<h3 id="_11-12问题分析、static的引出" tabindex="-1"><a class="header-anchor" href="#_11-12问题分析、static的引出" aria-hidden="true">#</a> 11-12问题分析、static的引出</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230317003101654.png" alt="image-20230317003101654"></p>
<p>两次添加学生， 调用了两次addStudent()方法，在方法中new了StudentService，也就是有两个studentService对象，这两个studentService中有各自的成员变量studentDao(有两个)，自然就有了两个Student数组，所以无法判断学号是否重复。这里可以使用<code v-pre>static</code>关键字解决这个问题。</p>
<blockquote>
<p>这里只是简单的类，在Spring中，Bean默认是单例模式，而且也不会这样使用成员变量，而是自动装配的，都是同一个。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230317003530765.png" alt="image-20230317003530765"></p>
<h3 id="_12-static关键字的特点" tabindex="-1"><a class="header-anchor" href="#_12-static关键字的特点" aria-hidden="true">#</a> 12-static关键字的特点</h3>
<ul>
<li>
<p>被类的所有对象共享</p>
<p>是我们判断是否使用静态关键字的条件</p>
</li>
<li>
<p>随着类的加载而加载，优先于对象存在</p>
<p>对象需要类被加载后，才能创建</p>
</li>
<li>
<p>可以通过类名调用</p>
<p>也可以通过对象名调用(<span style="background-color:pink;">编译器优化，最终class代码会替换成类名调用</span>)</p>
</li>
</ul>
<h3 id="_13-static注意事项" tabindex="-1"><a class="header-anchor" href="#_13-static注意事项" aria-hidden="true">#</a> 13-static注意事项</h3>
<ul>
<li>
<p>静态方法只能访问静态的成员</p>
<blockquote>
<p>静态方法为什么不能非静态成员？没有this指针，不知道是哪个对象的静态成员。</p>
</blockquote>
</li>
<li>
<p>非静态方法可以访问静态的成员，也可以访问非静态的成员</p>
</li>
<li>
<p>静态方法中是没有this关键字 (类比对象先加载，静态方法是在方法区，实例化对象在堆区，方法区的数据先赋值，而对象还没创建，不知道this应该指向堆区哪个位置。即方法区this(假设有this)-&gt;堆区（???未知），就算满足顺序也不合理，因为静态方法是所有对象共享的，this不知道应该指向哪个对象)</p>
</li>
</ul>
<blockquote>
<p>说到底还是加载顺序的问题。</p>
</blockquote>
<h2 id="_7-3-7-4继承" tabindex="-1"><a class="header-anchor" href="#_7-3-7-4继承" aria-hidden="true">#</a> 7-3~7-4继承</h2>
<h3 id="_01-继承入门" tabindex="-1"><a class="header-anchor" href="#_01-继承入门" aria-hidden="true">#</a> 01-继承入门</h3>
<p>根据多个类中<span style="background-color:pink;">共性</span>的内容，向上<span style="background-color:pink;">抽取</span>出来。让类之间产生父子关系，子类可以直接使用父类的非私有成员(方法和变量)。</p>
<h3 id="_02-继承的好处和坏处" tabindex="-1"><a class="header-anchor" href="#_02-继承的好处和坏处" aria-hidden="true">#</a> 02-继承的好处和坏处</h3>
<p>好处：</p>
<ul>
<li>提高代码复用性(抽取共性写在父类，子类继承父类，子类编写特性即可，共性只需要编写一次)</li>
<li>提高了代码的维护性(当需要对共性进行修改时，只需要修改父类即可，不需要去子类多次修改)。</li>
<li>让类之间产生了关系，是<span style="background-color:pink;">多态的前提</span>。</li>
</ul>
<p>坏处：</p>
<ul>
<li>继承是侵入性的</li>
<li>降低了代码的灵活性(继承导致子类<span style="background-color:pink;">必须有</span>父类的非私有方法和属性，约束了子类。)</li>
<li>增强了代码的耦合性(代码和代码之间存在关联，耦合，耦合性太强，导致关系紧密，维护麻烦。)</li>
</ul>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230318021610041.png" alt="image-20230318021610041"></p>
<p>什么时候使用继承？</p>
<p>类与类之间存在共性内容，并且产生了<span style="background-color:pink;">is a</span>的关系，就可以考虑使用继承。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230318021759816.png" alt="image-20230318021759816"></p>
<h3 id="_03-继承的特点" tabindex="-1"><a class="header-anchor" href="#_03-继承的特点" aria-hidden="true">#</a> 03-继承的特点</h3>
<ul>
<li>Java只支持单继承(子类只能继承一个父类)，<span style="background-color:pink;">不支持多继承</span>(子类不能同时继承多个父类)，但<span style="background-color:pink;">支持多层继承</span>(A继承B，B继承C)。</li>
</ul>
<p>java为什么不支持多继承？</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230320225931557.png" alt="image-20230320225931557"></p>
<h3 id="_04-继承中成员变量的访问特点" tabindex="-1"><a class="header-anchor" href="#_04-继承中成员变量的访问特点" aria-hidden="true">#</a> 04-继承中成员变量的访问特点</h3>
<p>子类和父类中出现重名的成员变量，会使用子类的成员变量，如果子类的成员方法还有重名，就会使用方法中定义的变量，<span style="background-color:pink;">就近原则</span>，可以使用<span style="background-color:pink;">this和super</span>进行调用子类或父类的成员变量。</p>
<h3 id="_05-this和super访问成员的格式" tabindex="-1"><a class="header-anchor" href="#_05-this和super访问成员的格式" aria-hidden="true">#</a> 05-this和super访问成员的格式</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230320230606783.png" alt="image-20230320230606783"></p>
<h3 id="_06-继承中成员方法的访问特点" tabindex="-1"><a class="header-anchor" href="#_06-继承中成员方法的访问特点" aria-hidden="true">#</a> 06-继承中成员方法的访问特点</h3>
<p>通过子类对象访问方法，会先到子类成员范围中找，如果没有再到父类成员方法范围中找。也是可以用this和super进行区分调用。</p>
<h3 id="_07-方法重写概述和应用场景" tabindex="-1"><a class="header-anchor" href="#_07-方法重写概述和应用场景" aria-hidden="true">#</a> 07-方法重写概述和应用场景</h3>
<p>重写：在继承体系中，子类出现了和父类<span style="background-color:pink;">一模一样</span>(参数类型、个数，返回值，方法名)的方法声明。</p>
<p>使用场景：子类需要父类的功能，而功能主体子类有自己特有的内容，可以重写父类方法，保留父类功能，又定义了子类特有的内容(可以在子类重写的方法中使用super调用父类的方法，再接着写新增的内容)。</p>
<blockquote>
<p>重载：在同一个类中，方法名相同，参数列表不同，与返回值无关。</p>
</blockquote>
<h3 id="_08-方法重写注意事项" tabindex="-1"><a class="header-anchor" href="#_08-方法重写注意事项" aria-hidden="true">#</a> 08-方法重写注意事项</h3>
<ul>
<li>父类中私有方法不能被重写</li>
<li>父类的<span style="background-color:pink;">静态方法</span>，子类必须通过静态方法&quot;重写&quot;(现象看起来是重写)，<span style="background-color:pink;">非静态方法</span>也必须通过非静态方法重写。</li>
</ul>
<blockquote>
<p>注意：<span style="background-color:pink;">静态方法不能被重写</span>，如果子类也存在和父类方法声明一模一样的方法，可以理解为子类将父类中同名的方法隐藏了起来，并非重写。</p>
</blockquote>
<ul>
<li>子类重写父类方法时，<span style="background-color:pink;">访问权限必须大于父类</span></li>
</ul>
<h3 id="_09-权限修饰符" tabindex="-1"><a class="header-anchor" href="#_09-权限修饰符" aria-hidden="true">#</a> 09-权限修饰符</h3>
<p>用来修饰成员变量、成员方法、构造方法。</p>
<p>权限修饰符：(无关类：没有继承关系的类)</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230320232406356.png" alt="image-20230320232406356"></p>
<h3 id="_10-继承中构造方法的访问特点" tabindex="-1"><a class="header-anchor" href="#_10-继承中构造方法的访问特点" aria-hidden="true">#</a> 10-继承中构造方法的访问特点</h3>
<p>每次创建子类对象，都会执行父类的构造方法，并且是优先于子类的构造方法。</p>
<blockquote>
<p>为什么？子类初始化之前，一定要完成父类的初始化，假设父类A有成员变量a=10，子类B没有该变量，在子类要使用a，肯定要父类先初始化完成才能用。数据的初始化是在构造方法执行时进行的。</p>
</blockquote>
<p><span style="background-color:pink;">系统在每一个构造方法中，都默认隐藏了一句代码super()，调用父类的无参构造方法。</span>就算不写，也会自动带上。如果没有手动继承哪个类，也会有这个spuer()，因为java中所有类都继承了Object类。</p>
<h3 id="_11-继承中构造方法的访问特点-父类中没有无参构造方法" tabindex="-1"><a class="header-anchor" href="#_11-继承中构造方法的访问特点-父类中没有无参构造方法" aria-hidden="true">#</a> 11-继承中构造方法的访问特点-父类中没有无参构造方法</h3>
<blockquote>
<p>如果一个类被public修饰，那类名必须与文件名保持一致。所以一个java文件中只能有一个public修饰的类。</p>
</blockquote>
<p>如果父类没有无参构造，在new子类对象时，会出现错误，那么我们需要在子类构造中手动加上super(有参)，手动调用父类的有参构造。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230321000519738.png" alt="image-20230321000519738"></p>
<p>以上代码中，子类无参构造，系统不会自动帮我们加上spuer()，因为this(...)和super(...)都必须在构造方法的第一行，会冲突。</p>
<h3 id="_12-继承中成员变量的内存图解" tabindex="-1"><a class="header-anchor" href="#_12-继承中成员变量的内存图解" aria-hidden="true">#</a> 12-继承中成员变量的内存图解</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230321001138816.png" alt="image-20230321001138816"></p>
<blockquote>
<p>父类成员变量name和age是私有的，为什么会在子类对象中？所谓的私有指的是在子类没法直接使用，但是会被继承过来，可以通过get()，set()方法使用。</p>
</blockquote>
</div></template>


