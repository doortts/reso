import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { EmployeeList } from './EmployeeList'
import { EmployeeDetail } from './EmployeeDetail'

interface Props {
  employees?: Array<Object>
}

const useStyles = makeStyles(theme => ({
  ul: {
    listStyleType: 'none',
    position: 'sticky',
    top: '70px'
  }
}))

const Employees = () => {
  const classes = useStyles()

  return (
    <>
      <Grid item xs={4}>
        <div>Employee list</div>
        <ul className={classes.ul}>
          <EmployeeList />
        </ul>
      </Grid>
      <Grid item xs={8}>
        <EmployeeDetail />
      </Grid>
    </>
  )
}

export default Employees
