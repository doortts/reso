import React from 'react'
import {useObserver} from 'mobx-react-lite'

import {IEmployee} from './Employee'

interface Props {
  user: IEmployee
  servers: Array<{ name: string, loginId: string }>
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

const ServerNames: React.FC<Props> = props => useObserver(() => (
    <React.Fragment>
      {props.servers && props.servers.map(server => (
          <span style={getBadgeStyle(server.name)} key={server.name}>{server.name}</span>
      ))}
    </React.Fragment>
))

export default ServerNames
