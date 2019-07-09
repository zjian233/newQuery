/**
 * newQuery  --v0.1
 * 
 * 一个简易的dom操作库
 * 欢迎使用交流！
 * 
 */

'use strict';

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

          // 带context查询
          if (!context) {
            doms = document.querySelectorAll(selector);

          // 不带context查询
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

    indexOf: [].indexOf,

    val: function (content) {
      if (typeof content === 'string') {
        each(this, function($this) {
          console.log($this.value);
          $this.value = content;
        });
      } else {
        var res = '';
        each(this, function($this) {
          res += $this.value;
        })
        return res;
      }
    },

    text: function(content) {
      if (content) {
        each(this, function($this) {
          $this.innerText = content;
        })
      } else {
        var res = '';
        each(this, function($this) {
          res += $this.innerText;
        });
        return res;
      }
    },

    addClass: function(cls) {
      each(this, function($this) {
        $this.classList.add(cls);
      });
    },

    append: function(content) {
      if (typeof content === 'string') {
        var doms = buildFragment(content);
        for (var i=0; i<this.length; i++) {
          for (var j=0; j<doms.length; j++) {
            this[i].appendChild(doms[j]);
          }
        }
      }
    },
    after: function(content) {
      if (typeof content === 'string') {
        var doms = buildFragment(content);
        for (var i=0; i<this.length; i++) {
          for (var j=0; j<doms.length; j++) {
            this[i].parentNode.insertBefore(doms[j], this[i].nextSibling);
          }
        }
      }
    },
    prepend: function(content) {
      if (typeof content === 'string') {
        var doms = buildFragment(content);
        for (var i=0; i<this.length; i++) {
          for (var j=0; j<doms.length; j++) {
            this[i].insertBefore(doms[j], this[i].firstChild);
          }
        }
      }
    },
    before: function(content) {
      if (typeof content === 'string') {
        var doms = buildFragment(content);
        for (var i=0; i<this.length; i++) {
          for (var j=0; j<doms.length; j++) {
            this[i].parentNode.insertBefore(doms[j], this[i]);
          }
        }
      }
    },

    css: function(property, value) {
      // 展示css
      if (arguments.length < 2) {
        var element = this[0];
        if (typeof property === 'string') {
          if (!element) return;
          return element.style[property];
        } else if (likeArray(property)) {
          if (!element) return;
          var props = {},
              computedStyle = getComputedStyle(element, '');
          for (var prop of property) {
            props[prop] = computedStyle[prop]
          }
          return props;
        }
      }

      // 设置css
      var css = '';
      if (typeof property === 'string') {
        if (!value && value !== 0) {
          each(this, function(item) {
            item.style.removeProperty(property);
          });
        } else {
          css = property + ":" + value;
        }
      } else {
        for (var key in property) {
          if (!property[key] && property[key] !== 0) {
            each(this, function(item) {
              item.style.removeProperty(key);
            })
          } else {
            css += key + ":" + property[key] + ";";
          }
        }
      }
      return each(this, function(item) { item.style.cssText += ';' + css})
    },

    hide: function() {
      this.css('display', 'none');
    },
    show: function() {
      this.css('display', 'block');
    },

    on: function(type, selector, callback) {
      if(callback === undefined) {
        callback = selector;
        
        each(this, function($this) {
          $this.addEventListener(type, callback);
        });

      } else {
        // 有代理

        // 重写回调函数
        var delegator = function (e) {
          
          var collection = $(selector);
          var target = e.target;

          while (collection.indexOf(target) < 0) {
            if (target === document) break;
            target = target.parentNode;
          }
          // 找到了需要委托的节点, 执行回调
          if (collection.indexOf(target) >= 0) {
            // 更改this指向
            callback.call(target, e);
          }
        }
        each(this, function($this) {
          $this.addEventListener(type, delegator);
        });
      }
      
      
    }

  }

  newQuery.fn.init.prototype = newQuery.fn;
  window.$ = newQuery;

})(window);