var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

// outputs changes to files to the console
function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('browser-sync', ['build', 'nodemon'], function() {
  browserSync.init({
    proxy: 'http://localhost:5000',
    port: 9000,
    browser: ['google-chrome']
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js'
  })
  .on('start', function onStart() {
    if (!called) {
      cb();
    }
    called = true;
  })
  .on('restart', function onRestart() {

    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, 500);
  });
});

gulp.task('watch-sync', ['nodemon', 'browser-sync'], function() {
  gulp.watch(paths.source, ['build-system', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.style, ['build-style', browserSync.reload]).on('change', reportChange);
});

gulp.task('watch', ['nodemon'], function() {
  gulp.watch(paths.source, 'build-system').on('change', reportChange);
  gulp.watch(paths.html, 'build-html').on('change', reportChange);
  gulp.watch(paths.style, 'build-style').on('change', reportChange);
});