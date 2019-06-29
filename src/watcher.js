function Watcher(){}
Watcher.prototype.get = function(key){
  Dep.target = this;
}