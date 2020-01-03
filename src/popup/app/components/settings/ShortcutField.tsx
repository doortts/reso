import React, { useState } from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { ShortcutType } from '../../store/SettingStore'

interface IProps {
  shortcut: ShortcutType
  renderButton: React.ReactElement
}

const ShortcutField = (props: IProps) => {
  const { shortcut, renderButton: RenderButton } = props
  const [keyMap, setKeyMap] = useState({ ...shortcut })

  const handleKeyMapChange = (name: keyof typeof keyMap) => (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setKeyMap({
      ...keyMap,
      [name]: event.target.value,
    })
  }

  return (
    <>
      <TextField
        style={{ width: '100px' }}
        placeholder="Key"
        size="small"
        value={keyMap.key}
        onChange={handleKeyMapChange('key')}
        required
      />
      <TextField
        style={{ width: '100px' }}
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
