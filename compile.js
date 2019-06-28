function Compile(el, vm){
  this.$vm = vm;
  this.$el = document.querySelector(el);
  if(this.$el){
     this.$fragment = this.node2Fragment(this.$el);
     this.init();
     this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype.isElementNode = function(el){
  return el.nodeType === 1
}
Compile.prototype.isTextNode = function(el){
  return el.nodeType === 3
}

Compile.prototype.init = function(){
  let childNodes = this.$fragment.childNodes;
  let me = this;
  Array.from(childNodes).forEach(node => {
    let text = node.textContent;
    let textReg = /\{\{(.*)\}\}/;
    if(this.isElementNode(node)){
    }else if(this.isTextNode(node) && textReg.test(text)){
      let name = RegExp.$1.trim()
      node.textContent = me.$vm.$options.data[name]
    }
  })
}

// node节点转为fragment
Compile.prototype.node2Fragment = function(el){
  let fragment = document.createDocumentFragment();
  let child;
  while(child = el.firstChild){
      fragment.appendChild(child)
  }
  return fragment;
}
// Compile.prototype.compileText = function(node, )