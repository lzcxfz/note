---
title: Spring高级
date: 2023-05-23
category:
  - spring
---

课程链接：<a href='https://www.bilibili.com/video/BV1P44y1N7QG/?spm_id_from=333.337.search-card.all.click&vd_source=6b124edbdeb4ac28a33fb392c361d256'>点击跳转</a>

### 01-BeanFactory与ApplicationContext

依赖：

```xml
    <dependencies>
        <!--  web启动器    -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!--   starter     -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
    </dependencies>
```

创建Spring容器

```java
/**
 * BeanFactory 与 ApplicationContext的区别
 *
 * @author 赖卓成
 * @date 2023/05/29
 */
@SpringBootApplication
public class A01Application {

    public static void main(String[] args) {

        // 返回的是Spring的容器
        ConfigurableApplicationContext applicationContext = SpringApplication.run(A01Application.class, args);
    }

}
```

`ConfigurableApplicationContex`是`ApplicationContext`的子接口。

![image-20230529124938109](http://www.iocaop.com/images/2023-05/image-20230529124938109.png)

> ctrl+alt+u可以查看类图

可以看到`ApplicationContext`间接继承了`BeanFactory`接口，同时也继承了其他的一些接口(为了扩展功能)。

**到底什么是`BeanFactory`：**

* 它是`ApplicationContext`的父接口
* 它才是`Spring`的核心容器，主要的`ApplicationContext`实现都组合了它的功能。

组合二字如何理解？

![image-20230614144006058](http://www.iocaop.com/images/2023-06/image-20230614144006058.png)

![image-20230614144226720](http://www.iocaop.com/images/2023-06/image-20230614144226720.png)

在使用`ConfigurableApplicationContext`获取Bean时，是调用了`BeanFactory`中的方法，而不是由`ConfigurableApplicationContext`来实现的，所以说是在内部组合了一个`BeanFactory`且组合了他的功能，简单的说`BeanFactory` 是`ApplicationContext`的成员变量。通过打断点调试或翻看源码可以证明：

![image-20230614145820372](http://www.iocaop.com/images/2023-06/image-20230614145820372.png)

在`BeanFactory`中可以看到` singletonObjects`，里面存放的是单例bean。

> 快捷键：ctrl+alt+b查看实现类，ctrl+b查看接口

### 02-BeanFactory的功能

接口中的所有方法：

![image-20230614150354169](http://www.iocaop.com/images/2023-06/image-20230614150354169.png)

表面上是只有`getBean`，实际<span style="background-color:pink;">控制反转、基本的依赖注入、Bean的生命周期的各种功能</span>，都在它的实现类进行了实现。

具体是在`DefaultListableBeanFactory`对这些功能进行了实现：

![image-20230614151826379](http://www.iocaop.com/images/2023-06/image-20230614151826379.png)

> 快捷键：在类图中按f4可以跳转到对应类的源码。

其中`DefaultSingletonBeanRegistry`管理了单例bean,在该类，有个Map集合，放了所有的单例bean，key是实例的名称，value就是实例：

![image-20230614152203349](http://www.iocaop.com/images/2023-06/image-20230614152203349.png)

这个map是私有的，有两种方式可以看，debug和反射。debug不方便，所以使用反射来拿到这个map，看看里面有些什么，打印了一大堆的bean出来。

```java
@SpringBootApplication
public class A01Application {

    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {

        // 返回的是Spring的容器
        ConfigurableApplicationContext applicationContext = SpringApplication.run(A01Application.class, args);

        // 通过BeanFactory获取bean
        System.out.println(applicationContext);
        Field field = DefaultSingletonBeanRegistry.class.getDeclaredField("singletonObjects");
        field.setAccessible(true);
        Map<String,Object> map = (Map<String, Object>) field.get(applicationContext.getBeanFactory());
        System.out.println("map = " + map);
    }

}
```

![image-20230614182104965](http://www.iocaop.com/images/2023-06/image-20230614182104965.png)

自定义两个组件，看看能不能拿到：

![image-20230614182442229](http://www.iocaop.com/images/2023-06/image-20230614182442229.png)

```java
@SpringBootApplication
public class A01Application {

    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {

        // 返回的是Spring的容器
        ConfigurableApplicationContext applicationContext = SpringApplication.run(A01Application.class, args);

        // 通过BeanFactory获取bean
        System.out.println(applicationContext);
        Field field = DefaultSingletonBeanRegistry.class.getDeclaredField("singletonObjects");
        field.setAccessible(true);
        Map<String,Object> map = (Map<String, Object>) field.get(applicationContext.getBeanFactory());
        map.entrySet().stream().filter(entry -> entry.getKey().startsWith("component")).forEach(System.out::println);
    }

}
```

可以拿到：

![image-20230614182738443](http://www.iocaop.com/images/2023-06/image-20230614182738443.png)

### 03-ApplicationContext功能1

#### 国际化

之前讲过，`ApplicationContext`接口继承了`BeanFactory`接口，扩展了功能，扩展的功能主要是因为继承了下面四个接口：

![image-20230615110657696](http://www.iocaop.com/images/2023-06/image-20230615110657696.png)

* `MessageSource`：提供了<span style="background-color:pink;">处理国际化资源</span>的能力。

* `ResourcePatternResolver`：提供了<span style="background-color:pink;">通过通配符匹配资源</span>的能力,(从磁盘路径，类路径找文件)。
* `ApplicationEventPublisher`：提供了<span style="background-color:pink;">发布事件对象</span>的能力。

* `EnvironmentCapable`：提供spring中的环境信息，如读取系统环境变量、读取`properties`文件、读取`yml`文件。

先来学习功能1，国际化`MessageSource`：

`MessageSource`会根据我们预先配置好的`messages.properties`帮我们翻译：

![image-20230615113331825](http://www.iocaop.com/images/2023-06/image-20230615113331825.png)

配置：<a href='https://blog.csdn.net/weixin_39960529/article/details/86571962'>点击跳转</a>

通过applicationContext获取,因为`ApplicationContext`接口继承了`MessageSource`接口，调用的是父接口的`getMessage()`：

```java
@SpringBootApplication
public class A03Application {

    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(A03Application.class, args);
        String zhHi = applicationContext.getMessage("hi", null, Locale.CHINA);
        System.out.println(zhHi);
        String enHi = applicationContext.getMessage("hi", null, Locale.ENGLISH);
        System.out.println(enHi);
        String jaHi = applicationContext.getMessage("hi", null, Locale.JAPANESE);
        System.out.println(jaHi);
    }
}
```

![image-20230615113540062](http://www.iocaop.com/images/2023-06/image-20230615113540062.png)

### 04-ApplicationContext的功能2和3

#### `ResourcePatternResolver`：通过通配符匹配资源

```java
@SpringBootApplication
public class A04Application {
    public static void main(String[] args) throws IOException {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(A04Application.class, args);
        Resource[] resources = applicationContext.getResources("classpath:application.yml");
        for (Resource resource : resources) {
            System.out.println(resource);
        }
    }
}
```

![image-20230615114459391](http://www.iocaop.com/images/2023-06/image-20230615114459391.png)

> `Resource`是spring中对于资源的抽象。

来试试能不能找到springboot自动配置时所用到的`spring.factories`：

![image-20230615115051615](http://www.iocaop.com/images/2023-06/image-20230615115051615.png)

> - `classpath:` 表示只在当前类路径下搜索资源，<span style="background-color:pink;">不包括其它的 jar 包或类路径</span>。
> - `classpath*:` 表示在当前类路径以及所有的子类路径中搜索资源，<span style="background-color:pink;">包括其它的 jar 包或类路径</span>。

#### EnvironmentCapable：读取环境信息

获取系统变量`JAVA_HOME`，不区分大小写。

```java
@SpringBootApplication
public class A05Application {
    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(A05Application.class, args);
        String javaHome = applicationContext.getEnvironment().getProperty("java_home");
        System.out.println("javaHome = " + javaHome);
    }
}

```

![image-20230615115831973](http://www.iocaop.com/images/2023-06/image-20230615115831973.png)

也可以拿到配置文件中的键值：

```java
@SpringBootApplication
public class A05Application {
    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(A05Application.class, args);
        String port = applicationContext.getEnvironment().getProperty("server.port");
        System.out.println("port = " + port);
    }
}
```

![image-20230615120101780](http://www.iocaop.com/images/2023-06/image-20230615120101780.png)

### 05-ApplicationContext的功能4

#### 事件发布

`ApplicationEventPublisher`：发布事件，解耦合。

首先我们定义一个用户注册事件，自定义事件需要继承`ApplicationEvent`:

```java
/**
 * 用户注册事件
 *
 * @author 赖卓成
 * @date 2023/06/15
 */
public class UserRegisterEvent extends ApplicationEvent {

    public UserRegisterEvent(Object source) {
        super(source);
    }
}
```

发布事件：使用`ApplicationContext`继承自`ApplicationEventPublisher`中的方法进行发送：

```java
@SpringBootApplication
public class A06Application {

    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(A06Application.class, args);
        applicationContext.publishEvent(new UserRegisterEvent("欢迎你，lzc，你已注册成功！"));
    }
}
```

发送后有什么用？有监听器进行监听，定义两种监听器，分别发送短信和邮件：

```java
@Component
public class Component1 {

    @EventListener
    public void mail(UserRegisterEvent event) {
        System.out.println("发送邮件:"+event.getSource());
    }
}
```

```java
@Component
public class Component2 {
    @EventListener
    public void sms(UserRegisterEvent event) {
        System.out.println("发送短信:"+event.getSource());
    }
}
```

运行结果：

![image-20230615151558651](http://www.iocaop.com/images/2023-06/image-20230615151558651.png)

> 事件发布最重要的是，解耦合。在本例中，用户注册成功后，不需要将后续步骤写死为发短信或发邮件，而是发布事件，具体发送短信或邮件，由接受的组件来做。

### 07-BeanFactory的实现

测试类：定义两个`Bean`类，写一个配置类，将这两个`Bean`注入到ioc

```java
public class TestBeanFactory {

    @Configuration
    static class Config {

        @Bean
        public Bean1 bean1() {
            return new Bean1();
        }

        @Bean
        public Bean2 bean2() {
            return new Bean2();
        }
    }

    static class Bean1 {
        private static final Logger logger = LoggerFactory.getLogger(Bean1.class);
        @Autowired
        private Bean2 bean2;
        public Bean1() {
            logger.info("Bean1 init");
        }

        public Bean2 getBean2() {
            return bean2;
        }
    }

    static class Bean2 {
        private static final Logger logger = LoggerFactory.getLogger(Bean2.class);

        public Bean2() {
            logger.info("Bean2 init");
        }
    }





}
```

主函数：分为7步，来看看`BeanFactory`的创建和`Bean`的创建

* 步骤1：创建beanFactory，这是核心容器，创建后，内部没有bean，需要添加bean的定义，beanFactory会根据定义创建bean

  ```java
          DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
  ```

* 步骤2：添加bean的定义(class,scope,初始化方、销毁方法等)，这是bean的描述信息

  ```java
          // 这里先创建Config的定义,genericBeanDefinition设置bean的特征(单例多例等 )
          AbstractBeanDefinition beanDefinition = BeanDefinitionBuilder.genericBeanDefinition(Config.class).setScope("singleton").getBeanDefinition();
  ```

* 步骤3：创建好bean的定义后，使用beanFactory的registerBeanDefinition方法注册bean的定义，参数1是bean的名称，参数2是bean的定义（BeanDefinition）

  ```java
          // 注册完成后，beanFactory内部就有了一个bean的定义，可以根据定义创建config的bean
          beanFactory.registerBeanDefinition("config", beanDefinition);
  ```

  验证一下beanFactory中有哪些bean

  ```java
          System.out.println("=============步骤3：beanFactory调用registerBeanDefinition方法注册config后容器中有哪些Bean的定义======================");
          String[] beanDefinitionNames = beanFactory.getBeanDefinitionNames();
          for (String beanDefinitionName : beanDefinitionNames) {
              System.out.println("beanDefinitionName = " + beanDefinitionName);
          }
  ```

  ![image-20231212183131662](http://www.iocaop.com/images/2023-12/image-20231212183131662.png)

  问：beanFactory中有一个bean的定义，那为什么没有Bean1和Bean2的定义呢？

  答：因为beanFactory缺少了解析@Configuration和@Bean的功能。

  问：怎么让他功能完整呢？

  答：调用工具类AnnotationConfigUtils，这个工具类会解析@Configuration和@Bean，将解析结果添加到beanFactory中

* 步骤4：调用工具类AnnotationConfigUtils，会给beanFactory添加一些常用的后置处理器，对beanFactory的功能做一些扩展

  ```java
   AnnotationConfigUtils.registerAnnotationConfigProcessors(beanFactory);
  ```
  
  验证一下beanFactory中有哪些bean
  
  ```java
          System.out.println("==============步骤4：使用工具类AnnotationConfigUtils注册后置处理器后beanFactory中有哪些Bean的定义=====================");
          beanDefinitionNames = beanFactory.getBeanDefinitionNames();
          for (String beanDefinitionName : beanDefinitionNames) {
              System.out.println("beanDefinitionName = " + beanDefinitionName);
          }
  ```
  
  ![image-20231212183523950](http://www.iocaop.com/images/2023-12/image-20231212183523950.png)
  
  多出了很多`Bean`这些`Bean`是注解后置处理器，看名字大概就能猜到作用了。
  
* 步骤5：获取这些后置处理器,这些后置处理器统一类型为：BeanFactoryPostProcessor，这些后置处理器会对beanFactory做一些扩展

  ```java
          Map<String, BeanFactoryPostProcessor> beansOfType = beanFactory.getBeansOfType(BeanFactoryPostProcessor.class);
  ```

  逐一执行这些后置处理器，效果：会对注解@Configuration和@Bean进行解析，将解析结果添加到beanFactory中：

  ```java
  beansOfType.values().stream().forEach(beanFactoryPostProcessor -> beanFactoryPostProcessor.postProcessBeanFactory(beanFactory));
  ```

  执行解析后打印一下beanFactory中有哪些bean：

  ```java
          System.out.println("==============步骤5：获取这些后置处理器并逐一执行后，BeanFactory中有哪些Bean的定义=====================");
          beanDefinitionNames = beanFactory.getBeanDefinitionNames();
          for (String beanDefinitionName : beanDefinitionNames) {
              System.out.println("beanDefinitionName = " + beanDefinitionName);
          }
  ```

  ![image-20231212183830859](http://www.iocaop.com/images/2023-12/image-20231212183830859.png)

  可以看到，已经将`bean1`和`bean2`加入到`beanFactory`中了。

  后置处理器的主要功能：对beanFactory做扩展，补充了Bean的定义。

主函数完整代码：

```java
    public static void main(String[] args) {
        // 1.创建beanFactory，这是核心容器，创建后，内部没有bean，需要添加bean的定义，beanFactory会根据定义创建bean
        DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
        // 2.添加bean的定义(class,scope,初始化方、销毁方法等)，这是bean的描述信息
        // 这里先创建Config的定义,genericBeanDefinition设置bean的特征(单例多例等 )
        AbstractBeanDefinition beanDefinition = BeanDefinitionBuilder.genericBeanDefinition(Config.class).setScope("singleton").getBeanDefinition();
        // 3.创建好bean的定义后，使用beanFactory的registerBeanDefinition方法注册bean的定义，参数1是bean的名称，参数2是bean的定义
        // 注册完成后，beanFactory内部就有了一个bean的定义，可以根据定义创建config的bean
        beanFactory.registerBeanDefinition("config", beanDefinition);

        // 验证一下beanFactory中有哪些bean
        System.out.println("=============步骤3：beanFactory调用registerBeanDefinition方法注册config后容器中有哪些Bean的定义======================");
        String[] beanDefinitionNames = beanFactory.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            System.out.println("beanDefinitionName = " + beanDefinitionName);
        }
        // 结果：beanDefinitionName = config，说明beanFactory中有一个bean的定义，那为什么没有Bean1和Bean2的定义呢？
        // 因为beanFactory缺少了解析@Configuration和@Bean的功能，怎么让他功能完整呢？
        // 4.调用工具类AnnotationConfigUtils，这个工具类会解析@Configuration和@Bean，将解析结果添加到beanFactory中
        // 会给beanFactory添加一些常用的后置处理器，对beanFactory的功能做一些扩展
        AnnotationConfigUtils.registerAnnotationConfigProcessors(beanFactory);
        // 验证一下beanFactory中有哪些bean
        System.out.println("==============步骤4：使用工具类AnnotationConfigUtils注册后置处理器后beanFactory中有哪些Bean的定义=====================");
        beanDefinitionNames = beanFactory.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            System.out.println("beanDefinitionName = " + beanDefinitionName);
        }
/*      结果：
        beanDefinitionName = config
        beanDefinitionName = org.springframework.context.annotation.internalConfigurationAnnotationProcessor  // @Configuration注解的后置处理器，解析@Configuration注解以及@Bean注解
        beanDefinitionName = org.springframework.context.annotation.internalAutowiredAnnotationProcessor      //
        beanDefinitionName = org.springframework.context.annotation.internalCommonAnnotationProcessor
        beanDefinitionName = org.springframework.context.event.internalEventListenerProcessor
        beanDefinitionName = org.springframework.context.event.internalEventListenerFactory
*/
        //

        // 5.获取这些后置处理器,这些后置处理器统一类型为：BeanFactoryPostProcessor，这些后置处理器会对beanFactory做一些扩展
        Map<String, BeanFactoryPostProcessor> beansOfType = beanFactory.getBeansOfType(BeanFactoryPostProcessor.class);
        // 逐一执行这些后置处理器，效果：会对注解@Configuration和@Bean进行解析，将解析结果添加到beanFactory中
        beansOfType.values().stream().forEach(beanFactoryPostProcessor -> beanFactoryPostProcessor.postProcessBeanFactory(beanFactory));
        // 解析之后再打印一下beanFactory中有哪些bean
        System.out.println("==============步骤5：获取这些后置处理器并逐一执行后，BeanFactory中有哪些Bean的定义=====================");
        beanDefinitionNames = beanFactory.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            System.out.println("beanDefinitionName = " + beanDefinitionName);
        }
        // 后置处理器的主要功能：对beanFactory做扩展，补充了Bean的定义
    }
```

