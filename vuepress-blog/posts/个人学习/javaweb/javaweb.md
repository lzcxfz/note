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

