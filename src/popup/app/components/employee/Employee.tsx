// react-unstable-attributes.d.ts
declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: "auto" | "eager" | "lazy";
  }
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Starred from '../../Starred'

export interface IEmployee {
  uid: string
  cn: string
  displayName: string
  employeeNumber: string
  company: string
  department: string
  mail: string
  telephoneNumber: string
  photoUrl: string
}

interface Props {
  employee: IEmployee
}

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  listItePrimaryText: {
    fontSize: '14px'
  },
  listIteSecondaryText: {
    fontSize: "11px",
  },
  listItemText: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));

const addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
}

export const Employee: React.FC<Props> = props => {
  const classes = useStyles()
  const { employee } = props

  return (
    <ListItem className={classes.listItem} button>
      <ListItemAvatar>
        <Avatar>
          <img
            src={employee.photoUrl}
            width="40px"
            onError={e => addDefaultSrc(e)}
            loading="lazy"
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
              {employee.displayName}
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
  );
}

export default Employee
