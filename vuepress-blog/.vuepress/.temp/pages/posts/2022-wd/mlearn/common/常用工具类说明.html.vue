<template><div><h1 id="常用工具类说明" tabindex="-1"><a class="header-anchor" href="#常用工具类说明" aria-hidden="true">#</a> 常用工具类说明</h1>
<h2 id="org-apache-commons-io-ioutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-io-ioutils" aria-hidden="true">#</a> org.apache.commons.io.IOUtils</h2>
<ul>
<li>closeQuietly：关闭一个IO流、socket、或者selector且不抛出异常，通常放在finally块</li>
<li>toString：转换IO流、 Uri、 byte[]为String</li>
<li>copy：IO流数据复制，从输入流写到输出流中，最大支持2GB</li>
<li>toByteArray：从输入流、URI获取byte[]</li>
<li>write：把字节. 字符等写入输出流</li>
<li>toInputStream：把字符转换为输入流</li>
<li>readLines：从输入流中读取多行数据，返回List<String></li>
<li>copyLarge：同copy，支持2GB以上数据的复制</li>
<li>lineIterator：从输入流返回一个迭代器，根据参数要求读取的数据量，全部读取，如果数据不够，则失败</li>
</ul>
<h2 id="org-apache-commons-io-fileutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-io-fileutils" aria-hidden="true">#</a> org.apache.commons.io.FileUtils</h2>
<ul>
<li>deleteDirectory：删除文件夹</li>
<li>readFileToString：以字符形式读取文件内容</li>
<li>deleteQueitly：删除文件或文件夹且不会抛出异常</li>
<li>copyFile：复制文件</li>
<li>writeStringToFile：把字符写到目标文件，如果文件不存在，则创建</li>
<li>forceMkdir：强制创建文件夹，如果该文件夹父级目录不存在，则创建父级</li>
<li>write：把字符写到指定文件中</li>
<li>listFiles：列举某个目录下的文件(根据过滤器)</li>
<li>copyDirectory：复制文件夹</li>
<li>forceDelete：强制删除文件</li>
</ul>
<h2 id="org-apache-commons-lang-stringutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-lang-stringutils" aria-hidden="true">#</a> org.apache.commons.lang.StringUtils</h2>
<ul>
<li>isBlank：字符串是否为空 (trim后判断)</li>
<li>isEmpty：字符串是否为空 (不trim并判断)</li>
<li>equals：字符串是否相等</li>
<li>join：合并数组为单一字符串，可传分隔符</li>
<li>split：分割字符串</li>
<li>EMPTY：返回空字符串</li>
<li>trimToNull：trim后为空字符串则转换为null</li>
<li>replace：替换字符串</li>
</ul>
<h2 id="org-apache-http-util-entityutils" tabindex="-1"><a class="header-anchor" href="#org-apache-http-util-entityutils" aria-hidden="true">#</a> org.apache.http.util.EntityUtils</h2>
<ul>
<li>toString：把Entity转换为字符串</li>
<li>consume：确保Entity中的内容全部被消费。可以看到源码里又一次消费了Entity的内容，假如用户没有消费，那调用Entity时候将会把它消费掉</li>
<li>toByteArray：把Entity转换为字节流</li>
<li>consumeQuietly：和consume一样，但不抛异常</li>
<li>getContentCharset：获取内容的编码</li>
</ul>
<h2 id="org-apache-commons-lang3-stringutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-lang3-stringutils" aria-hidden="true">#</a> org.apache.commons.lang3.StringUtils</h2>
<ul>
<li>isBlank：字符串是否为空 (trim后判断)</li>
<li>isEmpty：字符串是否为空 (不trim并判断)</li>
<li>equals：字符串是否相等</li>
<li>join：合并数组为单一字符串，可传分隔符</li>
<li>split：分割字符串</li>
<li>EMPTY：返回空字符串</li>
<li>replace：替换字符串</li>
<li>capitalize：首字符大写</li>
</ul>
<h2 id="org-apache-commons-io-filenameutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-io-filenameutils" aria-hidden="true">#</a> org.apache.commons.io.FilenameUtils</h2>
<ul>
<li>getExtension：返回文件后缀名</li>
<li>getBaseName：返回文件名，不包含后缀名</li>
<li>getName：返回文件全名</li>
<li>concat：按命令行风格组合文件路径(详见方法注释)</li>
<li>removeExtension：删除后缀名</li>
<li>normalize：使路径正常化</li>
<li>wildcardMatch：匹配通配符</li>
<li>seperatorToUnix：路径分隔符改成unix系统格式的，即/</li>
<li>getFullPath：获取文件路径，不包括文件名</li>
<li>isExtension：检查文件后缀名是不是传入参数(List<String>)中的一个</li>
</ul>
<h2 id="org-springframework-util-stringutils" tabindex="-1"><a class="header-anchor" href="#org-springframework-util-stringutils" aria-hidden="true">#</a> org.springframework.util.StringUtils</h2>
<ul>
<li>hasText：检查字符串中是否包含文本</li>
<li>hasLength：检测字符串是否长度大于0</li>
<li>isEmpty：检测字符串是否为空（若传入为对象，则判断对象是否为null）</li>
<li>commaDelimitedStringToArray：逗号分隔的String转换为数组</li>
<li>collectionToDelimitedString：把集合转为CSV格式字符串</li>
<li>replace 替换字符串</li>
<li>delimitedListToStringArray：相当于split</li>
<li>uncapitalize：首字母小写</li>
<li>collectionToDelimitedCommaString：把集合转为CSV格式字符串</li>
<li>tokenizeToStringArray：和split基本一样，但能自动去掉空白的单词</li>
</ul>
<h2 id="org-apache-commons-lang-arrayutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-lang-arrayutils" aria-hidden="true">#</a> org.apache.commons.lang.ArrayUtils</h2>
<ul>
<li>contains：是否包含某字符串</li>
<li>addAll：添加整个数组</li>
<li>clone：克隆一个数组</li>
<li>isEmpty：是否空数组</li>
<li>add：向数组添加元素</li>
<li>subarray：截取数组</li>
<li>indexOf：查找某个元素的下标</li>
<li>isEquals：比较数组是否相等</li>
<li>toObject：基础类型数据数组转换为对应的Object数组</li>
</ul>
<h2 id="org-apache-commons-lang-stringescapeutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-lang-stringescapeutils" aria-hidden="true">#</a> org.apache.commons.lang.StringEscapeUtils</h2>
<ul>
<li>unescapeHtml4：转义html</li>
<li>escapeHtml4：反转义html</li>
<li>escapeXml：转义xml</li>
<li>unescapeXml：反转义xml</li>
<li>escapeJava：转义unicode编码</li>
<li>escapeEcmaScript：转义EcmaScript字符</li>
<li>unescapeJava：反转义unicode编码</li>
<li>escapeJson：转义json字符</li>
<li>escapeXml10：转义Xml10</li>
<li>这个现在已经废弃了，建议使用commons-text包里面的方法</li>
</ul>
<h2 id="org-apache-http-client-utils-urlencodedutils" tabindex="-1"><a class="header-anchor" href="#org-apache-http-client-utils-urlencodedutils" aria-hidden="true">#</a> org.apache.http.client.utils.URLEncodedUtils</h2>
<ul>
<li>format：格式化参数，返回一个HTTP POST或者HTTP PUT可用application/x-www-form-urlencoded字符串</li>
<li>parse：把String或者URI等转换为List<NameValuePair></li>
</ul>
<h2 id="org-apache-commons-codec-digest-digestutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-codec-digest-digestutils" aria-hidden="true">#</a> org.apache.commons.codec.digest.DigestUtils</h2>
<ul>
<li>md5Hex：MD5加密，返回32位字符串</li>
<li>sha1Hex：SHA-1加密</li>
<li>sha256Hex：SHA-256加密</li>
<li>sha512Hex：SHA-512加密</li>
<li>md5：MD5加密，返回16位字符串</li>
</ul>
<h2 id="org-apache-commons-collections-collectionutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-collections-collectionutils" aria-hidden="true">#</a> org.apache.commons.collections.CollectionUtils</h2>
<ul>
<li>isEmpty：是否为空</li>
<li>select：根据条件筛选集合元素</li>
<li>transform：根据指定方法处理集合元素，类似List的map()</li>
<li>filter：过滤元素，雷瑟List的filter()</li>
<li>find：基本和select一样</li>
<li>collect：和transform 差不多一样，但是返回新数组</li>
<li>forAllDo：调用每个元素的指定方法</li>
<li>isEqualCollection：判断两个集合是否一致</li>
</ul>
<h2 id="org-apache-commons-lang3-arrayutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-lang3-arrayutils" aria-hidden="true">#</a> org.apache.commons.lang3.ArrayUtils</h2>
<ul>
<li>contains：是否包含某个字符串</li>
<li>addAll：添加整个数组</li>
<li>clone：克隆一个数组</li>
<li>isEmpty：是否空数组</li>
<li>add：向数组添加元素</li>
<li>subarray：截取数组</li>
<li>indexOf：查找某个元素的下标</li>
<li>isEquals：比较数组是否相等</li>
<li>toObject：基础类型数据数组转换为对应的Object数组</li>
</ul>
<h2 id="org-apache-commons-beanutils-propertyutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-beanutils-propertyutils" aria-hidden="true">#</a> org.apache.commons.beanutils.PropertyUtils</h2>
<ul>
<li>getProperty：获取对象属性值</li>
<li>setProperty：设置对象属性值</li>
<li>getPropertyDiscriptor：获取属性描述器</li>
<li>isReadable：检查属性是否可访问</li>
<li>copyProperties：复制属性值，从一个对象到另一个对象</li>
<li>getPropertyDiscriptors：获取所有属性描述器</li>
<li>isWriteable：检查属性是否可写</li>
<li>getPropertyType：获取对象属性类型</li>
</ul>
<h2 id="org-apache-commons-beanutils-beanutils" tabindex="-1"><a class="header-anchor" href="#org-apache-commons-beanutils-beanutils" aria-hidden="true">#</a> org.apache.commons.beanutils.BeanUtils</h2>
<ul>
<li>copyPeoperties：复制属性值，从一个对象到另一个对象</li>
<li>getProperty：获取对象属性值</li>
<li>setProperty：设置对象属性值</li>
<li>populate：根据Map给属性复制</li>
<li>copyPeoperty：复制单个值，从一个对象到另一个对象</li>
<li>cloneBean：克隆bean实例</li>
</ul>
</div></template>


