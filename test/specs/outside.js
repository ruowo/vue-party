import test from 'ava'
import {expect} from 'chai'
import {createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import {install as focus} from '../../src/directives/focus.js'
import {install as outside} from '../../src/directives/outside.js'

test('outside', async (t) => {
  const Node = {
    template: `<div>
      <input type="text" v-focus v-outside="updateOutside" />
      <button></button>
    </div>`,
    data () {
      return {
        outside: false
      }
    },
    methods: {
      updateOutside () {
        this.outside = true
      }
    }
  }
  const localVue = createLocalVue()
  localVue.use(focus)
  localVue.use(outside)
  let wrap = mount(Node, {localVue})
  expect(wrap.vm.outside).to.eql(false)
  expect(document.activeElement.type).to.eql('text')
  // 应该有其他方法, 暂时先这样吧
  let evt = document.createEvent("MouseEvents")
  // Deprecated 
  // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null)
  document.dispatchEvent(evt)
  expect(wrap.vm.outside).to.eql(true)
  t.pass()
})
