require.config({
	'paths': {
		'sugar' : '../dist/sugar.min'
	}
});

define([
	'sugar',
	'./boot',
	'./loading',
	'./header',
	'./aside',
	'./md-sugar',
	'./footer',
], function(sugar, Boot, Loading, Header, Aside, SugarMarkdown, Footer) {

	var Main = Boot.extend({
		init: function(config) {
			config = this.cover(config, {
				'target'  : document.querySelector('body')
			});
			this.Super('init', arguments);
		},

		viewReady: function() {
			// loading
			this.create('loading', Loading, {
				'target': this.el
			});

			// 头部
			this.create('header', Header, {
				'target': document.querySelector('header')
			});

			// 侧边栏
			this.create('aside', Aside, {
				'target': document.querySelector('aside')
			});

			// Sugar markdown 模块
			this.create('markdown', SugarMarkdown, {
				'target': document.querySelector('article')
			});

			// 页脚
			this.create('footer', Footer, {
				'target': document.querySelector('footer')
			});
		}
	});

	sugar.core.create('main', Main);
});