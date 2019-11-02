import React from 'react'
import { mount } from 'enzyme'

export default (element) => {
  const wrapper = mount(element)
  return {
    get: {
      rows: wrapper.find(`[data-test-id="event-row"]`)
    },
    unmount: () => wrapper.unmount(),
    update: () => wrapper.update()
  }
}
