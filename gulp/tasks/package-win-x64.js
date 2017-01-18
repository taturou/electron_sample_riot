import gulp from 'gulp';
import runSequence from 'run-sequence';
import electronPackager from 'electron-packager';
import config from '../config';

gulp.task('package-win-x64', (callback) => {
  return runSequence(
    `build`,
    `package-win-x64-do`,
    callback);
});

gulp.task('package-win-x64-do', (callback) => {
  return electronPackager({
    dir: config.release.appDir,
    out: config.release.releaseDir,
    name: 'ElectronApp',
    arch: 'x64',
    platform: 'win32',
    version: config.release.electronVersion,
    overwite: true,
    asar: true,
    ignore: '.map'
  },
  function (err, path) {
    // 追加でパッケージに手を加えたければ, path配下を適宜いじる
    callback();
  });
});
