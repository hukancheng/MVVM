function Vue(op) {
  this.data = op.data,
  this.methods = op.methods
  let id = op.el
  this._ob_ = {}
  observer(this.data)
  let dom = new Compile(document.getElementById(id),this)
  // let dom = document.getElementById("appp").innerHTML = "Hello World";
  document.getElementById(id).appendChild(dom)
  return this
}


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
      if(Dep.target){
        dep.addSub(Dep.target);
      }
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
    this.subs.forEach( s => {
      console.log(331)
      s.update()
    })
  }
}
Dep.target = null;

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
      else if (n.nodeType == 3) {
        // this.compileText(node, RegExp.$1);

        // utils.inputHandler(node,vm)
        
        if (reg.test(text)) {
          this.compileText(node,RegExp.$1.trim())
        }
      }
      // 继续向下递归子节点
      if(n.childNodes && n.childNodes.length) {
        this.compileElement(n)
      }
    })
  },
  compileText: function(node,key) {
    // console.log(this,key,55)
    utils.text(node,key,this.vm)
  },

  compile: function(node) {
    let attrs = node.attributes;
    [].slice.call(attrs).forEach( n => {
      // 注册指令
      let attrName = attr.name
      // console.log(attrName,311)
      if (attrName.indexOf('v-') == 0) {
        let val = attr.value

      }
      node.removeAttribute(attrName);
    })
  },


}

let utils = {
  text: function (node,key,vm) {
    let val = this.getVal(vm,key)
    let text = node.innerText.replace(`{{${key}}}`,val)
    node.textContent = text
  },
  eventHandler: function(node,vm) {
    let attr = node.attributes
    for (let i = 0;i < attr.length; i++) {
      let attrName = attr[i].name
      let name = attr[i].nodeValue
      if (attr[i].nodeName == 'on-click') {
        let functionName = attr[i].nodeValue;
        if(!name) {
          throw 'on-click no value'
        } 
        node.addEventListener('click', e => vm.methods[functionName].bind(vm)(e));
      }

      if(attr[i].nodeName == 'v-model') {
        if(!name) {
          throw 'v-model no value'
        }  

      if(node.nodeName == 'TEXTAREA' || node.nodeName == 'INPUT') {
        let newVal = this.getVal(vm,name)
        node.addEventListener('input',e => { 
          // console.log(e,e.target.value,name)
          let val = e.target.value
          if(newVal == val ) return
          this.setVal(vm,name,val)
        })
      }
        node.removeAttribute('v-model')
      }
      node.removeAttribute(attrName)
    }
  },

  compile:function (node,vm,exp,dir) {
    let updaterFn = updater[dir + 'Updater'];

  },
  getVal: function (vm,name) {
    let val = vm.data
    let key = name.split('.')
    key.forEach( r => {
      val = val[r]
    })
    return val
  },
  setVal: function(vm,name,val) {
    let data = vm.data
    let key = name.split('.')
    key.forEach( (v,i) => {
      if (i < key.length - 1) {
        data = data[v];
      } else {
          data[v] = val;
      }
    })

  }

}

// 解析器Compile end
//订阅者Watcher start
function Watcher (vm,reg,cb) {
  this.vm = vm
  this.reg = reg
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


