import axios from 'axios'
import { storage } from './LocalStorage'

let ENV: any = {}

const envCall = axios.create({
  baseURL: 'http://mention.naverlabs.com',
  timeout: 1000
});

export const findEmployees = (query: string) => {
  console.log('getEmployee called and ENV: ', ENV, query)
  ENV.LDAP_SERVER = "http://mention-ldap.naverlabs.com:9090"
  return axios({
      method: 'GET',
      url: `${ENV.LDAP_SERVER}/api/users/search?q=*${query}*&searchFields=displayName`,
      headers: {
          "Content-Type": "text/plain"
      }
  })
}

const loadEnvFromRemote = () => {
    envCall.get('/').then(function (response) {
        if (response.status === 200) {
            Object.assign(ENV, response.data);
            storage.set({
                ENV: ENV
            });
        }
    });
}

export const loadEnv = () => {
    storage.get({
        ENV: {}
    }, function (local: any) {
        if (!local.ENV.LDAP_SERVER) {
            loadEnvFromRemote();
        } else {
            Object.assign(ENV, local.ENV);
            loadEnvFromRemote();
        }
    });
}

loadEnvFromRemote()
