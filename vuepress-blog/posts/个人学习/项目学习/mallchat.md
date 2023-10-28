---
title: mallchat学习
date: 2023-10-19
category:
  - 项目学习
---

参考：<a href='https://github.com/zongzibinbin/MallChat'>点击跳转</a>，大部分代码复制mallchat实战文档

## 03-docker-compose搭建

### 先装docker

yum设置阿里源

```shell
yum-config-manager --add-rep https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

装docker：

```shell
yum install -y docker-ce
```

启动：

```sh
systemctl enable docker.service
```

设置国内镜像：

```sh
vi  /etc/docker/daemon.json
```

添加：

```json
{
    "registry-mirrors": ["https://mirror.ccs.tencentyun.com"],
    "live-restore": true
}
```

重启检查是否生效

```sh
systemctl daemon-reload
service docker restart
docker info
```

![image-20231019064838934](http://www.iocaop.com/images/2023-10/202310190648966.png)

### 再装docker compose

```sh
curl -L https://github.com/docker/compose/releases/download/1.28.6/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

太慢了直接下载再上传到`/usr/local/bin`：<a href='https://github.com/docker/compose/releases/download/1.28.6/docker-compose-Linux-x86_64'>点击跳转</a>

> rz命令可以导入文件

## 04-部署mysql

创建挂载目录：

```sh
mkdir -p /data/mysql/data;
mkdir -p /data/mysql/conf;
```

在挂载目录`/data/mysql/`下创建docker-compose.yml

```bash
touch /data/mysql/docker-compose.yml
```

```yml
version: '3'
services:
  mysql:
    image: mysql:5.7 #mysql版本
    container_name: mysql
    volumes:
    # 宿主机目录：容器目录
      - /data/mysql/data:/var/lib/mysql
      - /data/mysql/conf/my.cnf:/etc/mysql/mysql.conf.d/mysqld.cnf
    restart: always
    ports:
    # 宿主机端口号：容器端口号
      - 3307:3306
    environment:
      MYSQL_ROOT_PASSWORD: 123456 #root用户密码
      TZ: Asia/Shanghai
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

在挂载目录`/data/mysql/conf`下创建`my.cnf`配置文件：

```bash
[mysqld]
default-storage-engine=INNODB  # 创建新表时将使用的默认存储引擎
character-set-server=utf8mb4      # 设置mysql服务端默认字符集
pid-file        = /var/run/mysqld/mysqld.pid  # pid文件所在目录
socket          = /var/run/mysqld/mysqld.sock # 用于本地连接的socket套接字
datadir         = /var/lib/mysql              # 数据文件存放的目录
symbolic-links=0
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION # 定义mysql应该支持的sql语法，数据校验等!

# 允许最大连接数
max_connections=200


# 同一局域网内注意要唯一
server-id=3306
# 开启二进制日志功能 & 日志位置存放位置`/var/lib/mysql`
#log-bin=mysql-bin
log-bin=/var/lib/mysql/mysql-bin
# binlog格式
# 1. STATEMENT：基于SQL语句的模式，binlog 数据量小，但是某些语句和函数在复制过程可能导致数据不一致甚至出错；
# 2. MIXED：混合模式，根据语句来选用是 STATEMENT 还是 ROW 模式；
# 3. ROW：基于行的模式，记录的是行的完整变化。安全，但 binlog 会比其他两种模式大很多；
binlog_format=ROW
# FULL：binlog记录每一行的完整变更 MINIMAL：只记录影响后的行
binlog_row_image=FULL
# 日志文件大小
max_binlog_size=100M
# 定义清除过期日志的时间(这里设置为7天)
expire_logs_days=7

# ================= ↑↑↑ mysql主从同步配置end ↑↑↑ =================

[mysql]
default-character-set=utf8mb4

