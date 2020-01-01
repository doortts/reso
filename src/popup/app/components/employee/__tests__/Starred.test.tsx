import React from 'react'

import { mount } from 'enzyme'

import StoreProvider, { useStore } from '../../../context'
import mockEmployees from '../../../store/__tests__/mockEmployees'
import { EmployeeStore } from '../../../store/EmployeeStore'
import Starred from '../Starred'

describe('Starred', () => {
  test('<Starred />', () => {
    // Given
    const store = new EmployeeStore()
    expect(store.favoriteEmployees.length).toEqual(0)

    const wrapper = mount(
      <StoreProvider store={store}>
        <Starred employee={mockEmployees[0]} />
      </StoreProvider>,
    )

    // When
    const checkbox = wrapper.find('input[type="checkbox"]')

    // Then
    expect(checkbox).toHaveLength(1)

    // When
    checkbox.getDOMNode<HTMLInputElement>().checked = !checkbox.getDOMNode<HTMLInputElement>().checked
    checkbox.simulate('change');

    // Then
    expect(store.favoriteEmployees.length).toEqual(1)
  })
})
