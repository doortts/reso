import { getEnv } from './service'

test('getEnv', () => {
  return getEnv().then((data: Object) => {
    expect(data).toHaveProperty('LDAP_SERVER')
    expect(data).toHaveProperty('PHOTO_SERVER')
    expect(data).toHaveProperty('BOT_TOKEN')
    expect(data).toHaveProperty('CLIENT_ID')
    expect(data).toHaveProperty('GITHUB_API_BASE_URL')
    expect(data).toHaveProperty('GITHUB_ENTERPRISE_API_BASE_URLS')
    expect(data).toHaveProperty('ADDRESS_PAGE')
    expect(data).toHaveProperty('SUPPORT_PAGE')
    expect(data).toHaveProperty('LAST_UPDATE')
  });
});
