import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "java基础知识",
    prefix: "/posts/个人学习/javase/",
    children: [
      { text: "常用类", icon:"Links",link: "java常用类" },
      { text: "面向对象", icon:"Links",link: "面向对象" },
      { text: "集合框架", icon:"Links",link: "集合" },
      { text: "IO流", icon:"Links",link: "IO流" },
      { text: "多线程基础", icon:"Links",link: "多线程基础" },
      { text: "网络编程", icon:"Links",link: "网络编程" },
      { text: "类加载器和反射", icon:"Links",link: "类加载器和反射" },
      { text: "泛型强化", icon:"Links",link: "泛型强化" },
      { text: "xml、dtd、schema", icon:"Links",link: "xml、dtd、schema" },
      { text: "枚举、注解、单元测试、日志", icon:"Links",link: "枚举、注解、单元测试、日志" },

    ],
  },


  {
    text: "后端框架",
    prefix: "/posts/个人学习",
    children: [
      { text: "Spring Security", icon:"Links",link: "/框架学习/springSecurity学习" },
      { text: "Spring高级", icon:"Links",link: "/框架学习/spring高级" },
      { text: "单体项目搭建", icon:"Links",link: "/框架学习/单体项目搭建套路" },
    ],
  },

  {
    text: "中间件",
    prefix: "/posts/个人学习",
    children: [
      { text: "RabbitMQ学习", icon:"Links",link: "/中间件/rabbitmq-b站尚硅谷" },
      { text: "Redis学习", icon:"Links",link: "/中间件/redis-b站黑马2022版" },
      { text: "高可用RabbitMQ搭建", icon:"Links",link: "/中间件/haproxy+Keepalive高可用mq" },
      { text: "Redis安装", icon:"Links",link: "/中间件/资料/Redis安装说明" },
      { text: "MySQL基础", icon:"Links",link: "/MySQL/基础篇" },
      { text: "MySQL高级", icon:"Links",link: "/MySQL/高级篇" },
      { text: "linux下安装MySQL", icon:"Links",link: "/MySQL/linux下安装MySQL" },
    ],
  },

  {
    text: "工具学习",
    prefix: "/posts/个人学习",
    children: [
      { text: "EasyExcel学习", icon:"Links",link: "/工具学习/easyExcel学习" },
      { text: "fastdfs", icon:"Links",link: "/工具学习/fastdfs" },
      { text: "git", icon:"Links",link: "/工具学习/git" },
      { text: "jenkeis", icon:"Links",link: "/工具学习/jenkeis学习" },
      { text: "jwt", icon:"Links",link: "/工具学习/jwt学习" },
      { text: "mapstruct", icon:"Links",link: "/工具学习/mapstruct学习" },
      { text: "minio简单使用", icon:"Links",link: "/工具学习/minio简单使用" },
      { text: "mybatis-plus-generator", icon:"Links",link: "/工具学习/mybatis-plus-generator学习" },
      { text: "springboot整合swagger3", icon:"Links",link: "/工具学习/springboot整合swagger3" },
      { text: "常用命令", icon:"Links",link: "/工具学习/常用命令" },

    ],
  },

  {
    text: "微服务",
    prefix: "/posts/个人学习",
    children: [
      { text: "Spring Cloud Netflix", icon:"Links",link: "/微服务/cloud笔记" },
      { text: "Spring Cloud Alibaba", icon:"Links",link: "/微服务/cloud alibaba笔记" },
    ],
  },

  {
    text: "前端",
    prefix: "/posts/个人学习",
    children: [
      { text: "Vue学习", icon:"Links",link: "/前端/B站vue学习笔记" },
      { text: "Vue笔记", icon:"Links",link: "/前端/vue学习-零碎" },
    ],
  },

  {
    text: "Python",
    prefix: "/posts/个人学习",
    children: [
      { text: "Python基础", icon:"Links",link: "/Python/Python基础" },
    ],
  },

  {
    text: "计算机基础",
    prefix: "/posts/个人学习",
    children: [
      { text: "linux基础", icon:"Links",link: "/华清远见/linux基础" },
    ],
  },

  {
    text: "工作总结",
    prefix: "/posts/工作总结",
    children: [
      { text: "aop实现日志收集", icon:"Links",link: "/hlxx/aop实现日志收集" },
      { text: "logback整合", icon:"Links",link: "/hlxx/logback整合" },
      { text: "广东省统一身份认证平台对接", icon:"Links",link: "/hlxx/广东省统一身份认证平台对接" },
      { text: "专家系统总结", icon:"Links",link: "/hlxx/专家系统总结" },
      { text: "考试微服务-改卷管理-接口优化", icon:"Links",link: "/wd/考试微服务-改卷管理-接口优化" },
      { text: "mq实现各模块冗余字段同步思路", icon:"Links",link: "/wd/mq实现各模块冗余字段同步思路" },
    ],
  },

]);
