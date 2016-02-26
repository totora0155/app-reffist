import gulp from 'gulp';
import plumber from 'gulp-plumber'
import webpack from 'webpack-stream';
import electronConnect from 'electron-connect';
import config from './webpack.config';

const electron = electronConnect.server.create();

gulp.task('script:main', () => {
  const src = './src/scripts/main.js';
  const dest = './';

  return gulp.src(src)
    .pipe(plumber())
    .pipe(webpack(Object.assign(config, {
      output: {
        filename: 'main.js'
      }
    })))
    .pipe(gulp.dest(dest));
});

gulp.task('scripts:watch', ['script:main'], () => {
  const src = './src/**/*.js';

  electron.start();
  gulp.watch(src, ['script:main', electron.restart]);
});

process.on('SIGINT', () => {
  electron.stop();
  process.exit(0);
});
process.on('SIGTERM', () => {
  electron.stop();
  process.exit(0);
});
