function Vue(op) {
  this.data = op.data,
  this.methods = op.methods
  let id = op.el
  this._ob_ = {}
  console.log(this)
  let dom = nodeToFragment(document.getElementById(id),this)
  // let dom = document.getElementById("appp").innerHTML = "Hello World";
  document.getElementById(id).appendChild(dom)
  return this
}

function nodeToFragment(node,vm) {
  // debugger
  let newDocument = document.createDocumentFragment();
  let child;
  // let i = 0
  // while((child = node.firstChild) && (i < 1500)) {
  //   i++
  //   if (child.childNodes && child.childNodes.length > 0) {
  //     let addNode = nodeToFragment(child,vm) 
  //     child.appendChild(addNode)
  //   } else {
  //     comfile(node,vm)
  //   }
  //   newDocument.appendChild(child)
  // }
  for (let i = 0; i < node.childNodes.length; i++) {
    if(node.childNodes[i].nodeType == 1){
      // console.log(node.childNodes[i], '有子节点:',node.childNodes[i].childNodes.length)
      if(node.childNodes[i].nodeType == 1 && node.childNodes[i].attributes.length > 0) { 
        // console.log(node.childNodes[i].attributes, 'zidingyi')
        initEvent(node,i,vm)
      }
      let newNode = nodeToFragment(node.childNodes[i],vm)
      newDocument.appendChild(newNode,vm)
    } else {
      comfile(node.childNodes[i],vm)
    }
    // newDocument.appendChild(node.childNodes[i])
    // console.log(newDocument,77777)
  }
  return newDocument
}

function comfile (node,vm) {
  // console.log(vm,33)
  let rg = /\{\{(.*)\}\}/
  let innerHTML = node.nodeValue
  console.log(node,333,innerHTML)
  console.log(rg.test(innerHTML),RegExp.$1)
}

function initEvent (node,index,vm) {
  let attr = node.childNodes[index].attributes
  for (let i = 0;i < attr.length; i++) {
    if (attr[i].nodeName == 'on-click') {
      let functionName = attr[i].nodeValue;
      node.childNodes[index].addEventListener('click', e => vm.methods[functionName].bind(vm)(e))
    }
    if(attr[i].nodeName == 'v-model') {
      let name = attr[i].nodeValue
      if(!name) {
        throw 'v-model no value'
      }
      node.childNodes[index].addEventListener('input',e => {
        diffData(name,e.target.value,vm)
        
      })
      
    }
  }
}

function diffData (key,val,vm) {
  console.log(key,val,vm)
  
}

// 监听器Observer start

// 监听器Observer end

//订阅者Watcher start
//订阅者Watcher end

// 解析器Compile start
// 解析器Compile end



