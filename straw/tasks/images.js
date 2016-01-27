import gulp from 'gulp';
import pngquant from 'imagemin-pngquant';
import { argv } from 'yargs';
import gulpLoadPlugins from 'gulp-load-plugins';
import gIf from 'gulp-if';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config from '../../config.js';
import Logger from '../utils/logger';

const $ = gulpLoadPlugins();
const { srcDir, buildDir, distDir, cssDir, imgDir } = config.dir;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

gulp.task('images', () => {
  Logger.task('RUNNING TASK: Images');
  return gulp
    .src([srcDir + imgDir + '**'])
    .pipe($.newer(destDir + imgDir))
    .pipe($.cache('img'))
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{cleanupIDs: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(destDir + imgDir));
});
