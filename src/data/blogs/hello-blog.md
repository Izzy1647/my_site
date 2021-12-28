---
title: Hello Blog
date: 2020-02-29 11:43:55
tags: 随笔 
---

就像所有人学习编程语言都从hello world开始，我的博客也从hello blog开始。有了服务器和域名之后一直想做一个个人网站。一开始自己做了一些html挂在apache上，但是感觉可扩展性太差了，而且对博客的支持也不够。最终权衡再三还是用了hexo框架。就如yilia所说，让大家把注意力放到内容上是设计初衷，我也想把精力先放在内容上，慢慢再考虑网站建设的问题。


hexo部署在github上非常方便，部署在云服务器上就要稍微花点时间。部署的时候找了几篇博客参考，深感语言表述不力的博客读起来是多么费劲。作为第一篇博客的技术部分，对hexo部署在云服务器的过程稍作总结。主要分三个部分：云服务器端git配置、云服务器端Nginx配置以及本地hexo配置。

<!--more-->


## 总体概述

先了解一下hexo搭建和发布的架构。本地hexo把markdown文件渲染成html文件后，push到git仓库中；然后从git仓库中借助git-hooks将文件放到网站根目录下。访客访问网站地址后通过nginx服务获取网站内容。

配置环境：

- 云服务器：CentOS 7.5 64位  1核  2GB  1Mbps
- 本地环境：macOS 10.15.2



## 1. 云服务器端git配置

主要目标就一个：在云服务器上创建一个裸(bare)仓库，然后挂上钩子。涉及到的操作以及命令如下：

- 安装依赖库及编译工具

```shell
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel 
yum install gcc perl-ExtUtils-MakeMaker package
```



- 下载、解压、编译、配置git 

```shell
cd /usr/local/src
wget https://www.kernel.org/pub/software/scm/git/git-2.16.2.tar.gz
tar -zvxf git-2.16.2.tar.gz
cd git-2.16.2
make all prefix=/usr/local/git
make install prefix=/usr/local/git
echo 'export PATH=$PATH:/usr/local/git/bin' >> /etc/bashrc
source /etc/bashrc
git --version
```

最后能查看到git的版本号，表示安装成功了。



- 创建裸仓库

```shell
mkdir /home/git/
chown -R $USER:$USER /home/git/
chmod -R 755 /home/git/
cd /home/git/
git init --bare hexoBlog.git
```

在/home/git目录下创建裸仓库，名为hexoBlog.git，并修改目录所有权和用户权限。



- 创建钩子

```shell
vim /home/git/hexoBlog.git/hooks/post-receive
```

进入如上路径，用vim编辑post-receive文件。将下面两行代码复制进去，保存退出。

```shell
#!/bin/bash
git --work-tree=/home/hexoBlog --git-dir=/home/git/hexoBlog.git checkout -f
```

最后一步修改文件权限：

```shell
chmod +x /home/git/hexoBlog.git/hooks/post-receive
```

这样下来服务器端的git仓库就搭建好了，建立了裸库并且创建好了用于自动部署的钩子。



## 2.云服务器端Nginx配置

这一部分的目标是在云服务器上启用Nginx服务。

- 安装Nginx

```shell
yum install -y nginx
```



- 启动并测试Nginx

```
service nginx start
wget http://127.0.0.1
```

看到如下内容就说明Nginx安装成功了：

```
Connecting to 127.0.0.1:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 43704 (43K) [text/html]
Saving to: ‘index.html’

100%[=======================================>] 43,704      --.-K/s   in 0s

2020-02-28 11:04:09 (487 MB/s) - ‘index.html’ saved [43704/43704]
```

这个时候可以访问一下自己服务器的ip地址，能看到欢迎页。



- 配置Nginx托管文件目录

```shell
mkdir /home/hexoBlog/
chown -R $USER:$USER /home/hexoBlog/
chmod -R 755 /home/hexoBlog/
```

这是云服务器端配置的最后一步了。首先创建/home/hexoBlog目录，并修改权限。接下来要修改Nginx的配置文件。查看Nginx默认配置的位置，然后使用vim修改其内容，命令如下：

```shell
nginx -t
vim /etc/nginx/nginx.conf  # 这个路径就是上一步查到的安装位置
```

打开配置文件后找到如下位置，按i进入insert模式修改内容：

```shell
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /home/hexoBlog;    # 这里修改成前面创建的hexoBlog目录

    server_name izzyland.cn; # 这里修改成自己的域名
    
    # 别的地方不需要修改
```

修改完之后按esc，然后输入:wq保存并退出。修改完之后重启Nginx服务。

```shell
service nginx restart
```

大功告成，服务器端的配置就完全结束了。



## 本地hexo配置

第一步安装hexo就不多说了，可以参考各种视频及博客，下面链接中的视频讲的还蛮详细的。 https://www.bilibili.com/video/av44544186



- 修改本地hexo配置

```shell
sudo su  # 进入管理员模式
cd /Users/zzy/blog  # 进入hexo目录
vim _config.yml  # 修改配置文件
```

进入配置文件后找到 # Deployment 部分进行修改：

```shell
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git  # type设置成成git
  repo: root@xx:xx:xx:xx :/home/git/hexoBlog  # root@后填写服务器ip地址
  branch: master  # branch设置成master（默认应该也是master）
```

修改完毕之后再生成、部署一下：

```shell
hexo clean
hexo g
hexo s  # 可以在本地端口预览
hexo d
```

现在通过公网ip就可以访问部署好的hexo博客了。



## 部署过程中可能会碰到的问题

- git未设置SSH key，可能出现如下报错。解决方法：创建SSH key并重新操作。

```shell
Error: ssh: Could not resolve hostname cvm XX.XX.XX.XX : nodename nor servname provided, or not known
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

```

- Nginx服务启动失败

```shell
Job for nginx.service failed because the control process exited with error code.
See "systemctl status nginx.service" and "journalctl -xe" for details.
```

我出现这个问题的原因是80端口已被之前启用的apache服务器占用。解决方法：关闭apache服务。

```shell
systemctl stop httpd.service 
```

其他可能的原因可以查看"systemctl status nginx.service"，并参考其他博文。

