// 监听器Observer start
function observer(data) {
  if(!data || typeof data !== 'object') return
  // 取出所有属性遍历
  Object.keys(data).forEach(function(k) {
    defineReactive(data, k, data[k]);
  });
}

function defineReactive (data,key,val) {
  var dep = new Dep();
  observer(data[key]) 
  Object.defineProperty(data,key,{
    enumerable: true,
    configurable: false,
    get: function () {
      console.log(`读取了${key}属性`)
      dep.target && dep.addSub(dep.target);
      return val 
    },
    set: function (newVal) {
      console.log('set值变化 ', val, ' --> ', newVal,data);
      val = newVal
      dep.notify()
    }
  })
}
function Dep () {
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  depend: function() {
    Dep.target.addDep(this);
  },
  notify: function() {
    console.log(33)
    this.subs.forEach( sub => {
      console.log(sub)
      sub.update()
    })
  }
}
// Dep.target = null;

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
// 监听器Observer end