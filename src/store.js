import { pointerSupports, includes, startWith, endWith } from './utils';

function skipEvent(config, event) {
  if (event.toString() === null) return true;

  const { type } = event;
  const {
    mergeMouseEvents,
    disabledEvents,
    disableMouseMove,
    deviceEvents,
  } = config;

  if (mergeMouseEvents) {
    const isMouse = startWith(type, 'mouse');
    const isTouch = startWith(type, 'touch');
    if (pointerSupports && (isMouse || isTouch)) return true;
  }

  if (disableMouseMove) {
    const isMoveEvent =
      endWith(type, 'out') || endWith(type, 'over') || endWith(type, 'move');
    if (isMoveEvent) return true;
  }

  if (disabledEvents && disabledEvents.length && includes(disabledEvents, type))
    return true;

  if (deviceEvents === false && startWith(type, 'device')) return true;
  return false;
}

const store = {
  state: {
    active: false,
    events: [],
    listeners: [],
    config: {
      mergeMouseEvents: true,
      deviceEvents: false,
      disableMouseMove: true,
      disabledEvents: ['selectstart', 'wheel'],
    },
  },
  activate() {
    this.state.active = true;
  },
  addConfig(config: Object) {
    this.state.config = config;
  },
  deactivate() {
    this.state.active = false;
  },
  reset() {
    this.state.active = false;
    this.state.events = [];
    this.state.listeners = [];
  },
  addEventAndNotifyListeners(event: Object) {
    if (skipEvent(this.state.config, event)) return;

    this.addEvent(event);
    this.notifyListeners(event);
  },
  addEvent(event: Object) {
    this.state.events.push(event);
  },
  notifyListeners(event: Object) {
    this.state.listeners.forEach(listener => listener(event));
  },
  addListener(listener: Function) {
    this.state.listeners.push(listener);
  },
  getEvents() {
    return this.state.events;
  },
};

export default store;
