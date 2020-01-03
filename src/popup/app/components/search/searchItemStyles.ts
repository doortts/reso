import { createStyles, makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useSearchItemStyle = makeStyles(theme =>
  createStyles({
    search: {
      position: 'relative',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      borderRadius: theme.shape.borderRadius,
      boxSizing: 'border-box',
      border: '2px solid #1976d2',
      '&:focus-within': {
        border: '2px solid #3f51b5',
      },
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 2),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 200,
        '&:focus': {
          width: 200,
        },
      },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '2px',
    },
    margin: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    menu: {
      width: 200,
    },
  }),
)

export default useSearchItemStyle
