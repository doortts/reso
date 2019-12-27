// react-unstable-attributes.d.ts
import React from 'react'

import styled from 'styled-components'

import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'

import Starred from './Starred'
import { IEmployee } from './EmployeeContainer'
import ServerNames from './ServerNames'

interface Props {
  employee: IEmployee
}

const addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
}

const ContentLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 3px;
  padding-top: 3px;
`

const useStyles = makeStyles(theme => ({
  listItemAvatar: {
    minWidth: '46px',
    paddingLeft: '5px',
    paddingBottom: '2px',
  },
  Avatar: {
    border: '1px solid #f1f1f1',
  },
  listItemPrimaryText: {
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  listItemSecondaryText: {
    fontSize: '11px',
    color: 'inherit',
  },
  listItemText: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export const EmployeeView: React.FC<Props> = React.memo(({ employee }) => {
  const classes = useStyles()
  const { displayName, photoUrl, idExistingServers, department, mail } = employee

  return (
    <ContentLayout>
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar className={classes.Avatar}>
          <img
            src={photoUrl}
            width="40px"
            onError={addDefaultSrc}
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
              className={classes.listItemPrimaryText}
            >
              <span>{displayName}</span>
              <ServerNames idExistingServers={idExistingServers} />
            </Typography>
          </>
        }
        secondary={
          <div className={classes.listItemText}>
            <Typography
              className={classes.listItemSecondaryText}
              color="textSecondary"
              variant="inherit"
              noWrap
            >
              {department}, {mail}
            </Typography>
          </div>
        } />
      <Starred employee={employee} />
    </ContentLayout>
  )
})
