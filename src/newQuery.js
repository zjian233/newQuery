/**
 * newQuery  --v0.1
 * 
 * 一个模仿jQuery的一个玩具项目。
 * 本项目主要用于：
 *    学习jQuery的实现原理
 *    封装自己的库文件
 *    熟悉原生js
 *    熟悉webpack打包
 * 欢迎使用交流！
 * 
 */

// 使用严格模式
'use strict';

// 封装变量，防止污染全局变量
(function(window, undefined) {
  
  // 入口API，返回newQuery对象
  var newQuery = function() {
    return new newQuery.fn.init();
  }

  // 设置newQuery原型对象
  newQuery.fn = newQuery.prototype = {
    constructor: newQuery,
    newQuery: '0.1',
    init: function() {
      return this;
    }
  }

  // 让init方法继承newQuery原型，使newQuery实例继承newQuery的方法
  newQuery.fn.init.prototype = newQuery.fn;

  // 暴露API
  window.$ = newQuery;
})(window, undefined);