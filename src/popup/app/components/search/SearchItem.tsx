import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import { EmployeeStore } from '../../store/EmployeeStore'
import { SettingStore, ShortcutType } from '../../store/SettingStore'
import { CustomSnackbar, SnackbarVariant } from '../snackbar'
import useSearchItemStyle from './searchItemStyles'

let imeUpdating = false

const handleCompositionUpdate = (e: React.CompositionEvent<HTMLInputElement>) => {
  imeUpdating = true
}

const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
  imeUpdating = false
}

const defaultSnackbarOptions = {
  open: false,
  message: '',
  variant: SnackbarVariant.Info,
}

const hideSnackbar = (snackbarOptions: any, setSnackbarOptions: any) => {
  setSnackbarOptions({ ...snackbarOptions, open: false })
}

export const openShortcutLink = (shortcut: ShortcutType | undefined) => {
  if (shortcut) {
    if (shortcut.target === 'newTab') {
      chrome?.tabs.create({ url: shortcut.url })
    } else {
      chrome?.windows.create({ url: shortcut.url })
    }
    return
  }
}

export const SearchItem = () => {
  const store = useStore() as EmployeeStore
  const settingStore = useStore(StoreType.Setting) as SettingStore
  store.inputRef = useRef()

  const history = useHistory()
  const [keywords, setKeywords] = useState('')
  const [snackbarOptions, setSnackbarOptions] = useState(defaultSnackbarOptions)

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    hideSnackbar(snackbarOptions, setSnackbarOptions)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value)

    if (snackbarOptions.open) {
      hideSnackbar(snackbarOptions, setSnackbarOptions)
    }
  }

  const handleSearch = () => {
    if (keywords.length === 0) {
      return
    }

    const foundShortcut = settingStore.oneLetterShortcuts
      .find(shortcut => shortcut.key.toLowerCase().split('').includes(keywords))

    if (foundShortcut) {
      openShortcutLink(foundShortcut)
      return
    }

    if (keywords.length < 2) {
      setSnackbarOptions({
        ...snackbarOptions,
        variant: SnackbarVariant.Error,
        open: true,
        message: '2글자 이상 입력해야 합니다',
      })
      return
    }

    history.push('/')
    store.findEmployees(keywords)
  }

  //
  // Another parts of keyboard actions exists at Employee.tsx #handleClick
  // See: Employee.tsx @handleClick
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (imeUpdating) {
      return
    }

    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        handleSearch()
        break
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        e.preventDefault()
        store.increaseSelectedEmployeeIndex()
        break
      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        e.preventDefault()
        store.decreaseSelectedEmployeeIndex()
        break
      default:
        break
    }
  }

  useEffect(() => {
    store.inputRef?.current.focus()
  }, [])

  const classes = useSearchItemStyle()

  return (
    <React.Fragment>
      <div className={classes.search}>
        <InputBase
          placeholder="Type keywords…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={keywords}
          onKeyDown={handleKeyDown}
          onCompositionUpdate={handleCompositionUpdate}
          onCompositionEnd={handleCompositionEnd}
          onChange={handleChange}
          inputRef={store.inputRef}
        />
        <Button
          size="small"
          color="primary"
          className={classes.margin}
          onClick={handleSearch}
        >
          <div className={classes.searchIcon}>
            Search<SearchIcon />
          </div>
        </Button>
        <CustomSnackbar
          options={snackbarOptions}
          handleClose={handleClose}
        />
      </div>
    </React.Fragment>
  )
}

export default SearchItem