[client]
default-character-set=utf8mb4  # 设置mysql客户端默认字符集
```

在`docker-compose.yml`所在目录下执行：

```bash
docker-compose up -d
```

遇到问题：

![image-20231019071434687](http://www.iocaop.com/images/2023-10/202310190714713.png)

修改`docker-compose.yml`中的容器名称`container_name`即可

![image-20231019071610252](http://www.iocaop.com/images/2023-10/202310190716283.png)

尝试连接：

![image-20231019071743529](http://www.iocaop.com/images/2023-10/202310190717557.png)

## 05-部署redis

目录：

```bash
mkdir -p /data/redis
```

yml

```bash
touch /data/redis/docker-compose.yml
```

```yml
version: '3'
services:
  redis:
    image: redis:6.2.6
    container_name: redis-mallchat
    restart: always
    ports:
      - 6380:6379
    volumes:
      - /data/redis/redis.conf:/etc/redis/redis.conf
      - /data/redis/data:/data
      - /data/redis/logs:/logs
    command: ["redis-server","/etc/redis/redis.conf"]
```

配置文件

```bash
touch /data/redis/redis.conf
```

```bash
port 6379
timeout 0
#rdb配置
save 900 1
save 300 10
save 60 10000
rdbcompression yes
dbfilename dump.rdb
dir /data
appendonly yes
appendfsync everysec
#设置你的redis密码
requirepass 123456
```

到redis的`docker-compose.yml`所在目录

```bash
docker-compose up -d
```

![image-20231019074042060](http://www.iocaop.com/images/2023-10/202310190740096.png)

![image-20231019074632361](http://www.iocaop.com/images/2023-10/202310190746399.png)

## 06-RocketMQ部署



## 10-项目搭建

创建项目：

![image-20231019081204532](http://www.iocaop.com/images/2023-10/202310190812555.png)

创建module：

聊天服务：

![image-20231019081401581](http://www.iocaop.com/images/2023-10/202310190814618.png)

基础包：

![image-20231019081442867](http://www.iocaop.com/images/2023-10/202310190814903.png)

创建启动包：

![image-20231019081630476](http://www.iocaop.com/images/2023-10/202310190816520.png)

删除多余的src目录，最终：

![image-20231019081722961](http://www.iocaop.com/images/2023-10/202310190817988.png)

预期是未来所有的服务都需要依赖`mallchat-common-start`这个包，所以`mallchat-chat-server`这个模块应该依赖他，为了不写版本号，加入到统一依赖管理中。

记录一下，到这一步，各pom的内容

父工程：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.lzc</groupId>
    <artifactId>mallchat-learning</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>
    <modules>
        <module>mallchat-chat-server</module>
        <module>mallchat-framework</module>
    </modules>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <mallchat.common.start.version>1.0-SNAPSHOT</mallchat.common.start.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.lzc</groupId>
                <artifactId>mallchat-common-starter</artifactId>
                <version>${mallchat.common.start.version}</version>
            </dependency>
        </dependencies>

    </dependencyManagement>

</project>

```

`mallchat-chat-server`模块：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.lzc</groupId>
        <artifactId>mallchat-learning</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <artifactId>mallchat-chat-server</artifactId>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.lzc</groupId>
            <artifactId>mallchat-common-starter</artifactId>
        </dependency>
    </dependencies>

</project>

```

`mallchat-framework`模块：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.lzc</groupId>
        <artifactId>mallchat-learning</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <artifactId>mallchat-framework</artifactId>
    <packaging>pom</packaging>
    <modules>
        <module>mallchat-common-starter</module>
    </modules>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

</project>

```

`mallchat-common-starter`模块

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.lzc</groupId>
        <artifactId>mallchat-framework</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <artifactId>mallchat-common-starter</artifactId>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

</project>

