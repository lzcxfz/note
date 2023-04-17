---
title: 重学 spring cloud alibaba
date: 2023-01-30
category:
  - 微服务
---

课程地址：<a href = 'https://www.bilibili.com/video/BV18E411x7eT/?p=3&spm_id_from=pageDriver&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a>

参考笔记：<a href = 'https://blog.csdn.net/u011863024/article/details/114298270'>点击跳转</a>

我的Netflix版笔记：<a href='http://www.iocaop.com/posts/2022-my/%E5%BE%AE%E6%9C%8D%E5%8A%A1/cloud%E7%AC%94%E8%AE%B0.html'>点击跳转</a>

## p95-Cloud Alibaba简介

为什么出现cloud alibaba？

官网链接：<a href='https://spring.io/blog/2018/12/12/spring-cloud-greenwich-rc1-available-now'>点击跳转</a>，netfix版进入了维护模式，意味着Spring Cloud团队将不会再向模块添加新功能。

Spring Cloud Netfix将不在开发新的组件，新组件将以其他平台替代的方式实现。

![image-20230130173526615](http://www.iocaop.com/images/2023-01/image-20230130173526615.png)

spring cloud alibaba能干嘛：

* 服务限流降级：默认支持 WebServlet、WebFlux, OpenFeign、RestTemplate、Spring Cloud Gateway, Zuul, Dubbo 和 RocketMQ 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。
* 服务注册与发现：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。
* 分布式配置管理：支持分布式系统中的外部化配置，配置更改时自动刷新。
* 消息驱动能力：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。
* 分布式事务：使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。
* 阿里云对象存储：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。
* 分布式任务调度：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker（schedulerx-client）上执行。
* 阿里云短信服务：覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。

官网：<a href='https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/README-zh.md'>点击跳转</a>

需要注意构建时版本，版本说明：<a href='https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E'>点击跳转</a>

![image-20230130233506151](http://www.iocaop.com/images/2023-01/image-20230130233506151.png)

## p96-Nacos简介和下载

为什么叫Nacos？

前四个字母分别为Naming和Configuration的前两个字母，最后的s为Service。

是什么？

注册中心+配置中心，也就是netfix版本中eureka+config+bus。

jar包下载：<a href='https://github.com/alibaba/nacos/releases'>点击跳转</a>

官方文档：<a href='https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring%20cloud%20alibaba%20nacos_discovery'>点击跳转</a>

nacos官网：<a href='https://nacos.io/zh-cn/'>点击跳转</a>

为了和课程保持一致，这里使用1.1.4版本：<a href='https://github.com/alibaba/nacos/releases?expanded=true&page=2&q=1.1.4'>点击跳转</a>

## p97-nacos安装

本地需要java8以上，和maven环境。

解压后运行startup.cmd

![image-20230130235202977](http://www.iocaop.com/images/2023-01/image-20230130235202977.png)

访问8848端口：http://localhost:8848/nacos/#/login，默认账号和密码都是nacos

![image-20230130235236071](http://www.iocaop.com/images/2023-01/image-20230130235236071.png)

## p98-Nacos之服务提供者注册

到spring官网找到springcloud alibaba，找到对应版本的参考文档，会有教程。

父工程pom，拷贝一下依赖：

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.1.0.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

新建module：cloudalibaba-provider-payment9001

pom引入依赖：

```xml
<dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        
        <!--日常通用jar包配置-->
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

接下来写配置文件：导入依赖、启动类和配置文件在官网都会有说明和示例：<a href='https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html'>点击跳转</a>

```yaml
server:
  port: 9001

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置Nacos地址

management:
  endpoints:
    web:
      exposure:
        include: '*'
```

启动类：

```java
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentApplication9001 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentApplication9001.class,args);
    }
}
```

业务类

```java
@RestController
public class PaymentController {
    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id) {
        return "nacos registry, serverPort: "+ serverPort+"\t id"+id;
    }
}
```

启动微服务，到nacos查看：

![image-20230131001136245](http://www.iocaop.com/images/2023-01/image-20230131001136245.png)

自此，服务提供者注册到nacos完毕，需要演示负载均衡，参照9001在创建一个9002。或者启动时拷贝配置，以9002端口启动。

![image-20230131001734363](http://www.iocaop.com/images/2023-01/image-20230131001734363.png)

![image-20230131001750883](http://www.iocaop.com/images/2023-01/image-20230131001750883.png)

![image-20230131001817034](http://www.iocaop.com/images/2023-01/image-20230131001817034.png)

![image-20230131001835544](http://www.iocaop.com/images/2023-01/image-20230131001835544.png)

![image-20230131001847237](http://www.iocaop.com/images/2023-01/image-20230131001847237.png)

这样就可以直接复制一份，以9002端口启动。

到nacos查看：

![image-20230131001927888](http://www.iocaop.com/images/2023-01/image-20230131001927888.png)

测试业务接口返回的端口：

![image-20230131002039571](http://www.iocaop.com/images/2023-01/image-20230131002039571.png)

## p99-Nacos之服务消费者注册和负载均衡

先说，nacos自带负载均衡，为什么？因为spring-cloud-starter-alibaba-nacos-discovery<span style="background-color:pink;">内含netflix-ribbon包</span>。

![image-20230131003008784](http://www.iocaop.com/images/2023-01/image-20230131003008784.png)

只要有ribbon包，就可以负载均衡了，也可以restTemplate通过服务名调用，负载均衡。

新建Module ：cloudalibaba-consumer-nacos-order83

导入依赖：

```xml
    <dependencies>

        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.lzc</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>

        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!--日常通用jar包配置-->
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
  port: 83

spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848

#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者) 用来调用是使用@Value读取而已，没什么
service-url:
  nacos-user-service: http://nacos-payment-provider

```

启动类：

```java
@EnableDiscoveryClient
@SpringBootApplication
public class OrderNacosApplication83 {

    public static void main(String[] args) {
        SpringApplication.run(OrderNacosApplication83.class,args);
    }
}

