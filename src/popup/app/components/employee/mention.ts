import { IRemoteServer } from '../../models/GithubServer'
import { IServer } from './EmployeeContainer'

class UrlParse {
  protocol: string = ''
  hostname: string = ''
  firstSegment?: string = ''

  constructor(url: string) {
    const split = url?.split('/')
    if (Array.isArray(split)) {
      this.protocol = split[0]
      this.hostname = split[2]
      if (split.length > 2) {
        this.firstSegment = split[3]
      }
    }
  }
}

const isSameHost = (urlA: string | undefined, urlB: string | undefined) => {
  if (urlA === undefined || urlB === undefined) {
    return false
  }

  const hostA = new UrlParse(urlA)
  const hostB = new UrlParse(urlB)

  return hostA.hostname === hostB.hostname
}

export const sendUserIdToActiveTab = (server: IServer, githubServers: IRemoteServer[]) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs = []) => {
    const activeTab = tabs[0]

    githubServers.map(githubServer => {
      if (
        server.name.toLocaleLowerCase() === githubServer.name.toLocaleLowerCase()
        && isSameHost(activeTab.url, githubServer.base_url)
      ) {
        chrome.tabs.sendMessage(activeTab.id || 0, { mention: '@' + server.loginId })
      }
    })
  })
}
