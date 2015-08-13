/**
 * Module that holds tailor made editor logic
 *
 * @see http://codemirror.net/
 */

/* global define, requirejs, tinymce */
define([
	'codemirror/lib/codemirror',
	'../var/plugin',
	'../var/textarea',
	'../var/deps',
	'./dialog',
	'./standalone'
], function (CodeMirror, plugin, textarea, deps, dialog, standalone) {

	'use strict';

	/**
	 * Local namespace
	 *
	 * @type {Object}
	 */
	var editor = {};

	/**
	 * CodeMirror instance
	 *
	 * @type {Object}
	 */
	editor.cm = null;

	/**
	 * Options reference
	 *
	 * @type {Object}
	 */
	editor.options = null;

	/**
	 * Main init method that initiates CodeMirror
	 */
	editor.init = function () {
		editor.cm = CodeMirror.fromTextArea(textarea, editor.options);

		// Prepare popup dialog
		if ( dialog ) {
			dialog.prepare(editor);
		}

		// Load Emmet separately (if necessary)
		if ( plugin.settings.emmet ) {
			editor.initEmmet(editor.cm);
		}

		// Handle template logic when dealing with standalone mode
		if ( editor.isStandAlone() ) {
			standalone.init(editor);
		}

		editor.cm.focus();
	};

	/**
	 * Syncs the code with the corresponding textarea element
	 *
	 * @param  {Object} cm CodeMirror instance
	 */
	editor.syncValue = function (cm) {
		cm.getTextArea().value = cm.getValue();
	};

	/**
	 * Initializes Emmet for the given CodeMirror instance
	 *
	 * @param  {Object} cm CodeMirror instance
	 */
	editor.initEmmet = function (cm) {
		requirejs(['emmet/emmet'], function (emmetCodeMirror) {
			emmetCodeMirror(cm);
		});
	};

	/**
	 * Whether we are dealing with a standalone CodeMirror instance
	 * e.g. in case of the Transactional Emails
	 *
	 * @return {Boolean}
	 */
	editor.isStandAlone = function () {
		return tinymce.inArray(plugin.settings.sections, 'wysiwygtemplate_text')  !== -1;
	};

	/**
	 * Handles variable insertation in Transactional Email section
	 *
	 * @param  {Object} obj button
	 * @param  {Object} cm  CodeMirror instance
	 */
	editor.insertVariable = function (obj, cm) {
		var attr = obj.getAttribute('onclick'),
			val = attr.match(/{{(.*?)[\|\|.*?]?}}/)[0],
			doc = cm.getDoc(),
			cursor = doc.getCursor();

		doc.replaceRange(val, cursor);
	};

	return editor;
});