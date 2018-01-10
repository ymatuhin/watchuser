import { stringKeys, stringElement, clearString } from './helpers';

export default function() {
  const width = this.width === 1 ? null : this.width;
  const height = this.height === 1 ? null : this.height;

  const info = {
    x: this.screenX,
    y: this.screenY,
    width,
    height,
    meta: stringKeys(this),
    element: stringElement(this),
  };

  return `${this.type} ${clearString(info)}`;
}
