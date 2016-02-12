const gulp = require('gulp');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('default', () => {
    return gulp.src('src/incident.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
        .pipe(rename('incident.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
