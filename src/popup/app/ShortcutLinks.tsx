import React from 'react'

import { Button, ButtonGroup } from '@material-ui/core'

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
  )
}

export default ShortcutLinks
