---
title: macOS Catalina使用mongodb
date: 2020-03-02 20:21:21
tags: [tips]
---

macOS在更新成catalina后将Macintosh HD根目录更新为只读目录，因此无法在该目录下创建data/db目录存放数据库了。

<!--more-->


```shell
sudo mkdir -p /data/db  # 提示下述信息 只读目录无法创建文件夹
mkdir: /data/db: Read-only file system
```

网上的博客提供的方法主要是关闭mac的系统安全保护系统，但是需要重启，比较麻烦，关闭安全保护系统也可能造成其他后果。mongodb官网给出的方法是在 /Users/#用户名#/ 目录下新建/data/db目录存放数据库，并在每次启动时带上路径：

```shell
sudo mongod --dbpath=/Users/zzy/data/db 
```

这样可以启动并使用。



另外一个问题是启动时遇到:

```shell
***aborting after fassert() failure
```

解决方法是查看是否存在/tmp/mongodb-27017.sock文件，将其删除即可。