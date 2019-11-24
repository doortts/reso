import React, { useRef } from 'react'
import { useStore } from '../../context'
import { IEmployee } from './EmployeeContainer'
import { makeStyles, Theme } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { EmployeeView } from './EmployeeView'
import ListItem from '@material-ui/core/ListItem'

interface Props {
  employee: IEmployee
  isSelected: boolean
  handleClick: (e: React.MouseEvent<HTMLElement>) => void
}

export const Employee: React.FC<Props> = observer<Props>(props => {
  const { employee, handleClick, isSelected } = props

  let selectedStyle = isSelected ? { backgroundColor: 'lightgray' } : { backgroundColor: 'white' }

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
      default:
        break
    }
  }

  console.log('Employee.tsx')
  return (
    <ListItem
      onClick={handleClick}
      className={classes.listItem}
      onKeyDown={handleKeyDown}
      style={selectedStyle}
      tabIndex={-1}
      autoFocus={isSelected}
    >
      <Contents>
        <EmployeeView employee={employee} />
      </Contents>
    </ListItem>
  )
})

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  listItePrimaryText: {
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center'
  },
  listIteSecondaryText: {
    fontSize: '11px'
  },
  listItemText: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))

const Contents = styled.div`
  display: flex;
  padding: 2px;
`
