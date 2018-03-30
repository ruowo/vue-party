export const install = (Vue) => {
  Vue.filter('extname', (path) => {
    const basename = Vue.filter('basename')
    if (!basename) {
      throw new Error('basename filter has not been installed')
    }
    let filename = basename(path)
    let pos = filename.lastIndexOf('.')
    return (pos > 0) ? filename.substr(pos + 1, filename.length) : ''
  })
}
