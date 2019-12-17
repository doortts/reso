import { EmployeeStore } from '../EmployeeStore'
import { IEmployee } from '../../components/employee/EmployeeContainer'

describe('EmployeeStore', () => {
  test('addToFavoriteUser', () => {
    // Given
    const store = new EmployeeStore()

    // When
    store.addToFavoriteEmployees(mockEmployee[0])

    // Then
    expect(store.favoriteEmployees[0].employeeNumber).toEqual(mockEmployee[0].employeeNumber)
  })

  test('removeFromFavoriteUser', () => {
    // Given
    const store = new EmployeeStore()
    const [user1, user2, user3] = mockEmployee

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

const mockEmployee: any = [
  {
    'uid': 'jisoo.lee',
    'cn': '이지수',
    'displayName': '이지수[스마트월드]',
    'employeeNumber': 'KR12345',
    'company': 'NAVER Corporation',
    'department': '스마트보드',
    'title': null,
    'mail': 'jisoo.lee@navercorp.com',
    'telephoneNumber': '031-784-1234',
    'description': '이지수',
    '_links': {
      'self': {
        'href': 'http://mention-ldap.naverlabs.com/api/users/jisoo.lee'
      },
      'mail': {
        'href': 'http://mention-ldap.naverlabs.com/api/users/mail/jisoo.lee@navercorp.com'
      }
    }
  },
  {
    'uid': 'jisoo.h.lee',
    'cn': '이지수',
    'displayName': '이지수',
    'employeeNumber': 'KR13579',
    'company': 'NAVER Corporation',
    'department': 'Biz AI',
    'title': null,
    'mail': 'jisoo.h.lee@navercorp.com',
    'telephoneNumber': '031-784-0002',
    'description': '이지수',
    '_links': {
      'self': {
        'href': 'http://mention-ldap.naverlabs.com/api/users/jisoo.h.lee'
      },
      'mail': {
        'href': 'http://mention-ldap.naverlabs.com/api/users/mail/jisoo.h.lee@navercorp.com'
      }
    }
  },
  {
    'uid': 'j.jisoo',
    'cn': '정지수',
    'displayName': '정지수',
    'employeeNumber': 'NL87654',
    'company': 'NAVER LABS Corporation',
    'department': 'Works Design',
    'title': null,
    'mail': 'j.jisoo@naverlabs.com',
    'telephoneNumber': '031-784-9999',
    'description': '정지수',
    '_links': {
      'self': {
        'href': 'http://mention-ldap.naverlabs.com/api/users/j.jisoo'
      },
      'mail': {
        'href': 'http://mention-ldap.naverlabs.com/api/users/mail/j.jisoo@worksmobile.com'
      }
    }
  }
]
