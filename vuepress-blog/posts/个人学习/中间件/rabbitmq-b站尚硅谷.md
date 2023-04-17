---
title: 重学RabbitMQ
date: 2022-07-26
order: 1
category:
  - 中间件
  - RabbitMQ
---

B站教程地址：<a href='https://www.bilibili.com/video/BV1cb4y1o7zz?p=1&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a>

## p2-什么是mq

  消息队列，本质是个队列，FIFO先进先出。队列中存放的是message，在操作系统中，是一种跨进程通信机制，用于上下游传递信息。在互联网架构中，是非常常见的上下游"逻辑解耦+物理解耦"的消息通信服务。使用了MQ以后，服务之间消息发送只需要依赖MQ不需要依赖其他服务。

## p3-流量削锋

![流量削锋](http://www.iocaop.com/images/2022-08/202208182321556.png)

> 订单系统只能达到每秒1w次访问，为了提高并发且不宕机，采用mq进行削锋，用户先访问mq(mq并发比订单系统高，且mq是集群的)，mq存储用户下单信息在队列中。因为队列时有序的，可以保证有序性。订单系统再消费消息，为用户下单。缺点：下单有延迟。

## p4-应用解耦

![应用解耦](http://www.iocaop.com/images/2022-08/202208182321965.png)

> 用户下单后，订单系统直接调用支付、库存、物流等系统，如果被调用的服务其中一个出错或宕机，都会造成下单异常(需要服务恢复，用户重新下单，损失巨大)。

> 使用mq调用子系统，给子系统发送消息，子系统需要消费消息，计算用户下单期间，某个子系统宕机，也不会影响订单系统，等子系统恢复后，消费消息，做对应的处理即可。

## p5-异步处理

![异步处理](http://www.iocaop.com/images/2022-08/202208182321598.png)

> 有些服务的调用必须是异步的，比如A调用B需要花费很长的时间才执行完，但是A需要指定B什么时候可以执行完成。以前的实现方式是A每隔一段时间询问B是否完成，结果是什么？所以需要回调，这样并不优雅。使用MQ可以优雅的解决这个问题，如图所示，用户体验也会更好。

## p6-MQ的分类

* ActiveMQ

  优点：单机吞吐量是**万**级别的，时效性ms级别，可用性高，基于主从架构实现高可用性，消息可靠，较低的概率丢失数据。

  缺点：维护越来越少，高吞吐量场景较少。

* kafka

  优点：吞吐量高，单机写入TPS**百万**/秒。时效性ms级别，kafka是分布式的，一个数据多个副本，防止少数机器宕机丢失数据。消费者采用pull方式获取消息，消息有序，通过控制能保证所有消息被消费者消费且仅被消费一次。**在日志领域比较成熟**，在大数据领域的实时计算和**日志采集**被大规模使用。有优秀的第三方web管理页面kafka-manager。

  缺点：单机超过64个队列/分区。Load会发生明显的cpu飙高现象，队列越多，load越高，发送消息响应时间边长，使用**短轮询**方式，实时性取决于轮询间隔时间，消费失败**不支持重试**(消息可能会丢失)，支持消息顺序，但是一台代理宕机后，会**产生消息乱序**。**社区更新较慢**。

* RocketMQ

  阿里开源，java实现，参考了kafka做出改进，被阿里广泛用于订单、交易、充值、流计算、消息推送、日志流失处理、binglog分发等。

  优点：单机吞吐量**十万**级别，可用性非常高，分布式架构，**消息可以做到0丢失**，

  MQ功能完善，分布式、扩展性好，**支持10亿级别的消息堆积**，**不会因为堆积导致性能下降**，Java源码，可定制。

  缺点：支持的客户端语言较少，目前是Java和c++，c++不成熟。没有再MQ核心中实现JMS等接口，有些系统要迁移需要修改大量代码。

* RabbitMQ

  AMQP(高级消息队列协议)基础上完成，可复用的企业消息系统，是当前**最主流的消息中间件之一**。

  优点：erlang语言编写（**高并发**特性），吞吐量**万**级别。MQ功能完善、健壮、稳定、易用、跨平台、**支持多种语言**。开源提供的管理界面很好、好用，**社区活跃度高、更新频率高**

  缺点：商业版收费、学习成本高。

## p7-MQ的选择

* kafka特点：pull模式处理消息消费，追求高吞吐量，一开始的目的就是用于日志手机和传输。适合**产生大量数据**的互联网服务的数据收集业务。**大型公司，有日志采集功能**，首选kafka。

* RocketMQ

  为**金融互联网**领域而生，对于可靠性要求高，尤其是电商里面的订单扣款、业务削峰、大量交易涌入是后端无法及时处理的情况。RocketMQ在稳定性上值得信赖，因为阿里已经经过多次双十一的考验。

* RabbitMQ

  结合erlang语言本身**并发优势**，**性能时效微秒级别**，**社区活跃度高**，管理界面方便，如果**数据量没有那么大**的**中小型公司**优先选择比较完备的RabbitMQ。

## p8-核心概念

* RabbitMQ概念

  消息中间件，接受、存储和转发消息。

  ![RabbitMQ概念](http://www.iocaop.com/images/2022-08/202208182321501.png)

  一个队列只能对应一个消费者吗？不是，可以对应多个消费者，但是消息只能被消费一次，只会有一个消费者收到消息。

## p9-原理名词解释

* 模式

  ![Rabbit的模式](http://www.iocaop.com/images/2022-08/202208182322452.png)

  ![工作原理图](http://www.iocaop.com/images/2022-08/202208182322226.png)

  Broker：接受和分发消息的应用

  Channel：信道，可以理解为：发消息的通道

  Virtual host：出于多租户(broker可以有多个vhost)和安全因素设计，把AMQP的基本组件划分到一个虚拟的分组中，类似网络中的namespace概念，当多个不同的用户使用同一个RabbitMQ server提供服务时，可以划分出多个vhost，每个用户在自己的vhost创建exchange/queue等

  Connection：publisher(生产者)、consumer(消费者)和broker(接受和分发消息应用)之间的的TCP连接

  Channel：如果每一次访问，RabbitMQ都建立一次Connection，会在消息量大的时候建立很多TCP连接，开销巨大，效率低。Channel是在Connection内部建立逻辑连接，如果应用程序支持多线程，通常**每个thread创建单独的channel进行通讯**，AMQP method包含了**channel id** 帮助客户端和message broker识别channel，所以channel之间是完全隔离的。**Channel作为轻量级的Connection极大减少了操作系统建立TCP连接的开销。**

  Exchange：message到达broker的第一站，根据分发规则，匹配查询表中的routing key，分到消息到queue中去。常用类型有：direct,topic,fanout

  Queue:消息存储的队列，存储消息等待consume取走

  Binding：exchange和queue之间的虚拟连接，binding可以包含routing key，Binding信息被保存到exchange的查询表中，用于分发message。

## p10-安装

<a href='https://rabbitmq.com/download.html'>官方网站</a>

<a href='https://blog.csdn.net/weixin_53621681/article/details/123232251'>安装参考文章</a>

高版本mq不支持centos7，所以下载低版本的包：

![centos支持的mq](http://www.iocaop.com/images/2022-08/202208182322044.png)

然后:

```bash
# 安装erlang
rpm -ivh erlang-23.3.4.11-1.el7.x86_64.rpm
# 安装socat
rpm -ivh socat-1.7.3.2-5.el7.lux.x86_64.rpm
# 安装rabbitmq-server
rpm -ivh rabbitmq-server-3.9.12-1.noarch.rpm

# 开启管理界面
rabbitmq-plugins enable rabbitmq_management
# 启动服务
service rabbitmq-server start 
# 服务状态
service rabbitmq-server status 
```

启动后访问：15672端口，如果无法访问，检查防火墙(systemctl status firewalld)或者端口是否开放

![mq管理界面](http://www.iocaop.com/images/2022-08/202208182322976.png)

提示只能在localhost登录。权限有问题。

## p12-添加用户并设置权限

```bash
# 创建账号 用户名 密码 自定义
rabbitmqctl add_user lzc 911823
# 设置用户角色为超级管理员
rabbitmqctl set_user_tags lzc administrator
# 设置用户权限 set_permissions [-p <vhostpath>] <user> <conf> <write> <read> 配置vhost、读写权限
rabbitmqctl set_permissions -p "/" lzc ".*" ".*" ".*"
# 查看当前用户和角色
rabbitmqctl list_users
```

配置完后可以登录了，并且可以看到刚才配置的结果：

![配置结果](http://www.iocaop.com/images/2022-08/202208182322572.png)

## p13-创建Java开发环境

<a href='https://rabbitmq.com/tutorials/tutorial-one-java.html'>官方文档</a>

创建项目后，导入maven插件:<a href='https://blog.csdn.net/Java_1710/article/details/120992614'>为什么要导入？</a>

```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

导入依赖：

```xml
        <!--rabbitmq客户端-->
        <dependency>
            <groupId>com.rabbitmq</groupId>
            <artifactId>amqp-client</artifactId>
            <version>5.14.2</version>
        </dependency>

        <!--文件操作流-->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.11.0</version>
        </dependency>
```

## p14-简单模式生产者发送消息

本例子用简单模式(HelloWorld模式)：

![(P) -> [|||] -> (C)](http://www.iocaop.com/images/2022-08/202208182323892.png)

```java
public class Product {

    /**
     * 队列名称
     */
    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws IOException, TimeoutException {

        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("www.iocaop.com");
        connectionFactory.setPort(5672);
        connectionFactory.setUsername("lzc");
        connectionFactory.setPassword("911823");

        // 创建连接
        Connection connection = connectionFactory.newConnection();

         // 从原理图中可以看出，rabbitmq中，建立connection是建立了TCP连接，
        // 并不是发消息的，而是在连接中创建多个信道channel来发消息。
        Channel channel = connection.createChannel();

        // 调用信道，声明队列
        /**
         * 参数1：队列名称
         * 参数2：是否持久化 默认存储在内存中
         * 参数3: 是否进行消息的共享(多个队列消费)，默认是false，不共享
         * 参数4： 是否自动删除
         * 参数5： 额外的参数，可以为空
         */
        channel.queueDeclare(QUEUE_NAME,false,false,false,null);

        // 准备消息的内容，发送消息
        String message = "Hello RabbitMQ";
        /**
         * 参数1：交换机名称，本例为helloworld模式，不需要交换机
         * 参数2：路由key，本次是队列名称
         * 参数3：其他参数
         * 参数4：消息内容
         */
        channel.basicPublish("",QUEUE_NAME,null,message.getBytes());
        System.out.println("发送消息："+message);

    }
}
```

发送后到web管理界面可以看到该条消息：

![查看消息](http://www.iocaop.com/images/2022-08/202208182323893.png)

## p15-简单模式消费者消费消息

```java
public class Consumer {

    /**
     * 队列名称
     */
    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws IOException, TimeoutException {
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setPort(5672);
        connectionFactory.setHost("www.iocaop.com");
        connectionFactory.setUsername("lzc");
        connectionFactory.setPassword("911823");

        // 创建连接
        Connection connection = connectionFactory.newConnection();
        // 从原理图可以看出，消费消息依然是要建立连接，建立信道，然后消费消息。
        Channel channel = connection.createChannel();
        /**
         *参数1：队列名称
         * 参数2：是否自动签收
         * 参数3：消费者消费失败的回调..如果消费失败，会调用此方法，可以在此方法中进行重新消费
         * 参数4：消费者取消消费的回调
         */
        channel.basicConsume(QUEUE_NAME,true,(consumerTag,message)->{
            // 没搞懂官方的解释，但消费者消费消息时，会调用这个方法
            System.out.println("消费者消费:"+new String(message.getBody()));
        },(consumerTag,cancellationSignal)->{
            System.out.println("消费者取消消费");
        });
    }
}
```

![消费消息](http://www.iocaop.com/images/2022-08/202208182323765.png)

## p16-Work Queues 工作队列模式解释

工作队列主要思想：避免立即执行资源密集型任务，而长时间等待。先将任务封装成消息，发送到队列，再多个线程消费消息(一个线程无法短时间处理)，一起处理这些任务。

> 需要遵循的原则：每条消息只能被消费一次，否则，工作内容会重复。工作线程之间的关系，是竞争关系，挨个消费消息(轮询分发消息)。

![工作队列模式](http://www.iocaop.com/images/2022-08/202208182323369.png)

## p17-抽取连接工厂工具类

```java
/**
 * MQ连接工具类-连接工厂创建信道
 *
 * @author lzc
 * @date 2022/07/29
 */
public class RabbitMqUtils {

    public static Channel getChannel() throws IOException, TimeoutException {
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setPort(5672);
        connectionFactory.setHost("www.iocaop.com");
        connectionFactory.setUsername("lzc");
        connectionFactory.setPassword("911823");

        // 创建连接
        Connection connection = connectionFactory.newConnection();
        // 从原理图可以看出，消费消息依然是要建立连接，建立信道，然后消费消息。
        Channel channel = connection.createChannel();
        return channel;
    }
}
```

## p18-工作队列模式-创建工作线程(消费者)

```java
/**
 * 这是一个工作线程(消费者)
 *
 * @author lzc
 * @date 2022/07/29
 */
public class Work01 {

    /**
     * 队列名称
     */
    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        channel.basicConsume(QUEUE_NAME,true,((consumerTag, message) -> {
            System.out.println("消费者消费:"+new String(message.getBody()));
        }),((consumerTag, cancellationSignal) -> {
            System.out.println("消费者取消消费");
        }));
    }
}
```

## p19-工作队列模式-启动多个工作线程(消费者)

idea是可以同一个类，启动多个线程的。<a href='https://blog.csdn.net/qq2942713658/article/details/124064751'>设置方法</a>

![工作线程1](http://www.iocaop.com/images/2022-08/202208182323476.png)

![工作线程2](http://www.iocaop.com/images/2022-08/202208182323409.png)



## p20-工作队列模式-生产者发送消息

发送消息时，和简单模式是一样的。

```java
/**
 * 生产者-用来发送大量消息
 *
 * @author lzc
 * @date 2022/07/29
 */
public class Task01 {

    /**
     * 队列名称
     */
    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明队列
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        // 写一个循环发送消息
        for (int i = 1; i < 20; i++) {
            // 发送消息 和简单模式一样的发送消息
            channel.basicPublish("", QUEUE_NAME, null, (i + "").getBytes());
            System.out.println("发送消息:" + i);
        }
    }
}

```

![生产者发送大量消息](http://www.iocaop.com/images/2022-08/202208182324217.png)

## p21-工作队列模式-工作线程消费情况

![消费者1消费消息](http://www.iocaop.com/images/2022-08/202208182324042.png)

![消费者2消费消息](http://www.iocaop.com/images/2022-08/202208182324633.png)

可以看到，是轮询的，每个线程各消费一次，就算多再多工作线程(消费者)，也是轮询的，一个消费者消费一条消息，挨个轮着来消费。

此处有一个问题，当我们开启两个main方法后，打印线程的名字，可以看出来，线程池都是pool2，但是我们在同一个main方法执行两个不同的线程，打印的线程池名字又是不一样的：

![image-20220809233731884](http://www.iocaop.com/images/2022-08/202208182325815.png)

为什么？因为开启两个main方法，是不同的进程，两个jvm虚拟机，刚好线程池名字重名了。这样比较也没有意义。

![重名](http://www.iocaop.com/images/2022-08/202208182325821.png)

只有在同一个进程中，开启两个线程消费，打印了不同的线程池名，才能推测是不是每个channel使用一个线程池。目前来看是可以这样推测的，但是不一定，后期再研究。

<a href= 'https://wenku.baidu.com/view/a3a1810f4b2fb4daa58da0116c175f0e7dd11976.html'>mq线程池设置</a>

## p22-消息应答概念

在工作队列模式下，如果有一个工作线程(消费者)突然卡住了或者挂了，导致任务没有完成，会发生什么？如果RabbitMQ在把消息发送给消费者后，会给该消息标记为已删除。然而消费者并没有完成任务，就挂了，就会丢失这条消息，后续也无法把这条消息再发送给消费者了。

> 为了保证消息在发送过程中不会丢失。RabbitMQ引入了消息应答机制：消费者在收到消息并处理消息之后，告诉MQ已经处理了，可以删除消息了。

这样一来，消费者再接受消息后，消息不会删除，而是等消费完消息，把任务处理完了，再告诉MQ，可以删除消息了。如果在处理中挂了，也没关系，因为MQ不会删除消息，等恢复后，还能继续消费这条消息。

**自动应答机制**

在消费者接收到消息之后，自动告诉MQ，可以删除消息了。这样一来，可能会出现问题：在接受消息后，MQ把消息删除了，消费者还有后续代码没有执行完成，那么后续代码出问题了，消息也无法再消费了(丢失了)，达不到预期结果了。如图所示：

![自动应答](http://www.iocaop.com/images/2022-08/202208182325603.png)

在执行channel.basicConsume这行代码以后，消息就被MQ删除了，但是后续代码可能还是会出现问题。

自动应答在企业，一般不会采取。

**消息应答的方法**

```java
     channel.basicAck();// 用于肯定确认
	 channel.basicNack();// 用于否定确认
	 channel.basicReject();// 用于否定确认
```

basicNack比basicReject少一个参数：是否批量处理。

批量应答表示，如果当前有5、6、7、8四条消息未应答，批量则一次性应答这4条消息，不批量应答则应答当前这条消息。

![批量应答](http://www.iocaop.com/images/2022-08/202208182325784.png)

虽然批量应答可以减少网络压力，速度快，但是会有消息丢失的可能。建议不批量应答。

## p23-消息自动重新入队

如果消费者由于某种原因，失去连接(信道关闭或TCP丢失)，导致消息没有ACK确认。RabbitMQ将了解到消息未处理，会重新把消息放到队列，给其他消费者使用。

![消息重新入队图示](http://www.iocaop.com/images/2022-08/202208182325130.png)

c1未成功消费消息1，消息1重新入队，给c2消费了。消息1并未丢失。

## p24-消息手动应答

我们在之前消费消息的时候都是自动应答，现在需要改成手动应答：

![手动应答](http://www.iocaop.com/images/2022-08/202208182325253.png)

改完后，在执行channel.basicConsume这行代码以后，就不会告诉MQ消息可以删除了。而需要在工作任务代码之后加上ack，告知mq，消息签收了。

![消息手动签收](http://www.iocaop.com/images/2022-08/202208182325703.png)

```java
// message.getEnvelope().getDeliveryTag() 是告诉MQ，哪条消息签收了
channel.basicAck(message.getEnvelope().getDeliveryTag(),false);
```

## p25-消息手动应答-生产者

手动签收主要修改是在消费者，和生成者关系不大，所以生产者代码没什么变化。

```java
/**
 * 消费消息在手动应答时不丢失，会放回队列重新消费
 *
 * @author lzc
 * @date 2022/07/29
 */
public class Task2 {

    public static final String QUEUE_NAME= "ack_queue";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明队列
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        // 写一个循环发送消息
        for (int i = 1; i < 20; i++) {
            channel.basicPublish("", QUEUE_NAME, null, (i + "").getBytes());
            System.out.println("发送消息:" + i);
        }
    }
}
```

## p23-消息手动应答-消费者

写两个消费者(睡眠时间不一样)，在业务代码里面睡眠不一样的时间，表示一个消费快，一个消费慢。

```java
/**
 * 消费者
 *
 * @author lzc
 * @date 2022/07/29
 */
public class Work2 {
    public static final String QUEUE_NAME= "ack_queue";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        System.out.println("C1等待接受消息...");
        // 消费消息时，需要注意采用手动签收模式，不然会丢失消息
        channel.basicConsume(QUEUE_NAME,false,(consumerTag, message) ->{
            // 睡眠1秒，表示这是消费快的线程
            try {
                Thread.sleep(TimeUnit.SECONDS.toMillis(1));
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("消费者接收到消息:"+new String(message.getBody()));
            /**
             * 参数1 消息的标识
             * 参数2 是否批量签收
             */
            channel.basicAck(message.getEnvelope().getDeliveryTag(),false);
        },(consumerTag, cancellationSignal) ->{
            System.out.println("消费者取消消费");
        });
    }

}
```

## p27-消息手动应答-运行验证结果

生产者：

![生产者](http://www.iocaop.com/images/2022-08/202208182325925.png)

消费者C1：接受消息后，睡眠1秒再签收

![消费者C1](http://www.iocaop.com/images/2022-08/202208182325352.png)

消费者C2：接受消息后，睡眠30秒再签收

![消费者C2](http://www.iocaop.com/images/2022-08/202208182325263.png)

第一次（过去了大概几分钟，正常消费）：

![C1正常消费](http://www.iocaop.com/images/2022-08/202208182325000.png)

![C2正常消费](http://www.iocaop.com/images/2022-08/202208182325950.png)

第二次：生产者重新发送同样的消息，C2有睡眠，过几秒，等C1消费完，我们到MQ管理界面查看队列信息，可以看到有消息没有消费完，显示未签收：

![管理界面查看队列信息](http://www.iocaop.com/images/2022-08/202208182325452.png)

这时我们再把C2停止，到C1查看：

![查看C1消费状态](http://www.iocaop.com/images/2022-08/202208182325252.png)

由于是公平分发的，C1消费的都是双数的，C2消费的都是单数的。但是C2被我停止了，单数的消息又重新放回队列了(因为C2一旦接受到消息，消息会进入到unacked状态，但是没有被手动签收，C2的channel又被关闭了，消息就会被放回队列)，并且被C1消费了。

## p28-队列持久化

在保证了消息不丢失的前提下，我们需要对RabbitMQ的队列和消息进行持久化，RabbitMQ退出或服务停止后，**默认**队列和消息是会**丢失**的。为了确保不丢失，我们**需要将队列和消息标记为持久化。**

* 队列如何实现持久化？

  之前创建的队列都是非持久化的，mq重启，会被删除，如果需要持久化，需要在声明队列的时候把durable参数设置为持久化。

  ![声明队列时设置持久化](http://www.iocaop.com/images/2022-08/202208182325405.png)

  需要注意的是，如果队列已经存在，本来是非持久化的，现在改为持久化，会报错，需要删除队列重新创建(声明)。

  ![需要删除重新声明队列](http://www.iocaop.com/images/2022-08/202208182325745.png)

  删除之前看一眼队列信息：

  ![队列信息](http://www.iocaop.com/images/2022-08/jfstHxq9rvnyk2L.png)

  删除ack_queue队列，并且声明时设置持久化为true，再重新创建，到管理页面查看(多了 一个标识D，durable持久化的)：

  ![持久化的队列](http://www.iocaop.com/images/2022-08/202208182325408.png)

## p29-消息持久化

首先要明白，队列持久化，只是持久化了队列，MQ重启后，队列没有丢失，**队列里的消息会丢失**(至于为什么，现在先不纠结)。所以，要想消息不丢失，除了队列持久化、消息也要持久化。

我们在发消息的时候，需要通知队列中的消息是需要持久化的。

想要消息也持久化，需要修改代码，在发布消息的时候，设置消息持久化：

```java
MessageProperties.PERSISTENT_TEXT_PLAIN
```

![发布消息设置消息持久化](http://www.iocaop.com/images/2022-08/202208182325729.png)

尽管设置了消息持久化，也是有可能丢失的：在消息刚准备存储到磁盘的时候，还没存完，消息还在缓存的一个间隔点。消息也会丢失。持久性保证并不强，但是对于简单任务队列已经够了。想要更强有力的持久化策略，需要**确认发布机制**来保障(后续章节)。

## p30-不公平分发

默认情况RabbitMQ采用轮询分发(公平)，某些场景不是很好，因为消费者处理任务的速度有快有慢(MQ并不知道)，轮询分发会使处理任务快的线程长时间空闲，很浪费。

如何设置不公平分发？

在消费者这接受消息之前，需要设置basicQos为1。

![不公平分发图示](http://www.iocaop.com/images/2022-08/202208182326720.png)

我们在验证手动签收的例子(C1睡眠1秒，C2睡眠30秒)上验证：

![C1设置不公平分发](http://www.iocaop.com/images/2022-08/202208182326793.png)

![C2设置不公平分发](http://www.iocaop.com/images/2022-08/202208182326884.png)

运行：

因为C1处理任务快，C1消费了较多消息，而C2处理慢，只消费了一条消息，不公平分发设置成功：

![C1消费情况](http://www.iocaop.com/images/2022-08/202208182326685.png)

![C2消费情况](http://www.iocaop.com/images/2022-08/202208182326464.png)

## p31-预取值

* 公平分发，一个消费者一条，轮询分发。

* 不公平分发，按消费者处理任务的速度分。

* 预取值：指定消费者消费多少条消息。(如果队列只有7条，nameC1消费2条，C2消费5条，如果队列不止7条，后面的会按不公平分发的方式消费)

  ![预取值图示](http://www.iocaop.com/images/2022-08/18HO9bEsguqjyUv.png)

预取值设定的好，可以使传送速率最佳、效率最高等。

还是刚才的设置：

```java
 channel.basicQos(1);// 设置为1表示不公平分发，设置其他值表示预取值
```

修改代码：

将C1预取值设置为4、C2为15，再重新发19条消息。

效果：

![C1消费了4条消息](http://www.iocaop.com/images/2022-08/202208182326925.png)

![C2消息迟迟没有被签收](http://www.iocaop.com/images/2022-08/202208182326098.png)

可以看到。C1虽然处理任务快，但是设置了预取值为4，及时C2消费慢，依然不会把剩下的消息给C1来消费，要保证C2拿到15条消息。

在C1拿到4条消息之前，一般是轮询分发的(不一定，因为消息是先堆积在channel的)，后面就都给了C2。

当C2接受到15条后，等他签收几条，我们再发19条，MQ会继续保持预取值，先把C2信道中填满15条，再不公平分。

![再发消息，会先保证预取值](http://www.iocaop.com/images/2022-08/202208182326821.png)

## p32-发布确认原理

学完队列持久化和消息持久化以后我们知道，要保证消息不丢失，需要声明队列和发送消息时标记队列持久化和消息持久化，但是消息真正保存到磁盘上是需要时间的，如果消息还没来得及保存到磁盘上MQ就宕机了，消息也会丢失，所以我们在保存到磁盘后，MQ再给生产者发送消息，告诉生产者消息已经保存到磁盘上了，就叫做发布确认。发布确认以后，就能肯定消息不会丢失。

![发布确认](http://www.iocaop.com/images/2022-08/202208182326243.png)

我们需要在队列声明之前，设置开启发布确认：

```java
channel.confirmSelect();// 开启发布确认
```

确认发布又分三种：单个确认发布、批量确认发布、异步确认发布

## p33-单个确认发布

同步确认的方式，发布一个消息之后，只有这个消息确认发布以后，才会进行后续消息的发布。缺点是发布速度慢，每发一条，都要等待这条发布确认后，才进行后续发布。

```java
    /**
     * 单个发布确认
     */
    public static void sendMessage1() throws IOException, TimeoutException, InterruptedException {
        Channel channel = RabbitMqUtils.getChannel();
        // 开启发布确认
        channel.confirmSelect();
        // 随机队列名称
        String queueName = UUID.randomUUID().toString();
        // 声明队列
        channel.queueDeclare(queueName, false, false, false, null);
        // 记录开始时间
        long startTime = System.currentTimeMillis();
        // 发布消息
        for (int i = 0; i < 1000; i++) {
            channel.basicPublish("", queueName, null, (""+i).getBytes());
            // 等候确认
            boolean b = channel.waitForConfirms();
            if (b){
                System.out.println("发布成功"+i);
            }
        }
        long endTime = System.currentTimeMillis();
        System.out.println(queueName+"：单个发布确认1000条成功，发布耗时：" + (endTime - startTime)+"ms");
    }
```

运行结果：

![单个发布确认耗时](http://www.iocaop.com/images/2022-08/202208182326735.png)

如果我们注释掉发布确认的代码运行，耗时减少了很多，可以看出，单个发布确认耗时比较长：

![不开启单个发布确认](http://www.iocaop.com/images/2022-08/202208182326814.png)

## p34-批量发布确认

先批量发布一批消息，然后一起确认、可以**提高吞吐量**。缺点：当发生故障时，无法确认是哪条消息出问题了。

手动在循环里面判断，每100条确认一次：

```java
    /**
     * 批量发布确认
     */
    public static void sendMessage2() throws IOException, TimeoutException, InterruptedException {
        Channel channel = RabbitMqUtils.getChannel();
        // 开启发布确认
        channel.confirmSelect();
        // 随机队列名称
        String queueName = UUID.randomUUID().toString();
        // 声明队列
        channel.queueDeclare(queueName, false, false, false, null);
        // 记录开始时间
        long startTime = System.currentTimeMillis();
        // 发布消息
        for (int i = 1; i <= 1000; i++) {
            channel.basicPublish("", queueName, null, (""+i).getBytes());
            // 等候确认 每100条确认一次
            if (i%100==0){
                boolean b = channel.waitForConfirms();
                if (b){
                    System.out.println("发布成功"+i);
                }
            }
        }
        long endTime = System.currentTimeMillis();
        System.out.println(queueName+"：每100条批量发布确认1000条成功，发布耗时：" + (endTime - startTime)+"ms");
    }
```

执行结果：

![每100条确认一次](http://www.iocaop.com/images/2022-08/202208182326138.png)

## p35-异步发布确认原理

异步发布确认在编程上要比上面两个要复杂，但是无论可靠性还是效率都很好。利用回调函数来达到消息可靠性传递的，MQ通过函数回调来保证是否投递成功。

生产者在发送消息后，会有一个map存了消息的序号和消息内容，发送给MQ，MQ通过序号区分消息。MQ确认收到后，会回调ackCallback，告诉生产者已经收到消息了。未收到的也会通过回调nackCallBack，通知生产者未收到，再重发。而且回调是异步的。所以生产者只需要发就好了，确认有broker来完成。

![异步确认原理](http://www.iocaop.com/images/2022-08/202208182326610.png)

## p36-异步发布确认代码编写

步骤：

* 开始发布确认
* 创建监听器
* 发布消息

```java
    /**
     * 异步发布确认
     */
    public static void sendMessage3() throws IOException, TimeoutException, InterruptedException {
        Channel channel = RabbitMqUtils.getChannel();
        // 开启发布确认
        channel.confirmSelect();
        // 随机队列名称
        String queueName = UUID.randomUUID().toString();
        // 声明队列
        channel.queueDeclare(queueName, true, false, false, null);
        // 准备消息监听器，监听消息发布

        channel.addConfirmListener((deliveryTag,multiple)->{
            // 监听成功的消息
            System.out.println("发布成功，编号"+deliveryTag+"，是否批量："+multiple);
        },(deliveryTag,multiple)->{
            // 监听失败的消息
            System.out.println("发布失败，编号"+deliveryTag+"，是否批量："+multiple);
        });
        // 记录开始时间
        long startTime = System.currentTimeMillis();
        // 发布消息
        for (int i = 1; i <= 1000; i++) {
            channel.basicPublish("", queueName, null, (""+i).getBytes());

        }
        long endTime = System.currentTimeMillis();
        System.out.println("异步发布确认1000条成功，发布耗时：" + (endTime - startTime)+"ms");
    }
```

![监听器](http://www.iocaop.com/images/2022-08/202208182326631.png)

![回调函数](http://www.iocaop.com/images/2022-08/202208182326249.png)

![运行结果](http://www.iocaop.com/images/2022-08/202208182326478.png)

## p37-如何处理异步发布确认中未确认的消息

最好的解决方案就是把未确认的消息放到一个基于内存的，能被发布线程访问的队列。比如ConcurrentLinkedQueue，这个队列在confirm callbacks与发布线程之间进行消息传递。

发布线程和回调函数的监听线程，是两个线程。所以只能使用并发链式队列，可以在发布和监听线程之间数据传递。

**ConcurrentSkipListMap**：线程安全有序的哈希表，适用于高并发情况。

* 可以轻松将序号于消息关联 k-v
* 可以轻松批量删除
* 支持高并发

```java
    /**
     * 异步发布确认
     */
    public static void sendMessage3() throws IOException, TimeoutException, InterruptedException {
        Channel channel = RabbitMqUtils.getChannel();
        // 开启发布确认
        channel.confirmSelect();
        // 随机队列名称
        String queueName = UUID.randomUUID().toString();
        // 声明队列
        channel.queueDeclare(queueName, true, false, false, null);
        // 准备消息监听器，监听消息发布

        ConcurrentSkipListMap<Long, String> map = new ConcurrentSkipListMap<>();
        channel.addConfirmListener((deliveryTag,multiple)->{
            // 监听成功的消息
            System.out.println("发布成功，编号"+deliveryTag+"，是否批量："+multiple);
            // 先判断是否为批量，批量则批量删除，一般不会批量，不然会丢失消息
          if (multiple){
              // 发布成功则删除键值对，剩下的就是失败的消息
              ConcurrentNavigableMap<Long, String> headMap = map.headMap(deliveryTag);
              headMap.clear();
          }else {
              // 不批量则直接删掉这一个键值对
                map.remove(deliveryTag);
          }
        },(deliveryTag,multiple)->{
            // 监听失败的消息
            String message = map.get(deliveryTag);
            System.out.println("发布失败，编号"+deliveryTag+"，消息为："+message+"，是否批量："+multiple);
        });
        // 记录开始时间
        long startTime = System.currentTimeMillis();
        // 发布消息
        for (int i = 1; i <= 1000; i++) {
            // 通过信道可以获取到下一次消息的编号
            map.put(channel.getNextPublishSeqNo(), ""+i);
            channel.basicPublish("", queueName, null, (""+i).getBytes());

        }
        long endTime = System.currentTimeMillis();
        System.out.println("异步发布确认1000条成功，发布耗时：" + (endTime - startTime)+"ms");
    }

```

两种情况：

* 批量确认，则需要通过deliveryTag获取到headMap，进行clear
* 不批量，则直接通过deliveryTag进行remove

## p38-三种发布确认对比

* 单独发布消息：

  同步等待确认，简单，但吞吐量有限

* 批量发布消息

  批量同步等待确认，简单，需要合理的吞吐量，一旦出现问题很难判断是哪条消息出了问题

* 异步处理

  最佳性能和资源利用，出错情况可以很好的控制，但是实现起来稍微难一些。

  

## p39-交换机的作用

之前不需要指定(空串)交换机是因为使用了默认交换机(AMQP default)

原来一个消息只能被一个消费者消费：

![一个消息还能消费一次，简单模式](http://www.iocaop.com/images/2022-08/202208182327255.png)

如果想要一个消息被消费两次，就需要两个队列，各存一份消息：

![一个消息可以被消费多次，发布订阅模式](http://www.iocaop.com/images/2022-08/202208182327624.png)

## p40-交换机的介绍

RabbitMQ消息传递模型核心思想：**生产者的消息不会直接发送到队列**，通常生成者甚至都不知道这些消息传递到了哪些队列中。

**生成者只能将消息发送到交换机**，交换机工作内容：接受生产者的消息，将消息推入队列。交换机要知道如何处理消息，就由交换机的类型类决定。

![交换机图示](http://www.iocaop.com/images/2022-08/202208182327231.png)

* 交换机的类型

  直接(direct)、主题(topic)、标题(header)、扇出(fanout)

* 无名交换机

  前面我们没有指定(空串)exchange，仍然可以发送消息到队列，因为我们使用了默认交换机(空串标识)。

  ```java
  channel.basicPublish("", queueName, null, (""+i).getBytes());
  ```

  消息能路由发送到队列中其实是有routingkey绑定key的(如果存在的话)。

* 临时队列

  一旦断开了消费者的连接，队列会被自动删除。(未持久化,名称随机)

  ```java
  channel.queueDeclare().getQueue();
  ```

## p41-绑定

一个交换机可以往不同的队列发送消息，所以要用routingKey做区分，想发给谁就发给谁。

![绑定](http://www.iocaop.com/images/2022-08/202208182327236.png)

在管理页面手动绑定：

![添加队列](http://www.iocaop.com/images/2022-08/202208182327613.png)

![添加交换机](http://www.iocaop.com/images/2022-08/202208182327557.png)

![绑定](http://www.iocaop.com/images/2022-08/202208182327410.png)

![结果](http://www.iocaop.com/images/2022-08/202208182327530.png)

## p42-fanout模式

广播模式，将接收到的所有消息**广播**到它知道（绑定）的所有队列中。系统中有默认的广播模式交换机(amq.fanout)。

![广播模式图示](http://www.iocaop.com/images/2022-08/202208182327653.png)

![管理界面查看绑定关系](http://www.iocaop.com/images/2022-08/202208182327641.png)

## p42-fanout模式生产者:

```java
/**
 * 生产者
 *
 * @author lzc
 * @date 2022/08/04
 */
public class EmitLog {

    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
        // 发布消息
        for (int i = 0; i < 1000; i++) {
            // 广播模式不需要指定routingKey
            channel.basicPublish(EXCHANGE_NAME, "", null, ("" + i).getBytes());
            System.out.println("发布成功" + i);
        }
    }
}
```

## p43-fanout模式消费者(2个一样的)

```java
/**
 * 消费者1
 *
 * @author lzc
 * @date 2022/08/04
 */
public class ReceiveLogs1 {

    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
        // 声明临时队列 队列名随机，消费者断开连接后自动删除
        String queueName = channel.queueDeclare().getQueue();
        // 绑定交换机和队列 routingKey为空
        channel.queueBind(queueName, EXCHANGE_NAME, "");
        // 消费消息
        channel.basicConsume(queueName, true, (consumerTag, delivery) -> {
            // 接受消息回调
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("01接受消息:" + message);
        }, (consumerTag, delivery) -> {
            // 取消消费回调
            System.out.println("01取消消费:" + consumerTag);
        });

    }
}
```

> 启动时需要注意，先启动消费者，再启动生产者，因为是临时队列，消费者断开连接后队列会自动删除。

![消费者1](http://www.iocaop.com/images/2022-08/202208182327160.png)

![消费者2](http://www.iocaop.com/images/2022-08/202208182327581.png)

>  可以看到两个消费者都消费了1000次，而生产者只发送了1000次消息。也就是说一个消费被消费了两次，因为是广播模式，消息会向绑定的队列中各发1000条。

## p44-direct路由模式

和fanout不同的是，routingKey是不同的。如果direct模式的routingKey，那么就和fanout几乎一样。

> fanout模式是一个生成者发消息，多个消费者接受(一个交换机往所有的绑定的队列发消息)。direct是指定的消费者接受(交换机往指定的队列(可以是多个)中发消息)。

![路由模式图示](http://www.iocaop.com/images/2022-08/202208182327077.png)

举例：

生产者发消息：有三个routingKey分别为：info、warning 、error。都发往交换机(exchange)direct_logs再发送到不同的队列。

info、warning 绑定的队列为console，error绑定的队列为disk

![direct模式绑定](http://www.iocaop.com/images/2022-08/202208182327771.png)

```java
/**
 * 路由模式 生产者
 *
 * @author lzc
 * @date 2022/08/08
 */
public class DirectLogs {

    public static final String EXCHANGE_NAME = "direct_logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        channel.confirmSelect();
        //kv对应 消息编号-消息内容
        ConcurrentSkipListMap<Long, String> map = new ConcurrentSkipListMap<>();

        for (int i = 0; i < 100; i++) {
            long infoNextPublishSeqNo = channel.getNextPublishSeqNo();

            channel.basicPublish(EXCHANGE_NAME, "info", MessageProperties.PERSISTENT_TEXT_PLAIN,
                ("info:" + i).getBytes());
            map.put(infoNextPublishSeqNo, "info:" + i);
            System.out.println("发出info:" + i);

            long errorNextPublishSeqNo = channel.getNextPublishSeqNo();
            channel.basicPublish(EXCHANGE_NAME, "error", MessageProperties.PERSISTENT_TEXT_PLAIN,
                ("error: " + i).getBytes());
            map.put(errorNextPublishSeqNo, "error: " + i);
            System.out.println("发出error:" + i);

            long warningNextPublishSeqNo = channel.getNextPublishSeqNo();
            channel.basicPublish(EXCHANGE_NAME, "warning", MessageProperties.PERSISTENT_TEXT_PLAIN,
                ("warning:" + i).getBytes());
            map.put(warningNextPublishSeqNo, "warning:" + i);
            System.out.println("发出warning:" + i);
        }
        channel.addConfirmListener((deliveryTag, multiple) -> {
            System.out.println("发布成功，deliveryTag:" + deliveryTag);
            if (multiple) {
                ConcurrentNavigableMap<Long, String> headMap = map.headMap(deliveryTag);
                headMap.clear();

            }else {
                map.remove(deliveryTag);
            }
        }, (consumerTag, multiple) -> {
            System.out.println("发布失败，deliveryTag:" + consumerTag);

        });
    }

}
```

三个消费者：两个消费的是console队列，一个消费disk队列。

```java
public class ReceiveLogsDirect1 {

    public static final String EXCHANGE_NAME = "direct_logs";
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT,true);
       // 声明队列
        channel.queueDeclare("console",true,false,false,null);
        // 绑定队列到交换机
        channel.queueBind("console",EXCHANGE_NAME,"info");
        // 消费
        channel.basicConsume("console",true,(consumerTag,message)->{
            // 消费消息回调
            System.out.println("console队列消费info消息："+new String(message.getBody(),"UTF-8"));;
        },(consumerTag,message)->{
            // 取消消费回调
            System.out.println("取消消费:"+consumerTag);
        });
    }
}
```

```java
public class ReceiveLogsDirect2 {

    public static final String EXCHANGE_NAME = "direct_logs";
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT,true);
       // 声明队列
        channel.queueDeclare("console",true,false,false,null);
        // 绑定队列到交换机
        channel.queueBind("console",EXCHANGE_NAME,"warning");
        // 消费
        channel.basicConsume("console",true,(consumerTag,message)->{
            // 消费消息回调
            System.out.println("console队列消费warning消息："+new String(message.getBody(),"UTF-8"));;
        },(consumerTag,message)->{
            // 取消消费回调
            System.out.println("取消消费:"+consumerTag);
        });
    }
}
```

```java
public class ReceiveLogsDirect3 {

