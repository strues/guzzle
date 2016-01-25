import gulp from 'gulp';
import browserSync, {
  reload
}
from 'browser-sync';
import watch from 'gulp-watch';
import config from '../../config.js';
import {
  argv
}
from 'yargs';
import Logger from '../utils/logger';
const {
  srcDir, buildDir, distDir, cssDir, imgDir, sassDir, fontsDir, jsDir
} = config.dir;

const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

gulp.task('browsersync', () => {
  Logger.task('RUNNING TASK : BrowserSync');
  const logLevel = config.verbose ? 'debug' : 'info';
  browserSync({
    server: {
      baseDir: buildDir
    },
    ui: {
      port: config.browserSync.uiPort
    },
    port: config.browserSync.port,
    online: config.browserSync.online,
    open: config.browserSync.openBrowserOnStartup,
    logFileChanges: config.verbose,
    logConnections: config.verbose,
    injectChanges: true
  });

  watch(buildDir + jsDir + '*.js', () => reload());
  watch(buildDir + imgDir + '*', () => reload());
  watch(buildDir + '*.html', () => reload());
});
