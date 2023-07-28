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

### 05-Mapper代理开发

在上面我们已经通过`sqlSession`实现了通过namespace和id，执行SQL，查询数据库，但是存在问题：namespace和id<span style="background-color:pink;">存在硬编码问题</span>。

参考官网：

![image-20230719230152968](http://www.iocaop.com/images/2023-07/202307192301026.png)

目的：

* 解决原生方式中的硬编码问题
* 简化后期执行SQL

步骤：

* 定义SQL映射文件同名的Mapper接口，并且将Mapper接口和SQL映射文件放在同一目录下
* 设置SQL映射文件中的namespace为Mapper接口全限定名
* 在Mapper接口中定义方法，方法名就是SQL映射文件中SQL语句的id，并且保持参数类型和返回值类型一致。
* 编码：
  * 通过SqlSession的getMapper方法获取Mapper接口的代理对象
  * 调用对应的方法完成SQL执行

> 如果Mapper接口每次和SQL映射文件名称相同，并且在同一目录下，可以通过扫包的方式简化SQL映射文件的加载
>
> ```java
>         <package name="com.lzc.mybatis.mapper"/>
> ```

创建接口，与SQL映射文件同名，并定义方法，与需要执行的SQL的id一致：

```java
public interface UserMapper {

    /**
     * 查询所有用户
     *
     * @return {@link User}
     */
    List<User> selectAll();
}

```

修改SQL映射文件的namespace：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lzc.mybatis.mapper.UserMapper">
    <select id="selectAll" resultType="com.lzc.mybatis.pojo.User">
        select * from tb_user;
    </select>
</mapper>
```

编码，获取代理对象，执行方法：

```java
public class MybatisDemo02 {
    public static void main(String[] args) throws Exception {
        // 加载核心配置文件
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        // 获取sqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        List<User> userList = mapper.selectAll();
        System.out.println("userList = " + userList);

        // 释放资源
        sqlSession.close();

    }
}
```

执行可以看到:这是代理对象，通过代理对象调用对应的方法，相当于:

```java
        SqlSession sqlSession = sqlSessionFactory.openSession();
        List<User> userList = sqlSession.selectList("UserMapper.selectAll");
```

![image-20230719232044833](http://www.iocaop.com/images/2023-07/202307192320868.png)

执行结果：

![image-20230719232057072](http://www.iocaop.com/images/2023-07/202307192320102.png)

### 06-核心配置文件补充

参考官网：<a href='https://mybatis.org/mybatis-3/zh/configuration.html'>点击跳转</a>

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
<!--起别名，在Mapper.xml中就不需要写全限定名了，默认别名就是类名，不包括包名-->
    <typeAliases>
        <package name="com.lzc.mybatis.pojo"/>
    </typeAliases>

<!--配置多个环境，通过default进行切换-->
    <environments default="development">
        <!--开发环境-->
        <environment id="development">
<!--    事务管理，默认jdbc，后面交给spring，这里不管        -->
            <transactionManager type="JDBC"/>
            <!--数据库配置信息-->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://www.iocaop.com:3306/mybatis?serverTimezone=UTC&amp;useSSL=false&amp;useServerPrepStmts=true"/>
                <property name="username" value="root"/>
                <property name="password" value="911823"/>
            </dataSource>
        </environment>

        <environment id="test">
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
<!--        <package name="com.lzc.mybatis.mapper"/>-->
    </mappers>
</configuration>
```

## 5-2-mybatis查询

### 07-环境准备

表：

```sql
-- 删除tb_brand表
drop table if exists tb_brand;
-- 创建tb_brand表
create table tb_brand
(
    -- id 主键
    id           int primary key auto_increment,
    -- 品牌名称
    brand_name   varchar(20),
    -- 企业名称
    company_name varchar(20),
    -- 排序字段
    ordered      int,
    -- 描述信息
    description  varchar(100),
    -- 状态：0：禁用  1：启用
    status       int
);
-- 添加数据
insert into tb_brand (brand_name, company_name, ordered, description, status)
values ('三只松鼠', '三只松鼠股份有限公司', 5, '好吃不上火', 0),
       ('华为', '华为技术有限公司', 100, '华为致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界', 1),
       ('小米', '小米科技有限公司', 50, 'are you ok', 1);


SELECT * FROM tb_brand;
```

商品表实现如下功能：

查询：

* 查询所有数据
* 查看详情
* 条件查询

添加

修改：

* 修改所有字段
* 修改动态字段

删除：

* 删除一个
* 批量删除

创建实体类：

```java
/**
 * 品牌类
 *
 * @author lzc
 * @date 2023/07/18
 */
@Data
public class Brand {

    /**
     * id 主键
     */
    private Integer id;

    /**
     * 品牌名称
     */
    private String brandName;

    /**
     * 企业名称
     */
    private String companyName;

    /**
     * 排序字段
     */
    private Integer ordered;

    /**
     * 描述信息
     */
    private String description;

    /**
     * 状态：0：禁用  1：启用
     */
    private Integer status;
}

```

安装插件Mybatis-X

### 08-查询所有数据

创建接口：

```java
public interface BrandMapper {

    List<Brand> selectAll();
}

```

创建对应的BrandMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lzc.mybatis.mapper.BrandMapper">
    <select id="selectAll" resultType="com.lzc.mybatis.pojo.Brand">
        select * from tb_brand;
    </select>
</mapper>
```

加载Mapper.xml

```xml
        <mapper resource="mapper/BrandMapper.xml"/>
```

获取代理对象，执行SQL：

```java
public class MybatisDemo03 {
    public static void main(String[] args) throws Exception{
        // 加载核心配置文件
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        // 获取sqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 这里获取到的是Proxy动态代理对象
        BrandMapper mapper = sqlSession.getMapper(BrandMapper.class);

        List<Brand> brands = mapper.selectAll();
        System.out.println("brands = " + brands);
    }
}
```

![image-20230719234841589](http://www.iocaop.com/images/2023-07/202307192348635.png)

### 09-查询详情

根据id查询某条记录详情：

创建方法：

```java
public interface BrandMapper {

    List<Brand> selectAll();

    Brand selectById(@Param("id") Integer id);
}
```

编写SQL：

```xml
    <select id="selectById" resultType="com.lzc.mybatis.pojo.Brand">
        select * from tb_brand where id = #{id}
    </select>
```

编码运行：

```java
public class MybatisDemo04 {
    public static void main(String[] args) throws Exception{
        // 加载核心配置文件
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        // 获取sqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 这里获取到的是Proxy动态代理对象
        BrandMapper mapper = sqlSession.getMapper(BrandMapper.class);

        Brand brand = mapper.selectById(1);
        System.out.println("brand = " + brand);
    }
}
```

![image-20230720000653593](http://www.iocaop.com/images/2023-07/202307200006627.png)

总结：

* 参数占位符

  * \#\{\}：执行SQL时会将\#\{\}占位符替换为?，将来自动设置参数值
  * \${}：拼SQL，会存在SQL注入问题
  * 使用时机：参数传递使用\#\{\}，如果要对表名、列名进行动态设置，只能使用\${}进行SQL拼接

* `parameterType`：用于设置参数类型，可以省略

* SQL语句中特殊字符处理

  * 转义字符

  * ```xml
    <![CDATA[内容]]>
    ```

### 10-条件查询

多条件查询：

定义好`resultMap`：

```xml
    <resultMap id="BrandResultMap" type="com.lzc.mybatis.pojo.Brand">
        <id column="id" property="id"/>
        <result column="brand_name" property="brandName"/>
        <result column="company_name" property="companyName"/>
        <result column="ordered" property="ordered"/>
        <result column="description" property="description"/>
        <result column="status" property="status"/>
    </resultMap>
```

第一种：散装参数

```java
    Brand selectByCondition(@Param("brandName") String brandName,
                            @Param("companyName") String companyName,
                            @Param("status") Integer status);
```

第二种：对象做参数

```java
    Brand selectByCondition(Brand brand);
```

第三种：Map做参数

```java
    Brand selectByCondition(Map map);
```

对应的都是同一个SQL映射：

```xml
    <select id="selectByCondition" resultMap="BrandResultMap">
        SELECT * FROM tb_brand WHERE
        brand_name LIKE CONCAT('%', #{brandName}, '%')
        AND company_name LIKE CONCAT('%', #{companyName}, '%')
        AND status = #{status}
    </select>
```

> Mapper接口中的方法可以重载，但是映射文件中的id不能重复，重载是一种可以实现不同查询条件的灵活方式

编码调用：

```java
public class MybatisDemo05 {
    public static void main(String[] args) throws Exception{
        // 加载核心配置文件
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        // 获取sqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 这里获取到的是Proxy动态代理对象
        BrandMapper mapper = sqlSession.getMapper(BrandMapper.class);

        // 散装参数
        Brand brand = mapper.selectByCondition("小","小",1);
        System.out.println("brand = " + brand);


        // 对象参数
        Brand query = new Brand();
        query.setBrandName("小");
        query.setCompanyName("小");
        query.setStatus(1);

        brand = mapper.selectByCondition(query);
        System.out.println("brand = " + brand);


        // Map参数
        HashMap<String, Object> map = new HashMap<>();
        map.put("brandName","小");
        map.put("companyName","小");
        map.put("status",1);
        brand = mapper.selectByCondition(map);
        System.out.println("brand = " + brand);
    }
}
```

![image-20230720013658943](http://www.iocaop.com/images/2023-07/202307200136973.png)

总结：

散装参数：参数数量超过1，需要使用`@Param(SQL中的参数占位符的名称)`

实体类封装参数：只需要保证SQL中的参数名和实体类属性名对应上，即可设置成功。

map集合参数：只需要保证SQL中的参数名和map集合的键的名称对应上，即可设置成功。

### 11-多条件-动态条件查询

```xml
    <select id="selectByCondition" resultMap="BrandResultMap">
        SELECT * FROM tb_brand 
        <where>
            <if test="brandName != null and brandName != ''">
                brand_name LIKE CONCAT('%', #{brandName}, '%')
            </if>

            <if test="companyName != null and companyName != ''">
                AND company_name LIKE CONCAT('%', #{companyName}, '%')
            </if>

            <if test="status != null">
                AND status = #{status}
            </if>
        </where>
    </select>
```

动态SQL：

if：用于判断参数是否有值，使用`test`属性进行条件判断

存在问题：第一个条件不需要逻辑运算法

解决方法：使用恒等式`1=1`或者`<where>`标签替换`where`关键字

### 12-单条件-动态条件查询

```xml
    <select id="selectByConditionWhen" resultMap="BrandResultMap">
        SELECT * FROM tb_brand
        <where>
            <choose>
                <when test="brandName != null and brandName != ''">
                    brand_name LIKE CONCAT('%', #{brandName}, '%')
                </when>

                <when test="companyName != null and companyName != ''">
                    AND company_name LIKE CONCAT('%', #{companyName}, '%')
                </when>

                <when test="status != null">
                    AND status = #{status}
                </when>
            </choose>
        </where>
    </select>
```

## 5-3-mybatis-添加、修改、删除

### 14-添加-主键返回

```java
public class MybatisDemo06 {

    public static void main(String[] args) throws Exception {

        // 加载核心配置文件
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        // 获取sqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 这里获取到的是Proxy动态代理对象
        BrandMapper mapper = sqlSession.getMapper(BrandMapper.class);

        // 需要插入的数据
        Brand brand = new Brand();
        brand.setBrandName("波导手机");
        brand.setCompanyName("波导手机有限公司");
        brand.setStatus(1);
        brand.setOrdered(1);
        brand.setDescription("手机中的战斗机");

        // 插入数据
       int row =  mapper.insertByBrand(brand);
       if (row>0) {
           System.out.println("插入成功");
           System.out.println("row = " + row);
       }

       // 提交事务
       sqlSession.commit();
    }
}
```

```java

    /**
     * 插入品牌
     *
     * @param brand 品牌
     * @return int
     */
    int insertByBrand(Brand brand);
```

```xml
    <insert id="insertByBrand">
        insert into tb_brand(brand_name, company_name, ordered, description, status) values (#{brandName},
        #{companyName}, #{ordered}, #{description}, #{status})
    </insert>
```

运行：

![image-20230720173338815](http://www.iocaop.com/images/2023-07/image-20230720173338815.png)

这时候，返回值是影响的行数，需要返回主键，修改一下：

```xml
    <insert id="insertByBrand" useGeneratedKeys="true" keyProperty="id">
        insert into tb_brand(brand_name, company_name, ordered, description, status) values (#{brandName},
        #{companyName}, #{ordered}, #{description}, #{status})
    </insert>
```

这样，插入后的id的值，会设置到原来的对象中：

![image-20230720173801298](http://www.iocaop.com/images/2023-07/image-20230720173801298.png)

![image-20230720173807937](http://www.iocaop.com/images/2023-07/image-20230720173807937.png)

### 15-修改-修改全部字段

```xml
    <update id="update">
        update tb_brand set
        brand_name = #{brandName},
        company_name = #{companyName},
        ordered = #{ordered},
        description = #{description},
        status = #{status}
        where id = #{id}
    </update>
```

### 16-修改-修改动态字段

```xml
    <update id="updateDynamic">
        update tb_brand
        <set>
            <if test="brandName != null and brandName != ''">
                brand_name = #{brandName},
            </if>
            <if test="companyName != null and companyName != ''">
                company_name = #{companyName},
            </if>
            <if test="ordered != null">
                ordered = #{ordered},
            </if>
            <if test="description != null and description != ''">
                description = #{description},
            </if>
            <if test="status != null">
                status = #{status}
            </if>
        </set>
        where id = #{id}
    </update>
```

### 17-删除-批量删除

```java
    /**
     * 批量删除
     *
     * @param ids id
     */
    void deleteByIds(@Param("ids") List<Integer> ids);
```

```xml
    <delete id="deleteByIds">
        delete from tb_brand where id in
        <foreach collection="ids" item="id" open="(" separator="," close=")">
            #{id}
        </foreach>
    </delete>
```

如果在xml中的`foreach`的`collection`属性需要使用变量名称，则要加注解`@Param("ids")`

如果是数组,可以不加注解，在`collection`属性，使用`array`。

### 19-参数传递

mybatis接口可以接受各种参数：

* 单个参数
  * POJO
  * Map
  * Collection
  * 其他
* 多个参数
  * 基本数据类型、String、包装类、等，需要使用`@Param`注解。为什么？

> Mybatis提供了`ParamNameResolver`类来进行参数封装。

当mybatis发现接口参数是多个时，会创建Map集合，将参数封装进去，map需要对应的键值。

默认基本数据类型为:

```java
map.put("param1",参数值1);
map.put("param2",参数值2);
```

如果写了`@Param("key")`

则会是：

```java
map.put("key",参数值1);
```

看源码：`ParamNameResolver`类的`getNamedParams`方法

```java
  public Object getNamedParams(Object[] args) {
    final int paramCount = names.size();
    if (args == null || paramCount == 0) {
      return null;
    } else if (!hasParamAnnotation && paramCount == 1) {
      Object value = args[names.firstKey()];
      return wrapToMapIfCollection(value, useActualParamName ? names.get(0) : null);
    } else {
      final Map<String, Object> param = new ParamMap<>();
      int i = 0;
      for (Map.Entry<Integer, String> entry : names.entrySet()) {
        param.put(entry.getValue(), args[entry.getKey()]);
        // add generic param names (param1, param2, ...)
        final String genericParamName = GENERIC_NAME_PREFIX + (i + 1);
        // ensure not to overwrite parameter named with @Param
        if (!names.containsValue(genericParamName)) {
          param.put(genericParamName, args[entry.getKey()]);
        }
        i++;
      }
      return param;
    }
  }
```

断点调试：

先不加注解：

![image-20230727115305866](http://www.iocaop.com/images/2023-07/image-20230727115305866.png)

![image-20230727150806880](http://www.iocaop.com/images/2023-07/image-20230727150806880.png)

加注解：

![image-20230727150933737](http://www.iocaop.com/images/2023-07/image-20230727150933737.png)

原来的`arg0`等被替换了。在xml中，可以使用注解指定的参数，也可以使用`param1`等。

如果是集合，则会走`wrapToMapIfCollection`方法转成map：

```java
  public static Object wrapToMapIfCollection(Object object, String actualParamName) {
    if (object instanceof Collection) {
      ParamMap<Object> map = new ParamMap<>();
      map.put("collection", object);
      if (object instanceof List) {
        map.put("list", object);
      }
      Optional.ofNullable(actualParamName).ifPresent(name -> map.put(name, object));
      return map;
    } else if (object != null && object.getClass().isArray()) {
      ParamMap<Object> map = new ParamMap<>();
      map.put("array", object);
      Optional.ofNullable(actualParamName).ifPresent(name -> map.put(name, object));
      return map;
    }
    return object;
  }

```

总结：

![image-20230727151713985](http://www.iocaop.com/images/2023-07/image-20230727151713985.png)

### 20-注解开发

