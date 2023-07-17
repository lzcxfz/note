---
title: JDBC
date: 2023-05-10
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
