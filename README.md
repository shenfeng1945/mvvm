#### 双向绑定

在单向绑定的基础上，给可输入的元素(input,textarea)绑定上change事件，来动态修改model和view

Vue实现双向绑定是采用数据劫持配合发布者-订阅者模式的方式，通过Object.defineProperty()劫持各个属性的getter，setter，在数据变动时发布消息给订阅者，触发对应的事件回调。