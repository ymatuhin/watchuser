import { clearString } from './helpers';

export default function() {
  const info = { state: document.readyState };
  return `${this.type} ${clearString(info)}`;
}
