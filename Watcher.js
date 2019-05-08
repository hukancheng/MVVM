//订阅者Watcher start
function Watcher (vm,reg,cb) {
  Dep.target = this
  this.vm = vm
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
      this.val = val;
      this.cb.call(this.vm,val, this.val)
    }
  },
  get() {
    let { abValue } = utils.getData(this.reg,this.vm.data)
    return abValue
  }
}

//订阅者Watcher end