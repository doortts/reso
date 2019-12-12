import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../context'
import { IEmployee } from './EmployeeContainer'
import { EmployeeView } from './EmployeeView'
import ListItem from '@material-ui/core/ListItem'

interface Props {
  employee: IEmployee
  isSelected: boolean
  handleClick: (e: React.MouseEvent<HTMLElement>) => void
}

export const Employee: React.FC<Props> = observer<Props>(props => {
  const { employee, handleClick, isSelected } = props

  let focusStyle = isSelected ? selectedStyle(employee.photoUrl) : {}

  const store = useStore()
  const classes = useStyles()
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault()

    switch (e.key) {
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        store.increaseSelectedEmployeeIndex()
        break
      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        store.decreaseSelectedEmployeeIndex()
        break
      case 'Enter':
        employee.idExistingServers?.map(server => console.log(server.name, server.loginId))
        break
      case 'F':
      case 'f':
      case 'ㄹ':
        store.focusInput()
        console.log('F')
        break
      default:
        console.log(e.key)
        break
    }
  }

  console.log('Employee.tsx')
  return (
    <ListItem
      onClick={handleClick}
      className={classes.listItem}
      onKeyDown={handleKeyDown}
      style={focusStyle}
      tabIndex={-1}
      autoFocus={isSelected}
      button
    >
      <EmployeeView employee={employee} />
    </ListItem>
  )
})

const selectedStyle = (photoUrl: string | undefined = ''): any => ({
  backgroundColor: '#f1f1f1',
  backgroundImage: `url("${photoUrl}")`,
  backgroundBlendMode: 'multiply',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  boxShadow: '#444444 1px 1px 2px 0px',
  boxSizing: 'border-box',
})

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    padding: theme.spacing(0),
    boxSizing: 'border-box',
    borderRadius: '3px',
    '&:focus': {
      outline: 'none'
    },
    marginTop: '2px'
  }
}))