    public static final String EXCHANGE_NAME = "direct_logs";
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT,true);
       // 声明队列
        channel.queueDeclare("disk",true,false,false,null);
        // 绑定队列到交换机
        channel.queueBind("disk",EXCHANGE_NAME,"error");
        // 消费
        channel.basicConsume("disk",true,(consumerTag,message)->{
            // 消费消息回调
            System.out.println("error队列消费error消息："+new String(message.getBody(),"UTF-8"));;
        },(consumerTag,message)->{
            // 取消消费回调
            System.out.println("取消消费:"+consumerTag);
        });
    }
}
```

运行结果：绑定了info和warning交换机的队列console收到了消息info和warning的消息。绑定了error的disk队列收到了error的消息。

![console队列消费](http://www.iocaop.com/images/2022-08/202208182327404.png)

![disk队列消息消费](http://www.iocaop.com/images/2022-08/202208182327912.png)

> 需要注意的是：direct模式，消费者可以根据不同的routingKey消费消息吗？还是说只能指定队列来消费？

答：<a href='https://www.zhihu.com/question/51409120'>不可以</a>



## p45-topic主题交换机

对于direct模式，虽然一个交换机可以绑定多个队列，但是同一个routingKey(不能重复)没法同时路由两个队列。所以出现了topic模式。

topic模式的routingKey不能乱写，

* 单词之间需要用.隔开
* 星号*可以代替一个单词
* 井号#可以代替零个或多个单词

![topic例子](http://www.iocaop.com/images/2022-08/202208182328331.png)

> 需要注意的是：
>
> 如果队列绑定的routingKey是#，那这个队列会接受所有的数据，有点像fanout了
>
> 如果队列绑定的routingKey中没有出现#或者*，这个队列只会接受指定的routingKey，有点像direct模式了。

下面来实现一下：

首先是消费者1，需要声明交换机，声明队列

```java
/**
 * Topic消费者 C1
 *
 * @author lzc
 * @date 2022/08/10
 */
