# Guzzle
[![Build Status][build-badge]][travis]
[![Dependency Status][david-badge]][david]
[![devDependency Status][david-dev-badge]][david-dev]
## Requirements
- Node.js (5.0+)

## Tech Stack
- [Babel 6](http://babeljs.io/) ES6+ support
- [Sass](http://sass-lang.com/) CSS with superpowers
- [BrowserSync](https://browsersync.io/) Time-saving synchronized browser testing.
- [Gulp](http://gulpjs.com/) Streaming build system
- [Webpack](https://webpack.github.io/) Module bundler


## Getting started

### Installation

```shell
$ git clone git@github.com:strues/guzzle
$ cd guzzle
$ npm install
```

### Make it work

```shell
$ npm start
$ npm run build
```

## Documentation

### Develop
`npm start` or `gulp dev --watch` runs the JavaScript through Webpack, processes Sass files, launches BrowserSync, and
watches for changes. CSS updates are injected automatically, but can be disabled from the config file. **If the `--watch` flag
is not passed, changes will not be processed automatically.**

### Build for production
`npm run build` or `gulp build --prod` will both minify and optimize files for production. It is important to note that,
you must pass the --prod flag in order to instruct Gulp to perform the additional production tasks.

#### Linting
It's recommended, but not required to have eslint installed globally, `npm install -g eslint`. However, it will work regardless.
In order for scss-lint to work you must have the Ruby Gem, [scss-lint](https://github.com/brigade/scss-lint) installed.  

##### Run both eslint and scss-lint.  
`gulp lint`  

##### Run **only** eslint.  
`gulp lint:eslint`  

##### Run **only** scss-lint.  
`gulp lint:scss`  

#### Sass
`gulp sass` will compile all Sass (SCSS) files and output the non-minified CSS result to `__build__/css/style.css`.  

The Sass task will automatically apply vendor prefixes for browsers defined in the `config.js` file.  
Along with your typical Sass processing, Guzzle takes advantage of additional PostCSS tools, such as
 - mqpacker  
 - cssnano  

#### Images
`gulp images` optimizes all image files using imagemin and the imagemin-pngquant plugin.

#### Html
`gulp html`

#### Help
`gulp help` displays a list of all tasks and their subtasks for reference.  

#### Fonts
`gulp fonts` runs Fontmin on font source files included within your project.

#### Clean
`gulp clean` combines cache clearing and removing all files from the `__build__` folder.  

##### Clean:dist
`gulp clean:dist` deletes all files from the `dist` folder.  

#### Config.js  
Here you are able to define various options for the build process. This includes prefixed browsers,
a header for files, and BrowserSync settings.  

**Banner**  
```
/**
 * ${pkg.name}
 * ${pkg.description}
 * Compiled: ${Date()}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @copyright ${pkg.license}
 */
```
Banner is populated from values within your `package.json` file.  

**BrowserSync**  
```
browserSync: {
  allowReload: true, // Reload the page when file changes are made?
  injectCSS:   true, // Inject CSS changes after .css files are saved?
  port:        3000, // Server port I.E. http://localhost:3000
  uiPort:      3001, // BrowserSync UI port I.E. http://localhost:3001
  openBrowserOnStartup: false,
  online: true
}
```  

**Directories**  
```
dir: {
  srcDir: __dirname + '/src/',
  buildDir: __dirname + '/__build__/',
  distDir: __dirname + '/dist/',
  cssDir: 'css/',
  imgDir: 'img/',
  jsDir: 'js/',
  sassDir: 'sass/',
  fontsDir: 'fonts/'
}
```

Troubleshooting
---------------

Please create [an issue](https://github.com/strues/guzzle/issues/new).


[build-badge]: http://img.shields.io/travis/strues/guzzle.svg?branch=master&style=flat
[david-badge]: http://img.shields.io/david/strues/guzzle.svg?style=flat
[david-dev-badge]: http://img.shields.io/david/dev/strues/guzzle.svg?style=flat

[travis]: https://travis-ci.org/strues/guzzle
[david]: https://david-dm.org/strues/guzzle
[david-dev]: https://david-dm.org/strues/guzzle#info=devDependencies
