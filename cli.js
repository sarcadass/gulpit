#!/usr/bin/env node

'use strict';

var vorpal = require('vorpal')(),
	taskManager = require('./lib/task-manager.js'),
	configController = require('./lib/config-controller.js'),
	profileManager = require('./lib/profile-manager.js'),
	chalk = require('chalk');

var cli = {
	init: function() {
		var conf = configController.check() !== false ? require(configController.path) : false;
		var projectName = conf !== false ? chalk.green('~' + conf.projectName) : '';
		var missingConfMsg = "You should have a 'gulpit-conf.js' file in this directory!" +
							 "\nEnding process.";

		// Watch Command
		vorpal
			.command('watch', 'Watch for source modification and rebuild after save.')
			.option('--css', 'Watch only for CSS change.')
			.option('--js', 'Watch only for JS change.')
			.option('--prod', 'Use prod profile.')
			.action(function(args) {
				if (configController.check() !== false) {
					// If config file is present
					taskManager.init('watch', args, profileManager.selector(args));
				} else {
					this.log(chalk.red.bold(missingConfMsg));
					vorpal.ui.cancel();
				}
			});

		// Build Command
		vorpal
			.command('build', 'Build the project.')
			.option('--css', 'Build only the CSS.')
			.option('--js', 'Build only the JS.')
			.option('--prod', 'Use prod profile.')
			.action(function(args) {
				if (configController.check() !== false) {
					// If config file is present
					taskManager.init('build', args, profileManager.selector(args));
				} else {
					this.log(chalk.red.bold(missingConfMsg));
					vorpal.ui.cancel();
				}
			});

		// CLI prefix
		vorpal
			.delimiter('gulpit' + projectName + '$')
			.show();
	}
};

cli.init();
