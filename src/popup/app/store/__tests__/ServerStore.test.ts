import { ServerStore } from '../ServerStore'

const mockEnv = {
  LDAP_SERVER: 'https://ldap-server.example.com',
  PHOTO_SERVER: 'https://photo-server.example.com',
  BOT_TOKEN: 'bot-token-abcd',
  CLIENT_ID: 'client-id-abcd',
  GITHUB_API_BASE_URL: 'https://api.github.com/v3',
  GITHUB_ENTERPRISE_API_BASE_URLS: [
    {
      name: 'enterprise A',
      base_url: 'https://a-enterprise-a.exmaple.com/api/v3',
      token: 'a-enterprise-a-token-abc',
    },
    {
      name: 'enterprise B',
      base_url: 'https://b-enterprise-b.exmaple.com/api/v3',
      token: 'b-enterprise-b-token-abc',
    }],
  MAIL_PAGE: 'http://mail.example.com/',
  ADDRESS_PAGE: 'http://address.example.com',
  URLS: {
    a: 'http://aaa.example.com',
    b: 'https://bbb.example.com',
  },
  SUPPORT_PAGE: 'https://support.example.com',
  LAST_UPDATE: '20191108',
  LOG_SERVER: 'log.example.com',
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
