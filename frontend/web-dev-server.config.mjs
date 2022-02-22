import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { resolveCodegenPlugin } from '@apollo-elements/create/helpers.js';

import _litcss from 'rollup-plugin-lit-css';
import _commonjs from '@rollup/plugin-commonjs';
import _resolve from '@rollup/plugin-node-resolve';

const litcss = fromRollup(_litcss);
const commonjs = fromRollup(_commonjs);
const resolve = fromRollup(_resolve);

export default {
  nodeResolve: false,
  port: 8004,
  appIndex: 'index.html',
  rootDir: '.',
  mimeTypes: {
    'src/components/**/*.graphql': 'js',
    'src/components/**/*.css': 'js',
    'src/style.css': 'css',
  },
  plugins: [
    {
      // needed to specifically use the browser bundle for subscriptions-transport-ws
      name: 'use-browser-for-subscriptions-transport-ws',
      transformImport({ source }) {
        if (source.match(/subscriptions-transport-ws/))
          return source.replace('/dist/index.js', '/dist/client.js');
      },
    },
    commonjs({
      include: ['**/node_modules/subscriptions-transport-ws/**/*.js'],
      defaultIsModuleExports: true,
    }),
    resolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts']
    }),
    esbuildPlugin({ ts: true }),
    resolveCodegenPlugin({ ts: true }),
    litcss({
      include: 'src/components/**/*.css',
      exclude: ['src/style.css'],
    }),
  ],
};
