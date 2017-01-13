/**
 * Small helper / utility methods that are used throughout all modules
 */

/*global define*/
define(function (undef) {

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
		 * inArray helper (courtesy of jQuery core)
		 *
		 * @param  {String} elem element
		 * @param  {Array}  arr  array
		 * @param  {Number} i    index
		 * @return {Number} index
		 */
		inArray: function (elem, arr, i) {
			var len;

			if ( arr ) {
				if ( arr.indexOf ) {
					return arr.indexOf.call(arr, elem, i);
				}

				len = arr.length;
				i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

				for (; i < len; i++) {
					if ( i in arr && arr[i] === elem ) {
						return i;
					}
				}
			}

			return -1;
		},

		/**
		 * Whether we are dealing with a genuine array
		 *
		 * @param  {Array}   arr
		 * @return {Boolean}
		 */
		isArray: function (arr) {
			return Object.prototype.toString.call(arr) === '[object Array]';
		},

		/**
		 * Object extend
		 *
		 * @return {Object} extended object
		 */
		extend: function (obj, ext) {
			var i, l, name, args = arguments, value;

			for (i = 1, l = args.length; i < l; i++) {
				ext = args[i];
				for (name in ext) {
					if (ext.hasOwnProperty(name)) {
						value = ext[name];

						if (value !== undef) {
							obj[name] = value;
						}
					}
				}
			}

			return obj;
		},

		/**
		 * ForEach helper
		 * @see    https://github.com/toddmotto/foreach
		 */
		forEach: function (collection, callback, scope) {
			if (Object.prototype.toString.call(collection) === '[object Object]') {
				for (var prop in collection) {
					if (Object.prototype.hasOwnProperty.call(collection, prop)) {
						callback.call(scope, collection[prop], prop, collection);
					}
				}
			} else {
				for (var i = 0, len = collection.length; i < len; i++) {
					callback.call(scope, collection[i], i, collection);
				}
			}
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