/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
	nodemon = require('gulp-nodemon'),
	sourcemaps = require('gulp-sourcemaps'),
	concatCss = require('gulp-concat-css'),
	sass = require('gulp-sass'),
	cleanCss = require('gulp-clean-css'),
	livereload = require('gulp-livereload'),
	notifier = require('node-notifier'),
	exec = require('child_process').exec;

function runCommand(command) {
	return function (cb) {
		exec(command, function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
		});
	}
}

// define the default task and add the watch task to it
gulp.task('default', ['start-app']);

gulp.task('start-app', runCommand('node server.js'));


// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	livereload.listen();
    gulp.watch('*.scss', ['concatCss']);
	gulp.watch('src/css/*.scss', ['concatCss']);
	gulp.watch('src/**/*.scss', ['concatCss']);
	gulp.watch('src/**/**/*.html', ['copyViews']);
	gulp.watch('src/**/**/*.handlebars', ['copyViews']);
});


gulp.task('concatCss', function () {
	console.log('*******-CONCATENATING CSS-*******')
  	return gulp.src(['src/*.scss','src/**/*.scss'])
  		.pipe(sass().on('error', sass.logError))
	    .pipe(concatCss("styles.css"))
	    .pipe(cleanCss({compatibility: 'ie8'}))
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest('./public/css/'))
	    .pipe(livereload());
});

gulp.task('copyViews', function(){
	console.log('*******-COPYING VIEWS-*******')
	return gulp.src(['src/**/*.html', 'src/*.html', 'src/**/*.handlebars', 'src/*.handlebars' ], {base: 'src'})
		.pipe(gulp.dest('./public/views/'))

});

gulp.task('dev', ['watch', 'concatCss', 'copyViews'], function() {
	nodemon({
		script: 'server.js',
	})
    .on('restart', function () {
		console.log('*******-RESTART-*******')
    })
});
