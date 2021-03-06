import gulp from 'gulp';
import browserSync, { reload } from 'browser-sync';
import gulpIf from 'gulp-if';
import path from 'path';
import sourcemaps from 'gulp-sourcemaps';
import { argv } from 'yargs';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
// Guzzle
import handleErrors from '../utils/handleErrors';
import config, { DIST_DIR, BUILD_DIR } from '../config.js';
import Logger from '../utils/logger';

const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? DIST_DIR : BUILD_DIR;

gulp.task('scripts', () => {
  let entry = {};
  config.javascript.entry.map(item => {
    entry = {...entry, [item]: `${config.javascript.src}/${item}`
    };
  });
  Logger.task('RUNNING TASK: Scripts');
  return gulp.src(config.javascript.src + '/*.js')
    .pipe(webpackStream({
      devtool: 'source-map',
      entry: entry,
      output: {
        path: config.javascript.build,
        filename: '[name]'
      },
      resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
          'node_modules',
          'src/js/',
          'src/js/vendors',
          'src/js/utils'
        ]
      },
      watch: stream,
      module: {
        loaders: [{
          loader: 'babel-loader',
          query: config.javascript.babel,
          exclude: [
            path.resolve(__dirname, 'node_modules/'),
            path.resolve(__dirname, 'src/js/vendors/')
          ],
        }]
      },
      plugins: [
        new webpack.NoErrorsPlugin()
      ].concat(
        production ? [
          new webpack.optimize.UglifyJsPlugin(),
        ] : []
      )
    }))
    .pipe(gulp.dest(destDir + '/js'));
});
