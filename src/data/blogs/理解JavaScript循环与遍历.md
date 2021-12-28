---
title: 理解JavaScript循环与遍历[4.16更新]
date: 2020-03-20 21:20:21
tags: [JavaScript]
---

循环遍历可以说是最常用的操作了，但是对各种循环遍历的方法理解可能并没有那么深。最近被问到许多与循环有关的问题，发现并不能答得很好，于是决定写一篇文章，从头到尾梳理一下。

<!--more-->

问题列表：

- 循环有哪几种？多多益善。
- `for...in` 和`for...of`有什么区别？
- `for...of`了解吗？`for...of`和 `forEach`这两个怎么取舍？

另外一个与循环有关的问题就是循环中的setTimeout，判断运行结果是什么。这个问题就不单单是循环了，会牵涉到闭包、事件循环等知识。

## 1. 循环/遍历有哪些做法

```javascript
let arr = [11,22,33,44,55,66,77]
let obj = {
    name: "steve",
    age: 12,
    isMarried: false
}

// 1. 循环遍历的种类
for(let i=0;i<arr.length;i++){
	  console.log(i) 
}

for(let index in arr){
    console.log(index) // 数组下标
}

for(let item of arr){
    console.log(item)  // 数组中的每一项的值
}

arr.forEach((item,index)=>{
    console.log(item,index)  
})
// 注意：forEach没有返回值
// 但是map方法有返回值 比如给每一项加10
let newArr = arr.map(item=>{
    return item + 10
})
console.log(newArr) // [21, 32, 43, 54,65, 76, 87]

```



## 2. 关于for in

`for...in`不宜用来遍历数组。问题在于：

- 遍历的index为字符串型，无法直接进行算数操作。

```javascript
for(let index in arr){
    console.log(index) // 数组下标
    console.log("type:",typeof(index)) // string 
}
```

- 遍历顺序可能与数组内实际顺序不同。
- `for...in`会遍历所有可枚举属性，包括原型上的属性。

```javascript
let arr = [1,2,3,4,5,6,7]
arr.name = 'my_array'
for(let index in arr){
    console.log(index) 
}
// 0 1 2 3 4 5 6 name
```

`for...in`还有一个特点，用例子来说明：

```javascript
let arr = [1,2,3,2,2,4,5]   // 想要用for in去掉所有的2
for(let i in arr){
    console.log("操作前的i:",i)
    if(arr[i] === 2){
        arr.splice(i,1)
        i--
    }
    console.log("操作后的i:",i)
}
console.log(arr) // [ 1, 3, 2, 4, 5 ]

操作前的i: 0
操作后的i: 0
操作前的i: 1
操作后的i: 0
操作前的i: 2
操作后的i: 1
操作前的i: 3
操作后的i: 3
操作前的i: 4
操作后的i: 4

```

也就是说我们期望的在splice之后将i往前移一位的操作是不能实现的，这就导致了出现两个连续的2时，splice掉第一个2之后跳过了第二个2. 在`for...in`循环中，下标序列(string类型)在创建循环时就确定了，无法在循环过程中对其进行操作。而这个情况下如果用普通的for循环是可以满足要求的：

```javascript
let arr = [1,2,3,2,2,4,5]
for(let i=0;i<arr.length;i++){
    if(arr[i] === 2){
        arr.splice(i,1)
        i--
    }
}
console.log(arr) // [ 1, 3, 4, 5 ]
```

总的来说，`for in`适合遍历对象，而不适宜遍历数组。

## 3. 关于for of

`for...of`是es6中出现的，功能十分强大。只要是可以被迭代的数据结构，都可以使用`for...of`来遍历。

摘录阮一峰博客中的一段话：一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。`for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、Generator 对象，以及字符串。

用`for of` 遍历各种数据类型的示例，可以参考

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of

而对于一个对象，`for of`有时会失灵。例如：

```javascript
let obj = {
    name: "steve",
    age: 12,
    isMarried: false
}

for(let item of obj){
    console.log(item)
}
// TypeError: obj is not iterable
```

原因是obj对象不是可迭代的。而如果使用`for in`则可以遍历对象中key的值：

```javascript
let obj = {
    name: "steve",
    age: 12,
    isMarried: false
}

for(let item in obj){
    console.log(item)
}

