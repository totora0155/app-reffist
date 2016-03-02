import config from './webpack.config.base.babel';

Object.assign(Object.create(config), {
  target: 'web',
});

export default config;
