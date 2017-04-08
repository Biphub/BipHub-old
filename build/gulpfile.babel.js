import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import babel from 'gulp-babel'
import Cache from 'gulp-file-cache'

const cache = new Cache()

gulp.task('compile', () => gulp.src('./core/**/*.{js,json,password}', { dot: true })
    // .pipe(cache.filter())
    .pipe(babel())
    // .pipe(cache.cache())
    .pipe(gulp.dest('./dist')), // write them
)

gulp.task('set-prod-node-env', () => (process.env.NODE_ENV = 'production'))
gulp.task('set-dev-node-env', () => (process.env.NODE_ENV = 'development'))

gulp.task('watch', ['set-dev-node-env', 'compile'], () => nodemon({
  script: './dist/index.js',
  watch: './core',
  task: ['compile'],
  env: { NODE_ENV: 'development' },
}))