```

复制作者的依赖管理：

```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.7</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <mallchat.common.start.version>1.0-SNAPSHOT</mallchat.common.start.version>
        <skipTests>true</skipTests>
        <docker.host>http://192.168.3.101:2375</docker.host>
        <hutool.version>5.8.18</hutool.version>
        <springfox-swagger.version>3.0.0</springfox-swagger.version>
        <swagger-models.version>1.6.0</swagger-models.version>
        <mybatis-plus-generator.version>3.4.1</mybatis-plus-generator.version>
        <mybatis.version>3.5.10</mybatis.version>
        <mysql-connector.version>8.0.29</mysql-connector.version>
        <spring-data-commons.version>2.7.5</spring-data-commons.version>
        <jjwt.version>0.9.1</jjwt.version>
        <logstash-logback.version>7.2</logstash-logback.version>
        <minio.version>8.4.5</minio.version>
        <jaxb-api.version>2.3.1</jaxb-api.version>
        <lombok.version>1.18.10</lombok.version>
        <netty-all.version>4.1.76.Final</netty-all.version>
        <weixin-java-mp.version>4.4.0</weixin-java-mp.version>
        <mybatis-plus-boot-starter.version>3.4.0</mybatis-plus-boot-starter.version>
        <jsoup.version>1.15.3</jsoup.version>
        <okhttp.version>4.8.1</okhttp.version>
        <redisson-spring-boot-starter.version>3.17.1</redisson-spring-boot-starter.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.lzc</groupId>
                <artifactId>mallchat-common-starter</artifactId>
                <version>${mallchat.common.start.version}</version>
            </dependency>

            <dependency>
                <groupId>com.squareup.okhttp3</groupId>
                <artifactId>okhttp</artifactId>
                <version>${okhttp.version}</version>
            </dependency>

            <dependency>
                <groupId>org.jsoup</groupId>
                <artifactId>jsoup</artifactId>
                <version>${jsoup.version}</version>
            </dependency>

            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-boot-starter</artifactId>
                <version>${mybatis-plus-boot-starter.version}</version>
            </dependency>

            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </dependency>

            <dependency>
                <groupId>com.github.binarywang</groupId>
                <artifactId>weixin-java-mp</artifactId>
                <version>${weixin-java-mp.version}</version>
            </dependency>

            <!-- netty -->
            <dependency>
                <groupId>io.netty</groupId>
                <artifactId>netty-all</artifactId>
                <version>${netty-all.version}</version>
            </dependency>

            <dependency>
                <groupId>cn.hutool</groupId>
                <artifactId>hutool-all</artifactId>
                <version>${hutool.version}</version>
            </dependency>

            <!-- MyBatis-->
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis</artifactId>
                <version>${mybatis.version}</version>
            </dependency>

            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-generator</artifactId>
                <version>${mybatis-plus-generator.version}</version>
            </dependency>

            <!--Mysql数据库驱动-->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql-connector.version}</version>
            </dependency>

            <!--JWT(Json Web Token)登录支持-->
            <dependency>
                <groupId>io.jsonwebtoken</groupId>
                <artifactId>jjwt</artifactId>
                <version>${jjwt.version}</version>
            </dependency>

            <!-- 阿里云OSS -->
            <dependency>
                <groupId>io.minio</groupId>
                <artifactId>minio</artifactId>
                <version>${minio.version}</version>
            </dependency>

            <dependency>
                <groupId>org.redisson</groupId>
                <artifactId>redisson-spring-boot-starter</artifactId>
                <version>${redisson-spring-boot-starter.version}</version>
            </dependency>
        </dependencies>

    </dependencyManagement>
```

复制作者提供的common依赖：

```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
        </dependency>
        
        <!-- MyBatis-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.0</version>
        </dependency>
        
        <!--Mysql数据库驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        
        <!-- netty -->
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
    </dependencies>
```

创建配置文件，复制作者的：

```yml
spring:
  profiles:
    #运行的环境
    active: test
  application:
    name: mallchat
  datasource:
    url: jdbc:mysql://${mallchat.mysql.ip}:${mallchat.mysql.port}/${mallchat.mysql.db}?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: ${mallchat.mysql.username}
    password: ${mallchat.mysql.password}
    driver-class-name: com.mysql.cj.jdbc.Driver
  redis:
    # Redis服务器地址
    host: ${mallchat.redis.host}
    # Redis服务器端口号
    port: ${mallchat.redis.port}
    # 使用的数据库索引，默认是0
    database: 0
    # 连接超时时间
    timeout: 1800000
    # 设置密码
    password: ${mallchat.redis.password}
  jackson:
    serialization:
    # 将时间转为时间戳，方便与前端交互     
      write-dates-as-timestamps: true
