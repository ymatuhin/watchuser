import { clearString } from './helpers';

export default function() {
  const info = { state: document.visibilityState };
  return `${this.type} ${clearString(info)}`;
}
