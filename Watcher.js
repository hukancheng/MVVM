//订阅者Watcher start
function Watcher (vm,reg,cb) {
  this.vm = vm
  this.reg = reg
  this.cb = cb
  this.val = this.get() 
}
Watcher.prototype = {
  update() {
    let val = this.get()
    let oldVal = this.val;
    if (val !== oldVal) {
      this.val = val;
      this.cb.call(this.vm,val, this.val)
    }
  },
  get() {
    Dep.target = this
    let val = this.vm.data[this.reg]
    Dep.target = null
    return val
  }
}

//订阅者Watcher end