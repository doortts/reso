import { EmployeeStore } from '../EmployeeStore'
import mockEmployees from './mockEmployees'

describe('EmployeeStore', () => {
  test('addToFavoriteUser', () => {
    // Given
    const store = new EmployeeStore()

    // When
    store.addToFavoriteEmployees(mockEmployees[0])

    // Then
    expect(store.favoriteEmployees[0].employeeNumber).toEqual(mockEmployees[0].employeeNumber)
  })

  test('removeFromFavoriteUser', () => {
    // Given
    const store = new EmployeeStore()
    const [user1, user2, user3] = mockEmployees

    store.addToFavoriteEmployees(user1)  // [user1]
    store.addToFavoriteEmployees(user2)  // [user2, user1]
    store.addToFavoriteEmployees(user3)  // [user3, user2, user1]

    // When
    store.removeFromFavoriteEmployees(user1)

    // Then
    expect(store.favoriteEmployees.length).toEqual(2)
    expect(store.favoriteEmployees[0].employeeNumber).toEqual(user3.employeeNumber)
    expect(store.favoriteEmployees[1].employeeNumber).toEqual(user2.employeeNumber)
  })

})