public class ReceiveLogsTopic1 {

    public static final String EXCHANGE_NAME = "topic_logs";
    public static final String QUEUE1_NAME = "Q1";
    public static final String QUEUE2_NAME = "Q2";
    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMqUtils.getChannel();
        // 声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.TOPIC,true);

        // 声明队列
        channel.queueDeclare(QUEUE1_NAME,true,false,false,null);
        channel.queueDeclare(QUEUE2_NAME,true,false,false,null);

        // 绑定队列到交换机
        channel.queueBind(QUEUE1_NAME,EXCHANGE_NAME,"*.orange.*");

        // 消费消息
        channel.basicConsume(QUEUE1_NAME,true,(consumerTag,message)->{
            System.out.println("Q1消费消息,routingKey为："+message.getEnvelope().getRoutingKey()+",消息体：" + new String(message.getBody()));
        },(consumerTag, sig)->{
            System.out.println("Q1取消消费消息" + consumerTag);
        });
    }

}

```

消费者2：

```java
/**
 * Topic消费者 C2
 *
 * @author lzc
 * @date 2022/08/10
 */
public class ReceiveLogsTopic2 {
    public static final String EXCHANGE_NAME = "topic_logs";
    public static final String QUEUE1_NAME = "Q1";
    public static final String QUEUE2_NAME = "Q2";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.TOPIC,true);

        // 声明队列
        channel.queueDeclare(QUEUE2_NAME,true,false,false,null);

        // 绑定队列到交换机
        channel.queueBind(QUEUE2_NAME,EXCHANGE_NAME,"*.*.rabbit");
        channel.queueBind(QUEUE2_NAME,EXCHANGE_NAME,"lazy.#");

        // 消费消息
        channel.basicConsume(QUEUE2_NAME,true,(consumerTag,message)->{
            System.out.println("Q2消费消息,routingKey为："+message.getEnvelope().getRoutingKey()+"," + new String(message.getBody()));
        },(consumerTag, sig)->{
            System.out.println("Q2取消消费消息" + consumerTag);
        });
    }
}
```

生产者

```java
/**
 * 生产者 topic模式
 *
 * @author lzc
 * @date 2022/08/10
 */
