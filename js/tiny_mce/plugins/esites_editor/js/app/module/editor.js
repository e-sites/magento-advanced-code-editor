define([
	'codemirror/lib/codemirror'
], function (CodeMirror) {
	return {

		/**
		 * Returns the selected range of the give editor instance
		 *
		 * @param  {Object} editor CodeMirror instance
		 * @return {Object}
		 */
		getSelectedRange: function (editor) {
			return {
				from: editor.getCursor(true),
				to: editor.getCursor(false)
			};
		},

		/**
		 * Handles all logic that's needed for code formatting
		 *
		 * @param {Object} editor CodeMirror instance
		 */
		formatCode: function (editor) {
			var range, off,
				charWidth = editor.defaultCharWidth();
				basePadding = 4;

			CodeMirror.commands['selectAll'](editor);

			range = this.getSelectedRange(editor);

			editor.autoFormatRange(range.from, range.to);
			editor.scrollTo(0,0);
			editor.setCursor(0);

			editor.on('renderLine', function (editor, line, elt) {
				off = CodeMirror.countColumn(line.text, null, editor.getOption('tabSize')) * charWidth;
				elt.style.textIndent = '-' + off + 'px';
				elt.style.paddingLeft = (basePadding + off) + 'px';
			});

			editor.refresh();
		}
	}
});