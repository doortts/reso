import axios from 'axios'
import { storage } from './LocalStorage'

let ENV: any = {}

const envCall = axios.create({
  baseURL: 'http://mention.naverlabs.com',
  timeout: 1000
});

export const findEmployees = (query: string) => {
  return axios({
      method: 'GET',
      url: `${ENV.LDAP_SERVER}/api/users/search?q=*${query}*&searchFields=displayName`,
      headers: {
          "Content-Type": "text/plain"
      }
  })
}

export const findGithubUserByEmail = (email: string) => {
  return axios({
    method: 'GET',
    url: `${ENV.GITHUB_API_BASE_URL}/search/users?q=${email}+in:email`,
    headers: {
      "Authorization": `token ${ENV.BOT_TOKEN}`
    }
  })
}

export const findUserPhotoByEmail = (email: string) => {
  return axios({
    method: 'GET',
    url: `${ENV.PHOTO_SERVER}/json/${email}`
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
