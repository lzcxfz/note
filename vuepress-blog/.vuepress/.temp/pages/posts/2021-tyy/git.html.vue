<template><div><p>命令</p>
<ul>
<li>
<p>git init 当前目录做仓库</p>
</li>
<li>
<p>git init dir 创建dir目录做仓库</p>
</li>
<li>
<p>git add *.c 将后缀为.c的文件纳入版本控制。</p>
</li>
<li>
<p>git commit -m '描述' 提交操作</p>
</li>
<li>
<p>git config --list 显示配置信息</p>
</li>
<li>
<p>git config -e  编辑当前仓库配置</p>
</li>
<li>
<p>git config -e --global 编辑所有仓库配置</p>
</li>
<li>
<p>git config --global user.name &quot;赖卓成&quot;</p>
</li>
<li>
<p>git config --global user.email &quot;911823616@qq.com&quot;</p>
</li>
</ul>
<p>工作区、暂存区、本地仓库、远程仓库</p>
<p><img src="https://www.runoob.com/wp-content/uploads/2015/02/git-command.jpg" alt="img"></p>
<p>基本操作</p>
<ul>
<li>git status  查看仓库状态，显示有变更的文件。</li>
<li>git diff  file 比较文件的不同，工作区和暂存区的差异。</li>
<li>git branch 列出分支</li>
<li>git branch branchname 创建分支</li>
<li>git branch branchname 切换分支，当你切换分支的时候，Git 会用该分支的最后提交的快照替换你的工作目录的内容， 所以多个分支不需要多个目录。</li>
<li>git checkout -b branchname [branchname]  [基于某分支]创建分支并且切换到该分支。</li>
<li>git merge  branchname分支合并</li>
<li>git log 查看历史提交记录</li>
<li>git blame file 查看指定文件修改记录</li>
<li>git fetch 从远程获取代码库</li>
<li>git pull 从远程获取代码库、和本地合并</li>
</ul>
<p>rebase</p>
<ul>
<li>git rebase -i branchname 打开分支互动界面。
<ul>
<li>pick 正常选中</li>
<li>reword 选中，并且修改提交信息</li>
<li>edit 选中，rebase时会暂停，允许修改这个commit</li>
<li>squash 选中，会将当前commit与上一个commit合并</li>
<li>fixup 与squash相同，但是不会报错当前commit的提交信息</li>
<li>exec：执行其他shell命令</li>
</ul>
</li>
</ul>
</div></template>


