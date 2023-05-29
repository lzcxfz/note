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

![image-20230529124938109](http://www.iocaop.com/images/2023-05/image-20230529124938109.png)

> ctrl+u可以查看类图

可以看到`ApplicationContext`间接继承了`BeanFactory`接口，同时也继承了其他的一些接口(为了扩展功能)。
