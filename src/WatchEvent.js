import { startWith, includes } from './utils';

class WatchEvent {
  event: Object;

  constructor(event: Object) {
    this.event = this.formatEvent(event);
  }

  formatEvent(event: Event): Object {
    const { type } = event;
    const info = {};
    const element = event.target || event.srcElement;

    if (type) info.type = type;
    if (type === 'readystatechange') info.readyState = document.readyState;
    if (type === 'visibilitychange')
      info.visibilityState = document.visibilityState;

    if (element) {
      info.element = element;
      info.elementHtml = this.formatDomElement(element);
    }

    if (type === 'scroll' && element) {
      info.scroll =
        element.toString() === '[object HTMLDocument]'
          ? `${window.scrollX}:${window.scrollY}`
          : `${element.scrollLeft}:${element.scrollTop}`;
    }

    // key events

    if (startWith(type, 'key')) {
      const code = event.charCode || event.keyCode || event.which;
      const key = event.key || String.fromCharCode(code) || event.code;
      if (code) info.code = code;
      if (key) info.key = key;

      if (event.metaKey) info.metaKey = event.metaKey;
      if (event.altKey) info.altKey = event.altKey;
      if (event.shiftKey) info.shiftKey = event.shiftKey;
      if (event.ctrlKey) info.ctrlKey = event.ctrlKey;
    }

    if (event.deltaX) info.deltaX = event.deltaX;
    if (event.deltaY) info.deltaY = event.deltaY;
    if (event.deltaZ) info.deltaZ = event.deltaZ;

    return info;
  }

  formatDomElement(element: Element) {
    const rx = /<\/\w*>/gi;
    const formatAsString = str => str.replace('[object ', '').replace(']', '');
    const safeString =
      element.cloneNode && element.outerHTML
        ? element.cloneNode().outerHTML || ''
        : formatAsString(element.toString() || '');
    const elementHtml = safeString.replace(rx, '');
    return elementHtml;
  }

  toString() {
    const {
      type,
      elementHtml,
      visibilityState,
      readyState,
      scroll,
      key,
      code,
      metaKey,
      altKey,
      ctrlKey,
      shiftKey,
      deltaX,
      deltaY,
      deltaZ,
    } = this.event;

    let str = `${type}`;
    if (elementHtml) str += ` ${elementHtml}`;
    if (visibilityState) str += ` ${visibilityState}`;
    if (readyState) str += ` ${readyState}`;
    if (scroll) str += ` ${scroll}`;

    if (startWith(type, 'key')) {
      if (key) str += ` ${key}`;
      if (code) str += ` (${code})`;
      if (metaKey && !includes(str, 'Meta')) str += ' [Meta]';
      if (altKey && !includes(str, 'Alt')) str += ' [Alt]';
      if (ctrlKey && !includes(str, 'Ctrl')) str += ' [Ctrl]';
      if (shiftKey && !includes(str, 'Shift')) str += ' [Shift]';
    }

    if (deltaX) str += ` deltaX:${deltaX}`;
    if (deltaY) str += ` deltaY:${deltaY}`;
    if (deltaZ) str += ` deltaZ:${deltaZ}`;

    return str;
  }
}

export default WatchEvent;

// saveEvent(event: Object) {
//   this.actions.push(event);

//   const action = {};
//   const {
//     type,
//     screenX,
//     screenY,
//     target,
//     srcElement,
//     keyCode,
//     key,
//     metaKey,
//     shiftKey,
//     ctrlKey,
//     altKey,
//   } = event;
//   const isKeyboardEvent = type.indexOf('key') === 0;
//   const coords = screenX && screenY ? `${screenX}x${screenY}` : null;
//   const element = target || srcElement;

//   if (element) {
//

//     if (!isKeyboardEvent) {
//       action.element = element;
//       action.elementHtml = elementHtml;
//     }
//   }

//   action.type = type;
//   if (coords) action.coords = coords;
//   if (keyCode) action.keyCode = keyCode;
//   if (key) action.key = key;
//   if (altKey) action.altKey = altKey;
//   if (metaKey) action.metaKey = metaKey;
//   if (ctrlKey) action.ctrlKey = ctrlKey;
//   if (shiftKey) action.shiftKey = shiftKey;

//   if (this.lastTime) {
//     const now = new Date().valueOf();
//     const diff = now - this.lastTime;
//     action.time = diff / 1000;
//   }

//   this.lastTime = new Date().valueOf();
//   this.actions.unshift(action);
// }

// getActions() {
//   return this.actions;
// }

// toString() {
//   return this.actions.reduce((acc: string, action: Object): string => {
//     acc += upperFirst(action.type);

//     if (action.type === 'keydown') acc += ` ${action.key}:${action.keyCode}`;
//     if (action.type === 'focus') acc += ` ${action.elementHtml}`;
//     if (action.type === 'scroll') {
//       const { scrollTop, scrollLeft } = action.element;
//       acc += ` ${action.elementHtml} to ${scrollTop}:${scrollLeft}`;
//     }
//     if (action.type === 'mousedown' || action.type === 'touchstart')
//       acc += ` ${action.coords} into ${action.elementHtml}`;
//     if (action.type === 'mousemove')
//       acc += ` ${action.coords} over ${action.elementHtml}`;

//     const time = action.time ? ` +${action.time}s` : '';
//     acc += `${time}\n`;

//     return acc;
//   }, '');
// }
