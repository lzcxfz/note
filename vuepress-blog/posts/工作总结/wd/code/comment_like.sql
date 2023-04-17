/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/29 星期五 15:46:35                       */
/*==============================================================*/


drop table if exists comment_like;

/*==============================================================*/
/* Table: comment_like                                          */
/*==============================================================*/
create table comment_like
(
   id                   varchar(36) not null comment '主键',
   comment_id           varchar(36) not null comment '评论主键',
   is_like              int(4) not null default 0 comment '是否点赞',
   create_time          datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   create_by            varchar(36) not null comment '创建人',
   update_time          datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   update_by            varchar(36) not null comment '更新人',
   逻辑删除                 int(4) not null default 0 comment '逻辑删除',
   primary key (id)
);

alter table comment_like comment '评论点赞表';

