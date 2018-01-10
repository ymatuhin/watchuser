import { startWith } from '../utils';
import elementToString from './element.toString';

import mouseToString from './mouse.toString';
import touchToString from './touch.toString';
import pointerToString from './pointer.toString';
import clickToString from './click.toString';
import scrollToString from './scroll.toString';
import selectionToString from './selection.toString';
import readyStateToString from './readyState.toString';
import keyboardToString from './keyboard.toString';
import resizeToString from './resize.toString';
import clipboardToString from './clipboard.toString';
import wheelToString from './wheel.toString';

function baseToString() {
  return `${this.type}`;
}

export default event => {
  if (startWith(event.type, 'mouse')) event.toString = mouseToString;
  else if (startWith(event.type, 'touch')) event.toString = touchToString;
  else if (startWith(event.type, 'pointer')) event.toString = pointerToString;
  else if (startWith(event.type, 'key')) event.toString = keyboardToString;
  else if (startWith(event.type, 'click')) event.toString = clickToString;
  else if (startWith(event.type, 'scroll')) event.toString = scrollToString;
  else if (startWith(event.type, 'load')) event.toString = elementToString;
  else if (startWith(event.type, 'error')) event.toString = elementToString;
  else if (startWith(event.type, 'focus')) event.toString = elementToString;
  else if (startWith(event.type, 'blur')) event.toString = elementToString;
  else if (startWith(event.type, 'resize')) event.toString = resizeToString;
  else if (startWith(event.type, 'copy')) event.toString = clipboardToString;
  else if (startWith(event.type, 'cut')) event.toString = clipboardToString;
  else if (startWith(event.type, 'paste')) event.toString = clipboardToString;
  else if (startWith(event.type, 'wheel')) event.toString = wheelToString;
  else if (startWith(event.type, 'selection'))
    event.toString = selectionToString;
  else if (startWith(event.type, 'readystate'))
    event.toString = readyStateToString;
  else event.toString = baseToString;

  return event;
};
