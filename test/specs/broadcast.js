import test from 'ava'
import {expect} from 'chai'
import {createLocalVue, shallow, mount } from '@vue/test-utils'
import Vue from 'vue'
import {install} from '../../src/plugins/broadcast.js'

test('broadcast', async (t) => {
  let n = 0;
  const ChildNode = {
    template: `<button>child</button>`,
    events: {
      test2 (text) {
        n++
        expect(text).to.eql('parent')
      },
      test1 (text) {
        n++
        expect(text).to.eql('self')
      }
    },
    mounted () {
      this.$broadcast('test', 'child')
    }
  }
  const ParentNode = {
    template: `<div><child-node v-if="!off"/><empty-span/></div>`,
    events: ['test', 'test1'],
    props: {
      off: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.$broadcast('test2', 'parent')
      this.$broadcast('test1', 'self')
    },
    methods: {
      test (text) {
        n++
        expect(text).to.eql('child')
      },
      test1 (text) {
        n++
        expect(text).to.eql('self')
      }
    },
    components: {
      ChildNode,
      EmptySpan: {
        template: `<span></span>`
      }
    }
  }
  const localVue = createLocalVue()
  localVue.use(install)

  let wrap = mount(ParentNode, {localVue})
  expect(n).to.eql(4)
  wrap.setData({off: true})

  wrap.vm.$broadcast('test1', 'self')
  expect(n).to.eql(5)
  
  wrap.vm.$broadcast('test2', 'parent')
  expect(n).to.eql(5)

  wrap.destroy()

  t.pass()
})
