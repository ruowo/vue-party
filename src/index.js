import {install as broadcast} from './plugins/broadcast.js'

import {install as bridge} from './directives/bridge.js'
import {install as tip} from './directives/tip.js'
import {install as focus} from './directives/focus.js'
import {install as outside} from './directives/outside.js'

import {install as basename} from './filters/basename.js'
import {install as extname} from './filters/extname.js'
import {install as filesize} from './filters/filesize.js'

exports.install = (Vue) => {
  [
    bridge,
    tip,
    focus,
    outside,

    basename,
    extname,
    filesize,

    broadcast
  ]
  .forEach(it => Vue.use(it))
}
