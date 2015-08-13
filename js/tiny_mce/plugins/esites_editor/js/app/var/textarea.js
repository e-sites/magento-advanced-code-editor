/**
 * Returns the textarea element that is used as source for the
 * CodeMirror instance. In case #htmlSource doesn't exists we're
 * dealing with a Transaction Email.
 */

/* global define */
define([
	'../module/util'
], function (util) {
	'use strict';
	return util.getElem('htmlSource') || util.getElem('template_text');
});