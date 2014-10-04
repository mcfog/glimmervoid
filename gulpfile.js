var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var webpackConfig = require('./webpack.config.js');
var mergeStream = require('merge-stream');

var globs = {
    js: 'frontend/js/**/*.js',
    less: 'frontend/less/**/*.main.less',
    html: 'frontend/**/*.html',
    assets: [
        'frontend/fonts/**/*',
        'frontend/images/**/*'
    ]
};

gulp.task('js', ['webpack'], function () {
    return gulp.src('public/js/**/*.js')
//        .pipe($.uglify())
        .pipe(gulp.dest('public/js'));
});
gulp.task('webpack', function () {
    webpackConfig.refreshEntry();

    return gulp.src(globs.js)
        .pipe($.webpack(webpackConfig))
        .pipe(gulp.dest('public/js'));
});

gulp.task('css', function () {
    return gulp.src(globs.less)
        .pipe($.less())
        .pipe($.minifyCss())
        .pipe($.rename(function (path) {
            path.basename = path.basename.replace(/\.main$/, '.min');
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('assets', function () {
    return mergeStream.apply(null, globs.assets.map(function(glob) {
        return gulp.src(glob)
            .pipe(gulp.dest(glob.replace(/\/\*.*$/, '').replace(/^frontend/, 'public')));
    }));
});

gulp.task('html', function () {
    return gulp.src(globs.html)
        .pipe(gulp.dest('public'));
});

gulp.task('build', ['js', 'css', 'assets', 'html']);

gulp.task('watch', ['build'], function () {
    $.livereload.listen();

    gulp.watch(globs.js, ['js', pop])
        .on('change', push);

    gulp.watch(globs.less, ['css', pop])
        .on('change', push);

    gulp.watch(globs.html, ['html', pop])
        .on('change', push);

    gulp.watch(globs.assets, ['assets', pop])
        .on('change', push);

    var changed = [];

    function push(s) {
        changed.push(s);
    }

    function pop() {
        while (changed.length > 0) {
            var s = changed.pop();
            $.livereload.changed(s);
        }
    }
});


gulp.task('default', function () {
    gulp.start('watch');
});

