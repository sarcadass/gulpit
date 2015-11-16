'use strict';

var watch = require('gulp-watch'),
	gulpif = require('gulp-if'),
	gulp = require('gulp'),
	less = require('gulp-less'),
	plumber = require('gulp-plumber'),
	notify = require("gulp-notify"),
	postcss  = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	duration = require('gulp-duration'),
	debug = require('gulp-debug'),
	pathController = require('./../lib/path-controller.js'),
	rename = require("gulp-rename"),
	sourcemaps = require('gulp-sourcemaps');

var taskLess = function(mode, activeProfile, activeConf) {
	var isWatch = mode === 'watch';
	var isSourcemaps = activeConf.tasks.sourcemaps !== undefined &&
					   activeConf.tasks.sourcemaps.activate;
	var isAutoprefixer = activeConf.tasks.autoprefixer !== undefined &&
						 activeConf.tasks.autoprefixer.activate;
	var isSpecificFile = pathController.isSpecificFile(activeConf.sourceFolder);
	var isCompressed = activeConf.tasks.less.options !== undefined &&
					   activeConf.tasks.less.options.compress !== undefined &&
					   activeConf.tasks.less.options.compress;
	var isAutoprefixerBrowsers = activeConf.tasks.autoprefixer.options !== undefined &&
								 activeConf.tasks.autoprefixer.options.browsers !== undefined ?
								 activeConf.tasks.autoprefixer.options.browsers : ['last 2 versions'];

	function build() {
		return gulp.src(activeConf.sourceFolder)
			.pipe(plumber())
			.pipe(debug({title: 'Less:'}))
			.pipe(duration('Less task'))
			.pipe(gulpif(isSourcemaps, sourcemaps.init({loadMaps: true})))
			.pipe(
				less({ compress: isCompressed })
				.on('error', notify.onError('Error on Less compilation'))
			)
			.pipe(gulpif(isAutoprefixer, postcss([autoprefixer({browsers: isAutoprefixerBrowsers})])))
			.pipe(gulpif(isSpecificFile, rename(activeConf.exitFileName)))
			.pipe(gulpif(isSourcemaps, sourcemaps.write('./')))
			.pipe(gulp.dest(activeConf.exitFolder));
	}

	if (isWatch) {
		watch(
			isSpecificFile ? pathController.toGlobalFiles(activeConf.sourceFolder) : activeConf.sourceFolder,
			build
		);
	}

	build();
};

module.exports = taskLess;
