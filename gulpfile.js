
 const { src, dest, task, series, watch, parallel } = require("gulp");
 const rm = require('gulp-rm');
 const sass = require('gulp-sass');
 const concat = require('gulp-concat');
 const browserSync = require('browser-sync').create();
 const reload = browserSync.reload;
 const sassGlob = require('gulp-sass-glob');
 const autoprefixer = require('gulp-autoprefixer');
 const px2rem = require('gulp-smile-px2rem');
 const gcmq = require('gulp-group-css-media-queries');
 const cleanCSS = require('gulp-clean-css');
 const sourcemaps = require('gulp-sourcemaps');
 const babel = require('gulp-babel');
 const uglify = require('gulp-uglify');
 const svgo = require('gulp-svgo');
 const svgSprite = require('gulp-svg-sprite');
 const gulpif = require('gulp-if');
  
const env= process.env.NODE_ENV;

 const {DIST_PATH, STYLES_LIBS, JS_LIBS, SRC_PATH} = require('./gulp.config');
 
 sass.compiler = require('node-sass');
  
 task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false })
    .pipe(rm())
 })
  
 task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 })
  
//  const styles = [
//   'node_modules/normalize.css/normalize.css',
//  ];
  
 task('sass', () => {
  return src([`${SRC_PATH}/scss/main.scss`])
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(`${SRC_PATH}/scss/main.min.css`))
    .pipe(reload({ stream: true }));
 });

 task('styles', () => {
  return src([...STYLES_LIBS, `${SRC_PATH}/scss/main.min.css`])
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    // .pipe(px2rem())
    .pipe(gulpif(env == "dev", 
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
      })
    ))
    .pipe(gulpif(env == 'prod', gcmq()))
    .pipe(gulpif(env == 'prod', cleanCSS()))
    .pipe(gulpif(env == 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 });

//  const libs = [
//   'node_modules/jquery/dist/jquery.js',
//   'js/*.js'
//  ];

 task('scripts', () => {
  return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 });

 task('icons', () => {
   return src(`${SRC_PATH}/img/icons/*.svg`)
  //  .pipe(svgo({
  //    plugins: [
  //        {
  //          removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)" }
  //        }
  //      ]
  //   })
  //  )
  //  .pipe(svgSprite({
  //    mode: {
  //      symbol: {
  //        sprite: "../sprite.svg"
  //      }
  //    }
  //  }))
   .pipe(dest(`${DIST_PATH}/img/icons`));
 });

 task('decor', () => {
  return src(`${SRC_PATH}/img/decor/*`)
    .pipe(dest(`${DIST_PATH}/img/decor`));
  }
 )
  
 task('reviews', () => {
  return src(`${SRC_PATH}/img/reviews/*`)
    .pipe(dest(`${DIST_PATH}/img/reviews`));
  }
 )

 task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
 });
  
task("watch", () => {
  watch(`${SRC_PATH}/scss/components/**/*.scss`, series('sass','styles'));
  watch(`${SRC_PATH}/scss/layout/**/*.scss`, series('styles'));
  watch(`${SRC_PATH}/*.html`, series('copy:html'));
  watch(`${SRC_PATH}/js/*.js`, series('scripts'));
  watch(`${SRC_PATH}/img/icons/*.svg`, series('icons'));
});

 task(
   'default', 
   series('clean', 
   parallel('copy:html', 'styles', 'scripts', 'icons', 'decor', 'reviews'),
   parallel('watch', 'server')
   )
 );
 
task('build',
series('clean', 
parallel('copy:html', 'styles', 'scripts', 'icons', 'decor', 'reviews'))
);