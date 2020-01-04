import React, { useState } from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { SettingStore, ShortcutType } from '../../store/SettingStore'
import { StoreType, useStore } from '../../context'

interface IProps {
  shortcut: ShortcutType
  renderButton: React.ReactElement
}

const ShortcutField = (props: IProps) => {
  const store = useStore(StoreType.Setting) as SettingStore

  const { shortcut, renderButton: RenderButton } = props
  const [keyMap, setKeyMap] = useState({ ...shortcut })

  const handleKeyMapChange = (name: keyof typeof keyMap) => (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setKeyMap({
      ...keyMap,
      [name]: event.target.value,
    })

    const updatedShortcuts = store.oneLetterShortcuts.map(currentShortcut => {
      if (currentShortcut.idx === keyMap.idx) {
        return ({
          ...keyMap,
          [name]: event.target.value,
        })
      } else {
        return currentShortcut
      }
    })

    store.setOneLetterShortcuts(updatedShortcuts)
  }

  return (
    <>
      <TextField
        style={{ width: '80px' }}
        placeholder="Key"
        size="small"
        value={keyMap.key}
        onChange={handleKeyMapChange('key')}
        required
      />
      <TextField
        style={{ width: '120px' }}
        placeholder="Desc"
        size="small"
        value={keyMap.desc}
        onChange={handleKeyMapChange('desc')}
        required
      />
      <TextField
        style={{ width: '300px' }}
        placeholder="url"
        size="small"
        value={keyMap.url}
        onChange={handleKeyMapChange('url')}
        required
      />
      <Select
        labelId="target-window-label"
        value={keyMap.target || 'newTab'}
        onChange={handleKeyMapChange('target')}
        style={{ height: '35px', width: '100px' }}
      >
        <MenuItem value={'newTab'}>New Tab</MenuItem>
        <MenuItem value={'newWindow'}>New Window</MenuItem>
      </Select>
      {RenderButton}
    </>
  )
}

export default ShortcutField
