import gulp from 'gulp';
import base64 from 'gulp-base64';
import browserSync, { reload } from 'browser-sync';
import gutil from 'gulp-util';
import gulpIf from 'gulp-if';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import { argv } from 'yargs';
// PostCSS Plugins
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import csswring from 'csswring';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config from '../../config.js';
import Logger from '../utils/logger';

const { srcDir, buildDir, distDir, cssDir, sassDir } = config.dir;
const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

let processors, envDev = config.args.env === 'dev';
// Processors
if (config.args.env === 'dev') {
  processors = [
    autoprefixer({
      browsers: config.browsers
    })
  ];
} else {
  processors = [
    autoprefixer({
      browsers: config.browsers
    }),
    mqpacker(),
    csswring({
      preserveHacks: true,
      removeAllComments: true
    }),
    cssnano()
  ];
}

gulp.task('sass', () => {
  Logger.task('RUNNING TASK : styles');
  return gulp.src(srcDir + sassDir + '*.scss')
    .pipe(sass.sync().on('error', handleErrors))
    .pipe(postcss(processors))
    .pipe(gulpIf(stream, sourcemaps.write('.')))
    .pipe(envDev ? gutil.noop() : header(config.banner))
    .pipe(envDev ? gutil.noop() : rename({
      suffix: '.min'
    }))
    .pipe(gulpIf(production, base64({
      extensions: ['svg', 'png', 'jpg']
    })))
    .pipe(gulp.dest(destDir + cssDir))
    .pipe(gulpIf(stream, reload({
      stream
    })));
});
