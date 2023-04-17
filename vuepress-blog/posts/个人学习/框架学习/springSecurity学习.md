---
title: SpringSecurity学习
date: 2022-11-03
category:
  - SpringSecurity学习
---

## 2-1认证和授权的概念

认证：用户是登录、用户名密码校验

授权：用户当前身份是否有权限访问

创建一个SpringBoot项目，写一个简单接口，当然可以访问，当我们SpringSecurity依赖后，项目的所有接口都会加上保护。

```xml
    <parent>
        <artifactId>spring-boot-starter-parent</artifactId>
        <groupId>org.springframework.boot</groupId>
        <version>2.7.3</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

    </dependencies>
```

```java
@RestController
@RequestMapping("/hello")
public class HelloController {

    @RequestMapping("v1")
    public String v1(){
        return "v1";
    }
}

```

配置日志输出级别和登录的用户名、密码：

```yaml
server:
  port: 8080
logging:
  level:
    org:
      springframework:
        security: debug
spring:
  security:
    user:
      name: admin
      password: admin
```

![image-20221107225257673](http://www.iocaop.com/images/2022-11/202211072252735.png)

![image-20221107225352014](http://www.iocaop.com/images/2022-11/202211072253092.png)

登录后即可访问接口（认证成功）：

![image-20221107225733149](http://www.iocaop.com/images/2022-11/202211072257183.png)

加一个配置类，新版配置方式：<a href = 'https://blog.csdn.net/qiaohao0206/article/details/125571568'>点击跳转</a>

```java
/**
 * SpringSecurity配置  ---在新版SpringBoot2.7.x中已经过时了
 *
 * @author lzc
 * @date 2022/11/07
 */
@Deprecated
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(req->req.mvcMatchers("/hello/v1").hasRole("ADMIN"));
    }
}

```

给这个路径加上了权限校验，用户需要有ADMIN角色才能访问，重启访问403：

![image-20221107230553516](http://www.iocaop.com/images/2022-11/202211072305559.png)

## 2-2过滤器和过滤器链

任何Spring Web应用本质是servlet，Security Filter在http请求到达controller之前过滤每一个传入的http请求。

![image-20221107223826676](http://www.iocaop.com/images/2022-11/202211072238728.png)

* 过滤器：一般认证过滤器，可以拿到HttpRequest，从中提取HTTP头、表单字段或者Cookie等然后和数据库进行对比，成功后检查用户身份和请求的路径是否授权，如果通过了这些检查就会chain.doFilter(request,response);进行放行，让请求进入DispatchServlet，再分发到具体的Controller或者RequestController。

* 过滤器链：把上面的过滤器拆解成多个过滤器链，如认证有专门的认证过滤器，授权有专门的授权过滤器，等等。好处是职责单一、形成职责链。

当我们只引入，不对SpringSecurity进行其他配置，会采用DefaultSecurityFilterChain这个过滤器链，里面包含了很多过滤器。

SpringSecurity包含了很多过滤器，其中常见的有：

* BasicAuthenticationFilter：在请求头中找到一个 Basic Auth HTTP头，就尝试用该头中的用户名和密码验证用户
* UsernamePasswordAuthenticationFilter：在请求参数或者POST的请求体中找到用户名/密码，则尝试验证
* DefaultLoginPageGeneratingFilter：默认登录页生成，如果没有明确禁用，就会生成登录页面。
* DefaultLogoutPageGeneratingFilter：如果没有明确禁用，会生成一个注销页面。
* FilterSecurityInterceptor：过滤安全拦截器。用于授权逻辑。

## 2-3 ~2-4HTTP协议

看旧笔记：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?# 《慕课 Security》'>点击跳转</a>

## 2-5 SpringSecurity配置

配置分三段，and连接，或者lamda表达式配置，示例：

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // 授权配置
                .authorizeHttpRequests(req->req.antMatchers("/hello/v1").authenticated())
                // 表单配置
                .formLogin(form->form.disable())
                // HTTP配置
                .httpBasic(Customizer.withDefaults())
                // 跨域配置
                .csrf(csrf->csrf.disable());
        ;
    }
```

开启调试信息输出:

```java
@EnableWebSecurity(debug = true)
```

配置Security用户信息

```yaml
spring:
  security:
    user:
      name: admin
      password: admin
      roles: ADMIN
```

某些请求不需要经过过滤器链（css、js等静态资源），可以在WebSecurity配置：

```java
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().mvcMatchers("/api/**");
    }
```

## 2-6 定制登录页

依赖添加：

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>

        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>bootstrap</artifactId>
            <version>5.2.2</version>
        </dependency>

        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>webjars-locator-core</artifactId>
        </dependency>

```

在resource的template下建一个login.html页面，简单写两句。然后到SpringSecurity配置中手动配置登录页：

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // 授权配置
                .authorizeHttpRequests(req->req.antMatchers("/hello/v1").authenticated())
                // 表单配置
                .formLogin(form->form.loginPage("/login"))
                // HTTP配置
                .httpBasic(Customizer.withDefaults())
                // 跨域配置
                .csrf(csrf->csrf.disable());
        ;
    }
```

再建一个mvc配置，让模板和路径映射上：

```java
/**
 * web mvc配置
 *
 * @author lzc
 * @date 2022/11/08
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry
                // 静态资源实际路径
                .addResourceHandler("/webjars/**")
                // 静态资源外部访问时的路径
                .addResourceLocations("/webjars/")
                .resourceChain(false);

        registry.setOrder(1);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry
                // 访问时的路径
                .addViewController("login")
                // 对应的资源 login.html
                .setViewName("login");
        registry.setOrder(HIGHEST_PRECEDENCE);
    }
}
```

启动以后已经可以看到效果了：

![image-20221108223014732](http://www.iocaop.com/images/2022-11/202211082230872.png)

但是目前只对/hello/v1才需要认证，也就是其他页面可以访问，/hello/v1会跳转到默认登录页。

我们直接cv一个漂亮的登录页面：

```html
<!DOCTYPE html>
<html lang="zh" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title th:text="#{login.page.title}"></title>
    <link
            rel="stylesheet"
            type="text/css"
            href="/webjars/bootstrap/css/bootstrap.min.css"
            th:href="@{/webjars/bootstrap/css/bootstrap.min.css}"
    />
</head>
<body>
<div class="container">
    <form name="f" th:action="@{/login}" method="post">
        <div
                th:if="${param.error}"
                class="alert alert-danger"
                th:text="#{login.page.bad-credential}"
        >
            Invalid username and password.
        </div>
        <div
                th:if="${param.logout}"
                class="alert alert-success"
                th:text="#{login.page.logout.msg}"
        >
            You have been logged out.
        </div>
        <div class="form-group">
            <label for="username" th:text="#{login.page.form.username}"
            >Username:</label
            >
            <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
            />
        </div>
        <div class="form-group">
            <label for="password" th:text="#{login.page.form.password}"
            >Password:</label
            >
            <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
            />
        </div>
        <div class="form-check">
            <input
                    type="checkbox"
                    class="form-check-input"
                    id="remember-me"
                    name="remember-me"
            />
            <label class="form-check-label" for="remember-me" th:text="#{login.page.form.remember-me}"
            >Remember Me:</label
            >
        </div>
<!--        <input-->
<!--                type="hidden"-->
<!--                id="csrf_token"-->
<!--                th:name="${_csrf.parameterName}"-->
<!--                th:value="${_csrf.token}"-->
<!--        />-->
        <button
                type="submit"
                class="btn btn-primary"
                th:text="#{login.page.form.submit}"
        >
            Submit
        </button>
    </form>
</div>
<script src="/webjars/jquery/jquery.min.js" th:src="@{/webjars/jquery/jquery.min.js}"></script>
<script src="/webjars/bootstrap/js/bootstrap.min.js" th:src="@{/webjars/bootstrap/js/bootstrap.min.js}"></script>
</body>
</html>
```

启动直接乱码，需要加一点东西，国际化处理Resource Bundle：

![image-20221108223818259](http://www.iocaop.com/images/2022-11/202211082238315.png)

好！启动：

![image-20221108224850825](http://www.iocaop.com/images/2022-11/202211082248867.png)

我样式呢？哦，被我的安全策略拦住了，加一下配置：

```java
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().mvcMatchers("/api/**")
                // 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }
```

启动：

![image-20221108225541681](http://www.iocaop.com/images/2022-11/202211082255740.png)

我们再配置一下登录用户名和密码参数：

![image-20221108225718612](http://www.iocaop.com/images/2022-11/202211082257663.png)

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // 授权配置
                .authorizeHttpRequests(req->req.antMatchers("/hello/v1").authenticated())
                // 表单配置
                .formLogin(form->form.loginPage("/login")
                        // 配置用户名参数
                        //.usernameParameter("username")
                        // 配置密码参数
                        //.passwordParameter("password")
                        // 配置表单action地址
                        //.loginProcessingUrl("/login")
                        // 配置登录成功后跳转的页面
                        //.successForwardUrl("/")
                        // 配置失败后跳转的页面
                        //.failureForwardUrl("/error")
                           .permitAll()
                )
                // HTTP配置
                .httpBasic(Customizer.withDefaults())
                // 跨域配置
                .csrf(csrf->csrf.disable());
        ;
    }

```

现在就可以正常登录了。

## 2-7 csrf、logout、remember-me

### csrf攻击

我登录A站，在没有关闭A站的情况下，登录B，B可以拿到A站的Cookie，模拟发送请求给A，搞小动作。

怎么预防：

* 每次响应返回一个csrf_token，请求需要带上，否则认为是非法请求。
* 响应设置Cookie属性：SameSite=Strict
* 无状态登录

### Remember-me

为了解决session过期，用户想不输入用户名密码直接登录的问题。

原理：用Cookie存储用户名，做个hash，加个过期时间。md5（用户名+过期时间+密码+key）

### logout

和定制登录页差不多，可以定制退出页。

```
.logout(logout->logout.logoutUrl("/perform_logout").permitAll());
```

配置定制登录页和登出，都会调用内置的接口，不要去配置这几个路径不经过过滤器。否则会踩坑。要让这几个路径经过过滤器，如login、logout、remember-me。

不要深究这块，后面都是无状态登录，前后端分离，浪费一个小时。

## 2-8 定制登录、登出的处理

认证成功有个Handler，可以重写里面的方法，函数式接口：

```java
                // 表单配置
                .formLogin(form->form
                                .loginPage("/login")
                                .successHandler(((request, response, authentication) -> {
                                    response.setStatus(HttpServletResponse.SC_OK);
                                    response.getWriter().println("auth success");
                                }))
                .permitAll()
                )
```

登录成功后就不会跳转到某个页面了，而是我们设置的响应内容：

![image-20221109005613982](http://www.iocaop.com/images/2022-11/202211090056053.png)

能写文本，就能返回json咯。

```java
                // 表单配置
                .formLogin(form->form
                                .loginPage("/login")
                                .successHandler(((request, response, authentication) -> {
                                    response.setStatus(HttpServletResponse.SC_OK);
                                    response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));
                                }))
                .permitAll()
```

得到的json：

![image-20221109005908033](http://www.iocaop.com/images/2022-11/202211090059093.png)

登录失败也是同样的：

```java
                // 表单配置
                .formLogin(form->form
                                .loginPage("/login")
                                .successHandler(((request, response, authentication) -> {
                                    response.setStatus(HttpServletResponse.SC_OK);
                                    response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));
                                }))
                                .failureHandler(((request, response, exception) -> {
                                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                    response.setCharacterEncoding("UTF-8");
                                    response.getWriter().println(new ObjectMapper().writeValueAsString(exception));
                                }))
                .permitAll()
                )
```

![image-20221109010221378](http://www.iocaop.com/images/2022-11/202211090102450.png)

## 2-9 自定义Filter

上面实现了登录失败返回json但是没法通过json进行登录，因为默认使用的是<span style="background-color:pink;">UsernamePasswordAuthenticationFilter</span>来处理登录，分析源码：

```java
public class UsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    public static final String SPRING_SECURITY_FORM_USERNAME_KEY = "username";
    public static final String SPRING_SECURITY_FORM_PASSWORD_KEY = "password";
    private static final AntPathRequestMatcher DEFAULT_ANT_PATH_REQUEST_MATCHER = new AntPathRequestMatcher("/login", "POST");
    // 用户名和密码参数
    private String usernameParameter = "username";
    private String passwordParameter = "password";
    private boolean postOnly = true;

    public UsernamePasswordAuthenticationFilter() {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER);
    }

    public UsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER, authenticationManager);
    }

    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // 判断请求方式 不允许post
        if (this.postOnly && !request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        } else {
            // get请求则从request中获取请求
            String username = this.obtainUsername(request);
            username = username != null ? username.trim() : "";
            String password = this.obtainPassword(request);
            password = password != null ? password : "";
            UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username, password);
            this.setDetails(request, authRequest);
            // 调用管理器，进行鉴权
            return this.getAuthenticationManager().authenticate(authRequest);
        }
    }

    @Nullable
    protected String obtainPassword(HttpServletRequest request) {
        return request.getParameter(this.passwordParameter);
    }

    @Nullable
    protected String obtainUsername(HttpServletRequest request) {
        return request.getParameter(this.usernameParameter);
    }

    protected void setDetails(HttpServletRequest request, UsernamePasswordAuthenticationToken authRequest) {
        authRequest.setDetails(this.authenticationDetailsSource.buildDetails(request));
    }

    public void setUsernameParameter(String usernameParameter) {
        Assert.hasText(usernameParameter, "Username parameter must not be empty or null");
        this.usernameParameter = usernameParameter;
    }

    public void setPasswordParameter(String passwordParameter) {
        Assert.hasText(passwordParameter, "Password parameter must not be empty or null");
        this.passwordParameter = passwordParameter;
    }

    public void setPostOnly(boolean postOnly) {
        this.postOnly = postOnly;
    }

    public final String getUsernameParameter() {
        return this.usernameParameter;
    }

    public final String getPasswordParameter() {
        return this.passwordParameter;
    }
}

```

可以模仿他，我们自己写一个Filter来实现json登录：

为了减少代码量，直接继承UsernamePasswordAuthenticationFilter，重写attemptAuthentication方法：

```java
@RequiredArgsConstructor
public class RestAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    /**
     * 序列化时使用。@RequiredArgsConstructor构造器注入
     */
    private final ObjectMapper objectMapper;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // 模仿父类，先定义一个UsernamePasswordAuthenticationToken对象
        UsernamePasswordAuthenticationToken authRequest = null;

        /**
         * 写自定义的校验方式
         * 期望的JSON格式:{"username":"lzc","password":"123"}
         *
         */

        try {
            // 获取请求输入流
            ServletInputStream is = request.getInputStream();
            // 利用objectObject将json转成tree 再读取用户名和密码
            JsonNode jsonNode = objectMapper.readTree(is);
            String username = jsonNode.get("username").textValue();
            String password = jsonNode.get("password").textValue();
            // 创建一个UsernamePasswordAuthenticationToken对象，参数是用户名和密码
            authRequest =  new UsernamePasswordAuthenticationToken(username,password);
        } catch (IOException e) {
            throw new RuntimeException("没有找到用户名和密码");
        }

        // 模仿父类返回管理器进行鉴权
        return this.getAuthenticationManager().authenticate(authRequest);

    }
}
```

过滤器写好了，需要把过滤器起效果，在springSecurity配置中，使用addFilterAt方法用我们自己写的过滤器替换掉内置的校验过滤器，然后在本类创建一个配置该过滤器的方法：

```java
    private RestAuthenticationFilter restAuthenticationFilter() throws Exception {
        // 构造器注入objectMapper，所以需要传参，那么在本类也使用构造器注入，再传进来
        RestAuthenticationFilter restAuthenticationFilter = new RestAuthenticationFilter(objectMapper);

        // 设置鉴权成功处理器
        restAuthenticationFilter.setAuthenticationSuccessHandler(((request, response, authentication) -> {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));
        }));

        // 设置鉴权失败处理器
        restAuthenticationFilter.setAuthenticationFailureHandler(((request, response, exception) -> {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setCharacterEncoding("UTF-8");
            response.getWriter().println(new ObjectMapper().writeValueAsString(exception));
        }));

        // 设置认证管理器(用什么做认证)
        restAuthenticationFilter.setAuthenticationManager(this.authenticationManager());

        // 设置过滤器应用的url
        restAuthenticationFilter.setFilterProcessesUrl("/auth/login");

        return restAuthenticationFilter;
    }
```

还要把之前的表单登录配置注释掉：

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // 授权配置
//                .authorizeHttpRequests(req->req.anyRequest().authenticated())

                .authorizeHttpRequests(req->req
                        // 该路径下资源公开
                        .antMatchers("/auth/**").permitAll())
                // 插入过滤器，替代内置的登录认证过滤器
                .addFilterAt(restAuthenticationFilter(),UsernamePasswordAuthenticationFilter.class)
                .csrf(csrf->csrf.disable())
                // 表单配置
//                .formLogin(form->form
//                                .loginPage("/login")
//                                .successHandler(((request, response, authentication) -> {
//                                    response.setStatus(HttpServletResponse.SC_OK);
//                                    response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));
//                                }))
//                                .failureHandler(((request, response, exception) -> {
//                                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                                    response.setCharacterEncoding("UTF-8");
//                                    response.getWriter().println(new ObjectMapper().writeValueAsString(exception));
//                                }))
//                .permitAll()
//                )
                // HTTP配置
//                .httpBasic(Customizer.withDefaults())
                // 跨域配置
//                .csrf(csrf->csrf.disable())
//                .logout(logout->logout.logoutUrl("/perform_logout").permitAll()
                ;
        ;
    }
```

启动测试：登录成功和失败都走了我们写的handler

