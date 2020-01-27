import { mount } from '@vue/test-utils'
import RenameForm from '@/src/components/RenameForm.vue'

describe('RenameForm', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(RenameForm, {
      attrs: {
        screenName: 'test'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
