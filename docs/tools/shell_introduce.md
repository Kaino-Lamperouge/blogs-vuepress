# Shell

>Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。

>Shell 既是一种命令语言，又是一种程序设计语言。

>Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

### shell脚本(shell script)
#### 示例
打开文本编辑器(可以使用 vi/vim 命令来创建文件)，新建一个文件 test.sh，扩展名为 sh（sh代表shell）
```
#!/bin/bash
echo "Hello World !"
```
`#!` 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。

## Bash 
Bash 是 Unix 系统和 Linux 系统的一种 Shell（命令行环境），是目前绝大多数 Linux 发行版的默认 Shell。
Shell : “外壳”，跟 kernel（内核）相对应，比喻内核外面的一层，即用户跟内核交互的对话界面。
用户把指令告诉 Shell ，然后 Shell 再传输给系统内核，接着内核再去支配计算机硬件去执行各种操作。

