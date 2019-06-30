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
  traverse(node) {
    if (this.isElementNode(node)) {
      this.compileNode(node);
      node.childNodes.forEach(child => this.traverse(child))
    } else if (this.isTextNode(node)) {
      this.compileText(node)
    }
  }
  compileText(node) {
    let reg = /{{(.+?)}}/;
    let match;
    while (match = reg.exec(node.nodeValue)) {
      const raw = match[0]; // '{{name}}'
      const key = match[1].trim(); // 'name'
      node.nodeValue = node.nodeValue.replace(raw, this.vm[key]);
      // 添加订阅
      new Observer(this.vm, key, function (val, oldVal) {
        node.nodeValue = node.nodeValue.replace(oldVal, val);
      })
    }
  }
  // 处理节点上的指令
  compileNode(node) {
    Array.from(node.attributes).forEach(attr => {
      if (this.isModelDirective(attr.name)) {
        this.bindModel(node, attr);
      } else if (this.isEventHander(attr.name)) {
        this.bindEventHander(node, attr);
      }
    })
  }
  bindModel(node, attr) {
    node.value = this.vm[attr.value];
    new Observer(this.vm, attr.value, function (val) {
      node.value = val
    })
    node.oninput = (e) => {
      this.vm[attr.value] = e.target.value
    }
  }
  bindEventHander(node, attr) {
    const eventType = attr.name.replace(/^(@|v-on:)/, '');
    const eventHander = attr.value;
    node.addEventListener(eventType, this.vm.$methods[eventHander].bind(this.vm))
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
  isModelDirective(name) {
    return /^v-model/.test(name)
  }
  isEventHander(name) {
    return /^(@|v-on)/.test(name) 
  }
}