/**
 * newQuery  --v0.1
 * 
 * 一个简易的dom操作库
 * 欢迎使用交流！
 * 
 */

'use strict';

// 封装变量，防止污染全局变量
(function(window, undefined) {
  
  var rHtml = /^\s*<[\w\W]+>/;

  // 根据html创建节点集返回
  function buildFragment(selector) {
    var elm = document.createElement('div');
    elm.innerHTML = selector;
    var res = elm.childNodes;
    return res;
  }

  function likeArray(obj) {
    if (obj.length !== undefined) {
      return true;
    }
    return false;
  }

  function each(obj, callback) {
    if (likeArray(obj)) {
      for (var i=0; i<obj.length; i++) {
        callback(obj[i]);
      }
    }
    return obj;
  }

  var newQuery = function(selector, context) {
    return new newQuery.fn.init(selector, context);
  }

  newQuery.fn = newQuery.prototype = {
    
    constructor: newQuery,
    
    newQuery: '0.1',

    length: 0,

    init: function(selector, context) {
      var doms;

      if (typeof selector === 'string') {

        var match = rHtml.exec(selector);
        
        // 处理html -> 新建dom
        if (match) {
          doms = buildFragment(match[0]);

          // 处理查询
        } else {
          if (!context) {
            doms = document.querySelectorAll(selector);
          } else if (typeof context === 'newQuery') {
            context[0].querySelectorAll(selector);
          }
        }

      }

      for (var i=0; i<doms.length; i++) {
        this[ i ]  = doms[i]
      }
      this.length = doms.length;

      return this;
    },

    append: function(content) {
      if (typeof content === 'string') {
        var doms = buildFragment(content);
        for (var i=0; i<this.length; i++) {
          this[i].appendChild(doms[0]);
        }
      }
    }

  }

  newQuery.fn.init.prototype = newQuery.fn;
  window.$ = newQuery;

})(window);