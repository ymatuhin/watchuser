import { startWith, includes } from '../utils';
import elementToString from './element.toString';
import emptyToString from './empty.toString';

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
import visibilityToString from './visibility.toString';
import screenOrientationToString from './screenOrientation.toString';

export default event => {
  event.toString = elementToString;

  if (startWith(event.type, 'pageshow')) event.toString = emptyToString;
  if (startWith(event.type, 'mouse')) event.toString = mouseToString;
  if (startWith(event.type, 'touch')) event.toString = touchToString;
  if (startWith(event.type, 'pointer')) event.toString = pointerToString;
  if (startWith(event.type, 'key')) event.toString = keyboardToString;
  if (startWith(event.type, 'click')) event.toString = clickToString;
  if (startWith(event.type, 'scroll')) event.toString = scrollToString;
  if (startWith(event.type, 'resize')) event.toString = resizeToString;
  if (startWith(event.type, 'copy')) event.toString = clipboardToString;
  if (startWith(event.type, 'cut')) event.toString = clipboardToString;
  if (startWith(event.type, 'paste')) event.toString = clipboardToString;
  if (startWith(event.type, 'wheel')) event.toString = wheelToString;
  if (startWith(event.type, 'readystate')) event.toString = readyStateToString;
  if (startWith(event.type, 'visibility')) event.toString = visibilityToString;
  if (startWith(event.type, 'selectionchange'))
    event.toString = selectionToString;
  if (includes(event.type, 'orientationchange'))
    event.toString = screenOrientationToString;

  return event;
};
