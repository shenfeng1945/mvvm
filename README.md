### Vue实现双向绑定原理

Vue实现双向绑定是采用数据劫持配合发布者-订阅者模式的方式，通过`Object.defineProperty()`劫持各个属性的`getter`和`setter`，当数据变动时发布消息给订阅者，并触发对应的事件回调。

#### 示例

```js
<body>
    <div id="app">
        <div>
           name: {{name}}  
        </div>
        <div>
           <input type="text" v-model="name">
        </div>
        <button @click="onClick">change name</button>
    </div>
</body>
<script src="./src/index.js"></script>
<script>
    let mvvm = new MVVM({
        el: '#app',
        data: {
            name: 'allen',
        },
        methods: {
            onClick(){
              this.name = 'curry'
            }
        }
    });
</script>
```
![](https://i.loli.net/2019/06/30/5d180f49e723042343.gif)


#### 思路整理

1. 实现一个数据监听器`Observer`，对数据对象的所有属性继续监听，如有变动获取最新值并通知订阅者。
2. 实现一个指令编译器`Compile`，对每个元素节点的指令进行扫描，绑定相应事件，替换模板数据，并视图初始化。
3. 实现一个订阅器`Watcher`，作为`Observer`和`Compile`的中间桥梁，在解析指令时，添加订阅到`Watcher`里，当数据变动时，收到来自`Observer`的通知，执行绑定的回调函数，从而更新视图。
3. MVVM作为入口函数，整合以上三者。

#### 运行

```js
yarn start
```