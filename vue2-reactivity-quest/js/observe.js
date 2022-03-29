import { isObj, hasOwn } from "./utils.js";

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
  Object.defineProperty(object, key, {
    set(val) {
      value = val;
    },
    get() {
      return value;
    },
    enumerable: true,
    configurable: true
  });
}
