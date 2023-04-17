<template><div><h4 id="资源库记录抽取说明" tabindex="-1"><a class="header-anchor" href="#资源库记录抽取说明" aria-hidden="true">#</a> 资源库记录抽取说明</h4>
<ul>
<li>
<p>各模块资源库记录表结构需一致</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">/*==============================================================*/</span>
<span class="token comment">/* Table: library_record                                        */</span>
<span class="token comment">/*==============================================================*/</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> library_record
<span class="token punctuation">(</span>
    id           <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'主键id'</span><span class="token punctuation">,</span>
    name         <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'资源名称(可以多个)'</span><span class="token punctuation">,</span>
    count        <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'数量'</span><span class="token punctuation">,</span>
    handle_type  <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>      <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'操作类型 1入库 2删除 3编辑 4启用 5禁用'</span><span class="token punctuation">,</span>
    is_del       <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>      <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token number">0</span> <span class="token keyword">comment</span> <span class="token string">'逻辑删除 0否 1是'</span><span class="token punctuation">,</span>
    create_by    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'操作人'</span><span class="token punctuation">,</span>
    create_time  <span class="token keyword">datetime</span>    <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'操作时间'</span><span class="token punctuation">,</span>
    library_type <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'库的类型'</span><span class="token punctuation">,</span>
    update_by    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'更新人'</span><span class="token punctuation">,</span>
    update_time  <span class="token keyword">datetime</span> <span class="token keyword">comment</span> <span class="token string">'更新时间'</span><span class="token punctuation">,</span>
    <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">alter</span> <span class="token keyword">table</span> library_record
    <span class="token keyword">comment</span> <span class="token string">'资源库操作记录'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>导入common-base包</p>
</li>
<li>
<p>依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.wunding<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>learn-common-library-record<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>7.0.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在各模块资源库service层注入</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">BaseLibraryRecordService</span> baseLibraryRecordService<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>方法说明</p>
<ul>
<li>
<p>插入</p>
<p>需在各资源库操作中手动获取资源名称集合，数量，手动输入操作类型枚举，手动输入资源库类型，资源库类型在LibraryTypeEnum中增加即可。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 保存操作记录
     *
     * <span class="token keyword">@param</span> <span class="token parameter">name</span>        名字
     * <span class="token keyword">@param</span> <span class="token parameter">handleType</span>  操作类型
     * <span class="token keyword">@param</span> <span class="token parameter">libraryType</span> 库类型
     */</span>
    <span class="token keyword">void</span> <span class="token function">saveOperationRecord</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> name<span class="token punctuation">,</span><span class="token class-name">Integer</span> handleType<span class="token punctuation">,</span> <span class="token class-name">Integer</span> libraryType<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>分页查询,定义rest后直接调用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 查询源库操作记录列表
     *
     * <span class="token keyword">@param</span> <span class="token parameter">libraryRecordListQueryDTO</span> 参数对象
     * <span class="token keyword">@return</span> 源库操作记录列表
     */</span>
    <span class="token class-name">PageInfo</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LibraryRecordListDTO</span><span class="token punctuation">></span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">LibraryRecordListQueryDTO</span> libraryRecordListQueryDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>rest层不抽取，在各模块自行定义。</p>
</li>
</ul>
</div></template>


