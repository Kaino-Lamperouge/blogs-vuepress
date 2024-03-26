# Python中下划线的5种含义

1. 单前导下划线 `_var`
以单个下划线开头的变量或方法仅供内部使用
“私有”和“公共”变量之间的区别

2. 单末尾下划线 `var_`
避免与 `Python` 关键字产生命名冲突

3. 双前导下划线 `__var`
双下划线前缀会导致 `Python` 解释器重写属性名称，以避免子类中的命名冲突
这也叫做名称修饰（ `name mangling` ） - 解释器更改变量的名称，以便在类被扩展的时候不容易产生冲突

4. 双前导和双末尾下划线 `_var_`
使得一个对象可以被调用

5. 单下划线 `_`
单个独立下划线是用作一个名字，来表示某个变量是临时的或无关紧要的

不需要访问正在运行的索引，可以使用“_”来表示它只是一个临时值

<img :src="$withBase('/images/python.png')">