import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

interface Props {
}

export const Starred: React.FC<Props> = props => {
  return (
    <Checkbox icon={<StarBorder />} checkedIcon={<Star />} value="checked" />
  )
}

export default Starred
