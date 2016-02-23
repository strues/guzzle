import gulp from 'gulp';
import browserSync, { reload } from 'browser-sync';
import watch from 'gulp-watch';
import gutil from 'gulp-util';
import path from 'path';
import { argv } from 'yargs';
import config, { DIST_DIR, BUILD_DIR } from '../config.js';
import Logger from '../utils/logger';

const production = argv.prod ? true : false;
const destDir = production ? DIST_DIR : BUILD_DIR;

const bs = browserSync.create();

function onChange(event) {
  gutil.log(
    gutil.colors.green('File ' + event.type + ': ') +
    gutil.colors.magenta(path.basename(event.path))
  );
}

gulp.task('reload', (done) => {
  bs.reload();
  done();
});

gulp.task('serve', () => {
  Logger.task('RUNNING TASK: Serve');
  const logLevel = config.verbose ? 'debug' : 'info';
   bs.init({
    server: {
      baseDir: BUILD_DIR
    },
    ui: {
      port: config.browserSync.uiPort
    },
    port: config.browserSync.port,
    online: config.browserSync.online,
    open: config.browserSync.openBrowserOnStartup,
    logFileChanges: config.verbose,
    logConnections: config.verbose,
    injectChanges: config.browserSync.injectCSS
  });

  watch(config.javascript.build + '/*.js', ['lint:eslint', 'reload']).on('change', onChange);
  watch(config.images.build + '/*').on('change', onChange);
  watch(config.html.build + '/*.html', ['html', 'reload']).on('change', onChange);
});

gulp.task('serve:dist', ['build'], () => {
  Logger.task('RUNNING TASK : BrowserSync:Dist');
   bs.init({
    server: {
      baseDir: DIST_DIR
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
