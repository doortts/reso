import React, { useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { storeContext } from '../../context'
import { Store } from '../../store/Store'
import { EmployeeList } from './EmployeeList'
import { EmployeeDetail } from './EmployeeDetail'

interface Props {
  employees?: Array<Object>
}

const useStyles = makeStyles(theme => ({
  ul: {
    listStyleType: 'none',
  }
}))

const Employees: React.FC<Props> = React.memo(props => {
  const classes = useStyles()

  const store: Store = React.useContext(storeContext) || new Store()
  if (!store) throw Error('Store shouldn\'t be null')

  return useObserver(() => {
    return (
      <>
        <Grid item xs={4}>
          <div>Employee list</div>
          <ul className={classes.ul}>
            <EmployeeList
              employees={store.employees}
              githubServers={store.githubServers}
            />
          </ul>
        </Grid>
        <Grid item xs={8}>
          <EmployeeDetail />
        </Grid>
      </>
    )
  })
})

export default Employees
