let id = 1;
export default class Watcher {
    constructor() {
        this.id = id++;
        this.observers = [];
    }
    addObservers(sub) {
        this.observers.push(sub);
    }
    removeObserver(observer){
      const index = this.observers.indexOf(observer);
      if(index > -1){
          this.observers.splice(index, 1)
      }
    }
    notify() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
}