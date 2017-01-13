/**
 * Main entrypoint that kickstarts the editor
 *
 * @author Boye Oomens <boye@e-sites.nl>
 */

/*global define, requirejs*/
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
		'../app/module/util',
		'codemirror/lib/codemirror',
		'codemirror/mode/htmlmixed/htmlmixed'
	], function (plugin, addons, deps, options, editor, dialog, setup, util, CodeMirror) {
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
		util.forEach(plugin.settings, function (value, setting) {
			if ( addons.hasOwnProperty(setting) && !!value ) {
				deps = deps.concat(addons[setting].deps);

				// Handle gutters slightly different
				// They need to be merged as one array
				if ( addons[setting].options && addons[setting].options.hasOwnProperty('gutters') ) {
					options.gutters = options.gutters.concat(addons[setting].options.gutters.slice(0));
					delete addons[setting].options.gutters;
				}

				editor.options = util.extend(options, addons[setting].options);
			}
		});

		editor.options.gutters = options.gutters;

		// Load all dependencies and initialize CodeMirror
		requirejs(deps, editor.init);
	});

})();