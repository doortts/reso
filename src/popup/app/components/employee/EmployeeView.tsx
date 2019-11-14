import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ServerNames from './ServerNames'
import Starred from '../../Starred'
import { useStore } from '../../context'
import { IEmployee } from './Employee'
import { makeStyles, Theme } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

const addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
}

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

interface Props {
  employee: IEmployee
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const EmployeeView: React.FC<Props> = observer<Props>(props => {
  const { employee, handleClick } = props
  let isSelected = false

  const store = useStore()
  const classes = useStyles()

  // TODO: Move to store
  if( store.employees[store.selectedEmployeeIndex].mail === employee.mail ) {
    isSelected = true
  }

  return (
    <ListItem
      button
      className={classes.listItem}
      onClick={handleClick}
      autoFocus={isSelected}
    >
      <ListItemAvatar>
        <Avatar>
          <img
            src={employee.photoUrl}
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
              <span>{employee.displayName}</span>
              <ServerNames user={employee} servers={employee.idExistingServers} />
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
              {employee.department}, {employee.mail}
            </Typography>
          </div>
        } />
      <Starred />
    </ListItem>
  )
})
