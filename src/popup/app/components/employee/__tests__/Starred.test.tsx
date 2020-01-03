import React from 'react'

import { mount } from 'enzyme'

import StoreProvider, { useStore } from '../../../context'
import mockEmployees from '../../../store/__tests__/mockEmployees'
import Store from '../../../store/RootStore'
import Starred from '../Starred'

describe('Starred', () => {
  test('<Starred />', () => {
    // Given
    const rootStore = new Store()
    expect(rootStore.employeeStore.favoriteEmployees.length).toEqual(0)

    const wrapper = mount(
      <StoreProvider store={rootStore}>
        <Starred employee={mockEmployees[0]} />
      </StoreProvider>,
    )

    // When
    const checkbox = wrapper.find('input[type="checkbox"]')

    // Then
    expect(checkbox).toHaveLength(1)

    // When
    checkbox.getDOMNode<HTMLInputElement>().checked = !checkbox.getDOMNode<HTMLInputElement>().checked
    checkbox.simulate('change')

    // Then
    expect(rootStore.employeeStore.favoriteEmployees.length).toEqual(1)
  })
})
