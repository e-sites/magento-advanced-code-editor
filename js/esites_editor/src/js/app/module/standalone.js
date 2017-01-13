/**
 * Handles all standalone logic
 * This module still needs some work/refactoring
 *
 * @see https://craig.is/riding/gators
 */

/*global define, Ajax*/
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
	 * Starts with a clean sheet by emptying all editor textareas
	 * Needed when inserting a template
	 *
	 * @private
	 */
	function _emptyTextAreas(editor) {
		if ( stylesEditor ) {
			stylesEditor.value = '';
		}

		util.forEach(editor.instances, function (el) {
			el.getTextArea().value = '';
		});
	}

	/**
	 * Main init method that handles all necessary events
	 *
	 * @param  {Object} ed editor
	 * @private
	 */
	function _init(cm, editor) {
		// Create local reference
		var cm = cm,
			cursor;

		// Handle preview template functionality by syncing values when
		// the editor looses it's focus.
		cm.on('blur', editor.syncValue);
		cm.on('change', editor.syncValue);

		// Create instance for template styles
		_createCssEditor(editor);

		// Listen for completed Ajax requests to see if we need to insert any snippets
		if ( typeof Ajax !== 'undefined' ) {
			Ajax.Responders.register({
				onComplete: function () {
					var args = arguments,
						url;

					if (args.length > 1) {
						url = args[1].request.url;

						if (url.indexOf('onInsert') > -1 || url.indexOf('buildWidget') > -1) {
							editor.insertSnippet(args[1].responseText, cm, cursor);
						}
					}
				}
			});
		}

		// Event delegation
		// Used for logic related to inserting templates, variables, images, widgets etc
		Gator(document)
			.on('click', '#variables-chooser_content a', function () {
				editor.insertVariable(this, cm);
			})
			.on('mousedown', '.magento_close', function () {
				clearInterval(timer);
			})
			.on('click', '#email_template_load_form button', function () {
				_emptyTextAreas(editor);
				timer = setInterval(util.proxy(_monitorChanges, cm), 250);
			})
			.on('click', '.add-image, .add-widget', function () {
				cursor = cm.getCursor();
			});
	}

	return {
		init: _init
	};
});