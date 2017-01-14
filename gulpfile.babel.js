import gulp from 'gulp';
import riot from 'gulp-riot';
import plumber from 'gulp-plumber';
import sass from 'node-sass';
import header from 'gulp-header';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import minify_html from 'gulp-minify-html';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import watchify from 'watchify';
import del from 'del';
import runSequence from 'run-sequence';
import electronConnect from 'electron-connect';
import electronPackager from 'electron-packager';

let electron = electronConnect.server.create({
  path: `${process.cwd()}/dist/`
});

/*************************************************
 * local tasks for package
 ************************************************/
/*
 * package.json を成果物フォルダにコピー
 */
gulp.task('package', () => {
  gulp.src(['src/package.json'])
  .pipe(gulp.dest('dist/'));
});

/*************************************************
 * local tasks for main
 ************************************************/
/*
 * js を成果物フォルダにコピー
 */
gulp.task('main.js', () => {
  gulp.src(['src/main/**/*.js'])
  .pipe(gulp.dest('dist/main/'));
});

/*************************************************
 * local tasks for render
 ************************************************/
/*
 * html を成果物フォルダにコピー
 */
gulp.task('render.html', () => {
  gulp.src(['src/render/**/*.html', '!src/render/**/*.tag.html'])
  .pipe(minify_html({ empty: true }))
  .pipe(gulp.dest('dist/render/'));
});

/*
 * riot のタグファイルを javascript に変換
 */
gulp.task('render.riot', () => {
  gulp.src(['src/render/**/*.tag.html'])
  .pipe(plumber())
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
  .pipe(header("import riot from 'riot';\n"))
  .pipe(gulp.dest('tmp/render/'));
});

/*
 * javascript を作業用フォルダにコピー
 */
gulp.task('render.js', () => {
  gulp.src(['src/render/**/*.js'])
  .pipe(gulp.dest('tmp/render/'));
});

/*
 * bundle (build用)
 */
gulp.task('render.bundle', () => {
  jsbundler(false);
});

/*
 * bundle (watch用)
 */
gulp.task('render.bundle.watch', () => {
  jsbundler(true);
});

function jsbundler(is_watch) {
  let bundler = browserify({
    entries: ['tmp/render/js/main.js'],
    debug: true
  });

  if (is_watch) {
    bundler = watchify(bundler);
  }

  function rebundle() {
    return bundler
      .transform(babelify, { presets: ['es2015'] })
      .bundle()
      .pipe(plumber())
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/render/js/'));
  }

  bundler.on('update', () => {
    rebundle();
  })
  bundler.on('log', gutil.log);

  return rebundle();
}

/*
 * 一時ファイルを削除
 */
gulp.task('clean.tmp', (cb) => {
  del(['tmp/'], cb);
});

/*
 * bundle.js を削除
 */
gulp.task('clean.dist', (cb) => {
  del(['dist/'], cb);
});

/*************************************************
 * global tasks
 ************************************************/
/*
 * bundle.js を作成
 */
gulp.task('build', (cb) => {
  return runSequence(
    'package',
    'main.js',
    'render.html',
    'render.riot',
    'render.js',
    'render.bundle',
    cb
  );
});

/*
 * コードが修正されたら自動的に bundle.js を作成
 */
gulp.task('watch', ['render.bundle.watch'], () => {
  gulp.watch(['./src/package.json'], ['package']);
  gulp.watch(['./src/main/**/*.js'], ['main.js']);
  gulp.watch(['./src/render/**/*.html'], ['render.html']);
  gulp.watch(['./src/render/**/*.tag.html'], ['render.riot']);
  gulp.watch(['./src/render/**/*.js'], ['render.js']);
})

/*
 * 一時ファイル、bundle.js を削除
 */
gulp.task('clean', ['clean.tmp', 'clean.dist']);

/*
 * electron を起動
 */
gulp.task('serve', function () {
  electron.start();
  // BrowserProcess(MainProcess)が読み込むリソースが変更されたら, Electron自体を再起動
  gulp.watch(['dist/main/**/*.js'], electron.restart);
  // RendererProcess が読み込むリソースが変更されたら, RendererProcess に reload させる
  gulp.watch(['dist/render/**/*.html', 'dist/render/**/*.js'], electron.reload);
});

/*
 * electron パッケージ化 (macOS)
 */
gulp.task('package.mac', ['build'], (done) => {
  electronPackager({
    dir: 'dist/',             // アプリのディレクトリ
    out: 'release/mac',       // .app や .exeの出力先ディレクトリ
    name: 'ElectronApp',      // アプリケーション名
    arch: 'x64',              // CPU種別. x64 or ia32
    platform: 'darwin',       // OS種別. darwin or win32 or linux
    version: '1.4.14',        // Electron のバージョン
    overwite: true,
    asar: true
  }, function (err, path) {
    // 追加でパッケージに手を加えたければ, path配下を適宜いじる
    done();
  });
});

/*
 * electron パッケージ化 (Windows)
 */
gulp.task('package.win', ['build'], (done) => {
  electronPackager({
    dir: 'dist/',             // アプリのディレクトリ
    out: 'release/win',       // .app や .exeの出力先ディレクトリ
    name: 'ElectronApp',      // アプリケーション名
    arch: 'all',              // CPU種別. x64 or ia32
    platform: 'win32',        // OS種別. darwin or win32 or linux
    version: '1.4.14',        // Electron のバージョン
    overwite: true,
    asar: true
  }, function (err, path) {
    // 追加でパッケージに手を加えたければ, path配下を適宜いじる
    done();
  });
});