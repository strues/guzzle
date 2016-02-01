import gulp from 'gulp';

gulp.task('build', ['clean:dist'], () => {
  gulp.start('fonts', 'sass', 'images', 'scripts', 'html');
});
