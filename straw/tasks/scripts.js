import gulp from 'gulp';
import browserSync, {
  reload
}
from 'browser-sync';
import gulpIf from 'gulp-if';
import path from 'path';
import sourcemaps from 'gulp-sourcemaps';
import config from '../../config.js';
import {
  argv
}
from 'yargs';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const {
  srcDir, buildDir, distDir, cssDir, imgDir, sassDir, fontsDir, jsDir
} = config.dir;

const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

gulp.task('scripts', () => {
  let entry = {};
  config.javascript.entry.map(item => {
    entry = {...entry, [item]: `${config.dir.srcDir}${config.dir.jsDir}${item}`
    };
  });

  gulp.src(`${srcDir + jsDir}*.js`)
    .pipe(webpackStream({
      devtool: 'source-map',
      entry: entry,
      output: {
        path: destDir + config.dir.jsDir,
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
    .pipe(gulp.dest(destDir + jsDir));
});
