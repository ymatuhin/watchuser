import { pointerSupports, includes, startWith, endWith } from './utils';

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
    this.addEvent(event);
    this.notifyListeners(event);
  },
  addEvent(event: Object) {
    this.state.events.push(event);
  },
  notifyListeners(event: Object) {
    // TODO: export checks to `addEventAndNotifyListeners`
    const {
      mergeMouseEvents,
      disabledEvents,
      disableMouseMove,
      deviceEvents,
    } = this.state.config;

    if (mergeMouseEvents) {
      const isMouse = startWith(event.type, 'mouse');
      const isTouch = startWith(event.type, 'touch');
      if (pointerSupports && (isMouse || isTouch)) return;
    }

    if (disableMouseMove) {
      const isMove =
        endWith(event.type, 'out') ||
        endWith(event.type, 'over') ||
        endWith(event.type, 'move');
      if (isMove) return;
    }

    if (disabledEvents && includes(disabledEvents, event.type)) return;
    if (deviceEvents === false && startWith(event.type, 'device')) return;
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
