/**
 * @author jinwei01
 * @file gulpfile
 */
var gulp         = require('gulp')
var less         = require('gulp-less')
var comb         = require('gulp-csscomb')
var autoprefixer = require('gulp-autoprefixer')
var cssnano      = require('gulp-cssnano')
var plumber      = require('gulp-plumber')
var notify       = require('gulp-notify')
var reporter     = require('gulp-less-reporter')
var inline       = require('gulp-inline-source')
var imagemin     = require('gulp-imagemin')
var pngquant     = require('imagemin-pngquant')


// autoprefixer conf
var autoprefixerConf = {
    browsers: [
        'ie >= 9', 'chrome > 30', 'Safari >= 6', 'ff >= 30',
        'Android >= 4', 'iOS >= 7',
        'last 2 versions'
    ]
}

// static dir
var srcDir  = 'src/'
var distDir = 'dist/'

// glob pattens
var pattens = {
    'less': [
        srcDir + '**/*.less'
    ],
    'js': [
        srcDir + '**/*.js'
    ],
    'html': [
        srcDir + '*.html'
    ],
    'img': ['png', 'gif', 'jpg', 'jpeg', 'webp', 'svg'].map(function (type) {
        return srcDir + '**/*.' + type
    })
}

// build css
gulp.task('build-css', function () {
    return gulp.src(pattens.less)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(less({relativeUrls: true})).on('error', reporter)
        .pipe(autoprefixer(autoprefixerConf))
        // .pipe(comb())
        .pipe(cssnano())
        .pipe(gulp.dest(distDir))
})

// build js
gulp.task('build-js', function () {
    return gulp.src(pattens.js)
        .pipe(gulp.dest(distDir))
})

// build img
gulp.task('build-img', function () {
    return gulp.src(pattens.img)
        .pipe(imagemin({
            use: [pngquant({quality: '65-80'})],
            verbose: true,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(distDir))
})

// build page
gulp.task('build-page', function () {
    return gulp.src(pattens.html)
    .pipe(gulp.dest(distDir))
    .pipe(inline({

    }))
    .pipe(gulp.dest(distDir))
})

// watch css
gulp.task('watch-css', ['build-css', 'build-img'], function () {
    gulp.watch(pattens.less, ['build-css', 'build-img'])
})

// watch js
gulp.task('watch-js', ['build-js'], function () {
    gulp.watch(pattens.js, ['build-js'])
})

// watch html
gulp.task('watch-page', ['build-page'], function () {
    gulp.watch(pattens.html, ['build-page'])
})

gulp.task('watch', ['watch-css', 'watch-js', 'watch-page'], function () {})
