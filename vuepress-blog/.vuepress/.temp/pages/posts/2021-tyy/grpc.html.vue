<template><div><ul>
<li>
<p>导入插件</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>id <span class="token string">'com.google.protobuf'</span> version <span class="token string">'0.8.11'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>导入依赖</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code><span class="token keyword">def</span> grpcVersion <span class="token operator">=</span> <span class="token string">'1.26.0'</span>
dependencies <span class="token punctuation">{</span>
    implementation <span class="token interpolation-string"><span class="token string">"io.grpc:grpc-protobuf:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">grpcVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span>
    implementation <span class="token interpolation-string"><span class="token string">"io.grpc:grpc-stub:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">grpcVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span>
    implementation <span class="token interpolation-string"><span class="token string">"io.grpc:grpc-netty:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">grpcVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>设置生成的类存放路径</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>sourceSets <span class="token punctuation">{</span>
    main <span class="token punctuation">{</span>
        java <span class="token punctuation">{</span>
            srcDirs <span class="token string">'build/generated/source/proto/main/grpc'</span>
            srcDirs <span class="token string">'build/generated/source/proto/main/java'</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>protobuf</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>protobuf <span class="token punctuation">{</span>
    protoc <span class="token punctuation">{</span> artifact <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">"com.google.protobuf:protoc:3.11.2"</span></span> <span class="token punctuation">}</span>
    plugins <span class="token punctuation">{</span>
        grpc <span class="token punctuation">{</span> artifact <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">"io.grpc:protoc-gen-grpc-java:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">grpcVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    generateProtoTasks <span class="token punctuation">{</span>
        <span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*.</span>plugins <span class="token punctuation">{</span>
            grpc <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>编写proto文件，用来生成代码。</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code><span class="token keyword">package</span> grpc<span class="token punctuation">;</span>
<span class="token comment">//每一个message文件都会有一个单独的class文件</span>
option java_multiple_files<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">//用于指定proto文件生成的java类的outerclass类名</span>
option java_outer_classname <span class="token operator">=</span><span class="token interpolation-string"><span class="token string">"NameServiceProto"</span></span><span class="token punctuation">;</span>
<span class="token comment">//用于标识生成的java文件的package</span>
option java_package <span class="token operator">=</span><span class="token interpolation-string"><span class="token string">"com.lzc.demo.name"</span></span><span class="token punctuation">;</span>

service NameService<span class="token punctuation">{</span>
    <span class="token comment">//rpc 方法名 (参数) returns(返回值)</span>
  rpc <span class="token function">getName</span><span class="token punctuation">(</span>NameRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>NameReply<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//设置参数 </span>
<span class="token comment">//message 参数对象 </span>
message NameRequest<span class="token punctuation">{</span>
  <span class="token comment">//1和2 表示这是第几个参数</span>
  string firstName <span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
  string lastName <span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

message NameReply<span class="token punctuation">{</span>
  <span class="token comment">//1和2 表示第几个返回值。</span>
  string resName<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>用Gradle生成代码 generateProto，生成后再build文件夹中可以找到生成好的代码。</p>
</li>
<li>
<p>编写服务端</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//首先继承生成类 serviceImplBase</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NameServer</span> <span class="token keyword">extends</span> <span class="token class-name">NameServiceGrpc<span class="token punctuation">.</span>NameServiceImplBase</span> <span class="token punctuation">{</span>
<span class="token comment">//重写我们在proto中定义的方法，实现功能。</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token class-name">NameRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">StreamObserver</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">NameReply</span><span class="token punctuation">></span></span> responseObserver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//		通过request可以获取到我们在proto中定义的参数，值就是客户端调用时传入的参数。</span>
        <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token function">mergeName</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getFirstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span><span class="token function">getLastName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        处理完数据后，返回结果通过responseObserver进行设置。</span>
        responseObserver<span class="token punctuation">.</span><span class="token function">onNext</span><span class="token punctuation">(</span><span class="token class-name">NameReply</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setResName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        结束设置</span>
        responseObserver<span class="token punctuation">.</span><span class="token function">onCompleted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">mergeName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span><span class="token class-name">String</span> lastName<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> firstName<span class="token operator">+</span>lastName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//启动服务</span>
        <span class="token class-name">ServerBuilder</span><span class="token punctuation">.</span><span class="token function">forPort</span><span class="token punctuation">(</span><span class="token number">9999</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addService</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">NameServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"nameserver run in 9999"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//防止服务停止</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>编写客户端 进行远程调用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//远程调用时，客户端把参数给stub，stub再以网络的形式发给服务端。</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NameClient</span> <span class="token punctuation">{</span>
    <span class="token class-name">NameServiceGrpc<span class="token punctuation">.</span>NameServiceBlockingStub</span> stub<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">NameClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        设置server信息  ip+port</span>
        <span class="token class-name">ManagedChannel</span> channel <span class="token operator">=</span> <span class="token class-name">ManagedChannelBuilder</span><span class="token punctuation">.</span><span class="token function">forAddress</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">9999</span><span class="token punctuation">)</span>
<span class="token comment">//		  用文本的形式</span>
                <span class="token punctuation">.</span><span class="token function">usePlaintext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        通过ServiceGrpc 创建stub</span>
         stub<span class="token operator">=</span> <span class="token class-name">NameServiceGrpc</span><span class="token punctuation">.</span><span class="token function">newBlockingStub</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">NameClient</span> nameClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NameClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//		通过stub 调用方法 设置参数  调用后返回结果为reply类型们可以获取到返回值。</span>
        <span class="token class-name">NameReply</span> reply <span class="token operator">=</span> nameClient<span class="token punctuation">.</span>stub<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token class-name">NameRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setFirstName</span><span class="token punctuation">(</span><span class="token string">"lai"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setLastName</span><span class="token punctuation">(</span><span class="token string">"zhuocheng"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>reply<span class="token punctuation">.</span><span class="token function">getResName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


