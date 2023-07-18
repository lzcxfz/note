---
title: mybatis
date: 2023-07-19
category:
  - 后端框架
---

## 5-1-mybatis快速入门

### 01-简介

* 一款优秀的持久层框架、用于简化JDBC开发
* iBatis
* 官网：<a href='https://mybatis.org/mybatis-3/zh/index.html'>点击跳转</a>

持久层：

* 负责将数据保存到数据库的那一层代码
* JavaEE三层架构：表现层、业务层、持久层

框架：

* 半成品软件、可重用、通用的软件基础代码模型
* 在框架的基础之上构建软件编写更加高效、规范、通用、可扩展

JDBC缺点：

* 硬编码：数据库连接信息经常变动，JDBC那套代码我们是写死的字符串、sql也存在硬编码、
* 操作繁琐：手动设置参数、手动封装结果集

mybatis免除了几乎所有的JDBC代码，以及设置参数和获取结果集的工作。

### 02-环境搭建

需求：

* 创建user表、添加数据
* 创建模块、导入坐标
* 编写Mybatis核心配置文件->替换连接信息、解决硬编码问题
* 编写SQL映射文件->统一管理SQL语句，解决硬编码问题
* 编码
  * 定义pojo类
  * 加载核心配置文件、获取`SqlSessionFactory`对象
  * 获取`SqlSession`对象，执行SQL语句
  * 释放资源

ddl：

```sql
create database mybatis;
use mybatis;

drop table if exists tb_user;

create table tb_user(
	id int primary key auto_increment,
	username varchar(20),
	password varchar(20),
	gender char(1),
	addr varchar(30)
);



INSERT INTO tb_user VALUES (1, 'zhangsan', '123', '男', '北京');
INSERT INTO tb_user VALUES (2, '李四', '234', '女', '天津');
INSERT INTO tb_user VALUES (3, '王五', '11', '男', '西安');


```

创建module，导入依赖：

```xml
    <dependencies>

        <!-- mybatis -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.5</version>
        </dependency>
        <!-- mysql 驱动 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.32</version>
        </dependency>
        
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13</version>
            <scope>test</scope>
        </dependency>

        <!-- 添加slf4j日志api -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.20</version>
        </dependency>
        <!-- 添加logback-classic依赖 -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
        </dependency>
        <!-- 添加logback-core依赖 -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.2.3</version>
        </dependency>	

    </dependencies>
```

日志配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!--
        CONSOLE ：表示当前的日志信息是可以输出到控制台的。
    -->
    <appender name="Console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>[%level] %blue(%d{HH:mm:ss.SSS}) %cyan([%thread]) %boldGreen(%logger{15}) - %msg %n</pattern>
        </encoder>
    </appender>

    <logger name="com.lzc" level="DEBUG" additivity="false">
        <appender-ref ref="Console"/>
    </logger>


    <!--

      level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF
     ， 默认debug
      <root>可以包含零个或多个<appender-ref>元素，标识这个输出位置将会被本日志级别控制。
      -->
    <root level="DEBUG">
        <appender-ref ref="Console"/>
    </root>
</configuration>
```

### 03-核心配置文件

参考官网，创建`mybatis-config.xml`,<a href='https://mybatis.org/mybatis-3/zh/getting-started.html'>点击跳转</a>

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>

            <!--数据库配置信息-->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://www.iocaop.com:3306/mybatis?serverTimezone=UTC&amp;useSSL=false&amp;useServerPrepStmts=true"/>
                <property name="username" value="root"/>
                <property name="password" value="911823"/>
            </dataSource>

        </environment>
    </environments>
    
    <mappers>
        <!--加载SQL映射文件--> 
        <mapper resource="mapper/UserMapper.xml"/>
    </mappers>
</configuration>
```

创建`tb_user`对应的实体类：

```java
/**
 * 用户
 *
 * @author lzc
 * @date 2023/07/19
 */
@Data
public class User {

    /**
     * id
     */
    private Integer id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 性别
     */
    private char gender;

    /**
     * 地址
     */
    private String addr;

}
```

创建UserMapper.xml，需要将这个xml文件加载，在`mybatis-config.xml`中已经做过了。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="test">
    <select id="selectAll" resultType="com.lzc.mybatis.pojo.User">
        select * from tb_user;
    </select>
</mapper>
```

> 之类没有Mapper接口，所以命名空间使用test

编写测试类：

```java
public class MybatisDemo {
    public static void main(String[] args) throws Exception {
        // 加载核心配置文件
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        // 获取sqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        List<User> userList = sqlSession.selectList("test.selectAll");

        System.out.println("userList = " + userList);

    }
}

```

> `sqlSession.selectList("test.selectAll");`这一步直接使用`命名空间.id`就可以执行mapper.xml中对应的SQL语句

执行结果：

![image-20230719021218724](http://www.iocaop.com/images/2023-07/202307190212767.png)

![image-20230719021229303](http://www.iocaop.com/images/2023-07/202307190212333.png)