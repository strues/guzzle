import gulp from 'gulp';
import browserSync, { reload } from 'browser-sync';
import gulpIf from 'gulp-if';
import path from 'path';
import sourcemaps from 'gulp-sourcemaps';
import { argv } from 'yargs';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config, { DIST_DIR, BUILD_DIR } from '../config.js';
import Logger from '../utils/logger';

const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? DIST_DIR : BUILD_DIR;

gulp.task('scripts:es5', () => {
  Logger.task('RUNNING TASK: Scripts:ES5');
  return gulp.src(config.javascripts.src + '/**/*.js')

    .pipe(gulp.dest(destDir + '/js'));
});
