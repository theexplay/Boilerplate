'use strict';

var gulp = require('gulp'),
	jade = require('jade'),
	jadeGulp = require('gulp-jade'),
	jadeInheritance = require('gulp-jade-inheritance'),
	data = require('gulp-data'),
	htmlPrettify = require('gulp-prettify'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb'),
	cssmin = require('gulp-clean-css'),
	gcmq = require('gulp-combine-mq'),
	iconfont = require('gulp-iconfont'),
	imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	spritesmith = require('gulp.spritesmith'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	rename = require('gulp-rename'),
	flatten = require('gulp-flatten'),
	gulpif = require('gulp-if'),
	gutil = require('gulp-util'),
	del = require('rimraf'),
	changed = require('gulp-changed'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	runSequence = require('run-sequence'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	cached = require('gulp-cached');

// Error handler for gulp-plumber
var errorHandler = function (err) {
	gutil.log([(err.name + ' in ' + err.plugin).bold.red, '', err.message, ''].join('\n'));

	if (gutil.env.beep) {
		gutil.beep();
	}

	this.emit('end');
};

// Read file and return object
var getData = function getData (file) {
	var dataEntry;
	var data;
	var fs = require('fs');

	try {
		dataEntry = fs.readFileSync(file, 'utf8');
	} catch (er) {
		dataEntry = false;
	}

	if (dataEntry) {
		eval('data = {' + dataEntry + '}');
	} else {
		data = '{}';
	}

	return data;
};

// Plugins options
var options = {

	path: {
		build: {
			html: './build/',
			js: './build/js/',
			css: './build/css/',
			img: './build/img/',
			fonts: './build/fonts/'
		},

		src: {
			html: './src/**/*.jade',
			js: './src/js/main.js',
			style: './src/style/main.styl',
			img: './src/img/**/*.*',
			fonts: './src/fonts/**/*.*'
		},

		watch: {
			html: './src/**/*.jade',
			js: './src/js/**/*.js',
			style: './src/style/**/*.styl',
			img: './src/img/**/*.*',
			fonts: './src/fonts/**/*.*'
		},

		clean: './build'
	},

	plumber: {
		errorHandler: errorHandler
	},

	stylus: {
		use: [
			autoprefixer({
				cascade: false
			})
		]
	},

	jade: {
		jade: jade,
		pretty: '\t'
	},

	htmlPrettify: {
		'unformatted': ['pre', 'code'],
		'indent_with_tabs': true,
		'preserve_newlines': true,
		'brace_style': 'expand',
		'end_with_newline': true
	},

	spritesmith: {
		retinaSrcFilter: '**/*@2x.png',
		imgName: 'sprite.png',
		retinaImgName: 'sprite@2x.png',
		cssName: 'sprite.styl',
		algorithm: 'binary-tree',
		padding: 8,
		cssTemplate: './stylus.template.mustache'
	},

	imagemin: {
		optimizationLevel: 3,
		progressive: true,
		interlaced: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [
			imageminPngquant()
		]
	}
};

gulp.task('jade:build', function () {
	return gulp.src(options.path.src.html)
		.pipe(plumber(options.plumber))
		.pipe(cached('templates'))
		.pipe(jadeInheritance({basedir: './src'}))
		.pipe(data(function(file) {
			return require('./src/templates/_data.json');
		}))
		.pipe(jadeGulp(options.jade))

		.pipe(gulp.dest(options.path.build.html));
});

