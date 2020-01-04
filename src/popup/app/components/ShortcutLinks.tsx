import React from 'react'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Tooltip from '@material-ui/core/Tooltip'

import { StoreType, useStore } from '../context'
import { SettingStore, ShortcutType } from '../store/SettingStore'
import { openShortcutLink } from './search/SearchItem'

interface Props {
  keyword?: string
}

export const ShortcutLinks: React.FC<Props> = props => {
  const store = useStore(StoreType.Setting) as SettingStore

  const handleClick = (shortcut: ShortcutType) => (e: React.MouseEvent) => openShortcutLink(shortcut)

  return (
    <>
      <div>
        <ButtonGroup size="small" aria-label="small outlined button group">
          {store.oneLetterShortcuts.map(shortcut => (
            <Tooltip key={shortcut.key} title={'단축키워드 ' + shortcut.key} aria-label="add">
              <Button onClick={handleClick(shortcut)}>{shortcut.desc}</Button>
            </Tooltip>
          ))}
        </ButtonGroup>
      </div>
    </>
  )
}

export default ShortcutLinks
