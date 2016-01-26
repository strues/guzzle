import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cached';
import newer from 'gulp-newer';
import { argv } from 'yargs';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config from '../../config.js';
import Logger from '../utils/logger';

const { srcDir, buildDir, distDir, cssDir, imgDir } = config.dir;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

gulp.task('images', () => {
  Logger.task('RUNNING TASK: Images');
  return gulp.src([srcDir + imgDir + '**'])
    .pipe(newer(destDir + imgDir))
    .pipe(cache('img'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{cleanupIDs: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(destDir + imgDir));
});
