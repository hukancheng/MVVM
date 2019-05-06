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
        if (reg.test(text)) {
          this.compileText(node,RegExp.$1)
        }
      }
      // 继续向下递归子节点
      if(n.childNodes && n.childNodes.length) {
        this.compileElement(n)
      }
    })
  },
  compileText: function(node,key) {
    utils.text(this.vm,node,key)
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
  }

}

var utils = {
  bind: function (node,vm,key) {
    var updaterFn = updater['textUpdater'];
    var val = this.getVal(vm, key);
    updaterFn && updaterFn(node,key, val);

    new Watcher(vm, key, function(value, oldValue) {
      updater.textUpdater1(node,key,oldValue)
    });
  },

  text: function (vm,node,key) {
    this.bind(node,vm,key,'text')  
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
            let val = e.target.value
            if(newVal == val ) return
            this.setVal(vm,name,val)
              new Watcher(vm, name, function(value, oldValue) {
                // updater.textUpdater1(node,name,oldValue)
              });
          })
        }

        node.removeAttribute('v-model')
      }
      node.removeAttribute(attrName)
    }
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
    key.forEach((v,i) => {
      if (i < key.length - 1) {
        data = data[v];
      } else {
          data[v] = val;
      }
    })

  }

}
var updater = {
  textUpdater: function(node,key,val) {

    let text = node.innerText.replace(`{{${key}}}`,val)
    node.textContent = text
  },
  textUpdater1: function(node,key,val) {
    // console.log(node,666)
    node.textContent = val
  }
}

