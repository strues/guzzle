import gulp from 'gulp';
import watch from 'gulp-watch';
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

gulp.task('dev', ['clean'], () => {
  gulp.start('fonts', 'sass', 'images', 'scripts', 'html');

  if (stream) {
    gulp.start('browsersync');
    watch(srcDir + sassDir + '**/*.scss', () => gulp.start('sass'));
    watch(srcDir + imgDir + '*', () => gulp.start('images'));
    watch(srcDir + '*.html', () => gulp.start('html'));
  }
});