public class TopicLogs {

    public static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        channel.confirmSelect();
        for (int i = 0; i < 100; i++) {
            channel.basicPublish(EXCHANGE_NAME, "test.orange.ppp", MessageProperties.PERSISTENT_TEXT_PLAIN,
                ("消息test.orange.ppp" + i).getBytes());
            channel.basicPublish(EXCHANGE_NAME, "test.orange.rabbit", MessageProperties.PERSISTENT_TEXT_PLAIN,
                ("消息test.orange.ppp" + i).getBytes());
            channel.basicPublish(EXCHANGE_NAME, "lazy.orange.ppp", MessageProperties.PERSISTENT_TEXT_PLAIN,
                ("消息lazy.orange.ppp" + i).getBytes());
            channel.basicPublish(EXCHANGE_NAME, "lazy", MessageProperties.PERSISTENT_TEXT_PLAIN,
                ("消息lazy" + i).getBytes());
            System.out.println("发出hello topic" + i);
        }
        channel.addConfirmListener((deliveryTag, multiple) -> {
                System.out.println("发布成功，deliveryTag:" + deliveryTag);
            }, (consumerTag, multiple) -> {
                System.out.println("发布失败，deliveryTag:" + consumerTag);
            }
        );
    }
}
```

运行结果

![topic运行结果](http://www.iocaop.com/images/2022-08/202208182328875.png)

较为简单，记住*代表任意单词，#代表0个或多个单词，单词之间用.隔开即可

## p49-死信队列

死信，就是无法被消费的消息。一般来说，producer投递消息到broker或到queue了，consumer从queue取出消息进行消费，但是某些时候由于特定的原因导致queue中的某些**消息无法被消费**，这样的消息如果**没有后续的处理**，就变成了死信，有死信就有了死信队列。

应用场景：

* 为了保证订单业务的消息数据不丢失。
* 消息消费发生异常，将消息投入死信队列中。
* 支付订单在指定时间未支付自动失效(延迟消息)

死信的来源:

* 消息TTL过期
* 队列达到最大长度(队列满了，无法再添加数据到mq中)
* 消息被拒绝，(basic.reject或base.nack)并且requeue=false

## p50-死信队列架构图

![死信队列图示](http://www.iocaop.com/images/2022-08/202208182328585.png)

说明：c1正常消费生产者发过来的消息，当出现消息过期、队列已满、消息应答被拒，三种情况时，需要将正常队列中的消息(死信)转发给死信交换机，再由死信交换机投递给死信队列，给c2来处理消息。

## p51-死信队列-正常队列消费者c1

```java
/**
 * consumer01
 * 死信队列 消费者1 消费正常队列的消息
 * @author lzc
 * @date 2022/08/16
 */
public class Consumer01 {

    private static final String DEAD_EXCHANGE = "dead_exchange";
    private static final String NORMAL_EXCHANGE = "normal_exchange";
    private static final String DEAD_QUEUE = "dead_queue";
    private static final String NORMAL_QUEUE = "normal_queue";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();

        // 声明正常队列和正常交换机
        channel.exchangeDeclare(NORMAL_EXCHANGE, BuiltinExchangeType.DIRECT,true);
        // 设置正常队列中的消息成为死信后转发到死信交换机
        HashMap<String, Object> map = new HashMap<>(16);
        // 这个地方可以设置正常队列的过期时间，但是一般是由生产者发送消息时设置，因为发送时可以给每条消息设置过期时间，更灵活
        // map.put("x-dead-letter-ttl",100000);
        map.put("x-dead-letter-exchange", DEAD_EXCHANGE);
        map.put("x-dead-letter-routing-key", "lisi");
        channel.queueDeclare(NORMAL_QUEUE,true,false,false,map);

        // 声明死信队列和死信交换机
        channel.exchangeDeclare(DEAD_EXCHANGE, BuiltinExchangeType.DIRECT,true);
        channel.queueDeclare(DEAD_QUEUE,true,false,false,null);

        // 绑定正常队列到正常交换机
        channel.queueBind(NORMAL_QUEUE,NORMAL_EXCHANGE,"zhangsan");

        // 绑定死信队列到死信交换机
        channel.queueBind(DEAD_QUEUE,DEAD_EXCHANGE,"lisi");

        // 正常队列消费
        channel.basicConsume(NORMAL_QUEUE,true,(consumerTag,message)->{
            System.out.println("正常队列消费："+new String(message.getBody(),"UTF-8"));
        },(consumerTag,message)->{
            System.out.println("取消消费："+consumerTag);
        });

    }
}
```

> 交换机、队列、都是按照之前的方式来声明，正常交换机和正常队列绑定，死信交换机和死信交换机绑定。不同的是，在声明正常队列的时候需要传入参数，是一个map，指定正常队列中的消息死亡以后发往的交换机和routingKey(用于发往死信队列)。

## p52-死信队列-生产者

```java
/**
 * 
 * 死信队列 生产者 发送消息到正常交换机 再到正常队列
 * @author lzc
 * @date 2022/08/16
 */
public class Product {

