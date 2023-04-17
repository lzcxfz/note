<template><div><ul>
<li>
<p>创建简单节点：create (节点名称:节点标签名称):</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code> create (emp:Employee)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>创建带有属性的节点: create (节点名称:节点标签名称 {属性名称:属性值,属性名称:属性值...})</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>create (dept:Dept {deptno:10,dname:&quot;Accounting&quot;,location:&quot;Hyderabad&quot;})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询Dept下所有的内容</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>match (dept:Dept) return dept
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询Dept标签下 id=45，dname=&quot;Accounting&quot;的节点</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>match (dept:Dept {id:45,dname:&quot;Accounting&quot;}) return dept
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询Dept标签下 dname=“Accounting&quot; 的节点  （使用where）</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>match (dept:Dept) where dept.dname=&quot;Accounting&quot; return dept
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>检索Dept标签下所有节点的dname和deptno属性</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>match (dept:Dept) return dept.dname,dept.deptno
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>在现有的节点上创建没有属性的关系</p>
<p>节点1：e:Customer，节点2： cc:CreditCard</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>match (e:Customer),(cc:CreditCard) create (e)-[r:DO_SHOPPING_WITH]-&gt;(cc)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>r:关系名称。</p>
</li>
<li>
<p>在现有的节点上创建带属性的关系。</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>match(e:Customer),(cc:CreditCard) create (cust)-[r:DO_SHOPPING_With{shopdate:&quot;12/12/2021&quot;,price:5000}]-&gt;(cc) return r
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>r:关系名称。{shopdate:&quot;12/12/2021&quot;,price:5000}，关系的属性和值。</p>
</li>
<li>
<p>使用新节点创建没有属性的关系</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>create (fb1:FaceBookProfile1)-[like:LIKES]-&gt;(fb2:FaceBookProfile2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用新节点创建带有属性的关系</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>CREATE (video1:YoutubeVideo1{title:&quot;Action Movie1&quot;,updated_by:&quot;Abc&quot;,uploaded_date:&quot;10/10/2010&quot;})
-[movie:ACTION_MOVIES{rating:1}]-&gt;
(video2:YoutubeVideo2{title:&quot;Action Movie2&quot;,updated_by:&quot;Xyz&quot;,uploaded_date:&quot;12/12/2012&quot;}) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>检索关系节点的详细信息</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>match (cust)-[r:DO_SHOPPING_WITH]-&gt;(cc) 
return cust,cc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>多个标签到节点</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>CREATE (m:Movie:Cinema:Film:Picture)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>为关系创建标签</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>CREATE (p1:Profile1)-[r1:LIKES]-&gt;(p2:Profile2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>删除节点</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>match (e:Employee) delete e
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>删除标签</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>MATCH (m:Movie) 
REMOVE m:Picture
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>DELETE操作用于删除节点和关联关系。</li>
<li>REMOVE操作用于删除标签和属性。</li>
</ul>
</li>
<li>
<p>SET标签</p>
<p>为book加上了title属性，且赋值。</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>MATCH (book:Book)
SET book.title = 'superstar'
RETURN book
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>ORDER BY 和SQL一样 写在最后</p>
</li>
<li>
<p>UNION 和SQL一样，注意如果两个两条语句查出来的属性是一样的，但是字段名不一样，要有as起别名，让他们一样，否则会报错。</p>
</li>
<li>
<p>LIMIT 只有一个参数。显示记录的条数。</p>
</li>
<li>
<p>SKIP 只有一个参数，跳过多少行。</p>
</li>
<li>
<p>它只显示一行，因为CQL MERGE命令检查该节点在数据库中是否可用。 如果它不存在，它创建新节点。 否则，它不创建新的。</p>
</li>
<li>
<p>IN</p>
<div class="language-CQL ext-CQL line-numbers-mode"><pre v-pre class="language-CQL"><code>MATCH (e:Employee) 
WHERE e.id IN [123,124]
RETURN e.id,e.name,e.sal,e.deptno
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


