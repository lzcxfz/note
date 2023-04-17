---
title: mybatis-plus-generator代码生成器学习
date: 2022-11-03
category:
  - mybatis-plus-generator
  - 开发工具
---

参考文档1：<a href = 'https://blog.csdn.net/b13001216978/article/details/121690960'>点击跳转</a>

参考文档2：<a href = 'https://baomidou.com/pages/981406/'>点击跳转</a>

导包：

```xml
        <!--  基础依赖      -->
        <!--  web启动器      -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!--  jdbc    -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <!--  mysql    -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.30</version>
        </dependency>

        <!--  druid    -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.2.14</version>
        </dependency>

        <!--  mybatis-plus    -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.5.2</version>
        </dependency>

        <!--  lombok      -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
        </dependency>

        <!--  生成器相关      -->
        <!--  生成器    -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.5.3</version>
        </dependency>

        <!--   模板引擎     -->
        <dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
            <version>2.3.31</version>
        </dependency>

        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.3</version>
        </dependency>

        <dependency>
            <groupId>io.swagger.core.v3</groupId>
            <artifactId>swagger-annotations</artifactId>
            <version>2.2.4</version>
        </dependency>

        <dependency>
            <groupId>io.swagger</groupId>
            <artifactId>swagger-annotations</artifactId>
            <version>1.6.8</version>
            <scope>compile</scope>
        </dependency>
```

根据官方文档配置：

```java
/**
 * 测试代码生成器
 *
 * @author laizhuocheng
 * @date 2022/11/03
 */
public class Generator {


    public static void main(String[] args){
        FastAutoGenerator.create(new DataSourceConfig.Builder("jdbc:mysql://www.iocaop.com:3306/crud?useUnicode=true&characterEncoding=utf-8&useSSL=false","root","911823")
                                .dbQuery(new MySqlQuery())
//                                .schema("mybatis-plus")
                                .typeConvert(new MySqlTypeConvert())
                                .keyWordsHandler(new MySqlKeyWordsHandler())
                        )
                .globalConfig(builder -> {
                    builder.author("赖卓成")
                            .enableSwagger()
                            .dateType(DateType.TIME_PACK)
                            .commentDate("yyyy-MM-dd")

//                            .enableKotlin()
//                            .fileOverride()
                            .outputDir(System.getProperty("user.dir")+"\\mybatis-plus-generator\\src\\main\\java");
                })
                .packageConfig(builder -> {
                    builder.parent("com.lzc.generator")
                            .moduleName("gene")
                            .entity("model")
                            .xml("mapper")
                            .mapper("mapper")
                            .service("service")
                            .serviceImpl("service.impl")
                            .controller("controller")
                            .pathInfo(Collections.singletonMap(OutputFile.xml, System.getProperty("user.dir")+"\\mybatis-plus-generator\\src\\main\\resources\\mapper"));
                })
                .strategyConfig(builder -> {
                    builder
                            .enableCapitalMode()
                            .enableSkipView()
                            .disableSqlFilter()
//                            .addInclude("t_simple")
                            .addTablePrefix("t_", "c_")
                            // 实体类配置
                            .entityBuilder()
//                            .superClass(BaseEntity.class)
                            .disableSerialVersionUID()
                            .enableChainModel()
                            .enableLombok()
                            .enableRemoveIsPrefix()
                            .enableTableFieldAnnotation()
//                            .enableActiveRecord()
                            .versionColumnName("version")
                            .versionPropertyName("version")
                            .logicDeleteColumnName("deleted")
                            .logicDeletePropertyName("deleteFlag")
                            .naming(NamingStrategy.underline_to_camel)
                            .columnNaming(NamingStrategy.underline_to_camel)
//                            .addSuperEntityColumns("id", "created_by", "created_time", "updated_by", "updated_time")
//                            .addIgnoreColumns("age")
                            .addTableFills(new Column("create_time", FieldFill.INSERT))
                            .addTableFills(new Column("create_by", FieldFill.INSERT))
                            .addTableFills(new Column("update_time", FieldFill.INSERT_UPDATE))
                            .addTableFills(new Column("update_by", FieldFill.INSERT_UPDATE))
                            .idType(IdType.INPUT)
//                            .formatFileName("%sEntity")
                            // 控制层配置
                            .controllerBuilder()
//                            .superClass(BaseController.class)
//                            .enableHyphenStyle()
                            .enableRestStyle()
                            .formatFileName("%sController")
                            // 业务层配置
                            .serviceBuilder()
//                            .superServiceClass(BaseService.class)
//                            .superServiceImplClass(BaseServiceImpl.class)
                            .formatServiceFileName("%sService")
                            .formatServiceImplFileName("%sServiceImp")
                            // 持久层配置
                            .mapperBuilder()
//                            .superClass(BaseMapper.class)
                            .enableMapperAnnotation()
                            .enableBaseResultMap()
                            .enableBaseColumnList()
//                            .cache(MyMapperCache.class)
                            .formatMapperFileName("%sMapper")
                            .formatXmlFileName("%sMapper")
                            .build();
                })
                .templateEngine(new FreemarkerTemplateEngine())
                .templateConfig(builder -> {
                    builder.entity("templates/entity.java")
                            .controller("templates/controller.java")
                            .service("templates/service.java")
                            .serviceImpl("templates/serviceImpl.java")
                            .mapper("templates/mapper.java")
                            .xml("templates/mapper.xml")
                    ;
                })
                .execute();



}
}
```

把生成器自带的模板复制出来，即可，指定

![image-20221103161007404](http://www.iocaop.com/images/2022-11/image-20221103161007404.png)

效果：

![image-20221103161242213](http://www.iocaop.com/images/2022-11/image-20221103161242213.png)

![image-20221103161222156](http://www.iocaop.com/images/2022-11/image-20221103161222156.png)
