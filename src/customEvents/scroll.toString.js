import { clearString, getElement, stringElement } from './helpers';

export default function() {
  const el = getElement(this);
  const element = el === document ? document.documentElement : el;
  const x = element.scrollLeft;
  const y = element.scrollTop;
  const height = element.scrollHeight;

  const info = {
    x,
    y,
    height,
    element: stringElement(this),
  };

  return `${this.type} ${clearString(info)}`;
}
