//dependencies

var gulp = require('gulp'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

//files and destinations

var inputSass ="./css/styles.sass",
    inputJS = './js/*.js',
    inputCSS = './css/*.css',
    outputCSS ="./css",
    outputNameCSS ="styles.css",
    outputDist ="./dist",
    urlProject ='http://localhost/gulp-sass';

// min js task
gulp.task('distJS', function(){

  gulp.src(inputJS)
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest("./dist"));

});

// min css task
gulp.task('distCSS', function(){

  gulp.src(inputCSS)
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename('styles.min.css'))
  .pipe(gulp.dest(outputDist));

});

// sass compile to css task, and browser reload
gulp.task('sass', function(){
  return gulp
  .src(inputSass)
  .pipe(sass().on('error', sass.logError))
  .pipe(rename(outputNameCSS))
  .pipe(gulp.dest(outputCSS))
  .pipe(browserSync.stream());
});

//proxy option with an existing localhost

gulp.task('server', function() {
  browserSync.init({
     proxy: urlProject
  });
  gulp.watch(inputSass, ['sass']);
  gulp.watch("./*.html")
      .on('change', browserSync.reload);
  gulp.watch("./js/*.js")
      .on('change', browserSync.reload);
});

// min JS task, run >gulp minJS
gulp.task('minJS', ['distJS']); 

// min CSS task, run >gulp minCSS
gulp.task('minCSS', ['distCSS']); 

// default task, only run >gulp
gulp.task('default', ['server']); 