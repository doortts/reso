import React from 'react'
import { useObserver } from 'mobx-react-lite'

import { useStore } from '../../context'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy';
  }
}

const addDefaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = '/images/default-avatar-64.png'
}

export const EmployeeDetail = () => {
  const store = useStore()


  return useObserver(() => {
      let employee = store.getSelectedEmployee()
      if (!employee) {
        return (<div></div>)
      }
      console.log('selected employee', employee?.displayName)
      const { employeeNumber, displayName, photoUrl, department, mail } = employee

      return (
        <div style={{ position: 'sticky', top: '70px' }}>
          <div>Detail</div>
          <div>
            <img
              src={photoUrl}
              onError={addDefaultSrc}
              loading="lazy"
              alt="Employee photo"
            />
          </div>
          <div>{displayName} </div>
          <div>{employeeNumber}</div>
          <div>{department} </div>
          <div>{mail}</div>
        </div>
      )
    }
  )
}
