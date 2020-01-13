import React from 'react'

import { observer, useObserver } from 'mobx-react-lite'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'
import MailIcon from '@material-ui/icons/Mail'

import { useStore } from '../../context'
import { EmployeeStore } from '../../store/EmployeeStore'
import ServerNames from './ServerNames'
import Tooltip from '@material-ui/core/Tooltip'

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
    chatIcon: {
      color: 'green',
    },
  })
)

export const EmployeeDetail = observer(() => {
  const store = useStore() as EmployeeStore
  const employee = store.getSelectedEmployee()

  const classes = useStyles()
  const theme = useTheme()

  const handleShowMore = () => {
    chrome?.windows.create({ url: store.getEmployeeAddressPageUrl() })
  }

  const handleOpenChat = () => {
    const chatUrl = `https://talk.navercorp.com/join?mailList=["${employee?.mail}"]`
    chrome?.windows.create({ url: chatUrl, type: 'popup', width: 1024, height: 900 })
  }

  const handleOpenMail = () => {
    const mailUrl = `https://mail.navercorp.com/write/popup/?to="${employee?.displayName}"<${employee?.mail}>`
    chrome?.windows.create({ url: mailUrl, width: 660, height: 960, type: 'popup' })
  }

  return useObserver(() => {
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
                  <div>
                    <ButtonGroup aria-label="outlined primary button group">
                      <Tooltip title={'Shift+Enter'} aria-label="open chat">
                        <Button onClick={handleOpenChat}>
                          <ChatIcon fontSize="small" className={classes.chatIcon} />
                        </Button>
                      </Tooltip>
                      <Button onClick={handleOpenMail}>
                        <MailIcon fontSize="small" className={classes.chatIcon} />
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div>
                    <ServerNames
                      idExistingServers={employee?.idExistingServers}
                      showLoginId={true}
                    />
                  </div>
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleShowMore}
                  >
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
})
