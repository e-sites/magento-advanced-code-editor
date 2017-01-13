/**
 * Returns plugin object including all settings
 * Also, it formats the selected sections to an array
 */

/*global define, esites_editor*/
define([
	'./tinymcePopup'
], function (tinyMCEPopup) {
	/*jshint camelcase:false */

	'use strict';

	return tinyMCEPopup ? tinyMCEPopup.editor.plugins.esites_editor : esites_editor;
});