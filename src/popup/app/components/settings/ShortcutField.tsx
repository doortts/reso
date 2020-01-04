import React, { useState } from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { StoreType, useStore } from '../../context'
import { SettingStore, ShortcutType } from '../../store/SettingStore'

interface IProps {
  shortcut: ShortcutType
  renderButton: React.ReactElement
}

const ShortcutField = (props: IProps) => {
  const store = useStore(StoreType.Setting) as SettingStore

  const { shortcut, renderButton: RenderButton } = props
  const [keyMap, setKeyMap] = useState({ ...shortcut })

  const handleKeyMapChange = (name: keyof typeof keyMap) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const exist = store.oneLetterShortcuts.find(current => current.idx === keyMap.idx)

    if (exist) { // update existing one letter link
      setKeyMap({
        ...keyMap,
        [name]: event.target.value,
      })

      const updatedShortcuts = store.oneLetterShortcuts.map(current => {
        if (current.idx === keyMap.idx) {
          return ({
            ...keyMap,
            [name]: event.target.value,
          })
        } else {
          return current
        }
      })

      store.setOneLetterShortcuts(updatedShortcuts)
    } else {
      store.newCandidateShortcut = {
        ...keyMap,
        [name]: event.target.value,
      }
      setKeyMap(store.newCandidateShortcut)
    }
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
