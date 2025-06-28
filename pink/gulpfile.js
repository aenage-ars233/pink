import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import webp from 'gulp-webp';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML

export const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

//Script

export const script = () => {
  return gulp.src('source/js/menu.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js/'));
}

//Images

export const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg, png, svg}')
    .pipe(gulp.dest('build/img/'));
}

//Webp

export const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg, png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img/'));
}

//Copy

export const copy = () => {
  return gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/img/favicons/*.{png, svg}'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', gulp.series(browser.reload, html));
}

//Build

export const build = gulp.series(
  copy,
  gulp.parallel(
    styles,
    html,
    script,
    copyImages,
    createWebp
  )
);


export default gulp.series(
  html, styles, script, copyImages, createWebp, copy, server, watcher
);
