/**
 * App entrypoint that handles some basic config and loads the main module
 *
 * @author Boye Oomens <boye@e-sites.nl>
 */

/*global requirejs */
(function (requirejs, tinyMCEPopup) {

    'use strict';

    // Configure RequireJS in such a way that it points to an absolute baseUrl
    // when being called in standalone mode. Also, prevent some weird errors
    // by disabling the default timeout.
    requirejs.config({
        baseUrl: (!tinyMCEPopup ? '/js/tiny_mce/plugins/esites_editor/js/vendor' : 'js/vendor'),
        map: {
            '*': {
                'css': 'requirejs/css.min'
            }
        },
        paths: {
            app: '../app',
            gator: 'gator/gator.min'
        },
        shim: {
            'gator': {
                 exports: 'Gator'
            }
        },
        waitSeconds: 0
    });

    requirejs(['app/main']);

}(requirejs, window.tinyMCEPopup));