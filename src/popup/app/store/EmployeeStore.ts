import { action, observable, reaction, toJS } from 'mobx'

import axios from 'axios'

import { IEmployee } from '../components/employee/EmployeeContainer'
import { GithubServer, IRemoteServer } from '../models/GithubServer'
import { storage } from '../models/LocalStorage'
import Index from './RootStore'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

export interface IEnv {
  LDAP_SERVER: string
  PHOTO_SERVER: string
  CLIENT_ID: string
  GITHUB_ENTERPRISE_API_BASE_URLS: IRemoteServer[]
  MAIL_PAGE: string
  ADDRESS_PAGE: string
  URLS: Json,
  SUPPORT_PAGE: string
  LAST_UPDATE: string
  LOG_SERVER: string
}

const envCall = axios.create({
  baseURL: 'http://mention.naverlabs.com',
  timeout: 1000,
})

export class EmployeeStore {
  @observable employees: IEmployee[] = []
  @observable isLoading = false
  @observable state = 'Ready' // "pending" / "done" / "error"
  @observable githubServers: GithubServer[] = []
  @observable selectedEmployeeIndex = 0
  @observable inputRef: any
  @observable favoriteEmployees: IEmployee[] = []
  env: IEnv = {} as any

  autoSyncFavoriteUsers = reaction(() => this.favoriteEmployees.length, length => {
    // reaction function is called automatically by MobX
    // when favoriteEmployees.length is changed
    storage.set({ starredUsers: toJS(this.favoriteEmployees) })
  })

  private store: Index

  constructor(rootStore: Index) {
    this.store = rootStore
    this.loadEnv(this.env)
  }

  loadEnv = (env: IEnv) => {
    storage.get({
      ENV: {},
      starredUsers: [],
    }, (local: any) => {
      this.initFavoriteUsers(local)

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
      url: `${this.env.PHOTO_SERVER}/json/${email}`,
    })
  }

  loadEnvFromRemote = (env: IEnv, callback: () => void) => {
    envCall.get('/').then(response => {
      if (response.status === 200) {
        Object.assign(env, response.data)
        storage.set({
          ENV: env,
        })
        callback()
      }
    })
  }

  isRequiredToHide(user: any) {
    const toSkipDepartment = ['업무지원']
    return toSkipDepartment.indexOf(user.department) !== -1
  }

  @action
  setEmployees = (employees: IEmployee[]) => {
    this.employees = employees
  }

  findEmployeesFromRemote = (query: string) => {
    return axios({
      method: 'GET',
      url: `${this.env.LDAP_SERVER}/api/users/search?q=*${query}*&searchFields=displayName`,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  @action
  findEmployees = (query: string) => {
    this.state = 'Searching..'
    this.isLoading = true
    this.resetCurrentSelect()
    this.setEmployees([])

    this.findEmployeesFromRemote(query).then(response => {
      if (!response.data._embedded) {
        this.state = 'Not found!'
        this.isLoading = false
        return
      }

      const found: IEmployee[] = []
      let foundCount = 0
      const total = response.data._embedded.users.length

      response.data._embedded.users.map((user: IEmployee) => {
        if (this.isRequiredToHide(user)) {
          foundCount++
          return
        }

        if (this.isFavoredEmployee(user)) {
          user.favorite = true
        }

        found.push(user)

        this.findUserPhotoByEmail(user.mail).then(res => {
          foundCount++
          if (res.status === 200) {
            user.photoUrl = res.data.photoUrl
          } else {
            this.sendErrorLog(res)
          }
          if (foundCount === total) {
            this.state = 'Found: ' + foundCount
            this.isLoading = false
            this.setEmployees(found)
          }
        }, error => {
          console.error(user, error)
          this.sendErrorLog(user, error)
        })
      })
    }).catch(error => {
      this.state = 'Error! '
      this.isLoading = false
      console.error(error)
      this.sendErrorLog(query, error.response.status, error.response.data)
    })
  }

  sendErrorLog = async (...errors: any[]) => {
    const success = await axios({
      method: 'POST',
      url: `https://${this.env.LOG_SERVER}`,
      data: {
        projectName: 'mgkick',
        projectVersion: '2.0.0',
        body: [...errors],
      },
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
    if (this.selectedEmployeeIndex === 0) {
      this.focusInput()
    }

    if (this.selectedEmployeeIndex >= 0) {
      this.selectedEmployeeIndex--
    }
  }

  focusInput = () => this.inputRef?.current.focus()

  getSelectedEmployee = (): IEmployee | undefined => {
    if (this.selectedEmployeeIndex < 0 || this.employees.length === 0) {
      return undefined
    } else {
      return this.employees[this.selectedEmployeeIndex]
    }
  }

  resetCurrentSelect = () => this.selectedEmployeeIndex = 0

  @action
  addToFavoriteEmployees = (target: IEmployee) => {
    const found = this.favoriteEmployees.find(
      (employee: IEmployee) => employee.employeeNumber === target.employeeNumber
    )

    if (!found) {
      this.favoriteEmployees.unshift(target)
    }
  }

  removeFromFavoriteEmployees = (target: IEmployee) => {
    this.favoriteEmployees = this.favoriteEmployees.filter(
      (employee: IEmployee) => employee.employeeNumber !== target.employeeNumber
    )
  }

  isFavoredEmployee = (target: IEmployee) => this.favoriteEmployees.find(
    employee => target.employeeNumber === employee.employeeNumber
  )

  getEmployeeAddressPageUrl = () => this.env.ADDRESS_PAGE + this.getSelectedEmployee()?.mail

  private initFavoriteUsers(local: any) {
    const favoriteUsersFromStorage = local?.starredUsers || []
    this.employees = favoriteUsersFromStorage
    this.favoriteEmployees = favoriteUsersFromStorage
    this.selectedEmployeeIndex = -1
    this.inputRef?.current.focus()
  }
}
