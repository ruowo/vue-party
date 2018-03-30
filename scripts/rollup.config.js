import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default [
  {
    input: `src/index.js`,
    output: [
      {format: 'cjs', file: `dist/vue-party.js`},
    ],
    plugins: createPlugins()
  }
]

function createPlugins () {
  return [
    vue({
      css: true
    }),
    babel({
      babelrc: false,
    }),
    resolve({
    }),
    commonjs({
      include: [
        'node_modules/**',
        'src/**'
      ]
    }),
  ]  
}
