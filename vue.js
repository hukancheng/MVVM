function Vue(op) {
  this.data = op.data,
  this.methods = op.methods
  let id = op.el
  this._ob_ = {}
  // initData(this.data,this._ob_)
  let dom = nodeToFragment(document.getElementById(id),this)
  // let dom = document.getElementById("appp").innerHTML = "Hello World";
  document.getElementById(id).appendChild(dom)
  return this
}

function nodeToFragment(node,vm) {
  // debugger
  let newDocument = document.createDocumentFragment();
  let child;
  while(child = node.firstChild) {
    if (child.childNodes && child.childNodes.length > 0) {
      initEvent(child,vm)
      let addNode = nodeToFragment(child,vm) 
      child.appendChild(addNode)
    } else {
      comfile(node,vm)
    }
    newDocument.appendChild(child)
  }
  return newDocument
}


// 监听器Observer start
function observer(data) {
  if(!data || typeof data !== 'object') return
  // 取出所有属性遍历
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive (data,key,val) {
  observer(data) // 继续向下监听子属性
  Object.defineProperty({
    enumerable: true,
    configurable: false,
    get: function () {
      console.log(`读取了${key}属性`)
      return val 
    },
    set: function (newVal) {
      console.log('监听值变化 ', val, ' --> ', newVal);
      val = newVal
    }
  })
}
 function initData(key,val,vm){
  // console.log(key,val,vm)
  let arr = key.split('.')
  arr.forEach(res => {
    vm.data[res]
  })
 }
 function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
// 监听器Observer end
//订阅者Watcher start
 function Watcher () {

 }
//订阅者Watcher end
// 解析器Compile start
function comfile (node,vm) {
  
  // console.log(vm,33)
  let rg = /\{\{(.*)\}\}/
  let innerHTML = node.nodeValue
  // console.log(rg.test(innerHTML),RegExp.$1)
  if (node.nodeType == 1) {
    // console.log('类型1', node.innerHTML)
  }
  if (node.nodeType == 3) {
    // console.log('类型3', node.innerHTML)
  }
  let attr = node.attributes
  for (let i = 0;i < attr.length; i++) {
    node.addEventListener('input',e => {
      console.log(e.target.name,e.target.value,3322)
      // initData(e.target.name,e.target.value,vm)
    }) 

  }
}

function initEvent (node,vm) {
  let attr = node.attributes
  for (let i = 0;i < attr.length; i++) {
    if (attr[i].nodeName == 'on-click') {
      let functionName = attr[i].nodeValue;
      node.addEventListener('click', e => vm.methods[functionName].bind(vm)(e))
    }
    if(attr[i].nodeName == 'v-model') {
      let name = attr[i].nodeValue
      if(!name) {
        throw 'v-model no value'
      }  
      node.removeAttribute('v-model')
    }
  }
}
// 解析器Compile end



