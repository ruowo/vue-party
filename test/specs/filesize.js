import test from 'ava'
import {expect} from 'chai'
import {createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import filesize from '../../src/filters/filesize.js'

test('filesize', async (t) => {
  const Node = {
    template: `<div>{{size | filesize(len)}}</div>`,
    props: {
      size: {
        type: String,
        default: ''
      },
      len: {
        type: Number,
        default: 3
      }
    }
  }
  const localVue = createLocalVue()
  localVue.use(filesize)

  let wrap = mount(Node, {localVue})
  expect(wrap.text()).to.eql('')

  wrap.setProps({size: 24})
  expect(wrap.text()).to.eql('24 B')

  wrap.setProps({size: '1024'})
  expect(wrap.text()).to.eql('1.000 KB')
  wrap.setProps({size: '1025'})
  expect(wrap.text()).to.eql('1.001 KB')
  wrap.setProps({size: '1127'})
  expect(wrap.text()).to.eql('1.101 KB')
  wrap.setProps({size: 1024 * 1127})
  expect(wrap.text()).to.eql('1.101 MB')
  wrap.setProps({size: 1024 * 1024 * 1127})
  expect(wrap.text()).to.eql('1.101 GB')
  wrap.setProps({size: 1024 * 1024 * 1024 * 1127})
  expect(wrap.text()).to.eql('1.101 TB')

  wrap.setProps({len: 2})
  wrap.setProps({size: '1024'})
  expect(wrap.text()).to.eql('1.00 KB')
  wrap.setProps({size: '1025'})
  expect(wrap.text()).to.eql('1.00 KB')
  wrap.setProps({size: '1127'})
  expect(wrap.text()).to.eql('1.10 KB')
  wrap.setProps({size: 1024 * 1127})
  expect(wrap.text()).to.eql('1.10 MB')
  wrap.setProps({size: 1024 * 1024 * 1127})
  expect(wrap.text()).to.eql('1.10 GB')
  wrap.setProps({size: 1024 * 1024 * 1024 * 1127})
  expect(wrap.text()).to.eql('1.10 TB')

  wrap.setProps({len: 0})
  wrap.setProps({size: '1024'})
  expect(wrap.text()).to.eql('1 KB')
  wrap.setProps({size: '1025'})
  expect(wrap.text()).to.eql('1 KB')
  wrap.setProps({size: '1127'})
  expect(wrap.text()).to.eql('1 KB')
  wrap.setProps({size: 1024 * 1127})
  expect(wrap.text()).to.eql('1 MB')
  wrap.setProps({size: 1024 * 1024 * 1127})
  expect(wrap.text()).to.eql('1 GB')
  wrap.setProps({size: 1024 * 1024 * 1024 * 1127})
  expect(wrap.text()).to.eql('1 TB')

  wrap.setProps({size: undefined})
  expect(wrap.text()).to.eql('')

  wrap.setProps({size: false})
  expect(wrap.text()).to.eql('')

  wrap.setProps({size: '  '})
  expect(wrap.text()).to.eql('')

  wrap.setProps({size: NaN})
  expect(wrap.text()).to.eql('')

  wrap.setProps({size: null})
  expect(wrap.text()).to.eql('')

  wrap.setProps({size: '.test'})
  expect(wrap.text()).to.eql('')

  t.pass()
})
