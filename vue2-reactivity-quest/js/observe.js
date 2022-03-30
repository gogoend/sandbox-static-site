import { isObj, hasOwn } from "./utils.js";

import { Dep } from "./dep.js";

// 响应式入口
export const observe = (object) => {
  if (!isObj(object)) {
    return;
  }
  let ob;
  // 如果对象已经进行过响应式处理，就复用已有的Observe对象
  if (hasOwn(object, '__ob__') && object.__ob__ instanceof Observer) {
    ob = object.__ob__;
  }
  // 如果没有，且对象可以扩展，就新建一个Observe对象
  else if (Object.isExtensible(object)) {
    ob = new Observer(object);
  }
  return ob;
};

// 
class Observer {
  val
  constructor (val) {
    this.val = val

    // 在当前属性上定义一个__ob__属性，以标识出该对象已经是响应式对象
    // 也就是说使用这个类的时候，会对原始值进行更改
    Object.defineProperty(val, "__ob__", {
      value: this,
      enumerable: false
    });
    // 遍历对象下的key，逐个转换为响应式属性
    this.walk(val)
  }
  walk (val) {
    for (let key in val) {
      if (hasOwn(val, key)) {
        defineObserve(val, key);
      }
    }
  }
}

function defineObserve(object, key) {
  // 当前的属性值为
  let value = object[key];
  // 为当前属性值添加响应式
  observe(value);
  // 每个属性对应一个依赖管理器
  let dep = new Dep();
  Object.defineProperty(object, key, {
    set(val) {
      value = val;
      // 将新值中各个属性转换为响应式属性
      observe(val)
      // 当属性被更改后，应该通知到该属性的所有依赖
      dep.notify();
    },
    get() {
      // TODO: 首次访问该属性时，应该让依赖被收集到
      // ...
      return value;
    },
    enumerable: true,
    configurable: true
  });
}
