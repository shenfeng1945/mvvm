import Observer from './observer';

export default class Compile {
  constructor(vm) {
    this.vm = vm;
    this.node = vm.$el;
    // if (this.node) {
      // this.$fragment = this.node2Fragment(this.node);
      this.compile();
      // this.$el.appendChild(this.$fragment);
    // }
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
      node.nodeValue = node.nodeValue.replace(raw, this.vm[key])
    }
  }
  compileNode(node){

  }
  traverse(node) {
    if(this.isElementNode(node)){
       this.compileNode(node)
       node.childNodes.forEach(child => this.traverse(child))
    }else if(this.isTextNode(node)){
      this.compileText(node)
    }
    // let childNodes = this.$fragment.childNodes;
    // let me = this;
    // Array.from(childNodes).forEach(node => {
    //   let text = node.textContent;
    //   let textReg = /\{\{(.*)\}\}/;
    //   if (this.isElementNode(node)) {

    //   } else if (this.isTextNode(node) && textReg.test(text)) {
    //     let name = RegExp.$1.trim()
    //     node.textContent = me.$vm.$options.data[name]
    //   }
    // })
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