/*!
 * sugar.js v1.0.4
 * (c) 2016 TANG
 * https://github.com/tangbc/sugar
 * released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Sugar"] = factory();
	else
		root["Sugar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(3),
		__webpack_require__(4),
		__webpack_require__(2),
		__webpack_require__(6),
		__webpack_require__(9)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(sync, ajax, core, util, Module, Component) {

		function Sugar() {
			/**
			 * 异步状态锁
			 * @type  {Object}
			 */
			this.sync = sync;

			/**
			 * 工具方法
			 * @type  {Object}
			 */
			this.util = util;

			/**
			 * Ajax
			 * @type  {Object}
			 */
			this.ajax = ajax;

			/**
			 * 系统核心实例
			 * @type  {Object}
			 */
			this.core = core;

			/**
			 * 基础模块类
			 * @type  {Class}
			 */
			this.Module = Module;

			/**
			 * 视图组件基础模块
			 * @type  {Class}
			 */
			this.Component = Component;
		}

		return new Sugar();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(util) {

		/**
		 * 异步状态锁，处理模块创建的异步回调和通信，实现异步回调按队列触发
		 */
		function Sync() {
			/**
			 * 异步计数
			 * @type  {Number}
			 */
			this.count = 0;

			/**
			 * 回调队列
			 * @type  {Array}
			 */
			this.queue = [];
		}

		var sp = Sync.prototype;

		/**
		 * 加锁异步计数
		 */
		sp.lock = function() {
			this.count++;
		}

		/**
		 * 解锁异步计数
		 */
		sp.unlock = function() {
			this.count--;
			this._checkQueue();
		}

		/**
		 * 添加一个回调到队列
		 * @param  {Function}  callback  [回调函数]
		 * @param  {Function}  context   [上下文]
		 * @param  {Array}     args      [回调参数]
		 */
		sp.addQueue = function(callback, context, args) {
			this.queue.push([callback, context, args]);
		}

		/**
		 * 检查回调队列是否空闲
		 */
		sp._checkQueue = function() {
			var sync, callback, context, args;

			// 依次从最后的回调开始处理
			while (this.count === 0 && this.queue.length) {
				sync = this.queue.pop();

				// 回调函数
				callback = sync[0];
				// 执行环境
				context = sync[1];
				// 回调参数
				args = sync[2];

				if (util.isString(callback)) {
					callback = context[callback];
				}

				if (util.isFunc(callback)) {
					callback.apply(context, args);
				}
			}
		}

		return new Sync();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 通用函数库
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		var WIN = window;
		var DOC = WIN.document;
		var OP = Object.prototype;
		var AP = Array.prototype;
		var hasOwn = OP.hasOwnProperty;

		/**
		 * 是否是对象自面量, {} 或 new Object()
		 */
		function isObject(obj) {
			return OP.toString.call(obj) === '[object Object]';
		}

		/**
		 * 是否是真数组, [] 或 new Array()
		 */
		function isArray(obj) {
			return OP.toString.call(obj) === '[object Array]';
		}

		/**
		 * 是否是函数
		 */
		function isFunc(fn) {
			return fn instanceof Function;
		}

		/**
		 * 是否是字符串
		 */
		function isString(str) {
			return typeof str === 'string';
		}

		/**
		 * 是否是布尔值
		 */
		function isBool(bool) {
			return typeof bool === 'boolean';
		}

		/**
		 * 是否是数字
		 */
		function isNumber(num) {
			return typeof num === 'number' && !isNaN(num);
		}

		/**
		 * 是否是纯粹对象
		 */
		function isPlainObject(obj) {
			if (!obj || !isObject(obj) || obj.nodeType || obj === obj.window) {
				return false;
			}
			if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}
			return true;
		}

		/**
		 * 是否是空对象
		 * @param   {Object}   target
		 * @return  {Boolean}
		 */
		function isEmpty(target) {
			for (var i in target) {
				if (hasOwn.call(target, i)) {
					return false;
				}
			}

			return true;
		}


		/**
		 * Util 构造函数
		 */
		function Util() {
			this.OP = OP;
			this.AP = AP;
			this.WIN = WIN;
			this.DOC = DOC;

			this.isBool = isBool;
			this.isFunc = isFunc;
			this.isArray = isArray;
			this.isEmpty = isEmpty;
			this.isNumber = isNumber;
			this.isObject = isObject;
			this.isString = isString;
		}

		var up = Util.prototype;
		var cons = WIN.console;

		/**
		 * 打印错误
		 */
		up.error = function() {
			cons.error.apply(cons, arguments);
		}

		/**
		 * 打印警告信息
		 */
		up.warn = function() {
			cons.warn.apply(cons, arguments);
		}

		/*
		 * 对象自有属性检测
		 */
		up.hasOwn = function(obj, key) {
			return obj && hasOwn.call(obj, key);
		}

		/**
		 * object 定义或修改属性
		 * @param   {Object|Array}  object        [数组或对象]
		 * @param   {String}        property      [属性或数组下标]
		 * @param   {Mix}           value         [属性的修改值/新值]
		 * @param   {Boolean}       writable      [该属性是否能被赋值运算符改变]
		 * @param   {Boolean}       enumerable    [该属性是否出现在枚举中]
		 * @param   {Boolean}       configurable  [该属性是否能够被改变或删除]
		 */
		up.def = function(object, property, value, writable, enumerable, configurable) {
			return Object.defineProperty(object, property, {
				'value'       : value,
				'writable'    : !!writable,
				'enumerable'  : !!enumerable,
				'configurable': !!configurable
			});
		}

		/**
		 * 遍历数组或对象
		 * @param  {Array|Object}  items     [数组或对象]
		 * @param  {Fuction}       callback  [回调函数]
		 * @param  {Object}        context   [作用域]
		 */
		up.each = function(items, callback, context) {
			var ret, i;

			if (!items) {
				return;
			}

			if (!context) {
				context = WIN;
			}

			if (isString(callback)) {
				callback = context[callback];
			}

			// 数组
			if (isArray(items)) {
				for (i = 0; i < items.length; i++) {
					ret = callback.call(context, items[i], i);

					// 回调返回 false 退出循环
					if (ret === false) {
						break;
					}

					// 回调返回 null 从原数组删除当前选项
					if (ret === null) {
						items.splice(i, 1);
						i--;
					}
				}
			}
			// 对象
			else if (isObject(items)) {
				for (i in items) {
					if (!this.hasOwn(items, i)) {
						continue;
					}

					ret = callback.call(context, items[i], i);

					// 回调返回 false 退出循环
					if (ret === false) {
						break;
					}

					// 回调返回 null 从原对象删除当前选项
					if (ret === null) {
						delete items[i];
					}
				}
			}
		}

		/**
		 * 扩展合并对象，摘自 jQuery
		 */
		up.extend = function() {
			var options, name, src, copy, copyIsArray, clone;
			var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;

			// Handle a deep copy situation
			if (isBool(target)) {
				deep = target;
				target = arguments[i] || {};
				i++;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if (typeof target !== "object" && !isFunc(target)) {
				target = {};
			}

			// Extend Util itself if only one argument is passed
			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {
				// Only deal with non-null/undefined values
				if ((options = arguments[i]) != null) {
					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];

							}
							else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = this.extend(deep, clone, copy);
						}
						// Don't bring in undefined values
						else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		}

		/**
		 * 复制对象或数组
		 * @param   {Object|Array}  target
		 * @return  {Mix}
		 */
		up.copy = function(target) {
			var ret;

			if (isArray(target)) {
				ret = target.slice(0);
			}
			else if (isObject(target)) {
				ret = this.extend(true, {}, target);
			}
			else {
				ret = target;
			}

			return ret;
		}

		/**
		 * 去掉字符串中所有空格
		 * @param   {String}  string
		 * @return  {String}
		 */
		up.removeSpace = function(string) {
			return string.replace(/\s/g, '');
		}

		/**
		 * 拆解字符键值对，返回键和值
		 * @param   {String}        expression
		 * @param   {Boolean}       both         [是否返回键和值]
		 * @return  {String|Array}
		 */
		up.getKeyValue = function(expression, both) {
			var array = expression.split(':');
			return both ? array : array.pop();
		}

		/**
		 * 分解字符串函数参数
		 * @param   {String}  expression
		 * @return  {Array}
		 */
		up.stringToParams = function(expression) {
			var ret, params, func;
			var exp = this.removeSpace(expression);
			var matches = exp.match(/(\(.*\))/);
			var result = matches && matches[0];

			// 有函数名和参数
			if (result) {
				params = result.substr(1, result.length - 2).split(',');
				func = exp.substr(0, exp.indexOf(result));
				ret = [func, params];
			}
			// 只有函数名
			else {
				ret = [exp, params];
			}

			return ret;
		}

		/**
		 * 字符 json 结构转为可取值的对象
		 * @param   {String}  jsonString
		 * @return  {Object}
		 */
		up.convertJson = function(jsonString) {
			var info, props;
			var string = jsonString.trim(), i = string.length;

			if (/^\{.*\}$/.test(string)) {
				info = {};
				string = string.substr(1, i - 2).replace(/\s|'|"/g, '');
				props = string.match(/[^,]+:[^:]+((?=,[\w_-]+:)|$)/g);

				this.each(props, function(prop) {
					var vals = this.getKeyValue(prop, true);
					var name = vals[0], value = vals[1];
					if (name && value) {
						info[name] = value;
					}
				}, this);
			}

			return info;
		}

		/**
		 * 创建一个空的 dom 元素
		 * @param   {String}     tag  [元素标签名称]
		 * @return  {DOMElemnt}
		 */
		up.createElement = function(tag) {
			return DOC.createElement(tag);
		}

		/**
		 * 返回一个空文档碎片
		 * @return  {Fragment}
		 */
		up.createFragment = function() {
			return DOC.createDocumentFragment();
		}

		/**
		 * DOMElement 的子节点转换成文档片段
		 * @param   {DOMElement}  element
		 */
		up.nodeToFragment = function(element) {
			var child;
			var fragment = this.createFragment();
			var cloneNode = element.cloneNode(true);

			while (child = cloneNode.firstChild) {
				fragment.appendChild(child);
			}

			return fragment;
		}

		/**
		 * 字符串 html 转文档碎片
		 * @param   {String}    html
		 * @return  {Fragment}
		 */
		up.stringToFragment = function(html) {
			var div, fragment;

			// 存在标签
			if (/<[^>]+>/g.test(html)) {
				div = this.createElement('div');
				div.innerHTML = html;
				fragment = this.nodeToFragment(div);
			}
			// 纯文本节点
			else {
				fragment = this.createFragment();
				fragment.appendChild(DOC.createTextNode(html));
			}

			return fragment;
		}

		/**
		 * 获取指令表达式的别名/模型字段
		 * eg. item.text -> item, items.length -> items
		 * @param   {String}  expression
		 * @return  {String}
		 */
		up.getExpAlias = function(expression) {
			var pos = expression.indexOf('.');
			return pos === -1 ? expression : expression.substr(0, pos);
		}

		/**
		 * 获取指令表达式的取值字段，无返回空
		 * eg. item.text -> text,
		 * @param   {String}  expression
		 * @return  {String}
		 */
		up.getExpKey = function(expression) {
			var pos = expression.lastIndexOf('.');
			return pos === -1 ? '' : expression.substr(pos + 1);
		}

		return new Util();
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(util) {

		/**
			readyState:
			0: 请求未初始化
			1: 服务器连接已建立
			2: 请求已接收
			3: 请求处理中
			4: 请求已完成，且响应已就绪
		 */

		/**
		 * Ajax 模块
		 */
		function Ajax() {}

		var ap = Ajax.prototype;

		/**
		 * 执行一个 http 请求
		 * @param   {String}    dataType  [回调数据类型 json/text ]
		 * @param   {String}    url       [请求url]
		 * @param   {String}    method    [请求类型]
		 * @param   {String}    param     [请求参数]
		 * @param   {Function}  callback  [回调函数]
		 * @param   {Function}  context   [作用域]
		 */
		ap._execute = function(dataType, url, method, param, callback, context) {
			var ct = context || util.WIN;
			var xmlHttp = new XMLHttpRequest();

			// 初始化请求
			xmlHttp.open(method, url, true);

			// 状态变化回调
			xmlHttp.onreadystatechange = function() {
				var response;
				var result = null, error = null, status = xmlHttp.status;

				// 请求完成
				if (xmlHttp.readyState === 4) {
					response = xmlHttp.responseText;

					// 返回数据类型
					if (dataType !== 'text') {
						try {
							response = JSON.parse(response);
						}
						catch (e) {}
					}

					// 请求响应成功
					if (status === 200) {
						result = {
							'success': true,
							'result' : response
						}
					}
					// 响应失败
					else {
						error = {
							'result' : null,
							'success': false,
							'status' : status
						}
					}

					callback.call(ct, error, result);
				}
			}

			if (param) {
				xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			}

			xmlHttp.send(param);
		}

		/**
		 * get 请求
		 */
		ap.get = function(url, param, callback, context, dataType) {
			var params = [];

			if (util.isFunc(param)) {
				dataType = context;
				context = callback;
				callback = param;
				param = null;
			}

			// 格式化参数对象
			util.each(param, function(val, key) {
				params.push(key + '=' + encodeURIComponent(val));
			});

			if (params.length) {
				url = url + '?' + params.join('&');
			}

			this._execute(dataType || 'json', url, 'GET', null, callback, context);
		}

		/**
		 * post 请求
		 */
		ap.post = function(url, param, callback, context) {
			this._execute('json', url, 'POST', param ? JSON.stringify(param) : null, callback, context);
		}

		/**
		 * 拉取静态模板
		 */
		ap.load = function(url, param, callback, context) {
			this.get(url, param, callback, context, 'text');
		}

		return new Ajax();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(2),
		__webpack_require__(5),
		__webpack_require__(6),
		__webpack_require__(8)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(util, cache, Module, messager) {

		/**
		 * Core 核心模块，用于顶层组件模块的创建
		 */
		var Core = Module.extend({
			/**
			 * 获取顶级组件实例
			 * @param  {String}  name  [组件实例名称]
			 * @return {Object}
			 */
			get: function(name) {
				return this.getChild(name);
			},

			/**
			 * 全局广播消息，由 core 实例发出，系统全部实例接收
			 * @param  {String}   name   [发送的消息名称]
			 * @param  {Mix}      param  [<可选>附加消息参数]
			 * @return {Boolean}
			 */
			globalCast: function(name, param) {
				if (!util.isString(name)) {
					util.error('message\'s name must be a type of String: ', name);
					return;
				}

				messager.globalCast(name, param);
			}
		});

		var core = cache['0'] = new Core();

		return core;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * cache 系统组件实例缓存
	 * 组件唯一 id 与组件实例的对应关系
	 */
	!(module.exports = {'id': 1, 'length': 0});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(7),
		__webpack_require__(5),
		__webpack_require__(2),
		__webpack_require__(8)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Root, cache, util, messager) {

		/**
		 * Module 系统组件模块基础类，实现所有模块的通用方法
		 */
		var Module = Root.extend({
			/**
			 * _ 记录模块信息
			 * @type {Object}
			 */
			_: {},

			/**
			 * 创建一个子模块实例
			 * @param  {String}  name    [子模块名称，同一模块下创建的子模块名称不能重复]
			 * @param  {Class}   Class   [生成子模块实例的类]
			 * @param  {Object}  config  [<可选>子模块配置参数]
			 * @return {Object}          [返回创建的子模块实例]
			 */
			create: function(name, Class, config) {
				if (!util.isString(name)) {
					util.error('module\'s name must be a type of String: ', name);
					return;
				}
				if (!util.isFunc(Class)) {
					util.error('module\'s Class must be a type of Function: ', Class);
					return;
				}
				if (config && !util.isObject(config)) {
					util.error('module\'s config must be a type of Object: ', config);
					return;
				}

				var cls = this._;

				// 建立模块关系信息
				if (!util.hasOwn(cls, 'childArray')) {
					// 子模块实例缓存数组
					cls['childArray'] = [];
					// 子模块命名索引
					cls['childMap'] = {};
				}

				// 判断是否已经创建过
				if (cls['childMap'][name]) {
					util.error('Module\'s name already exists: ', name);
					return;
				}

				// 生成子模块实例
				var instance = new Class(config);

				// 记录子模块实例信息和父模块实例的对应关系
				var info = {
					// 子模块实例名称
					'name': name,
					// 子模块实例id
					'id'  : cache.id++,
					// 父模块实例 id，0 为顶级模块实例
					'pid' : cls.id || 0
				}
				instance._ = info;

				// 存入系统实例缓存队列
				cache[info.id] = instance;
				cache.length++;

				// 缓存子模块实例
				cls['childArray'].push(instance);
				cls['childMap'][name] = instance;

				// 调用模块实例的 init 方法，传入配置参数和父模块
				if (util.isFunc(instance.init)) {
					instance.init(config, this);
				}

				return instance;
			},

			/**
			 * 获取当前模块的父模块实例（模块创建者）
			 */
			getParent: function() {
				var cls = this._;
				var pid = cls && cls.pid;
				return cache[pid] || null;
			},

			/**
			 * 获取当前模块创建的指定名称的子模块实例
			 * @param  {String}  name  [子模块名称]
			 * @return {Object}
			 */
			getChild: function(name) {
				var cls = this._;
				return cls && cls['childMap'] && cls['childMap'][name] || null;
			},

			/**
			 * 返回当前模块的所有子模块实例
			 * @param  {Boolean}  returnArray  [返回的集合是否为数组形式，否则返回映射结构]
			 * @return {Mix}
			 */
			getChilds: function(returnArray) {
				var cls = this._;
				returnArray = util.isBool(returnArray) && returnArray;
				return returnArray ? (cls['childArray'] || []) : (cls['childMap'] || {});
			},

			/**
			 * 移除当前模块实例下的指定子模块的记录
			 * @param  {String}   name  [子模块名称]
			 * @return {Boolean}
			 */
			_removeChild: function(name) {
				var cls = this._;
				var cMap = cls['childMap'] || {};
				var cArray = cls['childArray'] || [];
				var child = cMap[name];

				if (!child) {
					return;
				}

				for (var i = 0, len = cArray.length; i < len; i++) {
					if (cArray[i].id === child.id) {
						delete cMap[name];
						cArray.splice(i, 1);
						break;
					}
				}
			},

			/**
			 * 模块销毁函数，只删除缓存队列中的记录和所有子模块集合
			 * @param  {Mix}  notify  [是否向父模块发送销毁消息]
			 */
			destroy: function(notify) {
				var cls = this._;
				var name = cls.name;

				// 调用销毁前函数，可进行必要的数据保存
				if (util.isFunc(this.beforeDestroy)) {
					this.beforeDestroy();
				}

				// 递归调用子模块的销毁函数
				var childs = this.getChilds(true);
				util.each(childs, function(child) {
					if (util.isFunc(child.destroy)) {
						child.destroy(-1);
					}
				});

				// 从父模块删除（递归调用时不需要）
				var parent = this.getParent();
				if (notify !== -1 && parent) {
					parent._removeChild(name);
				}

				// 从系统缓存队列中销毁相关记录
				var id = cls.id;
				if (util.hasOwn(cache, id)) {
					delete cache[id];
					cache.length--;
				}

				// 调用销毁后函数，可进行销毁界面和事件
				if (util.isFunc(this.afterDestroy)) {
					this.afterDestroy();
				}

				// 向父模块通知销毁消息
				if (notify === true) {
					this.fire('subDestroyed', name);
				}
			},

			/**
			 * 当前模块作用域的定时器
			 * @param {Function}  callback  [定时器回调函数]
			 * @param {Number}    time      [<可选>回调等待时间（毫秒）不填为0]
			 * @param {Array}     param     [<可选>回调函数的参数]
			 */
			setTimeout: function(callback, time, param) {
				var self = this;
				time = util.isNumber(time) ? time : 0;

				// callback 为属性值
				if (util.isString(callback)) {
					callback = this[callback];
				}

				// 不合法的回调函数
				if (!util.isFunc(callback)) {
					util.error('callback must be a type of Function: ', callback);
					return;
				}

				// 参数必须为数组或 arguments 对象
				if (param && !util.isFunc(param.callee) && !util.isArray(param)) {
					param = [param];
				}

				return setTimeout(function() {
					callback.apply(self, param);
					self = callback = time = param = null;
				}, time);
			},

			/**
			 * 冒泡（由下往上）方式发送消息，由子模块发出，逐层父模块接收
			 * @param  {String}    name      [发送的消息名称]
			 * @param  {Mix}       param     [<可选>附加消息参数]
			 * @param  {Function}  callback  [<可选>发送完毕的回调函数，可在回调中指定回应数据]
			 */
			fire: function(name, param, callback) {
				if (!util.isString(name)) {
					util.error('message\'s name must be a type of String: ', name);
					return;
				}

				// 不传 param
				if (util.isFunc(param)) {
					callback = param;
					param = null;
				}

				// callback 为属性值
				if (util.isString(callback)) {
					callback = this[callback];
				}

				// 不传 callback
				if (!callback) {
					callback = null;
				}

				messager.fire(this, name, param, callback, this);
			},

			/**
			 * 广播（由上往下）方式发送消息，由父模块发出，逐层子模块接收
			 */
			broadcast: function(name, param, callback) {
				if (!util.isString(name)) {
					util.error('message\'s name must be a type of String: ', name);
					return false;
				}

				// 不传 param
				if (util.isFunc(param)) {
					callback = param;
					param = null;
				}

				// callback 为属性值
				if (util.isString(callback)) {
					callback = this[callback];
				}

				// 不传 callback
				if (!callback) {
					callback = null;
				}

				messager.broadcast(this, name, param, callback, this);
			},

			/**
			 * 向指定模块实例发送消息
			 * @param   {String}    receiver  [消息接受模块实例的名称以.分隔，要求完整的层级]
			 * @param   {String}    name      [发送的消息名称]
			 * @param   {Mix}       param     [<可选>附加消息参数]
			 * @param   {Function}  callback  [<可选>发送完毕的回调函数，可在回调中指定回应数据]]
			 */
			notify: function(receiver, name, param, callback) {
				if (!util.isString(receiver)) {
					util.error('receiver\'s name must be a type of String: ', name);
					return false;
				}

				if (!util.isString(name)) {
					util.error('message\'s name must be a type of String: ', name);
					return false;
				}

				// 不传 param
				if (util.isFunc(param)) {
					callback = param;
					param = null;
				}

				// callback 为属性值
				if (util.isString(callback)) {
					callback = this[callback];
				}

				// 不传 callback
				if (!callback) {
					callback = null;
				}

				messager.notify(this, receiver, name, param, callback, this);
			}
		});

		return Module;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(util) {

		/**
		 * 对子类方法挂载 Super
		 * @param   {Function}  Super   [Super 函数]
		 * @param   {Mix}       method  [子类属性或者方法]
		 * @return  {Mix}
		 */
		function bindSuper(Super, method) {
			if (util.isFunc(method) && /\b\.Super\b/.test(Function.prototype.toString.call(method))) {
				return function() {
					this.Super = Super;
					method.apply(this, arguments);
				}
			}
			else {
				return method;
			}
		}

		/*
		 * Root 实现类式继承
		 * @param  {Object}    proto  [生成类的新原型属性或方法]
		 * @return {Function}  Class  [继承后的类]
		 */
		function Root() {}
		Root.extend = function(proto) {
			var parent = this.prototype;

			/**
			 * 子类对父类的调用
			 * @param {String}  method  [调用的父类方法]
			 * @param {Array}   args    [调用参数]
			 */
			function Super(method, args) {
				var func = parent[method];
				if (util.isFunc(func)) {
					func.apply(this, args);
				}
			}

			/**
			 * 返回(继承后)的类
			 */
			function Class() {}
			var classProto = Class.prototype = Object.create(parent);

			util.each(proto, function(value, property) {
				classProto[property] = bindSuper(Super, value);
			});

			proto = null;
			Class.extend = this.extend;
			classProto.constructor = Class;

			return Class;
		}

		return Root;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(5)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(sync, util, cache) {

		/**
		 * 字符串首字母大写
		 */
		function ucFirst(str) {
			var first = str.charAt(0).toUpperCase();
			return first + str.substr(1);
		}

		/**
		 * Messager 实现组件消息通信
		 * 默认接收消息 onMessage, 默认全部发送完毕回调 onMessageSent
		 */
		function Messager() {
			/**
			 * 是否正在发送消息
			 * @type {Bool}
			 */
			this.busy = false;

			/**
			 * 等待发送的消息队列
			 * @type {Array}
			 */
			this.queue = [];
		}

		var messager;
		var mp = Messager.prototype;

		/**
		 * 创建一条消息
		 * @param  {String}  type    [消息类型]
		 * @param  {Object}  sender  [发送消息的组件实例]
		 * @param  {String}  name    [发送的消息名称]
		 * @param  {Mix}     param   [<可选>附加消息参数]
		 * @return {Object}
		 */
		mp._create = function(type, sender, name, param) {
			return {
				// 消息类型
				'type'   : type,
				// 消息发起组件实例
				'from'   : sender,
				// 消息目标组件实例
				'to'     : null,
				// 消息被传递的次数
				'count'  : 0,
				// 消息名称
				'name'   : name,
				// 消息参数
				'param'  : param,
				// 接收消息组件的调用方法 on + 首字母大写
				'method' : 'on' + ucFirst(name),
				// 接收消息组件的返回值
				'returns': null
			}
		}

		/**
		 * 触发接收消息组件实例的处理方法
		 * @param  {Object}  receiver  [接收消息的组件实例]
		 * @param  {Mix}     msg       [消息体（内容）]
		 * @param  {Mix}     returns   [返回给发送者的数据]
		 * @return {Mix}
		 */
		mp._trigger = function(receiver, msg, returns) {
			// 接收者对该消息的接收方法
			var func = receiver[msg.method];

			// 标识消息的发送目标
			msg.to = receiver;

			// 触发接收者的消息处理方法，若未定义则默认为 onMessage
			if (util.isFunc(func)) {
				returns = func.call(receiver, msg);
				msg.count++;
			}
			else if (util.isFunc(receiver.onMessage)) {
				returns = receiver.onMessage.call(receiver, msg);
				msg.count++;
			}

			msg.returns = returns;

			return returns;
		}

		/**
		 * 通知发送者消息已被全部接收完毕
		 * @param  {Mix}       msg       [消息体（内容）]
		 * @param  {Function}  callback  [通知发送者的回调函数]
		 * @param  {Object}    context   [执行环境]
		 */
		mp._notifySender = function(msg, callback, context) {
			// callback 未定义时触发默认事件
			if (!callback) {
				callback = context.onMessageSent;
			}

			// callback 为属性值
			if (util.isString(callback)) {
				callback = context[callback];
			}

			// 合法的回调函数
			if (util.isFunc(callback)) {
				callback.call(context, msg);
			}

			// 继续发送队列中未完成的消息
			if (this.queue.length) {
				setTimeout(this._sendQueue, 0);
			}
			else {
				this.busy = false;
			}
		}

		/**
		 * 发送消息队列
		 */
		mp._sendQueue = function() {
			var request = messager.queue.shift();

			messager.busy = false;

			if (!request) {
				return false;
			}

			// 消息类型
			var type = request.shift();
			// 消息方法
			var func = messager[type];

			if (util.isFunc(func)) {
				func.apply(messager, request);
			}
		}

		/**
		 * 冒泡（由下往上）方式发送消息，由子组件实例发出，逐层父组件实例接收
		 * @param  {Object}    sender    [发送消息的子组件实例]
		 * @param  {String}    name      [发送的消息名称]
		 * @param  {Mix}       param     [<可选>附加消息参数]
		 * @param  {Function}  callback  [<可选>发送完毕的回调函数，可在回调中指定回应数据]
		 * @param  {Object}    context   [执行环境]
		 */
		mp.fire = function(sender, name, param, callback, context) {
			var type = 'fire';

			// 是否处于忙碌状态
			if (this.busy || sync.count) {
				this.queue.push([type, sender, name, param, callback, context]);
				if (sync.count) {
					sync.addQueue(this._sendQueue, this);
				}
				return;
			}

			this.busy = true;

			// 创建消息
			var msg = this._create(type, sender, name, param);
			// 消息接收者，先从自身开始接收
			var receiver = sender;
			var returns;

			while (receiver) {
				returns = this._trigger(receiver, msg);
				// 接收消息方法返回 false 则不再继续冒泡
				if (returns === false) {
					break;
				}

				msg.from = receiver;
				receiver = receiver.getParent();
			}

			this._notifySender(msg, callback, context);
		}

		/**
		 * 广播（由上往下）方式发送消息，由父组件实例发出，逐层子组件实例接收
		 */
		mp.broadcast = function(sender, name, param, callback, context) {
			var type = 'broadcast';

			// 是否处于忙碌状态
			if (this.busy || sync.count) {
				this.queue.push([type, sender, name, param, callback, context]);
				if (sync.count) {
					sync.addQueue(this._sendQueue, this);
				}
				return;
			}

			this.busy = true;

			// 创建消息
			var msg = this._create(type, sender, name, param);
			// 消息接收者集合，先从自身开始接收
			var receivers = [sender];
			var receiver, returns;

			while (receivers.length) {
				receiver = receivers.shift();
				returns = this._trigger(receiver, msg);
				// 接收消息方法返回 false 则不再继续广播
				if (returns === false) {
					break;
				}

				receivers.push.apply(receivers, receiver.getChilds(true));
			}

			this._notifySender(msg, callback, context);
		}

		/**
		 * 向指定组件实例发送消息
		 * @param  {Object}    sender    [发送消息的组件实例]
		 * @param  {String}    receiver  [接受消息的组件实例名称支持.分层级]
		 * @param  {String}    name      [发送的消息名称]
		 * @param  {Mix}       param     [<可选>附加消息参数]
		 * @param  {Function}  callback  [<可选>发送完毕的回调函数，可在回调中指定回应数据]
		 * @param  {Object}    context   [执行环境]
		 */
		mp.notify = function(sender, receiver, name, param, callback, context) {
			var type = 'notify';

			// 是否处于忙碌状态
			if (this.busy || sync.count) {
				this.queue.push([type, sender, receiver, name, param, callback, context]);
				if (sync.count) {
					sync.addQueue(this._sendQueue, this);
				}
				return;
			}

			this.busy = true;

			// 根据名称获取系统实例
			function _getInstanceByName(name) {
				var target = null;
				util.each(cache, function(instance) {
					if ((instance._ && instance._.name) === name) {
						target = instance;
						return false;
					}
				});
				return target;
			}

			// 找到 receiver，名称可能为 superName.fatherName.childName 的情况
			var ns = null, tmp, tar;
			if (util.isString(receiver)) {
				ns = receiver.split('.');

				// 有层级
				while (ns.length > 0) {
					if (!tmp) {
						tmp = _getInstanceByName(ns.shift());
						tar = ns.length === 0 ? tmp : (tmp ? tmp.getChild(ns[0]) : null);
					}
					else {
						tar = tmp.getChild(ns.shift());
					}
				}

				if (util.isObject(tar)) {
					receiver = tar;
				}
			}

			if (!util.isObject(receiver)) {
				util.error('module: \'' + receiver + '\' is not found in cache!');
				return false;
			}

			var msg = this._create(type, sender, name, param);

			this._trigger(receiver, msg);

			this._notifySender(msg, callback, context);
		}

		/**
		 * 全局广播发消息，系统全部组件实例接受
		 * @param  {String}  name   [发送的消息名称]
		 * @param  {Mix}     param  [<可选>附加消息参数]
		 */
		mp.globalCast = function(name, param) {
			var type = 'globalCast';

			// 是否处于忙碌状态
			if (this.busy || sync.count) {
				this.queue.push([type, name, param]);
				if (sync.count) {
					sync.addQueue(this._sendQueue, this);
				}
				return;
			}

			this.busy = false;

			var msg = this._create(type, 'core', name, param);

			util.each(cache, function(receiver) {
				this._trigger(receiver, msg);
			}, this);
		}

		messager = new Messager();

		return messager;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(10),
		__webpack_require__(3),
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(6),
		__webpack_require__(11)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(dom, ajax, sync, util, Module, MVVM) {

		/**
		 * Component 基础视图组件
		 */
		var Component = Module.extend({
			/**
			 * init 组件初始化方法
			 * @param  {Object}  config  [组件参数配置]
			 * @param  {Object}  parent  [父组件对象]
			 */
			init: function(config, parent) {
				this._config = this.cover(config, {
					// 组件目标容器
					'target'  : null,
					// dom 元素的标签
					'tag'     : 'div',
					// 元素的 class
					'class'   : '',
					// 元素的 css
					'css'     : null,
					// 元素的 attr
					'attr'    : null,
					// 视图布局内容
					'html'    : '',
					// 静态模板 uri
					'template': '',
					// 模板拉取请求参数
					'tplParam': null,
					// mvvm 数据模型对象
					'model'   : null,
					// 视图渲染完成后的回调函数
					'cbRender': 'viewReady'
				});

				// 通用 dom 处理方法
				this.$ = dom;
				// 组件元素
				this.el = null;
				// mvvm 实例
				this.vm = null;
				// 组件是否已经创建完成
				this._ready = false;

				// 调用渲染前函数
				if (util.isFunc(this.beforeRender)) {
					this.beforeRender();
				}

				// 拉取模板
				if (this.getConfig('template')) {
					this._loadTemplate();
				}
				else {
					this._render();
				}
			},

			/**
			 * 加载模板布局文件
			 */
			_loadTemplate: function() {
				var c = this.getConfig();
				var uri = c.template;

				// 防止消息异步或者框架外的异步创建出现问题
				sync.lock();
				ajax.load(uri, c.tplParam, function(err, data) {
					var text;

					if (err) {
						text = err.status + ': ' + uri;
						util.error(err);
					}
					else {
						text = data.result;
					}

					this.setConfig('html', text);
					this._render();
					sync.unlock();
				}, this);
			},

			/**
			 * 组件配置参数合并、覆盖
			 * @param  {Object}  child   [子类组件配置参数]
			 * @param  {Object}  parent  [父类组件配置参数]
			 * @return {Object}          [合并后的配置参数]
			 */
			cover: function(child, parent) {
				if (!util.isObject(child)) {
					child = {};
				}
				if (!util.isObject(parent)) {
					parent = {};
				}
				return util.extend(true, {}, parent, child);
			},

			/**
			 * 获取组件配置参数
			 * @param  {String}  name  [参数字段名称，支持/层级]
			 */
			getConfig: function(name) {
				return this.config(this._config, name);
			},

			/**
			 * 设置组件配置参数
			 * @param {String}  name   [配置字段名]
			 * @param {Mix}     value  [值]
			 */
			setConfig: function(name, value) {
				return this.config(this._config, name, value);
			},

			/**
			 * 设置/读取配置对象
			 * @param  {Object}  cData  [配置对象]
			 * @param  {String}  name   [配置名称, 支持/分隔层次]
			 * @param  {Mix}     value  [不传为读取配置信息, null 为删除配置, 其他为设置值]
			 * @return {Mix}            [返回读取的配置值]
			 */
			config: function(cData, name, value) {
				// 不传cData配置对象
				if (util.isString(cData) || arguments.length === 0) {
					value = name;
					name = cData;
					cData = {};
				}

				var udf, data = cData;
				var set = (value !== udf);
				var remove = (value === null);

				if (name) {
					var ns = name.split('/');
					while (ns.length > 1 && util.hasOwn(data, ns[0])) {
						data = data[ns.shift()];
					}
					if (ns.length > 1) {
						if (set) {
							return false;
						}
						if (remove)	{
							return true;
						}
						return udf;
					}
					name = ns[0];
				}
				else {
					return data;
				}

				if (set) {
					data[name] = value;
					return true;
				}
				else if (remove) {
					data[name] = null;
					delete data[name];
					return true;
				}
				else {
					return data[name];
				}
			},

			/**
			 * 渲染组件视图、初始化配置
			 */
			_render: function() {
				// 判断是否已创建过
				if (this._ready) {
					return this;
				}

				this._ready = true;

				var c = this.getConfig();

				var el = this.el = util.createElement(c.tag);

				// 添加 class
				var cls = c.class;
				if (cls && util.isString(cls)) {
					util.each(cls.split(' '), function(classname) {
						dom.addClass(el, classname);
					});
				}

				// 添加 css
				if (util.isObject(c.css)) {
					util.each(c.css, function(value, property) {
						el.style[property] = value;
					});
				}

				// 添加attr
				if (util.isObject(c.attr)) {
					util.each(c.attr, function(value, name) {
						dom.setAttr(el, name, value);
					});
				}

				// 添加页面布局
				if (c.html) {
					el.appendChild(util.stringToFragment(c.html));
				}

				// 初始化 mvvm 对象
				var model = c.model;
				if (util.isObject(model)) {
					this.vm = new MVVM(el, model, this);
				}

				// 追加到目标容器
				var target = c.target;
				if (target) {
					target.appendChild(el);
				}

				// 组件视图渲染完成回调方法
				var cb = this[c.cbRender];
				if (util.isFunc(cb)) {
					cb.call(this);
				}
			},

			/**
			 * 返回当前 dom 中第一个匹配特定选择器的元素
			 * @param  {String}     selector  [子元素选择器]
			 * @return {DOMObject}
			 */
			query: function(selector) {
				return this.el.querySelector(selector);
			},

			/**
			 * 返回当前 dom 中匹配一个特定选择器的所有的元素
			 * @param  {String}    selectors  [子元素选择器]
			 * @return {NodeList}
			 */
			queryAll: function(selectors) {
				return this.el.querySelectorAll(selectors);
			},

			/**
			 * 元素添加绑定事件
			 */
			bind: function() {
				return dom.addEvent.apply(dom, arguments);
			},

			/**
			 * 元素解除绑定事件
			 */
			unbind: function() {
				return dom.removeEvent.apply(dom, arguments);
			},

			/**
			 * 组件销毁后的回调函数
			 */
			afterDestroy: function() {
				var vm = this.vm;
				var el = this.el;
				// 销毁 mvvm 实例
				if (vm) {
					vm.destroy();
					vm = null;
				}
				// 销毁 dom 对象
				if (el) {
					el.parentNode.removeChild(el);
					el = null;
				}
			}
		});

		return Component;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * dom 操作模块
	 */
	!(module.exports = {
		/**
		 * 清空 element 的所有子节点
		 * @param   {DOMElement}  element
		 */
		empty: function(element) {
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
			return element;
		},

		/**
		 * 设置节点属性
		 * @param   {DOMElement}  node
		 * @param   {String}      name
		 * @param   {String}      value
		 */
		setAttr: function(node, name, value) {
			if (this.getAttr(node, name) !== value) {
				node.setAttribute(name, value);
			}
		},

		/**
		 * 获取节点属性值
		 * @param   {DOMElement}  node
		 * @param   {String}      name
		 * @return  {String}
		 */
		getAttr: function(node, name) {
			return node.getAttribute(name) || '';
		},

		/**
		 * 判断节点是否存在属性
		 * @param   {DOMElement}  node
		 * @param   {String}      name
		 * @return  {Boolean}
		 */
		hasAttr: function(node, name) {
			return node.hasAttribute(name);
		},

		/**
		 * 移除节点属性
		 * @param   {DOMElement}  node
		 * @param   {String}      name
		 */
		removeAttr: function(node, name) {
			node.removeAttribute(name);
		},

		/**
		 * 节点添加 classname
		 * @param  {DOMElement}  node
		 * @param  {String}      classname
		 */
		addClass: function(node, classname) {
			var current, list = node.classList;

			if (this.hasClass(node, classname)) {
				return;
			}

			if (list) {
				list.add(classname);
			}
			else {
				current = ' ' + this.getAttr(node, 'class') + ' ';
				if (current.indexOf(' ' + classname + ' ') === -1) {
					this.setAttr(node, 'class', (current + classname).trim());
				}
			}
		},

		/**
		 * 节点删除 classname
		 * @param  {DOMElement}  node
		 * @param  {String}      classname
		 */
		removeClass: function(node, classname) {
			var current, target, list = node.classList;

			if (!this.hasClass(node, classname)) {
				return;
			}

			if (list) {
				list.remove(classname);
			}
			else {
				target = ' ' + classname + ' ';
				current = ' ' + this.getAttr(node, 'class') + ' ';
				while (current.indexOf(target) !== -1) {
					current = current.replace(target, ' ');
				}
				this.setAttr(node, 'class', current.trim());
			}

			if (!node.className) {
				this.removeAttr(node, 'class');
			}
		},

		/**
		 * 节点是否存在 classname
		 * @param  {DOMElement}  node
		 * @param  {String}      classname
		 * @return {Boolean}
		 */
		hasClass: function(node, classname) {
			var current, list = node.classList;
			if (list) {
				return list.contains(classname);
			}
			else {
				current = ' ' + this.getAttr(node, 'class') + ' ';
				return current.indexOf(' ' + classname + ' ') !== -1;
			}
		},

		/**
		 * 节点事件绑定
		 * @param   {DOMElement}   node
		 * @param   {String}       evt
		 * @param   {Function}     callback
		 * @param   {Boolean}      capture
		 */
		addEvent: function(node, evt, callback, capture) {
			node.addEventListener(evt, callback, capture);
		},

		/**
		 * 解除节点事件绑定
		 * @param   {DOMElement}   node
		 * @param   {String}       evt
		 * @param   {Function}     callback
		 * @param   {Boolean}      capture
		 */
		removeEvent: function(node, evt, callback, capture) {
			node.removeEventListener(evt, callback, capture);
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 简单的数据绑定视图层库
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(2),
		__webpack_require__(12)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(util, Compiler) {

		/**
		 * MVVM 构造函数，封装 Complier
		 * @param  {DOMElement}  element  [视图的挂载原生 DOM]
		 * @param  {Object}      model    [数据模型对象]
		 * @param  {Function}    context  [事件及 watch 的回调上下文]
		 */
		function MVVM(element, model, context) {
			this.context = context;

			// 将函数 this 指向调用者
			util.each(model, function(value, key) {
				if (util.isFunc(value)) {
					model[key] = value.bind(context);
				}
			});

			// 初始数据备份
			this.backup = util.copy(model);

			// ViewModel 实例
			this.vm = new Compiler(element, model);

			// 数据模型
			this.$ = this.vm.$data;
		}

		var mvp = MVVM.prototype;

		/**
		 * 获取指定数据模型
		 * @param   {String}  key  [数据模型字段]
		 * @return  {Mix}
		 */
		mvp.get = function(key) {
			return util.isString(key) ? this.$[key] : this.$;
		}

		/**
		 * 设置数据模型的值，key 为 json 时则批量设置
		 * @param  {String}  key    [数据模型字段]
		 * @param  {Mix}     value  [值]
		 */
		mvp.set = function(key, value) {
			var vm = this.$;
			// 批量设置
			if (util.isObject(key)) {
				util.each(key, function(v, k) {
					vm[k] = v;
				});
			}
			else if (util.isString(key)) {
				vm[key] = value;
			}
		}

		/**
		 * 重置数据模型至初始状态
		 * @param   {Array|String}  key  [数据模型字段，或字段数组，空则重置所有]
		 */
		mvp.reset = function(key) {
			var vm = this.$;
			var backup = this.backup;

			// 重置单个
			if (util.isString(key)) {
				vm[key] = backup[key];
			}
			// 重置多个
			else if (util.isArray(key)) {
				util.each(key, function(v, k) {
					vm[k] = backup[k];
				});
			}
			// 重置所有
			else {
				util.each(vm, function(v, k) {
					vm[k] = backup[k];
				});
			}
		}

		/**
		 * 对数据模型的字段添加监测
		 * @param   {String}    model     [数据模型字段]
		 * @param   {Function}  callback  [触发回调，参数为 model, last, old]
		 */
		mvp.watch = function(model, callback) {
			this.vm.watcher.add({
				'dep': [model],
				'acc': [undefined]
			}, function(path, last, old) {
				callback.call(this, path, last, old);
			}, this.context);
		}

		return MVVM;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * compiler 元素编译/指令提取模块
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(10),
		__webpack_require__(2),
		__webpack_require__(15),
		__webpack_require__(16),
		// parse directive modules
		__webpack_require__(18),
		__webpack_require__(19),
		__webpack_require__(20),
		__webpack_require__(13),
		__webpack_require__(21),
		__webpack_require__(22),
		__webpack_require__(23),
		__webpack_require__(24),
		__webpack_require__(27)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(dom, util, Updater, Watcher, Von, Vel, Vif, Vfor, Vtext, Vhtml, Vshow, Vbind,  Vmodel) {

		/**
		 * 编译模块
		 * @param  {DOMElement}  element  [视图的挂载原生 DOM]
		 * @param  {Object}      model    [数据模型对象]
		 */
		function Compiler(element, model) {
			if (!this.isElementNode(element)) {
				util.error('element must be a type of DOMElement: ', element);
				return;
			}

			if (!util.isObject(model)) {
				util.error('model must be a type of Object: ', model);
				return;
			}

			// 缓存根节点
			this.$element = element;
			// 根节点转文档碎片
			this.$fragment = util.nodeToFragment(this.$element);

			// 数据模型对象
			this.$data = model;
			// DOM 注册索引
			this.$data.$els = {};
			// 子取值域索引
			this.$data.$scope = {};

			// 未编译节点缓存队列
			this.$unCompileNodes = [];
			// 根节点是否已完成编译
			this.$rootComplied = false;

			// 视图刷新模块
			this.updater = new Updater(this);
			// 数据订阅模块
			this.watcher = new Watcher(this.$data);
			// 指令解析模块
			this.von = new Von(this);
			this.vel = new Vel(this);
			this.vif = new Vif(this);
			this.vfor = new Vfor(this);
			this.vtext = new Vtext(this);
			this.vhtml = new Vhtml(this);
			this.vshow = new Vshow(this);
			this.vbind = new Vbind(this);
			this.vmodel = new Vmodel(this);

			// v-model 限制使用的表单元素
			this.$inputs = 'input|select|textarea'.split('|');

			this.init();
		}

		var cp = Compiler.prototype;

		cp.init = function() {
			this.complieElement(this.$fragment, true);
		}

		/**
		 * 编译文档碎片/节点
		 * @param   {Fragment|DOMElement}  element   [文档碎片/节点]
		 * @param   {Boolean}              root      [是否是编译根节点]
		 * @param   {Object}               fors      [vfor 数据]
		 */
		cp.complieElement = function(element, root, fors) {
			var node, childNodes = element.childNodes;

			if (root && this.hasDirective(element)) {
				this.$unCompileNodes.push([element, fors]);
			}

			for (var i = 0; i < childNodes.length; i++) {
				node = childNodes[i];

				if (this.hasDirective(node)) {
					this.$unCompileNodes.push([node, fors]);
				}

				if (node.childNodes.length && !this.isLateCompile(node)) {
					this.complieElement(node, false, fors);
				}
			}

			if (root) {
				this.compileAll();
			}
		}

		/**
		 * 节点是否含有合法指令
		 * @param   {DOMElement}  node
		 * @return  {Number}
		 */
		cp.hasDirective = function(node) {
			var result, nodeAttrs;
			var text = node.textContent;
			var reg = /(\{\{.*\}\})|(\{\{\{.*\}\}\})/;

			if (this.isElementNode(node)) {
				nodeAttrs = node.attributes;
				for (var i = 0; i < nodeAttrs.length; i++) {
					if (this.isDirective(nodeAttrs[i].name)) {
						result = true;
						break;
					}
				}
			}
			else if (this.isTextNode(node) && reg.test(text)) {
				result = true;
			}
			return result;
		}

		/**
		 * 编译节点缓存队列
		 */
		cp.compileAll = function() {
			util.each(this.$unCompileNodes, function(info) {
				this.complieDirectives(info);
				return null;
			}, this);

			this.checkCompleted();
		}

		/**
		 * 收集并编译节点指令
		 * @param   {Array}  info   [node, fors]
		 */
		cp.complieDirectives = function(info) {
			var node = info[0], fors = info[1];
			var atr, name, _vfor, attrs = [], nodeAttrs;

			if (this.isElementNode(node)) {
				// node 节点集合转为数组
				nodeAttrs = node.attributes

				for (var i = 0; i < nodeAttrs.length; i++) {
					atr = nodeAttrs[i];
					name = atr.name;
					if (this.isDirective(name)) {
						if (name === 'v-for') {
							_vfor = atr;
						}
						attrs.push(atr);
					}
				}

				// vfor 编译时标记节点的指令数
				if (_vfor) {
					util.def(node, '_vfor_directives', attrs.length);
					attrs = [_vfor];
					_vfor = null;
				}

				// 编译节点指令
				util.each(attrs, function(attr) {
					this.compile(node, attr, fors);
				}, this);
			}
			else if (this.isTextNode(node)) {
				this.compileText(node, fors);
			}
		}

		/**
		 * 编译元素节点指令
		 * @param   {DOMElement}   node
		 * @param   {Object}       attr
		 * @param   {Array}        fors
		 */
		cp.compile = function(node, attr, fors) {
			var dir = attr.name;
			var exp = attr.value;
			var args = [fors, node, exp, dir];

			// 移除指令标记
			dom.removeAttr(node, dir);

			if (!exp && dir !== 'v-else') {
				util.warn('The directive value of ' + dir + ' is empty!');
				return;
			}

			// 动态指令：v-bind:xxx
			if (dir.indexOf('v-bind') === 0) {
				this.vbind.parse.apply(this.vbind, args);
			}
			// 动态指令：v-on:xxx
			else if (dir.indexOf('v-on') === 0) {
				this.von.parse.apply(this.von, args);
			}
			// 静态指令
			else {
				switch (dir) {
					case 'v-el':
						this.vel.parse.apply(this.vel, args);
						break;
					case 'v-text':
						this.vtext.parse.apply(this.vtext, args);
						break;
					case 'v-html':
						this.vhtml.parse.apply(this.vhtml, args);
						break;
					case 'v-show':
						this.vshow.parse.apply(this.vshow, args);
						break;
					case 'v-if':
						this.vif.parse.apply(this.vif, args);
						break;
					case 'v-else':
						util.def(node, '_directive', 'v-else');
						break;
					case 'v-model':
						this.vmodel.parse.apply(this.vmodel, args);
						break;
					case 'v-for':
						this.vfor.parse.apply(this.vfor, args);
						break;
					default: util.warn(dir + ' is an unknown directive!');
				}
			}
		}

		/**
		 * 编译文本节点 {{text}} or {{{html}}}
		 * @param   {DOMElement}   node
		 * @param   {Object}       fors
		 */
		cp.compileText = function(node, fors) {
			var text = node.textContent.trim().replace(/\n/g, '');
			var exp, match, matches, formatStr, pieces, tokens = [];
			var regtext = /\{\{(.+?)\}\}/g, reghtml = /\{\{\{(.+?)\}\}\}/g;
			var isText = regtext.test(text), isHtml = reghtml.test(text);

			// html match
			if (isHtml) {
				matches = text.match(reghtml);
				match = matches[0];
				exp = match.replace(/\s\{|\{|\{|\}|\}|\}/g, '');
				if (match.length !== text.length) {
					util.warn('\'' + text + '\' compile for HTML can not have a prefix or suffix!');
					return;
				}
				this.vhtml.parse.call(this.vhtml, fors, node, exp);
			}
			// text match
			else if (isText) {
				formatStr = text.replace(regtext, function(m) {
					return '_%su' + m + '_$su';
				});
				pieces = formatStr.split(/\_\%su(.+?)\_\$su/g);

				// 文本节点转化为常量和变量的组合表达式
				// 'a {{b}} c' => '"a " + b + " c"'
				util.each(pieces, function(piece) {
					// {{text}}
					if (regtext.test(piece)) {
						tokens.push('(' + piece.replace(/\s\{|\{|\}|\}/g, '') + ')');
					}
					// 字符常量
					else if (piece) {
						tokens.push('"' + piece + '"');
					}
				});

				this.vtext.parse.call(this.vtext, fors, node, tokens.join('+'));
			}
		}

		/**
		 * 停止编译节点的剩余指令，如 vfor 的根节点
		 * @param   {DOMElement}  node
		 */
		cp.blockCompile = function(node) {
			util.each(this.$unCompileNodes, function(info) {
				if (node === info[0]) {
					return null;
				}
			});
		}

		/**
		 * 是否是元素节点
		 * @param   {DOMElement}   element
		 * @return  {Boolean}
		 */
		cp.isElementNode = function(element) {
			return element.nodeType === 1;
		}

		/**
		 * 是否是文本节点
		 * @param   {DOMElement}   element
		 * @return  {Boolean}
		 */
		cp.isTextNode = function(element) {
			return element.nodeType === 3;
		}

		/**
		 * 是否是合法指令
		 * @param   {String}   directive
		 * @return  {Boolean}
		 */
		cp.isDirective = function(directive) {
			return directive.indexOf('v-') === 0;
		}

		/**
		 * 节点的子节点是否延迟编译
		 * vif, vfor 的子节点为处理指令时单独编译
		 * @param   {DOMElement}   node
		 * @return  {Boolean}
		 */
		cp.isLateCompile = function(node) {
			return dom.hasAttr(node, 'v-if') || dom.hasAttr(node, 'v-for');
		}

		/**
		 * 检查根节点是否编译完成
		 */
		cp.checkCompleted = function() {
			if (this.$unCompileNodes.length === 0 && !this.$rootComplied) {
				this.rootCompleted();
			}
		}

		/**
		 * 根节点编译完成，更新视图
		 */
		cp.rootCompleted = function() {
			var element = this.$element;
			this.$rootComplied = true;
			dom.empty(element).appendChild(this.$fragment);
		}

		return Compiler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14),
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser, util) {

		function Vfor(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var vfor = Vfor.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-for 指令
		 * @param   {Object}      fors        [vfor 数据]
		 * @param   {DOMElement}  node        [指令节点]
		 * @param   {String}      expression  [指令表达式]
		 */
		vfor.parse = function(fors, node, expression) {
			var vm = this.vm;
			var match = expression.match(/(.*) in (.*)/);
			var alias = match[1];
			var iterator = match[2];

			var watcher = vm.watcher;
			var parent = node.parentNode;
			var isOption = node.tagName === 'OPTION' && parent.tagName === 'SELECT';

			// 取值信息
			var scope = this.getScope(fors, iterator);
			var getter = this.getEval(fors, iterator);
			var array = getter.call(scope, scope);

			// 循环数组的访问路径
			var loopAccess = iterator;
			var listArgs, template, updates;
			var key = util.getExpKey(iterator);

			// 循环层级
			var level = -1;
			// 取值域集合
			var scopes = {};
			// 取值域与数组字段映射
			var maps = {};
			// 别名集合
			var aliases = [];
			// 取值域路径集合
			var accesses = [];

			// 嵌套 vfor
			if (fors) {
				maps = fors.maps;
				level = fors.level;
				scopes = fors.scopes;
				aliases = fors.aliases.slice(0);
				accesses = fors.accesses.slice(0);
				loopAccess = fors.access + '*' + key;
			}

			if (!util.isArray(array)) {
				parent.removeChild(node);
				return;
			}

			listArgs = [node, array, 0, loopAccess, alias, aliases, accesses, scopes, maps, ++level];
			template = this.buildList.apply(this, listArgs);

			node.parentNode.replaceChild(template, node);

			if (isOption) {
				this.updateOption(parent, fors);
			}

			// 数组更新信息
			updates = {
				'alias'   : alias,
				'aliases' : aliases,
				'access'  : loopAccess,
				'accesses': accesses,
				'scopes'  : scopes,
				'level'   : level,
				'maps'    : maps
			}

			// 监测根数组的数组操作
			if (!fors) {
				watcher.watchModel(loopAccess, function(path, last, method, args) {
					this.update(parent, node, last, method, updates, args);
				}, this);
			}
			// 监测嵌套数组的操作
			else {
				watcher.watchAccess(loopAccess, function(path, last, method, args) {
					this.update(parent, node, last, method, updates, args);
				}, this);
			}
		}

		/**
		 * 更新 select/option 在 vfor 中的值
		 * @param   {Select}  select
		 * @param   {Object}  fors
		 */
		vfor.updateOption = function(select, fors) {
			var model = select._vmodel;
			var getter = this.getEval(fors, model);
			var scope = this.getScope(fors, model);
			var value = getter.call(scope, scope);
			this.vm.updater.updateSelectChecked(select, value);
		}

		/**
		 * 根据源数组构建循环板块集合
		 * @param   {DOMElement}  node      [循环模板]
		 * @param   {Array}       array     [取值数组]
		 * @param   {Number}      start     [开始的下标计数]
		 * @param   {String}      paths     [取值数组访问路径]
		 * @param   {String}      alias     [当前取值域别名]
		 * @param   {Array}       aliases   [取值域别名数组]
		 * @param   {Array}       accesses  [取值域访问路径数组]
		 * @param   {Object}      scopes    [取值域集合]
		 * @param   {Object}      maps      [数组与取值域的映射]
		 * @param   {Number}      level     [当前循环层级]
		 * @return  {Fragment}              [板块文档碎片集合]
		 */
		vfor.buildList = function(node, array, start, paths, alias, aliases, accesses, scopes, maps, level) {
			var vm = this.vm;
			var fragments = util.createFragment();

			util.each(array, function(scope, i) {
				var index = start + i;
				var field = paths.split('*').pop();
				var cloneNode = node.cloneNode(true);
				var fors, access = paths + '*' + index;

				scope.$index = index;
				scopes[alias] = scope;
				aliases[level] = alias;
				accesses[level] = access;
				maps[field] = alias;

				fors = {
					// 别名
					'alias'   : alias,
					// 别名集合
					'aliases' : aliases,
					// 取值域访问路径
					'access'  : access,
					// 取值域访问路径集合
					'accesses': accesses,
					// 取值域集合
					'scopes'  : scopes,
					// 数组取值域映射
					'maps'    : maps,
					// 当前循环层级
					'level'   : level,
					// 当前取值域下标
					'index'   : index
				}

				// 阻止重复编译除 vfor 以外的指令
				if (node._vfor_directives > 1) {
					vm.blockCompile(node);
				}

				this.signAlias(cloneNode, alias);

				// 传入 vfor 数据编译板块
				vm.complieElement(cloneNode, true, fors);

				fragments.appendChild(cloneNode);
			}, this);

			return fragments;
		}

		/**
		 * 标记节点的 vfor 别名
		 * @param   {DOMElement}  node
		 * @param   {String}      alias
		 */
		vfor.signAlias = function(node, alias) {
			util.def(node, '_vfor_alias', alias);
		}

		/**
		 * 数组操作更新 vfor 循环列表
		 * @param   {DOMElement}  parent    [父节点]
		 * @param   {DOMElement}  node      [初始模板片段]
		 * @param   {Array}       newArray  [新的数据重复列表]
		 * @param   {String}      method    [数组操作]
		 * @param   {Array}       updates   [更新信息]
		 * @param   {Array}       args      [数组操作参数]
		 */
		vfor.update = function(parent, node, newArray, method, updates, args) {
			switch (method) {
				case 'push':
					this.push.apply(this, arguments);
					break;
				case 'pop':
					this.pop.apply(this, arguments);
					break;
				case 'unshift':
					this.unshift.apply(this, arguments);
					break;
				case 'shift':
					this.shift.apply(this, arguments);
					break;
				case 'splice':
					this.splice.apply(this, arguments);
					break;
				// sort、reverse 操作或直接赋值都重新编译
				default: this.recompile.apply(this, arguments);
			}
		}

		/**
		 * 获取 shift 或 unshift 操作对应列表下标变化的关系
		 * @param   {String}  method  [数组操作]
		 * @param   {Number}  length  [新数组长度]
		 * @return  {Object}          [新数组下标的变化映射]
		 */
		vfor.getChanges = function(method, length) {
			var i, udf, map = {};

			switch (method) {
				case 'unshift':
					map[0] = udf;
					for (i = 1; i < length; i++) {
						map[i] = i - 1;
					}
					break;
				case 'shift':
					for (i = 0; i < length + 1; i++) {
						map[i] = i + 1;
					}
					map[length] = udf;
					break;
			}

			return map;
		}

		/**
		 * 在循环体的最后追加一条数据 array.push
		 */
		vfor.push = function(parent, node, newArray, method, up) {
			var last = newArray.length - 1;
			var alias = up.alias;
			var list = [newArray[last]];
			var listArgs = [node, list, last, up.access, alias, up.aliases, up.accesses, up.scopes, up.maps, up.level];
			var lastChild = this.getLast(parent, alias);
			var template = this.buildList.apply(this, listArgs);

			// empty list
			if (!lastChild) {
				parent.appendChild(template);
			}
			else {
				parent.insertBefore(template, lastChild.nextSibling);
			}
		}

		/**
		 * 移除循环体的最后一条数据 array.pop
		 */
		vfor.pop = function(parent, node, newArray, method, updates) {
			var lastChild = this.getLast(parent, updates.alias);
			if (lastChild) {
				parent.removeChild(lastChild)
			}
		}

		/**
		 * 在循环体最前面追加一条数据 array.unshift
		 */
		vfor.unshift = function(parent, node, newArray, method, up) {
			var alias = up.alias;
			var list = [newArray[0]];
			var map, template, firstChild;
			var listArgs = [node, list, 0, up.access, alias, up.aliases, up.accesses, up.scopes, up.maps, up.level];

			// 移位相关的订阅回调
			map = this.getChanges(method, newArray.length);
			this.vm.watcher.moveSubs(up.access, map);

			template = this.buildList.apply(this, listArgs);
			firstChild = this.getFirst(parent, alias);

			// 当 firstChild 为 null 时也会添加到父节点
			parent.insertBefore(template, firstChild);
		}

		/**
		 * 移除循环体的第一条数据 array.shift
		 */
		vfor.shift = function(parent, node, newArray, method, updates) {
			var map = this.getChanges(method, newArray.length);
			var firstChild = this.getFirst(parent, updates.alias);
			if (firstChild) {
				parent.removeChild(firstChild);
				// 移位相关的订阅回调
				this.vm.watcher.moveSubs(updates.access, map);
			}
		}

		/**
		 * 删除/替换循环体的指定数据 array.splice
		 */
		vfor.splice = function(parent, node, newArray, method, up, args) {
			// 从数组的哪一位开始修改内容。如果超出了数组的长度，则从数组末尾开始添加内容。
			var start = args.shift();
			// 整数，表示要移除的数组元素的个数。
			// 如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。
			// 如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
			var deleteCont = args.shift();
			// 要添加进数组的元素。如果不指定，则 splice() 只删除数组元素。
			var insertItems = args, insertLength = args.length;

			// 不删除也不添加
			if (deleteCont === 0 && !insertLength) {
				return;
			}

			var i, template, startChild, listArgs, udf;
			var map = {}, alias = up.alias, length = newArray.length;

			// 只删除 splice(2, 1);
			var deleteOnly = deleteCont && !insertLength;
			// 只插入 splice(2, 0, 'xxx')
			var insertOnly = !deleteCont && insertLength;
			// 删除并插入 splice(2, 1, 'xxx')
			var deleAndIns = deleteCont && insertLength;

			// 只删除
			if (deleteOnly) {
				for (i = 0; i < length; i++) {
					map[i] = i >= start ? i + deleteCont : i;
				}

				if (util.isEmpty(map)) {
					this.recompile.apply(this, arguments);
					return;
				}
				else {
					this.vm.watcher.moveSubs(up.access, map);
					this.removeEl(parent, alias, start, deleteCont);
				}
			}
			// 只插入 或 删除并插入
			else if (insertOnly || deleAndIns) {
				for (i = 0; i < length; i++) {
					if (insertOnly) {
						map[i] = i < start ? i : (i >= start && i < start + insertLength ? udf : i - insertLength);
					}
					else if (deleAndIns) {
						map[i] = i < start ? i : (i >= start && i < start + insertLength ? udf : i - (insertLength - deleteCont));
					}
				}

				if (util.isEmpty(map) || start === 0 && deleteCont > length) {
					this.recompile.apply(this, arguments);
					return;
				}
				else {
					this.vm.watcher.moveSubs(up.access, map);
				}

				// 先删除选项
				if (deleAndIns) {
					this.removeEl(parent, alias, start, deleteCont);
				}

				// 开始的元素
				startChild = this.getChild(parent, alias, start);
				// 编译新添加的列表
				listArgs = [node, insertItems, start, up.access, alias, up.aliases, up.accesses, up.scopes, up.maps, up.level];
				// 新增列表模板
				template = this.buildList.apply(this, listArgs);

				// 更新变化部分
				parent.insertBefore(template, startChild);
			}
		}

		/**
		 * 获取 vfor 循环体的第一个子节点
		 * @param   {DOMElement}  parent  [父节点]
		 * @param   {String}      alias   [循环体对象别名]
		 * @return  {FirstChild}
		 */
		vfor.getFirst = function(parent, alias) {
			var i, firstChild = null, child;
			var childNodes = parent.childNodes;

			for (i = 0; i < childNodes.length; i++) {
				child = childNodes[i];
				if (child._vfor_alias === alias) {
					firstChild = child;
					break;
				}
			}

			return firstChild;
		}

		/**
		 * 获取 vfor 循环体的最后一个子节点
		 * @param   {DOMElement}  parent   [父节点]
		 * @param   {String}      alias    [循环体对象别名]
		 * @return  {LastChild}
		 */
		vfor.getLast = function(parent, alias) {
			var i, lastChild = null, child;
			var childNodes = parent.childNodes;

			for (i = childNodes.length - 1; i > -1 ; i--) {
				child = childNodes[i];
				if (child._vfor_alias === alias) {
					lastChild = child;
					break;
				}
			}

			return lastChild;
		}

		/**
		 * 获取 vfor 循环体指定下标的子节点
		 * @param   {DOMElement}  parent  [父节点]
		 * @param   {String}      alias   [循环体对象别名]
		 * @param   {Number}      index   [子节点下标]
		 * @return  {DOMElement}
		 */
		vfor.getChild = function(parent, alias, index) {
			var i, e = 0, target = null, child;
			var childNodes = parent.childNodes;

			for (i = 0; i < childNodes.length; i++) {
				child = childNodes[i];
				if (child._vfor_alias === alias) {
					if (e === index) {
						target = child;
						break;
					}
					e++;
				}
			}

			return target;
		}

		/**
		 * 删除 vfor 循环体指定的数据
		 * @param   {DOMElement}  parent      [父节点]
		 * @param   {String}      alias       [循环体对象别名]
		 * @param   {Number}      start       [删除的下标起点]
		 * @param   {Number}      deleteCont  [删除个数]
		 */
		vfor.removeEl = function(parent, alias, start, deleteCont) {
			var childNodes = parent.childNodes;
			var i, e = -1, child, scapegoats = [];

			for (i = 0; i < childNodes.length; i++) {
				child = childNodes[i];
				if (child._vfor_alias === alias) {
					e++;
				}
				// 删除的范围内
				if (e >= start && e < start + deleteCont) {
					scapegoats.push(child);
				}
			}

			util.each(scapegoats, function(scapegoat) {
				parent.removeChild(scapegoat);
				return null;
			});
		}

		/**
		 * 重新编译循环体
		 */
		vfor.recompile = function(parent, node, newArray, method, up) {
			var child, scapegoat;
			var template, alias = up.alias;
			var childNodes = parent.childNodes;
			var listArgs = [node, newArray, 0, up.access, alias, up.aliases, up.accesses, up.scopes, up.maps, up.level];

			// 移除旧的监测
			this.vm.watcher.removeSubs(up.access);

			// 重新构建循环板块
			template = this.buildList.apply(this, listArgs);

			// 移除旧板块
			for (var i = 0; i < childNodes.length; i++) {
				child = childNodes[i];
				if (child._vfor_alias === alias) {
					if (!scapegoat) {
						scapegoat = child;
					}
					else {
						i--;
						parent.removeChild(child);
					}
				}
			}

			if (scapegoat) {
				parent.replaceChild(template, scapegoat);
			}
			else {
				parent.appendChild(template);
			}
		}

		return Vfor;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * parser 指令解析模块（部分正则借鉴于 vue）
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(util) {

		// 表达式中允许的关键字
		var allowKeywords = 'Math.parseInt.parseFloat.Date.this.true.false.null.undefined.Infinity.NaN.isNaN.isFinite.decodeURI.decodeURIComponent.encodeURI.encodeURIComponent';
		var regAllowKeyword = new RegExp('^(' + allowKeywords.replace(/\./g, '\\b|') + '\\b)');

		// 表达式中禁止的关键字
		var avoidKeywords = 'var.const.let.if.else.for.in.continue.switch.case.break.default.function.return.do.while.delete.try.catch.throw.finally.with.import.export.instanceof.yield.await';
		var regAviodKeyword = new RegExp('^(' + avoidKeywords.replace(/\./g, '\\b|') + '\\b)');

		// 匹配纯数字
		var regNumber = /^[0-9]*$/;
		// 匹配常量缓存序号 "1"
		var regSaveConst = /"(\d+)"/g;
		// 只含有 true 或 false
		var regBool = /^(true|false)$/;
		// 匹配循环下标别名
		var regIndex = /^\$index|\W\$\bindex\b/;
		// 匹配表达式中的常量
		var regReplaceConst = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|typeof /g;
		// 匹配表达式中的取值域
		var regReplaceScope = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g;
		// 匹配常规取值: item or item['x'] or item["y"] or item[0]
		var regNormal = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;

		/**
		 * 是否是常规指令表达式
		 * @param   {String}   expression
		 * @return  {Boolean}
		 */
		function isNormal(expression) {
			return regNormal.test(expression) && !regBool.test(expression) && expression.indexOf('Math.') !== 0;
		}

		// 保存常量，返回序号 "i"
		var consts = [];
		function saveConst(string) {
			var i = consts.length;
			consts[i] = string;
			return '"' + i + '"';
		}

		/**
		 * 返回替换之前的常量
		 * @param   {Strinf}  string
		 * @param   {Number}  i
		 * @return  {String}
		 */
		function returnConst(string, i) {
			return consts[i];
		}

		/**
		 * 返回表达式的 scope 替换
		 * @param   {String}  string
		 * @return  {String}
		 */
		function replaceScope(string) {
			var pad = string.charAt(0);
			var path = string.slice(1);

			if (regAllowKeyword.test(path)) {
				return string;
			}
			else {
				path = path.indexOf('"') !== -1 ? path.replace(regSaveConst, returnConst) : path;
				return pad + 'scope.' + path;
			}
		}

		/**
		 * 获取取值表达式的 vfor 取值域别名
		 * @param   {Object}  fors         <必选>
		 * @param   {String}  expression   <必选>
		 * @return  {String}
		 */
		function getAlias(fors, expression) {
			var alias, exp = expression.replace(/(\(.*\))/g, '');

			// $index or item in items {{item}}
			if (exp === fors.alias || regIndex.test(exp)) {
				return fors.alias;
			}

			// 在表达式中匹配 alias.xxx
			util.each(fors.aliases, function(al) {
				var reg = new RegExp('\\b' + al + '\\b|\\b'+ al +'\\.');
				if (reg.test(exp)) {
					alias = al;
					return false;
				}
			});

			return alias;
		}

		/**
		 * 生成取值路径
		 * @param   {String}  access
		 * @return  {Array}
		 */
		function makePaths(access) {
			var length, paths = access && access.split('*');

			if (!paths || paths.length < 2) {
				return [];
			}

			for (var i = paths.length - 1; i > -1; i--) {
				if (regNumber.test(paths[i])) {
					length = i + 1;
					break;
				}
			}

			return paths.slice(0, length);
		}

		/**
		 * 生成取值路径数组
		 * [items, 0, ps, 0] => [[items, 0], [items, 0, ps, 0]]
		 * @param   {Array}  paths
		 * @return  {Array}
		 */
		function makeScopePaths(paths) {
			var index = 0, scopePaths = [];

			if (paths.length % 2 === 0) {
				while (index < paths.length) {
					index += 2;
					scopePaths.push(paths.slice(0, index));
				}
			}

			return scopePaths;
		}

		/**
		 * 通过访问层级取值
		 * @param   {Object}  target
		 * @param   {Array}   paths
		 * @return  {Mix}
		 */
		function getDeepValue(target, paths) {
			var _paths = paths.slice(0);

			while (_paths.length) {
				target = target[_paths.shift()];
			}

			return target;
		}


		/**
		 * Parser 基础解析器模块，指令解析模块都继承于 Parser
		 */
		function Parser() {}
		var p = Parser.prototype;

		/**
		 * 绑定监测 & 初始化视图
		 * @param   {Object}      fors
		 * @param   {DOMElement}  node
		 * @param   {String}      expression
		 */
		p.bind = function(fors, node, expression) {
			// 提取依赖
			var deps = this.getDeps(fors, expression);
			// 取值域
			var scope = this.getScope(fors, expression);
			// 取值函数
			var getter = this.getEval(fors, expression);
			// 别名映射
			var maps = fors && util.copy(fors.maps);

			// 初始视图更新
			this.update(node, getter.call(scope, scope));

			// 监测依赖变化，更新取值 & 视图
			this.vm.watcher.watch(deps, function() {
				scope = this.updateScope(scope, maps, deps, arguments);
				this.update(node, getter.call(scope, scope));
			}, this);
		}

		/**
		 * 设置数据模型的值（用于双向数据绑定）
		 * @param  {String}  path
		 * @param  {String}  field
		 * @param  {Mix}     value
		 */
		p.setModel = function(path, field, value) {
			var paths, target;
			var model = this.vm.$data;

			if (path) {
				paths = makePaths(path);
				target = getDeepValue(model, paths);
				target[field] = value;
			}
			else {
				model[field] = value;
			}
		}

		/**
		 * 生成表达式取值函数
		 * @param   {String}    expression
		 * @return  {Function}
		 */
		p.createGetter = function(expression) {
			try {
				return new Function('scope', 'return ' + expression + ';');
			}
			catch (e) {
				util.error('Invalid generated expression: ' + expression);
			}
		}

		/**
		 * 获取表达式的取值函数
		 */
		p.getEval = function(fors, expression) {
			var exp = this.toScope(expression);

			if (regAviodKeyword.test(exp)) {
				util.warn('Avoid using unallow keyword in expression: ' + exp);
				return;
			}

			// 替换取值域别名
			if (fors) {
				util.each(fors.aliases, function(alias) {
					var reg = new RegExp('scope.' + alias, 'g');
					exp = exp.replace(reg, function(scope) {
						return 'scope.$' + scope;
					});
				});
			}

			return this.createGetter(exp);
		}

		/**
		 * 转换表达式的 scope 取值域
		 * @return  {String}
		 */
		p.toScope = function(expression) {
			var exp = expression;

			if (isNormal(exp)) {
				return 'scope.' + exp;
			}

			exp = (' ' + exp).replace(regReplaceConst, saveConst);
			exp = exp.replace(regReplaceScope, replaceScope);
			exp = exp.replace(regSaveConst, returnConst);

			return exp;
		}

		/**
		 * 获取表达式的取值域
		 * @param   {Object}  fors
		 * @param   {String}  expression
		 * @return  {Object}
		 */
		p.getScope = function(fors, expression) {
			var model = this.vm.$data;

			if (!fors) {
				return model;
			}

			model.$index = fors.index;
			model.$scope = fors.scopes;

			return model;
		}

		/**
		 * 更新取值域
		 * @param   {Object}  oldScope   [旧取值域]
		 * @param   {Object}  maps       [别名映射]
		 * @param   {Object}  deps       [取值依赖]
		 * @param   {Array}   args       [变更参数]
		 * @return  {Mix}
		 */
		p.updateScope = function(oldScope, maps, deps, args) {
			var targetPaths;
			var leng = 0, $scope = {};
			var model = this.vm.$data;
			var accesses = util.copy(deps.acc);

			// 获取最深层的依赖
			accesses.unshift(args[0]);
			util.each(accesses, function(access) {
				var paths = makePaths(access);
				if (paths.length > leng) {
					targetPaths = paths;
					leng = paths.length;
				}
			});

			// 更新 vfor 取值
			if (targetPaths) {
				util.each(makeScopePaths(targetPaths), function(paths) {
					var leng = paths.length;

					// 更新下标的情况通过变更参数来确定
					if ((args[0] === '$index')) {
						paths[leng - 1] = args[1];
					}

					var field = paths[leng - 2];
					var index = +paths[leng - 1];
					var scope = getDeepValue(model, paths) || {};

					// 支持两种 $index 取值方式
					model.$index = index;
					if (util.isObject(scope)) {
						scope.$index = index;
					}

					$scope[maps[field]] = scope;
				});

				util.extend(model, {
					'$scope': util.extend(oldScope.$scope, $scope)
				});
			}

			return model;
		}

		/**
		 * 获取表达式的所有依赖（取值模型+访问路径）
		 * @param   {Object}  fors        [vfor 数据]
		 * @param   {String}  expression
		 * @return  {Object}
		 */
		p.getDeps = function(fors, expression) {
			var deps = [], paths = [];
			var exp = ' ' + expression.replace(regReplaceConst, saveConst);

			exp.replace(regReplaceScope, function(dep) {
				var model = dep.substr(1);
				var alias, hasIndex, access, valAccess;

				// 取值域别名或 items.length -> items
				if (fors) {
					alias = getAlias(fors, dep);
					hasIndex = model.indexOf('$index') !== -1;
					// 取值域路径
					if (model.indexOf(alias) !== -1 || hasIndex) {
						access = fors.accesses[fors.aliases.indexOf(alias)];
					}
				}
				else {
					alias = util.getExpAlias(model);
				}

				// 取值字段访问路径，输出别名和下标
				if (hasIndex || model === alias) {
					valAccess = access || fors && fors.access;
				}
				else {
					if (access && model !== '$event') {
						valAccess = access + '*' + util.getExpKey(model);
					}
				}

				// 相同的依赖出现多次只需记录一次
				if (deps.indexOf(model) === -1) {
					deps.push(model);
					paths.push(valAccess);
				}
			});

			return {
				'dep': deps,
				'acc': paths
			}
		}

		return Parser;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * updater 视图刷新模块
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(10),
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(dom, util) {

		function Updater(vm) {
			this.vm = vm;
			// 事件绑定回调集合
			this.$listeners = {};
		}

		var up = Updater.prototype;

		/**
		 * 更新节点的文本内容 realize v-text
		 * @param   {DOMElement}  node
		 * @param   {String}      text
		 */
		up.updateTextContent = function(node, text) {
			node.textContent = String(text);
		}

		/**
		 * 更新节点的 html 内容 realize v-html
		 * 处理 {{{html}}} 指令时 node 为文本的父节点
		 * @param   {DOMElement}  node
		 * @param   {String}      html
		 */
		up.updateHtmlContent = function(node, html) {
			dom.empty(node).appendChild(util.stringToFragment(String(html)));
		}

		/**
		 * 更新节点的显示隐藏 realize v-show/v-else
		 * @param   {DOMElement}  node
		 * @param   {Boolean}     show    [是否显示]
		 */
		up.updateDisplay = function(node, show) {
			var siblingNode = this.getSibling(node);

			this.setVisible(node);
			this.updateStyle(node, 'display', show ? node._visible_display : 'none');

			// v-else
			if (siblingNode && (dom.hasAttr(siblingNode, 'v-else') || siblingNode._directive === 'v-else')) {
				this.setVisible(siblingNode);
				this.updateStyle(siblingNode, 'display', show ? 'none' : siblingNode._visible_display);
			}
		}

		/**
		 * 缓存节点行内样式值
		 * 行内样式 display='' 不会影响由 classname 中的定义
		 * _visible_display 用于缓存节点行内样式的 display 显示值
		 * @param  {DOMElement}  node
		 */
		up.setVisible = function(node) {
			var inlineStyle, styles, display;

			if (!node._visible_display) {
				inlineStyle = util.removeSpace(dom.getAttr(node, 'style'));

				if (inlineStyle && inlineStyle.indexOf('display') !== -1) {
					styles = inlineStyle.split(';');

					util.each(styles, function(style) {
						if (style.indexOf('display') !== -1) {
							display = util.getKeyValue(style);
						}
					});
				}

				if (display !== 'none') {
					node._visible_display = display || '';
				}
			}
		}

		/**
		 * 更新节点内容的渲染 realize v-if/v-else
		 * @param   {DOMElement}  node
		 * @param   {Boolean}     isRender  [是否渲染]
		 */
		up.updateRenderContent = function(node, isRender) {
			var siblingNode = this.getSibling(node);

			this.setRender(node);
			this.toggleRender.apply(this, arguments);

			// v-else
			if (siblingNode && (dom.hasAttr(siblingNode, 'v-else') || siblingNode._directive === 'v-else')) {
				this.setRender(siblingNode);
				this.toggleRender(siblingNode, !isRender);
			}
		}

		/**
		 * 缓存节点渲染内容并清空
		 */
		up.setRender = function(node) {
			if (!node._render_content) {
				node._render_content = node.innerHTML;
			}
			dom.empty(node);
		}

		/**
		 * 切换节点内容渲染
		 */
		up.toggleRender = function(node, isRender) {
			var fragment;
			// 渲染
			if (isRender) {
				fragment = util.stringToFragment(node._render_content);
				this.vm.complieElement(fragment, true);
				node.appendChild(fragment);
			}
		}

		/**
		 * 获取节点的下一个兄弟元素节点
		 */
		up.getSibling = function(node) {
			var el = node.nextSibling;
			var isElementNode = this.vm.isElementNode;

			if (el && isElementNode(el)) {
				return el;
			}

			while (el) {
				el = el.nextSibling;

				if (el && isElementNode(el)) {
					return el;
				}
			}

			return null;
		}

		/**
		 * 更新节点的 attribute realize v-bind
		 * @param   {DOMElement}  node
		 * @param   {String}      attribute
		 * @param   {String}      value
		 */
		up.updateAttribute = function(node, attribute, value) {
			if (value === null) {
				dom.removeAttr.apply(this, arguments);
			}
			else {
				// setAttribute 不适合用于表单元素的 value
				// https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
				if (attribute === 'value' && (this.vm.$inputs.indexOf(node.tagName.toLowerCase()) !== -1)) {
					node.value = value;
				}
				else {
					dom.setAttr(node, attribute, value);
				}
			}
		}

		/**
		 * 更新节点的 classname realize v-bind:class
		 * @param   {DOMElement}          node
		 * @param   {String|Boolean}      newclass
		 * @param   {String|Boolean}      oldclass
		 * @param   {String}              classname
		 */
		up.updateClassName = function(node, newclass, oldclass, classname) {
			// 指定 classname 变化值由 newclass 布尔值决定
			if (classname) {
				if (newclass === true) {
					dom.addClass(node, classname);
				}
				else if (newclass === false) {
					dom.removeClass(node, classname);
				}
			}
			// 未指定 classname 变化值由 newclass 的值决定
			else {
				if (newclass) {
					dom.addClass(node, newclass);
				}

				if (oldclass) {
					dom.removeClass(node, oldclass);
				}
			}
		}

		/**
		 * 更新节点的 style realize v-bind:style
		 * @param   {DOMElement}  node
		 * @param   {String}      property  [属性名称]
		 * @param   {String}      value     [样式值]
		 */
		up.updateStyle = function(node, property, value) {
			if (node.style[property] !== value) {
				node.style[property] = value;
			}
		}

		/**
		 * 更新节点绑定事件的回调函数 realize v-on
		 * @param   {DOMElement}  node
		 * @param   {String}      evt          [事件名称]
		 * @param   {Function}    func         [回调函数]
		 * @param   {Function}    oldfunc      [旧回调函数，会被移除]
		 * @param   {Array}       params       [参数]
		 * @param   {String}      identifier   [对应监测字段/路径]
		 */
		up.updateEvent = function(node, evt, func, oldfunc, params, identifier) {
			var listeners = this.$listeners;
			var modals, self, stop, prevent, capture = false;

			// 支持 4 种事件修饰符 .self .stop .prevent .capture
			if (evt.indexOf('.') !== -1) {
				modals = evt.split('.');
				evt = modals.shift();
				self = modals && modals.indexOf('self') !== -1;
				stop = modals && modals.indexOf('stop') !== -1;
				prevent = modals && modals.indexOf('prevent') !== -1;
				capture = modals && modals.indexOf('capture') !== -1;
			}

			if (oldfunc) {
				dom.removeEvent(node, evt, listeners[identifier], capture);
			}

			if (util.isFunc(func)) {
				// 缓存事件回调
				listeners[identifier] = function _listener(e) {
					var args = [];

					// 是否限定只能在当前节点触发事件
					if (self && e.target !== node) {
						return;
					}

					// 组合事件参数
					util.each(params, function(param) {
						args.push(param === '$event' ? e : param);
					});

					// 未指定参数，则原生事件对象作为唯一参数
					if (!args.length) {
						args.push(e);
					}

					func.apply(this, args);

					// 是否阻止冒泡
					if (stop) {
						e.stopPropagation();
					}
					// 是否阻止默认事件
					if (prevent) {
						e.preventDefault();
					}
				}

				dom.addEvent(node, evt, listeners[identifier], capture);
			}
			else {
				util.warn('The model: ' + identifier + '\'s value for using v-on must be a type of Function!');
			}
		}

		/**
		 * 更新 text 或 textarea 的 value realize v-model
		 * @param   {Input}  text
		 * @param   {String} value
		 */
		up.updateTextValue = function(text, value) {
			if (text.value !== value) {
				text.value = value;
			}
		}

		/**
		 * 更新 radio 的激活状态 realize v-model
		 * @param   {Input}  radio
		 * @param   {String} value
		 */
		up.updateRadioChecked = function(radio, value) {
			radio.checked = radio.value === (util.isNumber(value) ? String(value) : value);
		}

		/**
		 * 更新 checkbox 的激活状态 realize v-model
		 * @param   {Input}          checkbox
		 * @param   {Array|Boolean}  values      [激活数组或状态]
		 */
		up.updateCheckboxChecked = function(checkbox, values) {
			if (!util.isArray(values) && !util.isBool(values)) {
				util.warn('checkbox v-model value must be a type of Boolean or Array!');
				return;
			}
			checkbox.checked = util.isBool(values) ? values : (values.indexOf(checkbox.value) !== -1);
		}

		/**
		 * 更新 select 的激活状态 realize v-model
		 * @param   {Select}         select
		 * @param   {Array|String}   selected  [选中值]
		 * @param   {Boolean}        multi
		 */
		up.updateSelectChecked = function(select, selected, multi) {
			var i, option, value;
			var options = select.options, leng = options.length;
			var multiple = multi || dom.hasAttr(select, 'multiple');

			for (i = 0; i < leng; i++) {
				option = options[i];
				value = option.value;
				option.selected = multiple ? selected.indexOf(value) !== -1 : selected === value;
			}
		}

		return Updater;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * watcher 数据订阅模块
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(2),
		__webpack_require__(17)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(util, Observer) {

		function Watcher(model) {
			this.$model = model;

			// 数据模型订阅集合
			this.$modelSubs = {};

			// 访问路径订阅集合
			this.$accessSubs = {};

			// 数组下标订阅集合
			this.$indexSubs = {};

			this.observer = new Observer(model, ['$els', '$scope'], 'change', this);
		}

		var wp = Watcher.prototype;

		/**
		 * 变化触发回调
		 * @param   {String}  path
		 * @param   {Mix}     last
		 * @param   {Mix}     old
		 * @param   {Array}   args
		 */
		wp.change = function(path, last, old, args) {
			var isAccess = path.indexOf('*') !== -1;
			var subs = isAccess ? this.$accessSubs[path] : this.$modelSubs[path];
			this.trigger(subs, path, last, old, args);
		}

		/**
		 * 触发订阅的所有回调
		 * @param   {Array}   subs
		 * @param   {String}  path
		 * @param   {Mix}     last
		 * @param   {Mix}     old
		 * @param   {Array}   args
		 */
		wp.trigger = function(subs, path, last, old, args) {
			util.each(subs, function(sub) {
				sub.cb.call(sub.ct, path, last, old, args || sub.arg);
			});
		}

		/**
		 * 订阅一个依赖集合的变化回调 (顶层模型 access 为 undefined)
		 * @param   {Object}    depends
		 * @param   {Function}  callback
		 * @param   {Object}    context
		 * @param   {Array}     args
		 */
		wp.watch = function(depends, callback, context, args) {
			// 依赖的数据模型
			var depModels = depends.dep;
			// 依赖的访问路径
			var depAccess = depends.acc;

			util.each(depModels, function(model, index) {
				var access = depAccess[index];

				// 暂时只有这一个需要忽略的关键字
				if (model === '$event') {
					return;
				}

				// 下标取值
				if (model.indexOf('$index') !== -1) {
					this.watchIndex(access, callback, context, args);
					return;
				}

				// 嵌套数组/对象
				if (access) {
					this.watchAccess(access, callback, context, args);
					return;
				}

				// 顶层数据模型
				this.watchModel(util.getExpAlias(model), callback, context, args);

			}, this);
		}

		/**
		 * 订阅一个数据模型字段的变化回调
		 * @param  {String}    field
		 * @param  {Function}  callback
		 * @param  {Object}    context
		 * @param  {Array}     args
		 */
		wp.watchModel = function(field, callback, context, args) {
			if (!util.hasOwn(this.$model, field)) {
				util.warn('The field: "' + field + '" does not exist in model!');
				return;
			}

			if (field.indexOf('*') !== -1) {
				util.warn('Model key cannot contain the character "*"!');
				return;
			}

			this.addSubs(this.$modelSubs, field, callback, context, args);
		}

		/**
		 * 订阅多层访问路径变化回调
		 * @param  {String}    access
		 * @param  {Function}  callback
		 * @param  {Object}    context
		 * @param  {Array}     args
		 */
		wp.watchAccess = function(access, callback, context, args) {
			this.addSubs(this.$accessSubs, access, callback, context, args);
		}

		/**
		 * 订阅 vfor 数组下标变化回调
		 * @param  {String}    access
		 * @param  {Function}  callback
		 * @param  {Object}    context
		 * @param  {Array}     args
		 */
		wp.watchIndex = function(access, callback, context, args) {
			this.addSubs(this.$indexSubs, access, callback, context, args);
		}

		/**
		 * 缓存订阅回调
		 */
		wp.addSubs = function(subs, identifier, callback, context, args) {
			// 缓存回调函数
			if (!subs[identifier]) {
				subs[identifier] = [];
			}

			subs[identifier].push({
				'cb' : callback,
				'ct' : context,
				'arg': args
			});
		}

		/**
		 * 移除指定的访问路径/下标订阅(重新编译 vfor)
		 */
		wp.removeSubs = function(field) {
			// 下标
			util.each(this.$indexSubs, function(sub, index) {
				if (index.indexOf(field) === 0) {
					return null;
				}
			});
			// 访问路径
			util.each(this.$accessSubs, function(sub, access) {
				if (access.indexOf(field) === 0) {
					return null;
				}
			});
		}

		/**
		 * 发生数组操作时处理订阅的移位
		 * @param   {String}  field     [数组字段]
		 * @param   {String}  moveMap   [移位的映射关系]
		 */
		wp.moveSubs = function(field, moveMap, method) {
			// 数组字段标识
			var prefix = field + '*';
			// 移位下标
			this.moveIndex(prefix, moveMap);
			// 移位访问路径
			this.moveAccess(prefix, moveMap);
		}

		/**
		 * 移位下标订阅集合
		 * 移位的过程需要触发所有回调以更改每一个 $index
		 */
		wp.moveIndex = function(prefix, moveMap) {
			var dest = {};
			var subs = this.$indexSubs;
			var caches = util.copy(subs);

			// 根据结果映射 移位下标
			util.each(moveMap, function(move, index) {
				var udf;
				var nowIndex = prefix + index;
				var moveIndex = prefix + move;

				dest[nowIndex] = caches[moveIndex];

				// 被挤掉的设为 undefined
				if (move === udf) {
					subs[nowIndex] = udf;
				}
			});

			// 触发 $index 变更
			util.each(dest, function(subs, index) {
				var i = +index.substr(prefix.length);
				util.each(subs, function(sub) {
					sub.cb.call(sub.ct, '$index', i, sub.arg);
				});
			});

			// 合并移位结果
			util.extend(subs, dest);

			dest = caches = null;
		}

		/**
		 * 移位访问路径订阅集合
		 * 移位的过程不需要触发回调
		 */
		wp.moveAccess = function(prefix, moveMap) {
			var dest = {};
			var subs = this.$accessSubs;
			var caches = util.copy(subs);

			// 根据结果映射 移位访问路径
			util.each(moveMap, function(move, index) {
				var udf;
				var befores = [], afters = [];
				var nowIndex = prefix + index;
				var moveIndex = prefix + move;

				// 提取出替换前后的访问路径集合
				util.each(subs, function(sub, access) {
					if (move === udf && access.indexOf(nowIndex) === 0) {
						afters.push(udf);
						befores.push(access);
					}
					else if (access.indexOf(moveIndex) === 0) {
						afters.push(access);
						befores.push(access.replace(moveIndex, nowIndex));
					}
				});

				// 进行替换
				util.each(befores, function(before, index) {
					var after = afters[index];

					// 被挤掉的设为 undefined
					if (after === udf) {
						subs[before] = udf;
					}
					else {
						dest[before] = caches[after];
					}
				});
			});

			// 合并移位结果
			util.extend(subs, dest);

			dest = caches = null;
		}

		return Watcher;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * observer 数据变化监测模块
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(util) {

		/**
		 * @param  {Object}     object    [VM 数据模型]
		 * @param  {Array}      ignores   [忽略监测的字段]
		 * @param  {Function}   callback  [变化回调函数]
		 * @param  {Object}     context   [执行上下文]
		 * @param  {Object}     args      [<可选>回调额外参数]
		 */
		function Observer(object, ignores, callback, context, args) {
			if (util.isString(callback)) {
				callback = context[callback];
			}

			this.$args = args;
			this.$context = context;
			this.$ignores = ignores;
			this.$callback = callback;

			// 监测的对象集合，包括一级和嵌套对象
			this.$observers = [object];
			// 监测的数据副本，存储旧值
			this.$valuesMap = {'0': util.copy(object)};
			// 子对象字段，子对象的内部变更只触发顶层字段
			this.$subPaths = [];

			// 记录当前数组操作
			this.$action = 921;
			// 重写的 Array 方法
			this.$methods = 'push|pop|shift|unshift|splice|sort|reverse'.split('|');

			this.observe(object);
		}

		var op = Observer.prototype;

		/**
		 * 监测数据模型
		 * @param   {Object}  object  [监测的对象]
		 * @param   {Array}   paths   [访问路径数组]
		 */
		op.observe = function(object, paths) {
			if (util.isArray(object)) {
				this.rewriteMethods(object, paths);
			}

			util.each(object, function(value, property) {
				var copies = paths && paths.slice(0);
				if (copies) {
					copies.push(property);
				}
				else {
					copies = [property];
				}

				if (!this.isIgnore(copies)) {
					this.setCache(object, value, property).bindWatch(object, copies);
				}

			}, this);

			return this;
		}

		/**
		 * 检查 paths 是否在排除范围内
		 * @param   {Array}    paths  [访问路径数组]
		 * @return  {Boolean}
		 */
		op.isIgnore = function(paths) {
			var ret, path = paths.join('*');

			util.each(this.$ignores, function(ignore) {
				if (ignore.indexOf(path) === 0) {
					ret = true;
					return false;
				}
			}, this);

			return ret;
		}

		/**
		 * 获取指定对象的属性缓存值
		 * @param   {Object}  object    [指定对象]
		 * @param   {String}  property  [属性名称]
		 * @return  {Object}
		 */
		op.getCache = function(object, property) {
			var index = this.$observers.indexOf(object);
			var value = (index === -1) ? null : this.$valuesMap[index];
			return value ? value[property] : value;
		}

		/**
		 * 设置指定对象的属性与值的缓存映射
		 * @param  {Object}  object    [指定对象]
		 * @param  {Mix}     value     [值]
		 * @param  {String}  property  [属性名称]
		 */
		op.setCache = function(object, value, property) {
			var observers = this.$observers;
			var valuesMap = this.$valuesMap;
			var oleng = observers.length;
			var index = observers.indexOf(object);

			// 不存在，建立记录
			if (index === -1) {
				observers.push(object);
				valuesMap[oleng] = util.copy(object);
			}
			// 记录存在，重新赋值
			else {
				valuesMap[index][property] = value;
			}

			return this;
		}

		/**
		 * 拦截对象属性存取描述符（绑定监测）
		 * @param   {Object|Array}  object  [对象或数组]
		 * @param   {Array}         paths   [访问路径数组]
		 */
		op.bindWatch = function(object, paths) {
			var path = paths.join('*');
			var prop = paths[paths.length - 1];

			// 定义 object[prop] 的 getter 和 setter
			Object.defineProperty(object, prop, {
				get: (function getter() {
					return this.getCache(object, prop);
				}).bind(this),

				set: (function setter() {
					var newValue = arguments[0], pathSub;
					var oldValue = this.getCache(object, prop), oldObject;

					if (newValue !== oldValue) {
						if (util.isArray(newValue) || util.isObject(newValue)) {
							this.observe(newValue, paths);
						}

						// 获取子对象路径
						pathSub = this.getPathSub(path);
						if (pathSub) {
							oldObject = util.copy(object);
						}

						this.setCache(object, newValue, prop);

						if (this.$methods.indexOf(this.$action) === -1) {
							if (pathSub) {
								this.trigger(pathSub, object[prop], oldObject[prop]);
							}
							else {
								this.trigger(path, newValue, oldValue);
							}
						}
					}
				}).bind(this)
			});

			var value = object[prop];
			var isObject = util.isObject(value);

			// 嵌套数组或对象
			if (util.isArray(value) || isObject) {
				this.observe(value, paths);
			}

			// 缓存子对象字段
			if (isObject && this.$subPaths.indexOf(path) === -1 && !/^[0-9]*$/.test(path.split('*').pop())) {
				this.$subPaths.push(path);
			}
		}

		/**
		 * 是否是子对象路径，如果是则返回对象路径
		 * @param   {String}   path
		 * @return  {String}
		 */
		op.getPathSub = function(path) {
			var paths = this.$subPaths;
			for (var i = 0; i < paths.length; i++) {
				if (path.indexOf(paths[i]) === 0) {
					return paths[i];
				}
			}
		}

		/**
		 * 重写指定的 Array 方法
		 * @param   {Array}  array  [目标数组]
		 * @param   {Array}  paths  [访问路径数组]
		 */
		op.rewriteMethods = function(array, paths) {
			var arrayProto = util.AP;
			var arrayMethods = Object.create(arrayProto);
			var path = paths && paths.join('*');

			util.each(this.$methods, function(method) {
				var self = this, original = arrayProto[method];
				util.def(arrayMethods, method, function _redefineArrayMethod() {
					var i = arguments.length, result;
					var args = new Array(i);

					while (i--) {
						args[i] = arguments[i];
					}

					self.$action = method;

					result = original.apply(this, args);

					self.$action = 921;

					// 重新监测
					self.observe(this, paths);

					// 触发回调
					self.trigger(path, this, method, args);

					return result;
				}, true, false, true);
			}, this);

			array.__proto__ = arrayMethods;
		}

		/**
		 * 触发 object 变化回调
		 * @param   {String}       path      [变更路径]
		 * @param   {Mix}          last      [新值]
		 * @param   {Mix|String}   old       [旧值，数组操作时为操作名称]
		 * @param   {Array}        args      [数组操作时的参数]
		 */
		op.trigger = function(path, last, old, args) {
			this.$callback.apply(this.$context, [path, last, old, args || this.$args]);
		}

		return Observer;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14),
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser, util) {

		function Von(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var von = Von.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-on 指令
		 * @param   {Object}      fors        [vfor 数据]
		 * @param   {DOMElement}  node        [指令节点]
		 * @param   {String}      expression  [指令表达式]
		 * @param   {String}      directive   [指令名称]
		 */
		von.parse = function(fors, node, expression, directive) {
			var deps = this.getDeps(fors, expression);
			var dir = util.removeSpace(directive);

			// 单个事件 v-on:click
			if (dir.indexOf(':') !== -1) {
				this.parseSingle(node, expression, dir, fors, deps);
			}
			// 多个事件 v-on="{click: xxx, mouseenter: yyy, mouseleave: zzz}"
			else {
				this.parseMulti(node, expression, fors, deps);
			}
		}

		/**
		 * 解析单个 v-on:type
		 * @param   {DOMElement}  node
		 * @param   {String}      expression
		 * @param   {String}      directive
		 * @param   {Object}      fors
		 * @param   {Array}       deps
		 */
		von.parseSingle = function(node, expression, directive, fors, deps) {
			var vm = this.vm;
			// 取值域
			var scope = this.getScope(fors, expression);
			// 事件类型
			var type = util.getKeyValue(directive);
			// 事件信息
			var info = util.stringToParams(expression);
			// 事件取值字段名称
			var field = info[0];
			// 事件参数
			var params = this.evalParams(fors, info[1]);

			this.bindEvent(node, fors, scope, type, field, params, deps);

			// 监测依赖变化，绑定新回调，旧回调将被移除
			vm.watcher.watch(deps, function(path, last, old) {
				this.update(node, type, last, old, params, path);
			}, this);
		}

		/**
		 * 解析多个 v-on=eventJson
		 * @param   {DOMElement}  node
		 * @param   {String}      expression
		 * @param   {Object}      fors
		 * @param   {Array}       deps
		 */
		von.parseMulti = function(node, expression, fors, deps) {
			var vm = this.vm;
			var cache = {}, jsonDeps = [], jsonAccess = [];
			var events = util.convertJson(expression);

			util.each(events, function(fn, ev) {
				// 事件信息
				var info = util.stringToParams(fn);
				// 事件取值字段名称
				var field = info[0] || fn;
				// 事件参数
				var params = this.evalParams(fors, info[1]);
				// 访问路径
				var access = deps.acc[deps.dep.indexOf(field)];
				// 取值域
				var scope = this.getScope(fors, field);

				jsonDeps.push(field);
				jsonAccess.push(access);
				cache[access] = {
					'type'  : ev,
					'params': params,
				}

				this.bindEvent(node, fors, scope, ev, field, params, deps);
			}, this);

			// 监测依赖变化，绑定新回调，旧回调将被移除
			vm.watcher.watch({
				'dep': jsonDeps,
				'acc': jsonAccess
			}, function(path, last, old) {
				var ev = cache[path];
				this.update(node, ev.type, last, old, ev.params, path);
			}, this);
		}

		/**
		 * 绑定一个事件
		 * @param   {DOMElement}  node
		 * @param   {Object}      fors
		 * @param   {Object}      scope
		 * @param   {String}      type
		 * @param   {String}      field
		 * @param   {Array}       params
		 * @param   {Array}       deps
		 */
		von.bindEvent = function(node, fors, scope, type, field, params, deps) {
			// 取值函数
			var getter = this.getEval(fors, field);
			// 事件函数
			var func = getter.call(scope, scope);
			// 访问路径，用于解绑
			var access = deps.acc[deps.dep.indexOf(field)] || field;

			this.update(node, type, func, null, params, access);
		}

		/**
		 * 对函数参数求值
		 * @param   {Object}  fors
		 * @param   {Object}  scope
		 * @param   {Array}   params
		 * @return  {Array}
		 */
		von.evalParams = function(fors, params) {
			var _params = [];

			util.each(params, function(param) {
				var p = param, exp, getter, scope;

				if (util.isString(p) && p !== '$event') {
					exp = this.replaceScope(p);

					if (exp.indexOf('scope.') !== -1) {
						scope = this.getScope(fors, p);
						getter = this.createGetter(exp);
						p = getter.call(scope, scope);
					}
				}

				_params.push(p);
			}, this);

			return _params;
		}

		/**
		 * 更新绑定事件
		 */
		von.update = function() {
			var updater = this.vm.updater;
			updater.updateEvent.apply(updater, arguments);
		}

		return Von;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14),
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser, util) {

		function Vel(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var vel = Vel.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-el 指令 (不需要在 model 中声明)
		 * @param   {Object}      fors    [vfor 数据]
		 * @param   {DOMElement}  node    [注册节点]
		 * @param   {String}      value   [注册字段]
		 */
		vel.parse = function(fors, node, value) {
			var key, alias, scope;

			if (fors) {
				alias = util.getExpAlias(value);

				// vel 在 vfor 循环中只能在当前循环体中赋值
				if (alias !== fors.alias) {
					util.warn('when v-el use in v-for must be defined inside current loop body!');
					return;
				}

				scope = fors.scopes[alias];

				if (util.isObject(scope)) {
					key = util.getExpKey(value);
					scope[key] = node;
				}
			}
			else {
				this.vm.$data.$els[value] = node;
			}
		}

		return Vel;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser) {

		function Vif(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var vif = Vif.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-if 指令
		 * @param   {Object}      fors        [vfor 数据]
		 * @param   {DOMElement}  node        [指令节点]
		 * @param   {String}      expression  [指令表达式]
		 */
		vif.parse = function() {
			this.bind.apply(this, arguments);
		}

		/**
		 * 更新视图
		 * @param   {DOMElement}   node
		 * @param   {Boolean}      isRender
		 */
		vif.update = function() {
			var updater = this.vm.updater;
			updater.updateRenderContent.apply(updater, arguments);
		}

		return Vif;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser) {

		function Vtext(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var vtext = Vtext.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-text, {{text}} 指令
		 * @param   {Object}      fors        [vfor 数据]
		 * @param   {DOMElement}  node        [指令节点]
		 * @param   {String}      expression  [指令表达式]
		 */
		vtext.parse = function() {
			this.bind.apply(this, arguments);
		}

		/**
		 * 更新视图
		 * @param   {DOMElement}  node
		 * @param   {String}      text
		 */
		vtext.update = function() {
			var updater = this.vm.updater;
			updater.updateTextContent.apply(updater, arguments);
		}

		return Vtext;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser) {

		function Vhtml(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var vhtml = Vhtml.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-html, {{{html}}} 指令
		 * @param   {Object}      fors        [vfor 数据]
		 * @param   {DOMElement}  node        [指令节点]
		 * @param   {String}      expression  [指令表达式]
		 */
		vhtml.parse = function(fors, node, expression) {
			this.bind.apply(this, [fors, (this.vm.isTextNode(node) ? node.parentNode : node), expression]);
		}

		/**
		 * 更新视图
		 * @param   {DOMElement}  node
		 * @param   {String}      html
		 */
		vhtml.update = function() {
			var updater = this.vm.updater;
			updater.updateHtmlContent.apply(updater, arguments);
		}

		return Vhtml;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser) {

		function Vshow(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var vshow = Vshow.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-show 指令
		 * @param   {Object}      fors        [vfor 数据]
		 * @param   {DOMElement}  node        [指令节点]
		 * @param   {String}      expression  [指令表达式]
		 */
		vshow.parse = function() {
			this.bind.apply(this, arguments);
		}

		/**
		 * 更新视图
		 * @param   {DOMElement}   node
		 * @param   {Boolean}      isShow
		 */
		vshow.update = function() {
			var updater = this.vm.updater;
			updater.updateDisplay.apply(updater, arguments);
		}

		return Vshow;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14),
		__webpack_require__(2),
		__webpack_require__(25),
		__webpack_require__(26)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser, util, VClass, VStyle) {

		function Vbind(vm) {
			this.vm = vm;
			this.vclass = new VClass(vm);
			this.vstyle = new VStyle(vm);
			Parser.call(this);
		}
		var vbind = Vbind.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-bind 指令
		 * @param   {Object}      fors        [vfor 数据]
		 * @param   {DOMElement}  node        [指令节点]
		 * @param   {String}      expression  [指令表达式]
		 * @param   {String}      directive   [指令名称]
		 */
		vbind.parse = function(fors, node, expression, directive) {
			var parseType;
			var vclass = this.vclass;
			var vstyle = this.vstyle;

			// 单个 attribute
			if (directive.indexOf(':') !== -1) {
				// 属性类型
				parseType = util.getKeyValue(directive);

				switch (parseType) {
					case 'class':
						vclass.parse.apply(vclass, arguments);
						break;
					case 'style':
						vstyle.parse.apply(vstyle, arguments);
						break;
					default:
						this.parseAttr(fors, node, expression, parseType);
				}
			}
			// 多个 attributes 的 Json 表达式
			else {
				this.parseJson.apply(this, arguments);
			}
		}

		/**
		 * 解析 v-bind="{aa: bb, cc: dd}"
		 * @param   {Object}      fors
		 * @param   {DOMElement}  node
		 * @param   {String}      jsonString
		 */
		vbind.parseJson = function(fors, node, jsonString) {
			// 提取依赖
			var deps = this.getDeps(fors, jsonString);
			// 取值域
			var scope = this.getScope(fors, jsonString);
			// 取值函数
			var getter = this.getEval(fors, jsonString);
			// 求值
			var jsonValue = getter.call(scope, scope);
			// 别名映射
			var maps = fors && util.copy(fors.maps);

			this.updateJson(node, jsonValue);

			// 监测依赖变化
			this.vm.watcher.watch(deps, function(path, last, old) {
				scope = this.updateScope(scope, maps, deps, arguments);

				// 移除旧值
				// @TODO: 这里会将所有的属性删除然后再添加
				// 想个 diff 算法提取 oldJson 和 newJson 的差异
				this.updateJson(node, jsonValue, true);

				jsonValue = getter.call(scope, scope);
				this.updateJson(node, jsonValue);
			}, this);
		}

		/**
		 * 绑定 Json 定义的 attribute
		 * @param   {DOMElement}  node
		 * @param   {Json}        json
		 * @param   {Boolean}     remove
		 */
		vbind.updateJson = function(node, jsonAttrs, remove) {
			var vclass = this.vclass;
			var vstyle = this.vstyle;

			util.each(jsonAttrs, function(value, type) {
				switch (type) {
					case 'class':
						vclass.updateClass(node, value, remove);
						break;
					case 'style':
						vstyle.updateStyle(node, value, remove);
						break;
					default:
						this.update(node, type, value);
				}
			}, this);
		}

		/**
		 * 解析节点单个 attribute
		 * @param   {Object}       fors
		 * @param   {DOMElement}   node
		 * @param   {String}       expression
		 * @param   {String}       attr
		 */
		vbind.parseAttr = function(fors, node, expression, attr) {
			// 提取依赖
			var deps = this.getDeps(fors, expression);
			// 取值域
			var scope = this.getScope(fors, expression);
			// 取值函数
			var getter = this.getEval(fors, expression);
			// 别名映射
			var maps = fors && util.copy(fors.maps);

			this.update(node, attr, getter.call(scope, scope));

			// 监测依赖变化
			this.vm.watcher.watch(deps, function() {
				scope = this.updateScope(scope, maps, deps, arguments);
				this.update(node, attr, getter.call(scope, scope));
			}, this);
		}

		/**
		 * 更新节点 attribute
		 * @param   {DOMElement}   node
		 * @param   {String}       name
		 * @param   {String}       value
		 */
		vbind.update = function() {
			var updater = this.vm.updater;
			updater.updateAttribute.apply(updater, arguments);
		}

		return Vbind;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14),
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser, util) {

		function VClass(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var vclass = VClass.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-bind-class
		 * @param   {Object}      fors        [vfor 数据]
		 * @param   {DOMElement}  node        [指令节点]
		 * @param   {String}      expression  [指令表达式]
		 */
		vclass.parse = function(fors, node, expression) {
			// 提取依赖
			var deps = this.getDeps(fors, expression);
			// 取值域
			var scope = this.getScope(fors, expression);
			// 取值函数
			var getter = this.getEval(fors, expression);
			// 别名映射
			var maps = fors && util.copy(fors.maps);

			var value = getter.call(scope, scope);

			this.updateClass(node, value);

			// 监测依赖
			this.vm.watcher.watch(deps, function(path, last, old) {
				scope = this.updateScope(scope, maps, deps, arguments);

				if (util.isArray(value)) {
					value = [old];
				}
				// 移除旧 class
				this.updateClass(node, value, true);

				// 更新当前值
				value = getter.call(scope, scope);

				// 添加新 class
				this.updateClass(node, value);
			}, this);
		}

		/**
		 * 绑定 classname
		 * @param   {DOMElement}           node
		 * @param   {String|Array|Object}  classValue
		 * @param   {Boolean}              remove
		 */
		vclass.updateClass = function(node, classValue, remove) {
			// single class
			if (util.isString(classValue)) {
				this.update(node, (remove ? null : classValue), (remove ? classValue : null));
			}
			// [classA, classB]
			else if (util.isArray(classValue)) {
				util.each(classValue, function(cls) {
					this.update(node, (remove ? null : cls), (remove ? cls : null));
				}, this);
			}
			// classObject
			else if (util.isObject(classValue)) {
				util.each(classValue, function(isAdd, cls) {
					this.update(node, (remove ? false : isAdd), false, cls);
				}, this);
			}
		}

		/**
		 * 更新节点的 classname
		 * @param   {DOMElement}          node
		 * @param   {String|Boolean}      newcls
		 * @param   {String|Boolean}      oldcls
		 * @param   {String}              classname
		 */
		vclass.update = function() {
			var updater = this.vm.updater;
			updater.updateClassName.apply(updater, arguments);
		}

		return VClass;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14),
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser, util) {

		function VStyle(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var vstyle = VStyle.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-bind-style
		 * @param   {Object}      fors        [vfor 数据]
		 * @param   {DOMElement}  node        [指令节点]
		 * @param   {String}      expression  [指令表达式]
		 */
		vstyle.parse = function(fors, node, expression) {
			// 提取依赖
			var deps = this.getDeps(fors, expression);
			// 取值域
			var scope = this.getScope(fors, expression);
			// 取值函数
			var getter = this.getEval(fors, expression);
			// 别名映射
			var maps = fors && util.copy(fors.maps);
			// 取值对象
			var styleObject = getter.call(scope, scope);

			this.updateStyle(node, styleObject);

			// 监测依赖变化
			this.vm.watcher.watch(deps, function(path, last, old) {
				// 替换整个 styleObject
				if (util.isObject(old)) {
					// 移除旧样式(设为 null)
					util.each(old, function(v, style) {
						old[style] = null;
					});
					this.updateStyle(node, util.extend(last, old));
				}
				else {
					scope = this.updateScope(scope, maps, deps, arguments);
					this.updateStyle(node, getter.call(scope, scope));
				}
			}, this);
		}

		/**
		 * 绑定 styleObject
		 * @param   {DOMElement}  node
		 * @param   {Object}      styleObject
		 * @param   {Boolean}     remove        [是否全部移除]
		 */
		vstyle.updateStyle = function(node, styleObject, remove) {
			if (!util.isObject(styleObject)) {
				util.warn('v-bind for style must be a type of Object!', styleObject);
				return;
			}

			util.each(styleObject, function(value, style) {
				this.update(node, style, (remove ? null : value));
			}, this);
		}

		/**
		 * 更新节点 style
		 * @param   {DOMElement}   node
		 * @param   {String}       style
		 * @param   {String}       value
		 */
		vstyle.update = function() {
			var updater = this.vm.updater;
			updater.updateStyle.apply(updater, arguments);
		}

		return VStyle;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(14),
		__webpack_require__(10),
		__webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Parser, dom, util) {

		function Vmodel(vm) {
			this.vm = vm;
			Parser.call(this);
		}
		var vmodel = Vmodel.prototype = Object.create(Parser.prototype);

		/**
		 * 解析 v-model 指令
		 * @param   {Object}      fors    [vfor 数据]
		 * @param   {DOMElement}  node    [指令节点]
		 * @param   {String}      field   [双向绑定的字段]
		 */
		vmodel.parse = function(fors, node, field) {
			var vm = this.vm;
			var inputs = vm.$inputs;
			var tagName = node.tagName.toLowerCase();
			var type = tagName === 'input' ? dom.getAttr(node, 'type') : tagName;

			if (inputs.indexOf(tagName) === -1) {
				util.warn('v-model only for using in ' + inputs.join(', '));
				return;
			}

			util.def(node, '_vmodel', field);

			var deps = this.getDeps(fors, field);
			var scope = this.getScope(fors, field);
			var getter = this.getEval(fors, field);

			// v-model 只支持静态指令
			var path = deps.acc[0] || deps.dep[0];
			var value = getter.call(scope, scope);
			var bind = util.getExpKey(field) || field;
			var args = [node, value, deps, path, bind];

			// 根据不同表单类型绑定数据监测方法
			switch (type) {
				case 'text'    :
				case 'textarea': this.parseText.apply(this, args); break;
				case 'radio'   : this.parseRadio.apply(this, args); break;
				case 'checkbox': this.parseCheckbox.apply(this, args); break;
				case 'select'  : this.parseSelect.apply(this, args); break;
			}
		}

		/**
		 * v-model for text, textarea
		 */
		vmodel.parseText = function(node, value, deps, path, field) {
			var vm = this.vm;
			var updater = vm.updater;

			// 更新视图
			updater.updateTextValue(node, value);

			// 订阅依赖监听
			vm.watcher.watch(deps, function(path, last) {
				updater.updateTextValue(node, last);
			}, this);

			// 绑定事件
			this.bindTextEvent(node, path, field);
		}

		/**
		 * text, textarea 绑定数据监测
		 * @param   {Input}    node
		 * @param   {String}   path
		 * @param   {String}   field
		 */
		vmodel.bindTextEvent = function(node, path, field) {
			var composeLock, self = this;

			// 解决中文输入时 input 事件在未选择词组时的触发问题
			// https://developer.mozilla.org/zh-CN/docs/Web/Events/compositionstart
			dom.addEvent(node, 'compositionstart', function() {
				composeLock = true;
			});
			dom.addEvent(node, 'compositionend', function() {
				composeLock = false;
			});

			// input 事件(实时触发)
			dom.addEvent(node, 'input', function() {
				if (!composeLock) {
					self.setModel(path, field, this.value);
				}
			});

			// change 事件(失去焦点触发)
			dom.addEvent(node, 'change', function() {
				self.setModel(path, field, this.value);
			});
		}

		/**
		 * v-model for radio
		 */
		vmodel.parseRadio = function(node, value, deps, path, field) {
			var vm = this.vm;
			var updater = vm.updater;

			// 更新视图
			updater.updateRadioChecked(node, value);

			// 订阅依赖监听
			vm.watcher.watch(deps, function(path, last) {
				updater.updateRadioChecked(node, last);
			}, this);

			// 绑定事件
			this.bindRadioEvent(node, path, field);
		}

		/**
		 * radio 绑定数据监测
		 * @param   {Input}    node
		 * @param   {String}   path
		 * @param   {String}   field
		 */
		vmodel.bindRadioEvent = function(node, path, field) {
			var self = this;

			dom.addEvent(node, 'change', function() {
				self.setModel(path, field, this.value);
			});
		}

		/**
		 * v-model for checkbox
		 */
		vmodel.parseCheckbox = function(node, value, deps, path, field) {
			var vm = this.vm;
			var updater = vm.updater;

			// 更新视图
			updater.updateCheckboxChecked(node, value);

			// 订阅依赖监听
			vm.watcher.watch(deps, function(path, last) {
				updater.updateCheckboxChecked(node, last);
			}, this);

			// 绑定事件
			this.bindCheckboxEvent(node, path, field, value);
		}

		/**
		 * checkbox 绑定数据监测
		 * @param   {Input}           node
		 * @param   {String}          path
		 * @param   {String}          field
		 * @param   {Array|Boolean}   value
		 */
		vmodel.bindCheckboxEvent = function(node, path, field, value) {
			var self = this;

			dom.addEvent(node, 'change', function() {
				var index, checked = this.checked, val = this.value;

				if (util.isBool(value)) {
					self.setModel(path, field, checked);
				}
				else if (util.isArray(value)) {
					index = value.indexOf(val);
					// hook
					if (checked) {
						if (index === -1) {
							value.push(val);
						}
					}
					// unhook
					else {
						if (index !== -1) {
							value.splice(index, 1);
						}
					}
				}
			});
		}

		/**
		 * v-model for select
		 */
		vmodel.parseSelect = function(node, value, deps, path, field) {
			var updater = this.vm.updater;
			var options = node.options;
			var multi = dom.hasAttr(node, 'multiple');
			var option, i, leng = options.length, selects = [], isDefined;

			// 数据模型定义为单选
			if (util.isString(value)) {
				if (multi) {
					util.warn('<select> cannot be multiple when the model set \'' + field + '\' as not Array!');
					return;
				}
				isDefined = Boolean(value);
			}
			// 数据模型定义为多选
			else if (util.isArray(value)) {
				if (!multi) {
					util.warn('the model \'' + field + '\' cannot set as Array when <select> has no multiple propperty!');
					return;
				}
				isDefined = value.length > 0;
			}
			else {
				util.warn('the model ' + field + ' use in <select> must be a type of String or Array!');
				return;
			}

			// 数据模型中定义初始的选中状态
			if (isDefined) {
				updater.updateSelectChecked(node, value, multi);
			}
			// 模板中定义初始状态
			else {
				// 获取选中状态
				for (i = 0; i < leng; i++) {
					option = options[i];
					if (option.selected) {
						selects.push(option.value);
					}
				}
				this.setModel(path, field, multi ? selects : selects[0]);
			}

			// 订阅依赖监测
			this.vm.watcher.watch(deps, function(path, last) {
				updater.updateSelectChecked(node, last, multi);
			});

			// 绑定事件
			this.bindSelectEvent(node, path, field, multi);
		}

		/**
		 * select 绑定数据监测
		 * @param   {Input}     node
		 * @param   {String}    path
		 * @param   {String}    field
		 * @param   {Boolean}   multi
		 */
		vmodel.bindSelectEvent = function(node, path, field, multi) {
			var self = this;
			dom.addEvent(node, 'change', function() {
				var selects = self.getSelected(this);
				self.setModel(path, field, multi ? selects : selects[0]);
			});
		}

		/**
		 * 获取 select 的选中值
		 * @param   {Select}  select
		 * @return  {Array}
		 */
		vmodel.getSelected = function(select) {
			var options = select.options;
			var i, option, leng = options.length, sels = [];

			for (i = 0; i < leng; i++) {
				option = options[i];
				if (option.selected) {
					sels.push(option.value);
				}
			}

			return sels;
		}

		return Vmodel;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ])
});
;