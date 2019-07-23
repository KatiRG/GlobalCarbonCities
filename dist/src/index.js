(function () {
	'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.9' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterators = {};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var ITERATOR$1 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	    _iterators[NAME] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	var $sort = [].sort;
	var test$1 = [1, 2, 3];

	_export(_export.P + _export.F * (_fails(function () {
	  // IE8-
	  test$1.sort(undefined);
	}) || !_fails(function () {
	  // V8 bug
	  test$1.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(_toObject(this))
	      : $sort.call(_toObject(this), _aFunction(comparefn));
	  }
	});

	var dP$1 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name';

	// 19.2.4.2 name
	NAME$1 in FProto || _descriptors && dP$1(FProto, NAME$1, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);

	_export(_export.P + _export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $filter = _arrayMethods(2);

	_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var $indexOf = _arrayIncludes(false);
	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var settingsRow1 = {
	  aspectRatio: 8.2,
	  margin: {
	    top: 33,
	    right: 0,
	    bottom: 20,
	    left: 0
	  },
	  width: 1300,
	  groupPadding: 0.0,
	  pOuter: 0.9,
	  pInner: 0.15,
	  filterData: function filterData(data) {
	    // data.sort(function(a, b) {
	    //   return d3.descending(a["s1PerCap"], b["s1PerCap"]);
	    // });
	    var thisRegion = i18next.t(data[0].region, {
	      ns: "regions"
	    });
	    return [{
	      category: thisRegion,
	      values: data.map(function (p, i) {
	        return {
	          city: p.city,
	          value: p.s1PerCap,
	          storeOrig: p.storeOrig,
	          idx: i
	        };
	      })
	    }];
	  },
	  x: {
	    getId: function getId(d) {
	      // if (d.indexOf(', ') >= 0) abbr = d.substring(0,3);
	      // else if (d.indexOf(' ') >= 0) abbr = d.match(/\b\w/g).join(' ');
	      // else abbr = d.substring(0,4);
	      return d.city;
	    },
	    getValue: function getValue() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      // returns city names
	      return this.x.getId.apply(this, args);
	    },
	    getClass: function getClass() {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return this.x.getId.apply(this, args);
	    },
	    getTickText: function getTickText(val) {
	      return i18next.t(val, {
	        ns: "railBar"
	      });
	    }
	  },
	  y: {
	    label: i18next.t("y_label", {
	      ns: "railBar"
	    }),
	    getValue: function getValue(d) {
	      return d.value;
	    },
	    getText: function getText(d) {
	      return d.value;
	    },
	    getDomain: function getDomain(data) {
	      return [0, 10];
	    },
	    ticks: 5,
	    tickSizeOuter: 1
	  },
	  z: {
	    label: i18next.t("z_label", {
	      ns: "railTable"
	    }),
	    getId: function getId(d) {
	      return d.category;
	    },
	    getKeys: function getKeys(object) {
	      var keys = Object.keys(object[0]);
	      keys.splice(keys.indexOf("category"), 1);
	      return keys;
	    },
	    formatData: function formatData(data) {
	      return data[0].values;
	    },
	    getClass: function getClass() {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return this.z.getId.apply(this, args);
	    },
	    getDataPoints: function getDataPoints(d) {
	      return d.values;
	    },
	    getText: function getText(d) {
	      return i18next.t(d.key, {
	        ns: "rail"
	      });
	    }
	  },
	  _selfFormatter: i18n.getNumberFormatter(0),
	  formatNum: function formatNum() {
	    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      args[_key4] = arguments[_key4];
	    }

	    return this._selfFormatter.format(args);
	  }
	};

	var settingsRow2 = {
	  aspectRatio: 8.2,
	  margin: {
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 30
	  },
	  width: 1200,
	  groupPadding: 0.0,
	  pOuter: 0.9,
	  pInner: 0.15,
	  filterData: function filterData(data) {
	    // data.sort(function(a, b) {
	    //   return d3.descending(a["s1PerCap"], b["s1PerCap"]);
	    // });
	    var thisRegion = i18next.t(data[0].region, {
	      ns: "regions"
	    });
	    return [{
	      category: thisRegion,
	      values: data.map(function (p, i) {
	        return {
	          city: p.city,
	          value: p.s1PerCap,
	          storeOrig: p.storeOrig,
	          idx: i
	        };
	      })
	    }];
	  },
	  x: {
	    // label: i18next.t("x_label", {ns: "railBar"}),
	    getId: function getId(d) {
	      return d.city;
	    },
	    getValue: function getValue() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return this.x.getId.apply(this, args);
	    },
	    getClass: function getClass() {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return this.x.getId.apply(this, args);
	    },
	    getTickText: function getTickText(val) {
	      return i18next.t(val, {
	        ns: "railBar"
	      });
	    }
	  },
	  y: {
	    label: i18next.t("y_label", {
	      ns: "railBar"
	    }),
	    getValue: function getValue(d) {
	      return d.value;
	    },
	    getText: function getText(d) {
	      return d.value;
	    },
	    getDomain: function getDomain(data) {
	      return [0, 10];
	    },
	    ticks: 5,
	    tickSizeOuter: 0
	  },
	  z: {
	    label: i18next.t("z_label", {
	      ns: "railTable"
	    }),
	    getId: function getId(d) {
	      return d.category;
	    },
	    getKeys: function getKeys(object) {
	      var keys = Object.keys(object[0]);
	      console.log(keys);
	      keys.splice(keys.indexOf("category"), 1);
	      return keys;
	    },
	    formatData: function formatData(data) {
	      return data[0].values;
	    },
	    getClass: function getClass() {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return this.z.getId.apply(this, args);
	    },
	    getDataPoints: function getDataPoints(d) {
	      return d.values;
	    },
	    getText: function getText(d) {
	      return i18next.t(d.key, {
	        ns: "rail"
	      });
	    }
	  },
	  _selfFormatter: i18n.getNumberFormatter(0),
	  formatNum: function formatNum() {
	    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      args[_key4] = arguments[_key4];
	    }

	    return this._selfFormatter.format(args);
	  }
	};

	var settingsRow3 = {
	  aspectRatio: 8.2,
	  margin: {
	    top: 10,
	    left: 0,
	    right: 0,
	    bottom: 20
	  },
	  width: 1200,
	  groupPadding: 0.0,
	  pOuter: 0.9,
	  pInner: 0.15,
	  filterData: function filterData(data) {
	    var thisRegion = i18next.t(data[0].region, {
	      ns: "regions"
	    });
	    return [{
	      category: thisRegion,
	      values: data.map(function (p, i) {
	        return {
	          city: p.city,
	          region: i18next.t(p.region, {
	            ns: "regions"
	          }),
	          value: p.s1PerCap,
	          storeOrig: p.storeOrig,
	          idx: i
	        };
	      })
	    }];
	  },
	  x: {
	    // label: i18next.t("x_label", {ns: "railBar"}),
	    getId: function getId(d) {
	      return d.city;
	    },
	    getValue: function getValue() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return this.x.getId.apply(this, args);
	    },
	    getClass: function getClass() {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return this.x.getId.apply(this, args);
	    },
	    getRegion: function getRegion() {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return args[0].region;
	    },
	    getTickText: function getTickText(val) {
	      return i18next.t(val, {
	        ns: "railBar"
	      });
	    }
	  },
	  y: {
	    label: i18next.t("y_label", {
	      ns: "railBar"
	    }),
	    getValue: function getValue(d) {
	      return d.value;
	    },
	    getText: function getText(d) {
	      return d.value;
	    },
	    getDomain: function getDomain(data) {
	      return [0, 10];
	    },
	    ticks: 5,
	    tickSizeOuter: 0
	  },
	  z: {
	    label: i18next.t("z_label", {
	      ns: "railTable"
	    }),
	    getId: function getId(d) {
	      return d.category;
	    },
	    getKeys: function getKeys(object) {
	      var keys = Object.keys(object[0]);
	      keys.splice(keys.indexOf("category"), 1);
	      return keys;
	    },
	    formatData: function formatData(data) {
	      return data[0].values;
	    },
	    getClass: function getClass() {
	      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return this.z.getId.apply(this, args);
	    },
	    getDataPoints: function getDataPoints(d) {
	      return d.values;
	    },
	    getText: function getText(d) {
	      return i18next.t(d.key, {
	        ns: "rail"
	      });
	    }
	  },
	  _selfFormatter: i18n.getNumberFormatter(0),
	  formatNum: function formatNum() {
	    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      args[_key5] = arguments[_key5];
	    }

	    return this._selfFormatter.format(args);
	  }
	};

	var settingsRow4 = {
	  aspectRatio: 8.2,
	  margin: {
	    top: 10,
	    left: 0,
	    right: 0,
	    bottom: 20
	  },
	  width: 1200,
	  groupPadding: 0.0,
	  pOuter: 0.9,
	  pInner: 0.15,
	  filterData: function filterData(data) {
	    var thisRegion = i18next.t(data[0].region, {
	      ns: "regions"
	    });
	    return [{
	      category: thisRegion,
	      values: data.map(function (p, i) {
	        return {
	          city: p.city,
	          region: i18next.t(p.region, {
	            ns: "regions"
	          }),
	          value: p.s1PerCap,
	          storeOrig: p.storeOrig,
	          idx: i
	        };
	      })
	    }];
	  },
	  x: {
	    // label: i18next.t("x_label", {ns: "railBar"}),
	    getId: function getId(d) {
	      return d.city;
	    },
	    getValue: function getValue() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return this.x.getId.apply(this, args);
	    },
	    getClass: function getClass() {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return this.x.getId.apply(this, args);
	    },
	    getRegion: function getRegion() {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return args[0].region;
	    },
	    getTickText: function getTickText(val) {
	      return i18next.t(val, {
	        ns: "railBar"
	      });
	    }
	  },
	  y: {
	    label: i18next.t("y_label", {
	      ns: "railBar"
	    }),
	    getValue: function getValue(d) {
	      return d.value;
	    },
	    getText: function getText(d) {
	      return d.value;
	    },
	    getDomain: function getDomain(data) {
	      return [0, 10];
	    },
	    ticks: 5,
	    tickSizeOuter: 0
	  },
	  z: {
	    label: i18next.t("z_label", {
	      ns: "railTable"
	    }),
	    getId: function getId(d) {
	      return d.category;
	    },
	    getKeys: function getKeys(object) {
	      var keys = Object.keys(object[0]);
	      keys.splice(keys.indexOf("category"), 1);
	      return keys;
	    },
	    formatData: function formatData(data) {
	      return data[0].values;
	    },
	    getClass: function getClass() {
	      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return this.z.getId.apply(this, args);
	    },
	    getDataPoints: function getDataPoints(d) {
	      return d.values;
	    },
	    getText: function getText(d) {
	      return i18next.t(d.key, {
	        ns: "rail"
	      });
	    }
	  },
	  _selfFormatter: i18n.getNumberFormatter(0),
	  formatNum: function formatNum() {
	    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      args[_key5] = arguments[_key5];
	    }

	    return this._selfFormatter.format(args);
	  }
	};

	var settingsAttr = {
	  none: {
	    colourRange: []
	  },
	  region: {
	    colourRange: [],
	    units: []
	  },
	  protocol: {
	    whichLim: "d3extent",
	    colourRange: ["#9DD3DF", "#8856a7", "#E35B5D", "#EB9F9F", "#F18052", "#F4DD51"],
	    cbValues: [1, 2, 3, 4, 5, 6],
	    xpos: [22, 86, 190, 273, 355, 417],
	    units: []
	  },
	  year: {
	    whichLim: "d3extent",
	    modx: 5,
	    colourRange: ["#a63603", "#e6550d", "#997E68", "#fd8d3c", "#fecc5c"],
	    // colourRange: ["#fecc5c", "#fd8d3c", "#997E68", "#e6550d", "#a63603"],
	    xpos: [13, 98, 182, 267, 353],
	    units: []
	  },
	  population: {
	    whichLim: "d3extent",
	    // modx: 100000,
	    colourRange: ["#DED8B6", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"],
	    // colourRange: ["#7a0177", "#c51b8a", "#f768a1", "#fbb4b9", "#DED8B6"],
	    xpos: [18, 97, 182, 271, 356],
	    units: [],
	    formatLevel: function formatLevel() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return d3.format(".2s")(args);
	    }
	  },
	  GDP_PPP_percap: {
	    whichLim: "d3mean",
	    modx: 1000,
	    colourRange: ["#b8aca2", "#E394A7", "#9e9ac8", "#756bb1", "#54278f"],
	    xpos: [17, 105, 190, 275, 360],
	    units: ["[$BN/capita]"],
	    formatLevel: function formatLevel() {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return d3.format(".2s")(args);
	    }
	  },
	  area: {
	    whichLim: "d3mean",
	    modx: 100,
	    colourRange: ["#ffffcc", "#c7e9b4", "#41b6c4", "#2c7fb8", "#253494"],
	    xpos: [32, 104, 189, 275, 361],
	    units: ["[km2]"]
	  },
	  pop_density: {
	    whichLim: "d3mean",
	    modx: 100,
	    colourRange: ["#ffffcc", "#F9C869", "#E1F5C4", "#ADD6BC", "#486d6c"],
	    xpos: [20, 100, 183, 268, 346],
	    units: ["[per km2]"]
	  },
	  diesel: {
	    whichLim: "d3extent",
	    colourRange: ["#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404"],
	    xpos: [17, 101, 187, 271, 356],
	    units: ["[USD/litre]"],
	    formatLevel: function formatLevel() {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return d3.format(".2f")(args);
	    }
	  },
	  gas: {
	    whichLim: "d3extent",
	    colourRange: ["#F1F2C4", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"],
	    xpos: [16, 102, 185, 271, 357],
	    units: ["[USD/litre]"],
	    formatLevel: function formatLevel() {
	      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return d3.format(".2f")(args);
	    }
	  },
	  HDD: {
	    whichLim: "d3extent",
	    modx: 1000,
	    colourRange: ["#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"],
	    xpos: [32, 97, 182, 268, 352],
	    units: ["[deg C x days]"],
	    unitdef: "Heating degree days, used to estimate the energy needed to heat a building above the base temperature (15.5C here)."
	  },
	  CDD: {
	    whichLim: "d3extent",
	    modx: 1000,
	    colourRange: ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"],
	    xpos: [32, 104, 189, 268, 352],
	    units: ["[deg C x days]"],
	    unitdef: "Cooling degree days, used to estimate the energy needed to cool a building below the base temperature (23C here)."
	  },
	  low_bua_pc_2014: {
	    whichLim: "d3extent",
	    colourRange: ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A"],
	    xpos: [16, 101, 185, 270, 355],
	    units: ["[% of tot BUA]"],
	    unitdef: "An urbran expansion attribute that quantifies the fraction of low built-up area (BUA) out of the total city area in 2014.",
	    formatLevel: function formatLevel() {
	      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }

	      return d3.format(".2f")(args);
	    }
	  },
	  high_bua_pc_2014: {
	    whichLim: "d3extent",
	    colourRange: ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A"],
	    xpos: [16, 101, 185, 270, 355],
	    units: ["[% of tot BUA]"],
	    unitdef: "An urbran expansion attribute that quantifies the fraction of high built-up area (BUA) out of the total city area in 2014.",
	    formatLevel: function formatLevel() {
	      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	      }

	      return d3.format(".2f")(args);
	    }
	  },
	  _selfFormatter: i18n.getNumberFormatter(0),
	  formatNum: function formatNum() {
	    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	      args[_key7] = arguments[_key7];
	    }

	    return this._selfFormatter.format(args);
	  } // mytest: function(...args) {
	  //   console.log("args: ", args)
	  //   console.log("this: ", this)
	  // }

	};

	var settingsCityCard = {
	  width: 250,
	  rect: {
	    width: 210,
	    height: 310,
	    pos: [20, -20]
	  }
	};

	var settingsArr = {
	  groupEastAsia: {
	    xpos: [-15, -2, 9],
	    ypos: [-100, -95, -91],
	    arrowlength: 33,
	    arrowscale: [.6, .8],
	    gid: "EA",
	    textscale: [1, 1],
	    textposx: [40, 60, 65],
	    textposy: [-2, 2, 10]
	  },
	  groupNAmer: {
	    xpos: [-29, -12, 6, 22],
	    ypos: [-145, -139, -137, -136],
	    arrowlength: 33,
	    arrowscale: [.6, .8],
	    gid: "NAmer",
	    textscale: [.9, .9],
	    textposx: [28, 112, 33, 56],
	    textposy: [0, 14, -4, -5]
	  },
	  groupRow3_Europe: {
	    xpos: [-29],
	    ypos: [-172],
	    arrowlength: 30,
	    arrowscale: [.6, .8],
	    gid: "EU",
	    textscale: [.9, .9],
	    textposx: [55],
	    textposy: [-5]
	  },
	  groupRow3_SEasia: {
	    xpos: [770],
	    ypos: [-178],
	    arrowlength: 30,
	    arrowscale: [.6, .8],
	    gid: "SEA",
	    textscale: [.9, .9],
	    textposx: [75],
	    textposy: [10]
	  },
	  groupRow4_LA: {
	    xpos: [-28],
	    ypos: [-220],
	    arrowlength: 30,
	    arrowscale: [.6, .8],
	    gid: "LA",
	    textscale: [.9, .9],
	    textposx: [75],
	    textposy: [14]
	  },
	  groupRow4_SA: {
	    xpos: [436],
	    ypos: [-220],
	    arrowlength: 30,
	    arrowscale: [.6, .8],
	    gid: "SA",
	    textscale: [.9, .9],
	    textposx: [72],
	    textposy: [14]
	  }
	};

	// Constants

	var twoSigma = 0.9545;
	var offscaleDict = {
	  "Inch": 11,
	  "Kaoh": 11,
	  "Yila": 11,
	  "Clev": 11.1,
	  "L V": 11.1,
	  "Sava": 11.1,
	  "F C": 11,
	  "Rott": 11,
	  "Quez": 11,
	  "Leó": 11,
	  "Gand": 11
	}; // Define number format (2 decimal places) from utils.js

	var globalSettings = {
	  _selfFormatter: i18n.getNumberFormatter(2),
	  formatNum: function formatNum() {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return this._selfFormatter.format(args);
	  }
	};
	var stats = {
	  getTail: function getTail() {
	    return (arguments.length <= 0 ? undefined : arguments[0]) * (arguments.length <= 1 ? undefined : arguments[1]);
	  }
	};
	var noneFill = "#4a6072";

	var init = function init() {
	  var urlRoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	  // ----------------------------------------------------
	  // Setup
	  // ----------------------------------------------------
	  var data = []; // for selected attributes used in city card and to colour bars

	  var dataGHG; // for fixed data attributes that are always needed

	  var selectedAttribute = "init";
	  var newText;
	  var path; // map path projection

	  var defaultRadius = 3; // ----------------------------------------------------
	  // SVGs
	  // d3js World Map

	  var mapMargin = {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	  var mapWidth = 850 - mapMargin.left - mapMargin.right;
	  var mapHeight = 290 - mapMargin.top - mapMargin.bottom; // barChart legend

	  var margin = {
	    top: 7,
	    right: 5,
	    bottom: 0,
	    left: 0
	  };
	  var cbWidth = 520 - margin.left - margin.right;
	  var cbHeight = 35 - margin.top - margin.bottom; // Bar charts

	  var chartEA = d3.select(".data.EAdata").append("svg").attr("id", "barChart_groupEastAsia");
	  var chartNA = d3.select(".data.NAdata").append("svg").attr("id", "barChart_groupNAmer");
	  var chartEU = d3.select(".data.EUdata").append("svg").attr("id", "barChart_groupRow3");
	  var chartRow4 = d3.select(".data.dataRow4").append("svg").attr("id", "barChart_groupRow4"); // Colour Bar

	  var svgCB = d3.select("#barChartLegend").select("svg").attr("width", cbWidth).attr("height", cbHeight).attr("transform", "translate(120,0)").style("vertical-align", "middle"); // ----------------------------------------------------------------
	  // Help button

	  d3.select("#helpButton").on("click", function () {
	    createHelp();
	  });

	  function createHelp() {
	    var parameters = {};
	    parameters.parentContainerId = "#thisContainer";
	    parameters.helpArray = [{
	      linkType: "dotOnly",
	      divToHelpId: "helpTitleName",
	      text: i18next.t("helpMapName", {
	        ns: "helpOverlay"
	      }),
	      marginTop: 100,
	      marginLeft: 250,
	      textLengthByLine: 60,
	      myTitle: i18next.t("helpTitle", {
	        ns: "helpOverlay"
	      }),
	      myfooter: i18next.t("helpFooter", {
	        ns: "helpOverlay"
	      })
	    }, {
	      linkType: "dotOnly",
	      divToHelpId: "helpCardName",
	      text: i18next.t("helpCardName", {
	        ns: "helpOverlay"
	      }),
	      marginTop: 100,
	      marginLeft: -312,
	      textLengthByLine: 30
	    }, {
	      linkType: "dotOnly",
	      divToHelpId: "helpMenuName",
	      text: i18next.t("helpMenuName", {
	        ns: "helpOverlay"
	      }),
	      marginTop: 340,
	      marginLeft: 290,
	      textLengthByLine: 60
	    }, {
	      linkType: "left",
	      divToHelpId: "helpUnitsName",
	      text: i18next.t("helpUnitsName", {
	        ns: "helpOverlay"
	      }),
	      marginTop: 370,
	      marginLeft: 720,
	      textLengthByLine: 35
	    }, {
	      linkType: "dotOnly",
	      divToHelpId: "helpBarsName",
	      text: i18next.t("helpBarsName", {
	        ns: "helpOverlay"
	      }),
	      marginTop: 500,
	      marginLeft: 100,
	      textLengthByLine: 35
	    }, {
	      linkType: "left",
	      divToHelpId: "helpBarHoverName",
	      text: i18next.t("helpBarHover", {
	        ns: "helpOverlay"
	      }),
	      marginTop: 600,
	      marginLeft: 80,
	      textLengthByLine: 40
	    }];
	    new window.Help(parameters);
	  } // -----------------------------------------------------------------------------
	  // FNS
	  // page texts


	  function pageText() {
	    d3.select("#download").html(i18next.t("downloadText", {
	      ns: "pageText"
	    }));
	    d3.select("#titletag").html(i18next.t("titletag", {
	      ns: "pageText"
	    }));
	    d3.select("#pageTitle").html(i18next.t("title", {
	      ns: "pageText"
	    }));
	  }

	  function addRect() {
	    // city card
	    var svgCityCard = d3.select("#mycityCardDiv").append("svg").attr("width", 273).attr("height", mapHeight);
	    var svg = svgCityCard.attr("width", settingsCityCard.width) // col 2 width
	    .attr("height", mapHeight);
	    var g = svg.append("g").attr("id", "cityCardg");
	    g.append("rect").attr("width", settingsCityCard.rect.width).attr("height", settingsCityCard.rect.height).attr("x", settingsCityCard.rect.pos[0]).attr("y", settingsCityCard.rect.pos[1]);
	  } // ----------------------------------------------------------------


	  var card = d3.select("#mycityCardDiv");
	  var removedSelection = d3.select();

	  function showCityCard(textSet) {
	    var data = textSet;
	    removedSelection.remove();
	    var selection = card.selectAll(".cardrow", function (d) {
	      // Binds data by id
	      return d.id;
	    }).data(data);
	    selection.enter().append("div").attr("class", function (d, i) {
	      return i === 0 ? "cardrow titlerow row".concat(i) : "cardrow subrow row".concat(i);
	    }).html(function (d) {
	      return d.text;
	    });
	    selection.attr("class", function (d, i) {
	      return i === 0 ? "cardrow titlerow row".concat(i) : "cardrow updated row".concat(i);
	    }).html(function (d) {
	      return d.text;
	    }); //  *********************** REGARDE!!!!!!*****************************************************************************

	    removedSelection = selection.exit().attr("class", "oldrow removed").html(function (d) {// return d.text;
	    });
	  } // ----------------------------------------------------------------


	  function colourBars() {
	    // Colour bars according to selected attribute
	    d3.selectAll(".bar-group").each(function (d) {
	      if (d.city.indexOf("_gap") === -1) {
	        var thisCity = d.city;
	        var thisColour;

	        if (selectedAttribute === "region") {
	          var thisRegion = data[selectedAttribute].filter(function (p) {
	            return p.city === thisCity;
	          })[0].value;
	          thisColour = i18next.t(thisRegion, {
	            ns: "regionColours"
	          });
	        } else {
	          var val = data[selectedAttribute].filter(function (p) {
	            return p.city === thisCity;
	          })[0].value;

	          if (val === null) {
	            d3.select(this).select("rect").classed("isNan", true);
	            thisColour = "none";
	          } else {
	            thisColour = data[selectedAttribute].mappingFn(val);
	          }
	        } // Apply thisColour to bar


	        d3.select(this).select("rect").style("fill", thisColour);
	      }
	    });
	  } // ----------------------------------------------------------------
	  // Map reset button


	  d3.select("#mapResetButton").on("click", function () {
	    // Reset zoom. NB: must apply reset to svg not g
	    // const svg = d3.select("#map").select("svg");
	    // zoom.transform(svg, d3.zoomIdentity);
	    // Clear previous enlarged text and selected bar
	    d3.selectAll(".enlarged").classed("enlarged", false);
	    d3.selectAll("rect.active").classed("active", false);
	    d3.selectAll(".cityactive").classed("cityactive", false);
	  });

	  function drawMap() {
	    var options = [{
	      name: "Natural Earth",
	      projection: d3.geoNaturalEarth()
	    }];
	    options.forEach(function (o) {
	      o.projection.rotate([0, 0]).center([40, 0]);
	    });
	    var projection = options[0].projection.scale(151).translate([mapWidth / 1.655, mapHeight / 1.67]);
	    path = d3.geoPath().projection(projection).pointRadius([defaultRadius]);
	    var graticule = d3.geoGraticule();
	    var svg = d3.select("#map").append("svg").attr("width", mapWidth).attr("height", mapHeight).attr("transform", "translate(" + -25 + "," + 0 + ")");
	    var g = svg.append("g");
	    g.append("path").datum({
	      type: "Sphere"
	    }).attr("class", "sphere").attr("d", path).attr("fill", "#F4F7F7").attr("stroke", "grey");
	    g.append("path").datum(graticule).attr("class", "graticule").attr("d", path);
	    d3.json("".concat(urlRoot, "/geojson/world_countries.json"), function (error, world) {
	      if (error) throw error;
	      d3.json("".concat(urlRoot, "/geojson/our_cities.geojson"), function (error, cities) {
	        if (error) throw error;
	        g.attr("class", "mapg").selectAll("path").data(world.features).enter().append("path").attr("d", path).attr("id", function (d) {
	          var mapName = i18next.t(d.properties.name, {
	            ns: "countries"
	          });
	          return "map".concat(mapName);
	        }).attr("class", "worldcountry") // tooltips
	        .style("stroke-width", 1); // City markers from geojson file

	        cities = g.selectAll("path").data(cities.features).enter().append("path").attr("d", path).attr("id", function (d) {
	          var cityName = i18next.t(d.id, {
	            ns: "reverse"
	          });
	          return "city" + i18next.t(cityName, {
	            ns: "cities"
	          });
	        }).attr("class", function (d) {
	          // const cityMatch = d.id;
	          var cityMatch = i18next.t(d.id, {
	            ns: "reverse"
	          });
	          var r = dataGHG.filter(function (d) {
	            return d.city === cityMatch;
	          })[0];
	          if (r) return "worldcity ".concat(i18next.t(r.region, {
	            ns: "regions"
	          }));else return "horsService";
	        }).attr("r", 10).on("mouseover", function (d) {
	          // Clear any previous enlarged text in barChart x axis
	          d3.selectAll(".enlarged").classed("enlarged", false); // Enlarge barChart x axis text of current city
	          // const thisCity = i18next.t(d.id, {ns: "cities"});

	          var thisCity = i18next.t(d.id, {
	            ns: "reverse"
	          });
	          d3.select("#text_".concat(i18next.t(thisCity, {
	            ns: "cities"
	          }))).classed("enlarged", true); // highlightElements(d.id);

	          highlightElements(thisCity);
	        }).on("mouseout", function (d) {
	          resetElements();
	          var lastCity = d3.select(".enlarged").text();
	          d3.select(".bar-group.".concat(i18next.t(lastCity, {
	            ns: "cities"
	          }))).select("rect").classed("active", true);
	          d3.select("#city".concat(i18next.t(lastCity, {
	            ns: "cities"
	          }))).classed("cityactive", true);
	        });
	      }); // ./inner d3.json
	    }); // ./outer d3.json
	    // svg.call(zoom);
	  } // -----------------------------------------------------------------------------


	  function makeRegionObj(region) {
	    var regionData = [];
	    dataGHG.filter(function (d) {
	      if (d.region === region) {
	        var thisObj = {};
	        thisObj.region = d.region;
	        thisObj.city = d.city;
	        thisObj.s1PerCap = d["s1PerCap"];
	        thisObj.storeOrig = d.storeOrig ? d.storeOrig : null;
	        regionData.push(thisObj);
	      }
	    });
	    regionData.sort(function (a, b) {
	      return d3.descending(a["s1PerCap"], b["s1PerCap"]);
	    });
	    return regionData;
	  }

	  function padRegion(data, n) {
	    data.sort(function (a, b) {
	      return d3.descending(a["s1PerCap"], b["s1PerCap"]);
	    });

	    for (var idx = 0; idx < n; idx++) {
	      var thisObj = {};
	      thisObj.region = data[0].region;
	      thisObj.city = "".concat(data[0].region, "_gap").concat(idx);
	      thisObj.s1PerCap = null;
	      thisObj.storeOrig = null;
	      data.push(thisObj);
	    }

	    return data;
	  }

	  function showBarChart(chart, settings, region) {
	    var regionData = [];
	    regionData = makeRegionObj(region);

	    if (region === "Europe") {
	      var regionDataPadded = padRegion(regionData, 3); // add "Southeast Asia"

	      regionData = regionDataPadded.concat(makeRegionObj("Southeast Asia"));
	    } else if (region === "Latin America & Caribbean") {
	      var region1Padded = padRegion(regionData, 1);
	      var region2Padded = padRegion(makeRegionObj("South Asia"), 1);
	      var region3Padded = padRegion(makeRegionObj("Africa"), 2);
	      var region4Padded = padRegion(makeRegionObj("N Africa & W Asia"), 1);
	      var region5Padded = makeRegionObj("Oceania"); // concat the regions into one row

	      regionData = region1Padded.concat(region2Padded).concat(region3Padded).concat(region4Padded).concat(region5Padded);
	    } else if (region === "North America") {
	      regionData = padRegion(regionData, 1);
	    }

	    barChart(chart, settings, regionData);
	    d3.select("#barChart_groupEastAsia").select(".margin-offset").attr("transform", "translate(0, -70)");
	    d3.select("#barChart_groupNAmer").select(".margin-offset").attr("transform", "translate(0, -115)");
	    d3.select("#barChart_groupRow3").select(".margin-offset").attr("transform", "translate(0, -150)");
	    d3.select("#barChart_groupRow4").select(".margin-offset").attr("transform", "translate(0, -190)"); // Define the div for the barChart rect tooltip

	    var div = d3.select("body").append("div").attr("class", "tooltip-bar").style("opacity", 0); // hover over xaxis text

	    d3.selectAll(".x.axis").selectAll("text").on("touchmove mousemove", function (d, i) {
	      if (d.indexOf("gap") === -1) {
	        // clear previous enlarged text
	        d3.selectAll(".enlarged").classed("enlarged", false);

	        if (d3.select(this).text().indexOf("_gap") === -1) {
	          var cityName = i18next.t(d3.select(this).text(), {
	            ns: "cities"
	          });
	          d3.select(this).classed("enlarged", true);
	          d3.selectAll(".x.axis g :not(#text_".concat(cityName, ")")).classed("fadeText", true);
	          highlightElements(d3.select(this).text());
	        }
	      }
	    }).on("mouseout", function (d) {
	      d3.selectAll(".x.axis g text").classed("fadeText", false);
	      resetElements();
	      var lastCity = d3.select(".enlarged").text();
	      d3.select(".bar-group.".concat(i18next.t(lastCity, {
	        ns: "cities"
	      }))).select("rect").classed("active", true);
	      d3.select("#city".concat(i18next.t(lastCity, {
	        ns: "cities"
	      }))).classed("cityactive", true);
	    });
	    d3.selectAll(".bar-group").on("touchmove mousemove", function (d, i) {
	      // Clear previous enlarged text
	      d3.selectAll(".enlarged").classed("enlarged", false); // Enlarge current text

	      var thisCity = i18next.t(d.city, {
	        ns: "cities"
	      });
	      d3.select("#text_".concat(thisCity)).classed("enlarged", true);
	      var count = i + 1;
	      highlightElements(d.city); // Tooltip

	      var displayName = i18next.t(d.city, {
	        ns: "displayName"
	      });
	      var thisValue = d.storeOrig ? d.storeOrig : d.value;
	      var tipx = 30;
	      var tipy = -50;
	      div.style("opacity", 1);
	      div.html("#".concat(count, ". ").concat(displayName, " <br>").concat(globalSettings.formatNum(thisValue), " ").concat(i18next.t("emissions per cap", {
	        ns: "units"
	      }))).style("left", d3.event.pageX + tipx + "px").style("top", d3.event.pageY + tipy + "px");
	    }).on("mouseout", function (d) {
	      div.style("opacity", 0);
	      resetElements();
	      var lastCity = d3.select(".enlarged").text();
	      d3.select(".bar-group.".concat(i18next.t(lastCity, {
	        ns: "cities"
	      }))).select("rect").classed("active", true);
	      d3.select("#city".concat(i18next.t(lastCity, {
	        ns: "cities"
	      }))).classed("cityactive", true);
	    });
	  }

	  function drawLegend() {
	    var xpos = settingsAttr[selectedAttribute].xpos;
	    var rectDim = 15; // rect fill fn

	    var getFill = function getFill(d, i) {
	      return settingsAttr[selectedAttribute].colourRange[i];
	    }; // Fn to display value of each level


	    var getText = function getText(i, j) {
	      if (selectedAttribute === "protocol") {
	        return i18next.t("".concat(selectedAttribute).concat(j + 1), {
	          ns: "legend"
	        });
	      } else if (selectedAttribute === "region") {
	        return "";
	      } else {
	        var levelVal;
	        if (j === 0) levelVal = data[selectedAttribute].lims[j];else levelVal = data[selectedAttribute].levels[j - 1];
	        levelVal = settingsAttr[selectedAttribute].formatLevel ? settingsAttr[selectedAttribute].formatLevel(levelVal) : levelVal;
	        return "".concat(levelVal, "+");
	      }
	    }; // div for the barChart rect tooltip


	    var divLegend = d3.select("body").append("div").attr("class", "tooltip-legend").style("opacity", 0); // Create the umbrella group

	    var rectGroups = svgCB.attr("class", "legendCB").selectAll(".legend").data(settingsAttr[selectedAttribute].colourRange); // Append g nodes (to be filled with a rect and a text) to umbrella group

	    var newGroup = rectGroups.enter().append("g").attr("class", "legend").attr("id", function (d, i) {
	      return "cb".concat(i);
	    }); // add rects

	    newGroup.append("rect").attr("width", rectDim).attr("height", rectDim).attr("y", 5).attr("x", function (d, i) {
	      return 51 + i * 85;
	    }).attr("fill", getFill); // hover

	    newGroup.selectAll(".legend rect").on("touchmove mousemove", function (d, j) {
	      if (selectedAttribute === "protocol") {
	        var thisText = i18next.t("".concat(selectedAttribute).concat(j + 1), {
	          ns: "legend"
	        });
	        divLegend.style("opacity", 1);
	        divLegend.html("<b>".concat(thisText, "</b>: ").concat(i18next.t("".concat(thisText), {
	          ns: "protocolFullName"
	        }))).style("left", d3.event.pageX - 100 + "px").style("top", d3.event.pageY - 70 + "px");
	      }
	    }).on("mouseout", function (d) {
	      divLegend.style("opacity", 0);
	    }); // add text

	    newGroup.append("text").attr("class", "legendText").text(getText).attr("y", 18).attr("x", function (d, i) {
	      return xpos[i];
	    }); // Update rect fill for any new colour arrays passed in

	    rectGroups.select("rect").attr("fill", getFill); // Update rect text for different year selections

	    rectGroups.select("text").text(getText).attr("x", function (d, i) {
	      return xpos[i];
	    });
	    rectGroups.exit().remove(); // Unit text

	    var unitText = settingsAttr[selectedAttribute].units;
	    var unitDisplay = d3.select(".units");
	    unitDisplay.text(unitText);

	    if (selectedAttribute === "HDD" || selectedAttribute === "CDD" || selectedAttribute === "low_bua_pc_2014" || selectedAttribute === "high_bua_pc_2014") {
	      d3.select(".units").classed("unitsactive", true);
	    } else d3.select(".units").classed("unitsactive", false); // hover over units for definition text


	    var divUnits = d3.select("body").append("div").attr("class", "tooltip-units").style("opacity", 0);
	    unitDisplay.on("touchmove mousemove", function () {
	      if (settingsAttr[selectedAttribute].unitdef) {
	        divUnits.style("opacity", 1);
	        divUnits.html("<b>".concat(i18next.t(selectedAttribute, {
	          ns: "attributes"
	        }), "</b>: ").concat(settingsAttr[selectedAttribute].unitdef)).style("left", d3.event.pageX - 100 + "px").style("top", d3.event.pageY - 70 + "px");
	      }
	    }).on("mouseout", function (d) {
	      divUnits.style("opacity", 0);
	    });
	  } // -----------------------------------------------------------------------------
	  // Fn to load attribute data


	  var loadData = function loadData(cb) {
	    if (!data[selectedAttribute]) {
	      d3.json("".concat(urlRoot, "/data/cityApp_attributes_consolidated_").concat(selectedAttribute, ".json"), function (err, filedata) {
	        data[selectedAttribute] = filedata; // Find data [min, max] for all attributes except Region and store in "lims"

	        if (settingsAttr[selectedAttribute].whichLim) {
	          if (settingsAttr[selectedAttribute].whichLim === "d3extent") {
	            data[selectedAttribute]["lims"] = d3.extent(data[selectedAttribute], function (d) {
	              return d.value;
	            });
	          } else if (settingsAttr[selectedAttribute].whichLim === "d3mean") {
	            var thisMean = d3.mean(data[selectedAttribute], function (d) {
	              return d.value;
	            });
	            data[selectedAttribute]["lims"] = [thisMean - stats.getTail(thisMean, twoSigma), thisMean + stats.getTail(thisMean, twoSigma)];
	          }
	        } // else: region handled separately in colourBars()
	        // Floor to nearest modx except for region and protocol


	        if (data[selectedAttribute]["lims"]) {
	          if (settingsAttr[selectedAttribute].modx) {
	            var modx = settingsAttr[selectedAttribute].modx;
	            data[selectedAttribute]["lims"] = data[selectedAttribute]["lims"].map(function (x) {
	              return Math.floor(x / modx) * modx;
	            });
	          }
	        }

	        cb();
	      });
	    } else {
	      cb();
	    }
	  };

	  function getMapping() {
	    if (data[selectedAttribute].lims) {
	      var d0 = data[selectedAttribute].lims[0];
	      var d1 = data[selectedAttribute].lims[1];
	      var mapping = d3.scaleQuantile().domain([d0, d1]).range(settingsAttr[selectedAttribute].colourRange);
	      var levels;

	      if (!settingsAttr[selectedAttribute].cbValues) {
	        levels = mapping.quantiles();
	      } else {
	        // protocol
	        levels = settingsAttr[selectedAttribute].cbValues;
	      } // store mappings in data object array


	      data[selectedAttribute]["mappingFn"] = mapping;
	      data[selectedAttribute]["levels"] = levels;
	    }
	  } // -----------------------------------------------------------------------------


	  function uiHandler(event) {
	    d3.selectAll(".data").selectAll("rect").classed("isNan", false);
	    selectedAttribute = event.target.value;

	    if (selectedAttribute === "none") {
	      d3.selectAll(".bar-group rect").style("fill", noneFill);
	      drawLegend(); // clears legend
	    } else {
	      loadData(function () {
	        getMapping(); // defines fns to map attribute value to colour and legend rects for barChart

	        colourBars(); // applies colour to each bar in barChart

	        drawLegend(); // city card

	        if (newText) {
	          if (newText[9]) {
	            newText = newText.slice(0, 9); // rm last two elements

	            if (selectedAttribute === "protocol" || selectedAttribute === "year") {
	              showCityCard(newText);
	              return;
	            }
	          }

	          if (selectedAttribute !== "protocol" && selectedAttribute !== "year") {
	            var cityName = d3.selectAll(".enlarged").text();
	            addNewText(selectedAttribute, cityName);
	            showCityCard(newText);
	          }
	        }
	      });
	    }
	  } // -----------------------------------------------------------------------------
	  // Initial page load


	  i18n.load(["".concat(urlRoot, "/src/i18n")], function () {
	    // settingsStackedSA.x.label = i18next.t("x_label", {ns: "roadArea"}),
	    d3.queue().defer(d3.json, "".concat(urlRoot, "/data/cityApp_attributes_consolidated_fixedSet.json"))["await"](function (error, datafile) {
	      dataGHG = datafile;
	      dataGHG.map(function (d) {
	        d.scope1 = d3.format(".3n")(d.scope1 / 1e6);

	        if (Object.keys(offscaleDict).find(function (k) {
	          return k === d.city;
	        })) {
	          d.storeOrig = d.s1PerCap;
	          d.s1PerCap = offscaleDict[d.city];
	        }
	      });
	      pageText();
	      drawMap();
	      addRect();
	      var textSet = [{
	        id: 1,
	        text: i18next.t("initTitle", {
	          ns: "cityCard"
	        })
	      }, {
	        id: 2,
	        text: i18next.t("initRow1", {
	          ns: "cityCard"
	        })
	      }, {
	        id: 3,
	        text: i18next.t("initRow2", {
	          ns: "cityCard"
	        })
	      }, {
	        id: 4,
	        text: i18next.t("initRow3", {
	          ns: "cityCard"
	        })
	      }, {
	        id: 5,
	        text: i18next.t("initRow4", {
	          ns: "cityCard"
	        })
	      }];
	      showCityCard(textSet); // Draw barCharts
	      // Note: bars are coloured by css region when page first loads. No colour mapping necessary.

	      showBarChart(chartEA, settingsRow1, "East Asia");
	      showBarChart(chartNA, settingsRow2, "North America");
	      showBarChart(chartEU, settingsRow3, "Europe");
	      showBarChart(chartRow4, settingsRow4, "Latin America & Caribbean");
	      d3.selectAll(".data svg").style("overflow", "visible"); // y-label

	      d3.select("#barChart_groupRow3").append("text").attr("text-anchor", "middle").text(i18next.t("yaxText", {
	        ns: "chartHeadings"
	      })).attr("class", "yaxLabel").attr("transform", function (d) {
	        return "translate(" + -35 + " " + -135 + ")rotate(-90)";
	      });
	      appendArrow("East Asia");
	      appendArrow("North America");
	      appendArrow("Europe");
	      appendArrow("Southeast Asia");
	      appendArrow("Latin America & Caribbean");
	      appendArrow("South Asia");
	      plotHeadings("h1");
	      plotHeadings("h2");
	      plotHeadings("h3");
	      plotHeadings("h4");
	      plotHeadings("h5");
	      plotHeadings("h6");
	      plotHeadings("h7");
	      plotHeadings("h8");
	      plotHeadings("h9");
	    });
	  });
	  $(document).on("change", uiHandler);

	  function plotHeadings(h) {
	    d3.select("#".concat(h)).text(i18next.t(h, {
	      ns: "chartHeadings"
	    }));
	  }

	  function highlightElements(cityName) {
	    var idName = i18next.t(cityName, {
	      ns: "cities"
	    }); // Clear Previous

	    resetElements(); // Update city card

	    var thisCountry = dataGHG.filter(function (d) {
	      return d.city === cityName;
	    })[0]["country"];
	    var thisScope1 = dataGHG.filter(function (d) {
	      return d.city === cityName;
	    })[0]["scope1"];
	    var thisYear = dataGHG.filter(function (d) {
	      return d.city === cityName;
	    })[0]["year"];
	    var thisDataset = dataGHG.filter(function (d) {
	      return d.city === cityName;
	    })[0]["dataset"];
	    var thisProtocol = dataGHG.filter(function (d) {
	      return d.city === cityName;
	    })[0]["protocol"];
	    var displayName = i18next.t(cityName, {
	      ns: "displayName"
	    });
	    newText = [{
	      id: 1,
	      text: "".concat(displayName, ", ").concat(thisCountry)
	    }, {
	      id: 2,
	      text: i18next.t("scope1Row", {
	        ns: "cityCard"
	      })
	    }, {
	      id: 3,
	      text: "".concat(thisScope1, " ").concat(i18next.t("scope1", {
	        ns: "units"
	      }), " ").concat(i18next.t("defn", {
	        ns: "units"
	      }))
	    }, {
	      id: 4,
	      text: i18next.t("yearRow", {
	        ns: "cityCard"
	      })
	    }, {
	      id: 5,
	      text: thisYear
	    }, {
	      id: 6,
	      text: i18next.t("datasetRow", {
	        ns: "cityCard"
	      })
	    }, {
	      id: 7,
	      text: i18next.t(thisDataset, {
	        ns: "datasets"
	      })
	    }, {
	      id: 8,
	      text: i18next.t("protocolRow", {
	        ns: "cityCard"
	      })
	    }, {
	      id: 9,
	      text: i18next.t(thisProtocol, {
	        ns: "protocol"
	      })
	    }];

	    if (data[selectedAttribute]) {
	      if (selectedAttribute !== "protocol" & selectedAttribute !== "year") {
	        addNewText(selectedAttribute, cityName);
	      }
	    }

	    showCityCard(newText); // Highlight current city on map, bars and barChart x-axis

	    d3.select(".bar-group.".concat(idName)).select("rect").classed("active", true);
	    d3.selectAll(".bar-group:not(.".concat(idName, ")")).select("rect").classed("fade", true);
	    d3.selectAll("#city" + idName).classed("cityactive", true);
	    d3.selectAll(".worldcity:not(#city" + idName + ")").classed("cityfade", true);
	    d3.selectAll(".worldcountry:not(#map".concat(i18next.t(thisCountry, {
	      ns: "countries"
	    }), ")")).classed("countryfade", true);
	  } // Adds to newText obj array for city card


	  function addNewText(attr, cityName) {
	    var thisAttr;
	    var val = data[attr].filter(function (d) {
	      return d.city === cityName;
	    })[0]["value"];

	    if (typeof val === "string" || val instanceof String) {
	      thisAttr = val; // for region string
	    } else {
	      thisAttr = val === null ? "N/A" : d3.format(",")(val) ? d3.format(",")(val) : val;
	    }

	    var thisUnit = thisAttr === "N/A" ? "" : i18next.t(attr, {
	      ns: "units"
	    });
	    newText.push({
	      id: 10,
	      text: i18next.t(attr, {
	        ns: "attributes"
	      })
	    }, {
	      id: 11,
	      text: "".concat(thisAttr, " ").concat(thisUnit)
	    });
	  } // Reset elements to original style before selection


	  function resetElements() {
	    // reset bar opacity
	    d3.selectAll(".bar-group").selectAll("rect").classed("active", false).classed("fade", false); // Clear previous enlarged text
	    // d3.selectAll(".enlarged").classed("enlarged", false);
	    // reset map highlight classes

	    d3.selectAll(".cityactive").classed("cityactive", false);
	    d3.selectAll(".cityfade").classed("cityfade", false);
	    d3.selectAll(".countryfade").classed("countryfade", false);
	  } // function zoomed() {
	  //   const g = d3.select("#map").select(".mapg");
	  //   g.style("stroke-width", `${1.5 / d3.event.transform.k}px`);
	  //   g.attr("transform", d3.event.transform); // updated for d3 v4
	  // }
	  // const zoom = d3.zoom()
	  //     .on("zoom", zoomed);
	  // function appendArrow(geogroup, data, city) {


	  function appendArrow(region) {
	    var arrowdata = [];
	    var chartId = i18next.t(region, {
	      ns: "barchartGroups"
	    });
	    var ns;
	    if (region === "Europe") ns = "".concat(chartId, "_").concat(region);else if (region === "Southeast Asia") ns = "".concat(chartId, "_SEasia");else if (region === "Latin America & Caribbean") ns = "".concat(chartId, "_LA");else if (region === "South Asia") ns = "".concat(chartId, "_SA");else if (region === "N Africa & W Asia") ns = "".concat(chartId, "_NAWA");else ns = chartId;
	    var xpos = settingsArr[ns].xpos;
	    var ypos = settingsArr[ns].ypos;
	    var len = settingsArr[ns].arrowlength;
	    var gid = settingsArr[ns].gid;
	    var margin = {
	      top: 0,
	      right: 0,
	      bottom: 0,
	      left: 0
	    };
	    var width = 200 - margin.left - margin.right;
	    var height = 200 - margin.top - margin.bottom;
	    var vals = [];
	    var count = 0;
	    dataGHG.filter(function (d) {
	      if (d.region === region) {
	        if (d.storeOrig) {
	          vals.push(d.storeOrig);
	          arrowdata.push({
	            id: count,
	            name: "arrow" + count,
	            path: "M 2,2 L2,11 L10,6 L2,2"
	          });
	          count++;
	        }
	      }
	    });

	    var _loop = function _loop(idx) {
	      var svg = d3.select("#barChart_".concat(chartId)).append("g").attr("class", "barMarker").attr("id", "g_".concat(gid).concat(idx)).attr("height", height + margin.top + margin.bottom).attr("transform", "translate(" + xpos[idx] + "," + ypos[idx] + ")") // posn of arrow and text
	      .append("svg").attr("width", width + margin.left + margin.right);
	      var defs = svg.append("svg:defs");
	      var paths = svg.append("svg:g").attr("id", "markers".concat(idx));
	      defs.selectAll("marker").data(arrowdata).enter().append("svg:marker").attr("id", function (d) {
	        return "marker_arrow".concat(idx);
	      }).attr("markerHeight", 13).attr("markerWidth", 13).attr("markerUnits", "strokeWidth").attr("orient", "auto").attr("refX", 9.5).attr("refY", 6).append("svg:path").attr("d", function (d) {
	        return d.path;
	      });
	      paths.selectAll("path").data(arrowdata).enter().append("svg:path").attr("d", function (d, i) {
	        return "M 100, 0 V ".concat(len, ", 0 ");
	      }).attr("stroke-width", 1.2).attr("marker-start", function (d) {
	        return "url(#marker_stub".concat(idx, ")");
	      }).attr("marker-end", function (d) {
	        return "url(#marker_arrow".concat(idx, ")");
	      }).attr("transform", function (d) {
	        // adjusts arrow proportions
	        return "scale(".concat(settingsArr[ns].arrowscale[0], " ").concat(settingsArr[ns].arrowscale[1], ")");
	      }).append("svg:path").attr("d", function (d) {
	        return d.path;
	      }); // arrow text

	      d3.select("#g_".concat(gid).concat(idx)).append("text").text(vals[idx]).attr("transform", function () {
	        // adjust arrow proportions
	        return "scale(".concat(settingsArr[ns].textscale[0], " ").concat(settingsArr[ns].textscale[1], ")\n              translate(").concat(settingsArr[ns].textposx[idx], " ").concat(settingsArr[ns].textposy[idx], ")");
	      });
	    };

	    for (var idx = 0; idx < vals.length; idx++) {
	      _loop(idx);
	    }
	  }
	};

	if (typeof Drupal !== "undefined") {
	  Drupal.behaviors.dv = {
	    attach: function attach(context, settings) {
	      init(Drupal.settings.dv && Drupal.settings.dv.urlRoot ? Drupal.settings.dv.urlRoot : "");
	    }
	  };
	} else {
	  init();
	}

}());
