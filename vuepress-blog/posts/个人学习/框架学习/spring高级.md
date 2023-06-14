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
