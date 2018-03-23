import test from 'ava'
import {expect} from 'chai'
import {createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import basename from '../../src/filters/basename.js'

test('basename', async (t) => {
  const Node = {
    template: `<div>{{url | basename(ext)}}</div>`,
    props: {
      url: {
        type: String,
        default: ''
      },
      ext: {
        type: String,
        default: ''
      }
    }
  }
  const localVue = createLocalVue()
  localVue.use(basename)

  let wrap = mount(Node, {localVue})
  expect(wrap.text()).to.eql('')

  wrap.setProps({url: 'http://www.github.com/vueparty'})
  expect(wrap.text()).to.eql('vueparty')

  wrap.setProps({url: 'http://www.github.com/vueparty/main.js?aaa#bbb'})
  expect(wrap.text()).to.eql('main.js')

  wrap.setProps({url: '/vueparty/main.js?aaa#bbb'})
  expect(wrap.text()).to.eql('main.js')

  wrap.setProps({url: 'x:\\vueparty\\main.js?aaa#bbb'})
  expect(wrap.text()).to.eql('main.js')

  wrap.setProps({ext: '.js'})
  expect(wrap.text()).to.eql('main')

  wrap.setProps({ext: '.exe'})
  expect(wrap.text()).to.eql('main.js')

  wrap.setProps({url: undefined})
  expect(wrap.text()).to.eql('')

  wrap.setProps({url: false})
  expect(wrap.text()).to.eql('')

  wrap.setProps({url: '  '})
  expect(wrap.text()).to.eql('')

  wrap.setProps({url: NaN})
  expect(wrap.text()).to.eql('')

  wrap.setProps({url: null})
  expect(wrap.text()).to.eql('')

  wrap.setProps({url: '.test'})
  expect(wrap.text()).to.eql('.test')

  t.pass()
})
