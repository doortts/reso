import { EmployeeStore } from './EmployeeStore'
import { SettingStore } from './SettingStore'
import { observable } from 'mobx'

export class RootStore {
  @observable employeeStore: EmployeeStore
  @observable settingStore: SettingStore

  constructor() {
    this.employeeStore = new EmployeeStore(this)
    this.settingStore = new SettingStore(this)
  }
}

export const createStore = (): RootStore => {
  return new RootStore()
}

export type TStore = ReturnType<typeof createStore>

export default RootStore
