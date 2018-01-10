// @flow

import store from './store';
import events from './events';
import eventFactory from './customEvents';
import { isFunction } from './utils';

const watchUser = (function() {
  const publicApi = {};

  const eventHandler = (event: Event) =>
    store.addEventAndNotifyListeners(eventFactory(event));

  publicApi.start = (config: Object) => {
    store.activate();
    if (config) store.addConfig(config);
    events.subscribe(eventHandler);
    return publicApi;
  };

  publicApi.stop = () => {
    store.deactivate();
    events.unscribe();
    return publicApi;
  };

  publicApi.reset = () => {
    store.reset();
    return publicApi;
  };

  publicApi.onEvent = (fn: Function) => {
    if (isFunction(fn)) store.addListener(fn);
    return publicApi;
  };

  publicApi.getEvents = () => store.getEvents();

  return publicApi;
})();

module.exports = watchUser;
