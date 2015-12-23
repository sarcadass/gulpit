var inquirer = require('inquirer');

'use strict';

var configGenerator = {
	init: function() {

		console.log('use arrow keys and spacebar to select');

		var questions = [
			// CSS and/or JS?
			{
				type: 'checkbox',
				name: 'languages',
				message: 'For which language(s) do you need tools?',
				choices: [
					{ name: 'Javascript' },
					{ name: 'CSS' }
				],
				validate: function(answer) {
					if (answer.length < 1) {
						return 'You must choose at least one language.';
					}
					return true;
				}
			},

			// Js tools?
			{
				type: 'checkbox',
				name: 'jsTools',
				message: 'What tools will you use for Javascript?',
				choices: [
					{ name: 'Browserify' },
					{ name: 'Uglify' },
					{ name: 'Sourcemaps' }
				],
				when: function(answers) {
					return answers.languages.indexOf('Javascript') !== -1;
				}
			},

			// CSS tools?
			{
				type: 'checkbox',
				name: 'CssTools',
				message: 'What tools will you use for CSS?',
				choices: [
					{ name: 'Sass' },
					{ name: 'Less' },
					{ name: 'Sourcemaps' }
				],
				when: function(answers) {
					return answers.languages.indexOf('CSS') !== -1;
				}
			}
		];

		inquirer.prompt(questions, function(answers) {
			console.log('\nSummary:');
			console.log(JSON.stringify(answers, null, '  '));
		});
	}
};

module.exports = configGenerator;
