import gulp from 'gulp';
import gutil from 'gulp-util';
import gIf from 'gulp-if';
import { argv } from 'yargs';
import runSequence from 'run-sequence';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config from '../../config.js';
import Logger from '../utils/logger';

const $ = gulpLoadPlugins();
const { srcDir, buildDir, distDir, jsDir, sassDir } = config.dir;
const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

gulp.task('lint:scss', () => {
  Logger.task('RUNNING TASK: Lint:SCSS');
  return gulp
    .src([srcDir + sassDir + '**/*.scss', '!' + srcDir + sassDir + 'vendor/**/*.scss'])
    .pipe($.cache('scsslint'))
    .pipe($.scssLint())
});

gulp.task('lint:eslint', () => {
  Logger.task('RUNNING TASK: Lint:Eslint');
  return gulp
    .src(srcDir + jsDir + '**/*.js')
    .pipe($.cache('eslint'))
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('lint', (cb) => {
  Logger.task('RUNNING TASK: Lint');
  runSequence(['lint:eslint', 'lint:scss'], cb);
});
