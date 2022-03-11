import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@web/rollup-plugin-html';
import litcss from 'rollup-plugin-lit-css';
import esbuild from 'rollup-plugin-esbuild';
import replace from '@rollup/plugin-replace';
import copy from 'recursive-copy';

export default {
  input: ['index.html', 'demo.html'],

  output: {
    /** normal */
    dir: 'build',
    format: 'es',
    sourcemap: true,

    /** chunked bundles */
    // format: 'es',
    // sourcemap: true,
    // dir: 'build',
    // format: 'es',
    // entryFileNames: '[hash].js',
    // chunkFileNames: '[hash].js',
    // assetFileNames: '[hash][extname]',
  },

  plugins: [
    resolve({
      extensions: ['.ts', '.js'],
    }),
    commonjs(),
    esbuild({ ts: true, target: 'es2019', minify: true }),
    html(),
    litcss(),
    replace({
      preventAssignment: true,
      // replace the local endpoint for our graphql server
      'ws://0.0.0.0:8080/graphql': process.env.BACKEND_ENDPOINT ?? 'ws://0.0.0.0:8080/graphql'
    }),
    (() => ({
      name: 'move-assets',
      buildEnd() {
        // copy the assets directory into the build directory
        copy('assets', 'build/assets', { overwrite: true });
      }
    }))()
  ],
};
