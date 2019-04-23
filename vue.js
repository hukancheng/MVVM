function Vue(op) {
  this.data = op.data,
  this.methods = op.methods
  let id = op.el
  this._ob_ = {}
  // initData(this.data,this._ob_)
  let dom = new Compile(document.getElementById(id),this)
  // let dom = document.getElementById("appp").innerHTML = "Hello World";
  document.getElementById(id).appendChild(dom)
  return this
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
  let Dep = new Dep();
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
      Dep.notify()
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
    this.subs.forEach( s => {
      sub.update()
    })
  }
}

function initData(key,val,vm){
  let arr = key.split('.')
  arr.forEach(res => {
    vm.data[res]
  })
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
// 监听器Observer end

// 解析器Compile start
function Compile (node,vm) {
  this.vm = vm
  this.initDocment = node
  this.fragment = this.nodeToFragment(node);
  this.init(this.fragment)
  return this.fragment;
}

Compile.prototype = {
  init: function (e) {
    this.compileElement(e);
  },

  nodeToFragment: function(node) {
    let newDocument = document.createDocumentFragment()
    let child
    // 将节点拷贝到fragment
    while(child = node.firstChild) {
      newDocument.appendChild(child)
    }
    return newDocument;
  },

  compileElement: function(node) {
    let childNodes = node.childNodes;
    [].slice.call(childNodes).forEach( n => {
      let reg = /\{\{(.*)\}\}/;
      let text = n.textContent
      if (n.nodeType == 1) {
        // this.compile(node)
        utils.eventHandler(n,this.vm)
      } 
      else if ((n.nodeType == 3) && reg.test(text)) {
        // this.compileText(node, RegExp.$1);
        this.compileText(node,RegExp.$1.trim())
        // utils.inputHandler(node,vm)
        console.log(RegExp.$1,`{{${RegExp.$1}}}`)
      }
      // 继续向下递归子节点
      if(n.childNodes && n.childNodes.length) {
        this.compileElement(n)
      }
    })
  },
  compileText: function(node,key) {
    console.log(this,55)

  },

  compile: function(node) {
    let attrs = node.attributes;
    [].slice.call(attrs).forEach( n => {
      // 注册指令
      let attrName = attr.name
      if (attrName.indexOf('v-') == 0) {
        let val = attr.value

      }
    })
  },


}

let utils = {
  eventHandler: function(node,vm) {
    let attr = node.attributes
    for (let i = 0;i < attr.length; i++) {
      if (attr[i].nodeName == 'on-click') {
        let functionName = attr[i].nodeValue;
        node.addEventListener('click', e => vm.methods[functionName].bind(vm)(e));
      }
      if(attr[i].nodeName == 'v-model') {
        let name = attr[i].nodeValue
        if(!name) {
          throw 'v-model no value'
        }  
        node.removeAttribute('v-model')
      }
      // if(attr[i].nodeName == 'input') {
      //   node.addEventListener('input',e => {
      //     console.log(e.target)
      //   })
      // }

    }
  },
  inputHandler: function(node,vm) {
    // node.addEventListener('input',e => {
    //   console.log(e.target)
    // })
  }

}

// 解析器Compile end
//订阅者Watcher start
function Watcher (vm,reg,cb) {
this.vm = vm
this.reg = reg
this.cb = cb
this.val = this.get() 
}
Watcher.prototype = {
  update() {
    this.run()
  },
  run() {
    let val = this.get()
    let oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm,val,oldVal)
    }
  },
  get() {
    dep.target = this
    let val = this.vm[reg]
    Dep.target = null
    return val
  }
}

//订阅者Watcher end


