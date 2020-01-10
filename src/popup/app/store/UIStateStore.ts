import { observable } from 'mobx'
import { SnackbarVariant } from '../components/snackbar'
import RootStore from './RootStore'

interface ISnackbarOptions {
  open: boolean
  message: string
  variant: SnackbarVariant
}

export class UIStateStore {
  @observable snackbarOptions: ISnackbarOptions = {
    open: false,
    message: '',
    variant: SnackbarVariant.Info,
  }

  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  hideSnackbar = () => {
    if (this.snackbarOptions.open) {
      this.snackbarOptions = { ...this.snackbarOptions, open: false }
    }
  }

  showSnackbar = (snackbarOptions?: ISnackbarOptions) => {
    if (snackbarOptions) {
      this.snackbarOptions = { ...snackbarOptions, open: true }
    } else {
      this.snackbarOptions = { ...this.snackbarOptions, open: true }
    }
  }
}
