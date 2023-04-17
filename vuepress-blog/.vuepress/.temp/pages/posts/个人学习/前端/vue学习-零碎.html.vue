<template><div><h3 id="_1-项目构建" tabindex="-1"><a class="header-anchor" href="#_1-项目构建" aria-hidden="true">#</a> 1-项目构建</h3>
<p>npm修改镜像源：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npmmirror.com/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装vue-cli:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--global</span> vue-cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建项目：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue create demo01
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装饿了么：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i element-ui <span class="token parameter variable">-S</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>main.js完整引入：</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装axios</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> axios vue-axios <span class="token parameter variable">-g</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-带输入建议的输入框学习" tabindex="-1"><a class="header-anchor" href="#_2-带输入建议的输入框学习" aria-hidden="true">#</a> 2-带输入建议的输入框学习</h3>
<p>拷贝html:</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-col</span> <span class="token attr-name">:span</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>12<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sub-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>输入后匹配输入建议<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-autocomplete</span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inline-input<span class="token punctuation">"</span></span>
          <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>state2<span class="token punctuation">"</span></span>
          <span class="token attr-name">:fetch-suggestions</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>querySearch<span class="token punctuation">"</span></span>
          <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入内容<span class="token punctuation">"</span></span>
          <span class="token attr-name">:trigger-on-focus</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span>
          <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleSelect<span class="token punctuation">"</span></span>
          <span class="token attr-name">@input</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>loadAll<span class="token punctuation">"</span></span>
      <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-autocomplete</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-col</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>双向绑定state2：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">restaurants</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">state1</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token literal-property property">state2</span><span class="token operator">:</span> <span class="token string">''</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拉取输入建议的方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>    <span class="token function">loadAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"http://localhost:8081/student?name="</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>state2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>restaurants <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>restaurants<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>

      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>匹配输入建议的方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>    <span class="token function">querySearch</span><span class="token punctuation">(</span><span class="token parameter">queryString<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> restaurants <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>restaurants<span class="token punctuation">;</span>
      <span class="token keyword">let</span> results <span class="token operator">=</span> queryString <span class="token operator">?</span> restaurants<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createFilter</span><span class="token punctuation">(</span>queryString<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> restaurants<span class="token punctuation">;</span>
      <span class="token comment">// 调用 callback 返回建议列表的数据</span>
      <span class="token function">cb</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">createFilter</span><span class="token punctuation">(</span><span class="token parameter">queryString</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">restaurant</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// console.log(restaurant.name.toLowerCase())</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>queryString<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>restaurant<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>queryString<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!==</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户选择后执行的方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>    <span class="token function">handleSelect</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总体：</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-row</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>demo-autocomplete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-col</span> <span class="token attr-name">:span</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>12<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sub-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>输入后匹配输入建议<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-autocomplete</span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inline-input<span class="token punctuation">"</span></span>
          <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>state2<span class="token punctuation">"</span></span>
          <span class="token attr-name">:fetch-suggestions</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>querySearch<span class="token punctuation">"</span></span>
          <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入内容<span class="token punctuation">"</span></span>
          <span class="token attr-name">:trigger-on-focus</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span>
          <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleSelect<span class="token punctuation">"</span></span>
          <span class="token attr-name">@input</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>loadAll<span class="token punctuation">"</span></span>
      <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-autocomplete</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-col</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-row</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">restaurants</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">state1</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token literal-property property">state2</span><span class="token operator">:</span> <span class="token string">''</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">querySearch</span><span class="token punctuation">(</span><span class="token parameter">queryString<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> restaurants <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>restaurants<span class="token punctuation">;</span>
      <span class="token keyword">let</span> results <span class="token operator">=</span> queryString <span class="token operator">?</span> restaurants<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createFilter</span><span class="token punctuation">(</span>queryString<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> restaurants<span class="token punctuation">;</span>
      <span class="token comment">// 调用 callback 返回建议列表的数据</span>
      <span class="token function">cb</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">createFilter</span><span class="token punctuation">(</span><span class="token parameter">queryString</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">restaurant</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// console.log(restaurant.name.toLowerCase())</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>queryString<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>restaurant<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>queryString<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!==</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">loadAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"http://localhost:8081/student?name="</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>state2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>restaurants <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>restaurants<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>

      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">handleSelect</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">h3</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 40px 0 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">ul</span> <span class="token punctuation">{</span>
  <span class="token property">list-style-type</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">li</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">a</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #42b983<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211032331333.png" alt="image-20221103233127254"></p>
<h3 id="_3-路由安装和使用" tabindex="-1"><a class="header-anchor" href="#_3-路由安装和使用" aria-hidden="true">#</a> 3-路由安装和使用</h3>
<p>安装命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> vue-router <span class="token parameter variable">--save</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>报错，根据提示加参数：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211242105861.png" alt="image-20221124210544761"></p>
<p>安装好后，在src下创建文件夹router，再创建index.js，在js里面配置路由:</p>
<p>配置好两个页面，一个是之前做的带输入建议的输入框，一个是登录页面，刚建的还没写内容。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">'vue-router'</span>
<span class="token keyword">import</span> LoginForm <span class="token keyword">from</span> <span class="token string">'@/view/LoginForm'</span>
<span class="token keyword">import</span> InputSelect <span class="token keyword">from</span> <span class="token string">"@/components/InputSelect"</span><span class="token punctuation">;</span>

Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'history'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">"/"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">"/LoginForm"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"LoginForm"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> LoginForm
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">"/InputSelect"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"InputSelect"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> InputSelect
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> router

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在App.vue添加路由视图</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--    &lt;InputSelect msg="Welcome to Your Vue.js App"/>--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在main.js导入路由并使用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">"./router"</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">,</span>
  router
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动，没效果的话，检查版本:</p>
<p>package.json：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"axios"</span><span class="token operator">:</span> <span class="token string">"^1.1.3"</span><span class="token punctuation">,</span>
    <span class="token property">"core-js"</span><span class="token operator">:</span> <span class="token string">"^3.8.3"</span><span class="token punctuation">,</span>
    <span class="token property">"element-ui"</span><span class="token operator">:</span> <span class="token string">"^2.15.10"</span><span class="token punctuation">,</span>
    <span class="token property">"vue"</span><span class="token operator">:</span> <span class="token string">"^2.6.14"</span><span class="token punctuation">,</span>
    <span class="token property">"vue-router"</span><span class="token operator">:</span> <span class="token string">"^3.5.3"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动，访问：</p>
<p><img src="http://www.iocaop.com/images/2022-11/202211242210236.png" alt="image-20221124221001182"></p>
<h3 id="_4-component标签实现动态加载组件学习" tabindex="-1"><a class="header-anchor" href="#_4-component标签实现动态加载组件学习" aria-hidden="true">#</a> 4-component标签实现动态加载组件学习</h3>
<p>工作需要，根据不同的业务场景，渲染不同的表单给用户进行填写。</p>
</div></template>


