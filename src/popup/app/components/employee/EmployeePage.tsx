import React from 'react'

import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { EmployeeDetail } from './EmployeeDetail'
import { Employees } from './Employees'

const useStyles = makeStyles(theme => ({
  ul: {
    listStyleType: 'none',
    position: 'sticky',
    top: '70px',
  },
}))

const EmployeePage = () => {
  const classes = useStyles()

  return (
    <>
      <Grid item xs={5}>
        <div>Employee list</div>
        <ul className={classes.ul}>
          <Employees />
        </ul>
      </Grid>
      <Grid item xs={7}>
        <EmployeeDetail />
      </Grid>
    </>
  )
}

export default EmployeePage
