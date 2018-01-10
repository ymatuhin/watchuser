import { clearString, stringElement } from './helpers';

export default function() {
  const x = this.screenX;
  const y = this.screenX;
  const info = { x, y, element: stringElement(this) };
  return `${this.type} ${clearString(info)}`;
}
