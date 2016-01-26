import gulp from 'gulp';
import watch from 'gulp-watch';
import { argv } from 'yargs';

import config from '../../config.js';
import Logger from '../utils/logger';

const { srcDir, imgDir, sassDir } = config.dir;
const stream = argv.watch ? true : false;

gulp.task('dev', ['clean'], () => {
  Logger.task('RUNNING TASK : Dev');
  gulp.start('sass', 'images', 'scripts', 'html');

  if (stream) {
    gulp.start('serve');
    watch(srcDir + sassDir + '**/*.scss', () => gulp.start('sass'));
    //watch(srcDir + imgDir + '*', () => gulp.start('images'));
    watch(srcDir + '*.html', () => gulp.start('html'));
  }
});
