export const pointerSupports = Boolean(window.PointerEvent);

export const includes = (arr: string[] | string, str: string) =>
  arr.indexOf(str) !== -1;

export const startWith = (arr: string[] | string, str: string) =>
  arr.indexOf(str) === 0;

export const endWith = (fullString: string, str: string) => {
  const index = fullString.indexOf(str);
  return str.length + index === fullString.length;
};

export const isFunction = fn => typeof fn === 'function';

// export const storeWrapper = (store: Object) => {
//   const publicApi = {};
//   const methods = Object.keys(store).filter(key => isFunction(store[key]));
//   methods.forEach(methodName => {
//     publicApi[methodName] = (...args) => {
//       // console.log(`store:${methodName}`, ...args);
//       return store[methodName](...args);
//     };
//   });
//   return publicApi;
// };

export const getAllEvents = (): Object => {
  const list = { window: [], document: [] };

  for (const method in window) {
    if (startWith(method, 'on')) {
      const withoutPrefix = method.slice(2);
      list.window.push(withoutPrefix);
    }
  }

  for (const method in document) {
    if (!startWith(method, 'on')) continue;
    const withoutPrefix = method.slice(2);
    if (!includes(list.window, withoutPrefix)) {
      list.document.push(withoutPrefix);
    }
  }

  return list;
};
