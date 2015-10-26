define(["../var/plugin","../var/tinymcePopup","../var/targets","./util","./code","css!codemirror/addon/fold/foldgutter.css","css!codemirror/addon/search/matchesonscrollbar.css","css!codemirror/addon/dialog/dialog.css","css!codemirror/addon/hint/show-hint.css"],function(plugin,tinyMCEPopup,targets,util,code){"use strict";function _applyTheme(){"default"!==plugin.settings.theme&&requirejs(["css!codemirror/theme/"+plugin.settings.theme+".css"])}function _setFontSize(){"12"!==plugin.settings.fontSize&&util.addCSS(".CodeMirror {font-size: "+plugin.settings.fontSize+"px}")}function _setEditorValue(textarea){var source=tinyMCEPopup?tinyMCEPopup.editor.getContent({source_view:!0}):textarea.value;plugin.settings.autoFormat&&(source=code.format("html",source));plugin.settings.selectors.length&&util.addCSS(".CodeMirror ~ .btn-wysiwyg {display: none}");textarea.value=source}return{init:function(){util.forEach(targets,_setEditorValue);_applyTheme();_setFontSize()}}});