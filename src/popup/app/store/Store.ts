import { observable, action } from 'mobx'

import { findEmployees, loadEnv, findUserPhotoByEmail } from '../service'
import { IEmployee } from '../components/employee/Employee'

export class Store {
  @observable employees: Array<any> = []
  @observable state = "pending" // "pending" / "done" / "error"

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

  @action
  getEmployees = (query: string) => {
    findEmployees(query).then(response => {
      if (!response.data._embedded) {
        return;
      }

      let found: Array<IEmployee> = []

      response.data._embedded.users.map((user: any) => {
        if (this.isRequiredToHide(user)) {
          return;
        }
        user.photoUrl = '/images/default-avatar-64.png'
        found.push(user)
      })
      this.setEmployees(found)
    })
  }
}

export const createStore = (): Store => {
  return new Store()
};

export type TStore = ReturnType<typeof createStore>
