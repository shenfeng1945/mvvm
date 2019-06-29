import Compile from './compile';
import {observe} from './observer';

export default class MVVM {
  constructor(options) {
    this.init(options)
    observe(options.data);
    new Compile(this);
  }
  init(options){
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data || {};
    
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