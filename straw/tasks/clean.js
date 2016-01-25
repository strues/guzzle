import gulp from 'gulp';
import del from 'del';
import cache from 'gulp-cache';
import runSequence from 'run-sequence';
import config from '../../config.js';

const { buildDir, distDir } = config.dir;

gulp.task('clean', (cb) => {
  runSequence(['clean:clear-cache', 'clean:build'], cb);
});

gulp.task('clean:build', () => {
  del(buildDir + '**/*', {
    force: true
  });
});

gulp.task('clean:dist', () => {
  del(distDir + '**/*', {
    force: true
  });
});

gulp.task('clean:clear-cache', function () {
    return cache.clearAll();
});
