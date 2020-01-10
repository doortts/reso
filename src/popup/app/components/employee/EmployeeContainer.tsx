import React from 'react'

import { computed } from 'mobx'
import { Observer } from 'mobx-react-lite'

import { GithubServer } from '../../models/GithubServer'
import { Employee } from './Employee'

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
  idExistingServers: IServer[]
  favorite?: boolean
}

interface Props {
  employee: IEmployee
  servers: GithubServer[]
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

  guessDefaultLoginId = (email: string) => {
    return email.split('@')[0].replace(/\./g, '-')
  }

  doesUserExist = () => {
    const loginId = this.guessDefaultLoginId(this.employee.mail)
    this.employee.idExistingServers = []

    this.servers.map(targetServer => {
      targetServer.searchUserIdFromRemote(loginId)
        .then(response => {
          const remoteServer = {
            name: targetServer.name,
            loginId,
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
                  loginId: response.data.items[0].login,
                })
              }
            })
            .catch(err => {
              console.log('Not found')
            })
          return
        })
    })
  }

  render() {
    const { isSelected } = this.props

    return (
      <Observer render={() => (
        <Employee
          employee={this.employee}
          isSelected={isSelected}
        />
      )} />
    )
  }
}

export default EmployeeContainer
