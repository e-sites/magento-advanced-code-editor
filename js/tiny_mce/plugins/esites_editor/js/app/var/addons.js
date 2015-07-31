define(['./plugin', '../module/editor'], function (plugin, editor) {
	return {
		'activeLine': {
			deps: [
				'codemirror/addon/selection/active-line'
			],
			options: {
				styleActiveLine: true
			}
		},
		'codeFolding': {
			deps: [
				'codemirror/addon/fold/foldcode',
				'codemirror/addon/fold/foldgutter',
				'codemirror/addon/fold/xml-fold'
			],
			options: {
				foldGutter: true,
				gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
			}
		},
		'completion': {
			deps: [
				'codemirror/addon/hint/show-hint',
  				'codemirror/addon/hint/xml-hint',
  				'codemirror/addon/hint/html-hint'
			],
			options: {
				extraKeys: {
					"'<'": editor.completeAfter,
					"'/'": editor.completeIfAfterLt,
					"' '": editor.completeIfInTag,
					"Ctrl-Space": 'autocomplete'
				}
			}
		},
		'keymap': {
			deps: [
				(plugin.settings.keymap !== 'default' ? 'codemirror/keymap/' + plugin.settings.keymap : '')
			],
			options: {
				keyMap: plugin.settings.keymap
			}
		},
		'lineWrapping': {
			deps: [
				'codemirror/addon/wrap/hardwrap'
			],
			options: {
				lineWrapping: true
			}
		},
		'matchHighlight': {
			deps: [
				'codemirror/addon/search/searchcursor',
				'codemirror/addon/search/match-highlighter'
			],
			options: {
				highlightSelectionMatches: {
					showToken: /\w/
				}
			}
		},
		'matchTags': {
			deps: [
				'codemirror/addon/edit/matchtags'
			],
			options: {
				matchTags: {
					bothTags: true
				}
			}
		},
		'closeTags': {
			deps: [
				'codemirror/addon/edit/closetag'
			],
			options: {
				autoCloseTags: true
			}
		},
		'search': {
			deps: [
				'codemirror/addon/dialog/dialog',
				'codemirror/addon/search/searchcursor',
				'codemirror/addon/search/search',
				'codemirror/addon/scroll/annotatescrollbar',
				'codemirror/addon/search/matchesonscrollbar'
			]
		}
	};
});