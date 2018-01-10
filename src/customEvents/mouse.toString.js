import {
  stringKeys,
  stringElement,
  stringMouseButton,
  clearString,
} from './helpers';

export default function() {
  const { type, pressure, screenX: x, screenY: y, width, height } = this;

  const button =
    type === 'mousedown' || type === 'mouseup' ? stringMouseButton(this) : null;

  const info = {
    x,
    y,
    pressure,
    button,
    width,
    height,
    meta: stringKeys(this),
    element: stringElement(this),
  };

  return `${type} ${clearString(info)}`;
}
