/**
 * All code related logic such as formatting and auto completion
 *
 * @see https://github.com/beautify-web/js-beautify
 * @see http://jsbeautifier.org/
 */

/* global define */
define([
	'codemirror/lib/codemirror',
	'beautify/beautify',
	'beautify/beautify-html',
	'beautify/beautify-css',
	'../var/plugin'
], function (CodeMirror, jsBeautify, htmlBeautify, cssBeautify, plugin) {

	'use strict';

	var code = {

		/**
		 * Small wrapper around the html/css beautifier
		 *
		 * @param  {String} source
		 * @return {String}
		 */
		format: function (type, source) {
			/*jshint camelcase:false */
			var beautifier = (type === 'html' ? htmlBeautify : cssBeautify);

			return beautifier[type + '_beautify'](source, {
				indent_size: plugin.settings.indentUnit,
				wrap_line_length: plugin.settings.lineLength || 100
			});
		},

		/**
		 * Shows box with all hints
		 *
		 * @param  {Object}   cm   CodeMirror instance
		 * @param  {Function} pred callback
		 * @return {Object}
		 */
		completeAfter: function (cm, pred) {
			if ( !pred || pred() ) {
				setTimeout(function () {
					if ( !cm.state.completionActive ) {
						cm.showHint({
							completeSingle: false
						});
					}
				}, 100);
			}

			return CodeMirror.Pass;
		},

		/**
		 * Handles tag completion
		 *
		 * @param  {Object} cm CodeMirror instance
		 * @return {String}
		 */
		completeIfAfterLt: function (cm) {
			return code.completeAfter(cm, function () {
				var cur = cm.getCursor();
				return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) === '<';
			});
		},

		/**
		 * Handles attribute completion
		 *
		 * @param  {Object} cm CodeMirror instance
		 * @return {String}
		 */
		completeIfInTag: function (cm) {
			return code.completeAfter(cm, function () {
				var inner,
					tok = cm.getTokenAt(cm.getCursor());

				if (tok.type === 'string' && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length === 1)) {
					return false;
				}

				inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;

				return inner.tagName;
			});
		}
	};

	return code;
});