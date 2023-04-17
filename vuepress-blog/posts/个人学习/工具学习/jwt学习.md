---
title: jwt学习
date: 2022-11-09
category:
  - 单点登录
---

参考文档：<a href = 'https://baobao555.tech/archives/40'>点击跳转</a>

密码学：对称加密(同一把钥匙)、非对称加密(一对钥匙)。jwt都支持

jwt的三部分：头、载荷、签名

## 对称加密

依赖：

```xml
        <dependency>
            <groupId>com.auth0</groupId>
            <artifactId>java-jwt</artifactId>
            <version>4.2.1</version>
        </dependency>
```

测试：

```java
/**
 * jwt工具自己学习用，开发使用hutool即可
 *
 * @author lzc
 * @date 2022/11/09
 */
public class JwtTest {
    public static void main(String[] args) {
        // 指定token过期时间为10秒
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.SECOND, 10);

        // 加密
        String token = JWT.create()
                // 头
                .withHeader(new HashMap<>())
                // 载荷
                .withClaim("user", "123")
                // 过期时间
                .withExpiresAt(calendar.getTime())
                .sign(Algorithm.HMAC256("lzc911823"));
        System.out.println("原包导入，加密"+token);

        // 解密
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256("lzc911823")).build();
        DecodedJWT verify = jwtVerifier.verify(token);
        Claim user = verify.getClaim("user");
        System.out.println("原包导入，解密user:"+user.asString());

        HashMap<String, Object> map = new HashMap<>();
        map.put("user123","123");
        String hutoolToken = JWTUtil.createToken(map, "1234".getBytes());
        System.out.println("hutool加密："+hutoolToken);
        cn.hutool.jwt.JWT jwt = JWTUtil.parseToken(hutoolToken);
        String user123 = (String) jwt.getPayload("user123");
        System.out.println("hutool解密："+user123);

        // jwt验证
        boolean v = JWTUtil.verify(hutoolToken, "1234".getBytes());
        System.out.println("jwt验证："+v);
    }
}

```

