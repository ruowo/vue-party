import test from 'ava'
import {expect} from 'chai'
import {createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import {install as focus} from '../../src/directives/focus.js'

test('focus', async (t) => {
  const Node = {
    template: `<div>
      <input type="text"/>
      <input type="password" v-focus />
    </div>`
  }
  const localVue = createLocalVue()
  localVue.use(focus)
  let wrap = mount(Node, {localVue})
  expect(document.activeElement.type).to.eql('password')
  t.pass()
})
