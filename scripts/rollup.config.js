import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default [
  createEntry('plugins', 'broadcast.js', 'broadcast.js'),
  createEntry('filters', 'filesize.js', 'filesize.js'),
  createEntry('filters', 'basename.js', 'basename.js'),
  createEntry('filters', 'extname.js', 'extname.js'),
]

function createEntry (dir, name, dist) {
  return {
    input: `src/${dir}/${name}`,
    output: [
      {format: 'cjs', file: `dist/${dist}`},
    ],
    external: [
      './basename'
    ],
    plugins: createPlugins()
  }
}

function createPlugins () {
  return [
    vue({
      css: true
    }),
    babel({
      babelrc: false,
    }),
    resolve({
      module: true
    }),
    commonjs({
      include: [
        'node_modules/**'
      ]
    }),
  ]  
}
