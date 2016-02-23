/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _electron = __webpack_require__(1);

	var _electron2 = _interopRequireDefault(_electron);

	var _socket2 = __webpack_require__(2);

	var _socket3 = _interopRequireDefault(_socket2);

	var _darwin = __webpack_require__(3);

	var _darwin2 = _interopRequireDefault(_darwin);

	var _browserwindowStore = __webpack_require__(46);

	var _browserwindowStore2 = _interopRequireDefault(_browserwindowStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = _electron2.default.app;
	var remote = _electron2.default.remote;
	var BrowserWindow = _electron2.default.BrowserWindow;
	var Menu = _electron2.default.Menu;
	var webFrame = _electron2.default.webFrame;

	var socket = null;

	app.on('ready', function () {
	  switch (process.platform) {
	    case 'darwin':
	      Menu.setApplicationMenu(Menu.buildFromTemplate(_darwin2.default));
	      break;
	  }
	  connect();
	});

	function connect() {
	  var io = _socket3.default.listen(53825);
	  io.sockets.on('connection', function (_socket) {
	    socket = _socket;
	    socket.on('open', function (data) {
	      createWindow(data.url);
	    });
	  });
	}

	function createWindow(url) {
	  var win = new BrowserWindow({
	    width: 320,
	    height: 568,
	    alwaysOnTop: true,
	    resizable: false
	  });

	  win.on('closed', function () {
	    win = null;
	  });

	  win.loadURL(url);
	  _browserwindowStore2.default.set(win, {
	    url: url,
	    zoomFactor: 1
	  });
	}

	app.on('window-all-closed', function () {
	  socket.disconnect();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray2 = __webpack_require__(4);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _electron = __webpack_require__(1);

	var _electron2 = _interopRequireDefault(_electron);

	var _browserwindowStore = __webpack_require__(46);

	var _browserwindowStore2 = _interopRequireDefault(_browserwindowStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Menu = _electron2.default.Menu;
	var BrowserWindow = _electron2.default.BrowserWindow;


	var menuDevice = [{
	  label: 'iPad Pro',
	  click: function click(item, win) {
	    var viewMenus = Menu.getApplicationMenu().items[1].submenu;
	    var orientationMenus = viewMenus.items[0].submenu;
	    orientationMenus.items[0].checked ? win.setSize(1024, 1366) : win.setSize(1366, 1024);
	  }
	}, {
	  label: 'iPad + iPad mini',
	  click: function click(item, win) {
	    var viewMenus = Menu.getApplicationMenu().items[1].submenu;
	    var orientationMenus = viewMenus.items[0].submenu;
	    orientationMenus.items[0].checked ? win.setSize(768, 1024) : win.setSize(1024, 768);
	  }
	}, {
	  label: 'iPhone 6 Plus',
	  click: function click(item, win) {
	    var viewMenus = Menu.getApplicationMenu().items[1].submenu;
	    var orientationMenus = viewMenus.items[0].submenu;
	    orientationMenus.items[0].checked ? win.setSize(414, 736) : win.setSize(736, 414);
	  }
	}, {
	  label: 'iPhone 6',
	  click: function click(item, win) {
	    var viewMenus = Menu.getApplicationMenu().items[1].submenu;
	    var orientationMenus = viewMenus.items[0].submenu;
	    orientationMenus.items[0].checked ? win.setSize(375, 627) : win.setSize(627, 375);
	  }
	}, {
	  label: 'iPhone 5se',
	  click: function click(item, win) {
	    var viewMenus = Menu.getApplicationMenu().items[1].submenu;
	    var orientationMenus = viewMenus.items[0].submenu;
	    orientationMenus.items[0].checked ? win.setSize(320, 568) : win.setSize(568, 320);
	  }
	}];

	var menuResize = [{
	  label: '100%',
	  accelerator: 'Command+1',
	  click: function click(item, currentWin) {
	    var ZOOM_FACTOR = 1;

	    var _currentWin$getSize = currentWin.getSize();

	    var _currentWin$getSize2 = (0, _slicedToArray3.default)(_currentWin$getSize, 2);

	    var width = _currentWin$getSize2[0];
	    var height = _currentWin$getSize2[1];

	    var _currentWin$getPositi = currentWin.getPosition();

	    var _currentWin$getPositi2 = (0, _slicedToArray3.default)(_currentWin$getPositi, 2);

	    var x = _currentWin$getPositi2[0];
	    var y = _currentWin$getPositi2[1];

	    var _browserwindowStore$g = _browserwindowStore2.default.get(currentWin);

	    var url = _browserwindowStore$g.url;
	    var zoomFactor = _browserwindowStore$g.zoomFactor;

	    var win = new BrowserWindow({
	      x: x,
	      y: y,
	      zoomFactor: ZOOM_FACTOR,
	      width: width / zoomFactor * ZOOM_FACTOR,
	      height: height / zoomFactor * ZOOM_FACTOR,
	      alwaysOnTop: true,
	      resizable: false
	    });
	    win.loadURL(url);
	    _browserwindowStore2.default.set(win, {
	      url: url,
	      zoomFactor: ZOOM_FACTOR
	    });
	    currentWin.destroy();
	  }
	}, {
	  label: '75%',
	  accelerator: 'Command+2',
	  click: function click(item, currentWin) {
	    var ZOOM_FACTOR = 0.75;

	    var _currentWin$getSize3 = currentWin.getSize();

	    var _currentWin$getSize4 = (0, _slicedToArray3.default)(_currentWin$getSize3, 2);

	    var width = _currentWin$getSize4[0];
	    var height = _currentWin$getSize4[1];

	    var _currentWin$getPositi3 = currentWin.getPosition();

	    var _currentWin$getPositi4 = (0, _slicedToArray3.default)(_currentWin$getPositi3, 2);

	    var x = _currentWin$getPositi4[0];
	    var y = _currentWin$getPositi4[1];

	    var _browserwindowStore$g2 = _browserwindowStore2.default.get(currentWin);

	    var url = _browserwindowStore$g2.url;
	    var zoomFactor = _browserwindowStore$g2.zoomFactor;

	    var win = new BrowserWindow({
	      x: x,
	      y: y,
	      zoomFactor: ZOOM_FACTOR,
	      width: width / zoomFactor * ZOOM_FACTOR,
	      height: height / zoomFactor * ZOOM_FACTOR,
	      alwaysOnTop: true,
	      resizable: false
	    });
	    win.loadURL(url);
	    _browserwindowStore2.default.set(win, {
	      url: url,
	      zoomFactor: ZOOM_FACTOR
	    });
	    currentWin.destroy();
	  }
	}, {
	  label: '50%',
	  accelerator: 'Command+3',
	  click: function click(item, currentWin) {
	    var ZOOM_FACTOR = 0.5;

	    var _currentWin$getSize5 = currentWin.getSize();

	    var _currentWin$getSize6 = (0, _slicedToArray3.default)(_currentWin$getSize5, 2);

	    var width = _currentWin$getSize6[0];
	    var height = _currentWin$getSize6[1];

	    var _currentWin$getPositi5 = currentWin.getPosition();

	    var _currentWin$getPositi6 = (0, _slicedToArray3.default)(_currentWin$getPositi5, 2);

	    var x = _currentWin$getPositi6[0];
	    var y = _currentWin$getPositi6[1];

	    var _browserwindowStore$g3 = _browserwindowStore2.default.get(currentWin);

	    var url = _browserwindowStore$g3.url;
	    var zoomFactor = _browserwindowStore$g3.zoomFactor;

	    var win = new BrowserWindow({
	      x: x,
	      y: y,
	      zoomFactor: ZOOM_FACTOR,
	      width: width / zoomFactor * ZOOM_FACTOR,
	      height: height / zoomFactor * ZOOM_FACTOR,
	      alwaysOnTop: true,
	      resizable: false
	    });
	    win.loadURL(url);
	    _browserwindowStore2.default.set(win, {
	      url: url,
	      zoomFactor: ZOOM_FACTOR
	    });
	    currentWin.destroy();
	  }
	}];

	var template = [{
	  label: 'Reffist',
	  submenu: [{
	    label: 'Close',
	    accelerator: 'CmdOrCtrl+W',
	    role: 'close'
	  }]
	}, {
	  label: 'View',
	  role: 'view',
	  submenu: [{
	    label: 'Orientation',
	    submenu: [{
	      label: 'portrait',
	      type: 'radio',
	      checked: true,
	      click: function click(item, win) {
	        var _win$getSize = win.getSize();

	        var _win$getSize2 = (0, _slicedToArray3.default)(_win$getSize, 2);

	        var width = _win$getSize2[0];
	        var height = _win$getSize2[1];

	        width > height ? win.setSize(height, width) : win.setSize(width, height);
	      }
	    }, {
	      label: 'landscape',
	      type: 'radio',
	      click: function click(item, win) {
	        var _win$getSize3 = win.getSize();

	        var _win$getSize4 = (0, _slicedToArray3.default)(_win$getSize3, 2);

	        var width = _win$getSize4[0];
	        var height = _win$getSize4[1];

	        width > height ? win.setSize(width, height) : win.setSize(height, width);
	      }
	    }]
	  }, {
	    label: 'Device',
	    submenu: menuDevice
	  }, {
	    label: 'Resize',
	    submenu: menuResize
	  }]
	}];

	exports.default = template;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(5);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(40);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(35);
	module.exports = __webpack_require__(38);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	var Iterators = __webpack_require__(11);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(9)
	  , step             = __webpack_require__(10)
	  , Iterators        = __webpack_require__(11)
	  , toIObject        = __webpack_require__(12);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(16)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(13)
	  , defined = __webpack_require__(15);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(14);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(17)
	  , $export        = __webpack_require__(18)
	  , redefine       = __webpack_require__(23)
	  , hide           = __webpack_require__(24)
	  , has            = __webpack_require__(29)
	  , Iterators      = __webpack_require__(11)
	  , $iterCreate    = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(31)
	  , getProto       = __webpack_require__(25).getProto
	  , ITERATOR       = __webpack_require__(32)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(19)
	  , core      = __webpack_require__(20)
	  , ctx       = __webpack_require__(21)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 19 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 20 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(22);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(25)
	  , createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(27) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(28)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(25)
	  , descriptor     = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(31)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(24)(IteratorPrototype, __webpack_require__(32)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(25).setDesc
	  , has = __webpack_require__(29)
	  , TAG = __webpack_require__(32)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(33)('wks')
	  , uid    = __webpack_require__(34)
	  , Symbol = __webpack_require__(19).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(19)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(36)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(16)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , defined   = __webpack_require__(15);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(39)
	  , ITERATOR  = __webpack_require__(32)('iterator')
	  , Iterators = __webpack_require__(11);
	module.exports = __webpack_require__(20).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(14)
	  , TAG = __webpack_require__(32)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(35);
	module.exports = __webpack_require__(42);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(43)
	  , get      = __webpack_require__(45);
	module.exports = __webpack_require__(20).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(44);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(39)
	  , ITERATOR  = __webpack_require__(32)('iterator')
	  , Iterators = __webpack_require__(11);
	module.exports = __webpack_require__(20).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _weakMap = __webpack_require__(47);

	var _weakMap2 = _interopRequireDefault(_weakMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = new _weakMap2.default();

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	__webpack_require__(7);
	__webpack_require__(50);
	module.exports = __webpack_require__(20).WeakMap;

/***/ },
/* 49 */
/***/ function(module, exports) {

	

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(25)
	  , redefine     = __webpack_require__(23)
	  , weak         = __webpack_require__(51)
	  , isObject     = __webpack_require__(44)
	  , has          = __webpack_require__(29)
	  , frozenStore  = weak.frozenStore
	  , WEAK         = weak.WEAK
	  , isExtensible = Object.isExtensible || isObject
	  , tmp          = {};

	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(62)('WeakMap', function(get){
	  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return frozenStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide              = __webpack_require__(24)
	  , redefineAll       = __webpack_require__(52)
	  , anObject          = __webpack_require__(43)
	  , isObject          = __webpack_require__(44)
	  , strictNew         = __webpack_require__(53)
	  , forOf             = __webpack_require__(54)
	  , createArrayMethod = __webpack_require__(58)
	  , $has              = __webpack_require__(29)
	  , WEAK              = __webpack_require__(34)('weak')
	  , isExtensible      = Object.isExtensible || isObject
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;

	// fallback for frozen keys
	var frozenStore = function(that){
	  return that._l || (that._l = new FrozenStore);
	};
	var FrozenStore = function(){
	  this.a = [];
	};
	var findFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
	  get: function(key){
	    var entry = findFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(anObject(key))){
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    } return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(23);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(21)
	  , call        = __webpack_require__(55)
	  , isArrayIter = __webpack_require__(56)
	  , anObject    = __webpack_require__(43)
	  , toLength    = __webpack_require__(57)
	  , getIterFn   = __webpack_require__(45);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(43);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(11)
	  , ITERATOR   = __webpack_require__(32)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(37)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(21)
	  , IObject  = __webpack_require__(13)
	  , toObject = __webpack_require__(59)
	  , toLength = __webpack_require__(57)
	  , asc      = __webpack_require__(60);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(15);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(44)
	  , isArray  = __webpack_require__(61)
	  , SPECIES  = __webpack_require__(32)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(14);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(25)
	  , global         = __webpack_require__(19)
	  , $export        = __webpack_require__(18)
	  , fails          = __webpack_require__(28)
	  , hide           = __webpack_require__(24)
	  , redefineAll    = __webpack_require__(52)
	  , forOf          = __webpack_require__(54)
	  , strictNew      = __webpack_require__(53)
	  , isObject       = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(31)
	  , DESCRIPTORS    = __webpack_require__(27);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    C = wrapper(function(target, iterable){
	      strictNew(target, C, NAME);
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ }
/******/ ]);