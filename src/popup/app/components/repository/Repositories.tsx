import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

interface Props {
  keyword?: string
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export const Repositories: React.FC<Props> = props => {
  const classes = useStyles()

  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <div>Repository list</div>
      </Paper>
    </Grid>
  );
}

export default Repositories
