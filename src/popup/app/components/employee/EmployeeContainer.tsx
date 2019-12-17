import { Employee } from './Employee'

import React from 'react'
import { computed } from 'mobx'
import { Observer } from 'mobx-react-lite'

import { GithubServer } from '../../models/GithubServer'

export interface IServer {
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
  favorite?: boolean
}

interface Props {
  employee: IEmployee
  servers: Array<GithubServer>
  isSelected: boolean
  classes?: any
}

export class EmployeeContainer extends React.PureComponent<Props, {}> {
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

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    this.employee.idExistingServers?.map(server => console.log(server.name, server.loginId))
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
          this.employee.idExistingServers?.push(remoteServer)
        })
        .catch(error => {
          // Fallback search using email
          //
          // There is reason for this fallback action. Neither default suspected oss id
          // nor email match exactly all the time to find oss user.
          // So two way check is more reliable.
          targetServer.findUserByEmail(this.employee.mail)
            .then(response => {
              if (response.data?.items.length > 0) {
                this.employee.idExistingServers?.push({
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
    const { isSelected } = this.props

    console.log('EmployeeContainer', isSelected)
    return (
      <Observer render={() => (
        <Employee
          employee={this.employee}
          handleClick={this.handleClick}
          isSelected={isSelected}
        />
      )} />
    )
  }
}

export default EmployeeContainer
