import axios from 'axios'

export interface IRemoteServer {
  name: string
  base_url: string
  token: string
}

export class GithubServer implements IRemoteServer {
  name: string
  base_url: string
  token: string
  type: string = "Github Enterprise" // Just for the marking

  constructor(name: string, base_url: string, token: string) {
    this.name = name
    this.base_url = base_url
    this.token = token
  }

  findUserByEmail = (email: string) => {
    return axios({
      method: 'GET',
      url: `${this.base_url}/search/users?q=${email}`,
      headers: {
        "Authorization": `token ${this.token}`
      }
    })
  }

  searchUserIdFromRemote = (userId: string) => {
    return axios({
      method: 'GET',
      url: `${this.base_url}/users/${userId}`,
      headers: {
        "Authorization": `token ${this.token}`
      }
    })
  }
}
