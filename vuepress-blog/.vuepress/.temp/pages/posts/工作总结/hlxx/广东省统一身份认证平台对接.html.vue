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
</div></template>


