'use strict';

var taskBrowserify = require('./task-browserify.js'),
	taskUglify = require('./task-uglify.js'),
	taskSass = require('./task-sass.js'),
	taskLess = require('./task-less.js');

module.exports = {
	// JS
	browserify: function (mode, activeProfile, activeConf) {
		return taskBrowserify(mode, activeProfile, activeConf)
	},
	uglify: function (mode, activeProfile, activeConf) {
		return taskUglify(mode, activeProfile, activeConf)
	},

	// CSS
	sass: function (mode, activeProfile, activeConf) {
		return taskSass(mode, activeProfile, activeConf);
	},
	less: function (mode, activeProfile, activeConf) {
		return taskLess(mode, activeProfile, activeConf)
	}
};
