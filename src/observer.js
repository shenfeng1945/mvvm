import Subject from './subject';

let currentObserver = null;

export default class Observer {
    constructor(vm, key, cb){
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        this.subjects = {};
        this.value = this.getValue();
    }
    subscribeTo(subject){
        if(!this.subjects[subject.id]){
            subject.addObservers(this);
            this.subjects[subject.id] = subject;
        }
    }
    getValue(){
        // 加入改key属性到观察者数组
        currentObserver = this;
        const value = this.vm[this.key];
        currentObserver = null;
        return value
    }
    update(){
        const oldVal = this.value;
        const val = this.getValue();
        if(oldVal !== val){
            this.cb(val, oldVal)
        }
    }
}




function observe(data) {
    if (!data || typeof data !== 'object') return;
    // 遍历属性
    Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key])
    })
}

function defineReactive(data, key, val) {
    let subject = new Subject();
    observe(val);
    Object.defineProperty(data, key, {
        configurable: false,
        enumerable: true,
        get() {
            // Dep.target && dep.addDep(Dep.target);
            if(currentObserver){
                // 开启订阅
                currentObserver.subscribeTo(subject)
            }
            return val
        },
        set(newVal) {
            if (val === newVal) return;
            console.log(`数据变化了，${key}属性值由 ${val} 变为了 ${newVal}`);
            val = newVal;
            subject.notify();
        }
    })
}


export {observe};