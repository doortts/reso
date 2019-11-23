import React, { useRef } from 'react'
import { useStore } from '../../context'
import { IEmployee } from './Employee'
import { makeStyles, Theme } from '@material-ui/core'
import { observer, useObserver } from 'mobx-react-lite'
import Avatar from '@material-ui/core/Avatar'
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone'
import styled from 'styled-components'
import { Item } from './Item'

interface Props {
  employee: IEmployee
  handleClick: (e: React.MouseEvent<HTMLElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
}

export const EmployeeView: React.FC<Props> = observer<Props>(props => {
  const { employee, handleClick, onKeyDown } = props

  let isSelected = { backgroundColor: 'white' }

  const store = useStore()
  const ref = useRef<HTMLLIElement>(null)

  // TODO: Move to store
  if (store.selectedEmployeeIndex >= 0 && store.employees[store.selectedEmployeeIndex].mail === employee.mail) {
    isSelected = { backgroundColor: 'lightgrey' }
    ref.current && ref.current.focus()
  }

  return (
    <ListItem
      onClick={handleClick}
      onKeyDown={onKeyDown}
      style={isSelected}
      tabIndex={-1}
      ref={ref}
    >
      <Layout>
        <Item
          department={employee.department}
          displayName={employee.displayName}
          idExistingServers={employee.idExistingServers}
          mail={employee.mail}
          photoUrl={employee.photoUrl}
        />
      </Layout>
    </ListItem>
  )
})

const ListItem = styled.li`
  padding: 3px;
  &:active {
    outline:solid 0px #DCDCDC;
    background-color: #ECECEC;
  }
`

const Layout = styled.div`
  display: flex;
  padding: 2px;
`

const Summary = styled.div`
    width: 100%
`

