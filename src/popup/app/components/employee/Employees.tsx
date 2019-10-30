import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import { storeContext } from '../../context'
import Employee, { IEmployee } from './Employee'
import { useObserver } from 'mobx-react-lite';

interface Props {
  employees?: Array<Object>
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

export const Employees: React.FC<Props> = props => {
  const classes = useStyles()
  const store = React.useContext(storeContext)

  if (!store) throw Error("Store shouldn't be null")

  return useObserver(() => {
    return (
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <div>Employee list</div>
          <List>
            {store.employees.map((employee: IEmployee) => (
              <Employee key={employee.uid} employee={employee} />
            ))}
          </List>
        </Paper>
      </Grid>
    );
  })
}

export default Employees