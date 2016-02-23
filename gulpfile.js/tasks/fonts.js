import gulp from 'gulp';
import { argv } from 'yargs';
import Fontmin from 'fontmin';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config, { DIST_DIR, BUILD_DIR } from '../config.js';
import Logger from '../utils/logger';

const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? DIST_DIR : BUILD_DIR;

gulp.task('fonts', () => {
  Logger.task('RUNNING TASK: Fonts');
  let fontmin = new Fontmin()
    .src(config.fonts.src + '/*.ttf')
    .use(Fontmin.ttf2eot({
      clone: true
    }))
    .use(Fontmin.ttf2woff({
      clone: true
    }))
    .use(Fontmin.ttf2svg({
      clone: true
    }))
    .dest(destDir + '/fonts');

  return fontmin.run(
    function(err, files, stream) {
      if (err) {
        console.log(err);
      }
    }
  );
});
