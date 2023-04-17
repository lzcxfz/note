<template><div><p>学习项目主表tb_project</p>
<table>
<thead>
<tr>
<th>项目应用</th>
<th>涉及表</th>
</tr>
</thead>
<tbody>
<tr>
<td>公告管理</td>
<td>info</td>
</tr>
<tr>
<td>导师管理</td>
<td>分类表 categorys  导师记录表mentorrecord</td>
</tr>
<tr>
<td>讲师管理</td>
<td>讲师授课明细表 tb_lecturer_examination 培训讲师表 tb_lecturer</td>
</tr>
<tr>
<td>话题管理</td>
<td>论坛信息表 post 培训班关联业务trainBusiness   论坛版块forum_section 组织SysOrg 帖子浏览记录表 postview 论坛评论表postcomment 用户sysuser SysDictCodeValue数据字典 TB_PRO_APP TB_PROJECT_PROGRESS  postbanuser</td>
</tr>
<tr>
<td>话题版块管理</td>
<td>用户角色SysRoleUser  组织SysOrg 用户sysuser 论坛版块forum_section 项目应用表tb_pro_app</td>
</tr>
<tr>
<td>评估管理</td>
<td>培训评估表 evaluation 培训讲师表tb_lecturer 项目任务表tb_project_task 项目主表 tb_project 组织SysOrg 用户sysuser 项目应用表tb_pro_app 评估题目表evalquestion 评估回答内容表（含主观题）evalreply 讲师授课明细表tb_lecturer_examination</td>
</tr>
<tr>
<td>团队管理</td>
<td>项目团队成员 tb_pro_team_user 项目应用表 tb_pro_app 项目团队tb_pro_team</td>
</tr>
<tr>
<td>作业管理</td>
<td>项目作业tb_pro_app_work 作业评估人tb_homework_reviewteam</td>
</tr>
<tr>
<td>评论管理</td>
<td>项目评论表 tb_pro_comment 项目主表 tb_project 用户sysuser</td>
</tr>
<tr>
<td>结业管理</td>
<td>结业条件 tbl_completion_condition 结业人员情况 tbl_completion_user  用户sysuser 组织SysOrg</td>
</tr>
<tr>
<td>费用管理</td>
<td>费用表 cost  学习项目主表tb_project</td>
</tr>
<tr>
<td>资料管理</td>
<td>文件表files</td>
</tr>
</tbody>
</table>
</div></template>