    private static final String DEAD_EXCHANGE = "dead_exchange";
    private static final String NORMAL_EXCHANGE = "normal_exchange";
    private static final String DEAD_QUEUE = "dead_queue";
    private static final String NORMAL_QUEUE = "normal_queue";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        // 在消费者中已经声明了正常队列、正常交换机、死信队列、死信交换机，这里不需要重新声明，直接发送消息指定过期时间就好了
        // 设置过期时间
        AMQP.BasicProperties properties = new AMQP.BasicProperties.Builder()
            .expiration("100000")
            .build();
        for (int i = 0; i < 10; i++) {
            channel.basicPublish(NORMAL_EXCHANGE,"zhangsan", properties,("消息"+i).getBytes());
        }

    }

}
```

> 生产者只需要往正常交换机发消息，再到正常队列即可。消息死亡以后会被转发给死信交换机。在发送时可以通过AMQP.BasicProperties指定消息的过期时间。

## p53-死信队列-死信队列消费者c2

```java
/**
 * consumer02
 * 死信队列 消费者1 消费死信队列的消息
 * @author lzc
 * @date 2022/08/16
 */
public class Consumer02 {
    private static final String DEAD_EXCHANGE = "dead_exchange";
    private static final String NORMAL_EXCHANGE = "normal_exchange";
    private static final String DEAD_QUEUE = "dead_queue";
    private static final String NORMAL_QUEUE = "normal_queue";
    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMqUtils.getChannel();
        channel.basicConsume(DEAD_QUEUE,true,(consumerTag,message)->{
            System.out.println("死信队列消费："+new String(message.getBody(),"UTF-8"));
        },(consumerTag,message)->{
            System.out.println("取消消费："+consumerTag);
        });
    }

}
```

> 死信队列的消费者没有什么特殊的，就是正常消费。

## 死信队列操作说明

首先运行消费者c1，创建好正常交换机、正常队列、死信交换机、死信队列以及他们之间的绑定关系。

![正常队列绑定正常交换机](http://www.iocaop.com/images/2022-08/202208182328887.png)

![死信队列绑定死信交换机](http://www.iocaop.com/images/2022-08/202208182328258.png)

![正常队列](http://www.iocaop.com/images/2022-08/202208182328115.png)

> 正常队列为什么和其他正常队列显示的不一样？DLX表示消息没有被正常消费会被转发给死信交换机，DLK表示转发时带有routingKey

创建完以后，我们关闭c1进程(模拟宕机)，运行生产者，进行消息发送。

![消息到达正常队列](http://www.iocaop.com/images/2022-08/202208182328850.png)

> 正常队列接收到了消息，但是正常队列的消费者c1已经被我们关闭，并且消息是10秒钟的有消息，所以10秒钟以后，消息会被正常队列转发到死信交换机再发到死信队列。

我们可以在消费图中查看过去一分钟消息的情况：

![消息情况](http://www.iocaop.com/images/2022-08/202208182328288.png)

> 可以看到，接受到消息10秒钟后，消息没了。再到死信队列查看：

![死信队列情况](http://www.iocaop.com/images/2022-08/202208182328049.png)

> 由于我没有启动消费者c2，但是我为了截图操作过三次，所以有多段消息增多的折线，最后一次为本次操作。

> 最后我们再启动消费者c2进行消费，把之前的消息都消费完

![消费者c2消费](http://www.iocaop.com/images/2022-08/202208182328459.png)

至此，消息过期的死信队列演示完毕。

## p54-死信队列-队列达到最大长度

我们知道消息有三种情况会成为死信，已经演示过了消息过期，接下来演示一下队列达到最大长度的情况。

在给声明队列(正常队列)时，给队列传参时，增加以下属性：

```java
map.put("x-max-length",6);
```

一旦达到最大长度，超出的部分将会成为死信。

我们把原来的队列删除，重新运行消费者c1创建队列。

![创建指定长度的队列](http://www.iocaop.com/images/2022-08/RSq837OZ9W42Hhl.png)

指定了队列的最大长度为6，停止正常队列消费者c1(使消息积压在正常队列中)，运行生产者，往队列里发10条不过期的消息，就会有四条成为死信，被转发到死信交换机，再发到死信队列。

![正常队列达到最大长度](http://www.iocaop.com/images/2022-08/202208182328581.png)

由图可以看出，正常队列达到最大长度以后，不会再接收消息，再往这个队列发消息，将会被转发给死信交换机，再到死信队列。

![死信队列增加了4条消息](http://www.iocaop.com/images/2022-08/202208182328206.png)

运行死信队列的消费者c2：

![死信队列消费者消费](http://www.iocaop.com/images/2022-08/202208182328160.png)

默认是队首的消息出队转发到死信队列，设置一下参数:

```java
map.put("x-overflow", "reject-publish-dlx");
```

就可以让后面发的消息直接转发到死信队列。

![队满后发送的消息直接进入死信队列](http://www.iocaop.com/images/2022-08/202208182328195.png)

## p55-死信队列-消息被拒

为了演示消息拒收成为死信，我们需要把之前队列里面的消息消费掉或者把队列删除，重新创建。创建队列时不指定队列中消息的过期时间和队列的最大长度。

发送消息也不知道消息过期时间。

消费者c1需要注释的代码如下:

```java
 // map.put("x-dead-letter-ttl",100000);
 // map.put("x-max-length",6);
 // map.put("x-overflow", "reject-publish-dlx");
```

将正常队列和死信队列删除。重新发送消息

![重新往不限制长度的队列中发送10条消息](http://www.iocaop.com/images/2022-08/202208182329404.png)

我们在正常队列的消费者代码中拒绝签收消息5：

```java
public class Consumer01 {

    private static final String DEAD_EXCHANGE = "dead_exchange";
    private static final String NORMAL_EXCHANGE = "normal_exchange";
    private static final String DEAD_QUEUE = "dead_queue";
    private static final String NORMAL_QUEUE = "normal_queue";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();

        // 声明正常队列和正常交换机
        channel.exchangeDeclare(NORMAL_EXCHANGE, BuiltinExchangeType.DIRECT, true);
        // 设置正常队列中的消息成为死信后转发到死信交换机
        HashMap<String, Object> map = new HashMap<>(16);
        // 这个地方可以设置正常队列的过期时间，但是一般是由生产者发送消息时设置，因为发送时可以给每条消息设置过期时间，更灵活
        // map.put("x-dead-letter-ttl",100000);
        // 指定队列长度
        // map.put("x-max-length",6);
        map.put("x-dead-letter-exchange", DEAD_EXCHANGE);
        map.put("x-dead-letter-routing-key", "lisi");
        // map.put("x-overflow", "reject-publish-dlx");
        channel.queueDeclare(NORMAL_QUEUE, true, false, false, map);

        // 声明死信队列和死信交换机
        channel.exchangeDeclare(DEAD_EXCHANGE, BuiltinExchangeType.DIRECT, true);
        channel.queueDeclare(DEAD_QUEUE, true, false, false, null);

        // 绑定正常队列到正常交换机
        channel.queueBind(NORMAL_QUEUE, NORMAL_EXCHANGE, "zhangsan");

        // 绑定死信队列到死信交换机
        channel.queueBind(DEAD_QUEUE, DEAD_EXCHANGE, "lisi");

        // 正常队列消费
        channel.basicConsume(NORMAL_QUEUE, false, (consumerTag, message) -> {
            if ("消息5".equals(new String(message.getBody(), "UTF-8"))) {
                System.out.println("正常队列拒绝消费：" + new String(message.getBody(), "UTF-8"));
                channel.basicNack(message.getEnvelope().getDeliveryTag(), false, false);
            } else {
                System.out.println("正常队列消费：" + new String(message.getBody(), "UTF-8"));
                channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
            }
        }, (consumerTag, message) -> {
            System.out.println("取消消费：" + consumerTag);
        });
    }
}
```

![启动正常队列消费者c1](http://www.iocaop.com/images/2022-08/202208182310423.png)

消费完后，死信队列增加了一条消息

![被拒绝的消息被放到了死信队列](http://www.iocaop.com/images/2022-08/202208182310424.png)

启动死信队列的消费者c2，验证消息是不是我们再c1拒收的消息

![死信队列消费者消费情况](http://www.iocaop.com/images/2022-08/202208182310741.png)

验证成功了，说明消息被拒收且reqeue为false(不放回原队列)，就会成为死信。

## p56-延迟队列

我们知道消息有三种情况会成为死信，其中一种就是消息过期成为死信。那么如果在上面的死信队列结构中，正常队列消费者c1永远都不消费消息。就成了延迟队列。

延迟队列的使用场景，

* 如订单10分钟内未支付则自动取消。
* 用户注册后三天未登录，则短信提醒。
* 用户发起退款，三天内没有处理，则通知相关人员。
* 预定会议，指定时间后通知相关人员

这些场景都有一个特点，就是在**指定场景之前或之后完成某一项任务**。

如果对时间要求不是很严格(不准确)，数据量不大(服务器、数据库压力大)、时效性不高的任务，也可以用定时任务。

火车票购买也是类似。

## p57-延迟消息-rabbitMQ整合springboot

创建module，继承父工程:

```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.6</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
```

web启动器:

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

整合mq需要用到的依赖:

```xml
           <!-- rabbitmq依赖 -->
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-amqp</artifactId>
           </dependency>
```

<a href='http://www.iocaop.com/2022/08/22/2022-my/%E4%B8%AD%E9%97%B4%E4%BB%B6/springboot%E6%95%B4%E5%90%88swagger3/'>整合swagger文档</a>:

```xml
		<dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-boot-starter</artifactId>
            <version>3.0.0</version>
        </dependency>
```

其他依赖:

```xml
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>2.0.10</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
```

项目配置文件:

```yml
spring:
  rabbitmq:
    host: www.iocaop.com
    port: 5672
    username: lzc
    password: 911823
    virtual-host: /
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher
```

## p58-延迟消息-架构图

![延迟消息架构图](http://www.iocaop.com/images/2022-08/202208222235967.png)

我们为了实现不同场景的业务，可能会有不同时长的延迟需求，所以这里设计了两个正常队列QA和QB，分别对应路由键XA和XB，需要注意的是QA和AB中的消息都是限制了有效期的，并且没有消费者消费消息，才能保证QA和QB中的消息必然成为死信。

Y为死信交换机、QD为死信队列、C为死信队列的消费者。

## p59-延迟消息-配置类代码

我们之前创建队列、交换机都是在消费者代码里面通过信道channel来实现的，现在整合了spring框架，就不需要这样了。声明队列、交换机以及他们之间的绑定关系都有专门的配置类来做。

```java
/**
 * ttl队列配置
 *
 * @author lzc
 * @date 2022/08/22
 */
@Configuration
public class TtlQueueConfig {

    /**
     * 正常队列QA名称
     */
    private static final String QUEUE_QA_NORMAL = "QA";
    /**
     * 正常队列QB名称
     */
    private static final String QUEUE_QB_NORMAL = "QB";
    /**
     * 正常交换机Y名称
     */
    private static final String EXCHANGE_X_NORMAL = "X";
    /**
     * 正常交换机和QA绑定的路由key
     */
    private static final String ROUTING_KEY_XA_NORMAL = "XA";
    /**
     * 正常交换机和QB绑定的路由key
     */
    private static final String ROUTING_KEY_XB_NORMAL = "XB";
    /**
     * 死信交换机Y名称
     */
    private static final String EXCHANGE_Y_DEAD = "Y";
    /**
     * 正常队列中消息成为死信后转发到死信交换机的路由key
     */
    private static final String ROUTING_KEY_YD_DEAD = "YD";
    /**
     * 死信队列QD名称
     */
    private static final String QUEUE_QD_DEAD = "QD";

    /**
     * 声明正常交换机X
     */
    @Bean("xExchange")
    public DirectExchange xExchange() {
        return new DirectExchange(EXCHANGE_X_NORMAL);
    }

    /**
     * 声明死信交换机Y
     */
    @Bean("yExchange")
    public DirectExchange yExchange() {
        return new DirectExchange(EXCHANGE_Y_DEAD);
    }

    /**
     * 声明正常队列QA
     */
    @Bean("qaQueue")
    public Queue qaQueue() {
        Map<String, Object> map = new HashMap<String, Object>(3);
        // 设置消息过期时间
        map.put("x-message-ttl", 10000);
        // 设置消息成为死信后转发的交换机
        map.put("x-dead-letter-exchange", EXCHANGE_Y_DEAD);
        // 设置消息成为死信后转发的路由key
        map.put("x-dead-letter-routing-key", ROUTING_KEY_YD_DEAD);
        return QueueBuilder.durable(QUEUE_QA_NORMAL).withArguments(map).build();
    }

    /**
     * 声明正常队列QB
     */
    @Bean("qbQueue")
    public Queue qbQueue() {
        Map<String, Object> map = new HashMap<String, Object>(3);
        // 设置消息过期时间
        map.put("x-message-ttl", 30000);
        // 设置消息成为死信后转发的交换机
        map.put("x-dead-letter-exchange", EXCHANGE_Y_DEAD);
        // 设置消息成为死信后转发的路由key
        map.put("x-dead-letter-routing-key", ROUTING_KEY_YD_DEAD);
        return QueueBuilder.durable(QUEUE_QB_NORMAL).withArguments(map).build();
    }

    /**
     * 声明死信队列QD
     */
    @Bean("qdQueue")
    public Queue qdQueue() {
        return QueueBuilder.durable(QUEUE_QD_DEAD).build();
    }

