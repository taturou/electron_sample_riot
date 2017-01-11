import gulp from 'gulp';
import riot from 'gulp-riot';
import sass from 'node-sass';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import del from 'del';
import runSequence from 'run-sequence';

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

gulp.task('clean', ['clean-temp', 'clean-dist']);
