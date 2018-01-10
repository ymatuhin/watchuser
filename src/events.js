import throttle from 'lodash.throttle';
import { getAllEvents } from './utils';

const events = getAllEvents();
const listeners = {};

export default {
  subscribe(callback) {
    events.window.forEach(eventName => {
      const throttled = throttle(callback, 500);
      listeners[`window.${eventName}`] = throttled;
      window.addEventListener(eventName, throttled, true);
    });
    events.document.forEach(eventName => {
      const throttled = throttle(callback, 500);
      listeners[`document.${eventName}`] = throttled;
      document.addEventListener(eventName, throttled, true);
    });
  },
  unscribe() {
    events.window.forEach(eventName => {
      const listener = listeners[`window.${eventName}`];
      window.removeEventListener(eventName, listener, true);
    });
    events.document.forEach(eventName => {
      const listener = listeners[`document.${eventName}`];
      document.removeEventListener(eventName, listener, true);
    });
  },
};
