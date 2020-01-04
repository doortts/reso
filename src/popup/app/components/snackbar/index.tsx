import React, { SyntheticEvent } from 'react'

import { useObserver } from 'mobx-react-lite'

import clsx from 'clsx'

import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles, Theme } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'

import { StoreType, useStore } from '../../context'
import { UIStateStore } from '../../store/UIStateStore'
import useSnackbarStyles from './snackbarStyles'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

export interface Props {
  className?: string
  message?: string
  onClose?: () => void
  variant: keyof typeof variantIcon
}

const SnackbarContentWrapper = (props: Props) => {
  const classes = useSnackbarStyles()
  const { className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

const useStyles2 = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

export enum SnackbarVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export const CustomSnackbar = () => {
  const uiStateStore = useStore(StoreType.UI) as UIStateStore

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    console.log('hide called', reason)
    if (reason === 'clickaway') {
      return
    }

    uiStateStore.hideSnackbar()
  }

  const classes = useStyles2()

  return useObserver(() => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={uiStateStore.snackbarOptions.open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackbarContentWrapper
        variant={uiStateStore.snackbarOptions.variant}
        className={classes.margin}
        message={uiStateStore.snackbarOptions.message}
        onClose={handleClose}
      />
    </Snackbar>
  ))
}
