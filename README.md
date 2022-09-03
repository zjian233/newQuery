# newQuery

## WHAT
本项目是一个简易的，适用现代浏览器的，一个微型的dom操作库。

## HOW
本项目使用webpack进行打包的。

本项目是对原生dom操作的一层简单封装，API参考 jquery 的。

## API
一些实现的API

### 选择器
* $(selcetor[, context]) 选择器，返回newQuery实例对象。
* $(object) obj:dom对象，返回指定dom对象的newQuery实例。

### dom操作
* append() 指定元素内部后面插入 
* prepend() 指定元素内部前面插入
* after() 指定元素后面插入
* before() 指定元素前面插入
* addClass() 添加class
* removeClass() 移除class
* attr()  设置属性/获取属性值

### 事件
* on(type, fn) 绑定事件
* on(type, selector, fn) 事件委托，代理指定选择器的事件

### css相关
* css(property, value) 设置样式
* hide() 隐藏元素
* show() 展示元素

### newQuery对象
* first() 返回第一个dom的newQuery对象
* last() 返回最后一个dom的newQuery对象
* val() 设置value值/返回value值
* text() 设置text值/返回text值
* size() 返回newQuery长度

... 
