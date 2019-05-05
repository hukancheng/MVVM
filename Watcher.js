//订阅者Watcher start
function Watcher (vm,reg,cb) {
  Dep.target = this
  this.vm = vm.data
  this.reg = reg
  this.cb = cb
  this.val = this.get() 
  Dep.target = null
}
Watcher.prototype = {
  update() {
    let val = this.get()
    let oldVal = this.val;
    if (val !== oldVal) {
      this.value = value;
      this.cb.call(this.node,val,oldVal)
    }
  },
  get() {
    Dep.target = this
    let val = this.vm[this.reg]
    Dep.target = null
    return val
  }
}

//订阅者Watcher end