    /**
     * 正常队列QA和正常交换机X绑定
     * <p>
     * Qualifier注解可以从ioc中通过名称获取bean，获取我们刚才声明的队列和交换机
     *
     * @param qaQueue   qa队列
     * @param xExchange x交换机
     * @return {@link Binding}
     */
    @Bean
    public Binding bindingQaBindX(@Qualifier("qaQueue") Queue qaQueue,
        @Qualifier("xExchange") DirectExchange xExchange) {
        return BindingBuilder.bind(qaQueue).to(xExchange).with(ROUTING_KEY_XA_NORMAL);
    }


    /**
     * 正常队列QB和正常交换机X绑定
     * <p>
     * Qualifier注解可以从ioc中通过名称获取bean，获取我们刚才声明的队列和交换机
     *
     * @param qbQueue   qb队列
     * @param xExchange x交换机
     * @return {@link Binding}
     */
    @Bean
    public Binding bindingQbBindX(@Qualifier("qbQueue") Queue qbQueue,
        @Qualifier("xExchange") DirectExchange xExchange) {
        return BindingBuilder.bind(qbQueue).to(xExchange).with(ROUTING_KEY_XB_NORMAL);
    }

    /**
    * 死信队列QD和死信交换机Y绑定
    */
    @Bean
    public Binding bindingQdBindY(@Qualifier("qdQueue") Queue qdQueue,
        @Qualifier("yExchange") DirectExchange yExchange) {
        return BindingBuilder.bind(qdQueue).to(yExchange).with(ROUTING_KEY_YD_DEAD);
    }
    
}
```

## p60-延迟消息-生产者

这里为了测试，直接在controller中调用http接口发送消息。

```java
/**
 * ttl控制器发送信息
 *
 * @author lzc
 * @date 2022/08/22
 */
@RestController
@RequestMapping("/ttl")
@Api(tags = "延迟队列控制器")
@Slf4j
public class TtlSendMessageController {
    
    /**
     * 正常交换机Y名称
     */
    private static final String EXCHANGE_X_NORMAL = "X";
    /**
     * 正常交换机和QA绑定的路由key
     */
    private static final String ROUTING_KEY_XA_NORMAL = "XA";
    /**
     * 正常交换机和QB绑定的路由key
     */
    private static final String ROUTING_KEY_XB_NORMAL = "XB";

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RequestMapping(value = "/send/{message}",method = RequestMethod.GET)
    @ApiOperation("发送消息到不同的消息过期时间的队列")
    public String send(@PathVariable String message) {
        rabbitTemplate.convertAndSend(EXCHANGE_X_NORMAL, ROUTING_KEY_XA_NORMAL, "消息来自延迟队列XA(延迟10秒):"+message);
        rabbitTemplate.convertAndSend(EXCHANGE_X_NORMAL, ROUTING_KEY_XB_NORMAL, "消息来自延迟队列XB(延迟30秒):"+message);
        log.info("{}:发送消息：{},给了QA(延迟10秒)和QB(延迟30秒)两个队列", new Date(), message);
        return "success";
    }
}
```

## p64-延迟队列-消费者

springboot整合rabbitMQ以后，消息的消费是由监听器来完成的，所以需要加一个监听器。

```java
/**
 * 死信队列消费者
 *
 * @author lzc
 * @date 2022/08/22
 */
@Component
@Slf4j
public class DeadQueueConsumer {


    /**
     * 死信队列QD名称
     */
    private static final String QUEUE_QD_DEAD = "QD";

    @RabbitListener(queues = QUEUE_QD_DEAD)
    public void receiveD(Message message) {
        String msg = new String(message.getBody());
        log.info("接收到死信队列消息：{},当前时间{}", msg,new Date());
    }
}
```

> 需要注意的是导包应该是AMQP中的包，如果报错，配置文件中加上如下代码

```yml
spring:
  rabbitmq:
    listener:
      acknowledge-mode: manual
```

启动项目，通过swagger调用接口发送消息到两个队列，可以看到监听器打印出来的日志，分别过了10秒和30秒消费消息，延迟队列实现完毕。

![延迟队列消费](http://www.iocaop.com/images/2022-08/202208222349959.png)

## p62-延迟队列优化-过期时间由消息来指定

上面我我们是在队列的属性中设置了消息的过期时间，如果又有其他的不同时间的需求，又要增加队列，这是不合理的。在创建队列时，不设置消息的过期时间，而是由生产者在发消息时指定消息的属性来设置当前发送的消息的过期时间。

> 我们再创建一个队列QC来实现不同延迟需求的延迟队列。

![延迟队列话-队列不设置过期时间](http://www.iocaop.com/images/2022-08/202208232137471.png)

## p63-延迟队列优化-配置类代码

在原有代码基础上，增加一个队列QC

```java
    /**
     * 正常队列QC名称
     */
    private static final String QUEUE_QC_NORMAL = "QC";

    /**
     * 正常交换机和QC绑定的路由key
     */
    private static final String ROUTING_KEY_XC_NORMAL = "XC";
    /**
     * 声明正常队列QC
     */
    @Bean("qcQueue")
    public Queue qcQueue() {
        Map<String, Object> map = new HashMap<String, Object>(3);
        // 设置消息过期时间
//        map.put("x-message-ttl", 5000);
        // 设置消息成为死信后转发的交换机
        map.put("x-dead-letter-exchange", EXCHANGE_Y_DEAD);
        // 设置消息成为死信后转发的路由key
        map.put("x-dead-letter-routing-key", ROUTING_KEY_YD_DEAD);
        return QueueBuilder.durable(QUEUE_QC_NORMAL).withArguments(map).build();
    }
    /**
     * 正常队列QC和正常交换机X绑定
     *
     * @param qcQueue   qc队列
     * @param xExchange x交换
     * @return {@link Binding}
     */
    @Bean
    public Binding bindingQCBindX(@Qualifier("qcQueue") Queue qcQueue,
        @Qualifier("xExchange") DirectExchange xExchange) {
        return BindingBuilder.bind(qcQueue).to(xExchange).with(ROUTING_KEY_XC_NORMAL);
    }
```

![创建结果](http://www.iocaop.com/images/2022-08/202208232142486.png)

可以看到，QC没有TTL，即不在队列上设置消息的过期时间。

## p64-延迟队列优化-生产者

之前发消息没有再生产者指定消息的过期时间，因为是在队列中设置了消息过期时间，现在刚好相反：不在队列设置过期时间，而是在生产者发送消息时指定消息过期时间。

我们再写一个controller接口，发送指定过期时间的消息。

在发送消息的方法rabbitTemplate.convertAndSend()进入源码查看之前使用的方法：

![之前使用的](http://www.iocaop.com/images/2022-08/202208232158115.png)

现在需要设置消息的过期时间，所以需要使用它的重载方法:

![重载方法，可以设置消息的属性](http://www.iocaop.com/images/2022-08/202208232158155.png)

第四个参数是一个函数式接口，可以使用λ表达式

![参数4](http://www.iocaop.com/images/2022-08/202208232200273.png)

关键代码:

```java
(msg)->{
            MessageProperties messageProperties = msg.getMessageProperties();
            // 设置消息过期时间
            messageProperties.setExpiration(ttlSeconds*1000+"");
    		// 返回值根据函数式接口可以确定 
            return msg;
        }
```

```java
    /**
     * 正常交换机和QC绑定的路由key
     */
    private static final String ROUTING_KEY_XC_NORMAL = "XC";

    @RequestMapping(value = "/send/{message}/ttl",method = RequestMethod.GET)
    @ApiOperation("发送不同过期时间的消息到不设置过期时间的队列")
    public String send(@PathVariable String message,Integer ttlSeconds) {
        rabbitTemplate.convertAndSend(EXCHANGE_X_NORMAL, ROUTING_KEY_XC_NORMAL, "消息来自延迟队列XC(延迟"+ttlSeconds+"秒):"+message,(msg)->{
            MessageProperties messageProperties = msg.getMessageProperties();
            // 设置消息过期时间
            messageProperties.setExpiration(ttlSeconds*1000+"");
            return msg;
        });
        log.info("{}:发送消息：{},给了QC队列,过期时间:{}", new Date(), message,ttlSeconds);
        return "success";
    }
```

启动运行，效果：

![优化后的延迟队列运行效果](http://www.iocaop.com/images/2022-08/202208232211930.png)

结果出乎了意料。因为如果在消息属性上设置TTL的方式，**消息可能并不会按时死亡，因为RabbitMQ只会检查第一个消息是否过期，如果过期则丢到死信队列，那么如果第一个消息过期时间很长，而第二个消息过期时间很短，那么第二个消息并不会优先得到死亡(不会按时死亡)**。

## p66-基于插件的延迟队列

要想实现不一样的延迟需求，又不想创建队列。基于上面的优化，还是存在问题，是rabbitmq的缺陷，那么就要借助插件来实现更完美的延迟队列了。

<a href='https://www.rabbitmq.com/community-plugins.html'>插件下载</a>在页面中找到**rabbitmq_delayed_message_exchange**，进入<a href ='https://github.com/rabbitmq/rabbitmq-delayed-message-exchange'>github页面</a>。

在release版本(不用实时更新)中下载[rabbitmq_delayed_message_exchange-3.10.2.ez](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.10.2/rabbitmq_delayed_message_exchange-3.10.2.ez)

传到linux中的mq插件文件夹下。我的是：

```bash
/usr/lib/rabbitmq/lib/rabbitmq_server-3.9.12/plugins
```

然后运行命令

```bash
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```

失败了：

![延迟队列插件安装失败](http://www.iocaop.com/images/2022-08/202208232237137.png)

所以重新下载一个低版本的插件。重新上传，并删除高本版的插件。再运行命令。

![延迟队列插件安装成功](http://www.iocaop.com/images/2022-08/202208232239774.png)

重启rabbitmq

```bash
systemctl restart rabbitmq-server
```

重启后，到web界面增加交换机可以看到，出现了一个新的类型。

![安装插件后新增的交换机类型](http://www.iocaop.com/images/2022-08/202208232244364.png)

为什么是交换机类型？

![原来的延迟队列](http://www.iocaop.com/images/2022-08/202208232248195.png)

原来的延迟队列，是基于死信的，也就是消息死亡后转发到死信交换机。

现在，我们用插件来实现，和之前的不同。是在交换机上进行了延迟。

![插件延迟队列](http://www.iocaop.com/images/2022-08/202208232251230.png)

## p67-基于插件的延迟队列-配置类

![基于插件的延迟消息架构图](http://www.iocaop.com/images/2022-08/202208232252391.png)

和之前不一样的是，这里是通过交换机来进行延迟的，安装插件以后，mq中多了一种交换机的类型，所以我们在配置类中需要注意交换机的配置。

因为自定义的交换机类型，所以不用之前的mq自带的交换机类型了，而是使用CustomExchange，我们可以在构造函数中看参数:

![自定义交换机构造函数](http://www.iocaop.com/images/2022-08/202208232315575.png)

需要注意的是最后一个参数，是让我们设置交换机的参数，这里只需要设置延迟交换机的类型为direct即可(根据业务场景设置):

```java
       map.put("x-delayed-type","direct");
```

完整代码:

```java
/**
 * 基于插件的延迟队列配置
 *
 * @author lzc
 * @date 2022/08/23
 */
@Configuration
public class DelayQueueConfig {

    /**
     * 延迟队列
     */
    private final String DELAY_QUEUE = "delay.queue";

    /**
     * 延迟交换机
     */
    private final String DELAY_EXCHANGE = "delay.exchange";

    /**
     * 延迟交换机类型
     */
    private final String DELAY_EXCHANGE_TYPE = "x-delayed-message";

    /**
     * 延迟交换机绑定延迟队列的路由key
     */
    private final String DELAY_ROUTING_KEY = "delay.routing.key";

    /**
     * 延迟队列
     *
     * @return {@link Queue}
     */
    @Bean("delayQueue")
    public Queue delayQueue() {
       return QueueBuilder.durable(DELAY_QUEUE).build();
    }

    /**
     * 延迟交换机
     *
     * @return {@link CustomExchange}
     */
    @Bean("delayExchange")
    public CustomExchange delayExchange(){
       Map<String, Object> map = new HashMap<>(16);
       map.put("x-delayed-type","direct");
        return new CustomExchange(DELAY_EXCHANGE,DELAY_EXCHANGE_TYPE,true,false,map);
    }

    /**
     * 绑定
     *
     * @param delayQueue    延迟队列
     * @param delayExchange 延迟交换
     * @return {@link Binding}
     */
    @Bean
    public Binding binding(@Qualifier ("delayQueue") Queue delayQueue, @Qualifier ("delayExchange") Exchange delayExchange) {
        return BindingBuilder.bind(delayQueue).to(delayExchange).with(DELAY_ROUTING_KEY).noargs();
    }

}
```

运行，到管理界面查看交换机和队列的信息:

![基于插件实现的延迟队列](http://www.iocaop.com/images/2022-08/202208232335129.png)

## p68-基于插件的延迟队列-生产者

发送消息到基于插件实现的延迟队列，需要注意的是此处给消息设置过期时间时使用的方法是(基于死信的延迟队列是使用setExpiration):

```java
			// 设置消息过期时间
            messageProperties.setDelay(ttlSeconds*1000);
