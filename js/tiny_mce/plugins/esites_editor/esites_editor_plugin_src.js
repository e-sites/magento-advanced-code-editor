/**
 * Magento Advanced HTML Editor
 * This is the TinyMCE plugin of the Magento extension that incorporates the CodeMirror library
 *
 * @author  : Boye Oomens <boye@e-sites.nl>
 * @version : 0.4.0
 * @license : OSL 3.0
 * @see     : https://github.com/e-sites/magento-advanced-html-editor
 * @see     : http://codemirror.net/
 * @see     : http://emmet.io/
 */

/*global tinymce */
(function () {

	'use strict';

	var section, tiny,
		pluginName = 'esites_editor',
		each = tinymce.each,
		sections = [
			'wysiwygtext',
			'wysiwygpage_content',
			'wysiwygblock_content',
			'wysiwygtemplate_text',
			'wysiwygdescription_editor',
			'wysiwygshort_description_editor',
			'wysiwyggroup_4description_editor'
		],
		allowedSections,
		plugin = {};

	// Determine which section is currently active
	each(sections, function (s) {
		if ( window[s] ) {
			section = window[s];
			section.name = s;
		}
	});

	// Fail silently when we're dealing with an unknown section
	if ( !section ) {
		return;
	}

	// Loop through the available plugins to extract and extend
	// the config options from the Magento back-end. It feels a bit hacky,
	// I am not sure if there is better way to do this...
	each(section.config.plugins, function (el) {
		if ( el.name === pluginName ) {
			plugin.config = el.config;
			allowedSections = plugin.config.sections;

			// Filter product editors first, these are concatenated with |
			// e.g. wysiwygdescription_editor|wysiwygshort_description_editor
			if ( allowedSections.indexOf('|') !== -1 ) {
				 allowedSections = allowedSections.split('|').join(',');
			}

			if ( allowedSections.indexOf(',') !== -1 ) {
				 allowedSections = allowedSections.split(',');
			}

			if ( Object.prototype.toString.call(allowedSections) !== '[object Array]' ) {
				allowedSections = [allowedSections];
			}
		}
	});

	// Final check on the allowed sections
	if ( tinymce.inArray(allowedSections, section.name) < 0 ) {
		return;
	}

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

			tiny.settings = tinymce.extend(tiny.defaults, plugin.config);

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
	tinymce.PluginManager.add(pluginName, tinymce.plugins.EsitesEditorPlugin);
}());