import gulp from 'gulp';
import watch from 'gulp-watch';
import { argv } from 'yargs';

import config, { DIST_DIR, BUILD_DIR } from '../config.js';
import Logger from '../utils/logger';
const production = argv.prod ? true : false;
const destDir = production ? DIST_DIR : BUILD_DIR;
const stream = argv.watch ? true : false;

gulp.task('dev', ['clean'], () => {
  Logger.task('RUNNING TASK : Dev');
  gulp.start('fonts', 'sass', 'images', 'scripts', 'html');

  if (stream) {
    gulp.start('serve');
    watch(config.sass.src + '/**/*.scss', () => gulp.start('sass'));
    watch(config.images.src + '/*', () => gulp.start('images'));
    watch(config.html.src + '/*.html', () => gulp.start('html'));
  }
});
