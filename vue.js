function Vue(op) {
  this.data = op.data,
  this.mothods = op.mothods
  let id = op.el
  this._proptype_ = {}
  let dom = nodeToFragment(document.getElementById(id),this)
  // let dom = document.getElementById("appp").innerHTML = "Hello World";
  document.getElementById(id).appendChild(dom)
  return this
}

function nodeToFragment(node,vm) {
  // debugger
  console.log(node.childNodes,9999)
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
    if(node.childNodes[i].childNodes.length > 0){
      console.log(node.childNodes[i], '有子节点:',node.childNodes[i].childNodes.length)
      nodeToFragment(node.childNodes[i])
      // newDocument.appendChild(newNode,vm)
    } else {
      comfile(node.childNodes[i],vm)
    }
    newDocument.appendChild(node.childNodes[i])
    console.log(newDocument,77777)
  }
  return newDocument
}

function comfile (node,vm) {
  console.log(node,333)
}