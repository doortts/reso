import React from 'react'
import { IServer } from './Employee'
import { useObserver } from 'mobx-react-lite'

interface Props {
  idExistingServers: Array<IServer>
}

export const ServerNames: React.FC<Props> = React.memo(({idExistingServers}) => {
  return useObserver(() =>(
    <div>
      {idExistingServers && idExistingServers.map(server => (
        <span style={getBadgeStyle(server.name)} key={server.name}>{server.name}</span>
      ))}
    </div>
  ))
})

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

export default ServerNames
