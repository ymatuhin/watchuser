import { stringKeys, stringElement, clearString } from './helpers';

export default function() {
  const { type, charCode, keyCode, which, key, code } = this;
  const myCode = charCode || keyCode || which;
  const myKey = key || String.fromCharCode(code) || code;

  const info = {
    code: myCode,
    key: myKey,
    meta: stringKeys(this),
    element: stringElement(this),
  };

  return `${type} ${clearString(info)}`;
}
