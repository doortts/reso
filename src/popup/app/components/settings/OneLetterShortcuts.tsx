import React from 'react'

import { useObserver } from 'mobx-react-lite'

import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { StoreType, useStore } from '../../context'
import { SettingStore, ShortcutType } from '../../store/SettingStore'
import ShortcutField from './ShortcutField'

const useStyles = makeStyles(theme => createStyles({
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

const OneLetterShortcuts = () => {
  const store = useStore(StoreType.Setting) as SettingStore

  const handleDelete = (oneLetterShortcut: ShortcutType) => () => {
    store.setOneLetterShortcuts(
      store.oneLetterShortcuts.filter(shortcut => shortcut.idx !== oneLetterShortcut.idx)
    )
  }

  const handleAdd = () => {
    store.addOneLetterShortcut()
  }

  const classes = useStyles()
  const keyForAdd = Date.now()

  return useObserver(() => (
    <div style={{ margin: '35px' }}>
      <h2 className={classes.h2}>한 글자 단축키</h2>
      {store.oneLetterShortcuts.map(shortcut => (
        <div key={shortcut.idx}>
          <ShortcutField
            shortcut={shortcut}
            renderButton={
              <Button
                style={{ color: 'red' }}
                onClick={handleDelete(shortcut)}
              >- Del</Button>
            }
          />
        </div>
      ))}
      <div key={keyForAdd}>
        <ShortcutField
          shortcut={{
            idx: keyForAdd,
            key: '',
            desc: '',
            url: '',
            target: 'newTab',
          }}
          renderButton={
            <Button
              style={{ color: '#03a9f4' }}
              onClick={handleAdd}
            >+ Add</Button>
          }
        />
      </div>
    </div>
  ))
}

export default OneLetterShortcuts
