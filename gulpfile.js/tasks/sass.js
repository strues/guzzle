import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync, { reload } from 'browser-sync';
import gutil from 'gulp-util';
import gIf from 'gulp-if';
import { argv } from 'yargs';

// PostCSS Plugins
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
// Guzzle
import handleErrors from '../utils/handleErrors';

import config, { DIST_DIR, BUILD_DIR } from '../config.js';
import Logger from '../utils/logger';

const $ = gulpLoadPlugins();
// const { srcDir, buildDir, distDir, cssDir, sassDir } = config.dir;
const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? DIST_DIR : BUILD_DIR;

let processors = [
    autoprefixer(config.sass.autoprefixer),
    mqpacker
  ];

export default function sassTask() {
  Logger.task('RUNNING TASK : styles');
  return gulp
    .src(config.sass.src + '/*.scss')
    .pipe($.plumber())
    .pipe(gIf(stream, $.sourcemaps.init(config.sass.sourcemaps)))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', handleErrors))
    .pipe($.postcss(processors))
    .pipe(gIf(stream, $.sourcemaps.write('.')))
    .pipe(gIf(production, $.cssnano()))
    .pipe(gIf(production, $.banner(config.banner)))
    .pipe(gIf(production, $.base64({
      extensions: ['svg', 'png', 'jpg']
    })))
    .pipe(gulp.dest(destDir + '/css'))
    .pipe(reload({stream: true}));
}

gulp.task('sass', sassTask);
