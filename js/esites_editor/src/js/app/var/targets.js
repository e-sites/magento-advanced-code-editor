/**
 * Returns the textarea elements that are used as source for the CodeMirror instance.
 */

/* global define */
define([
	'../module/util',
	'./plugin'
], function (util, plugin) {
	'use strict';

	var targets = [
		'#htmlSource', // WYSIWYG source editor
		'#template_text' // Transactional Emails
	];

	if ( util.isArray(plugin.settings.selectors) ) {
		targets = targets.concat(plugin.settings.selectors);
	}

	return document.querySelectorAll(targets.join());
});