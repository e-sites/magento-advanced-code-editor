(function (tinyMCEPopup) {

	'use strict';

	define(['../var/textarea'], function (textarea) {
		return {

			/**
			 * Resizes the editor
			 */
			resize: function () {
				var vp = tinyMCEPopup.dom.getViewPort(window);

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
				tinyMCEPopup.editor.setContent(this.getValue(), {source_view: true});
				tinyMCEPopup.close();
				return false;
			}
		}
	});

}(tinyMCEPopup));