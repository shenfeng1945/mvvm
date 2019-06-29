import Observer from './observer';

export default class Compile {
  constructor(vm) {
    this.vm = vm;
    this.node = vm.$el;
    this.compile();
  }
  compile() {
    this.traverse(this.node)
  }
  compileText(node){
    let reg = /{{(.+?)}}/;
    let match;
    while(match = reg.exec(node.nodeValue)){
      const raw = match[0]; // '{{name}}'
      const key = match[1].trim(); // 'name'
      node.nodeValue = node.nodeValue.replace(raw, this.vm[key]);
      new Observer(this.vm, key, function(val,oldVal){
        node.nodeValue = node.nodeValue.replace(oldVal, val);
      })
    }
  }
  compileNode(node){

  }
  traverse(node) {
    if(this.isElementNode(node)){
       this.compileNode(node);
       node.childNodes.forEach(child => this.traverse(child))
    }else if(this.isTextNode(node)){
      this.compileText(node)
    }
  }
  isElementNode(el) {
    return el.nodeType === 1
  }
  isTextNode(el) {
    return el.nodeType === 3
  }
  node2Fragment(el) {
    let fragment = document.createDocumentFragment();
    let child;
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment;
  }
}