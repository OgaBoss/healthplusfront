var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon')
var jsFiles = ['*.js', 'public/assets/js/**/*.js'];
var htmlFiles = ['*.html', 'public/assets/views/**/*.html'];

gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/assets/css/*.css',
        './public/assets/js/**/*.js'], {
        read: false
    });

    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../public'
    }

    return gulp.src('./src/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/'));
});

gulp.task('serve', ['style'], function () {
    var options = {
        script: 'server.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        //watch: [jsFiles, htmlFiles]
    }

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        })
})
