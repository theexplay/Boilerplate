'use strict';

var gulp = require('gulp'),
	jade = require('jade'),
	jadeGulp = require('gulp-jade'),
	jadeInheritance = require('gulp-jade-inheritance'), // Rebuild only changed jade files and all it dependencies
	data = require('gulp-data'),
	htmlPrettify = require('gulp-prettify'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb'),
	cssmin = require('gulp-clean-css'),
	gcmq = require('gulp-combine-mq'),
	imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	spritesmith = require('gulp.spritesmith'),
	rigger = require('gulp-rigger'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	rename = require('gulp-rename'),
	flatten = require('gulp-flatten'),  //remove or replace relative path for files
	gulpif = require('gulp-if'),
	gutil = require('gulp-util'),
	del = require('rimraf'),
	changed = require('gulp-changed'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	runSequence = require('run-sequence'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	iconfont = require('gulp-iconfont'),
	consolidate = require("gulp-consolidate"),
	reload = browserSync.reload;

// Error handler for gulp-plumber
var errorHandler = function (err) {
	gutil.log([(err.name + ' in ' + err.plugin).bold.red, '', err.message, ''].join('\n'));

	if (gutil.env.beep) {
		gutil.beep();
	}

	this.emit('end');
};

// Read file and return object
var getData = function getData(file) {
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

var runTimestamp = Math.round(Date.now() / 1000);

// Plugins options
var options = {

	path: {
		build: {
			html: './build/',
			js: './build/js/',
			css: './build/css/',
			img: './build/img/',
			fonts: './build/fonts/',
			svgIcons: './build/img/svg-icons/'
		},

		src: {
			html: './src/**/*.jade',
			js: './src/js/*.js',
			style: './src/style/main.styl',
			img: './src/img/**/*.*',
			fonts: './src/fonts/**/*.*',
			svgIcons: './src/img/svg-icons/*.svg'
		},

		watch: {
			html: './src/**/*.jade',
			js: './src/js/**/*.js',
			style: './src/style/**/*.styl',
			img: './src/img/**/*.*',
			fonts: './src/fonts/**/*.*',
			svgIcons: './src/img/svg-icons/*.svg'
		},

		clean: './build'
	},

	browserSync: {
		server: {
			baseDir: './build',
			tunnel: true
		}
	},

	plumber: {
		errorHandler: errorHandler
	},

	stylus: {
		'include css': true
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

	svgSymbols: {
		title: false,
		id: '%f',
		className: '%f'
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
	},

	iconfont: {
		fontName: 'svg-icons',
		formats: ['ttf', 'eot', 'woff'],
		normalize: true,
		fontHeight: 1001
	}
};

gulp.task('cleanup', function (cb) {
	return del(options.path.clean, cb);
});

gulp.task('browser-sync', function () {
	return browserSync.init(options.browserSync);
});

gulp.task('bs-reload', function (cb) {
	browserSync.reload();
});

gulp.task('jade:build', function () {
	return gulp.src(options.path.src.html)
		.pipe(plumber(options.plumber))
		.pipe(jadeInheritance({basedir: './src'}))
		.pipe(data(function (file) {
			return require('./src/templates/_data.json');
		}))
		.pipe(jadeGulp(options.jade))
		.pipe(htmlPrettify(options.htmlPrettify))
		.pipe(gulp.dest(options.path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
	return gulp.src(options.path.src.style)
		.pipe(plumber(options.plumber))
		.pipe(stylus(options.stylus))
		.pipe(autoprefixer())
		.pipe(gcmq({beautify: false}))
		.pipe(csscomb())
		.pipe(gulp.dest(options.path.build.css))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(options.path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	return gulp.src(options.path.src.js)
		.pipe(plumber(options.plumber))
		.pipe(rigger())
		.pipe(gulp.dest(options.path.build.js))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(options.path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function (err, files) {
	gulp.src(options.path.src.img)
		.pipe(imagemin(options.imagemin))
		.pipe(gulp.dest(options.path.build.img))
		.pipe(reload({stream: true}));
});

gulp.task('sprite:build', function () {
	var spriteData =
		gulp.src('./src/img/sprite/*.*')
			.pipe(spritesmith({
				imgName: 'sprite.png',
				cssName: '_sprite__constants.styl',
				cssFormat: 'stylus',
				algorithm: 'binary-tree',
				cssTemplate: './src/style/_common/_sprite/_sprite__constants.mustache',
				cssVarMap: function (sprite) {
					sprite.name = 's-' + sprite.name
				}
			}));

	spriteData.img.pipe(gulp.dest('./build/img/'));
	spriteData.css.pipe(gulp.dest('./src/style/_common/_sprite/'));
	spriteData.pipe(reload({stream: true}))
});

gulp.task('iconfont:build', function () {
	return gulp.src([options.path.src.svgIcons])
		.pipe(iconfont(options.iconfont))
		.on('glyphs', function (glyphs, options) {
			var Icons = [],
				iconNames = [];

			for (var i = 0; i < glyphs.length; i++) {
				var item = {name: glyphs[i].name, icon: glyphs[i].unicode[0].charCodeAt(0).toString(16)};
				iconNames.push(glyphs[i].name);
				Icons.push(item)
			}

			gulp.src("./src/style/_common/_svg-icon/_svg-icon__constants.mustache")
				.pipe(consolidate("swig", {
					icons: Icons,
					iconFont: options.fontName,
					allIcons: iconNames
				}))
				.pipe(rename({extname: '.styl'}))
				.pipe(gulp.dest("./src/style/_common/_svg-icon/"));
		})

		.pipe(gulp.dest(options.path.build.fonts));
});

gulp.task('fonts:build', function () {
	gulp.src(options.path.src.fonts)
		.pipe(gulp.dest(options.path.build.fonts))
		.pipe(reload({stream: true}));
});

gulp.task('build', [
	'iconfont:build',
	'sprite:build',
	'jade:build',
	'js:build',
	'image:build',
	'fonts:build',
	'style:build'
]);

gulp.task('watch', function () {

	watch([options.path.watch.html], function (event, cb) {
		gulp.start('jade:build');
	});

	watch([options.path.watch.style], function (event, cb) {
		gulp.start('style:build');
	});

	watch([options.path.watch.js], function (event, cb) {
		gulp.start('js:build');
	});

	watch([options.path.watch.img], function (event, cb) {
		gulp.start('image:build');
	});

	watch('./src/img/sprite/**/*.*', function (event, cb) {
		gulp.start('sprite:build');
	});

	watch('./src/img/svg-icons/*.*', function (event, cb) {
		gulp.start('iconfont:build');
	});

	watch([options.path.watch.fonts], function (event, cb) {
		gulp.start('fonts:build');
	});
});


gulp.task('default', ['build', 'browser-sync', 'watch']);
