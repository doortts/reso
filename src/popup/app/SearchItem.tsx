import React, { useState } from 'react';
import { Button, InputBase } from '@material-ui/core'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

import { Store } from './store/Store'
import { storeContext } from './context'

interface Props {
  keyword?: string
}

export const SearchItem = () => {
  const classes = useStyles()
  const store = React.useContext(storeContext) || new Store()
  const [keywords, setKeywords] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value)
  }

  const handleClick = () => {
    store.getEmployees(keywords)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }

    switch (e.key) {
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        store.increaseSelectedEmployeeIndex()
        console.log(store.selectedEmployeeIndex)
        break
      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        store.decreaseSelectedEmployeeIndex()
        console.log(store.selectedEmployeeIndex)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <div className={classes.search}>
        <InputBase
          placeholder="Type keywords…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={keywords}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
        />
        <Button
          size="small"
          color="primary"
          className={classes.margin}
          onClick={ handleClick }
        >
          <div className={classes.searchIcon}>
            Search<SearchIcon />
          </div>
        </Button>
      </div>
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
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
      marginTop: '2px'
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
    }
  }),
)

export default SearchItem
