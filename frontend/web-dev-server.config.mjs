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
  nodeResolve: true,
  port: 8004,
  // appIndex: 'index.html',
  rootDir: '.',
  mimeTypes: {
    'src/components/**/*.graphql': 'js',
    'src/components/**/*.css': 'js',
    'src/style.css': 'css',
    'assets/style/summit-22-style.css': 'js',
  },
  plugins: [
    esbuildPlugin({ ts: true }),
    resolveCodegenPlugin({ ts: true }),
    litcss({
      include: ['src/components/**/*.css', 'assets/style/summit-22-style.css'],
      exclude: ['src/style.css'],
    }),
  ],
};
