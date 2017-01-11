import gulp from 'gulp';
import riot from 'gulp-riot';
import sass from 'node-sass';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
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
  .pipe(gulp.dest('temp/'));
});

gulp.task('es6', () => {
  browserify({
    entries: ['src/index.js'],
    debug: true
  })
  .transform(babelify, { presets: ['es2015'] })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('clean-temp', (cb) => {
  del(['temp/'], cb);
});

gulp.task('clean-dist', (cb) => {
  del(['dist/'], cb);
});

gulp.task('build', (cb) => {
  return runSequence(
    'riot',
    'es6',
    cb
  );
});

gulp.task('watch', () => {
  gulp.watch(['./src/**/*.js', './src/**/*.tag.html'], ['build']);
})

gulp.task('clean', ['clean-temp', 'clean-dist']);

gulp.task('serve', function () {
  electron.start();
  // BrowserProcess(MainProcess)���ǂݍ��ރ��\�[�X���ύX���ꂽ��, Electron���̂��ċN��
  gulp.watch(['.main.js', '.serve/browser/**/*.js'], electron.restart);
  // RendererProcess ���ǂݍ��ރ��\�[�X���ύX���ꂽ��, RendererProcess �� reload ������
  gulp.watch(['dist/bundle.js'], electron.reload);
});

gulp.task('package:darwin', ['build'], (done) => {
  packager({
    dir: './',                // �A�v���̃f�B���N�g��
    out: 'release/darwin',    // .app �� .exe�̏o�͐�f�B���N�g��
    name: 'ElectronApp',      // �A�v���P�[�V������
    arch: 'x64',              // CPU���. x64 or ia32
    platform: 'darwin',       // OS���. darwin or win32 or linux
    version: '1.4.14'         // Electron �̃o�[�W����
  }, function (err, path) {
    // �ǉ��Ńp�b�P�[�W�Ɏ�������������, path�z����K�X������
    done();
  });
});
