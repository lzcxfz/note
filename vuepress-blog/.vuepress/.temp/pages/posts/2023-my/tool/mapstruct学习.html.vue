<template><div><p>依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!-- 引入 mapstruct 依赖 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mapstruct<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mapstruct<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mapstruct.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- 引入 lombok 依赖 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${lombok.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>provided<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插件,需要注意lombok放在mapstruct上面，否则属性不会赋值</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.maven.plugins<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>maven-compiler-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.8.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">></span></span>${java.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>target</span><span class="token punctuation">></span></span>${java.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>target</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>annotationProcessorPaths</span><span class="token punctuation">></span></span>
                        <span class="token comment">&lt;!-- 引入 lombok-processor --></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${lombok.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>

                        <span class="token comment">&lt;!-- 引入 mapstruct-processor --></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mapstruct<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mapstruct-processor<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mapstruct.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>

                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>annotationProcessorPaths</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个model：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Accessors</span><span class="token punctuation">(</span>chain <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 名字
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 地址
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 移动
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mobile<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Accessors</span><span class="token punctuation">(</span>chain <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Role</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 名字
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DTO：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDTO</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 名字
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 地址
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 角色名
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> roleName<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>convert：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserConvert</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 实例
     */</span>
    <span class="token class-name">UserConvert</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">UserConvert</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 为dto
     *
     * <span class="token keyword">@param</span> <span class="token parameter">user</span> 用户
     * <span class="token keyword">@param</span> <span class="token parameter">role</span> 角色
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">UserDTO</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>source <span class="token operator">=</span> <span class="token string">"role.name"</span><span class="token punctuation">,</span> target <span class="token operator">=</span> <span class="token string">"roleName"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>source <span class="token operator">=</span> <span class="token string">"user.name"</span><span class="token punctuation">,</span>target <span class="token operator">=</span> <span class="token string">"username"</span><span class="token punctuation">)</span>
    <span class="token class-name">UserDTO</span> <span class="token function">toDTO</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">,</span> <span class="token class-name">Role</span> role<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"111"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"赖卓成"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span><span class="token string">"深圳"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setMobile</span><span class="token punctuation">(</span><span class="token string">"1245689"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Role</span> role <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Role</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"111"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"管理员"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">UserDTO</span> userDTO <span class="token operator">=</span> <span class="token class-name">UserConvert</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">.</span><span class="token function">toDTO</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span>role<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p>
<p><img src="http://www.iocaop.com/images/2023-01/image-20230103113647539.png" alt="image-20230103113647539"></p>
</div></template>


