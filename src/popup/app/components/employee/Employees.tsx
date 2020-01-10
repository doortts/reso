import React from 'react'

import { useObserver } from 'mobx-react-lite'

import { useStore } from '../../context'
import { EmployeeStore } from '../../store/EmployeeStore'
import EmployeeContainer, { IEmployee } from './EmployeeContainer'

export const Employees = React.memo((): any => {
  const store = useStore() as EmployeeStore

  return useObserver(() => (
    store.employees.map((employee: IEmployee) => {
      let isSelected = false

      // TODO: Move to store
      if (store.selectedEmployeeIndex >= 0 && store.employees[store.selectedEmployeeIndex].mail === employee.mail) {
        isSelected = true
      }

      return (
        <EmployeeContainer
          key={employee.uid}
          employee={employee}
          servers={store.githubServers}
          isSelected={isSelected}
        />
      )
    })
  ))
})
