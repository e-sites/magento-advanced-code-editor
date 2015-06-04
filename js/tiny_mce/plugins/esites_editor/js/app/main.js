/**
 * Main module that incorporates basic editor stuff
 *
 * @author Boye Oomens <boye@e-sites.nl>
 */

/*global requirejs, define, tinymce, tinyMCEPopup */
(function (document, tinyMCEPopup) {

	'use strict';

	/**
	 * Reserved for the CodeMirror instance
	 *
	 * @type {Object}
	 */
	var cm = null;

	define([
		'../app/var/textarea',
		'../app/var/addons',
		'../app/var/cmOptions',
		'../app/var/plugin',
		'../app/var/deps',
		'../app/module/popup',
		'../app/module/util',
		'../app/module/editor',
		'codemirror/lib/codemirror',
		'codemirror/mode/htmlmixed/htmlmixed',
		'css!codemirror/addon/fold/foldgutter.css',
		'css!codemirror/addon/search/matchesonscrollbar.css',
		'css!codemirror/addon/dialog/dialog.css',
		'css!codemirror/addon/hint/show-hint.css'
	], function (textarea, addons, cmOptions, plugin, deps, popup, util, editor, CodeMirror) {

		// Expose to global scope (needed for the formatting util)
		window.CodeMirror = CodeMirror;

		/**
		 * Preps the editor by handling the proper value
		 *
		 * @private
		 */
		function _prepareEditor() {
			/*jshint camelcase:false */
			textarea.value = tinyMCEPopup.editor.getContent({source_view : true});

			// Set custom font-size if it differs from the default value
			if ( plugin.settings.fontSize !== '12' ) {
				util.addCSS('.CodeMirror {font-size: ' + plugin.settings.fontSize + 'px}');
			}

			// Resizes the dialog to the inner size of the window.
			// This is needed since various browsers have different border sizes on windows.
			tinyMCEPopup.resizeToInnerSize();
			popup.resize();

			// Load custom theme
			if ( plugin.settings.theme !== 'default' ) {
				requirejs(['css!codemirror/theme/' + plugin.settings.theme + '.css']);
			}

			// Determine what addons to load
			tinymce.each(plugin.settings, function (value, setting) {
				if ( addons.hasOwnProperty(setting) && !!value ) {
					deps = deps.concat(addons[setting].deps);
					cmOptions = tinymce.extend(cmOptions, addons[setting].options);
				}
			});

			// Load all dependencies and initialize CodeMirror
			requirejs(deps, _initCodeMirror);
		}

		/**
		 * Initializes CodeMirror and some related actions
		 *
		 * @private
		 */
		function _initCodeMirror() {
			cm = CodeMirror.fromTextArea(textarea, cmOptions);
			cm.setSize(null, tinyMCEPopup.dom.getViewPort(window).h - 65);

			// Auto-format code
			if ( plugin.settings.autoFormat ) {
				editor.formatCode(cm);
			}

			// Load Emmet separately (if necessary)
			if ( plugin.settings.emmet ) {
				requirejs(['emmet/emmet'], function (emmetCodeMirror) {
					emmetCodeMirror(cm);
				});
			}

			// Handle a few basic editor interactions
			tinymce.DOM.bind(window, 'resize', popup.resize);
			tinymce.DOM.bind(util.getElem('form-editor'), 'submit', util.proxy(popup.save, cm));
			tinymce.DOM.bind(util.getElem('cancel'), 'click', popup.close);

			cm.focus();
		}

		_prepareEditor();
	});

})(document, tinyMCEPopup);