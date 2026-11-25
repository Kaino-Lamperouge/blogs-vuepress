---
title: "Git 多账号与 SSH 配置"
date: 2026-03-26
tags:
  - 工程实践
  - git
  - ssh
description: "同一台机器上既要推个人 GitHub，又要推公司 GitLab 时，关键不是\"多配几把钥匙\"，而是让每个仓库在连接时用对身份。SSH 依靠 ~/.ssh/config 里的 Ho…"
---
# Git 多账号与 SSH 配置

同一台机器上既要推个人 GitHub，又要推公司 GitLab 时，关键不是"多配几把钥匙"，而是**让每个仓库在连接时用对身份**。SSH 依靠 `~/.ssh/config` 里的 Host 别名来完成这件事。

## 配置提交身份

提交身份和 SSH 身份是两套东西。先保证提交信息正确：

```shell
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

某个仓库需要单独身份时，在该仓库目录里去掉 `--global` 再执行一次。

## 生成密钥

```shell
ssh-keygen -t ed25519 -C "你的邮箱"
```

执行后会依次询问：

1. 保存路径。多账号必须填不同文件名，例如 `~/.ssh/id_ed25519_github`，直接回车会覆盖默认的 `id_rsa`；
2. 如果目标文件已存在，是否覆盖；
3. 密钥口令，可留空；
4. 再次确认口令。

老服务器只支持 RSA 时，把算法换成 `ssh-keygen -t rsa -b 4096 -C "你的邮箱"`。

![生成密钥](/images/ssh.png)

`~/.ssh` 下会得到两个文件：私钥（无 `.pub` 后缀，不能外传）和公钥（`.pub` 结尾，用来登记）。

![密钥文件](/images/路径.png)

## 登记公钥

打开 `~/.ssh/id_ed25519_github.pub` 复制全文，进入 GitHub → 头像 → Settings → SSH and GPG keys → New SSH key 粘贴保存。

![GitHub 公钥配置](/images/公钥.png)

## 用 config 区分账号

编辑 `~/.ssh/config`（Windows 下是 `C:\Users\你的用户名\.ssh\config`）：

```shell
# 个人 GitHub
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes

# 公司 GitLab，gitlab.company 是自定义别名
Host gitlab.company
  HostName gitlab.company.com
  Port 2222
  User git
  IdentityFile ~/.ssh/id_ed25519_gitlab
  IdentitiesOnly yes
```

两个细节：

- `Host` 后面是**别名**，不能写成 `Host 10.10.166.121 gitlab` 这种带空格的写法；
- `IdentitiesOnly yes` 让 ssh 只用指定密钥，避免代理把其他 key 递上去导致"Permission denied"。

## 验证与使用

```shell
ssh -T git@github.com
ssh -T git@gitlab.company
```

返回 `Hi <username>! You've successfully authenticated` 即成功。

使用别名克隆公司仓库时，地址里的主机名要换成别名，否则 config 不生效：

```shell
git clone git@gitlab.company:group/repo.git
```

## 常见问题

- **克隆超时或连不上**：先检查代理，SSH 走代理时常见的表现是卡住后超时；
- **Permission denied (publickey)**：确认 `ssh -vT` 输出里加载的是预期密钥，以及私钥权限是否为 `600`；
- **推错账号**：`git remote -v` 看地址用的是哪个 Host，别名不对就 `git remote set-url` 改掉。
