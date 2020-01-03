import React, { useState } from 'react'

import Button from '@material-ui/core/Button'

import { StoreType, useStore } from '../../context'
import { SettingStore } from '../../store/SettingStore'
import ShortcutField from './ShortcutField'

const OneLetterShortcuts = () => {
  const store = useStore(StoreType.Setting) as SettingStore

  const handleChange = () => {
    console.log('handle')
  }

  const handleDelete = () => {
    console.log('handleDelete')
  }

  const handleAdd = () => {
    console.log('handle add')
  }

  return (
    <>
      <h2>한 글자 단축키</h2>
      {store.oneLetterShortcuts.map(shortcut => (
        <ShortcutField
          key={shortcut.key}
          shortcut={shortcut}
          renderButton={
            <Button
              style={{ color: 'red' }}
              onClick={handleDelete}
            >- Del</Button>
          }
        />
      ))}
      <ShortcutField
        shortcut={{
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
    </>
  )
}

export default OneLetterShortcuts
