'use-strict';
/////***** ====================================== BEGIN IMPORTING PACKAGAES ======================================= *****/////

var gulp = require('gulp');
var compass = require('gulp-compass');
var sass = require('gulp-sass');
//var sassLint = require('gulp-sass-lint');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring');
var SASS_FILES = ['./sass/**/*.scss'];
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

/////***** ====================================== END IMPORTING PACKAGES ======================================= *****/////


/////***** ====================================== BEGIN GROUPING JS FILES ======================================= *****/////

gulp.task('concat', function () {
    return gulp.src(['js/jquery.js', 'js/popper.min.js', 'js/bootstrap.min.js', 'js/dynamic-body-class.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js/grouped-js'))

});

/////***** ====================================== END GROUPING JS FILES ======================================= *****/////


/////***** ====================================== BEGIN MINIFI JS FILES ======================================= *****/////
gulp.task('uglify', function () {
    gulp.src('js/grouped-js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('js/minified-js'))
});
/////***** ====================================== END MINIFI JS FILES ======================================= *****/////


/////***** ====================================== BEGIN COMPILERS ======================================= *****/////

// ===== write method to compile sass (gulps method)===== //
gulp.task('sass', function () {
  return gulp.src(SASS_FILES)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dev-css'));
});

// ===== write method to get compass config.rb file and override it ===== //
gulp.task('compass', function() {
  gulp.src('./sass/main.scss')
    .pipe(compass({
      // ===== path to the config file of the project and his name ===== //
      // ===== (this is default name from generating project with command : compass create + nameOfProject) ===== //
      config_file: './config.rb',
      // ===== name of the folder where CSS will be compiled ===== //
      // ===== (this can be optional) ===== //
      css: 'dev-css',
      // ===== name of the folder where we write SASS ===== //
      // ===== (this can be optional) ===== //
      sass: 'sass',
      // ===== type of css output style ===== //
      output_style: 'expanded',
    // ===== what task our method will run aka (compass watch) ===== //
    task: 'watch'
    }))
    .pipe(gulp.dest('./tmp/main.css'));
});

/////***** ====================================== END COMPILERS ======================================= /*****/////


/////***** ====================================== BEGIN SOURCEMAPS ======================================= /*****/////

gulp.task('gulp-sourcemaps', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dev-css'));
});

/////***** ====================================== END SOURCEMAPS ======================================= /*****/////


/////***** ====================================== BEGIN LINTING ======================================= *****/////

// ===== write method to go through files with extenssion of ".scss" and ".sass" ===== //
// gulp.task('sass-lint', function() {
//   return gulp.src(SASS_FILES)
//     .pipe(sassLint({
//       // ===== specify in configFile where your configuration file is placed ===== //
//       configFile: './.sass-lint.yml'
//     }))
//     .pipe(sassLint.format());
// });

/////***** ====================================== END LINTING ========================================= *****/////


/////***** ====================================== BEGIN POSTCSS ========================================= *****/////

// ===== Adding styles method for runinng through main.css and POSTIFY css ===== //
gulp.task('styles', function(){
  var processors = [
     autoprefixer,
     csswring
  ];

  return gulp.src('./dev-css/main.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./prod-css'));
});

/////***** ====================================== END POSTCSS ========================================= *****/////


/////***** ====================================== BEGIN WATCH COMMANDS ========================================= *****/////

// ===== watch task to watch changes made to scss files ===== //
gulp.task('sass:watch', function () {
  gulp.watch(SASS_FILES, ['sass']);
});

// ===== write method to first compile files and than lint through them ===== //
gulp.task('watch', function() {
  gulp.watch(SASS_FILES, ['sass']);
});

// ===== gulp task to watch PostCSS processes (autoprefix,minifier) ==== //
gulp.task('styles:watch', function(){
  gulp.watch('**/*.css', ['styles']);
});

/////***** ====================================== END WATCH COMMANDS ========================================= *****/////


// ===== write method to first compile files with gulp, watch over them and than lint through them ===== //
gulp.task('build', ['sass','sass:watch','concat', 'uglify', 'styles', 'styles:watch', 'gulp-sourcemaps']);

// for compilation for the first argument inside build task can be specified either 'compass' or 'sass'
