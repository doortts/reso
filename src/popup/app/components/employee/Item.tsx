import Avatar from '@material-ui/core/Avatar'
import StarTwoToneIcon from '@material-ui/core/SvgIcon/SvgIcon'
import React, { Component, PureComponent } from 'react'
import styled from 'styled-components'
import { IServer } from './Employee'
import ServerNames from './ServerNames'

interface Props {
  displayName: string
  photoUrl?: string
  idExistingServers: Array<IServer>
  department: string
  mail: string
}

const addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
}


export const Item: React.FC<Props> = React.memo((props) => {
  const { displayName, photoUrl, idExistingServers, department, mail } = props

  return (
    <React.Fragment>
      <Avatar
        alt={displayName}
        src={photoUrl}
        onError={addDefaultSrc}
      />
      <div>
        <div>
          <span>{displayName}</span>
          <ServerNames idExistingServers={idExistingServers} />
        </div>
        <Detail department={department} mail={mail} />
      </div>
      <div>
        <StarTwoToneIcon>Star</StarTwoToneIcon>
      </div>
    </React.Fragment>
  )
})

class Detail extends PureComponent<{ department: any, mail: any }> {
  render() {
    let { department, mail } = this.props
    return (
      <SecondaryLine>
        {department}, {mail}
      </SecondaryLine>
    )
  }
}

const SecondaryLine = styled.div` 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`


