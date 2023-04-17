<template><div><p>黑马2022资料阶段一：java基础-第三章、第七章</p>
<h2 id="_3-1-面向对象基础上" tabindex="-1"><a class="header-anchor" href="#_3-1-面向对象基础上" aria-hidden="true">#</a> 3-1 面向对象基础上</h2>
<h3 id="_07-两个对象内存图" tabindex="-1"><a class="header-anchor" href="#_07-两个对象内存图" aria-hidden="true">#</a> 07-两个对象内存图</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310001124213.png" alt="image-20230310001124213"></p>
<blockquote>
<p>需要注意的是，第二次创建对象时，类的字节码文件不需要再次加载到方法区。调用成员变量方法的时候，在堆内存中保存的是同一个成员方法的地址(方法区)，只是堆内存地址(指向方法区的指针)不一样。且每次执行都会压栈，执行完会弹栈。</p>
</blockquote>
<h3 id="_08-两个引用指向同一个对象内存图" tabindex="-1"><a class="header-anchor" href="#_08-两个引用指向同一个对象内存图" aria-hidden="true">#</a> 08-两个引用指向同一个对象内存图</h3>
<p>定义学生类：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310000009738.png" alt="image-20230310000009738"></p>
<p>在main方法创建一个对象stu1，再用这个类的引用stu2指向stu1,改变stu2的name属性：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310000156658.png" alt="image-20230310000156658"></p>
<blockquote>
<p>stu1的name属性会变化吗为什么？</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310000402253.png" alt="image-20230310000402253"></p>
<p>会变化，打印出来是:阿珍...阿珍。</p>
<p>因为stu1和stu2都指向了堆内存的同一块地址。</p>
<h2 id="_3-2面向对象基础下" tabindex="-1"><a class="header-anchor" href="#_3-2面向对象基础下" aria-hidden="true">#</a> 3-2面向对象基础下</h2>
<h3 id="_12-this关键字" tabindex="-1"><a class="header-anchor" href="#_12-this关键字" aria-hidden="true">#</a> 12-this关键字</h3>
<p>当方法局部变量和类成员变量重名时，会采用就近原则，导致set方法失效：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310001711631.png" alt="image-20230310001711631"></p>
<p>想要将成员变量的值改为set方法传参的值，可以使用this关键字：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310001823315.png" alt="image-20230310001823315"></p>
<p>this的作用：调用本类的成员(变量和方法)，解决局部变量和成员变量的重名问题。</p>
<p>this代表所在类的对象引用，方法被哪个对象调用，this就代表哪个对象。</p>
<h3 id="_13-this的内存原理" tabindex="-1"><a class="header-anchor" href="#_13-this的内存原理" aria-hidden="true">#</a> 13-this的内存原理</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230310002604905.png" alt="image-20230310002604905"></p>
<h3 id="_15-17-构造方法格式、调用时机和作用、注意事项" tabindex="-1"><a class="header-anchor" href="#_15-17-构造方法格式、调用时机和作用、注意事项" aria-hidden="true">#</a> 15~17-构造方法格式、调用时机和作用、注意事项</h3>
<p>是什么：构建创造对象的时候所调用的方法。</p>
<p>格式：方法名与类名相同，大小写也一致。没有返回值类型，连void都没有。没有具体的返回值。</p>
<p>执行时机：创建对象的时候调用，每创建一次对象，就会执行一次构造方法。不能手动调用构造方法。</p>
<p>作用：给对象的属性做初始化，在new对象时传参数，在构造函数内执行初始化逻辑。</p>
<p>注意事项：如果没有定义构造方法，会默认给出一个默认构造方法。一旦定义了构造方法，系统不会提供默认构造方法(无参的)，构造方法是可以重载的，如果自定义了有参构造，还要使用无参构造的话需要自己再定义一个无参构造。</p>
<h2 id="_7-1面向对象进阶-分类和static" tabindex="-1"><a class="header-anchor" href="#_7-1面向对象进阶-分类和static" aria-hidden="true">#</a> 7-1面向对象进阶-分类和static</h2>
<h3 id="_01-分类思想概述" tabindex="-1"><a class="header-anchor" href="#_01-分类思想概述" aria-hidden="true">#</a> 01-分类思想概述</h3>
<p>分工协作、专人干专事。</p>
<h2 id="_02-分类思想之黑马信息管理系统" tabindex="-1"><a class="header-anchor" href="#_02-分类思想之黑马信息管理系统" aria-hidden="true">#</a> 02-分类思想之黑马信息管理系统</h2>
<ul>
<li>Student类 标准学生类,封装键盘录入的学生信息(id , name , age , birthday)</li>
<li>StudentDao类 Dao : (Data Access Object 缩写) 用于访问存储数据的数组或集合</li>
<li>StudentService类 用来进行业务逻辑的处理(例如: 判断录入的id是否存在)</li>
<li>StudentController类 和用户打交道(接收用户需求,采集用户信息,打印数据到控制台)</li>
</ul>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230316002216534.png" alt="image-20230316002216534"></p>
<h3 id="_03-分包思想" tabindex="-1"><a class="header-anchor" href="#_03-分包思想" aria-hidden="true">#</a> 03-分包思想</h3>
<p>如果将所有的类文件都放在同一个包下,不利于管理和后期维护,所以,对于<span style="background-color:pink;">不同功能的类文件,可以放在不同的包下</span>进行管理</p>
<ul>
<li>
<p>包</p>
<p>本质上就是文件夹</p>
</li>
<li>
<p>创建包</p>
<p>多级包之间使用 &quot; . &quot; 进行分割
多级包的定义规范：公司的网站地址翻转(去掉www)
比如：我的网站址为www.iocaop.com
后期我们所定义的包的结构就是：com.iocaop.其他的包名</p>
</li>
<li>
<p>包的命名规则</p>
<p><span style="background-color:pink;">字母都是小写</span></p>
</li>
</ul>
<h3 id="_04-包的注意事项、类之间的访问" tabindex="-1"><a class="header-anchor" href="#_04-包的注意事项、类之间的访问" aria-hidden="true">#</a> 04-包的注意事项、类之间的访问</h3>
<p>包的注意事项：</p>
<ul>
<li>package语句必须是程序的第一条可执行的代码</li>
<li>package语句在一个java文件中<span style="background-color:pink;">只能有一个 </span></li>
<li><span style="background-color:pink;">如果没有package,默认表示无包名 (如果类在某个包下，必须有package，否则报错，反之亦然，不在包下，不能有package)</span></li>
</ul>
<p>类之间的访问：</p>
<ul>
<li>
<p>同一个包下的访问</p>
<p>不需要导包，直接使用即可</p>
</li>
<li>
<p>不同包下的访问</p>
<p>1.import 导包后访问</p>
<p>2.通过全类名（包名 + 类名）访问</p>
</li>
<li>
<p>注意：import 、package 、class 三个关键字的摆放位置存在顺序关系</p>
<p>package 必须是程序的<span style="background-color:pink;">第一条可执行的</span>代码</p>
<p><span style="background-color:pink;">import 需要写在 package 下面</span></p>
<p><span style="background-color:pink;">class 需要在 import 下面</span></p>
</li>
</ul>
<h3 id="_05-07学生信息管理系统" tabindex="-1"><a class="header-anchor" href="#_05-07学生信息管理系统" aria-hidden="true">#</a> 05-07学生信息管理系统</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230316004248204.png" alt="image-20230316004248204"></p>
<p>需求说明：</p>
<ul>
<li>
<p>添加学生: 键盘录入学生信息(id，name，age，birthday)</p>
<p>使用数组存储学生信息,要求学生的id不能重复</p>
</li>
<li>
<p>删除学生: 键盘录入要删除学生的id值,将该学生从数组中移除,如果录入的id在数组中不存在,需要重新录入</p>
</li>
<li>
<p>修改学生: 键盘录入要修改学生的id值和修改后的学生信息</p>
<p>将数组中该学生的信息修改,如果录入的id在数组中不存在,需要重新录入</p>
</li>
<li>
<p>查询学生: 将数组中存储的所有学生的信息输出到控制台</p>
</li>
</ul>
<p>分包：<span style="background-color:pink;">这里只是简单的项目，不是Spring三层架构项目，主要目的是学习分类、分包思想</span>。</p>
<table>
<thead>
<tr>
<th>包</th>
<th>存储的类</th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>com.lzc.edu.info.manager.domain</td>
<td>Student.java</td>
<td>封装学生信息</td>
</tr>
<tr>
<td>com.lzc.edu.info.manager.dao</td>
<td>StudentDao.java</td>
<td>访问存储数据的数组，进行赠删改查（库管）</td>
</tr>
<tr>
<td>com.lzc.edu.info.manager.service</td>
<td>StudentService.java</td>
<td>业务的逻辑处理（业务员）</td>
</tr>
<tr>
<td>com.lzc.edu.info.manager.controller</td>
<td>StudentController.java</td>
<td>和用户打交道（客服接待）</td>
</tr>
<tr>
<td>com.lzc.edu.info.manager.entry</td>
<td>InfoManagerEntry.java</td>
<td>程序的入口类，提供一个main方法</td>
</tr>
</tbody>
</table>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230316235654799.png" alt="image-20230316235654799"></p>
<p>启动菜单的打印，循环可以用标号跳出：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230317000324329.png" alt="image-20230317000324329"></p>
<h3 id="_11-12问题分析、static的引出" tabindex="-1"><a class="header-anchor" href="#_11-12问题分析、static的引出" aria-hidden="true">#</a> 11-12问题分析、static的引出</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230317003101654.png" alt="image-20230317003101654"></p>
<p>两次添加学生， 调用了两次addStudent()方法，在方法中new了StudentService，也就是有两个studentService对象，这两个studentService中有各自的成员变量studentDao(有两个)，自然就有了两个Student数组，所以无法判断学号是否重复。这里可以使用<code v-pre>static</code>关键字解决这个问题。</p>
<blockquote>
<p>这里只是简单的类，在Spring中，Bean默认是单例模式，而且也不会这样使用成员变量，而是自动装配的，都是同一个。</p>
</blockquote>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230317003530765.png" alt="image-20230317003530765"></p>
<h3 id="_12-static关键字的特点" tabindex="-1"><a class="header-anchor" href="#_12-static关键字的特点" aria-hidden="true">#</a> 12-static关键字的特点</h3>
<ul>
<li>
<p>被类的所有对象共享</p>
<p>是我们判断是否使用静态关键字的条件</p>
</li>
<li>
<p>随着类的加载而加载，优先于对象存在</p>
<p>对象需要类被加载后，才能创建</p>
</li>
<li>
<p>可以通过类名调用</p>
<p>也可以通过对象名调用(<span style="background-color:pink;">编译器优化，最终class代码会替换成类名调用</span>)</p>
</li>
</ul>
<h3 id="_13-static注意事项" tabindex="-1"><a class="header-anchor" href="#_13-static注意事项" aria-hidden="true">#</a> 13-static注意事项</h3>
<ul>
<li>
<p>静态方法只能访问静态的成员</p>
<blockquote>
<p>静态方法为什么不能非静态成员？没有this指针，不知道是哪个对象的静态成员。</p>
</blockquote>
</li>
<li>
<p>非静态方法可以访问静态的成员，也可以访问非静态的成员</p>
</li>
<li>
<p>静态方法中是没有this关键字 (类比对象先加载，静态方法是在方法区，实例化对象在堆区，方法区的数据先赋值，而对象还没创建，不知道this应该指向堆区哪个位置。即方法区this(假设有this)-&gt;堆区（???未知），就算满足顺序也不合理，因为静态方法是所有对象共享的，this不知道应该指向哪个对象)</p>
</li>
</ul>
<blockquote>
<p>说到底还是加载顺序的问题。</p>
</blockquote>
<h2 id="_7-3-7-4继承" tabindex="-1"><a class="header-anchor" href="#_7-3-7-4继承" aria-hidden="true">#</a> 7-3~7-4继承</h2>
<h3 id="_01-继承入门" tabindex="-1"><a class="header-anchor" href="#_01-继承入门" aria-hidden="true">#</a> 01-继承入门</h3>
<p>根据多个类中<span style="background-color:pink;">共性</span>的内容，向上<span style="background-color:pink;">抽取</span>出来。让类之间产生父子关系，子类可以直接使用父类的非私有成员(方法和变量)。</p>
<h3 id="_02-继承的好处和坏处" tabindex="-1"><a class="header-anchor" href="#_02-继承的好处和坏处" aria-hidden="true">#</a> 02-继承的好处和坏处</h3>
<p>好处：</p>
<ul>
<li>提高代码复用性(抽取共性写在父类，子类继承父类，子类编写特性即可，共性只需要编写一次)</li>
<li>提高了代码的维护性(当需要对共性进行修改时，只需要修改父类即可，不需要去子类多次修改)。</li>
<li>让类之间产生了关系，是<span style="background-color:pink;">多态的前提</span>。</li>
</ul>
<p>坏处：</p>
<ul>
<li>继承是侵入性的</li>
<li>降低了代码的灵活性(继承导致子类<span style="background-color:pink;">必须有</span>父类的非私有方法和属性，约束了子类。)</li>
<li>增强了代码的耦合性(代码和代码之间存在关联，耦合，耦合性太强，导致关系紧密，维护麻烦。)</li>
</ul>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230318021610041.png" alt="image-20230318021610041"></p>
<p>什么时候使用继承？</p>
<p>类与类之间存在共性内容，并且产生了<span style="background-color:pink;">is a</span>的关系，就可以考虑使用继承。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230318021759816.png" alt="image-20230318021759816"></p>
<h3 id="_03-继承的特点" tabindex="-1"><a class="header-anchor" href="#_03-继承的特点" aria-hidden="true">#</a> 03-继承的特点</h3>
<ul>
<li>Java只支持单继承(子类只能继承一个父类)，<span style="background-color:pink;">不支持多继承</span>(子类不能同时继承多个父类)，但<span style="background-color:pink;">支持多层继承</span>(A继承B，B继承C)。</li>
</ul>
<p>java为什么不支持多继承？</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230320225931557.png" alt="image-20230320225931557"></p>
<h3 id="_04-继承中成员变量的访问特点" tabindex="-1"><a class="header-anchor" href="#_04-继承中成员变量的访问特点" aria-hidden="true">#</a> 04-继承中成员变量的访问特点</h3>
<p>子类和父类中出现重名的成员变量，会使用子类的成员变量，如果子类的成员方法还有重名，就会使用方法中定义的变量，<span style="background-color:pink;">就近原则</span>，可以使用<span style="background-color:pink;">this和super</span>进行调用子类或父类的成员变量。</p>
<h3 id="_05-this和super访问成员的格式" tabindex="-1"><a class="header-anchor" href="#_05-this和super访问成员的格式" aria-hidden="true">#</a> 05-this和super访问成员的格式</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230320230606783.png" alt="image-20230320230606783"></p>
<h3 id="_06-继承中成员方法的访问特点" tabindex="-1"><a class="header-anchor" href="#_06-继承中成员方法的访问特点" aria-hidden="true">#</a> 06-继承中成员方法的访问特点</h3>
<p>通过子类对象访问方法，会先到子类成员范围中找，如果没有再到父类成员方法范围中找。也是可以用this和super进行区分调用。</p>
<h3 id="_07-方法重写概述和应用场景" tabindex="-1"><a class="header-anchor" href="#_07-方法重写概述和应用场景" aria-hidden="true">#</a> 07-方法重写概述和应用场景</h3>
<p>重写：在继承体系中，子类出现了和父类<span style="background-color:pink;">一模一样</span>(参数类型、个数，返回值，方法名)的方法声明。</p>
<p>使用场景：子类需要父类的功能，而功能主体子类有自己特有的内容，可以重写父类方法，保留父类功能，又定义了子类特有的内容(可以在子类重写的方法中使用super调用父类的方法，再接着写新增的内容)。</p>
<blockquote>
<p>重载：在同一个类中，方法名相同，参数列表不同，与返回值无关。</p>
</blockquote>
<h3 id="_08-方法重写注意事项" tabindex="-1"><a class="header-anchor" href="#_08-方法重写注意事项" aria-hidden="true">#</a> 08-方法重写注意事项</h3>
<ul>
<li>父类中私有方法不能被重写</li>
<li>父类的<span style="background-color:pink;">静态方法</span>，子类必须通过静态方法&quot;重写&quot;(现象看起来是重写)，<span style="background-color:pink;">非静态方法</span>也必须通过非静态方法重写。</li>
</ul>
<blockquote>
<p>注意：<span style="background-color:pink;">静态方法不能被重写</span>，如果子类也存在和父类方法声明一模一样的方法，可以理解为子类将父类中同名的方法隐藏了起来，并非重写。</p>
</blockquote>
<ul>
<li>子类重写父类方法时，<span style="background-color:pink;">访问权限必须大于父类</span></li>
</ul>
<h3 id="_09-权限修饰符" tabindex="-1"><a class="header-anchor" href="#_09-权限修饰符" aria-hidden="true">#</a> 09-权限修饰符</h3>
<p>用来修饰成员变量、成员方法、构造方法。</p>
<p>权限修饰符：(无关类：没有继承关系的类)</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230320232406356.png" alt="image-20230320232406356"></p>
<h3 id="_10-继承中构造方法的访问特点" tabindex="-1"><a class="header-anchor" href="#_10-继承中构造方法的访问特点" aria-hidden="true">#</a> 10-继承中构造方法的访问特点</h3>
<p>每次创建子类对象，都会执行父类的构造方法，并且是优先于子类的构造方法。</p>
<blockquote>
<p>为什么？子类初始化之前，一定要完成父类的初始化，假设父类A有成员变量a=10，子类B没有该变量，在子类要使用a，肯定要父类先初始化完成才能用。数据的初始化是在构造方法执行时进行的。</p>
</blockquote>
<p><span style="background-color:pink;">系统在每一个构造方法中，都默认隐藏了一句代码super()，调用父类的无参构造方法。</span>就算不写，也会自动带上。如果没有手动继承哪个类，也会有这个spuer()，因为java中所有类都继承了Object类。</p>
<h3 id="_11-继承中构造方法的访问特点-父类中没有无参构造方法" tabindex="-1"><a class="header-anchor" href="#_11-继承中构造方法的访问特点-父类中没有无参构造方法" aria-hidden="true">#</a> 11-继承中构造方法的访问特点-父类中没有无参构造方法</h3>
<blockquote>
<p>如果一个类被public修饰，那类名必须与文件名保持一致。所以一个java文件中只能有一个public修饰的类。</p>
</blockquote>
<p>如果父类没有无参构造，在new子类对象时，会出现错误，那么我们需要在子类构造中手动加上super(有参)，手动调用父类的有参构造。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230321000519738.png" alt="image-20230321000519738"></p>
<p>以上代码中，子类无参构造，系统不会自动帮我们加上spuer()，因为this(...)和super(...)都必须在构造方法的第一行，会冲突。</p>
<h3 id="_12-继承中成员变量的内存图解" tabindex="-1"><a class="header-anchor" href="#_12-继承中成员变量的内存图解" aria-hidden="true">#</a> 12-继承中成员变量的内存图解</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230321001138816.png" alt="image-20230321001138816"></p>
<blockquote>
<p>父类成员变量name和age是私有的，为什么会在子类对象中？所谓的私有指的是在子类没法直接使用，但是会被继承过来，可以通过get()，set()方法使用。</p>
</blockquote>
<h3 id="_14-抽象类" tabindex="-1"><a class="header-anchor" href="#_14-抽象类" aria-hidden="true">#</a> 14-抽象类</h3>
<p>抽象方法：将共性行为（方法）抽取到父类后，发现该方法的<span style="background-color:pink;">实现逻辑无法在父类中给出具体明确</span>，非法·该方法就可以定义为抽象方法</p>
<p>抽象类：<span style="background-color:pink;">如果一个类中存在抽象方法，该类就必须声明为抽象类</span>。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230321235040710.png" alt="image-20230321235040710"></p>
<p>抽象方法怎么写？</p>
<p>只有定义，没有实现，加上abstract关键字，然后在类上加上abstract关键字。</p>
<p>子类继承抽象类后，必须重写抽象方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//抽象类的定义</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> 类名 <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">//抽象方法的定义</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_15-抽象类的注意事项" tabindex="-1"><a class="header-anchor" href="#_15-抽象类的注意事项" aria-hidden="true">#</a> 15-抽象类的注意事项</h3>
<ul>
<li>抽象类不能创建对象，即<span style="background-color:pink;">不能实例化</span>。为什么？因为抽象类没有重写抽象方法，实例化后通过对象可以调用抽象方法，没有实现的方法调用是没有意义的。</li>
<li>抽象类中<span style="background-color:pink;">有构造方法</span>(为了让子类调用)，抽象类的子类构造方法肯定会有<code v-pre>spuer()</code>，因为系统会默认加上，说明抽象类有构造方法。</li>
<li>抽象类的子类，<span style="background-color:pink;">必须重写父类中的所有抽象方法，或者该子类也是一个抽象类</span>。</li>
<li>抽象类中<span style="background-color:pink;">可以没有抽象方法</span>，但有抽象方法的类一定是抽象类。</li>
</ul>
<h3 id="_16-模板设计模式" tabindex="-1"><a class="header-anchor" href="#_16-模板设计模式" aria-hidden="true">#</a> 16-模板设计模式</h3>
<p>什么是设计模式？</p>
<p>一套反复被使用，多数人知晓、经过分类编目的、代码设计经验的总结。作用是代码重用、便于他人理解、保证代码可靠性、程序重用性。</p>
<p>一句话：一套良好的编码风格。</p>
<p>模板设计模式：把抽象类整体看成一个模板，模板中不能决定的东西定义为抽象方法，让使用模板的类(抽象类的子类)去重写抽象方法实现需求。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230322000902007.png" alt="image-20230322000902007"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230322000930924.png" alt="image-20230322000930924"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230322000959361.png" alt="image-20230322000959361"></p>
<h3 id="_17-final关键字" tabindex="-1"><a class="header-anchor" href="#_17-final关键字" aria-hidden="true">#</a> 17-final关键字</h3>
<p>16中的write方法，是模板方法，不允许被更改的。假设子类去重写了这个方法，就会打乱我们原有的逻辑。怎么办？使用<code v-pre>final</code>关键字。</p>
<p>final关键字可以修饰方法、变量、类</p>
<p>特点：</p>
<ul>
<li>
<p>修饰<span style="background-color:pink;">方法</span>：表示是最终方法，<span style="background-color:pink;">不能被重写</span>。</p>
</li>
<li>
<p>修饰变量：表示该变量是<span style="background-color:pink;">常量</span>(所有字母大写，下划线分割)，<span style="background-color:pink;">不能被再次赋值</span>。修饰基本数据类型，变量只能被赋值一次。修饰引用类型变量，不允许修改变量地址值，可以修改变量中的属性值。即不能修改指针指向，但指针指向的堆内存中的内容可以被修改。</p>
</li>
<li>
<p>修饰<span style="background-color:pink;">类</span>：表示最终类，<span style="background-color:pink;">不能被继承</span>。该类所有方法都是核心方法，不希望任何一个方法被重写，直接修饰类，即没有子类就不会被重写了。</p>
</li>
</ul>
<blockquote>
<p>修饰成员变量时，需要注意成员变量的初始化时机。要么在<span style="background-color:pink;">创建时赋值</span>，要么<span style="background-color:pink;">在构造方法结束之前完成赋值</span>。</p>
</blockquote>
<h3 id="_19-代码块" tabindex="-1"><a class="header-anchor" href="#_19-代码块" aria-hidden="true">#</a> 19-代码块</h3>
<p>使用<code v-pre>{}</code>括起来的代码被称为代码块</p>
<p>分类：</p>
<ul>
<li>
<p>局部代码块</p>
<p>位置：方法内。局部代码块定义的变量执行完后，局部代码块中的变量的<span style="background-color:pink;">内存会被释放</span>，可以限定局部变量的生命周期，及早释放，提高内存利用率。</p>
</li>
<li>
<p>构造代码块</p>
<p>位置：类中，方法外。构造代码块是<span style="background-color:pink;">每次创建对象都会执行</span>的，且是在<span style="background-color:pink;">构造方法之前执行</span>。作用是构造方法代码复用，在多个构造方法中的重复代码，可以提取到构造代码块中。</p>
</li>
<li>
<p>静态代码块</p>
<p>位置：类中，方法外，且使用<code v-pre>static</code>修饰。被static修饰的变量会随着类的加载而加载。代码块也是一样的，<span style="background-color:pink;">当类被加载到内存中，静态代码块也会随着执行</span>，且由于类只会加载一次，<span style="background-color:pink;">静态代码块也只会执行一次</span>。作用是在类加载的时候做一些数据初始化的操作。</p>
</li>
</ul>
<h2 id="_7-5-7-6-接口、多态、内部类" tabindex="-1"><a class="header-anchor" href="#_7-5-7-6-接口、多态、内部类" aria-hidden="true">#</a> 7-5~7-6 接口、多态、内部类</h2>
<h3 id="_03-接口的介绍" tabindex="-1"><a class="header-anchor" href="#_03-接口的介绍" aria-hidden="true">#</a> 03-接口的介绍</h3>
<p>当一个类中<span style="background-color:pink;">所有方法都是抽象方法</span>，说明这个类是用来指定规则的。制定规则时，一般是用<span style="background-color:pink;">接口</span>来做的。</p>
<p>接口也是一种<span style="background-color:pink;">引用数据类型</span>，比抽象类还要抽象(接口是特殊的抽象类)。</p>
<p>接口存在的意义：</p>
<ul>
<li><span style="background-color:pink;">规则</span>的定义</li>
<li>程序的<span style="background-color:pink;">扩展性</span></li>
</ul>
<h3 id="_04-接口的定义和特点" tabindex="-1"><a class="header-anchor" href="#_04-接口的定义和特点" aria-hidden="true">#</a> 04-接口的定义和特点</h3>
<ul>
<li>
<p>interface定义</p>
</li>
<li>
<p>接口<span style="background-color:pink;">不能实例化</span></p>
</li>
<li>
<p>接口和类之间是实现关系，implements关键字表示</p>
</li>
<li>
<p>接口的实现类要么重写接口中的所有方法，要么就是抽象类。</p>
</li>
<li>
<p>一个类可以实现多个接口，但不能继承多个父类。</p>
</li>
</ul>
<blockquote>
<p>为什么不能多继承而可以多实现？因为多继承情况下如果父类存在方法名重复，无法确定使用哪一个。但接口多实现，就算实现的接口中方法名重复也没关系，因为抽象方法本来就没有具体实现，实现是在实现类编写的。</p>
</blockquote>
<p>菱形继承问题：<a href='https://blog.csdn.net/challenglistic/article/details/127717980'>点击跳转</a></p>
<h3 id="_05-接口中成员的特点" tabindex="-1"><a class="header-anchor" href="#_05-接口中成员的特点" aria-hidden="true">#</a> 05-接口中成员的特点</h3>
<p>变量：</p>
<ul>
<li>
<p><span style="background-color:pink;">接口中的变量只能是常量</span>，就算不加final，系统也会自动加上。并且是静态的、公共的。</p>
</li>
<li>
<p>接口中的成员变量系统默认会加上<code v-pre>public static final</code>。为什么？<a href='https://blog.csdn.net/ameyume/article/details/6189749'>点击跳转</a></p>
</li>
</ul>
<p>方法：</p>
<ul>
<li>接口中没有构造方法，实现类的构造方法<code v-pre>super()</code>访问的是<code v-pre>Object</code>中的构造方法。</li>
<li>成员方法系统默认会加上<code v-pre>public abstract</code>关键字。方法只能是抽象方法(jdk8之前)</li>
</ul>
<h3 id="_06-07-jdk8接口中成员的特点" tabindex="-1"><a class="header-anchor" href="#_06-07-jdk8接口中成员的特点" aria-hidden="true">#</a> 06~07 JDK8接口中成员的特点</h3>
<p><strong>默认方法</strong></p>
<p>jd8版本以后只对成员方法做了改进。</p>
<p>假设有个场景:</p>
<p>在版本1.0时接口中有2个方法，并且该接口有多个实现类。假设要在版本2.0时在接口中增加10个方法，那么原来该接口的所有实现类都需要重写这10个新增的方法。很麻烦。</p>
<p>jdk8后允许在接口中定义非抽象法方法，但是需要加上关键字<code v-pre>default</code>，表示默认方法。</p>
<p>作用：<span style="background-color:pink;">解决接口升级问题</span>。</p>
<p>格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>实现类实现接口中的默认方法时不需要再加<code v-pre>default</code>关键字。接口中的默认方法都是public 不写也会自动加上</p>
</blockquote>
<p>接口可以多实现，如果实现的多个接口中有方法重名，且都是默认方法，子类必须重写该方法，否则报错(不重写会有二义性)。</p>
<p><strong>静态方法</strong></p>
<p>jdk8以后接口中支持静态<code v-pre>static</code>方法。默认public 不写会默认加上。</p>
<p>定义格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是：<span style="background-color:pink;">接口中的静态方法只能通过接口名调用，不能通过实现类类名或者实现类对象名调用</span>。</p>
<p>因为只能通过接口名调用接口中的静态方法，所以不会有接口多实现出现静态方法重名的问题。</p>
<h3 id="_08-jdk9版本中接口成员的特点" tabindex="-1"><a class="header-anchor" href="#_08-jdk9版本中接口成员的特点" aria-hidden="true">#</a> 08-jdk9版本中接口成员的特点</h3>
<p>在jdk8的基础上支持私有成员方法，提供给接口中的默认方法使用。</p>
<p>当接口中默认方法中有共用逻辑需要抽取，就可以使用私有成员方法进行封装。</p>
<p>如下：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327005414466.png" alt="image-20230327005414466"></p>
<p>对于静态方法，也是可以私有的：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327005523697.png" alt="image-20230327005523697"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327005809516.png" alt="image-20230327005809516"></p>
<h3 id="_09-类和接口的关系" tabindex="-1"><a class="header-anchor" href="#_09-类和接口的关系" aria-hidden="true">#</a> 09-类和接口的关系</h3>
<ul>
<li>
<p>类和类的关系：继承关系，只能单继承，但是可以多层继承</p>
</li>
<li>
<p>类和接口的关系：实现关系，可以单实现也可以多实现，还可以在继承一个类的情况下实现多个接口。</p>
<p>如果直接父类和接口中出现了相同的方法声明，但是逻辑不一样，优先使用父类的方法逻辑。</p>
</li>
<li>
<p>接口和接口的关系：基础关系，可以单继承也<span style="background-color:pink;">可以多继承</span>。多继承时，如果父类接口重名但逻辑不一样，需要在子类接口重写该方法，且定义为默认方法。</p>
</li>
</ul>
<h3 id="_12-多态的前提条件" tabindex="-1"><a class="header-anchor" href="#_12-多态的前提条件" aria-hidden="true">#</a> 12-多态的前提条件</h3>
<p>同一个对象在不同时刻变现出来的不同形态。</p>
<p>多态的前提和体现</p>
<ul>
<li>有<span style="background-color:pink;">继承或实现</span>关系</li>
<li>有<span style="background-color:pink;">方法重写</span></li>
<li>有<span style="background-color:pink;">父类引用</span>指向<span style="background-color:pink;">子类对象</span></li>
</ul>
<h3 id="_13-多态中成员访问的特点" tabindex="-1"><a class="header-anchor" href="#_13-多态中成员访问的特点" aria-hidden="true">#</a> 13-多态中成员访问的特点</h3>
<ul>
<li>构造方法：同继承一样，子类会通过<code v-pre>spuer()</code>访问父类构造方法</li>
<li><span style="background-color:pink;">成员变量：编译看左边，执行看左边。</span></li>
<li><span style="background-color:pink;">成员方法：编译看左边，执行看右边。</span></li>
</ul>
<p>成员变量：使用父类的，如果父类没有，那么在编译时就会报错。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327230054648.png" alt="image-20230327230054648"></p>
<p>成员方法，使用子类的，如果父类没有，也会在编译时错误。</p>
<p>为什么成员变量和成员方法的访问不一样？</p>
<p>因为成员方法有重写的概念，而成员变量没有。</p>
<h3 id="_14-多态的好处和弊端" tabindex="-1"><a class="header-anchor" href="#_14-多态的好处和弊端" aria-hidden="true">#</a> 14-多态的好处和弊端</h3>
<ul>
<li>
<p>好处：提高方法扩展性</p>
<ul>
<li>父类是Animal，两个子类Dog和Cat，重写eat方法。静态方法调用：</li>
</ul>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327231100848.png" alt="image-20230327231100848"></p>
<p>当函数执行时，压栈，就会有父类引用指向子类对象。满足多态的三个条件。</p>
<p>这样，这个静态方法可以接收任意Animal子类对象。方法的<span style="background-color:pink;">扩展性</span>提高了。</p>
</li>
<li>
<p>弊端</p>
<p>当父类引用调用子类特有的方法时，编译会报错。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327231442989.png" alt="image-20230327231442989"></p>
</li>
</ul>
<h3 id="_15-多态中的转型" tabindex="-1"><a class="header-anchor" href="#_15-多态中的转型" aria-hidden="true">#</a> 15-多态中的转型</h3>
<ul>
<li>
<p>向上转型</p>
<p>从子到父</p>
<p>父类引用指向子类对象</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327232456790.png" alt="image-20230327232456790"></p>
</li>
</ul>
<blockquote>
<p>要解决多态父类引用调用子类特有方法，可以直接创建子类对象,或者向下转型，一般多态只会调用共用方法，不会调用特有方法。</p>
</blockquote>
<ul>
<li>
<p>向下转型</p>
<p>从父到子</p>
<p>父类引用转为子类对象</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327232743877.png" alt="image-20230327232743877"></p>
</li>
</ul>
<h3 id="_16-多态中转型存在的风险和解决方案" tabindex="-1"><a class="header-anchor" href="#_16-多态中转型存在的风险和解决方案" aria-hidden="true">#</a> 16-多态中转型存在的风险和解决方案</h3>
<p>如果被转的引用类型变量，对应的<span style="background-color:pink;">实际类型</span>和<span style="background-color:pink;">目标类型</span>不是同一种类型，那么在转换时会出现<code v-pre>ClassCastException</code></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327233145793.png" alt="image-20230327233145793"></p>
<p>如何解决：</p>
<p>使用<span style="background-color:pink;">instanceof</span>关键字，在强转之前进行判断。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327233229602.png" alt="image-20230327233229602"></p>
<h3 id="_18-内部类-成员内部类" tabindex="-1"><a class="header-anchor" href="#_18-内部类-成员内部类" aria-hidden="true">#</a> 18-内部类-成员内部类</h3>
<p>在类中定义一个类，在A类内部定义一个B类，B类就被称为内部类。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327233915826.png" alt="image-20230327233915826"></p>
<p>内部类可以直接使用外部类的成员变量(包括私有)。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327234136663.png" alt="image-20230327234136663"></p>
<p>内部类的访问特点：</p>
<ul>
<li>
<p>内部类可以直接访问外部类的成员，<span style="background-color:pink;">包括私有</span>。</p>
</li>
<li>
<p>外部类要访问内部类的成员，<span style="background-color:pink;">必须创建对象</span>。</p>
</li>
</ul>
<p>成员内部类外键如何创建对象使用？</p>
<p>注意格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>外部类名<span class="token punctuation">.</span>内部类名 对象名 <span class="token operator">=</span> <span class="token keyword">new</span> 外部类对象<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">new</span> 内部类对象<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_19-私有成员内部类-静态成员内部类" tabindex="-1"><a class="header-anchor" href="#_19-私有成员内部类-静态成员内部类" aria-hidden="true">#</a> 19-私有成员内部类-静态成员内部类</h3>
<p>成员内部类也属于成员，可以被修饰符所修饰，如<code v-pre>private</code>、<code v-pre>static</code></p>
<p><strong>私有成员内部类：</strong></p>
<p>被<code v-pre>private</code>修饰后，直接访问会报错：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327234631458.png" alt="image-20230327234631458"></p>
<p>所以只能在类中通过成员方法来访问：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327234759759.png" alt="image-20230327234759759"></p>
<p><strong>静态成员内部类</strong></p>
<p>对象的创建格式发生了变化：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>外部类名<span class="token punctuation">.</span>内部类名 对象名 <span class="token operator">=</span> <span class="token keyword">new</span> 外部类名<span class="token punctuation">.</span>内部类名<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-03/image-20230327235000265.png" alt="image-20230327235000265"></p>
<p>静态成员内部类中的静态方法可以直接通过类名进行调用：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327235212108.png" alt="image-20230327235212108"></p>
<h3 id="_20-局部内部类" tabindex="-1"><a class="header-anchor" href="#_20-局部内部类" aria-hidden="true">#</a> 20-局部内部类</h3>
<p>在<span style="background-color:pink;">方法中定义</span>的类，外界无法直接使用，需要在<span style="background-color:pink;">方法内部创建并使用</span>，该类可以<span style="background-color:pink;">直接访问外部类的成员</span>，也<span style="background-color:pink;">可以访问方法内的局部变量</span>。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327235707153.png" alt="image-20230327235707153"></p>
<h3 id="_21-匿名内部类" tabindex="-1"><a class="header-anchor" href="#_21-匿名内部类" aria-hidden="true">#</a> 21-匿名内部类</h3>
<p>是一种特殊的局部内部类(在方法的内部)。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230327235922742.png" alt="image-20230327235922742"></p>
<p>正常来说，使用接口中的某个方法， 需要完成以下四步：</p>
<ul>
<li>创建实现类，通过implements关键字去实现接口</li>
<li>重写方法</li>
<li>创建实现类对象</li>
<li>实现类对象调用重写后的方法</li>
</ul>
<p>如果使用匿名内部类，就可以简化成一步。</p>
<p>匿名内部类的理解：将<span style="background-color:pink;">继承或实现</span>、<span style="background-color:pink;">方法重写</span>、<span style="background-color:pink;">创建对象</span>三步放在了一步进行。</p>
<p>现在有Inter接口：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">Inter</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下代码就是创建了匿名内部类作为实现类，并创建了该实现类对象：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">Inter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这时候编译器会提示需要重写方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">Inter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 重写的内容</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面创建了一个匿名内部类对象，该内部类实现了接口中的方法。</p>
<p>既然是一个对象，就可以直接调用：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">Inter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 重写的内容</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果匿名内部类中重写了多个方法，可以使用接口的引用进行接收(父类引用/接口类型引用)，再按需调用。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328000848399.png" alt="image-20230328000848399"></p>
<h3 id="_22-匿名内部类的使用场景" tabindex="-1"><a class="header-anchor" href="#_22-匿名内部类的使用场景" aria-hidden="true">#</a> 22-匿名内部类的使用场景</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328001123760.png" alt="image-20230328001123760"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328001304300.png" alt="image-20230328001304300"></p>
<h3 id="_23-lambda初体验和函数式编程思想" tabindex="-1"><a class="header-anchor" href="#_23-lambda初体验和函数式编程思想" aria-hidden="true">#</a> 23-Lambda初体验和函数式编程思想</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328222604670.png" alt="image-20230328222604670"></p>
<p>函数式编程思想和面向对象思想的区别：</p>
<p>面向对象思想，更多关注应该怎么用，怎么满足传参要求，而函数式编程更多关注的是重写函数后，里面的内容。</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328222729447.png" alt="image-20230328222729447"></p>
<blockquote>
<p>数学中，函数就是有输入量、输出量的一套计算方案，也就是<code v-pre>拿数据做操作</code></p>
<p>面向对象思想强调的是必须通过对象的<span style="background-color:pink;">形式</span>来做事情</p>
<p>函数式思想则尽量忽略面向对象的复杂语法，强调<span style="background-color:pink;">做什么</span>，而不是以什么形式去做</p>
</blockquote>
<h3 id="_24-lambda表达式的格式说明和前提条件" tabindex="-1"><a class="header-anchor" href="#_24-lambda表达式的格式说明和前提条件" aria-hidden="true">#</a> 24-Lambda表达式的格式说明和前提条件</h3>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328223316992.png" alt="image-20230328223316992"></p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328223421689.png" alt="image-20230328223421689"></p>
<p>lambda表达式的使用前提</p>
<ul>
<li>有一个接口</li>
<li>接口中<span style="background-color:pink;">有且仅有一个抽象方法</span></li>
</ul>
<h3 id="_25-lambda练习-带参无返回值" tabindex="-1"><a class="header-anchor" href="#_25-lambda练习-带参无返回值" aria-hidden="true">#</a> 25- lambda练习-带参无返回值</h3>
<p>定义个接口，有且仅有一个方法，再定义一个静态方法，参数是接口类型， 分别使用匿名内部类和lambda进行实现：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 匿名内部类</span>
        <span class="token function">invokeSayWords</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Inter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sayWords</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"匿名内部类："</span><span class="token operator">+</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 函数式编程lambda</span>
        <span class="token function">invokeSayWords</span><span class="token punctuation">(</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"lambda："</span><span class="token operator">+</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">invokeSayWords</span><span class="token punctuation">(</span><span class="token class-name">Inter</span> inter<span class="token punctuation">)</span><span class="token punctuation">{</span>
        inter<span class="token punctuation">.</span><span class="token function">sayWords</span><span class="token punctuation">(</span><span class="token string">"哈哈"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Inter</span><span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 说话
     *
     * <span class="token keyword">@param</span> <span class="token parameter">msg</span> 消息
     */</span>
    <span class="token keyword">void</span> <span class="token function">sayWords</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-03/image-20230328225218699.png" alt="image-20230328225218699"></p>
<h3 id="_26-lambda练习-无参带返回值" tabindex="-1"><a class="header-anchor" href="#_26-lambda练习-无参带返回值" aria-hidden="true">#</a> 26- lambda练习-无参带返回值</h3>
<p>编写一个接口，无参，带int返回值，产生随机数，分别使用匿名内部类和函数式编程进行实现：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 匿名内部类</span>
        <span class="token function">invokeRandomNumHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RandomNumHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">Random</span> random <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> i <span class="token operator">=</span> random<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> i<span class="token punctuation">;</span>
                <span class="token comment">// 注意如果接口中的方法需要返回值，匿名内部类的方法体也需要有返回值，否则报错</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// lambda表达式</span>
        <span class="token function">invokeRandomNumHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">Random</span> random <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> random<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> i<span class="token punctuation">;</span>
            <span class="token comment">// 注意如果接口中的方法需要返回值，lambda的方法体也需要有返回值，否则报错</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">invokeRandomNumHandler</span><span class="token punctuation">(</span><span class="token class-name">RandomNumHandler</span> randomNumHandler<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> number <span class="token operator">=</span> randomNumHandler<span class="token punctuation">.</span><span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">RandomNumHandler</span><span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 获取随机数
     *
     * <span class="token keyword">@return</span> int
     */</span>
    <span class="token keyword">int</span> <span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-03/image-20230328225932488.png" alt="image-20230328225932488"></p>
<h3 id="_27-lambda练习-带参带返回值" tabindex="-1"><a class="header-anchor" href="#_27-lambda练习-带参带返回值" aria-hidden="true">#</a> 27- lambda练习-带参带返回值</h3>
<p>定义一个接口，有且仅有一个方法，用于计算两个int相加，分别使用匿名内部类和lambda实现：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test3</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 匿名内部类</span>
        <span class="token function">invokeCalc</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Calc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// lambda</span>
        <span class="token function">invokeCalc</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">invokeCalc</span><span class="token punctuation">(</span><span class="token class-name">Calc</span> calc<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> res <span class="token operator">=</span> calc<span class="token punctuation">.</span><span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Calc</span><span class="token punctuation">{</span>

    <span class="token keyword">int</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://www.iocaop.com/images/2023-03/image-20230328230635305.png" alt="image-20230328230635305"></p>
<h3 id="_28-lambda的省略模式" tabindex="-1"><a class="header-anchor" href="#_28-lambda的省略模式" aria-hidden="true">#</a> 28-lambda的省略模式</h3>
<p>省略规则：</p>
<ul>
<li>参数类型可以省略，但是有多个参数的情况下，<span style="background-color:pink;">不能只省略一个</span></li>
<li>如果参数有且仅有一个，小括号可以省略</li>
<li>如果代码块只有一条语句，可以省略大括号和分号，甚至return</li>
</ul>
<h3 id="_29-lambda表达式和匿名内部类的区别" tabindex="-1"><a class="header-anchor" href="#_29-lambda表达式和匿名内部类的区别" aria-hidden="true">#</a> 29-lambda表达式和匿名内部类的区别</h3>
<p>所属类型不同</p>
<ul>
<li>匿名内部类：可以是<span style="background-color:pink;">接口</span>，也可以是<span style="background-color:pink;">抽象类</span>，还可以是<span style="background-color:pink;">具体类</span></li>
<li>Lambda表达式：<span style="background-color:pink;">只能是接口</span></li>
</ul>
<p>使用限制不同：</p>
<ul>
<li>如果接口中有且仅有一个抽象方法，可以使用Lambda表达式，也可以使用匿名内部类</li>
<li>如果接口中<span style="background-color:pink;">多于一个抽象方法</span>，只能使用匿名内部类，<span style="background-color:pink;">不能使用Lambda表达式</span></li>
</ul>
<p>实现原理不同：</p>
<ul>
<li>匿名内部类：编译之后<span style="background-color:pink;">不能使用Lambda表达式</span>一个单独的<code v-pre>class</code>字节码文件</li>
<li>Lambda表达式：编译以后<span style="background-color:pink;">没有</span>单独的<code v-pre>class</code>字节码文件，对应的<span style="background-color:pink;">字节码</span>会在<span style="background-color:pink;">运行的时候动态生成</span></li>
</ul>
<p>Lambda不会单独产生字节码文件：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328232056855.png" alt="image-20230328232056855"></p>
<p>匿名内部类会产生单独的字节码文件：</p>
<p><img src="http://www.iocaop.com/images/2023-03/image-20230328232211607.png" alt="image-20230328232211607"></p>
</div></template>


