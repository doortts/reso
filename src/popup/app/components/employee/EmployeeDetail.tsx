import React from 'react'
import { HTMLAttributes } from 'react'

import { useObserver } from 'mobx-react-lite'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import createStyles from '@material-ui/core/styles/createStyles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import Typography from '@material-ui/core/Typography'

import { useStore } from '../../context'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy'
  }
}

const addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
}

const useStyles = makeStyles(theme =>
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
      const employee = store.getSelectedEmployee()
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
        telephoneNumber,
      } = employee

      return (
        <div style={{ position: 'sticky', top: '70px' }}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              component="img"
              image={photoUrl}
              onError={addDefaultSrc}
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
    },
  )
}
