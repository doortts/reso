import { observable, action } from 'mobx'
import axios from 'axios'

import { IEmployee } from '../components/employee/EmployeeContainer'
import { storage } from '../models/LocalStorage'
import { IRemoteServer, GithubServer } from '../models/GithubServer'

export interface IEnv {
  LDAP_SERVER: string
  PHOTO_SERVER: string
  CLIENT_ID: string
  GITHUB_ENTERPRISE_API_BASE_URLS: Array<IRemoteServer>
  MAIL_PAGE: string
  ADDRESS_PAGE: string
  URLS: Object
  SUPPORT_PAGE: string
  LAST_UPDATE: string
  LOG_SERVER: string
}

const envCall = axios.create({
  baseURL: 'http://mention.naverlabs.com',
  timeout: 1000
})

export class Store {
  @observable employees: Array<IEmployee> = []
  @observable state = 'Ready' // "pending" / "done" / "error"
  @observable githubServers: Array<GithubServer> = []
  @observable selectedEmployeeIndex = 0

  env: IEnv = {} as any

  constructor() {
    this.loadEnv(this.env)
  }

  loadEnv = (env: IEnv) => {
    storage.get({
      ENV: {}
    }, (local: any) => {
      if (!local.ENV.LDAP_SERVER) {
        this.loadEnvFromRemote(env, this.init)
      } else {
        Object.assign(this.env, local.ENV)
        this.loadEnvFromRemote(env, this.init)
      }
    })
  }

  findUserPhotoByEmail = (email: string) => {
    return axios({
      method: 'GET',
      url: `${this.env.PHOTO_SERVER}/json/${email}`
    })
  }

  loadEnvFromRemote = (env: IEnv, callback: Function) => {
    envCall.get('/').then(function (response) {
      if (response.status === 200) {
        Object.assign(env, response.data)
        storage.set({
          ENV: env
        })
        callback()
      }
    })
  }

  isRequiredToHide(user: any) {
    let toSkipDepartment = ['업무지원']
    return toSkipDepartment.indexOf(user.department) !== -1
  }

  @action
  setEmployees = (employees: Array<IEmployee>) => {
    this.employees = employees
  }

  findEmployees = (query: string) => {
    return axios({
      method: 'GET',
      url: `${this.env.LDAP_SERVER}/api/users/search?q=*${query}*&searchFields=displayName`,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  @action
  getEmployees = (query: string) => {
    this.state = 'Searching..'
    this.findEmployees(query).then(response => {
      if (!response.data._embedded) {
        return
      }

      let found: Array<IEmployee> = []
      let foundCount = 0
      let total = response.data._embedded.users.length

      response.data._embedded.users.map((user: IEmployee) => {
        if (this.isRequiredToHide(user)) {
          foundCount++
          return
        }
        found.push(user)

        this.findUserPhotoByEmail(user.mail).then(response => {
          foundCount++
          if (response.status === 200) {
            user.photoUrl = response.data.photoUrl
          } else {
            this.sendErrorLog(response)
          }
          if (foundCount === total) {
            this.state = 'Found: ' + foundCount
            this.setEmployees(found)
          }
        }, error => {
          console.error(user, error)
          this.sendErrorLog(user, error)
        })
      })
    })
  }

  sendErrorLog = async (...errors: any[]) => {
    const success = await axios({
      method: 'POST',
      url: `${this.env.LOG_SERVER}`,
      data: {
        projectName: 'mgkick',
        projectVersion: '2.0.0',
        body: [...errors]
      }
    })
    console.log('Error log was sent!')
  }

  init = () => {
    if (this.githubServers.length === 0) {
      this.env.GITHUB_ENTERPRISE_API_BASE_URLS.forEach((server: IRemoteServer) => {
        if (!this.findByName(server.name)) {
          this.githubServers.push(new GithubServer(server.name, server.base_url, server.token))
        }
      })
    }

    return this.githubServers
  }

  findByName = (name: string) => {
    return this.githubServers.find(server => server.name === name)
  }

  @action
  increaseSelectedEmployeeIndex = () => {
    if (this.selectedEmployeeIndex + 1 < this.employees.length) {
      this.selectedEmployeeIndex++
    }
  }

  @action
  decreaseSelectedEmployeeIndex = () => {
    if (this.selectedEmployeeIndex > 0) {
      this.selectedEmployeeIndex--
    }
  }

  getSelectedEmployee = (): IEmployee => this.employees[this.selectedEmployeeIndex]
}

export const createStore = (): Store => {
  return new Store()
}

export type TStore = ReturnType<typeof createStore>
