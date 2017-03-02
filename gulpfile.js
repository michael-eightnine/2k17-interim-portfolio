var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var injectPartials = require('gulp-inject-partials');
var injectSvg = require('gulp-inject-svg');
var rename = require('gulp-rename');

//scss
gulp.task('sass', function(){
	return gulp.src('site/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			 browsers: ['last 7 versions']
		}))
		.pipe(gulp.dest('site/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

//minify from index imports
gulp.task('useref', function(){
	return gulp.src('site/index.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

//inject svgs and partials
gulp.task('generateDOM', function(){
	return gulp.src('site/html/main.html')
     .pipe(injectPartials())
		//  .pipe(injectSvg())
		 .pipe(rename('index.html'))
     .pipe(gulp.dest('site'))
		 .pipe(browserSync.reload({
 			stream: true
 		}));
})

//clean
gulp.task('clean:dist', function() {
	return del.sync('dist');
})

//browserSync
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'site'
		}
	})
})

//watch
gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch(['site/scss/*.scss', 'site/scss/**/*.scss'], ['sass']);
	gulp.watch(['site/*.html', 'site/html/**/*.html'], ['generateDOM']);
	gulp.watch(['site/js/*.js', 'site/js/**/*.js'], browserSync.reload);
})

//build only tasks start

//optimize images for build
gulp.task('images', function(){
	return gulp.src('site/img/**/*.+(png|jpg|gif|svg)')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
});

//BUILD!
gulp.task('build', function(callback) {
	runSequence(
		'clean:dist',
		'generateDOM',
		'sass',
		'useref',
		['images'],
		callback
	)
})

//default
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})
