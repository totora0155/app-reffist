import gulp from 'gulp';
import plumber from 'gulp-plumber'
import webpack from 'webpack-stream';
import electronConnect from 'electron-connect';
import appConfig from './webpack.config.app.babel';
import webConfig from './webpack.config.web.babel';

const electron = electronConnect.server.create();

{
  const src = './src/scripts/main.js';
  const dest = './';

  gulp.task('script:main', () => {
    return gulp.src(src)
      .pipe(plumber())
      .pipe(webpack(Object.assign(appConfig, {
        output: {
          filename: 'main.js',
        },
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
      .pipe(webpack(Object.assign(appConfig, {
        output: {
          filename: 'client.js',
        },
      })))
      .pipe(gulp.dest(dest));
  });
}

{
  const src = './src/scripts/config.js';
  const dest = './window/config/scripts';

  gulp.task('script:config', () => {
    return gulp.src(src)
      .pipe(plumber())
      .pipe(webpack(Object.assign(webConfig, {
        target: 'web',
        output: {
          filename: 'config.js',
        },
      })))
      .pipe(gulp.dest(dest));
  });
}

{
  const src = './src/**/*.js';
  const dependencies = [
    'script:main',
    'script:client',
    'script:config',
  ];

  gulp.task('scripts:watch', dependencies, () => {
    electron.start();
    gulp.watch(src, dependencies.concat([electron.restart]));
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
