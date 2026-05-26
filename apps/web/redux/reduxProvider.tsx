"use client"

import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import reduxStore from './store'

const ReduxProvider = ({children} : {children: ReactNode}) => {
  return <>
    <Provider store={reduxStore}>
    {children}
  </Provider>
  </>
}

export default ReduxProvider