var paths = {
  src: {
    base: './src',
    html: [
      './src/index.html'
    ],
    scss: [
      './src/scss/_variables.scss',
      './src/scss/modules/*.scss',
      './src/scss/styles.scss'
    ],
    vendorcss: [
      './src/css/vendor/*.css'
    ],
    js: [
      './src/js/modules/polyfills.js',
      './src/js/modules/animate.js',
      './src/js/modules/wordsToFind.js',
      './src/js/modules/Tutorial.js',
      './src/js/modules/StatusMessage.js',
      './src/js/modules/timer.js',
      './src/js/scripts.js'
    ],
    img: [
      './src/img/**/*.*'
    ],
    fonts: [
      './src/fonts/**/*.*'
    ]
  },
  dev: {
    base: './dev/',
    html: './dev/',
    css: './dev/css/',
    js: './dev/js/',
    img: './dev/img/',
    fonts: './dev/fonts/'
  },
  dist: {
    base: './dist/',
    html: './dist/',
    css: './dist/css/',
    js: './dist/js/',
    img: './dist/img/',
    fonts: './dist/fonts/'
  }
};

var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var htmlreplace = require('gulp-html-replace');
var imagemin = require('gulp-imagemin');

gulp.task('default', ['dev-serve'], function() {});

gulp.task('dev-serve',['dev-watch'], function() {
  browserSync({
    server: {
      baseDir: paths.dev.base
    },
    notify: false
  });
});

gulp.task('dev-watch', function() {
  gulp.watch(paths.src.html, ['dev-html']);
  gulp.watch(paths.src.scss, ['dev-scss']);
  gulp.watch(paths.src.js, ['dev-js']);
  gulp.watch(paths.src.img, ['dev-img']);
  gulp.watch(paths.src.fonts, ['dev-copy-unchanged']);
});

gulp.task('dev-build', ['dev-scss', 'dev-js', 'dev-html', 'dev-img', 'dev-copy-unchanged']);

gulp.task('dev-js', function() {
  return gulp.src(paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dev.js))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('dev-scss', function() {
  return gulp.src(paths.src.scss)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(rename('bundle.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.dev.css))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('dev-html', function() {
  return gulp.src(paths.src.html)
    .pipe(htmlreplace({
        'css': 'css/bundle.css',
        'js': 'js/bundle.js'
    }))
    .pipe(gulp.dest(paths.dev.html))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('dev-img', function() {
  return gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.dev.img))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('dev-copy-unchanged', function() {
  /*copy fonts*/
  gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dev.fonts));
  /*copy favicon*/
  gulp.src(paths.src.base + '/favicon.ico')
    .pipe(gulp.dest(paths.dev.base))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('dev-clean', function() {
  return del(paths.dev.base);
});

/*
======         Production tasks       ==========
*/
gulp.task('dist-img', function() {
  return gulp.src(paths.src.img)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 2}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest(paths.dist.img));
});
