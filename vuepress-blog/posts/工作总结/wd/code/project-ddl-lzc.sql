/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/15 ������ 15:58:58                       */
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
   id                   varbinary(36) not null comment '����',
   project_id           varbinary(36) not null comment '������Ŀ����',
   resource_type        int(4) not null comment 'Ӧ�ù�����Դ����',
   resource_id          varbinary(36) not null comment 'Ӧ�ù�����Դ����',
   is_available         int(4) not null comment '�Ƿ����',
   is_del               int(4) not null comment '�߼�ɾ��',
   create_by            varbinary(36) not null comment '������',
   create_time          datetime not null comment '����ʱ��',
   update_by            varbinary(36) not null comment '������',
   update_time          datetime not null comment '����ʱ��',
   primary key (id)
);

alter table project_app comment 'ѧϰ��ĿӦ�ñ�';

/*==============================================================*/
/* Table: project_categorys                                     */
/*==============================================================*/
create table project_categorys
(
   id                   varchar(36) not null comment '����id',
   name                 varchar(64) not null comment '��������',
   description          varchar(512) not null comment '����',
   system_top           int(4)  comment '�Ƿ�ϵͳ���ö� 0��1��',
   available            int(4) not null comment '�Ƿ����� 0��1��',
   sort_no              int(4) comment '��ʾ˳��',
   customer_id          varchar(36) comment '�ͻ�id',
   org_id               varchar(36) comment '��֯id',
   is_del               int(4) not null comment '�߼�ɾ��',
   create_by            varchar(36) not null comment '������',
   create_time          datetime not null comment '����ʱ��',
   update_by            varchar(36) not null comment '������',
   update_time          datetime not null comment '����ʱ��',
   primary key (id)
);

alter table project_categorys comment 'ѧϰ��Ŀ�����';

/*==============================================================*/
/* Table: project_classroom                                     */
/*==============================================================*/
create table project_classroom
(
   id                   varchar(36) not null comment '����',
   room_name            varchar(80) not null comment '��������',
   address              varchar(80) not null comment '�ص�',
   remark               varchar(500) comment '��ע',
   is_del               int(4) not null comment '�߼�ɾ��',
   create_by            varchar(36) not null comment '������',
   create_time          datetime not null comment '����ʱ��',
   update_by            varchar(36) not null comment '�༭��',
   update_time          datetime not null comment '�༭ʱ��',
   primary key (id)
);

alter table project_classroom comment '���ұ�';

/*==============================================================*/
/* Table: project_course_record                                 */
/*==============================================================*/
create table project_course_record
(
   id                   varchar(36) not null comment '����',
   user_id              varchar(36) not null comment '�û�����',
   course_id            varchar(36) not null comment '�γ�����',
   is_learn             int(4) comment '�Ƿ���ѧϰ',
   duration             datetime not null comment '�γ�ѧϰʱ��',
   finish_time          datetime comment '���ʱ��',
   is_del               int(4) not null comment '�߼�ɾ��',
   create_by            varchar(36) not null comment '������',
   create_time          datetime not null comment '����ʱ��',
   update_by            varchar(36) not null comment '������',
   update_time          datetime not null comment '����ʱ��',
   primary key (id)
);

alter table project_course_record comment '�û��γ�ѧϰ��¼';

/*==============================================================*/
/* Table: project_position                                      */
/*==============================================================*/
create table project_position
(
   id                   varchar(36) not null comment '����',
   souecr_position_id   varchar(36) not null comment '��λ����',
   target_position_id   varchar(36) not null comment 'Ŀ���λ����',
   progress_type        int(4) not null comment '��λ��չ����',
   is_del               int(4) not null comment '�߼�ɾ��',
   sort_no              int(4) comment '����',
   is_publish           int(4) not null comment '�Ƿ񷢲�',
   publish_by           varchar(36) comment '������',
   create_by            varchar(36) not null comment '������',
   create_time          datetime not null comment '����ʱ��',
   update_by            varchar(36) not null comment '������',
   update_time          datetime not null comment '����ʱ��',
   publish_time         datetime comment '����ʱ��',
   primary key (id)
);

alter table project_position comment 'ѧϰ��Ŀ��λ��չ��';

/*==============================================================*/
/* Table: project_position_activity                             */
/*==============================================================*/
create table project_position_activity
(
   id                   varchar(36) not null comment '����',
   activity_id          varchar(36) not null comment 'ѧϰ�����',
   position_id          varchar(36) not null comment '��λ��չ����',
   sort_no              int(4) comment '����',
   activity_name        varchar(80) not null comment 'ѧϰ�����',
   activity_type        int(4) not null comment 'ѧϰ�����',
   is_del               int(4) not null comment '�߼�ɾ��',
   create_by            varchar(36) not null comment '������',
   create_time          datetime not null comment '����ʱ��',
   update_by            varchar(36) not null comment '������',
   update_time          datetime not null comment '����ʱ��',
   primary key (id)
);

