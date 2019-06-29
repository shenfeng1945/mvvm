import Subject from './subject';

export default class Observer {
    
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
            return val
        },
        set(newVal) {
            if (val === newVal) return;
            console.log(`数据变化了，${key}属性值由 ${val} 变为了 ${newVal}`);
            val = newVal
            subject.notify();
        }
    })
}


export {observe};