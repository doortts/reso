import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { Button, createStyles, Paper, Theme } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles( (theme: Theme) => createStyles({
  paper: {
    margin: theme.spacing(2, 2),
    padding: theme.spacing(1, 2),
  },
  table: {
    minWidth: 450,
    maxWidth: 650,
  },
}))

const SettingPage = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <h1>Setting page</h1>
      <div><Link to="/">Back</Link></div>
      <h2>Reset</h2>
      <div>
        <div>Clear all internally saved data including Star bookmarks</div>
        <div><Button variant="contained" color="secondary">CLEAR ALL SETTINGS</Button></div>
      </div>
      <div>
        <div>
          <h2>Shortcut keys</h2>
        </div>
        <div>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{maxWidth: '100px'}}>Shortcut</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="Cmd+K">
                <TableCell size="small" component="th" scope="row"> Cmd + K </TableCell>
                <TableCell>Popup (Mac OS)</TableCell>
              </TableRow>
              <TableRow key="Alt+Shift+K">
                <TableCell component="th" scope="row">Alt + Shift + K</TableCell>
                <TableCell>Popup (Windows/Linux)</TableCell>
              </TableRow>
              <TableRow key="Enter">
                <TableCell component="th" scope="row">Enter</TableCell>
                <TableCell>Mention</TableCell>
              </TableRow>
              <TableRow key="Space">
                <TableCell component="th" scope="row">Space</TableCell>
                <TableCell>Multiple mention without closing window</TableCell>
              </TableRow>
              <TableRow key="f">
                <TableCell component="th" scope="row">Space</TableCell>
                <TableCell>Move focus to search box</TableCell>
              </TableRow>
              <TableRow key="Shift + Enter">
                <TableCell component="th" scope="row">Shift + Enter</TableCell>
                <TableCell>Show user address page or <br />Open project page</TableCell>
              </TableRow>
              <TableRow key="/">
                <TableCell component="th" scope="row">/</TableCell>
                <TableCell>Show project list only</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p>
          * 멘션 기능은 사내 Github Enterprise 사이트와 사내메일의 이메일주소 입력창에서만 동작합니다.
        </p>
      </div>
    </Paper>
  )
}

export default SettingPage
