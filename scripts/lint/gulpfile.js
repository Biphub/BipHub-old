const gulp = require('gulp')
const eslint = require('gulp-eslint')

gulp.task('js:lint', () => {
  return gulp.src(['../../**/*.js', '!node_modules/**'])
    .pipe(eslint())
})
