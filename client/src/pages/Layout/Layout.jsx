import React from 'react'
import { MainNavbar } from '../MainNavbar/MainNavbar'
import { Sidebar } from '../Sidebar/Sidebar'

export const Layout = () => {
  return (
    <div>
      <Sidebar />
      <MainNavbar/>
    </div>
  )
}