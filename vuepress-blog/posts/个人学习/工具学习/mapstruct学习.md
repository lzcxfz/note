---
title: mapstruct使用
date: 2023-01-03
category:
  - mapstruct
---

依赖：

```xml
        <!-- 引入 mapstruct 依赖 -->
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>${mapstruct.version}</version>
        </dependency>

        <!-- 引入 lombok 依赖 -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
            <scope>provided</scope>
        </dependency>
```

插件,需要注意lombok放在mapstruct上面，否则属性不会赋值 

```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <annotationProcessorPaths>
                        <!-- 引入 lombok-processor -->
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>${lombok.version}</version>
                        </path>

                        <!-- 引入 mapstruct-processor -->
                        <path>
                            <groupId>org.mapstruct</groupId>
                            <artifactId>mapstruct-processor</artifactId>
                            <version>${mapstruct.version}</version>
                        </path>

                    </annotationProcessorPaths>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

两个model：

```java
@Data
@Accessors(chain = true)
public class User {

    /**
     * id
     */
    private String id;

    /**
     * 名字
     */
    private String name;

    /**
     * 地址
     */
    private String address;

    /**
     * 移动
     */
    private String mobile;
}
```

```java
@Accessors(chain = true)
@Data
public class Role {

    /**
     * id
     */
    private String id;

    /**
     * 名字
     */
    private String name;
}
```

DTO：

```java
@Data
public class UserDTO {
    /**
     * 名字
     */
    private String username;

    /**
     * 地址
     */
    private String address;


    /**
     * 角色名
     */
    private String roleName;

}
```

convert：

```java
@Mapper
public interface UserConvert {
    /**
     * 实例
     */
    UserConvert INSTANCE = Mappers.getMapper(UserConvert.class);


    /**
     * 为dto
     *
     * @param user 用户
     * @param role 角色
     * @return {@link UserDTO}
     */
    @Mapping(source = "role.name", target = "roleName")
    @Mapping(source = "user.name",target = "username")
    UserDTO toDTO(User user, Role role);
}
```

测试类：

```java
public class UserTest {

    public static void main(String[] args) {
        User user = new User().setId("111").setName("赖卓成").setAddress("深圳").setMobile("1245689");
        Role role = new Role().setId("111").setName("管理员");
        UserDTO userDTO = UserConvert.INSTANCE.toDTO(user,role);
        System.out.println(userDTO);
    }
}
```

结果：

![image-20230103113647539](http://www.iocaop.com/images/2023-01/image-20230103113647539.png)