/**
 * App entrypoint that handles some basic config and loads the main module
 *
 * @author Boye Oomens <boye@e-sites.nl>
 */

/*global requirejs */
(function (requirejs) {

    'use strict';

    requirejs.config({
        baseUrl: 'js/vendor',
        map: {
            '*': {
                'css': 'requirejs/css.min'
            }
        },
        paths: {
            app: '../app'
        }
    });

    requirejs(['app/main']);

}(requirejs));