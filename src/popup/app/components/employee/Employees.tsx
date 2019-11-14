import React, { useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'

import { storeContext } from '../../context'
import Employee, { IEmployee } from './Employee'
import { Store } from '../../store/Store'

interface Props {
  employees?: Array<Object>
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}))

export const Employees: React.FC<Props> = props => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const store: Store = React.useContext(storeContext) || new Store()
  if (!store) throw Error('Store shouldn\'t be null')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()

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

  let listIndex = 0

  return useObserver(() => {
    return (
      <Grid item xs={4} onKeyDown={handleKeyDown}>
        <Paper className={classes.paper}>
          <div>Employee list</div>
          <List>
            {store.employees.map((employee: IEmployee) => {
              return (
                <Employee
                  key={employee.uid}
                  employee={employee}
                  servers={store.githubServers}
                />
              )
            })}
          </List>
        </Paper>
      </Grid>
    )
  })
}

export default Employees
