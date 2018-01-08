// @flow

import throttle from 'lodash.throttle';
import WatchEvent from './WatchEvent';
import { startWith, pointerSupports } from './utils';

class WatchUser {
  events: Object[];
  listeners: Function[];

  constructor() {
    this.events = [];
    this.listeners = [];

    this.init();
  }

  init() {
    const eventsList = [];

    for (const method in window) {
      if (method.indexOf('on') === 0) {
        eventsList.push(method);
        this.addMethodListener(method, window);
      }
    }

    for (const method in document) {
      if (method.indexOf('on') === 0) {
        if (eventsList.indexOf(method) === -1) {
          this.addMethodListener(method, document);
        }
      }
    }
  }

  addMethodListener(method: string, where: Document) {
    const listenName = method.slice(2);

    if (pointerSupports && startWith(listenName, 'mouse')) return;
    if (pointerSupports && startWith(listenName, 'touch')) return;

    const throttled = throttle(this.saveAndNotify.bind(this), 500);
    where.addEventListener(listenName, throttled, true);
  }

  saveAndNotify(event: Object): void {
    const ourEvent = new WatchEvent(event);
    console.info(ourEvent.toString());
    this.events.push(ourEvent);
    this.listeners.forEach(fn => fn(ourEvent.toString()));
  }

  getAllEvents() {
    return this.events;
  }

  onevent(fn: Function): void {
    this.listeners.push(fn);
  }
}

module.exports = WatchUser;
