define([
	'../parser',
	'../../util',
	'./vbind-class',
	'./vbind-style'
], function(Parser, util, VClass, VStyle) {

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
});