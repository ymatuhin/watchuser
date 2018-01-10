import {
  stringKeys,
  stringElement,
  stringMouseButton,
  clearString,
} from './helpers';

export default function() {
  const button =
    this.type === 'mousedown' || this.type === 'mouseup'
      ? stringMouseButton(this)
      : null;
  const width = this.width === 1 ? null : this.width;
  const height = this.height === 1 ? null : this.height;

  const info = {
    x: this.screenX,
    y: this.screenY,
    button,
    width,
    height,
    meta: stringKeys(this),
    element: stringElement(this),
  };

  return `${this.type} ${clearString(info)}`;
}
