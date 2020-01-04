import { observable } from 'mobx'

import { EmployeeStore } from './EmployeeStore'
import { SettingStore } from './SettingStore'
import { UIStateStore } from './UIStateStore'

export class RootStore {
  @observable employeeStore: EmployeeStore
  @observable settingStore: SettingStore
  @observable uiStateStore: UIStateStore

  constructor() {
    this.employeeStore = new EmployeeStore(this)
    this.settingStore = new SettingStore(this)
    this.uiStateStore = new UIStateStore(this)
  }
}

export const createStore = (): RootStore => {
  return new RootStore()
}

export type TStore = ReturnType<typeof createStore>

export default RootStore
