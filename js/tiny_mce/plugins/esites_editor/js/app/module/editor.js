define([
	'codemirror/lib/codemirror'
], function (CodeMirror) {
	var ed = {
		completeAfter: function (cm, pred) {
			var cur = cm.getCursor();

			if (!pred || pred()) setTimeout(function () {
				if (!cm.state.completionActive)
					cm.showHint({
						completeSingle: false
					});
			}, 100);

			return CodeMirror.Pass;
		},

		completeIfAfterLt: function (cm) {
			return ed.completeAfter(cm, function () {
				var cur = cm.getCursor();
				return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) == "<";
			});
		},

		completeIfInTag: function (cm) {
			return ed.completeAfter(cm, function () {
				var tok = cm.getTokenAt(cm.getCursor());
				if (tok.type == "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1)) return false;
				var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
				return inner.tagName;
			});
		}
	};

	return ed;
});