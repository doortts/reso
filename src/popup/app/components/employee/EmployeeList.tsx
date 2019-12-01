import React from 'react'
import { useObserver } from 'mobx-react-lite'

import EmployeeContainer, { IEmployee } from './EmployeeContainer'
import { useStore } from '../../context'

export const EmployeeList = React.memo( (props: any) => {
  const {employees, githubServers} = props

  const store = useStore()

  console.log('EmployeeList render')
  return useObserver( () => (
    employees.map((employee: IEmployee) => {
      let isSelected = false

      // TODO: Move to store
      if (store.selectedEmployeeIndex >= 0 && store.employees[store.selectedEmployeeIndex].mail === employee.mail) {
        isSelected = true
      }

      return (
          <EmployeeContainer
            key={employee.uid}
            employee={employee}
            servers={githubServers}
            isSelected={isSelected}
          />
        )
      }
    )
  ))
})
