'use strict';

var gulp = require('gulp'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	assign = require('lodash.assign'),
	duration = require('gulp-duration'),
	notify = require("gulp-notify"),
	chalk = require('chalk'),
	plumber = require('gulp-plumber'),
	gulpif = require('gulp-if');

var taskBrowserify = function(mode, activeProfile, activeConf) {
	var isSourcemaps = activeConf.tasks.sourcemaps !== undefined &&
					   activeConf.tasks.sourcemaps.activate;
	var isUglify = activeConf.tasks.uglify !== undefined &&
				   activeConf.tasks.uglify.activate;
	var uglifyOptions, b, isMangle, isKeepComments, isUglifyOptions;
	var browserifyOptions = assign({}, watchify.args, {
		entries: activeConf.sourceFolder,
		debug: isSourcemaps
	});

	// If uglify is activated too, populate the options
	if (isUglify && activeConf.tasks.uglify.activate) {
		isUglifyOptions = activeConf.tasks.uglify.options !== undefined;
		isMangle = isUglifyOptions &&
				   activeConf.tasks.uglify.options.mangle !== undefined &&
				   activeConf.tasks.uglify.options.mangle;
		isKeepComments = isUglifyOptions &&
						 activeConf.tasks.uglify.options.keepComments !== undefined &&
						 activeConf.tasks.uglify.options.keepComments;
		uglifyOptions = {
			mangle: isMangle,
			preserveComments: isKeepComments ? 'all' : false
		}
	}

	// Switch between build and watch mode depending on CLI command
	if (mode === 'watch') {
		b = watchify(browserify(browserifyOptions));
		b.on('update', build);

	} else if (mode === 'build') {
		b = browserify(browserifyOptions);
	}

	b.on('log', gutil.log);

	function build() {
		return b.bundle()
			.on('error', gutil.log.bind(gutil, chalk.bgRed.bold('Error on Browserify compilation')))
			.on('error', notify.onError('Error on Browserify compilation'))
			.pipe(source(activeConf.exitFileName))
			.pipe(plumber())
			.pipe(duration('Browserify task'))
			.pipe(buffer())
			.pipe(gulpif(isSourcemaps, sourcemaps.init({loadMaps: true})))
			.pipe(gulpif(isUglify, uglify(uglifyOptions)))
			.pipe(gulpif(isSourcemaps, sourcemaps.write('./')))
			.pipe(gulp.dest(activeConf.exitFolder))
			.pipe(plumber.stop())
	}

	build();
};

module.exports = taskBrowserify;
