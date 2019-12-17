const noop = () => {}

interface StorageItem {
  (items: { [key: string]: any }): void
}

export class LocalStorage {
  get = (item: any, callback: StorageItem) => {
    if (!chrome.storage) {
      let results = {} as any
      Object.keys(item).map(key => {
        let defaultValue = '{}'

        if (Array.isArray(item[key])) {
          defaultValue = '[]'
        }
        results[key] = JSON.parse(localStorage.getItem(key) || defaultValue)
      })
      callback(results)
    } else {
      chrome.storage.local.get(item, callback)
    }
  }

  set = (item: any, callback?: Function) => {
    if (!chrome.storage) {
      Object.keys(item).map(key => {
        localStorage.setItem(key, JSON.stringify(item[key]))
      })
    } else {
      chrome.storage.local.set(item)
    }
  }
}

export const storage = new LocalStorage()
