import React from 'react'

import { observer } from 'mobx-react-lite'

import { storeContext } from '../context'
import { EmployeeStore } from '../store/EmployeeStore'

interface Props {
    keyword?: string
}

export const HelpMessage: React.FC<Props> = observer(props => {
    const store = React.useContext(storeContext) || new EmployeeStore()
    return (
        <div>Help messages here. {store.state}</div>
    )
})

export default HelpMessage
