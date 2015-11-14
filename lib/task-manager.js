'use strict';

var configController = require('./config-controller.js'),
	arrayUnique = require('./arrayUnique.js'),
	arrayRemove = require('./arrayRemove.js'),
	taskLibrary = require('./../tasks/index.js'),
	chalk = require('chalk'),
	deepMerge = require('deepmerge'),
	capitalize = require('lodash.capitalize');

var taskManager = {
	conf: require(configController.path),

	init: function(mode, args, activeProfile) {
		// Dispatch depending on CLI arguments
		if (args.options.css === true) {
			console.log(chalk.cyan.bold(mode + 'ing css'));
			this.buildTasks(mode, 'css', activeProfile);

		} else if (args.options.js === true) {
			console.log(chalk.cyan.bold(mode + 'ing js'));
			this.buildTasks(mode, 'js', activeProfile);

		} else {
			console.log(chalk.cyan.bold(capitalize(mode) + 'ing all', '\nProfile:', activeProfile));
			this.buildTasks(mode, 'js', activeProfile);
			this.buildTasks(mode, 'css', activeProfile);
		}
	},

	buildTasks: function(mode, type, activeProfile) {
		var i = 0;
		var activeTasks = Object.keys(this.conf.profiles.default[type].tasks);
		var activeConf = this.conf.profiles.default[type];

		// If prod profile active, merge the tasks set ine the two profiles in conf
		if (activeProfile === 'prod') {
			if (this.conf.profiles.prod !== undefined) {
				try {
					// Gather all the tasks in conf
					activeTasks = Object.keys(this.conf.profiles.prod[type].tasks).concat(activeTasks);
					// Remove duplicate tasks
					activeTasks = arrayUnique(activeTasks);
					// Merging prod conf into default conf
					activeConf = deepMerge(activeConf, this.conf.profiles.prod[type]);
				} catch(e) {}
			} else {
				console.log(chalk.red.bold('You need to configure the prod profile.'));
			}
		}

		// Remove sourcemaps and autoprefixer task as it's handled inside other tasks
		activeTasks = arrayRemove(activeTasks, 'sourcemaps');
		activeTasks = arrayRemove(activeTasks, 'autoprefixer');

		// Going through each active task
		for (i; i < activeTasks.length; i++) {
			// If current task is set as 'activate: true' in conf, then call it
			if (activeConf.tasks[activeTasks[i]].activate) {
				taskLibrary[activeTasks[i]](mode, activeProfile, activeConf);
			}
		}
	}
};

module.exports = taskManager;
