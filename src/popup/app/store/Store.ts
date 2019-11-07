import { observable, action } from 'mobx'

import {
  findEmployees, loadEnv,
  findUserPhotoByEmail, sendErrorLog
} from '../service'
import { IEmployee } from '../components/employee/Employee'

export class Store {
  @observable employees: Array<any> = []
  @observable state = "Ready" // "pending" / "done" / "error"

  constructor() {
    loadEnv()
  }

  isRequiredToHide(user: any) {
    let toSkipDepartment = ["업무지원"];
    return toSkipDepartment.indexOf(user.department) !== -1;
  }

  @action
  setEmployees = (employees: Array<IEmployee>) => {
    this.employees = employees
  }

  getEmployees = (query: string) => {
    this.state = 'Searching..'
    findEmployees(query).then(response => {
      if (!response.data._embedded) {
        return;
      }

      let found: Array<IEmployee> = []
      let foundCount = 0;
      let total = response.data._embedded.users.length;

      response.data._embedded.users.map((user: any) => {
        if (this.isRequiredToHide(user)) {
          foundCount++
          return;
        }
        found.push(user)

        findUserPhotoByEmail(user.mail).then(response => {
          foundCount++
          if (response.status === 200) {
            user.photoUrl = response.data.photoUrl;
          } else {
            sendErrorLog(response)
          }
          if (foundCount === total) {
            this.state = 'Found: ' + foundCount
            this.setEmployees(found)
          }
        }, error => {
          console.error(user, error)
          sendErrorLog(user, error)
        })
      })
    })
  }
}

export const createStore = (): Store => {
  return new Store()
};

export type TStore = ReturnType<typeof createStore>
