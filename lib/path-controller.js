'use strict';

var path = require('path'),
	deepMerge = require('deepmerge');

var pathController = {
	isSpecificFile: function(configPath) {
		return path.basename(configPath).split('.')[0] !== '*';
	},

	toGlobalFiles: function(configPath) {
		var originalPath = path.parse(configPath);
		var newPath = {
			base: '**/*' + originalPath.ext,
			name: '*'
		};

		return path.format(deepMerge(originalPath, newPath));
	}

};

module.exports = pathController;