alter table project_position_activity comment 'ѧϰ��Ŀ��λ��չ���ϵ��';

/*==============================================================*/
/* Table: project_task_record                                   */
/*==============================================================*/
create table project_task_record
(
   id                   varchar(36) not null comment '����',
   task_template_id     varchar(36) not null comment '�����Ӧ�ı�ģ���������',
   task_column_id       varchar(36) not null comment '��ǰ�������������Ŀ����',
   user_id              varchar(36) comment '����������:ѧԱ',
   mentor_id            varchar(36) comment '����������:��ʦ',
   is_finish            int(4) not null comment '�Ƿ������:0-δ���;1-�����',
   colunm_is_finish     int(4) comment '��Ŀ�Ƿ����',
   colunm_finish_time   int(4) comment '��Ŀ���ʱ��',
   cycle_id             varchar(36) comment '����ѭ����¼����',
   is_del               int(4) not null comment '�߼�ɾ��',
   create_by            varchar(36) not null comment '������',
   create_time          datetime not null comment '����ʱ��',
   update_by            varchar(36) not null comment '������',
   update_time          datetime not null comment '����ʱ��',
   primary key (id)
);

alter table project_task_record comment '���������¼��';

/*==============================================================*/
/* Table: project_task_record_detail                            */
/*==============================================================*/
create table project_task_record_detail
(
   id                   varchar(36) not null comment '����',
   record_id            varchar(36) not null comment '�����¼����',
   task_template_id     varchar(36) not null comment '�����Ӧ�ı�ģ���������',
   task_column_id       varchar(36) not null comment '��ǰ�������������Ŀ����',
   user_id              varchar(36) not null comment '��Ŀ����������:��ʦ��������ѧԱ����',
   object_user_id       varchar(36) comment 'Ŀ���û�����:1.ѧԱ����ʱ��Ӧ��ʦ����;2.��ʦ����ʱ,��Ӧ��ѧԱ����',
   text_content         varchar(500) comment '��Ŀ��������Ϊ�ı�ʱ,��д���ı�����',
   evaluate_record_id   varchar(36) comment '��Ŀ��������Ϊ����ʱ,�û���������¼����',
   status               int(4) not null comment '����״̬:0-������;1-�Ѵ���;2-���˻�',
   is_del               int(4) not null comment '�߼�ɾ��',
   create_by            varchar(36) not null comment '������',
   create_time          datetime not null comment '����ʱ��',
   update_by            varchar(36) not null comment '������',
   update_time          datetime not null comment '����ʱ��',
   primary key (id)
);

alter table project_task_record_detail comment '���������¼�����';

/*==============================================================*/
/* Table: project_task_reject_detail                            */
/*==============================================================*/
create table project_task_reject_detail
(
   id                   varchar(36) not null comment '����',
   detail_id            varchar(36) comment '�������������¼���������',
   submit_time          datetime comment '�ύʱ��',
   remark               varchar(500) comment '����',
   is_del               int(4) comment '�߼�ɾ��',
   create_by            varchar(36) comment '������',
   create_time          datetime comment '����ʱ��',
   update_by            varchar(36) comment '������',
   update_time          datetime comment '����ʱ��',
   primary key (id)
);

alter table project_task_reject_detail comment '�������ؼ�¼��';

/*==============================================================*/
/* Table: room_record                                           */
/*==============================================================*/
create table room_record
(
   id                   varchar(36) comment '����',
   room_id              varchar(36) comment '����id',
   status               int(4) comment 'ԤԼ״̬ 0��ȡ�� 1��ԤԼ',
   level_id             varchar(36) comment 'ԤԼʱ��id',
   start_time           datetime comment 'ԤԼ��ʼʱ��',
   end_time             datetime comment 'ԤԼ����ʱ��',
   create_by            varchar(36) comment '������',
   create_time          datetime comment '����ʱ��',
   update_by            varchar(36) comment '�༭��',
   update_time          datetime comment '�༭ʱ��',
   is_del               int(4) comment '�߼�ɾ��'
);

alter table room_record comment '����ԤԼ��¼��';

/*==============================================================*/
/* Table: time_level                                            */
/*==============================================================*/
create table time_level
(
   id                   varchar(36) comment '����',
   start_time           datetime comment 'ʱ�ο�ʼʱ��',
   end_time             datetime comment 'ʱ�ν���ʱ��',
   is_del               int(4) comment '�߼�ɾ��',
   sort_no              int(4) comment '��ʾ˳��',
   create_by            varchar(36) comment '������',
   create_time          datetime comment '����ʱ��',
   update_by            varchar(36) comment '�༭��',
   update_time          datetime comment '�༭ʱ��'
);

alter table time_level comment 'ԤԼʱ�α�';

