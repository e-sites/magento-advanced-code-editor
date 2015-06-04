define(['./plugin'], function (plugin) {
	return {
		mode: 'text/html',
		lineNumbers: true,
		indentUnit: plugin.settings.indentUnit,
		theme: plugin.settings.theme,
		showCursorWhenSelecting: true
	};
});