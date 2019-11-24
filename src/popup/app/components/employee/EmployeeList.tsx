import React from 'react'
import { useObserver } from 'mobx-react-lite'

import EmployeeContainer, { IEmployee } from './EmployeeContainer'
import { GithubServer } from '../../models/GithubServer'
import { useStore } from '../../context'

interface Props {
  employees: Array<IEmployee>
  githubServers: Array<GithubServer>
}

export const EmployeeList: (props: Props) => JSX.Element[] = React.memo((props: Props) => {
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
