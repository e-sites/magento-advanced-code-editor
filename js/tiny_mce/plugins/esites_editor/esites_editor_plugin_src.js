/**
 * Magento Advanced HTML Editor
 * This is the TinyMCE plugin of the Magento extension that incorporates the CodeMirror library
 *
 * @author  : Boye Oomens <boye@e-sites.nl>
 * @version : 0.1.0
 * @license : OSL 3.0
 * @see     : http://codemirror.net/
 * @see     : http://emmet.io/
 */

/*global tinymce, wysiwygpage_content */
(function () {

	'use strict';

	var pluginName = 'esites_editor',
		/*jshint camelcase:false */
		plugins = wysiwygpage_content.config.plugins,
		each = tinymce.each,
		tiny;

	tinymce.PluginManager.requireLangPack(pluginName);

	tinymce.create('tinymce.plugins.EsitesEditorPlugin', {

		/**
		 * Default plugin configuration
		 *
		 * @type {Object}
		 */
		defaults: {
			emmet: false,
			theme: 'default',
			codeFolding: false
		},

		/**
		 * Plugin settings
		 * Will be populated with the Magento config values
		 *
		 * @type {Object}
		 */
		settings: {},

		/**
		 * Main init method that kickstarts all plugin logic
		 *
		 * @param  {Object} ed  editor instance
		 * @param  {String} url plugin url
		 */
		init: function (ed, url) {
			tiny = this;
			tiny.editor = ed;
			tiny.url = url;

			// Loop through the available plugins in `wysiwygpage_content`
			// to extract and extend the config options from the Magento back-end
			// It feels a bit hacky, I am not sure if there is better way to do this...
			each(plugins, function (el) {
				if ( el.name === pluginName ) {
					tiny.settings = tinymce.extend(tiny.defaults, el.config);
				}
			});

			// Finally, register the command and add the button
			tiny.editor.addCommand('mceEsitesEditor', tiny.showSourceEditor);
			tiny.editor.addButton(pluginName, {
				image: tiny.url + '/img/icon-esites-editor.png',
				title: pluginName + '.editor_button',
				cmd: 'mceEsitesEditor'
			});
		},

		/**
		 * Calls TinyMCE's windowManager to actually open the editor
		 */
		showSourceEditor: function () {
			tiny.editor.windowManager.open({
				width: tiny.editor.getParam('code_dialog_width', 900),
				height: tiny.editor.getParam('code_dialog_height', 600),
				inline: true,
				maximizable: true,
				file: tiny.url + '/esites_editor.html'
			}, {
				plugin_url : tiny.url
			});
		}
	});

	// Register plugin
	tinymce.PluginManager.add('esites_editor', tinymce.plugins.EsitesEditorPlugin);
}());