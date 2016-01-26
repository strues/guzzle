import gulp from 'gulp';

gulp.task('build', ['clean:dist'], () => {
  gulp.start('sass', 'images', 'scripts', 'html');
});
