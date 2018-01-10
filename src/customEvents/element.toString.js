import { clearString, stringElement } from './helpers';

export default function() {
  const info = { element: stringElement(this) };
  return `${this.type} ${clearString(info)}`;
}
