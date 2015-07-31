define(['./plugin'], function (plugin) {
	return {
		mode: 'htmlmixed',
		lineNumbers: true,
		indentUnit: plugin.settings.indentUnit,
		theme: plugin.settings.theme,
		showCursorWhenSelecting: true
	};
});