![image-20221114221113616](http://www.iocaop.com/images/2022-11/202211142211727.png)



![image-20221114221139498](http://www.iocaop.com/images/2022-11/202211142211586.png)

## 3-1密码进化史

看旧笔记：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?#AJGeH'>点击跳转</a>

## 3-2密码编码器

先来看看什么是密码编码器，把yml中配置的用户名和密码先注释掉，在security配置类中重写void configure(AuthenticationManagerBuilder auth)方法进行配置：

```java
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("admin").password(this.passwordEncoder().encode("admin"));
    }

    /**
     * 密码编码器-需要放到ioc中
     *
     * @return {@link PasswordEncoder}
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new Pbkdf2PasswordEncoder();
    }
```

打断点在这一行：

![image-20221114222843807](http://www.iocaop.com/images/2022-11/202211142228960.png)

选定加密的表达式，右键：

![image-20221114223022176](http://www.iocaop.com/images/2022-11/202211142230237.png)

![image-20221114223030602](http://www.iocaop.com/images/2022-11/202211142230740.png)

可以看到密码被加密成这样了。依次类推，还有很多密码编码器，看PasswordEncoder的实现类即可。

![image-20221114223123442](http://www.iocaop.com/images/2022-11/202211142231517.png)

可以注意到有些编码器已经被弃用了，为什么还保留着呢？为了兼容老系统，而且还会存在一个问题，在一个系统中，老数据采用了旧的编码方式并且保留了下来，后面的密码用了更安全的加密方式，那么怎么兼容（新用户登录用新的编码格式，老用户登录就用老的编码格式）多种加密方式呢？

> SpringSecurity提供了多种编码器共存的方式：DelegatingPasswordEncoder

```java
    @Bean
    public PasswordEncoder passwordEncoder(){
        // 默认的密码编码器
        String idForDefault = "bcrypt";
        // 该系统中支持的密码编码器
        Map<String, PasswordEncoder> passwordEncoderMap = Map.of(idForDefault, new BCryptPasswordEncoder(),
                "SHA-1", new MessageDigestPasswordEncoder("SHA-1"));
        return new DelegatingPasswordEncoder(idForDefault,passwordEncoderMap);
    }
```

我们通过上一节的方法(打断点后右键evaluate)，获取两种编码方式的密码密文，创建两个用户：admin,admin和lzc，123456，得到密文后，设置进去。多密码编码器共存需要在密码前面加上<span style="background-color:pink;">{加密算法名称}</span>，DelegatingPasswordEncoder以{id}encodeedPassword形式存储密码。

```java
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin")
                .roles("ADMIN")
                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")
                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")
                .roles("ADMIN");
    }
```

我们把表单登录打开，配置csrf放开json登录的路径。因为表单登录是必须打开csrf的（防止跨域攻击），json登录不需要。这样配置:

```java
                .csrf(csrf->csrf.ignoringAntMatchers("/auth/**"));
```

改动较大，记录一下SpringSecurity配置类:

```java
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final ObjectMapper objectMapper;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // 授权配置
                .authorizeHttpRequests(req->req.antMatchers("/auth/**").permitAll().anyRequest().authenticated())

//                .authorizeHttpRequests(req->req
//                        // 该路径下资源公开
//                        .antMatchers("/auth/**").permitAll())
                // 插入过滤器，替代内置的登录认证过滤器
                .addFilterAt(restAuthenticationFilter(),UsernamePasswordAuthenticationFilter.class)
                .csrf(csrf->csrf.disable())
                // 表单配置
                .formLogin(form->form
                                .loginPage("/login")
                                .successHandler(((request, response, authentication) -> {
                                    response.setStatus(HttpServletResponse.SC_OK);
                                    response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));
                                }))
                                .failureHandler(((request, response, exception) -> {
                                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                    response.setCharacterEncoding("UTF-8");
                                    response.getWriter().println(new ObjectMapper().writeValueAsString(exception));
                                }))
                .permitAll()
                )
//                 HTTP配置
                .httpBasic(Customizer.withDefaults())
//                 跨域配置
                .csrf(csrf->csrf.ignoringAntMatchers("/auth/**"));
//                .logout(logout->logout.logoutUrl("/perform_logout").permitAll()
    }

    private RestAuthenticationFilter restAuthenticationFilter() throws Exception {
        // 构造器注入objectMapper，所以需要传参，那么在本类也使用构造器注入，再传进来
        RestAuthenticationFilter restAuthenticationFilter = new RestAuthenticationFilter(objectMapper);

        // 设置鉴权成功处理器
        restAuthenticationFilter.setAuthenticationSuccessHandler(((request, response, authentication) -> {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));
        }));

        // 设置鉴权失败处理器
        restAuthenticationFilter.setAuthenticationFailureHandler(((request, response, exception) -> {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setCharacterEncoding("UTF-8");
            response.getWriter().println(new ObjectMapper().writeValueAsString(exception));
        }));

        // 设置认证管理器(用什么做认证)
        restAuthenticationFilter.setAuthenticationManager(this.authenticationManager());

        // 设置过滤器应用的url
        restAuthenticationFilter.setFilterProcessesUrl("/auth/login");

        return restAuthenticationFilter;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().mvcMatchers("/api/**")
                // 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin")
                .roles("ADMIN")
                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")
                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")
                .roles("ADMIN");
    }

    /**
     * 密码编码器-需要放到ioc中
     *
     * @return {@link PasswordEncoder}
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        // 默认的密码编码器
        String idForDefault = "bcrypt";
        // 该系统中支持的密码编码器
        Map<String, PasswordEncoder> passwordEncoderMap = Map.of(idForDefault, new BCryptPasswordEncoder(),
                "SHA-1", new MessageDigestPasswordEncoder("SHA-1"));
        return new DelegatingPasswordEncoder(idForDefault,passwordEncoderMap);
    }
}
```

现在启动后，admin和lzc都可以登录，并且使用了不同的密码编码器。

![image-20221114230202382](http://www.iocaop.com/images/2022-11/202211142302449.png)

![image-20221114230218575](http://www.iocaop.com/images/2022-11/202211142302639.png)

## 3-3 JSR380验证框架-验证注解和自定义验证注解

项目里用了很多次了不需要做笔记了，看旧笔记：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?#VssNn'>点击跳转</a>

代码已经在新建的项目里面写了。

## 3-4 JSR380验证框架-密码验证规则和自定义注解验证器

### 结合passay自定义注解校验密码

依赖：

```xml
        <dependency>
            <groupId>org.passay</groupId>
            <artifactId>passay</artifactId>
            <version>1.6.2</version>
        </dependency>
```

创建注解：

```java
@Target({ElementType.TYPE,ElementType.FIELD,ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValid.class)
@Documented
public @interface ValidPassword {

    String message() default "Invalid Password";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
```

校验类：

```java
public class PasswordValid implements ConstraintValidator<ValidPassword, String> {
    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {

        // passay框架密码校验规则创建
        PasswordValidator passwordValidator = new PasswordValidator(Arrays.asList(
                // 长度规则 8-30
                new LengthRule(8,30),
                // 至少1个大写字母
                new CharacterRule(EnglishCharacterData.UpperCase,1),
                // 至少1个小写字母
                new CharacterRule(EnglishCharacterData.LowerCase,1),
                // 至少1个小写字符
                new CharacterRule(EnglishCharacterData.Special,1),
                // 不允许有5个连续的字符
                new IllegalSequenceRule(EnglishSequenceData.Alphabetical,5,false),
                // 不允许5个连续数字
                new IllegalSequenceRule(EnglishSequenceData.Numerical,5,false),
                // 不允许有键盘上连续5个如：QWERTY
                new IllegalSequenceRule(EnglishSequenceData.USQwerty,5,false),
                // 不允许空格
                new WhitespaceRule()
        ));

        // 校验
        RuleResult validate = passwordValidator.validate(new PasswordData(password));
        // 返回校验结果
        return validate.isValid();
    }

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
}
```

注解加在字段上，控制层参数带上valid注解，启动测试：

![image-20221115003732276](http://www.iocaop.com/images/2022-11/202211150037348.png)

来个键盘连续，直接报错：

![image-20221115003804507](http://www.iocaop.com/images/2022-11/202211150038571.png)

### 自定义注解校验两次密码是否一致

创建注解：注意Target，需要Type才能将注解加在类上。

```java
@Target({ElementType.TYPE,ElementType.FIELD,ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MatchValidator.class)
@Documented
public @interface MatchPassword {
    String message() default "两次密码不一致";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

```

校验类：

```java
public class MatchValidator implements ConstraintValidator<MatchPassword, UserDTO> {
    @Override
    public void initialize(MatchPassword constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(UserDTO userDTO, ConstraintValidatorContext constraintValidatorContext) {
        return userDTO.getPassword().equals(userDTO.getMatchPassword());
    }
}

```

注解加在UserDTO类上，启动测试：

![image-20221115004422581](http://www.iocaop.com/images/2022-11/202211150044657.png)

来个不一样的，直接报错：

![image-20221115004447463](http://www.iocaop.com/images/2022-11/202211150044538.png)

![image-20221115004503576](http://www.iocaop.com/images/2022-11/202211150045639.png)

## 3-5 验证消息的国际化

### passay验证消息的国际化

没有配置消息国际化之前，返回的错误信息不明确，而且是英文：

![image-20221121221943706](http://www.iocaop.com/images/2022-11/202211212219801.png)

需要对消息进行国际化。

这一节旧笔记解释较为详细：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?#xsfyV'>点击跳转</a>

步骤：

* 创建一个消息解析器
* 配置验证器使用消息解析器
* 在对应的注解中写消息的键值

在注解对应的切面类中注入，并且作为参数传递给passay的PasswordValidator的构造器：

![image-20221121222342093](http://www.iocaop.com/images/2022-11/202211212223178.png)

将Resolver做成一个Bean，所以到配置类中添加：

```java
    private final MessageSource messageSource;
    
	@Bean
    public MessageResolver messageResolver(){
      return  new SpringMessageResolver(messageSource);
    }
```

![image-20221121222713724](http://www.iocaop.com/images/2022-11/202211212227825.png)

需要在切面中设置使用我们的消息解析器：

```java
        // 校验
        RuleResult validate = passwordValidator.validate(new PasswordData(password));

        // 将原有的校验失败关掉
        constraintValidatorContext.disableDefaultConstraintViolation();
        // 设置我们自己的
        constraintValidatorContext.buildConstraintViolationWithTemplate(String.join(",",
                passwordValidator.getMessages(validate)))
                .addConstraintViolation();
```

![image-20221121223258150](http://www.iocaop.com/images/2022-11/202211212232238.png)

添加资源文件：

```properties
# Passay properties
HISTORY_VIOLATION=Password matches one of {0} previous passwords.
ILLEGAL_WORD=Password contains the dictionary word '{0}'.
ILLEGAL_WORD_REVERSED=Password contains the reversed dictionary word '{0}'.
ILLEGAL_DIGEST_WORD=Password contains a dictionary word.
ILLEGAL_DIGEST_WORD_REVERSED=Password contains a reversed dictionary word.
ILLEGAL_MATCH=Password matches the illegal pattern '{0}'.
ALLOWED_MATCH=Password must match pattern '{0}'.
ILLEGAL_CHAR=Password {1} the illegal character '{0}'.
ALLOWED_CHAR=Password {1} the illegal character '{0}'.
ILLEGAL_QWERTY_SEQUENCE=Password contains the illegal QWERTY sequence '{0}'.
ILLEGAL_ALPHABETICAL_SEQUENCE=Password contains the illegal alphabetical sequence '{0}'.
ILLEGAL_NUMERICAL_SEQUENCE=Password contains the illegal numerical sequence '{0}'.
ILLEGAL_USERNAME=Password {1} the user id '{0}'.
ILLEGAL_USERNAME_REVERSED=Password {1} the user id '{0}' in reverse.
ILLEGAL_WHITESPACE=Password {1} a whitespace character.
ILLEGAL_NUMBER_RANGE=Password {1} the number '{0}'.
ILLEGAL_REPEATED_CHARS=Password contains {2} sequences of {0} or more repeated characters, but only {1} allowed: {3}.
INSUFFICIENT_UPPERCASE=Password must contain {0} or more uppercase characters.
INSUFFICIENT_LOWERCASE=Password must contain {0} or more lowercase characters.
INSUFFICIENT_ALPHABETICAL=Password must contain {0} or more alphabetical characters.
INSUFFICIENT_DIGIT=Password must contain {0} or more digit characters.
INSUFFICIENT_SPECIAL=Password must contain {0} or more special characters.
INSUFFICIENT_CHARACTERISTICS=Password matches {0} of {2} character rules, but {1} are required.
INSUFFICIENT_COMPLEXITY=Password meets {1} complexity rules, but {2} are required.
INSUFFICIENT_COMPLEXITY_RULES=No rules have been configured for a password of length {0}.
SOURCE_VIOLATION=Password cannot be the same as your {0} password.
TOO_LONG=Password must be no more than {1} characters in length.
TOO_SHORT=Password must be {0} or more characters in length.
TOO_MANY_OCCURRENCES=Password contains {1} occurrences of the character '{0}', but at most {2} are allowed.

jakarta.validation.constraints.AssertFalse.message     = must be false
jakarta.validation.constraints.AssertTrue.message      = must be true
jakarta.validation.constraints.DecimalMax.message      = must be less than ${inclusive == true ? 'or equal to ' : ''}{value}
jakarta.validation.constraints.DecimalMin.message      = must be greater than ${inclusive == true ? 'or equal to ' : ''}{value}
jakarta.validation.constraints.Digits.message          = numeric value out of bounds (<{integer} digits>.<{fraction} digits> expected)
jakarta.validation.constraints.Email.message           = must be a well-formed email address
jakarta.validation.constraints.Future.message          = must be a future date
jakarta.validation.constraints.FutureOrPresent.message = must be a date in the present or in the future
jakarta.validation.constraints.Max.message             = must be less than or equal to {value}
jakarta.validation.constraints.Min.message             = must be greater than or equal to {value}
jakarta.validation.constraints.Negative.message        = must be less than 0
jakarta.validation.constraints.NegativeOrZero.message  = must be less than or equal to 0
jakarta.validation.constraints.NotBlank.message        = must not be blank
jakarta.validation.constraints.NotEmpty.message        = must not be empty
jakarta.validation.constraints.NotNull.message         = must not be null
jakarta.validation.constraints.Null.message            = must be null
jakarta.validation.constraints.Past.message            = must be a past date
jakarta.validation.constraints.PastOrPresent.message   = must be a date in the past or in the present
jakarta.validation.constraints.Pattern.message         = must match "{regexp}"
jakarta.validation.constraints.Positive.message        = must be greater than 0
jakarta.validation.constraints.PositiveOrZero.message  = must be greater than or equal to 0
jakarta.validation.constraints.Size.message            = size must be between {min} and {max}

org.hibernate.validator.constraints.CreditCardNumber.message        = invalid credit card number
org.hibernate.validator.constraints.Currency.message                = invalid currency (must be one of {value})
org.hibernate.validator.constraints.EAN.message                     = invalid {type} barcode
org.hibernate.validator.constraints.Email.message                   = not a well-formed email address
org.hibernate.validator.constraints.ISBN.message                    = invalid ISBN
org.hibernate.validator.constraints.Length.message                  = length must be between {min} and {max}
org.hibernate.validator.constraints.CodePointLength.message         = length must be between {min} and {max}
org.hibernate.validator.constraints.LuhnCheck.message               = the check digit for ${validatedValue} is invalid, Luhn Modulo 10 checksum failed
org.hibernate.validator.constraints.Mod10Check.message              = the check digit for ${validatedValue} is invalid, Modulo 10 checksum failed
org.hibernate.validator.constraints.Mod11Check.message              = the check digit for ${validatedValue} is invalid, Modulo 11 checksum failed
org.hibernate.validator.constraints.ModCheck.message                = the check digit for ${validatedValue} is invalid, {modType} checksum failed
org.hibernate.validator.constraints.Normalized.message              = must be normalized
org.hibernate.validator.constraints.NotBlank.message                = may not be empty
org.hibernate.validator.constraints.NotEmpty.message                = may not be empty
org.hibernate.validator.constraints.ParametersScriptAssert.message  = script expression "{script}" didn't evaluate to true
org.hibernate.validator.constraints.Range.message                   = must be between {min} and {max}
org.hibernate.validator.constraints.ScriptAssert.message            = script expression "{script}" didn't evaluate to true
org.hibernate.validator.constraints.UniqueElements.message          = must only contain unique elements
org.hibernate.validator.constraints.URL.message                     = must be a valid URL

org.hibernate.validator.constraints.br.CNPJ.message                 = invalid Brazilian corporate taxpayer registry number (CNPJ)
org.hibernate.validator.constraints.br.CPF.message                  = invalid Brazilian individual taxpayer registry number (CPF)
org.hibernate.validator.constraints.br.TituloEleitoral.message      = invalid Brazilian Voter ID card number

org.hibernate.validator.constraints.pl.REGON.message                = invalid Polish Taxpayer Identification Number (REGON)
org.hibernate.validator.constraints.pl.NIP.message                  = invalid VAT Identification Number (NIP)
org.hibernate.validator.constraints.pl.PESEL.message                = invalid Polish National Identification Number (PESEL)

org.hibernate.validator.constraints.time.DurationMax.message        = must be shorter than${inclusive == true ? ' or equal to' : ''}${days == 0 ? '' : days == 1 ? ' 1 day' : ' ' += days += ' days'}${hours == 0 ? '' : hours == 1 ? ' 1 hour' : ' ' += hours += ' hours'}${minutes == 0 ? '' : minutes == 1 ? ' 1 minute' : ' ' += minutes += ' minutes'}${seconds == 0 ? '' : seconds == 1 ? ' 1 second' : ' ' += seconds += ' seconds'}${millis == 0 ? '' : millis == 1 ? ' 1 milli' : ' ' += millis += ' millis'}${nanos == 0 ? '' : nanos == 1 ? ' 1 nano' : ' ' += nanos += ' nanos'}
org.hibernate.validator.constraints.time.DurationMin.message        = must be longer than${inclusive == true ? ' or equal to' : ''}${days == 0 ? '' : days == 1 ? ' 1 day' : ' ' += days += ' days'}${hours == 0 ? '' : hours == 1 ? ' 1 hour' : ' ' += hours += ' hours'}${minutes == 0 ? '' : minutes == 1 ? ' 1 minute' : ' ' += minutes += ' minutes'}${seconds == 0 ? '' : seconds == 1 ? ' 1 second' : ' ' += seconds += ' seconds'}${millis == 0 ? '' : millis == 1 ? ' 1 milli' : ' ' += millis += ' millis'}${nanos == 0 ? '' : nanos == 1 ? ' 1 nano' : ' ' += nanos += ' nanos'}

ValidEmail.email=Invalid Email
PasswordMatches.userDto=Passwords do not match

login.page.title=Login
login.page.logout.msg=You have logged out.
login.page.bad-credential=Username or password is wrong
login.page.form.username=Username
login.page.form.password=Password
login.page.form.submit=Login
index.page.menu.sign-out=Sign Out
login.page.form.remember-me=Remember me
```

```properties
# Passay 属性
HISTORY_VIOLATION=密码和您最近用过的 {0} 个密码之一重复。
ILLEGAL_WORD=密码包含了黑名单字典中的词 {0}。
ILLEGAL_WORD_REVERSED=密码包含了保留字典中的词 {0}。
ILLEGAL_DIGEST_WORD=密码包含了字典中的词。
ILLEGAL_DIGEST_WORD_REVERSED=密码包含了保留字典中的词。
ILLEGAL_MATCH=密码匹配了非法结构 {0}。
ALLOWED_MATCH=密码必须要匹配结构 {0}。
ILLEGAL_CHAR=密码 {1} 非法字符 {0}。
ALLOWED_CHAR=密码 {1} 非法字符 {0}。
ILLEGAL_QWERTY_SEQUENCE=密码包含非法的QWERTY序列 {0}。
ILLEGAL_ALPHABETICAL_SEQUENCE=密码包含非法的字母序列 {0}。
ILLEGAL_NUMERICAL_SEQUENCE=密码包含非法的数字序列 {0}。
ILLEGAL_USERNAME=密码 {1} 用户 id {0}。
ILLEGAL_USERNAME_REVERSED=密码 {1} 倒序的用户 id {0}。
ILLEGAL_WHITESPACE=密码 {1} 空格。
ILLEGAL_NUMBER_RANGE=密码 {1} 数字 {0}.
ILLEGAL_REPEATED_CHARS=密码中包含 {2} 序列 {0} 的一个或多个重复字符, 但仅允许 {1} 个: {3}。
INSUFFICIENT_UPPERCASE=密码中必须包含至少 {0} 个大写字母。
INSUFFICIENT_LOWERCASE=密码中必须包含至少 {0} 个小写字母。
INSUFFICIENT_ALPHABETICAL=密码中必须包含至少 {0} 个字母。
INSUFFICIENT_DIGIT=密码中必须包含至少 {0} 个数字。
INSUFFICIENT_SPECIAL=密码中必须包含至少 {0} 个特殊字符。
INSUFFICIENT_CHARACTERISTICS=密码匹配了 {0} of {2} 字符规则, 但只允许 {1} 个。
INSUFFICIENT_COMPLEXITY=密码符合了 {1} 个复杂规则, 但需要符合 {2} 个。
INSUFFICIENT_COMPLEXITY_RULES=对于密码长度 {0}，没有配置规则。
SOURCE_VIOLATION=密码不能和之前的 {0} 个历史密码相同。
TOO_LONG=密码长度不能超过 {1} 个字符。
TOO_SHORT=密码长度不能少于 {0} 个字符。
TOO_MANY_OCCURRENCES=密码包含 {1} 个 {0}, 但是至多只允许 {2} 个。

jakarta.validation.constraints.AssertFalse.message     = \u53ea\u80fd\u4e3afalse
jakarta.validation.constraints.AssertTrue.message      = \u53ea\u80fd\u4e3atrue
jakarta.validation.constraints.DecimalMax.message      = \u5fc5\u987b\u5c0f\u4e8e\u6216\u7b49\u4e8e{value}
jakarta.validation.constraints.DecimalMin.message      = \u5fc5\u987b\u5927\u4e8e\u6216\u7b49\u4e8e{value}
jakarta.validation.constraints.Digits.message          = \u6570\u5b57\u7684\u503c\u8d85\u51fa\u4e86\u5141\u8bb8\u8303\u56f4(\u53ea\u5141\u8bb8\u5728{integer}\u4f4d\u6574\u6570\u548c{fraction}\u4f4d\u5c0f\u6570\u8303\u56f4\u5185)
jakarta.validation.constraints.Email.message           = \u4e0d\u662f\u4e00\u4e2a\u5408\u6cd5\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740
jakarta.validation.constraints.Future.message          = \u9700\u8981\u662f\u4e00\u4e2a\u5c06\u6765\u7684\u65f6\u95f4
jakarta.validation.constraints.FutureOrPresent.message = \u9700\u8981\u662f\u4e00\u4e2a\u5c06\u6765\u6216\u73b0\u5728\u7684\u65f6\u95f4
jakarta.validation.constraints.Max.message             = \u6700\u5927\u4e0d\u80fd\u8d85\u8fc7{value}
jakarta.validation.constraints.Min.message             = \u6700\u5c0f\u4e0d\u80fd\u5c0f\u4e8e{value}
jakarta.validation.constraints.Negative.message        = \u5fc5\u987b\u662f\u8d1f\u6570
jakarta.validation.constraints.NegativeOrZero.message  = \u5fc5\u987b\u662f\u8d1f\u6570\u6216\u96f6
jakarta.validation.constraints.NotBlank.message        = \u4e0d\u80fd\u4e3a\u7a7a
jakarta.validation.constraints.NotEmpty.message        = \u4e0d\u80fd\u4e3a\u7a7a
jakarta.validation.constraints.NotNull.message         = \u4e0d\u80fd\u4e3anull
jakarta.validation.constraints.Null.message            = \u5fc5\u987b\u4e3anull
jakarta.validation.constraints.Past.message            = \u9700\u8981\u662f\u4e00\u4e2a\u8fc7\u53bb\u7684\u65f6\u95f4
jakarta.validation.constraints.PastOrPresent.message   = \u9700\u8981\u662f\u4e00\u4e2a\u8fc7\u53bb\u6216\u73b0\u5728\u7684\u65f6\u95f4
jakarta.validation.constraints.Pattern.message         = \u9700\u8981\u5339\u914d\u6b63\u5219\u8868\u8fbe\u5f0f"{regexp}"
jakarta.validation.constraints.Positive.message        = \u5fc5\u987b\u662f\u6b63\u6570
jakarta.validation.constraints.PositiveOrZero.message  = \u5fc5\u987b\u662f\u6b63\u6570\u6216\u96f6
jakarta.validation.constraints.Size.message            = \u4e2a\u6570\u5fc5\u987b\u5728{min}\u548c{max}\u4e4b\u95f4

org.hibernate.validator.constraints.CreditCardNumber.message        = \u4e0d\u5408\u6cd5\u7684\u4fe1\u7528\u5361\u53f7\u7801
org.hibernate.validator.constraints.Currency.message                = \u4e0d\u5408\u6cd5\u7684\u8d27\u5e01 (\u5fc5\u987b\u662f{value}\u5176\u4e2d\u4e4b\u4e00)
org.hibernate.validator.constraints.EAN.message                     = \u4e0d\u5408\u6cd5\u7684{type}\u6761\u5f62\u7801
org.hibernate.validator.constraints.Email.message                   = \u4e0d\u662f\u4e00\u4e2a\u5408\u6cd5\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740
org.hibernate.validator.constraints.Length.message                  = \u957f\u5ea6\u9700\u8981\u5728{min}\u548c{max}\u4e4b\u95f4
org.hibernate.validator.constraints.CodePointLength.message         = \u957f\u5ea6\u9700\u8981\u5728{min}\u548c{max}\u4e4b\u95f4
org.hibernate.validator.constraints.LuhnCheck.message               = ${validatedValue}\u7684\u6821\u9a8c\u7801\u4e0d\u5408\u6cd5, Luhn\u6a2110\u6821\u9a8c\u548c\u4e0d\u5339\u914d
org.hibernate.validator.constraints.Mod10Check.message              = ${validatedValue}\u7684\u6821\u9a8c\u7801\u4e0d\u5408\u6cd5, \u6a2110\u6821\u9a8c\u548c\u4e0d\u5339\u914d
org.hibernate.validator.constraints.Mod11Check.message              = ${validatedValue}\u7684\u6821\u9a8c\u7801\u4e0d\u5408\u6cd5, \u6a2111\u6821\u9a8c\u548c\u4e0d\u5339\u914d
org.hibernate.validator.constraints.ModCheck.message                = ${validatedValue}\u7684\u6821\u9a8c\u7801\u4e0d\u5408\u6cd5, {modType}\u6821\u9a8c\u548c\u4e0d\u5339\u914d
org.hibernate.validator.constraints.NotBlank.message                = \u4e0d\u80fd\u4e3a\u7a7a
org.hibernate.validator.constraints.NotEmpty.message                = \u4e0d\u80fd\u4e3a\u7a7a
org.hibernate.validator.constraints.ParametersScriptAssert.message  = \u6267\u884c\u811a\u672c\u8868\u8fbe\u5f0f"{script}"\u6ca1\u6709\u8fd4\u56de\u671f\u671b\u7ed3\u679c
org.hibernate.validator.constraints.Range.message                   = \u9700\u8981\u5728{min}\u548c{max}\u4e4b\u95f4
org.hibernate.validator.constraints.ScriptAssert.message            = \u6267\u884c\u811a\u672c\u8868\u8fbe\u5f0f"{script}"\u6ca1\u6709\u8fd4\u56de\u671f\u671b\u7ed3\u679c
org.hibernate.validator.constraints.URL.message                     = \u9700\u8981\u662f\u4e00\u4e2a\u5408\u6cd5\u7684URL

org.hibernate.validator.constraints.time.DurationMax.message        = \u5fc5\u987b\u5c0f\u4e8e${inclusive == true ? '\u6216\u7b49\u4e8e' : ''}${days == 0 ? '' : days += '\u5929'}${hours == 0 ? '' : hours += '\u5c0f\u65f6'}${minutes == 0 ? '' : minutes += '\u5206\u949f'}${seconds == 0 ? '' : seconds += '\u79d2'}${millis == 0 ? '' : millis += '\u6beb\u79d2'}${nanos == 0 ? '' : nanos += '\u7eb3\u79d2'}
org.hibernate.validator.constraints.time.DurationMin.message        = \u5fc5\u987b\u5927\u4e8e${inclusive == true ? '\u6216\u7b49\u4e8e' : ''}${days == 0 ? '' : days += '\u5929'}${hours == 0 ? '' : hours += '\u5c0f\u65f6'}${minutes == 0 ? '' : minutes += '\u5206\u949f'}${seconds == 0 ? '' : seconds += '\u79d2'}${millis == 0 ? '' : millis += '\u6beb\u79d2'}${nanos == 0 ? '' : nanos += '\u7eb3\u79d2'}

ValidEmail.email=非法电子邮件地址
PasswordMatches.userDto=密码输入不一致

login.page.title=登录
login.page.logout.msg=您已退出登录
login.page.bad-credential=用户名或密码不正确
login.page.form.username=用户名
login.page.form.password=密码
login.page.form.submit=登录
index.page.menu.sign-out=退出登录
login.page.form.remember-me=记住我
```

启动，看到打印的信息已经进行了国际化：

![image-20221121223920155](http://www.iocaop.com/images/2022-11/202211212239219.png)

### jsr380验证消息的国际化

上面我们只配置了passay的验证消息国际化，那还有jsr380消息验证也想国际化，就需要再配置：

```java
    @Bean
    public LocalValidatorFactoryBean localValidatorFactoryBean(){
        LocalValidatorFactoryBean localValidatorFactoryBean = new LocalValidatorFactoryBean();
        localValidatorFactoryBean.setValidationMessageSource(messageSource);
        return localValidatorFactoryBean;
    }
```

![image-20221121224829739](http://www.iocaop.com/images/2022-11/202211212248798.png)

之前已经添加好国际化消息的键值，现在来测试一下，把校验邮箱的改一下：

![image-20221121225031355](http://www.iocaop.com/images/2022-11/202211212250426.png)

重启，测试一下：

![image-20221121225121841](http://www.iocaop.com/images/2022-11/202211212251904.png)

也实现了国际化。

## 3-6异常的处理

导入异常处理框架：

```xml
        <dependency>
            <groupId>org.zalando</groupId>
            <artifactId>problem-spring-web</artifactId>
            <version>0.27.0</version>
        </dependency>
```

创建一个处理器，实现ProblemHandling接口，用于处理非Security的异常：

```java
@ControllerAdvice
public class ExceptionHandler implements ProblemHandling {

    /**
     * 是否返回堆栈信息
     * @return
     */
    @Override
    public boolean isCausalChainsEnabled() {
        return true;
    }
}
```

创建一个处理器，用于处理Security的异常：

```java
public class SecurityAdviceHandler implements SecurityAdviceTrait {

}

```

在Security配置中添加：

![image-20221121232414658](http://www.iocaop.com/images/2022-11/202211212324736.png)

启动测试结果，打印了堆栈信息，和比较有结构的异常信息：

![image-20221121232443867](http://www.iocaop.com/images/2022-11/202211212324937.png)

但是还是会返回堆栈信息，查资料后，需要在WebMvcConfigurer添加如下代码：

```java
    @Bean
    public ObjectMapper objectMapper(){
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModules(new ProblemModule(),new ConstraintViolationProblemModule());
        return objectMapper;
    }
```

## 3-7 多个安全配置共存

我们之前做的是即支持json登录，也支持页面上表单的方式登录。那要将这两种方式的配置进行分离，怎么做？

抽取配置文件：

```java
@SuppressWarnings("all")
@EnableWebSecurity(debug = true)
@Order(100)
@Configuration
public class LoginSecurityConfig extends WebSecurityConfigurerAdapter {


    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth->auth.anyRequest().authenticated())
                // 表单配置
                .formLogin(form->form
                        .loginPage("/login")

                                .permitAll()
//                        .successHandler(((request, response, authentication) -> {
//                            response.setStatus(HttpServletResponse.SC_OK);
//                            response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));
//                        }))
//                        .failureHandler(((request, response, exception) -> {
//                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                            response.setCharacterEncoding("UTF-8");
//                            response.getWriter().println(new ObjectMapper().writeValueAsString(exception));
//                        }))



                ).csrf(csrf -> csrf.ignoringAntMatchers("/auth/**", "/admin/**", "/api/**"));
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        // 配置不需要经过过滤器链的路径
        web.ignoring()
                // 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().passwordEncoder(passwordEncoder)
                .withUser("admin")
                .roles("ADMIN")
                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")
                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")
                .roles("ADMIN");
    }


}
```

```java
@SuppressWarnings("all")
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
@Import(SecurityProblemSupport.class)
@Order(99)
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final ObjectMapper objectMapper;

    private final SecurityProblemSupport securityProblemSupport;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .requestMatchers(req -> req.mvcMatchers("/api/**", "/admin/**", "/auth/**")).exceptionHandling(exp ->
                        exp.authenticationEntryPoint(securityProblemSupport)
                                .accessDeniedHandler(securityProblemSupport)
                )

                // 授权配置
                .authorizeHttpRequests(req -> req
                        .antMatchers("/auth/**").permitAll()
                        .antMatchers("/admin/**").hasRole("ADMIN")
                        .antMatchers("/api/**").hasRole("USER")
                        .anyRequest().authenticated()
                )
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterAt(restAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)

                // 插入过滤器，替代内置的登录认证过滤器
//                .csrf(csrf -> csrf.disable())

//                 HTTP配置
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(csrf -> csrf.disable())

//                 跨域配置
                .csrf(csrf -> csrf.ignoringAntMatchers("/auth/**", "/admin/**", "/api/**"));
//                .logout(logout->logout.logoutUrl("/perform_logout").permitAll()
    }


//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .requestMatchers(req -> req.mvcMatchers("/api/**", "/admin/**", "/auth/**"))
//                .sessionManagement(sessionManagement -> sessionManagement
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .exceptionHandling(exceptionHandling -> exceptionHandling
//                        .authenticationEntryPoint(securityProblemSupport)
//                        .accessDeniedHandler(securityProblemSupport))
//                .authorizeRequests(authorizeRequests -> authorizeRequests
//                        .antMatchers("/auth/**").permitAll()
//                        .antMatchers("/admin/**").hasRole("ADMIN")
//                        .antMatchers("/api/**").hasRole("USER")
//                        .anyRequest().authenticated())
//                .addFilterAt(restAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
//                .csrf(csrf -> csrf.ignoringAntMatchers("/auth/**", "/admin/**", "/api/**"))
//                .formLogin(AbstractHttpConfigurer::disable)
//                .httpBasic(AbstractHttpConfigurer::disable);
//    }

    private RestAuthenticationFilter restAuthenticationFilter() throws Exception {
        // 构造器注入objectMapper，所以需要传参，那么在本类也使用构造器注入，再传进来
        RestAuthenticationFilter restAuthenticationFilter = new RestAuthenticationFilter(objectMapper);

        // 设置鉴权成功处理器
        restAuthenticationFilter.setAuthenticationSuccessHandler(((request, response, authentication) -> {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().println(new ObjectMapper().writeValueAsString(authentication));
        }));

        // 设置鉴权失败处理器
        restAuthenticationFilter.setAuthenticationFailureHandler(((request, response, exception) -> {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setCharacterEncoding("UTF-8");
            response.getWriter().println(new ObjectMapper().writeValueAsString(exception));
        }));

        // 设置认证管理器(用什么做认证)
        restAuthenticationFilter.setAuthenticationManager(this.authenticationManager());

        // 设置过滤器应用的url
        restAuthenticationFilter.setFilterProcessesUrl("/auth/login");

        return restAuthenticationFilter;
    }


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers( "/error/**")
//                .mvcMatchers("/auth/**");
        // 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().passwordEncoder(this.passwordEncoder())
                .withUser("admin")
                .roles("ADMIN")
                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")
                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")
                .roles("ADMIN");
    }

    /**
     * 密码编码器-需要放到ioc中
     *
     * @return {@link PasswordEncoder}
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // 默认的密码编码器
        String idForDefault = "bcrypt";
        // 该系统中支持的密码编码器
        Map<String, PasswordEncoder> passwordEncoderMap = Map.of(idForDefault, new BCryptPasswordEncoder(),
                "SHA-1", new MessageDigestPasswordEncoder("SHA-1"));
        return new DelegatingPasswordEncoder(idForDefault, passwordEncoderMap);
    }
}

```

这样，使用表单登录和使用json登录两种方式的配置就分开了，不写在一起，但是需要设置顺序Order()，不然会报错。

## 4-1 核心组件SecurityContext

### SpringSecurity中的包：

* Remoting、CAS、OpenID、LDAP、ACL、

* Web、Core、Config

* OAuth2 Core、OAuth2 Client、OAuth JOSE、OAuth2 Resource Server

### 核心组件：

* SecurityContext：安全上下文，用来存储当前认证的用户的详细信息
* SecurityContextHolder：工具类，提供了对安全上下文SecurityContext的访问，默认是ThreadLocal对象存储上下文。
* Authentication
  * 存储了当前用户的详细信息
  * Principal 可以理解为用户的信息
  * Credentials 可以理解为密码
  * Authorities 可以理解为权限

![image-20221122220830728](http://www.iocaop.com/images/2022-11/202211222208799.png)

  ### Authentication

是认证体系中的核心元素，SpringSecurity内建了很多派生类，比如用户名密码的那个UsernamePasswordAuthenticationToken

![image-20221122221556716](http://www.iocaop.com/images/2022-11/202211222215858.png)

Principal定义了一个接口，用来存储用户信息，相比Object就多了一个getName方法，其他的由实现类具体实现。

![image-20221122222205123](http://www.iocaop.com/images/2022-11/202211222222164.png)

Authentication也是一个接口：

![image-20221122222509903](http://www.iocaop.com/images/2022-11/202211222225944.png)

AbstractAuthenticationToken抽象类实现了一部分Authentication的方法，后面我们做自定义认证时直接继承这个类，会很方便，比如UsernamePasswordAuthenticationToken就是继承了这个类。

Principal是一个Object可以放任意的东西。UserDetails就是其中一种。

## 4-2 UserDetails和UserDetaisService

UserDetails是什么？放用户信息，是SpringSecurity定义的一个接口，用来约束我们，需要提供用户的这些信息。

![image-20221122223324306](http://www.iocaop.com/images/2022-11/202211222233350.png)

UserDetailsService是什么？用来获取用户信息。只有一个方法，根据用户名获取用户信息。

![image-20221122223437355](http://www.iocaop.com/images/2022-11/202211222234400.png)

这两个接口不负责认证，只是提供数据，一般都是通过扩展这两个接口来实现自定义的数据库结构。

### 使用

来配置一下基于数据库的认证，原来是内存的。之类使用H2，后面再切换mysql

依赖：

```xml
 		<!--    jdbc    -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <!--   h2数据库     -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
```

配置类：

```yaml
  datasource:
    driver-class-name: org.h2.Driver
    password: ''
    # MODE=MySQL 兼容Mysql
    # DATABASE_TO_LOWER=TRUE 表名转为小写
    # CASE_INSENSITIVE_IDENTIFIERS=TRUE 不区分大小写
    # DB_CLOSE_DELAY=-1不自动关闭数据库连接
    url: jdbc:h2:mem:test;MODE=MySQL;DATABASE_TO_LOWER=TRUE;CASE_INSENSITIVE_IDENTIFIERS=TRUE;DB_CLOSE_DELAY=-1
    # 数据库用户名
    username: sa
  devtools:
    livereload:
      enabled: true
    restart:
      enabled: true
  h2:
    console:
      # 显示 H2 嵌入式 UI 管理界面
      enabled: true
      # 访问 H2 管理界面的路径
      path: /h2-console
      settings:
        # 禁止输出 Trace 信息
        trace: false
        # 禁止远程访问 H2 管理界面
        web-allow-others: false
```

配置使用jdbc进行认证:

```java
    @Autowired
    DataSource dataSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())
                .jdbcAuthentication().passwordEncoder(this.passwordEncoder())
                // 数据源
                .dataSource(dataSource)
                // 使用默认表结构
                .withDefaultSchema()
                
                .withUser("admin")
                .roles("ADMIN")
                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")
                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")
                .roles("ADMIN");
    }
```

配置h2数据库不拦截：

```java
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers( "/error/**","/h2-console/**")
//                .mvcMatchers("/auth/**");
        // 参数里面的是写好的静态资源一般存放的路径，不需要我们手动来写了
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }
```

配置sql打印：

```yaml
server:
  port: 8080
logging:
  level:
    org.springframework.security: debug
    org.springframework.jdbc.core: trace
```

启动，调用登录接口/auth/login，进入我们自定义的json登录的过滤器，可以看到打印了sql执行语句：

![image-20221122231327058](http://www.iocaop.com/images/2022-11/202211222313134.png)

进入h2的web控制台，可以看到创建了默认的用户表和权限表，我们配置的用户也自动插入了：

![image-20221122231609690](http://www.iocaop.com/images/2022-11/202211222316757.png)

## 4-3 定制化数据库

上一节用的是默认表结构，下面我们把默认的ddl拷贝过来，放在resource目录下，命名为schema.sql，项目启动时这个脚本就会自动运行。

```sql

DROP TABLE IF EXISTS users;
CREATE TABLE users  (
                          username varchar(50) NOT NULL,
                          password varchar(100) NOT NULL,
                          enabled tinyint(4) NOT NULL DEFAULT 1,
                          PRIMARY KEY (`username`)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS authorities;
CREATE TABLE authorities  (
                                username varchar(50)  NOT NULL,
                                authority varchar(50) NOT NULL,
                                CONSTRAINT fk_authorities_users FOREIGN KEY (username) REFERENCES users (username)) ENGINE = InnoDB;
CREATE UNIQUE INDEX ix_auth_username on authorities(username, authority) ;
```

然后还需要往表里加数据，同理，在resource创建data.sql，启动项目时会自动运行：

```sql
insert  into users(username,password,enabled) values
('admin','{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS',1),
('lzc','{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a',1);

insert  into authorities(username,authority) values
('admin','ROLE_ADMIN'),
('lzc','ROLE_ADMIN');
```

配置文件：

```yaml
  datasource:
    # 在使用嵌入式数据库时加载脚本
    initialization-mode: embedded
```

版本不一样可能配置时候有区别：

![image-20221201235434586](http://www.iocaop.com/images/2022-12/202212012354665.png)



加完以后，我们把原来配置的默认表结构和添加的用户注释掉：

```java
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())
                .jdbcAuthentication().passwordEncoder(this.passwordEncoder())
                // 数据源
                .dataSource(dataSource)
//                // 使用默认表结构
//                .withDefaultSchema()
//
//                .withUser("admin")
//                .roles("ADMIN")
//                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")
//                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")
//                .roles("ADMIN")
        ;
    }
```

启动项目，进入h2-console看看有没有运行：

![image-20221201235634918](http://www.iocaop.com/images/2022-12/202212020016002.png)

postman登陆一下试试：

![image-20221201235733188](http://www.iocaop.com/images/2022-12/202212012357257.png)

接下来，修改一下表结构，给这两个表加前缀security_，再给user表加一个字段：full_name

```sql
DROP TABLE IF EXISTS security_users;
CREATE TABLE security_users  (
                        username varchar(50) NOT NULL,
                        password varchar(100) NOT NULL,
                        enabled tinyint(4) NOT NULL DEFAULT 1,
                        full_name varchar(50) NOT NULL,
                        PRIMARY KEY (`username`)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS security_authorities;
CREATE TABLE security_authorities  (
                              username varchar(50)  NOT NULL,
                              authority varchar(50) NOT NULL,
                              CONSTRAINT fk_authorities_users FOREIGN KEY (username) REFERENCES security_users (username)) ENGINE = InnoDB;
CREATE UNIQUE INDEX ix_auth_username on security_authorities(username, authority) ;
```

```sql
insert into security_users(username, password, enabled,full_name)
values ('admin', '{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS', 1,'管理员'),
       ('lzc', '{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a', 1,'赖卓成');

insert into security_authorities(username, authority)
values ('admin', 'ROLE_ADMIN'),
       ('lzc', 'ROLE_ADMIN');
```

再配置一下根据用户名查询用户和根据用户名查询用户权限的SQL:

```java
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())
                .jdbcAuthentication().passwordEncoder(this.passwordEncoder())
                // 数据源
                .dataSource(dataSource)
                .usersByUsernameQuery("select username,password,enabled from security_users where username = ? ")
                .authoritiesByUsernameQuery("select username,authority from security_authorities where username = ?")
//                // 使用默认表结构
//                .withDefaultSchema()
//
//                .withUser("admin")
//                .roles("ADMIN")
//                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")
//                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")
//                .roles("ADMIN")
        ;
    }
```

重启看数据库，表名和数据已经变了：

![image-20221202001038127](http://www.iocaop.com/images/2022-12/202212020010213.png)

以上是最基础的数据库定制化，已经非常强大了，但是后面还会有更强大的定制化方式。

## 4-4 深度定制化数据库-创建实体类实现 UserDetails 和 GrantedAuthority

为什么在配置类使用withUser方法可以配置用户？

其实是通过JdbcUserDetailsManager来的，里面内置了一些sql语句，包括usersByUsernameQuery、authoritiesByUsernameQuery也是一样的：

![image-20221210145253800](http://www.iocaop.com/images/2022-12/202212101452981.png)

现在我们不用内建的withDefaultSchema了，我们自己创建数据库来保存用户信息，就要去替换JdbcDaoImpl中的一些query，可以通过下面的方法来替换：

![image-20221210145801712](http://www.iocaop.com/images/2022-12/202212101458818.png)

我们要定制，就实现自己的UserDetail和UserDetailService，课程用的是JPA。

导入JPA依赖，把原来的JDBC的依赖删掉。

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
```

配置jpa：

```yaml
spring:
   jpa:
    database: h2
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop
```

因为hibernate也会自动创建表，所以原来的建表sql可以不需要了，删掉即可。

现在我们把User类改造成符合UserDetails，就是实现该接口，需要重写方法，先不管isAccountNonExpired、isAccountNonLocked、isCredentialsNonExpired这三个方法，因为现在不需要数据库来管理用户过期、锁定、密码过期之类的，直接返回true，如果要交给数据库来管理这几个字段，只需要定义基本类型布尔的字段就好，不需要重写了，因为lombok会帮忙重写。

因为我们使用JPA，所以可以用注解@Table来指定表名，hibernate会自动帮我们建表。处理一下报错，比如需要添加主键之类的，字段限制等，最终还剩一个方法没有重写，就是获取用户角色，后续处理：

```java
@Data
@Entity
@Table(appliesTo = "security_users")
public class User implements Serializable, UserDetails {
    @Column(length = 50,nullable = false,unique = true)
    private String username;

    @Column(length = 50,nullable = false,name = "password_hash")
    private String password;

    @Column(length = 255,nullable = true,unique = true)
    private String email;

    @Column(length = 50)
    private String name;

    /**
     * 启用 因为是基本类型，lombok生成的方法就是isEnabled 刚好重写了UserDetails的isEnabled方法，
     * 所以可以删除快捷键生成的isEnabled，也就是不需要我们手动重写了。包装类型不能这样。
     */
    @Column(nullable = false)
    private boolean enabled;

    /**
     * 下面三个字段也是同理
     */
    @Column(name = "account_non_locked",nullable = false)
    private boolean accountNonLocked;

    @Column(name = "account_non_expired",nullable = false)
    private boolean accountNonExpired;

    @Column(name = "credentials_non_expired",nullable = false)
    private boolean credentialsNonExpired;

    /**
     * 指定主键和生成策略为自增
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }


//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }

//    @Override
//    public boolean isEnabled() {
//        return false;
//    }

}
```

创建角色表，和实体类,角色类需要实现GrantedAuthority接口：

```java
/**
 * 角色
 *
 * @author lzc
 * @date 2022/12/10
 */
@Entity
@Table("security_role")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role implements GrantedAuthority, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_name",unique = true,nullable = false,length = 50)
    private String authority;

    @Override
    public String getAuthority() {
        return null;
    }
}

```

现在需要进行表关联，需要一个中间表，users_roles,因为使用了Hibernate，可以直接在User类中进行定义，刚好类型是Set\<Role\>，lombok也会帮我们定义方法，也不需要手动实现getAuthorities方法了。但是需要用注解手动配置关联关系，最终用户表和角色表如下：

```java
/**
 * 用户
 *
 * @author lzc
 * @date 2022/11/14
 */
@Data
@Entity
@Table(name = "security_user")
public class User implements Serializable, UserDetails {
    /**
     * 指定主键和生成策略为自增
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50,nullable = false,unique = true)
    private String username;

    @Column(length = 50,nullable = false,name = "password_hash")
    private String password;

    @Column(length = 255,nullable = true,unique = true)
    private String email;

    @Column(length = 50)
    private String name;

    /**
     * 启用 因为是基本类型，lombok生成的方法就是isEnabled 刚好重写了UserDetails的isEnabled方法，
     * 所以可以删除快捷键生成的isEnabled，也就是不需要我们手动重写了。包装类型不能这样。
     */
    @Column(nullable = false)
    private boolean enabled;

    /**
     * 下面三个字段也是同理
     */
    @Column(name = "account_non_locked",nullable = false)
    private boolean accountNonLocked;

    @Column(name = "account_non_expired",nullable = false)
    private boolean accountNonExpired;

    @Column(name = "credentials_non_expired",nullable = false)
    private boolean credentialsNonExpired;

    @ManyToMany
    // 用join的方式查询
    @Fetch(FetchMode.JOIN)
    @JoinTable(name = "security_user_role",
            // User表的 关联字段 可以是数组，里面再用注解进行配置
            joinColumns = {@JoinColumn(
                    // 关联的字段在中间表是user_id 引自security_users表的id
                    name = "user_id",referencedColumnName = "id"),
            },
            // Role表的关联字段
            inverseJoinColumns = {@JoinColumn(
                    // 关联字段在中间表是role_id，引自security_role表的id
                    name = "role_id",referencedColumnName = "id")})
    private Set<Role> authorities;




//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }

//    @Override
//    public boolean isEnabled() {
//        return false;
//    }

}
```

```java
/**
 * 角色
 *
 * @author lzc
 * @date 2022/12/10
 */
@Entity
@Table(name = "security_role")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role implements GrantedAuthority, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_name",unique = true,nullable = false,length = 50)
    private String authority;

//    @Override
//    public String getAuthority() {
//        return null;
//    }
}
```

启动以后，没问题的话会自动建表：

![image-20221210160642817](http://www.iocaop.com/images/2022-12/202212101606930.png)

因为这里使用h2嵌入数据库，hibernate创建表，springboot datasource的init执行插入数据的sql总是报错，说表不存在，而实际登录查看又存在，所以改用了持久化数据库mysql，添加一下jdbc依赖：

```xml
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!--jdbc-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
```

注释h2配置和启动建表配置，并添加mysql连接配置:

```yaml
  datasource:
    type: com.zaxxer.hikari.HikariDataSource           # 当前数据源操作类型
    driver-class-name: com.mysql.cj.jdbc.Driver           # mysql驱动包
    url: jdbc:mysql://www.iocaop.com:3306/imooc_security?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 911823
```

配置方言：

```yaml
  jpa:
    database: mysql
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    hibernate:
    	# 因为存在外键，所以不要每次启动都删除重新创建，在有必要修改是进行修改即可
      ddl-auto: update
    show-sql: true
    # 启动时不查询数据库
    open-in-view: false
```

启动后会自动建表，手动加一下数据:

![image-20221213002135310](http://www.iocaop.com/images/2022-12/202212130021416.png)

![image-20221213002149283](http://www.iocaop.com/images/2022-12/202212130021342.png)

![image-20221213002158746](http://www.iocaop.com/images/2022-12/202212130021805.png)

## 4-5 深度定制化下 - UserDetailsService 和 UserDetailsPasswordService

创建好了实体类，就需要创建持久层和业务层。

UserRepo:

```java
/**
 * 持久层-用户
 *
 * @author lzc
 * @date 2022/12/13
 */
@Repository
public interface UserRepo extends JpaRepository<User,Long> {


    /**
     * 通过用户名查询用户信息
     *
     * @param username 用户名
     * @return {@link Optional}
     */
    Optional<User> findOptionalByUsername(String username);
}
```

RoleRepo:

```java
/**
 * 角色-持久层
 *
 * @author lzc
 * @date 2022/12/13
 */
@Repository
public interface RoleRepo extends JpaRepository<Role,Long> {
}
```

创建用户的业务层接口UserService，继承UserDetailsService：

```java
/**
 * 用户业务层接口
 *
 * @author laizhuocheng
 * @date 2022/12/13
 */
public interface UserService extends UserDetailsService {
}

```

创建实现类，实现UserService接口，并重写其父类方法：

```java
/**
 * 用户-业务层实现类
 *
 * @author lzc
 * @date 2022/12/13
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findOptionalByUsername(username)
                // 返回的是Optional类型，可以用orElseThrow抛出异常 如果为空就会抛异常
                .orElseThrow(() -> new UsernameNotFoundException("未找到用户名"));
    }
}
```

写好业务层和持久层，既可以进行配置，让SpringSecurity使用我们自定义的UserDetailsService,把原来的配置换成下面的：

```java
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
                .passwordEncoder(this.passwordEncoder())
//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())
//                .jdbcAuthentication().passwordEncoder(this.passwordEncoder())
//                // 数据源
//                .dataSource(dataSource)
//                .usersByUsernameQuery("select username,password,enabled from security_users where username = ? ")
//                .authoritiesByUsernameQuery("select username,authority from security_authorities where username = ?")
//                // 使用默认表结构
//                .withDefaultSchema()
//
//                .withUser("admin")
//                .roles("ADMIN")
//                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")
//                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")
//                .roles("ADMIN")
        ;
    }
```

重启，发请求验证一下，是否生效，中文乱码先不管：

![image-20221213181832426](http://www.iocaop.com/images/2022-12/image-20221213181832426.png)

密码被带出来了，所以在password加上注解<span style="background-color:pink;">@JsonIgnore</span>，序列化时忽略密码字段。

还可以创建一个UserDetailsPasswordService的实现类，用来做密码升级：

```java
/**
 * UserDetailsPasswordService 实现类
 *
 * @author lzc
 * @date 2022/12/13
 */
@Service
public class UserDetailsPasswordImpl implements UserDetailsPasswordService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails updatePassword(UserDetails userDetails, String newPassword) {
        return userRepo.findOptionalByUsername(userDetails.getUsername()).map(user -> (UserDetails)userRepo.save(user.withPassword(newPassword))).orElse(userDetails);
    }
    
}
```

在SecurityConfig中注入UserDetailsPasswordService，配置密码自动升级：

```java
    @Autowired
    UserService userService;

    @Autowired
    UserDetailsPasswordService userDetailsPasswordService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
                .userDetailsPasswordManager(userDetailsPasswordService)
                .passwordEncoder(this.passwordEncoder())
        ;
    }
```

启动项目，登录sha-1加密的用户，会自动升级为默认的bcrypt加密方式：

![image-20221214001232308](http://www.iocaop.com/images/2022-12/202212140012433.png)

![image-20221214001313323](http://www.iocaop.com/images/2022-12/202212140013389.png)

这里重写方法用的lamda表达式，可以解释为如下代码：

```java
    public UserDetails updatePassword111(UserDetails userDetails, String newPassword) {
        Optional<User> userOptional = userRepo.findOptionalByUsername(userDetails.getUsername());
        User user = userOptional.get();
        if (null==user){
            return userDetails;
        }
        user.setPassword(newPassword);
        User saveUser = userRepo.save(user);
        return saveUser;
    }
```

```java
    @Override
    public UserDetails updatePassword(UserDetails userDetails, String newPassword) {
        return userRepo.findOptionalByUsername(userDetails.getUsername())
                // 因为是Optional，可以像stream一样，使用map
                .map(user ->
                        // 只有一行，所以省略return,将User类型转为父类类型
                        (UserDetails)
                                // hibernated save返回值是更新或保存后的对象，而不是row影响行数
                                userRepo.save(
                                        // 配合@with注解，使用withXxx后，返回一个新的user对象
                                        user.withPassword(newPassword)))
                // 如果findOptionalByUsername没有找到对应的user，则返回该方法参数中的userDetails
                .orElse(userDetails);
    }
```

## 4-6 环境和环境变量

Spring中的环境配置：application-{profile}.yml

使用系统环境变量：${DB_SCHEMA:test}，先读取系统，没有则使用默认值test

例如:

```yaml
server:
  port: ${SERVER_PORT:8080}
```

如果系统中有SERVER_PORT的环境变量，就用系统的值启动程序，没有则用8080进行启动。

我们实际开发时，会把公用的一些配置写在application.yml中，在其他application-{profile}.yml中配置特定的，配置好以后需要在application-{profile}.yml配置当前使用的是哪个配置：

```yaml
spring:
  profiles:
    active: dev
```

这样我们就可以在java类中使用注解，在特定的环境下启用某些配置，如：

![image-20221214235044657](http://www.iocaop.com/images/2022-12/202212142350774.png)

我们再application.yml中配置：

```yaml
spring:
  profiles:
    active: ${SPRING_ACTIVE_PROFILE:dev}
```

就可以指定程序使用哪个配置启动。

## 4-7 自动化测试

不重要，看旧笔记：<a href = 'https://www.yuque.com/laizhuocheng/zm5yor/qd55hc?#hMvix'>点击跳转</a>

## 5-1 认证流程和源码解析

文字说明：

1. 有请求进入，会到认证过滤器AuthenticationFilter中，这个过滤器主要是获取登录信息，如用户名、密码，无论是表单登录还是json方式登录，最终都会构建成UserPasswordAuthenticationToken(他实现了Authentication接口)，构建后，并没有完全初始化，只是加入了用户名和密码，还有角色、是否已认证等信息

   ![image-20221215001549394](http://www.iocaop.com/images/2022-12/202212150015462.png)

2. 所以，AuthenticationFilter又会把UserPasswordAuthenticationToken放到AuthenticationManager中真正的去执行认证，AuthenticationManager是一个接口类，它里面有一组AuthenticationProviders(可以理解为一种具体的认证机制，对于不同认证过程，会有不同的认证方式，如数据库对比用户名密码、第三方集成认证)。会循环，逐个使用这组AuthenticationProviders进行认证，只要有一个认证成功，就算认证成功。在AuthenticationProviders认证的过程中会调用UserDetailsService去查询UserDetails（这个过程可能是查询数据库，也可能是别的），逐步返回，到AuthenticationFilter时，会把完整的UserPasswordAuthenticationToken也就是Authentication，放到SecurityContext中

流程图：

![image-20221215005349883](http://www.iocaop.com/images/2022-12/202212150053987.png)

源码打断点调试，注意使用表单登录进行调试，因为json登录的方式被我们替换成了自定义过滤器。

先到UsernamePasswordAuthenticationFilter类：

从请求中获取用户名和密码，构建UsernamePasswordAuthenticationToken，并交给AuthenticationManager

![image-20221215230720316](http://www.iocaop.com/images/2022-12/202212152307436.png)

UsernamePasswordAuthenticationToken继承了AbstractAuthenticationToken，并实现了Authentication接口：

![image-20221215230946967](http://www.iocaop.com/images/2022-12/202212152309031.png)

![image-20221215231001993](http://www.iocaop.com/images/2022-12/202212152310051.png)

AuthenticationManager也是一个接口，在SpringSecurity中具体的实现类是：ProviderManager

![image-20221215231525276](http://www.iocaop.com/images/2022-12/202212152315396.png)

所以我们需要到该类找到重写的authenticate方法：

可以看到，UserNamePasswordAuthenticationToken是部分初始化的，并且在该方法中，遍历了Providers，进行认证：

![image-20221215232124223](http://www.iocaop.com/images/2022-12/202212152321334.png)

![image-20221215232219778](http://www.iocaop.com/images/2022-12/202212152322847.png)

遍历时，首先判断当前Provider是否支持该类型的Authentication(UserNamePasswordAuthenticationToken)：

![image-20221215232558576](http://www.iocaop.com/images/2022-12/202212152325652.png)

放行，直到DaoAuthenticationProvider（SpringSecurity默认的数据库的认证方式）才支持，走到下面，就会调用Provider中的认证方法authenticate，所以我们到DaoAuthenticationProvider类去看authenticate方法，在本类没找到，所以肯定在抽象类AbstractUserDetailsAuthenticationProvider中有默认实现：

![image-20221215233625896](http://www.iocaop.com/images/2022-12/202212152336990.png)

实现该方法的，正是DaoAuthenticationProvider：

![image-20221215233827778](http://www.iocaop.com/images/2022-12/202212152338904.png)

完了以后，回到父类AbstractUserDetailsAuthenticationProvider：

![image-20221215234255828](http://www.iocaop.com/images/2022-12/202212152342966.png)

到最后，会创建一个成功的Authentication，跟进去看(注意，这里要看子类的，因为子类重写了。多态)，可以看到：

进行了密码升级，然后再创建一个完整的Authentication

![image-20221215234559999](http://www.iocaop.com/images/2022-12/202212152346064.png)

最终，这个完整的Authentication会被放到SecurityContext当中。

## 5-2  LDAP 配置和多 AuthenticationProvider 共存

存储用户信息的不只有SQL数据库，还有NoSQL数据库，LDAP等方式，SpringSecurity是支持多种异构数据库并且整合起来进行认证。这里用LDAP主要是用来演示多 AuthenticationProvider 共存。

### LDAP基础知识

LDAP是**Lightweight Directory Access Protocol**，**轻型目录访问协议**很多企业用来存储用户组织架构信息，树型结构。

* Entry(Object)

  LDAP目录的一个基本单位，一个节点就是一个Entry，每个条目由它的区别名称(DN)来限定，举例：

  ```tex
  dn:uid=bob,ou=people,dc=acme,dc=org
  ```

* Attributes

  与一个条目相关的信息，比如一个组织的地址或者员工的电话号码

* ObjectClass

  特殊类型的属性，LADP中所有对象都必须有一个ObjectClass属性，<span style="background-color:pink;">ObjectClass定义指定了LDAP需要哪些属性</span>，它指定了一个条目的对象类。

![image-20221216001634907](http://www.iocaop.com/images/2022-12/202212160016990.png)

### LDAP配置

导入依赖：

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-ldap</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.ldap</groupId>
            <artifactId>spring-ldap-core</artifactId>
        </dependency>

        <!--ldap嵌入式数据库-->
        <dependency>
            <groupId>com.unboundid</groupId>
            <artifactId>unboundid-ldapsdk</artifactId>
        </dependency>
```

在resource下添加文件：test-ldap-server.ldif

```ldif
dn: dc=imooc,dc=com
objectClass: top
objectClass: domain

dn: uid=zhaoliu,dc=imooc,dc=com
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn: liu zhao
sn: liu
uid: zhaoliu
userPassword: 123

dn: uid=mike,dc=imooc,dc=com
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn: joe mike
sn: joe
uid: mike
userPassword: 123
```

配置文件：

```yaml
spring: 
  ldap:
    base: dc=imooc,dc=com
    embedded:
      base-dn: dc=imooc,dc=com
      ldif: classpath:test-ldap-server.ldif
      port: 8389
    urls: ldap://localhost:8389/
```

创建实体类，实现UserDetails接口：

```java
/**
 * ldap认证user实体
 *
 * @author lzc
 * @date 2022/12/16
 */
@Entry(
        // 指定具有哪些objectClasses的节点，才能作为该实体
        objectClasses = {"inetOrgPerson","organizationalPerson","person","top"})
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LDAPUser implements UserDetails {

    /**
     * id  javax.naming.Name类型 不序列化这个字段
     */
    @Id
    @JsonIgnore
    private Name id;


    /**
     * 用户名 注解类似column
     */
    @Attribute(name = "uid")
    private String username;

    /**
     * 密码
     */
    @Attribute(name = "userPassword")
    private String password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 做示例，写死，返回用户角色
      return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public boolean isAccountNonExpired() {
        // 做示例，直接返回true
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // 做示例，直接返回true
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // 做示例，直接返回true
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 做示例，直接返回true
        return true;
    }
}

```

创建持久层：LDAPUserRepo，并加一个方法，查询用户：

```java
@Repository
public interface LDAPUserRepo extends LdapRepository<LDAPUser> {


    /**
     * 查询用户
     *
     * @param username 用户名
     * @param password 密码
     * @return {@link Optional}<{@link LDAPUser}>
     */
    Optional<LDAPUser> findByUserNameAndPassword(String username,String password);
}

```

至此，先写个测试类测试一下能不能查询得到：

导入依赖

```xml
  <!-- 用于测试 -->
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```

```java
@DataLdapTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public class LDAPUserRepoTest {

    @Autowired
    LDAPUserRepo ldapUserRepo;


    @Test
    public void test(){
        String username = "zhaoliu";
        String password = "123";
        Optional<LDAPUser> user = ldapUserRepo.findByUsernameAndPassword(username, password);
        assertTrue(user.isPresent());

    }
}
```

测试失败了两次：

1. LDAPUserRepo继承了JpaRepository\<LDAPUer,Name\>，错了，改成LdapRepository\<LDAPUser\>
2. 方法名中字段不存在，findByUserNameAndPassword改成findByUsernameAndPassword

测试成功：

![image-20221216011253193](http://www.iocaop.com/images/2022-12/202212160112287.png)

再给LDAPUser加上final关键字。

再测一个不存在的用户：

![image-20221216144334938](http://www.iocaop.com/images/2022-12/image-20221216144334938.png)

接着就可以创建自己的Provider，继承AbstractUserDetailsAuthenticationProvider，结合上面的认证流程和源码分析，就会明白为什么要重写retrieveUser方法：

```java
/**
 * LDAP 多Provider认证
 *
 * @author laizhuocheng
 * @date 2022/12/16
 */
@RequiredArgsConstructor
public class LDAPMultiAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {


    private final LDAPUserRepo ldapUserRepo;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {

        // 认证检查、先忽略了
    }

    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        // 传参时 用户名直接使用参数中的，密码使用authentication中的credentials
        return ldapUserRepo.findByUsernameAndPassword(username, authentication.getCredentials().toString())
                .orElseThrow(() -> new BadCredentialsException("用户名或密码错误!"));
    }
}
```

写完以后，就需要回到Security配置中配置使用了：

先把两个Provider加进来：一个是我们自定义的LDAP的LDAPMultiAuthenticationProvider，另一个是默认的DaoAuthenticationProvider

```java
    @Autowired
    private LDAPUserRepo ldapUserRepo;

    @Bean
    LDAPMultiAuthenticationProvider ldapMultiAuthenticationProvider() {
        // 因为在LDAPMultiAuthenticationProvider使用构造器注入了ldapUserRepo，所以这里需要传入
        LDAPMultiAuthenticationProvider ldapMultiAuthenticationProvider = new LDAPMultiAuthenticationProvider(ldapUserRepo);
        return ldapMultiAuthenticationProvider;
    }


    @Bean
    DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        // 设置密码加密编辑器
        daoAuthenticationProvider.setPasswordEncoder(this.passwordEncoder());
        // 设置UserService
        daoAuthenticationProvider.setUserDetailsService(userService);
        // 密码自动升级
        daoAuthenticationProvider.setUserDetailsPasswordService(userDetailsPasswordService);
        return daoAuthenticationProvider;
    }
```

把SecurityConfig配置换成这样：

```java
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(this.daoAuthenticationProvider())
                .authenticationProvider(this.ldapMultiAuthenticationProvider());

//                .userDetailsService(userService)
//                .userDetailsPasswordManager(userDetailsPasswordService)
//                .passwordEncoder(this.passwordEncoder())
//                .inMemoryAuthentication().passwordEncoder(this.passwordEncoder())
//                .jdbcAuthentication().passwordEncoder(this.passwordEncoder())
//                // 数据源
//                .dataSource(dataSource)
//                .usersByUsernameQuery("select username,password,enabled from security_users where username = ? ")
//                .authoritiesByUsernameQuery("select username,authority from security_authorities where username = ?")
//                // 使用默认表结构
//                .withDefaultSchema()
//
//                .withUser("admin")
//                .roles("ADMIN")
//                .password("{bcrypt}$2a$10$/VfHFK1hTGZvEQ4Z9HNU8uAwbiIBqTPRvqISbWAqVu7QOBosbxvRS")
//                .and().withUser("lzc").password("{SHA-1}{8HdvRyzHITlQq9a6ree/n0zBNlbCppDkOLfIy84D1CQ=}f0ae494d36cb3dce5da1ec56775989fbe71c345a")
//                .roles("ADMIN")
        ;
    }
```

就实现了多Provider共存。

由于当前配置是用来做rest登录的，想要表单登录也生效，就在表单登录的配置LoginSecurityConfig也加上：

```java
    @Autowired
    private DaoAuthenticationProvider daoAuthenticationProvider;
    @Autowired
    private LDAPMultiAuthenticationProvider ldapMultiAuthenticationProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider)
                .authenticationProvider(ldapMultiAuthenticationProvider);
    }
```

配置完成，进行测试，预期效果应该是表单登录和rest登录都能实现mysql和ldap共存，即用户lzc密码123456可以登录(mysql)，用户zhaoliu密码123也可以登录(ldap)。

测试结果：

表单登录lzc成功(mysql)：

![image-20221216152326095](http://www.iocaop.com/images/2022-12/image-20221216152326095.png)

表单登录zhaoliu成功(ldap)：

![image-20221216152528781](http://www.iocaop.com/images/2022-12/image-20221216152528781.png)

rest登录lzc成功(mysql)：

![image-20221216152620302](http://www.iocaop.com/images/2022-12/image-20221216152620302.png)

rest登录zhaoliu成功(ldap)：

![image-20221216152656582](http://www.iocaop.com/images/2022-12/image-20221216152656582.png)

## 5-3 JWT 的概念和创建以及解析

官网：<a href='https://jwt.io/'>点击跳转</a>

较为成熟的类库：<a href='https://github.com/jwtk/jjwt'>点击跳转</a>

jwt工作流程：

![image-20221216155513312](http://www.iocaop.com/images/2022-12/image-20221216155513312.png)

jwt数据结构：

以.分割，分三段：

![image-20221216155858108](http://www.iocaop.com/images/2022-12/image-20221216155858108.png)

jwt中的一些声明：

保留声明：lss签发者，exp过期时间，sub主题，aud目标

私有声明：claim(key,value)添加任意键值对到jwt中

导入依赖(GitHub上复制)：

```xml
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId> <!-- or jjwt-gson if Gson is preferred -->
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
```

编写工具类：

```java
/**
 * jwt工具
 *
 * @author laizhuocheng
 * @date 2022/12/16
 */
@Component
public class JwtUtil {

    /**
     * 用于签名
     */
    public static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String create(UserDetails userDetails) {

       return Jwts.builder().setId("lzc")
                // 载荷里放角色
                .claim("authorities", userDetails.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toList()))
                // 设置主题为用户名
                .setSubject(userDetails.getUsername())
                // 设置签发时间为当前时间
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // 设置过期时间60秒
                .setExpiration(new Date(System.currentTimeMillis()+60_000))
                // 签名
                .signWith(key,SignatureAlgorithm.HS512)
                .compact();
    }
}
```

单元测试：

```java
@ExtendWith(SpringExtension.class)
class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    public void setUp(){
        this.jwtUtil =  new JwtUtil();
    }

    @Test
    public void testCreate(){
        // 创建角色
        Set<Role> authorities = Set.of(Role.builder().authority("ROLE_USER").build(), Role.builder().authority("ROLE_ADMIN").build());

        // 创建用户，把角色设置好
        User user = User.builder().username("lzc").authorities(authorities).build();

        // 生成token
        String token = jwtUtil.create(user);

        // 解析token
        Claims claims = Jwts.parserBuilder()
                // 签名使用静态变量key，和创建token时一致
                .setSigningKey(JwtUtil.key).build().parseClaimsJws(token)
                // 获取载荷使用getBody()方法
                .getBody();

        // 对比用户名和主题是否一致
       assertEquals(user.getUsername(),claims.getSubject(),"解析后subject应该是用户名");
    }

}
```

测试通过：

![image-20221216165411063](http://www.iocaop.com/images/2022-12/image-20221216165411063.png)

## 5-4 访问令牌和刷新令牌以及JWT外部配置

jwt在客户端或浏览器不暴露给他人看到是很难做到的，需要结合服务器做一些安全校验，如多因子认证、常用ip校验等。一般来说会把访问令牌设置较短的有效期，就算令牌被偷了，等别人拿到的时候，令牌已经过期了,就算没过期，令牌生命周期较短，能做的事也比较少。

有了访问令牌为什么还要有刷新令牌？

刷新令牌和访问令牌是用不同的key来签发的，刷新令牌是没法直接访问的，而是用来调用接口重新获取一个访问令牌。

访问令牌周期：一般是几分钟或几个小时。

刷新令牌周期：一般是几周到不超过一年。

令牌如何存放：

理论上直接放在store(内存中最安全，就没有地方会显性的暴露，如vuex)最安全，但是刷新浏览器需要重新登录。

直接由服务器设置在Cookie中也是比较安全的。

都不合适的场景下建议<span style="background-color:pink;">加密</span>后存在SessionStorage中。

LocalStorage其实是不安全的，不关我们自己的web应用可以访问，其他的应用也可以访问，而且关闭浏览器不会清空。

SessionStorage相对LocalStorage会稍微安全一点，关闭浏览器后会清空。

### 编写Jwt工具类

SpringSecurity中没有内建的JwtFilter，OAuth中是有的，所以现在这里要自己实现。

在做之前，需要完善一下JwtUtil，因为还有一个刷新令牌。

创建配置类，使令牌过期时间可以在外部配置：

```java
/**
 * 应用程序属性  在yaml中配置，如lzc.jwt.access-token-expire-time=111
 *
 * @author laizhuocheng
 * @date 2022/12/16
 */
@Configuration
@ConfigurationProperties(prefix = "lzc")
public class ApplicationProperties {


    @Getter
    @Setter
    private Jwt jwt = new Jwt();

    @Getter
    @Setter
    public static class Jwt{
        /**
         * 访问令牌到期时间 默认 60 秒
         */
        private long accessTokenExpireTime = 60_000;

        /**
         * 刷新令牌到期时间 默认 30 天
         */
        private long refreshTokenExpireTime = 30*24*3600*1000;
    }
}
```

改造JwtUtil，方法，增加key，注入配置：

```java
/**
 * jwt工具
 *
 * @author laizhuocheng
 * @date 2022/12/16
 */
@Component
@RequiredArgsConstructor
public class JwtUtil {

    /**
     * 用于访问令牌签名
     */
    public static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    /**
     * 应用程序属性
     */
    private final ApplicationProperties applicationProperties;


    /**
     * 用于刷新令牌签名
     */
    public static final Key refreshKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String createJwtToken(UserDetails userDetails, long timeToExpire,Key key) {

       return Jwts.builder().setId("lzc")
                // 载荷里放角色
                .claim("authorities", userDetails.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toList()))
                // 设置主题为用户名
                .setSubject(userDetails.getUsername())
                // 设置签发时间为当前时间
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // 设置过期时间60秒
                .setExpiration(new Date(System.currentTimeMillis()+timeToExpire))
                // 签名
                .signWith(key,SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * 创建访问令牌
     *
     * @param userDetails 用户信息
     * @return {@link String}
     */
    public String createAccessToken(UserDetails userDetails){
        return this.createJwtToken(userDetails,applicationProperties.getJwt().getAccessTokenExpireTime(),key);
    }

    /**
     * 创建刷新令牌
     *
     * @param userDetails 用户信息
     * @return {@link String}
     */
    private String createRefreshToken(UserDetails userDetails){
        return this.createJwtToken(userDetails,applicationProperties.getJwt().getRefreshTokenExpireTime(),refreshKey);
    }

}
```

配置文件：

```yaml
lzc:
  jwt:
    access-token-expire-time: 600
    refresh-token-expire-time: 2592000000
```

## 5-5 创建JwtFilter

这里先不继承AbstractAuthenticationProcessingFilter，先创建一个过滤器继承OncePerRequestFilter，重写方法：先检查token再放行，token在请求头中以何种形式开头(前缀)，可以自定义，所以加到配置中，在自建的ApplicationProperties类中加入属性:

```java
/**
 * 应用程序属性  在yaml中配置，如lzc.jwt.access-token-expire-time=111
 *
 * @author laizhuocheng
 * @date 2022/12/16
 */
@Configuration
@ConfigurationProperties(prefix = "lzc")
public class ApplicationProperties {


    @Getter
    @Setter
    private Jwt jwt = new Jwt();

    @Getter
    @Setter
    public static class Jwt{

        /**
         * token的开头 如： Authentication:Bearer xxxx
         */
        private String header = "Authentication";

        /**
         * 前缀
         */
        private String prefix = "Bearer";

        /**
         * 访问令牌到期时间 默认 60 秒
         */
        private long accessTokenExpireTime = 60_000;

        /**
         * 刷新令牌到期时间 默认 30 天
         */
        private long refreshTokenExpireTime = 30*24*3600*1000;
    }
}
```

为了方便后面从载荷中取出的角色列表(Object类型)转为List，编写一个工具类：

```java

/**
 * 集合工具类
 *
 * @author lzc
 * @date 2022/12/21
 */
public class CollectionUtils {

    private static List<?> convertObjectToList(Object obj){
        List<?> list = new ArrayList<>();
        if (obj.getClass().isArray()){
            Object[] objects = (Object[]) obj;
            list= Arrays.asList(objects);
        }else if (obj instanceof Collection){
            Collection collection = (Collection) obj;
            list = new ArrayList<>(collection);
        }
        return list;
    }
}
```

请求进来，先校验token是否合法:

```java
    /**
     * 检查令牌是否合法
     *
     * @param request 请求
     * @return boolean
     */
    private boolean checkToken(HttpServletRequest request) {
        String header = request.getHeader(applicationProperties.getJwt().getHeader());
       return (null!=header&&header.startsWith(applicationProperties.getJwt().getPrefix()));
    }
```

如果合法，再验证token，从token中获取载荷(body即Claims)：

```java
    /**
     * 验证令牌
     *
     * @param request 请求
     * @return {@link Optional}<{@link Claims}>
     */
    private Optional<Claims> validateToken(HttpServletRequest request){
        String header = request.getHeader(applicationProperties.getJwt().getHeader());
        // 去掉前缀
        String token = header.replace(applicationProperties.getJwt().getPrefix(), "");
        // 解析token
        try{
            return Optional.of(Jwts.parserBuilder().setSigningKey(JwtUtil.key).build().parseClaimsJws(token).getBody());
        }catch (Exception e){
            return Optional.empty();
        }

    }
```

获取载荷返回Optional对象，进行过滤authorities，过滤后，使用ifPresentOrElse，进行分情况处理，如果有值则处理后创建UsernamePasswordAuthenticationToken放入context，如果没有值则清除当前Context中的Authentication

有值：

```java
    /**
     * 处理jwt载荷中有角色的情况
     *
     * @param claims 载荷
     */
    private  void setUpSpringAuthentication(Claims claims) {
        // 过滤完以后有值的情况
        Object authorities = claims.get("authorities");
        List<?> authorityList  = CollectionUtils.convertObjectToList(authorities);
        // 泛型处理，转为GrantedAuthority
        List<GrantedAuthority> grantedAuthorityList = authorityList.stream()
                .map(String::valueOf)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        // 创建UsernamePasswordAuthenticationToken 该构造函数默认authenticated为true
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(claims.getSubject(),null,grantedAuthorityList);
        // 设置上下文中的Authentication
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }
```

没值：

```java
SecurityContextHolder::clearContext
```

完整代码：

```java
/**
 * jwt过滤器
 *
 * @author lzc
 * @date 2022/12/21
 */
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    /**
     * 构造器注入自定义配置
     */
    private final ApplicationProperties applicationProperties;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 检查token 期望：Authentication:Bearer XXXXX
        if (checkToken(request)){
            // token合法，验证token
            validateToken(request).filter(claims ->
                    // 没有角色权限的过滤掉 没有意义
                    claims.get("authorities")!=null)
                    .ifPresentOrElse(
                            // 有值的情况 创建token
                            this::setUpSpringAuthentication,
//                            ()->{
//                        // 过滤完以后没有值的情况，可以写成方法引用
//                        SecurityContextHolder.clearContext();
//                    }
                            SecurityContextHolder::clearContext
                    );
        }

        // 最后放行
        filterChain.doFilter(request,response);

    }

    /**
     * 处理jwt载荷中有角色的情况
     *
     * @param claims 载荷
     */
    private  void setUpSpringAuthentication(Claims claims) {
        // 过滤完以后有值的情况
        Object authorities = claims.get("authorities");
        List<?> authorityList  = CollectionUtils.convertObjectToList(authorities);
        // 泛型处理，转为GrantedAuthority
        List<GrantedAuthority> grantedAuthorityList = authorityList.stream()
                .map(String::valueOf)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        // 创建UsernamePasswordAuthenticationToken 该构造函数默认authenticated为true
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(claims.getSubject(),null,grantedAuthorityList);
        // 设置上下文中的Authentication
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }

    /**
     * 检查令牌是否合法
     *
     * @param request 请求
     * @return boolean
     */
    private boolean checkToken(HttpServletRequest request) {
        String header = request.getHeader(applicationProperties.getJwt().getHeader());
       return (null!=header&&header.startsWith(applicationProperties.getJwt().getPrefix()));
    }

    /**
     * 验证令牌
     *
     * @param request 请求
     * @return {@link Optional}<{@link Claims}>
     */
    private Optional<Claims> validateToken(HttpServletRequest request){
        String header = request.getHeader(applicationProperties.getJwt().getHeader());
        // 去掉前缀
        String token = header.replace(applicationProperties.getJwt().getPrefix(), "");
        // 解析token
        try{
            return Optional.of(Jwts.parserBuilder().setSigningKey(JwtUtil.key).build().parseClaimsJws(token).getBody());
        }catch (Exception e){
            return Optional.empty();
        }

    }

}

```

写好filter后，注入到SecurityConfig中，添加该过滤器到UsernamePasswordAuthenticationFilter之前：

```java
    /**
     * jwt过滤器 构造器注入
     */
    private final JwtFilter jwtFilter;
```

![image-20221221112804378](http://www.iocaop.com/images/2022-12/202212211128491.png)

## 5-6 实现登录接口和刷新令牌接口(上)

要验证我们上面的jwtFilter是否有效，需要先写一个登录接口来生成jwt，然后携带token来访问其他需要鉴权的接口，首先创建登录接口的Ao和Vo:

LoginAo：

```java
/**
 * 登录ao
 *
 * @author lzc
 * @date 2022/12/21
 */
@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class LoginAo implements Serializable {

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;
}

```

LoginVo:

```java
/**
 * 登录vo
 *
 * @author lzc
 * @date 2022/12/21
 */
@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class LoginVo implements Serializable {

    /**
     * 访问令牌
     */
    private String accessToken;

    /**
     * 刷新令牌
     */
    private String refreshToken;
}

```

我们之前配置了放行的路径：

![image-20221221121957566](http://www.iocaop.com/images/2022-12/202212211219654.png)

所以在这个路径下创建登录接口，不会经过过滤器链：

![image-20221221130755233](http://www.iocaop.com/images/2022-12/202212211307317.png)

service层代码：

```java
/**
 * 用户-业务层实现类
 *
 * @author lzc
 * @date 2022/12/13
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findOptionalByUsername(username)
                // 返回的是Optional类型，可以用orElseThrow抛出异常 如果为空就会抛异常
                .orElseThrow(() -> new UsernameNotFoundException("未找到用户名"));
    }

    @Override
    public LoginVo login(String username, String password) {
        return userRepo.findOptionalByUsername(username)
                .filter(user ->
                        // 密码加密编辑器匹配，参数1未加密密码，参数2已加密密码
                        passwordEncoder.matches(password, user.getPassword()))
                // 匹配成功则有值，否则过滤掉就不会走map里面的了
                .map(user -> new LoginVo().setAccessToken(jwtUtil.createAccessToken(user)).setRefreshToken(jwtUtil.createRefreshToken(user)))
                // 没有值，抛出异常
                .orElseThrow(() -> {
                    throw new BadCredentialsException("用户名或密码错误");
                });
    }
}
```

启动后测试：可以进行登录生成token

![image-20221221131027301](http://www.iocaop.com/images/2022-12/202212211310402.png)

## 5-7 实现登录接口和刷新令牌接口(下)

前面讲过，token设置一个比较短的有效期，可以有效防止token被盗后他人能有足够的时间来操作。那当本人使用的时候就需要有一个机制来不断刷新令牌，所以还需要写一个刷新令牌的接口，用户携带访问令牌和刷新令牌进入接口进行刷新，获取新的访问令牌。

```java
    @GetMapping("/token/refresh")
    public LoginVo refresh(@RequestHeader(name="Authorization") String accessToken, @NotBlank String refreshToken) throws AccessDeniedException {
        return userService.refresh(accessToken, refreshToken);
    }
```

首先需要校验访问令牌和刷新令牌，所以在JwtUtil中增加方法：

```java
    /**
     * 验证访问令牌
     *
     * @param accessToken 访问令牌
     * @return boolean
     */
    public boolean validateAccessToken(String accessToken) {
        return validateToken(accessToken,key,true);
    }

    /**
     * 验证访问令牌 忽略过期时间
     *
     * @param accessToken 访问令牌
     * @return boolean
     */
    public boolean validateAccessTokenWithoutExpiration(String accessToken) {
        return validateToken(accessToken,key,false);
    }

    /**
     * 验证刷新令牌
     *
     * @param refreshToken 刷新令牌
     * @return boolean
     */
    public boolean validateRefreshToken(String refreshToken) {
        return validateToken(refreshToken,refreshKey,true);
    }


    /**
     * 验证令牌
     *
     * @param token            令牌
     * @param key              关键
     * @param isExpiredInvalid 过期无效
     * @return boolean
     */
    private boolean validateToken(String token,Key key,boolean isExpiredInvalid){
        if (StringUtils.isNullOrEmpty(token)){
            return false;
        }
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parse(token);
            return true;
        }catch (Exception e){
            if (e instanceof ExpiredJwtException){
                return !isExpiredInvalid;
            }
            return false;
        }
    }
```

如果验证通过，则创建新的令牌返回,在JwtUtil中添加方法，通过刷新令牌创建访问令牌：

```java
    /**
     * 通过刷新令牌的载荷创建访问令牌
     *
     * @param token 令牌
     * @return {@link String}
     */
    private String createAccessTokenWithRefreshToken(String token){
       return this.parseClaims(token,refreshKey).map(claims -> Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis()+applicationProperties.getJwt().getAccessTokenExpireTime()))
                .setIssuedAt(new Date())
                .signWith(key,SignatureAlgorithm.HS512).compact()
        ).orElseThrow(()->new AccessDeniedException("访问被拒绝"));
    }

    /**
     * 解析token获取载荷
     *
     * @param token 令牌
     * @param key   关键
     * @return {@link Optional}<{@link Claims}>
     */
    private Optional<Claims> parseClaims(String token,Key key){
        try{
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
            return Optional.of(claims);
        }catch (Exception e){
            return Optional.empty();
        }
    }
```

在service层中加上：

```java
    @Override
    public LoginVo refresh(String accessToken, String refreshToken) throws AccessDeniedException {

        boolean validateAccessToken = jwtUtil.validateAccessTokenWithoutExpiration(accessToken);
        boolean validateRefreshToken = jwtUtil.validateRefreshToken(refreshToken);
        if (validateAccessToken && validateRefreshToken) {
            return new LoginVo().setRefreshToken(refreshToken).setAccessToken(jwtUtil.createAccessTokenWithRefreshToken(refreshToken));
        }
        throw new AccessDeniedException("访问被拒绝");
    }
```

启动测试：可以通过刷新令牌创建访问令牌

![image-20221221142734036](http://www.iocaop.com/images/2022-12/202212211427154.png)

## 5-8 完成注册接口

首先需要校验注册信息是否已存在，在持久层UserRepo创建三个方法：

```java
    /**
     * 计数-用户名
     *
     * @param username 用户名
     * @return long
     */
    long countByUsername(String username);

    /**
     *  计数-电子邮件地址
     *
     * @param email 电子邮件
     * @return long
     */
    long countByEmail(String email);

    /**
     * 计数-手机号
     *
     * @param mobile 移动
     * @return long
     */
    long countByMobile(String mobile);
```

业务层创建三个私有方法用于校验：

```java
    /**
     * 用户名是否已存在
     *
     * @param username 用户名
     * @return boolean
     */
    private boolean isUsernameExisted(String username){
        return userRepo.countByUsername(username)>0;
    }

    /**
     * 电子邮件地址是否已存在
     *
     * @param email 电子邮件
     * @return boolean
     */
    private boolean isEmailExisted(String email){
        return userRepo.countByEmail(email)>0;
    }

    /**
     * 手机号是否已存在
     *
     * @param mobile 移动
     * @return boolean
     */
    private boolean isMobileExisted(String mobile){
        return userRepo.countByMobile(mobile)>0;
    }
```

重复的话需要抛出异常，所以建立一个异常类：DuplicateProblem 继承AbstractThrowableProblem 

```java
/**
 * 数据重复时抛出的异常
 *
 * @author lzc
 * @date 2022/12/22
 */
public class DuplicateProblem extends AbstractThrowableProblem {
    private static final URI TYPE = URI.create(Constants.PROBLEM_BASE_URI + "/duplicate");

    public DuplicateProblem(String message) {
        super(TYPE, "发现重复数据", Status.CONFLICT, message);
    }
}
```

所用到的常量类：

```java
/**
 * 常量
 *
 * @author lzc
 * @date 2022/12/22
 */
public class Constants {

    public static final String PROBLEM_BASE_URI = "https://www.iocaop.com";
    public static final String PATTERN_MOBILE = "^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$";
    public static final String ROLE_USER = "用户";
    public static final String ROLE_ADMIN = "管理员";
    public static final String CACHE_MFA = "cacheMfa";
}

```

业务层创建接口并实现方法：

```java
    @Override
    public void register(UserDTO userDto) {
        String username = userDto.getUsername();
        String email = userDto.getEmail();
        String mobile = userDto.getMobile();
        String name = userDto.getName();

        if (this.isUsernameExisted(username)){
            throw new DuplicateProblem("用户名重复");
        }
        if (this.isEmailExisted(email)){
            throw new DuplicateProblem("电子邮件地址重复");
        }
        if (this.isMobileExisted(mobile))
        {
            throw new DuplicateProblem("手机号重复");
        }
        // UserDTO转为User并保存到数据库
        User user = new User().withUsername(username).withEmail(email).withMobile(mobile).withEnabled(true).withFullName(name);
        // 给一个默认角色
    }
```

到此

已经做好了校验，还缺角色和密码加密，为了确保角色存在，需要先到数据库查一下，所以在RoleRepo中加入方法：

```java
/**
 * 角色-持久层
 *
 * @author lzc
 * @date 2022/12/13
 */
@Repository
public interface RoleRepo extends JpaRepository<Role,Long> {

    /**
     * 通过角色名称查找角色实体
     *
     * @param authority 角色
     * @return {@link Optional}<{@link Role}>
     */
    Optional<Role> findOptionalByAuthority(String authority);
}

```

经过修改，最终注册用户业务层代码为：

```java
    @Override
    public void register(UserDTO userDto) {
        String username = userDto.getUsername();
        String email = userDto.getEmail();
        String mobile = userDto.getMobile();
        String name = userDto.getName();
        String password = userDto.getPassword();

        if (this.isUsernameExisted(username)) {
            throw new DuplicateProblem("用户名重复");
        }
        if (this.isEmailExisted(email)) {
            throw new DuplicateProblem("电子邮件地址重复");
        }
        if (this.isMobileExisted(mobile)) {
            throw new DuplicateProblem("手机号重复");
        }
        // UserDTO转为User并保存到数据库
        // 给一个默认角色
        roleRepo.findOptionalByAuthority(Constants.ROLE_USER)
                .map(role ->{
                            User u = new User()
                                    .withUsername(username)
                                    .withEmail(email)
                                    .withMobile(mobile)
                                    .withFullName(name)
                                    .withAuthorities(Set.of(role))
                                    .withPassword(passwordEncoder.encode(password));
                           return userRepo.save(u);
                        })
                .orElseThrow(()->new RuntimeException("注册失败，不存在默认角色"));

    }
```

启动进行注册：

![image-20221222232025782](http://www.iocaop.com/images/2022-12/202212222320972.png)

![image-20221222232035219](http://www.iocaop.com/images/2022-12/202212222320366.png)

![image-20221222232046124](http://www.iocaop.com/images/2022-12/202212222320244.png)

出现问题，几个布尔值为FALSE，原因：默认值，创建用户对象时自己赋值就好了：

```java
              						.withEnabled(true)
                                    .withAccountNonExpired(true)
                                    .withAccountNonLocked(true)
                                    .withCredentialsNonExpired(true)
```

新注册的用户可以用来登录获取token：

![image-20221222232737221](http://www.iocaop.com/images/2022-12/202212222327347.png)

## 6-1多因子登录和TOTP

![image-20221222233547463](http://www.iocaop.com/images/2022-12/202212222335703.png)

![image-20221222233815500](http://www.iocaop.com/images/2022-12/202212222338775.png)

totp是什么玩意？

简单的说，通过一个key和时间，生成一个密码，在规定的密码有效时长内，再次生成，还会是同一个密码。比如：

totp有效时间10分钟，我早上8点用key=lzc(不会是字符串，这里假设是这样)和当前时间生成的密码是123456，那么再过五分钟也就是8：05我再生成一次，密码还是123456，在这个教程里面，用来生成短信验证码。

导入opt算法依赖：

```xml
        <dependency>
            <groupId>com.eatthepath</groupId>
            <artifactId>java-otp</artifactId>
            <version>0.4.0</version>
        </dependency>
```

导入redis客户端依赖:

```xml
        <dependency>
            <groupId>org.redisson</groupId>
            <artifactId>redisson-spring-boot-starter</artifactId>
            <version>3.12.5</version>
        </dependency>
```

这里，每个用户用不同的key生成密码就好了，有效期是5分钟，五分钟后同样的key生成的密码会是不一样的。就实现了每个用户在同一时间收到的验证码是不一样的，并且有效期过后验证码是变化的。

因为Key是java中security包中的，所以需要序列化，在工具类中使用base64转换Key的字节数组为字符串存在数据库中了。

创建工具类TotpUtil：

```java
/**
 * totp工具类
 *
 * @author lzc
 * @date 2022/12/23
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class TotpUtil {

    private  KeyGenerator keyGenerator;

    private  TimeBasedOneTimePasswordGenerator totp;

    /**
     * 密码多久不变
     */
    private static final long TIME_STEP = 60*5;

    /**
     * 密码长度
     */
    private static final int PASSWORD_LENGTH = 6;

    /**
     * 编译器会把这种非静态代码块拷贝到构造函数最开始的地方
     */
    {
        totp = new TimeBasedOneTimePasswordGenerator(Duration.ofSeconds(TIME_STEP),PASSWORD_LENGTH);
        try {
            keyGenerator = KeyGenerator.getInstance(totp.getAlgorithm());
            // SHA-1或SHA-256需要64字节(512位)的key
            // SHA-512需要128字节(1024位)的key
            keyGenerator.init(512);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            log.error("没有找到算法{}",e.getLocalizedMessage());
            throw new RuntimeException(e);
        }

    }

    /**
     * 生成totp
     *
     * @param key  生成totp的key
     * @param time 生成totp的时间
     * @return {@link String}
     * @throws InvalidKeyException 无效key异常
     */
    private String createTotp(Key key, Instant time) throws InvalidKeyException {
        int password = totp.generateOneTimePassword(key, time);
        // 因为生成的密码是int型，所以需要进行格式化，使用字符串格式化方法，位数不够就在前面添0
       String format =  "%0"+PASSWORD_LENGTH+"d";
       return String.format(format,password);
    }


    /**
     * 通过字符串形式的Key生成密码code
     *
     * @param strKey 从数据库取出来的字符串形式的key
     * @return {@link Optional}<{@link String}>
     */
    private Optional<String>createTotp(String strKey){
        try {
            return Optional.of(this.createTotp(this.stringToKey(strKey),Instant.now()));
        } catch (InvalidKeyException e) {
       e.printStackTrace();
       return Optional.empty();
        }
    }

    /**
     * 验证totp
     *
     * @param key  key
     * @param code 密码
     * @return boolean
     * @throws InvalidKeyException 无效key异常
     */
    public boolean verifyTotp(Key key,String code) throws InvalidKeyException {
        Instant now = Instant.now();
        // 验证totp，思路：拿之前的key和现在的时间再创建一次密码，如果原来的密码没有过期，那么当前拿当前时间创建的和之前的会是一样的，否则就是不一样的
        return code.equals(this.createTotp(key,now));
    }


    /**
     * 生成key
     *
     * @return {@link Key}
     */
    private Key generateKey(){
        return keyGenerator.generateKey();
    }


    /**
     * Key转字符串
     *
     * @param key 关键
     * @return {@link String}
     */
    private String keyToString(Key key){
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }

    /**
     * 获取字符串形式的key
     *
     * @return {@link String}
     */
    public String keyToString(){
        return this.keyToString(this.generateKey());
    }


    /**
     * 字符串形式的key转成Key对象
     *
     * @param base64StrKey base64 str关键
     * @return {@link Key}
     */
    public Key stringToKey(String base64StrKey){
        return new SecretKeySpec(Base64.getDecoder().decode(base64StrKey),
                // 需要和生成时使用同样的方法
                totp.getAlgorithm());
    }
}
```

## 6-2 发送TOTP-阿里云短信

阿里云短信平台：<a href = 'https://cn.aliyun.com/product/sms?from_alibabacloud=&scm=20140722.S_function@@product@@80687._.ID_function@@product@@80687-RL_??-LOC_bar-OR_ser-V_2-P0_0'>点击跳转</a>

用户认证的逻辑：

![image-20221223011607475](http://www.iocaop.com/images/2022-12/202212230116671.png)

## 6-3 短信发送服务-阿里云和LeanCloud

首先创建一个接口（两个短信平台，不同实现即可），定义一个方法：

```java
/**
 * 短信服务
 *
 * @author lzc
 * @date 2022/12/23
 */
public interface SmsService {

    /**
     * 发送
     *
     * @param mobile 手机号
     * @param code   验证码
     */
    public void send(String mobile,String  code);
}
```

### 阿里短信平台

先写一个阿里的实现，导入SDK依赖：

有原版和升级版，参考地址：<a href = 'https://next.api.aliyun.com/api-tools/sdk/Dysmsapi?version=2017-05-25&language=java'>点击跳转</a>，这里使用原版

```xml
        <dependency>
            <groupId>com.aliyun</groupId>
            <artifactId>aliyun-java-sdk-core</artifactId>
            <version>4.6.3</version>
        </dependency>
```

增加配置类:

```java
/**
 * 阿里配置
 *
 * @author lzc
 * @date 2022/12/23
 */
@Configuration
@RequiredArgsConstructor
public class AliConfig {

    private final ApplicationProperties applicationProperties;

    /**
     * 使用阿里的服务，需要配置这个bean，不光是短信平台，其他平台也可以用
     *
     * @return {@link IAcsClient}
     */
    @Bean
    public IAcsClient iAcsClient(){
        // 参数1是区域，参数2是key，参数3是secret，这里在yaml中配置
        DefaultProfile profile = DefaultProfile.getProfile("cn-shenzhen", applicationProperties.getAli().getAppKey()
                , applicationProperties.getAli().getAppSecret());
        return new DefaultAcsClient(profile);
    }
}
```

所以ApplicationProperties中我们需要改成这样：

```java
/**
 * 应用程序属性
 * 应用程序属性  在yaml中配置，如lzc.jwt.access-token-expire-time=111
 *
 * @author laizhuocheng
 * @date 2022/12/16
 */
@Configuration
@ConfigurationProperties(prefix = "lzc")
public class ApplicationProperties {


    @Getter
    @Setter
    private Ali ali = new Ali();

    @Getter
    @Setter
    public static class Ali{
        /**
         * key
         */
        private String appKey;

        /**
         * secret
         */
        private String appSecret;
    }


    @Getter
    @Setter
    private Jwt jwt = new Jwt();

    @Getter
    @Setter
    public static class Jwt{

        /**
         * token的开头 如： Authentication:Bearer xxxx
         */
        private String header = "Authorization";

        /**
         * 前缀
         */
        private String prefix = "Bearer ";

        /**
         * 访问令牌到期时间 默认 60 秒
         */
        private long accessTokenExpireTime = 60_000;

        /**
         * 刷新令牌到期时间 默认 30 天
         */
        private long refreshTokenExpireTime = 30*24*3600*1000;
    }
}

```

虽然秘钥在yaml中配置，但是不建议写明文，所以可以使用系统环境变量（或者在.env文件中配置，并且gitIgnore该文件）进行配置：

```yaml
lzc:
  jwt:
    access-token-expire-time: 60000000
    refresh-token-expire-time: 2592000000
  ali:
    app-key: ${ALI_APP_KEY}
    app-secret: ${ALI_APP_SECRET}
```

.env文件不能直接用，需要安装插件：

![image-20221223014002696](http://www.iocaop.com/images/2022-12/202212230140877.png)

并且需要配置启动时读取：

![image-20221223014131998](http://www.iocaop.com/images/2022-12/202212230141152.png)

配置好以后就可以正式开始编写发送验证码的代码了：

要思考一个问题，有两个平台，一个接口两个实现类，如何判断使用哪一个呢？

使用配置文件进行配置，配合注解@ConditionalOnProperty，参考：<a href = 'https://blog.csdn.net/weixin_42666837/article/details/115011297'>点击跳转</a>，如阿里实现类需要生效应该这样写，满足时才会生效

```java
/**
 * 阿里短信平台服务实现类
 *
 * @author lzc
 * @date 2022/12/23
 */
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "lzc",name = "sms-provider.name",havingValue = "ali")
public class SmsServiceAliImpl implements SmsService {

    private final IAcsClient iAcsClient;

    @Override
     public void send(String mobile, String code) {


    }
}
```

所以ApplicationProperties又要加上：

```java
    @Getter
    @Setter
    private SmsProvider smsProvider = new SmsProvider();

    @Getter
    @Setter
    public static class SmsProvider{
        /**
         * 名字
         */
        private String name;

        /**
         * url
         */
        private String url;
    }
```

配置：

```yaml
lzc:
  jwt:
    access-token-expire-time: 60000000
    refresh-token-expire-time: 2592000000
  ali:
    app-key: ${ALI_APP_KEY}
    app-secret: ${ALI_APP_SECRET}
  sms-provider:
    name: ali
```

方法：

```java
    @Override
     public void send(String mobile, String code) {
        // 阿里帮我们屏蔽了很多鉴权的操作，这里只需要调用即可
        CommonRequest commonRequest = new CommonRequest();
        // 设置请求方式
        commonRequest.setSysMethod(MethodType.POST);
        // 设置服务名称
        commonRequest.setSysAction("SendSms");
        // 官网提供的version
        commonRequest.setSysVersion("2017-05-25");

        // 地区
        commonRequest.putQueryParameter("RegionId", "cn-hangzhou");
        // 手机号
        commonRequest.putQueryParameter("PhoneNumbers", mobile);
        // 签名名称
        commonRequest.putQueryParameter("SignName", "登录验证");
        // 模板code
        commonRequest.putQueryParameter("TemplateCode", "SMS_1610048");
        // 消息体
        commonRequest.putQueryParameter("TemplateParam", "{\"code\":\"" +
                code +
                "\",\"product\":\"赖卓成的笔记\"}");
        try {
            // 获取发送的结果
            val response = iAcsClient.getCommonResponse(commonRequest);
            log.info("短信发送结果 {}", response.getData());
        } catch (ServerException e) {
            log.error("发送短信时产生服务端异常 {}", e.getLocalizedMessage());
        } catch (ClientException e) {
            log.error("发送短信时产生客户端异常 {}", e.getLocalizedMessage());
        }
    }
```

由于没有申请，无法测试，后续再说。

### leancloud短信平台

地址：<a href = 'https://console.leancloud.cn/apps/fkCaH5DlK0hwtTA6DgG7HX8i-gzGzoHsz/'>点击跳转</a>

导入依赖：

```xml
        <dependency>
            <groupId>cn.leancloud</groupId>
            <artifactId>storage-core</artifactId>
            <version>6.5.3</version>
        </dependency>
```

写配置类，

```java
/**
 * LeanCloud配置
 *
 * @author lzc
 * @date 2022/12/23
 */
@Configuration
@RequiredArgsConstructor
public class LeanCloudConfig {

    private final ApplicationProperties applicationProperties;

    @PostConstruct
    public void init(){
        AVOSCloud.initialize(applicationProperties.getLeanCloud().getAppId(),applicationProperties.getLeanCloud().getAppKey());
    }
}

```

ApplicationProperties增加：

```java
    @Getter
    @Setter
    private LeanCloud leanCloud = new LeanCloud();
    @Getter
    @Setter
    public static class LeanCloud{
        /**
         * appId
         */
        private String appId;

        /**
         * appKey
         */
        private String appKey;
    }
```

配置文件：需要配置正确的id和key，否则项目启动会报错

```yaml
lzc:
  jwt:
    access-token-expire-time: 60000000
    refresh-token-expire-time: 2592000000
  ali:
    app-key: ${ALI_APP_KEY}
    app-secret: ${ALI_APP_SECRET}
  lean-cloud:
    app-id: fkCaH5DlK0hwtTA6DgG7HX8i-gzGzoHsz
    app-key: bc2AFd8UOgwvaxlaoDnSt9OY
  sms-provider:
    name: ali
  email-provider:
    name: smtp
```



创建实现类，重写方法：

```java
/**
 * LeanCloud短信平台服务实现类
 *
 * @author lzc
 * @date 2022/12/23
 */
@Service
@RequiredArgsConstructor
@Slf4j
@ConditionalOnProperty(prefix = "lzc",name = "sms-provider.name",havingValue = "lean-cloud")
public class SmsServiceLeanCloudImpl implements SmsService {

    @Override
    public void send(String mobile, String msg) {
        val option = new AVSMSOption();
        option.setTtl(10);
        option.setApplicationName("慕课网实战Spring Security");
        option.setOperation("两步验证");
        option.setTemplateName("登录验证");
        option.setSignatureName("慕课网");
        option.setType(AVSMS.TYPE.TEXT_SMS);
        option.setEnvMap(Map.of("smsCode", msg));
        AVSMS.requestSMSCodeInBackground(mobile, option)
                .take(1)
                .subscribe(
                        (res) -> log.info("短信发送成功 {}", res),
                        (err) -> log.error("发送短信时产生服务端异常 {}", err.getLocalizedMessage())
                );
    }
}
```

没有申请开通短信平台，无法测试，先跳过。

## 6-4 Email 发送服务SMTP 和 API 方式.

创建邮件服务接口：

```java
/**
 * 电子邮件服务
 *
 * @author lzc
 * @date 2022/12/23
 */
public interface EmailService {

    /**
     * 发送
     *
     * @param email 电子邮件
     * @param msg   消息
     */
    public void send(String email,String msg);
}
```

同样也是两种实现，一种是API形式一种是SMTP形式。同理也是按条件加载Bean，所以ApplicationProperties增加：

```java
    @Getter
    @Setter
    private EmailProvider emailProvider = new EmailProvider();
	@Getter
    @Setter
    public static class EmailProvider{
        /**
         * 名字
         */
        private String name;

        /**
         * apiKey
         */
        private String apiKey;
    }
```

配置文件这样写：

```yaml
lzc:
  jwt:
    access-token-expire-time: 60000000
    refresh-token-expire-time: 2592000000
  ali:
    app-key: ${ALI_APP_KEY}
    app-secret: ${ALI_APP_SECRET}
  sms-provider:
    name: ali
  email-provider:
    name: smtp
```

引入SMTP依赖包:

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
        </dependency>
```

API形式发送邮件的依赖包：sendgrid

```xml
        <dependency>
            <groupId>com.sendgrid</groupId>
            <artifactId>sendgrid-java</artifactId>
        </dependency>
```

使用SMTP需要配置，参考：<a href = 'https://blog.csdn.net/qq_51553982/article/details/126456685'>点击跳转</a>

增加配置（可通过环境变量来配置）:

```yaml
spring:
  mail:
    default-encoding: UTF-8
    host: smtp.qq.com
    port: 587
    username: 911823616@qq.com
    password: xxxxx
```

编写SMTP发送邮件的方法：

```java
/**
 * 电子邮件服务smtp实现类
 *
 * @author lzc
 * @date 2022/12/23
 */
@Service
@RequiredArgsConstructor
@Slf4j
@ConditionalOnProperty(prefix = "lzc",name = "email-provider.name",havingValue = "smtp")
public class EmailServiceSmtpImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    
    @Override
    public void send(String email, String msg) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        // 收件人
        simpleMailMessage.setTo(email);
        // 发件人
        simpleMailMessage.setFrom("911823616@qq.com");
        // 主题
        simpleMailMessage.setSubject("测试SMTP发送邮件的主题");
        // 正文
        simpleMailMessage.setText("验证码为"+msg);
        javaMailSender.send(simpleMailMessage);

    }
}
```



如果使用API的形式，需要引入他的Bean：

```java
/**
 * 邮件配置
 *
 * @author lzc
 * @date 2022/12/23
 */
@Configuration
@RequiredArgsConstructor
public class EmailConfig {

    private final ApplicationProperties applicationProperties;

    @Bean
    // 当有api-key时才创建这个Bean 否则会报错
    @ConditionalOnProperty(prefix = "lzc.email-provider",name = "api-key")
    public SendGrid sendGrid(){
        return new SendGrid(applicationProperties.getEmailProvider().getApiKey());
    }
}

```

重写API形式发送邮件的方法：

```java
/**
 * 电子邮件服务api 服务实现
 *
 * @author lzc
 * @date 2022/12/23
 */
@Service
@RequiredArgsConstructor
@Slf4j
@ConditionalOnProperty(prefix = "lzc", name = "email-provider.name", havingValue = "api")
public class EmailServiceApiImpl implements EmailService {

    private final SendGrid sendGrid;

    @Override
    public void send(String email, String msg) {
        // 发送者
        Email from = new Email("911823616@qq.com");
        // 主题
        String subject = "测试sendgrid发送邮件的主题";
        // 接受者
        Email to = new Email(email);
        // 内容
        Content content = new Content("text/plain", "验证码为" + msg);
        // 创建邮件对象
        Mail mail = new Mail(from, subject, to, content);
        Request request = new Request();
        try{
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            if (response.getStatusCode()==202){
                log.info("邮件发送成功");
            }else {
                log.error(response.getBody());
            }

        }catch (Exception e){
            e.printStackTrace();
            log.error("邮件发送异常");
        }
    }
}
```

## 6-5 多因子认证逻辑 ---整体逻辑和实体类改造

如何判断一个用户是否需要两步认证？

给User对象增加一个属性usingMfa，保存在数据库中，为true则需要进行两步验证。可以分情况设置是否需要启用两步验证，如后台用户需要两步验证，或者账户风险(上次登录ip与当前ip区别较大)时需要两步验证。

生成TOTP：

数据库中保存Key字节数组的base64形式，用于生成TOTP。

选择发送方式：

根据用户的选择来决定是发送短信还是电子邮件

通知客户端二次验证：

通过用户名和密码登录成功以后返回一个未授权的响应，在响应头中加入自定义头X-Authenticate:mfa,realm=请求id，这个请求id会放在redis缓存中。

开始操作，首先在User实体类中加入属性：

```java
    /**
     * 使用mfa,是否启用两步验证
     */
    @Column(name = "using_mfa",nullable = false)
    @Builder.Default
    private boolean usingMfa = false;

    /**
     * 用于生成TOTP的Key的字节数组的Base64字符串
     */
    @Column(name = "mfa_key",nullable = false)
    @JsonIgnore
    private String mfaKey;

```

所以，注册的时候就需要给用户生成mfaKey，所以在注册的方法中加入：

```java
    @Autowired
    private TotpUtil totpUtil;

	                            User u = new User()
                                    .withMfaKey(totpUtil.keyToString())
```

除此之外，我们还需要改造登录方法，因为需要两步验证的时候不能直接返回token给用户，而是返回一个未授权的响应,首先UserService中添加一个方法，用于判断用户名密码是否能匹配上,然后再判断是否需要两步登录，不需要则调用原来的登录方法，返回token，需要则返回一个未授权的响应：

改造登录Controller：

```java
    @GetMapping("/token")
    public ResponseEntity<?> login(@NotBlank String username, @NotBlank String password) {
       return userService.findByUsernameAndPassword(username, password);
    }
```

差异如下：

![image-20221223162238732](http://www.iocaop.com/images/2022-12/202212231622861.png)

findByUsernameAndPassword方法实现：

```java
    @Override
    public ResponseEntity<?> findByUsernameAndPassword(String username, String password) {
       return  userRepo.findOptionalByUsername(username).filter(user -> passwordEncoder.matches(password,user.getPassword()))
                .map(user -> {
                    // 升级密码编码
                    // 验证
                    // 判断是否需要两步验证 如果不需要就直接返回token
                    if (!user.isUsingMfa()){
                        return ResponseEntity.ok().body(this.login(username,password));
                    }
                    // 如果需要两步验证，则先redis缓存用户信息，并返回一个请求id
                    String requestId = UserCacheService.cache(user);
                    // 需要认证，则给客户端一个未授权的响应
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("X-Authenticate","mfa","realm="+requestId);
                }).orElseThrow(()->new BadCredentialsException("用户名或密码错误"));
    }
```

暂时先这样。

## 6-6 多因子认证逻辑---使用 Redis 缓存

编写用户缓存业务层代码：

作用：当用户需要两步验证时，生成一个随机的请求id，并以这个id作为redis中map的key，保存用户的信息，包括了用户的totp的mfaKey，所以可以利用这个mfaKey来验证验证码是否正确。

```java
/**
 * 用户缓存服务
 *
 * @author lzc
 * @date 2022/12/23
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserCacheService {
    private final RedissonClient redissonClient;

    private final TotpUtil totpUtil;

    private final CryptoUtil cryptoUtil;


    /**
     * 缓存用户信息到redis
     *
     * @param user 用户
     * @return {@link String}
     */
    public  String cache(User user) {
        String requestId = cryptoUtil.randomAlphanumeric(12);

        RMapCache<String,User> cache = redissonClient.getMapCache(Constants.CACHE_MFA);
        // 判断当前是否已存在缓存
        if (cache.containsKey(requestId)){
            // 不存在则加入
            cache.put(requestId,user,totpUtil.getTimeStep(), TimeUnit.SECONDS);

        }
        return requestId;
    }

    /**
     * 检索用户信息
     *
     * @param requestId 请求id
     * @return {@link Optional}<{@link User}>
     */
    public Optional<User> retrieveUser(String requestId){
        RMapCache<String,User> cache = redissonClient.getMapCache(Constants.CACHE_MFA);
        if (cache.containsKey(requestId)){
            return Optional.of(cache.get(requestId));
        }
        return Optional.empty();
    }

    /**
     * 校验验证码
     *
     * @param requestId 请求id
     * @param code      代码
     * @return {@link Optional}<{@link User}>
     */
    public Optional<User> verifyTotp(String requestId,String code){
        RMapCache<String,User> cache = redissonClient.getMapCache(Constants.CACHE_MFA);
        if (!cache.containsKey(requestId)||cache.get(requestId)==null){
            // 如果请求id对应的用户信息为空或整个map为空，则返回空
            return Optional.empty();
        }
        User user = cache.get(requestId);
        try {
            boolean verify = totpUtil.verifyTotp(totpUtil.stringToKey(user.getMfaKey()), code);
            if (!verify){
                return Optional.empty();
            }
            // 验证成功了，需要从cache中移除，并返回用户信息
            cache.remove(requestId);
            return Optional.of(user);
        }catch (Exception e){
            e.printStackTrace();
            return Optional.empty();
        }
    }
}
```

启动项目，报错了，需要添加redisson的配置：说明文档：<a href = 'https://github.com/redisson/redisson/tree/master/redisson-spring-boot-starter'>点击跳转</a>

```yaml
spring:
  redis:
    host: www.iocaop.com
    port: 6379
    password: 911823
    database: 1
```

启动后重新注册一个用户：

![image-20221223185014954](http://www.iocaop.com/images/2022-12/202212231850091.png)

可以看到，改造后的注册方法已经生效，用户在注册时已经生成了一个Base64加密的Key的字节数组：

![image-20221223185105528](http://www.iocaop.com/images/2022-12/202212231851633.png)

两步验证为否，我们手动开启（将using_mfa设置为1），然后尝试登录：

报错了，因为少了一个build()

![image-20221223185635743](http://www.iocaop.com/images/2022-12/202212231856898.png)

修改重启后，再次登录，返回了一个未授权的响应，并且响应头包含了我们设置的内容：

![image-20221223185742298](http://www.iocaop.com/images/2022-12/202212231857490.png)

## 6-7 多因子认证逻辑---选择发送方式和验证

首先增加一下登录时密码升级的操作，校验用户是否可用，这里就简单校验，实际根据业务来做验证：

![image-20230103231911542](http://www.iocaop.com/images/2023-01/202301032319678.png)

在上面，当用户需要两步验证时，返回了一个未授权的响应，前端要提示用户选择验证的方式(手机或邮箱)，所以需要增加接口，用于发送验证码：

控制层：

```java
    @PutMapping("/totp")
    public void sendTotp(@Valid @RequestBody SendTotpDTO sendTotpDTO){
        userService.sendTotp(sendTotpDTO);
    }
```

传参：

```java
@Data
public class SendTotpDTO implements Serializable {

    /**
     * 请求id 用于获取用户信息（放在redis中）
     */
    @NotBlank
    private String requestId;

    /**
     * 验证方式
     */
    @NotNull
    private MfaType mfaType;
}
```

业务层：

flatMap解释：<a href='https://cloud.tencent.com/developer/article/2167553'>点击跳转</a>，map()会包装一层Optional。你用flatMap返回的是Optional\<T\>,map会返回Optional<Optional\<T\>\>

```java
    @Override
    public void sendTotp(SendTotpDTO sendTotpDTO) {
        String requestId = sendTotpDTO.getRequestId();
        MfaType mfaType = sendTotpDTO.getMfaType();

        // 获取用户信息
       userCacheService.retrieveUser(requestId).flatMap(u->
               // 因为这里返回的也是一个流，所以需要使用flatMap，转成新的流
            totpUtil.createTotp(u.getMfaKey())
                    // Pair表示一对，可以返回多个值，而不需要重新建一个对象
                    .map(t->Pair.of(u,t))
        )
               // 是否有值
               .ifPresentOrElse(p->{
            if (mfaType==MfaType.SMS){
                smsService.send(p.getLeft().getMobile(),p.getRight());
            }else {
                emailService.send(p.getLeft().getEmail(),p.getRight());
            }
       },()->{
            throw new RuntimeException("发送验证码失败");
       });
    }
```

生成验证码和发送验证码的代码之前已经写好，所以直接运行测试：

![image-20230104110436766](http://www.iocaop.com/images/2023-01/image-20230104110436766.png)

![image-20230104110625596](http://www.iocaop.com/images/2023-01/image-20230104110625596.png)

![image-20230104110654063](http://www.iocaop.com/images/2023-01/image-20230104110654063.png)

还需要一个验证登录的接口：

根据请求id拿到redis中用户信息，再根据用户信息中的key和前端传入的验证码，使用totp工具验证验证码是否有效。

```java
    @PostMapping("/totp/verify")
    public LoginVo verifyTotp(@Valid @RequestBody VerifyTotpDTO verifyTotpDTO){
       return  userService.verifyTotp(verifyTotpDTO);
    }
```

```java
@Data
public class VerifyTotpDTO {

    /**
     * 请求id
     */
    @NotNull
    private String requestId;

    /**
     * 代码
     */
    @NotNull
    private String code;
}
```

```java
    @Override
    public LoginVo verifyTotp(VerifyTotpDTO verifyTotpDTO) {
        String code = verifyTotpDTO.getCode();
        String requestId = verifyTotpDTO.getRequestId();
       return userCacheService.verifyTotp(requestId, code).map(user ->
               new LoginVo().setAccessToken(jwtUtil.createAccessToken(user)).setRefreshToken(jwtUtil.createRefreshToken(user))
       ).orElseThrow(()-> new RuntimeException("登录失败"));
    }
```

登录结果：

![image-20230104142119827](http://www.iocaop.com/images/2023-01/image-20230104142119827.png)

## 6-9 前端集成---跨域处理.

集成前端项目后，简单修改好对应的请求地址，进行登录，会报错：

![image-20230105113059413](http://www.iocaop.com/images/2023-01/image-20230105113059413.png)

可以在WebMvcConfigurer实现类中进行配置：

```java
    /**
     * 使用 Sprig Mvc 配置 CORS
     *
     * @param registry Cors 注册表
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 判断当前环境
        if (environment.acceptsProfiles(Profiles.of("dev"))) {
            registry.addMapping("/**")
                    .allowedHeaders("*")
                    .exposedHeaders("X-Authenticate")
                    .allowCredentials(true)
                    .allowedMethods("POST", "GET", "PUT", "DELETE", "OPTIONS")
                    .allowedOrigins("http://localhost:4001");
        } else {
            registry.addMapping("/**")
                    .allowedHeaders("*")
                    .exposedHeaders("X-Authenticate")
                    .allowedMethods("POST", "GET", "PUT", "DELETE", "OPTIONS")
                    // 生产主机域名
                    .allowedOrigins("https://www.iocaop.com");
        }
    }
```

没有生效，原因未知。可能原因：<a href='https://blog.csdn.net/qq_24427099/article/details/106261979'>点击跳转</a>

使用SpringSecurity配置：

```java
    /**
     * 跨域配置
     *
     * @return {@link CorsConfigurationSource}
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        // 配置对象
        CorsConfiguration configuration = new CorsConfiguration();
        // 允许跨域访问的主机
        if (environment.acceptsProfiles(Profiles.of("dev"))) {
            configuration.setAllowedOrigins(Collections.singletonList("http://localhost:4001"));
        } else {
            configuration.setAllowedOrigins(Collections.singletonList("https://www.iocaop.com"));
        }
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        // 允许暴露的响应头 不设置在响应中是看不到的
        configuration.addExposedHeader("X-Authenticate");
        // Bean
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
```

![image-20230105121106100](http://www.iocaop.com/images/2023-01/image-20230105121106100.png)

配置后，前端进行登录：

![image-20230105121226961](http://www.iocaop.com/images/2023-01/image-20230105121226961.png)

多因子认证选择，这里注意，传数字也是可以的，按下标来取，传1就是EMAIL

![image-20230105151023563](http://www.iocaop.com/images/2023-01/image-20230105151023563.png)

![image-20230105121256418](http://www.iocaop.com/images/2023-01/image-20230105121256418.png)

验证码发送给后端，进行登录：



![image-20230105121304868](http://www.iocaop.com/images/2023-01/image-20230105121304868.png)



![image-20230105121312282](http://www.iocaop.com/images/2023-01/image-20230105121312282.png)

登录成功了，但是没有权限。

## 7-1 授权的概念和安全表达式的应用

前面学习的都是认证，后面要开始授权了。什么是授权？举例：你能刷卡进入小区，但你不能进入小区里面任何一个人的家里。决定你能进入谁家，就是授权。

#### AccessDecisionManager

AccessDecisionManager根据相关信息作出授权决定，主要方法是decide，接收的参数是一个Object，意味着可以传入任何授权相关的信息，如MethodInvocation(通过方法参数实现某种安全逻辑)。

![image-20230105163630918](http://www.iocaop.com/images/2023-01/image-20230105163630918.png)

授权的机制，是基于投票的，通过一组AccessDecisionVoter实现轮询授权决定，根据投票评估，决定是否抛出授权异常AccessDeniedException。

其中，有三种投票策略：

![image-20230105164213481](http://www.iocaop.com/images/2023-01/image-20230105164213481.png)

AccessDecisionVoter投票器接口：

![image-20230105164440170](http://www.iocaop.com/images/2023-01/image-20230105164440170.png)

#### RoleVoter

SpringSecurity中默认实现了角色投票：RoleVoter

* 如果任何ConfigAttribute以前缀ROLE_开头，它将进行投票
* 如果有一个GrantedAuthority返回的字符串表示正好有一个或多个ROLE_开头的ConfigAttribute，则通过，授予访问权限
* 没有任何ROLE_开头的ConfigAttribute完全匹配，则拒绝票
* 没有任何ROLE_开头的ConfigAttribute，则弃权票，相当于在配置中没有配置这个url需要哪些角色才能访问。

在我们配置时，这样的一条：

```java
.antMatchers("/admin/**").hasRole("ADMIN")
```

就是一个ConfigAttribute，hasRole中的值会自动加上前缀ROLE_。

当访问url的时候，会检查当前角色GrantedAuthority(Role类实现了GrantedAuthority接口)，有没有url配置的ConfigAttribute。

总结流程：

![image-20230105170323692](http://www.iocaop.com/images/2023-01/image-20230105170323692.png)

SecurityConfig配置url需要哪些角色，也就是配置ConfigAttribute，AccessDecisionManager中进行轮询投票，投票器会根据配置类中配置的ConfigAttribute来投票，最后AccessDecisionManager根据策略决定是否抛出授权异常。

#### 安全表达式

<span style="background-color:pink;">越广泛的规则越要放后</span>，避免其他规则失效。

类似permitAll的函数：

* denyAll 拒绝用户访问
* isAnonymous 是否为匿名用户
* isRememberMe 是否为记住我用户
* isAuthenticate 是否为已认证用户
* isFullyAuthenticate 是否既不是匿名也不是记住我的用户

hasRole，hasAuthority，hasAnyRole，hasAnyAuthority

* 规定需要的角色，ROLE_这个前缀是不需要添加的

* 等价于hasAuthority("ROLE_ADMIN")

access

* 支持更复杂的表达式，支持SpEL表达式

* 可以引用HttpServletRequest中的属性，也可以引用Bean

* 需要注意authorizeRequests和authorizeHttpRequests配置方式不一样，具体：<a href='https://blog.51cto.com/u_14558366/5177293'>点击跳转</a>，<a href='https://maimai.cn/article/detail?fid=1684534271&efid=zU7_mH0-MphK87pGRpzuLQ'>点击跳转</a>

使用authorizeHttpRequests来做：

创建接口：

```java
    @GetMapping("/user/{username}")
    public String getCurrentUsername(@PathVariable String username){
        return "当前用户："+username;
    }
```

配置类：

```java
                        .mvcMatchers("/hello/user/{username}").access((authenticationSupplier, requestAuthorizationContext) -> {
                            // 当前用户的权限信息 比如角色
                            Collection<? extends GrantedAuthority> authorities = authenticationSupplier.get().getAuthorities();
                            // 当前请求上下文
                            // 我们可以获取携带的参数
                            Map<String, String> variables = requestAuthorizationContext.getVariables();
                            // 我们可以获取原始request对象
                            HttpServletRequest request = requestAuthorizationContext.getRequest();
                            // 根据这些信息 和业务写逻辑即可 最终决定是否授权 isGranted
                            boolean isGranted = authorities.stream().map(GrantedAuthority::getAuthority).filter(s -> s.equals("用户") || s.equals("管理员")).count() > 0;
                            if (!isGranted){
                                throw new AccessDeniedException("Access Denied");
                            }
                            return new AuthorizationDecision(isGranted);
                        })
```

启动测试未生效，原因未知，卡了比较久，先注释掉，跳过。

使用authorizeRequests来做：

接口一样，配置时：

```java
.mvcMatchers("/hello/user/{username}").access("hasRole('ADMIN') or #username=='赖卓成'")
```

#username是参数

测试：

使用角色TEST访问失败，

使用角色ADMIN访问成功，

使用角色TEST访问并且参数为'赖卓成'，访问成功。

## 7-2 方法级注解

之前是限制url的权限，在访问url的时候会检查身份是否授权，但是有些场景需要对方法进行限制。

要使用方法级别的注解，先创建一个配置类，用来开启这个功能：

```java
/**
 * 方法安全性配置  用于开启方法级别安全注解：@PreAuthorize、@PreFilter、@PostAuthorize、@PostFilter
 *
 * @author laizhuocheng
 * @date 2023/01/06
 */
@EnableMethodSecurity(prePostEnabled = true)
public class MethodSecurityConfig {
}
```

### 方法之前校验权限

写一个接口：

```java
    @GetMapping("/user/findAll")
    public List<User> findAll(){
        return  userService.findAll();
    }
```

控制层不做权限设置，在业务层的方法上加上注解：

```java
    @Override
    @PreAuthorize("hasRole('管理员')")
    public List<User> findAll() {
        return userRepo.findAll();
    }
```

请求进来，就会校验用户权限，我用游客访问这个接口，报错了：

![image-20230106171735049](http://www.iocaop.com/images/2023-01/image-20230106171735049.png)

可以看到，web请求是认证成功了，但是方法没有认证成功：

![image-20230106172128658](http://www.iocaop.com/images/2023-01/image-20230106172128658.png)

### 方法之后校验权限

因为是先对数据进行操作，再进行权限校验，不推荐在对数据进行变更的方法上使用，不安全。

写个demo测试一下：

配置类先配置该接口需要认证，然后再来看授权：

认证后会对用户进行授权，我们用PostAuthorize注解，条件是方法返回值中的username和认证成功的Authentication对象中的name相同才授权。

在接口上加上注解：根据方法的返回值对接口进行授权认证

```java
    @GetMapping("/user/by-email/{email}/v2")
    @PostAuthorize("returnObject.username==authentication.name")
    public User getUserByEmailV2(@PathVariable String email){
        return userService.findByEmail(email).orElseThrow();
    }
```

使用admin用户的token对接口进行访问：

通过邮箱查询用户，如果用户名和已认证的相同，则授权：

![image-20230107173828358](http://www.iocaop.com/images/2023-01/image-20230107173828358.png)

不相同则抛出授权异常：

![image-20230107173917061](http://www.iocaop.com/images/2023-01/image-20230107173917061.png)

数据库信息：

![image-20230107173939554](http://www.iocaop.com/images/2023-01/image-20230107173939554.png)

### 方法安全级别和路径安全级别冲突的情况

接口上的注解要求管理员身份：

```java
    @GetMapping("/user/by-email/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public User getUserByEmail(@PathVariable String email){
        return userService.findByEmail(email).orElseThrow();
    }
```

配置文件中要求用户身份：

```java
                                .mvcMatchers("/user/by-email/{email}").hasRole("USER")
```

启动项目后使用USER角色访问会怎么样？

授权异常：

![image-20230107175153468](http://www.iocaop.com/images/2023-01/image-20230107175153468.png)

教程中，在单元测试用可以看到投票的过程和结果，懒得做了。结论：需要全票通过才行，在url授权成功了，但是在方法上授权失败了。

### 在调试时遇到的问题

#### 异常捕获的问题

在调试时遇到这样的一个问题：以同样的配置方式进行url匹配权限，得到了不一样的结果：

```java
        http
                .requestMatchers(req -> req.mvcMatchers("/api/**", "/admin/**", "/auth/**")).exceptionHandling(exp ->
                        exp.authenticationEntryPoint(securityProblemSupport)
                                .accessDeniedHandler(securityProblemSupport)
                )

                // 授权配置
                .authorizeHttpRequests(req -> req
                        .mvcMatchers("/admin/**").hasRole("ADMIN")
                        .mvcMatchers("/api/**").hasRole("USER")
                        .mvcMatchers("/hello/**").hasRole("ADMIN")
```

```java
@RestController
@RequestMapping("/admin")
public class AdminController {

    @RequestMapping("v1")
    public String v1(){
        return "v1";
    }
}
```

```java
@RestController
@RequestMapping("/hello")
public class HelloController {
    @RequestMapping("v1")
    public String v1(){
        return "v1";
    }
}
```

使用同一个不具备权限的用户进行访问，得到了不一样的结果：

![image-20230107162022510](http://www.iocaop.com/images/2023-01/image-20230107162022510.png)

![image-20230107162042955](http://www.iocaop.com/images/2023-01/image-20230107162042955.png)

经过各种调试，最终找到问题：异常捕获

当使用了异常捕获配置：

```java
        http
                .requestMatchers(req -> req.mvcMatchers("/api/**", "/admin/**", "/auth/**")).exceptionHandling(exp ->
                        exp.authenticationEntryPoint(securityProblemSupport)
                                .accessDeniedHandler(securityProblemSupport)
                )
```

对异常进行捕获时，路径中没有匹配上的异常讲不会抛出，被放行了，所以hello接口会正常返回数据，解决方案：在异常捕获匹配中加入该接口的路径：

![image-20230107162243447](http://www.iocaop.com/images/2023-01/image-20230107162243447.png)

或者直接注释掉，不使用这个异常捕获，就会正常返回403：

![image-20230107162321286](http://www.iocaop.com/images/2023-01/image-20230107162321286.png)

![image-20230107162336615](http://www.iocaop.com/images/2023-01/image-20230107162336615.png)

#### mvcMatchers的问题

当使用了mvcMatchers，需要配置好对应的servlet-path，默认为/

```yaml
spring:
  mvc:
    servlet:
      path: /
```

如果手动配置了这个path，且path不是默认的/，则需要在进行匹配时加上：

```java
  .mvcMatchers("/hello/**").servletPath("/").hasRole("ADMIN")
```

#### hasRole匹配不上的问题

还是上面的配置：

```java
                // 授权配置
                .authorizeHttpRequests(req -> req
                        .mvcMatchers("/admin/**").hasRole("ADMIN")
                        .mvcMatchers("/api/**").hasRole("USER")
                        .mvcMatchers("/hello/**").hasRole("ADMIN")
```

我们使用用户角色为ADMIN的用户进行访问hello的接口：

![image-20230107163721486](http://www.iocaop.com/images/2023-01/image-20230107163721486.png)

报错了，提示没有权限：



![image-20230107163738621](http://www.iocaop.com/images/2023-01/image-20230107163738621.png)

但是可以看到，在日志中已经打印了，SecurityContextHolder中存储的用户角色明明是ADMIN：

```java
023-01-07 16:36:09.839 DEBUG 20316 --- [nio-8080-exec-3] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to SecurityContextImpl [Authentication=UsernamePasswordAuthenticationToken [Principal=admin, Credentials=[PROTECTED], Authenticated=true, Details=null, Granted Authorities=[ADMIN]]]
2023-01-07 16:36:09.843 ERROR 20316 --- [nio-8080-exec-3] o.z.problem.spring.common.AdviceTraits   : Internal Server Error

org.springframework.security.access.AccessDeniedException: Access Denied
```

为什么还会报错？因为使用hasRole方法，会在授权投票时自动加上ROLE_前缀，也就是.hasRole("ADMIN")期待的是ROLE_ADMIN，但是数据库中查出来的却是ADMIN，导致授权失败，

解决方法：使用另一个方法：这个方法不会自动填充上ROLE_前缀

```java
hasAuthority("ADMIN")
```

或者在数据库角色名称中加上前缀ROLE_，如下：

![image-20230107164112675](http://www.iocaop.com/images/2023-01/image-20230107164112675.png)

更深入了解，可以查看角色投票器：RoleVoter

![image-20230107164159581](http://www.iocaop.com/images/2023-01/image-20230107164159581.png)

## 7-3 RBAC 和角色分级

### RBAC基础知识

如何理解：角色其实是权限的集合，一个角色可以用多种不同的权限，一个用户可以有不同的角色。

![image-20230108112209403](http://www.iocaop.com/images/2023-01/image-20230108112209403.png)

RBAC只是一个基础建模，可以在这基础上加，如加组织、部门等。

SpringSecurity中有hasRole和hasAuthority两个方法，其实本质是一样的，但是hasRole需要在数据库角色字段的值中加前缀ROLE_使得看起来，这就是一个角色，如ROLE_ADMIN，但是还是这个字段，使用hasAuthority就不需要加前缀，我们可以把值设置为：删除、修改等表示权限，就不会是：ROLE\_删除，使得看起来像是一个角色，有语义上的一个限制。

动态配置权限：

其实是把不同的权限的组合配置给某个用户，其实就是角色的分配。不管怎么动态，最后都是需要一个固定的权限，来决定权限的组合，来限制用户访问哪些接口。也就是最终都会有固定的”原子“权限。

RBAC其实可以简化，也就是分配的时候，只分配到角色这一层，权限这一层就不管了。如果实际业务没有细粒度的要求控制到某一个角色对资源的增删改查，就可以这样做，不需要原子权限这一层了。

### 角色分级

在RBAC中，如果角色非常多，几百上千个，那么管理起来很麻烦，所以需要对角色进行分级，在SpringSecurity中，使用的是包含的方式来分级。可以显著减轻管理角色和权限时的负担。

![image-20230108115504462](http://www.iocaop.com/images/2023-01/image-20230108115504462.png)

代码实战，实现RoleHierarchy接口，重写方法：

![image-20230108115746624](http://www.iocaop.com/images/2023-01/image-20230108115746624.png)

把Role层级对应的所有权限拿出来。

SpringSecurity默认有实现，RoleHierarchyImpl类。

需要在SpringSecurity的配置类中配置一下Bean，就用默认的实现类来设置角色层级：

```java
    @Bean
    public RoleHierarchy roleHierarchy(){
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        // 设置角色层级
        roleHierarchy.setHierarchy(
                "ROLE_ADMIN > ROLE_MANAGER" +
                "\n" +
                "ROLE_MANAGER > ROLE_USER");
        return roleHierarchy;
    }
```

这里定义了角色层级为：ADMIN包含MANAGER的权限，MANAGER包含了USER的权限，然后再创建一个接口，对接口url限定权限为MANAGER才可以访问：

```java
    @GetMapping("/user/manager")
    public String getManager(){
        return "Hi";
    }
```

```java
.mvcMatchers("/hello/user/manager").hasRole("MANAGER")
```

先使用TEST角色访问：没有权限

```java
2023-01-08 12:08:30.188 DEBUG 10148 --- [nio-8080-exec-6] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to SecurityContextImpl [Authentication=UsernamePasswordAuthenticationToken [Principal=test2, Credentials=[PROTECTED], Authenticated=true, Details=null, Granted Authorities=[ROLE_TEST]]]
2023-01-08 12:08:30.197 ERROR 10148 --- [nio-8080-exec-6] o.z.problem.spring.common.AdviceTraits   : Internal Server Error

org.springframework.security.access.AccessDeniedException: Access Denied
```

再将用户角色修改为MANAGER进行访问：授权成功

![image-20230108121335710](http://www.iocaop.com/images/2023-01/image-20230108121335710.png)

![image-20230108121401831](http://www.iocaop.com/images/2023-01/image-20230108121401831.png)

再将用户角色改为ADMIN进行访问：授权成功

![image-20230109161359882](http://www.iocaop.com/images/2023-01/image-20230109161359882.png)

![image-20230109161458581](http://www.iocaop.com/images/2023-01/image-20230109161458581.png)

调试期间遇到了问题，一直访问失败，一开始以为是版本问题，最终确定问题是：

在授权配置时使用的是authorizeHttpRequests，**authorizeHttpRequests** 和 **RoleHierarchy** 结合是没有效果的。需要注意。

![image-20230109161839874](http://www.iocaop.com/images/2023-01/image-20230109161839874.png)

参考链接：<a href='https://blog.csdn.net/WLNMYR/article/details/122430201'>点击跳转</a>

## 7-4 数据库和实体类的 RBAC 改造

之前的数据库是：用户->角色，现在要做成：用户->角色->权限

需要修改表结构，由于是JPA所以要修改实体类，原来是Role实现了GrantedAuthority，不实现了，用role做permission的"容器"，也就是角色包含了权限。

新建实体类Permission，实现GrantedAuthority接口，定义好字段、表关联关系：

```java
/**
 * 权限 实体类
 *
 * @author 赖卓成
 * @date 2023/01/10
 */
@Data
@With
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@ToString
@Table(name = "security_permission")
public class Permission implements GrantedAuthority, Serializable {

    /**
     * id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 权限
     */
    @Column(name = "permission_name",unique = true,nullable = false,length = 50)
    private String authority;

    /**
     * 权限名称--前端展示
     */
    @Column(name = "display_name",unique = true,nullable = false,length = 50)
    private String displayName;


    /**
     * 角色集合
     * 多对多关系，互相包含，所以添加上 @JsonIgnore 注解，不然会无限循环查数据库进行序列化
     * mappedBy用于设置映射时使用的名称
     *
     */
    @JsonIgnore
    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles;
}
```

> 需要注意的是@ManyToMany(mappedBy = "permissions")的使用，这里是Permission和Role互相包含，在Permission类的roles字段上的注解参数mappedBy应该填写Role中Permission集合的字段名称：

![image-20230110144606656](http://www.iocaop.com/images/2023-01/image-20230110144606656.png)

Role不实现GrantedAuthority：

![image-20230109180810672](http://www.iocaop.com/images/2023-01/image-20230109180810672.png)

改Role造类，注解配置好与Permission的多对多关系：

```java
/**
 * 角色
 *
 * @author lzc
 * @date 2022/12/10
 */
@Entity
@Table(name = "security_role")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Role implements  Serializable {

    /**
     * id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 角色名
     */
    @Column(name = "role_name",unique = true,nullable = false,length = 50)
    private String roleName;

    /**
     * 角色名称--前端展示
     */
    @Column(name = "display_name",unique = true,nullable = false,length = 50)
    private String displayName;


    /**
     * 建在
     */
    @NotNull
    @Column(name = "built_in", nullable = false)
    private boolean builtIn;


    /**
     * 权限
     */
    @ManyToMany
    @JsonIgnore
    // 用join的方式查询
    @Fetch(FetchMode.JOIN)
    @JoinTable(
            // 中间表名称
            name = "security_role_permission",
            // Role表的 关联字段 可以是数组，里面再用注解进行配置
            joinColumns = {@JoinColumn(
                    // 关联的字段在中间表是role_id 引自security_role表的id
                    name = "role_id",referencedColumnName = "id"),
            },
            // Permission表的关联字段
            inverseJoinColumns = {@JoinColumn(
                    // 关联字段在中间表是permission_id，引自security_permission表的id
                    name = "permission_id",referencedColumnName = "id")})
    private Set<Permission> permissions = new HashSet<>();


    /**
     * 用户集合，多对多关系
     */
    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Set<User> users;
    
}
```

改造User类，原来UserDetails中的方法重写是由lombok完成的，因为配置多对多关系时用户->角色是直接使用角色集合作为authorities的：

![image-20230110145603946](http://www.iocaop.com/images/2023-01/image-20230110145603946.png)

现在增加了权限表Permission，用户与角色多对多，角色与权限多对多，就需要手动重写方法获取用户权限：

```java
    /**
     * 获取权限
     *
     * @return {@link Collection}<{@link ?} {@link extends} {@link GrantedAuthority}>
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                // 返回的是一个流，所以使用flatMap
                .flatMap(role -> 
                // 将两个流合并(链接)
                Stream.concat(
                        // 用户角色，如ROLE_ADMIN也作为一种权限
                        Stream.of(new SimpleGrantedAuthority(role.getRoleName())),
                        // 角色中的权限(实现了GrantedAuthority接口)集合
                        role.getPermissions().stream()
                )
        ).collect(Collectors.toList());
    }
```

修改与Role多对多关系字段的名称为roles后，User类代码：

```java
@Data
@With
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@ToString
@Table(name = "security_user")
public class User implements Serializable, UserDetails {
    /**
     * 指定主键和生成策略为自增
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false, unique = true)
    private String username;

    @Column(length = 255, nullable = false, name = "password_hash")
    @JsonIgnore
    private String password;

    @Column(length = 255, nullable = true, unique = true)
    private String email;

    @Column(length = 255, nullable = true, unique = true)
    private String mobile;

    @Column(length = 50, nullable = false, name = "full_name")
    private String fullName;

    /**
     * 使用mfa,是否启用两步验证
     */
    @Column(name = "using_mfa", nullable = false)
    @Builder.Default
    private boolean usingMfa = false;

    /**
     * 用于生成TOTP的Key的字节数组的Base64字符串
     */
    @Column(name = "mfa_key", nullable = false)
    @JsonIgnore
    private String mfaKey;

    /**
     * 启用 因为是基本类型，lombok生成的方法就是isEnabled 刚好重写了UserDetails的isEnabled方法，
     * 所以可以删除快捷键生成的isEnabled，也就是不需要我们手动重写了。包装类型不能这样。
     */
    @Column(nullable = false)
    private boolean enabled;

    /**
     * 下面三个字段也是同理
     */
    @Column(name = "account_non_locked", nullable = false)
    private boolean accountNonLocked;

    @Column(name = "account_non_expired", nullable = false)
    private boolean accountNonExpired;

    @Column(name = "credentials_non_expired", nullable = false)
    private boolean credentialsNonExpired;

    @ManyToMany
    // 用join的方式查询
    @Fetch(FetchMode.JOIN)
    @JoinTable(name = "security_user_role",
            // User表的 关联字段 可以是数组，里面再用注解进行配置
            joinColumns = {@JoinColumn(
                    // 关联的字段在中间表是user_id 引自security_users表的id
                    name = "user_id", referencedColumnName = "id"),
            },
            // Role表的关联字段
            inverseJoinColumns = {@JoinColumn(
                    // 关联字段在中间表是role_id，引自security_role表的id
                    name = "role_id", referencedColumnName = "id")})
    // 缓存
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @BatchSize(size = 20)
    private Set<Role> roles;

    /**
     * 获取权限
     *
     * @return {@link Collection}<{@link ?} {@link extends} {@link GrantedAuthority}>
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                // 返回的是一个流，所以使用flatMap
                .flatMap(role ->
                // 将两个流合并(链接)
                Stream.concat(
                        // 用户角色，如ROLE_ADMIN也作为一种权限
                        Stream.of(new SimpleGrantedAuthority(role.getRoleName())),
                        // 角色中的权限(实现了GrantedAuthority接口)集合
                        role.getPermissions().stream()
                )
        ).collect(Collectors.toList());
    }

    //    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }

//    @Override
//    public boolean isEnabled() {
//        return false;
//    }

}
```

将修改实体类后影响项目启动的代码注释掉，启动项目后，表结构被JPA自动修改了：

![image-20230110150315347](http://www.iocaop.com/images/2023-01/image-20230110150315347.png)

运行数据库脚本，初始化数据：

```sql
INSERT INTO security_permission ( id, permission_name, display_name )
VALUES
	( 1, 'USER_READ', '查询用户信息' ),
	( 2, 'USER_CREATE', '新建用户' ),
	( 3, 'USER_UPDATE', '编辑用户信息' ),
	( 4, 'USER_ADMIN', '用户管理' );
	
	
INSERT INTO security_user ( id, username, full_name, mobile, password_hash, enabled, account_non_expired, account_non_locked, credentials_non_expired, using_mfa, mfa_key, email )
VALUES
	( 1, 'user', 'Zhang San', '13012341234', '{bcrypt}$2a$10$jhS817qUHgOR4uQSoEBRxO58.rZ1dBCmCTjG8PeuQAX4eISf.zowm', 1, 1, 1, 1, TRUE, '8Uy+OZUaZur9WwcP0z+YxNy+QdsWbtfqA70GQMxMfLeisTd8Na6C7DkjhJWLrGyEyBsnEmmkza6iorytQRh7OQ==', 'zhangsan@local.dev' ),
	( 2, 'old_user', 'Li Si', '13812341234', '{SHA-1}7ce0359f12857f2a90c7de465f40a95f01cb5da9', 1, 1, 1, 1, FALSE, '8Uy+OZUaZur9WwcP0z+YxNy+QdsWbtfqA70GQMxMfLeisTd8Na6C7DkjhJWLrGyEyBsnEmmkza6iorytQRh7OQ==', 'lisi@local.dev' );
	
	
INSERT INTO security_role ( id, role_name, display_name, built_in )
VALUES
	( 1, 'ROLE_USER', '客户端用户', TRUE ),
	( 2, 'ROLE_ADMIN', '超级管理员', TRUE ),
	( 3, 'ROLE_STAFF', '管理后台用户', TRUE );
INSERT INTO security_user_role ( user_id, role_id )
VALUES
	( 1, 1 ),
	( 1, 2 ),
	( 1, 3 ),
	( 2, 1 );
	
INSERT INTO security_role_permission ( role_id, permission_id )
VALUES
	( 1, 1 ),
	( 2, 1 ),
	( 2, 2 ),
	( 2, 3 ),
	( 2, 4 );
```

启动项目登录：

死循环，导致栈溢出，参考：<a href='https://blog.csdn.net/qq_21568515/article/details/124103794'>点击跳转</a>

但是加上@JsonIgnore注解也没效果，所以注释掉，不使用双向关联了。

## 7-5 元注解简化权限表达式的使用

简单的说，就是我们可以新建一个注解来包含原来的方法级别的注解，达到代码优化的效果。

我们新建一个接口用来修改用户信息，管理员或者拥有修改权限的用户可以修改任何用户的信息，其他只能修改自己的信息所以这个接口是这样的(为了测试，不严格遵循RestFul)：

```java
    @PostMapping("/user/update")
    @PreAuthorize("authentication.name==#user.username or hasAnyAuthority('ROLE_ADMIN','USER_UPDATE')")
    public String saveUser(User user){
        return "允许修改";
    }
```

如果还有其他接口也是一样的权限规则，又要重新写一遍注解，而且可读性不好，所以我可以再创建一个注解：

```java
/**
 * 授权需要：管理员或具有更新权限
 *
 * @author 赖卓成
 * @date 2023/01/11
 */
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("authentication.name==#user.username or hasAnyAuthority('ROLE_ADMIN','USER_UPDATE')")
public @interface RoleAdminOrUpdate {

}
```

将接口上的注解改为我们自定义的注解：

```java
    @PostMapping("/user/update")
    @RoleAdminOrUpdate
    public String saveUser(User user){
        return "允许修改";
    }
```

运行后，效果是一样的。测试过了，图片上传了，没什么意义。

## 7-6 使用 AOP 动态刷新角色层级-未完成

虽然在User类中重写了UserDetails的方法getAuthorities，使得角色和权限都保存在了SecurityContextHolder中，也就是说，现在登录用户后，会将用户角色和用户角色对应的权限都添加到UsernamePasswordAuthenticationToken的authorities中：

![image-20230111154706747](http://www.iocaop.com/images/2023-01/image-20230111154706747.png)

创建token时，将GrantedAuthority的是String存进去了。

![image-20230111155102951](http://www.iocaop.com/images/2023-01/image-20230111155102951.png)

认证成功后，再用之前存的String，new了GrantedAuthority保存在UsernamePasswordAuthenticationToken中：

![image-20230111155119261](http://www.iocaop.com/images/2023-01/image-20230111155119261.png)

为了学习角色层级和AOP刷新层级，我们还是新建了一个Service，用于刷新角色层级，可以在没有把用户角色对应的用户权限加入UsernamePasswordAuthenticationToken中的情况让授权正常进行。

```java
/**
 * 角色层级 业务层实现类
 *
 * @author 赖卓成
 * @date 2023/01/11
 */
@RequiredArgsConstructor
@Service
public class RoleHierarchyServiceImpl implements RoleHierarchyService {

    private final RoleRepo roleRepo;

    public String getRoleHierarchyExpr() {
        // 获取所有用户的角色，给每个角色设置层级为角色名包含权限，如ROLE_ADMIN > USER_READ ROLE_ADMIN > USER_CREATE 等等
        val roles = roleRepo.findAll();
        return roles.stream()
                .flatMap(role -> role.getPermissions().stream()
                        .map(permission -> role.getRoleName() + " > " + permission.getAuthority() + "\n"))
                //上面是角色和权限之间的包含关系， 最后手动加上角色之间的包含关系
                .collect(Collectors.joining(
                        // 分隔符
                        "",
                        // 前缀
                        ROLE_ADMIN + " > " + ROLE_STAFF+ "\n",
                        // 后缀
                        ""));
    }
}
```

修改角色层级配置：

```java
    @Bean
    public RoleHierarchy roleHierarchy(){
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        // 设置角色层级
//        roleHierarchy.setHierarchy(
//                "ROLE_ADMIN > ROLE_MANAGER" +
//                "\n" +
//                "ROLE_MANAGER > ROLE_USER");

        roleHierarchy.setHierarchy(roleHierarchyService.getRoleHierarchyExpr());
        return roleHierarchy;
    }
```

处理完后，是这样的：

![image-20230111163609980](http://www.iocaop.com/images/2023-01/image-20230111163609980.png)

假设我们在User类中的getAuthorities方法中没有将权限和角色进行合并，而是只返回了角色，那么在SecurityContextHolder中，就没有保存权限在authorities,需要通过设置角色层级来进行授权，就会有一个问题，假设我们修改了角色，就需要刷新角色层级，所以练习一下AOP刷新角色层级：

导入依赖：

```xml
        <!-- Spring AOP -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
		
```

建立切面：

装配获取角色层级表达式的Service和已有的RoleHierarchyImpl类型的Bean，设置好切点，后置通知：

```java
/**
 * 角色等级重新加载 切面
 *
 * @author 赖卓成
 * @date 2023/01/11
 */
@Slf4j
@RequiredArgsConstructor
@Aspect
public class RoleHierarchyReloadAspect {

    private final RoleHierarchyImpl roleHierarchy;
    private final RoleHierarchyService roleHierarchyService;

    /**
     * 在表达式 <code>* com.lzc.security.service.*.*(..)</code> 中
     * 第一个 * 的位置表示方法的返回类型，* 指的是任意类型
     * 然后 com.lzc.security.service.*.* 指定的是方法，这里要指定完整的方法名，*.* 表示 package 下任意方法
     * 最后 (..) 指定的是方法参数
     */
    @Pointcut("execution(* com.lzc.security.service.*.*(..))")
    public void applicationPackagePointcut() {
    }

    /**
     * 刷新角色层级
     */
    @AfterReturning("applicationPackagePointcut() && @annotation(com.lzc.security.annotation.ReloadRoleHierarchy)")
    public void reloadRoleHierarchy() {
        val roleMap = roleHierarchyService.getRoleHierarchyExpr();
        roleHierarchy.setHierarchy(roleMap);
        log.debug("RoleHierarchy Reloaded");
    }

}

```

新建注解：

```java
/**
 * 重新加载角色层次结构
 *
 * @author 赖卓成
 * @date 2023/01/11
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ReloadRoleHierarchy {
}
```

未完成，存在循环依赖问题，老子不干了！

## 7-7 前端的安全

前端内容，跳过

## 7-8 授权流程源码解析和用户组的思路扩展.

先看PreInvocationAuthorizationAdviceVoter：

![image-20230112212912868](http://www.iocaop.com/images/2023-01/image-20230112212912868.png)

可以看到这一步，是在获取当前访问的方法或者url上的安全表达式，这里取到的是hasRole('ADMIN')，然后再去检查，看是否允许授权，点击进入方法，或者F7，跳到了子类ExpressionBasedPreInvocationAdvice，

![image-20230112213615000](http://www.iocaop.com/images/2023-01/image-20230112213615000.png)

F8返回刚才父类的断点，在点下一步，跳到了AffirmativeBased：

![image-20230112214107904](http://www.iocaop.com/images/2023-01/image-20230112214107904.png)

可以看到循环了Voter，并且可以看到switch中，只要有一个投票器授权了，就return，这是一票以上即可通过策略，否则会走到最下面进行判断，抛出异常。

## 8-1 OAuth2 的主要角色和流程.

简书可以使用微博登录。

* 客户端：简书
* 资源服务器：微博中的资源
* 授权服务器：就是登录页面，提示是否允许授权时访问的服务器
* 用户

一般来说，需要申请客户端，得到key和secret。

授权类型：

* 授权码流程：先在客户端携带key进行跳转到授权服务器，授权服务器返回登录页，登录成功后，返回授权码，客户端再使用授权码获取授权服务器的token获取资源，最后客户端生成token返回给前端。可参考另一篇笔记：<a href='http://www.iocaop.com/posts/2022-hlxx/%E5%B9%BF%E4%B8%9C%E7%9C%81%E7%BB%9F%E4%B8%80%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E5%B9%B3%E5%8F%B0%E5%AF%B9%E6%8E%A5.html'>点击跳转</a>

  ![image-20230112175355822](http://www.iocaop.com/images/2023-01/image-20230112175355822.png)

* 资源所有者密码流程(适合官方应用)：直接用用户名和密码登录，不需要跳转到授权服务器。

* 客户端凭证流程(适合无用户参与的应用)：静态资源服务器，自己的服务进行访问，只需要key，不用secret。

* 刷新令牌流程：访问令牌过期后需要刷新令牌

## 8-2 JWS和JWK

### Oauth介绍

在SpringSecurity5.1之前所有啊Oauth(包括1.0和2.0)功能集成在SpringSecurity OAuth2，单独一个包，支持搭建授权服务器和资源服务器。

5.1之后，SpringSecurity把所有的Oauth2.0（1.0已经不支持了）的功能集成了，不需要单独一个包，在SpringSecurity的包里就有了，提供了资源服务器和客户端类库支持。

目前全新的项目，Spring Authorization Server正在开发中。

### 什么是JWS和JWK

JWS：S代表secret，描述了验证数据完整性的不同加密机制。关于JWT签名的验证数据完整性的标准。

JWK：K代表Key，表示加密秘钥的json结构，JWT加密秘钥。

一对秘钥(非对称加密)，分别保存在服务器和客户端。

### 公钥和私钥

* 非对称加密：私钥在自己这，公钥可以公开出去。

  用私钥签名，用公钥解签名。私钥加密的签名，很多人有公钥，很多人可以解。

  或者公钥加密，私钥解密。很多人加密了内容，给我，我有私钥，只能有我来解，公钥不能互相解。

### JWS和JWK在加密时的作用

![image-20230112182558582](http://www.iocaop.com/images/2023-01/image-20230112182558582.png)

  



流程：



1. 客户端访问授权服务器，返回了一个使用JWS签名的JWT，里面包含了Kid，Kid：一种加密形式的秘钥的标识，包含秘钥的结构，比如使用何种方式进行加密。
2. 客户端请求资源服务器(携带了JWT(JWS签名的))
3. 资源服务器请求授权服务器，返回了一个JWK。
4. 资源服务器再验证签名。
5. 资源服务器验证权限。

使用JWS的标准进行签名---JWT创建流程：

![image-20230112221351156](http://www.iocaop.com/images/2023-01/image-20230112221351156.png)

使用JWS的标准进行签名---JWT解析流程：

![image-20230112221602428](http://www.iocaop.com/images/2023-01/image-20230112221602428.png)

## 8-3 搭建授权服务器（一）依赖和表结构.

导入依赖：

```xml
        <security.oauth2.version>2.5.2.RELEASE</security.oauth2.version>
        <security.oauth2.autoconfigure.version>2.6.8</security.oauth2.autoconfigure.version>

        <!-- Spring Security OAuth2 依赖 -->
        <!-- 注意，Spring 已经在开发 Spring Authorization Server，下面三个依赖以后逐渐会弃用 -->
        <dependency>
            <groupId>org.springframework.security.oauth.boot</groupId>
            <artifactId>spring-security-oauth2-autoconfigure</artifactId>
            <version>${security.oauth2.autoconfigure.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.security.oauth</groupId>
            <artifactId>spring-security-oauth2</artifactId>
            <version>${security.oauth2.version}</version>
        </dependency>
        <!-- 新版 Resource Server 类库 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
        </dependency>
```

建表：

```sql

DROP TABLE IF EXISTS oauth_client_details;
CREATE TABLE oauth_client_details
(
    client_id               VARCHAR(255),
    client_name             VARCHAR(50),
    resource_ids            VARCHAR(255),
    client_secret           VARCHAR(255),
    scope                   VARCHAR(255),
    authorized_grant_types  VARCHAR(255),
    web_server_redirect_uri VARCHAR(255),
    authorities             VARCHAR(255),
    access_token_validity   INTEGER,
    refresh_token_validity  INTEGER,
    additional_information  VARCHAR(4096),
    autoapprove             VARCHAR(255)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS oauth_client_token;
CREATE TABLE oauth_client_token
(
    token_id          VARCHAR(255),
    token             BLOB,
    authentication_id VARCHAR(255),
    user_name         VARCHAR(255),
    client_id         VARCHAR(255),
    PRIMARY KEY (authentication_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS oauth_access_token;
CREATE TABLE oauth_access_token
(
    token_id          VARCHAR(255),
    token             BLOB,
    authentication_id VARCHAR(255),
    user_name         VARCHAR(255),
    client_id         VARCHAR(255),
    authentication    BLOB,
    refresh_token     VARCHAR(255)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS oauth_refresh_token;
CREATE TABLE oauth_refresh_token
(
    token_id       VARCHAR(255),
    token          BLOB,
    authentication BLOB
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS oauth_code;
CREATE TABLE oauth_code
(
    code           VARCHAR(255),
    authentication BLOB
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS oauth_approvals;
CREATE TABLE oauth_approvals
(
    userid         VARCHAR(255),
    clientid       VARCHAR(255),
    scope          VARCHAR(255),
    `status`         VARCHAR(10),
    expiresat      TIMESTAMP default current_timestamp,
    lastmodifiedate TIMESTAMP default current_timestamp
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
```

不学了
