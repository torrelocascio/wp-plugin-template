/*
*  Gulp config file
*  @project plugin_title
*  Author: Your Name
*/

/**
* Gulp build config file.
*
* @link        http://example.com
* @since       1.0.0
*
* @package     plugin-name
* @Author      Your Name
*
*/

// NOTE: The following is just in case the base plugin package.json is missing dependencies:
// npm i --D gulp del gulp-concat gulp-sass gulp-csso gulp-autoprefixer gulp-sourcemaps gulp-uglify gulp-babel @babel/core@^8.0.0 @babel/plugin-proposal-object-rest-spread @babel/preset-env
const { src, dest, series, parallel } = require('gulp');
const del           = require('del');//
const concat        = require('gulp-concat');//
const sass          = require('gulp-sass');//
const csso          = require('gulp-csso');//
const autoprefixer  = require('gulp-autoprefixer');//
const sourcemaps    = require('gulp-sourcemaps');//
const uglify        = require('gulp-uglify');//
const babel         = require('gulp-babel');//

sass.compiler = require( 'node-sass' );


const liveFiles = [
  './**/*',
  '!./.git',
  '!./.gitattributes',
  '!./.gitignore',
  '!./README.md',
  '!./gulpfile.js',
  '!./webpack.*.*',

  '!./**/scss',
  '!./**/scss/**/*',

  '!./**/src',
  '!./**/src/**/*',

  '!./**/js',
  '!./**/js/**/*',
  './**/build/static/js',
  './**/build/static/js/**/*',

  '!./**/package*.*',
  '!./node_modules',
  '!./node_modules/**/*',
  '!./**/node_modules',
  '!./**/node_modules/**/*',


  // IN-PLUGIN REACT APP EXCLUSION:
  // '!./admin/my-app/node_modules/**/*',
  // '!./admin/my-app/public/**/*',
  // '!./admin/my-app/public',
  // '!./admin/my-app/src/**/*',
  // '!./admin/my-app/*.*',
];

// Target the folder to delete/replace:
const localInstall =   'C:/PATH/TO/LOCAL/INSTALL/wp-content/plugins/plugin-name-1.0.0';


// ***** Public File Handlers ***** //
function publicCSS() {
  return src([
    'public/**/*.scss',
    '!public/node_modules/**'
  ])     // Get everything Sassy.
  .pipe( sass().on( 'error', sass.logError ) )        // Transpile to CSS.
  .pipe( autoprefixer( {                              // Prefix for browser compatibility.
    browsers: [ 'last 2 versions' ]
  } ) )
  .pipe( sourcemaps.init() )                         // Start sourcemap processing.
  .pipe( concat( 'public.min.css' ) )                 // Combine all files into one.
  .pipe( csso() )                                   // Minify the CSS.
  .pipe( sourcemaps.write() )                        // Output sourcemap.
  .pipe( dest( './admin/public' ) )
}



// ***** Admin File Handlers ***** //
function adminCSS() {
  return src([
    'admin/**/*.scss',
    '!admin/node_modules/**'
  ])     // Get everything Sassy.
  .pipe( sass().on( 'error', sass.logError ) )        // Transpile to CSS.
  .pipe( autoprefixer( {                              // Prefix for browser compatibility.
    browsers: [ 'last 2 versions' ]
  } ) )
  .pipe( sourcemaps.init() )                         // Start sourcemap processing.
  .pipe( concat( 'admin.min.css' ) )                 // Combine all files into one.
  .pipe( csso() )                                   // Minify the CSS.
  .pipe( sourcemaps.write() )                        // Output sourcemap.
  .pipe( dest( './admin/build' ) )
}




function clean() {
  return del(localInstall, {force: true} );
};


// Copy files.
function copy() {
  return src( liveFiles )
  .pipe( dest( localInstall ) )
}



// Set the npm scripts:
exports.clean = clean
exports.copy = copy


exports.default = series(
  clean,
  parallel(
    publicCSS,
    // adminCSS,
  ),
  copy,
);
