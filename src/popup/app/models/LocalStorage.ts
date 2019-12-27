const noop = () => {}

type StorageItem = (items: { [key: string]: any }) => void

export class LocalStorage {
  get = (item: any, callback: StorageItem) => {
    if (chrome.storage) {
      chrome.storage.local.get(item, callback)
    } else {
      const results = {} as any
      Object.keys(item).map(key => {
        let defaultValue = '{}'

        if (Array.isArray(item[key])) {
          defaultValue = '[]'
        }
        results[key] = JSON.parse(localStorage.getItem(key) || defaultValue)
      })
      callback(results)

    }
  }

  set = (item: any, callback?: () => void) => {
    if (chrome.storage) {
      chrome.storage.local.set(item)
    } else {
      Object.keys(item).map(key => {
        localStorage.setItem(key, JSON.stringify(item[key]))
      })
    }
  }
}

export const storage = new LocalStorage()
