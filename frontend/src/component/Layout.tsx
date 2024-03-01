import React from 'react'

type layoutType = {
  Component: React.ReactNode
}

export const Layout = ({ Component }: layoutType) => {

  return (
    <main className='main' data-testid='main'>
      <div className='container'>
          {Component}
      </div>
    </main>
  )
}