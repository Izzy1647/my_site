---
title: 在macOS上使用OpenMP
date: 2020-05-06 19:01:21
---

#### 1. 安装libomp

```shell
brew install libomp
```

这个时候碰到的问题可能有：

<!--more-->

- updating homebrew 耗时过长

解决的思路就是关闭自动更新homebrew，或者简单粗暴每次更新时control+c取消。

- 目录不可写

```shell
Error: The following directories are not writable by your user:
/usr/local/share/man/man8

# 解决办法：
sudo chown -R `whoami`:admin /usr/local/bin
sudo chown -R `whoami`:admin /usr/local/share # 一步到位
```



####  2. 安装llvm

```shell
brew install llvm
```

这个时候碰到的问题和1中无异。



#### 3. 编译运行

```shell
clang -Xpreprocessor -fopenmp -lomp filename.cxx

# 或者手动根据本地路径链接
clang -Xclang -fopenmp filename.cxx -I /usr/local/opt/libom/include -L /usr/local/opt/libomp/lib -lomp

# 例如
clang -Xpreprocessor -fopenmp -lomp helloworld.c
```

这里我的程序是这样的：

```c
#include <omp.h>
#include <stdio.h>
int main()
{
    int nthreads,tid;
    omp_set_num_threads(8);
    #pragma omp parallel private(nthreads,tid)
    {
        tid=omp_get_thread_num();
        printf("Hello World from OMP thread %d\n",tid);
        if(tid==0){
            nthreads=omp_get_num_threads();
            printf("Number of threads is %d\n",nthreads);
        }
    }
}

// 运行结果  (不固定的)
Hello World from OMP thread 0
Hello World from OMP thread 4
Hello World from OMP thread 2
Hello World from OMP thread 1
Number of threads is 8
Hello World from OMP thread 7
Hello World from OMP thread 6
Hello World from OMP thread 3
Hello World from OMP thread 5
```

