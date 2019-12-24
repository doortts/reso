import React from 'react'

import { observer } from 'mobx-react-lite'

import ListItem from '@material-ui/core/ListItem'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { useStore } from '../../context'
import { IEmployee } from './EmployeeContainer'
import { EmployeeView } from './EmployeeView'
import { sendUserIdToActiveTab } from './mention'

interface Props {
  employee: IEmployee
  isSelected: boolean
}

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(0.5),
    boxSizing: 'border-box',
    borderRadius: '3px',
    '&:focus': {
      outline: 'none',
    },
    marginTop: '2px',
  },
}))

const getRandomBg = () => {
  const bgColors = [
    'linear-gradient(90deg, rgba(217,255,16,1) 0%, rgba(198,40,40,1) 100%)',
    'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
    'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    'linear-gradient(90deg, rgba(5,191,231,1) 0%, rgba(29,79,253,1) 50%, rgba(252,69,85,1) 100%)',
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
  boxSizing: 'border-box',
})

const bgColor = selectedStyle()

export const Employee: React.FC<Props> = observer<Props>(props => {
  const { employee, isSelected } = props

  const focusStyle = isSelected ? bgColor : {}

  const store = useStore()
  const classes = useStyles()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    employee.idExistingServers?.map(server => {
      sendUserIdToActiveTab(server, store.githubServers)
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    switch (e.key) {
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        e.preventDefault()
        store.increaseSelectedEmployeeIndex()
        break
      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        e.preventDefault()
        store.decreaseSelectedEmployeeIndex()
        break
      case 'F':
      case 'f':
      case 'ㄹ':
        e.preventDefault()
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
