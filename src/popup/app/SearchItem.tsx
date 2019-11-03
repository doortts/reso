import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Store } from './store/Store'
import { storeContext } from './context'

interface Props {
  keyword?: string
}

export const SearchItem: React.FC<Props> = props => {
  const classes = useStyles()
  const store = React.useContext(storeContext) || new Store()
  const [keywords, setKeywords] = useState("")

  const handleChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value)
  }

  const handleClick = () => {
    store.getEmployees(keywords)
  }

  const handleKeyDown = () => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      store.setEmployees([])
      handleClick()
    }
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        placeholder="Type keywords"
        className={classes.textField}
        value={keywords}
        onChange={handleChange()}
        onKeyDown={handleKeyDown()}
        margin="dense"
        autoFocus
      />
      <Button
        variant="outlined"
        size="small"
        color="primary"
        className={classes.margin}
        onClick={() => { handleClick() }}
      >
        Search
      </Button>
      <div>{keywords}</div>
    </form>
  );
}

const useStyles = makeStyles(theme => ({
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
  },
}));

export default SearchItem
