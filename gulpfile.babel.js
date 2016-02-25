import gulp from 'gulp';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';

import config from './webpack.config';

gulp.task('script:main', () => {
  const src = './src/scripts/main.js';
  const dest = './';

  return gulp.src(src)
    .pipe(webpack(Object.assign(config, {
      output: {
        filename: 'main.js'
      }
    })))
    .pipe(gulp.dest(dest));
});

gulp.task('scripts:watch', ['script:main'], () => {
  const src = './src/**/*.js';
  gulp.watch(src, ['script:main']);
});
