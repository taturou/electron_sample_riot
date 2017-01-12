import gulp from 'gulp';
import riot from 'gulp-riot';
import sass from 'node-sass';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import del from 'del';
import runSequence from 'run-sequence';
import electronConnect from 'electron-connect';
import electronPackager from 'electron-packager';

let electron = electronConnect.server.create();

gulp.task('riot', () => {
  gulp.src(['src/**/*.tag.html'])
  .pipe(riot({
    type: 'es6',
    parsers: {
      /*
      js: {
        babelrc: false,
        presets: ['es2015-riot']
      },
      */
      css: {
        sass: function(tagName, css) {
          var result = sass.renderSync({
            data: css
          });
          return result.css.toString();
        },
      },
    },
  }))
  .pipe(gulp.dest('tmp/'));
});

gulp.task('javascript', () => {
  browserify({
    entries: ['src/index.js'],
    debug: true
  })
  .transform(babelify, { presets: ['es2015'] })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', gutil.log)
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('clean.tmp', (cb) => {
  del(['tmp/'], cb);
});

gulp.task('clean.dist', (cb) => {
  del(['dist/'], cb);
});

gulp.task('build', (cb) => {
  return runSequence(
    'riot',
    'javascript',
    cb
  );
});

gulp.task('watch', () => {
  gulp.watch(['./src/**/*.js', './src/**/*.tag.html'], ['build']);
})

gulp.task('clean', ['clean.tmp', 'clean.dist']);

gulp.task('serve', function () {
  electron.start();
  // BrowserProcess(MainProcess)が読み込むリソースが変更されたら, Electron自体を再起動
  gulp.watch(['.main.js', '.serve/browser/**/*.js'], electron.restart);
  // RendererProcess が読み込むリソースが変更されたら, RendererProcess に reload させる
  gulp.watch(['dist/bundle.js'], electron.reload);
});

gulp.task('package:darwin', ['build'], (done) => {
  packager({
    dir: './',                // アプリのディレクトリ
    out: 'release/darwin',    // .app や .exeの出力先ディレクトリ
    name: 'ElectronApp',      // アプリケーション名
    arch: 'x64',              // CPU種別. x64 or ia32
    platform: 'darwin',       // OS種別. darwin or win32 or linux
    version: '1.4.14'         // Electron のバージョン
  }, function (err, path) {
    // 追加でパッケージに手を加えたければ, path配下を適宜いじる
    done();
  });
});
