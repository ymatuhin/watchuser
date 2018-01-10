import { stringKeys, stringElement, clearString } from './helpers';

export default function() {
  const { type, touches } = this;
  const formatTouches = [];

  const len = touches.length;
  for (let i = 0; i < len; i++) {
    formatTouches.push({
      x: touches[i].pageX,
      y: touches[i].pageX,
    });
  }

  const info = {
    touches: len ? formatTouches : null,
    meta: stringKeys(this),
    element: stringElement(this),
  };

  return `${type} ${clearString(info)}`;
}
