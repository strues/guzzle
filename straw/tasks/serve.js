import gulp from 'gulp';
import browserSync, { reload } from 'browser-sync';
import watch from 'gulp-watch';
import gutil from 'gulp-util';
import path from 'path';
import { argv } from 'yargs';
import config from '../../config.js';
import Logger from '../utils/logger';

const { buildDir, distDir, imgDir, jsDir } = config.dir;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

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
    injectChanges: config.browserSync.injectCSS
  });

  watch(buildDir + jsDir + '*.js', ['lint:eslint', 'reload']).on('change', onChange);
  watch(buildDir + imgDir + '*').on('change', onChange);
  watch(buildDir + '*.html', ['html', 'reload']).on('change', onChange);
});

gulp.task('serve:dist', ['build'], () => {
  Logger.task('RUNNING TASK : BrowserSync:Dist');
   bs.init({
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
