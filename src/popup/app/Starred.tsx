import React, { useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'

import { IEmployee } from './components/employee/EmployeeContainer'
import { useStore } from './context'

interface Props {
  employee: IEmployee
}

export const Starred: React.FC<Props> = props => {
  const store = useStore()
  const { employee } = props
  const [starred, setStarred] = useState(employee.favorite || false)

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if (e.target.checked) {
      setStarred(true)
      employee.favorite = true
      store.addToFavoriteEmployees(employee)
    } else {
      setStarred(false)
      employee.favorite = false
      store.removeFromFavoriteEmployees(employee)
    }
  }

  return (
    <Checkbox
      icon={<StarBorder />}
      checkedIcon={<Star />}
      onChange={handleClick}
      checked={starred}
    />
  )
}

export default Starred
