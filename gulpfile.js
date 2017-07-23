var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var sass = require('gulp-sass');

gulp.task('browser-sync-init', function() {
    browserSync.init({
        server: {
            baseDir: ".",
            index: "index.html"
        }
    });
});

gulp.task('auto-reload', function () {
    browserSync.reload();
});

gulp.task('pug-compile', () => {
  return gulp.src(['./*.pug'])
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('scss-compile', function(){
  gulp.src('./*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['browser-sync-init'], function () {
    gulp.watch("*.pug", ['pug-compile']);
    gulp.watch("*.scss", ['scss-compile']);
    gulp.watch("*.html", ['auto-reload']);
    gulp.watch("*.css", ['auto-reload']);
    gulp.watch("*.js", ['auto-reload']);
});