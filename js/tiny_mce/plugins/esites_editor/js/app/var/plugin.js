/**
 * Returns plugin object including all settings
 * Also, it formats the selected sections to an array
 */

/* global define, esites_editor, tinymce */
define([
	'./tinymcePopup'
], function (tinyMCEPopup) {
	/*jshint camelcase:false */

	'use strict';

	var p = tinyMCEPopup,
		plugin = p ? p.editor.plugins.esites_editor : esites_editor,
		sections = plugin.settings.sections;

	if ( sections.indexOf(',') !== -1 ) {
		 plugin.settings.sections = sections.split(',');
	}

	if ( Object.prototype.toString.call(plugin.settings.sections) !== '[object Array]' ) {
		plugin.settings.sections = [plugin.settings.sections];
	}

	return plugin;
});