import gulp from 'gulp';
import browserSync, { reload } from 'browser-sync';
import watch from 'gulp-watch';
import { argv } from 'yargs';
import config from '../../config.js';
import Logger from '../utils/logger';

const { buildDir, distDir, imgDir, jsDir } = config.dir;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

gulp.task('serve', () => {
  Logger.task('RUNNING TASK: Serve');
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

gulp.task('serve:dist', () => {
  Logger.task('RUNNING TASK : BrowserSync:Dist');
  browserSync({
    server: {
      baseDir: distDir
    },
    ui: {
      port: config.browserSync.uiPort
    },
    port: config.browserSync.port,
    online: config.browserSync.online,
    open: config.browserSync.openBrowserOnStartup,
    logFileChanges: config.verbose,
    logConnections: config.verbose,
    injectChanges: false
  });
});
