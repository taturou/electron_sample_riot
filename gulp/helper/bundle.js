import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import config from '../config';

let $ = gulpLoadPlugins();

module.exports = function(obj) {
  let bundler = browserify({
    entries: obj.entries,
    debug: true
  });

  if (obj.is_watch) {
    bundler = watchify(bundler);
  }

  function rebundle() {
    return bundler
      .transform(babelify, { presets: ['es2015'] })
      .bundle()
      .pipe($.plumber())
      .pipe(source(obj.source))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(obj.dest));
  }

  bundler.on('update', () => {
    rebundle();
    console.log('rebuild ' + obj.source);
  })

  bundler.on('log', $.util.log);

  return rebundle();
}