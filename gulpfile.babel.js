import gulp from 'gulp';
import { readdirSyncRecursive } from 'wrench';

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
readdirSyncRecursive('./straw/tasks/').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./straw/tasks/' + file);
});
