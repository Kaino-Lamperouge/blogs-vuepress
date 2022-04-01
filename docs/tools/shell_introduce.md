# Shell

`Shell` 是一个用 `C语言` 编写的程序，它是用户使用 `Linux` 的桥梁。

`Shell` 既是一种命令语言，又是一种程序设计语言。

`Shell` 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

### shell 脚本(shell script)
#### 示例
打开文本编辑器(可以使用 vi/vim 命令来创建文件)，新建一个文件 test.sh，扩展名为 sh（sh代表shell）
```
#!/bin/bash
echo "Hello World !"
```
`#!` 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 `Shell`。

## Bash 
`Bash` 是 `Unix` 系统和 `Linux` 系统的一种 `Shell`（命令行环境），是目前绝大多数 `Linux` 发行版的默认 `Shell`。

Shell : “外壳”，跟 kernel（内核）相对应，比喻内核外面的一层，即用户跟内核交互的对话界面。

用户把指令告诉 `Shell` ，然后 `Shell` 再传输给系统内核，接着内核再去支配计算机硬件去执行各种操作。

## Linux

### Linux 下 `/` 和 `~` 的区别
`/` 是根目录，`~` 是home目录。

`~` 代表 你的/home/用户自己的个人目录地址

当用户名是 `x` ，那么 `~/` === `/home/x/`

`.` 代表此目录本身，但是一般可以不写
```
cd ~/. === cd ~ === cd ~/
```
`.` 在文件名头部，代表一个隐藏文件

`~/.local` 是你的主目录下一个 `.local` 的文件夹的路径，

用 `ls -a` 查看，一般 `ls` 是无法看到的

```
/ 是 根节点， ~ 是 home
如果以root账号登陆 
~ 是 /root/
/ 是 /
/etc/ 是根目录下面的 etc 目录

如果以 name 登陆
~ 是 /home/name/
/ 是 /
```

查看自己的用户名和邮箱地址：
```
$ git config user.name
$ git config user.email
```
修改自己的用户名和邮箱地址：
```
$ git config --global user.name "xxx"
$ git config --global user.email "xxx"
```