(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("watchUser", [], factory);
	else if(typeof exports === 'object')
		exports["watchUser"] = factory();
	else
		root["watchUser"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var stringKeys = exports.stringKeys = function stringKeys(event) {
  var str = '';
  if (event.metaKey) str += '[meta]';
  if (event.shiftKey) str += '[shift]';
  if (event.altKey) str += '[alt]';
  if (event.ctrlKey) str += '[ctrl]';
  return str;
};

var getElement = exports.getElement = function getElement(event) {
  return event.target || event.srcElement;
};

var stringElement = exports.stringElement = function stringElement(event) {
  var element = getElement(event);
  var isRoot = element === document || element === document.documentElement || element === document.body || element === window;
  if (isRoot) return element.toString().replace('object ', '');

  var html = element.outerHTML || '';
  var noBreaks = html.replace(/\n/g, '');
  var noExtraSpaces = noBreaks.replace(/\s\s+/g, ' ');
  var noSpaceBetweenTags = noExtraSpaces.replace(/> </g, '><');
  var sliced = noSpaceBetweenTags.slice(0, 50) + '...';
  var finalHtml = noSpaceBetweenTags.length > 50 ? sliced : noSpaceBetweenTags;
  return finalHtml;
};

var stringMouseButton = exports.stringMouseButton = function stringMouseButton(event) {
  if (event.button === 0) return 'left';
  if (event.button === 1) return 'middle';
  if (event.button === 2) return 'right';
  if (event.button === 3) return 'back';
  if (event.button === 4) return 'forward';
  return '';
};

var removeEmptyFields = function removeEmptyFields(obj) {
  var newObj = {};
  Object.keys(obj).forEach(function (propName) {
    if (obj[propName]) newObj[propName] = obj[propName];
  });
  return newObj;
};

var clearString = exports.clearString = function clearString(obj) {
  var result = JSON.stringify(removeEmptyFields(obj)).replace(/"([^(")"]+)":/g, '$1:').replace(/\\"/g, '"');

  return result === '{}' ? '' : result;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pointerSupports = exports.pointerSupports = Boolean(window.PointerEvent);

var includes = exports.includes = function includes(arr, str) {
  return arr.indexOf(str) !== -1;
};

var startWith = exports.startWith = function startWith(arr, str) {
  return arr.indexOf(str) === 0;
};

var endWith = exports.endWith = function endWith(fullString, str) {
  var index = fullString.indexOf(str);
  return str.length + index === fullString.length;
};

var isFunction = exports.isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};

// export const storeWrapper = (store: Object) => {
//   const publicApi = {};
//   const methods = Object.keys(store).filter(key => isFunction(store[key]));
//   methods.forEach(methodName => {
//     publicApi[methodName] = (...args) => {
//       // console.log(`store:${methodName}`, ...args);
//       return store[methodName](...args);
//     };
//   });
//   return publicApi;
// };

var getAllEvents = exports.getAllEvents = function getAllEvents() {
  var list = { window: [], document: [] };

  for (var method in window) {
    if (startWith(method, 'on')) {
      var withoutPrefix = method.slice(2);
      list.window.push(withoutPrefix);
    }
  }

  for (var _method in document) {
    if (!startWith(_method, 'on')) continue;
    var _withoutPrefix = _method.slice(2);
    if (!includes(list.window, _withoutPrefix)) {
      list.document.push(_withoutPrefix);
    }
  }

  return list;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store = __webpack_require__(3);

var _store2 = _interopRequireDefault(_store);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _customEvents = __webpack_require__(7);

var _customEvents2 = _interopRequireDefault(_customEvents);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var watchUser = function () {
  var publicApi = {};

  var eventHandler = function eventHandler(event) {
    return _store2.default.addEventAndNotifyListeners((0, _customEvents2.default)(event));
  };

  publicApi.start = function (config) {
    _store2.default.activate();
    if (config) _store2.default.addConfig(config);
    _events2.default.subscribe(eventHandler);
    return publicApi;
  };

  publicApi.stop = function () {
    _store2.default.deactivate();
    _events2.default.unscribe();
    return publicApi;
  };

  publicApi.reset = function () {
    _store2.default.reset();
    return publicApi;
  };

  publicApi.onEvent = function (fn) {
    if ((0, _utils.isFunction)(fn)) _store2.default.addListener(fn);
    return publicApi;
  };

  return publicApi;
}();

module.exports = watchUser;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var store = {
  state: {
    active: false,
    events: [],
    listeners: [],
    config: {
      mergeMouseEvents: true,
      deviceEvents: false,
      disableMouseMove: true,
      disabledEvents: ['selectstart', 'wheel']
    }
  },
  activate: function activate() {
    this.state.active = true;
  },
  addConfig: function addConfig(config) {
    this.state.config = config;
  },
  deactivate: function deactivate() {
    this.state.active = false;
  },
  reset: function reset() {
    this.state.active = false;
    this.state.events = [];
    this.state.listeners = [];
  },
  addEventAndNotifyListeners: function addEventAndNotifyListeners(event) {
    this.addEvent(event);
    this.notifyListeners(event);
  },
  addEvent: function addEvent(event) {
    this.state.events.push(event);
  },
  notifyListeners: function notifyListeners(event) {
    // TODO: export checks to `addEventAndNotifyListeners`
    var _state$config = this.state.config,
        mergeMouseEvents = _state$config.mergeMouseEvents,
        disabledEvents = _state$config.disabledEvents,
        disableMouseMove = _state$config.disableMouseMove,
        deviceEvents = _state$config.deviceEvents;


    if (mergeMouseEvents) {
      var isMouse = (0, _utils.startWith)(event.type, 'mouse');
      var isTouch = (0, _utils.startWith)(event.type, 'touch');
      if (_utils.pointerSupports && (isMouse || isTouch)) return;
    }

    if (disableMouseMove) {
      var isMove = (0, _utils.endWith)(event.type, 'out') || (0, _utils.endWith)(event.type, 'over') || (0, _utils.endWith)(event.type, 'move');
      if (isMove) return;
    }

    if (disabledEvents && (0, _utils.includes)(disabledEvents, event.type)) return;
    if (deviceEvents === false && (0, _utils.startWith)(event.type, 'device')) return;
    this.state.listeners.forEach(function (listener) {
      return listener(event);
    });
  },
  addListener: function addListener(listener) {
    this.state.listeners.push(listener);
  },
  getEvents: function getEvents() {
    return this.state.events;
  }
};

exports.default = store;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = (0, _utils.getAllEvents)();
var listeners = {};

exports.default = {
  subscribe: function subscribe(callback) {
    events.window.forEach(function (eventName) {
      var throttled = (0, _lodash2.default)(callback, 500);
      listeners['window.' + eventName] = throttled;
      window.addEventListener(eventName, throttled, true);
    });
    events.document.forEach(function (eventName) {
      var throttled = (0, _lodash2.default)(callback, 500);
      listeners['document.' + eventName] = throttled;
      document.addEventListener(eventName, throttled, true);
    });
  },
  unscribe: function unscribe() {
    events.window.forEach(function (eventName) {
      var listener = listeners['window.' + eventName];
      window.removeEventListener(eventName, listener, true);
    });
    events.document.forEach(function (eventName) {
      var listener = listeners['document.' + eventName];
      document.removeEventListener(eventName, listener, true);
    });
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _element = __webpack_require__(17);

var _element2 = _interopRequireDefault(_element);

var _mouse = __webpack_require__(8);

var _mouse2 = _interopRequireDefault(_mouse);

var _touch = __webpack_require__(9);

var _touch2 = _interopRequireDefault(_touch);

var _pointer = __webpack_require__(10);

var _pointer2 = _interopRequireDefault(_pointer);

var _click = __webpack_require__(11);

var _click2 = _interopRequireDefault(_click);

var _scroll = __webpack_require__(12);

var _scroll2 = _interopRequireDefault(_scroll);

var _selection = __webpack_require__(16);

var _selection2 = _interopRequireDefault(_selection);

var _readyState = __webpack_require__(13);

var _readyState2 = _interopRequireDefault(_readyState);

var _keyboard = __webpack_require__(18);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _resize = __webpack_require__(19);

var _resize2 = _interopRequireDefault(_resize);

var _clipboard = __webpack_require__(20);

var _clipboard2 = _interopRequireDefault(_clipboard);

var _wheel = __webpack_require__(21);

var _wheel2 = _interopRequireDefault(_wheel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseToString() {
  return '' + this.type;
}

exports.default = function (event) {
  if ((0, _utils.startWith)(event.type, 'mouse')) event.toString = _mouse2.default;else if ((0, _utils.startWith)(event.type, 'touch')) event.toString = _touch2.default;else if ((0, _utils.startWith)(event.type, 'pointer')) event.toString = _pointer2.default;else if ((0, _utils.startWith)(event.type, 'key')) event.toString = _keyboard2.default;else if ((0, _utils.startWith)(event.type, 'click')) event.toString = _click2.default;else if ((0, _utils.startWith)(event.type, 'scroll')) event.toString = _scroll2.default;else if ((0, _utils.startWith)(event.type, 'load')) event.toString = _element2.default;else if ((0, _utils.startWith)(event.type, 'error')) event.toString = _element2.default;else if ((0, _utils.startWith)(event.type, 'focus')) event.toString = _element2.default;else if ((0, _utils.startWith)(event.type, 'blur')) event.toString = _element2.default;else if ((0, _utils.startWith)(event.type, 'resize')) event.toString = _resize2.default;else if ((0, _utils.startWith)(event.type, 'copy')) event.toString = _clipboard2.default;else if ((0, _utils.startWith)(event.type, 'cut')) event.toString = _clipboard2.default;else if ((0, _utils.startWith)(event.type, 'paste')) event.toString = _clipboard2.default;else if ((0, _utils.startWith)(event.type, 'wheel')) event.toString = _wheel2.default;else if ((0, _utils.startWith)(event.type, 'selection')) event.toString = _selection2.default;else if ((0, _utils.startWith)(event.type, 'readystate')) event.toString = _readyState2.default;else event.toString = baseToString;

  return event;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var type = this.type,
      pressure = this.pressure,
      x = this.screenX,
      y = this.screenY,
      width = this.width,
      height = this.height;


  var button = type === 'mousedown' || type === 'mouseup' ? (0, _helpers.stringMouseButton)(this) : null;

  var info = {
    x: x,
    y: y,
    pressure: pressure,
    button: button,
    width: width,
    height: height,
    meta: (0, _helpers.stringKeys)(this),
    element: (0, _helpers.stringElement)(this)
  };

  return type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var str = "" + this.type;
  // str += stringCoords(this.screenX, this.screenY);
  // str += stringElement(this);
  return str;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var button = this.type === 'mousedown' || this.type === 'mouseup' ? (0, _helpers.stringMouseButton)(this) : null;
  var width = this.width === 1 ? null : this.width;
  var height = this.height === 1 ? null : this.height;

  var info = {
    x: this.screenX,
    y: this.screenY,
    button: button,
    width: width,
    height: height,
    meta: (0, _helpers.stringKeys)(this),
    element: (0, _helpers.stringElement)(this)
  };

  return this.type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var type = this.type,
      pressure = this.pressure,
      x = this.screenX,
      y = this.screenY;

  var button = (0, _helpers.stringMouseButton)(this);

  var info = {
    x: x,
    y: y,
    pressure: pressure,
    button: button,
    meta: (0, _helpers.stringKeys)(this),
    element: (0, _helpers.stringElement)(this)
  };

  return type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var el = (0, _helpers.getElement)(this);
  var element = el === document ? document.documentElement : el;
  var x = element.scrollLeft;
  var y = element.scrollTop;
  var height = element.scrollHeight;

  var info = {
    x: x,
    y: y,
    height: height,
    element: (0, _helpers.stringElement)(this)
  };

  return this.type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var info = { state: document.readyState };
  return this.type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var sel = document.getSelection();
  var text = sel.toString();

  if (text === prevVal) return null;
  prevVal = text;

  return this.type + ' "' + (0, _helpers.clearString)({ text: text }) + '"';
};

var _helpers = __webpack_require__(0);

var prevVal = '';

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var info = { element: (0, _helpers.stringElement)(this) };
  return this.type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var type = this.type,
      charCode = this.charCode,
      keyCode = this.keyCode,
      which = this.which,
      key = this.key,
      code = this.code;

  var myCode = charCode || keyCode || which;
  var myKey = key || String.fromCharCode(code) || code;

  var info = {
    code: myCode,
    key: myKey,
    meta: (0, _helpers.stringKeys)(this),
    element: (0, _helpers.stringElement)(this)
  };

  return type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  var info = {
    width: width,
    height: height
  };

  return this.type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var info = {
    text: this.clipboardData.getData('Text')
  };

  return this.type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var type = this.type,
      deltaX = this.deltaX,
      deltaY = this.deltaY,
      deltaZ = this.deltaZ;

  var info = { deltaX: deltaX, deltaY: deltaY, deltaZ: deltaZ };
  return type + ' ' + (0, _helpers.clearString)(info);
};

var _helpers = __webpack_require__(0);

/***/ })
/******/ ]);
});
//# sourceMappingURL=watchuser.js.map