import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import OneLetterShortcuts from './OneLetterShortcuts'

const useStyles = makeStyles(theme => createStyles({
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
      <h1><Link to="/">⬅ Back</Link></h1>
      <h1>설정 페이지</h1>
      <div>
        {/* tslint:disable-next-line:max-line-length */}
        Report bug: <a href="https://oss.navercorp.com/communication-service/kick" target="_blank">https://oss.navercorp.com/communication-service/kick</a>
      </div>
      <h2>초기화</h2>
      <div>
        <div>Clear all internally saved data including Star bookmarks</div>
        <div><Button variant="contained" color="secondary">CLEAR ALL SETTINGS</Button></div>
      </div>
      <div>
        <OneLetterShortcuts />
      </div>
      <div>
        <div>
          <h2>Shortcut keys</h2>
        </div>
        <div>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ maxWidth: '100px' }}>Shortcut</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="f">
                <TableCell component="th" scope="row">f</TableCell>
                <TableCell>검색창으로 이동</TableCell>
              </TableRow>
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
              <TableRow key="Shift + Enter">
                <TableCell component="th" scope="row">ALT + Enter | CMD + Enter</TableCell>
                <TableCell>사내 주소 페이지 열기</TableCell>
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
