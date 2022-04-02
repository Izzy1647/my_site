# JavaScript内存管理

对于JavaScript这样有垃圾回收机制的语言来说，内存管理可能是一个比较无关紧要的话题。但是有一点了解总不是坏事，毕竟有时也会碰到内存泄漏等情况。

## 1. 内存生命周期(Memory life cycle)

一句话来说，内存的生命周期就是：**先分配内存，再使用内存，最后释放内存**。分配和释放内存，JavaScript都会帮我们做；使用内存则是读/写分配好的内存空间，也就相当于读/写我们声明的常量、变量、对象等等。比如定义`let a = 2`，首先需要在内存里开辟一个存储`a`的空间；然后我们就可以对其进行读和写，比如赋值为2；当这个`a`不再被需要的时候，就将这块空间释放。

[<img src="https://s1.ax1x.com/2022/04/01/q5siPP.png" alt="q5siPP.png" style="zoom:33%;" />](https://imgtu.com/i/q5siPP)

## 2. 堆内存和栈内存(The memory heap and stack)

对于任何我们定义的常量、变量、对象等等，他们都被存放在堆内存或者栈内存中。

### 2.1 栈内存

所有**静态**的数据都会被存储在栈内存中。这个静态意味着他们的大小在**编译**时(compile time)就是固定的，只需要开辟一个固定大小的空间就可以。在JavaScript里，静态的数据包括原始值(primitive values)：String、Number、Boolean、Undefined、Null，以及对象的**引用**。这里并不是对象本身，而是指向这个对象的引用。可以想象，对象本身是动态的，但是这个引用是静态的。

[<img src="https://s1.ax1x.com/2022/04/02/q5o3kT.png" alt="q5o3kT.png" style="zoom: 50%;" />](https://imgtu.com/i/q5o3kT)

### 2.2 堆内存

相对应的，JavaScript中函数(function)与对象(object)的大小并不在编译时确定，它们是**动态**的。JavaScript不会事先给它们分配固定大小的空间，而是会在执行时(runtime)进行动态的调整。

下表做了一个简单的比较：

**栈内存**                                                      **堆内存**

原始值和引用                                           函数和对象

所需内存大小在编译时确定                    所需内存大小在运行时确定

分配的内存有固定上限                           无限制

### 2.3 对象的引用

前面提到**对象的引用**存储在栈内存中，而**对象**存储在堆内存中。这一点在[第四版JavaScript高级程序设计](https://github.com/WebHero0544/books/blob/master/Professional.JavaScript.for.Web.Developers.4th.Edition.2019.10.pdf)的第四章中可以找到清晰的图解，或者也可以看这张图：

[<img src="https://s1.ax1x.com/2022/04/02/q5o69e.png" alt="q5o69e.png" style="zoom: 50%;" />](https://imgtu.com/i/q5o69e)



## 3. 垃圾回收

正因为JavaScript有垃圾回收机制，开发者才无需过多操心内存的管理。垃圾回收的基本思想就是周期性地确定哪些变量再也用不到了，就把它们所占用的内存给释放出去。但是，如何确定“一个变量再也用不到了”一听就是一个非常棘手的问题。实际上这个问题是**[不可判定(undecidable)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#:~:text=This%20automatic%20process%20is%20an%20approximation%20since%20the%20general%20problem%20of%20determining%20whether%20or%20not%20a%20specific%20piece%20of%20memory%20is%20still%20needed%20is%20undecidable.)**的，所以现有的垃圾回收机制只是一个近似的，并且不完美的方案。

两种主流的垃圾回收机制：引用计数(Reference counting)和标记清除(Mark-and-sweep)。

### 3.1 引用计数

引用计数的思路是记录每个值被引用的次数，如果被引用的次数为0，则说明这个值不会被访问到，可以回收它占用的内存。但是这有一个严重的缺陷：循环引用。例如：

```javascript
function problem() {
  let objA = {}
  let objB = {}
  objA.refToB = objB
  objB.refToA = objA
}

problem()
```

这个例子中`objA`和`objB`相互引用，它们的引用计数都是2。函数结束运行之后，`objA`和`objB`都不在作用域中，照理可以被清除，但是由于引用计数是2而不是0，它们不会被清除。如果`problem()`函数被多次调用，大量的内存会被占用而不会被清除，也就造成了内存泄漏。

### 3.2 标记清除

标记清除策略的关键是判断一个变量是否能被访问到(reachable)。这个思路把上文所提到的“确定一个变量再也用不到了”降级为了“确定一个变量再也不会被访问到“。

假定有一个**根对象(root)**。在浏览器中，这个根对象就是`window`对象；在NodeJS中，这个根对象是`global`对象。垃圾回收程序会从根对象开始，找到所有能被根对象访问到的对象，再继续找能被这些对象访问到的对象，循环往复。这样下来，所有可访问到(reachable)的对象都被找到了，剩余的则是不可访问(non-reachable)的对象。不可访问的对象都能够被释放。

标记清除解决了循环引用的问题。在上文的例子中，一旦`problem()`运行结束，`objA`和`objB`都会离开作用域，它们就成为不可访问的了，也就可以被清理。

[![qoshz6.png](https://s1.ax1x.com/2022/04/02/qoshz6.png)](https://imgtu.com/i/qoshz6)

## 4. 内存泄漏

JavaScript是一门特殊的语言：大部分情况下运行在浏览器中，而分配给浏览器的内存往往是很有限的。因此内存泄漏是一个大问题。下面列举一些容易造成内存泄漏的操作。

- 全局变量

不使用`var`、`let`或者`const`关键字声明变量，会导致该变量挂在`window`对象上。

```javascript
function setAge() {
  age = 18
}

console.log(window.age) // 18
```

只要`window`不被清理，`window`对象上的属性就永远不会消失。当然只要在`age`前加上`var`、`let`或者`const`，变量就会在函数执行完毕后离开作用域。

- 定时器

没被销毁的定时器很容易造成内存泄漏。

```javascript
let name = 'joe'
setInterval(() => {
  console.log(name)
}, 1000)
```

定时器的回调函数一直运行，引用的`name`就永远不会被清除。

- 闭包

```javascript
let outer = function() {
  let name = 'joe'
  return function() {
    return name
  }
}
```

调用`outer()`之后，分配给`name`的内存就被泄漏了。