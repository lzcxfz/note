---
title: aop实现日志收集
date: 2022-12-14
category:
- 工作
- 日志收集
- 切面
---

参考文章：<a href='https://www.moguit.cn/info/148'>点击跳转</a>

工作中，日志记录到数据库中，所以做了这个切面+注解。

表结构设计：

![image-20221215112447988](http://www.iocaop.com/images/2022-12/image-20221215112447988.png)

ddl脚本：

```sql
/*
 Navicat Premium Data Transfer

 Source Server         : 测试
 Source Server Type    : SQL Server
 Source Server Version : 15002000
 Source Host           : 192.168.1.168:1433
 Source Catalog        : SZES_GXJ
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 15002000
 File Encoding         : 65001

 Date: 15/12/2022 11:25:56
*/


-- ----------------------------
-- Table structure for gxj_log
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[gxj_log]') AND type IN ('U'))
	DROP TABLE [dbo].[gxj_log]
GO

CREATE TABLE [dbo].[gxj_log] (
  [id] uniqueidentifier  NOT NULL,
  [create_by] uniqueidentifier  NULL,
  [create_time] datetime  NULL,
  [behavior] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [ip_address] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [in_parameter] varchar(8000) COLLATE Chinese_PRC_CI_AS  NULL,
  [out_parameter] varchar(8000) COLLATE Chinese_PRC_CI_AS  NULL,
  [description] varchar(8000) COLLATE Chinese_PRC_CI_AS  NULL,
  [create_by_name] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [request_path] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [method_name] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [request_type] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [user_agent] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [duration] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[gxj_log] SET (LOCK_ESCALATION = TABLE)
GO

EXEC sp_addextendedproperty
'MS_Description', N'主键',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'id'
GO

EXEC sp_addextendedproperty
'MS_Description', N'用户id',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'create_by'
GO

EXEC sp_addextendedproperty
'MS_Description', N'时间',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'create_time'
GO

EXEC sp_addextendedproperty
'MS_Description', N'业务名称/用户行为',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'behavior'
GO

EXEC sp_addextendedproperty
'MS_Description', N'操作ip',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'ip_address'
GO

EXEC sp_addextendedproperty
'MS_Description', N'入参',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'in_parameter'
GO

EXEC sp_addextendedproperty
'MS_Description', N'出参',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'out_parameter'
GO

EXEC sp_addextendedproperty
'MS_Description', N'备注/内容',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'description'
GO

EXEC sp_addextendedproperty
'MS_Description', N'用户名称',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'create_by_name'
GO

EXEC sp_addextendedproperty
'MS_Description', N'接口地址',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'request_path'
GO

EXEC sp_addextendedproperty
'MS_Description', N'方法名称',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'method_name'
GO

EXEC sp_addextendedproperty
'MS_Description', N'请求方式',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'request_type'
GO

EXEC sp_addextendedproperty
'MS_Description', N'浏览器UA',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'user_agent'
GO

EXEC sp_addextendedproperty
'MS_Description', N'耗时',
'SCHEMA', N'dbo',
'TABLE', N'gxj_log',
'COLUMN', N'duration'
GO


-- ----------------------------
-- Primary Key structure for table gxj_log
-- ----------------------------
ALTER TABLE [dbo].[gxj_log] ADD CONSTRAINT [PK__gxj_log__3213E83FEE436FC0] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

```



创建注解：

```java
/**
 * 自定义注解记录业务日志
 *
 * @author laizhuocheng
 * @date 2022/12/14
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface BusinessLog {

}
```

创建切面并加到ioc，因为需要操作数据库：

```java
/**
 * 日志切面
 *
 * @author laizhuocheng
 * @date 2022/12/14
 */
@Aspect
@Component
@Slf4j
public class LoggerAspect {

    @Autowired
    private GxjLogService gxjLogService;

     /**
     * 切入点 --指定哪些方法需要执行AOP
     *
     * @param businessLog 业务日志注解
     */
    @Pointcut(value = "@annotation(businessLog)")
    public void pointcut(BusinessLog businessLog) {
    }
}    
```

正常执行，记录日志，使用环绕通知：

```java
    @Around(value = "pointcut(businessLog)")
    public Object doAround(ProceedingJoinPoint joinPoint, BusinessLog businessLog) throws Throwable {
        //先执行业务 简单计时
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();
        try {
            // 日志收集
            handle(joinPoint, result, null,end-start);
        } catch (Exception e) {
            log.error("日志记录出错!", e);
        }
        return result;
    }
```

如果接口报错，需要收集错误信息，使用异常通知：

```java
    @AfterThrowing(value = "pointcut(businessLog)", throwing = "ex")
    public Object doThrowing(JoinPoint joinPoint, BusinessLog businessLog, Throwable ex) throws Throwable {
        try {
            // 日志收集
            this.handle(joinPoint, null, ex,null);
        } catch (Exception e) {
            log.error("日志记录出错!", e);
        }
        return null;
    }
```

需要注意的是：

![image-20221215115059108](http://www.iocaop.com/images/2022-12/image-20221215115059108.png)

日志收集方法封装：

```java
    private void handle(JoinPoint point, Object result, Throwable ex,Long time) throws Exception {

        // 获取当前请求
        HttpServletRequest request = this.getCurrentRequest();
        // 获取当前响应
        HttpServletResponse response = this.getCurrentResponse();

        // 获取注解所在的方法
        Method currentMethod = this.getCurrentMethod(point);

        //获取注解方法上对应的swagger注解的参数-操作名称，所以业务日志注解不需要参数
        ApiOperation annotation = currentMethod.getAnnotation(ApiOperation.class);
        String behavior = annotation.value();
        
        // ip
        String ip = IPUtils.getIpAddr(request);

        // 获取参数和参数值 封装到map
        Map<String, Object> paramMap = this.getParamMap(point);

        // 当前用户
        ClientCorp user = UserThreadLocalContext.getUser();

        // 日志对象
        GxjLog gxjLog = new GxjLog().setId(UUID.randomUUID().toString())
                .setCreateBy(user.getCorpGUID())
                .setCreateTime(DateUtil.toLocalDateTime(new Date()))
                .setBehavior(behavior)
                .setIpAddress(ip)
                .setInParameter(paramMap.toString()).setUserAgent(request.getHeaders("User-Agent").nextElement())
                .setCreateByName(user.getCorpName())
                .setRequestPath(request.getRequestURL().toString())
                .setMethodName(currentMethod.getName())
                .setRequestType(request.getMethod())
                .setDuration(String.valueOf(time))
                .setDescription("方法所在类名:" + currentMethod.getDeclaringClass().getName());
                ;
        if (null != request && null == ex) {
            gxjLog.setOutParameter("HTTP状态码：" + response.getStatus() +"，业务状态码：200"+ "，响应体：" + new ObjectMapper().writeValueAsString(result));
        } else {
            if (ex instanceof BusinessException){
                BusinessException exception = (BusinessException) ex;
                gxjLog.setOutParameter("HTTP状态码：" + response.getStatus()+"，业务状态码："+exception.getCode()+"，报错信息：" + ex.getMessage());
            }else {
                gxjLog.setOutParameter("HTTP状态码：" + response.getStatus()+"，报错信息：" + ex.getMessage());
            }
            StackTraceElement[] stackArray = ex.getStackTrace();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < stackArray.length; i++) {
                StackTraceElement element = stackArray[i];
                sb.append(element.toString() + "\n");
            }
            gxjLog.setDescription(sb.toString());
        }
        gxjLogService.save(gxjLog);
    }
```

日志收集方法涉及到的工具：

获取当前请求和响应，参考文章：<a href='https://blog.csdn.net/javacrazy_/article/details/116588422'>点击跳转</a>

```java
    /**
     * 获取当前请求
     *
     * @return {@link HttpServletRequest}
     */
    private HttpServletRequest getCurrentRequest() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) requestAttributes;
        HttpServletRequest request = servletRequestAttributes.getRequest();
        return request;
    }

    /**
     * 获取当前请求
     *
     * @return {@link HttpServletRequest}
     */
    private HttpServletResponse getCurrentResponse() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) requestAttributes;
        HttpServletResponse response = servletRequestAttributes.getResponse();
        return response;
    }
```

获取当前方法：

```java
    /**
     * 获取当前方法
     *
     * @param point 点
     * @return {@link Method}
     * @throws NoSuchMethodException 没有这个方法，需要抛出的异常
     */
    private Method getCurrentMethod(JoinPoint point) throws NoSuchMethodException {
        Signature sig = point.getSignature();
        MethodSignature msig = (MethodSignature) sig;
        Object target = point.getTarget();
        Method currentMethod = target.getClass().getMethod(msig.getName(), msig.getParameterTypes());
        return currentMethod;
    }
```

获取方法参数和值键值对:

```java
    /**
     * 获取方法参数和值键值对
     *
     * @param point 点
     * @return {@link HashMap}<{@link String}, {@link Object}>
     */
    private Map<String, Object> getParamMap(JoinPoint point) {
        Signature sig = point.getSignature();
        MethodSignature msig = (MethodSignature) sig;

        Object[] args = point.getArgs();
        String[] parameterNames = msig.getParameterNames();
        HashMap<String, Object> paramMap = new HashMap();
        for (int i = 0; i < parameterNames.length; i++) {
            paramMap.put(parameterNames[i], args[i]);
        }
        return paramMap;
    }
```

获取真实ip地址：参考文章：<a href='https://blog.csdn.net/xiongyouqiang/article/details/85711083'>点击跳转</a>

```java
/**
 * ip工具类
 *
 * @author laizhuocheng
 * @date 2022/12/15
 */
public class IPUtils {

    private static Logger logger = LoggerFactory.getLogger(IPUtils.class);

    /**
     * 获取IP地址
     * 使用Nginx等反向代理软件， 则不能通过request.getRemoteAddr()获取IP地址
     * 如果使用了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP地址，X-Forwarded-For中第一个非unknown的有效IP字符串，则为真实IP地址
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = null;
        try {
            ip = request.getHeader("x-forwarded-for");
            if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getHeader("Proxy-Client-IP");
            }
            if (StringUtils.isEmpty(ip) || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getHeader("WL-Proxy-Client-IP");
            }
            if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getHeader("HTTP_CLIENT_IP");
            }
            if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getHeader("HTTP_X_FORWARDED_FOR");
            }
            if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getRemoteAddr();
            }
        } catch (Exception e) {
            logger.error("IPUtils ERROR ", e);
        }
        // 使用代理，则获取第一个IP地址
        if (StringUtils.isEmpty(ip) && ip.length() > 15) {
            if (ip.indexOf(",") > 0) {
                ip = ip.substring(0, ip.indexOf(","));
            }
        }
        return ip;
    }
}
```

完整切面类代码：

```java
/**
 * 日志切面
 *
 * @author laizhuocheng
 * @date 2022/12/14
 */
@Aspect
@Component
@Slf4j
public class LoggerAspect {

    @Autowired
    private GxjLogService gxjLogService;

    /**
     * 切入点 --指定哪些方法需要执行AOP
     *
     * @param businessLog 业务日志注解
     */
    @Pointcut(value = "@annotation(businessLog)")
    public void pointcut(BusinessLog businessLog) {
    }


    @Around(value = "pointcut(businessLog)")
    public Object doAround(ProceedingJoinPoint joinPoint, BusinessLog businessLog) throws Throwable {
        //先执行业务
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();
        try {
            // 日志收集
            handle(joinPoint, result, null,end-start);
        } catch (Exception e) {
            log.error("日志记录出错!", e);
        }
        return result;
    }


    @AfterThrowing(value = "pointcut(businessLog)", throwing = "ex")
    public Object doThrowing(JoinPoint joinPoint, BusinessLog businessLog, Throwable ex) throws Throwable {
        try {
            // 日志收集
            this.handle(joinPoint, null, ex,null);
        } catch (Exception e) {
            log.error("日志记录出错!", e);
        }
        return null;
    }

    private void handle(JoinPoint point, Object result, Throwable ex,Long time) throws Exception {

        // 获取当前请求
        HttpServletRequest request = this.getCurrentRequest();
        // 获取当前响应
        HttpServletResponse response = this.getCurrentResponse();

        // 获取注解所在的方法
        Method currentMethod = this.getCurrentMethod(point);

        //获取注解方法上对应的swagger注解的参数-操作名称
        ApiOperation annotation = currentMethod.getAnnotation(ApiOperation.class);
        String behavior = annotation.value();
        
        // ip
        String ip = IPUtils.getIpAddr(request);

        // 获取参数和参数值 封装到map
        Map<String, Object> paramMap = this.getParamMap(point);

        // 当前用户
        ClientCorp user = UserThreadLocalContext.getUser();

        // 日志对象
        GxjLog gxjLog = new GxjLog().setId(UUID.randomUUID().toString())
                .setCreateBy(user.getCorpGUID())
                .setCreateTime(DateUtil.toLocalDateTime(new Date()))
                .setBehavior(behavior)
                .setIpAddress(ip)
                .setInParameter(paramMap.toString()).setUserAgent(request.getHeaders("User-Agent").nextElement())
                .setCreateByName(user.getCorpName())
                .setRequestPath(request.getRequestURL().toString())
                .setMethodName(currentMethod.getName())
                .setRequestType(request.getMethod())
                .setDuration(String.valueOf(time))
                .setDescription("方法所在类名:" + currentMethod.getDeclaringClass().getName());
                ;
        if (null != request && null == ex) {
            gxjLog.setOutParameter("HTTP状态码：" + response.getStatus() +"，业务状态码：200"+ "，响应体：" + new ObjectMapper().writeValueAsString(result));
        } else {
            if (ex instanceof BusinessException){
                BusinessException exception = (BusinessException) ex;
                gxjLog.setOutParameter("HTTP状态码：" + response.getStatus()+"，业务状态码："+exception.getCode()+"，报错信息：" + ex.getMessage());
            }else {
                gxjLog.setOutParameter("HTTP状态码：" + response.getStatus()+"，报错信息：" + ex.getMessage());
            }
            // 报错堆栈信息
            StackTraceElement[] stackArray = ex.getStackTrace();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < stackArray.length; i++) {
                StackTraceElement element = stackArray[i];
                sb.append(element.toString() + "\n");
            }
               gxjLog.setDescription("报错堆栈信息:"+sb.toString());
        }
        gxjLogService.save(gxjLog);
    }


    /**
     * 获取方法参数和值键值对
     *
     * @param point 点
     * @return {@link HashMap}<{@link String}, {@link Object}>
     */
    private Map<String, Object> getParamMap(JoinPoint point) {
        Signature sig = point.getSignature();
        MethodSignature msig = (MethodSignature) sig;

        Object[] args = point.getArgs();
        String[] parameterNames = msig.getParameterNames();
        HashMap<String, Object> paramMap = new HashMap();
        for (int i = 0; i < parameterNames.length; i++) {
            paramMap.put(parameterNames[i], args[i]);
        }
        return paramMap;
    }


    /**
     * 获取当前请求
     *
     * @return {@link HttpServletRequest}
     */
    private HttpServletRequest getCurrentRequest() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) requestAttributes;
        HttpServletRequest request = servletRequestAttributes.getRequest();
        return request;
    }

    /**
     * 获取当前请求
     *
     * @return {@link HttpServletRequest}
     */
    private HttpServletResponse getCurrentResponse() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) requestAttributes;
        HttpServletResponse response = servletRequestAttributes.getResponse();
        return response;
    }

    /**
     * 获取当前方法
     *
     * @param point 点
     * @return {@link Method}
     * @throws NoSuchMethodException 没有这个方法，需要抛出的异常
     */
    private Method getCurrentMethod(JoinPoint point) throws NoSuchMethodException {
        Signature sig = point.getSignature();
        MethodSignature msig = (MethodSignature) sig;
        Object target = point.getTarget();
        Method currentMethod = target.getClass().getMethod(msig.getName(), msig.getParameterTypes());
        return currentMethod;
    }
}

```

使用，在接口加上注解：

![image-20221215115251267](http://www.iocaop.com/images/2022-12/image-20221215115251267.png)

启动后调用接口，效果：

![image-20221215115645862](http://www.iocaop.com/images/2022-12/image-20221215115645862.png)

为了方便，把注解改成的加在类上：

```java
@Target(ElementType.TYPE)
```

切面中的切入点也许要改：

```java
    @Pointcut(value = "@within(businessLog)")
```

这样，把日志注解加载controller类上就可以记录所有日志，不需要每个方法都加注解。

测试过后，可以用，但是数据库字段需要更改成text类型，防止过长，保存不下来。

![image-20221215151423060](http://www.iocaop.com/images/2022-12/image-20221215151423060.png)

跑一个流程，记录日志效果：

![image-20221215152026018](http://www.iocaop.com/images/2022-12/image-20221215152026018.png)
