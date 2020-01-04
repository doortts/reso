import { action, observable, reaction, toJS } from 'mobx'

import { storage } from '../models/LocalStorage'
import RootStore from './RootStore'

export interface ShortcutType {
  idx: number
  key: string
  url: string
  desc: string
  target: 'newTab' | 'newWindow'
}

const defaultShortcutKeys: ShortcutType[] = [{
  idx: 1,
  key: 'mMㅡ',
  desc: 'mail',
  url: 'https://mail.navercorp.com',
  target: 'newTab',
}, {
  idx: 2,
  key: 'cCㅊ',
  desc: 'Calendar',
  url: 'https://calendar.navercorp.com/main.nhn',
  target: 'newTab',
}, {
  idx: 3,
  key: 'wWㅈ',
  desc: 'Working Hour',
  url: 'https://nhrlove.navercorp.com/user/hrms/odm/worktime/worktimeHistoryPopup.nhn',
  target: 'newWindow',
}, {
  idx: 4,
  key: 'rRㄱ예',
  desc: 'Reserve',
  url: 'https://reserve.navercorp.com',
  target: 'newWindow',
}]

let timeout = 0

const debounce = (func: () => void, delay: number) => {
  clearTimeout(timeout);
  timeout = setTimeout(func, delay)
}

export class SettingStore {
  @observable oneLetterShortcuts: ShortcutType[] = []

  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    storage.get({
      oneLetterShortcuts: [],
    }, (local: any) => {
      if (local.oneLetterShortcuts.length > 0) {
        this.oneLetterShortcuts = local.oneLetterShortcuts
      } else {
        this.setOneLetterShortcuts(defaultShortcutKeys)
      }
    })
  }

  @action
  setOneLetterShortcuts(oneLetterShortcuts: ShortcutType[]) {
    this.oneLetterShortcuts = oneLetterShortcuts
    debounce( () => {
      storage.set({ oneLetterShortcuts: toJS(this.oneLetterShortcuts) })
      console.log('sync called')
    }, 1000)
  }
}
