/**
 * App entrypoint that handles some basic config and loads the main module
 *
 * @author Boye Oomens <boye@e-sites.nl>
 */

/*global define, requirejs */
(function (requirejs) {

    'use strict';

    // Configure RequireJS in such a way that it points to an absolute baseUrl
    // Also, prevent some weird errors by disabling the default timeout.
    requirejs.config({
        baseUrl: '/js/esites_editor/dist/js/vendor',
        map: {
            '*': {
                'css': 'require-css/css'
            }
        },
        paths: {
            app: '../app',
            emmet: 'emmet-codemirror/dist/emmet',
            gator: 'gator/gator.min',
            htmlhint: 'htmlhint/lib/htmlhint'
        },
        shim: {
            'gator': {
                 exports: 'Gator'
            }
        },
        waitSeconds: 0
    });

    // Only kickstart the editor when we have actual targets
    define(['app/var/targets'], function (targets) {
        if ( targets.length ) {
            requirejs(['app/main']);
        }
    });

}(requirejs));