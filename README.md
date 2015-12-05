# Gulpit #

Gulpit is an **easy and fast configurable task library** built around [Gulp](https://github.com/gulpjs/gulp) useable with a CLI.
You just have to configure the 'gulpit-conf.js' file (< 2min).
You will find a sample below.


### How do I get set up? ###

- Install the package with NPM: `npm install --global gulpit`
- **Create a 'gulpit-conf.js'** file in the root of your project
- `cd` where the 'gulpit-conf.js' is then run: `gulpit`


### How do I use the CLI? ###

You have two main command when you are in the gulpit app: 

- `Build`: will build your files once
- `watch`: will watch for file modifications then build after each new save
- `help`: List the command available with descriptions

You have extra options like:

- `build --css`: will only build css
- `build --prod`: will build with the prod profile*

You can combine:
`build --js --prod`: will only build js with the prod profile*

*Prod profile: will override the default options.


### Which tools can I use? ###

**For Javascript:**

- Browserify
- Uglify (you can use both Browserify and Uglify)
- Sourcemaps

**For CSS:**

- Sass
- Less
- Sourcemaps
- Autoprefixer


### Sample 'gulpit-conf.js' ###

Here is an example of a specific config if you use browserify (with sourcemaps) and sass (with sourcemaps and autoprefixer):

```js
module.exports = {
	projectName: 'test-project',
	profiles: {
		default: {
			js: {
				sourceFolder: 'dev/js/browserify/index.js',
				exitFolder: 'build/js/',
				exitFileName: 'app.js',
				tasks: {
					browserify: { activate: true },
					sourcemaps: { activate: true }
				}
			},
			css: {
				sourceFolder: 'dev/css/sass/index.scss',
				exitFolder: 'build/css/',
				exitFileName: 'style.css',
				tasks: {
					sass: {
						activate: true,
						options: {
							outputStyle: 'nested'
						}
					},
					autoprefixer: {
						activate: true,
						options: {
							browsers: ['last 2 versions']
						}
					},
					sourcemaps: { activate: true }
				}
			}
		},
		
		// Optional prod profile to disable sourcemaps
		// when you use '--prod' argument in the CLI
		prod: {
			js: { sourcemaps: { activate: false } },
			css: { sourcemaps: { activate: false } }
		}
	}
};
```

You can find the **complete sample conf with all the tasks available** in the test folder of this repo.


### Extra info ###

- The different options for **sass.options.outputStyle** are: nested, expanded, compact, compressed

- If you use both Browserify and Uglify, the **uglify.options.concat** options will be ignored as browserify already concat all the files

- File will be renamed after build only if you indicate a specific file for **sourceFolder**
