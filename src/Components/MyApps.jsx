"use client";
import React from 'react'
import { Provider } from 'react-redux';
import { store } from '@/app/ReduxToolkit/store';

export default function MyApps({children}) {
  return (
    <>
        <Provider store={store}>
            {children}
        </Provider>
    </>
  )
}
