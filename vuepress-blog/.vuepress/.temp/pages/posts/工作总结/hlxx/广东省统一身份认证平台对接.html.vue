<template><div><p>对接首先需要有申请好秘钥，也就是clientId和clientSecret，设置好登录成功跳转的地址。其他平台也是类似的方案，Oauth2.0。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">sso</span><span class="token punctuation">:</span>
  <span class="token comment"># 用于用户登录成功后重定向</span>
  <span class="token key atrule">vue-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>9200/corp/sso
  <span class="token comment"># vue-url: http://localhost:9200/corp/#/sso/</span>
  <span class="token comment"># 申请到的id</span>
  <span class="token key atrule">client-id</span><span class="token punctuation">:</span> xxx
  <span class="token comment"># 申请到的秘钥</span>
  <span class="token key atrule">client-secret</span><span class="token punctuation">:</span> xxx
  <span class="token comment"># 对接平台的baseUrl</span>
  <span class="token key atrule">tyrz-url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//tyrztest.gd.gov.cn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们先要在前端页面，跳转到统一身份认证平台，进行认证，再认证成功后跳转回我们的前端地址。步骤如下：</p>
<ul>
<li>
<p>检查用户是否已登录我们的系统(检查cookie或localSessionStorage)</p>
</li>
<li>
<p>用户未登录则进行跳转，跳转到：</p>
<div class="language-tex ext-tex line-numbers-mode"><pre v-pre class="language-tex"><code>https://tyrztest.gd.gov.cn/tif/sso/connect/page/oauth2/authorize?service=initService<span class="token punctuation">&amp;</span>response_type=code<span class="token punctuation">&amp;</span>client_id=申请的id<span class="token punctuation">&amp;</span>scope=all<span class="token punctuation">&amp;</span>redirect_uri=http<span class="token comment">%3A%2F%2Flocalhost%3A9200%2Fcorp%2Fsso</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是，这里的redirect_url是配置好的，如果url不对是会报错的。并且要进行encodeURL</p>
</li>
<li>
<p>登录成功后，会进行跳转，并且会携带一个参数，code</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211121541447.png" alt="image-20221112154158391"></p>
</li>
<li>
<p>跳转到我们的前端页面后，我们需要把这个code传给我们的后端服务器由服务器再次发送请求到平台获取token，前端向后端发请求时可以携带上自己的业务参数。</p>
</li>
<li>
<p>请求到达服务器，服务器使用http工具，向平台发送请求：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211121547230.png" alt="image-20221112154728174"></p>
</li>
<li>
<p>获取到token以后，用这个token，调用平台接口获取用户基本信息，进行判断来校验用户是否可用</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211121548794.png" alt="image-20221112154832724"></p>
</li>
<li>
<p>可用则将用户信息存到我们自己的系统，生成本系统的token返回给前端，保存到cookie</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211121549318.png" alt="image-20221112154912232"></p>
</li>
</ul>
<p>工具类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * sso工具
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/21
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SsoUtil</span> <span class="token punctuation">{</span>


    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ObjectMapper</span> <span class="token constant">OBJECTMAPPER</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ApplicationProperties</span> applicationProperties<span class="token punctuation">;</span>



    <span class="token doc-comment comment">/**
     * 获取省厅令牌
     *
     * <span class="token keyword">@param</span> <span class="token parameter">code</span> 代码
     * <span class="token keyword">@param</span> <span class="token parameter">path</span> 跳转路径
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ProvinceTokenDto</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">ProvinceTokenDto</span> <span class="token function">getProvinceToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> code<span class="token punctuation">,</span> <span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 跳转地址encode</span>
        path <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token operator">==</span> path <span class="token operator">?</span> <span class="token string">""</span> <span class="token operator">:</span> path<span class="token punctuation">;</span>
        <span class="token class-name">String</span> redirectUri <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redirectUri <span class="token operator">=</span>  <span class="token class-name">URLEncoder</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>applicationProperties<span class="token punctuation">.</span><span class="token function">getSso</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSsoVueUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span> <span class="token string">"?type="</span> <span class="token operator">+</span> path <span class="token operator">+</span> <span class="token string">"&amp;ywlx="</span> <span class="token operator">+</span> <span class="token string">"path"</span><span class="token punctuation">,</span> <span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UnsupportedEncodingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">CAN_NOT_GET_JUMP_ADDRESS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 调用接口地址拼接</span>
        <span class="token class-name">String</span> serviceUrl <span class="token operator">=</span> applicationProperties<span class="token punctuation">.</span><span class="token function">getSso</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTyrzUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token operator">+</span> <span class="token string">"/tif/sso/connect/page/oauth2/access_token?client_id="</span>
                <span class="token operator">+</span> applicationProperties<span class="token punctuation">.</span><span class="token function">getSso</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClientId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span> <span class="token string">"&amp;code="</span> <span class="token operator">+</span> code <span class="token operator">+</span> <span class="token string">"&amp;scope=all&amp;client_secret="</span>
                <span class="token operator">+</span> applicationProperties<span class="token punctuation">.</span><span class="token function">getSso</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClientSecret</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token operator">+</span> <span class="token string">"&amp;grant_type=authorization_code&amp;redirect_uri="</span>
                <span class="token operator">+</span> redirectUri<span class="token punctuation">;</span>
        <span class="token comment">// 发起GET请求</span>
        <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token class-name">HttpUtil</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>serviceUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"登录返回信息：{}"</span><span class="token punctuation">,</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ProvinceTokenDto</span> provinceTokenDto <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            provinceTokenDto <span class="token operator">=</span> <span class="token constant">OBJECTMAPPER</span><span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">ProvinceTokenDto</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JsonProcessingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">AUTHENTICATION_FAILURE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>provinceTokenDto<span class="token punctuation">.</span><span class="token function">getAccessToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">AUTHENTICATION_FAILURE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> provinceTokenDto<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token class-name">ProvinceUserResultDto</span> <span class="token function">getProvinceUserDto</span><span class="token punctuation">(</span><span class="token class-name">String</span> accessToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>accessToken<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">NOT_FIND_PROVINCE_ACCESS_TOKEN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 调用接口地址拼接</span>
        <span class="token class-name">String</span> userInfoUrl <span class="token operator">=</span> applicationProperties<span class="token punctuation">.</span><span class="token function">getSso</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTyrzUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"/tif/sso/connect/page/oauth2/tokeninfo?access_token="</span> <span class="token operator">+</span> accessToken<span class="token punctuation">;</span>
        <span class="token comment">// 发起GET请求</span>
        <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token class-name">HttpUtil</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>userInfoUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ProvinceUserResultDto</span> provinceUserResultDto <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            provinceUserResultDto <span class="token operator">=</span> <span class="token constant">OBJECTMAPPER</span><span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">ProvinceUserResultDto</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JsonProcessingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 处理额外属性 转为java对象</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> extProperties <span class="token operator">=</span> provinceUserResultDto<span class="token punctuation">.</span><span class="token function">getUserObj</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getExtProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> extProperties<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>s <span class="token operator">-></span> s<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"="</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span>s <span class="token operator">-></span> s<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> s <span class="token operator">-></span> s<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ProvinceUserExtDataDto</span> provinceUserExtDataDto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProvinceUserExtDataDto</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
        provinceUserResultDto<span class="token punctuation">.</span><span class="token function">getUserObj</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setProvinceUserExtDataDto</span><span class="token punctuation">(</span>provinceUserExtDataDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
        provinceUserResultDto<span class="token punctuation">.</span><span class="token function">getUserObj</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setExtProperties</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> provinceUserResultDto<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">BasLoginVo</span> <span class="token function">clientSsoLogin</span><span class="token punctuation">(</span><span class="token class-name">String</span> code<span class="token punctuation">,</span> <span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 登录-》通过身份证查询，优先查询已入库的记录(始终保持只有一条已入库的，且id不能变)，有已入库的则直接用已入库的id生成token</span>
        <span class="token comment">// 没有已入库的，则拿未入库的生成token(始终保持只有一条未入库的)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">OBTAIN_PROVINCE_PARAMETER_FAILURE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 通过授权码获取省厅访问令牌</span>
        <span class="token class-name">ProvinceTokenDto</span> provinceTokenDto <span class="token operator">=</span> ssoUtil<span class="token punctuation">.</span><span class="token function">getProvinceToken</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> path<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 通过令牌获取用户信息</span>
        <span class="token class-name">ProvinceUserResultDto</span> provinceUserResultDto <span class="token operator">=</span> ssoUtil<span class="token punctuation">.</span><span class="token function">getProvinceUserDto</span><span class="token punctuation">(</span>provinceTokenDto<span class="token punctuation">.</span><span class="token function">getAccessToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ProvinceUserDataDto</span> userObj <span class="token operator">=</span> provinceUserResultDto<span class="token punctuation">.</span><span class="token function">getUserObj</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> creditableLevelOfAccount <span class="token operator">=</span> userObj<span class="token punctuation">.</span><span class="token function">getCreditableLevelOfAccount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> userType <span class="token operator">=</span> userObj<span class="token punctuation">.</span><span class="token function">getUserType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> idCardType <span class="token operator">=</span> userObj<span class="token punctuation">.</span><span class="token function">getIdCardType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> idCardNumber <span class="token operator">=</span> userObj<span class="token punctuation">.</span><span class="token function">getIdCardNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> real <span class="token operator">=</span> userObj<span class="token punctuation">.</span><span class="token function">isReal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// TODO 移动端可能会用到以下校验，可以封装工具类 暂时先这样写</span>

        <span class="token comment">// 校验身份信息</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>userType<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>idCardType<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>idCardNumber<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">ID_INFORMATION_IS_NOT_COMPLETE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 个人用户、已实名认证、用户等级为L2才行，否则不让使用</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">ProvinceUserLevelEnum</span><span class="token punctuation">.</span><span class="token constant">USER_LEVEL_L2</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>creditableLevelOfAccount<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">PARAMETERS_ERROR</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">ProvinceUserTypeEnum</span><span class="token punctuation">.</span><span class="token constant">USER_TYPE_INDIVIDUAL_USER</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>userType<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">LEGAL_USERS_CANT_USE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>real<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">NOT_REAL_NAME_AUTHENTICATION</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 校验专家是否已经注册 已注册返回token，未注册返回信息，提示需要同意注册保留信息致本系统</span>

        <span class="token keyword">boolean</span> registerStatus <span class="token operator">=</span> bizExpertService<span class="token punctuation">.</span><span class="token function">getExpertRegisterStatus</span><span class="token punctuation">(</span>idCardNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BasLoginVo</span> basLoginVo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasLoginVo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        basLoginVo<span class="token punctuation">.</span><span class="token function">setRegisterStatus</span><span class="token punctuation">(</span>registerStatus<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>registerStatus<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 已注册，则返回已入库信息，如还未入库，则返回未入库的信息</span>
            <span class="token class-name">BizExpert</span> bizExpert<span class="token operator">=</span>bizExpertService<span class="token punctuation">.</span><span class="token function">getValidExpert</span><span class="token punctuation">(</span>idCardNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">==</span>bizExpert<span class="token punctuation">)</span><span class="token punctuation">{</span>
                bizExpert <span class="token operator">=</span> bizExpertService<span class="token punctuation">.</span><span class="token function">getNotInStoreExpertByIdCardNumber</span><span class="token punctuation">(</span>idCardNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token class-name">String</span> id <span class="token operator">=</span> bizExpert<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> token <span class="token operator">=</span> jwtUtil<span class="token punctuation">.</span><span class="token function">createToken</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
                basLoginVo<span class="token punctuation">.</span><span class="token function">setAccessToken</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">BusinessExceptionEnum</span><span class="token punctuation">.</span><span class="token constant">CANT_CREATE_TOKEN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
<span class="token comment">//        else {</span>
<span class="token comment">//            basLoginVo.setProvinceUserResultDto(provinceUserResultDto);</span>
<span class="token comment">//        }</span>
        basLoginVo<span class="token punctuation">.</span><span class="token function">setProvinceUserResultDto</span><span class="token punctuation">(</span>provinceUserResultDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
        basLoginVo<span class="token punctuation">.</span><span class="token function">setExpertName</span><span class="token punctuation">(</span>provinceUserResultDto<span class="token punctuation">.</span><span class="token function">getUserObj</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> basLoginVo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传输对象：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 省厅返回的用户信息-返回结果最外层对象
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/21
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProvinceUserResultDto</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">6790808153472792218L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 签名
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"signdata"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> signData<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户信息
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"userobj"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">ProvinceUserDataDto</span> userObj<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * pareObj
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"pareobj"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">ProvinceUserDataDto</span> pareObj<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户等级信息
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"user_creditable_level"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">ProvinceUserCreditableLevelDto</span> userCreditableLevel<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 省用户数据dto
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/21
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProvinceUserDataDto</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">6169661489111021236L</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 用户id
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"uid"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 核验方 如YSS 粤省事
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"realtype"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> realType<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 名字
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"cn"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 令牌标识
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"tokenid"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> tokenId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户类型
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"usertype"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userType<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 实名状态
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"isreal"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> isReal<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 电话号码
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"telephonenumber"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> phoneNumber<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 邮件
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"mail"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mail<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 身份证类型
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"idcardtype"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> idCardType<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建时间
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"createtime"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> createTime<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * ext属性
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"extproperties"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> extProperties<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 省用户ext数据
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">ProvinceUserExtDataDto</span> provinceUserExtDataDto<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 身份证号码
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"idcardnumber"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> idCardNumber<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户id代码
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"useridcode"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userIdCode<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 身份验证代码行
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"authloc"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authLoc<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 信誉级别账户
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"creditable_level_of_account_way"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> creditableLevelOfAccountWay<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 信誉级别账户
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"creditable_level_of_account"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> creditableLevelOfAccount<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * flag
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"anon_flag"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> anonFlag<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 联系人名字
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"link_person_name"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> linkPersonName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 省用户可信dto
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/22
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProvinceUserCreditableLevelDto</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 账户可信级别以及核验方式字符串
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"creditable_level_of_account_way"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> creditableLevelOfAccountWay<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 账户当前最高的可信等级
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"creditable_level_of_account"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> creditableLevelOfAccount<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 账户可信等级的核验方式明细
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"creditable_level_of_account_way_list"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ProvinceCreditableLevelOfAccountWayListDto</span><span class="token punctuation">></span></span> creditableLevelOfAccountWayList<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 诚信信息
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/22
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProvinceCreditableLevelOfAccountWayListDto</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 认证时间
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"auth_time"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authTime<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户名
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"user_name"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userName<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 认证标识
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"auth_identification"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authIdentification<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 身份级别
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"identity_level"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> identityLevel<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 证书号
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"credential_no"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> credentialNo<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 方法代码
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"way_code"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> wayCode<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 惟一id
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"uniqueid"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> uniqueId<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 省厅认证获取令牌返回对象
 *
 * <span class="token keyword">@author</span> 赖卓成
 * <span class="token keyword">@date</span> 2023/02/21
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProvinceTokenDto</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">8083867889121871276L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 有效期
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"expires_in"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> expiresIn<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 令牌类型
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"token_type"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> tokenType<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 访问令牌
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"access_token"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> accessToken<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 刷新令牌
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"refresh_token"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> refreshToken<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 范围
     */</span>
    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">"scope"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> scope<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


