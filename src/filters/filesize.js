export const install = (Vue) => {
  const base = 1024
  Vue.filter('filesize', (len, size = 3) => {
    len = +len // coerce to number
    if (isNaN(len) || (len <= 0)) {
      return ''
    }
    if (len < base) {
      return len.toFixed(0)  + " B"
    }
    len /= base
    if (len < base) {
      return len.toFixed(size) + " KB"
    }
    len /= base
    if (len < base) {
      return len.toFixed(size) + " MB"
    }
    len /= base
    if (len < base) {
      return len.toFixed(size) + " GB"
    }
    len /= base
    return len.toFixed(size) + " TB"
  })
}
