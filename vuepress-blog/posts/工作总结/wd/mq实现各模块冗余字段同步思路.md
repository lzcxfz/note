---
title: mq实现各模块冗余字段同步思路
date: 2022-08-20
category:
  - RabbitMQ	
  - 中间件
---

##### 我的思路

项目中很多模块，存在冗余字段，情况很多，枚举了一些情况：

>情况1：用户模块改了数据，需要同步给所有的模块  1->N 
>情况2：考试模块改了数据，只需要同步到学习项目和课程模块 N->N 
>情况3：学习项目改了数据，只需要同步一下学习项目模块的其他表  1->1 
>情况4：多个模块改了数据，需要同步到一个模块，比如学习项目需要同步其他几个模块的数据 N->1 

想通过mq服务间通信，源字段修改后，服务发消息给各模块(冗余了这个字段的模块)，

* 消息体中携带消费者需要修改的表名、字段名、字段值、修改的条件。
* 或者消息体中携带(生产者)修改的表名、字段名、字段值、修改的条件。

消费者生成sql实现同步(上面二选一)。

##### mq交换机模式的选择和路由键的设计：

​	所有模块共用一个主题模式交换机field_sync_exchange，

* routingKey设计 : field.sync.#.模块名.# 
* 每个模块一个队列，命名随意，但是需要绑定正确的routingKey

架构图：

![image-20220830001321206](http://www.iocaop.com/images/2022-08/202208300013280.png)

生产者在发送消息时，只要routingKey为field.sync开头，并且带有模块名，对应的模块就能收到消息，比如：

field.sync.exam就只有考试模块能收到消息，field.sync.exam.survey.project那么考试、调研、学习项目都能收到消息。所以写了一个key拼接工具package com.wunding.learn.common.field.sync.utils.FieldSyncKeyBuilder。

```java
/**
 * @program: mlearn
 * @description: <p>动态创建key</p>
 * @author: 赖卓成
 * @create: 2022-08-29 15:32
 **/
@Component
public class FieldSyncKeyBuilder {

    // private static final Unsafe unsafe = Unsafe.getUnsafe();


    // 测试后发现，key拼接工具存在并发问题，想动态创建key又想保证正确性，需要加本地锁，不需要分布式锁。

    private StringBuilder key;


    public FieldSyncKeyBuilder () {
        key = new StringBuilder();
        this.key.append("field.sync");
    }

    public FieldSyncKeyBuilder toExam() {
        this.key = this.key.append(".exam");
        return this;
    }

    public FieldSyncKeyBuilder toSurvey() {
        this.key = this.key.append(".survey");
        return this;
    }

    public FieldSyncKeyBuilder toLive() {
        this.key = this.key.append(".live");
        return this;
    }

    public FieldSyncKeyBuilder toCourse() {
        this.key = this.key.append(".course");
        return this;
    }

    public FieldSyncKeyBuilder toProject() {
        this.key = this.key.append(".project");
        return this;
    }

    public String getKey() {
        String key = this.key.toString();
        this.key = this.key.delete(0, this.key.length());
        this.key.append("field.sync");
        return key;
    }

}

```

> 需要注意的是，在调用时需加本地锁，保证key的正确性

如：

```java
    @Test
    public void test() {

        for (int i = 0; i < 100000; i++) {
            new Thread(() -> {
                String key = null;
                synchronized (this) {
                    key = fieldSyncKeyBuilder
                        .toExam().toProject().toSurvey().getKey();
                }

                System.out.println(
                    "routingKey = " + key);
            }).start();
        }
    }
```

发消息时报错，又加上了两个配置类com.wunding.learn.common.field.sync.config.RabbitConsumerConfig和com.wunding.learn.common.field.sync.config.RabbitProducerConfig:

```java
@Configuration
public class RabbitConsumerConfig {
    @Bean
    public MessageConverter jsonMessageConverter(ObjectMapper objectMapper) {
        return new Jackson2JsonMessageConverter(objectMapper);
    }
}
```

```java
@Configuration
public class RabbitProducerConfig implements InitializingBean {
    /** * 自动注入RabbitTemplate模板 */
    @Resource
    private RabbitTemplate rabbitTemplate;

    /** * 发送消息JSON序列化 */
    @Override
    public void afterPropertiesSet() {

        //使用JSON序列化
        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
    }
}
```

##### 目前存在的问题：

* 反序列化类型不正确:

![image-20220830001846515](http://www.iocaop.com/images/2022-08/202208300018628.png)

* dto对象怎么定义？怎么把这个玩意做得通用一点？