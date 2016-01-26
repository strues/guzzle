import gulp from 'gulp';
import { readdirSyncRecursive } from 'wrench';
import cfg from '../../config';
import pkg from '../../package.json';

global.config = Object.assign(cfg, cfg.dir);
global.pkg = pkg;

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
readdirSyncRecursive('./straw/tasks/').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./' + file);
});
