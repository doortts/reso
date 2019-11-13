const noop = () => {}

interface StorageItem {
  (items: { [key: string]: any }): void
}

export class LocalStorage {
  get = (item: any, callback: StorageItem) => {
    if (!chrome.storage) {
      let results = {} as any
      Object.keys(item).map(key => {
        results[key] = localStorage.getItem(key) || {}
      })
      callback(results)
    } else {
      chrome.storage.local.get(item, callback)
    }
  }

  set = (item: any, callback?: Function) => {
    if (!chrome.storage) {
      Object.keys(item).map(key => {
        localStorage.setItem(key, item[key])
      })
    } else {
      chrome.storage.local.set(item);
    }
  }
}

export const storage = new LocalStorage()
