import { action, observable, reaction } from 'mobx'

import { storage } from '../models/LocalStorage'
import { Json } from './EmployeeStore'

export class SettingStore {
  @observable oneLetterShortcuts: Json[] = [{
    key: 'm',
    desc: 'mail',
    url: 'https://mail.navercorp.com',
    target: 'newTab',
  }, {
    key: 'c',
    desc: 'Calendar',
    url: 'https://calendar.navercorp.com/main.nhn',
    target: 'newTab',
  }, {
    key: 'w',
    desc: 'mail',
    url: 'https://nhrlove.navercorp.com/user/hrms/odm/worktime/worktimeHistoryPopup.nhn',
    target: 'newWindow',
  }]

  autoSyncFavoriteUsers = reaction(() => this.oneLetterShortcuts.length, length => {
    // reaction function is called automatically by MobX
    // when oneLetterShortcuts.length is changed
    storage.set({ oneLetterShortcuts: [] })
  })

  constructor() {
    storage.get({
      oneLetterShortcuts: [],
    }, (local: any) => {
      if (local.oneLetterShortcuts.length > 0) {
        this.oneLetterShortcuts = local.oneLetterShortcuts
      }
    })
  }
}