```

RestTemplate配置负载均衡：

```java
@Configuration
public class ApplicationConfig {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

业务类：使用RestTemplate通过服务名称(使用配置文件读取了一些而已)调用：

```java
@RestController
public class OrderNacosController {

    @Resource
    private RestTemplate restTemplate;

    /**
     * 读服务器url
     */
    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping(value = "/consumer/payment/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Long id)
    {
        // 通过服务名调用
        return restTemplate.getForObject(serverURL+"/payment/nacos/"+id,String.class);
    }

}
```

启动3个微服务：

![image-20230131004026599](http://www.iocaop.com/images/2023-01/image-20230131004026599.png)

消费者调用生产者，看看是否默认轮询负载均衡：

```bash
for((;;))
do
curl -X GET "http://localhost:83/consumer/payment/nacos/1"
done

```

![image-20230131004623390](http://www.iocaop.com/images/2023-01/image-20230131004623390.png)

## p100-Nacos注册中心对比提升

Nacos同时支持CP和AP，可以切换。

Nacos与其他注册中心特性对比：

![image-20230201104214408](http://www.iocaop.com/images/2023-02/image-20230201104214408.png)

Nacos服务发现实例模型：

![image-20230201104333200](http://www.iocaop.com/images/2023-02/image-20230201104333200.png)

Nacos支持AP和CP模式的切换：

C是所有节点在同一时间看到的数据是<span style="background-color:pink;">一致</span>的，而A的定义是所有的请求都会收到响应(<span style="background-color:pink;">不存在不可用的</span>)。

何时选用何种模式？

—般来说，如果<span style="background-color:pink;">不需要存储服务级别的信息</span>且服务实例是<span style="background-color:pink;">通过nacos-client注册</span>，并能够<span style="background-color:pink;">保持心跳上报</span>，那么就可以选择AP模式。当前主流的服务如Spring cloud和Dubbo服务，都适用于AP模式，AP模式为了服务的可能性而减弱了一致性，因此AP模式下只支持注册临时实例。

如果<span style="background-color:pink;">需要在服务级别编辑或者存储配置信息</span>，那么<span style="background-color:pink;">CP是必须</span>，K8S服务和DNS服务则适用于CP模式。CP模式下则支持注册持久化实例，此时则是以Raft协议为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错误。

切换命令：

```bash
curl -X PUT 'localhost:8848/nacos/v1/ns/operator/switches?entry=serverMode&value=CP'
```

## p101-Nacos之服务配置中心

Nacos替代了Spring Cloud Config配置中心。

在使用Spring Cloud Config时，是把配置放在git仓库中，使用config+bus实现定点刷新。

有了nacos可以直接把配置写在nacos中：

![image-20230201150213750](http://www.iocaop.com/images/2023-02/image-20230201150213750.png)

![image-20230201150225553](http://www.iocaop.com/images/2023-02/image-20230201150225553.png)

基础配置：

cloudalibaba-config-nacos-client3377

依赖：增加了spring-cloud-starter-alibaba-nacos-config依赖。

```xml
 <dependencies>
        <!--nacos-config-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>

        <!--nacos-discovery-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!--web + actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!--一般基础配置-->
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

Nacos同springcloud-config一样，在项目初始化时，要保证先从配置中心进行配置拉取，拉取配置之后，才能保证项目的正常启动、先有共性，再有个性。

bootstrap.yml:

```yaml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
# ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
# nacos-config-client-dev.yaml

# nacos-config-client-test.yaml   ----> config.info

```

application.yml:

```yaml
spring:
  profiles:
    active: dev # 表示开发环境
    #active: test # 表示测试环境
    #active: info

```

业务类：

```java
/**
 * 配置客户端控制器
 *
 * @RefreshScope   支持Nacos的动态刷新功能。
 *
 * @author 赖卓成
 * @date 2023/02/01
 */
@RestController
@RefreshScope
public class ConfigClientController
{
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }
}
```

启动类：

```java
@SpringBootApplication
@EnableDiscoveryClient
public class NacosConfigClientApplication3377 {
    public static void main(String[] args) {
        SpringApplication.run(NacosConfigClientApplication3377.class,args);
    }
}

```

到此为止，还差一步，去nacos上配置，首先要设置dataId，这个是有讲究的，不是乱来的。

![image-20230201154445186](http://www.iocaop.com/images/2023-02/image-20230201154445186.png)

官网文档：<a href='https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html'>点击跳转</a>

在 Nacos Spring Cloud中,dataId的完整格式如下：

```yaml
${prefix}-${spring-profile.active}.${file-extension}
```

- `prefix` 默认为 `spring.application.name` 的值，也可以通过配置项 `spring.cloud.nacos.config.prefix`来配置。
- `spring.profiles.active` 即为当前环境对应的 profile，详情可以参考 [Spring Boot文档](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html#boot-features-profiles)。 **注意：当 `spring.profiles.active` 为空时(<span style="background-color:pink;">配置时不要让他为空，不然会有各种问题</span>)，对应的连接符 `-` 也将不存在，dataId 的拼接格式变成 `${prefix}.${file-extension}`**
- `file-exetension` 为配置内容的数据格式，可以通过配置项 `spring.cloud.nacos.config.file-extension` 来配置。

小结：

![image-20230201172736498](http://www.iocaop.com/images/2023-02/image-20230201172736498.png)

根据上面bootstrap可以确定，dataId为:`nacos-config-client-dev.yaml`

创建配置：

![image-20230201172345150](http://www.iocaop.com/images/2023-02/image-20230201172345150.png)

要先配置，不然启动不了，因为在application.yml和bootstrap.yml中都没有配置config.info，启动后，调用接口：

![image-20230201173004835](http://www.iocaop.com/images/2023-02/image-20230201173004835.png)

当我们在nacos中修改配置后，会立马生效，不需要手动进行刷新，nacos的配置中心是自动动态刷新的。

自己实操时的一些思考：

当application.yml和bootstrap.yml同时配置config.info时application覆盖了bootstrap，在这基础上nacos再配置一遍config.info，nacos又覆盖了一次，采用了nacos上的配置，这是为什么？还有，我三个一起配好，再启动，生效的也是nacos上的，又是为什么？

益哥的解释：<a href='https://www.cnblogs.com/wudeyun/p/14798361.html'>点击跳转</a>

nacos架构与原理：<a href='https://developer.aliyun.com/ebook/36?spm=a2c6h.20345107.ebook-index.18.152c2984fsi5ST'>点击跳转</a>

我的理解：application和bootstrap同时配置某个属性，后加载的覆盖先加载的，nacos再配置，会通过反射直接修改ioc中的保存配置信息的Bean，所以nacos每次修改都会生效，实现动态刷新。

## p102-Nacos之命名空间、分组和DataId三者的关系

问题 - 多环境多项目管理

问题1:

实际开发中，通常一个系统会准备

* dev开发环境
* test测试环境
* prod生产环境。
  如何保证指定环境启动时服务能正确读取到Nacos上相应环境的配置文件呢?

问题2:

一个大型分布式微服务系统会有很多微服务子项目，每个微服务项目又都会有相应的开发环境、测试环境、预发环境、正式环境…那怎么对这些微服务配置进行管理呢?



在图形界面可以看到，配置列表中，可以按命名空间进行区分，命名空间里面又会有不同组的配置，最后再是Data Id。

![image-20230201174946415](http://www.iocaop.com/images/2023-02/image-20230201174946415.png)

nacos默认有命名空间public作为保留空间：

![image-20230201175154563](http://www.iocaop.com/images/2023-02/image-20230201175154563.png)

Namespace+Group+Data lD三者关系？为什么这么设计？

![img](http://www.iocaop.com/images/2023-02/60712abd615dd86ac6c119bf132a28d6.png)

默认情况：Namespace=public，Group=DEFAULT_GROUP，默认Cluster是DEFAULT

* Namespace主要用来实现隔离不同的环境。
* Group可以把不同的微服务划分到同一个分组里面去
* Service就是微服务:一个Service可以包含多个Cluster (集群)

比方说为了容灾，将Service微服务分别部署在了杭州机房和广州机房，这时就可以给杭州机房的Service微服务起一个集群名称(HZ) ，给广州机房的Service微服务起一个集群名称(GZ)，还可以尽量让同一个机房的微服务互相调用，以提升性能。

区分调度，划片，提升效率。

## p103-Nacos之DataId配置

DataId的作用：指定`spring.profile.active`和配置文件的DatalD来使不同环境下<span style="background-color:pink;">读取不同的配置</span>，如dev环境启动（spring.profile.active=dev）就读取nacos-config-client-dev.yaml，test环境启动(spring.profile.active=test)就读取nacos-config-client-test.yaml



默认空间+默认分组+新建dev和test两个DatalD

新建两个配置文件：

nacos-config-client-dev.yaml：

![image-20230201180808060](http://www.iocaop.com/images/2023-02/image-20230201180808060.png)

nacos-config-client-test.yaml：

![image-20230201180919371](http://www.iocaop.com/images/2023-02/image-20230201180919371.png)

当我们以dev启动，访问接口，读取到是：

![image-20230201181020636](http://www.iocaop.com/images/2023-02/image-20230201181020636.png)

当我们修改配置文件，以test启动，读取到是：

![image-20230201181049631](http://www.iocaop.com/images/2023-02/image-20230201181049631.png)

![image-20230201181119862](http://www.iocaop.com/images/2023-02/image-20230201181119862.png)

## p104-Nacos之Group分组方案

新建两个配置文件，Data Id相同，但是Group不同，内容也不同：

第一个nacos-config-client-info.yaml分组为：DEV_GROUP，

![image-20230202101838210](http://www.iocaop.com/images/2023-02/image-20230202101838210.png)

第二个nacos-config-client-info.yaml，分组为TEST_GROUP

![image-20230202101818606](http://www.iocaop.com/images/2023-02/image-20230202101818606.png)

现在修改spring.profile.active：

![image-20230202102043541](http://www.iocaop.com/images/2023-02/image-20230202102043541.png)

给nacos配置增加分组配置：

![image-20230202102134650](http://www.iocaop.com/images/2023-02/image-20230202102134650.png)

启动测试：

![image-20230202102206095](http://www.iocaop.com/images/2023-02/image-20230202102206095.png)

修改分组：

![image-20230202102230913](http://www.iocaop.com/images/2023-02/image-20230202102230913.png)

启动测试：

![image-20230202102243549](http://www.iocaop.com/images/2023-02/image-20230202102243549.png)

结论：相同Data Id的配置，可以在不同的Group中，根据具体服务在配置nacos时的Group来拉取不同的配置。

## p105-Nacos之Namespace命名空间方案

新建命名空间：会自动生成 命名空间ID

![image-20230202104424501](http://www.iocaop.com/images/2023-02/image-20230202104424501.png)

![image-20230202104439708](http://www.iocaop.com/images/2023-02/image-20230202104439708.png)

接下来就到配置文件配置需要使用的命名空间：

![image-20230202104803809](http://www.iocaop.com/images/2023-02/image-20230202104803809.png)

启动环境改回dev：

![image-20230202104830523](http://www.iocaop.com/images/2023-02/image-20230202104830523.png)

我们在dev的命名空间下创建配置nacos-config-client-dev.yaml，三个分组为DEFAULT_GROUP，DEV_GROUP，TEST_GROUP

![image-20230202105200826](http://www.iocaop.com/images/2023-02/image-20230202105200826.png)

![image-20230202110004612](http://www.iocaop.com/images/2023-02/image-20230202110004612.png)



![image-20230202111211894](http://www.iocaop.com/images/2023-02/image-20230202111211894.png)

目前，profile为dev，分组为TEST_GROUP，命名空间为dev，启动项目测试：

![image-20230202111252573](http://www.iocaop.com/images/2023-02/image-20230202111252573.png)

## p106-Nacos集群架构说明

在实际生产环境，不可能只有一个nacos服务，会出现单点故障，这一个nacos挂了，影响整个系统运行，所以nacos要集群部署。

集群部署官方文档：<a href='https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html'>点击跳转</a>，<a href='https://nacos.io/zh-cn/docs/deployment.html'>点击跳转</a>

官网的图比较抽象，阳哥画的图：

![image-20230202155029507](http://www.iocaop.com/images/2023-02/image-20230202155029507.png)

图中可以看出，我们需要mysql数据库来持久化nacos中的配置和数据，并且mysql是高可用的。

那为什么现在没有配置mysql，重启nacos数据和配置不会丢失呢？

  因为nacos嵌入了数据库Derby。

那为什么还要mysql？

  因为图中是集群部署，每个nacos都内嵌一个数据库，那么集群的数据不一致，为了一致，所有nacos节点都应该使用同一个数据库(MySql)。

## p107-Nacos持久化切换配置

Nacos默认的数据库是derby，从pom中可以看出：

Nacos的pom文件：<a href='https://github.com/alibaba/nacos/blob/develop/pom.xml'>点击跳转</a>

![image-20230202160959679](http://www.iocaop.com/images/2023-02/image-20230202160959679.png)

现在来切换数据库为mysql，derby到mysql切换配置步骤：

1. nacos-server-1.1.4\nacos\conf录下找到nacos-mysql.sql文件，到数据库执行脚本。

   ![image-20230202162220870](http://www.iocaop.com/images/2023-02/image-20230202162220870.png)

   ![image-20230202162200633](http://www.iocaop.com/images/2023-02/image-20230202162200633.png)

2. nacos-server-1.1.4\nacos\conf目录下找到application.properties，添加以下配置（按需修改对应值）。

   ```properties
   nacos.istio.mcp.server.enabled=false
   
   spring.datasource.platform=mysql
   
   db.num=1
   db.url.0=jdbc:mysql://www.iocaop.com:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
   db.user=root
   db.password=911823
   ```

改完以后启动nacos，原来的配置没有了，现在随便创建一个配置，然后看数据库有没有保存：

![image-20230202162438755](http://www.iocaop.com/images/2023-02/image-20230202162438755.png)

![image-20230202162459696](http://www.iocaop.com/images/2023-02/image-20230202162459696.png)

## p108~p110-Nacos之linux版本安装和集群部署

本次实验，预计需要1个Nginx+3个Nacos节点+1个MySQL。

这里不做nginx多机配置、mysql的主从复制，重点学习nacos集群的配置。

下载linux版本Nacos(1.14)：[nacos-server-1.1.4.tar.gz](https://github.com/alibaba/nacos/releases/download/1.1.4/nacos-server-1.1.4.tar.gz)，<a href='https://github.com/alibaba/nacos/releases/tag/1.1.4'>点击跳转</a>

上传到linux中，解压：

```bash
tar -zvxf nacos-server-1.1.4.tar.gz
```

将解压后的文件夹拷贝：

```bash
cp  -r ./nacos /mynacos/
```

进入bin文件夹，运行`startup.sh`即可启动。

![image-20230202172419715](http://www.iocaop.com/images/2023-02/image-20230202172419715.png)

先用单机模式试一下能不能运行，确保环境没问题后，再配置集群。

修改启动参数和nacos模式问单机模式：

![image-20230202180823610](http://www.iocaop.com/images/2023-02/image-20230202180823610.png)

可以成功启动：

![image-20230202180857463](http://www.iocaop.com/images/2023-02/image-20230202180857463.png)

按照上一节课的方式，切换持久化方式为mysql，配置好数据源。

![image-20230202181855680](http://www.iocaop.com/images/2023-02/image-20230202181855680.png)

还需要进行cluster.conf的配置：

进入conf文件夹，复制配置：

```bash
cp cluster.conf.example cluster.conf
```

在cluster.conf中进行配置，表示哪些节点是属于一个集群的。

需要注意在配置时不能使用`127.0.0.1`，需要执行命令：

```bash
hostname -i
```

![image-20230202182647047](http://www.iocaop.com/images/2023-02/image-20230202182647047.png)

修改cluster.conf为如下：

![image-20230206105850013](http://www.iocaop.com/images/2023-02/image-20230206105850013.png)

接下来要手动修改启动脚本`startup.sh`，使它能够接收参数(启动端口)：

需要修改的地方：

![image-20230203103631612](http://www.iocaop.com/images/2023-02/image-20230203103631612.png)

可以看出，这是接收参数的地方，我们手动加一个参数p，用来指定启动端口号：

![image-20230203104133106](http://www.iocaop.com/images/2023-02/image-20230203104133106.png)

增加jvm启动参数：

![image-20230203104230548](http://www.iocaop.com/images/2023-02/image-20230203104230548.png)

![image-20230203104339520](http://www.iocaop.com/images/2023-02/image-20230203104339520.png)

再修改nacos启动模式为cluster：

![image-20230203110325400](http://www.iocaop.com/images/2023-02/image-20230203110325400.png)

保存以后，启动三个nacos节点：

云主机配置不够，这里使用wsl来进行测试：





来配置一下nginx，用来做负载均衡：

首先增加一个server块：

```nginx
server{
    listen 1111;
    server_name nacos-cluster;

    location / {
    proxy_pass http://cluster;

    }

```

增加upstream：

```nginx
   upstream cluster{
   server 127.0.0.1:7777
   server 127.0.0.1:8888
   server 127.0.0.1:9999
    }
```

启动7777、8888、9999三个端口的nacos集群：

```bash
cd /nacos/bin
./startup.sh -p 7777
./startup.sh -p 8888
./startup.sh -p 9999
```

使用网页访问这三个端口的nacos网页管理端，都没问题，可以看到：

![image-20230206110711009](http://www.iocaop.com/images/2023-02/image-20230206110711009.png)

并且这个3个端口的nacos配置是一样的，因为使用的是同一个mysql数据库。

并且nginx端口1111，也实现了负载均衡：

![image-20230206110828567](http://www.iocaop.com/images/2023-02/image-20230206110828567.png)

并且，在微服务配置中，可以直接写nginx的地址，nginx会自动转发到集群中的节点：

![image-20230206111709894](http://www.iocaop.com/images/2023-02/image-20230206111709894.png)

## p111-Sentinel是什么

仓库地址：<a href='https://github.com/alibaba/Sentinel'>点击跳转</a>

中文文档：<a href='https://sentinelguard.io/zh-cn/docs/introduction.html'>点击跳转</a>

介绍文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D#sentinel-%E6%98%AF%E4%BB%80%E4%B9%88'>点击跳转</a>

其实就是阿里版的Hystrix，为什么不用Hystrix了？

* 需要我们自己搭建web管理
* 没有一套web界面可以给我们进行更加细粒度化的配置，如流控、速率控制、服务熔断、服务降级等。

所以有了sentinel，我们以前Eureka也需要自己起一个服务，Sentinel不需要，单独一个组件独立出来，直接界面化的细粒度统一配置。流控、压力等配置，都可以写在代码里面，本次还是学习配置和注解的方式。

## p112-Sentinel下载安装运行

下载：<a href='https://github.com/alibaba/Sentinel/releases'>点击跳转</a>

文档：<a href='https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_sentinel'>点击跳转</a>

服务使用中的各种问题：

- 服务雪崩
- 服务降级
- 服务熔断
- 服务限流

两部分组成，一个前台界面，一个后台：

- 核心库（Java 客户端）不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。
- 控制台（Dashboard）基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。

运行：直接跑jar包

![image-20230207225936147](http://www.iocaop.com/images/2023-02/image-20230207225936147.png)

进入界面：用户名和密码都是sentinel

![image-20230207230004623](http://www.iocaop.com/images/2023-02/image-20230207230004623.png)

## p113-Sentinel初始化监控

新建module：cloudalibaba-sentinel-service8401

依赖：

```xml
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到-->
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-datasource-nacos</artifactId>
        </dependency>

        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
```

一些通用的依赖：

```xml
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        
        <!-- SpringBoot整合Web组件+actuator -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>4.6.3</version>
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
```

配置文件：

```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: www.iocaop.com:1111 #Nacos服务注册中心地址
    sentinel:
      transport:
        dashboard: localhost:8080 #配置Sentinel dashboard地址
        port: 8719

management:
  endpoints:
    web:
      exposure:
        include: '*'

feign:
  sentinel:
    enabled: true # 激活Sentinel对Feign的支持

```

启动类：

```java
@EnableDiscoveryClient
@SpringBootApplication
public class SentinelApplication8401 {
    public static void main(String[] args) {
        SpringApplication.run(SentinelApplication8401.class,args);
    }
}
```

写个简单的controller：

```java
/**
 * 流量限制控制器
 *
 * @author 赖卓成
 * @date 2023/02/07
 */
@RestController
@Slf4j
public class FlowLimitController {
    @GetMapping("/testA")
    public String testA()
    {
        return "------testA";
    }

    @GetMapping("/testB")
    public String testB()
    {
        log.info(Thread.currentThread().getName()+"\t"+"...testB");
        return "------testB";
    }
}

```

完成，开始启动8401微服务，到sentinel控制台和nacos控制台查看是否注册成功：

![image-20230207231442228](http://www.iocaop.com/images/2023-02/image-20230207231442228.png)

sentinel刷新后并没有显示服务，为什么？因为是懒加载的，需要手动访问服务的某个接口。

访问一下我们的业务接口，再刷新控制台，就有了：

![image-20230207231604703](http://www.iocaop.com/images/2023-02/image-20230207231604703.png)

![image-20230207231616829](http://www.iocaop.com/images/2023-02/image-20230207231616829.png)

我们疯狂刷新访问一下接口，可以看到实时监控在变化：

![image-20230207231728712](http://www.iocaop.com/images/2023-02/image-20230207231728712.png)

## p114-Sentinel流控规则简介

当我们访问了接口，在控制台的簇点链路中可以看到：

![image-20230207234258807](http://www.iocaop.com/images/2023-02/image-20230207234258807.png)

流控规则：

![image-20230207234455270](http://www.iocaop.com/images/2023-02/image-20230207234455270.png)

进一步说明：

* 资源名：唯一名称，默认请求路径。
* 针对来源：Sentinel可以针对调用者进行限流，填写微服务名，默认default（不区分来源）。
* 阈值类型/单机阈值：
  * QPS(<span style="background-color:pink;">每秒钟的请求数量</span>)︰当调用该API的QPS达到阈值的时候，进行限流。
  * 线程数：当调用<span style="background-color:pink;">该API的线程数</span>达到阈值的时候，进行限流。
* 是否集群：不需要集群。
* 流控模式：
  * 直接：API达到限流条件时，直接限流。
  
  * 关联：当<span style="background-color:pink;">关联的资源达到阈值</span>时，就<span style="background-color:pink;">限流自己</span>。

  * 链路：只记录指定链路上的流量（指定<span style="background-color:pink;">资源从入口</span>资源进来的流量，如果达到阈值，就进行限流)【API级别的针对来源】。
* 流控效果：
  * 快速失败：直接失败，抛异常。
  * Warm up：根据Code Factor（冷加载因子，默认3）的值，从阈值/codeFactor，经过预热时长，才达到设置的QPS阈值。
  * 排队等待：匀速排队，让请求以匀速的速度通过，阈值类型必须设置为QPS，否则无效。

## p115-Sentinel流控-QPS直接失败

直接到控制台进行添加：

![image-20230207235452034](http://www.iocaop.com/images/2023-02/image-20230207235452034.png)

![image-20230207235509440](http://www.iocaop.com/images/2023-02/image-20230207235509440.png)

疯狂刷新访问：

![image-20230207235545628](http://www.iocaop.com/images/2023-02/image-20230207235545628.png)

失败了，很方便，不需要重启服务之类的，Hystrix修改或新增后需要重启服务。

思考：直接调用的是默认报错信息，技术方面ok，那么我们是否应该有自己的后续处理(类似有Hystrix的Fallback？有的，后续学习)？

## p116-Sentinel-线程数直接失败

把原来的QPS流控删掉，添加一个线程流控：

![image-20230208000503720](http://www.iocaop.com/images/2023-02/image-20230208000503720.png)

到页面疯狂刷新访问接口，无论怎么刷新，都不会失败：

![image-20230208000540362](http://www.iocaop.com/images/2023-02/image-20230208000540362.png)

先搞清楚QPS和线程的区别：

QPS流控是一大堆请求访问，当请求数到达某个值就限流，而线程流控是不管多少请求访问，只会进入一个请求，再有请求进入就会失败。

![image-20230208001000110](http://www.iocaop.com/images/2023-02/image-20230208001000110.png)

因为我们这个接口响应很快，想要演示线程流控，需要添加延迟：

```java
    @GetMapping("/testB")
    public String testB() throws InterruptedException {
        Thread.sleep(800);
        log.info(Thread.currentThread().getName()+"\t"+"...testB");
        return "------testB";
    }
```

为了方便测试，我们再用脚本持续访问(为了方便演示，把睡眠调到2秒，只要保证1秒内多个线程进入即可)，然后再到浏览器访问查看效果：

```bash
for((;;))
do
curl -X GET "http://localhost:8401/testB"
done

```

![image-20230208002013034](http://www.iocaop.com/images/2023-02/image-20230208002013034.png)

## p117-Sentinel流控-关联(链路流控待完成)

当关联的资源达到阈值时，就限流自己。

目前我们有两个接口，testA和testB，我们让他俩关联，当A关联的资源B达到阈值后，就限流A自己。

有什么用？在分布式链路调用当中，服务是会互相影响的，所以关联流控就发挥作用了。

在实际场景中，比如支付接口达到阈值，就限流下单接口。

直接在Sentinel控制台进行添加流控：

![image-20230208161303065](http://www.iocaop.com/images/2023-02/image-20230208161303065.png)

postman接口保存到collection中：![image-20230208161952111](http://www.iocaop.com/images/2023-02/image-20230208161952111.png)

![image-20230208162414088](http://www.iocaop.com/images/2023-02/image-20230208162414088.png)

启动20个线程，每间隔0.3秒就访问一次接口：

![image-20230208162444063](http://www.iocaop.com/images/2023-02/image-20230208162444063.png)

我们首先访问一次testA，没问题：

![image-20230208162657901](http://www.iocaop.com/images/2023-02/image-20230208162657901.png)

使用postman，在这20个线程访问testB期间，我们来访问testA：

![image-20230208162748489](http://www.iocaop.com/images/2023-02/image-20230208162748489.png)

可以看到，关联流控起作用了。

作业：链路：只记录指定链路上的流量（指定资源从入口资源进来的流量，如果达到阈值，就进行限流)【API级别的针对来源】

新建3个module：cloudalibaba-sentinel-link-service8411，cloudalibaba-sentinel-link-service8412，cloudalibaba-sentinel-link-service8413。

调用关系：8411->8413  ，8412->8413

依赖(三个都一样)：

```xml
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!-- SpringBoot整合Web组件 -->
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
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
```

配置类（三个都一样，端口号和服务名称不一样）：

```yaml
server:
  port: 8412

spring:
  application:
    name: sentinel-link-service8412
  cloud:
    nacos:
      discovery:
        server-addr: www.iocaop.com:1111 #配置Nacos地址
    sentinel:
      transport:
        dashboard: localhost:8080 #默认端口8719 如果被占用会依次+1扫描，直到找到没被占用的
        port: 8719
management:
  endpoints:
    web:
      exposure:
        include: '*'


```

启动类：

```java
@SpringBootApplication
@EnableFeignClients
public class SentinelLinkApplication8411 {

    public static void main(String[] args) {
        SpringApplication.run(SentinelLinkApplication8411.class,args);
    }
}
```

大致一样，feign调用：

```java
@Component
@FeignClient(value = "sentinel-link-service8413")
public interface FeignOf8413 {

    /**
     * 链路调用8413 
     *
     * @return {@link String}
     */
    @RequestMapping(value = "/C",method = RequestMethod.GET )
    public String link();
}
```

三个项目启动后，nacos注册成功，feign调用成功：

![image-20230208180309076](http://www.iocaop.com/images/2023-02/image-20230208180309076.png)

![image-20230208180327042](http://www.iocaop.com/images/2023-02/image-20230208180327042.png)

简单的说，就是A->C，B->C，先测试一下，是否可以调用成功：

![image-20230208223407869](http://www.iocaop.com/images/2023-02/image-20230208223407869.png)

可以调用成功，给A->C设置链路流控：

![image-20230208223714209](http://www.iocaop.com/images/2023-02/image-20230208223714209.png)

这时候，我们疯狂刷新A->C：

不生效，先放一放，对链路流控理解不够。后续单独学习Sentinel。

其他网课教程：在一个服务中，使用注解`@SentinelResource`标记资源，试一下：

重新创建module：cloudalibaba-sentinel-link-service8414

配置和其他三个一样，只是不进行远程调用：

两个接口：

```java
@RestController
@RequestMapping("/")
public class TestController {

    @Autowired
    TestService testService;

    @RequestMapping(value = "/test1", method = RequestMethod.GET)
    public String test1() {
        return testService.link();
    }
    @RequestMapping(value = "/test2", method = RequestMethod.GET)
    public String test2() {
        return testService.link();
    }
    
}
```

业务层使用注解标记资源：

```java
@Service
public class TestServiceImpl implements TestService {

    @Override
    @SentinelResource("link")
    public String link() {
        return "调用成功";
    }
}
```

![image-20230208233429754](http://www.iocaop.com/images/2023-02/image-20230208233429754.png)

可以访问成功，给资源加链路流控：

![image-20230209000327678](http://www.iocaop.com/images/2023-02/image-20230209000327678.png)

参考了文章：<a href='https://blog.csdn.net/qq_31278353/article/details/124454656'>点击跳转</a>

依然没有实现效果，可能是版本原因。

## p118-Sentinel流控-预热

学习完流控规则，来学习一下流控效果：

* 直接->快速失败(默认的流控处理)：直接失败，抛出异常，报Blocked by Sentinel (flow limiting)

* 预热：

  * 公式：阈值/coldFactor，经过预热时长后才会达到阈值，默认 `coldFactor` 为 3，即请求 QPS 从 `threshold / 3` 开始，经预热时长逐渐升至设定的 QPS 阈值。

    ![image-20230209114012073](http://www.iocaop.com/images/2023-02/image-20230209114012073.png)

  * Warm Up：

    预热/冷启动方式。当系统<span style="background-color:pink;">长期处于低水位</span>的情况下，当<span style="background-color:pink;">流量突然增加</span>时，直接把系统拉升到高水位可能瞬间把系统压垮。通过"冷启动"，让通过的<span style="background-color:pink;">流量缓慢增加</span>，在一定时间内逐渐增加到阈值上限，给冷系统一个预热的时间，避免冷系统被压垮。参考文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E9%99%90%E6%B5%81---%E5%86%B7%E5%90%AF%E5%8A%A8'>点击跳转</a>，demo：<a href='https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/flow/WarmUpFlowDemo.java'>点击跳转</a>

    ![image](http://www.iocaop.com/images/2023-02/68292392-b5b0aa00-00c6-11ea-86e1-ecacff8aab51.png)

简单理解：

![image-20230209114629701](http://www.iocaop.com/images/2023-02/image-20230209114629701.png)

如图，我们设置好了阈值是10，当还属于预热时长5秒内时，阈值会是10/3=3，过完5秒，阈值才会是10。

测试一下：

刚开始会失败，后面慢慢得久能扛得住了，说明预热生效了。

![image-20230209115254293](http://www.iocaop.com/images/2023-02/image-20230209115254293.png)

![image-20230209115307316](http://www.iocaop.com/images/2023-02/image-20230209115307316.png)

运用：秒杀系统，开启瞬间会有很多流量进来，可能把系统打死，预热方式就是保护系统，慢慢的把流量放进来，慢慢把阈值增长到设置的阈值。

## p119-Sentinel流控-排队等待

简单的说，假设服务器只允许1秒钟处理一个请求，那其他的请求就等待，在等待的请求就可能出现超时重试。

匀速排队，让以请求均匀的速度通过，<span style="background-color:pink;">阈值必须设置成QPS</span>，否则无效。

#### 匀速排队

匀速排队（`RuleConstant.CONTROL_BEHAVIOR_RATE_LIMITER`）方式会严格控制请求通过的间隔时间，也即是<span style="background-color:pink;">让请求以均匀的速度通过</span>，对应的是漏桶算法。详细文档可以参考 [流量控制 - 匀速器模式](https://github.com/alibaba/Sentinel/wiki/流量控制-匀速排队模式)，具体的例子可以参见 [PaceFlowDemo](https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/flow/PaceFlowDemo.java)。

该方式的作用如下图所示：

![image](http://www.iocaop.com/images/2023-02/68292442-d4af3c00-00c6-11ea-8251-d0977366d9b4.png)

这种方式主要用于处理<span style="background-color:pink;">间隔性突发的流量</span>，例如消息队列。想象一下这样的场景，<span style="background-color:pink;">在某一秒有大量的请求到来，而接下来的几秒则处于空闲状态，我们希望系统能够在接下来的空闲期间逐渐处理这些请求，而不是在第一秒直接拒绝多余的请求</span>。

> 注意：匀速排队模式暂时不支持 QPS > 1000 的场景。

即不会将服务器冲垮，也不会将请求拒绝。

来个demo：

还是8401微服务，接口打印信息：

```java
    @GetMapping("/testB")
    public String testB() throws InterruptedException {
//        Thread.sleep(2000);
        log.info(Thread.currentThread().getName()+"\t"+"...testB");
        return "------testB";
    }
```

到Sentinel控制台设置：

![image-20230209151531012](http://www.iocaop.com/images/2023-02/image-20230209151531012.png)

1秒钟只能通过一个请求，用postman，发送10个请求，不延迟，看控制台打印的信息：

![image-20230209152826128](http://www.iocaop.com/images/2023-02/image-20230209152826128.png)

![image-20230209152858651](http://www.iocaop.com/images/2023-02/image-20230209152858651.png)

可以看到，1秒钟只能通过1个请求，其余都在等待，并没有被拒绝。

## p120-Sentinel降级简介

就是熔断降级，官网文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E7%86%94%E6%96%AD%E9%99%8D%E7%BA%A7'>点击跳转</a>

![image-20230209155345363](http://www.iocaop.com/images/2023-02/image-20230209155345363.png)

* RT（平均响应时间，秒级）

  * <span style="background-color:pink;">平均响应时间超出阈值</span> 且 在<span style="background-color:pink;">时间窗口内通过的请求</span>>=5，两个条件同时满足后触发降级。

  * 窗口期过后关闭断路器。

  * RT最大4900（更大的需要通过-Dcsp.sentinel.statistic.max.rt=XXXX才能生效）。

* 异常比例（秒级）
  * QPS >= 5且<span style="background-color:pink;">异常比例（秒级统计）超过阈值</span>时，触发降级;<span style="background-color:pink;">时间窗口</span>结束后，关闭降级 。
    异常数(分钟级)

* <span style="background-color:pink;">异常数</span>(分钟统计）超过阈值时，触发降级;<span style="background-color:pink;">时间窗口</span>结束后，关闭降级

Sentinel熔断降级会在调用链路中某个资源出现<span style="background-color:pink;">不稳定状态时</span>（例如调用超时或异常比例升高)，对这个资源的调用<span style="background-color:pink;">进行限制</span>，<span style="background-color:pink;">让请求快速失败</span>，避免影响到其它的资源而导致<span style="background-color:pink;">级联错误</span>。

当资源被降级后，在接下来的降级时间窗口之内，对该资源的调用都自动熔断（默认行为是抛出 DegradeException）。

Sentinei的断路器是没有类似Hystrix半开状态的。(Sentinei 1.8.0 已有半开状态)

半开的状态系统自动去检测是否请求有异常，没有异常就关闭断路器恢复使用，有异常则继续打开断路器不可用。

Hystrix笔记：<a href='http://www.iocaop.com/posts/2022-my/%E5%BE%AE%E6%9C%8D%E5%8A%A1/cloud%E7%AC%94%E8%AE%B0.html#p61-62-hystrix%E4%B9%8B%E6%9C%8D%E5%8A%A1%E7%86%94%E6%96%AD%E6%80%BB%E7%BB%93'>点击跳转</a>

## p121-Sentinel降级-RT

1.8版本之后，降级策略有些不一样：<a href='https://blog.csdn.net/cdxsza/article/details/120777343'>点击跳转</a>，RT平均响应时间被替换成了慢调用比例，这里先学习RT

![image-20230209155345363](http://www.iocaop.com/images/2023-02/image-20230209155345363.png)

为了学习RT，我们下载1.7版本的Sentinel：

![image-20230209165107987](http://www.iocaop.com/images/2023-02/image-20230209165107987.png)

> 解释：平均响应时间(DEGRADE_GRADE_RT)：当1s内持续进入5个请求，<span style="background-color:pink;">对应时刻</span>的平均响应时间（秒级）均超过阈值（ count，以ms为单位），那么在<span style="background-color:pink;">接下的时间窗口</span>（DegradeRule中的timeWindow，以s为单位）之内，对这个方法的调用都会自动地熔断(抛出DegradeException )。注意Sentinel 默认统计的RT上限是4900 ms，超出此阈值的都会算作4900ms，若需要变更此上限可以通过启动配置项-Dcsp.sentinel.statistic.max.rt=xxx来配置。

![image-20230209171011071](http://www.iocaop.com/images/2023-02/image-20230209171011071.png)

来测试，新增一个接口：

```java
    @GetMapping("/testD")
    public String testD() {
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        log.info("testD 测试RT");
        return "testD";
    }
```

新增降级规则：

表示1秒中内，进来的所有请求的平均响应时间应该小于200ms，否则就会降级。直到下一个时间窗口，且平均响应时间能达到要求，才会恢复。

![image-20230209171525828](http://www.iocaop.com/images/2023-02/image-20230209171525828.png)

新增后，使用Jmeter进行压测：

线程组配置：

![image-20230209174450401](http://www.iocaop.com/images/2023-02/image-20230209174450401.png)

启动后，使用浏览器进行访问：

![image-20230209181450455](http://www.iocaop.com/images/2023-02/image-20230209181450455.png)

Jemeter停止后，又可以访问了。

解释：

对照官网：

* 当1s内持续进入5个请求：本次测试有10个
* 对应时刻的平均响应时间（秒级）均超过阈值：在接口中加了1秒钟睡眠，也就是说，每个请求的响应的时间都是1秒多，大于阈值200ms

满足要求了，接下来的时间窗口就会熔断。

按照这个理解，我们降级规则不变，把接口中睡眠时间改成201ms，测试，也会降级，改成180ms，同样的压测配置，就不会降级了，理解正确。

## p122-Sentinel降级-异常比例

异常比例1.7版本：

* 当资源的每秒请求量 >= 5
* 每秒异常总数占通过量的比值超过阈值

资源进入降级状态，在接下的时间窗口之内，对这个方法的调用都会自动地返回。

异常比例1.8版本(有半开状态)：

* 当单位统计时长内请求数目大于设置的最小请求数目
* 异常的比例(秒级统计)大于阈值

资源进入降级状态，<span style="background-color:pink;">经过熔断时长后熔断器会进入探测恢复状态</span>，若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。

这节课学1.7版本的降级-异常比例：

![image-20230210102505194](http://www.iocaop.com/images/2023-02/image-20230210102505194.png)

新增接口：

```java
    @GetMapping("/testE")
    public String testE() {
        int i = 10/0;
        log.info("testE 测试异常比例");
        return "testE";
    }
```

直接访问是会报异常的：

![image-20230210103312805](http://www.iocaop.com/images/2023-02/image-20230210103312805.png)

我们到Sentinel增加降级规则：

![image-20230210103349761](http://www.iocaop.com/images/2023-02/image-20230210103349761.png)

使用Jmeter发送10个请求：

![image-20230210103435760](http://www.iocaop.com/images/2023-02/image-20230210103435760.png)

启动后，再访问接口：

![image-20230210103517760](http://www.iocaop.com/images/2023-02/image-20230210103517760.png)

降级了，因为满足了降级要求：

* 请求数>=5 我们是10
* 异常比例大于0.1，我们是1

当关闭Jmeter以后，虽然异常比例是1，但是没有满足要求1，还是不会开启降级。

## p123-Sentinel降级-异常数

异常数(1.7版本)：

* 当资源近1分钟的异常数目超过阈值之后会进行熔断。
* 统计时间窗口是分钟级别的，若`timeWindow`小于60s，则结束熔断状态后可能再进入熔断状态

> <span style="background-color:pink;">时间窗口一定要大于60秒</span>

![image-20230210104626371](http://www.iocaop.com/images/2023-02/image-20230210104626371.png)

异常数(1.8版本有半开状态)：

* 当单位统计时长内的异常数目超过阈值之后会自动进行熔断。
* 经过<span style="background-color:pink;">熔断时长后</span>熔断器会进入探测恢复状态（HALF-OPEN 状态），<span style="background-color:pink;">若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断</span>。

这里学习1.7版本：

新增接口：

```java
    @GetMapping("/testF")
    public String testF() {
        int i = 10/0;
        log.info("testF 测试异常数");
        return "testF";
    }
```

新增降级规则：

![image-20230210105611458](http://www.iocaop.com/images/2023-02/image-20230210105611458.png)

意思是，在70秒内，连续5次访问出现异常，就会降级。

因为我们这个接口是百分比异常的，所以在时间窗口70秒内，第6次访问就会进行降级：

![image-20230210105929493](http://www.iocaop.com/images/2023-02/image-20230210105929493.png)

## p124-Sentinel热点key（上）

官网文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E7%83%AD%E7%82%B9%E5%8F%82%E6%95%B0%E9%99%90%E6%B5%81'>点击跳转</a>

热点：经常访问的数据。

统计某个热点数据中访问频次最高的 Top K 数据，并对其访问进行限制。

热点参数限流会<span style="background-color:pink;">统计</span>传入<span style="background-color:pink;">参数中的热点参数</span>，并根据配置的限流阈值与模式，对<span style="background-color:pink;">包含热点参数的资源</span>调用进行限流。热点参数限流可以看做是一种特殊的流量控制，仅对包含热点参数的资源调用生效。

举例子：

```tex
http://localhost:8401/test?p1=1
http://localhost:8401/test?p2=2
http://localhost:8401/test?p3=3
```

加入对参数p1进行限制，那么请求参数中带有p1的会被限流，其他的不会被限流。

在学习热点key限流规则之前，先复习一下。

兜底方法：

分为系统默认和自定义两种，之前学习的demo中，限流出现问题以后，都是使用Sentinel默认的系统提示：Blocked by Sentinel(flow limiting)。

类似Hystrix，某个方法出问题了，就找对应的兜底降级方法，从注解`@HystrixCommand`改成`@SentinelResource`,并且在这个注解传参`blockHandler`指定兜底方法。

新增接口：

```java
    @GetMapping("/testHotKey")
    @SentinelResource(value = "testHotKey",blockHandler= "deal_testHotKey")
    public String testHotKey(@RequestParam(value = "p1",required = false) String p1,
                             @RequestParam(value = "p2",required = false) String p2) {
        //int age = 10/0;
        return "------testHotKey";
    }

    /**
     * 兜底方法  参数和原方法一样，但是要多一个BlockException
     *
     * @param p1        p1
     * @param p2        p2
     * @param exception 异常
     * @return {@link String}
     */
    public String deal_testHotKey (String p1, String p2, BlockException exception) {
        //sentinel系统默认的提示：Blocked by Sentinel (flow limiting)
        return "------deal_testHotKey,o(╥﹏╥)o";  
    }

```

启动项目，增加热点规则：

![image-20230210114433810](http://www.iocaop.com/images/2023-02/image-20230210114433810.png)

添加完以后，访问http://localhost:8401/testHotKey，无论怎么刷新都不会限流，但是，一旦加上第一个参数p1，qps达到限制，马上就会返回我们自定义的兜底方法：

![image-20230210114612161](http://www.iocaop.com/images/2023-02/image-20230210114612161.png)

为什么选择在这里提到自定义兜底方法？因为热点key限流默认是返回异常信息，去掉注解中的参数：

```java
    @GetMapping("/testHotKey")
    @SentinelResource(value = "testHotKey"
//            ,blockHandler= "deal_testHotKey"
    )
    public String testHotKey(@RequestParam(value = "p1",required = false) String p1,
                             @RequestParam(value = "p2",required = false) String p2) {
        //int age = 10/0;
        return "------testHotKey";
    }
```

重启后，设置热点规则，当限流时，返回的不是Blocked by Sentinel(flow limiting)，而是异常信息：

![image-20230210114905845](http://www.iocaop.com/images/2023-02/image-20230210114905845.png)

所以，热点key限流最好是配合自定义兜底方法使用。

## p125-Sentinel热点key(下)

上面学习了热点key的限流配置，现在来学高级选项：参数例外项。

在添加完热点规则以后，编辑时可以看到高级选项：

![image-20230210151456609](http://www.iocaop.com/images/2023-02/image-20230210151456609.png)

简单的说就是，在原本对某个热点key进行限流的同时，当这个key的值是某个特殊值，采用不一样的限流手段。

如：对参数p1限流qps为1：

* 请求中包含参数p1则走我们限流规则，qps超过1，服务降级。

* 特殊情况：当所传的p1的值是100时，限流qps为100。

现在我们来配置：

![image-20230210152503453](http://www.iocaop.com/images/2023-02/image-20230210152503453.png)

测试：

不是例外：热点key限流qps为1，疯狂刷新，降级了，返回了我们自定义的降级方法的值。

![image-20230210152523187](http://www.iocaop.com/images/2023-02/image-20230210152523187.png)

例外值：qps另一个值100，疯狂刷新不会降级，因为手速点不到qps100

![image-20230210152610926](http://www.iocaop.com/images/2023-02/image-20230210152610926.png)

在这个方法中故意写一个报异常：

![image-20230210153006976](http://www.iocaop.com/images/2023-02/image-20230210153006976.png)

设置好热点key流控，在不触发降级的情况下，返回的就是分母为0的异常，而不会是我们自定义的降级方法。

![image-20230210153131490](http://www.iocaop.com/images/2023-02/image-20230210153131490.png)

* `@SentinelResource` - 处理的是sentinel控制台配置的违规情况，有blockHandler方法配置的兜底处理;
* `RuntimeException` int age = 10/0，这个是java运行时报出的运行时异常RunTimeException，@SentinelResource不管

> 总结 - @SentinelResource主管配置出错，运行出错该走异常走异常

## p126-Sentinel系统规则

官网文档：<a href='https://github.com/alibaba/Sentinel/wiki/%E7%B3%BB%E7%BB%9F%E8%87%AA%E9%80%82%E5%BA%94%E9%99%90%E6%B5%81'>点击跳转</a>

系统自适应限流：从<span style="background-color:pink;">整体维度</span>对应用入口流量进行控制。

之前的限流都是细化到某一个接口，甚至是方法的。系统自适应限流是整体的，也就是对整个系统所有的接口、方法做一个入口的限流。

系统保护规则是应用整体维度的，而不是资源维度的，并且**仅对入口流量生效**。入口流量指的是进入应用的流量（`EntryType.IN`），比如 Web 服务或 Dubbo 服务端接收的请求，都属于入口流量。

系统规则支持以下的模式(官网拷贝来的)：

- **Load 自适应**（仅对 Linux/Unix-like 机器生效）：系统的 load1 作为启发指标，进行自适应系统保护。当系统 load1 超过设定的启发值，且系统当前的并发线程数超过估算的系统容量时才会触发系统保护（BBR 阶段）。系统容量由系统的 `maxQps * minRt` 估算得出。设定参考值一般是 `CPU cores * 2.5`。
- **CPU usage**（1.5.0+ 版本）：当系统 CPU 使用率超过阈值即触发系统保护（取值范围 0.0-1.0），比较灵敏。
- **平均 RT**：当单台机器上所有入口流量的平均 RT 达到阈值即触发系统保护，单位是毫秒。
- **并发线程数**：当单台机器上所有入口流量的并发线程数达到阈值即触发系统保护。
- **入口 QPS**：当单台机器上所有入口流量的 QPS 达到阈值即触发系统保护。

![image-20230210155809325](http://www.iocaop.com/images/2023-02/image-20230210155809325.png)

测试：

对下面两个接口进行测试：

![image-20230210160117199](http://www.iocaop.com/images/2023-02/image-20230210160117199.png)

接口比较简单，并且不对接口做单独的流控。新增系统规则：

![image-20230210160224178](http://www.iocaop.com/images/2023-02/image-20230210160224178.png)

疯狂刷新，降级了，整个系统的入口qps超过1，直接降级，所有接口都降级：

![image-20230210160307836](http://www.iocaop.com/images/2023-02/image-20230210160307836.png)

## p127-SentinelResource配置(上)

学习按资源名称进行限流。

导入依赖：用于返回结果

```xml
        <dependency>
            <groupId>com.lzc</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
```

新建接口：

```java
    @GetMapping("/byResource")
    @SentinelResource(value = "byResource",blockHandler = "handleException")
    public CommonResult byResource() {
        return new CommonResult(200,"操作成功",new Payment(2020L,"serial001"));
    }

    public CommonResult handleException(BlockException exception) {
        return new CommonResult(444,exception.getClass().getCanonicalName()+"\t 服务不可用");
    }
```

重启后访问：

![image-20230210162022276](http://www.iocaop.com/images/2023-02/image-20230210162022276.png)

新增流控：主要这里的资源名是byResource而不是接口路径/byResource，说明这是通过资源名称进行限流。

![image-20230210162321149](http://www.iocaop.com/images/2023-02/image-20230210162321149.png)

疯狂刷新：

![image-20230210162434320](http://www.iocaop.com/images/2023-02/image-20230210162434320.png)

走了降级方法，返回了我们自定义的信息。

现在有个问题，我们关闭8401微服务，刷新Sentinel控制台，流控规则消失了？？？？---后续学习

关于兜底方法：如果我们自定义了，就会走自定义的降级方法，如果没有自定义，则返回默认的降级方法信息。

如：

```java
    @GetMapping("/rateLimit/byUrl")
    @SentinelResource(value = "byUrl")
    public CommonResult byUrl()
    {
        return new CommonResult(200,"按url限流测试OK",new Payment(2020L,"serial002"));
    }
```

限流时，返回的降级方法信息是默认的：

![image-20230210162952001](http://www.iocaop.com/images/2023-02/image-20230210162952001.png)

> 目前存在的问题：1 降级方法和业务方法代码耦合 2 每个资源或接口都要写一个降级方法，代码膨胀，需要搞一个全局统一处理。

## p128-SentinelResource配置(中)

针对上面的问题，可以使用注解SentinelResource来解决。

创建一个类CustomerBlockHandler，用于自定义限流处理逻辑。

```java
public class CustomerBlockHandler {

    public static CommonResult handlerException(BlockException exception) {
        return new CommonResult(4444,"按客戶自定义,global handlerException----1");
    }

    public static CommonResult handlerException2(BlockException exception) {
        return new CommonResult(4444,"按客戶自定义,global handlerException----2");
    }
}
```

增加接口：这里注意，使用`blockHandlerClass`指定自定义限流处理逻辑方法所在的类，`blockHandler`指定用于处理的方法。相当于指定了哪个类的哪个方法是降级方法。

```java
    @GetMapping("/rateLimit/customerBlockHandler")
    @SentinelResource(value = "customerBlockHandler",
            blockHandlerClass = CustomerBlockHandler.class,
            blockHandler = "handlerException2")
    public CommonResult customerBlockHandler()
    {
        return new CommonResult(200,"按客戶自定义",new Payment(2020L,"serial003"));
    }
```

接口qps限流为1，当触发限流规则，降级方法：

![image-20230210164654119](http://www.iocaop.com/images/2023-02/image-20230210164654119.png)

> 需要注意，这里限流的是SentinelResource上的资源名称，而不是url

url不会返回自定义的降级方法。

![image-20230210164757412](http://www.iocaop.com/images/2023-02/image-20230210164757412.png)

总结：

![image-20230210165021548](http://www.iocaop.com/images/2023-02/image-20230210165021548.png)

## p129-SentinelResource配置(下)

除了在界面上配置规则，可以也可以在代码中配置，但是不推荐，耦合了，很傻逼。

这节课什么也没讲，资料在这：<a href='https://github.com/alibaba/Sentinel/wiki/%E6%B3%A8%E8%A7%A3%E6%94%AF%E6%8C%81#sentinelresource-%E6%B3%A8%E8%A7%A3'>点击跳转</a>，有空看。

## p130-Sentinel服务熔断Ribbon环境预说

springboot+sentinel+openfeign+ribbon+fallback

![image-20230213110251657](http://www.iocaop.com/images/2023-02/image-20230213110251657.png)

新建服务提供者cloudalibaba-provider-payment9003/9004，两个一样的做法。

依赖：

```xml
        <dependency>
            <groupId>com.lzc</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>

        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <!-- SpringBoot整合Web组件+actuator -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>4.6.3</version>
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
```

配置文件：

```yaml
server:
  port: 9003

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: www.iocaop.com:1111 #Nacos服务注册中心地址

management:
  endpoints:
    web:
      exposure:
        include: '*'

```

业务类：

```java
@RestController
public class PaymentController {
    @Value("${server.port}")
    private String serverPort;


    /**
     * 模拟数据库
     */
    public static HashMap<Long, Payment> hashMap = new HashMap<>();
    static
    {
        hashMap.put(1L,new Payment(1L,"28a8c1e3bc2742d8848569891fb42181"));
        hashMap.put(2L,new Payment(2L,"bba8c1e3bc2742d8848569891ac32182"));
        hashMap.put(3L,new Payment(3L,"6ua8c1e3bc2742d8848569891xt92183"));
    }

    @GetMapping(value = "/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id)
    {
        Payment payment = hashMap.get(id);
        CommonResult<Payment> result = new CommonResult(200,"from mysql,serverPort:  "+serverPort,payment);
        return result;
    }

}
```

新建cloudalibaba-consumer-nacos-order84

依赖：(先不用feign，用restTemplate实现负载均衡)

```xml
        <!--SpringCloud openfeign -->
        <!--
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
		-->

        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>

        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!--日常通用jar包配置-->
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
```

配置文件：

```yaml
server:
  port: 84

spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: www.iocaop.com:1111
    sentinel:
      transport:
        #配置Sentinel dashboard地址
        dashboard: localhost:8080
        #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
        port: 8719

#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider

# 激活Sentinel对Feign的支持
feign:
  sentinel:
    enabled: false
```

restTemplate配置负载均衡：

```java
@Configuration
public class ApplicationContextConfig {


    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

控制层：

```java
@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    @SentinelResource(value = "fallback")
    public CommonResult<Payment> fallback(@PathVariable Long id)
    {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

}
```

启动测试三个微服务：

![image-20230213142842476](http://www.iocaop.com/images/2023-02/image-20230213142842476.png)

## p131-Sentinel服务熔断-无配置

`@SentinelResource`注解没有进行任何配置，当访问出现异常时，页面是这样的，非常不友好：

![image-20230213143439259](http://www.iocaop.com/images/2023-02/image-20230213143439259.png)

## p132-Sentinel服务熔断-只配置fallback

写一个fallback方法：

```java
    public CommonResult handlerFallback(@PathVariable  Long id,Throwable e) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(444,"兜底异常handlerFallback,exception内容  "+e.getMessage(),payment);
    }

```

在`@SentinelResource`配置使用该方法：

![image-20230213152911031](http://www.iocaop.com/images/2023-02/image-20230213152911031.png)

加上fallback以后，再报错就会返回我们自定义fallback方法的值了：

![image-20230213154911732](http://www.iocaop.com/images/2023-02/image-20230213154911732.png)

> fallback会在java程序出现运行时异常时调用降级方法，而blockHandler会在Sentinel规则出现违规时调用降级方法。



## p133-Sentinel服务熔断-只配置blockHandler

只负责Sentinel控制台配置违规。

增加blockHandler方法：

```java
    public CommonResult blockHandler(@PathVariable  Long id, BlockException blockException) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(445,"blockHandler-sentinel限流,无此流水: blockException  "+blockException.getMessage(),payment);
    }
```

在`@SentinelResource`配置使用该方法：

![image-20230213160502422](http://www.iocaop.com/images/2023-02/image-20230213160502422.png)

重启，Sentinel控制台添加降级规则：

![image-20230213160604056](http://www.iocaop.com/images/2023-02/image-20230213160604056.png)

第一次访问：没有降级，但是异常了，直接返回

![image-20230213160853020](http://www.iocaop.com/images/2023-02/image-20230213160853020.png)

第二次：降级了

![image-20230213160937687](http://www.iocaop.com/images/2023-02/image-20230213160937687.png)

## p134-Sentinel服务熔断-fallback和blockHandler都配置

需要思考：错误冲突，即可能有java异常，又可能有限流违规，结果会怎么样

配置fallback和blockHandler：

![image-20230213162713540](http://www.iocaop.com/images/2023-02/image-20230213162713540.png)

添加限流规则：

![image-20230213163200649](http://www.iocaop.com/images/2023-02/image-20230213163200649.png)

正常访问(不会抛出java异常，但是qps违规)：

![image-20230213163320909](http://www.iocaop.com/images/2023-02/image-20230213163320909.png)

java异常，但qps不违规：

![image-20230213163345014](http://www.iocaop.com/images/2023-02/image-20230213163345014.png)

java异常，qps也违规：

![image-20230213163402729](http://www.iocaop.com/images/2023-02/image-20230213163402729.png)

结论：当fallback和blockHandler都进行了配置，被限流降级抛出BlockException时，只会进入blockHandler处理逻辑，不会进入fallback方法。

## p135-Sentinel服务熔断-exceptionsToIgnore

排除异常，也就是当报了指定的异常时，不进入fallback处理方法。

![image-20230213163931347](http://www.iocaop.com/images/2023-02/image-20230213163931347.png)

重启以后，这时候，当抛出这个异常，不会进入fallback方法，直接返回error页面了。

![image-20230213164029667](http://www.iocaop.com/images/2023-02/image-20230213164029667.png)

其他异常还是会进入fallback方法：

![image-20230213164048873](http://www.iocaop.com/images/2023-02/image-20230213164048873.png)

## p136-Sentinel服务熔断-OpenFeign

引入feign：

```xml
        <!--SpringCloud openfeign -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
```

激活Sentinel对Feign的支持：

```yaml
# 激活Sentinel对Feign的支持
feign:
  sentinel:
    enabled: true
```

启动类激活Feign：

```java
@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients
public class OrderNacosApplicaton84 {
    public static void main(String[] args) {
        SpringApplication.run(OrderNacosApplicaton84.class,args);
    }
}
```

feign接口创建：

```java
@FeignClient(value = "http://nacos-payment-provider",fallback = PaymentFallback.class)
public interface PaymentFeign {
    /**
     * 付款微服务调用
     *
     * @param id id
     * @return {@link CommonResult}<{@link Payment}>
     */
    @GetMapping(value = "/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id);
}
```

feign的fallback：

```java
@Component
public class PaymentFallback implements PaymentFeign {
    @Override
    public CommonResult<Payment> paymentSQL(Long id) {
        return new CommonResult<>(44444,"服务降级返回,---PaymentFallbackService",new Payment(id,"errorSerial"));
    }
}
```

添加控制层方法，使用Feign调用支付微服务：

```java
    @Resource
    PaymentFeign paymentFeign;

	@GetMapping(value = "/consumer/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id)
    {
        return paymentFeign.paymentSQL(id);
    }
```

启动测试是否可以远程调用，且会ribbon会采用默认负载均衡轮询调用：

![image-20230213165727365](http://www.iocaop.com/images/2023-02/image-20230213165727365.png)

现在我我们故意关掉支付微服务9003和9004：

再进行调用：Sentinel会进行fallback

![image-20230213170507396](http://www.iocaop.com/images/2023-02/image-20230213170507396.png)

如果没有fallback，先检查配置文件有没有开启Sentinel对Feign的支持。

> 在netfix版本中，是Hystrix进行降级，这里是Sentinel，但是都是配合OpenFeign来做，写fallback方法，只不过Sentinel需要在配置文件启动Sentinel对Feign的支持。

**熔断框架比较**(copy来的)

![image-20230213172644753](http://www.iocaop.com/images/2023-02/image-20230213172644753.png)

## p137-Sentinel持久化规则

在前面多次实验中，发现每次服务重启，原来配置好的Sentinel规则都消失了 ，都是临时的，需要持久化。

我们可以把Sentinel的流控规则持久化到nacos中，先添加依赖：

```xml
        <!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到-->
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-datasource-nacos</artifactId>
        </dependency>
```

配置文件：

```yaml
spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: www.iocaop.com:1111 #Nacos服务注册中心地址
    sentinel:
      transport:
        dashboard: localhost:8080 #默认端口8719 如果被占用会依次+1扫描，直到找到没被占用的
        port: 8719
      datasource: #<---------------------------关注点，添加Nacos数据源配置
        ds1:
          nacos:
            server-addr: www.iocaop.com:1111
            dataId: cloudalibaba-sentinel-service
            groupId: DEFAULT_GROUP
            data-type: json
            rule-type: flow
```

配置后，到nacos新建配置，cloudalibaba-sentinel-service，注意这里是用json类型，和之前的yaml不一样，命名也不一样。

```json
[{
    "resource": "/rateLimit/byUrl",
    "limitApp": "default",
    "grade": 1,
    "count": 1, 
    "strategy": 0,
    "controlBehavior": 0,
    "clusterMode": false
}]

```

![image-20230213173152495](http://www.iocaop.com/images/2023-02/image-20230213173152495.png)

> resource：资源名称；
> limitApp：来源应用；
> grade：阈值类型，0表示线程数, 1表示QPS；
> count：单机阈值；
> strategy：流控模式，0表示直接，1表示关联，2表示链路；
> controlBehavior：流控效果，0表示快速失败，1表示Warm Up，2表示排队等待；
> clusterMode：是否集群。

重启多次8401，可以看到，流控规则依然存在(需要手动访问接口，因为Sentinel是懒加载)：

![image-20230213174738916](http://www.iocaop.com/images/2023-02/image-20230213174738916.png)

但是，如果我们手动在界面上添加，重启以后还是会小时，所以还得到nacos上进行配置。

## p138-分布式事务的由来

三个阶段：

* 一个java程序对应一个数据库：没有分布式事务问题
* 一个java程序对应多个数据库(随着业务增多分库)：也没有问题
* 多个微服务对应多个数据库：比如订单微服务下单，订单微服务需要增加一条数据，而库存微服务需要进行库存扣除，修改数据库，这在逻辑是应该属于一个事务，但是在不同的数据库，所以有了分布式事务的问题。

单体应用被拆分成微服务应用，原来的三个模块被拆分成三个独立的应用,分别使用三个独立的数据源，业务操作需要调用三个服务来完成。此时**每个服务内部的数据一致性由本地事务来保证， 但是全局的数据一致性问题没法保证**。

![image-20230213181105839](http://www.iocaop.com/images/2023-02/image-20230213181105839.png)

一句话：**一次业务操作需要跨多个数据源或需要跨多个系统进行远程调用，就会产生分布式事务问题**。

全局数据一致性的保障。

## p139-Seata术语

Seata是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。

官网文档：<a href='http://seata.io/zh-cn/'>点击跳转</a>

一个典型的分布式事务过程

分布式事务处理过程的一ID+三组件模型：

* Transaction ID XID 全局唯一的事务ID
* 三组件概念(来自官网)
  * TC (Transaction Coordinator) - 事务协调者：维护全局和分支事务的状态，<span style="background-color:pink;">驱动全局事务提交或回滚</span>。
  * TM (Transaction Manager) - 事务管理器：<span style="background-color:pink;">定义全局事务的范围</span>：开始全局事务、提交或回滚全局事务。
  * RM (Resource Manager) - 资源管理器：<span style="background-color:pink;">管理分支事务处理的资源</span>，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。
    

![image-20230214104136100](http://www.iocaop.com/images/2023-02/image-20230214104136100.png)

## p140-Seata-Server安装

下载：<a href='https://github.com/seata/seata/releases/tag/v1.6.1'>点击跳转</a>，下载后解压，注意下载0.9版本的，和课程一致，后续版本配置不一样，参考：<a href='http://seata.io/zh-cn/docs/user/configurations.html'>点击跳转</a>。

本地事务：`@Transactional`属于spring的

全局事务：`@GlobalTransactional`阿里巴巴的

![image-20230214104812656](http://www.iocaop.com/images/2023-02/image-20230214104812656.png)

下载解压后，需要修改配置：先备份conf下的feile.conf文件，<span style="background-color:pink;">主要修改</span>：自定义事务组名称+事务日志存储模式为db(默认是存储到文件)+数据库连接信息

file.conf需要修改的地方：

* service模块：修改分组名字，随便起名字都行：

  ```properties
  service {
    #vgroup->rgroup 下面这行是需要修改的
    vgroup_mapping.my_test_tx_group = "fsp_tx_group"
    #only support single node
    default.grouplist = "127.0.0.1:8091"
    #degrade current not support
    enableDegrade = false
    #disable
    disable = false
    #unit ms,s,m,h,d represents milliseconds, seconds, minutes, hours, days, default permanent
    max.commit.retry.timeout = "-1"
    max.rollback.retry.timeout = "-1"
  }
  ```

* store模块：

  ```properties
  store {
    ## store mode: file、db 下面这行，需要修改为db 存储到数据库中
    mode = "db"
  
    ## file store
    file {
      dir = "sessionStore"
  
      # branch session size , if exceeded first try compress lockkey, still exceeded throws exceptions
      max-branch-session-size = 16384
      # globe session size , if exceeded throws exceptions
      max-global-session-size = 512
      # file buffer size , if exceeded allocate new buffer
      file-write-buffer-cache-size = 16384
      # when recover batch read size
      session.reload.read_size = 100
      # async, sync
      flush-disk-mode = async
    }
  
    ## database store
    db {
      ## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp) etc.
      datasource = "dbcp"
      ## mysql/oracle/h2/oceanbase etc. 修改为自己的数据库信息
      db-type = "mysql"
      driver-class-name = "com.mysql.jdbc.Driver"
      url = "jdbc:mysql://www.iocaop.com:3306/seata"
      user = "root"
      password = "911823"
      min-conn = 1
      max-conn = 3
      global.table = "global_table"
      branch.table = "branch_table"
      lock-table = "lock_table"
      query-limit = 100
    }
  }
  ```

* 数据库新建一个库名字为seata，在seata库里建表，sql已经提供了。

  ```sql
  -- the table to store GlobalSession data
  drop table if exists `global_table`;
  create table `global_table` (
    `xid` varchar(128)  not null,
    `transaction_id` bigint,
    `status` tinyint not null,
    `application_id` varchar(32),
    `transaction_service_group` varchar(32),
    `transaction_name` varchar(128),
    `timeout` int,
    `begin_time` bigint,
    `application_data` varchar(2000),
    `gmt_create` datetime,
    `gmt_modified` datetime,
    primary key (`xid`),
    key `idx_gmt_modified_status` (`gmt_modified`, `status`),
    key `idx_transaction_id` (`transaction_id`)
  );
  
  -- the table to store BranchSession data
  drop table if exists `branch_table`;
  create table `branch_table` (
    `branch_id` bigint not null,
    `xid` varchar(128) not null,
    `transaction_id` bigint ,
    `resource_group_id` varchar(32),
    `resource_id` varchar(256) ,
    `lock_key` varchar(128) ,
    `branch_type` varchar(8) ,
    `status` tinyint,
    `client_id` varchar(64),
    `application_data` varchar(2000),
    `gmt_create` datetime,
    `gmt_modified` datetime,
    primary key (`branch_id`),
    key `idx_xid` (`xid`)
  );
  
  -- the table to store lock data
  drop table if exists `lock_table`;
  create table `lock_table` (
    `row_key` varchar(128) not null,
    `xid` varchar(96),
    `transaction_id` long ,
    `branch_id` long,
    `resource_id` varchar(256) ,
    `table_name` varchar(32) ,
    `pk` varchar(36) ,
    `gmt_create` datetime ,
    `gmt_modified` datetime,
    primary key(`row_key`)
  );
  
  ```

  ![image-20230216231818856](http://www.iocaop.com/images/2023-02/image-20230216231818856.png)

* 修改registry.conf：

  ![image-20230216235813925](http://www.iocaop.com/images/2023-02/image-20230216235813925.png)

启动，注意需要java8，11会报错：

![image-20230216235852570](http://www.iocaop.com/images/2023-02/image-20230216235852570.png)

到nacos中，可以看到：

![image-20230217000031683](http://www.iocaop.com/images/2023-02/image-20230217000031683.png)

## p141-Seata业务数据库准备

Seata需要注册到Nacos，所以先准备好Nacos，这里还会创建3个微服务，一个订单微服务，一个库存微服务，一个账户微服务。

当用户下单，订单微服务会创建一个订单，然后远程调用扣减库存，再远程调用扣除账户余额，最后再订单微服务中修改订单状态。

> 操作跨越了3个数据库，且有2次远程调用，会有分布式事务问题。

创建3个数据库：seata_order、seata_storage、seata_account：

```sql
CREATE DATABASE seata_order;
CREATE DATABASE seata_storage;
CREATE DATABASE seata_account;
```

seata_order库下建t_order表:

```sql
CREATE TABLE t_order (
    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',
    `product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',
    `count` INT(11) DEFAULT NULL COMMENT '数量',
    `money` DECIMAL(11,0) DEFAULT NULL COMMENT '金额',
    `status` INT(1) DEFAULT NULL COMMENT '订单状态: 0:创建中; 1:已完结'
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

SELECT * FROM t_order;

```

seata_storage库下建t_storage表:

```sql
CREATE TABLE t_storage (
`id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
`product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',
`total` INT(11) DEFAULT NULL COMMENT '总库存',
`used` INT(11) DEFAULT NULL COMMENT '已用库存',
`residue` INT(11) DEFAULT NULL COMMENT '剩余库存'
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO seata_storage.t_storage(`id`, `product_id`, `total`, `used`, `residue`)
VALUES ('1', '1', '100', '0','100');

SELECT * FROM t_storage;


```

seata_account库下建t_account表:

```sql
CREATE TABLE t_account(
	`id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
	`user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',
	`total` DECIMAL(10,0) DEFAULT NULL COMMENT '总额度',
	`used` DECIMAL(10,0) DEFAULT NULL COMMENT '已用余额',
	`residue` DECIMAL(10,0) DEFAULT '0' COMMENT '剩余可用额度'
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO seata_account.t_account(`id`, `user_id`, `total`, `used`, `residue`)
VALUES ('1', '1', '1000', '0', '1000');

SELECT * FROM t_account;

```

上述3库分别建对应的回滚日志表(0.9版本Seata提供，在conf文件夹下db_undo_log.sql):

```sql
-- the table to store seata xid data
-- 0.7.0+ add context
-- you must to init this sql for you business databese. the seata server not need it.
-- 此脚本必须初始化在你当前的业务数据库中，用于AT 模式XID记录。与server端无关（注：业务数据库）
-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
drop table `undo_log`;
CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `context` varchar(128) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

最终：

![image-20230220232154286](http://www.iocaop.com/images/2023-02/image-20230220232154286.png)

## p142~p146-Seata之Module配置搭建

操作流程：下订单 -> 减库存 -> 扣余额 -> 改订单状态

## 创建订单微服务:seata-order-service2001

依赖：

```xml
<!--nacos-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        
        <!--seata-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
            <exclusions>
                <exclusion>
                    <artifactId>seata-all</artifactId>
                    <groupId>io.seata</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        
        <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-all</artifactId>
            <version>0.9.0</version>
        </dependency>
        
        <!--feign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        
        <!--web-actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        
        <!--mysql-druid-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.37</version>
        </dependency>
        
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>
        
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
```

配置文件：

```yaml
server:
  port: 2001

spring:
  application:
    name: seata-order-service
  cloud:
    alibaba:
      seata:
        #自定义事务组名称需要与seata-server中的对应
        tx-service-group: fsp_tx_group
    nacos:
      discovery:
        server-addr: www.iocaop.com:1111
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://www.iocaop.com:3306/seata_order
    username: root
    password: 911823

feign:
  hystrix:
    enabled: false

logging:
  level:
    io:
      seata: info

mybatis:
  mapperLocations: classpath:mapper/*.xml

```

把Seata0.9版本conf下的file.conf和registry.conf复制到resource下：

![image-20230220233258422](http://www.iocaop.com/images/2023-02/image-20230220233258422.png)

新建统一返回结果类：

```java
/**
 * 统一返回结果
 *
 * @author 赖卓成
 * @date 2023/02/20
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> {
    private Integer code;
    private String message;
    private T data;

    public CommonResult(Integer code, String message) {
        this(code, message, null);
    }
}
```

订单实体类：

```java
/**
 * 订单
 *
 * @author 赖卓成
 * @date 2023/02/20
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private Long id;

    private Long userId;

    private Long productId;

    private Integer count;

    private BigDecimal money;

    /**
     * 订单状态：0：创建中；1：已完结
     */
    private Integer status; 
}
```



持久层接口：

```java
/**
 * 订单持久层接口
 *
 * @author 赖卓成
 * @date 2023/02/20
 */
@Mapper
public interface OrderDao {

    /**
     * 新建订单
     *
     * @param order 订单
     */
    void create(Order order);


    /**
     * 修改订单状态，从零改为1
     *
     * @param userId 用户id
     * @param status 状态
     */
    void update(@Param("userId") Long userId, @Param("status") Integer status);
}
```

持久层实现：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.lzc.springcloud.alibaba.dao.OrderDao">

    <resultMap id="BaseResultMap" type="com.lzc.springcloud.alibaba.domain.Order">
        <id column="id" property="id" jdbcType="BIGINT"/>
        <result column="user_id" property="userId" jdbcType="BIGINT"/>
        <result column="product_id" property="productId" jdbcType="BIGINT"/>
        <result column="count" property="count" jdbcType="INTEGER"/>
        <result column="money" property="money" jdbcType="DECIMAL"/>
        <result column="status" property="status" jdbcType="INTEGER"/>
    </resultMap>

    <insert id="create">
        insert into t_order (id,user_id,product_id,count,money,status)
        values (null,#{userId},#{productId},#{count},#{money},0);
    </insert>


    <update id="update">
        update t_order set status = 1
        where user_id=#{userId} and status = #{status};
    </update>

</mapper>
```

业务层接口：

```java
/**
 * 订单服务
 *
 * @author 赖卓成
 * @date 2023/02/20
 */
public interface OrderService {
    /**
     * 创建
     *
     * @param order 订单
     */
    void create(Order order);
}
```

业务层实现类(其他微服务还未建好，暂时先这样写，不完整)：

```java
    /**
     * 创建
     * 创建订单->调用库存服务扣减库存->调用账户服务扣减账户余额->修改订单状态
     * 简单说：下订单->扣库存->减余额->改状态
     *
     * @param order 订单
     */
    @Override
    public void create(Order order)
    {
        log.info("----->开始新建订单");
        //1 新建订单
        orderDao.create(order);
    }
```

控制层：

```java
/**
 * 订单控制层
 *
 * @author 赖卓成
 * @date 2023/02/21
 */
@RestController
public class OrderController {
    @Resource
    private OrderService orderService;


    @GetMapping("/order/create")
    public CommonResult create(Order order)
    {
        orderService.create(order);
        return new CommonResult(200,"订单创建成功");
    }
}
```

配置类： 参考：<a href='https://github.com/seata/seata-samples/blob/master/doc/quick-integration-with-spring-cloud.md'>点击跳转</a>

* MyBatisConfig

  ```java
  /**
   * ibatis配置
   *
   * @author 赖卓成
   * @date 2023/02/21
   */
  @Configuration
  @MapperScan({"com.atguigu.springcloud.alibaba.dao"})
  public class MyBatisConfig {
  }
  
  ```

* DataSourceProxyConfig

  ```java
  @Configuration
  public class DataSourceProxyConfig {
  
      @Bean
      @ConfigurationProperties(prefix = "spring.datasource")
      public DataSource dataSource() {
          return new DruidDataSource();
      }
  
      @Bean
      public DataSourceProxy dataSourceProxy(DataSource dataSource) {
          return new DataSourceProxy(dataSource);
      }
  
      @Bean
      public SqlSessionFactory sqlSessionFactoryBean(DataSourceProxy dataSourceProxy) throws Exception {
          SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
          sqlSessionFactoryBean.setDataSource(dataSourceProxy);
          return sqlSessionFactoryBean.getObject();
      }
  }
  ```
  
  启动类需加注解，不自动装配数据源，而是手动配置:
  
  ```java
  /**
   * 启动类
   * 取消数据源的自动创建，而是使用自己定义的
   * @author 赖卓成
   * @date 2023/02/21
   */
  @EnableDiscoveryClient
  @EnableFeignClients
  @SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
  public class SeataOrderMainApplication2001 {
      public static void main(String[] args) {
          SpringApplication.run(SeataOrderMainApplication2001.class,args);
      }
  }
  
  ```
  
  启动验证：
  
  ![image-20230222230123673](http://www.iocaop.com/images/2023-02/image-20230222230123673.png)
  
  ![image-20230222230148361](http://www.iocaop.com/images/2023-02/image-20230222230148361.png)

## 创建库存微服务:seata-storage-service2002

依赖和seata-order-service2001模块相同：

```xml
    <dependencies>
        <!--nacos-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!--seata-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
            <exclusions>
                <exclusion>
                    <artifactId>seata-all</artifactId>
                    <groupId>io.seata</groupId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-all</artifactId>
            <version>0.9.0</version>
        </dependency>

        <!--feign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <!--web-actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!--mysql-druid-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.37</version>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>com.lzc</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
```

配置文件：与seata-order-service2001模块大致相同,数据库不同

```yaml
server:
  port: 2002

spring:
  application:
    name: seata-storage-service
  cloud:
    alibaba:
      seata:
        # 自定义事务组名称需要与seata-server中的对应
        tx-service-group: fsp_tx_group
    nacos:
      discovery:
        server-addr: www.iocaop.com:1111
  datasource:
    # 当前数据源操作类型
    type: com.alibaba.druid.pool.DruidDataSource
    # mysql驱动类
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://www.iocaop.com:3306/seata_storage?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=GMT%2B8
    username: root
    password: 911823

logging:
  level:
    io:
      seata: info

mybatis:
  mapperLocations: classpath:mapper/*.xml

```

file.conf 和 registry.conf（与seata-order-service2001模块大致相同，直接拷贝过来）

实体类：

```java
@Data
public class Storage {

    private Long id;

    /**
     * 产品id
     */
    private Long productId;

    /**
     * 总库存
     */
    private Integer total;

    /**
     * 已用库存
     */
    private Integer used;

    /**
     * 剩余库存
     */
    private Integer residue;
}
```

持久层接口：

```java
@Mapper
public interface StorageDao {


    /**
     * 扣减库存
     *
     * @param productId 产品id
     * @param count     数
     */
    void decrease(@Param("productId") Long productId, @Param("count") Integer count);
}
```

持久层实现类：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.lzc.springcloud.alibaba.dao.StorageDao">

    <resultMap id="BaseResultMap" type="com.lzc.springcloud.alibaba.domain.Storage">
        <id column="id" property="id" jdbcType="BIGINT"/>
        <result column="product_id" property="productId" jdbcType="BIGINT"/>
        <result column="total" property="total" jdbcType="INTEGER"/>
        <result column="used" property="used" jdbcType="INTEGER"/>
        <result column="residue" property="residue" jdbcType="INTEGER"/>
    </resultMap>

    <update id="decrease">
        UPDATE
        t_storage
        SET
        used = used + #{count},residue = residue - #{count}
        WHERE
        product_id = #{productId}
    </update>
    
</mapper>
```

业务层接口：

```java
public interface StorageService {

    /**
     * 扣减库存
     *
     * @param productId 产品id
     * @param count     数
     */
    void decrease(Long productId, Integer count);
}
```

业务层实现类：

```java
@Service
public class StorageServiceImpl implements StorageService {

    private static final Logger LOGGER = LoggerFactory.getLogger(StorageServiceImpl.class);

    @Resource
    private StorageDao storageDao;

    /**
     * 扣减库存
     */
    @Override
    public void decrease(Long productId, Integer count) {
        LOGGER.info("------->storage-service中扣减库存开始");
        storageDao.decrease(productId,count);
        LOGGER.info("------->storage-service中扣减库存结束");
    }
}
```

控制层：

```java
@RestController
public class StorageController {

    @Autowired
    private StorageService storageService;

    /**
     * 扣减库存
     */
    @RequestMapping("/storage/decrease")
    public CommonResult decrease(Long productId, Integer count) {
        storageService.decrease(productId, count);
        return new CommonResult(200,"扣减库存成功！");
    }
}
```

Config配置:与seata-order-service2001模块相同，直接拷贝过来。

启动类：

```java
@EnableDiscoveryClient
@EnableFeignClients
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class SeataStorageMainApplication2002 {
    public static void main(String[] args) {
        SpringApplication.run(SeataStorageMainApplication2002.class,args);
    }
}
```

启动测试：

![image-20230222235307072](http://www.iocaop.com/images/2023-02/image-20230222235307072.png)

## 创建账户微服务seata-account-service2003

依赖和seata-order-service2001相同：

```xml
    <dependencies>
        <!--nacos-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!--seata-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
            <exclusions>
                <exclusion>
                    <artifactId>seata-all</artifactId>
                    <groupId>io.seata</groupId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-all</artifactId>
            <version>0.9.0</version>
        </dependency>

        <!--feign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <!--web-actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!--mysql-druid-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.37</version>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>com.lzc</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
```

配置文件：

```yaml
server:
  port: 2003

spring:
  application:
    name: seata-account-service
  cloud:
    alibaba:
      seata:
        # 自定义事务组名称需要与seata-server中的对应
        tx-service-group: fsp_tx_group
    nacos:
      discovery:
        server-addr: www.iocaop.com:1111
  datasource:
    # 当前数据源操作类型
    type: com.alibaba.druid.pool.DruidDataSource
    # mysql驱动类
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://www.iocaop.com:3306/seata_account?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=GMT%2B8
    username: root
    password: 911823

feign:
  hystrix:
    enabled: false

logging:
  level:
    io:
      seata: info

mybatis:
  mapperLocations: classpath:mapper/*.xml

```

实体类：

```java
/**
 * 账户
 *
 * @author 赖卓成
 * @date 2023/02/23
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account {

    private Long id;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 总额度
     */
    private BigDecimal total;

    /**
     * 已用额度
     */
    private BigDecimal used;

    /**
     * 剩余额度
     */
    private BigDecimal residue;
}
```

持久层接口：

```java
@Mapper
public interface AccountDao {


    /**
     * 扣减账户余额
     *
     * @param userId 用户id
     * @param money  钱
     */
    void decrease(@Param("userId") Long userId, @Param("money") BigDecimal money);
}

```

持久层实现类：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >

<mapper namespace="com.lzc.springcloud.alibaba.dao.AccountDao">

    <resultMap id="BaseResultMap" type="com.lzc.springcloud.alibaba.domain.Account">
        <id column="id" property="id" jdbcType="BIGINT"/>
        <result column="user_id" property="userId" jdbcType="BIGINT"/>
        <result column="total" property="total" jdbcType="DECIMAL"/>
        <result column="used" property="used" jdbcType="DECIMAL"/>
        <result column="residue" property="residue" jdbcType="DECIMAL"/>
    </resultMap>

    <update id="decrease">
        UPDATE t_account
        SET
        residue = residue - #{money},used = used + #{money}
        WHERE
        user_id = #{userId};
    </update>

</mapper>
```

业务层接口：

```java
public interface AccountService {

    /**
     * 扣减账户余额
     * @param userId 用户id
     * @param money 金额
     */
    void decrease(@RequestParam("userId") Long userId, @RequestParam("money") BigDecimal money);
}
```

业务层实现类：

```java
@Service
public class AccountServiceImpl implements AccountService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AccountServiceImpl.class);
    
    @Resource
    AccountDao accountDao;
    
    @Override
    public void decrease(Long userId, BigDecimal money) {
        LOGGER.info("------->account-service中扣减账户余额开始");
        accountDao.decrease(userId,money);
        LOGGER.info("------->account-service中扣减账户余额结束");
    }
}
```

控制层：

```java
@RestController
public class AccountController {

    @Resource
    AccountService accountService;

    /**
     * 扣减账户余额
     */
    @RequestMapping("/account/decrease")
    public CommonResult decrease(@RequestParam("userId") Long userId, @RequestParam("money") BigDecimal money){
        accountService.decrease(userId,money);
        return new CommonResult(200,"扣减账户余额成功！");
    }
}
```

Config配置、file.conf、registry.conf直接拷贝原来的。

启动类：

```java
@EnableDiscoveryClient
@EnableFeignClients
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class SeataAccountMainApplication2002 {
    public static void main(String[] args) {
        SpringApplication.run(SeataAccountMainApplication2002.class,args);
    }
}
```

启动测试：

![image-20230223004011034](http://www.iocaop.com/images/2023-02/image-20230223004011034.png)

## 业务代码

业务流程是：下单->库存扣减->余额扣减->订单状态修改

微服务调用链路：这里统一由订单调用其他微服务

* order创建订单
* order->storage 扣除库存
* order->account 扣减余额
* order 修改订单状态

在order微服务创建feign：

```java
/**
 * 库存微服务远程调用
 *
 * @author 赖卓成
 * @date 2023/02/23
 */
@FeignClient(name = "seata-storage-service2002")
@Component
public interface StorageFeign {

    /**
     * 扣减库存
     *
     * @param productId 产品id
     * @param count     数
     * @return {@link CommonResult}
     */
    @RequestMapping("/storage/decrease")
    public CommonResult decrease(Long productId, Integer count);
}
```

```java
/**
 * 账户微服务远程调用
 *
 * @author 赖卓成
 * @date 2023/02/23
 */
@FeignClient(name = "seata-account-service2003")
@Component
public interface AccountFeign {

    /**
     * 扣除余额
     *
     * @param userId 用户id
     * @param money  钱
     * @return {@link CommonResult}
     */
    @RequestMapping("/account/decrease")
    public CommonResult decrease(@RequestParam("userId") Long userId, @RequestParam("money") BigDecimal money);
}
```

业务代码：

```java
    /**
     * 创建
     * 创建订单->调用库存服务扣减库存->调用账户服务扣减账户余额->修改订单状态
     * 简单说：下订单->扣库存->减余额->改状态
     *
     * @param order 订单
     */
    @Override
    public void create(Order order)
    {
        log.info("----->开始新建订单");
        // 1 新建订单
        orderDao.create(order);

        // 2 远程调用库存微服务 扣减库存
        log.info("----->订单微服务开始调用库存，做扣减Count");
        storageFeign.decrease(order.getProductId(), order.getCount());
        log.info("----->订单微服务开始调用库存，做扣减end");

        // 3 远程调用账户微服务 扣除余额
        log.info("----->订单微服务开始调用账户，做扣减Money");
        accountFeign.decrease(order.getUserId(), order.getMoney());
        log.info("----->订单微服务开始调用账户，做扣减end");

        //4 修改订单状态，从零到1,1代表已经完成
        log.info("----->修改订单状态开始");
        orderDao.update(order.getUserId(),0);
        log.info("----->修改订单状态结束");

        log.info("----->下订单结束了，O(∩_∩)O哈哈~");

    }
```

数据库初始情况：

![image-20230223235102115](http://www.iocaop.com/images/2023-02/image-20230223235102115.png)



![](http://www.iocaop.com/images/2023-02/image-20230223235125763.png)

![image-20230223235202585](http://www.iocaop.com/images/2023-02/image-20230223235202585.png)

* 先不加全局事务注解来测试：
  * 正常下单：不加`@GlobalTransactional`注解，三个服务都正常时，访问：<a href='http://localhost:2001/order/create?userId=1&productId=1&count=10&money=100'>订单微服务</a>，创建订单
  
    ![image-20230309001913747](http://www.iocaop.com/images/2023-03/image-20230309001913747.png)
  
    核对数据：没问题
  
    ![image-20230309002426916](http://www.iocaop.com/images/2023-03/image-20230309002426916.png)
  
    ![image-20230309002448849](http://www.iocaop.com/images/2023-03/image-20230309002448849.png)
  
    ![image-20230309002503222](http://www.iocaop.com/images/2023-03/image-20230309002503222.png)
  
  * 异常下单：不加`GlobalTransactional`注解，账户微服务接口模拟超时(睡眠20秒)，再来下单：
  
    ![image-20230309003749788](http://www.iocaop.com/images/2023-03/image-20230309003749788.png)
  
    核对数据：异常。库存和余额都扣减了，但是订单状态没有改为已支付，因为抛出异常了，没有往下走了，<span style="background-color:pink;">由于feign存在重试机制，余额可能会被扣减多次</span>。
  
    ![image-20230309003816113](http://www.iocaop.com/images/2023-03/image-20230309003816113.png)
  
    ![image-20230309003853878](http://www.iocaop.com/images/2023-03/image-20230309003853878.png)
  
    ![image-20230309003931295](http://www.iocaop.com/images/2023-03/image-20230309003931295.png)
  
  * 异常下单，添加注解`GlobalTransactional`:
  
    ![image-20230309004522611](http://www.iocaop.com/images/2023-03/image-20230309004522611.png)
  
    调用接口下单：
  
    ![image-20230309004626656](http://www.iocaop.com/images/2023-03/image-20230309004626656.png)
  
    还是报错，核对数据：三个表没有发生任何变化。
