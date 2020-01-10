import React from 'react'

import { observer } from 'mobx-react-lite'

import Backdrop from '@material-ui/core/Backdrop'
import Chip from '@material-ui/core/Chip'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import FaceIcon from '@material-ui/icons/Face'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import TagFacesIcon from '@material-ui/icons/TagFaces'

import { useStore } from '../context'
import { EmployeeStore } from '../store/EmployeeStore'

interface Props {
  keyword?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
)

const getRandomTip = () => {
  const tips = [
    '키보드 방향키를 이용해서 검색결과 목록을 이동할 수 있습니다',
    'F 를 누르면 언제든 검색창으로 이동합니다',
    '이름 뒤에 "oss"나 "es"가 붙은 유저는 해당 서버 계정이 확인된 유저입니다.',
    'm 이나 c 등을 검색어로 입력해보세요. 한 글자 단축 링크 이동을 지원합니다. 설정 페이지 참고',
  ]
  const randomIndex = Math.floor(Math.random() * Math.floor(tips.length))
  return tips[randomIndex]
}

export const HelpMessage: React.FC<Props> = observer(props => {
  const store = useStore() as EmployeeStore
  const classes = useStyles()

  const getStateFace = () => {
    if (store.state.toLowerCase() === 'ready') {
      return (<FaceIcon />)
    } else if (store.state.toLowerCase() === 'done' || store.state.toLowerCase().startsWith('found')) {
      return (<TagFacesIcon />)
    } else {
      return (<MoodBadIcon />)
    }
  }

  const getStateBgColor = () => {
    if (store.state.toLowerCase() === 'ready') {
      return ('#e0e0e0')
    } else if (store.state.toLowerCase() === 'done' || store.state.toLowerCase().startsWith('found')) {
      return ('#8bc34a')
    } else if (store.state.toLowerCase().startsWith('error')) {
      return ('#ff8a65')
    } else {
      return ('#a1887f')
    }
  }

  return (
    <div>
      <Chip
        icon={getStateFace()}
        className={classes.chip}
        label={store.state}
        style={{ backgroundColor: getStateBgColor()}}
      />
      {getRandomTip()}
      <Backdrop
        className={classes.backdrop}
        open={store.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
})

export default HelpMessage
