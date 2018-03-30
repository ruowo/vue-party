import test from 'ava'
import {expect} from 'chai'
import {createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import {install as bridge} from '../../src/directives/bridge.js'

test('bridge', async (t) => {
  const Node = {
    template: `<div><child v-model="input"/></div>`,
    data () {
      return {
        input: ''
      }
    },
    components: {
      child: {
        template: '<child2 v-bridge :value="value"/>',
        props: {
          value: {
            type: String
          },
        },
        components: {
          child2: {
            props: {
              value: {
                type: String
              },
            },
            template: '<div>child2-{{value}}</div>',
            mounted () {
              this.$emit('input', 'inputValue')
            }
          }
        }
      }
    }
  }
  const localVue = createLocalVue()
  localVue.use(bridge)
  let wrap = mount(Node, {localVue})
  expect(wrap.vm.input).to.eql('inputValue')
  t.pass()
})

test('bridge.change', async (t) => {
  const Node = {
    template: `<div><child @change="updateInput"/></div>`,
    data () {
      return {
        input: ''
      }
    },
    methods: {
      updateInput (value) {
        this.input = value
      }
    },
    components: {
      child: {
        template: `<child2 v-bridge.change/>`,
        props: {
          value: {
            type: String
          },
        },
        components: {
          child2: {
            template: '<div>child2</div>',
            mounted () {
              this.$emit('change', 'inputValue')
            }
          }
        }
      }
    }
  }
  const localVue = createLocalVue()
  localVue.use(bridge)
  let wrap = mount(Node, {localVue})
  expect(wrap.vm.input).to.eql('inputValue')
  t.pass()
})