```

多环境配置：

```properties
##################mysql配置##################
mallchat.mysql.ip=www.iocaop.com
mallchat.mysql.port=3307
mallchat.mysql.db=mallchat
mallchat.mysql.username=root
mallchat.mysql.password=123456
##################redis配置##################
mallchat.redis.host=www.iocaop.com
mallchat.redis.port=6380
mallchat.redis.password=123456
```

![image-20231019083900816](http://www.iocaop.com/images/2023-10/202310190839870.png)

## 11-Netty实现websocket编码

新建两个包，`user`和`websocket`：

![image-20231028222939906](http://www.iocaop.com/images/2023-10/202310282229939.png)

copy一下作者的代码：(注释掉ip记录和心跳)

netty原理：每个请求进来，都会给请求串联一系列的处理器，每个处理器都是new出来的，每个请求的处理器都是不同的(因为这些处理器是有状态的，不能共用)。对于我们自定义的业务处理器，是没有状态的，所以写成成员变量了，可以共用。：

```java
    public static final NettyWebSocketServerHandler NETTY_WEB_SOCKET_SERVER_HANDLER = new NettyWebSocketServerHandler();
```



```java
@Slf4j
@Configuration
public class NettyWebSocketServer {
    public static final int WEB_SOCKET_PORT = 8090;
    public static final NettyWebSocketServerHandler NETTY_WEB_SOCKET_SERVER_HANDLER = new NettyWebSocketServerHandler();
    // 创建线程池执行器
    private EventLoopGroup bossGroup = new NioEventLoopGroup(1);
    private EventLoopGroup workerGroup = new NioEventLoopGroup(NettyRuntime.availableProcessors());

    /**
     * 启动 ws server
     *
     * @return
     * @throws InterruptedException
     */
    @PostConstruct
    public void start() throws InterruptedException {
        run();
    }

    /**
     * 销毁
     */
    @PreDestroy
    public void destroy() {
        Future<?> future = bossGroup.shutdownGracefully();
        Future<?> future1 = workerGroup.shutdownGracefully();
        future.syncUninterruptibly();
        future1.syncUninterruptibly();
        log.info("关闭 ws server 成功");
    }

