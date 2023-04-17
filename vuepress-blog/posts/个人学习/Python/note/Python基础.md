---
title: Python基础
date: 2022-06-30
category:
  - python
---

#### python语言介绍

* 编译型语言和解释型语言的区别

  编译型：把程序转成机器可以执行的语言，如c->汇编->机器码，编译一次之后可以脱离编译环境。

  解释型语言:程序在运行时，把程序转成机器可以执行的语言，一边解释，一遍运行，运行时需要带上编译器。

  比喻：外国人读金瓶梅，编译型：整本书翻译，读的时候可以一下读完。解释型：带个翻译官，边翻译边读，每次读都需要带上翻译官。

  ![image-20220617203450149](http://www.iocaop.com/images/2022-08/202208182352343.png)

#### 基础语法

```python
for i in range(10):
    print("run",i)
```

#### 基本数据类型

![image-20220617215212791](http://www.iocaop.com/images/2022-08/202208182352094.png)

* 整型：![image-20220617220209512](http://www.iocaop.com/images/2022-08/202208182352168.png)

* 字符串

  * python中所有加了引号的字符都是字符串

  * 字符串的特性：

    * 1、不可修改(只是把原来变量的指向改变了，而并没有在内存中修改字符串的值) 

    * 2、有索引，可切片(有下表，可以substring)

      ```python
      >>> name = "lzcnb"
      >>> name
      'lzcnb'
      >>> id(name)
      1941796141552
      # id是一个函数，相当于C语言中的&，取内存地址
      >>> name = "lzc123"
      >>> id(name)
      1941796142128
      # 可以看出两次地址不一样，实际改变的是指针的指向，而不是改变了字符串的值
      >>> name[1]
      'z'
      # 按下标取
      >>> name[1:3]
      'zc'
      # 字符串截取，相当于Java中的substring 取首不取尾
      >>> name[0] = "1"
      Traceback (most recent call last):
        File "<stdin>", line 1, in <module>
      TypeError: 'str' object does not support item assignment
      # 不可更改，不像C语言中的字符串数组。python中不可更改
      ```

    * 多行字符串

      用三个单引号或双引号包裹

      ```python
      >>> name = """lzc
      ... nb
      ... 123"""
      >>> name
      'lzc\nnb\n123'
      >>>
      ```

    * 字符串拼接，使用+即可

    * 引用外部变量

      ```python
      name ="赖卓成"
      age = 24
      school = "南大科院"
      
      # 现在想打印出我的个人信息 格式如下，如何实现？
      # --------个人信息---------
      # 姓名: 赖卓成
      # 年龄：24
      # 学校：南大科院
      # ------------------------
      print("python2输出个人信息")
      msg = """
      --------个人信息---------
      姓名: %s
      年龄：%d
      学校：%s
      ------------------------
      """%(name,age,school)
      # 需要注意 结束的时候有个百分号，不要漏了
      print(msg)
      
      print("python3输出个人信息")
      # 上面是python2的写法 python3写法如下
      msg = f"""
      --------个人信息---------
      姓名: {name}
      年龄：{age}
      学校：{school}
      ------------------------
      """
      print(msg)
      ```

* 布尔

  ```python
  score =10
  if score>=10:
      print("score大于等于10")
  else :
      print("score小于10")
  ```

* 列表

  * 基本存取

  ```python
  nameList = ["name0","name1","name2","name3","name4"]
  print(nameList[0])
  # 索引取，结果："name0"
  
  print(nameList)
  #全部输出，结果：['name0', 'name1', 'name2', 'name3', 'name4']
  
  for name in nameList:
      print(name)
  # 遍历，结果：
  # name0
  # name1
  # name2
  # name3
  # name4
  ```

  * crud

    * 增加 

      nameList.append(值),nameList.insert(下标,值);

      ```python
      nameList.append("name5")
      nameList.insert(0,"name00")    
      print(nameList)
      # append是追加 insert 在指定下标插入某个值
      # 结果：['name00', 'name0', 'name1', 'name2', 'name3', 'name4', 'name5']
      ```

    * 修改

      nameList[下标]  = "值"

      ```python
      nameList[0] = "name000"
      print(nameList)
      #结果：['name000', 'name0', 'name1', 'name2', 'name3', 'name4', 'name5']
      ```

    * 查

      nameList.index(值)，返回下标

      ```python
      index = nameList.index("name5")
      print(f"name5的下标为{index}")
      # 结果 :name5的下标为6
      ```

    * 删除

      del 变量名、del nameList[下标]， nameList.remove(值)

      ```python
      nameList.remove("name2")
      print(nameList)
      # 结果： ['name000', 'name0', 'name1', 'name3', 'name4', 'name5']
      del nameList[0]
      print(nameList)
      # 结果：['name0', 'name1', 'name3', 'name4', 'name5']
      ```

    * 切片

      ```python
      subNameList = nameList[1:3]
      print(subNameList)
      # 结果：['name1', 'name3'] 取首不取尾
      
      subNameList = nameList[-3:-1]
      print(subNameList)
      # 结果：['name3', 'name4'] 取首不取尾 倒数取
      subNameList = nameList[-3:]
      print(subNameList)
      # 结果：['name3', 'name4'] 取首不取尾 倒数取 不写默认是倒数第一个
      ```

    * 嵌套

      python的列表可以嵌套，没有泛型

      ```python
      nameList.append(["赖卓成",12,312,"nb"])
      print(nameList)
      # 结果： ['name0', 'name1', 'name3', 'name4', 'name5', ['赖卓成', 12, 312, 'nb']]
      
      #嵌套修改
      nameList[-1][-2] = 123
      print(nameList)
      # 结果：['name0', 'name1', 'name2', 'name3', 'name4', ['赖卓成', 12, 123, 'nb']]
      ```

#### 常用运算符

```python
# 100内的偶数
for i in range(100):
    if i % 2 ==0:
        print(i)
# 2的8次方
print(2**8)
# 整除 返回商的整数部分
print(10//3)
# 不整除
print(10/3)
# 集合中是否存在成员
print("name1" in nameList)
# True
print("name10" in nameList)
# False
```

#### 接收用户指令

```python
# 读取用户信息并打印
name = input("请输入用户名：").strip()
age = input("请输入年龄：").strip()
school = input("请输入学校：").strip()
# .strip()去除空格
msg = f"""
---------个人信息---------
姓名:{name}
年龄:{age}
学校:{school}
-------------------------
"""

print(msg)
# 运行结果如下：
# 请输入用户名：赖卓成
# 请输入年龄：24
# 请输入学校：南大科院
# 
# ---------个人信息---------
# 姓名:赖卓成
# 年龄:24
# 学校:南大科院
# -------------------------
# age输入进来的字符串类型 需要转成int型
ageInt = int(age)
print(type(ageInt))
#结果： <class 'int'>
# isdigit()判断是否为数字
```

#### 流程控制

```python
budget = int(input("你有多少钱？ 输入数字"))
if budget >=1298:
    print("可以尝试2398的，服务好")
elif budget>=688:
    print("688的性价比高")
else:
    print("搞不了搞不了")    

```

#### 基础阶段作业

* 作业1： 猜年龄游戏

  ```python
  print("你有10次机会猜年龄")
  for i in range(10):
       age = input("请输入你猜的年龄:")
       if age.isdigit() :
          # 假设年龄是24
          age = int(age)
          if age > 24:
              print("太大了")
          elif age <24: 
              print("太小了")
          elif age ==24:
              print("猜对了")
              break
       else:
          print("输入错误，请输入数字")
  ```

* 作业2 ：读取 用户输入的工资，根据工资打印字符串

  ```python
  for i in range(10):
      salary = input("请输入你的工资:")
      if salary.isdigit:
          salary = int(salary)
          if salary == 1000:
              print("老板,我是你爹")
          elif salary == 2000:
              print("老板,wqnmlgbxxx")
          elif salary ==5000:
              print("老板脑子有坑，背后说坏话")   
          elif salary ==10000:
              print("老板说的有点点问题，但我不说话")
          elif salary == 20000:
              print("老板说啥就是啥吧，给钱就行") 
          elif salary == 30000:
              print("老板老板说什么都是对的。如果有人错了，那一定是我") 
          elif salary == 50000:
              print("996就像呼吸一样自然")    
          elif salary == 100000:
              print("公司就是我家")
          else:
              print("无法判断")
      else:
          print("输入错误")    
  ```

#### for循环

```python
for i in range(10):
    print(i)
# range(10)是生成了一个列表[0,1,2,3,4,5,6,7,8,9]    
# 把列表里的每一个变量赋值给了i

for name in ["name0", "name1", "name2"]:
    print(name)
# 将列表里的每个值 赋值给name 然后输出

for char in "abcdefg":
    print(char)
# 字符串每个下标对应的字符赋值给char然后输出

# 打印50到100的偶数
for i in range(50, 100):
    if i % 2 == 0:
        print(i)
        
# 打印50到100的偶数 倒序
for i in range(100, 50, -1):
    if i % 2 == 0:
        print(i)
        
```

#### 嵌套循环

```python
#  打印楼层
for floor in range(1, 6):
    print(f"当前在{floor}层".center(50, "-"))
    for room in range(1,10):
        print(f"当前在{floor}0{room}室")
```

#### break和continue

* continue 结束本次循环

```python
#  打印楼层
for floor in range(1, 6):
    print(f"当前在{floor}层".center(50, "-"))
    if floor == 3:
        continue  # 停止本次循环，进入下次循环
    for room in range(1, 10):
        print(f"当前在{floor}0{room}室")

```

* break 结束整个循环

```python
#  打印楼层
for floor in range(1, 6):
    print(f"当前在{floor}层".center(50, "-"))
    if floor == 3:
        print("不走3层")
        continue  # 停止本次循环，进入下次循环
    for room in range(1, 10):
        if floor == 4 and room == 4:
            print("到404之后不走4层")
            break
        print(f"当前在{floor}0{room}室")
```

#### 打印99乘法表

```python
# 打印99乘法表
for i in range(1, 10):
    for j in range(1, i+1):
        print(f"{i}*{j}=", i * j, end=" ")
    print()
```

#### 打印100内的素数

```python
# 打印100内的素数
for i in range(2, 101):
    flag = True
    for j in range(2, i):
        if i % j == 0:
            flag = False
            break
    if flag:
        print(f"{i}是素数")
```

#### 打印三角形

```python
# 打印三角形
n = int(input("输入数字："))
print()
for i in range(1, n *2):
    if i < n:
        print("* " * i)
    else:
        print("* " * (n * 2 - i))
```

#### while循环猜年龄

允许用户猜3次，若还不对，告诉他你真笨，还想继续猜么？如果用户选择yes，就让他继续猜，no就退出

```python
# 允许用户猜3次，若还不对，告诉他你真笨，还想继续猜么？如果用户选择yes，就让他继续猜，no就退出
while True:
    i = 0
    while i < 3:
        num = int(input("请输入数字:"))
        if num != 9:
            i += 1
            print("猜错了")
        else:
            print("猜对了")
            exit()
    str = input("你真笨，想继续猜3次吗？输入y继续")
    if str == "y":
        i = 0
    else:
        exit()

```

#### for else和while else

当循环正常结束时执行else中的语句，没有被break或exit，正常走完。

```python
for i in range(10):
    print(i)
else:
    print("循环正常结束")

for i in range(10):
    print(i)
    if i == 3:
        break
# 跳出了循环，else中的语句不会执行
else:
    print("循环正常结束")
```

```python
i = 0
while i < 3:
    i += 1
    print(i)
else:
    print("循环正常结束")

i = 0
while i < 3:
    i += 1
    print(i)
    if i == 2:
        break
    # 跳出了循环 else不会执行
else:
    print("循环正常结束")
```

```python
# for else 求100内的素数

for i in range(2,101):
    for j in range(2,i):
        if i%j ==0:
            break
    else:
        print(f"{i}是素数")
```

#### 基础语法阶段练习

* 1、万本金，利息0.0325每年，问连本带息多少年能翻倍？

  ```python
  # 本金
  base = 10000
  # 利率
  interest = 0.0325
  year = 0
  while base < 20000:
      base = base + base * interest
      year += 1
  print(year)
  ```

* 2、一个小球，从100米高空坠落，每次反弹会原来一半高度，问第10次反弹完，小球经过多少米？

  ```python
  # 一个小球，从100米高空坠落，每次反弹会原来一半高度，问第10次反弹完，小球经过多少米？
  height = 100
  sum = 100
  for i in range(10):
      height = height / 2
      sum += height * 2
  print(sum)
  ```

* 3、有一堆桃子，猴子每天吃桃子总数的一半并多吃一个，吃了10天，到第11天只剩一个，问猴子吃之前，一共有多少个桃子。

  ```python
  i = 0
  count = 1
  while i < 10:
      count = (count + 1) * 2
      i += 1
  print(count)
  ```

* 4、计算1-2+3-4+5-6+7-8.....100的和

  ```python
  # 计算1-2+3-4+5-6+7-8.....100的和
  sum = 1
  for i in range(2, 101):
      if (i % 2 == 0):
          sum -= i
      else:
          sum += i
  print(sum)
  ```

* 5、求列表中的最大值

  ```python
  data = [1, 2, 4, 5, 6, 34, 7, 7, 2, 56, 64, 43, 6, 76, 84, 52]
  maxValue = data[0]
  minValue = data[0]
  for num in data:
      if num > maxValue:
          maxValue = num
      if num < minValue:
          minValue = num
  print(f"最大值:{maxValue},最小值:{minValue}")
  ```

* 6、从两个列表中各取一个数，如果这两个数的和等于10，则以列表的方式输出这两个数

  ```python
  num1 = [1, 2, 4, 5, 6, -1, -3, -4, -5, -6, 32, 11, 4, 13]
  num2 = [-3, 10, 0, 12, 3, -2, -3, -4, -5, 4, -20, -22]
  
  for value1 in num1:
      for value2 in num2:
          if value1 + value2 == 10:
              result = [value1, value2]
              print(result)
  ```

#### 字符串

##### 字符串格式化方法

```python
s1 = "laizhuocheng"
s2 = "LaiZhuoCheng"
s3 = "lai\tzhuo\tcheng"
s4 = "        laizhuocheng                 "
# 首字母大写
print(s1.capitalize())
# 方便字符串之前比较，全变成小写
print(s2.casefold())
# 规定字符串长度，两边填充字符
print(s1.center(50, "-"))
# 转换制表符，可以指定转换长度
print(s3.expandtabs(20))
# 将原本的字符串往左边移动，然后填充字符
print(s1.ljust(40, "-"))
# 将原本的字符串往右边移动，然后填充字符
print(s1.rjust(40, "-"))
# 全变小写
print(s2.lower())
# 大小写互换
print(s2.swapcase())
# 单词首字母大写
print(s1.title())
# 小写全改成大写
print(s1.upper())
# 规定字符串长度，不够的用0补充,从左边开始
print(s1.zfill(50))
# 两边去空格
print(s4.strip())
# 左边去空格
print(s4.lstrip())
# 右边去空格
print(s4.rstrip())
# 引用外部变量
msg = "my name is {s1},age={age}"
print(msg.format(s1=s1,age=24))
```

##### 字符串判断方法

```python
# 是否以某字符串开头
print(s1.startswith("lai"))
# 是否以某字符串结束
print(s1.endswith("cheng"))
s5 = "laizhuocheng123"
# 是否全是字母或数字
print(s5.isalnum())
# 是否全是字母
print(s5.isalpha())
print(s1.isalpha())
# 是不是整数
s6 = "4156456"
print(s6.isdigit())
# 如何判断是否是小数？直接强转，如果不报错就是小数

# 判断字符串是否为合法的变量名
s7 = "1if"
print(s7.isidentifier())
# 是否全小写
print(s1.islower())
print(s2.islower())
# 是否是数字 与isdigit()有什么区别？中文也可以
s8 = "二十五"
print(s8.isnumeric())
# 是否可以打印，比如图片不可以打印
print(s1.isprintable())
# 是不是空格
s9 = "         "
print(s9.isspace())
# 是不是首字母大写
print("Hello Jack".istitle())
# 是不是全大写
print("HELLo".isupper())
```

##### 字符串查、改、计数、替换

```python
# 查找 返回下标
print("laizhuocheng".find("i"))
# 切片查找，从3开始到最后
print("laizhuochenglaizhuocheng".find("i", 3, -1))
# 从右边开始找
print("laizhuochenglaizhuocheng".rfind("i"))
# 查找字符串的索引 与find的区别：find找不到返回-1 index找不到直接报错
print("laizhuochenglaizhuocheng".index("i"))
# 报错实例
# print("laizhuochenglaizhuocheng".index("A"))
# rindex从右边开始找
print("laizhuochenglaizhuocheng".rindex("i"))
# 某个字符串出现几次
print("laizhuochenglaizhuocheng".count("a"))
# count也可以切片计数 如从第3个开始到最后
print("laizhuochenglaizhuocheng".count("a", 3, -1))
# 切片
print("laizhuochenglaizhuocheng".split("g"))
# 从右边开始切
print("laizhuochenglaizhuocheng".rsplit("g"))
# 按照行切片
print("lai\nzhuo\ncheng".splitlines())
# 去掉前缀
print("--laizhuocheng--".removeprefix("--"))
# 去掉后缀
print("--laizhuocheng--".removesuffix("--"))
# 字符串替换 默认全部替换
print("--laizhuocheng--".replace("-", "*"))
# 字符串替换可以指定替换多少次
print("--laizhuocheng--".replace("-", "*", 1))
```

##### 字符串特殊方法

```python
# 把列表转成字符串，在每个元素中拼接指定字符串
names = ["lai","zhuo","cheng"]
print("-".join(names))
```

密码加密，首先定义可能用到的字符，用来替换的字符，然后生成密码本，在需要加密的字符串上调用加密方法，传入密码本，即可完成加密。

```python
# 加密前可能用到的字符
source = "abcdefghij"
# 加密之后替换的字符(将可能用到的字符替换为下面的字符)
output = "0123456789"
# 生成密码本 source和output长度要一样  生成后ASCII码做了变换
passwordTable = str.maketrans(source, output)
print(passwordTable)

print("laizhuocheng".translate(passwordTable))

# 所有可打印的字符
source2 = string.printable
print(source2)

# 反转
output2 = string.printable[::-1]
print(output2)

passwordTable2 = str.maketrans(source2, output2)

print("laizhuocheng".translate(passwordTable2))
```

解密

```python
# 解密，可能用到的字符串和用来替换的字符串反过来就好了
print("l08z7uo274n6".translate(str.maketrans(output, source)))
```

统计字符

```python
# 统计字符串中字母、数字、空格、其他字符的个数

numCount = 0;
alphaCount = 0;
spaceCount = 0;
otherCount = 0;
while True:
    msg = input("输入字符串")
    for char in msg:
        if char.isdigit():
            numCount += 1
        elif char.isalpha():
            alphaCount += 1
        elif char.isspace():
            spaceCount += 1
        else: otherCount+=1
    print(f"数字{numCount}个,字母{alphaCount}个,空格{spaceCount}个,其他{otherCount}个")
```

#### 列表

##### 增

```python
# 追加
data = ["11", "22"]
data.append("33")
print(data)
# 插入 在指定下标插入某个值
data.insert(0, "00")
print(data)
```

将字符串转成列表：将每一个字符作为列表的元素：

```python
name = "laizhuocheng"
print(list(name))
# 结果：['l', 'a', 'i', 'z', 'h', 'u', 'o', 'c', 'h', 'e', 'n', 'g']
```

##### 删除

```python
# clear 清空
nameList.clear()
print(nameList)

# pop 默认删除最后一个元素并返回 可以指定删除某个元素，传入下标即可
nameList = list(name)
print(nameList.pop())
print(nameList)
print(nameList.pop(-3), nameList)

# remove 删除指定的值，从左到右删除第一个,没有返回值
strList = list("abcabc")
strList.remove("a")
print(strList)

# del 可以删除变量，也可以用来删除列表
del strList

```

##### 改(切片)

```python
# 切片
nameList = list("laizhuocheng")
# 正着切，从左边开始取，取左不取右。生成新的列表，左边不写则默认第0个，右边不写则默认取到最后一个
print(nameList[0: 2])
print(nameList[0:])
print(nameList[:5])
# 跳着切，如隔两个取一个
print(nameList[0::2]) # 从头到尾 隔两个取一个
print(nameList[0:8:2]) # 从0到8 隔两个取一个
# 倒着切
print(nameList[-4:-1:2]) # 从倒数第四个到倒数第一个，每隔两个取一个，取左边不取右边，倒数第一个不会算进去
# 反转
print(nameList[::-1]) # 整个字符串，从后面开始(因为步长是负数)，每隔一个取一个。

```

##### 查

```python
# 查
# 是否包含 in
nameList = list("laizhuocheng")
print(("a" in nameList))
# 计数，字符串中有多少个子串
print(nameList.count("a"))
# 根据值返回下标
print(nameList.index("g"))
```

##### 特殊方法

```python
# 排序 数字排序 有字符串的话会报错
numList = [1, 3, 54, 5432, 45, 654, 2, 42, 6, 6543, 2, 32, 543, 6234]
numList.sort()
print(numList)
# 倒叙排列
numList.sort(reverse=True)
print(numList)
# 列表合并 直接相加 或extend
newList = nameList + numList
print(newList)
# 将参数里面的列表合并到调用者列表中
nameList.extend(numList)
print(nameList)
```

##### 深浅copy

关于深浅copy，python中讲的太浅，可以参考c/c++:

文章：https://blog.csdn.net/laizhuocheng/article/details/110299211

视频：https://www.bilibili.com/video/BV1ss411A7Dm?p=83&vd_source=6b124edbdeb4ac28a33fb392c361d256

c浅拷贝问题 p83

c++浅拷贝问题 p185

```python
# 浅拷贝
a = [1, 2, 3, 4, ["lai", "xiao"], 5, 6, 7, 8]
b = a.copy()
# 拷贝后打印a和b，输出的都是一样的
print(a)
print(b)
# 现在对a进行修改,再打印b 结果a变了，b没变。看起来好像没问题
a[0] = 1111111111111111
print(a)
print(b)
# 但是，再对a中的复杂类型进行修改，打印a和b，发现都被修改了，这就是浅拷贝问题
a[4][1] = "LAI"
print(a)
print(b)
# 复制嵌套列表，内层的列表(假设是两层)复制的是内层列表的地址(浅copy)，b中的内层列表和a中的内层列表是同一块内存，
# 所以当a中的内层列表修改了元素值，也就是a的内层列表的元素换了指向，b的内层列表里面的值也换了指向，也就变了

# 深拷贝 导入深拷贝方法
c = copy.deepcopy(a)
print(a)
print(c)
a[4][0] = "XIAO" # 修改a中内层列表的第0个元素
# 打印a和c，发现c内层列表的第0个元素没有跟着修改，完全独立了出来，这就是深copy
print(a)
print(c)
```

##### 列表生成式

```python
# 列表生成式 需求：要生成 name-1 name-2 name-3 ...name-100 如何实现？
# 传统方式
nameList = []
for i in range(1, 101):
    nameList.append(f"name-{i}")
print(nameList)
# 如何更优雅的实现？
nameList1 = [f"name--{i}" for i in range(1,31)]
print(nameList1)
```

##### 列表练习

* 1、列表去重

  ```python
  # 列表去重
  print("列表去重".center(50, "-"))
  # 方法一
  data = [1, 2, 3, 4, 5, 32, 4, 23, 45, 543, 4, 2, 13, 1232, 11, 2, 3, 21]
  for i in data:
      for j in range(data.count(i) - 1):
          data.remove(i)
  print(f"data:{data}")
  
  # 方法二:方法一内层循环每次都会count，count会遍历，所以方法二会更优
  data = [1, 2, 3, 4, 5, 32, 4, 23, 45, 543, 4, 2, 13, 1232, 11, 2, 3, 21]
  kv = []
  for k in data:
      v = data.count(k)
      if v > 1 and [k, v] not in kv:
          kv.append([k, v])
  print(f"kv:{kv}")
  for i in kv:
      k, v = i[0], i[1]
      for j in range(v - 1):
          data.remove(k)
  print(f"data:{data}")
  ```

* 2、求列表中第二大的值:

  ```python
  # 找到列表中第二大的值
  data = [1, 2, 3, 4, 5, 32, 4, 23, 45, 543, 4, 2, 13, 1232, 11, 2, 3, 21]
  # 方法一：先找最大值,删除最大值，再求一遍最大值
  maxValue = data[0]
  for item in data[1:]:
      if maxValue < item:
          maxValue = item
  for j in range(data.count(maxValue)):
      data.remove(maxValue)
  secondValue = data[0]
  for item in data[1:]:
      if secondValue < item:
          secondValue = item
  print(secondValue)
  
  # 方法二：冒泡两次
  data = [1, 2, 3, 4, 5, 32, 4, 23, 45, 543, 4, 2, 13, 1232, 11, 2, 3, 21]
  for j in range(2):
      for i in range(len(data)-1):
          if data[i] > data[i + 1]:
              iValue = data[i]
              data[i] = data[i + 1]
              data[i + 1] = iValue
  print(data[len(data)-2])
  ```

* 3、判断一个列表是不是另一个列表的子列表

  ```python
  # 判断一个列表是不是另一个列表的子列表
  data = [1, 2, 3, 4, 5, 32, 4, 23, 45, 543, 4, 2, 13, 1232, 11, 2, 3, 21]
  child = [1, 2, 1232,222]
  
  flag = True
  for i in child:
      if i not in data:
          flag = False
  print(flag)
  ```

* 4、求出列表中最大值和最小值的平均值最接近的值

  我的笨比方法：

  ```python
  # 求出列表中最大值和最小值的平均值最接近的值
  data = [1, 2, 3, 4, 5, 32, 4, 23, 45, 543, 4, 2, 13, 1232, 11, 2, 3, 21, -2, -3, -5, -6, -9]
  # 去重
  for i in data:
      for j in range(data.count(i) - 1):
          data.remove(i)
  maxValue = data[0]
  minValue = data[0]
  for i in data[:]:
      if maxValue < i: maxValue = i
      if minValue > i: minValue = i
  print(minValue)
  print(maxValue)
  avg = (minValue + maxValue) / 2
  print(avg)
  # 默认距离 第0个元素和平均值
  distance = 0
  if data[0] > avg:
      distance = data[0] - avg
  else:
      distance = avg - data[0]
  # 上一个遍历的值和平均值的举例 默认最大值到最小值的举例
  distance = maxValue - minValue
  # 最终结果
  closeValue = 0;
  for i in range(1, len(data)):
      if data[i] > avg:
          newDistance = data[i] - avg
      else:
          newDistance = avg - data[i]
      if newDistance < distance:
          distance = newDistance
          closeValue = data[i]
  print(distance)
  print(closeValue)
  ```

  看视频后优化的方法：

  ```python
  # 优化
  data = [1, 2, 3, 4, 5, 32, 4, 23, 45, 543, 4, 2, 13, 1232, 11, 2, 3, 21, -2, -3, -5, -6, -9]
  maxValue = data[0]
  minValue = data[0]
  for i in data[:]:
      if maxValue < i: maxValue = i
      if minValue > i: minValue = i
  print(minValue)
  print(maxValue)
  
  avg = (minValue + maxValue) / 2
  print(f"avg:{avg}")
  closeValue = data[0]
  for i in data:
      if abs(avg - i) < abs(avg - closeValue):
          closeValue = i
          print(f"找到更近的了{closeValue}")
  print(closeValue)
  ```

* 5、双色球抽奖程序(重点是如何优雅的实现)

  ```python
  # 双色球抽奖程序 五个红球(1-32) 一个篮球(1-16) 用户选五个红球一个篮球
  # 列表 分别代表 [个数,最小值,最大值,"什么球"]
  li = [[5, 1, 33, "红球"], [1, 1, 16, "篮球"]]
  redBlueBall = []
  for item in li:
      for i in range(item[0]):
          red = input(f"请选择第{i + 1}个{item[3]}({item[1]}-{item[2]})")
          while not red.isdigit() or int(red) < item[1] or int(red) > item[2]:
              red = input(f"错误,请重新选择第{i + 1}个{item[3]}(1-32)")
          redBlueBall.append(red)
  print(f"你选择是双色球为：{redBlueBall}")
  ```

* 6、购物车小程序

  需求：程序实现打印商品列表，用户可以通过商品编号来选购商品，允许不断购买商品。程序启动时，让用户输入自己的工资，总购物的价格不能超过工资，用户可退出程序，退出时打印，分别买了哪些商品及余额。

  我的垃圾代码：

  ```python
  # 程序实现打印商品列表，用户可以通过商品编号来选购商品，允许不断购买商品。程序启动时，让用户输入自己的工资，总购物的价格不能超过工资，用户可退出程序，退出时打印，分别买了哪些商品及余额。
  
  # 商品列表 属性：编号、名字、单价
  goods = [[1001, "鼠标", 100], [1002, "键盘", 300], [1003, "显示器", 800], [1004, "桌子", 400]]
  print("欢迎使用购物系统".center(50, "-"))
  noList = []
  for good in goods:
      noList.append(good[0])
      print(f"{good[0]}\t{good[1]}\t{good[2]}元".expandtabs(22))
  print("".center(55, "-"))
  
  # 购物车 属性：编号、名字、单价
  cart = []
  cast = 0
  money = input("你有多少钱？")
  if not money.isdigit():
      print("输入错误，重新输入")
  money = int(money)
  flag =True
  while flag:
      no = input("请输入需要加入购物车的商品编号(输入0退出):")
      if int(no) == 0:
          break
      if not no.isdigit() or int(no) not in noList:
          print("输入错误，重新输入")
          continue
      for good in goods:
          if int(no) == good[0]:
              cast += good[2]
              if cast < money:
                  cart.append(good)
              else:
                  cast -= good[2]
                  print("消费不起咯哦")
                  flag = False
  distinctCast = copy.deepcopy(cart)
  for item in distinctCast:
      while distinctCast.count(item) > 1:
          distinctCast.remove(item)
  print("结账".center(100, "-"))
  print()
  for item in distinctCast:
      count = cart.count(item)
      print(f"{item[0]}\t{item[1]}\t{item[2]}元\t{count}\t{count * item[2]}".expandtabs(22))
  print(f"一共消费{cast},余额:{money - cast}")
  print("".center(100, "-"))
  ```

  

#### 元组

只读列表，只能查、删，不能修改，增加。

声明：names = ()就是一个元组。

![元组](http://www.iocaop.com/images/2022-08/202208182352413.png)

元组是不可以修改的

![元组不支持修改操作](http://www.iocaop.com/images/2022-08/202208182352145.png)

有一种情况是可以修改的，元组里面的列表是可以修改列表元素的，因为存储的是指向列表的指针，指针没有修改，修改的是指针指向的内存的值。![image-20220722231119843](http://www.iocaop.com/images/2022-08/202208182352886.png)

问题：在什么时候用到元组？

在你想定义一些数据，只能给别人用，而不想被别人修改的时候使用元组。

```python
# 元组
names = (1, 2, 3)
print(type(names))
# 元组只能查、删，不能增加、修改
print(names[0:2])  # 和列表一样吗，可以切片，取首不取尾
print(names[0])

# 不可以重新赋值(修改)
# names[0] = 2


# 元组里面的列表是可以修改的
names = (1,2,3,[4,5])
print(names)
names[3][0]='test'
print(names)
```

#### 字典

与json类似，k-v结构，查询非常方便，而且不会因为数据量变大而查询变慢，key必须唯一。

key必须是不可变的、唯一的(不能重复，虽然不会报错，但是下面的会把上面的覆盖，因为是基于hash的)，可以是字符、数字、甚至是元组。python3.7是无序的，之后是有序的。

```python
# 字典的key可以是字符、数字、元组
dict1 = {"name": "lzc", 1: "1", (1, 2, 3): "123"}
print(dict1[(1, 2, 3)])
print(dict1["name"])
print(dict1[1])
```

![字典的key](http://www.iocaop.com/images/2022-08/202208182353806.png)

##### 字典的增删改查

```python
# 创建字典的方法
# 方法1：
person = {"name": "lzc", "age": 24}
print(person)

# 方法2
person = dict(name="lz1c", age=25)
print(person)
```

运行结果:

```json
{'name': 'lzc', 'age': 24}
{'name': 'lz1c', 'age': 25}
```

```python
# 字典的新增
# 方法1：直接加上去就好
person["salary"] = 9000
print(person)
# 方法2：检查式新增，如果key不存在则新增并返回，如果已存在则返回已存在的key和value
person.setdefault("nickName","赖卓成")
print(person)
# 可以看到如果已存在，不更新，也不新增，只是返回已存在的k-v
person.setdefault("nickName","赖卓成666")
print(person)
```

运行结果:

```json
{'name': 'lz1c', 'age': 25, 'salary': 9000}
{'name': 'lz1c', 'age': 25, 'salary': 9000, 'nickName': '赖卓成'}
{'name': 'lz1c', 'age': 25, 'salary': 9000, 'nickName': '赖卓成'}
```

```python
# 字典的修改
# 方法1：普通修改，其实和新增是一样的，只是在传参的时候，传已存在的key，重新赋值
person['nickName'] = "赖卓成666"
print(person)
# 字典可以嵌套
person['info'] = {"name1":"nam1","age1":222}
print(person)
# 修改字典中的字典
person['info']["name1"]="nam11111111111"
# 字典中可以包含列表
person["girlFriend"] = ["g1","g2","g3"]
print(person)
# 可以直接修改字典中的列表
person["girlFriend"][-1] = "g333"
print(person)
```

运行结果：

```json
{'name': 'lz1c', 'age': 25, 'salary': 9000, 'nickName': '赖卓成666'}
{'name': 'lz1c', 'age': 25, 'salary': 9000, 'nickName': '赖卓成666', 'info': {'name1': 'nam1', 'age1': 222}}
{'name': 'lz1c', 'age': 25, 'salary': 9000, 'nickName': '赖卓成666', 'info': {'name1': 'nam11111111111', 'age1': 222}, 'girlFriend': ['g1', 'g2', 'g3']}
{'name': 'lz1c', 'age': 25, 'salary': 9000, 'nickName': '赖卓成666', 'info': {'name1': 'nam11111111111', 'age1': 222}, 'girlFriend': ['g1', 'g2', 'g333']}
```

