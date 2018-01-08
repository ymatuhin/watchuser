export const includes = (arr: string[] | string, str: string) =>
  arr.indexOf(str) !== -1;
export const startWith = (arr: string[] | string, str: string) =>
  arr.indexOf(str) === 0;
export const pointerSupports = Boolean(window.PointerEvent);

export default { includes, startWith, pointerSupports };
