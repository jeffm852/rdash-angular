<<<<<<< HEAD
var gulp    = require('gulp'),
  less      = require('gulp-less'),
  wrap      = require('gulp-wrap'),
  watch     = require('gulp-watch'),  
  concat    = require('gulp-concat'),
  insert    = require('gulp-insert'),
  uglify    = require('gulp-uglify'), 
  connect   = require('gulp-connect'),
  cssmin    = require('gulp-minify-css'),
  templates = require('gulp-angular-templates');

var vendors = [
  'src/bower_components/angular/angular.js',
  'src/bower_components/angular-cookies/angular-cookies.js',
  'src/bower_components/angular-bootstrap/ui-bootstrap.js',
  'src/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  'src/bower_components/angular-ui-router/release/angular-ui-router.js',
];

var styles = [
  'src/bower_components/bootstrap/dist/css/bootstrap.css',
  'src/bower_components/font-awesome/css/font-awesome.css',
  'src/less/dashboard/variables.less',
  'src/less/dashboard/mixins.less',
  'src/less/dashboard/main.less',
  'src/less/dashboard/loading.less',
  'src/less/dashboard/content.less',
  'src/less/dashboard/header.less',
  'src/less/dashboard/sidebar.less',
  'src/less/dashboard/widgets.less',
  'src/less/dashboard/hamburg.less',
];

var fonts = [
  'src/fonts/**.*',
  'src/bower_components/bootstrap/dist/fonts/*.{ttf,woff,eof,svg}',
  'src/bower_components/font-awesome/fonts/*.{ttf,woff,eof,svg}'
];

var paths = {
  js: ['src/js/**/*.*', 'dist/js/templates.js'],
  files: ['src/index.html'],
  images: 'src/img/**/*.*',
  templates: 'src/templates/**/*.html',
  fonts: fonts,
  styles: styles,
  vendors: vendors
};

// The name of the Angular module which will be injected into the templates.
var moduleName = 'Dashboard';

// Minify and copy all 3rd party libs to vendors.min.js 
gulp.task('copy-vendors', function() {
  return gulp.src(paths.vendors)
    .pipe(uglify())
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// Minify and copy all dashboard script files to dashboard.min.js
gulp.task('copy-scripts', function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('dashboard.min.js'))
    .pipe(insert.prepend('\'use strict\';'))
    .pipe(gulp.dest('dist/js'));
});

// Minify and copy all angular templates to templates.min.js
gulp.task('copy-templates', function() {
  return gulp.src(paths.templates)
    .pipe(templates({module: moduleName}))
    .pipe(uglify())
    .pipe(concat('templates.min.js'))
    .pipe(insert.prepend('\'use strict\';'))
    .pipe(gulp.dest('dist/js'));
});

// Copy all static/HTML files to output directory
gulp.task('copy-files', function(){
  return gulp.src(paths.files)
    .pipe(gulp.dest('dist'));
});

// Copy all images to output directory
gulp.task('copy-images', function(){
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/img'));
});

// Copy all fonts to output directory
gulp.task('copy-fonts', function(){
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('dist/fonts'));
});

// Compile less styles into dashboard.css
gulp.task('compile-less', function(){
  return gulp.src(paths.styles)
      .pipe(less())
      .pipe(cssmin())
      .pipe(concat('dashboard.min.css'))
      .pipe(gulp.dest('dist/css'));
=======
var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html');

var paths = {
    scripts: 'src/js/**/*.*',
    styles: 'src/less/**/*.*',
    images: 'src/img/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}',
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
>>>>>>> rdash/master
});

/**
 * Watch custom files
 */
<<<<<<< HEAD
gulp.task('watch', function () {
  gulp.watch(paths.vendors, ['copy-vendors']);
  gulp.watch(paths.js, ['copy-scripts']);
  gulp.watch(paths.templates, ['copy-templates']);
  gulp.watch(paths.files, ['copy-files']);
  gulp.watch(paths.images, ['copy-images']);
  gulp.watch(paths.fonts, ['copy-fonts']);
  gulp.watch(paths.styles, ['compile-less']);
=======
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
>>>>>>> rdash/master
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['dist/**/*.*'])
        .pipe(watch())
        .pipe(connect.reload());
});

<<<<<<< HEAD
gulp.task('build', ['copy-vendors', 'copy-scripts', 'copy-templates', 'copy-files', 'copy-images', 'copy-fonts', 'compile-less']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
=======
/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
>>>>>>> rdash/master
