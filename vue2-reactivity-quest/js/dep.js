import { remove } from "./utils.js";

export class Dep {
  static dId = 0
  static get target () {
    return window.globalWatcher
  }

  constructor() {
    this.id = Dep.dId++
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    remove(this.subs, sub);
  }
  notify() {
    const subs = this.subs.concat();
    for (var i = 0, l = subs.length; i < l; i++) {
      try {
        subs[i].update()
      } catch (err) {
        console.err(err);
        break;
      }
    }
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
}
