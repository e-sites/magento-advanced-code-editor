/**
 * Holds TinyMCE popup related logic
 *
 * @see http://www.tinymce.com/wiki.php/API3:class.tinyMCEPopup
 */

/* global define, tinymce */
define([
	'../var/tinymcePopup',
	'../var/textarea',
	'./util'
], function (tinyMCEPopup, textarea, util) {

	'use strict';

	/**
	 * Local editor reference
	 *
	 * @type {Object}
	 */
	var editor = null;

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
		prepare: function (ed) {
			editor = ed;
			editor.cm.setSize(null, tinyMCEPopup.dom.getViewPort(window).h - 65);
			dialog.setEvents();
		},

		/**
		 * Handles basic editor interactions such resize, update and cancel
		 */
		setEvents: function () {
			tinymce.DOM.bind(window, 'resize', dialog.resize);
			tinymce.DOM.bind(util.getElem('form-editor'), 'submit', util.proxy(dialog.save, editor.cm));
			tinymce.DOM.bind(util.getElem('cancel'), 'click', dialog.close);
		},

		/**
		 * Resizes the editor as well as the textarea element
		 */
		resize: function () {
			var vp = tinyMCEPopup.dom.getViewPort(window);

			tinyMCEPopup.resizeToInnerSize();

			if ( textarea ) {
				textarea.style.height = (vp.h - 65) + 'px';
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