import test from 'ava'
import {expect} from 'chai'
import {createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import basename from '../../src/filters/basename.js'
import extname from '../../src/filters/extname.js'

test('extname', async (t) => {
  const Node = {
    template: `<div>{{url | extname}}</div>`,
    props: {
      url: {
        type: String,
        default: 'text'
      }
    }
  }
  const localVue = createLocalVue()
  localVue.use(extname)
  Vue.config.warnHandler = () =>{}
  Vue.config.errorHandler = (err) =>{
    expect(err).to.be.a('error')
  }
  let wrap = mount(Node, {localVue})
  expect(wrap.text()).to.eql('')
  t.pass()
})

test('extname', async (t) => {
  const Node = {
    template: `<div>{{url | extname}}</div>`,
    props: {
      url: {
        type: String,
        default: ''
      }
    }
  }
  const localVue = createLocalVue()
  localVue.use(basename)
  localVue.use(extname)

  let wrap = mount(Node, {localVue})
  expect(wrap.text()).to.eql('')

  wrap.setProps({url: 'http://www.github.com/vueparty'})
  expect(wrap.text()).to.eql('')

  wrap.setProps({url: 'http://www.github.com/vueparty/main.js?aaa#bbb'})
  expect(wrap.text()).to.eql('js')

  wrap.setProps({url: '/vueparty/main.js?aaa#bbb'})
  expect(wrap.text()).to.eql('js')

  wrap.setProps({url: 'x:\\vueparty\\main.js?aaa#bbb'})
  expect(wrap.text()).to.eql('js')

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
  expect(wrap.text()).to.eql('')

  t.pass()
})
