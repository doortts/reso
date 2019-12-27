import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import createStyles from '@material-ui/core/styles/createStyles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import Settings from '@material-ui/icons/Settings'

import EmployeePage from './components/employee/EmployeePage'
import SettingPage from './components/settings/SettingPage'
import StoreProvider from './context'
import ResetCss from './global-styles/css-reset'
import Scrollbar from './global-styles/scrollbar'
import HelpMessage from './components/HelpMessage'
import SearchItem from './components/search/SearchItem'
import ShortcutLinks from './components/ShortcutLinks'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: React.ReactElement
}

const useStyles = makeStyles(theme =>
  createStyles({
    scrollBtn: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    AppBar: {
      backgroundColor: '#1976d2',
    },
    Toolbar: {
      justifyContent: 'space-between',
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
      <Router>
        <ElevationScroll>
          <AppBar className={classes.AppBar}>
            <Toolbar className={classes.Toolbar}>
              <SearchItem />
              <Link to="/settings">
                <IconButton aria-label="display more actions" edge="end">
                  <Settings style={{color: 'white'}}/>
                </IconButton>
              </Link>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar id="back-to-top-anchor" />
        <Switch>
          <Route path="/settings">
            <div style={{ padding: 5, backgroundColor: '#fafafa' }}>
              <SettingPage />
            </div>
          </Route>
          <Route path="/">
            <div style={{ padding: 5, backgroundColor: '#fafafa' }}>
              <HelpMessage />
              <ShortcutLinks />
              <Grid container justify="center" spacing={1}>
                <EmployeePage />
              </Grid>
            </div>
            <ResetCss />
            <Scrollbar />
            <ScrollTop>
              <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUp />
              </Fab>
            </ScrollTop>
          </Route>
        </Switch>
      </Router>
    </StoreProvider>
  )
}

export default App
