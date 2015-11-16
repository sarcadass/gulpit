'use strict';

var gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	watch = require('gulp-watch'),
	gutil =require('gulp-util'),
	debug = require('gulp-debug'),
	duration = require('gulp-duration'),
	sourcemaps = require('gulp-sourcemaps');

var taskUglify = function(mode, activeProfile, activeConf) {
	var options = activeConf.tasks.uglify.options;
	var isWatch = mode === 'watch';
	var isSourcemaps = activeConf.tasks.sourcemaps !== undefined &&
					   activeConf.tasks.sourcemaps.activate;
	var isBrowserify = activeConf.tasks.browserify !== undefined &&
					   activeConf.tasks.browserify.activate;
	var isConcat = !isBrowserify && options !== undefined && options.concat;
	var uglifyOptions = {
		mangle: options !== undefined && options.mangle !== undefined ? options.mangle : true,
		preserveComments: options !== undefined && options.keepComments !== undefined &&
						  options.keepComments === true ? 'all' : false
	};

	function build() {
		return gulp.src(activeConf.sourceFolder)
			.pipe(plumber())
			.pipe(debug({title: 'Uglify:'}))
			.pipe(duration('Uglify task'))
			.pipe(gulpif(isSourcemaps, sourcemaps.init({loadMaps: true})))
			.pipe(gulpif(isConcat, concat(activeConf.exitFileName)))
			.pipe(uglify(uglifyOptions)
				.on('error', gutil.log)
				.on('error', notify.onError('Error on Uglify compilation'))
			)
			.pipe(gulpif(isSourcemaps, sourcemaps.write('./')))
			.pipe(gulp.dest(activeConf.exitFolder));
	}

	// If Browserify is activated do not init uglify task as it's already handled in the browserify task
	if (!isBrowserify || (isBrowserify && !activeConf.tasks.browserify.activate)) {
		if (isWatch) {
			watch(activeConf.sourceFolder, build);
		}

		build();
	}
};

module.exports = taskUglify;
