<template><div><p>课程地址：<a href = 'https://www.bilibili.com/video/BV18E411x7eT/?p=3&spm_id_from=pageDriver&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a></p>
<p>参考笔记：<a href = 'https://blog.csdn.net/u011863024/article/details/114298270'>点击跳转</a></p>
<h2 id="p3-boot与cloud版本选型" tabindex="-1"><a class="header-anchor" href="#p3-boot与cloud版本选型" aria-hidden="true">#</a> p3-Boot与Cloud版本选型</h2>
<p>Cloud版本是伦敦地铁站A-Z依次排序来的，Boot需要使用特定版本的，官网有写：</p>
<p>官网查看：<a href = 'https://spring.io/projects/spring-cloud'>点击跳转</a></p>
<p><img src="http://www.iocaop.com/images/2022-10/202210091843376.png" alt="image-20221009184355279"></p>
<p>更详细的查看地址：<a href = 'https://start.spring.io/actuator/info'>点击跳转</a></p>
<h2 id="p4-cloud组件" tabindex="-1"><a class="header-anchor" href="#p4-cloud组件" aria-hidden="true">#</a> p4-Cloud组件</h2>
<p><img src="http://www.iocaop.com/images/2022-10/202210091901874.png" alt="image-20221009190145791"></p>
<h2 id="p5-父工程创建" tabindex="-1"><a class="header-anchor" href="#p5-父工程创建" aria-hidden="true">#</a> p5-父工程创建</h2>
<p>创建好工程以后，需要设置idea，</p>
<p>字符编码设置：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210102121661.png" alt="image-20221010212140569"></p>
<p>注解生效：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210102122396.png" alt="image-20221010212221346"></p>
<p>过滤idea自带文件：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210102123462.png" alt="image-20221010212303418"></p>
<h2 id="p6-pom依赖导入" tabindex="-1"><a class="header-anchor" href="#p6-pom依赖导入" aria-hidden="true">#</a> p6-pom依赖导入</h2>
<p>需要注意boot版本和cloud版本对应,下面是课程源码复制过来的：</p>
<p>关于spring-boot-dependencies和spring-boot-starter-parent，参考：<a href='https://zhuanlan.zhihu.com/p/367788636'>点击跳转</a></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 统一管理jar包版本 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.build.sourceEncoding</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.build.sourceEncoding</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>junit.version</span><span class="token punctuation">></span></span>4.12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>junit.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>log4j.version</span><span class="token punctuation">></span></span>1.2.17<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>log4j.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>lombok.version</span><span class="token punctuation">></span></span>1.18.12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>lombok.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mysql.version</span><span class="token punctuation">></span></span>5.1.47<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mysql.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>druid.version</span><span class="token punctuation">></span></span>1.1.16<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>druid.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mybatis.spring.boot.version</span><span class="token punctuation">></span></span>1.3.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mybatis.spring.boot.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 子模块继承之后，提供作用：锁定版本+子modlue不用写groupId和version  --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--spring boot 2.2.2--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.2.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token comment">&lt;!--spring cloud Hoxton.SR1--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>Hoxton.SR1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token comment">&lt;!--spring cloud alibaba 2.1.0.RELEASE--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-alibaba-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.1.0.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mysql.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${druid.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis.spring.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mybatis.spring.boot.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${junit.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${log4j.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${lombok.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>fork</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>fork</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>addResources</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>addResources</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p7-dependencymanagement" tabindex="-1"><a class="header-anchor" href="#p7-dependencymanagement" aria-hidden="true">#</a> p7-dependencyManagement</h2>
<ul>
<li>只是<span style="background-color:pink;">声明</span>依赖，并<span style="background-color:pink;">不实际引入</span>，子项目按需声明使用的依赖</li>
<li>子项目可以继承父项目的 version 和 scope</li>
<li>子项目若指定了 version 和 scope，以子项目为准</li>
</ul>
<h2 id="p8-p11-支付模块构建" tabindex="-1"><a class="header-anchor" href="#p8-p11-支付模块构建" aria-hidden="true">#</a> p8~p11-支付模块构建</h2>
<p>订单模块调用支付模块：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210111924687.png" alt="image-20221011192403637"></p>
<p>创建module</p>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis.spring.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.1.10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--mysql-connector-java--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--jdbc--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8001</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource            <span class="token comment"># 当前数据源操作类型</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.gjt.mm.mysql.Driver              <span class="token comment"># mysql驱动包</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//www.iocaop.com<span class="token punctuation">:</span>3306/cloud2020<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=utf-8&amp;useSSL=false</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>

<span class="token key atrule">mybatis</span><span class="token punctuation">:</span>
  <span class="token key atrule">mapperLocations</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>mapper/<span class="token important">*.xml</span>
  <span class="token key atrule">type-aliases-package</span><span class="token punctuation">:</span> com.lzc.springcloud.entities    <span class="token comment"># 所有Entity别名类所在包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三层架构，crud，懒得记录，看源码即可。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210111907523.png" alt="image-20221011190731415"></p>
<h2 id="p12-13-订单微服务构建" tabindex="-1"><a class="header-anchor" href="#p12-13-订单微服务构建" aria-hidden="true">#</a> p12~13-订单微服务构建</h2>
<p>一个简单的springboot项目，端口80.</p>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键代码:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PAYMENT_URL</span> <span class="token operator">=</span> <span class="token string">"http://localhost:8001"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/consumer/payment/get/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">CommonResult</span> result <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span><span class="token constant">PAYMENT_URL</span> <span class="token operator">+</span> <span class="token string">"/payment/get/"</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> <span class="token class-name">CommonResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/create"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Payment</span> payment<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">CommonResult</span> result <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">postForObject</span><span class="token punctuation">(</span><span class="token constant">PAYMENT_URL</span> <span class="token operator">+</span> <span class="token string">"/payment/create"</span><span class="token punctuation">,</span> payment<span class="token punctuation">,</span>
            <span class="token class-name">CommonResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：<span style="background-color:pink;">微服务之间调用，就是基于http</span>。spring中提供了RestTemplate工具来发起http连接，封装了httpClient，方便一点。</p>
<p>所以我们模拟订单模块调用支付模块，就是用户端-&gt;订单模块-&gt;支付模块。并且，使用RestTemplate调用时报错，也能在消费端拿到错误信息(http请求响应信息)：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210112017389.png" alt="image-20221011201724278"></p>
<h2 id="p14-工程重构" tabindex="-1"><a class="header-anchor" href="#p14-工程重构" aria-hidden="true">#</a> p14-工程重构</h2>
<p>把实体类抽离出来。</p>
<p>创建module，导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.8.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把订单微服务和支付微服务里面entities包移动到common里面，再把common打包成jar。并在其他模块导入。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210112038656.png" alt="image-20221011203843554"></p>
<h2 id="p15-eureka基础知识" tabindex="-1"><a class="header-anchor" href="#p15-eureka基础知识" aria-hidden="true">#</a> p15 Eureka基础知识</h2>
<p>为什么需要Eureka注册与发现？直接服务之间调用不行吗？</p>
<p>服务治理：Spring Cloud封装了NetFlix公司开发的Eureka模块来<span style="background-color:pink;">实现服务治理</span>，传统的rpc远程调用框架中，服务之间依赖关系复杂，不好管理，管理服务之间的关系可以实现服务调用、负载均衡、容错、服务发现与注册等。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210112102941.png" alt="image-20221011210241867"></p>
<p>系统中的微服务使用Eureka的客户端连接到 Eureka Server并维持心跳连接，这样系统的维护人员就可以通过Eureka Server来<span style="background-color:pink;">监控</span>系统中各个微服务是否正常运行。</p>
<h3 id="eureka-server提供服务注册服务" tabindex="-1"><a class="header-anchor" href="#eureka-server提供服务注册服务" aria-hidden="true">#</a> <strong>Eureka Server</strong>提供服务注册服务</h3>
<p>各个微服务节点通过配置启动后，会在EurekaServer中进行注册，这样EurekaServer中的服务注册表中将会<span style="background-color:pink;">存储所有可用服务节点的信息</span>，服务节点的信息可以在界面中直观看到。</p>
<h3 id="eurekaclient通过注册中心进行访问" tabindex="-1"><a class="header-anchor" href="#eurekaclient通过注册中心进行访问" aria-hidden="true">#</a> <strong>EurekaClient</strong>通过注册中心进行访问</h3>
<p>一个Java客户端，客户端同时也具备一个内置的、使用轮询(round-robin)负载算法的负载均衡器。在应用启动后，将会向Eureka Server发送心跳(默认周期为30秒)。如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，EurekaServer将会从服务注册表中把这个服务节点移除（默认90秒)</p>
<h2 id="p16-eureka-server安装" tabindex="-1"><a class="header-anchor" href="#p16-eureka-server安装" aria-hidden="true">#</a> p16-Eureka Server安装</h2>
<p>创建module，导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--eureka-server--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-eureka-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--boot web actuator--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--一般通用配置--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7001</span>

<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> eureka7001.com <span class="token comment">#eureka服务端的实例名称</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>     <span class="token comment">#false表示不向注册中心注册自己。</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>     <span class="token comment">#false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment">#集群指向其它eureka</span>
      <span class="token comment">#defaultZone: http://eureka7002.com:7002/eureka/</span>
      <span class="token comment">#单机就是7001自己</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka7001.com<span class="token punctuation">:</span>7001/eureka/
    <span class="token comment">#server:</span>
    <span class="token comment">#关闭自我保护机制，保证不可用服务被及时踢除</span>
    <span class="token comment">#enable-self-preservation: false</span>
    <span class="token comment">#eviction-interval-timer-in-ms: 2000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableEurekaServer</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EurekaServer7001</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">EurekaServer7001</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：需要@EnableEurekaServer注解。</p>
</blockquote>
<p>打开服务地址：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210112201710.png" alt="image-20221011220151595"></p>
<h2 id="p17-支付微服务8001入驻eurekaserver" tabindex="-1"><a class="header-anchor" href="#p17-支付微服务8001入驻eurekaserver" aria-hidden="true">#</a> p17-支付微服务8001入驻eurekaServer</h2>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--eureka-client--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类加注解</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableEurekaClient</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置文件添加：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment"># 是否注册</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 注册中心的地址</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登录注册中心可以看到：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210112212981.png" alt="image-20221011221252876"></p>
<h2 id="p18-订单微服务80入驻eurekaserver" tabindex="-1"><a class="header-anchor" href="#p18-订单微服务80入驻eurekaserver" aria-hidden="true">#</a> p18-订单微服务80入驻eurekaServer</h2>
<p>和上面一样的操作，启动订单微服务后可以在注册中心看到：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210112222325.png" alt="image-20221011222227194"></p>
<p>注意：需要指定微服务的名称</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>order<span class="token punctuation">-</span>service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p19-eureka集群说明" tabindex="-1"><a class="header-anchor" href="#p19-eureka集群说明" aria-hidden="true">#</a> p19-Eureka集群说明</h2>
<h3 id="eureka集群原理说明" tabindex="-1"><a class="header-anchor" href="#eureka集群原理说明" aria-hidden="true">#</a> Eureka集群原理说明</h3>
<p><img src="http://www.iocaop.com/images/2022-10/202210112228590.png" alt="image-20221011222841492"></p>
<p>问题:微服务RPC远程服务调用最核心的是什么？</p>
<p>高可用，如果只有一个注册中心，那它挂了，就会影响整个系统。</p>
<p>解决办法：搭建Eureka注册中心集群，实现负载均衡+故障容错。</p>
<p>集群注册中心用一句话形容：<strong>互相注册，相互守望</strong>。</p>
<h2 id="p20-eureka集群环境构建" tabindex="-1"><a class="header-anchor" href="#p20-eureka集群环境构建" aria-hidden="true">#</a> p20-Eureka集群环境构建</h2>
<p>先改hosts，后面要用：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>127.0.0.1 eureka7001.com
127.0.0.1 eureka7002.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-10/202210121255072.png" alt="image-20221012125542027"></p>
<p>再创建一个eurekaServer的module，步骤和EurekaServer7001一样，只是了地址信息。需要在配置文件中，将当前注册中心服务注册到其他注册中心:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7001</span>

<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> eureka7001.com <span class="token comment">#eureka服务端的实例名称</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>     <span class="token comment">#false表示不向注册中心注册自己。</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>     <span class="token comment">#false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment">#集群指向其它eureka</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka7002.com<span class="token punctuation">:</span>7002/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7002</span>

<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> eureka7002.com <span class="token comment">#eureka服务端的实例名称</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>     <span class="token comment">#false表示不向注册中心注册自己。</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>     <span class="token comment">#false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment">#集群指向其它eureka</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka7001.com<span class="token punctuation">:</span>7001/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后就可以看到：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121253512.png" alt="image-20221012125326415"></p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121253165.png" alt="image-20221012125349088"></p>
<h2 id="p21-将支付、订单微服务注册到eureka集群" tabindex="-1"><a class="header-anchor" href="#p21-将支付、订单微服务注册到eureka集群" aria-hidden="true">#</a> p21-将支付、订单微服务注册到Eureka集群</h2>
<p>原来只有7001这一个Eureka注册中心，现在又加了一个7002，所以微服务注册时，需要在这两个注册中心都进行注册， 只需要修改配置文件，在原来的基础上加一条即可，逗号隔开：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121258447.png" alt="image-20221012125856388"></p>
<p>两个微服务都加上以后，启动，可以在7001注册中心和7002注册中心都看到：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121300698.png" alt="image-20221012130052618"></p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121301164.png" alt="image-20221012130104081"></p>
<h2 id="p22-支付微服务集群配置" tabindex="-1"><a class="header-anchor" href="#p22-支付微服务集群配置" aria-hidden="true">#</a> p22-支付微服务集群配置</h2>
<p>现在注册中心是集群的了。但是业务微服务(支付、订单)还不是集群，所以业务微服务也要是集群才能实现高可用。</p>
<p>新建一个支付微服务module，和8001基本一致，只是改了端口为8002。</p>
<p>在controller里面加上返回当前服务端口号的代码，启动，可以在两台注册中心看到支付服务是集群的：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121313115.png" alt="image-20221012131307009"></p>
<p>自测一下，两台都是可以用的，那么我们启动订单微服务，通过订单微服务来调用这两台支付微服务，会发现订单微服务调用的始终是8001，因为我们在调用时通过RestTemplate来发起http请求，地址是写死的。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121319024.png" alt="image-20221012131924929"></p>
<p>所以我们不能写死服务地址。修改订单微服务中的地址：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//    public static final String PAYMENT_URL = "http://localhost:8001";</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PAYMENT_URL</span> <span class="token operator">=</span> <span class="token string">"http://cloud-payment-service/"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>重启订单微服务，发现报错，因为将地址改成了服务名称以后，服务是集群的，RestTemplate不知道应该访问哪一个，还要在配置类加上注解@LoadBalanced注解赋予RestTemplate负载均衡的能力：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在订单微服务就会负载均衡(默认轮询)地调用支付微服务了。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121329813.png" alt="image-20221012132946718"></p>
<h2 id="p23-actuator服务信息完善" tabindex="-1"><a class="header-anchor" href="#p23-actuator服务信息完善" aria-hidden="true">#</a> p23-actuator服务信息完善</h2>
<p>健康检查，配置文件给每个微服务加上id：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121340537.png" alt="image-20221012134052475"></p>
<p>在注册中心就可以看到：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121341276.png" alt="image-20221012134122218"></p>
<p>在加上ip端口显示：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> payment8001
    <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在注册中心就可以看到各个服务的具体ip和端口号：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121345232.png" alt="image-20221012134513167"></p>
<h2 id="p24-服务发现discovery" tabindex="-1"><a class="header-anchor" href="#p24-服务发现discovery" aria-hidden="true">#</a> p24-服务发现Discovery</h2>
<p>对于注册进eureka里面的微服务，可以通过服务发现来获得该服务的信息。</p>
<p>在支付微服务8001加一个接口来测试：</p>
<p>启动类加注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableDiscoveryClient</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">DiscoveryClient</span> discoveryClient<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/payment/discovry"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">discovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取所有服务</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> services <span class="token operator">=</span> discoveryClient<span class="token punctuation">.</span><span class="token function">getServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> service <span class="token operator">:</span> services<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            discoveryClient<span class="token punctuation">.</span><span class="token function">getInstances</span><span class="token punctuation">(</span>service<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>instance <span class="token operator">-></span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"服务名: {}, 主机: {}, 端口: {}, uri: {}"</span><span class="token punctuation">,</span> service<span class="token punctuation">,</span> instance<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> instance<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    instance<span class="token punctuation">.</span><span class="token function">getUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> discoveryClient<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-10/202210121357445.png" alt="image-20221012135730379"></p>
<h2 id="p25-eureka自我保护" tabindex="-1"><a class="header-anchor" href="#p25-eureka自我保护" aria-hidden="true">#</a> p25-Eureka自我保护</h2>
<p>某时刻某一个微服务不可用了，Eureka<span style="background-color:pink;">不会立刻清理</span>，依旧会对该微服务的信息进行保存。</p>
<p><strong>为什么会产生Eureka自我保护机制?</strong></p>
<p>为了EurekaClient可以正常运行，防止与EurekaServer网络不通情况下，EurekaServer不会立刻将EurekaClient服务剔除。</p>
<p>当网络分区故障发生(延时、卡顿、拥挤)时，微服务与EurekaServer之间无法正常通信，微服务本身其实是健康的，此时不应该注销这个微服务。</p>
<p>自我保护：当EurekaServer节点在短时间内丢失过多客户端时(可能发生了网络分区故障)，那么这个节点就会进入自我保护模式。</p>
<p>宁可保留错误的服务注册信息，也不盲目注销任何可能健康的服务实例</p>
<h2 id="p26-怎么禁止自我保护" tabindex="-1"><a class="header-anchor" href="#p26-怎么禁止自我保护" aria-hidden="true">#</a> p26-怎么禁止自我保护</h2>
<p>将Eureka调为单机模式来测试：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> eureka7001.com <span class="token comment">#eureka服务端的实例名称</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>     <span class="token comment">#false表示不向注册中心注册自己。</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>     <span class="token comment">#false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment">#集群指向其它eureka</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka7001.com<span class="token punctuation">:</span>7001/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上选定部分的代码，关闭自我保护：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121422675.png" alt="image-20221012142242611"></p>
<p>再到支付服务加上选定部分配置：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210121426082.png" alt="image-20221012142620017"></p>
<p>现在只要服务挂了，在注册中心就会删除服务信息。</p>
<h2 id="p27-eureka停更" tabindex="-1"><a class="header-anchor" href="#p27-eureka停更" aria-hidden="true">#</a> p27-Eureka停更</h2>
<p>Eureka停更了，但是还能使用。有些公司还是会用Eureka，当然也可以使用zookeeper或者consul代替。</p>
<h2 id="p28-支付微服务注册到zookeeper" tabindex="-1"><a class="header-anchor" href="#p28-支付微服务注册到zookeeper" aria-hidden="true">#</a> p28-支付微服务注册到zookeeper</h2>
<p>zookeeper是一个分布式协调工具，可以实现注册中心功能。</p>
<p>安装：<a href = 'https://blog.csdn.net/weixin_61893378/article/details/125223813'>点击跳转</a></p>
<blockquote>
<p>安装启动过程中遇到问题， zookeeper会占用8080端口，我之前nginx监听了8080端口，所以一直报错。</p>
</blockquote>
<p>新建一个支付微服务，用zookeeper来做注册中心。其他依赖和8001一致，将Eureka改成zookeeper：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-zookeeper-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">zookeeper</span><span class="token punctuation">:</span>
      <span class="token key atrule">connect-string</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">2181</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动8004，可以使用命令查看当前已注册的服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">]</span> <span class="token function">ls</span> /
<span class="token punctuation">[</span>services, zookeeper<span class="token punctuation">]</span>
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token function">ls</span> /services
<span class="token punctuation">[</span>cloud-payment-service<span class="token punctuation">]</span>
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token function">ls</span> /services/cloud-payment-service
<span class="token punctuation">[</span>0546ed78-c354-4622-86f8-53861f35b581<span class="token punctuation">]</span>
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">3</span><span class="token punctuation">]</span> get /services/cloud-payment-service/0546ed78-c354-4622-86f8-53861f35b581
<span class="token punctuation">{</span><span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"cloud-payment-service"</span>,<span class="token string">"id"</span><span class="token builtin class-name">:</span><span class="token string">"0546ed78-c354-4622-86f8-53861f35b581"</span>,<span class="token string">"address"</span><span class="token builtin class-name">:</span><span class="token string">"localhost"</span>,<span class="token string">"port"</span>:8004,<span class="token string">"sslPort"</span>:null,<span class="token string">"payload"</span>:<span class="token punctuation">{</span><span class="token string">"@class"</span><span class="token builtin class-name">:</span><span class="token string">"org.springframework.cloud.zookeeper.discovery.ZookeeperInstance"</span>,<span class="token string">"id"</span><span class="token builtin class-name">:</span><span class="token string">"application-1"</span>,<span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"cloud-payment-service"</span>,<span class="token string">"metadata"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">"registrationTimeUTC"</span>:1665578260810,<span class="token string">"serviceType"</span><span class="token builtin class-name">:</span><span class="token string">"DYNAMIC"</span>,<span class="token string">"uriSpec"</span>:<span class="token punctuation">{</span><span class="token string">"parts"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"value"</span><span class="token builtin class-name">:</span><span class="token string">"scheme"</span>,<span class="token string">"variable"</span>:true<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"value"</span><span class="token builtin class-name">:</span><span class="token string">"://"</span>,<span class="token string">"variable"</span>:false<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"value"</span><span class="token builtin class-name">:</span><span class="token string">"address"</span>,<span class="token string">"variable"</span>:true<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"value"</span><span class="token builtin class-name">:</span><span class="token string">":"</span>,<span class="token string">"variable"</span>:false<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"value"</span><span class="token builtin class-name">:</span><span class="token string">"port"</span>,<span class="token string">"variable"</span>:true<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">4</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>格式化json串：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"cloud-payment-service"</span><span class="token punctuation">,</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"0546ed78-c354-4622-86f8-53861f35b581"</span><span class="token punctuation">,</span>
    <span class="token property">"address"</span><span class="token operator">:</span> <span class="token string">"localhost"</span><span class="token punctuation">,</span>
    <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">8004</span><span class="token punctuation">,</span>
    <span class="token property">"sslPort"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">"payload"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"@class"</span><span class="token operator">:</span> <span class="token string">"org.springframework.cloud.zookeeper.discovery.ZookeeperInstance"</span><span class="token punctuation">,</span>
        <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"application-1"</span><span class="token punctuation">,</span>
        <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"cloud-payment-service"</span><span class="token punctuation">,</span>
        <span class="token property">"metadata"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"registrationTimeUTC"</span><span class="token operator">:</span> <span class="token number">1665578260810</span><span class="token punctuation">,</span>
    <span class="token property">"serviceType"</span><span class="token operator">:</span> <span class="token string">"DYNAMIC"</span><span class="token punctuation">,</span>
    <span class="token property">"uriSpec"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"parts"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"scheme"</span><span class="token punctuation">,</span>
                <span class="token property">"variable"</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"://"</span><span class="token punctuation">,</span>
                <span class="token property">"variable"</span><span class="token operator">:</span> <span class="token boolean">false</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"address"</span><span class="token punctuation">,</span>
                <span class="token property">"variable"</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">":"</span><span class="token punctuation">,</span>
                <span class="token property">"variable"</span><span class="token operator">:</span> <span class="token boolean">false</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"port"</span><span class="token punctuation">,</span>
                <span class="token property">"variable"</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p29-临时节点还是持久节点" tabindex="-1"><a class="header-anchor" href="#p29-临时节点还是持久节点" aria-hidden="true">#</a> p29-临时节点还是持久节点</h2>
<p>我们知道Eureka是有自我保护机制的，一段时间没有收到微服务发来的心跳，是不会马上删除节点信息的。但是<span style="background-color:pink;">zookeeper不一样，没收到就会马上删除</span>。</p>
<p>关闭后，马上会删除信息，重启后会分配另一个id。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210122100084.png" alt="image-20221012210036008"></p>
<h2 id="p30-订单微服务注册到zookeeper" tabindex="-1"><a class="header-anchor" href="#p30-订单微服务注册到zookeeper" aria-hidden="true">#</a> p30-订单微服务注册到zookeeper</h2>
<p>创建module，和p28的步骤类似。</p>
<p>配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>order<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">zookeeper</span><span class="token punctuation">:</span>
      <span class="token key atrule">connect-string</span><span class="token punctuation">:</span> www.iocaop.com<span class="token punctuation">:</span><span class="token number">2181</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>controller代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PAYMENT_URL</span> <span class="token operator">=</span> <span class="token string">"http://cloud-payment-service/"</span><span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/consumer/payment/zk"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span><span class="token constant">PAYMENT_URL</span> <span class="token operator">+</span> <span class="token string">"/payment/zk"</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动，可以在zookeeper看到：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210122115264.png" alt="image-20221012211541203"></p>
<p>调用也可以：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210122118066.png" alt="image-20221012211819007"></p>
<h2 id="p31-consul简介" tabindex="-1"><a class="header-anchor" href="#p31-consul简介" aria-hidden="true">#</a> p31-Consul简介</h2>
<p>官网：<a href = 'https://www.consul.io/'>点击跳转</a></p>
<p>中文文档：<a href = 'https://www.springcloud.cc/spring-cloud-consul.html'>点击跳转</a></p>
<p>安装教程：<a href = 'https://zhuanlan.zhihu.com/p/330373440'>点击跳转</a></p>
<p>能干嘛：</p>
<ul>
<li>服务发现 - 提供HTTP和DNS两种发现方式。</li>
<li>健康监测 - 支持多种方式，HTTP、TCP、Docker、Shell脚本定制化</li>
<li>KV存储 - Key、Value的存储方式</li>
<li>多数据中心 - Consul支持多数据中心</li>
<li>可视化Web界面</li>
</ul>
<p>安装启动后，进入8500端口：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210130159578.png" alt="image-20221013015912472"></p>
<h2 id="p33-微服务提供者注册到consul" tabindex="-1"><a class="header-anchor" href="#p33-微服务提供者注册到consul" aria-hidden="true">#</a> p33-微服务提供者注册到consul</h2>
<p>和其他几个支付微服务一样，依赖改成consul：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-consul-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8006</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> www.iocaop.com
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
 		<span class="token comment"># 加上心跳</span>
        <span class="token key atrule">heartbeat</span><span class="token punctuation">:</span>
         <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>订单微服务也是同样的操作，启动后可以在注册中心页面看到爆红，可能是新版本需要打开心跳，百度找到资料：<a href = 'https://blog.csdn.net/qq_27198345/article/details/115704473'>点击跳转</a></p>
<p>两个服务都注册到consul后可以看到：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210130232829.png" alt="image-20221013023245749"></p>
<p>通过订单微服务调用支付微服务也是成功的：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210130233435.png" alt="image-20221013023313367"></p>
<h3 id="p35-三个注册中心的异同点" tabindex="-1"><a class="header-anchor" href="#p35-三个注册中心的异同点" aria-hidden="true">#</a> p35-三个注册中心的异同点</h3>
<table>
<thead>
<tr>
<th>组件名称</th>
<th>语言</th>
<th>CAP</th>
<th>监控检查支持</th>
<th>对外暴露接口</th>
<th>集成Spring Cloud</th>
</tr>
</thead>
<tbody>
<tr>
<td>Eureka</td>
<td>java</td>
<td>CAP</td>
<td>可配支持</td>
<td>HTTP</td>
<td>已集成</td>
</tr>
<tr>
<td>Consul</td>
<td>go</td>
<td>AP</td>
<td>支持</td>
<td>HTTP/DNS</td>
<td>已集成</td>
</tr>
<tr>
<td>Zookeeper</td>
<td>java</td>
<td>AP</td>
<td>支持</td>
<td>客户端</td>
<td>已集成</td>
</tr>
</tbody>
</table>
<p>什么是CAP理论？</p>
<ul>
<li>C：Consistency 强一致性</li>
<li>A：Available 可用性</li>
<li>P：Partition tolerance 分区容错性</li>
</ul>
<p>CAP理论<span style="background-color:pink;">关注粒度是数据</span>，而不是系统整体设计策略。</p>
<h3 id="ap架构-eureka-自我保护机制" tabindex="-1"><a class="header-anchor" href="#ap架构-eureka-自我保护机制" aria-hidden="true">#</a> AP架构（Eureka，自我保护机制）</h3>
<p>当网络分区出现后，为了保证可用性，系统B可以返回旧值，保证系统的可用性。</p>
<p>结论：违背了一致性C的要求，只满足可用性和分区容错，即AP</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210130248633.png" alt="image-20221013024852542"></p>
<h3 id="cp架构-zookeeper-consul" tabindex="-1"><a class="header-anchor" href="#cp架构-zookeeper-consul" aria-hidden="true">#</a> CP架构（ZooKeeper/Consul）</h3>
<p>当网络分区出现后，为了保证一致性，就必须拒接请求，否则无法保证一致性。</p>
<p>结论：违背了可用性A的要求，只满足一致性和分区容错，即CP。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210130249722.png" alt="image-20221013024933641"></p>
<p>CP 与 AP 对立同一的矛盾关系。</p>
<h2 id="p36-ribbon入门介绍" tabindex="-1"><a class="header-anchor" href="#p36-ribbon入门介绍" aria-hidden="true">#</a> p36-Ribbon入门介绍</h2>
<p>客户端负载均衡的工具，主要功能是提供客户端的软件负载均衡算法和服务调用。Ribbon客户端组件提供一系列完善的配置项如连接超时，重试等。</p>
<p>列出Load Balancer后面所有的机器，Ribbon会自动的帮助你基于某种规则(如简单轮询，随机连接等）去连接这些机器，也可以自定义负载均衡算法。</p>
<p>Ribbon未来可能被Spring Cloud LoadBalacer替代，因为已经进入维护模式。</p>
<p>Ribbon就是负载均衡 + RestTemplate调用</p>
<p><strong>Ribbon本地负载均衡客户端VS Nginx服务端负载均衡区别</strong></p>
<p>Nginx是服务器负载均衡，客户端所有请求都会交给nginx，然后由nginx实现转发请求。即负载均衡是由<span style="background-color:pink;">服务端实现</span>的。
Ribbon本地负载均衡，在调用微服务接口时候，<span style="background-color:pink;">会在注册中心上获取注册信息服务列表之后缓存到JVM本地</span>，从而在本地实现RPC远程服务调用技术。</p>
<p><strong>集中式LB</strong></p>
<p>即在服务的消费方和提供方之间使用独立的LB设施(可以是硬件，如F5, 也可以是软件，如nginx)，由该设施负责把访问请求通过某种策略转发至服务的提供方;</p>
<p><strong>进程内LB</strong></p>
<p>将LB逻辑集成到消费方，消费方从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选择出一个合适的服务器。</p>
<p>Ribbon就属于进程内LB，它只是一个类库，集成于消费方进程，消费方通过它来获取到服务提供方的地址。</p>
<h2 id="p37-ribbon的负载均衡和rest调用" tabindex="-1"><a class="header-anchor" href="#p37-ribbon的负载均衡和rest调用" aria-hidden="true">#</a> p37-Ribbon的负载均衡和Rest调用</h2>
<p>Ribbon在工作时分成两步：</p>
<ul>
<li>第一步先选择EurekaServer ,它优先选择在同一个区域内负载较少的server。</li>
<li>第二步再根据用户指定的策略，在从server取到的服务注册列表中选择一个地址。</li>
</ul>
<p>为什么先前工程项目没有引入spring-cloud-starter-ribbon也可以负载均衡？</p>
<p>引入Eureka时包含了：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210130309133.png" alt="image-20221013030919055"></p>
<p>RestTemplate使用：</p>
<p>getForObject()：返回对象为响应体中数据转化成的对象，基本上可以理解为Json。</p>
<p>getForEntity()：返回对象为ResponseEntity对象，包含了响应中的一些重要信息，比如响应头、响应状态码、响应体等。</p>
<h2 id="p38-ribbon默认自带的负载均衡规则" tabindex="-1"><a class="header-anchor" href="#p38-ribbon默认自带的负载均衡规则" aria-hidden="true">#</a> p38-Ribbon默认自带的负载均衡规则</h2>
<p><img src="http://www.iocaop.com/images/2022-10/202210130318624.png" alt="image-20221013031810542"></p>
<ul>
<li>RoundRobinRule 轮询</li>
<li>RandomRule 随机</li>
<li>RetryRule 先按照RoundRobinRule的策略获取服务，如果获取服务失败则在指定时间内会进行重试</li>
<li>WeightedResponseTimeRule 对RoundRobinRule的扩展，响应速度越快的实例选择权重越大，越容易被选择</li>
<li>BestAvailableRule 会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务</li>
<li>AvailabilityFilteringRule 先过滤掉故障实例，再选择并发较小的实例</li>
<li>ZoneAvoidanceRule 默认规则,复合判断server所在区域的性能和server的可用性选择服务器</li>
</ul>
<h2 id="p39-ribbon负载均衡规则替换" tabindex="-1"><a class="header-anchor" href="#p39-ribbon负载均衡规则替换" aria-hidden="true">#</a> p39-Ribbon负载均衡规则替换</h2>
<p>不要将Ribbon配置类与主启动类同包，否则配置类就会被所有的Ribbon客户端所共享，达不到特殊化定制的目的。</p>
<p>创建配置类,注意不要和主启动类同包：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MySelfRule</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">IRule</span> <span class="token function">myRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//定义为随机</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RandomRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类加注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RibbonClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"cloud-payment-service"</span><span class="token punctuation">,</span> configuration <span class="token operator">=</span> <span class="token class-name">MySelfRule</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>单机Eureka7001来测试，启动8001、8002支付微服务、80订单微服务。第一次测试失败，因为服务名称大小写不一致。全改为小写后测试成功，已替换负载均衡算法为随机：<img src="http://www.iocaop.com/images/2022-10/202210131702484.png" alt="image-20221013170216259"></p>
<p>其他可能失败的原因：<a href = 'https://blog.csdn.net/weixin_42260782/article/details/120014679'>点击跳转</a></p>
<h2 id="p40-ribbon默认负载均衡轮询算法原理" tabindex="-1"><a class="header-anchor" href="#p40-ribbon默认负载均衡轮询算法原理" aria-hidden="true">#</a> p40-Ribbon默认负载均衡轮询算法原理</h2>
<p>负载均衡算法：rest接口第几次请求数%服务器集群总数量=实际服务器位置下标、</p>
<p>每次服务重启rest接口计数会重置为1</p>
<p>服务发现：可以获得服务的所有节点信息，按照上面的算法可以实现轮询</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Servicelnstance</span><span class="token punctuation">></span></span> instances <span class="token operator">=</span> discoveryClient<span class="token punctuation">.</span><span class="token function">getInstances</span><span class="token punctuation">(</span><span class="token string">"CLOUD-PAYMENT-SERVICE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如:</p>
<p>List [0] instances = 127.0.0.1:8002
List [1] instances = 127.0.0.1:8001
8001+ 8002组合成为集群，它们共计2台机器，集群总数为2，按照轮询算法原理：</p>
<p>当总请求数为1时:1%2=1对应下标位置为1，则获得服务地址为127.0.0.1:8001
当总请求数位2时:2%2=О对应下标位置为0，则获得服务地址为127.0.0.1:8002
当总请求数位3时:3%2=1对应下标位置为1，则获得服务地址为127.0.0.1:8001
当总请求数位4时:4%2=О对应下标位置为0，则获得服务地址为127.0.0.1:8002
如此类推…</p>
<h2 id="p41-roundrobinrule-轮询-分析" tabindex="-1"><a class="header-anchor" href="#p41-roundrobinrule-轮询-分析" aria-hidden="true">#</a> p41-RoundRobinRule(轮询)分析</h2>
<p>首先看IRule：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IRule</span><span class="token punctuation">{</span>
    <span class="token comment">/*
     * choose one alive server from lb.allServers or
     * lb.upServers according to key
     * 
     * @return choosen Server object. NULL is returned if none
     *  server is available 
     */</span>

    <span class="token keyword">public</span> <span class="token class-name">Server</span> <span class="token function">choose</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setLoadBalancer</span><span class="token punctuation">(</span><span class="token class-name">ILoadBalancer</span> lb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">ILoadBalancer</span> <span class="token function">getLoadBalancer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键方法是choose，其他两个方法在AbstractLoadBalancerRule中已经重写。</p>
<p>RoundRobinRule类源码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RoundRobinRule</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractLoadBalancerRule</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">AtomicInteger</span> nextServerCyclicCounter<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token constant">AVAILABLE_ONLY_SERVERS</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token constant">ALL_SERVERS</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">RoundRobinRule</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token comment">// 构造函数，初始化一个原子计数器</span>
    <span class="token keyword">public</span> <span class="token class-name">RoundRobinRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        nextServerCyclicCounter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
	
    <span class="token keyword">public</span> <span class="token class-name">RoundRobinRule</span><span class="token punctuation">(</span><span class="token class-name">ILoadBalancer</span> lb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setLoadBalancer</span><span class="token punctuation">(</span>lb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ILoadBalancer可以获取服务节点信息</span>
    <span class="token keyword">public</span> <span class="token class-name">Server</span> <span class="token function">choose</span><span class="token punctuation">(</span><span class="token class-name">ILoadBalancer</span> lb<span class="token punctuation">,</span> <span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果没有ILoadBalancer对象，报错</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lb <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">"no load balancer"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		
        <span class="token class-name">Server</span> server <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>server <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> count<span class="token operator">++</span> <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 获取可用节点信息</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Server</span><span class="token punctuation">></span></span> reachableServers <span class="token operator">=</span> lb<span class="token punctuation">.</span><span class="token function">getReachableServers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 获取所有节点信息</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Server</span><span class="token punctuation">></span></span> allServers <span class="token operator">=</span> lb<span class="token punctuation">.</span><span class="token function">getAllServers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 可用节点总数</span>
            <span class="token keyword">int</span> upCount <span class="token operator">=</span> reachableServers<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 所有节点总数</span>
            <span class="token keyword">int</span> serverCount <span class="token operator">=</span> allServers<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 节点数为0时报错</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>upCount <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>serverCount <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">"No up servers available from load balancer: "</span> <span class="token operator">+</span> lb<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
			<span class="token comment">// 计算得出下一次调用的节点下标位置</span>
            <span class="token keyword">int</span> nextServerIndex <span class="token operator">=</span> <span class="token function">incrementAndGetModulo</span><span class="token punctuation">(</span>serverCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 根据下标获取节点信息</span>
            server <span class="token operator">=</span> allServers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>nextServerIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 如果获取到的节点信息为空，则线程让步，并且跳出当前循环</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>server <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">/* Transient. */</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token keyword">yield</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
			<span class="token comment">// 如果节点可用，则返回</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">isAlive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">isReadyToServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token punctuation">(</span>server<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Next.</span>
            server <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		
        <span class="token comment">// 尝试10次负载均衡失败，报警，且走到下一步，返回空的节点信息</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">>=</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">"No available alive servers after 10 tries from load balancer: "</span>
                    <span class="token operator">+</span> lb<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> server<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Inspired by the implementation of <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">AtomicInteger</span><span class="token punctuation">#</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">modulo</span> The modulo to bound the value of the counter.
     * <span class="token keyword">@return</span> The next value.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">incrementAndGetModulo</span><span class="token punctuation">(</span><span class="token keyword">int</span> modulo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 计算调用的节点下标位置</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 当前次数</span>
            <span class="token keyword">int</span> current <span class="token operator">=</span> nextServerCyclicCounter<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 当前次数+1对总数取余</span>
            <span class="token keyword">int</span> next <span class="token operator">=</span> <span class="token punctuation">(</span>current <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> modulo<span class="token punctuation">;</span>
            <span class="token comment">// 用cas修改值</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nextServerCyclicCounter<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Server</span> <span class="token function">choose</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">choose</span><span class="token punctuation">(</span><span class="token function">getLoadBalancer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initWithNiwsConfig</span><span class="token punctuation">(</span><span class="token class-name">IClientConfig</span> clientConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p42-ribbon之手写轮询算法" tabindex="-1"><a class="header-anchor" href="#p42-ribbon之手写轮询算法" aria-hidden="true">#</a> p42-Ribbon之手写轮询算法</h2>
<p>注释掉配置类和启动类的注解，不用RestTemplate自带的负载均衡功能。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
<span class="token comment">//    @LoadBalanced</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableEurekaClient</span>
<span class="token comment">//@RibbonClient(name = "cloud-payment-service", configuration = MySelfRule.class)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderApplication80</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">OrderApplication80</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个类，加到托管到ioc：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 自定义负载均衡算法-轮询
 *
 * <span class="token keyword">@author</span> lzc
 * <span class="token keyword">@date</span> 2022/10/13
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyRoundRobinRule</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * 调用次数 计数器
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">AtomicInteger</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ServiceInstance</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">></span></span> instances<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> instances<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token function">getIndexAndIncr</span><span class="token punctuation">(</span>instances<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取下标并自增计数器
     *
     * <span class="token keyword">@return</span> int
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">getIndexAndIncr</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> next<span class="token punctuation">;</span>
        <span class="token comment">// CAS 自旋锁 保证线程安全，给计数器加1</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>counter<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            next <span class="token operator">=</span> counter<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> counter<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 取模 得到下标</span>
        <span class="token keyword">return</span> next <span class="token operator">%</span> size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制层用服务发现，获取支付服务所有节点信息。调用上面的类，获取一个节点的信息：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PAYMENT_URL</span> <span class="token operator">=</span> <span class="token string">"http://cloud-payment-service/"</span><span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">DiscoveryClient</span> discoveryClient<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">MyRoundRobinRule</span> myRoundRobinRule<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/consumer/myLB/payment/get/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span> <span class="token function">getLB</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 获取所有支付微服务节点</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">></span></span> instances <span class="token operator">=</span> discoveryClient<span class="token punctuation">.</span><span class="token function">getInstances</span><span class="token punctuation">(</span><span class="token string">"cloud-payment-service"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instances <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> instances<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ServiceInstance</span> serviceInstance <span class="token operator">=</span>myRoundRobinRule<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>instances<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> url <span class="token operator">=</span> serviceInstance<span class="token punctuation">.</span><span class="token function">getUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span> <span class="token string">"/payment/get/"</span> <span class="token operator">+</span> id<span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"本次调用端口:{}"</span><span class="token punctuation">,</span> serviceInstance<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CommonResult</span> result <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token class-name">CommonResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210132335725.png" alt="image-20221013233532572"></p>
<p>CAS知识补充：<a href = 'https://www.zhihu.com/question/276921045/answer/680083609'>点击跳转</a></p>
<p><img src="http://www.iocaop.com/images/2022-10/202210132335513.png" alt="image-20221013233557439"></p>
<p>实际开发，自定义负载均衡算法不会这样，而是实现IRule接口。</p>
<p>这里的重点是：算法很简单，就是当前调用次数对服务总数取余，再自增，调用次数自增就会涉及到并发问题，解决这个并发问题，<span style="background-color:pink;">尽量避开使用synchronized锁，影响性能，所以使用cas+自旋锁</span>。</p>
<h2 id="p43-openfeign入门" tabindex="-1"><a class="header-anchor" href="#p43-openfeign入门" aria-hidden="true">#</a> p43-OpenFeign入门</h2>
<h3 id="feign是什么" tabindex="-1"><a class="header-anchor" href="#feign是什么" aria-hidden="true">#</a> Feign是什么？</h3>
<p>一个声明式WebService客户端，让编写Web Service客户端更加简单。</p>
<p>使用方法是：定义一个服务接口然后在上面添加注解</p>
<p>支持可拔插式的编码器和解码器</p>
<p>Spring Cloud对Feign进行了封装，使其支持了Spring MVC标准注解和HttpMessageConverters。Feign可以与Eureka和Ribbon组合使用以支持负载均衡。</p>
<h3 id="为什么要用feign" tabindex="-1"><a class="header-anchor" href="#为什么要用feign" aria-hidden="true">#</a> 为什么要用Feign？</h3>
<p>方便。</p>
<p>Ribbon+RestTemplate时，利用RestTemplate对http请求的封装处理形成了一套模版化的调用方法。实际开发对服务依赖的调用可能不止一处，一个接口会被多处调用，就<span style="background-color:pink;">需要写多次服务名+接口地址</span>来调用。Feign做了进一步封装，帮助我们定义和实现依赖服务接口的定义，只需创建一个接口并使用注解的方式来配置它。</p>
<p>Feign也实现了负载均衡(集成了Ribbon)，轻量级RESTful的HTTP服务客户端。</p>
<p>使用方式是:使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务。</p>
<h3 id="openfeign又是什么" tabindex="-1"><a class="header-anchor" href="#openfeign又是什么" aria-hidden="true">#</a> OpenFeign又是什么？</h3>
<p>更方便。</p>
<p>Spring Cloud在Feign的基础上<span style="background-color:pink;">支持了SpringMVC的注解</span>，@FeignClient可以解析SpringMVC的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类。</p>
<h2 id="p44-openfeign服务调用" tabindex="-1"><a class="header-anchor" href="#p44-openfeign服务调用" aria-hidden="true">#</a> p44-OpenFeign服务调用</h2>
<p>创建module，订单微服务调用支付微服务，增加依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件先不变动。</p>
<p>创建一个接口，feign客户端，定义方法，不需要实现，但是路径和方法参数是要在支付微服务中的controller有的，且要一样。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"cloud-payment-service"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentFeign</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 通过id获取
     *
     * <span class="token keyword">@param</span> <span class="token parameter">id</span> id
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">CommonResult</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{@link</span> <span class="token attr-name">Payment}</span><span class="token punctuation">></span></span>
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/payment/get/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">getPaymentById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建controller，装配这个feign再调用:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">PaymentFeign</span> paymentFeign<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/consumer/feign/payment/get/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">getPaymentById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentFeign<span class="token punctuation">.</span><span class="token function">getPaymentById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动7001Eureka、8001、8002支付微服务、订单微服务进行测试：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210141633944.png" alt="image-20221014163346792"></p>
<p>可以看到，默认用了轮询算法进行负载均衡。</p>
<blockquote>
<p>上家公司代码是这样的：在支付微服务中定义客户端feign接口，对外暴露，并且实现这个接口，实现类加上@RestController注解。</p>
</blockquote>
<p>如果启动报错，检查启动类是否加了注解：<span style="background-color:pink;">@EnableFeignClients</span></p>
<h2 id="_45-openfeign超时控制" tabindex="-1"><a class="header-anchor" href="#_45-openfeign超时控制" aria-hidden="true">#</a> 45-OpenFeign超时控制</h2>
<p>超时解释：服务提供者接口响应时间超出服务消费者能够等待的时间就会出现调用超时，默认OpenFeign等待时间是1秒，超过1秒就视为超时。</p>
<p>超时演示：</p>
<p>先在服务提供者支付微服务写一个接口，线程等待3秒：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/payment/timeout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> serverPort<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>feign客户端定义接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/payment/timeout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>消费者创建接口，进行远程调用：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/consumer/feign/payment/timeout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentFeign<span class="token punctuation">.</span><span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先自测服务提供者接口是否可用：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210142223406.png" alt="image-20221014222301320"></p>
<p>远程调用：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210142224619.png" alt="image-20221014222411552"></p>
<p>报了超时，这时候需要在消费端加上配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">ribbon</span><span class="token punctuation">:</span>
  <span class="token comment">#指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间</span>
  <span class="token key atrule">ReadTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
  <span class="token comment">#指的是建立连接后从服务器读取到可用资源所用的时间</span>
  <span class="token key atrule">ConnectTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次调用，就成功了：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210142231241.png" alt="image-20221014223124181"></p>
<h2 id="p46-openfeign日志增强" tabindex="-1"><a class="header-anchor" href="#p46-openfeign日志增强" aria-hidden="true">#</a> p46-OpenFeign日志增强</h2>
<p>Feign有日志打印功能，调整日志级别，可以了解到HTTP请求的细节，对接口调用情况进行监控和输出。</p>
<p>日志级别：</p>
<ul>
<li>NONE ：默认，不显示</li>
<li>BASIC：请求方式、URL、状态码、耗时</li>
<li>HEADERS：BASIC的信息+请求和响应的头信息</li>
<li>FULL：HEADERS+请求和响应的正文及元数据</li>
</ul>
<p>首先添加配置类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span> <span class="token function">feignLoggerLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span><span class="token punctuation">.</span><span class="token constant">FULL</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件增加：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">com.lzc.springcloud.feign.PaymentFeign</span><span class="token punctuation">:</span> debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动，调用接口，打印日志：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210142320876.png" alt="image-20221014232009797"></p>
<h2 id="p47-hystrix是什么" tabindex="-1"><a class="header-anchor" href="#p47-hystrix是什么" aria-hidden="true">#</a> p47-Hystrix是什么</h2>
<p>微服务拆分追求高内聚低耦合，那么在服务调用构成中就会形成复杂的链路，不可避免会出现调用失败的情况(超时，宕机等)，就会出现因为一个服务调用失败影响整体，甚至雪崩。</p>
<p><span style="background-color:pink;">服务雪崩</span>：当某个被调用的服务接受大流量，并且失败，但是这个服务又<span style="background-color:pink;">调用了其他的服务</span>，就会发生<span style="background-color:pink;">级联故障</span>，就是雪崩。</p>
<p>Hystrix能保证在一个依赖服务出问题的情况下，不导致整体服务失败，避免级联故障，提升分布式系统的弹性。</p>
<p>向调用方返回一个符合预期的，可处理的备选响应(FallBack)，而不是长时间的等待或者抛出调用方无法处理的异常。保证调用方线程不被长时间、不必要的占用、避免故障蔓延、乃至雪崩。</p>
<p>假设A-&gt;B、B-&gt;C，C挂了。这时候A接受大量请求，A-&gt;B，B-&gt;C，B很多线程在等C响应，不响应这个线程在没到超时时间就不会销毁，然后B接受大量请求又一直开线程，导致栈溢出，又或者：C只能承受100个现成、B承受200个，A能承受300个，B服务崩了的原因也可能是A</p>
<p>功能：</p>
<ul>
<li>服务降级</li>
<li>服务熔断</li>
<li>接近实时的监控</li>
<li>...</li>
</ul>
<p>关于服务雪崩更详细讲解：<a href = 'https://www.cnblogs.com/rxysg/p/15667883.html'>点击跳转</a></p>
<p>目前已经停更，维护阶段，替代品有：<a href = 'https://github.com/resilience4j'>Resilience4j</a>、<a href = 'https://github.com/alibaba/Sentinel'>Sentinel</a></p>
<h2 id="p49-hystrix的服务降级熔断限流概念" tabindex="-1"><a class="header-anchor" href="#p49-hystrix的服务降级熔断限流概念" aria-hidden="true">#</a> p49-Hystrix的服务降级熔断限流概念</h2>
<h3 id="服务降级" tabindex="-1"><a class="header-anchor" href="#服务降级" aria-hidden="true">#</a> 服务降级</h3>
<p>有点像Switch case，当其他条件都不满足，总会有一个default值返回，也想电信人工客服，“服务人员正慢，继续等待请按1”，总之就会当服务不可用时，返回一个友好的提示(兜底值fallback)</p>
<h3 id="服务熔断" tabindex="-1"><a class="header-anchor" href="#服务熔断" aria-hidden="true">#</a> 服务熔断</h3>
<p>设置最大访问量，防止服务器压力大宕机，当达到最大服务访问后，直接拒绝访问，然后调用服务降级的方法返回友好提示。</p>
<h3 id="服务限流" tabindex="-1"><a class="header-anchor" href="#服务限流" aria-hidden="true">#</a> 服务限流</h3>
<p>秒杀高并发等操作，严禁一窝蜂拥挤，而是排队，一秒钟N个请求打进来，有序进行。</p>
<h2 id="p51-hystrix支付微服务构建" tabindex="-1"><a class="header-anchor" href="#p51-hystrix支付微服务构建" aria-hidden="true">#</a> p51-Hystrix支付微服务构建</h2>
<p>新建module，cloud-provider-hystrix-payment8001，依赖和原来的一样，但是要新增依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-hystrix<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置先不变，</p>
<p>编写controller：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentController</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/ok"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"8001:ok"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/timeout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"8001:timeout"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动7001注册中心。8001hystrix支付微服务，测试消费者端：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210151510326.png" alt="image-20221015151032254"></p>
<p>使用Jmeter进行压力测试：</p>
<p>1.测试计划中右键添加-》线程-》线程组（线程组，线程数：200，循环次数：1000，其他参数默认）</p>
<p>2.刚刚新建线程组，右键它-》添加-》取样器-》Http请求-》基本 输入http://localhost:8001/payment/hystrix/ok</p>
<p>3.点击绿色三角形图标启动。</p>
<p>看演示结果：拖慢，原因：springboot使用的是<span style="background-color:pink;">tomcat内置线程池，默认的工作线程数被打满了</span>，没有多余的线程来分解压力和处理。</p>
<p>原本秒响应的借口，已经要转圈圈了：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210151522557.png" alt="image-20221015152210488"></p>
<h2 id="订单微服务调用支付微服务出现卡顿" tabindex="-1"><a class="header-anchor" href="#订单微服务调用支付微服务出现卡顿" aria-hidden="true">#</a> 订单微服务调用支付微服务出现卡顿</h2>
<p>Hystrix在服务端和消费端都可以用，一般用在消费端。</p>
<p>新建订单微服务cloud-consumer-feign-hystrix-order80，调用支付微服务，新增依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-hystrix<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置不变</p>
<p>创建Feign客户端，调用8001支付微服务：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"cloud-payment-service"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentFeign</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 正常访问
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/ok"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 延迟3秒
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/timeout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制层：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderFeignHystrixController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">PaymentFeign</span> paymentFeign<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/hystrix/ok"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentFeign<span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/hystrix/timeout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentFeign<span class="token punctuation">.</span><span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以正常调用：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210151610728.png" alt="image-20221015161057654"></p>
<p>使用Jmeter对支付微服务8001进行高并发压力测试。在浏览器调用订单接口，发现逐渐变慢了，增加并发，甚至出现超时：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210151626394.png" alt="image-20221015162624325"></p>
<h2 id="p53-降级容错解决的维度要求" tabindex="-1"><a class="header-anchor" href="#p53-降级容错解决的维度要求" aria-hidden="true">#</a> p53-降级容错解决的维度要求</h2>
<ul>
<li>提供者服务超时或宕机了，消费者服务不能一直等待，必须要有服务降级。</li>
<li>提供者服务没问题，但是消费者服务自己出故障或者有自我要求(自己的等待时间小于提供者响应时间)</li>
</ul>
<h2 id="p54-hystrix之服务降级支付微服务-提供者-fallback" tabindex="-1"><a class="header-anchor" href="#p54-hystrix之服务降级支付微服务-提供者-fallback" aria-hidden="true">#</a> p54-Hystrix之服务降级支付微服务（提供者）fallback</h2>
<p>需要设置消费端自身调用超时时间峰值，超过3秒算超时，超时了需要有兜底方法处理，作为服务降级fallback。</p>
<p>编写超时降级时的兜底方法:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">timeOutHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"服务降级,请检查支付微服务8001"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在需要降级的方法上加上注解,这里设置3秒算超时，而方法中线程睡眠了5秒：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/timeout"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"timeOutHandler"</span><span class="token punctuation">,</span> commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token comment">// 设置超时时间为3秒</span>
            <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"3000"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"8001:timeout"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类加注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableCircuitBreaker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了测试，我们把消费端的feign(ribbon)配置超时时间改大一点：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">ribbon</span><span class="token punctuation">:</span>
  <span class="token comment">#指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间</span>
  <span class="token key atrule">ReadTimeout</span><span class="token punctuation">:</span> <span class="token number">15000</span>
  <span class="token comment">#指的是建立连接后从服务器读取到可用资源所用的时间</span>
  <span class="token key atrule">ConnectTimeout</span><span class="token punctuation">:</span> <span class="token number">15000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210152349164.png" alt="image-20221015234954082"></p>
<p>可以看出线程名称是Hystrix开头，<span style="background-color:pink;">降级时会有专门的线程池来处理</span>。</p>
<p>将睡眠部分的代码删除，改成10/0的异常，再测试：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/timeout"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"timeOutHandler"</span><span class="token punctuation">,</span> commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token comment">// 设置超时时间为3秒</span>
            <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"3000"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">10</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"8001:timeout"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：也会服务降级</p>
<p>消费者和提供者都可以设置Hystrix超时。</p>
<h2 id="p55-hystrix之服务降级订单微服务-消费者-fallback" tabindex="-1"><a class="header-anchor" href="#p55-hystrix之服务降级订单微服务-消费者-fallback" aria-hidden="true">#</a> p55-Hystrix之服务降级订单微服务（消费者）fallback</h2>
<p>Hystrix服务降级不光能在服务提供者使用，也可以在服务消费者使用，一般是建议消费者使用。</p>
<p>创建兜底方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">timeOutHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"服务降级,请检查订单微服务80"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务方法加注解，设置超时时间为3秒</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"timeOutHandler"</span><span class="token punctuation">,</span> commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token comment">// 设置超时时间为3秒</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"3000"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将支付微服务的该方法改为15秒超时，且睡眠10秒，即在服务提供者，认为该方法是正常的，支付微服务不会进行服务降级，而订单微服务认为需要降级(订单微服务)：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/timeout"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"timeOutHandler"</span><span class="token punctuation">,</span> commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token comment">// 设置超时时间为3秒</span>
            <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"15000"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token comment">//        int i = 10/0;</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"8001:timeout"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>订单微服务配置增加：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">hystrix</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>订单微服务(消费端)启动类加注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableHystrix</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动测试：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210160007824.png" alt="image-20221016000730743"></p>
<h2 id="p56-hystrix之全局服务降级defaultproperties" tabindex="-1"><a class="header-anchor" href="#p56-hystrix之全局服务降级defaultproperties" aria-hidden="true">#</a> p56-Hystrix之全局服务降级DefaultProperties</h2>
<p>目前存在问题：</p>
<ul>
<li>每个业务方法对应一个兜底方法，代码太多</li>
<li>没有统一（默认）的兜底方法，且将同一的和自定义的分开</li>
</ul>
<p>在订单微服务cloud-consumer-feign-hystrix-order80来测试：</p>
<p>编写全局服务降级方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     *  全局服务降级方法
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">globalHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"全局服务降级,请检查订单微服务80"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要服务降级的controller类头上加注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@DefaultProperties</span><span class="token punctuation">(</span>defaultFallback <span class="token operator">=</span> <span class="token string">"globalHandler"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注释上一节中方法上自定义的fallback方法注解@HystrixCommand中的参数，表示开启服务降级而不指定某个兜底方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/hystrix/timeout"</span><span class="token punctuation">)</span>
<span class="token comment">//    @HystrixCommand(fallbackMethod = "timeOutHandler", commandProperties = {</span>
<span class="token comment">//        // 设置超时时间为3秒</span>
<span class="token comment">//        @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")</span>
<span class="token comment">//    })</span>
	<span class="token annotation punctuation">@HystrixCommand</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentFeign<span class="token punctuation">.</span><span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210160018409.png" alt="image-20221016001829340"></p>
<h2 id="p57-hystrix之通配服务降级feignfallback" tabindex="-1"><a class="header-anchor" href="#p57-hystrix之通配服务降级feignfallback" aria-hidden="true">#</a> p57-Hystrix之通配服务降级FeignFallback</h2>
<p>在每个controller为每个方法配置兜底方法，耦合度高，可以在Feign中统一的Fallback。</p>
<p>在Feign客户端定义接口中添加一个服务降级的实现类即可实现解耦合。</p>
<p>服务调用时，服务提供者可能存在的异常：</p>
<ul>
<li>运行时异常</li>
<li>超时</li>
<li>宕机</li>
</ul>
<p>前两种已经试过了，现在来试一下第三中，宕机，并且用feignFallback来实现Feign接口，设置兜底方法。</p>
<p>创建一个类，PaymentFeignFallback，实现PaymentFeign接口，并重写方法:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentFeignFallback</span> <span class="token keyword">implements</span> <span class="token class-name">PaymentFeign</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"服务降级,请检查订单微服务80 method:ok()"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"服务降级,请检查订单微服务80 method:timeout()"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在PaymentFeign的@FeignClient增加参数:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"cloud-payment-service"</span><span class="token punctuation">,</span> fallback <span class="token operator">=</span> <span class="token class-name">PaymentFeignFallback</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置文件和启动类同样要开启Hystrix。</p>
<p>故意关掉8001服务，进行测试：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210160044535.png" alt="image-20221016004436458"></p>
<h2 id="p58-hystrix之服务熔断理论" tabindex="-1"><a class="header-anchor" href="#p58-hystrix之服务熔断理论" aria-hidden="true">#</a> p58-Hystrix之服务熔断理论</h2>
<p><span style="background-color:pink;">导致服务降级的原因</span>：</p>
<ul>
<li>程序运行时异常</li>
<li>超时</li>
<li>服务熔断触发服务降级</li>
<li>线程池/信号量满了</li>
</ul>
<p>现在就来学习服务熔断：当服务达到最大访问后，直接拒绝访问，调用对应的服务降级方法，返回友好提示。</p>
<p>服务降级-&gt;熔断-&gt;恢复调用链路</p>
<p>概述：应对雪崩效应的一种微服务链路保护机制，当扇出链路的某个微服务出错或者不可用或者响应时间太长，会进行服务降级，进而熔断该节点微服务的调用，快速返回错误的响应信息。</p>
<blockquote>
<p>当检测到该节点微服务调用响应正常后，恢复调用链路。</p>
</blockquote>
<p>springcloud中，熔断机制也是通过Hystrix实现，Hystrix可以监控微服务调用的状况，当失败的调用达到一定的阈值（缺省是5秒内20次失败），就会启动熔断机制。注解是：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@HystrixCommand</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="p59-60-hystrix之服务熔断案例" tabindex="-1"><a class="header-anchor" href="#p59-60-hystrix之服务熔断案例" aria-hidden="true">#</a> p59~60-Hystrix之服务熔断案例</h2>
<p>在服务提供者8001建一个会进行服务降级的接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/circuit/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentCircuitBreaker</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>id<span class="token operator">&lt;</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"id不能为负数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"8001:paymentCircuitBreaker调用成功"</span><span class="token operator">+</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务降级调用的方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">paymentCircuitBreakerHandler</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"8001:paymentCircuitBreaker调用失败,id不能为负数"</span><span class="token operator">+</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务熔断和服务降级都可以在@HystrixCommand注解进行配置，我们打开HystrixCommandProperties的源码，可以看到很多关于@HystrixProperty参数的属性。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210160141789.png" alt="image-20221016014103613"></p>
<p>参考资料：<a href = 'https://blog.csdn.net/qq_43509535/article/details/113799835?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-113799835-blog-108982100.pc_relevant_3mothn_strategy_and_data_recovery&spm=1001.2101.3001.4242.1&utm_relevant_index=3'>点击跳转</a></p>
<p>对熔断器进行配置：<span style="background-color:pink;">在时间窗口期内，请求次数的失败率到达多少后断路器就起作用</span>。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>        <span class="token comment">// 是否开启断路器</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.enabled"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// 请求次数</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.requestVolumeThreshold"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"10"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// 时间窗口期</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.sleepWindowInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"10000"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// 失败率达到多少后跳闸</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.errorThresholdPercentage"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"60"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把上面的注解加在controller或者serviceimpl的方法上，启动服务测试一下能不能正常使用，并且服务降级有效：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210160159282.png" alt="image-20221016015903189"></p>
<p>现在，来测试熔断器器：根据上面的熔断器注解配置，10秒内6次失败触发服务降级，就会熔断，也就是说，熔断后就算是正确的调用，也会降级，过一会儿会尝试恢复(检查是否满足熔断器的开启条件)，如果不满足熔断器要求，就会关闭服务熔断。</p>
<blockquote>
<p>传参为整数是正常调用，负数会报异常，触发服务降级。</p>
</blockquote>
<p>在10秒内发送10个请求，且6次触发了服务降级，触发了熔断器，此时我再正常调用，也会返回服务降级的信息：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210160204322.png" alt="image-20221016020408238"></p>
<h2 id="p61-62-hystrix之服务熔断总结" tabindex="-1"><a class="header-anchor" href="#p61-62-hystrix之服务熔断总结" aria-hidden="true">#</a> p61~62-Hystrix之服务熔断总结</h2>
<p>熔断器类型：</p>
<ul>
<li>打开</li>
<li>关闭</li>
<li>半开：部分请求根据规则调用当前服务，如果成功且符合规则，就认为当前服务恢复正常，关闭熔断</li>
</ul>
<p>熔断器的三个重要参数：</p>
<ul>
<li>快照时间窗口：就是统计接口调用信息的时间范围，默认是最近10秒</li>
<li>请求总数阈值：默认20，阈值是20的情况下，就算所有请求都失败（失败率100%），但是请求次数不足10次，熔断器也不会打开。</li>
<li>错误百分比阈值：默认50%，在快照时间内，请求总数达到阈值，且错误百分比也达到阈值，就会打开熔断器。</li>
</ul>
<blockquote>
<p>开启后，所有的请求都不会进行转发了，一段时间后(5秒)，断路器会由全开变为半开，<span style="background-color:pink;">半开时会让其中一个请求转发，如果成功，断路器关闭，如果失败，断路器又变为全开</span>。</p>
</blockquote>
<p>打开熔断器后，再有请求，则不会调用主逻辑，而是直接调用fallback。</p>
<p>Hystrix还有限流功能，但是可以用Sentinel替代(更好)。</p>
<h2 id="p63-hystrix图形化-dashboard搭建" tabindex="-1"><a class="header-anchor" href="#p63-hystrix图形化-dashboard搭建" aria-hidden="true">#</a> p63-Hystrix图形化 Dashboard搭建</h2>
<p>新建cloud-consumer-hystrix-dashboard9001</p>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-hystrix-dashboard<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableHystrixDashboard</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HystrixDashboardApplication9001</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">HystrixDashboardApplication9001</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个9001服务来监控其他服务的Hystrix情况，需要注意的是，其他服务要有下面的依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动：进入http://localhost:9001/hystrix</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210160252439.png" alt="image-20221016025223586"></p>
<h2 id="p63-hystrix图形化-dashboard使用" tabindex="-1"><a class="header-anchor" href="#p63-hystrix图形化-dashboard使用" aria-hidden="true">#</a> p63-Hystrix图形化 Dashboard使用</h2>
<p>在需要监控的服务启动类加配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
     *此配置是为了服务监控而配置，与服务容错本身无关，springcloud升级后的坑
     *ServletRegistrationBean因为springboot的默认路径不是"/hystrix.stream"，
     *只要在自己的项目里配置上下面的servlet就可以了
     *否则，Unable to connect to Command Metric Stream 404
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">ServletRegistrationBean</span> <span class="token function">getServlet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HystrixMetricsStreamServlet</span> streamServlet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HystrixMetricsStreamServlet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ServletRegistrationBean</span> registrationBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServletRegistrationBean</span><span class="token punctuation">(</span>streamServlet<span class="token punctuation">)</span><span class="token punctuation">;</span>
        registrationBean<span class="token punctuation">.</span><span class="token function">setLoadOnStartup</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        registrationBean<span class="token punctuation">.</span><span class="token function">addUrlMappings</span><span class="token punctuation">(</span><span class="token string">"/hystrix.stream"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        registrationBean<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"HystrixMetricsStreamServlet"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> registrationBean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>9001监控8001 - 填写监控地址 - http://localhost:8001/hystrix.stream 到 http://localhost:9001/hystrix页面的输入框。</p>
<p>然后我们调用几次刚才的带有熔断器的接口，会统计：</p>
<p>数字和右上角英文的颜色对应。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210160300475.png" alt="image-20221016030038360"></p>
<h2 id="p66-gateway是什么" tabindex="-1"><a class="header-anchor" href="#p66-gateway是什么" aria-hidden="true">#</a> p66-Gateway是什么</h2>
<p><span style="background-color:pink;">提供一个统一的服务地址给前端使用</span>，zuul停更(Netflix公司做这个的团队产生分歧)，所以用Spring Cloud自己做了个Gateway替代。使用了<span style="background-color:pink;">Webflux</span>框架、<span style="background-color:pink;">Netty</span>性能更好。</p>
<p>作用：</p>
<ul>
<li>反向代理</li>
<li>鉴权</li>
<li>流量控制</li>
<li>熔断</li>
<li>日志监控</li>
<li>等</li>
</ul>
<p>微服务架构中网关所处的位置：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210171226832.png" alt="image-20221017122654709"></p>
<p>网关是所有微服务的入口。</p>
<h2 id="gateway非阻塞异步模型" tabindex="-1"><a class="header-anchor" href="#gateway非阻塞异步模型" aria-hidden="true">#</a> Gateway非阻塞异步模型</h2>
<p>zuul已经进入维护，Gateway是Spring Cloud团队研发，很多功能比zuul便捷，采用<span style="background-color:pink;">异步非阻塞模型</span>，性能也更好。</p>
<p>Gateway的优势：</p>
<ul>
<li>zuul1.x基于阻塞io</li>
<li>zuul1.x基于servlet2.5阻塞架构，不支持任何长链接，每次io都是从工作线程中选择一个执行，请求线程被阻塞到工作线程完成。</li>
<li>zuul2.x想基于Netty非阻塞和支持长连接，但是SpringCloud还没有整合。</li>
<li>Gateway建立Spring5、Reactor、SpringBoot2、非阻塞API</li>
<li>Gateway支持WebSocket，与Spring紧密集成，开发体验更好。</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-10/202210171239881.png" alt="image-20221017123930781"></p>
<p><img src="http://www.iocaop.com/images/2022-10/202210171240400.png" alt="image-20221017124050330"></p>
<h2 id="p68-gateway工作流程" tabindex="-1"><a class="header-anchor" href="#p68-gateway工作流程" aria-hidden="true">#</a> p68-Gateway工作流程</h2>
<p>核心概念：</p>
<ul>
<li>路由：由ID,目标URI,一系列的断言和过滤器组成,如断言为true则匹配该路由。</li>
<li>断言：匹配HTTP请求中的所有内容(例如请求头或请求参数),如果请求与断言相匹配则进行路由</li>
<li>过滤：Spring框架中GatewayFilter的实例，在请求被路由前或者之后对请求进行修改。</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-10/202210171246027.png" alt="image-20221017124616938"></p>
<p>路由转发 + 执行过滤器链</p>
<p>先<span style="background-color:pink;">断言</span>，也就是路径匹配，然后<span style="background-color:pink;">路由</span>，确认转发到哪里，请求到达真正处理的微服务还有<span style="background-color:pink;">过滤</span>器，可以在请求之前(权限校验、或者请求头带上token)、请求之后(日志输出)做处理。</p>
<h2 id="p69-gateway搭建" tabindex="-1"><a class="header-anchor" href="#p69-gateway搭建" aria-hidden="true">#</a> p69-Gateway搭建</h2>
<p>新建module:cloud-gateway-gateway9527</p>
<p><span style="background-color:pink;">网关作为微服务，也要注册到注册中心</span>。</p>
<blockquote>
<p>Gateway不需要手动添加web启动器依赖和actuator依赖</p>
</blockquote>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--gateway--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-gateway<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9527</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway<span class="token punctuation">-</span>service

<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment"># 是否注册</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 注册中心的地址</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway<span class="token punctuation">-</span>service

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们想通过9527访问8001的如下两个接口：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180536258.png" alt="image-20221018053654134"></p>
<p>就需要在配置文件增加：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>localhost<span class="token punctuation">:</span>8001/
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/get/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh2
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>localhost<span class="token punctuation">:</span>8001/
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/discovery/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动注册中心7001、支付微服务8001、网关微服务9527，进行测试：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180544054.png" alt="image-20221018054446954"></p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180545748.png" alt="image-20221018054527652"></p>
<p>现在，通过9527和8001都可以访问这两个接口了。</p>
<h2 id="p70-gateway配置路由的两种方式" tabindex="-1"><a class="header-anchor" href="#p70-gateway配置路由的两种方式" aria-hidden="true">#</a> p70-Gateway配置路由的两种方式</h2>
<p>上面配置是在yml配置文件进行配置，也可以写配置类进行配置，下面来配置/guonei跳转到百度的页面：http://news.baidu.com/guonei</p>
<p>配置类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GatewayConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RouteLocator</span> <span class="token function">customRouteLocator</span><span class="token punctuation">(</span><span class="token class-name">RouteLocatorBuilder</span> routeLocatorBuilder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RouteLocatorBuilder<span class="token punctuation">.</span>Builder</span> routes <span class="token operator">=</span> routeLocatorBuilder<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        routes<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">"path_route_lzc"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> r<span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">"/guonei"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">"http://news.baidu.com/guonei"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> routes<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动测试：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180603780.png" alt="image-20221018060317591"></p>
<h2 id="p71-gateway配置动态路由" tabindex="-1"><a class="header-anchor" href="#p71-gateway配置动态路由" aria-hidden="true">#</a> p71-Gateway配置动态路由</h2>
<p>上面是写死了一个地址，我们需要根据服务名来动态路由，默认情况下Gateway会根据注册中心注册的服务列表，以注册中心上微服务名为路径创建<strong>动态路由进行转发，从而实现动态路由的功能</strong>（不写死一个地址）。</p>
<p>在配置文件增加配置，开启这个功能：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">locator</span><span class="token punctuation">:</span>
          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment">#开启从注册中心动态创建路由的功能，利用微服务名进行路由</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>8001和8002新增接口，返回端口号：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/payment/port"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> serverPort<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>路由目的url改为lb开头：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">locator</span><span class="token punctuation">:</span>
          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment">#开启从注册中心动态创建路由的功能，利用微服务名进行路由</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/get/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh2
        <span class="token comment"># 可以写具体某个服的地址，也可以写服务名</span>
        <span class="token comment"># uri: http://localhost:8001</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/discovery/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh3
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/port/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动注册中心7001、支付微服务8001和8002、网关9527进行测试：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180615331.png" alt="image-20221018061523243"></p>
<p>已经实现了动态路由负载均衡</p>
<h2 id="p72-gateway常用的predicate" tabindex="-1"><a class="header-anchor" href="#p72-gateway常用的predicate" aria-hidden="true">#</a> p72-GateWay常用的Predicate</h2>
<p>Spring Cloud Gateway包括许多内置的Route Predicate工厂。所有这些Predicate都与HTTP请求的不同属性匹配。多个RoutePredicate工厂可以进行组合。</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180628553.png" alt="image-20221018062853452"></p>
<h3 id="关于时间的断言" tabindex="-1"><a class="header-anchor" href="#关于时间的断言" aria-hidden="true">#</a> 关于时间的断言</h3>
<p>在指定的时间，这个路由才会生效</p>
<ol>
<li>The After Route Predicate Factory</li>
<li>The Before Route Predicate Factory</li>
<li>The Between Route Predicate Factory</li>
</ol>
<p>如：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh3
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/port/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
            <span class="token punctuation">-</span> After=2017<span class="token punctuation">-</span>01<span class="token punctuation">-</span>20T17<span class="token punctuation">:</span>42<span class="token punctuation">:</span>47.789<span class="token punctuation">-</span>07<span class="token punctuation">:</span>00<span class="token punctuation">[</span>America/Denver<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>时间格式获得方式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TimeTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ZonedDateTime</span> zbj <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 默认时区</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>zbj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2022-10/202210180632900.png" alt="image-20221018063238776"></p>
<p>现在将网关的配置改为如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh3
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/port/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
            <span class="token punctuation">-</span> After=2022<span class="token punctuation">-</span>10<span class="token punctuation">-</span>18T07<span class="token punctuation">:</span>32<span class="token punctuation">:</span>21.454251600+08<span class="token punctuation">:</span>00<span class="token punctuation">[</span>Asia/Shanghai<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再访问：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180634256.png" alt="image-20221018063405164"></p>
<h3 id="关于cookie的断言" tabindex="-1"><a class="header-anchor" href="#关于cookie的断言" aria-hidden="true">#</a> 关于cookie的断言</h3>
<ol>
<li>The Cookie Route Predicate Factory</li>
</ol>
<p>配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh3
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/port/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
            <span class="token punctuation">-</span> After=2022<span class="token punctuation">-</span>10<span class="token punctuation">-</span>18T06<span class="token punctuation">:</span>32<span class="token punctuation">:</span>21.454251600+08<span class="token punctuation">:</span>00<span class="token punctuation">[</span>Asia/Shanghai<span class="token punctuation">]</span>
            <span class="token punctuation">-</span> Cookie=username<span class="token punctuation">,</span> lzc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用curl分别测试带cookie和不带cookie进行访问：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180642476.png" alt="image-20221018064200366"></p>
<h3 id="关于请求头的断言" tabindex="-1"><a class="header-anchor" href="#关于请求头的断言" aria-hidden="true">#</a> 关于请求头的断言</h3>
<ol>
<li>The Header Route Predicate Factory</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh3
  <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
  <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Path=/payment/port/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
    <span class="token punctuation">-</span> After=2022<span class="token punctuation">-</span>10<span class="token punctuation">-</span>18T06<span class="token punctuation">:</span>32<span class="token punctuation">:</span>21.454251600+08<span class="token punctuation">:</span>00<span class="token punctuation">[</span>Asia/Shanghai<span class="token punctuation">]</span>
    <span class="token punctuation">-</span> Cookie=username<span class="token punctuation">,</span> lzc
    <span class="token punctuation">-</span> Header=X<span class="token punctuation">-</span>Request<span class="token punctuation">-</span>Id<span class="token punctuation">,</span> \d+ <span class="token comment"># 正则表达式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180644929.png" alt="image-20221018064430818"></p>
<p>以此类推，其他断言也是类似。</p>
<h2 id="p73-gateway的filter" tabindex="-1"><a class="header-anchor" href="#p73-gateway的filter" aria-hidden="true">#</a> p73-Gateway的Filter</h2>
<p>常用过滤器有非常多，看官网：<a href = 'https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/#gatewayfilter-factories'>点击跳转</a></p>
<p>重要的是自定义过滤器，可以用来做全局日志记录、同一网关鉴权，等。</p>
<p>创建一个过滤器，实现 GlobalFilter,Ordered接口，重写方法,模拟一下鉴权：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyGateWayFilter</span> <span class="token keyword">implements</span> <span class="token class-name">GlobalFilter</span><span class="token punctuation">,</span> <span class="token class-name">Ordered</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Mono</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">ServerWebExchange</span> exchange<span class="token punctuation">,</span> <span class="token class-name">GatewayFilterChain</span> chain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ServerHttpRequest</span> request <span class="token operator">=</span> exchange<span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> token <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>token <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> token<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"token is null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            exchange<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setStatusCode</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> exchange<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>token<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"123"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"token is error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            exchange<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setStatusCode</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> exchange<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> chain<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>exchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启后，所有访问网关微服务的请求头必须带上token:123否则无权限。</p>
<p>过滤器是断言之后的，所以我们让断言配置简单点：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh3
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/port/<span class="token important">**</span> <span class="token comment"># 路由规则</span>
<span class="token comment">#            - After=2022-10-18T06:32:21.454251600+08:00[Asia/Shanghai]</span>
<span class="token comment">#            - Cookie=username, lzc</span>
<span class="token comment">#            - Header=X-Request-Id, \d+ # 正则表达式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不带token：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180717421.png" alt="image-20221018071728320"></p>
<p>带token：</p>
<p><img src="http://www.iocaop.com/images/2022-10/202210180718497.png" alt="image-20221018071848404"></p>
<h2 id="p74-config分布式配置中心介绍" tabindex="-1"><a class="header-anchor" href="#p74-config分布式配置中心介绍" aria-hidden="true">#</a> p74-Config分布式配置中心介绍</h2>
<p>随着工程变多，<span style="background-color:pink;">每个模块都会有一个application.yml配置文件，需要统一管理</span>，一处修改，处处生效，不然修改的时候很麻烦。而且，发版时也有多个环境，如生产、测试、灰度等，都会有很多配置文件。配置文件太多了，所以有严重的配置问题。</p>
<p>Config配置：为微服务提供了<span style="background-color:pink;">集中化</span>的外部配置支持，配置服务器为不同微服务应用的所有环境提供了一个中心化的外部配置。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113162453570.png" alt="image-20230113162453570"></p>
<p><span style="background-color:pink;">统一，共用的配置，放在配置中心，独有的配置就放在各自的模块中</span>。</p>
<p>Config也分为服务端和客户端：</p>
<p>服务端也叫分布式配置中心，是一个独立的微服务应用，用来链接配置服务器并为客户端提供接口来获取配置信息、加密解密等访问信息。</p>
<p>作用：</p>
<ul>
<li>集中管理配置文件</li>
<li>不同环境不同配置、动态化的配置更新，分环境部署</li>
<li>运行期间可以动态调整配置，不需要再每个服务器上编写配置文件，服务会向配置中心统一拉取配置自己的信息。</li>
<li>当配置文件发生变动时，服务不需要重启就可以感知配置文件的变化并且应用新的配置。</li>
<li>将配置信息以REST接口形式暴露</li>
</ul>
<h2 id="p75-config配置总控中心搭建" tabindex="-1"><a class="header-anchor" href="#p75-config配置总控中心搭建" aria-hidden="true">#</a> p75-Config配置总控中心搭建</h2>
<p>github新建一个仓库，clone下来，然后创建三个yaml配置文件，分别是：</p>
<p>config-dev.yml:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">config</span><span class="token punctuation">:</span>
  <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"master branch,springcloud-config/config-dev.yml version=7"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>config-prod.yml:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">config</span><span class="token punctuation">:</span>
  <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"master branch,springcloud-config/config-prod.yml version=1"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>config-test.yml:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">config</span><span class="token punctuation">:</span>
  <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"master branch,springcloud-config/config-test.yml version=1"</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>提交到仓库：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113222258924.png" alt="image-20230113222258924"></p>
<p>新建module：cloud-config-center-3344</p>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-config-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>config<span class="token punctuation">-</span>center<span class="token punctuation">-</span><span class="token number">3344</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment"># 是否注册</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 注册中心的地址</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3344</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置中心也需要注册到注册中心，以及健康检查依赖。</p>
<p>项目启动成功，下一步，配置仓库：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>config<span class="token punctuation">-</span>center<span class="token punctuation">-</span><span class="token number">3344</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span>
        <span class="token key atrule">git</span><span class="token punctuation">:</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> git@github.com<span class="token punctuation">:</span>lzcxfz/config<span class="token punctuation">-</span>server.git
          <span class="token comment">## 搜索目录</span>
          <span class="token key atrule">search-paths</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> config<span class="token punctuation">-</span>server
      <span class="token key atrule">label</span><span class="token punctuation">:</span> master

<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment"># 是否注册</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 注册中心的地址</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3344</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类需要加注解<span style="background-color:pink;">@EnableConfigServer</span></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableConfigServer</span>
<span class="token annotation punctuation">@EnableEurekaClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigServerApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ConfigServerApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置一下hosts，如果切换开发电脑，需要注意一下，否则拉取不到信息，客户端会报错：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113224906956.png" alt="image-20230113224906956"></p>
<p>测试配置中心服务是否可以从github仓库获取到配置文件的内容，启动项目，报错了：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113225330736.png" alt="image-20230113225330736"></p>
<p>查资料：<a href='https://blog.csdn.net/m0_66782750/article/details/124160938'>点击跳转</a></p>
<p>修改配置文件，由于现在github上是main分支，所以label也一起改了：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>config<span class="token punctuation">-</span>center<span class="token punctuation">-</span><span class="token number">3344</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span>
        <span class="token key atrule">git</span><span class="token punctuation">:</span>
<span class="token comment">#          uri: git@github.com:lzcxfz/config-server.git</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/lzcxfz/config<span class="token punctuation">-</span>server.git
          <span class="token comment">## 搜索目录</span>
          <span class="token key atrule">search-paths</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> config<span class="token punctuation">-</span>server
      <span class="token comment"># 读取分支</span>
      <span class="token key atrule">label</span><span class="token punctuation">:</span> main
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment"># 是否注册</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 注册中心的地址</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3344</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后访问：http://config-3344.com:3344/main/config-dev.yaml，可以拿到配置内容：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113225624809.png" alt="image-20230113225624809"></p>
<p>配置读取规则：</p>
<p>官方文档：<a href='https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/#_quick_start'>点击跳转</a></p>
<p>阳哥总结：</p>
<p>第一种，比较完整：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113231315394.png" alt="image-20230113231315394"></p>
<p>第二种，省略分支：默认读取master，如果配置了label，也读master，这里存在疑问，后面试了一下配置default-label，就会默认读取我们所配置的了：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113231754463.png" alt="image-20230113231754463"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113231344099.png" alt="image-20230113231344099"></p>
<p>第三种和第一种反过来，并且返回的内容是json字符串：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113231927324.png" alt="image-20230113231927324"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230113232000107.png" alt="image-20230113232000107"></p>
<p>总结：</p>
<p>/{name}-{profiles}.yml</p>
<p>/{label}-{name}-{profiles}.yml</p>
<ul>
<li>label：分支(branch)</li>
<li>name：服务名</li>
<li>profiles：环境(dev/test/prod)</li>
</ul>
<h2 id="p76-config客户端配置与测试" tabindex="-1"><a class="header-anchor" href="#p76-config客户端配置与测试" aria-hidden="true">#</a> p76-Config客户端配置与测试</h2>
<p>接下来我们需要创建一个客户端3355，从配置中心微服务3344获取配置，而不是从github获取配置。</p>
<p>新建module：cloud-config-client-3355</p>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!-- 注意这个依赖，没有带server 说明这是客户端       --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-config<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在要新建配置文件：bootstrap.yml</p>
<p>为什么突然变成bootstrap.yml了？</p>
<p>applicaiton.yml是<span style="background-color:pink;">用户级的资源配置项</span></p>
<p>bootstrap.yml是<span style="background-color:pink;">系统级</span>的，<span style="background-color:pink;">优先级更加高</span>，优先加载。</p>
<p>SpringCloud会创建一个“Bootstrap Context”，作为Spring应用的“Application Context”的<span style="background-color:pink;">父上下文</span>。</p>
<p>初始化的时候“Bootstrap Context”负责从<span style="background-color:pink;">外部源</span>加载配置属性并解析配置，这两个上下文共享一个从外部获取的“Environment”。</p>
<p>相当于客户端拿到两份配置文件，bootstrap.yml从配置中心服务拉取的（一般放公共配置），一份本地的applicaiton.yml，两个拼起来才是总的当前微服务的配置，</p>
<p>“Bootstrap Context”属性高优先级，默认情况下<span style="background-color:pink;">不会被本地配置覆盖</span>。“Bootstrap Context”和“Application Context”有着不同的约定，所以新增了一个bootstrap.yml配置文件，保证“Bootstrap Context”和“Application Context”配置的分离。</p>
<p>需要先将客户端下的applicaiton.yml暂时地先改为bootstrap.yml，因为bootstrap.yml优先级高，先加载。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3355</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>client
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token comment">#Config客户端配置</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">label</span><span class="token punctuation">:</span> main <span class="token comment">#分支名称</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> config <span class="token comment">#配置文件名称</span>
      <span class="token key atrule">profile</span><span class="token punctuation">:</span> dev <span class="token comment">#读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml</span>
      <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//config<span class="token punctuation">-</span>3344.com<span class="token punctuation">:</span>3344/ <span class="token comment">#配置中心地址</span>


<span class="token comment">#服务注册到eureka地址</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-01/image-20230113235609787.png" alt="image-20230113235609787"></p>
<p>启动类不需要加注解：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableEurekaClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigClientApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ConfigClientApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建一个controller，用@Value注解来读取配置文件的内容：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${config.info}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> configInfo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/configInfo"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConfigInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> configInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动注册中心Eureka，配置中心3344，客户端3344:进行测试：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114000944168.png" alt="image-20230114000944168"></p>
<p>可以看到，客户端3355成功从服务器3344读取到配置，并且内容和github仓库上是一致的。</p>
<p>分布式配置动态刷新的问题：</p>
<p>现在我们到github仓库修改这个配置的内容，然后看3344和3355有没有同步更新：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114001437746.png" alt="image-20230114001437746"></p>
<p>刷新网页，配置中心服务端3344马上就同步了，但是无论我怎么刷新网页，客户端3355还是原来的内容：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114001615234.png" alt="image-20230114001615234"></p>
<p>我们重启3355客户端，再次获取配置信息：可以读取到配置信息</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114003025610.png" alt="image-20230114003025610"></p>
<p>但是，难道我们每次修改配置文件都要去重启一下相关服务吗？服务很多会累死人，不可取。</p>
<h2 id="p77-config动态刷新之手动版" tabindex="-1"><a class="header-anchor" href="#p77-config动态刷新之手动版" aria-hidden="true">#</a> p77-Config动态刷新之手动版</h2>
<p>首先要引入健康检查依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改3355配置文件，增加暴露监控端点：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 暴露监控端点</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在刚才的Controller上加注解<span style="background-color:pink;">@RefreshScope</span>：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114003913419.png" alt="image-20230114003913419"></p>
<p>重启3355客户端，再去github仓库修改配置文件内容，看看3344和3355获取到的配置信息内容有没有变化：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114004145868.png" alt="image-20230114004145868"></p>
<p>微服务获取到的配置：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114004231974.png" alt="image-20230114004231974"></p>
<p>3355还是没有获取到最新的配置，那我们增加了监控检查和注解，干嘛用的？需要运维人员手动刷新配置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">"http://localhost:3355/actuator/refresh"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们把配置文件内容version改成888，然后重新验证一次。</p>
<p>没有手动刷新：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114005617000.png" alt="image-20230114005617000"></p>
<p>手动刷新后：客户端配置和配置中心以及github仓库都同步了。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114005651605.png" alt="image-20230114005651605"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114005703007.png" alt="image-20230114005703007"></p>
<p>这样就避免了服务重启，这样并不完美，假设有很多客户端呢？那我要写脚本批量刷新了，那能不能订阅，一次通知，处处生效呢？假设可以订阅了，那还有个问题，假设有100台，我有98台要更新配置，2台不更新呢，怎么定点生效？所以学BUS消息总线了！</p>
<h2 id="p78-bus消息总线是什么" tabindex="-1"><a class="header-anchor" href="#p78-bus消息总线是什么" aria-hidden="true">#</a> p78-Bus消息总线是什么</h2>
<p>现在，我们修改github上的配置以后，需要手动post一下，调用api来刷新配置，实现了不用重启就可以刷新配置文件，但是如果客户端很多，那就要发送很多次post请求，那能不能一次订阅全部生效呢？还有能不能进行差异化呢(该生效的生效，不该生效的不生效)？</p>
<p>消息总线Bus是对Config的扩充，目的就是想实现分布式的自动刷新配置功能，Bus和Config配合就可以实现。</p>
<p>Bus支持两种消息代理：RabbitMQ和Kafka。（SpringCloud Alibaba是用RocketMQ）</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114155224108.png" alt="image-20230114155224108"></p>
<p>使用了Bus之后，图中的步骤3，只需要手动刷新其中一个客户端微服务，这个微服务就会发送消息给Bus，Bus再将其他订阅了的微服务刷新配置。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114155435634.png" alt="image-20230114155435634"></p>
<p>该图不一样的是，我们更新github仓库中的配置以后，post请求刷新Config配置中心，然后配置中心会推送给所有订阅了的微服务客户端。</p>
<p>上面两个图，分别是两种不同的设计思想。</p>
<p>什么是总线</p>
<p>在微服务架构的系统中，通常会使用轻量级的消息代理来构建一个<span style="background-color:pink;">共用的消息主题</span>，并让系统中所有微服务实例都连接上来。由于该主题中产生的消息会<span style="background-color:pink;">被所有实例监听和消费</span>，所以称它为消息总线。在总线上的各个实例，都可以方便地广播一些需要让其他连接在该主题上的实例都知道的消息。</p>
<p>基本原理</p>
<p>ConfigClient实例都监听MQ中同一个topic(默认是Spring Cloud Bus)。当一个服务刷新数据的时候，它会把这个信息放入到Topic中，这样其它监听同一Topic的服务就能得到通知，然后去更新自身的配置。</p>
<h2 id="p79-bus之rabbitmq环境配置" tabindex="-1"><a class="header-anchor" href="#p79-bus之rabbitmq环境配置" aria-hidden="true">#</a> p79-Bus之RabbitMQ环境配置</h2>
<p>RabbitMQ安装：<a href='http://www.iocaop.com/posts/2022-my/%E4%B8%AD%E9%97%B4%E4%BB%B6/rabbitmq-b%E7%AB%99%E5%B0%9A%E7%A1%85%E8%B0%B7.html#p10-%E5%AE%89%E8%A3%85'>点击跳转</a></p>
<h2 id="p80-bus动态刷新全局广播的设计思想和选型" tabindex="-1"><a class="header-anchor" href="#p80-bus动态刷新全局广播的设计思想和选型" aria-hidden="true">#</a> p80-Bus动态刷新全局广播的设计思想和选型</h2>
<p>为了演示广播的效果，再以3355为模板再制作一个3366：cloud-config-client-3366，依赖和配置都一样，只是端口不一样。</p>
<p>设计思想：</p>
<ol>
<li>
<p>利用消息总线触发一个客户端/bus/refresh，再由客户端发送消息给Bus总线，从而刷新所有客户端的配置</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114161923333.png" alt="image-20230114161923333"></p>
</li>
<li>
<p>利用消息总线触发一个服务端ConfigServer的/bus/refresh端点，服务端发送消息给bus总线，从而刷新所有客户端的配置</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230114161938004.png" alt="image-20230114161938004"></p>
</li>
</ol>
<p>第2种架构显然更合适，第1种架构不合适的原因如下：</p>
<ul>
<li>打破微服务单一职责，客户端微服务本来就是业务模块，不应该承担刷新配置的职责，万一挂了，影响业务又影响配置刷新。</li>
<li>破坏微服务的对等性，比如图中3个实例是集群，那么有时候我们只需要更新1，不需要更新2和3，那么整个集群就会产生分裂。</li>
<li>局限性，迁移的时候，网络地址会变化，此时想做到自动刷新，就要增加更多的修改，因为调用的是具体的某个实例才能刷新配置，需要具体的网络地址，而不能通过服务名来调用，所以迁移了就要修改来指定哪个业务微服务可以是用来刷新配置的。</li>
</ul>
<h2 id="p81-bus动态刷新全局广播配置实现" tabindex="-1"><a class="header-anchor" href="#p81-bus动态刷新全局广播配置实现" aria-hidden="true">#</a> p81-Bus动态刷新全局广播配置实现</h2>
<p>客户端3344添加依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--添加消息总线RabbitMQ支持--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bus-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导入以后，bus和mq都有了。首先添加mq配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code> <span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> www.iocaop.com
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> lzc
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加暴露bus刷新端点配置：为什么是bus-refresh?看p78中的图，步骤3。需要注意的是，凡是这种暴露端点做刷新的，依赖中一定要有actuator</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 暴露bus刷新配置的端点</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"bus-refresh"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让两个客户端3355和3366添加消息总线bus的支持：</p>
<p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--添加消息总线RabbitMQ支持--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bus-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<p>mq配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code> <span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> www.iocaop.com
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> lzc
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>暴露监控端点：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 暴露监控端点</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改后，重启这4个服务：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230116161933059.png" alt="image-20230116161933059"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230116162609770.png" alt="image-20230116162609770"></p>
<p>修改github仓库中的配置文件：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230116162703246.png" alt="image-20230116162703246"></p>
<p>发送post刷新，注意此时发送的是配置中心服务端，而不是客户端：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">"http://localhost:3344/actuator/bus-refresh"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-01/image-20230116162818588.png" alt="image-20230116162818588"></p>
<p>刷新页面，查看配置中心和两个客户端中的配置：</p>
<p>总是出错，所以把github仓库改成国内的gitee仓库了。</p>
<p>原来还是888，改成999以后，发送请求刷新：两个客户端配置都更新了。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230116170800237.png" alt="image-20230116170800237"></p>
<p>可以登录mq管理页面，查看：topic模式，每个客户端对应一个队列，并且routingKey是#，也就是只要绑定到这个交换机上的队列都会接收到消息，相当于广播fanout，所以才会有一次刷新，处处生效。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230116174330017.png" alt="image-20230116174330017"></p>
<h2 id="p82-bus动态刷新定点通知" tabindex="-1"><a class="header-anchor" href="#p82-bus动态刷新定点通知" aria-hidden="true">#</a> p82-Bus动态刷新定点通知</h2>
<p>上面是刷新以后，通知所有客户端，现在要实现的是差异化处理，想通知哪个就通知哪个(指定具体某个实例刷新配置)，这里演示只通知客户端3355而不通知3366。</p>
<p>修改仓库配置：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230116174955894.png" alt="image-20230116174955894"></p>
<p>刷新前：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230116175101339.png" alt="image-20230116175101339"></p>
<p>刷新时，只需要在原来刷新的路径后面加上：微服务名称+端口号：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">"http://localhost:3344/actuator/bus-refresh/config-client-3355:3355"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-01/image-20230116175339614.png" alt="image-20230116175339614"></p>
<p>刷新页面：只有3355更新了配置</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230116175414701.png" alt="image-20230116175414701"></p>
<h2 id="p83-stream为什么被引入" tabindex="-1"><a class="header-anchor" href="#p83-stream为什么被引入" aria-hidden="true">#</a> p83-Stream为什么被引入</h2>
<p>后端产生数据给大数据平台做分析，<span style="background-color:pink;">一个系统中出现多种MQ</span>，切换、维护、开发都会变困难，如后端使用RabbitMQ，大数据平台使用kafka。</p>
<p>有没有一种新的技术诞生，让我们不再关注具体MQ的细节，只需要用适配绑定的方式，自动在各种MQ内切换？</p>
<p>Cloud Stream 消息驱动<span style="background-color:pink;">屏蔽MQ底层，只需要操作Stream就可以操作各种MQ</span>。屏蔽底层消息中间件的差异，降低切换成本，统一消息的编程模型。</p>
<h2 id="p84-stream是什么及binder介绍" tabindex="-1"><a class="header-anchor" href="#p84-stream是什么及binder介绍" aria-hidden="true">#</a> p84-Stream是什么及Binder介绍</h2>
<p><a href="https://spring.io/projects/spring-cloud-stream#overview" target="_blank" rel="noopener noreferrer">官方文档1<ExternalLinkIcon/></a></p>
<p><a href="https://cloud.spring.io/spring-tloud-static/spring-cloud-stream/3.0.1.RELEASE/reference/html/Spring" target="_blank" rel="noopener noreferrer">官方文档2<ExternalLinkIcon/></a></p>
<p><a href="https://m.wang1314.com/doc/webapp/topic/20971999.html" target="_blank" rel="noopener noreferrer">Cloud Stream中文指导手册<ExternalLinkIcon/></a></p>
<p>应用程序通过inputs(消费者)或者outputs(生产者)来与Spring Cloud Stream中的Binder对象交互。通过我们配置的binding(绑定)，Spring Cloud Stream的Binder对象负责与消息中间件交互。引用了发布-订阅、消费组、分区三个核心概念。</p>
<h2 id="p85-stream的设计思想" tabindex="-1"><a class="header-anchor" href="#p85-stream的设计思想" aria-hidden="true">#</a> p85-Stream的设计思想</h2>
<p>标准MQ：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117102950961.png" alt="image-20230117102950961"></p>
<ul>
<li>生产者/消费者之间靠消息媒介传递信息内容</li>
<li>消息必须走特定的通道 - 消息通道 Message Channel</li>
<li>消息通道里的消息如何被消费呢，谁负责收发处理 - 消息通道MessageChannel的子接口SubscribableChannel，由MessageHandler消息处理器所订阅。</li>
</ul>
<p>为什么用Stream？</p>
<p>一个系统用了多个MQ，如kafka+RabbitMQ，两个消息中间件架构不同，相当于各自有方言，现在需要有普通话：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117103321561.png" alt="image-20230117103321561"></p>
<p>如果我们用了两个消息队列的其中一种，后面业务需求需要往另外一种消息队列迁移，就会有一大堆东西要重新推到重做，因为它跟我们系统耦合了，Stream提供了一种解耦合的方式。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117104013281.png" alt="image-20230117104013281"></p>
<p><span style="background-color:pink;">通过定义绑定器Binder作为中间层，实现了应用程序与消息中间件细节之间的隔离。</span></p>
<p>Binder：</p>
<ul>
<li>input对应消费者</li>
<li>output对应生产者</li>
</ul>
<p>Stream中的消息通信方式遵循了发布-订阅模式，用Topic主题进行广播。RabbitMQ是Exchange，Kafka是Topic。</p>
<h2 id="p86-stream编码常用注解简介" tabindex="-1"><a class="header-anchor" href="#p86-stream编码常用注解简介" aria-hidden="true">#</a> p86-Stream编码常用注解简介</h2>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117104640330.png" alt="image-20230117104640330"></p>
<p>Binder：很方便的绑定中间件，屏蔽差异。</p>
<p>Channel：通道，是队列Queue的一种抽象，在消息通讯系统中是实现存储和转发的媒介。</p>
<p>Source和Sink：简单理解为输入输出，从Stream发布消息就是输出，接收消息就是输入。</p>
<p>注解：</p>
<table>
<thead>
<tr>
<th>组成</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>MiddleWare</td>
<td>中间件</td>
</tr>
<tr>
<td>Binder</td>
<td>是应用于消息中间件之间的封装，通过Binder可以很方便的连接中间件，可以动态改变消息的类型(对于kafka的Topic和RabbitMQ的exchange)，都可以通过配置文件来实现。</td>
</tr>
<tr>
<td>@Input</td>
<td>标识输入通道，通过该输入通道接收到的消息进入应用程序。</td>
</tr>
<tr>
<td>@Output</td>
<td>标识输出通道，发布的消息通过该通道离开应用程序。</td>
</tr>
<tr>
<td>@StreamListener</td>
<td>监听队列，用于消费者的队列的消息接收。</td>
</tr>
<tr>
<td>@EnableBinding</td>
<td>指信道channel和exchange绑定在一起。</td>
</tr>
</tbody>
</table>
<p>案例说明：</p>
<p>安装好RabbitMQ环境，工程中新建三个子模块：</p>
<ul>
<li>cloud-stream-rabbitmq-provider8801，作为生产者进行发消息模块</li>
<li>cloud-stream-rabbitmq-consumer8802，作为消息接收模块</li>
<li>cloud-stream-rabbitmq-consumer8803，作为消息接收模块</li>
</ul>
<h2 id="p87-stream消息驱动之生产者" tabindex="-1"><a class="header-anchor" href="#p87-stream消息驱动之生产者" aria-hidden="true">#</a> p87-Stream消息驱动之生产者</h2>
<p>新建module：cloud-stream-rabbitmq-provider8801</p>
<p>和其他微服务一样，需要的依赖有：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-stream-rabbit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8801</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>stream<span class="token punctuation">-</span>provider
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">binders</span><span class="token punctuation">:</span> <span class="token comment"># 在此处配置要绑定的rabbitmq的服务信息；</span>
        <span class="token key atrule">defaultRabbit</span><span class="token punctuation">:</span> <span class="token comment"># 表示定义的名称，用于于binding整合</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> rabbit <span class="token comment"># 消息组件类型</span>
          <span class="token key atrule">environment</span><span class="token punctuation">:</span> <span class="token comment"># 设置rabbitmq的相关的环境配置</span>
            <span class="token key atrule">spring</span><span class="token punctuation">:</span>
              <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
                <span class="token key atrule">host</span><span class="token punctuation">:</span> www.iocaop.com
                <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span>
                <span class="token key atrule">username</span><span class="token punctuation">:</span> lzc
                <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span> <span class="token comment"># 服务的整合处理</span>
        <span class="token key atrule">output</span><span class="token punctuation">:</span> <span class="token comment"># 这个名字是一个通道的名称</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> studyExchange <span class="token comment"># 表示要使用的Exchange名称定义</span>
          <span class="token key atrule">content-type</span><span class="token punctuation">:</span> application/json <span class="token comment"># 设置消息类型，本次为json，文本则设置“text/plain”</span>
          <span class="token key atrule">binder</span><span class="token punctuation">:</span> defaultRabbit <span class="token comment"># 设置要绑定的消息服务的具体设置</span>

<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span> <span class="token comment"># 客户端进行Eureka注册的配置</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">lease-renewal-interval-in-seconds</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment"># 设置心跳的时间间隔（默认是30秒）</span>
    <span class="token key atrule">lease-expiration-duration-in-seconds</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment"># 如果现在超过了5秒的间隔（默认是90秒）</span>
    <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> send<span class="token punctuation">-</span>8801.com  <span class="token comment"># 在信息列表时显示主机名称</span>
    <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>     <span class="token comment"># 访问的路径变为IP地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableEurekaClient</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StreamMqApplication8801</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">StreamMqApplication8801</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后报错mq连不上，参考<a href='https://blog.csdn.net/int_xxn/article/details/119607211'>点击跳转</a>，解决。</p>
<p>现在，基于Stream，做outputs，生产者，先建立接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">MessageService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 发送消息
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">String</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 消息服务impl
 * @EnableBinding注解 定义消息生产者的发送管道
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/01/17
 */</span>
<span class="token annotation punctuation">@EnableBinding</span><span class="token punctuation">(</span><span class="token class-name">Source</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MessageServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">MessageService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 消息发送管道
     */</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">MessageChannel</span> output<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        output<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">MessageBuilder</span><span class="token punctuation">.</span><span class="token function">withPayload</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"msg = "</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>这里的实现类不使用@Service注解，也不装配Dao进来。而是使用@EnableBinding(Source.class)来定义消息生产者的发送管道，装配MessageChannel用来发送消息。</p>
</blockquote>
<p>创建controller，调用send方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SendMessageController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MessageService</span> messageService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/send"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token keyword">return</span>  messageService<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后可以看到，自动创建了topic交换机：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117161806177.png" alt="image-20230117161806177"></p>
<p>调用接口后，会有波动：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117161844829.png" alt="image-20230117161844829"></p>
<h2 id="p88-stream消息驱动之消费者" tabindex="-1"><a class="header-anchor" href="#p88-stream消息驱动之消费者" aria-hidden="true">#</a> p88-Stream消息驱动之消费者</h2>
<p>没有使用任何的RabbitMQ的API，已经基于Stream实现了消息发送，接下来就实现消费者。</p>
<p>新建module：cloud-stream-rabbitmq-consumer8802</p>
<p>依赖和生产者8801一样。</p>
<p>配置文件：基本和8801一样，不同的地方已经标注，重点是output改为input</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117172217259.png" alt="image-20230117172217259"></p>
<p>创建监听类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@EnableBinding</span><span class="token punctuation">(</span><span class="token class-name">Sink</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReceiveMessageListenerController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${server.port}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverPort<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 监听方法，参数中的Message泛型需要对应生产者发送时payLoad类型
     *
     * <span class="token keyword">@param</span> <span class="token parameter">message</span> 消息
     */</span>
    <span class="token annotation punctuation">@StreamListener</span><span class="token punctuation">(</span><span class="token class-name">Sink</span><span class="token punctuation">.</span><span class="token constant">INPUT</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">input</span><span class="token punctuation">(</span><span class="token class-name">Message</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> message<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者2号，收到的消息："</span><span class="token operator">+</span>message<span class="token punctuation">.</span><span class="token function">getPayload</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"\t端口号："</span><span class="token operator">+</span>serverPort<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试，生产者发送5次，消费者消费5次：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117173628029.png" alt="image-20230117173628029"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117173635646.png" alt="image-20230117173635646"></p>
<p>并且，MQ控制台显示，交换机已经绑定了队列：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117173658737.png" alt="image-20230117173658737"></p>
<h2 id="p89-stream之消息重复消费" tabindex="-1"><a class="header-anchor" href="#p89-stream之消息重复消费" aria-hidden="true">#</a> p89-Stream之消息重复消费</h2>
<p>和8802一样，新建一个cloud-stream-rabbitmq-consumer8803除了端口号不一样，其他都一样。</p>
<p>现在存在两个问题：消息重复消费、消息持久化</p>
<p>重复消费问题：</p>
<p>生产者发送两条信息，8802和8803都会收到消息并且消费，存在重复消费问题：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117175316327.png" alt="image-20230117175316327"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117175325823.png" alt="image-20230117175325823"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117175334787.png" alt="image-20230117175334787"></p>
<p>查看mq交换机和队列绑定状态：默认topic，路由key为#，两个队列都会接收消息。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117175357957.png" alt="image-20230117175357957"></p>
<p>实际场景，如果一个订单发给两个订单服务去处理了，就会造成数据错误，需要用<span style="background-color:pink;">Stream中的消息分组</span>来解决。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117175725850.png" alt="image-20230117175725850"></p>
<blockquote>
<p>Stream中处于同一个group中的多个消费者是竞争关系，能够保证消息只会被其中一个应用消费一次。不同组是可以重复消费的，同一组内会发生竞争关系，只有其中一个可以消费。</p>
</blockquote>
<p>Stream分组，同一个组类似学习RabbitMQ时的工作队列模式：<a href='http://www.iocaop.com/posts/2022-my/%E4%B8%AD%E9%97%B4%E4%BB%B6/rabbitmq-b%E7%AB%99%E5%B0%9A%E7%A1%85%E8%B0%B7.html#p16-work-queues-%E5%B7%A5%E4%BD%9C%E9%98%9F%E5%88%97%E6%A8%A1%E5%BC%8F%E8%A7%A3%E9%87%8A'>点击跳转</a></p>
<h2 id="p90-stream之group解决消息重复消费问题" tabindex="-1"><a class="header-anchor" href="#p90-stream之group解决消息重复消费问题" aria-hidden="true">#</a> p90-Stream之group解决消息重复消费问题</h2>
<p>故障现象：8801发送的消息被8802和8803重复消费</p>
<p>导致原因：默认分组group是不同的，组流水号不一样，被认为不同组，可以消费。即8802和8803所消费的两个队列都接收到了同一条消息。</p>
<p>需要自定义分组为同一个组，解决消息重复消费问题。</p>
<p>第一步，先分不同组(可以重复消费)，先学习怎么来分组。</p>
<p>很简单，只需要在配置文件中加就行：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117181154970.png" alt="image-20230117181154970"></p>
<p>8802分组lzc-a，8803分组lzc-b，重启后，可以重复消费：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117181322244.png" alt="image-20230117181322244"></p>
<p>重复消费：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117181356592.png" alt="image-20230117181356592"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117181404568.png" alt="image-20230117181404568"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117181413657.png" alt="image-20230117181413657"></p>
<p>现在，解决重复消费问题：把8802和8803配置同一分组为lzc-c，再测试：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117181634454.png" alt="image-20230117181634454"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117181642616.png" alt="image-20230117181642616"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117181650328.png" alt="image-20230117181650328"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117181803003.png" alt="image-20230117181803003"></p>
<p>已解决重复消费问题。在MQ中可以看到有两个消费者</p>
<h2 id="p91-stream之消息持久化" tabindex="-1"><a class="header-anchor" href="#p91-stream之消息持久化" aria-hidden="true">#</a> p91-Stream之消息持久化</h2>
<p>简单演示，8802删除分组配置，8803保留分组配置，8802和8803挂了，但是8801发送了4条消息。重启后，8802不消费消息，8803会消费消息。</p>
<p>group，相当于帮我们开启了队列持久化和改变队列名称。</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117182448755.png" alt="image-20230117182448755"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117182518223.png" alt="image-20230117182518223"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117182530960.png" alt="image-20230117182530960"></p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230117182541405.png" alt="image-20230117182541405"></p>
<h2 id="p92-sleuth是什么" tabindex="-1"><a class="header-anchor" href="#p92-sleuth是什么" aria-hidden="true">#</a> p92-Sleuth是什么</h2>
<p>在微服务框架中，一个客户端发起的请求在后端会<span style="background-color:pink;">经过多个不同的服务节点</span>来协同产生最后的请求结果，每一个前端请求都会形成一条复杂的分布式服务调用链路，链路中任何一环出现高延时或错误都会引起整个请求最后的失败。</p>
<p>由于调用链路很多，我们需要知道链路中有多少步，每一步的调用情况(如：耗时)，链路多，就需要监控、跟踪。</p>
<p>SpringCloud Sleuth提供了一套完整的服务跟踪解决方案且兼容支持zipkin。</p>
<p>文档：</p>
<p>github：<a href='https://github.com/spring-cloud/spring-cloud-sleuth'>点击跳转</a></p>
<h2 id="p93-sleuth之zipkin搭建" tabindex="-1"><a class="header-anchor" href="#p93-sleuth之zipkin搭建" aria-hidden="true">#</a> p93-Sleuth之zipkin搭建</h2>
<p>下载jar包：<a href='https://repo1.maven.org/maven2/io/zipkin/zipkin-server/2.24.0/zipkin-server-2.24.0-exec.jar'>点击跳转</a></p>
<p>官网：<a href='https://zipkin.io/'>点击跳转</a></p>
<p>运行jar包：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130160955667.png" alt="image-20230130160955667"></p>
<p>本地访问：http://localhost:9411/zipkin/</p>
<p>术语：</p>
<p>完整的调用链路，sleuth结合zipkin做了底层监控官网原图：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130161455453.png" alt="image-20230130161455453"></p>
<p>表示一条请求链路，一条链路通过Trace Id唯一标识，Span标识发起的请求信息，各个span通过parent id关联起来。</p>
<p>精简：Trace类似树结构的Span集合，表示一条调用链路，存在唯一标识。Span标识链路来源，通俗理解就是一次请求信息。</p>
<p><img src="http://www.iocaop.com/images/2023-01/f75fcfd2146df03428b9c8c53d13c1f1.png" alt="img"></p>
<h2 id="p94-sleuth链路监控展现" tabindex="-1"><a class="header-anchor" href="#p94-sleuth链路监控展现" aria-hidden="true">#</a> p94-Sleuth链路监控展现</h2>
<p>简单演示，cloud-consumer-order80调用cloud-provider-payment8001，这两个微服务需要引入对应的依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--包含了sleuth+zipkin--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-zipkin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource            <span class="token comment"># 当前数据源操作类型</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.gjt.mm.mysql.Driver              <span class="token comment"># mysql驱动包</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//www.iocaop.com<span class="token punctuation">:</span>3306/cloud2020<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=utf-8&amp;useSSL=false</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">911823</span>
  <span class="token key atrule">zipkin</span><span class="token punctuation">:</span> <span class="token comment">#&lt;-------------------------------------关键</span>
    <span class="token key atrule">base-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">9411</span>
    <span class="token key atrule">sleuth</span><span class="token punctuation">:</span> <span class="token comment">#&lt;-------------------------------------关键</span>
      <span class="token key atrule">sampler</span><span class="token punctuation">:</span>
      <span class="token comment">#采样率值介于 0 到 1 之间，1 则表示全部采集</span>
      <span class="token key atrule">probability</span><span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务提供者8001加一个接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/zipkin"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentZipkin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"hi ,i'am paymentzipkin server fall back，welcome to here, O(∩_∩)O哈哈~"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消费者cloud-consumer-order80增加依赖：和8001一样</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-zipkin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件：和8001一样</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>order<span class="token punctuation">-</span>service
  <span class="token key atrule">zipkin</span><span class="token punctuation">:</span> <span class="token comment">#&lt;-------------------------------------关键</span>
    <span class="token key atrule">base-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">9411</span>
    <span class="token key atrule">sleuth</span><span class="token punctuation">:</span> <span class="token comment">#&lt;-------------------------------------关键</span>
      <span class="token key atrule">sampler</span><span class="token punctuation">:</span>
      <span class="token comment">#采样率值介于 0 到 1 之间，1 则表示全部采集</span>
      <span class="token key atrule">probability</span><span class="token punctuation">:</span> <span class="token number">1</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增加controller，调用8001：这里直接写死地址，不用feign了</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/zipkin"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentZipkin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span><span class="token string">"http://localhost:8001"</span><span class="token operator">+</span><span class="token string">"/payment/zipkin/"</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动注册中心7001、消费者80、提供者8001，访问80的接口，调用8001：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130163250060.png" alt="image-20230130163250060"></p>
<p>到zipkin控制台，可以看到记录：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130163513357.png" alt="image-20230130163513357"></p>
<p>点击show可以查看详细信息：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130163538079.png" alt="image-20230130163538079"></p>
<p>右侧还可以查看依赖信息：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230130163553535.png" alt="image-20230130163553535"></p>
</div></template>


