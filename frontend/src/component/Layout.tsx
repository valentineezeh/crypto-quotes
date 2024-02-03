import React from 'react'
import Logo from '../KNAB.png'

type layoutType = {
  Component: React.ReactNode
}

export const Layout = ({ Component }: layoutType) => {

  return (
    <main className='main' data-testid='main'>
      <div className='container'>
        <img src={Logo} alt='logo' />
          {Component}
      </div>
  </main>
  )
}