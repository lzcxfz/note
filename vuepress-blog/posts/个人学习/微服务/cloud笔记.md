---
title: 重学 spring cloud netflix
date: 2022-10-09
category:
  - 微服务
---

课程地址：<a href = 'https://www.bilibili.com/video/BV18E411x7eT/?p=3&spm_id_from=pageDriver&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a>

参考笔记：<a href = 'https://blog.csdn.net/u011863024/article/details/114298270'>点击跳转</a>



## p3-Boot与Cloud版本选型

Cloud版本是伦敦地铁站A-Z依次排序来的，Boot需要使用特定版本的，官网有写：

官网查看：<a href = 'https://spring.io/projects/spring-cloud'>点击跳转</a>

![image-20221009184355279](http://www.iocaop.com/images/2022-10/202210091843376.png)

更详细的查看地址：<a href = 'https://start.spring.io/actuator/info'>点击跳转</a>

## p4-Cloud组件

![image-20221009190145791](http://www.iocaop.com/images/2022-10/202210091901874.png)

## p5-父工程创建

创建好工程以后，需要设置idea，

字符编码设置：

![image-20221010212140569](http://www.iocaop.com/images/2022-10/202210102121661.png)

注解生效：

![image-20221010212221346](http://www.iocaop.com/images/2022-10/202210102122396.png)

过滤idea自带文件：

![image-20221010212303418](http://www.iocaop.com/images/2022-10/202210102123462.png)

## p6-pom依赖导入

需要注意boot版本和cloud版本对应,下面是课程源码复制过来的：

关于spring-boot-dependencies和spring-boot-starter-parent，参考：<a href='https://zhuanlan.zhihu.com/p/367788636'>点击跳转</a>

```xml
<!-- 统一管理jar包版本 -->
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <junit.version>4.12</junit.version>
        <log4j.version>1.2.17</log4j.version>
        <lombok.version>1.18.12</lombok.version>
        <mysql.version>5.1.47</mysql.version>
        <druid.version>1.1.16</druid.version>
        <mybatis.spring.boot.version>1.3.0</mybatis.spring.boot.version>
    </properties>

    <!-- 子模块继承之后，提供作用：锁定版本+子modlue不用写groupId和version  -->
    <dependencyManagement>
        <dependencies>
            <!--spring boot 2.2.2-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.2.2.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <!--spring cloud Hoxton.SR1-->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Hoxton.SR1</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <!--spring cloud alibaba 2.1.0.RELEASE-->
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>2.1.0.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
            </dependency>

            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>${druid.version}</version>
            </dependency>

            <dependency>
                <groupId>org.mybatis.spring.boot</groupId>
                <artifactId>mybatis-spring-boot-starter</artifactId>
                <version>${mybatis.spring.boot.version}</version>
            </dependency>

            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>${junit.version}</version>
            </dependency>

            <dependency>
                <groupId>log4j</groupId>
                <artifactId>log4j</artifactId>
                <version>${log4j.version}</version>
            </dependency>

            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
                <optional>true</optional>
            </dependency>

        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <fork>true</fork>
                    <addResources>true</addResources>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

## p7-dependencyManagement

* 只是<span style="background-color:pink;">声明</span>依赖，并<span style="background-color:pink;">不实际引入</span>，子项目按需声明使用的依赖
* 子项目可以继承父项目的 version 和 scope
* 子项目若指定了 version 和 scope，以子项目为准

## p8~p11-支付模块构建

订单模块调用支付模块：

![image-20221011192403637](http://www.iocaop.com/images/2022-10/202210111924687.png)

创建module

依赖：

```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>

        <!--mysql-connector-java-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!--jdbc-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
```

配置文件：

```yaml
server:
  port: 8001

spring:
  application:
    name: cloud-payment-service
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource            # 当前数据源操作类型
    driver-class-name: org.gjt.mm.mysql.Driver              # mysql驱动包
    url: jdbc:mysql://www.iocaop.com:3306/cloud2020?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 911823

mybatis:
  mapperLocations: classpath:mapper/*.xml
  type-aliases-package: com.lzc.springcloud.entities    # 所有Entity别名类所在包
```

三层架构，crud，懒得记录，看源码即可。

![image-20221011190731415](http://www.iocaop.com/images/2022-10/202210111907523.png)

## p12~13-订单微服务构建

一个简单的springboot项目，端口80.

依赖：

```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
```

关键代码:

```java
@RestController
@Slf4j
public class OrderController {

    public static final String PAYMENT_URL = "http://localhost:8001";

    @Autowired
    RestTemplate restTemplate;

    @GetMapping(value = "/consumer/payment/get/{id}")
    public CommonResult<Payment> get(@PathVariable("id") Long id){
        CommonResult result = restTemplate.getForObject(PAYMENT_URL + "/payment/get/" + id, CommonResult.class);
        return result;
    }

    @PostMapping("/consumer/payment/create")
    public CommonResult create(@RequestBody Payment payment){
        CommonResult result = restTemplate.postForObject(PAYMENT_URL + "/payment/create", payment,
            CommonResult.class);
        return result;
    }
}
```

配置类：

```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}

```

说明：<span style="background-color:pink;">微服务之间调用，就是基于http</span>。spring中提供了RestTemplate工具来发起http连接，封装了httpClient，方便一点。

所以我们模拟订单模块调用支付模块，就是用户端->订单模块->支付模块。并且，使用RestTemplate调用时报错，也能在消费端拿到错误信息(http请求响应信息)：

![image-20221011201724278](http://www.iocaop.com/images/2022-10/202210112017389.png)

## p14-工程重构

把实体类抽离出来。

创建module，导入依赖：

```xml
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.8.8</version>
        </dependency>
```

把订单微服务和支付微服务里面entities包移动到common里面，再把common打包成jar。并在其他模块导入。

![image-20221011203843554](http://www.iocaop.com/images/2022-10/202210112038656.png)

## p15 Eureka基础知识

为什么需要Eureka注册与发现？直接服务之间调用不行吗？

服务治理：Spring Cloud封装了NetFlix公司开发的Eureka模块来<span style="background-color:pink;">实现服务治理</span>，传统的rpc远程调用框架中，服务之间依赖关系复杂，不好管理，管理服务之间的关系可以实现服务调用、负载均衡、容错、服务发现与注册等。

![image-20221011210241867](http://www.iocaop.com/images/2022-10/202210112102941.png)

系统中的微服务使用Eureka的客户端连接到 Eureka Server并维持心跳连接，这样系统的维护人员就可以通过Eureka Server来<span style="background-color:pink;">监控</span>系统中各个微服务是否正常运行。

### **Eureka Server**提供服务注册服务

各个微服务节点通过配置启动后，会在EurekaServer中进行注册，这样EurekaServer中的服务注册表中将会<span style="background-color:pink;">存储所有可用服务节点的信息</span>，服务节点的信息可以在界面中直观看到。

### **EurekaClient**通过注册中心进行访问

一个Java客户端，客户端同时也具备一个内置的、使用轮询(round-robin)负载算法的负载均衡器。在应用启动后，将会向Eureka Server发送心跳(默认周期为30秒)。如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，EurekaServer将会从服务注册表中把这个服务节点移除（默认90秒)


## p16-Eureka Server安装

创建module，导入依赖：

```xml
<dependencies>
        <!--eureka-server-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>

        <!--boot web actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!--一般通用配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
    </dependencies>
```

配置文件：

```yml
server:
  port: 7001

eureka:
  instance:
    hostname: eureka7001.com #eureka服务端的实例名称
  client:
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url:
      #集群指向其它eureka
      #defaultZone: http://eureka7002.com:7002/eureka/
      #单机就是7001自己
      defaultZone: http://eureka7001.com:7001/eureka/
    #server:
    #关闭自我保护机制，保证不可用服务被及时踢除
    #enable-self-preservation: false
    #eviction-interval-timer-in-ms: 2000
```

启动类：

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServer7001 {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServer7001.class,args);
    }
}
```

> 注意：需要@EnableEurekaServer注解。

打开服务地址：

![image-20221011220151595](http://www.iocaop.com/images/2022-10/202210112201710.png)

## p17-支付微服务8001入驻eurekaServer

导入依赖：

```xml
        <!--eureka-client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
```

启动类加注解

```java
@EnableEurekaClient
```

配置文件添加：

```yml
eureka:
  client:
    # 是否注册
    register-with-eureka: true
    # 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡
    fetch-registry: true
    # 注册中心的地址
    service-url:
      defaultZone: http://localhost:7001/eureka

```

登录注册中心可以看到：

![image-20221011221252876](http://www.iocaop.com/images/2022-10/202210112212981.png)

## p18-订单微服务80入驻eurekaServer

和上面一样的操作，启动订单微服务后可以在注册中心看到：

![image-20221011222227194](http://www.iocaop.com/images/2022-10/202210112222325.png)

注意：需要指定微服务的名称

```yml
spring:
  application:
    name: cloud-order-service
```

## p19-Eureka集群说明

### Eureka集群原理说明

![image-20221011222841492](http://www.iocaop.com/images/2022-10/202210112228590.png)

问题:微服务RPC远程服务调用最核心的是什么？

高可用，如果只有一个注册中心，那它挂了，就会影响整个系统。

解决办法：搭建Eureka注册中心集群，实现负载均衡+故障容错。

集群注册中心用一句话形容：**互相注册，相互守望**。

## p20-Eureka集群环境构建

先改hosts，后面要用：

```text
127.0.0.1 eureka7001.com
127.0.0.1 eureka7002.com
```

![image-20221012125542027](http://www.iocaop.com/images/2022-10/202210121255072.png)

再创建一个eurekaServer的module，步骤和EurekaServer7001一样，只是了地址信息。需要在配置文件中，将当前注册中心服务注册到其他注册中心:

```yml
server:
  port: 7001

eureka:
  instance:
    hostname: eureka7001.com #eureka服务端的实例名称
  client:
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url:
      #集群指向其它eureka
      defaultZone: http://eureka7002.com:7002/eureka/
```

```yml
server:
  port: 7002

eureka:
  instance:
    hostname: eureka7002.com #eureka服务端的实例名称
  client:
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url:
      #集群指向其它eureka
      defaultZone: http://eureka7001.com:7001/eureka/
```

启动后就可以看到：

![image-20221012125326415](http://www.iocaop.com/images/2022-10/202210121253512.png)

![image-20221012125349088](http://www.iocaop.com/images/2022-10/202210121253165.png)

## p21-将支付、订单微服务注册到Eureka集群

原来只有7001这一个Eureka注册中心，现在又加了一个7002，所以微服务注册时，需要在这两个注册中心都进行注册， 只需要修改配置文件，在原来的基础上加一条即可，逗号隔开：

![image-20221012125856388](http://www.iocaop.com/images/2022-10/202210121258447.png)

两个微服务都加上以后，启动，可以在7001注册中心和7002注册中心都看到：

![image-20221012130052618](http://www.iocaop.com/images/2022-10/202210121300698.png)

![image-20221012130104081](http://www.iocaop.com/images/2022-10/202210121301164.png)

## p22-支付微服务集群配置

现在注册中心是集群的了。但是业务微服务(支付、订单)还不是集群，所以业务微服务也要是集群才能实现高可用。

新建一个支付微服务module，和8001基本一致，只是改了端口为8002。

在controller里面加上返回当前服务端口号的代码，启动，可以在两台注册中心看到支付服务是集群的：

![image-20221012131307009](http://www.iocaop.com/images/2022-10/202210121313115.png)

自测一下，两台都是可以用的，那么我们启动订单微服务，通过订单微服务来调用这两台支付微服务，会发现订单微服务调用的始终是8001，因为我们在调用时通过RestTemplate来发起http请求，地址是写死的。

![image-20221012131924929](http://www.iocaop.com/images/2022-10/202210121319024.png)

所以我们不能写死服务地址。修改订单微服务中的地址：

```java
//    public static final String PAYMENT_URL = "http://localhost:8001";
    public static final String PAYMENT_URL = "http://cloud-payment-service/";
```

重启订单微服务，发现报错，因为将地址改成了服务名称以后，服务是集群的，RestTemplate不知道应该访问哪一个，还要在配置类加上注解@LoadBalanced注解赋予RestTemplate负载均衡的能力：

```java
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
```

现在订单微服务就会负载均衡(默认轮询)地调用支付微服务了。

![image-20221012132946718](http://www.iocaop.com/images/2022-10/202210121329813.png)

## p23-actuator服务信息完善

健康检查，配置文件给每个微服务加上id：

![image-20221012134052475](http://www.iocaop.com/images/2022-10/202210121340537.png)

在注册中心就可以看到：

![image-20221012134122218](http://www.iocaop.com/images/2022-10/202210121341276.png)

在加上ip端口显示：

```yml
  instance:
    instance-id: payment8001
    prefer-ip-address: true
```

在注册中心就可以看到各个服务的具体ip和端口号：

![image-20221012134513167](http://www.iocaop.com/images/2022-10/202210121345232.png)

## p24-服务发现Discovery

对于注册进eureka里面的微服务，可以通过服务发现来获得该服务的信息。

在支付微服务8001加一个接口来测试：

启动类加注解：

```java
@EnableDiscoveryClient
```

```java
    @Autowired
    private DiscoveryClient discoveryClient;

    @GetMapping(value = "/payment/discovry")
    public Object discovery() {
        // 获取所有服务
        List<String> services = discoveryClient.getServices();
        for (String service : services) {
            discoveryClient.getInstances(service).forEach(instance -> {
                log.info("服务名: {}, 主机: {}, 端口: {}, uri: {}", service, instance.getHost(), instance.getPort(),
                    instance.getUri());
            });
        }
        return discoveryClient;
    }
```

![image-20221012135730379](http://www.iocaop.com/images/2022-10/202210121357445.png)



## p25-Eureka自我保护

某时刻某一个微服务不可用了，Eureka<span style="background-color:pink;">不会立刻清理</span>，依旧会对该微服务的信息进行保存。

**为什么会产生Eureka自我保护机制?**

为了EurekaClient可以正常运行，防止与EurekaServer网络不通情况下，EurekaServer不会立刻将EurekaClient服务剔除。

当网络分区故障发生(延时、卡顿、拥挤)时，微服务与EurekaServer之间无法正常通信，微服务本身其实是健康的，此时不应该注销这个微服务。

自我保护：当EurekaServer节点在短时间内丢失过多客户端时(可能发生了网络分区故障)，那么这个节点就会进入自我保护模式。

宁可保留错误的服务注册信息，也不盲目注销任何可能健康的服务实例

## p26-怎么禁止自我保护

将Eureka调为单机模式来测试：

```yml
eureka:
  instance:
    hostname: eureka7001.com #eureka服务端的实例名称
  client:
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url:
      #集群指向其它eureka
      defaultZone: http://eureka7001.com:7001/eureka/
```

加上选定部分的代码，关闭自我保护：

![image-20221012142242611](http://www.iocaop.com/images/2022-10/202210121422675.png)

再到支付服务加上选定部分配置：

![image-20221012142620017](http://www.iocaop.com/images/2022-10/202210121426082.png)

现在只要服务挂了，在注册中心就会删除服务信息。

## p27-Eureka停更

Eureka停更了，但是还能使用。有些公司还是会用Eureka，当然也可以使用zookeeper或者consul代替。

## p28-支付微服务注册到zookeeper

zookeeper是一个分布式协调工具，可以实现注册中心功能。

安装：<a href = 'https://blog.csdn.net/weixin_61893378/article/details/125223813'>点击跳转</a>

> 安装启动过程中遇到问题， zookeeper会占用8080端口，我之前nginx监听了8080端口，所以一直报错。

新建一个支付微服务，用zookeeper来做注册中心。其他依赖和8001一致，将Eureka改成zookeeper：

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
        </dependency>
```

配置：

```yml
spring:
  application:
    name: cloud-payment-service
  cloud:
    zookeeper:
      connect-string: www.iocaop.com:2181
```

启动8004，可以使用命令查看当前已注册的服务：

```bash
[zk: localhost:2181(CONNECTED) 0] ls /
[services, zookeeper]
[zk: localhost:2181(CONNECTED) 1] ls /services
[cloud-payment-service]
[zk: localhost:2181(CONNECTED) 2] ls /services/cloud-payment-service
[0546ed78-c354-4622-86f8-53861f35b581]
[zk: localhost:2181(CONNECTED) 3] get /services/cloud-payment-service/0546ed78-c354-4622-86f8-53861f35b581
{"name":"cloud-payment-service","id":"0546ed78-c354-4622-86f8-53861f35b581","address":"localhost","port":8004,"sslPort":null,"payload":{"@class":"org.springframework.cloud.zookeeper.discovery.ZookeeperInstance","id":"application-1","name":"cloud-payment-service","metadata":{}},"registrationTimeUTC":1665578260810,"serviceType":"DYNAMIC","uriSpec":{"parts":[{"value":"scheme","variable":true},{"value":"://","variable":false},{"value":"address","variable":true},{"value":":","variable":false},{"value":"port","variable":true}]}}
[zk: localhost:2181(CONNECTED) 4]
```

格式化json串：

```json
{
    "name": "cloud-payment-service",
    "id": "0546ed78-c354-4622-86f8-53861f35b581",
    "address": "localhost",
    "port": 8004,
    "sslPort": null,
    "payload": {
        "@class": "org.springframework.cloud.zookeeper.discovery.ZookeeperInstance",
        "id": "application-1",
        "name": "cloud-payment-service",
        "metadata": {}
    },
    "registrationTimeUTC": 1665578260810,
    "serviceType": "DYNAMIC",
    "uriSpec": {
        "parts": [
            {
                "value": "scheme",
                "variable": true
            },
            {
                "value": "://",
                "variable": false
            },
            {
                "value": "address",
                "variable": true
            },
            {
                "value": ":",
                "variable": false
            },
            {
                "value": "port",
                "variable": true
            }
        ]
    }
}
```

## p29-临时节点还是持久节点

我们知道Eureka是有自我保护机制的，一段时间没有收到微服务发来的心跳，是不会马上删除节点信息的。但是<span style="background-color:pink;">zookeeper不一样，没收到就会马上删除</span>。

关闭后，马上会删除信息，重启后会分配另一个id。

![image-20221012210036008](http://www.iocaop.com/images/2022-10/202210122100084.png)

## p30-订单微服务注册到zookeeper

创建module，和p28的步骤类似。

配置：

```yml
server:
  port: 80

spring:
  application:
    name: cloud-order-service
  cloud:
    zookeeper:
      connect-string: www.iocaop.com:2181
```

```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

controller代码：

```java
@RestController
@Slf4j
public class OrderController {
    public static final String PAYMENT_URL = "http://cloud-payment-service/";
    @Autowired
    RestTemplate restTemplate;

    @GetMapping(value = "/consumer/payment/zk")
    public Object get(){
        return restTemplate.getForObject(PAYMENT_URL + "/payment/zk", String.class);
    }
}

```

启动，可以在zookeeper看到：

![image-20221012211541203](http://www.iocaop.com/images/2022-10/202210122115264.png)

调用也可以：

![image-20221012211819007](http://www.iocaop.com/images/2022-10/202210122118066.png)

## p31-Consul简介

官网：<a href = 'https://www.consul.io/'>点击跳转</a>

中文文档：<a href = 'https://www.springcloud.cc/spring-cloud-consul.html'>点击跳转</a>

安装教程：<a href = 'https://zhuanlan.zhihu.com/p/330373440'>点击跳转</a>

能干嘛：

- 服务发现 - 提供HTTP和DNS两种发现方式。
- 健康监测 - 支持多种方式，HTTP、TCP、Docker、Shell脚本定制化
- KV存储 - Key、Value的存储方式
- 多数据中心 - Consul支持多数据中心
- 可视化Web界面

安装启动后，进入8500端口：

![image-20221013015912472](http://www.iocaop.com/images/2022-10/202210130159578.png)

## p33-微服务提供者注册到consul

和其他几个支付微服务一样，依赖改成consul：

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
        </dependency>
```

配置：

```yml
server:
  port: 8006

spring:
  application:
    name: cloud-payment-service
  cloud:
    consul:
      host: www.iocaop.com
      port: 8500
      discovery:
        service-name: ${spring.application.name}
 		# 加上心跳
        heartbeat:
         enabled: true
```

订单微服务也是同样的操作，启动后可以在注册中心页面看到爆红，可能是新版本需要打开心跳，百度找到资料：<a href = 'https://blog.csdn.net/qq_27198345/article/details/115704473'>点击跳转</a>

两个服务都注册到consul后可以看到：

![image-20221013023245749](http://www.iocaop.com/images/2022-10/202210130232829.png)

通过订单微服务调用支付微服务也是成功的：

![image-20221013023313367](http://www.iocaop.com/images/2022-10/202210130233435.png)

### p35-三个注册中心的异同点

| 组件名称  | 语言 | CAP  | 监控检查支持 | 对外暴露接口 | 集成Spring Cloud |
| --------- | ---- | ---- | ------------ | ------------ | ---------------- |
| Eureka    | java | CAP  | 可配支持     | HTTP         | 已集成           |
| Consul    | go   | AP   | 支持         | HTTP/DNS     | 已集成           |
| Zookeeper | java | AP   | 支持         | 客户端       | 已集成           |

什么是CAP理论？

* C：Consistency 强一致性
* A：Available 可用性
* P：Partition tolerance 分区容错性

CAP理论<span style="background-color:pink;">关注粒度是数据</span>，而不是系统整体设计策略。

### AP架构（Eureka，自我保护机制）

当网络分区出现后，为了保证可用性，系统B可以返回旧值，保证系统的可用性。

结论：违背了一致性C的要求，只满足可用性和分区容错，即AP

![image-20221013024852542](http://www.iocaop.com/images/2022-10/202210130248633.png)

### CP架构（ZooKeeper/Consul）

当网络分区出现后，为了保证一致性，就必须拒接请求，否则无法保证一致性。

结论：违背了可用性A的要求，只满足一致性和分区容错，即CP。

![image-20221013024933641](http://www.iocaop.com/images/2022-10/202210130249722.png)

CP 与 AP 对立同一的矛盾关系。

## p36-Ribbon入门介绍

客户端负载均衡的工具，主要功能是提供客户端的软件负载均衡算法和服务调用。Ribbon客户端组件提供一系列完善的配置项如连接超时，重试等。

列出Load Balancer后面所有的机器，Ribbon会自动的帮助你基于某种规则(如简单轮询，随机连接等）去连接这些机器，也可以自定义负载均衡算法。

Ribbon未来可能被Spring Cloud LoadBalacer替代，因为已经进入维护模式。

Ribbon就是负载均衡 + RestTemplate调用

**Ribbon本地负载均衡客户端VS Nginx服务端负载均衡区别**

Nginx是服务器负载均衡，客户端所有请求都会交给nginx，然后由nginx实现转发请求。即负载均衡是由<span style="background-color:pink;">服务端实现</span>的。
Ribbon本地负载均衡，在调用微服务接口时候，<span style="background-color:pink;">会在注册中心上获取注册信息服务列表之后缓存到JVM本地</span>，从而在本地实现RPC远程服务调用技术。

**集中式LB**

即在服务的消费方和提供方之间使用独立的LB设施(可以是硬件，如F5, 也可以是软件，如nginx)，由该设施负责把访问请求通过某种策略转发至服务的提供方;

**进程内LB**

将LB逻辑集成到消费方，消费方从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选择出一个合适的服务器。

Ribbon就属于进程内LB，它只是一个类库，集成于消费方进程，消费方通过它来获取到服务提供方的地址。

## p37-Ribbon的负载均衡和Rest调用

Ribbon在工作时分成两步：

- 第一步先选择EurekaServer ,它优先选择在同一个区域内负载较少的server。
- 第二步再根据用户指定的策略，在从server取到的服务注册列表中选择一个地址。

为什么先前工程项目没有引入spring-cloud-starter-ribbon也可以负载均衡？

引入Eureka时包含了：

![image-20221013030919055](http://www.iocaop.com/images/2022-10/202210130309133.png)

RestTemplate使用：

getForObject()：返回对象为响应体中数据转化成的对象，基本上可以理解为Json。

getForEntity()：返回对象为ResponseEntity对象，包含了响应中的一些重要信息，比如响应头、响应状态码、响应体等。

## p38-Ribbon默认自带的负载均衡规则

![image-20221013031810542](http://www.iocaop.com/images/2022-10/202210130318624.png)

* RoundRobinRule 轮询
* RandomRule 随机
* RetryRule 先按照RoundRobinRule的策略获取服务，如果获取服务失败则在指定时间内会进行重试
* WeightedResponseTimeRule 对RoundRobinRule的扩展，响应速度越快的实例选择权重越大，越容易被选择
* BestAvailableRule 会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务
* AvailabilityFilteringRule 先过滤掉故障实例，再选择并发较小的实例
* ZoneAvoidanceRule 默认规则,复合判断server所在区域的性能和server的可用性选择服务器

## p39-Ribbon负载均衡规则替换

不要将Ribbon配置类与主启动类同包，否则配置类就会被所有的Ribbon客户端所共享，达不到特殊化定制的目的。

创建配置类,注意不要和主启动类同包：

```java
@Configuration
public class MySelfRule {

    @Bean
    public IRule myRule(){
        //定义为随机
        return new RandomRule();
    }

}
```

启动类加注解：

```java
@RibbonClient(name = "cloud-payment-service", configuration = MySelfRule.class)
```

单机Eureka7001来测试，启动8001、8002支付微服务、80订单微服务。第一次测试失败，因为服务名称大小写不一致。全改为小写后测试成功，已替换负载均衡算法为随机：![image-20221013170216259](http://www.iocaop.com/images/2022-10/202210131702484.png)

其他可能失败的原因：<a href = 'https://blog.csdn.net/weixin_42260782/article/details/120014679'>点击跳转</a>

## p40-Ribbon默认负载均衡轮询算法原理

负载均衡算法：rest接口第几次请求数%服务器集群总数量=实际服务器位置下标、

每次服务重启rest接口计数会重置为1

服务发现：可以获得服务的所有节点信息，按照上面的算法可以实现轮询

```java
List<Servicelnstance> instances = discoveryClient.getInstances("CLOUD-PAYMENT-SERVICE");
```

如:

List [0] instances = 127.0.0.1:8002
List [1] instances = 127.0.0.1:8001
8001+ 8002组合成为集群，它们共计2台机器，集群总数为2，按照轮询算法原理：

当总请求数为1时:1%2=1对应下标位置为1，则获得服务地址为127.0.0.1:8001
当总请求数位2时:2%2=О对应下标位置为0，则获得服务地址为127.0.0.1:8002
当总请求数位3时:3%2=1对应下标位置为1，则获得服务地址为127.0.0.1:8001
当总请求数位4时:4%2=О对应下标位置为0，则获得服务地址为127.0.0.1:8002
如此类推…

## p41-RoundRobinRule(轮询)分析

首先看IRule：

```java
public interface IRule{
    /*
     * choose one alive server from lb.allServers or
     * lb.upServers according to key
     * 
     * @return choosen Server object. NULL is returned if none
     *  server is available 
     */

    public Server choose(Object key);
    
    public void setLoadBalancer(ILoadBalancer lb);
    
    public ILoadBalancer getLoadBalancer();    
}
```

关键方法是choose，其他两个方法在AbstractLoadBalancerRule中已经重写。

RoundRobinRule类源码：

```java
public class RoundRobinRule extends AbstractLoadBalancerRule {

    private AtomicInteger nextServerCyclicCounter;
    private static final boolean AVAILABLE_ONLY_SERVERS = true;
    private static final boolean ALL_SERVERS = false;

    private static Logger log = LoggerFactory.getLogger(RoundRobinRule.class);
	// 构造函数，初始化一个原子计数器
    public RoundRobinRule() {
        nextServerCyclicCounter = new AtomicInteger(0);
    }
	
    public RoundRobinRule(ILoadBalancer lb) {
        this();
        setLoadBalancer(lb);
    }

    // ILoadBalancer可以获取服务节点信息
    public Server choose(ILoadBalancer lb, Object key) {
        // 如果没有ILoadBalancer对象，报错
        if (lb == null) {
            log.warn("no load balancer");
            return null;
        }
		
        Server server = null;
        int count = 0;
        while (server == null && count++ < 10) {
            // 获取可用节点信息
            List<Server> reachableServers = lb.getReachableServers();
            // 获取所有节点信息
            List<Server> allServers = lb.getAllServers();
            // 可用节点总数
            int upCount = reachableServers.size();
            // 所有节点总数
            int serverCount = allServers.size();
			// 节点数为0时报错
            if ((upCount == 0) || (serverCount == 0)) {
                log.warn("No up servers available from load balancer: " + lb);
                return null;
            }
			// 计算得出下一次调用的节点下标位置
            int nextServerIndex = incrementAndGetModulo(serverCount);
            // 根据下标获取节点信息
            server = allServers.get(nextServerIndex);
			// 如果获取到的节点信息为空，则线程让步，并且跳出当前循环
            if (server == null) {
                /* Transient. */
                Thread.yield();
                continue;
            }
			// 如果节点可用，则返回
            if (server.isAlive() && (server.isReadyToServe())) {
                return (server);
            }

            // Next.
            server = null;
        }
		
        // 尝试10次负载均衡失败，报警，且走到下一步，返回空的节点信息
        if (count >= 10) {
            log.warn("No available alive servers after 10 tries from load balancer: "
                    + lb);
        }
        return server;
    }

    /**
     * Inspired by the implementation of {@link AtomicInteger#incrementAndGet()}.
     *
     * @param modulo The modulo to bound the value of the counter.
     * @return The next value.
     */
    private int incrementAndGetModulo(int modulo) {
        // 计算调用的节点下标位置
        for (;;) {
            // 当前次数
            int current = nextServerCyclicCounter.get();
            // 当前次数+1对总数取余
            int next = (current + 1) % modulo;
            // 用cas修改值
            if (nextServerCyclicCounter.compareAndSet(current, next))
                return next;
        }
    }

    @Override
    public Server choose(Object key) {
        return choose(getLoadBalancer(), key);
    }

    @Override
    public void initWithNiwsConfig(IClientConfig clientConfig) {
    }
}
```

## p42-Ribbon之手写轮询算法

注释掉配置类和启动类的注解，不用RestTemplate自带的负载均衡功能。

```java
@Configuration
public class ApplicationContextConfig {

    @Bean
//    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

```java
@SpringBootApplication
@EnableEurekaClient
//@RibbonClient(name = "cloud-payment-service", configuration = MySelfRule.class)
public class OrderApplication80 {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication80.class,args);
    }
}
```

创建一个类，加到托管到ioc：

```java
/**
 * 自定义负载均衡算法-轮询
 *
 * @author lzc
 * @date 2022/10/13
 */
@Component
public class MyRoundRobinRule {


    /**
     * 调用次数 计数器
     */
    private AtomicInteger counter = new AtomicInteger(0);

    public ServiceInstance getInstance(List<ServiceInstance> instances) {
        return instances.get(getIndexAndIncr(instances.size()));
    }

    /**
     * 获取下标并自增计数器
     *
     * @return int
     */
    private int getIndexAndIncr(int size) {
        int next;
        // CAS 自旋锁 保证线程安全，给计数器加1
        while (!counter.compareAndSet(counter.get(),
            next = counter.get() == Integer.MAX_VALUE ? 0 : counter.get() + 1)) {
            ;
        }
        // 取模 得到下标
        return next % size;
    }
}
```

控制层用服务发现，获取支付服务所有节点信息。调用上面的类，获取一个节点的信息：

```java
    public static final String PAYMENT_URL = "http://cloud-payment-service/";
    @Autowired
    RestTemplate restTemplate;

    @Autowired
    DiscoveryClient discoveryClient;

    @Autowired
    MyRoundRobinRule myRoundRobinRule;
    @GetMapping(value = "/consumer/myLB/payment/get/{id}")
    public CommonResult getLB(@PathVariable("id") Long id){
        // 获取所有支付微服务节点
        List<ServiceInstance> instances = discoveryClient.getInstances("cloud-payment-service");
        if (instances == null || instances.size() == 0) {
            return null;
        }
        ServiceInstance serviceInstance =myRoundRobinRule.getInstance(instances);
        String url = serviceInstance.getUri().toString()+ "/payment/get/" + id;
        log.info("本次调用端口:{}", serviceInstance.getPort());
        CommonResult result = restTemplate.getForObject(url, CommonResult.class);
        return result;
    }

```

验证：

![image-20221013233532572](http://www.iocaop.com/images/2022-10/202210132335725.png)

CAS知识补充：<a href = 'https://www.zhihu.com/question/276921045/answer/680083609'>点击跳转</a>

![image-20221013233557439](http://www.iocaop.com/images/2022-10/202210132335513.png)

实际开发，自定义负载均衡算法不会这样，而是实现IRule接口。

这里的重点是：算法很简单，就是当前调用次数对服务总数取余，再自增，调用次数自增就会涉及到并发问题，解决这个并发问题，<span style="background-color:pink;">尽量避开使用synchronized锁，影响性能，所以使用cas+自旋锁</span>。

## p43-OpenFeign入门

### Feign是什么？

一个声明式WebService客户端，让编写Web Service客户端更加简单。

使用方法是：定义一个服务接口然后在上面添加注解

支持可拔插式的编码器和解码器

Spring Cloud对Feign进行了封装，使其支持了Spring MVC标准注解和HttpMessageConverters。Feign可以与Eureka和Ribbon组合使用以支持负载均衡。

### 为什么要用Feign？

方便。

Ribbon+RestTemplate时，利用RestTemplate对http请求的封装处理形成了一套模版化的调用方法。实际开发对服务依赖的调用可能不止一处，一个接口会被多处调用，就<span style="background-color:pink;">需要写多次服务名+接口地址</span>来调用。Feign做了进一步封装，帮助我们定义和实现依赖服务接口的定义，只需创建一个接口并使用注解的方式来配置它。

Feign也实现了负载均衡(集成了Ribbon)，轻量级RESTful的HTTP服务客户端。

使用方式是:使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务。

### OpenFeign又是什么？

更方便。

Spring Cloud在Feign的基础上<span style="background-color:pink;">支持了SpringMVC的注解</span>，@FeignClient可以解析SpringMVC的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类。

## p44-OpenFeign服务调用

创建module，订单微服务调用支付微服务，增加依赖：

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
```

配置文件先不变动。

创建一个接口，feign客户端，定义方法，不需要实现，但是路径和方法参数是要在支付微服务中的controller有的，且要一样。

```java
@Component
@FeignClient(value = "cloud-payment-service")
public interface PaymentFeign {

    /**
     * 通过id获取
     *
     * @param id id
     * @return {@link CommonResult}<{@link Payment}>
     */
    @GetMapping(value = "/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id);
}
```

创建controller，装配这个feign再调用:

```java
@RestController
@Slf4j
public class OrderController {

    @Autowired
    private PaymentFeign paymentFeign;

    @GetMapping(value = "/consumer/feign/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id)
    {
        return paymentFeign.getPaymentById(id);
    }

}
```

启动7001Eureka、8001、8002支付微服务、订单微服务进行测试：

![image-20221014163346792](http://www.iocaop.com/images/2022-10/202210141633944.png)

可以看到，默认用了轮询算法进行负载均衡。

> 上家公司代码是这样的：在支付微服务中定义客户端feign接口，对外暴露，并且实现这个接口，实现类加上@RestController注解。

如果启动报错，检查启动类是否加了注解：<span style="background-color:pink;">@EnableFeignClients</span>

## 45-OpenFeign超时控制

超时解释：服务提供者接口响应时间超出服务消费者能够等待的时间就会出现调用超时，默认OpenFeign等待时间是1秒，超过1秒就视为超时。

超时演示：

先在服务提供者支付微服务写一个接口，线程等待3秒：

```java
    @GetMapping(value = "/payment/timeout")
    public String timeout(){
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return serverPort;
    }
```

feign客户端定义接口：

```java
    @GetMapping(value = "/payment/timeout")
    public String timeout();
```

消费者创建接口，进行远程调用：

```java
    @GetMapping(value = "/consumer/feign/payment/timeout")
    public String timeout()
    {
        return paymentFeign.timeout();
    }
```

先自测服务提供者接口是否可用：

![image-20221014222301320](http://www.iocaop.com/images/2022-10/202210142223406.png)

远程调用：

![image-20221014222411552](http://www.iocaop.com/images/2022-10/202210142224619.png)

报了超时，这时候需要在消费端加上配置：

```yml
ribbon:
  #指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间
  ReadTimeout: 5000
  #指的是建立连接后从服务器读取到可用资源所用的时间
  ConnectTimeout: 5000
```

再次调用，就成功了：

![image-20221014223124181](http://www.iocaop.com/images/2022-10/202210142231241.png)

## p46-OpenFeign日志增强

Feign有日志打印功能，调整日志级别，可以了解到HTTP请求的细节，对接口调用情况进行监控和输出。

日志级别：

* NONE ：默认，不显示
* BASIC：请求方式、URL、状态码、耗时
* HEADERS：BASIC的信息+请求和响应的头信息
* FULL：HEADERS+请求和响应的正文及元数据

首先添加配置类：

```java
@Configuration
public class FeignConfig {

    @Bean
    public Logger.Level feignLoggerLevel(){
        return Logger.Level.FULL;
    }
}
```

配置文件增加：

```yml
logging:
  level:
    com.lzc.springcloud.feign.PaymentFeign: debug
```

启动，调用接口，打印日志：

![image-20221014232009797](http://www.iocaop.com/images/2022-10/202210142320876.png)

## p47-Hystrix是什么

微服务拆分追求高内聚低耦合，那么在服务调用构成中就会形成复杂的链路，不可避免会出现调用失败的情况(超时，宕机等)，就会出现因为一个服务调用失败影响整体，甚至雪崩。

<span style="background-color:pink;">服务雪崩</span>：当某个被调用的服务接受大流量，并且失败，但是这个服务又<span style="background-color:pink;">调用了其他的服务</span>，就会发生<span style="background-color:pink;">级联故障</span>，就是雪崩。

Hystrix能保证在一个依赖服务出问题的情况下，不导致整体服务失败，避免级联故障，提升分布式系统的弹性。

向调用方返回一个符合预期的，可处理的备选响应(FallBack)，而不是长时间的等待或者抛出调用方无法处理的异常。保证调用方线程不被长时间、不必要的占用、避免故障蔓延、乃至雪崩。

假设A->B、B->C，C挂了。这时候A接受大量请求，A->B，B->C，B很多线程在等C响应，不响应这个线程在没到超时时间就不会销毁，然后B接受大量请求又一直开线程，导致栈溢出，又或者：C只能承受100个现成、B承受200个，A能承受300个，B服务崩了的原因也可能是A

功能：

* 服务降级
* 服务熔断
* 接近实时的监控
* ...

关于服务雪崩更详细讲解：<a href = 'https://www.cnblogs.com/rxysg/p/15667883.html'>点击跳转</a>

目前已经停更，维护阶段，替代品有：<a href = 'https://github.com/resilience4j'>Resilience4j</a>、<a href = 'https://github.com/alibaba/Sentinel'>Sentinel</a>

## p49-Hystrix的服务降级熔断限流概念

### 服务降级

有点像Switch case，当其他条件都不满足，总会有一个default值返回，也想电信人工客服，“服务人员正慢，继续等待请按1”，总之就会当服务不可用时，返回一个友好的提示(兜底值fallback)

### 服务熔断

设置最大访问量，防止服务器压力大宕机，当达到最大服务访问后，直接拒绝访问，然后调用服务降级的方法返回友好提示。

### 服务限流

秒杀高并发等操作，严禁一窝蜂拥挤，而是排队，一秒钟N个请求打进来，有序进行。

## p51-Hystrix支付微服务构建

新建module，cloud-provider-hystrix-payment8001，依赖和原来的一样，但是要新增依赖:

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
```

配置先不变，

编写controller：

```java
@RestController
@Slf4j
public class PaymentController {


    @GetMapping("/payment/hystrix/ok")
    public String ok(){
        return Thread.currentThread().getName()+"8001:ok";
    }

    @GetMapping("/payment/hystrix/timeout")
    public String timeout(){
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return Thread.currentThread().getName()+"8001:timeout";
    }

}
```

启动7001注册中心。8001hystrix支付微服务，测试消费者端：

![image-20221015151032254](http://www.iocaop.com/images/2022-10/202210151510326.png)

使用Jmeter进行压力测试：

1.测试计划中右键添加-》线程-》线程组（线程组，线程数：200，循环次数：1000，其他参数默认）

2.刚刚新建线程组，右键它-》添加-》取样器-》Http请求-》基本 输入http://localhost:8001/payment/hystrix/ok

3.点击绿色三角形图标启动。

看演示结果：拖慢，原因：springboot使用的是<span style="background-color:pink;">tomcat内置线程池，默认的工作线程数被打满了</span>，没有多余的线程来分解压力和处理。

原本秒响应的借口，已经要转圈圈了：

![image-20221015152210488](http://www.iocaop.com/images/2022-10/202210151522557.png)

## 订单微服务调用支付微服务出现卡顿

Hystrix在服务端和消费端都可以用，一般用在消费端。

新建订单微服务cloud-consumer-feign-hystrix-order80，调用支付微服务，新增依赖：

```xml
      <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
```

配置不变

创建Feign客户端，调用8001支付微服务：

```java
@FeignClient(value = "cloud-payment-service")
public interface PaymentFeign {

    /**
     * 正常访问
     *
     * @return {@link String}
     */
    @GetMapping("/payment/hystrix/ok")
    public String ok();

    /**
     * 延迟3秒
     *
     * @return {@link String}
     */
    @GetMapping("/payment/hystrix/timeout")
    public String timeout();

}
```

控制层：

```java
@RestController
@Slf4j
public class OrderFeignHystrixController {

    @Autowired
    PaymentFeign paymentFeign;

    @GetMapping("/consumer/payment/hystrix/ok")
    public String ok() {
        return paymentFeign.ok();
    }

    @GetMapping("/consumer/payment/hystrix/timeout")
    public String timeout() {
        return paymentFeign.timeout();
    }

}

```

可以正常调用：

![image-20221015161057654](http://www.iocaop.com/images/2022-10/202210151610728.png)

使用Jmeter对支付微服务8001进行高并发压力测试。在浏览器调用订单接口，发现逐渐变慢了，增加并发，甚至出现超时：

![image-20221015162624325](http://www.iocaop.com/images/2022-10/202210151626394.png)

## p53-降级容错解决的维度要求

* 提供者服务超时或宕机了，消费者服务不能一直等待，必须要有服务降级。
* 提供者服务没问题，但是消费者服务自己出故障或者有自我要求(自己的等待时间小于提供者响应时间)

## p54-Hystrix之服务降级支付微服务（提供者）fallback

需要设置消费端自身调用超时时间峰值，超过3秒算超时，超时了需要有兜底方法处理，作为服务降级fallback。

编写超时降级时的兜底方法:

```java
    private String timeOutHandler() {
        return Thread.currentThread().getName()+"服务降级,请检查支付微服务8001";
    }
```

在需要降级的方法上加上注解,这里设置3秒算超时，而方法中线程睡眠了5秒：

```java
    @GetMapping("/payment/hystrix/timeout")
    @HystrixCommand(fallbackMethod = "timeOutHandler", commandProperties = {
            // 设置超时时间为3秒
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
    })
    public String timeout(){
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return Thread.currentThread().getName()+"8001:timeout";
    }
```

启动类加注解：

```java
@EnableCircuitBreaker
```

为了测试，我们把消费端的feign(ribbon)配置超时时间改大一点：

```yml
ribbon:
  #指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间
  ReadTimeout: 15000
  #指的是建立连接后从服务器读取到可用资源所用的时间
  ConnectTimeout: 15000
```

测试：

![image-20221015234954082](http://www.iocaop.com/images/2022-10/202210152349164.png)

可以看出线程名称是Hystrix开头，<span style="background-color:pink;">降级时会有专门的线程池来处理</span>。

将睡眠部分的代码删除，改成10/0的异常，再测试：

```java
    @GetMapping("/payment/hystrix/timeout")
    @HystrixCommand(fallbackMethod = "timeOutHandler", commandProperties = {
            // 设置超时时间为3秒
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
    })
    public String timeout(){
        int i = 10/0;
        return Thread.currentThread().getName()+"8001:timeout";
    }
```

结果：也会服务降级

消费者和提供者都可以设置Hystrix超时。

## p55-Hystrix之服务降级订单微服务（消费者）fallback

Hystrix服务降级不光能在服务提供者使用，也可以在服务消费者使用，一般是建议消费者使用。

创建兜底方法：

```java
    private String timeOutHandler() {
        return Thread.currentThread().getName()+"服务降级,请检查订单微服务80";
    }
```

业务方法加注解，设置超时时间为3秒

```java
    @HystrixCommand(fallbackMethod = "timeOutHandler", commandProperties = {
        // 设置超时时间为3秒
        @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
    })
```

将支付微服务的该方法改为15秒超时，且睡眠10秒，即在服务提供者，认为该方法是正常的，支付微服务不会进行服务降级，而订单微服务认为需要降级(订单微服务)：

```java
    @GetMapping("/payment/hystrix/timeout")
    @HystrixCommand(fallbackMethod = "timeOutHandler", commandProperties = {
            // 设置超时时间为3秒
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "15000")
    })
    public String timeout(){
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
//        int i = 10/0;
        return Thread.currentThread().getName()+"8001:timeout";
    }
```

订单微服务配置增加：

```yml
feign:
  hystrix:
    enabled: true
```

订单微服务(消费端)启动类加注解：

```java
@EnableHystrix
```

启动测试：

![image-20221016000730743](http://www.iocaop.com/images/2022-10/202210160007824.png)

## p56-Hystrix之全局服务降级DefaultProperties

目前存在问题：

* 每个业务方法对应一个兜底方法，代码太多
* 没有统一（默认）的兜底方法，且将同一的和自定义的分开

在订单微服务cloud-consumer-feign-hystrix-order80来测试：

编写全局服务降级方法：

```java
    /**
     *  全局服务降级方法
     * @return
     */
    public String globalHandler() {
        return "全局服务降级,请检查订单微服务80";
    }
```

需要服务降级的controller类头上加注解：

```java
@DefaultProperties(defaultFallback = "globalHandler")
```

注释上一节中方法上自定义的fallback方法注解@HystrixCommand中的参数，表示开启服务降级而不指定某个兜底方法：

```java
    @GetMapping("/consumer/payment/hystrix/timeout")
//    @HystrixCommand(fallbackMethod = "timeOutHandler", commandProperties = {
//        // 设置超时时间为3秒
//        @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
//    })
	@HystrixCommand
    public String timeout() {
        return paymentFeign.timeout();
    }
```

测试：

![image-20221016001829340](http://www.iocaop.com/images/2022-10/202210160018409.png)

## p57-Hystrix之通配服务降级FeignFallback

在每个controller为每个方法配置兜底方法，耦合度高，可以在Feign中统一的Fallback。

在Feign客户端定义接口中添加一个服务降级的实现类即可实现解耦合。

服务调用时，服务提供者可能存在的异常：

* 运行时异常
* 超时
* 宕机

前两种已经试过了，现在来试一下第三中，宕机，并且用feignFallback来实现Feign接口，设置兜底方法。

创建一个类，PaymentFeignFallback，实现PaymentFeign接口，并重写方法:

```java
@Component
public class PaymentFeignFallback implements PaymentFeign {

    @Override
    public String ok() {
        return "服务降级,请检查订单微服务80 method:ok()";
    }

    @Override
    public String timeout() {
        return "服务降级,请检查订单微服务80 method:timeout()";
    }
}
```

在PaymentFeign的@FeignClient增加参数:

```java
@FeignClient(value = "cloud-payment-service", fallback = PaymentFeignFallback.class)
```

配置文件和启动类同样要开启Hystrix。

故意关掉8001服务，进行测试：

![image-20221016004436458](http://www.iocaop.com/images/2022-10/202210160044535.png)

## p58-Hystrix之服务熔断理论

<span style="background-color:pink;">导致服务降级的原因</span>：

* 程序运行时异常
* 超时
* 服务熔断触发服务降级
* 线程池/信号量满了

现在就来学习服务熔断：当服务达到最大访问后，直接拒绝访问，调用对应的服务降级方法，返回友好提示。

服务降级->熔断->恢复调用链路

概述：应对雪崩效应的一种微服务链路保护机制，当扇出链路的某个微服务出错或者不可用或者响应时间太长，会进行服务降级，进而熔断该节点微服务的调用，快速返回错误的响应信息。

> 当检测到该节点微服务调用响应正常后，恢复调用链路。

springcloud中，熔断机制也是通过Hystrix实现，Hystrix可以监控微服务调用的状况，当失败的调用达到一定的阈值（缺省是5秒内20次失败），就会启动熔断机制。注解是：

```java
@HystrixCommand
```

## p59~60-Hystrix之服务熔断案例

在服务提供者8001建一个会进行服务降级的接口：

```java
    @GetMapping("/payment/hystrix/circuit/{id}")
    public String paymentCircuitBreaker(@PathVariable("id") Integer id) {
        if (id<0){
            throw new RuntimeException("id不能为负数");
        }
        return Thread.currentThread().getName()+"8001:paymentCircuitBreaker调用成功"+ UUID.randomUUID();
    }
```

服务降级调用的方法：

```java
    private String paymentCircuitBreakerHandler(@PathVariable("id") Integer id) {
        return Thread.currentThread().getName()+"8001:paymentCircuitBreaker调用失败,id不能为负数"+ UUID.randomUUID();
    }
```

服务熔断和服务降级都可以在@HystrixCommand注解进行配置，我们打开HystrixCommandProperties的源码，可以看到很多关于@HystrixProperty参数的属性。

![image-20221016014103613](http://www.iocaop.com/images/2022-10/202210160141789.png)

参考资料：<a href = 'https://blog.csdn.net/qq_43509535/article/details/113799835?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-113799835-blog-108982100.pc_relevant_3mothn_strategy_and_data_recovery&spm=1001.2101.3001.4242.1&utm_relevant_index=3'>点击跳转</a>

对熔断器进行配置：<span style="background-color:pink;">在时间窗口期内，请求次数的失败率到达多少后断路器就起作用</span>。

```java
        // 是否开启断路器
        @HystrixProperty(name = "circuitBreaker.enabled", value = "true"),
        // 请求次数
        @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
        // 时间窗口期
        @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "10000"),
        // 失败率达到多少后跳闸
        @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "60")
```

把上面的注解加在controller或者serviceimpl的方法上，启动服务测试一下能不能正常使用，并且服务降级有效：

![image-20221016015903189](http://www.iocaop.com/images/2022-10/202210160159282.png)

现在，来测试熔断器器：根据上面的熔断器注解配置，10秒内6次失败触发服务降级，就会熔断，也就是说，熔断后就算是正确的调用，也会降级，过一会儿会尝试恢复(检查是否满足熔断器的开启条件)，如果不满足熔断器要求，就会关闭服务熔断。

> 传参为整数是正常调用，负数会报异常，触发服务降级。

在10秒内发送10个请求，且6次触发了服务降级，触发了熔断器，此时我再正常调用，也会返回服务降级的信息：

![image-20221016020408238](http://www.iocaop.com/images/2022-10/202210160204322.png)

## p61~62-Hystrix之服务熔断总结

熔断器类型：

* 打开
* 关闭
* 半开：部分请求根据规则调用当前服务，如果成功且符合规则，就认为当前服务恢复正常，关闭熔断

熔断器的三个重要参数：

* 快照时间窗口：就是统计接口调用信息的时间范围，默认是最近10秒
* 请求总数阈值：默认20，阈值是20的情况下，就算所有请求都失败（失败率100%），但是请求次数不足10次，熔断器也不会打开。
* 错误百分比阈值：默认50%，在快照时间内，请求总数达到阈值，且错误百分比也达到阈值，就会打开熔断器。

> 开启后，所有的请求都不会进行转发了，一段时间后(5秒)，断路器会由全开变为半开，<span style="background-color:pink;">半开时会让其中一个请求转发，如果成功，断路器关闭，如果失败，断路器又变为全开</span>。

打开熔断器后，再有请求，则不会调用主逻辑，而是直接调用fallback。

Hystrix还有限流功能，但是可以用Sentinel替代(更好)。

## p63-Hystrix图形化 Dashboard搭建

新建cloud-consumer-hystrix-dashboard9001

依赖：

```xml
 <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
```

配置：

```yml
server:
  port: 9001
```

启动类：

```java
@SpringBootApplication
@EnableHystrixDashboard
public class HystrixDashboardApplication9001 {

    public static void main(String[] args) {
        SpringApplication.run(HystrixDashboardApplication9001.class, args);
    }

}
```



通过这个9001服务来监控其他服务的Hystrix情况，需要注意的是，其他服务要有下面的依赖：

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
```

启动：进入http://localhost:9001/hystrix

![image-20221016025223586](http://www.iocaop.com/images/2022-10/202210160252439.png)

## p63-Hystrix图形化 Dashboard使用

在需要监控的服务启动类加配置：

```java
/**
     *此配置是为了服务监控而配置，与服务容错本身无关，springcloud升级后的坑
     *ServletRegistrationBean因为springboot的默认路径不是"/hystrix.stream"，
     *只要在自己的项目里配置上下面的servlet就可以了
     *否则，Unable to connect to Command Metric Stream 404
     */
    @Bean
    public ServletRegistrationBean getServlet() {
        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
        registrationBean.setLoadOnStartup(1);
        registrationBean.addUrlMappings("/hystrix.stream");
        registrationBean.setName("HystrixMetricsStreamServlet");
        return registrationBean;
    }
```

9001监控8001 - 填写监控地址 - http://localhost:8001/hystrix.stream 到 http://localhost:9001/hystrix页面的输入框。

然后我们调用几次刚才的带有熔断器的接口，会统计：

数字和右上角英文的颜色对应。

![image-20221016030038360](http://www.iocaop.com/images/2022-10/202210160300475.png)

## p66-Gateway是什么

<span style="background-color:pink;">提供一个统一的服务地址给前端使用</span>，zuul停更(Netflix公司做这个的团队产生分歧)，所以用Spring Cloud自己做了个Gateway替代。使用了<span style="background-color:pink;">Webflux</span>框架、<span style="background-color:pink;">Netty</span>性能更好。

作用：

* 反向代理
* 鉴权
* 流量控制
* 熔断
* 日志监控
* 等

微服务架构中网关所处的位置：

![image-20221017122654709](http://www.iocaop.com/images/2022-10/202210171226832.png)

网关是所有微服务的入口。

## Gateway非阻塞异步模型

zuul已经进入维护，Gateway是Spring Cloud团队研发，很多功能比zuul便捷，采用<span style="background-color:pink;">异步非阻塞模型</span>，性能也更好。

Gateway的优势：

* zuul1.x基于阻塞io
* zuul1.x基于servlet2.5阻塞架构，不支持任何长链接，每次io都是从工作线程中选择一个执行，请求线程被阻塞到工作线程完成。
* zuul2.x想基于Netty非阻塞和支持长连接，但是SpringCloud还没有整合。
* Gateway建立Spring5、Reactor、SpringBoot2、非阻塞API
* Gateway支持WebSocket，与Spring紧密集成，开发体验更好。

![image-20221017123930781](http://www.iocaop.com/images/2022-10/202210171239881.png)

![image-20221017124050330](http://www.iocaop.com/images/2022-10/202210171240400.png)

## p68-Gateway工作流程

核心概念：

* 路由：由ID,目标URI,一系列的断言和过滤器组成,如断言为true则匹配该路由。
* 断言：匹配HTTP请求中的所有内容(例如请求头或请求参数),如果请求与断言相匹配则进行路由
* 过滤：Spring框架中GatewayFilter的实例，在请求被路由前或者之后对请求进行修改。

![image-20221017124616938](http://www.iocaop.com/images/2022-10/202210171246027.png)

路由转发 + 执行过滤器链

先<span style="background-color:pink;">断言</span>，也就是路径匹配，然后<span style="background-color:pink;">路由</span>，确认转发到哪里，请求到达真正处理的微服务还有<span style="background-color:pink;">过滤</span>器，可以在请求之前(权限校验、或者请求头带上token)、请求之后(日志输出)做处理。

## p69-Gateway搭建

新建module:cloud-gateway-gateway9527

<span style="background-color:pink;">网关作为微服务，也要注册到注册中心</span>。

> Gateway不需要手动添加web启动器依赖和actuator依赖

依赖：

```xml
    <dependencies>
        <!--gateway-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
```

配置文件：

```yml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway-service

eureka:
  client:
    # 是否注册
    register-with-eureka: true
    # 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡
    fetch-registry: true
    # 注册中心的地址
    service-url:
      defaultZone: http://localhost:7001/eureka
  instance:
    hostname: cloud-gateway-service

```

现在我们想通过9527访问8001的如下两个接口：

![image-20221018053654134](http://www.iocaop.com/images/2022-10/202210180536258.png)

就需要在配置文件增加：

```yml
spring:
  application:
    name: cloud-gateway-service
  cloud:
    gateway:
      routes:
        - id: payment_routh
          uri: http:localhost:8001/
          predicates:
            - Path=/payment/get/** # 路由规则
        - id: payment_routh2
          uri: http:localhost:8001/
          predicates:
            - Path=/payment/discovery/** # 路由规则
```

启动注册中心7001、支付微服务8001、网关微服务9527，进行测试：

![image-20221018054446954](http://www.iocaop.com/images/2022-10/202210180544054.png)

![image-20221018054527652](http://www.iocaop.com/images/2022-10/202210180545748.png)

现在，通过9527和8001都可以访问这两个接口了。

## p70-Gateway配置路由的两种方式

上面配置是在yml配置文件进行配置，也可以写配置类进行配置，下面来配置/guonei跳转到百度的页面：http://news.baidu.com/guonei

配置类：

```java
@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder routeLocatorBuilder) {
        RouteLocatorBuilder.Builder routes = routeLocatorBuilder.routes();
        routes.route("path_route_lzc", r -> r.path("/guonei").uri("http://news.baidu.com/guonei")).build();
        return routes.build();
    }

}
```

启动测试：

![image-20221018060317591](http://www.iocaop.com/images/2022-10/202210180603780.png)

## p71-Gateway配置动态路由

上面是写死了一个地址，我们需要根据服务名来动态路由，默认情况下Gateway会根据注册中心注册的服务列表，以注册中心上微服务名为路径创建**动态路由进行转发，从而实现动态路由的功能**（不写死一个地址）。

在配置文件增加配置，开启这个功能：

```yml
spring:
  application:
    name: cloud-gateway-service
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
```

8001和8002新增接口，返回端口号：

```java
    @GetMapping(value = "/payment/port")
    public String getPort()
    {
        return serverPort;
    }
```

路由目的url改为lb开头：

```yml
spring:
  application:
    name: cloud-gateway-service
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh
          uri: lb://cloud-payment-service
          predicates:
            - Path=/payment/get/** # 路由规则
        - id: payment_routh2
        # 可以写具体某个服的地址，也可以写服务名
        # uri: http://localhost:8001
          uri: lb://cloud-payment-service
          predicates:
            - Path=/payment/discovery/** # 路由规则
        - id: payment_routh3
          uri: lb://cloud-payment-service
          predicates:
            - Path=/payment/port/** # 路由规则
```

启动注册中心7001、支付微服务8001和8002、网关9527进行测试：

![image-20221018061523243](http://www.iocaop.com/images/2022-10/202210180615331.png)

已经实现了动态路由负载均衡

## p72-GateWay常用的Predicate

Spring Cloud Gateway包括许多内置的Route Predicate工厂。所有这些Predicate都与HTTP请求的不同属性匹配。多个RoutePredicate工厂可以进行组合。

![image-20221018062853452](http://www.iocaop.com/images/2022-10/202210180628553.png)

### 关于时间的断言

在指定的时间，这个路由才会生效

1. The After Route Predicate Factory
2. The Before Route Predicate Factory
3. The Between Route Predicate Factory

如：

```yml
        - id: payment_routh3
          uri: lb://cloud-payment-service
          predicates:
            - Path=/payment/port/** # 路由规则
            - After=2017-01-20T17:42:47.789-07:00[America/Denver]
```

时间格式获得方式：

```java
public class TimeTest {

    public static void main(String[] args) {
        ZonedDateTime zbj = ZonedDateTime.now(); // 默认时区
        System.out.println(zbj);
    }
}
```

![image-20221018063238776](http://www.iocaop.com/images/2022-10/202210180632900.png)

现在将网关的配置改为如下：

```yml
        - id: payment_routh3
          uri: lb://cloud-payment-service
          predicates:
            - Path=/payment/port/** # 路由规则
            - After=2022-10-18T07:32:21.454251600+08:00[Asia/Shanghai]
```

再访问：

![image-20221018063405164](http://www.iocaop.com/images/2022-10/202210180634256.png)

### 关于cookie的断言

1. The Cookie Route Predicate Factory

配置：

```yml
        - id: payment_routh3
          uri: lb://cloud-payment-service
          predicates:
            - Path=/payment/port/** # 路由规则
            - After=2022-10-18T06:32:21.454251600+08:00[Asia/Shanghai]
            - Cookie=username, lzc
```

用curl分别测试带cookie和不带cookie进行访问：

![image-20221018064200366](http://www.iocaop.com/images/2022-10/202210180642476.png)

### 关于请求头的断言

1. The Header Route Predicate Factory

```yml
- id: payment_routh3
  uri: lb://cloud-payment-service
  predicates:
    - Path=/payment/port/** # 路由规则
    - After=2022-10-18T06:32:21.454251600+08:00[Asia/Shanghai]
    - Cookie=username, lzc
    - Header=X-Request-Id, \d+ # 正则表达式
```

测试：

![image-20221018064430818](http://www.iocaop.com/images/2022-10/202210180644929.png)

以此类推，其他断言也是类似。

## p73-Gateway的Filter

常用过滤器有非常多，看官网：<a href = 'https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/#gatewayfilter-factories'>点击跳转</a>

重要的是自定义过滤器，可以用来做全局日志记录、同一网关鉴权，等。

创建一个过滤器，实现 GlobalFilter,Ordered接口，重写方法,模拟一下鉴权：

```java
@Component
public class MyGateWayFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        List<String> token = request.getHeaders().get("token");
        if (token == null || token.size() == 0) {
            System.out.println("token is null");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        if (!token.get(0).equals("123")) {
            System.out.println("token is error");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 0;
    }
}

```

重启后，所有访问网关微服务的请求头必须带上token:123否则无权限。

过滤器是断言之后的，所以我们让断言配置简单点：

```yml
        - id: payment_routh3
          uri: lb://cloud-payment-service
          predicates:
            - Path=/payment/port/** # 路由规则
#            - After=2022-10-18T06:32:21.454251600+08:00[Asia/Shanghai]
#            - Cookie=username, lzc
#            - Header=X-Request-Id, \d+ # 正则表达式
```

不带token：

![image-20221018071728320](http://www.iocaop.com/images/2022-10/202210180717421.png)

带token：

![image-20221018071848404](http://www.iocaop.com/images/2022-10/202210180718497.png)

## p74-Config分布式配置中心介绍

随着工程变多，<span style="background-color:pink;">每个模块都会有一个application.yml配置文件，需要统一管理</span>，一处修改，处处生效，不然修改的时候很麻烦。而且，发版时也有多个环境，如生产、测试、灰度等，都会有很多配置文件。配置文件太多了，所以有严重的配置问题。

Config配置：为微服务提供了<span style="background-color:pink;">集中化</span>的外部配置支持，配置服务器为不同微服务应用的所有环境提供了一个中心化的外部配置。

![image-20230113162453570](http://www.iocaop.com/images/2023-01/image-20230113162453570.png)

<span style="background-color:pink;">统一，共用的配置，放在配置中心，独有的配置就放在各自的模块中</span>。

Config也分为服务端和客户端：

服务端也叫分布式配置中心，是一个独立的微服务应用，用来链接配置服务器并为客户端提供接口来获取配置信息、加密解密等访问信息。

作用：

* 集中管理配置文件
* 不同环境不同配置、动态化的配置更新，分环境部署
* 运行期间可以动态调整配置，不需要再每个服务器上编写配置文件，服务会向配置中心统一拉取配置自己的信息。
* 当配置文件发生变动时，服务不需要重启就可以感知配置文件的变化并且应用新的配置。
* 将配置信息以REST接口形式暴露

## p75-Config配置总控中心搭建

github新建一个仓库，clone下来，然后创建三个yaml配置文件，分别是：

config-dev.yml:

```yaml
config:
  info: "master branch,springcloud-config/config-dev.yml version=7"
```

config-prod.yml:

```yaml
config:
  info: "master branch,springcloud-config/config-prod.yml version=1"
```

config-test.yml:

```yaml
config:
  info: "master branch,springcloud-config/config-test.yml version=1" 
```

提交到仓库：

![image-20230113222258924](http://www.iocaop.com/images/2023-01/image-20230113222258924.png)

新建module：cloud-config-center-3344

导入依赖：

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
```

配置文件：

```yaml
spring:
  application:
    name: cloud-config-center-3344
eureka:
  client:
    # 是否注册
    register-with-eureka: true
    # 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡
    fetch-registry: true
    # 注册中心的地址
    service-url:
      defaultZone: http://localhost:7001/eureka
server:
  port: 3344
```

配置中心也需要注册到注册中心，以及健康检查依赖。

项目启动成功，下一步，配置仓库：

```yaml
spring:
  application:
    name: cloud-config-center-3344
  cloud:
    config:
      server:
        git:
          uri: git@github.com:lzcxfz/config-server.git
          ## 搜索目录
          search-paths:
            - config-server
      label: master

eureka:
  client:
    # 是否注册
    register-with-eureka: true
    # 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡
    fetch-registry: true
    # 注册中心的地址
    service-url:
      defaultZone: http://localhost:7001/eureka
server:
  port: 3344
```

启动类需要加注解<span style="background-color:pink;">@EnableConfigServer</span>

```java
@SpringBootApplication
@EnableConfigServer
@EnableEurekaClient
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class,args);
    }
}
```



配置一下hosts，如果切换开发电脑，需要注意一下，否则拉取不到信息，客户端会报错：

![image-20230113224906956](http://www.iocaop.com/images/2023-01/image-20230113224906956.png)

测试配置中心服务是否可以从github仓库获取到配置文件的内容，启动项目，报错了：

![image-20230113225330736](http://www.iocaop.com/images/2023-01/image-20230113225330736.png)

查资料：<a href='https://blog.csdn.net/m0_66782750/article/details/124160938'>点击跳转</a>

修改配置文件，由于现在github上是main分支，所以label也一起改了：

```yaml
spring:
  application:
    name: cloud-config-center-3344
  cloud:
    config:
      server:
        git:
#          uri: git@github.com:lzcxfz/config-server.git
          uri: https://github.com/lzcxfz/config-server.git
          ## 搜索目录
          search-paths:
            - config-server
      # 读取分支
      label: main
eureka:
  client:
    # 是否注册
    register-with-eureka: true
    # 是否从注册中心拉取已有的服务注册信息，单节点微服务。集群必须要为true，才能配合ribbon实现负载均衡
    fetch-registry: true
    # 注册中心的地址
    service-url:
      defaultZone: http://localhost:7001/eureka
server:
  port: 3344
```

启动后访问：http://config-3344.com:3344/main/config-dev.yaml，可以拿到配置内容：

![image-20230113225624809](http://www.iocaop.com/images/2023-01/image-20230113225624809.png)

配置读取规则：

官方文档：<a href='https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/#_quick_start'>点击跳转</a>

阳哥总结：

第一种，比较完整：

![image-20230113231315394](http://www.iocaop.com/images/2023-01/image-20230113231315394.png)

第二种，省略分支：默认读取master，如果配置了label，也读master，这里存在疑问，后面试了一下配置default-label，就会默认读取我们所配置的了：

![image-20230113231754463](http://www.iocaop.com/images/2023-01/image-20230113231754463.png)

![image-20230113231344099](http://www.iocaop.com/images/2023-01/image-20230113231344099.png)

第三种和第一种反过来，并且返回的内容是json字符串：

![image-20230113231927324](http://www.iocaop.com/images/2023-01/image-20230113231927324.png)

![image-20230113232000107](http://www.iocaop.com/images/2023-01/image-20230113232000107.png)

总结：

/{name}-{profiles}.yml

/{label}-{name}-{profiles}.yml

- label：分支(branch)
- name：服务名
- profiles：环境(dev/test/prod)

## p76-Config客户端配置与测试

接下来我们需要创建一个客户端3355，从配置中心微服务3344获取配置，而不是从github获取配置。

新建module：cloud-config-client-3355

导入依赖：

```xml
        <!-- 注意这个依赖，没有带server 说明这是客户端       -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
```

我们现在要新建配置文件：bootstrap.yml

为什么突然变成bootstrap.yml了？

applicaiton.yml是<span style="background-color:pink;">用户级的资源配置项</span>

bootstrap.yml是<span style="background-color:pink;">系统级</span>的，<span style="background-color:pink;">优先级更加高</span>，优先加载。

SpringCloud会创建一个“Bootstrap Context”，作为Spring应用的“Application Context”的<span style="background-color:pink;">父上下文</span>。

初始化的时候“Bootstrap Context”负责从<span style="background-color:pink;">外部源</span>加载配置属性并解析配置，这两个上下文共享一个从外部获取的“Environment”。

相当于客户端拿到两份配置文件，bootstrap.yml从配置中心服务拉取的（一般放公共配置），一份本地的applicaiton.yml，两个拼起来才是总的当前微服务的配置，

“Bootstrap Context”属性高优先级，默认情况下<span style="background-color:pink;">不会被本地配置覆盖</span>。“Bootstrap Context”和“Application Context”有着不同的约定，所以新增了一个bootstrap.yml配置文件，保证“Bootstrap Context”和“Application Context”配置的分离。

需要先将客户端下的applicaiton.yml暂时地先改为bootstrap.yml，因为bootstrap.yml优先级高，先加载。

```yaml
server:
  port: 3355

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: main #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml
      uri: http://config-3344.com:3344/ #配置中心地址


#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka


```

![image-20230113235609787](http://www.iocaop.com/images/2023-01/image-20230113235609787.png)

启动类不需要加注解：

```java
@SpringBootApplication
@EnableEurekaClient
public class ConfigClientApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigClientApplication.class,args);
    }
}
```

新建一个controller，用@Value注解来读取配置文件的内容：

```java
@RestController
public class TestController {

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo()
    {
        return configInfo;
    }
}
```

启动注册中心Eureka，配置中心3344，客户端3344:进行测试：

![image-20230114000944168](http://www.iocaop.com/images/2023-01/image-20230114000944168.png)

可以看到，客户端3355成功从服务器3344读取到配置，并且内容和github仓库上是一致的。

分布式配置动态刷新的问题：

现在我们到github仓库修改这个配置的内容，然后看3344和3355有没有同步更新：

![image-20230114001437746](http://www.iocaop.com/images/2023-01/image-20230114001437746.png)

刷新网页，配置中心服务端3344马上就同步了，但是无论我怎么刷新网页，客户端3355还是原来的内容：

![image-20230114001615234](http://www.iocaop.com/images/2023-01/image-20230114001615234.png)

我们重启3355客户端，再次获取配置信息：可以读取到配置信息

![image-20230114003025610](http://www.iocaop.com/images/2023-01/image-20230114003025610.png)

但是，难道我们每次修改配置文件都要去重启一下相关服务吗？服务很多会累死人，不可取。

## p77-Config动态刷新之手动版

首先要引入健康检查依赖：

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
```

修改3355配置文件，增加暴露监控端点：

```yaml
# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

在刚才的Controller上加注解<span style="background-color:pink;">@RefreshScope</span>：

![image-20230114003913419](http://www.iocaop.com/images/2023-01/image-20230114003913419.png)

重启3355客户端，再去github仓库修改配置文件内容，看看3344和3355获取到的配置信息内容有没有变化：

![image-20230114004145868](http://www.iocaop.com/images/2023-01/image-20230114004145868.png)

微服务获取到的配置：

![image-20230114004231974](http://www.iocaop.com/images/2023-01/image-20230114004231974.png)

3355还是没有获取到最新的配置，那我们增加了监控检查和注解，干嘛用的？需要运维人员手动刷新配置：

```bash
curl -X POST "http://localhost:3355/actuator/refresh"
```

我们把配置文件内容version改成888，然后重新验证一次。

没有手动刷新：

![image-20230114005617000](http://www.iocaop.com/images/2023-01/image-20230114005617000.png)

手动刷新后：客户端配置和配置中心以及github仓库都同步了。

![image-20230114005651605](http://www.iocaop.com/images/2023-01/image-20230114005651605.png)

![image-20230114005703007](http://www.iocaop.com/images/2023-01/image-20230114005703007.png)

这样就避免了服务重启，这样并不完美，假设有很多客户端呢？那我要写脚本批量刷新了，那能不能订阅，一次通知，处处生效呢？假设可以订阅了，那还有个问题，假设有100台，我有98台要更新配置，2台不更新呢，怎么定点生效？所以学BUS消息总线了！

## p78-Bus消息总线是什么

现在，我们修改github上的配置以后，需要手动post一下，调用api来刷新配置，实现了不用重启就可以刷新配置文件，但是如果客户端很多，那就要发送很多次post请求，那能不能一次订阅全部生效呢？还有能不能进行差异化呢(该生效的生效，不该生效的不生效)？

消息总线Bus是对Config的扩充，目的就是想实现分布式的自动刷新配置功能，Bus和Config配合就可以实现。

Bus支持两种消息代理：RabbitMQ和Kafka。（SpringCloud Alibaba是用RocketMQ）

![image-20230114155224108](http://www.iocaop.com/images/2023-01/image-20230114155224108.png)

使用了Bus之后，图中的步骤3，只需要手动刷新其中一个客户端微服务，这个微服务就会发送消息给Bus，Bus再将其他订阅了的微服务刷新配置。

![image-20230114155435634](http://www.iocaop.com/images/2023-01/image-20230114155435634.png)

该图不一样的是，我们更新github仓库中的配置以后，post请求刷新Config配置中心，然后配置中心会推送给所有订阅了的微服务客户端。

上面两个图，分别是两种不同的设计思想。

什么是总线

在微服务架构的系统中，通常会使用轻量级的消息代理来构建一个<span style="background-color:pink;">共用的消息主题</span>，并让系统中所有微服务实例都连接上来。由于该主题中产生的消息会<span style="background-color:pink;">被所有实例监听和消费</span>，所以称它为消息总线。在总线上的各个实例，都可以方便地广播一些需要让其他连接在该主题上的实例都知道的消息。

基本原理

ConfigClient实例都监听MQ中同一个topic(默认是Spring Cloud Bus)。当一个服务刷新数据的时候，它会把这个信息放入到Topic中，这样其它监听同一Topic的服务就能得到通知，然后去更新自身的配置。

## p79-Bus之RabbitMQ环境配置

RabbitMQ安装：<a href='http://www.iocaop.com/posts/2022-my/%E4%B8%AD%E9%97%B4%E4%BB%B6/rabbitmq-b%E7%AB%99%E5%B0%9A%E7%A1%85%E8%B0%B7.html#p10-%E5%AE%89%E8%A3%85'>点击跳转</a>

## p80-Bus动态刷新全局广播的设计思想和选型

为了演示广播的效果，再以3355为模板再制作一个3366：cloud-config-client-3366，依赖和配置都一样，只是端口不一样。

设计思想：

1. 利用消息总线触发一个客户端/bus/refresh，再由客户端发送消息给Bus总线，从而刷新所有客户端的配置

   ![image-20230114161923333](http://www.iocaop.com/images/2023-01/image-20230114161923333.png)

2. 利用消息总线触发一个服务端ConfigServer的/bus/refresh端点，服务端发送消息给bus总线，从而刷新所有客户端的配置

   ![image-20230114161938004](http://www.iocaop.com/images/2023-01/image-20230114161938004.png)

第2种架构显然更合适，第1种架构不合适的原因如下：

* 打破微服务单一职责，客户端微服务本来就是业务模块，不应该承担刷新配置的职责，万一挂了，影响业务又影响配置刷新。
* 破坏微服务的对等性，比如图中3个实例是集群，那么有时候我们只需要更新1，不需要更新2和3，那么整个集群就会产生分裂。
* 局限性，迁移的时候，网络地址会变化，此时想做到自动刷新，就要增加更多的修改，因为调用的是具体的某个实例才能刷新配置，需要具体的网络地址，而不能通过服务名来调用，所以迁移了就要修改来指定哪个业务微服务可以是用来刷新配置的。

## p81-Bus动态刷新全局广播配置实现

客户端3344添加依赖：

```xml
        <!--添加消息总线RabbitMQ支持-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bus-amqp</artifactId>
        </dependency>
```

导入以后，bus和mq都有了。首先添加mq配置：

```yaml
 spring:
  rabbitmq:
    host: www.iocaop.com
    port: 5672
    username: lzc
    password: 911823
```

添加暴露bus刷新端点配置：为什么是bus-refresh?看p78中的图，步骤3。需要注意的是，凡是这种暴露端点做刷新的，依赖中一定要有actuator

```yaml
# 暴露bus刷新配置的端点
management:
  endpoints:
    web:
      exposure:
        include: "bus-refresh"
```

接下来，让两个客户端3355和3366添加消息总线bus的支持：

依赖：

```xml
        <!--添加消息总线RabbitMQ支持-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bus-amqp</artifactId>
        </dependency>
```

配置文件：

mq配置：

```yaml
 spring:
  rabbitmq:
    host: www.iocaop.com
    port: 5672
    username: lzc
    password: 911823
```

暴露监控端点：

```yaml
# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

修改后，重启这4个服务：

![image-20230116161933059](http://www.iocaop.com/images/2023-01/image-20230116161933059.png)

![image-20230116162609770](http://www.iocaop.com/images/2023-01/image-20230116162609770.png)

修改github仓库中的配置文件：

![image-20230116162703246](http://www.iocaop.com/images/2023-01/image-20230116162703246.png)

发送post刷新，注意此时发送的是配置中心服务端，而不是客户端：

```bash
curl -X POST "http://localhost:3344/actuator/bus-refresh"
```

![image-20230116162818588](http://www.iocaop.com/images/2023-01/image-20230116162818588.png)

刷新页面，查看配置中心和两个客户端中的配置：

总是出错，所以把github仓库改成国内的gitee仓库了。

原来还是888，改成999以后，发送请求刷新：两个客户端配置都更新了。

![image-20230116170800237](http://www.iocaop.com/images/2023-01/image-20230116170800237.png)

可以登录mq管理页面，查看：topic模式，每个客户端对应一个队列，并且routingKey是#，也就是只要绑定到这个交换机上的队列都会接收到消息，相当于广播fanout，所以才会有一次刷新，处处生效。

![image-20230116174330017](http://www.iocaop.com/images/2023-01/image-20230116174330017.png)

## p82-Bus动态刷新定点通知

上面是刷新以后，通知所有客户端，现在要实现的是差异化处理，想通知哪个就通知哪个(指定具体某个实例刷新配置)，这里演示只通知客户端3355而不通知3366。

修改仓库配置：

![image-20230116174955894](http://www.iocaop.com/images/2023-01/image-20230116174955894.png)

刷新前：

![image-20230116175101339](http://www.iocaop.com/images/2023-01/image-20230116175101339.png)

刷新时，只需要在原来刷新的路径后面加上：微服务名称+端口号：

```bash
curl -X POST "http://localhost:3344/actuator/bus-refresh/config-client-3355:3355"
```

![image-20230116175339614](http://www.iocaop.com/images/2023-01/image-20230116175339614.png)

刷新页面：只有3355更新了配置

![image-20230116175414701](http://www.iocaop.com/images/2023-01/image-20230116175414701.png)

## p83-Stream为什么被引入

后端产生数据给大数据平台做分析，<span style="background-color:pink;">一个系统中出现多种MQ</span>，切换、维护、开发都会变困难，如后端使用RabbitMQ，大数据平台使用kafka。

有没有一种新的技术诞生，让我们不再关注具体MQ的细节，只需要用适配绑定的方式，自动在各种MQ内切换？

Cloud Stream 消息驱动<span style="background-color:pink;">屏蔽MQ底层，只需要操作Stream就可以操作各种MQ</span>。屏蔽底层消息中间件的差异，降低切换成本，统一消息的编程模型。

## p84-Stream是什么及Binder介绍

[官方文档1](https://spring.io/projects/spring-cloud-stream#overview)

[官方文档2](https://cloud.spring.io/spring-tloud-static/spring-cloud-stream/3.0.1.RELEASE/reference/html/Spring)

[Cloud Stream中文指导手册](https://m.wang1314.com/doc/webapp/topic/20971999.html)

应用程序通过inputs(消费者)或者outputs(生产者)来与Spring Cloud Stream中的Binder对象交互。通过我们配置的binding(绑定)，Spring Cloud Stream的Binder对象负责与消息中间件交互。引用了发布-订阅、消费组、分区三个核心概念。

## p85-Stream的设计思想

标准MQ：

![image-20230117102950961](http://www.iocaop.com/images/2023-01/image-20230117102950961.png)

* 生产者/消费者之间靠消息媒介传递信息内容
* 消息必须走特定的通道 - 消息通道 Message Channel
* 消息通道里的消息如何被消费呢，谁负责收发处理 - 消息通道MessageChannel的子接口SubscribableChannel，由MessageHandler消息处理器所订阅。

为什么用Stream？

一个系统用了多个MQ，如kafka+RabbitMQ，两个消息中间件架构不同，相当于各自有方言，现在需要有普通话：

![image-20230117103321561](http://www.iocaop.com/images/2023-01/image-20230117103321561.png)

如果我们用了两个消息队列的其中一种，后面业务需求需要往另外一种消息队列迁移，就会有一大堆东西要重新推到重做，因为它跟我们系统耦合了，Stream提供了一种解耦合的方式。

![image-20230117104013281](http://www.iocaop.com/images/2023-01/image-20230117104013281.png)

<span style="background-color:pink;">通过定义绑定器Binder作为中间层，实现了应用程序与消息中间件细节之间的隔离。</span>

Binder：

* input对应消费者
* output对应生产者

Stream中的消息通信方式遵循了发布-订阅模式，用Topic主题进行广播。RabbitMQ是Exchange，Kafka是Topic。

## p86-Stream编码常用注解简介

![image-20230117104640330](http://www.iocaop.com/images/2023-01/image-20230117104640330.png)

Binder：很方便的绑定中间件，屏蔽差异。

Channel：通道，是队列Queue的一种抽象，在消息通讯系统中是实现存储和转发的媒介。

Source和Sink：简单理解为输入输出，从Stream发布消息就是输出，接收消息就是输入。

注解：

| 组成            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| MiddleWare      | 中间件                                                       |
| Binder          | 是应用于消息中间件之间的封装，通过Binder可以很方便的连接中间件，可以动态改变消息的类型(对于kafka的Topic和RabbitMQ的exchange)，都可以通过配置文件来实现。 |
| @Input          | 标识输入通道，通过该输入通道接收到的消息进入应用程序。       |
| @Output         | 标识输出通道，发布的消息通过该通道离开应用程序。             |
| @StreamListener | 监听队列，用于消费者的队列的消息接收。                       |
| @EnableBinding  | 指信道channel和exchange绑定在一起。                          |

案例说明：

安装好RabbitMQ环境，工程中新建三个子模块：

- cloud-stream-rabbitmq-provider8801，作为生产者进行发消息模块
- cloud-stream-rabbitmq-consumer8802，作为消息接收模块
- cloud-stream-rabbitmq-consumer8803，作为消息接收模块

## p87-Stream消息驱动之生产者

新建module：cloud-stream-rabbitmq-provider8801

和其他微服务一样，需要的依赖有：

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
```

新增依赖：

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
        </dependency>
```

配置：

```yaml
server:
  port: 8801

spring:
  application:
    name: cloud-stream-provider
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: www.iocaop.com
                port: 5672
                username: lzc
                password: 911823
      bindings: # 服务的整合处理
        output: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://localhost:7001/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: send-8801.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址
```

启动类：

```java
@SpringBootApplication
@EnableEurekaClient
@EnableDiscoveryClient
public class StreamMqApplication8801 {

    public static void main(String[] args) {
        SpringApplication.run(StreamMqApplication8801.class,args);
    }

}
```

启动后报错mq连不上，参考<a href='https://blog.csdn.net/int_xxn/article/details/119607211'>点击跳转</a>，解决。

现在，基于Stream，做outputs，生产者，先建立接口：

```java
public interface MessageService {

    /**
     * 发送消息
     *
     * @return {@link String}
     */
    public String send();
}
```

实现类：

```java
/**
 * 消息服务impl
 * @EnableBinding注解 定义消息生产者的发送管道
 *
 * @author 赖卓成
 * @date 2023/01/17
 */
@EnableBinding(Source.class)
public class MessageServiceImpl implements MessageService {

    /**
     * 消息发送管道
     */
    @Resource
    private MessageChannel output;
    @Override
    public String send() {
        String msg = UUID.randomUUID().toString();
        output.send(MessageBuilder.withPayload(msg).build());
        System.out.println("msg = " + msg);
        return msg;
    }
}
```

> 这里的实现类不使用@Service注解，也不装配Dao进来。而是使用@EnableBinding(Source.class)来定义消息生产者的发送管道，装配MessageChannel用来发送消息。

创建controller，调用send方法：

```java
@RestController
public class SendMessageController {

    @Autowired
    private MessageService messageService;

    @RequestMapping("/send")
    public String send(){
       return  messageService.send();
    }

}
```

启动后可以看到，自动创建了topic交换机：

![image-20230117161806177](http://www.iocaop.com/images/2023-01/image-20230117161806177.png)

调用接口后，会有波动：

![image-20230117161844829](http://www.iocaop.com/images/2023-01/image-20230117161844829.png)

## p88-Stream消息驱动之消费者

没有使用任何的RabbitMQ的API，已经基于Stream实现了消息发送，接下来就实现消费者。

新建module：cloud-stream-rabbitmq-consumer8802

依赖和生产者8801一样。

配置文件：基本和8801一样，不同的地方已经标注，重点是output改为input

![image-20230117172217259](http://www.iocaop.com/images/2023-01/image-20230117172217259.png)

创建监听类：

```java
@Component
@EnableBinding(Sink.class)
public class ReceiveMessageListenerController {

    @Value("${server.port}")
    private String serverPort;

    /**
     * 监听方法，参数中的Message泛型需要对应生产者发送时payLoad类型
     *
     * @param message 消息
     */
    @StreamListener(Sink.INPUT)
    public void input(Message<String> message){
        System.out.println("消费者2号，收到的消息："+message.getPayload()+"\t端口号："+serverPort);
    }
}
```

测试，生产者发送5次，消费者消费5次：

![image-20230117173628029](http://www.iocaop.com/images/2023-01/image-20230117173628029.png)

![image-20230117173635646](http://www.iocaop.com/images/2023-01/image-20230117173635646.png)

并且，MQ控制台显示，交换机已经绑定了队列：

![image-20230117173658737](http://www.iocaop.com/images/2023-01/image-20230117173658737.png)

## p89-Stream之消息重复消费

和8802一样，新建一个cloud-stream-rabbitmq-consumer8803除了端口号不一样，其他都一样。

现在存在两个问题：消息重复消费、消息持久化

重复消费问题：

生产者发送两条信息，8802和8803都会收到消息并且消费，存在重复消费问题：

![image-20230117175316327](http://www.iocaop.com/images/2023-01/image-20230117175316327.png)

![image-20230117175325823](http://www.iocaop.com/images/2023-01/image-20230117175325823.png)

![image-20230117175334787](http://www.iocaop.com/images/2023-01/image-20230117175334787.png)

查看mq交换机和队列绑定状态：默认topic，路由key为#，两个队列都会接收消息。

![image-20230117175357957](http://www.iocaop.com/images/2023-01/image-20230117175357957.png)

实际场景，如果一个订单发给两个订单服务去处理了，就会造成数据错误，需要用<span style="background-color:pink;">Stream中的消息分组</span>来解决。

![image-20230117175725850](http://www.iocaop.com/images/2023-01/image-20230117175725850.png)

> Stream中处于同一个group中的多个消费者是竞争关系，能够保证消息只会被其中一个应用消费一次。不同组是可以重复消费的，同一组内会发生竞争关系，只有其中一个可以消费。

Stream分组，同一个组类似学习RabbitMQ时的工作队列模式：<a href='http://www.iocaop.com/posts/2022-my/%E4%B8%AD%E9%97%B4%E4%BB%B6/rabbitmq-b%E7%AB%99%E5%B0%9A%E7%A1%85%E8%B0%B7.html#p16-work-queues-%E5%B7%A5%E4%BD%9C%E9%98%9F%E5%88%97%E6%A8%A1%E5%BC%8F%E8%A7%A3%E9%87%8A'>点击跳转</a>

## p90-Stream之group解决消息重复消费问题

故障现象：8801发送的消息被8802和8803重复消费

导致原因：默认分组group是不同的，组流水号不一样，被认为不同组，可以消费。即8802和8803所消费的两个队列都接收到了同一条消息。

需要自定义分组为同一个组，解决消息重复消费问题。

第一步，先分不同组(可以重复消费)，先学习怎么来分组。

很简单，只需要在配置文件中加就行：

![image-20230117181154970](http://www.iocaop.com/images/2023-01/image-20230117181154970.png)

8802分组lzc-a，8803分组lzc-b，重启后，可以重复消费：

![image-20230117181322244](http://www.iocaop.com/images/2023-01/image-20230117181322244.png)

重复消费：

![image-20230117181356592](http://www.iocaop.com/images/2023-01/image-20230117181356592.png)

![image-20230117181404568](http://www.iocaop.com/images/2023-01/image-20230117181404568.png)

![image-20230117181413657](http://www.iocaop.com/images/2023-01/image-20230117181413657.png)

现在，解决重复消费问题：把8802和8803配置同一分组为lzc-c，再测试：

![image-20230117181634454](http://www.iocaop.com/images/2023-01/image-20230117181634454.png)

![image-20230117181642616](http://www.iocaop.com/images/2023-01/image-20230117181642616.png)

![image-20230117181650328](http://www.iocaop.com/images/2023-01/image-20230117181650328.png)

![image-20230117181803003](http://www.iocaop.com/images/2023-01/image-20230117181803003.png)

已解决重复消费问题。在MQ中可以看到有两个消费者

## p91-Stream之消息持久化

简单演示，8802删除分组配置，8803保留分组配置，8802和8803挂了，但是8801发送了4条消息。重启后，8802不消费消息，8803会消费消息。

group，相当于帮我们开启了队列持久化和改变队列名称。

![image-20230117182448755](http://www.iocaop.com/images/2023-01/image-20230117182448755.png)

![image-20230117182518223](http://www.iocaop.com/images/2023-01/image-20230117182518223.png)

![image-20230117182530960](http://www.iocaop.com/images/2023-01/image-20230117182530960.png)

![image-20230117182541405](http://www.iocaop.com/images/2023-01/image-20230117182541405.png)

## p92-Sleuth是什么

在微服务框架中，一个客户端发起的请求在后端会<span style="background-color:pink;">经过多个不同的服务节点</span>来协同产生最后的请求结果，每一个前端请求都会形成一条复杂的分布式服务调用链路，链路中任何一环出现高延时或错误都会引起整个请求最后的失败。

由于调用链路很多，我们需要知道链路中有多少步，每一步的调用情况(如：耗时)，链路多，就需要监控、跟踪。

SpringCloud Sleuth提供了一套完整的服务跟踪解决方案且兼容支持zipkin。

文档：

github：<a href='https://github.com/spring-cloud/spring-cloud-sleuth'>点击跳转</a>

## p93-Sleuth之zipkin搭建

下载jar包：<a href='https://repo1.maven.org/maven2/io/zipkin/zipkin-server/2.24.0/zipkin-server-2.24.0-exec.jar'>点击跳转</a>

官网：<a href='https://zipkin.io/'>点击跳转</a>

运行jar包：

![image-20230130160955667](http://www.iocaop.com/images/2023-01/image-20230130160955667.png)

本地访问：http://localhost:9411/zipkin/

术语：

完整的调用链路，sleuth结合zipkin做了底层监控官网原图：

![image-20230130161455453](http://www.iocaop.com/images/2023-01/image-20230130161455453.png)

表示一条请求链路，一条链路通过Trace Id唯一标识，Span标识发起的请求信息，各个span通过parent id关联起来。

精简：Trace类似树结构的Span集合，表示一条调用链路，存在唯一标识。Span标识链路来源，通俗理解就是一次请求信息。

![img](http://www.iocaop.com/images/2023-01/f75fcfd2146df03428b9c8c53d13c1f1.png)

## p94-Sleuth链路监控展现

简单演示，cloud-consumer-order80调用cloud-provider-payment8001，这两个微服务需要引入对应的依赖：

```xml
<!--包含了sleuth+zipkin-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

配置文件：

```yaml
spring:
  application:
    name: cloud-payment-service
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource            # 当前数据源操作类型
    driver-class-name: org.gjt.mm.mysql.Driver              # mysql驱动包
    url: jdbc:mysql://www.iocaop.com:3306/cloud2020?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 911823
  zipkin: #<-------------------------------------关键
    base-url: http://localhost:9411
    sleuth: #<-------------------------------------关键
      sampler:
      #采样率值介于 0 到 1 之间，1 则表示全部采集
      probability: 1
```

服务提供者8001加一个接口：

```java
    @GetMapping("/payment/zipkin")
    public String paymentZipkin() {
        return "hi ,i'am paymentzipkin server fall back，welcome to here, O(∩_∩)O哈哈~";
    }
```

消费者cloud-consumer-order80增加依赖：和8001一样

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

配置文件：和8001一样

```yaml
spring:
  application:
    name: cloud-order-service
  zipkin: #<-------------------------------------关键
    base-url: http://localhost:9411
    sleuth: #<-------------------------------------关键
      sampler:
      #采样率值介于 0 到 1 之间，1 则表示全部采集
      probability: 1  
```

增加controller，调用8001：这里直接写死地址，不用feign了

```java
    @GetMapping("/consumer/payment/zipkin")
    public String paymentZipkin()
    {
        String result = restTemplate.getForObject("http://localhost:8001"+"/payment/zipkin/", String.class);
        return result;
    }
    
```

启动注册中心7001、消费者80、提供者8001，访问80的接口，调用8001：

![image-20230130163250060](http://www.iocaop.com/images/2023-01/image-20230130163250060.png)

到zipkin控制台，可以看到记录：

![image-20230130163513357](http://www.iocaop.com/images/2023-01/image-20230130163513357.png)

点击show可以查看详细信息：

![image-20230130163538079](http://www.iocaop.com/images/2023-01/image-20230130163538079.png)

右侧还可以查看依赖信息：

![image-20230130163553535](http://www.iocaop.com/images/2023-01/image-20230130163553535.png)
