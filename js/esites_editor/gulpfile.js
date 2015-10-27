var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');

var distDir = './dist';
var srcDir = '/js/esites_editor';
var pluginDir = '../tiny_mce/plugins/esites_editor';

gulp.task('plugin-clean', function () {
	return del([pluginDir], {
		force: true
	});
});

gulp.task('editor-clean', function () {
	return del([distDir], {
		force: true
	});
});

gulp.task('plugin-copy-base', function () {
	return gulp.src([
			'./src/tinymce/img/**/*',
			'./src/tinymce/langs/**/*',
			'./src/tinymce/esites_editor_plugin_src.js'
		], {base: './src/tinymce'})
		.pipe(gulp.dest(pluginDir));
});

gulp.task('plugin-build', function () {
	var jsFilter = filter('**/*.js');
	var cssFilter = filter('**/*.css');
	var assets = useref.assets();

	gulp.src(['./src/tinymce/esites_editor_plugin_src.js'], {base: './src/tinymce'})
		.pipe(uglify({
			output: {
				beautify: false
			},
			compress: {
				sequences: false
			},
			mangle: false
		}))
		.pipe(rename('esites_editor_plugin.js'))
		.pipe(gulp.dest(pluginDir));

	return gulp.src('./src/tinymce/esites_editor.html')
		.pipe(assets)
		.pipe(jsFilter)
		.pipe(uglify({
			output: {
				beautify: false
			},
			compress: {
				sequences: false
			},
			mangle: false
		}))
		.pipe(jsFilter.restore())
		.pipe(cssFilter)
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(cssFilter.restore())
		.pipe(rev())
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(revReplace())
		.pipe(gulp.dest(pluginDir));
});

gulp.task('editor-build', function () {
	// CSS deps 1/2
	gulp.src([
			'node_modules/codemirror/lib/codemirror.css',
			'node_modules/codemirror/theme/**/*'
		], {base: './node_modules'})
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(gulp.dest(distDir + '/js/vendor'));

	// CSS deps 2/2
	gulp.src([
			'./src/css/styles.css'
		], {base: './src'})
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(gulp.dest(distDir));

	// CodeMirror addons need some special attention
	gulp.src([
		'node_modules/codemirror/addon/**/*',
	], {base: './node_modules'})
	.pipe(gulp.dest(distDir + '/js/vendor'));

	// JS deps
	gulp.src([
			'node_modules/requirejs/require.js',
			'node_modules/codemirror/keymap/*',
			'node_modules/codemirror/lib/codemirror.js',
			'node_modules/codemirror/mode/css/*',
			'node_modules/codemirror/mode/handlebars/*',
			'node_modules/codemirror/mode/htmlmixed/*',
			'node_modules/codemirror/mode/javascript/*',
			'node_modules/codemirror/mode/xml/*',
			'node_modules/gator/gator.min.js',
			'node_modules/htmlhint/lib/htmlhint.js',
			'node_modules/js-beautify/js/lib/beautify-css.js',
			'node_modules/js-beautify/js/lib/beautify-html.js',
			'node_modules/js-beautify/js/lib/beautify.js',
			'node_modules/emmet-codemirror/dist/emmet.js',
			'node_modules/require-css/css.js'
		], {base: './node_modules'})
		.pipe(uglify({
			output: {
				beautify: false
			},
			compress: {
				sequences: false
			},
			mangle: false
		}))
		.pipe(gulp.dest(distDir + '/js/vendor'));

	// App code
	return gulp.src([
			'./src/js/app.js',
			'./src/js/app/**/*',
		], {base: './src/js'})
		.pipe(uglify({
			output: {
				beautify: false
			},
			compress: {
				sequences: false
			},
			mangle: false
		}))
		.pipe(gulp.dest(distDir + '/js'));
});

gulp.task('jshint', function () {
	return gulp.src(['./src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('plugin', ['plugin-clean'], function () {
	runSequence('plugin-copy-base', 'plugin-build');
});

gulp.task('editor', ['editor-clean'], function () {
	runSequence('editor-build');
});

gulp.task('release', ['jshint'], function () {
	runSequence('editor', 'plugin');
});