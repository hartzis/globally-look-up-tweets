var gulp = require('gulp'),
  uglify = require('gulp-uglifyjs'),
  watch = require('gulp-watch'),
  del = require('del'),
  jade = require('gulp-jade');

// setup angular app paths
var paths = {
  angular: ['public/js/src/app.js', 'public/js/src/**/*.js'],
  minifiedLocation: 'public/js/min',
  views: {
    jade: ['./views/**/*.jade', '!./views/about.jade', '!./views/layout.jade', '!./views/welcome.jade'],
    html: './public/html'
  }
};

// clean old version of minified/uglified app
gulp.task('clean-angularApp', function (cb) {
  del([paths.minifiedLocation+'/*.*'], cb);
})

// clean old version of minified/uglified app
gulp.task('clean-templates', function (cb) {
  del([paths.views.html+'/**/*.*'], cb);
})

// compile jade templates to public/html
gulp.task('templates', ['clean-templates'], function() {
  return gulp.src(paths.views.jade)
    .pipe(jade())
    .pipe(gulp.dest(paths.views.html))
})

// setup uglify of angular app
gulp.task('angularApp', ['clean-angularApp'], function () {
    return gulp.src(paths.angular)
    .pipe(uglify('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest(paths.minifiedLocation));
})

// watch task setup
gulp.task('start-watch', function () {
  gulp.watch(paths.angular, ['angularApp']);
  gulp.watch(paths.views.jade, ['templates'])
})

// watch procedure
gulp.task('watch', ['start-watch', 'angularApp', 'templates'])

// default task with no watch
gulp.task('default', ['angularApp', 'templates'])

