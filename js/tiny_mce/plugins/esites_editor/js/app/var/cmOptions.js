/**
 * Default CodeMirror setup
 */

/* global define */
define([
	'./plugin',
	'./tinymcePopup',
	'../../codemirror/lib/codemirror',
	'../../codemirror/addon/mode/multiplex'
], function (plugin, tinyMCEPopup, CodeMirror) {

	'use strict';

	// In case of email templates we apply a different mode
	// This way we can process the {{template}} syntax as well
	CodeMirror.defineMode('htmlhandlebars', function (config) {
		return CodeMirror.multiplexingMode(
			CodeMirror.getMode(config, 'text/html'),{
				open: '{{',
				close: '}}',
				mode: CodeMirror.getMode(config, 'handlebars'),
				parseDelimiters: true
			});
	});

	return {
		mode: (tinyMCEPopup ? 'htmlmixed' : 'htmlhandlebars'),
		lineNumbers: true,
		indentUnit: plugin.settings.indentUnit,
		theme: plugin.settings.theme,
		showCursorWhenSelecting: true
	};
});