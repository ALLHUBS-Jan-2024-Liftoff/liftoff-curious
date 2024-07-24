import React from 'react'
import HeaderComponent from './HeaderComponent'
import { Outlet } from 'react-router-dom'
import FooterComponent from './FooterComponent'

function Layout() {
  return (
    <div className="wrapper">
        <HeaderComponent/>
        <main>
            <Outlet/>
        </main>
        <FooterComponent/>
    </div>
  )
}

export default Layout