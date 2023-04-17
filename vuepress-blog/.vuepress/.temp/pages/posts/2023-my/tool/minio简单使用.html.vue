<template><div><p>参考文章：<a href='https://juejin.cn/post/7131692039493648414'>点击跳转</a>，<a href='https://juejin.cn/post/7132852449244610574'>点击跳转</a></p>
<p>中文文档：<a href='http://docs.minio.org.cn/minio/baremetal/'>点击跳转</a></p>
<p>教程：黑马博学谷-JavaEE在线就业班2022年+中级进修课-阶段六-黑马头条项目-MinIO</p>
<h2 id="p1-minio简介" tabindex="-1"><a class="header-anchor" href="#p1-minio简介" aria-hidden="true">#</a> p1-minio简介</h2>
<p>文件的存储方式有很多，如下：</p>
<table>
<thead>
<tr>
<th>存储方式</th>
<th>优点</th>
<th>缺点</th>
</tr>
</thead>
<tbody>
<tr>
<td>服务器磁盘</td>
<td>开发便捷、成本低</td>
<td>扩展困难</td>
</tr>
<tr>
<td>分布式文件系统</td>
<td>容易实现扩容</td>
<td>复杂度高</td>
</tr>
<tr>
<td>第三方存储</td>
<td>开发简单、功能强大、免维护</td>
<td>收费</td>
</tr>
</tbody>
</table>
<p>分布式文件存储系统：</p>
<table>
<thead>
<tr>
<th>存储方式</th>
<th>优点</th>
<th>缺点</th>
</tr>
</thead>
<tbody>
<tr>
<td>FastDFS</td>
<td>1.主备服务，高可用<br />2.支持主从文件，支持自定义扩展名<br />3.支持动态扩容</td>
<td>1.没有完备的官方文档，近几年没有更新<br />2.环境搭建比较麻烦</td>
</tr>
<tr>
<td>MinIO</td>
<td>1.性能高，准硬件条件下它能达到55GB/s的读、35GB/s的写速率<br />2.部署自带管理界面<br />3.MinIO.Inc运营开源项目，社区活跃度高<br />4.提供了所有主流开发语言的SDK</td>
<td>1.不支持动态增加节点</td>
</tr>
</tbody>
</table>
<h2 id="p2-minio环境搭建" tabindex="-1"><a class="header-anchor" href="#p2-minio环境搭建" aria-hidden="true">#</a> p2-MinIO环境搭建</h2>
<p>简单使用，直接docker安装：</p>
<p>拉取镜像：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull minio/minio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行容器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000  <span class="token parameter variable">--name</span> minio <span class="token parameter variable">-d</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">-e</span> <span class="token string">"MINIO_ACCESS_KEY=minio"</span> <span class="token parameter variable">-e</span> <span class="token string">"MINIO_SECRET_KEY=minio123"</span> <span class="token parameter variable">-v</span> /home/data:/data <span class="token parameter variable">-v</span> /home/config:/root/.minio minio/minio server /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


