/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/15 星期五 15:58:58                       */
/*==============================================================*/


drop table if exists project_app;

drop table if exists project_categorys;

drop table if exists project_classroom;

drop table if exists project_course_record;

drop table if exists project_position;

drop table if exists project_position_activity;

drop table if exists project_task_record;

drop table if exists project_task_record_detail;

drop table if exists project_task_reject_detail;

drop table if exists room_record;

drop table if exists time_level;

/*==============================================================*/
/* Table: project_app                                           */
/*==============================================================*/
create table project_app
(
   id                   varbinary(36) not null comment '主键',
   project_id           varbinary(36) not null comment '关联项目主键',
   resource_type        int(4) not null comment '应用关联资源类型',
   resource_id          varbinary(36) not null comment '应用关联资源主键',
   is_available         int(4) not null comment '是否可用',
   is_del               int(4) not null comment '逻辑删除',
   create_by            varbinary(36) not null comment '创建人',
   create_time          datetime not null comment '创建时间',
   update_by            varbinary(36) not null comment '更新人',
   update_time          datetime not null comment '更新时间',
   primary key (id)
);

alter table project_app comment '学习项目应用表';

/*==============================================================*/
/* Table: project_categorys                                     */
/*==============================================================*/
create table project_categorys
(
   id                   varchar(36) not null comment '主键id',
   name                 varchar(64) not null comment '分类名称',
   description          varchar(512) not null comment '描述',
   system_top           int(4)  comment '是否系统内置顶 0否1是',
   available            int(4) not null comment '是否启用 0否1是',
   sort_no              int(4) comment '显示顺序',
   customer_id          varchar(36) comment '客户id',
   org_id               varchar(36) comment '组织id',
   is_del               int(4) not null comment '逻辑删除',
   create_by            varchar(36) not null comment '新增人',
   create_time          datetime not null comment '新增时间',
   update_by            varchar(36) not null comment '更新人',
   update_time          datetime not null comment '更新时间',
   primary key (id)
);

alter table project_categorys comment '学习项目分类表';

/*==============================================================*/
/* Table: project_classroom                                     */
/*==============================================================*/
create table project_classroom
(
   id                   varchar(36) not null comment '主键',
   room_name            varchar(80) not null comment '教室名称',
   address              varchar(80) not null comment '地点',
   remark               varchar(500) comment '备注',
   is_del               int(4) not null comment '逻辑删除',
   create_by            varchar(36) not null comment '创建者',
   create_time          datetime not null comment '创建时间',
   update_by            varchar(36) not null comment '编辑者',
   update_time          datetime not null comment '编辑时间',
   primary key (id)
);

alter table project_classroom comment '教室表';

/*==============================================================*/
/* Table: project_course_record                                 */
/*==============================================================*/
create table project_course_record
(
   id                   varchar(36) not null comment '主键',
   user_id              varchar(36) not null comment '用户主键',
   course_id            varchar(36) not null comment '课程主键',
   is_learn             int(4) comment '是否已学习',
   duration             datetime not null comment '课程学习时长',
   finish_time          datetime comment '完成时间',
   is_del               int(4) not null comment '逻辑删除',
   create_by            varchar(36) not null comment '创建人',
   create_time          datetime not null comment '创建时间',
   update_by            varchar(36) not null comment '更新人',
   update_time          datetime not null comment '更新时间',
   primary key (id)
);

alter table project_course_record comment '用户课程学习记录';

/*==============================================================*/
/* Table: project_position                                      */
/*==============================================================*/
create table project_position
(
   id                   varchar(36) not null comment '主键',
   souecr_position_id   varchar(36) not null comment '岗位主键',
   target_position_id   varchar(36) not null comment '目标岗位主键',
   progress_type        int(4) not null comment '岗位发展类型',
   is_del               int(4) not null comment '逻辑删除',
   sort_no              int(4) comment '排序',
   is_publish           int(4) not null comment '是否发布',
   publish_by           varchar(36) comment '发布人',
   create_by            varchar(36) not null comment '创建人',
   create_time          datetime not null comment '创建时间',
   update_by            varchar(36) not null comment '更新人',
   update_time          datetime not null comment '更新时间',
   publish_time         datetime comment '发布时间',
   primary key (id)
);

alter table project_position comment '学习项目岗位发展表';

/*==============================================================*/
/* Table: project_position_activity                             */
/*==============================================================*/
create table project_position_activity
(
   id                   varchar(36) not null comment '主键',
   activity_id          varchar(36) not null comment '学习活动主键',
   position_id          varchar(36) not null comment '岗位发展主键',
   sort_no              int(4) comment '排序',
   activity_name        varchar(80) not null comment '学习活动名称',
   activity_type        int(4) not null comment '学习活动类型',
   is_del               int(4) not null comment '逻辑删除',
   create_by            varchar(36) not null comment '创建人',
   create_time          datetime not null comment '创建时间',
   update_by            varchar(36) not null comment '更新人',
   update_time          datetime not null comment '更新时间',
   primary key (id)
);

