import React from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import { Fab, useScrollTrigger, Zoom } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import StoreProvider from './context'
import SearchItem from './SearchItem'
import HelpMessage from './HelpMessage'
import ShortcutLinks from './ShortcutLinks'
import Employees from './components/employee/Employees'
import ResetCss from './global-styles/css-reset'
import Scrollbar from './global-styles/scrollbar'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollBtn: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
)

function ScrollTop(props: Props) {
  const { children, window } = props
  const classes = useStyles()
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrollBtn}>
        {children}
      </div>
    </Zoom>
  )
}

function ElevationScroll(props: Props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const App = () => {
  const classes = useStyles()

  return (
    <StoreProvider>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <SearchItem />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />
      <div style={{ padding: 5 }}>
        <HelpMessage />
        <ShortcutLinks />
        <Grid container justify="center" spacing={1}>
          <Employees />
        </Grid>
      </div>
      <ResetCss />
      <Scrollbar />
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </StoreProvider>
  )
}

export default App
