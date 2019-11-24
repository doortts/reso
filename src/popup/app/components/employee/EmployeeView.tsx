// react-unstable-attributes.d.ts
import Avatar from '@material-ui/core/Avatar'
import React from 'react'
import { IEmployee, IServer } from './EmployeeContainer'
import ServerNames from './ServerNames'
import { ListItemAvatar, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core'
import Starred from '../../Starred'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy';
  }
}

interface Props {
  employee: IEmployee
}

const addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
}

export const EmployeeView: React.FC<Props> = React.memo(({employee}) => {
  const classes = useStyles()
  const { displayName, photoUrl, idExistingServers, department, mail } = employee

  return (
    <React.Fragment>
      <ListItemAvatar>
        <Avatar>
          <img
            src={photoUrl}
            width="40px"
            onError={addDefaultSrc}
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
              <span>{displayName}</span>
              <ServerNames idExistingServers={idExistingServers} />
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
              {department}, {mail}
            </Typography>
          </div>
        } />
      <Starred />
    </React.Fragment>
  )
})

const useStyles = makeStyles((theme: Theme) => ({
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
}))
