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

import { StoreType, useStore } from '../../context'
import { EmployeeStore } from '../../store/EmployeeStore'
import { UIStateStore } from '../../store/UIStateStore'
import { SnackbarVariant } from '../snackbar'
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
  h1: {
    display: 'block',
    fontSize: '2em',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold',
  },
  h2: {
    display: 'block',
    fontSize: '1.5em',
    marginBlockStart: '0.83em',
    marginBlockEnd: '0.83em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold',
  },
  link: {
    color: '#2373f4',
  },
}))

const SettingPage = () => {
  const employeeStore = useStore(StoreType.Employee) as EmployeeStore
  const uiStore = useStore(StoreType.UI) as UIStateStore

  const handleClearAll = () => {
    employeeStore.favoriteEmployees = []
    chrome.storage.local.clear()
    chrome.storage.sync.clear(() => {
      uiStore.showSnackbar({
        variant: SnackbarVariant.Success,
        open: true,
        message: '모든 설정을 초기화 하였습니다',
      })
    })
  }

  const mainifest = chrome?.runtime?.getManifest && chrome?.runtime?.getManifest()
  const version = mainifest?.version ? 'v' + mainifest.version : ''

  const classes = useStyles()

  return (
    <>
      <h2 className={classes.h2}>
        <Link to="/" className={classes.link}>⬅ Back</Link>
      </h2>
      <div style={{ margin: '35px' }}>
        <h1 className={classes.h1}>설정 페이지</h1>
        <div>{version}</div>
        <div>
          {/* tslint:disable-next-line:max-line-length */}
          Report bug:
          <a
            href="https://oss.navercorp.com/communication-service/kick"
            target="_blank"
            className={classes.link}
          >https://oss.navercorp.com/communication-service/kick</a>
        </div>

      </div>
      <Paper className={classes.paper}>
        <h2 className={classes.h2}>초기화</h2>
        <div>
          <div>Clear all internally saved data including Star bookmarks</div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearAll}
            >
              CLEAR ALL SETTINGS
            </Button>
          </div>
        </div>
      </Paper>
      <div style={{ margin: '35px' }}>
        <OneLetterShortcuts />
      </div>
      <Paper className={classes.paper}>
        <div>
          <h2 className={classes.h2}>Shortcut keys</h2>
        </div>
        <div>
          플러그인 실행 기본 단축키 변경은 URL에
          <span className={classes.link}> chrome://extensions/shortcuts </span>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => {
              navigator.clipboard.writeText('chrome://extensions/shortcuts')
            }}
          >URL 복사</Button> 를 입력하시면 변경 가능합니다.
        </div>
        <div>
          <Table aria-label="simple table" size="small" className={classes.table}>
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
              <TableRow key="Cmd + Enter">
                <TableCell component="th" scope="row">CMD + Enter / ALT + Enter</TableCell>
                <TableCell>사원 정보 상세 페이지 열기</TableCell>
              </TableRow>
              <TableRow key="Shift + Enter">
                <TableCell component="th" scope="row">Shift + Enter</TableCell>
                <TableCell>채팅창 열기</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p>
          * 멘션 기능은 사내 Github Enterprise 사이트와 사내메일의 이메일주소 입력창에서만 동작합니다.
        </p>
      </Paper>
    </>
  )
}

export default SettingPage
