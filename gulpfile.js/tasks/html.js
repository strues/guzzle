import gulp from 'gulp';
import cache from 'gulp-cached';
import { argv } from 'yargs';
import gulpLoadPlugins from 'gulp-load-plugins';
import gIf from 'gulp-if';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config from '../../config.js';
import Logger from '../utils/logger';

const $ = gulpLoadPlugins();
const { srcDir, buildDir, distDir } = config.dir;
const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

gulp.task('html', () => {
  Logger.task('RUNNING TASK: Html');
  return gulp
    .src(srcDir + '*.html')
    .pipe(cache('html'))
    .pipe(gIf(production, $.htmlmin(config.html)))
    .pipe(gulp.dest(destDir));
});
