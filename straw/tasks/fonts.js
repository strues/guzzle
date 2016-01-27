import gulp from 'gulp';
import { argv } from 'yargs';
import Fontmin from 'fontmin';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config from '../../config.js';
import Logger from '../utils/logger';

const { srcDir, buildDir, distDir, imgDir, fontsDir} = config.dir;
const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

gulp.task('fonts', () => {
  Logger.task('RUNNING TASK: Fonts');
  let fontmin = new Fontmin()
    .src(`${srcDir}/fonts/*.ttf`)
    .use(Fontmin.ttf2eot({
      clone: true
    }))
    .use(Fontmin.ttf2woff({
      clone: true
    }))
    .use(Fontmin.ttf2svg({
      clone: true
    }))
    .dest(destDir + fontsDir);

  return fontmin.run(
    function(err, files, stream) {
      if (err) {
        console.log(err);
      }
    }
  );
});
