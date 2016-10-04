var gulp = require('gulp');
var compass = require('gulp-compass');

function CompassFunc() {
    return gulp.src('./style/scss/*.scss')
            .pipe(compass({
                sourcemap: true,
                time: true,
                css: './style/css/',
                sass: './style/scss/',
                style: 'compact'    //nested, expanded, compact, compressed
            }))
            .pipe(gulp.dest('./style/css/'));
}

function WatchFunc() {
    gulp.watch('./style/scss/*.scss', ['compass']);
}

gulp.task('compass', CompassFunc);
gulp.task('watch', WatchFunc);
gulp.task('default', ['compass', 'watch']);