import gulp from 'gulp';
import plumber from 'gulp-plumber'
import webpack from 'webpack-stream';
import electronConnect from 'electron-connect';
import config from './webpack.config';

const electron = electronConnect.server.create();

{
  const src = './src/scripts/main.js';
  const dest = './';

  gulp.task('script:main', () => {
    return gulp.src(src)
      .pipe(plumber())
      .pipe(webpack(Object.assign(config, {
        output: {
          filename: 'main.js',
        }
      })))
      .pipe(gulp.dest(dest));
  });
}


{
  const src = './src/scripts/client.js';
  const dest = './';

  gulp.task('script:client', () => {
    return gulp.src(src)
      .pipe(plumber())
      .pipe(webpack(Object.assign(config, {
        output: {
          filename: 'client.js',
        }
      })))
      .pipe(gulp.dest(dest));
  });
}

{
  const src = './src/**/*.js';

  gulp.task('scripts:watch', ['script:main', 'script:client'], () => {
    electron.start();
    gulp.watch(src, ['script:main', 'script:client', electron.restart]);
  });
}


process.on('SIGINT', () => {
  electron.stop();
  process.exit(0);
});
process.on('SIGTERM', () => {
  electron.stop();
  process.exit(0);
});
