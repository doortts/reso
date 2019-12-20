import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import createStyles from '@material-ui/core/styles/createStyles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import SearchIcon from '@material-ui/icons/Search'

import { storeContext } from './context'
import { EmployeeStore } from './store/EmployeeStore'

const useStyles = makeStyles(theme =>
  createStyles({
    search: {
      position: 'relative',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      borderRadius: theme.shape.borderRadius,
      boxSizing: 'border-box',
      border: '2px solid #1976d2',
      '&:focus-within': {
        border: '2px solid #3f51b5',
      },
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 2),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 200,
        '&:focus': {
          width: 200,
        },
      },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '2px',
    },
    margin: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    menu: {
      width: 200,
    },
  }),
)

let imeUpdating = false

export const SearchItem = () => {
  const classes = useStyles()
  const history = useHistory()
  const store = React.useContext(storeContext) || new EmployeeStore()
  const [keywords, setKeywords] = useState('')

  store.inputRef = useRef()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value)
  }

  const handleSearch = () => {
    history.push('/')
    store.findEmployees(keywords)
  }

  const handleCompositionUpdate = (e: React.CompositionEvent<HTMLInputElement>) => {
    imeUpdating = true
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    imeUpdating = false
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (imeUpdating) { return }

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
      </div>
    </React.Fragment>
  )
}

export default SearchItem
