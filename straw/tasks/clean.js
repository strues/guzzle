import gulp from 'gulp';
import del from 'del';
import config from '../../config.js';
const {
  srcDir, buildDir, distDir, cssDir, imgDir, sassDir, fontsDir, jsDir
} = config.dir;

gulp.task('clean', () => del(buildDir + '**/*', {
  force: true
}));

gulp.task('clean-dist', () => {
  del(distDir + '**/*', {
    force: true
  });
});