![image-20221110000441110](http://www.iocaop.com/images/2022-11/202211100004180.png)

需要注意的是上面用的是默认hs256算法加密签名，可以调用重载的方法，设置其他的。

![image-20221110001004579](http://www.iocaop.com/images/2022-11/202211100010634.png)

![image-20221110001049207](http://www.iocaop.com/images/2022-11/202211100010252.png)

## jwt和jjwt

学习时，结合之前做过的jwt工具，发现有两种不同的包，分别是：

```xml
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt</artifactId>
  <version>0.7.0</version>
</dependency>

<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>java-jwt</artifactId>
  <version>3.10.3</version>
</dependency>
```

在创建jwt时，参数有些不同：

jjwt为：

```java
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
```

可以看到这里的签名是key+算法，而可以是调用Keys的静态方法生成的，每次启动都会生成不同的key：

```java
    /**
     * 用于访问令牌签名
     */
    public static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
```

但是这个方法进行了多次重载：

![image-20230106215159692](http://www.iocaop.com/images/2023-01/202301062151830.png)

可以传入算法+自定义字符串做base64加密，需要注意的是自定义的字符串长度需要满足算法要求的长度。并且该方法被标记为已弃用。

在java-jwt中，是这样创建token的：

```java
        String token = JWT.create()
                .withNotBefore(new Date())
                .withExpiresAt(calendar.getTime())
                .withClaim(CLAIM_JSON, json)
                .sign(Algorithm.HMAC256(SIGNATURE));
```

其中设置签名是sign方法，没有任何重载：

![image-20230106215420171](http://www.iocaop.com/images/2023-01/202301062154223.png)

参数则是Algorithm类型，调用静态方法得到的：

![image-20230106215450091](http://www.iocaop.com/images/2023-01/202301062154132.png)

如果想要这两种jwt生成的token进行互相解析，可以参考：<a href = 'https://blog.devmgr.cn/2020/07/05/jjwt-%E4%B8%8E-java-jwt-%E7%94%9F%E6%88%90%E7%9A%84jwt%E6%A0%BC%E5%BC%8Ftoken%E4%BA%92%E7%9B%B8%E8%A7%A3%E6%9E%90/'>点击跳转</a>

下面是两个工具类的部分代码：

jjwt：

```java
@Component
@RequiredArgsConstructor
@Slf4j
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
        log.info("访问令牌key:{}",key.getEncoded());
        return this.createJwtToken(userDetails,applicationProperties.getJwt().getAccessTokenExpireTime(),key);
    }

    /**
     * 创建刷新令牌
     *
     * @param userDetails 用户信息
     * @return {@link String}
     */
    public String createRefreshToken(UserDetails userDetails){
        log.info("刷新令牌key:{}",refreshKey.getEncoded());
        return this.createJwtToken(userDetails,applicationProperties.getJwt().getRefreshTokenExpireTime(),refreshKey);
    }

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

    /**
     * 通过刷新令牌的载荷创建访问令牌
     *
     * @param token 令牌
     * @return {@link String}
     */
    public String createAccessTokenWithRefreshToken(String token){
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
}
```

jjwt可以设置签名时使用：

```java
.setSigningKey(Keys.hmacShaKeyFor(applicationProperties.getJwt().getSignature().getBytes()))
```

```java
/**
 * jwt方法封装
 *
 * @author laizhuocheng
 * @date 2022/11/10
 */
@Component
public class JwtUtil {

    /**
     * 载荷 存储登录信息序列化的json
     */
    private static final String CLAIM_JSON = "json";

    /**
     * 应用程序属性
     */
    @Resource
    private ApplicationProperties applicationProperties;

    /**
     * 创建令牌
     *
     * @param o 任意对象
     * @return {@link String}
     * @throws Exception 异常
     */
    public String createToken(Object o) throws Exception {
        String json = new Gson().toJson(o);
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.SECOND, applicationProperties.getJwt().getAccessTokenExpireTime());

        Map<String, Object> claims = new HashMap<>();
        claims.put("json", json);

        return Jwts.builder().setSubject("hlxx")
                .setIssuedAt(new Date())
                .setClaims(claims)
                .setExpiration(calendar.getTime())
                .signWith(Keys.hmacShaKeyFor(applicationProperties.getJwt().getSignature().getBytes()))
                .compact();
    }

    /**
     * 解析令牌 返回指定类对象
     *
     * @param token 令牌
     * @param clazz 类对象
     * @return {@link T}
     * @throws Exception 异常
     */
    public <T> T parseToken(String token, Class<T> clazz) throws Exception {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(applicationProperties.getJwt().getSignature().getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
        Date exp = claims.getExpiration();
        Map<String, Object> payload = claims;
        long currentTimeMillis = System.currentTimeMillis();
        if (exp.getTime() > currentTimeMillis) {
            String json = (String) payload.get("json");
            return new Gson().fromJson(json, clazz);
        } else {
            throw new BusinessException(BusinessExceptionEnum.UN_AUTHORIZATION);
        }
    }
}
```





jwt：

```java
public class JwtUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private static final String SIGNATURE = "5DFBBA81-8195-4100-B8C8-FD7EFEFD870D";

    private static final String CLAIM_JSON = "json";

    public static String createToken(Object o, Integer expire) throws Exception {
        String json = objectMapper.writeValueAsString(o);
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.SECOND, expire);

        String token = JWT.create()
                .withNotBefore(new Date())
                .withExpiresAt(calendar.getTime())
                .withClaim(CLAIM_JSON, json)
                .sign(Algorithm.HMAC256(SIGNATURE));
        return token;
    }

    public static<T> T parseToken(String token, Class<T> clazz) throws Exception {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SIGNATURE)).build();
            DecodedJWT jwt = verifier.verify(token);
            long exp = jwt.getExpiresAt().getTime();
            long currentTimeMillis = System.currentTimeMillis();
            if (exp > currentTimeMillis) {
                String json = jwt.getClaim(CLAIM_JSON).asString();
                return objectMapper.readValue(json, clazz);
            }else {
                throw new BusinessException(BusinessExceptionEnum.UN_AUTHORIZATION);
            }
    }
}
```

