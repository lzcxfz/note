<template><div><h1 id="微服务化问鼎云学习" tabindex="-1"><a class="header-anchor" href="#微服务化问鼎云学习" aria-hidden="true">#</a> 微服务化问鼎云学习</h1>
<h2 id="项目简介" tabindex="-1"><a class="header-anchor" href="#项目简介" aria-hidden="true">#</a> 项目简介</h2>
<ul>
<li>为解决项目用户量增涨，系统无法支撑大并发，大数据，现需要支持水平扩展系统</li>
<li>中小企业saas平台基础</li>
</ul>
<h2 id="项目业务由原来项迁移" tabindex="-1"><a class="header-anchor" href="#项目业务由原来项迁移" aria-hidden="true">#</a> 项目业务由原来项迁移</h2>
<ul>
<li>第一版本无新增业务,主要完成用户模块和考试模块开发</li>
</ul>
<h2 id="项目主要技术" tabindex="-1"><a class="header-anchor" href="#项目主要技术" aria-hidden="true">#</a> 项目主要技术</h2>
<ul>
<li>spring boot 2.6.6 基础脚手架</li>
<li>mybatis plus 数据库orm redis做二级缓存</li>
<li>swagger 3.0 生成接口文档</li>
<li>openFeign 服务之间调用</li>
<li><code v-pre>service mesh</code> 架构 部署以<code v-pre>k8s</code> + <code v-pre>istio</code> 为主</li>
</ul>
<h2 id="数据库要求" tabindex="-1"><a class="header-anchor" href="#数据库要求" aria-hidden="true">#</a> 数据库要求</h2>
<ul>
<li>数据库的所有命名用小写，单词之间用下划线分割</li>
<li>库名：项目名_模块名</li>
<li>表名规则1：模块缩写_功能名，系统基础功能加sys_前缀，例：sys_user，sys_org，ex_exam，ex_answer_record</li>
<li>表名规则2：功能模块是独单库的，表名可以直接是功能名，例：course</li>
<li>表必须有创建人，创建时间，更新人，更新时间，是否删除 （create_by,create_time,update_by,update_time,is_del）</li>
<li>表名：模块缩写_功能名，系统基础功能加sys_前缀，例：<code v-pre>sys_user</code>，<code v-pre>sys_org</code>，<code v-pre>ex_exam</code>，<code v-pre>ex_answer_record</code>，<code v-pre>course</code>
，<code v-pre>course_push_task</code></li>
<li>数据表必须有创建人，创建时间，更新人，更新时间，是否删除 （<code v-pre>create_by</code>,<code v-pre>create_time</code>,<code v-pre>update_by</code>,<code v-pre>update_time</code>,<code v-pre>is_del</code>
），中间表视具体情况而定</li>
<li>如果旧库中的表是<code v-pre>add_date</code>需要改为<code v-pre>create_time</code>,<code v-pre>add_by</code>同理改为<code v-pre>create_by</code></li>
<li>字段中有包含 <code v-pre>date</code>的时间相关字段改为 <code v-pre>time</code>, eg: <code v-pre>recommend_date</code>-&gt; <code v-pre>recommend_time</code></li>
<li>表名规则1：模块缩写_功能名，系统基础功能加sys_前缀，例：sys_user，sys_org，ex_exam，ex_answer_record</li>
<li>表名规则2：功能模块是独单库的，表名可以直接是功能名，例：course</li>
<li>数据表必须有创建人，创建时间，更新人，更新时间，是否删除 （<code v-pre>create_by</code>,<code v-pre>create_time</code>,<code v-pre>update_by</code>,<code v-pre>update_time</code>,<code v-pre>is_del</code>
），中间表视具体情况而定</li>
<li>如果旧库中的表是<code v-pre>add_date</code>需要改为<code v-pre>create_time</code>,<code v-pre>add_by</code>同理改为<code v-pre>create_by</code></li>
<li>字段中有包含 <code v-pre>date</code>的时间相关字段改为 <code v-pre>time</code>, eg: <code v-pre>recommend_date</code>-&gt; <code v-pre>recommend_time</code></li>
<li>表字段设置为not null,添加默认值，尽量不要设置允许为null</li>
<li>字段：字段名小写，不使用关键字，遇到关键字加“f_”前缀，实体类里去掉前缀</li>
<li>非必要不join查询</li>
<li>...</li>
</ul>
<h2 id="编码要求" tabindex="-1"><a class="header-anchor" href="#编码要求" aria-hidden="true">#</a> 编码要求</h2>
<ul>
<li>代码格式要求，项目采用google代码风格，需要导入style里的intellij-java-google-style.xml配置</li>
<li>安装代码检查插件 Alibaba Java Coding Guidelines 、 SonarLint</li>
<li>pojo类用包装类，不要用基本类型</li>
<li>表的实体对象只有表字段一一对，不外加其它字段</li>
<li>DTO,VO,AO不可以继承表的实体对象，create_by,create_time,update_by,update_time,is_del 及敏感数据字段（如密码，密钥）不返回给前端</li>
<li>DTO返回给字段给前端界面需要一一对应，可以不传或者没用上的尽量不传</li>
<li>接口URI遵循rest命名风格，查询数据用get请求,提交数据用post请求,修改数据用put请求,删除数据用del请求,uri里不要get,find,by等字</li>
<li>枚举类名建议带上Enum后缀,枚举成员名称需要全大写,单词间用下划线隔开.枚举其实是特殊的常量类,且构造方法被默认强制私有.</li>
<li></li>
</ul>
<p><img src="img/idea_import_style.png" alt="idea_import_style.png"></p>
<p>安装idea save actions 插件</p>
<p><img src="img/idea_plugins_save_actions.png" alt="idea_plugins_save_actions.png"></p>
<p>配置save actions插件</p>
<p><img src="img/idea_plugins_style_setting.png" alt="idea_plugins_style_setting.png"></p>
<ul>
<li>...</li>
</ul>
<h2 id="业务分析" tabindex="-1"><a class="header-anchor" href="#业务分析" aria-hidden="true">#</a> 业务分析</h2>
<ul>
<li>在开始做功能前需要充分了解业务功能，现主要是做业务迁移，有不了解的找产品或测试了解清楚，也可以自行阅读原系统源码</li>
<li></li>
</ul>
<p>盘点出功能交互的所有接口，每个接口的入参和出参分别是什么，包括管理端和学员端，示例参考 https://www.processon.com/mindmap/620b064c07912979960d4c20</p>
<ul>
<li>盘点出需要依赖其它模块的接口，列出参数和返回值及提完成时间提给对应模块开发人员</li>
<li>对逻辑较复杂的功能需要画出功能流程图或序列图</li>
<li>业务数据跟组织走，业务数据应该有orgId字段</li>
</ul>
<h2 id="一些隐性业务需求需要注意" tabindex="-1"><a class="header-anchor" href="#一些隐性业务需求需要注意" aria-hidden="true">#</a> 一些隐性业务需求需要注意</h2>
<ul>
<li>查询列表有编号一类需加上编号的查询条件</li>
<li>查询DTO数字用Integer类型,不用int</li>
<li>查询时间需要加上注解类型是Date,可以参考考试模块列表查询</li>
<li>查询返回的时间使用Date类型</li>
</ul>
<h2 id="建议开发顺序" tabindex="-1"><a class="header-anchor" href="#建议开发顺序" aria-hidden="true">#</a> 建议开发顺序</h2>
<ul>
<li>建立模块项目</li>
<li>建库建表，分析原来的表设计是否合理，表名字段名需要下划线分割单词，</li>
<li>定义rest，定义入参DTO，返回DTO，URL Mapping</li>
<li>写rest单元测试</li>
<li>定service接口，实现rest所有方法，rest到此结束</li>
<li>实现service接口，中间可能还要定关联的fegin接口</li>
<li>单元测试执行成功</li>
</ul>
<h2 id="常用操作" tabindex="-1"><a class="header-anchor" href="#常用操作" aria-hidden="true">#</a> 常用操作</h2>
<ul>
<li>取当前登陆用户id用 UserThreadContext.getUserId()</li>
</ul>
<h2 id="开发注意事项" tabindex="-1"><a class="header-anchor" href="#开发注意事项" aria-hidden="true">#</a> 开发注意事项</h2>
<h3 id="分支说明" tabindex="-1"><a class="header-anchor" href="#分支说明" aria-hidden="true">#</a> 分支说明</h3>
<ul>
<li>master 禁示提交 对应线上版本</li>
<li>release 测试分支 对就环境 http://192.168.0.82</li>
<li>dev 开发分支 对应环境 http://192.168.0.88  外网访问：http://59.37.126.22:20080</li>
<li>dev-xxx 各模块开发分支 联调阶段需要把代码合并到dev分支发布在开发环境</li>
</ul>
<h3 id="环境说明" tabindex="-1"><a class="header-anchor" href="#环境说明" aria-hidden="true">#</a> 环境说明</h3>
<ul>
<li>
<p>项目需要jdk 11，需要关注一下 project structue --&gt; project --&gt; sdk 是否是jdk 11，language level 是否是11</p>
</li>
<li>
<p>注意maven 也需要jdk11，需要关注一下idea --&gt; setting --&gt; build --&gt; build tool --&gt; maven --&gt; runner 里的jdk是否正确</p>
</li>
<li>
<p>依赖的中间件服务信息 <RouterLink to="/posts/2022-wd/mlearn/%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%B5%84%E6%BA%90.html">中间件服务器资源</RouterLink></p>
</li>
<li>
<p>通过以下脚本拉取模块</p>
</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/db.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/common.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/file.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/user.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/exam.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/generator.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/course.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/lecturer.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/survey.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/forum.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/live.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/websocket.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/info.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/project.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/appraise.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/special.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/recruiting.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/excitation.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/promoted-game.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/reading.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/example.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/business-view.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/certification.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/task.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/push.git
<span class="token function">git</span> clone https://100.wunding.com:1443/server/mlearn/generator.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 编译项目</span>
mvn clean <span class="token function">install</span> <span class="token parameter variable">-Dmaven.test.skip</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编码相关问题" tabindex="-1"><a class="header-anchor" href="#编码相关问题" aria-hidden="true">#</a> 编码相关问题</h3>
<ul>
<li>mapping和service</li>
<li><s>service只能引对应的mapping,service 可以引别的service,但不允许别的表对应mapping，每个mapping只操作自己的表</s></li>
<li>service只写与当前service内容相关逻辑，数据库操作平凡时添加dao层</li>
<li>非必要不手写sql，同时注意运行性能</li>
<li>非必要不联表查询，联表查询必须在注释上说明为什么</li>
<li>联表查询写在主表上，后续要联表查询去掉</li>
<li>开启二级缓存后联表查询可能会引发一些问题，有联表查询禁开启mybatis plus二级缓存</li>
</ul>
<h3 id="feign相关问题" tabindex="-1"><a class="header-anchor" href="#feign相关问题" aria-hidden="true">#</a> feign相关问题</h3>
<ul>
<li>定义Feign接口时每个参数要加@RequestParam注解指定参数名称</li>
<li>用GetMapping时参数是pojo类时需要加@SpringQueryMap注解，pojo里有数组，集合或复杂对象时会有问题，建议不要用GetMapping时不要用pojo类做参数</li>
<li>用PostMapping时参数要加@RequestBody</li>
</ul>
<h3 id="下面是服务的swagger文档地址" tabindex="-1"><a class="header-anchor" href="#下面是服务的swagger文档地址" aria-hidden="true">#</a> 下面是服务的swagger文档地址</h3>
<p>本地接口对应查看地址</p>
<ul>
<li>用户接口文档：http://127.0.0.1:28001/swagger-ui/</li>
<li>登陆接口文档：http://127.0.0.1:28002/swagger-ui/</li>
<li>文件接口文档：http://127.0.0.1:28003/swagger-ui/</li>
<li>考试接口文档：http://127.0.0.1:28004/swagger-ui/</li>
<li>课程接口文档：http://127.0.0.1:28006/swagger-ui/</li>
<li>讲师接口文档：http://127.0.0.1:28007/swagger-ui/</li>
<li>调研接口文档：http://127.0.0.1:28008/swagger-ui/</li>
<li>直播接口文档：http://127.0.0.1:28009/swagger-ui/</li>
<li>话题接口文档：http://127.0.0.1:28012/swagger-ui/</li>
<li>学习项目接口文档：http://127.0.0.1:28013/swagger-ui/</li>
<li>积分接口文档：http://127.0.0.1:28014/swagger-ui/</li>
<li>专题接口文档：http://127.0.0.1:28015/swagger-ui/</li>
<li>评价接口文档：http://127.0.0.1:28016/swagger-ui/</li>
<li>招募接口文档：http://127.0.0.1:28017/swagger-ui/</li>
<li>新闻资讯接口文档：http://127.0.0.1:28018/swagger-ui/</li>
<li>案例库文档：http://127.0.0.1:28019/swagger-ui/</li>
<li>认证文档：http://127.0.0.1:28021/swagger-ui/</li>
<li>共读文档：http://127.0.0.1:28022/swagger-ui/</li>
</ul>
<p>测试环境接口对应查看地址</p>
<ul>
<li>用户接口文档：http://192.168.0.88/user/swagger-ui/</li>
<li>登陆接口文档：http://192.168.0.88/login/swagger-ui/</li>
<li>文件接口文档：http://192.168.0.88/file/swagger-ui/</li>
<li>考试接口文档：http://192.168.0.88/exam/swagger-ui/</li>
<li>课程接口文档：http://192.168.0.88/course/swagger-ui/</li>
<li>讲师接口文档：http://192.168.0.88/lecturer/swagger-ui/</li>
<li>调研接口文档：http://192.168.0.88/survey/swagger-ui/</li>
<li>直播接口文档：http://192.168.0.88/live/swagger-ui/</li>
<li>话题接口文档：http://192.168.0.88/forum/swagger-ui/</li>
<li>学习项目接口文档：http://192.168.0.88/project/swagger-ui/</li>
<li>积分接口文档：http://192.168.0.88/excitation/swagger-ui/</li>
<li>专题接口文档：http://192.168.0.88/special/swagger-ui/</li>
<li>评价接口文档：http://192.168.0.88/appraise/swagger-ui/</li>
<li>招募接口文档：http://192.168.0.88/recruiting/swagger-ui/</li>
<li>新闻资讯接口文档：http://192.168.0.88/info/swagger-ui/</li>
<li>案例库文档：http://192.168.0.88/example/swagger-ui/</li>
<li>认证文档：http://192.168.0.88/certification/swagger-ui/</li>
<li>共读文档：http://192.168.0.88/reading/swagger-ui/</li>
</ul>
<h3 id="token失效情况" tabindex="-1"><a class="header-anchor" href="#token失效情况" aria-hidden="true">#</a> token失效情况</h3>
<ul>
<li>问题描述：单元测试时，setUp方法使用restTemplate请求服务器，生成token，其他test方法携带token访问本地服务，一直报token无效。</li>
<li>根本原因：login服务所在服务器时间比其他服务所在服务器时间快，生成的token还未生效,携带此token访问本地服务时报异常token无效。</li>
<li>解决方法：1、本地时间和服务器时间一致，或者比服务器时间快 2、生成token后，线程阻塞五秒，等待token生效，延迟访问本地服务。</li>
</ul>
<h2 id="服务端口说明" tabindex="-1"><a class="header-anchor" href="#服务端口说明" aria-hidden="true">#</a> 服务端口说明</h2>
<table>
<thead>
<tr>
<th>模块</th>
<th>服务端口</th>
<th>数据库端口</th>
</tr>
</thead>
<tbody>
<tr>
<td>用户</td>
<td>28001</td>
<td>23406</td>
</tr>
<tr>
<td>登陆</td>
<td>28002</td>
<td></td>
</tr>
<tr>
<td>文件</td>
<td>28003</td>
<td>23407</td>
</tr>
<tr>
<td>考试</td>
<td>28004</td>
<td>23408</td>
</tr>
<tr>
<td>课程</td>
<td>28006</td>
<td>23409</td>
</tr>
<tr>
<td>讲师</td>
<td>28007</td>
<td>23410</td>
</tr>
<tr>
<td>调研</td>
<td>28008</td>
<td>23411</td>
</tr>
<tr>
<td>直播</td>
<td>28009</td>
<td>23412</td>
</tr>
<tr>
<td><s>系统配置</s></td>
<td><s>28010</s></td>
<td><s>23413</s></td>
</tr>
<tr>
<td>websocket</td>
<td>28011</td>
<td></td>
</tr>
<tr>
<td>案例库</td>
<td>28019</td>
<td></td>
</tr>
<tr>
<td>话题</td>
<td>28012</td>
<td>23414</td>
</tr>
<tr>
<td>学习项目</td>
<td>28013</td>
<td></td>
</tr>
<tr>
<td>积分</td>
<td>28014</td>
<td></td>
</tr>
<tr>
<td>专题</td>
<td>28015</td>
<td></td>
</tr>
<tr>
<td>评价</td>
<td>28016</td>
<td></td>
</tr>
<tr>
<td>招募</td>
<td>28017</td>
<td></td>
</tr>
<tr>
<td>新闻资讯</td>
<td>28018</td>
<td></td>
</tr>
<tr>
<td>闯关</td>
<td>28020</td>
<td></td>
</tr>
<tr>
<td>认证</td>
<td>28021</td>
<td></td>
</tr>
<tr>
<td>共读</td>
<td>28022</td>
<td></td>
</tr>
<tr>
<td>定时任务</td>
<td>28023</td>
<td></td>
</tr>
<tr>
<td>推送</td>
<td>28024</td>
<td></td>
</tr>
<tr>
<td>数据看板</td>
<td>28025</td>
<td></td>
</tr>
<tr>
<td>评论</td>
<td>28026</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="各模块错误码编号说明" tabindex="-1"><a class="header-anchor" href="#各模块错误码编号说明" aria-hidden="true">#</a> 各模块错误码编号说明</h2>
<table>
<thead>
<tr>
<th style="text-align:left">模块</th>
<th style="text-align:left">业务编号</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">用户登陆</td>
<td style="text-align:left">2</td>
</tr>
<tr>
<td style="text-align:left">文件</td>
<td style="text-align:left">1</td>
</tr>
<tr>
<td style="text-align:left">考试</td>
<td style="text-align:left">3</td>
</tr>
<tr>
<td style="text-align:left">课程</td>
<td style="text-align:left">6</td>
</tr>
<tr>
<td style="text-align:left">讲师</td>
<td style="text-align:left">4</td>
</tr>
<tr>
<td style="text-align:left">调研</td>
<td style="text-align:left">7</td>
</tr>
<tr>
<td style="text-align:left">直播</td>
<td style="text-align:left">5</td>
</tr>
<tr>
<td style="text-align:left">话题</td>
<td style="text-align:left">8</td>
</tr>
<tr>
<td style="text-align:left">学习项目</td>
<td style="text-align:left">13</td>
</tr>
<tr>
<td style="text-align:left">积分</td>
<td style="text-align:left">14</td>
</tr>
<tr>
<td style="text-align:left">专题</td>
<td style="text-align:left">15</td>
</tr>
<tr>
<td style="text-align:left">评价</td>
<td style="text-align:left">16</td>
</tr>
<tr>
<td style="text-align:left">招募</td>
<td style="text-align:left">17</td>
</tr>
<tr>
<td style="text-align:left">新闻资讯</td>
<td style="text-align:left">18</td>
</tr>
<tr>
<td style="text-align:left">案例库</td>
<td style="text-align:left">19</td>
</tr>
<tr>
<td style="text-align:left">闯关</td>
<td style="text-align:left">20</td>
</tr>
<tr>
<td style="text-align:left">认证</td>
<td style="text-align:left">21</td>
</tr>
<tr>
<td style="text-align:left">共读</td>
<td style="text-align:left">22</td>
</tr>
<tr>
<td style="text-align:left">定时任务</td>
<td style="text-align:left">23</td>
</tr>
<tr>
<td style="text-align:left">推送</td>
<td style="text-align:left">24</td>
</tr>
<tr>
<td style="text-align:left">数据看板</td>
<td style="text-align:left">25</td>
</tr>
<tr>
<td style="text-align:left">评论</td>
<td style="text-align:left">26</td>
</tr>
<tr>
<td style="text-align:left">系统配置</td>
<td style="text-align:left">-</td>
</tr>
<tr>
<td style="text-align:left">话题</td>
<td style="text-align:left">28012</td>
</tr>
</tbody>
</table>
<p>82：1185b565e31a546ac5c5dda0b5ba699dca5683e7</p>
</div></template>


