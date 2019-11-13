import {observable, action, computed} from 'mobx'

import {IEnv} from './Store'
import {GithubServer, IRemoteServer} from '../models/GithubServer'
import {IEmployee} from '../components/employee/Employee'

export class ServerStore {
  githubServers: Array<GithubServer> = []

  init = (env: IEnv) => {
    if (this.githubServers.length === 0) {
      env.GITHUB_ENTERPRISE_API_BASE_URLS.forEach((server: IRemoteServer) => {
        if (!this.findByName(server.name)) {
          this.githubServers.push(new GithubServer(server.name, server.base_url, server.token))
        }
      })
    }
  }

  findByName = (name: string) => {
    return this.githubServers.find(server => server.name === name)
  }

  getDefaultId = (email: string) => {
    var defaultUserId = email.split("@")[0]
    return defaultUserId.replace(/\./g, "-")
  }

  @action
  doesUserExist = (user = {} as IEmployee) => {
    const targetId = this.getDefaultId(user.mail)
    if (!user.idExistingServers) user.idExistingServers = []

    this.githubServers.forEach((server: GithubServer) => {
      server.searchUserIdFromRemote(targetId)
      .then(response => {
        switch (response.status) {
          case 200:
            user.idExistingServers && user.idExistingServers.push({
              name: server.name,
              loginId: targetId
            })
            return
          case 404:
            // Fallback search using email
            // If a user changes their loginId manually, they cannot be searched in handy.
            // To find exact loginId, searching by email is needed.
            //
            // Limitation: Even though this case, only users whose email is opened publicly
            // can be searched.

            server.findUserByEmail(user.mail)
            .then(response => {
              if (response.data && response.data.items.length > 0) {
                user.displayName += server.name
                console.log(user.displayName)
                user.idExistingServers && user.idExistingServers.push({
                  name: server.name,
                  loginId: response.data.items[0].login
                })
              }
              console.log(user)
            })
            return
          default:
            console.error("searchUserIdFromRemote error! ", response)
        }
      })
    })
  }
}

export const createServerStore = (): ServerStore => {
  return new ServerStore()
}

export type TServerStore = ReturnType<typeof createServerStore>
