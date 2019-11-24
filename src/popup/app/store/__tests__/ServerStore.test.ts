import { ServerStore } from '../ServerStore'

const mockEnv = {
  "LDAP_SERVER": "https://ldap-server.example.com",
  "PHOTO_SERVER": "https://photo-server.example.com",
  "BOT_TOKEN": "bot-token-abcd",
  "CLIENT_ID": "client-id-abcd",
  "GITHUB_API_BASE_URL": "https://api.github.com/v3",
  "GITHUB_ENTERPRISE_API_BASE_URLS": [
    {
      "name": "enterprise A",
      "base_url": "https://a-enterprise-a.exmaple.com/api/v3",
      "token": "a-enterprise-a-token-abc"
    },
    {
      "name": "enterprise B",
      "base_url": "https://b-enterprise-b.exmaple.com/api/v3",
      "token": "b-enterprise-b-token-abc"
    }],
  "MAIL_PAGE": "http://mail.example.com/",
  "ADDRESS_PAGE": "http://address.example.com",
  "URLS": {
    "a": "http://aaa.example.com",
    "b": "https://bbb.example.com",
  },
  "SUPPORT_PAGE": "https://support.example.com",
  "LAST_UPDATE": "20191108",
  "LOG_SERVER": "log.example.com"
}

describe('ServerStore', () => {
  test('getDefaultId', () => {
    // Given
    const serverStore = new ServerStore()
    serverStore.init(mockEnv)

    // When // Then
    expect(serverStore.getDefaultId('suwon.chae@naverlabs.com'))
      .toEqual('suwon-chae')
  })

  test('findByName', () => {
    // Given
    const serverStore = new ServerStore()
    serverStore.init(mockEnv)

    // When // Then
    expect(serverStore.findByName('enterprise A')).toBe(serverStore.githubServers[0])
  })
})

const mockEmployee = [
  {
    "uid": "jisoo.lee",
    "cn": "이지수",
    "displayName": "이지수[스마트월드]",
    "employeeNumber": "KR12345",
    "company": "NAVER Corporation",
    "department": "스마트보드",
    "title": null,
    "mail": "jisoo.lee@navercorp.com",
    "telephoneNumber": "031-784-1234",
    "description": "이지수",
    "_links": {
      "self": {
        "href": "http://mention-ldap.naverlabs.com/api/users/jisoo.lee"
      },
      "mail": {
        "href": "http://mention-ldap.naverlabs.com/api/users/mail/jisoo.lee@navercorp.com"
      }
    }
  },
  {
    "uid": "jisoo.h.lee",
    "cn": "이지수",
    "displayName": "이지수",
    "employeeNumber": "KR13579",
    "company": "NAVER Corporation",
    "department": "Biz AI",
    "title": null,
    "mail": "jisoo.h.lee@navercorp.com",
    "telephoneNumber": "031-784-0002",
    "description": "이지수",
    "_links": {
      "self": {
        "href": "http://mention-ldap.naverlabs.com/api/users/jisoo.h.lee"
      },
      "mail": {
        "href": "http://mention-ldap.naverlabs.com/api/users/mail/jisoo.h.lee@navercorp.com"
      }
    }
  },
  {
    "uid": "j.jisoo",
    "cn": "정지수",
    "displayName": "정지수",
    "employeeNumber": "NL87654",
    "company": "NAVER LABS Corporation",
    "department": "Works Design",
    "title": null,
    "mail": "j.jisoo@naverlabs.com",
    "telephoneNumber": "031-784-9999",
    "description": "정지수",
    "_links": {
      "self": {
        "href": "http://mention-ldap.naverlabs.com/api/users/j.jisoo"
      },
      "mail": {
        "href": "http://mention-ldap.naverlabs.com/api/users/mail/j.jisoo@worksmobile.com"
      }
    }
  }
]