```



```java
    /**
     * 延迟交换机绑定延迟队列的路由key
     */
    private final String DELAY_ROUTING_KEY = "delay.routing.key";

    /**
     * 延迟交换机
     */
    private final String DELAY_EXCHANGE = "delay.exchange";

    @RequestMapping(value = "/send/{message}/delay",method = RequestMethod.GET)
    @ApiOperation("发送消息给基于插件的延迟队列")
    public String sendDelay(@PathVariable String message,Integer ttlSeconds) {
        rabbitTemplate.convertAndSend(DELAY_EXCHANGE, DELAY_ROUTING_KEY, "消息来自基于插件的延迟队列(延迟"+ttlSeconds+"秒):"+message,(msg)->{
            MessageProperties messageProperties = msg.getMessageProperties();
            // 设置消息过期时间
            messageProperties.setDelay(ttlSeconds*1000);
            return msg;
        });
        log.info("{}:发送消息：{},给了QC队列,过期时间:{}", new Date(), message,ttlSeconds);
        return "success";
    }
```

## p69-基于插件的延迟队列-消费者

```java
/**
 * 基于插件的延迟队列消费者
 *
 * @author lzc
 * @date 2022/08/23
 */
@Component
@Slf4j
public class DelayQueueConsumer {
    /**
     * 延迟队列
     */
    private final String DELAY_QUEUE = "delay.queue";

    @RabbitListener(queues = DELAY_QUEUE)
    public void receiveD(Message message) {
        String msg = new String(message.getBody());
        log.info("接收到基于插件的延迟队列消息：{},当前时间{}", msg,new Date());
    }
}
```

测试：先发一条20秒的延迟消息，再发一条2秒的延迟消息。看看会不会出现基于死信的延迟队列的那种问题。

![基于插件的延迟消息](http://www.iocaop.com/images/2022-08/202208232344620.png)

符合预期

## p70-延迟消息总结

本次学习了两种延迟消息：

- 基于死信的延迟队列
- 基于插件的延迟队列

延迟消息在需要延迟处理的场景下非常有用，因为rabbitmq可以利用特性：**消息可靠发送**、**消息可靠投递**、**消息持久化**，**死信队列**可以保障消息至少被消费一次以及未被处理的消息不会丢失，以及**手动签收**来保证消息至少被消费一次，另外利用**mq集群**，可以解决mq单点故障。

当然，延迟队列还有其他选择：

* java的delayQueue(无法保证消息不丢失)
* redis的zset
* Quartz
* kafka时间轮

看场景选择。

## p71-发布高级确认

之前学习的单个发布确认、批量发布确认、异步发布确认只是打印了发布失败的消息，并没有处理。现在来学一下。

我们知道，当发送消息给mq时，如果mq挂了或者重启了(不明原因)，接受不到消息导致生产者消息投递失败，消息丢失 ，那么我们只能手动处理消息、恢复了，那么怎么更好的保证消息投递的可靠性呢？

![确认机制方案](http://www.iocaop.com/images/2022-08/202208242050113.png)

分析一下：

* 当生产者发送消息给交换机，交换机挂了，消息会丢失，应该放到缓存。
* 当生产者发送消息给交换机，交换机没挂，队列挂了，消息也会丢弃，也应该放到缓存。
* 当生产者发送消息给交换机，交换机和队列都挂了，消息也会丢弃，更应该放到缓存。
* 当交换机恢复，收到消息后，应该从缓存中删除消息，队列又不存在，消息也会丢弃。

缓存中的消息用定时任务，重新投递。

问题是：生产者根本不知道交换机和队列挂没挂，消息发完，就没有回音了，怎么办？

## p72-发布确认高级-配置类

本次实验的架构图：

![实验架构图](http://www.iocaop.com/images/2022-08/202208242058343.png)

先把上面这个图的效果实现一下：

创建队列和交换机:

```java
/**
 * 发布确认交换机和队列的配置
 *
 * @author lzc
 * @date 2022/08/24
 */
@Configuration
public class ConfirmConfig {

    /**
     * 交换机名称
     */
    public static final String CONFIRM_EXCHANGE = "confirm.exchange";

    /**
     * 发布确认队列和交换机的路由key
     */
    public static final String CONFIRM_ROUTING_KEY = "key1";

    /**
     * 发布确认队列
     */
    public static final String CONFIRM_QUEUE = "confirm.queue";


    /**
     * 确认队列
     *
     * @return {@link Queue}
     */
    @Bean("confirmQueue")
    public Queue confirmQueue() {
        return QueueBuilder.durable(CONFIRM_QUEUE).build();
    }

    /**
     * 确认交换机
     *
     * @return {@link DirectExchange}
     */
    @Bean("confirmExchange")
    public DirectExchange confirmExchange() {
        return new DirectExchange(CONFIRM_EXCHANGE, true, false, null);
    }

    @Bean
    public Binding queueBindExchange(@Qualifier("confirmQueue") Queue confirmQueue,
        @Qualifier("confirmExchange") DirectExchange confirmExchange){
        return BindingBuilder.bind(confirmQueue).to(confirmExchange).with(CONFIRM_ROUTING_KEY);
    }
}
```

## p73发布确认高级-生产者和消费者

生产者：

```java
/**
 * 确认控制器发送信息
 *
 * @author lzc
 * @date 2022/08/24
 */
@RestController
@RequestMapping("/confirm")
@Api(tags = "高级确认发布消息队列控制器")
@Slf4j
public class ConfirmSendMessageController {

    /**
     * 交换机名称
     */
    public static final String CONFIRM_EXCHANGE = "confirm.exchange";

    /**
     * 发布确认队列和交换机的路由key
     */
    public static final String CONFIRM_ROUTING_KEY = "key1";

    /**
     * 发布确认队列
     */
    public static final String CONFIRM_QUEUE = "confirm.queue";

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RequestMapping(value = "/send/{message}",method = RequestMethod.GET)
    @ApiOperation("发送消息到不同的消息过期时间的队列")
    public String send(@PathVariable String message) {
        rabbitTemplate.convertAndSend(CONFIRM_EXCHANGE, CONFIRM_ROUTING_KEY, "消息来自确认发布队列:"+message);
        log.info("{}:发送消息：{},确认发布队列", new Date(), message);
        return "success";
    }
}

```

消费者:

```java
/**
 * 确认队列使用者
 *
 * @author lzc
 * @date 2022/08/24
 */
@Component
@Slf4j
public class ConfirmQueueConsumer {
    /**
     * 发布确认队列
     */
    public static final String CONFIRM_QUEUE = "confirm.queue";

    @RabbitListener(queues = CONFIRM_QUEUE)
    public void receiveD(Message message) {
        String msg = new String(message.getBody());
        log.info("接收到发布确认队列消息：{},当前时间{}", msg,new Date());
    }
}
```

测试一下，没问题

![发布确认实验开始前测试](http://www.iocaop.com/images/2022-08/202208242121565.png)

## p75-发布确认高级-回调接口

目前是没问题的，就怕交换机或者队列出问题。所以需要一个回调，通知生产者消息发送的状态。

在RabbitTemplate中有一个内部接口，ConfirmCallback：

![ConfirmCallback内部接口](http://www.iocaop.com/images/2022-08/202208242153494.png)

![内部接口定义](http://www.iocaop.com/images/2022-08/202208242153696.png)

我们给这个接口写一个实现类，并交给ioc管理：

```java
/**
 * 交换机确认回调
 *
 * @author lzc
 * @date 2022/08/24
 */
@Slf4j
@Component
public class MyCallBack implements RabbitTemplate.ConfirmCallback {

    @Autowired
    RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init(){
        rabbitTemplate.setConfirmCallback(this);
    }

    /**
     * 交换机确认回调的方法
     *
     * @param correlationData 消息相关的信息，如tag
     * @param ack             是否发布成功
     * @param cause           发布失败的异常信息，发布成功的话是null
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
       if (ack){
           log.info("交换机已经收到了消息,id:{}",correlationData.getId());
       }else {
           log.info("交换机没有收到消息,id:{},异常信息:{}",correlationData.getId(),cause);
       }
    }
}
```

> 需要注意的是，除了重写confirm方法，还需要给rabbitTemplate设置回调方法的对象。首先注入rabbitTemplate，在调用被@PostConstruct所注解的方法来设置ConfirmCallback对象。

## p75-发布确认高级-交换机确认

我们要知道，这个回调方法是生产者发布消息以后，进行回调的，那么，就需要修改生产者发送消息时的代码，使用重载的方法:

![带有消息关联数据的发布方法](http://www.iocaop.com/images/2022-08/202208242214381.png)

将方法调用修改为：

```java
        CorrelationData correlationData = new CorrelationData();
        correlationData.setId(UUID.randomUUID().toString());
        rabbitTemplate.convertAndSend(CONFIRM_EXCHANGE, CONFIRM_ROUTING_KEY, "消息来自确认发布队列:"+message,correlationData);
```

我们重启，发现并没有回调成功，因为还没有配置。

修改application.yml，增加下面的配置

```java
publisher-confirm-type: correlated
```

如果是SIMPLE，对应了单个发布确认和异步发布确认，详细解释：<a href = 'https://blog.csdn.net/yaomingyang/article/details/108410286'>配置值的解释</a>

配置后启动，发送消息：

![发布到交换机成功，队列成功](http://www.iocaop.com/images/2022-08/202208242227622.png)

我们把生产者发送时的交换机改成一个不存在的值,可以看到打印了异常信息：

![发布到交换机失败](http://www.iocaop.com/images/2022-08/202208242229165.png)

我们再把交换机改成正确的，把routingKey改成不正确的：

![发布到交换机成功，到队列失败](http://www.iocaop.com/images/2022-08/202208242232712.png)

发现，交换机的回调显示成功，但并没有消费消息。可以看出，是消息到达了交换机，但没有到达队列。

## p76-发布确认高级(回退消息)

如果交换机在给队列投递消息时，发现该消息不可路由，即队列不存在，或没有绑定对应的routingKey的队列，消息就会丢失。为了不丢失，需要回退消息。

需要在application.yml，增加下面的配置

```yml
publisher-returns: true
```

并且在刚才的实现类MyCallBack上，再实现一个接口:RabbitTemplate.ReturnsCallback并重写方法，设置rabbitTemplate的returnsCallback回调对象为当前对象。

完整代码：

```java
/**
 * 交换机确认回调
 *
 * @author lzc
 * @date 2022/08/24
 */
@Slf4j
@Component
public class MyCallBack implements RabbitTemplate.ConfirmCallback,RabbitTemplate.ReturnsCallback {

    @Autowired
    RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init(){
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnsCallback(this);
    }

    /**
     * 交换机确认回调的方法
     *
     * @param correlationData 消息相关的信息，如tag
     * @param ack             是否发布成功
     * @param cause           发布失败的异常信息，发布成功的话是null
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
       if (ack){
           log.info("交换机已经收到了消息,id:{}",correlationData.getId());
       }else {
           log.info("交换机没有收到消息,id:{},异常信息:{}",correlationData.getId(),cause);
       }
    }


    @Override
    public void returnedMessage(ReturnedMessage returned) {
        Message message = returned.getMessage();
        String exchange = returned.getExchange();
        String routingKey = returned.getRoutingKey();
        int replyCode = returned.getReplyCode();
        String replyText = returned.getReplyText();

        log.info("消息:\"{}\",被交换机{}返回,key为{},replyText为{}",new String(message.getBody()),exchange,routingKey,replyText);
    }
}
```

我们再来发一个能到交换机却不能到队列的消息：

![效果图](http://www.iocaop.com/images/2022-08/202208242309993.png)

在回调方法里，可以把消息保存到缓存中，设置定时任务重新发送。或者使用备份交换机

## p77-备份交换机(配置类)

当交换机无法路由消息到队列时，我们可以把消息转发给备份交换机，再利用广播模式 路由给备份队列和报警队列，进行处理。

![备份交换机架构图](http://www.iocaop.com/images/2022-08/202208242320413.png)

修改配置类：

```java
/**
 * 发布确认交换机和队列的配置
 *
 * @author lzc
 * @date 2022/08/24
 */
@Configuration
public class ConfirmConfig {

    /**
     * 交换机名称
     */
    public static final String CONFIRM_EXCHANGE = "confirm.exchange";

    /**
     * 发布确认队列和交换机的路由key
     */
    public static final String CONFIRM_ROUTING_KEY = "key1";

    /**
     * 发布确认队列
     */
    public static final String CONFIRM_QUEUE = "confirm.queue";

    /**
     * 备份交换机
     */
    public static final String BACKUP_EXCHANGE = "backup.exchange";

    /**
     * 备份队列
     */
    public static final String BACKUP_QUEUE = "backup.queue";

    /**
     * 报警队列
     */
    public static final String WARING_QUEUE = "waring.queue";


