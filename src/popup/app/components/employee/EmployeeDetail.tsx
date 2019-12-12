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

  const handleClick = () => {
    store.inputRef?.current?.focus()
  }

  return useObserver(() => {
      let employee = store.getSelectedEmployee()
      if (!employee) {
        return (<div></div>)
      }
      console.log('selected employee', employee?.displayName)
      const { company, employeeNumber, displayName, photoUrl, department, mail } = employee

      return (
        <div style={{ position: 'sticky', top: '70px' }}>
          <div><h1>Detail</h1></div>
          <div>
            <img
              src={photoUrl}
              onError={addDefaultSrc}
              loading="lazy"
              alt="Employee photo"
            />
          </div>
          <div>{company} </div>
          <div>{displayName} </div>
          <div>{employeeNumber}</div>
          <div>{department} </div>
          <div>{mail}</div>
          <div><button onClick={handleClick} >click</button></div>
        </div>
      )
    }
  )
}
