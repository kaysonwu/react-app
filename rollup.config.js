import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const extensions = ['.js', '.ts', '.jsx', '.tsx'];

export default {
  input: 'src/server.tsx',
  output: {
    dir: 'server',
    format: 'cjs',
  },
  plugins: [
    resolve({ extensions, resolveOnly: ['src'] }),
    babel({ extensions }),
  ],
};
