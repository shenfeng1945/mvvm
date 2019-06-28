function observe(data) {
    if (!data || typeof data !== 'object') return;
    // 遍历属性
    Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key])
    })
}

function defineReactive(data, key, val) {
    let dep = new Dep();
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
            dep.notify();
        }
    })
}

function Dep() {
    this.subs = [];
}
Dep.prototype.addSubs = function (sub) {
    this.subs.push(sub);
}
Dep.prototype.notify = function () {
    this.subs.forEach(sub => {
        sub.update()
    })
}