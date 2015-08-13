/**
 * Small helper / utility methods that are used throughout all modules
 */

/* global define */
define(function () {

	'use strict';

	/**
	 * Small collection of helper utilities
	 *
	 * @type {Object}
	 */
	var util = {

		/**
		 * Small wrapper around `document.getElementById`
		 *
		 * @param  {String} id
		 * @return {Object}
		 */
		getElem: function (id) {
			return document.getElementById(id);
		},

		/**
		 * Adds the given CSS to the `<head>`
		 *
		 * @param {String} css
		 */
		addCSS: function (css) {
			var head = document.getElementsByTagName('head')[0],
				s = document.createElement('style');

			if ( s.styleSheet ) {
				s.styleSheet.cssText = css;
			} else {
				s.appendChild(document.createTextNode(css));
			}

			head.appendChild(s);
		},

		/**
		 * Whether the given object is a function
		 *
		 * @param  {Mixed}   obj
		 * @return {Boolean}
		 */
		isFunction: function (obj) {
			return 'function' === typeof obj;
		},

		/**
		 * Bind a function to a context
		 * Courtesy of jQuery
		 *
		 * @param  {Function} fn
		 * @param  {Object}   context
		 * @return {Function}
		 */
		proxy: function (fn, context) {
			var slice = [].slice,
				tmp, args, proxy;

			if ( typeof context === 'string' ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !util.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call(arguments, 2);

			proxy = function () {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};

			return proxy;
		}
	};

	return util;
});