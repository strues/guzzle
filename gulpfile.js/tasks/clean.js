import gulp from 'gulp';
import del from 'del';
import cache from 'gulp-cache';
import runSequence from 'run-sequence';
import { ROOT_DIR, BASE_DIR, BUILD_DIR, DIST_DIR } from '../config.js';

gulp.task('clean', (cb) => {
  runSequence(['clean:clear-cache', 'clean:build'], cb);
});

gulp.task('clean:build', () => {
  del(BUILD_DIR, {
    force: true
  });
});

gulp.task('clean:dist', () => {
  del(DIST_DIR, {
    force: true
  });
});

gulp.task('clean:clear-cache', function() {
  return cache.clearAll();
});
