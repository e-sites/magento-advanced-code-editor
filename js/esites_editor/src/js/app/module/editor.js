/**
 * Module that holds tailor made editor logic
 *
 * @see http://codemirror.net/
 */

/* global define, requirejs */
define([
	'codemirror/lib/codemirror',
	'../var/plugin',
	'../var/targets',
	'../var/deps',
	'./dialog',
	'./util',
	'./standalone'
], function (CodeMirror, plugin, targets, deps, dialog, util, standalone) {

	'use strict';

	/**
	 * Local namespace
	 *
	 * @type {Object}
	 */
	var editor = {};

	/**
	 * CodeMirror instances
	 *
	 * @type {Array}
	 */
	editor.instances = [];

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
		util.forEach(targets, editor.createInstance);

		if ( editor.instances.length ) {
			editor.instances[0].focus();
		}
	};

	/**
	 * Creates a CodeMirror instance per textarea element
	 *
	 * @param  {HTMLElement} textarea
	 */
	editor.createInstance = function (textarea) {
		var cm = CodeMirror.fromTextArea(textarea, editor.options);

		// Prepare popup dialog
		if ( dialog ) {
			dialog.prepare(cm);
		}

		// Load Emmet separately (if necessary)
		if ( plugin.settings.emmet ) {
			editor.initEmmet();
		}

		// Handle template logic when dealing with standalone mode
		if ( editor.isStandAlone() ) {
			standalone.init(cm, editor);
		}

		plugin.instances.push(cm);
		editor.instances.push(cm);
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
		requirejs(['emmet'], function (emmetCodeMirror) {
			if ( cm ) {
				emmetCodeMirror(cm);
			} else {
				util.forEach(editor.instances, function (c) {
					emmetCodeMirror(c);
				});
			}
		});
	};

	/**
	 * Whether we are dealing with a standalone CodeMirror instance
	 * e.g. in case of the Transactional Emails
	 *
	 * @return {Boolean}
	 */
	editor.isStandAlone = function () {
		return util.inArray('wysiwygtemplate_text', plugin.settings.sections) !== -1;
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