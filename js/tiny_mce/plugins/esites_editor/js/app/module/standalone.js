/**
 * Handles all standalone logic
 * This module still needs some work/refactoring
 *
 * @see https://craig.is/riding/gators
 */

/* global define, tinymce */
define([
	'codemirror/lib/codemirror',
	'gator',
	'./code',
	'./util',
	'../var/plugin',
	'../var/textarea'
], function (CodeMirror, Gator, code, util, plugin, textarea) {

	'use strict';

	var cmStyles,
		cssCode,
		timer = null,
		editor = null,
		stylesEditor = util.getElem('template_styles');

	/**
	 * Monitors changes and sets the corresponding value
	 *
	 * @private
	 */
	function _monitorChanges() {
		if ( textarea.value !== '' ) {
			editor.cm.setValue(textarea.value);

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
	function _createCssEditor() {
		if ( stylesEditor ) {
			cmStyles = CodeMirror.fromTextArea(stylesEditor, tinymce.extend(editor.options, {mode: 'css'}));
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
	function _init(ed) {
		// Create local reference
		editor = ed;

		// Handle preview template functionality by syncing values when
		// the editor looses it's focus.
		editor.cm.on('blur', editor.syncValue);

		// Create instance for template styles
		_createCssEditor();

		// Variable insertation and template loading
		Gator(document)
			.on('click', '#variables-chooser_content a', function () {
				editor.insertVariable(this, editor.cm);
			})
			.on('click', '#email_template_load_form button', function () {
				textarea.value = '';
				stylesEditor.value = '';
				timer = setInterval(_monitorChanges, 250);
			});
	}

	return {
		init: _init
	};
});