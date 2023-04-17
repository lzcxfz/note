<template><div><p>循环栅栏</p>
<p>计数器</p>
<p>信号灯</p>
<h4 id="completablefuture" tabindex="-1"><a class="header-anchor" href="#completablefuture" aria-hidden="true">#</a> CompletableFuture</h4>
<ul>
<li>
<p>runAsync 没有返回值</p>
<ul>
<li>
<p>只传一个参数Runnable实现类对象</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token comment">//没有返回值因为Runnable的run方法没有返回值</span>
 <span class="token comment">//参数值传一个Runnable实现类对象  </span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> runnable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//使用默认的线程池</span>
          <span class="token keyword">return</span> <span class="token function">asyncRunStage</span><span class="token punctuation">(</span>asyncPool<span class="token punctuation">,</span> runnable<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>传入Runnable实现类对象和线程池对象</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> runnable<span class="token punctuation">,</span>
                                               <span class="token class-name">Executor</span> executor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//使用指定线程池</span>
    <span class="token keyword">return</span> <span class="token function">asyncRunStage</span><span class="token punctuation">(</span><span class="token function">screenExecutor</span><span class="token punctuation">(</span>executor<span class="token punctuation">)</span><span class="token punctuation">,</span> runnable<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>supplyAsync 有返回值</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">U</span><span class="token punctuation">></span></span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">U</span><span class="token punctuation">></span></span> <span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">U</span><span class="token punctuation">></span></span> supplier<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">asyncSupplyStage</span><span class="token punctuation">(</span>asyncPool<span class="token punctuation">,</span> supplier<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数类型：Supplier&lt;U&gt; supplier</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//函数式接口</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * Gets a result.
     *
     * <span class="token keyword">@return</span> a result
     */</span>
    <span class="token comment">//只有一个方法，所以可以使用匿名内部类或者lamuda表达式的方式</span>
    <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>使用：</p>
<ul>
<li>
<p>在需要返回值的情况下，使用supplier中的get()方法，不需要返回值的时候使用Runnable中的run()方法。</p>
</li>
<li>
<p>在进行异步编排的时候，任务都是由不同的子线程去执行的，不会相互影响,跟主线程也没有关系。但是在调用get方法的时候，会影响，get()会阻塞调用线程 哪个线程调用get()哪个线程就会被阻塞。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"主线程开始干活"</span><span class="token operator">+</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/**
         * 任务1 异步编排
         */</span>
         <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> future1 <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
             <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"有返回值的任务开始干活"</span><span class="token operator">+</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token keyword">try</span> <span class="token punctuation">{</span>
                 <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                 e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token punctuation">}</span>
             <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/**
         * 任务2   异步编排
         */</span>
        <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> future2 <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"没有返回值的任务开始干活"</span><span class="token operator">+</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//          在进行异步编排的时候，任务都是由不同的子线程去执行的，不会相互影响,跟主线程也没有关系。</span>
<span class="token comment">//          但是在调用get方法的时候，会影响</span>
<span class="token comment">//        get()会阻塞调用线程 哪个线程调用get()哪个线程就会被阻塞</span>
<span class="token comment">//         主线程调用get方法</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"主线程活过来了，有返回值的任务返回值是:"</span><span class="token operator">+</span>future1<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>supply下的三个方法的区别</p>
<p>​	都是来做任务的第二步，执行完就结束了。</p>
<ul>
<li>thenAccept:可以接收任务第一步的返回值，执行第二步，第二步没有返回值。</li>
<li>thenRun:不需要接收第一步的返回值，执行第二步，第二步没有返回值。</li>
<li>thenApply:依赖第一步的返回值，执行第二步，可以对结果进行加工处理，返回加工后的值，并且可以通过future.get()获取到第二步执行完后的返回值。</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         *thenAccept:接收第一步的执行结果作为参数，执行完后没有返回值
         */</span>
         <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> future1 <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"future1的第一步"</span><span class="token operator">+</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"future1的第二步可以拿到future1的返回值"</span><span class="token operator">+</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"future1的第二步"</span><span class="token operator">+</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * thenRun:即不接收上一步的返回值，run方法执行完也没有返回值。只是在上一步完成后，去做一些事情
         */</span>
        <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> future2 <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"future2的第一步"</span><span class="token operator">+</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenRun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"future2的第二步"</span><span class="token operator">+</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * thenApply：可以接收上一步的返回结果，并进行加工
         */</span>
        <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> future3 <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"future3的第一步"</span><span class="token operator">+</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"future3的第二步"</span><span class="token operator">+</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        依赖第一步的返回结果，并对返回结果进行加工</span>
            <span class="token keyword">return</span> res<span class="token operator">+</span><span class="token number">100</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"future3的返回结果为"</span><span class="token operator">+</span>future3<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>加不加Async的区别
<ul>
<li>不加Async：哪个线程调用的，就由哪个线程执行。</li>
<li>不加Async：不能传入线程池对象，谁调用就是谁执行。</li>
<li>加Async一定是由第一步的线程执行,而且这两步一定不会是主线程执行的。</li>
<li>加Async可以传线程池对象，来指定线程池。</li>
</ul>
</li>
</ul>
</li>
<li>
<p>whencomplete方法</p>
<ul>
<li>接收第一步的返回结果和异常。</li>
<li>不能重新返回新的结果</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> future1 <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/**
         * 参数1是第一步执行的结果
         * 参数2是第一步执行出现的异常
         * 当第一步执行可能出现异常、并且不需要对第一步执行的结果进行处理的时候使用。记录一下结果和异常
         */</span>
        future1<span class="token punctuation">.</span><span class="token function">whenComplete</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BiConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Throwable</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> integer<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"任务的执行结果是"</span><span class="token operator">+</span>integer<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"异常是"</span><span class="token operator">+</span>throwable<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>exceptionally</p>
<ul>
<li>不接受第一步的返回结果</li>
<li>接收异常。</li>
<li>可以重新返回新的结果。</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>

        <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> future1 <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        future1<span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Throwable</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>throwable<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token number">10086</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">Integer</span> integer <span class="token operator">=</span> future1<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"最终结果"</span><span class="token operator">+</span>integer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>handle</p>
<ul>
<li>可以接收第一步的返回结果</li>
<li>可以接收异常</li>
<li>可以返回新的结果</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>

        <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> future1 <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
<span class="token comment">//            int i = 1 / 0;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> handle <span class="token operator">=</span> future1<span class="token punctuation">.</span><span class="token function">handle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BiFunction</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Throwable</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> integer<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"可以接收第一步的返回结果:"</span> <span class="token operator">+</span> integer<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"也可以接收第一步的异常"</span> <span class="token operator">+</span> throwable<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//                还可以改变返回的结果</span>
                <span class="token keyword">return</span> <span class="token number">10010</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"future1的最终结果:"</span><span class="token operator">+</span>handle<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>allof</p>
<p>join表示对参数中的任务都执行get()；会阻塞当前线程，等全部任务都执行完，再执行allOf后面的代码。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">allOf</span><span class="token punctuation">(</span>任务<span class="token number">1</span><span class="token punctuation">,</span>任务<span class="token number">2</span>，任务<span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>anyof</p>
<p>会阻塞当前线程，参数中的任意一个任务的线程执行结束，就结束了，参数中的任务的线程也会结束。恢复执行当前线程。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> CompletableFuture.anyOf(任务1,任务2，任务3).join();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="线程池" tabindex="-1"><a class="header-anchor" href="#线程池" aria-hidden="true">#</a> 线程池</h4>
<h5 id="threadpoolexecutor的构造函数" tabindex="-1"><a class="header-anchor" href="#threadpoolexecutor的构造函数" aria-hidden="true">#</a> ThreadPoolExecutor的构造函数:</h5>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span>
    <span class="token comment">//该线程池中的最大核心线程数量</span>
    <span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span>
    <span class="token comment">//该线程池中的最大线程数量(核心线程+非核心线程)</span>
	<span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span>
    <span class="token comment">//该线程池中非核心线程的最大空闲时长(超时会被阻塞)</span>
    <span class="token comment">//线程的空闲存活时间keepAliveTime只会影响非核心线程。</span>
    <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span>
    <span class="token comment">//keepAliveTime的单位</span>
    <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span>
    <span class="token comment">//阻塞队列 维护着等待执行的Runnable对象</span>
    <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span> workQueue<span class="token punctuation">,</span>
    <span class="token comment">//执行器创建新线程时使用的工厂 不写使用默认的</span>
    <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">,</span>
    <span class="token comment">//拒绝策略  不写使用默认的</span>
    <span class="token class-name">RejectedExecutionHandler</span> handler<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不写工厂和拒绝策略会使用默认的：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token keyword">this</span><span class="token punctuation">(</span>corePoolSize<span class="token punctuation">,</span> maximumPoolSize<span class="token punctuation">,</span> keepAliveTime<span class="token punctuation">,</span> unit<span class="token punctuation">,</span> workQueue<span class="token punctuation">,</span>
             <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">defaultThreadFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> defaultHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="拒绝策略" tabindex="-1"><a class="header-anchor" href="#拒绝策略" aria-hidden="true">#</a> 拒绝策略</h5>
<ul>
<li>
<p>默认AbortPolicy：不执行任务，抛出异常、</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">RejectedExecutionHandler</span> defaultHandler <span class="token operator">=</span>
        <span class="token keyword">new</span> <span class="token class-name">AbortPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">AbortPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * Creates an <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">AbortPolicy</span></span></span><span class="token punctuation">}</span>.
         */</span>
        <span class="token keyword">public</span> <span class="token class-name">AbortPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Always throws RejectedExecutionException.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">r</span> the runnable task requested to be executed 请求执行的任务
         * <span class="token keyword">@param</span> <span class="token parameter">e</span> the executor attempting to execute this task 线程池对象
         * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">RejectedExecutionException</span></span> always 会抛出异常
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RejectedExecutionException</span><span class="token punctuation">(</span><span class="token string">"Task "</span> <span class="token operator">+</span> r<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>
                                                 <span class="token string">" rejected from "</span> <span class="token operator">+</span>
                                                 e<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>DiscardPolicy：什么也不做，既不执行任务，也不抛出异常。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">DiscardPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * Creates a <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">DiscardPolicy</span></span></span><span class="token punctuation">}</span>.
         */</span>
        <span class="token keyword">public</span> <span class="token class-name">DiscardPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Does nothing, which has the effect of discarding task r.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">r</span> the runnable task requested to be executed
         * <span class="token keyword">@param</span> <span class="token parameter">e</span> the executor attempting to execute this task
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>DiscardOldestPolicy:阻塞队列中有很多任务，又来了新的任务，阻塞队列放不下了就会触发拒绝策略。把等待时间最长的任务出列，重新由线程池执行新加入的任务,如果没有线程可以用，就会把新的任务加入阻塞队列。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">DiscardOldestPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * Creates a <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">DiscardOldestPolicy</span></span></span><span class="token punctuation">}</span> for the given executor.
         */</span>
        <span class="token keyword">public</span> <span class="token class-name">DiscardOldestPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Obtains and ignores the next task that the executor
         * would otherwise execute, if one is immediately available,
         * and then retries execution of task r, unless the executor
         * is shut down, in which case task r is instead discarded.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">r</span> the runnable task requested to be executed
         * <span class="token keyword">@param</span> <span class="token parameter">e</span> the executor attempting to execute this task
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>e<span class="token punctuation">.</span><span class="token function">isShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//poll是出列，队头出列，也就是等待时间最长的那个任务。</span>
                e<span class="token punctuation">.</span><span class="token function">getQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//重试执行任务r,如果没有线程可以用，就会加入阻塞队列。</span>
                e<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>CallerRunsPolicy：由调用该任务的线程执行任务,而不是线程池中的线程执行。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">CallerRunsPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * Creates a <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">CallerRunsPolicy</span></span></span><span class="token punctuation">}</span>.
         */</span>
        <span class="token keyword">public</span> <span class="token class-name">CallerRunsPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Executes task r in the caller's thread, unless the executor
         * has been shut down, in which case the task is discarded.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">r</span> the runnable task requested to be executed
         * <span class="token keyword">@param</span> <span class="token parameter">e</span> the executor attempting to execute this task
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>e<span class="token punctuation">.</span><span class="token function">isShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                r<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="线程池的膨胀过程" tabindex="-1"><a class="header-anchor" href="#线程池的膨胀过程" aria-hidden="true">#</a> 线程池的膨胀过程</h5>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span>
                <span class="token number">500</span><span class="token punctuation">,</span>
                <span class="token number">30</span><span class="token punctuation">,</span>
                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">ArrayBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>线程池初始化完成以后线程池中的线程数量为：0个</li>
<li>当来了任务后，进行判断，线程池中是否有空闲核心线程，如果没有核心线程或者核心线程数小于设定的最大核心线程数，则创建一个核心线程，来一个任务就创建一个核心线程。</li>
<li>当任务数量为50个的时候，核心线程数扩充到50个以后，50个核心线程都在工作。</li>
<li>来了第51个任务，第51个任务进入阻塞队列，知道任务将阻塞队列填满。</li>
<li>来了10000个任务，当前任务总数是10050个</li>
<li>来了450个任务,创建非核心线程450个。此时线程池满了。线程：50个核心+450非核心。</li>
<li>再来如何任务都会触发拒绝策略。默认拒绝策略：抛出异常，不执行任务。</li>
</ul>
<p>总结：先创建线程池，线程池中没有线程。来任务了，就一个个的创建核心线程，核心线程都在执行任务，而且满了最大核心线程数，就把新来的任务放到阻塞队列。阻塞队列也满了就创建非核心线程。如果非核心线程也满了就触发拒绝策略。</p>
<h5 id="thymeleaf" tabindex="-1"><a class="header-anchor" href="#thymeleaf" aria-hidden="true">#</a> Thymeleaf</h5>
</div></template>


