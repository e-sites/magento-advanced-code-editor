/**
 * Main entrypoint that kickstarts the editor
 *
 * @author Boye Oomens <boye@e-sites.nl>
 */

/*global define, tinymce, requirejs */
(function () {

	'use strict';

	define([
		'../app/var/plugin',
		'../app/var/addons',
		'../app/var/deps',
		'../app/var/cmOptions',
		'../app/module/editor',
		'../app/module/dialog',
		'../app/module/setup',
		'codemirror/lib/codemirror',
		'codemirror/mode/htmlmixed/htmlmixed'
	], function (plugin, addons, deps, options, editor, dialog, setup, CodeMirror) {

		// Expose CodeMirror to global scope
		// Which is needed for the Emmet plugin
		window.CodeMirror = CodeMirror;

		// Resizes the dialog to the inner size of the window.
		// This is needed since various browsers have different border sizes on windows.
		if ( dialog ) {
			dialog.resize();
		}

		// Set editor source and apply appearance preferences
		setup.init();

		// Determine what addons to load
		tinymce.each(plugin.settings, function (value, setting) {
			if ( addons.hasOwnProperty(setting) && !!value ) {
				deps = deps.concat(addons[setting].deps);
				editor.options = tinymce.extend(options, addons[setting].options);
			}
		});

		// Load all dependencies and initialize CodeMirror
		requirejs(deps, editor.init);
	});

})();