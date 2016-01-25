import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
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

gulp.task('images', () => {
  gulp.src([srcDir + imgDir + '**'])
    .pipe(cache('img'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(destDir + imgDir));
});
