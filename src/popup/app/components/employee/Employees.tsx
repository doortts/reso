import React, { useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { storeContext } from '../../context'
import { Store } from '../../store/Store'
import { EmployeeList } from './EmployeeList'

interface Props {
  employees?: Array<Object>
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    maxHeight: '500px'
  },
  ul: {
    overflow: 'auto',
    maxHeight: '400px',
    listStyleType: 'none'
  }
}))

export const Employees: React.FC<Props> = React.memo(props => {
  const classes = useStyles()

  const store: Store = React.useContext(storeContext) || new Store()
  if (!store) throw Error('Store shouldn\'t be null')

  return useObserver(() => {
    return (
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <div>Employee list</div>
          <ul className={classes.ul}>
            <EmployeeList
              employees={store.employees}
              githubServers={store.githubServers}
            />
          </ul>
        </Paper>
      </Grid>
    )
  })
})

export default Employees
