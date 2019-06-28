function MVVM(options){
  this.$options = options;
  let data = options.data;
  observe(data);
  let compile = new Compile(options.el, this);
}