/**
 * Handles all standalone logic
 * This module still needs some work/refactoring
 *
 * @see https://craig.is/riding/gators
 */

/* global define */
define([
	'codemirror/lib/codemirror',
	'gator',
	'./code',
	'./util',
	'../var/plugin'
], function (CodeMirror, Gator, code, util, plugin) {

	'use strict';

	var cmStyles,
		cssCode,
		timer = null,
		stylesEditor = util.getElem('template_styles');

	/**
	 * Monitors changes and sets the corresponding value
	 *
	 * @private
	 */
	function _monitorChanges() {
		/* jshint validthis: true */
		var textarea = this.getTextArea();

		if ( textarea.value !== '' ) {
			this.setValue(code.format('html', textarea.value));

			if ( stylesEditor ) {
				cssCode = stylesEditor.value;

				// Auto-format code
				if ( plugin.settings.autoFormat ) {
					cssCode = code.format('css', stylesEditor.value);
				}

				cmStyles.setValue(cssCode);
			}

			clearInterval(timer);
		}
	}

	/**
	 * Create a separate CodeMirror instance for the template styles
	 *
	 * @private
	 */
	function _createCssEditor(editor) {
		if ( stylesEditor ) {
			cmStyles = CodeMirror.fromTextArea(stylesEditor, util.extend(editor.options, {mode: 'css'}));
			cmStyles.on('blur', editor.syncValue);

			if ( plugin.settings.emmet ) {
				editor.initEmmet(cmStyles);
			}
		}
	}

	/**
	 * Main init method that handles all necessary events
	 *
	 * @param  {Object} ed editor
	 * @private
	 */
	function _init(cm, editor) {
		// Create local reference
		var cm = cm;

		// Handle preview template functionality by syncing values when
		// the editor looses it's focus.
		cm.on('blur', editor.syncValue);

		// Create instance for template styles
		_createCssEditor(editor);

		// Variable insertation and template loading
		Gator(document)
			.on('click', '#variables-chooser_content a', function () {
				editor.insertVariable(this, cm);
			})
			.on('click', '#email_template_load_form button', function () {
				if ( stylesEditor ) {
					stylesEditor.value = '';
				}

				util.forEach(editor.instances, function (el) {
					el.getTextArea().value = '';
				});

				timer = setInterval(util.proxy(_monitorChanges, cm), 250);
			});
	}

	return {
		init: _init
	};
});