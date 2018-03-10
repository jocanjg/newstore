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

/////***** ====================================== END IMPORTING PACKAGES ======================================= *****/////



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
gulp.task('watch:styles', function(){
  gulp.watch('**/*.css', ['styles']);
});

/////***** ====================================== END WATCH COMMANDS ========================================= *****/////


// ===== write method to first compile files with gulp, watch over them and than lint through them ===== //
gulp.task('build', ['sass', 'styles', 'watch:styles', 'watch']);

// for compilation for the first argument inside build task can be specified either 'compass' or 'sass'
