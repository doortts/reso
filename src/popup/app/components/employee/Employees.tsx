import React from 'react'

import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { EmployeeDetail } from './EmployeeDetail'
import { EmployeeList } from './EmployeeList'

const useStyles = makeStyles(theme => ({
  ul: {
    listStyleType: 'none',
    position: 'sticky',
    top: '70px',
  },
}))

const Employees = () => {
  const classes = useStyles()

  return (
    <>
      <Grid item xs={5}>
        <div>Employee list</div>
        <ul className={classes.ul}>
          <EmployeeList />
        </ul>
      </Grid>
      <Grid item xs={7}>
        <EmployeeDetail />
      </Grid>
    </>
  )
}

export default Employees
