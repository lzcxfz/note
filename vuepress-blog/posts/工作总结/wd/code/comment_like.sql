/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/29 ������ 15:46:35                       */
/*==============================================================*/


drop table if exists comment_like;

/*==============================================================*/
/* Table: comment_like                                          */
/*==============================================================*/
create table comment_like
(
   id                   varchar(36) not null comment '����',
   comment_id           varchar(36) not null comment '��������',
   is_like              int(4) not null default 0 comment '�Ƿ����',
   create_time          datetime not null default CURRENT_TIMESTAMP comment '����ʱ��',
   create_by            varchar(36) not null comment '������',
   update_time          datetime not null default CURRENT_TIMESTAMP comment '����ʱ��',
   update_by            varchar(36) not null comment '������',
   �߼�ɾ��                 int(4) not null default 0 comment '�߼�ɾ��',
   primary key (id)
);

alter table comment_like comment '���۵��ޱ�';

