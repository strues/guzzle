import gulp from 'gulp';
import pngquant from 'imagemin-pngquant';
import { argv } from 'yargs';
import gulpLoadPlugins from 'gulp-load-plugins';
import gIf from 'gulp-if';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config from '../config.js';
import Logger from '../utils/logger';

const $ = gulpLoadPlugins();

const production = argv.prod ? true : false;

gulp.task('images', () => {
  Logger.task('RUNNING TASK: Images');
  return gulp
    .src([config.images.src + '/**'])
    .pipe($.newer(config.images.dest))
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{cleanupIDs: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest(config.images.dest));
});
