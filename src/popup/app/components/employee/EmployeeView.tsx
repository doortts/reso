import React, { useRef } from 'react'
import { useStore } from '../../context'
import { IEmployee } from './Employee'
import { makeStyles, Theme } from '@material-ui/core'
import { observer, useObserver } from 'mobx-react-lite'
import Avatar from '@material-ui/core/Avatar'

const addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
}

const styles = {
  secondaryItem: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}

interface Props {
  employee: IEmployee
  handleClick: (e: React.MouseEvent<HTMLElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
}

const getBadgeStyle = (serverName: string) => {
  let badge = {
    fontSize: '10px',
    backgroundColor: '#343434',
    color: 'whitesmoke',
    borderRadius: '3px',
    border: '1px solid 333',
    padding: '0 4px 1px 4px',
    marginLeft: '3px'
  }
  if (serverName && serverName.toLowerCase() === 'es') {
    badge.backgroundColor = '#ff721c'
  } else {
    badge.backgroundColor = '#555555'
  }

  return badge
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

  const outline = { display: 'flex' }
  return (
    <li
      onClick={handleClick}
      onKeyDown={onKeyDown}
      style={isSelected}
      tabIndex={-1}
      ref={ref}
    >
      <div style={outline}>
        <div>
          <Avatar
            alt={employee.displayName}
            src={employee.photoUrl}
            onError={addDefaultSrc}
          />
        </div>
        <div style={styles.secondaryItem}>
          <div>
            <span>{employee.displayName}</span>
            {employee.idExistingServers && employee.idExistingServers.map(server => (
              <span style={getBadgeStyle(server.name)} key={server.name}>{server.name}</span>
            ))}
          </div>
          <div>
            {employee.department}, {employee.mail}
          </div>
        </div>
        <div>
        </div>
      </div>
    </li>
  )
})
