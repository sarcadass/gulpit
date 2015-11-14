module.exports = {

	projectName: 'gulpit-test',

	profiles: {
		default: {
			js: {
				sourceFolder: 'dev/js/uglify/*.js',
				exitFolder: 'build/js/',
				exitFileName: 'script.js',
				// File will be renamed only if you indicate a specific file for 'sourceFolder'

				tasks: {
					browserify: {
						activate: false
					},
					uglify: {
						activate: true,
						options: {
							concat: false,
							// Shorten var names
							mangle: false,
							keepComments: false
						}
					},
					sourcemaps: {
						activate: true
					}
				}
			},

			css: {
				sourceFolder: 'dev/css/less/index.less',
				exitFolder: 'build/css/',
				// File will be renamed only if you indicate a specific file for 'sourceFolder'
				exitFileName: 'style.css',

				tasks: {
					sass: {
						activate: false,
						options: {
							// nested, expanded, compact, compressed
							outputStyle: 'nested'
						}
					},
					less: {
						activate: true,
						options: {
							compress: false
						}
					},
					autoprefixer: {
						activate: true,
						options: {
							browsers: ['last 2 versions']
						}
					},
					sourcemaps: {
						activate: true
					}
				}
			}
		},

		prod: {
			js: {
				tasks: {
					uglify: {
						options: {
							mangle: true
						}
					},
					sourcemaps: { activate: false }
				}
			}
		}
	}
};
