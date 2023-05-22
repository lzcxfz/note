---
title: logback整合并按日志级别输出到不同文件
date: 2023-05-22
category:
- 工作
- 日志收集
---

将不同级别的日志输出到不同的文件。

![image-20230522171321765](http://www.iocaop.com/images/2023-05/image-20230522171321765.png)

![image-20230522171337968](http://www.iocaop.com/images/2023-05/image-20230522171337968.png)

日志框架基础知识：<a href='https://blog.csdn.net/weixin_45433031/article/details/122476569'>点击跳转</a>

整合时参考的文章：<a href='https://blog.csdn.net/jfqqqqq/article/details/116658805'>点击跳转</a>

mybatis输出sql：<a href='https://mybatis.org/mybatis-3/logging.html'>点击跳转</a>

配置文件：

```yaml
logging:
  level:
    com.huilian.szes : debug
    org.springframework.security: trace
    io.swagger.models.parameters: error
  config: classpath:logback-spring.xml
mybatis-plus:
  configuration:
    logImpl: org.apache.ibatis.logging.slf4j.Slf4jImpl # 默认输出到日志文件
    #    logImpl: org.apache.ibatis.logging.stdout.StdOutImpl #默认输出到控制台
    map-underscore-to-camel-case: false
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.hlxx.api.entity
```

增加文件：logback-spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="false">

    <!--自定义变量，可通过命令行传递：日志位置-->
    <property name="LOG_HOME" value="logs/"/>
    <!--自定义变量，可通过命令行传递-->
    <property name="SELF_BLOCK" value="szes-api"/>
    <!--自定义变量，可通过命令行传递：root 日志级别-->
    <property name="LOG_LEVEL" value="info"/>

    <!--控制台日志， 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度,%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
    </appender>

    <!--debug 级别 文件日志，专门用来输出每个图层的日志内容 按照每天生成日志文件 -->
    <appender name="FILE_DEBUG" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--日志文件输出的文件名-->
            <FileNamePattern>${LOG_HOME}/${SELF_BLOCK}/debug/szes-api.debug.%d{yyyy-MM-dd}.%i.log</FileNamePattern>
            <maxFileSize>10MB</maxFileSize>
            <!--日志文件保留天数-->
            <MaxHistory>30</MaxHistory>
            <!--            <totalSizeCap>20GB</totalSizeCap>-->
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
        <!--记录info级别-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>debug</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!--info 级别 文件日志， 按照每天生成日志文件 -->
    <appender name="FILE_INFO" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--日志文件输出的文件名-->
            <FileNamePattern>${LOG_HOME}/${SELF_BLOCK}/info/szes-api.info.%d{yyyy-MM-dd}.%i.log</FileNamePattern>
            <maxFileSize>10MB</maxFileSize>
            <!--日志文件保留天数-->
            <MaxHistory>30</MaxHistory>
            <!--            <totalSizeCap>20GB</totalSizeCap>-->
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
        <!--记录info级别-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>info</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!--error 级别 文件日志， 按照每天生成日志文件 -->
    <appender name="FILE_ERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--日志文件输出的文件名-->
            <FileNamePattern>${LOG_HOME}/${SELF_BLOCK}/error/szes-api.error.%d{yyyy-MM-dd}.%i.log</FileNamePattern>
            <maxFileSize>10MB</maxFileSize>
            <!--日志文件保留天数-->
            <MaxHistory>30</MaxHistory>
            <!--       <totalSizeCap>20GB</totalSizeCap>-->
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
        <!--记录error级别-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>error</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!--warn 级别 文件日志， 按照每天生成日志文件 -->
    <appender name="FILE_WARN" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--日志文件输出的文件名-->
            <FileNamePattern>${LOG_HOME}/${SELF_BLOCK}/warn/szes-api.warn.%d{yyyy-MM-dd}.%i.log</FileNamePattern>
            <maxFileSize>10MB</maxFileSize>
            <!--日志文件保留天数-->
            <MaxHistory>30</MaxHistory>
            <!--     <totalSizeCap>20GB</totalSizeCap>-->
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
        <!--记录warn级别-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>warn</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <logger name="jdbc.sqltiming" level="debug"/>
    <logger name="com.ibatis" level="debug"/>
    <logger name="com.ibatis.common.jdbc.SimpleDataSource" level="debug"/>
    <logger name="com.ibatis.common.jdbc.ScriptRunner" level="debug"/>
    <logger name="com.ibatis.sqlmap.engine.impl.SqlMapClientDelegate" level="debug"/>
    <logger name="java.sql.Connection" level="debug"/>
    <logger name="java.sql.Statement" level="debug"/>
    <logger name="java.sql.PreparedStatement" level="debug"/>
    <logger name="java.sql.ResultSet" level="debug"/>
    <logger name="java.sql" level="debug"/>
    <logger name="org.springframework" level="WARN"/>
    <logger name="com.huilian.szes.api.mapper" level="DEBUG"/>
    <logger name="com.huilian.szes.api.ApiApplication" level="${LOG_LEVEL}">
        <appender-ref ref="FILE_DEBUG"/>
    </logger>
    <root level="${LOG_LEVEL}">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="FILE_DEBUG"/>
        <appender-ref ref="FILE_INFO"/>
        <appender-ref ref="FILE_WARN"/>
        <appender-ref ref="FILE_ERROR"/>
    </root>

</configuration>
```

除了项目本身的日志，自己打印日志，可以在类加注解`@Slf4j`，自己输出不同级别的日志，会收集到对应的文件中。

如下：

![image-20230522172147331](http://www.iocaop.com/images/2023-05/image-20230522172147331.png)