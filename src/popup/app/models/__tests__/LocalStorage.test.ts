import { storage } from '../LocalStorage'

test('LocalStorage: set', (done) => {
  // Given
  let toStore = { name: 'john' }
  let getFromStore = { name: '' }

  expect(storage).toBeDefined()

  // When
  storage.set(toStore)

  // Then
  storage.get(getFromStore, (item) => {
    expect(item.name).toEqual('john')
    done()
  })
})

test('LocalStorage: set', (done) => {
  // Given
  let toStore = {
    ENV: {
      server: '127.0.0.1',
      secret: 'abceca'
    },
  }

  let getFromStore = {
    ENV: {}
  }

  expect(storage).toBeDefined()

  // When
  storage.set({ENV: toStore.ENV })

  // Then
  storage.get(getFromStore, (item) => {
    expect(item.ENV.server).toEqual('127.0.0.1')
    done()
  })
})