    public void run() throws InterruptedException {
        // 服务器启动引导对象
        ServerBootstrap serverBootstrap = new ServerBootstrap();
        serverBootstrap.group(bossGroup, workerGroup)
                .channel(NioServerSocketChannel.class)
                .option(ChannelOption.SO_BACKLOG, 128)
                .option(ChannelOption.SO_KEEPALIVE, true)
                .handler(new LoggingHandler(LogLevel.INFO)) // 为 bossGroup 添加 日志处理器
                .childHandler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    protected void initChannel(SocketChannel socketChannel) throws Exception {
                        ChannelPipeline pipeline = socketChannel.pipeline();
                        //30秒客户端没有向服务器发送心跳则关闭连接
//                        pipeline.addLast(new IdleStateHandler(30, 0, 0));
                        // 因为使用http协议，所以需要使用http的编码器，解码器
                        pipeline.addLast(new HttpServerCodec());
                        // 以块方式写，添加 chunkedWriter 处理器
                        pipeline.addLast(new ChunkedWriteHandler());
                        /**
                         * 说明：
                         *  1. http数据在传输过程中是分段的，HttpObjectAggregator可以把多个段聚合起来；
                         *  2. 这就是为什么当浏览器发送大量数据时，就会发出多次 http请求的原因
                         */
                        pipeline.addLast(new HttpObjectAggregator(8192));
                        //保存用户ip
//                        pipeline.addLast(new HttpHeadersHandler());
                        /**
                         * 说明：
                         *  1. 对于 WebSocket，它的数据是以帧frame 的形式传递的；
                         *  2. 可以看到 WebSocketFrame 下面有6个子类
                         *  3. 浏览器发送请求时： ws://localhost:7000/hello 表示请求的uri
                         *  4. WebSocketServerProtocolHandler 核心功能是把 http协议升级为 ws 协议，保持长连接；
                         *      是通过一个状态码 101 来切换的
                         */
                        pipeline.addLast(new WebSocketServerProtocolHandler("/"));
                        // 自定义handler ，处理业务逻辑
                        pipeline.addLast(NETTY_WEB_SOCKET_SERVER_HANDLER);
                    }
                });
        // 启动服务器，监听端口，阻塞直到启动成功
        serverBootstrap.bind(WEB_SOCKET_PORT).sync();
    }
}
```

可以看到上面的`pipeline`中添加了很多处理器，我们再来自定义一个处理器`NettyWebSocketServerHandler`继承`SimpleChannelInboundHandler<TextWebSocketFrame>`，重写方法：

```java
public class NettyWebSocketServerHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {
    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, TextWebSocketFrame textWebSocketFrame) throws Exception {
        String text = textWebSocketFrame.text();
        System.out.println("接收到的消息：" + text);
    }
}
```

这个处理器是所有请求共用的(无状态的)，需要加上注解`@ChannelHandler.Sharable`标识所有的`pipeline`都可以共用这个处理器。

到此，项目可以启动了，创建启动类：

```java
/**
 * 启动类
 * @author 赖卓成
 * @date 2023/10/28
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.lzc.mallchat"})
public class MallchatCustomApplication {

    public static void main(String[] args) {
        SpringApplication.run(MallchatCustomApplication.class,args);
    }
}
```

启动：

![image-20231028225636375](http://www.iocaop.com/images/2023-10/202310282256418.png)

postman测试：

![image-20231028225929858](http://www.iocaop.com/images/2023-10/202310282259897.png)

![image-20231028225953070](http://www.iocaop.com/images/2023-10/202310282259128.png)

连接成功，发个消息试试：

![image-20231028230112557](http://www.iocaop.com/images/2023-10/202310282301597.png)

![image-20231028230120973](http://www.iocaop.com/images/2023-10/202310282301010.png)

首先会发起http请求，服务端接收到后，会将http请求转换为websocket请求：

![image-20231028230359746](http://www.iocaop.com/images/2023-10/202310282303801.png)

## 12-Netty实现websocket原理

在`NettyWebSocketServer`(拷贝作者的)这个配置类中，往`pipeline`中添加了处理器`WebSocketServerProtocolHandler`

```java
                        pipeline.addLast(new WebSocketServerProtocolHandler("/"));
```

看这个类的源码，重写了`handlerAdded`方法：

![image-20231028231331880](http://www.iocaop.com/images/2023-10/202310282313920.png)

握手处理器`WebSocketServerProtocolHandshakeHandler`中，判断了是否为http请求，

如果是，则代表是第一次请求，需要将连接升级为websocket请求，并且在里面做了响应的组装：

![image-20231028231913274](http://www.iocaop.com/images/2023-10/202310282319326.png)

响应处理完，会发送一些事件，成功事件、失败事件等。

![image-20231028232150118](http://www.iocaop.com/images/2023-10/202310282321176.png)

除此之外，还会在`pipeline`中移除当前处理器：只有第一次请求才需要升级为websocket，后面用不到了。

![image-20231028232346883](http://www.iocaop.com/images/2023-10/202310282323928.png)

来重写一下握手成功事件的处理：在自定义的处理器中，重写`userEventTriggered`方法

```java
    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt){
        // 判断事件，如果是握手完成事件，则打印
        if (evt instanceof WebSocketServerProtocolHandler.HandshakeComplete) {
            System.out.println("握手成功");
        }
    }
```

重启，进行websocket连接：

![image-20231028232935606](http://www.iocaop.com/images/2023-10/202310282329636.png)

握手成功后，`WebSocketServerProtocolHandler`会发送一个握手成功的事件，会被它的下游处理器所接受，我们在自定义的处理器中接收到后，做了打印处理。

## 13-websocket前后端交互协议

目前比较简单，就使用json来交互。可以改用protobuf，节省内存消耗。

约定好json结构就好了，这里参考作者的，前后端都使用这个结构。

```json
{
type:1,//1.请求登录二维码，2心跳检测 3用户认证
data:{}
}
```

创建包：

![image-20231028233905610](http://www.iocaop.com/images/2023-10/202310282339639.png)

定义请求对象，响应对象，类型枚举等。

请求对象`WSBaseReq`:

```java
@Data
public class WSBaseReq {

    /**
     * 类型
     * @see com.lzc.mallchat.common.websocket.domain.enums.WSReqTypeEnum
     */
    private Integer type;

    /**
     * 请求内容，用来存放json
     */
    private String data;
}

