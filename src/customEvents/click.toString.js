import {
  stringKeys,
  stringElement,
  stringMouseButton,
  clearString,
} from './helpers';

export default function() {
  const { type, pressure, screenX: x, screenY: y } = this;
  const button = stringMouseButton(this);

  const info = {
    x,
    y,
    pressure,
    button,
    meta: stringKeys(this),
    element: stringElement(this),
  };

  return `${type} ${clearString(info)}`;
}
