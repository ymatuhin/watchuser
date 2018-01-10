import { clearString } from './helpers';

let prevVal = null;

export default function() {
  this.toStringCalled = true;
  const text = document.getSelection
    ? document.getSelection().toString()
    : '???';

  if (!this.toStringCalled && text === prevVal) return null;
  prevVal = text;

  return `${this.type} ${clearString({ text })}`;
}