```

请求类型枚举：

```java
@AllArgsConstructor
@Getter
public enum WSReqTypeEnum {
    LOGIN(1, "请求登录二维码"),
    HEARTBEAT(2, "心跳包"),
    AUTHORIZE(3, "登录认证"),
    ;

    private final Integer type;
    private final String desc;

    private static Map<Integer, WSReqTypeEnum> cache;

    static {
        cache = Arrays.stream(WSReqTypeEnum.values()).collect(Collectors.toMap(WSReqTypeEnum::getType, Function.identity()));
    }

    public static WSReqTypeEnum of(Integer type) {
        return cache.get(type);
    }
}
```

响应对象：

```java
@Data
public class WSBaseResp<T> {

    /**
     * 类型
     */
    private Integer type;

    /**
     * 数据
     */
    private T data;
}
```

响应类型枚举：

```java
@AllArgsConstructor
@Getter
public enum WSRespTypeEnum {
    LOGIN_URL(1, "登录二维码返回", WSLoginUrl.class),
    LOGIN_SCAN_SUCCESS(2, "用户扫描成功等待授权", null),
    LOGIN_SUCCESS(3, "用户登录成功返回用户信息", WSLoginSuccess.class),
    MESSAGE(4, "新消息", WSMessage.class),
    ONLINE_OFFLINE_NOTIFY(5, "上下线通知", WSOnlineOfflineNotify.class),
    INVALIDATE_TOKEN(6, "使前端的token失效，意味着前端需要重新登录", null),
    BLACK(7, "拉黑用户", WSBlack.class),
    MARK(8, "消息标记", WSMsgMark.class),
    RECALL(9, "消息撤回", WSMsgRecall.class),
    APPLY(10, "好友申请", WSFriendApply.class),
    MEMBER_CHANGE(11, "成员变动", WSMemberChange.class),
    ;

    private final Integer type;
    private final String desc;
    private final Class dataClass;

    private static Map<Integer, WSRespTypeEnum> cache;

    static {
        cache = Arrays.stream(WSRespTypeEnum.values()).collect(Collectors.toMap(WSRespTypeEnum::getType, Function.identity()));
    }

    public static WSRespTypeEnum of(Integer type) {
        return cache.get(type);
    }
}
```

具体响应对象类型对应的类，直接复制作者的。

![image-20231028235034795](http://www.iocaop.com/images/2023-10/202310282350833.png)

再引入一下`swagger`：

```xml
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <!--使用Swagger2-->
            <artifactId>knife4j-spring-boot-starter</artifactId>
            <version>2.0.9</version>
        </dependency>
```

在自定义处理器中，判断类型，进行测试：

```java
    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, TextWebSocketFrame textWebSocketFrame){
        String text = textWebSocketFrame.text();
        // 反序列化
        WSBaseReq req = JSONUtil.toBean(text, WSBaseReq.class);
        Integer type = req.getType();
        // 转为枚举
        WSReqTypeEnum typeEnum = WSReqTypeEnum.of(type);
        switch (typeEnum){
            case LOGIN:
                // 请求登录二维码
                System.out.println("请求登录二维码");
                break;
            case HEARTBEAT:
                // 心跳包
                break;
            case AUTHORIZE:    
                // 登录认证
                break;
            default:
                break;
        }
        System.out.println("接收到的消息：" + text);
    }
```

![image-20231028235948249](http://www.iocaop.com/images/2023-10/202310282359283.png)

![image-20231028235958980](http://www.iocaop.com/images/2023-10/202310282359009.png)

再测试一下返回结果：

在我们自定义的处理器重写的处理请求方法最后，返回服务器时间：

```java
        channelHandlerContext.channel().writeAndFlush(new TextWebSocketFrame("服务器已接收到请求，服务器时间：" + System.currentTimeMillis()));
```

> 需要注意：写时，也需要写`TextWebSocketFrame`对象，让框架帮我们处理，返回。

![image-20231029000633601](http://www.iocaop.com/images/2023-10/202310290006637.png)