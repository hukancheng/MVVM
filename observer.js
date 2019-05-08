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
     // console.log(`读取了${key}属性`)
      Dep.target && dep.addSub(Dep.target);
      return val 
    },
    set: function (newVal) {
     // console.log('set值变化 ', val, newVal,data);
     if (val === newVal) return
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
  notify: function() {
    this.subs.forEach( sub => {
      //console.log(sub,222)
      sub.update()
    })
  }
}


function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
// 监听器Observer end