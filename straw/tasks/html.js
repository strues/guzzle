import gulp from 'gulp';
import cache from 'gulp-cached';
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

gulp.task('html', () => {
  gulp.src(srcDir + '*.html')
    .pipe(cache('html'))
    .pipe(gulp.dest(destDir));
});
