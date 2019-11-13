// react-unstable-attributes.d.ts
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy';
  }
}

import React from 'react'
import { computed } from 'mobx'
import { withStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import Starred from '../../Starred'
import ServerNames from './ServerNames'
import { GithubServer } from '../../models/GithubServer'

interface IServer {
  name: string,
  loginId: string
}

export interface IEmployee {
  uid: string
  cn: string
  displayName: string
  employeeNumber: string
  company: string
  department: string
  mail: string
  telephoneNumber: string
  photoUrl?: string
  idExistingServers: Array<IServer>
}

interface Props {
  employee: IEmployee
  servers: Array<GithubServer>
  isSelected: boolean
  classes?: any
}

export class Employee extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props)
    this.doesUserExist()
  }

  @computed get employee() {
    return this.props.employee
  }

  @computed get servers() {
    return this.props.servers
  }

  handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    this.employee.idExistingServers && this.employee.idExistingServers.map(server => console.log(server.name, server.loginId))
  }

  addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
  }

  guessDefaultLoginId = (email: string) => {
    return email.split('@')[0].replace(/\./g, '-')
  }

  doesUserExist = () => {
    var loginId = this.guessDefaultLoginId(this.employee.mail)
    this.employee.idExistingServers = []

    this.servers.map(targetServer => {
      targetServer.searchUserIdFromRemote(loginId)
        .then(response => {
          let remoteServer = {
            name: targetServer.name,
            loginId: loginId
          }
          this.employee.idExistingServers
          && this.employee.idExistingServers.push(remoteServer)
        })
        .catch(error => {
          // Fallback search using email
          //
          // There is reason for this fallback action. Neither default suspected oss id
          // nor email match exactly all the time to find oss user.
          // So two way check is more reliable.
          targetServer.findUserByEmail(this.employee.mail)
            .then(response => {
              if (response.data && response.data.items.length > 0) {
                this.employee.idExistingServers &&
                this.employee.idExistingServers.push({
                  name: targetServer.name,
                  loginId: response.data.items[0].login
                })
              }
            })
            .catch(error => {
              console.log('Not found')
            })
          return
        })
    })
  }

  render() {
    const {classes, isSelected} = this.props

    return (
      <ListItem
        button
        className={classes.listItem}
        onClick={e => this.handleClick(e)}
        autoFocus={isSelected}
      >
        <ListItemAvatar>
          <Avatar>
            <img
              src={this.employee.photoUrl}
              width="40px"
              onError={e => this.addDefaultSrc(e)}
              loading="lazy"
              alt="Employee photo"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <>
              <Typography
                variant="inherit"
                className={classes.listItePrimaryText}
              >
                <span>{this.employee.displayName}</span>
                <ServerNames user={this.employee} servers={this.employee.idExistingServers} />
              </Typography>
            </>
          }
          secondary={
            <div className={classes.listItemText}>
              <Typography
                className={classes.listIteSecondaryText}
                color="textSecondary"
                variant="inherit"
                noWrap
              >
                {this.employee.department}, {this.employee.mail}
              </Typography>
            </div>
          } />
        <Starred />
      </ListItem>
    )
  }
}

const styles = (theme: Theme) => ({
  listItem: {
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  listItePrimaryText: {
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center'
  },
  listIteSecondaryText: {
    fontSize: '11px'
  },
  listItemText: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
})


export default withStyles(styles)(Employee)
