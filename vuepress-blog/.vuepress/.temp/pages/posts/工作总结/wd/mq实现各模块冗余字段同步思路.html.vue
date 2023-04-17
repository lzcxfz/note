<template><div><h5 id="我的思路" tabindex="-1"><a class="header-anchor" href="#我的思路" aria-hidden="true">#</a> 我的思路</h5>
<p>项目中很多模块，存在冗余字段，情况很多，枚举了一些情况：</p>
<blockquote>
<p>情况1：用户模块改了数据，需要同步给所有的模块  1-&gt;N
情况2：考试模块改了数据，只需要同步到学习项目和课程模块 N-&gt;N
情况3：学习项目改了数据，只需要同步一下学习项目模块的其他表  1-&gt;1
情况4：多个模块改了数据，需要同步到一个模块，比如学习项目需要同步其他几个模块的数据 N-&gt;1</p>
</blockquote>
<p>想通过mq服务间通信，源字段修改后，服务发消息给各模块(冗余了这个字段的模块)，</p>
<ul>
<li>消息体中携带消费者需要修改的表名、字段名、字段值、修改的条件。</li>
<li>或者消息体中携带(生产者)修改的表名、字段名、字段值、修改的条件。</li>
</ul>
<p>消费者生成sql实现同步(上面二选一)。</p>
<h5 id="mq交换机模式的选择和路由键的设计" tabindex="-1"><a class="header-anchor" href="#mq交换机模式的选择和路由键的设计" aria-hidden="true">#</a> mq交换机模式的选择和路由键的设计：</h5>
<p>​	所有模块共用一个主题模式交换机field_sync_exchange，</p>
<ul>
<li>routingKey设计 : field.sync.#.模块名.#</li>
<li>每个模块一个队列，命名随意，但是需要绑定正确的routingKey</li>
</ul>
<p>架构图：</p>
<p><img src="http://www.iocaop.com/images/2022-08/202208300013280.png" alt="image-20220830001321206"></p>
<p>生产者在发送消息时，只要routingKey为field.sync开头，并且带有模块名，对应的模块就能收到消息，比如：</p>
<p>field.sync.exam就只有考试模块能收到消息，field.sync.exam.survey.project那么考试、调研、学习项目都能收到消息。所以写了一个key拼接工具package com.wunding.learn.common.field.sync.utils.FieldSyncKeyBuilder。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@program</span>: mlearn
 * <span class="token keyword">@description</span>: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>动态创建key<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
 * <span class="token keyword">@author</span>: 赖卓成
 * <span class="token keyword">@create</span>: 2022-08-29 15:32
 **/</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FieldSyncKeyBuilder</span> <span class="token punctuation">{</span>

    <span class="token comment">// private static final Unsafe unsafe = Unsafe.getUnsafe();</span>


    <span class="token comment">// 测试后发现，key拼接工具存在并发问题，想动态创建key又想保证正确性，需要加本地锁，不需要分布式锁。</span>

    <span class="token keyword">private</span> <span class="token class-name">StringBuilder</span> key<span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token class-name">FieldSyncKeyBuilder</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        key <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"field.sync"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">FieldSyncKeyBuilder</span> <span class="token function">toExam</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">".exam"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">FieldSyncKeyBuilder</span> <span class="token function">toSurvey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">".survey"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">FieldSyncKeyBuilder</span> <span class="token function">toLive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">".live"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">FieldSyncKeyBuilder</span> <span class="token function">toCourse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">".course"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">FieldSyncKeyBuilder</span> <span class="token function">toProject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">".project"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"field.sync"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> key<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>需要注意的是，在调用时需加本地锁，保证key的正确性</p>
</blockquote>
<p>如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    key <span class="token operator">=</span> fieldSyncKeyBuilder
                        <span class="token punctuation">.</span><span class="token function">toExam</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toProject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toSurvey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>
                    <span class="token string">"routingKey = "</span> <span class="token operator">+</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发消息时报错，又加上了两个配置类com.wunding.learn.common.field.sync.config.RabbitConsumerConfig和com.wunding.learn.common.field.sync.config.RabbitProducerConfig:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitConsumerConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">MessageConverter</span> <span class="token function">jsonMessageConverter</span><span class="token punctuation">(</span><span class="token class-name">ObjectMapper</span> objectMapper<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Jackson2JsonMessageConverter</span><span class="token punctuation">(</span>objectMapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitProducerConfig</span> <span class="token keyword">implements</span> <span class="token class-name">InitializingBean</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/** * 自动注入RabbitTemplate模板 */</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/** * 发送消息JSON序列化 */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">//使用JSON序列化</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">setMessageConverter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Jackson2JsonMessageConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="目前存在的问题" tabindex="-1"><a class="header-anchor" href="#目前存在的问题" aria-hidden="true">#</a> 目前存在的问题：</h5>
<ul>
<li>反序列化类型不正确:</li>
</ul>
<p><img src="http://www.iocaop.com/images/2022-08/202208300018628.png" alt="image-20220830001846515"></p>
<ul>
<li>dto对象怎么定义？怎么把这个玩意做得通用一点？</li>
</ul>
</div></template>


