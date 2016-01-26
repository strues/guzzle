import pkg from './package.json';
import minimist from 'minimist';

const options = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
};

const banner =
  `/**
 * ${pkg.name}
 * ${pkg.description}
 * Compiled: ${Date()}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @copyright ${pkg.license}
 */
`;

export default {
  args: minimist(process.argv.slice(2), options),
  // Verbose logging output
  verbose: true,
  server: {
    port: 8000
  },
  browserSync: {
    allowReload: true, // Reload the page when file changes are made?
    injectCSS:   true, // Inject CSS changes after .css files are saved?
    port:        3000, // Server port I.E. http://localhost:3000
    uiPort:      3001, // BrowserSync UI port I.E. http://localhost:3001
    openBrowserOnStartup: false,
    online: true
  },
  browsers: 'last 2 versions',
  dir: {
    srcDir: __dirname + '/src/',
    buildDir: __dirname + '/__build__/',
    distDir: __dirname + '/dist/',
    cssDir: 'css/',
    imgDir: 'img/',
    jsDir: 'js/',
    sassDir: 'sass/',
    fontsDir: 'fonts/'
  },
  fonts: {
    formats: 'woff woff2',
    custom: {
      'Open Sans': [400, 600]
    }
  },
  css: {
    autoprefixer: ['> 98%']
  },
  javascript: {
    entry: ['index.js'],
    babel: {
      presets: ['es2015', 'stage-0']
    }
  },
  banner: banner
};
