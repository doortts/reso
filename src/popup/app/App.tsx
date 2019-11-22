import React from 'react';
import Grid from '@material-ui/core/Grid';

import StoreProvider from './context';
import SearchItem from './SearchItem'
import HelpMessage from './HelpMessage'
import ShortcutLinks from './ShortcutLinks'
import Employees from './components/employee/Employees'
import Repositories from './components/repository/Repositories'
import Issues from './components/issue/Issues'
import ResetCss from './global-styles/css-reset'
import Scrollbar from './global-styles/scrollbar'

const App: React.FC = () => {
  return (
    <StoreProvider>
      <div style={{padding: 5}}>
        <SearchItem />
        <HelpMessage />
        <ShortcutLinks />
        <Grid container justify="center" spacing={1}>
          <Employees />
          <Repositories />
          <Issues />
        </Grid>
      </div>
      <ResetCss />
      <Scrollbar />
    </StoreProvider>
  );
}

export default App;
