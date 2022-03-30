import { isObj, hasOwn } from "./utils.js";

import { Dep } from "./dep.js";

// 响应式入口
export const observe = (object) => {
  if (!isObj(object)) {
    return;
  }
  for (let key in object) {
    if (hasOwn(object, key)) {
      defineObserve(object, key);
    }
  }
};

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
