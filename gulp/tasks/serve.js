import gulp from 'gulp';
import electronConnect from 'electron-connect';
import config from '../config';

let electron = electronConnect.server.create({
  path: `${process.cwd()}/${config.common.distDir}/`
});

gulp.task('serve', () => {
  electron.start();
  // MainProcess が読み込むリソースが変更されたら, Electron自体を再起動
  gulp.watch(
    [
      config.main.distDir + '/**/*.js'
    ],
    electron.restart);
  // RendererProcess が読み込むリソースが変更されたら, RendererProcess に reload させる
  gulp.watch(
    [
      config.render.html.distDir + '/**/*.html',
      config.render.js.distDir + '/**/*.js',
    ],
    electron.reload);
});