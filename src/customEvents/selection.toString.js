import { clearString } from './helpers';

export default function() {
  const text = document.getSelection
    ? document.getSelection().toString()
    : '???';

  if (!text) return null;

  return `${this.type} ${clearString({ text })}`;
}
