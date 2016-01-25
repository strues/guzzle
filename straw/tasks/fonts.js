import gulp from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import { argv } from 'yargs';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config from '../../config.js';
import Logger from '../utils/logger';

const { srcDir, buildDir, distDir, imgDir, fontsDir} = config.dir;
const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

gulp.task('fonts', () => {
  Logger.task('RUNNING TASK: Fonts');
  // ttf to woff
  gulp.src(srcDir + 'fonts/**/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest(destDir + fontsDir));

  // ttf to woff2
  gulp.src(srcDir + 'fonts/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest(destDir + fontsDir));

});