    /**
     * 确认队列
     *
     * @return {@link Queue}
     */
    @Bean("confirmQueue")
    public Queue confirmQueue() {
        return QueueBuilder.durable(CONFIRM_QUEUE).build();
    }

    /**
     * 确认交换机
     *
     * @return {@link DirectExchange}
     */
    @Bean("confirmExchange")
    public DirectExchange confirmExchange() {
        Map<String, Object> map = new HashMap<>(1);
        map.put("alternate-exchange",BACKUP_EXCHANGE);
        return  ExchangeBuilder.fanoutExchange(CONFIRM_EXCHANGE).durable(true).withArguments(map).build();

    }

    /**
     * 队列绑定交换
     *
     * @param confirmQueue    确认队列
     * @param confirmExchange 确认交易
     * @return {@link Binding}
     */
    @Bean
    public Binding queueBindExchange(@Qualifier("confirmQueue") Queue confirmQueue,
        @Qualifier("confirmExchange") DirectExchange confirmExchange) {
        return BindingBuilder.bind(confirmQueue).to(confirmExchange).with(CONFIRM_ROUTING_KEY);
    }

    /**
     * 备份队列
     *
     * @return {@link Queue}
     */
    @Bean("backupQueue")
    public Queue backupQueue() {
        return QueueBuilder.durable(BACKUP_QUEUE).build();
    }

    /**
     * 报警队列
     *
     * @return {@link Queue}
     */
    @Bean("warningQueue")
    public Queue warningQueue() {
        return QueueBuilder.durable(WARING_QUEUE).build();
    }

    /**
     * 备份交换机
     */
    @Bean("backupExchange")
    public FanoutExchange backupExchange() {
        return new FanoutExchange(BACKUP_EXCHANGE);
    }

    /**
     * 备份交换机绑定备份队列
     */
    @Bean
    public Binding backupQueueBindBackupExchange(@Qualifier("backupQueue") Queue queue,
        @Qualifier("backupExchange") FanoutExchange fanoutExchange){
        return BindingBuilder.bind(queue).to(fanoutExchange);
    }

    /**
     * 备份交换机绑定报警队列
     */
    @Bean
    public Binding warningQueueBindBackupExchange(@Qualifier("warningQueue") Queue queue,
        @Qualifier("backupExchange") FanoutExchange fanoutExchange){
        return BindingBuilder.bind(queue).to(fanoutExchange);
    }

}
```

需要注意的是，确认队列需要设置备份交换机，在创建交换机时指定参数：

```java
map.put("alternate-exchange",BACKUP_EXCHANGE);
```

消息就会在路由失败时转发给备份交换机，再路由到备份队列和报警队列。

报警队列消费者：

```java
/**
 * 消息路由失败消费者
 *
 * @author lzc
 * @date 2022/08/24
 */
@Component
@Slf4j
public class WarningConsumer {

    /**
     * 报警队列
     */
    public static final String WARING_QUEUE = "waring.queue";

    @RabbitListener(queues = WARING_QUEUE)
    public void receiveD(Message message) {
        String msg = new String(message.getBody());
        log.error("消息：{},路由失败,已备份至备份队列当前时间{}", msg,new Date());
    }

}
```

## p78-备份交换机-结果分析

删除原来的确认交换机，重启服务。

![配置了备份交换机](http://www.iocaop.com/images/2022-08/202208242345313.png)

发一条路由失败的消息试试：

![效果](http://www.iocaop.com/images/2022-08/202208242347938.png)

![备份队列](http://www.iocaop.com/images/2022-08/202208242349205.png)

备份队列有消息了(发了4次)，报警消息已经消费，并且没有打印消息回退的信息，说明没有调用消息回退的callback，而是由原来的交换机转发给了备份交换机，再广播给了备份队列和报警队列。

## p79-其他知识点(课程没有详细讲，可以看黑马的教程)

问题说明：

* 幂等性问题：用户对同一操作发起的一次请求或者多次请求是一直的，不会因为多次重复操作产生副作用。简单的说就是<span style = 'background:pink;'>重复提交</span>。单应用中，只需要把数据操作放到事务即可，发生错误立即回滚，但是在响应客户端时，会网络中断或者异常。相当于消息被重复消费了。
* 消息重复消费，消费者在给MQ返回ack时网络中断，mq没有收到确认信息，这条消息就会被其他消费者消费，或者网络重连时再发给该消费者，造成消息重复消费。

解决思路：

生成全局唯一id，每次消费消息时用id来判断该消息是否消费过。

生产端可能会因为各种原因(如业务高峰期)产生重复的消息，那么消费端就要保证<span style = 'background:pink;'>不重复消费消息</span>，意味着同样的消息永远不会被消费多次，实现幂等性。

主流操作：

* 唯一id+指纹码机制

​		由某些业务规则或者时间戳，生成唯一信息码，利用查询语句判断这个id是否存在数据库中，就是一个简单的拼接，查询判断是否重复，但是单个数据库写入性能会有瓶颈(可分库分表，但不推荐)。

* redis原子性(推荐)

  利用setnx的幂等性。

## p80-优先级队列-场景说明

使用场景：订单催付，比如在tmall下单后，如果用户在规定时间内没有付款，就发短信或推送。就需要区分大客户和小客户，利润大的就优先推送处理。曾经是用redis存放，然后定时轮询，redis的List只能做简单的消息队列，不能够实现优先级的场景。用rabbitMQ可以进行改造和优化，大客户就给高的优先级，否则是默认优先级，进行推送。

> 消费者在消费消息时，按照队列中消息的优先级，重新排序，再优先消费优先级最高的消息。

优先级是有顺序的，0-255，数字越大越越优先。

![image-20220916112553368](http://www.iocaop.com/images/2022-09/202209161125554.png)

## p81-优先级队列-代码实现

创建队列时，设置队列优先级的最大值，然后发送消息时给消息设置优先级(需要在队列最大优先级之内)。

> 需要注意的是。生成者发送消息时要把所有消息都发送到优先级队列里来，再由消费者消费，不然发一条消费一条，队列中的消息没有排序。

生成者代码：

```java
/**
 * 优先级队列生产者
 *
 * @author lzc
 * @date 2022/09/16
 */
public class Product {

    public static final String PRIORITY_QUEUE_NAME = "priority_queue_name";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        Map<String, Object> map = new HashMap<>();
        // 设置队列的最大优先级，不要太大，会影响性能
        map.put("x-max-priority", 10);
        channel.queueDeclare(PRIORITY_QUEUE_NAME, true, false, false, map);
        for (int i = 0; i < 10; i++) {
            // 发送消息，为消息5设置优先级为5，其他不设置
            BasicProperties properties = null;
            if (i==5){
                properties = new BasicProperties().builder().priority(1).build();
            }
            channel.basicPublish("",PRIORITY_QUEUE_NAME, properties, ("消息"+i).getBytes());

        }
    }
}
```

运行后到控制台可以看到队列创建，收到消息。

![image-20220916122319874](http://www.iocaop.com/images/2022-09/202209161223974.png)

消费者代码：

```java
/**
 * 优先级队列消费者
 *
 * @author lzc
 * @date 2022/09/16
 */
public class Consumer {
    public static final String PRIORITY_QUEUE_NAME = "priority_queue_name";
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();
        channel.basicConsume(PRIORITY_QUEUE_NAME,true,(consumerTag, message) -> {
            System.out.println(new String(message.getBody()));
        },consumerTag -> {
            System.out.println("消息取消消费");
        });
    }
}
```

结果：由于消息5的优先级是5，其他消息没有设置优先级，所以消息5优先消费。

![image-20220916122832033](http://www.iocaop.com/images/2022-09/202209161228115.png)

## p82-惰性队列

惰性(lazy)队列：消息保存在磁盘中，消费者消费，需要从磁盘读取到内存中进行消费(速度更慢)。适合消息堆积(如消费者宕机)时使用。消息很多，存在磁盘中则不会对内存造成压力。但是执行性能没有正常队列好，默认是用正常队列。

正常(default)队列：消息保存在内存中

声明队列时添加参数:
```java
map.put("x-queue-mode","lazy")
```

内存开销对比：发送100w条消息，每条占1kb的情况下。普通队列占用内存1.2GB，惰性队列占用1.5MB(索引占用)

## p83-集群原理

![image-20220916154404892](http://www.iocaop.com/images/2022-09/202209161544041.png)

可以像黑色部分，node3和node2连接node1成为集群。在这基础上，node4再连接node3也是可以的。

## p84-搭建集群

* 搭建集群之前准备了两台服务器。

  分别修改hostname

  ```bash
  vim /etc/hostname
  ```

  节点1lzc、节点2oldhu

  分别在服务器中加入对方的地址:

  ```bash
  vim /etc/hosts
  ```

  为什么加？不加后面加入集群命令时会报错。<a href='https://blog.csdn.net/qq_44338476/article/details/123043300'>点击跳转</a>

* 停掉两台服务器中的mq

  ```bash
  service rabbitmq-server stop
  ```

  

* 需要确保各节点cookie使用的是同一个值，所以要手动拷贝cookie文件，或者使用远程拷贝

  ```bash
  scp /var/lib/rabbitmq/.erlang.cookie root@host:/var/lib/rabbitmq/.erlang.cookie
  ```

  ![image-20220916161422606](http://www.iocaop.com/images/2022-09/202209161615724.png)

* 启动 RabbitMQ 服务,顺带启动 Erlang 虚拟机和 RbbitMQ 应用服务(所有节点都需要启动)

  ```bash
  rabbitmq-server -detached
  ```

* 我们让lzc为主节点，即将oldhu加入到lzc

* 在oldhu服务器运行：

  ```bash
  # rabbitmqctl stop 会将Erlang 虚拟机关闭，rabbitmqctl stop_app 只关闭 RabbitMQ 服务
  rabbitmqctl stop_app
  rabbitmqctl reset
  rabbitmqctl join_cluster rabbit@lzc
  # 只启动应用服务
  rabbitmqctl start_app
  # 查看集群状态 
  rabbitmqctl cluster_status
  ```
  
  集群状态：
  
  ![image-20220916173818221](http://www.iocaop.com/images/2022-09/202209161738345.png)
  
* 为集群创建账户(命令不做注释，之前有使用过)

  ```bash
  rabbitmqctl add_user lzc 911823
  rabbitmqctl set_user_tags admin administrator
  rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
  ```

* 登录web页面查看(集群搭建完成)

  ![image-20220916174042044](http://www.iocaop.com/images/2022-09/202209161740118.png)

## p85-镜像队列-解决什么问题？

我们搭建完集群后，两台服务器中的队列是独立的(不可复用的)。简单的说，我们在lzc这个节点中创建队列hello，然后lzc节点宕机，连接oldhu节点，是拿不到hello队列的。

* 使用one包中的生产者创建队列，发送消息。结果如下：

![image-20220916180549259](http://www.iocaop.com/images/2022-09/202209161805343.png)

* 手动停止lzc节点。（只关掉mq服务，不关虚拟机）

  ![image-20220916180905844](http://www.iocaop.com/images/2022-09/202209161809917.png)

  可以从oldhu节点的管理界面看到：

  ![image-20220916181152579](http://www.iocaop.com/images/2022-09/202209161811662.png)

  管理界面明确显示了这个队列是属于节点lzc的，所以我们再通过java代码，访问oldhu这个节点去消费该队列的消息时会报错的。

  ![image-20220916181731020](http://www.iocaop.com/images/2022-09/202209161817123.png)

* 再次启动节点lzc(模拟宕机后又恢复)

  到管理页面查看，发现消息竟然丢失了(没有被消费，并且是队列持久化的)。

  (在集群情况下，即使队列是持久化的，宕机重启后，队列中的消息还是会丢失)

  > 实验了下：消息也持久化就不会丢失。

  ![image-20220916183938494](http://www.iocaop.com/images/2022-09/202209161839569.png)

  

​			

## p85-镜像队列-使用

发消息发给一个节点，消息再备份到其他节点，那么信息就有多份。

在web界面添加策略

![image-20220917000734825](http://www.iocaop.com/images/2022-09/202209170007979.png)

![image-20220917000754393](http://www.iocaop.com/images/2022-09/202209170007469.png)

配置完以后，修改队列名以mirror开头，查看：

![image-20220917001024035](http://www.iocaop.com/images/2022-09/202209170010115.png)

![image-20220917001044007](http://www.iocaop.com/images/2022-09/202209170010083.png)

## p86-实现高可用负载均衡

![image-20220917002054127](http://www.iocaop.com/images/2022-09/202209170020250.png)

搭建步骤：<a href='http://www.iocaop.com/posts/2022-my/%E4%B8%AD%E9%97%B4%E4%BB%B6/haproxy+Keepalive%E9%AB%98%E5%8F%AF%E7%94%A8mq.html'>点击跳转</a>

说明：haproxy中配置了多台mq。并且haproxy会有多台备机，当主机宕机以后，可以通过Keepalive将ip漂移到备机，让生产者访问备机的haproxy，再转发到mq。
