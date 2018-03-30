export const install = (Vue) => {
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })
}
