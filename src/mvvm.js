import Compile from './compile';
import {observe} from './observer';

export default class MVVM {
  constructor(options) {
    this.init(options);
    // 数据劫持
    observe(options.data);
    // 视图初始化
    new Compile(this);
  }
  init(options){
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data || {};
    this.$methods = options.methods || {};
    
    //把$data 中的数据直接代理到当前 vm 对象
    // 使this.$data.name === this.name
    for(let key in this.$data){
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get(){
          return this.$data[key]
        },
        set(newVal){
          this.$data[key] = newVal
        }
      })
    }
  }
}