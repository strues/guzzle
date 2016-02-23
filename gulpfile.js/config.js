import pkg from '../package.json';
import minimist from 'minimist';
import { join } from 'path';
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

export const ROOT_DIR = join(__dirname, '../');
export const BASE_DIR = `${ROOT_DIR}/src`;
export const BUILD_DIR = `${ROOT_DIR}/__build__`;
export const DIST_DIR = `${ROOT_DIR}/dist`;

export default {
  args: minimist(process.argv.slice(2), options),
  sass: {
    src: `${BASE_DIR}/sass`,
    build: `${BUILD_DIR}/css`,
    dest: `${DIST_DIR}/css`,
    autoprefixer: {
      browsers: ['> 1%', 'last 3 version']
    },
    settings: {
      extended: true
        //  includePaths: neat,
    },
    sourcemaps: {
      loadMaps: true,
      debug: true,
    },
    extensions: ['scss', 'css'],
    excludes: ['']
  },
  javascript: {
    src: `${BASE_DIR}/js`,
    build: `${BUILD_DIR}/js`,
    dest: `${DIST_DIR}/js`,
    entry: ['index.js'],
    babel: {
      presets: ['es2015', 'stage-0']
    }
  },
  html: {
    src: `${BASE_DIR}/`,
    build: `${BUILD_DIR}/`,
    dest: `${DIST_DIR}/`,
    htmlmin: {
      collapseWhitespace: true
    }
  },

  images: {
    src: `${BASE_DIR}/img`,
    build: `${BUILD_DIR}/img`,
    dest: `${DIST_DIR}/img`,
    extensions: ['jpg', 'png', 'svg', 'gif']
  },

  fonts: {
    src: `${BASE_DIR}/fonts`,
    build: `${BUILD_DIR}/fonts`,
    dest: `${DIST_DIR}/fonts`,
    extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },
  dir: {
    srcDir: `${BASE_DIR}`,
    buildDir: `${BUILD_DIR}`,
    distDir: `${DIST_DIR}`,
    cssDir: 'css/',
    imgDir: 'img/',
    jsDir: 'js/',
    sassDir: 'sass/',
    fontsDir: 'fonts/'
  },
  // Verbose logging output
  verbose: true,
  server: {
    port: 8000
  },
  browserSync: {
    allowReload: true, // Reload the page when file changes are made?
    injectCSS: true, // Inject CSS changes after .css files are saved?
    port: 3000, // Server port I.E. http://localhost:3000
    uiPort: 3001, // BrowserSync UI port I.E. http://localhost:3001
    openBrowserOnStartup: false,
    online: true
  },
  browsers: 'last 2 versions',
  css: {
    autoprefixer: ['> 98%']
  },
  banner: banner
};
