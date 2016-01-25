import gulp from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import config from '../../config.js';
import {
  argv
}
from 'yargs';
const {
  srcDir, buildDir, distDir, cssDir, imgDir, sassDir, fontsDir, jsDir
} = config.dir;

const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;
gulp.task('fonts', () => {

  // ttf to woff
  gulp.src(srcDir + 'fonts/**/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest(destDir + fontsDir));

  // ttf to woff2
  gulp.src(srcDir + 'fonts/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest(destDir + fontsDir));

});
