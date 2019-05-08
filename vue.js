function Vue(op) {
  this.data = op.data,
  this.methods = op.methods
  let id = op.el
  observer(this.data)
  let dom = new Compile(document.getElementById(id),this)
  // let dom = document.getElementById("appp").innerHTML = "Hello World";
  document.getElementById(id).appendChild(dom)
  return this
}