alter table project_position_activity comment '学习项目岗位发展活动关系表';

/*==============================================================*/
/* Table: project_task_record                                   */
/*==============================================================*/
create table project_task_record
(
   id                   varchar(36) not null comment '主键',
   task_template_id     varchar(36) not null comment '任务对应的表单模板关联主键',
   task_column_id       varchar(36) not null comment '当前任务的所处的栏目主键',
   user_id              varchar(36) comment '发起人主键:学员',
   mentor_id            varchar(36) comment '发起人主键:导师',
   is_finish            int(4) not null comment '是否处理完成:0-未完成;1-已完成',
   colunm_is_finish     int(4) comment '栏目是否完成',
   colunm_finish_time   int(4) comment '栏目完成时间',
   cycle_id             varchar(36) comment '辅导循环记录主键',
   is_del               int(4) not null comment '逻辑删除',
   create_by            varchar(36) not null comment '创建人',
   create_time          datetime not null comment '创建时间',
   update_by            varchar(36) not null comment '更新人',
   update_time          datetime not null comment '更新时间',
   primary key (id)
);

alter table project_task_record comment '辅导任务记录表';

/*==============================================================*/
/* Table: project_task_record_detail                            */
/*==============================================================*/
create table project_task_record_detail
(
   id                   varchar(36) not null comment '主键',
   record_id            varchar(36) not null comment '任务记录主键',
   task_template_id     varchar(36) not null comment '任务对应的表单模板关联主键',
   task_column_id       varchar(36) not null comment '当前任务的所处的栏目主键',
   user_id              varchar(36) not null comment '栏目操作人主键:导师主键或者学员主键',
   object_user_id       varchar(36) comment '目标用户主键:1.学员评估时对应导师主键;2.导师发起时,对应的学员主键',
   text_content         varchar(500) comment '栏目内容类型为文本时,填写的文本内容',
   evaluate_record_id   varchar(36) comment '栏目内容类型为评估时,用户的评估记录主键',
   status               int(4) not null comment '处理状态:0-待处理;1-已处理;2-已退回',
   is_del               int(4) not null comment '逻辑删除',
   create_by            varchar(36) not null comment '创建人',
   create_time          datetime not null comment '创建时间',
   update_by            varchar(36) not null comment '更新人',
   update_time          datetime not null comment '更新时间',
   primary key (id)
);

alter table project_task_record_detail comment '辅导任务记录详情表';

/*==============================================================*/
/* Table: project_task_reject_detail                            */
/*==============================================================*/
create table project_task_reject_detail
(
   id                   varchar(36) not null comment '主键',
   detail_id            varchar(36) comment '关联辅导任务记录详情表主键',
   submit_time          datetime comment '提交时间',
   remark               varchar(500) comment '留言',
   is_del               int(4) comment '逻辑删除',
   create_by            varchar(36) comment '创建人',
   create_time          datetime comment '创建时间',
   update_by            varchar(36) comment '更新人',
   update_time          datetime comment '更新时间',
   primary key (id)
);

alter table project_task_reject_detail comment '辅导驳回记录表';

/*==============================================================*/
/* Table: room_record                                           */
/*==============================================================*/
create table room_record
(
   id                   varchar(36) comment '主键',
   room_id              varchar(36) comment '教室id',
   status               int(4) comment '预约状态 0已取消 1已预约',
   level_id             varchar(36) comment '预约时段id',
   start_time           datetime comment '预约开始时间',
   end_time             datetime comment '预约结束时间',
   create_by            varchar(36) comment '创建者',
   create_time          datetime comment '创建时间',
   update_by            varchar(36) comment '编辑者',
   update_time          datetime comment '编辑时间',
   is_del               int(4) comment '逻辑删除'
);

alter table room_record comment '教室预约记录表';

/*==============================================================*/
/* Table: time_level                                            */
/*==============================================================*/
create table time_level
(
   id                   varchar(36) comment '主键',
   start_time           datetime comment '时段开始时间',
   end_time             datetime comment '时段结束时间',
   is_del               int(4) comment '逻辑删除',
   sort_no              int(4) comment '显示顺序',
   create_by            varchar(36) comment '创建者',
   create_time          datetime comment '创建时间',
   update_by            varchar(36) comment '编辑者',
   update_time          datetime comment '编辑时间'
);

alter table time_level comment '预约时段表';

