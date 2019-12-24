import React from 'react'

import { useObserver } from 'mobx-react-lite'

import { IServer } from './EmployeeContainer'

interface Props {
  idExistingServers: IServer[]
  showLoginId?: boolean
}

export const ServerNames: React.FC<Props> = React.memo((props: Props) => {
  const { idExistingServers, showLoginId } = props
  return useObserver(() => (
    <div style={{height: '13px', marginLeft: '2px'}}>
      {idExistingServers?.map(server => {
        return (
          <span
            style={getBadgeStyle(server.name)}
            key={server.name}
          >{showLoginId ? server.loginId : server.name}</span>
        )
      })}
    </div>
  ))
})

const getBadgeStyle = (serverName: string) => {
  const badge = {
    fontSize: '11px',
    backgroundColor: '#343434',
    color: 'whitesmoke',
    borderRadius: '3px',
    border: '1px solid 333',
    padding: '0 4px 1px 4px',
    marginLeft: '3px',
  }
  if (serverName?.toLowerCase() === 'es') {
    badge.backgroundColor = '#ff721c'
  } else {
    badge.backgroundColor = '#555555'
  }

  return badge
}

export default ServerNames
