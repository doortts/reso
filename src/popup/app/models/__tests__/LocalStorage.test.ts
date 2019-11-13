import { storage } from '../LocalStorage'

test('LocalStorage: set', (done) => {
  let toStore = { name: 'john'}
  let getFromStore = { name: ''}
  
  expect(storage).toBeDefined()
  storage.set(toStore)
  storage.get(getFromStore, (item)=>{
    expect(item.name).toEqual('john')
    done()
  })
})
