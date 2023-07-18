---
title: JDBC
date: 2023-07-17
category:
  - javaweb
---

## 3-1-JDBC快速入门

### 01-JDBC简介

java语言操作关系型数据库的一套API。

![image-20230717150313031](http://www.iocaop.com/images/2023-07/image-20230717150313031.png)

JDBC本质：

* sun公司定义的一套操作所有关系型数据库的规则(接口)。
* 各个数据库厂商去实现这套接口，提供数据库驱动jar包。
* 我们可以使用这套接口编程，正在执行的代码是驱动jar包中的实现类。

好处：

* 各数据库厂商使用相同的接口，Java代码不需要针对不同的数据库进行分别开发
* 可随时替换底层数据库，访问数据库的Java代码基本不变

## 3-2-API详解

### 02-快速入门

步骤：

* 注册驱动：反射加载类到内存中，告诉 Java 程序要使用哪个数据库驱动程序来连接和操作特定的数据库。

  ```java
          // 注册驱动
          Class.forName("com.mysql.jdbc.Driver");
  ```

* 获取连接：Java和数据库进行连接

  ```java
          // 获取连接
          Connection connection = DriverManager.getConnection(url, username, password);
  ```

* 定义SQL：要执行的SQL语句

  ```java
          // 定义sql
          String sql = "select * from pan_account";
  ```

* 获取执行SQL的对象：执行SQL之前需要先获取执行的对象

  ```java
          // 获取执行sql的对象
          Statement statement = connection.createStatement();
  ```

* 执行SQL：其实是把SQL语句发送给数据库，让数据库来执行

  ```java
          // 执行sql
          ResultSet resultSet = statement.executeQuery(sql);
  ```

* 处理结果集

  ```java
          while (resultSet.next()) {
              System.out.println(resultSet.getString("nickname"));
          }
  ```

* 释放资源

  ```java
          // 释放资源
          resultSet.close();
          statement.close();
          connection.close();
  ```

  

完整代码：

```java
public class JdbcDemo {

    public static void main(String[] args) throws Exception{
        String url = "jdbc:mysql://www.iocaop.com:3306/crud?serverTimezone=UTC&useSSL=false";
        String username = "root";
        String password = "911823";

        // 注册驱动
        Class.forName("com.mysql.jdbc.Driver");

        // 获取连接
        Connection connection = DriverManager.getConnection(url, username, password);

        // 定义sql
        String sql = "select * from pan_account";

        // 获取执行sql的对象
        Statement statement = connection.createStatement();

        // 执行sql
        ResultSet resultSet = statement.executeQuery(sql);

        // 处理结果
        while (resultSet.next()) {
            System.out.println(resultSet.getString("nickname"));
        }

        // 释放资源
        resultSet.close();
        statement.close();
        connection.close();
    }

}
```

执行结果：

![image-20230717154420335](http://www.iocaop.com/images/2023-07/image-20230717154420335.png)

![image-20230717154427278](http://www.iocaop.com/images/2023-07/image-20230717154427278.png)

### 03-API详解-DriverManager

主要作用：

* 注册驱动
* 获取数据库连接

两个重要的方法：

![image-20230717160857380](http://www.iocaop.com/images/2023-07/image-20230717160857380.png)

为什么我们没有显式地调用`registerDriver`方法，而是这样：

```java
 Class.forName("com.mysql.jdbc.Driver");
```

学过类加载以及面向对象知识以后，可以知道，这行代码会将`Driver`类加载到内存，加载到内存后，会立即执行静态代码块：

```java
    static {
        try {
            DriverManager.registerDriver(new Driver());
        } catch (SQLException var1) {
            throw new RuntimeException("Can't register driver!");
        }
    }
```

在这里，执行了注册驱动的方法。

> mysql5之后，可以不注册了，会自动注册，在这个文件中记录了驱动全类名：原理还不知道
>
> ![image-20230717161817799](http://www.iocaop.com/images/2023-07/image-20230717161817799.png)

### 04-API详解-Connection

作用：

* 获取执行SQL的对象

  * 普通执行SQL对象

    ```java
         Statement statement = connection.createStatement();
    ```

  * 预编译SQL执行对象，防止SQL注入

    ```java
         PreparedStatement preparedStatement = connection.prepareStatement(sql);
    ```

  * 存储过程执行对象

    ```java
            CallableStatement callableStatement = connection.prepareCall(sql);
    ```

* 管理事务

  * MySQL事务管理

    ```tex
    开启事务：BEGIN;/START TRANSACTION;
    提交事务： COMMIT;
    回滚事务： ROLLBACK;
    MySQL默认自动提交事务
    ```

  * JDBC事务管理：`Connection`接口中定义了3个方法

    ```tex
    开启事务:setAutoCommit(boolean autoCommit)：true为自动提交事务，false为手动提交事务。
    提交事务:commit()
    回滚事务:rollback()
    ```
  
  代码：两条更新语句，用一个事务控制，要么全部执行成功，要么全部回滚。
  
  ```java
  public class JdbcDemo02 {
  
      public static void main(String[] args) throws Exception{
          String url = "jdbc:mysql://www.iocaop.com:3306/crud?serverTimezone=UTC&useSSL=false";
          String username = "root";
          String password = "911823";
  
          // 注册驱动
          Class.forName("com.mysql.jdbc.Driver");
  
          // 获取连接
          Connection connection = DriverManager.getConnection(url, username, password);
          // 手动提交事务
          connection.setAutoCommit(false);
  
          // sql
          String sql1 = "update pan_account set nickname = 'lzc' where id = 1";
          String sql2 = "update pan_account set url_token = 'lzc' where id = 1";
          Statement statement = null;
          try {
              statement = connection.createStatement();
              boolean execute1 = statement.execute(sql1);
              boolean execute2 = statement.execute(sql2);
  //            int i = 1 / 0;
              System.out.println(execute1);
              System.out.println(execute2);
              connection.commit();
          } catch (SQLException e) {
              // 事务回滚
              connection.rollback();
              throw new RuntimeException(e);
          }
  
          // 释放资源
          statement.close();
          connection.close();
  
      }
  }
  
  ```
  
  > 如果在 JDBC 中执行 SQL 语句时发生异常，而<span style="background-color:pink;">没有进行提交或回滚操作</span>，会导致数据库连接保持在未决的事务状态，<span style="background-color:pink;">可能会引发阻塞、资源占用和数据不一致等问题</span>。为了保持数据的一致性和可靠性，建议在执行完 SQL 语句后，根据业务逻辑进行适当的提交或回滚操作。

### 05-API详解-Statement

作用：

* 执行SQL

```tex
int executeUpdate(sql) 执行DML、DDL语句
DML语句返回影响的行数，DDL语句执行成功后也可能返回0

ResultSet executeQuery(sql) 执行DQL语句
返回ResultSet结果集对象
```

### 06-API详解-ResultSet

作用：

* 封装了DQL查询语句的结果

  ```tex
  ResultSet stmt.executeQuery(sql);执行DQL语句，返回ResultSet对象
  ```

* 获取查询结果

  ```tex
  boolean next() 将光标从当前位置向前移动一行，判断当前行是否为有效行
  返回值
  true：有效行，当前行有数据
  false：无效行，当前行没有数据
  ```

* 获取数据

  ```tex
  getXXX(参数)，如：int getInt(参数),String getString(参数)
  参数：
  int 列的编号，从1开始
  String 列的名称
  ```

  获取数据有很多类似的方法：

  ![image-20230717203028143](http://www.iocaop.com/images/2023-07/202307172030190.png)

使用步骤：

* 游标向下移动一行，判断该行是否有数据：`next`

* 获取数据：getXxx(参数)

  ```java
  // 循环判断游标是否是最后一行末尾
  while(rs.next()){
      rs.getXxx(参数);
  }
  ```

代码：

```java
public class JdbcDemo03 {
    public static void main(String[] args) throws Exception{
        String url = "jdbc:mysql://www.iocaop.com:3306/crud?serverTimezone=UTC&useSSL=false";
        String username = "root";
        String password = "911823";

        // 注册驱动
        Class.forName("com.mysql.jdbc.Driver");

        // 获取连接
        Connection connection = DriverManager.getConnection(url, username, password);

        // 执行的sql
        String sql  = "select * from pan_account";

        // 获取sql执行的对象
        Statement statement = connection.createStatement();

        // 执行sql，返回结果
        ResultSet resultSet = statement.executeQuery(sql);

        while (resultSet.next()){
            String id = resultSet.getString("id");
            System.out.println("id = " + id);

            String nickname = resultSet.getString("nickname");
            System.out.println("nickname = " + nickname);

            boolean svip = resultSet.getBoolean("svip");
            System.out.println("svip = " + svip);
            System.out.println("--------------------------------------");
        }

        resultSet.close();
        statement.close();
        connection.close();
    }
}

```

![image-20230717204125896](http://www.iocaop.com/images/2023-07/202307172041932.png)

![image-20230717204133105](http://www.iocaop.com/images/2023-07/202307172041141.png)

### 08-SQL注入演示

```java
public class JdbcDemo04 {

    public static void main(String[] args) throws Exception{

        String url = "jdbc:mysql://www.iocaop.com:3306/crud?serverTimezone=UTC&useSSL=false";
        String username = "root";
        String password = "911823";

        // 模拟前端输入
        String nickname = "lzc";
        String pwd = "jgkfdljkglfdjglkfd' or '1' = '1";

        // 注册驱动
        Class.forName("com.mysql.jdbc.Driver");

        // 获取连接
        Connection connection = DriverManager.getConnection(url, username, password);

        // 获取sql执行对象
        Statement statement = connection.createStatement();

        // sql拼接
        String sql  = "select * from pan_account where nickname = '" + nickname + "' and url_token = '" + pwd + "'";

        // 执行sql，返回结果
        ResultSet resultSet = statement.executeQuery(sql);
        if (resultSet.next()) {
            System.out.println("登录成功");
        } else {
            System.out.println("登录失败");
        }

        // 释放资源
        resultSet.close();
        statement.close();
        connection.close();

    }

}

```

![image-20230718105943472](http://www.iocaop.com/images/2023-07/image-20230718105943472.png)

### 09-API详解-PrepareStatement

作用：

* 预编译SQL并执行SQL语句

使用步骤：

* 获取`PrepareStatement`对象

  ```java
          // 执行的sql
          String sql = "select * from pan_account where nickname = ? and url_token = ?";
  
          // 获取sql执行的对象
          PreparedStatement preparedStatement = connection.prepareStatement(sql);
  ```

* 设置参数

  ```java
          // 设置参数
          preparedStatement.setString(1, nickname);
          preparedStatement.setString(2, pwd);
  ```

  ```tex
  setXxx(参数1,参数2) 给?赋值。
  参数1：问号的位置 从1开始
  参数2：? 的值
  ```

* 执行SQL：不需要再传递SQL

  ```java
          ResultSet resultSet = preparedStatement.executeQuery();
  ```


代码：

```java
public class JdbcDemo05 {

    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://www.iocaop.com:3306/crud?serverTimezone=UTC&useSSL=false";
        String username = "root";
        String password = "911823";

        String nickname = "lzc";
        String pwd = "jgkfdljkglfdjglkfd' or '1' = '1";

        // 注册驱动
        Class.forName("com.mysql.jdbc.Driver");

        // 获取连接
        Connection connection = DriverManager.getConnection(url, username, password);

        // 执行的sql
        String sql = "select * from pan_account where nickname = ? and url_token = ?";

        // 获取sql执行的对象
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        // 设置参数
        preparedStatement.setString(1, nickname);
        preparedStatement.setString(2, pwd);

        // 打印sql
        System.out.println(preparedStatement);

        ResultSet resultSet = preparedStatement.executeQuery();

        if (resultSet.next()){
            System.out.println("登录成功");
        }else {
            System.out.println("登录失败");
        }
        
    }
}
```

![image-20230718152620040](http://www.iocaop.com/images/2023-07/image-20230718152620040.png)

做了转义，无法注入SQL。

### 10-API详解-PrepareStatement原理

Java将SQL发送给数据库以后，需要做如下处理：

![image-20230718195955871](http://www.iocaop.com/images/2023-07/202307181959935.png)

好处：

* 预编译SQL，性能更高
* 防止SQL注入：<span style="background-color:pink;">将敏感字符进行转义</span>

步骤：

* `PreparedStatement`预编译功能开启: 需要在jdbc链接中添加

  ```java
  useServerPrepStmts = true
  ```

* 配置MySQL执行日志(重启MySQL服务后生效)：MySQL配置`my.ini`或`my.cnf`添加如下配置（win或linux）

  ```ini
  log-output=FILE
  general-log=1
  general_log_file=/root/mysql.log
  slow-query-log=1
  slow_query_log_file=/root/mysql_slow.log
  long_query_time=2
  ```

  配置后重启MySQL：

  ```bash
  systemctl restart mysqld.service
  ```

  重启后查看日志是否开启：

  ```sql
  show global variables like '%general%';
  ```

  如果没有开启，则开启：

  ```sql
  set global general_log=on;
  ```

  如果报权限不足，则将文件夹mysql.log所在的文件夹权限改为777，文件也需要自己创建，权限也是777，最终效果：

  ![image-20230718211609770](http://www.iocaop.com/images/2023-07/202307182116799.png)

  ![image-20230718211655132](http://www.iocaop.com/images/2023-07/202307182116182.png)

* `PreperStatement`原理

  * 在获取`PreparedStatement`对象时，将SQL语句发送给MySQL服务进行检查，编译（这一步很耗时）
  * 执行时就不用再进行这些步骤了，速度更快
  * <span style="background-color:pink;">如果SQL模板一样，则只需要进行一次检查、编译</span>

代码：与09类似，只是jdbc链接多了开启预编译

```java
public class JdbcDemo06 {
    public static void main(String[] args) throws Exception  {
        String url = "jdbc:mysql://www.iocaop.com:3306/crud?serverTimezone=UTC&useSSL=false&useServerPrepStmts=true";
        String username = "root";
        String password = "911823";

        // 注册驱动
        Class.forName("com.mysql.jdbc.Driver");

        // 获取连接
        Connection connection = DriverManager.getConnection(url, username, password);

        // SQL
        String sql = "select * from pan_account where nickname = ? and url_token = ?";

        // 获取SQL执行对象
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        // 设置参数
        preparedStatement.setString(1,"赖卓成");
        // 尝试SQL注入
        preparedStatement.setString(2,"fgjdksl' '1' = '1 ");

        ResultSet resultSet = preparedStatement.executeQuery();

        if (resultSet.next()){
            System.out.println("登录成功！");
        }else {
            System.out.println("登录失败！");
        }
    }
}
```

日志：可以看到开启了预编译，显示了预编译的SQL以及执行时的SQL。

![image-20230718212449427](http://www.iocaop.com/images/2023-07/202307182124484.png)

如果jdbc链接不开启预编译，日志则如下：

![image-20230718212644143](http://www.iocaop.com/images/2023-07/202307182126202.png)

并且，我们可以看看，同一个SQL，执行多次，会预编译几次：

```java
public class JdbcDemo06 {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://www.iocaop.com:3306/crud?serverTimezone=UTC&useSSL=false&useServerPrepStmts=true";
        String username = "root";
        String password = "911823";

        // 注册驱动
        Class.forName("com.mysql.jdbc.Driver");

        // 获取连接
        Connection connection = DriverManager.getConnection(url, username, password);

        // SQL
        String sql = "select * from pan_account where nickname = ? and url_token = ? and header_cookie = ?";

        // 获取SQL执行对象
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        // 设置参数
        preparedStatement.setString(1, "赖卓成");
        // 尝试SQL注入
        preparedStatement.setString(2, "fgjdksl' '1' = '1 ");
        preparedStatement.setString(3,"test");

        ResultSet resultSet = null;
        resultSet = preparedStatement.executeQuery();

        if (resultSet.next()) {
            System.out.println("登录成功！");
        } else {
            System.out.println("登录失败！");
        }

        preparedStatement.setString(1,"赖卓成");
        preparedStatement.setString(2,"0");
        preparedStatement.setString(3,"1");
        resultSet = preparedStatement.executeQuery();
        if (resultSet.next()){
            System.out.println("查询到了数据");
        }else {
            System.out.println("没有数据");
        }
    }
}

```

日志：预编译一次，执行了两次，如果后面再执行同样的SQL，不会再编译，而是直接换参数执行。

![image-20230718213437641](http://www.iocaop.com/images/2023-07/202307182134695.png)

什么时候预编译？

我们打断点在SQL执行之前：

![image-20230718214036699](http://www.iocaop.com/images/2023-07/202307182140746.png)

还没有真正执行SQL，就可以看到MySQL打印了日志：

![image-20230718214108969](http://www.iocaop.com/images/2023-07/202307182141018.png)

说明，在获取SQL执行对象的时候，就已经进行了预编译：

```java
        // 获取SQL执行对象
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
```

## 3-2-1-数据库连接池

### 11-数据库连接池-简介

* 是个容器，负责分配管理数据库连接
* 允许应用程序重复使用一个现有的连接，而不是重新建立一个
* 释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏

好处：

* 资源重用
* 提升响应速率（开启和关闭需要消耗资源）
* 避免数据库连接遗漏

![image-20230718215552259](http://www.iocaop.com/images/2023-07/202307182155296.png)

连接池的实现：

标准接口：`DataSource`

* SUN提供的数据库连接池标准接口，由第三方组织实现该接口
* 功能：实现连接

```java
Connection getConnection();
```

常见数据库连接池：

* DBCP
* C3P0
* Druid

Druid：

* 阿里开源的数据库连接池项目
* 功能强大、性能优秀、Java语言最好的数据库连接池之一

### 12-数据库连接池-Druid使用

druid配置详解


|                   属性                   |                             说明                             |          建议值           |
| :--------------------------------------: | :----------------------------------------------------------: | :-----------------------: |
|                   url                    |   数据库的jdbc连接地址。一般为连接oracle/mysql。示例如下：   |                           |
|                                          |    mysql : jdbc:mysql://ip:port/dbname?option1&option2&…     |                           |
|                                          |        oracle : jdbc:oracle:thin:@ip:port:oracle_sid         |                           |
|                                          |                                                              |                           |
|                 username                 |                      登录数据库的用户名                      |                           |
|                 password                 |                     登录数据库的用户密码                     |                           |
|               initialSize                |            启动程序时，在连接池中初始化多少个连接            |        10-50已足够        |
|                maxActive                 |                连接池中最多支持多少个活动会话                |                           |
|                 maxWait                  | 程序向连接池中请求连接时,超过maxWait的值后，认为本次请求失败，即连接池 |            100            |
|                                          |         没有可用连接，单位毫秒，设置-1时表示无限等待         |                           |
|        minEvictableIdleTimeMillis        | 池中某个连接的空闲时长达到 N 毫秒后, 连接池在下次检查空闲连接时，将 |        见说明部分         |
|                                          |               回收该连接,要小于防火墙超时设置                |                           |
|                                          |   net.netfilter.nf_conntrack_tcp_timeout_established的设置   |                           |
|      timeBetweenEvictionRunsMillis       |    检查空闲连接的频率，单位毫秒, 非正整数时表示不进行检查    |                           |
|                keepAlive                 | 程序没有close连接且空闲时长超过 minEvictableIdleTimeMillis,则会执 |           true            |
|                                          | 行validationQuery指定的SQL,以保证该程序连接不会池kill掉,其范围不超 |                           |
|                                          |                  过minIdle指定的连接个数。                   |                           |
|                 minIdle                  |          回收空闲连接时，将保证至少有minIdle个连接.          |     与initialSize相同     |
|             removeAbandoned              | 要求程序从池中get到连接后, N 秒后必须close,否则druid 会强制回收该 |   false,当发现程序有未    |
|                                          | 连接,不管该连接中是活动还是空闲, 以防止进程不会进行close而霸占连接。 | 正常close连接时设置为true |
|          removeAbandonedTimeout          | 设置druid 强制回收连接的时限，当程序从池中get到连接开始算起，超过此 |  应大于业务运行最长时间   |
|                                          |            值后，druid将强制回收该连接，单位秒。             |                           |
|               logAbandoned               |    当druid强制回收连接后，是否将stack trace 记录到日志中     |           true            |
|              testWhileIdle               | 当程序请求连接，池在分配连接时，是否先检查该连接是否有效。(高效) |           true            |
|             validationQuery              | 检查池中的连接是否仍可用的 SQL 语句,drui会连接到数据库执行该SQL, 如果 |                           |
|                                          |         正常返回，则表示连接可用，否则表示连接不可用         |                           |
|               testOnBorrow               |  程序 **申请** 连接时,进行连接有效性检查（低效，影响性能）   |           false           |
|               testOnReturn               |  程序 **返还** 连接时,进行连接有效性检查（低效，影响性能）   |           false           |
|          poolPreparedStatements          |                缓存通过以下两个方法发起的SQL:                |           true            |
|                                          |    public PreparedStatement prepareStatement(String sql)     |                           |
|                                          |    public PreparedStatement prepareStatement(String sql,     |                           |
|                                          |         int resultSetType, int resultSetConcurrency)         |                           |
| maxPoolPrepareStatementPerConnectionSize |                  每个连接最多缓存多少个SQL                   |            20             |
|                 filters                  |                这里配置的是插件,常用的插件有:                |      stat,wall,slf4j      |
|                                          |                    监控统计: filter:stat                     |                           |
|                                          |              日志监控: filter:log4j 或者 slf4j               |                           |
|                                          |                   防御SQL注入: filter:wall                   |                           |
|            connectProperties             |         连接属性。比如设置一些连接池统计方面的配置。         |                           |
|                                          |    druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000    |                           |
|                                          |                 比如设置一些数据库连接属性:                  |                           |
|                                          |                                                              |                           |

步骤：

* 导入依赖

  ```xml
          <dependency>
              <groupId>com.alibaba</groupId>
              <artifactId>druid</artifactId>
              <version>1.2.15</version>
          </dependency>
  ```

* 定义配置文件：

  ```properties
  driverClassName=com.mysql.jdbc.Driver
  url=jdbc:mysql://www.iocaop.com:3306/crud?serverTimezone=UTC&useSSL=false&useServerPrepStmts=true
  username=root
  password=911823
  # 初始化连接数量
  initialSize=5
  # 最大连接数
  maxActive=10
  # 最大等待时间
  maxWait=3000
  ```

* 编写demo，创建连接池

  ```java
  public class JdbcDemo07 {
      public static void main(String[] args) throws Exception{
  
          // 获取当前路径
          System.out.println(System.getProperty("user.dir"));
  
          // 加载配置文件
          Properties properties = new Properties();
          properties.load(new FileReader("java-se/src/main/resources/druid.properties"));
  
          DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);
          Connection connection = dataSource.getConnection();
          System.out.println("connection = " + connection);
      }
  }
  ```

  ![image-20230718221600167](http://www.iocaop.com/images/2023-07/202307182216201.png)

## 3-3-练习

### 13-环境准备

需求：完成品牌数据的增删查改

* 查询：查询所有数据
* 添加：添加品牌
* 修改：根据id修改
* 删除：根据id删除

环境准备：

* 数据库表`tb_brand`

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

* 实体类`Brand`： 基本数据类型应该使用包装类，因为包装类默认是`null`，不会影响业务。

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
      private String brand_name;
  
      /**
       * 企业名称
       */
      private String company_name;
  
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

  

* 测试用例

### 14-查询所有

```java
public class Example {


    @Test
    public void testSelectAll() throws Exception{

        String property = System.getProperty("user.dir");
        System.out.println("property = " + property);

        // 加载配置文件
        Properties properties = new Properties();
        properties.load(new FileReader("src/main/resources/druid.properties"));

        DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);
        // 获取连接
        Connection connection = dataSource.getConnection();

        // sql
        String sql  = "select * from tb_brand";

        // 获取预编译执行sql的对象
        PreparedStatement preparedStatement = connection.prepareStatement(sql);

        // 执行sql
        ResultSet resultSet = preparedStatement.executeQuery();

        // 创建集合用于存储
        ArrayList<Brand> brands = new ArrayList<>();

        while (resultSet.next()){
            int id = resultSet.getInt("id");
            String brandName = resultSet.getString("brand_name");
            String companyName = resultSet.getString("company_name");
            int ordered = resultSet.getInt("ordered");
            String description = resultSet.getString("description");
            int status = resultSet.getInt("status");

            // 创建对象
            Brand brand = new Brand();
            brand.setId(id);
            brand.setBrandName(brandName);
            brand.setCompanyName(companyName);
            brand.setOrdered(ordered);
            brand.setDescription(description);
            brand.setStatus(status);
            brands.add(brand);
        }
        System.out.println("brands = " + brands);

        // 释放资源
        resultSet.close();
        preparedStatement.close();
        connection.close();
    }
}
```

![image-20230718230402805](http://www.iocaop.com/images/2023-07/202307182304854.png)

### 15-添加

