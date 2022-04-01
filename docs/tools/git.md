# Git

## git ssh key配置
```
git config --global user.name '这里换上你的用户名'
git config --global user.email '这里换上你的邮箱'
```
然后执行以下命令生成密钥：
```
$ ssh-keygen -t rsa -C "你的git帐号邮箱"
Generating public/private rsa key pair.
## 这里输入存储 rsa 文件的名称（多用户需要填写不同的名字）↓
Enter file in which to save the key (/d/Users/feng/.ssh/id_rsa):id_rsa_aliyun
## 这里设置密码（可不填）↓
Enter passphrase (empty for no passphrase):
## 重复密码（可不填）↓
Enter same passphrase again:
```
执行命令后需要进行 3 次或 4 次确认：
1. 确认秘钥的保存路径（如果不需要改路径则直接回车）；
2. 如果上一步置顶的保存路径下已经有秘钥文件，则需要确认是否覆盖（如果之前的秘钥不再需要则直接回车覆盖，如需要则手动拷贝到其他目录后再覆盖）；
3. 创建密码（如果不需要密码则直接回车）；
4. 确认密码；

![示例](/images/ssh.png)

在指定的保存路径下会生成 2 个名为 `id_rsa` (私钥)和 `id_rsa.pub` (公钥)的文件：

![示例](/images/路径.png)

打开 `github` ，进入配置页：头像 --> Settings

`Personal settings` 选择 `SSH and GPG keys` 项：

用文本工具打开之前生成的 `id_rsa.pub` 文件，把内容拷贝到 `key` 下面的输入框

![示例](/images/公钥.png)

## git 多用户设置方法
创建配置文件 `config`

在 `~/.ssh` 目录下找到 `config` 文件（如果没有则创建一个， `windows` 系统下目录地址为：C:\Users\你的用户名\.ssh）

```
// 主机名字，不能重名
Host github.com
Hostname github.com
User 你的名称
Identityfile ~/.ssh/id_rsa

// 第二个配置
// 主机名字，不能重名
Host code.aliyun.com 
// 主机所在域名或IP
HostName code.aliyun.com
// 用户名称
User 你的名称
// 私钥路径
IdentityFile ~/.ssh/id_rsa_aliyun
```