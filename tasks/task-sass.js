'use strict';

var watch = require('gulp-watch'),
	gulpif = require('gulp-if'),
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	duration = require('gulp-duration'),
	postcss  = require('gulp-postcss'),
	debug = require('gulp-debug'),
	autoprefixer = require('autoprefixer'),
	pathController = require('./../lib/path-controller.js'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps');

var taskSass = function(mode, activeProfile, activeConf) {
	var options = activeConf.tasks.sass.options || {};
	var isWatch = mode === 'watch';
	var isSourcemaps = activeConf.tasks.sourcemaps !== undefined &&
					   activeConf.tasks.sourcemaps.activate;
	var isAutoprefixer = activeConf.tasks.autoprefixer !== undefined &&
					     activeConf.tasks.autoprefixer.activate;
	var isSpecificFile = pathController.isSpecificFile(activeConf.sourceFolder);

	function build() {
		return gulp.src(activeConf.sourceFolder)
			.pipe(plumber())
			.pipe(debug({title: 'Sass:'}))
			.pipe(duration('Sass task'))
			.pipe(gulpif(isSourcemaps, sourcemaps.init({loadMaps: true})))
			//.pipe(gulpif(isConcat, concat(activeConf.exitFileName)))
			.pipe(sass(options)
				.on('error', sass.logError)
				.on('error', notify.onError('Error on Sass compilation'))
			)
			.pipe(gulpif(isAutoprefixer, postcss([autoprefixer({browsers: activeConf.tasks.autoprefixer.browsers})])))
			.pipe(gulpif(isSpecificFile, rename(activeConf.exitFileName)))
			.pipe(gulpif(isSourcemaps, sourcemaps.write('./')))
			.pipe(gulp.dest(activeConf.exitFolder))
	}

	if (isWatch) {
		watch(
			isSpecificFile ? pathController.toGlobalFiles(activeConf.sourceFolder) : activeConf.sourceFolder,
			build
		);
	}

	build();
};

module.exports = taskSass;
