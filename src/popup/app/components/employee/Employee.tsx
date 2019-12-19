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

const getRandomBg = () => {
  const bgColors = [
    'linear-gradient(90deg, rgba(217,255,16,1) 0%, rgba(198,40,40,1) 100%)',
    'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
    'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    'linear-gradient(90deg, rgba(5,191,231,1) 0%, rgba(29,79,253,1) 50%, rgba(252,69,85,1) 100%)'
  ]
  const randomIndex = Math.floor(Math.random() * Math.floor(bgColors.length))
  return bgColors[randomIndex]
}

const selectedStyle = (): any => ({
  background: getRandomBg(),
  backgroundBlendMode: 'multiply',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  boxShadow: '#444444 1px 1px 2px 0px',
  boxSizing: 'border-box'
})

const bgColor = selectedStyle()

export const Employee: React.FC<Props> = observer<Props>(props => {
  const { employee, handleClick, isSelected } = props

  let focusStyle = isSelected ? bgColor : {}

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
