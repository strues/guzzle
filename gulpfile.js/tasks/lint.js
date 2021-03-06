import gulp from 'gulp';
import gutil from 'gulp-util';
import gIf from 'gulp-if';
import gulpLoadPlugins from 'gulp-load-plugins';
import { argv } from 'yargs';
import runSequence from 'run-sequence';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config, { DIST_DIR, BUILD_DIR } from '../config.js';
import Logger from '../utils/logger';

const $ = gulpLoadPlugins();

const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? DIST_DIR : BUILD_DIR;

gulp.task('lint:scss', () => {
  Logger.task('RUNNING TASK: Lint:SCSS');
  return gulp
    .src([config.sass.src + '/**/*.scss', '!' + config.sass.src + '/vendor/**/*.scss'])
    .pipe($.cache($.stylelint()));
});

gulp.task('lint:eslint', () => {
  Logger.task('RUNNING TASK: Lint:Eslint');
  return gulp
    .src(config.javascript.src + '/**/*.js')
    .pipe($.cache($.eslint()))
    .pipe($.eslint.format());
});

gulp.task('lint', (cb) => {
  Logger.task('RUNNING TASK: Lint');
  runSequence(['lint:eslint', 'lint:scss'], cb);
});
