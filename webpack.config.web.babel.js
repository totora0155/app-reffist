import config from './webpack.config.base.babel';

Object.assign(config, {
  target: 'web',
});

export default config;
