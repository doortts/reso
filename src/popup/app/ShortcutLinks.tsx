import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  keyword?: string
}

export const ShortcutLinks: React.FC<Props> = props => {
  return (
    <div>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button>Mail</Button>
        <Button>kitchen</Button>
        <Button>Working-Hour</Button>
      </ButtonGroup>
    </div>
  );
}

export default ShortcutLinks
