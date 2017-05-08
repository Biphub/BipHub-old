import path from 'path';
import webpack from 'webpack';
import config from '../config';
import webpackConfig from '../../build/webpack.dev';
import WebpackLogPlugin from '../../build/log-plugin';

const vuepackMiddleware = (app) => {
  const port = config.get('port');
  // Webpack dev requirements
  if (config.getEnv(true) === 'dev') {
    webpackConfig.entry.client = [
      `webpack-hot-middleware/client?reload=true`,
      webpackConfig.entry.client
    ];
    webpackConfig.plugins.push(new WebpackLogPlugin(port));

    let compiler;

    try {
      compiler = webpack(webpackConfig);
    } catch (err) {
      process.exit(1);
    }

    const devMiddleWare = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: true
      }
    });
    app.use(devMiddleWare);
    app.use(require('webpack-hot-middleware')(compiler, {
      log: () => {}
    }));

    const mfs = devMiddleWare.fileSystem;
    const file = path.join(webpackConfig.output.path, 'index.html');
    devMiddleWare.waitUntilValid();
    app.get('*', (req, res) => {
      devMiddleWare.waitUntilValid(() => {
        const html = mfs.readFileSync(file);
        res.end(html);
      });
    });
  }
};

export default vuepackMiddleware;
