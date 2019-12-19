import React from 'react'
import { useObserver } from 'mobx-react-lite'

import { useStore } from '../../context'
import {
  Button,
  Card, CardActions,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  Typography, useTheme
} from '@material-ui/core'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy';
  }
}

const addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 200,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
)

export const EmployeeDetail = () => {
  const store = useStore()

  const classes = useStyles()
  const theme = useTheme()

  return useObserver(() => {
      let employee = store.getSelectedEmployee()
      if (!employee) {
        return (<div></div>)
      }
      const {
        company,
        employeeNumber,
        displayName,
        photoUrl,
        department,
        mail,
        telephoneNumber
      } = employee

      return (
        <div style={{ position: 'sticky', top: '70px' }}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image={photoUrl}
              title="Employee Photo"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {displayName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <div>{company} </div>
                  <div style={{ color: '#2196F3' }}>{employeeNumber}</div>
                  <div>{department} </div>
                  <div>{telephoneNumber} </div>
                  <div>{mail}</div>
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <CardActions>
                  <Button size="small" color="primary">
                    Show More
                  </Button>
                </CardActions>
              </div>
            </div>
          </Card>
        </div>
      )
    }
  )
}
