export const install = (Vue) => {
  Vue.filter('basename', (path, ext) => {
    let url = String(path || '').trim()
    if (url) {
      let filename = url.replace(/(\?.*)|(#.*)/, '') // remove ? #
        .replace(/\\/g, '/') // replace \ to /
        .match(/([^\\\/]+)$/) // get from / to end

      if (filename) {
        filename = filename[1]
        if (ext) {
          if (filename.substr(- ext.length) === ext) {
            filename = filename.substr(0, filename.length - ext.length)
          }
        }
        return filename
      }
    }
    return url
  })
}
