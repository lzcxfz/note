/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/26 星期二 15:10:12                       */
/*==============================================================*/


drop table if exists project_apply;

/*==============================================================*/
/* Table: project_apply                                         */
/*==============================================================*/
create table project_apply
(
   id                   varchar(36) not null comment '主键',
   start_time           datetime comment '开始时间(周期项目)',
   end_time             datetime comment '结束时间（周期项目）',
   cancle               tinyint(4) not null default 0 comment '是否允许取消报名',
   id_del               tinyint(4) not null default 0 comment '逻辑删除',
   project              varchar(36) not null comment '学习项目主键',
   create_time          datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   create_by            varchar(36) not null default NULL comment '创建人',
   update_tme           datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   update_by            varchar(36) not null default NULL comment '更新人',
   org_id               varchar(36) comment '部门主键',
   primary key (id)
);

alter table project_apply comment '学习项目报名表';

