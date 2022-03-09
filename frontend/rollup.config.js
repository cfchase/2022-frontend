import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@web/rollup-plugin-html';
import litcss from 'rollup-plugin-lit-css';
import esbuild from 'rollup-plugin-esbuild';

export default {
  input: ['index.html'],

  output: {
    dir: 'build',
    format: 'es',
    sourcemap: true,
  },

  plugins: [
    resolve({
      extensions: ['.ts', '.js'],
    }),
    commonjs(),
    esbuild({ ts: true, target: 'es2019', minify: true }),
    html(),
    litcss(),
  ],
};