name
age
isMarried
```

因此总结来说，`for in` 适合遍历对象，而`for of`适合遍历数组。

**4.16更新内容：关于```@@iterator```**

之前提到只要一个数据结构有iterator接口，就可以使用```for...of```对其进行遍历。这样的说法是正确的。```for...of```循环首先向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的```next()```方法来遍历所有的返回值。而数组对象有内置的```@@iterator```，这也就是```for...of```能直接应用在数组上的原因。

```javascript
let arr = [1,3,5]
let it = arr[Symbol.iterator]() // @@iterator本身是一个返回迭代器对象的函数
console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 3, done: false }  
console.log(it.next()) // { value: 5, done: false }
console.log(it.next()) // { value: undefined, done: true }
```

和数组对象不同，普通的对象并没有内置的```@@iterator```，所以不能进行```for...of```遍历。不过，如果想的话，也可以给对象定义```@@iterator```，就像下面这样：

```javascript
let obj = {
    name: "steve",
    age: 12,
    isMarried: false
}

Object.defineProperty(obj,Symbol.iterator,{   // 给obj挂载Symbol.iterator属性
    enumerable: false,
    writable: false,
    configurable: true,
    value: function(){
        let o = this
        let index = 0
        let keys = Object.keys(o)
        return {
            next: function(){
                return {
                    value: o[keys[index++]],
                    done: (index > keys.length)
                }      
            }
        }
    }
})

// 现在可以使用for...of来遍历obj对象了
for(let v of obj){
    console.log(v)
}

// 输出：
// steve
// 12
// false
```

从这个例子可以看出来，迭代器是可以自定义的。而这也就给了用户非常多的自由度，可以在各种自定义的数据结构上利用自定义迭代器和```for...of```进行各种操作。

## 4. 关于forEach

`forEach()` 方法对数组的每个元素执行一次给定的函数，与`map`很类似。值得注意的是，与`map`不同，`forEach`并不会返回任何东西。

```javascript
let arr = [1,2,3]
let arr2 = arr.forEach((item,index)=>{
    console.log(item,index)  
    return item + 10
})
console.log(arr2)  // undefined

let arr3 = arr.map(item=>{
    console.log(item,index)  
    return item + 10
})
console.log(arr3)  // [11,12,13]

```

还有一点就是`forEach`无法被`break`、`continue`等语句打断，无法中止或者跳出循环。

## 5. 循环中的setTimeout()

这一块内容其实和循环关系不大，更多的是关于作用域以及闭包的问题，但是想到了就也放在这篇文章里。

- 第一题

```javascript
for(var i=0;i<5;i++){
    setTimeout(function(){
        console.log(i)
    },1000)
}
```

运行的结果是在1000ms后输出了5个5.

setTimeout是一个异步函数，执行到setTimeout函数后会将其弹入宏任务队列中，然后继续执行后续的同步代码。执行完所有的代码后开始清空宏任务队列，这里由于循环了五次，宏任务队列中则会有5个console.log(i)的任务等待清空。这时由于要输出i，执行器会在全局作用域中寻找i。在循环条件中使用`var`关键字定义了全局变量i，循环结束后i等于5，因此输出了5个5.

- 第二题

```javascript
for(let i=0;i<5;i++){
    setTimeout(function(){
        console.log(i)
    },1000)
}
```

运行的结果是在1000ms后输出0 1 2 3 4.

和上一题类似，但是使用了`let`关键词定义的变量i拥有块级作用域。在弹入宏任务队列时，块级作用域也会被一并弹入，因此i分别为0、1、2、3、4.

- 第三题

```javascript
for(let i=0;i<5;i++){
    setTimeout(function(){
        console.log(i)
    },1000*i)
}
```

运行的结果是每隔一秒输出0、1、2、3、4.

和上一题类似，使用了`let`关键词，导致每一个宏任务都带有一个不同的i，这样第一个宏任务的i=0，没有时延直接输出0；第二个宏任务的i=1，延迟1000ms输出1；以此类推。如果在定义循环时使用`var`关键词，则会每隔一秒输出一个5，因为全局变量中的i此时等于5.

- 第四题

```javascript
for(let i=0;i<5;i++){
    (function(i){
        setTimeout(function(){
            console.log(i)
        },1000*i)
    })(i)
}
```

和上一题完全一致，只不过使用了立即执行函数，将当前的i作为参数传入了立即执行函数，那么在宏任务队列中的所有任务都有着不同的i。这里将`let`换成`var`也会得到一样的结果。

