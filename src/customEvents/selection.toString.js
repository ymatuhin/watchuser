import { clearString } from './helpers';

let prevVal = '';

export default function() {
  const sel = document.getSelection();
  const text = sel.toString();

  if (text === prevVal) return null;
  prevVal = text;

  return `${this.type} "${clearString({ text })}"`;
}
