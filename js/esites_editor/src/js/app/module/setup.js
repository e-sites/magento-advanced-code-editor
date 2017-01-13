/**
 * Creates the setup by handling all editor settings
 * Leverages RequireJS CSS loader plugin to load the additional stylesheets
 *
 * @see https://github.com/guybedford/require-css
 */

/*global define, requirejs*/
define([
	'../var/plugin',
	'../var/tinymcePopup',
	'../var/targets',
	'./util',
	'./code',
	'css!codemirror/addon/fold/foldgutter.css',
	'css!codemirror/addon/search/matchesonscrollbar.css',
	'css!codemirror/addon/dialog/dialog.css',
	'css!codemirror/addon/hint/show-hint.css'
], function (plugin, tinyMCEPopup, targets, util, code) {

	'use strict';

	/**
	 * Applies the custom theme by loading the corresponding stylesheet
	 *
	 * @private
	 */
	function _applyTheme() {
		if ( plugin.settings.theme !== 'default' ) {
			requirejs(['css!codemirror/theme/' + plugin.settings.theme + '.css']);
		}
	}

	/**
	 * Sets custom font-size if it differs from the default value
	 *
	 * @private
	 */
	function _setFontSize() {
		if ( plugin.settings.fontSize !== '12' ) {
			util.addCSS('.CodeMirror {font-size: ' + plugin.settings.fontSize + 'px}');
		}
	}

	/**
	 * Handles the editor initial source
	 *
	 * @private
	 */
	function _setEditorValue(textarea) {
		/*jshint camelcase:false */
		var source = tinyMCEPopup ? tinyMCEPopup.editor.getContent({source_view : true}) : textarea.value;

		// Auto-format code
		if ( plugin.settings.autoFormat ) {
			source = code.format('html', source);
		}

		// Hide WYSIWYG buttons
		if ( plugin.settings.selectors.length ) {
			util.addCSS('.CodeMirror ~ .btn-wysiwyg {display: none}');
		}

		textarea.value = source;
	}

	return {
		init: function () {
			util.forEach(targets, _setEditorValue);
			_applyTheme();
			_setFontSize();
		}
	};
});