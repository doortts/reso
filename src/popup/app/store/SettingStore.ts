import { action, observable, reaction, toJS } from 'mobx'

import { SnackbarVariant } from '../components/snackbar'
import { storage } from '../models/LocalStorage'
import RootStore from './RootStore'

export interface ShortcutType {
  [index: string]: any

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
  clearTimeout(timeout)
  timeout = setTimeout(func, delay)
}

export const getDefaultShortcut = () => ({
  idx: Date.now(),
  key: '',
  desc: '',
  url: '',
  target: 'newTab',
}) as ShortcutType

export class SettingStore {
  @observable oneLetterShortcuts: ShortcutType[] = []
  newCandidateShortcut: ShortcutType

  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.newCandidateShortcut = getDefaultShortcut()

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
  setOneLetterShortcuts(oneLetterShortcuts: ShortcutType[], delay = 1000) {
    this.oneLetterShortcuts = oneLetterShortcuts
    debounce(() => {
      storage.set({ oneLetterShortcuts: toJS(this.oneLetterShortcuts) })
    }, delay)
  }

  @action
  addOneLetterShortcut() {
    let validated = true

    Object.keys(this.newCandidateShortcut).forEach(key => {
      if (!this.newCandidateShortcut[key]) {
        this.rootStore.uiStateStore.showSnackbar({
          variant: SnackbarVariant.Error,
          open: true,
          message: `${key} 항목이 비어 있습니다`,
        })
        validated = false
        return
      }
    })

    if (!validated) {
      return false
    }

    this.setOneLetterShortcuts([...this.oneLetterShortcuts, this.newCandidateShortcut], 0)
    this.newCandidateShortcut = getDefaultShortcut()
    return true
  }
}
