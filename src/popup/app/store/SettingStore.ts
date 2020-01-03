import { observable, reaction } from 'mobx'

import { storage } from '../models/LocalStorage'
import RootStore from './RootStore'

export interface ShortcutType {
  key: string
  url: string
  desc: string
  target: 'newTab' | 'newWindow'
}

export class SettingStore {
  @observable oneLetterShortcuts: ShortcutType[] = [{
    key: 'mMㅡ',
    desc: 'mail',
    url: 'https://mail.navercorp.com',
    target: 'newTab',
  }, {
    key: 'cCㅊ',
    desc: 'Calendar',
    url: 'https://calendar.navercorp.com/main.nhn',
    target: 'newTab',
  }, {
    key: 'wWㅈ',
    desc: 'Working Hour',
    url: 'https://nhrlove.navercorp.com/user/hrms/odm/worktime/worktimeHistoryPopup.nhn',
    target: 'newWindow',
  }, {
    key: 'rRㄱ예',
    desc: 'Reserve',
    url: 'https://reserve.navercorp.com',
    target: 'newWindow',
  }]

  autoSyncFavoriteUsers = reaction(() => this.oneLetterShortcuts.length, length => {
    // reaction function is called automatically by MobX
    // when oneLetterShortcuts.length is changed
    storage.set({ oneLetterShortcuts: [] })
  })

  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    storage.get({
      oneLetterShortcuts: [],
    }, (local: any) => {
      if (local.oneLetterShortcuts.length > 0) {
        this.oneLetterShortcuts = local.oneLetterShortcuts
      }
    })
  }
}
