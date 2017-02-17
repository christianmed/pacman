var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    pref = require('gulp-autoprefixer'),
    brow = require('browser-sync').create(),
    reload = brow.reload;

var src = {
  pug: './dev/views/',
  scss: './dev/scss/',
  html: './dist/',
  css: './dist/css/'
};

var pugOptions = {
  pretty: true
};

var sassOptions = {
  outputStyle: 'nested'
};

var prefOptions = {
  browsers: 'last 5 versions',
  cascade: true
};

gulp.task('pug', function() {
  return gulp.src(src.pug + '*.pug')
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(src.html));
});

gulp.task('styles', function() {
  return gulp.src(src.scss + '*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(pref(prefOptions))
    .pipe(gulp.dest(src.css))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['pug', 'styles'], function() {
  brow.init({server: src.html});

  gulp.watch(src.pug + '**/*.pug', ['pug']);
  gulp.watch(src.scss + '**/*.scss', ['styles']);
  gulp.watch(src.html + '*.html').on('change', reload);
});
