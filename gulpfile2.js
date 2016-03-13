'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    spritesmith = require('gulp.spritesmith'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    jade = require('gulp-jade'),
    browserSync = require("browser-sync"),
    changed = require('gulp-changed'),
    reload = browserSync.reload;

var path = {

    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },

    src: {
        html: 'src/**/*.jade',
        js: 'src/js/main.js',
        style: 'src/style/main.styl',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },

    watch: {
        html: 'src/**/*.jade',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.styl',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },

    clean: './build'
};

var config = {

    server: {
        baseDir: "./build"
    },

    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "werb"
};


gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    del(path.clean, cb);
});

gulp.task('jade:build', function () {
    gulp.src(path.src.html)
        .pipe(changed(path.src.html))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(stylus({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function (err, files) {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('sprite:build', function () {
    var spriteData =
        gulp.src('./src/img/sprite/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite-icons.styl',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                cssTemplate: 'stylus.template.mustache',
                cssVarMap: function (sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('./build/img/'));
    spriteData.css.pipe(gulp.dest('./src/style/components/'));
});

gulp.task('fonts:build', function () {
    gulp.src(options.path.src.fonts)
        .pipe(gulp.dest(options.path.build.fonts));
});

gulp.task('build', [
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

    watch([options.path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);
