// react-unstable-attributes.d.ts
import { EmployeeView } from './EmployeeView'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy';
  }
}

import React from 'react'
import { computed } from 'mobx'
import { withStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import Starred from '../../Starred'
import ServerNames from './ServerNames'
import { GithubServer } from '../../models/GithubServer'

interface IServer {
  name: string,
  loginId: string
}

export interface IEmployee {
  uid: string
  cn: string
  displayName: string
  employeeNumber: string
  company: string
  department: string
  mail: string
  telephoneNumber: string
  photoUrl?: string
  idExistingServers: Array<IServer>
}

interface Props {
  employee: IEmployee
  servers: Array<GithubServer>
  classes?: any
}

export class Employee extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props)
    this.doesUserExist()
  }

  @computed get employee() {
    return this.props.employee
  }

  @computed get servers() {
    return this.props.servers
  }

  handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    this.employee.idExistingServers && this.employee.idExistingServers.map(server => console.log(server.name, server.loginId))
  }

  guessDefaultLoginId = (email: string) => {
    return email.split('@')[0].replace(/\./g, '-')
  }

  doesUserExist = () => {
    var loginId = this.guessDefaultLoginId(this.employee.mail)
    this.employee.idExistingServers = []

    this.servers.map(targetServer => {
      targetServer.searchUserIdFromRemote(loginId)
        .then(response => {
          let remoteServer = {
            name: targetServer.name,
            loginId: loginId
          }
          this.employee.idExistingServers
          && this.employee.idExistingServers.push(remoteServer)
        })
        .catch(error => {
          // Fallback search using email
          //
          // There is reason for this fallback action. Neither default suspected oss id
          // nor email match exactly all the time to find oss user.
          // So two way check is more reliable.
          targetServer.findUserByEmail(this.employee.mail)
            .then(response => {
              if (response.data && response.data.items.length > 0) {
                this.employee.idExistingServers &&
                this.employee.idExistingServers.push({
                  name: targetServer.name,
                  loginId: response.data.items[0].login
                })
              }
            })
            .catch(error => {
              console.log('Not found')
            })
          return
        })
    })
  }

  render() {
    return (
      <EmployeeView
        employee={this.employee}
        handleClick={this.handleClick}
      />
    )
  }
}



export default Employee
