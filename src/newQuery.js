/**
 * newQuery  --v0.1
 * 
 * 一个简易的dom操作库
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
  var newQuery = function(selector, context) {
    return new newQuery.fn.init(selector, context);
  }

  // 设置newQuery原型对象
  newQuery.fn = newQuery.prototype = {
    
    constructor: newQuery,
    
    newQuery: '0.1',

    length: 0,

    init: function(selector, context) {
      var doms;

      // 执行dom查询
      if (!context) {
        doms = document.querySelectorAll(selector);
      } else if (typeof context === 'newQuery') {
        context[0].querySelectorAll(selector);
      }

      // 绑定到newQuery对象上
      for (var i=0; i<doms.length; i++) {
        this[ i ]  = doms[i]
      }
      this.length = doms.length;

      return this;
    },

    append: function(node) {
      console.log(typeof node);
      // var doms = newQuery(selector);

      // for (var i=0; i<doms.length; i++) {
      //   this[0].appendChild(doms[i]);
      // }
    }

  }

  // 让init方法继承newQuery原型，使newQuery实例继承newQuery的方法
  newQuery.fn.init.prototype = newQuery.fn;

  // 暴露API
  window.$ = newQuery;
})(window);