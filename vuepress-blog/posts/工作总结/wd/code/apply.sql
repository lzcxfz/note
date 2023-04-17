/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/26 ���ڶ� 15:10:12                       */
/*==============================================================*/


drop table if exists project_apply;

/*==============================================================*/
/* Table: project_apply                                         */
/*==============================================================*/
create table project_apply
(
   id                   varchar(36) not null comment '����',
   start_time           datetime comment '��ʼʱ��(������Ŀ)',
   end_time             datetime comment '����ʱ�䣨������Ŀ��',
   cancle               tinyint(4) not null default 0 comment '�Ƿ�����ȡ������',
   id_del               tinyint(4) not null default 0 comment '�߼�ɾ��',
   project              varchar(36) not null comment 'ѧϰ��Ŀ����',
   create_time          datetime not null default CURRENT_TIMESTAMP comment '����ʱ��',
   create_by            varchar(36) not null default NULL comment '������',
   update_tme           datetime not null default CURRENT_TIMESTAMP comment '����ʱ��',
   update_by            varchar(36) not null default NULL comment '������',
   org_id               varchar(36) comment '��������',
   primary key (id)
);

alter table project_apply comment 'ѧϰ��Ŀ������';

