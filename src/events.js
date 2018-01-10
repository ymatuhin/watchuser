import throttle from 'lodash.throttle';
import { getAllEvents, supportPassive } from './utils';

const events = getAllEvents();
const listeners = {};

const thirdParams = supportPassive ? { passive: true, capture: true } : true;

export default {
  subscribe(callback) {
    events.window.forEach(eventName => {
      const throttled = throttle(callback, 500);
      listeners[`window.${eventName}`] = throttled;
      window.addEventListener(eventName, throttled, thirdParams);
    });
    events.document.forEach(eventName => {
      const throttled = throttle(callback, 500);
      listeners[`document.${eventName}`] = throttled;
      document.addEventListener(eventName, throttled, thirdParams);
    });
  },
  unscribe() {
    events.window.forEach(eventName => {
      const listener = listeners[`window.${eventName}`];
      window.removeEventListener(eventName, listener, thirdParams);
    });
    events.document.forEach(eventName => {
      const listener = listeners[`document.${eventName}`];
      document.removeEventListener(eventName, listener, thirdParams);
    });
  },
};
