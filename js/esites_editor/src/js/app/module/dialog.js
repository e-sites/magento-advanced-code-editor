/**
 * Holds TinyMCE popup related logic
 *
 * @see http://www.tinymce.com/wiki.php/API3:class.tinyMCEPopup
 */

/*global define, tinymce*/
define([
	'../var/tinymcePopup',
	'../var/targets',
	'./util'
], function (tinyMCEPopup, targets, util) {

	'use strict';

	/**
	 * Dialog namespace
	 *
	 * @type {Object}
	 */
	var dialog = {

		/**
		 * Prepares the popup dialog by setting the proper height and
		 * handling all necessary events. It also sets the local `editor`
		 * reference so it can be used in other methods.
		 */
		prepare: function (editor) {
			editor.setSize(null, tinyMCEPopup.dom.getViewPort(window).h - 65);
			dialog.setEvents(editor);
		},

		/**
		 * Handles basic editor interactions such resize, update and cancel
		 */
		setEvents: function (editor) {
			tinymce.DOM.bind(window, 'resize', dialog.resize);
			tinymce.DOM.bind(util.getElem('form-editor'), 'submit', util.proxy(dialog.save, editor));
			tinymce.DOM.bind(util.getElem('cancel'), 'click', dialog.close);
		},

		/**
		 * Resizes the editor as well as the textarea element
		 */
		resize: function () {
			var vp = tinyMCEPopup.dom.getViewPort(window);

			tinyMCEPopup.resizeToInnerSize();

			if ( targets ) {
				util.forEach(targets, function (textarea) {
					textarea.style.height = (vp.h - 65) + 'px';
				});
			}
		},

		/**
		 * Closes the popup
		 *
		 * @return {Boolean}
		 */
		close: function () {
			tinyMCEPopup.close();
			return false;
		},

		/**
		 * Saves the actual content
		 *
		 * @return {Boolean}
		 */
		save: function () {
			/*jshint camelcase:false */
			tinyMCEPopup.editor.setContent(this.getValue(), {source_view: true});
			tinyMCEPopup.close();
			return false;
		}
	};

	return tinyMCEPopup ? dialog : null;
});