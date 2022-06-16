import React from 'react'
import { Outlet } from 'react-router-dom'
//import clientStyles from './client.module.css'
import Header from './header'
function Client() {
  return (
    <>
    <Header />
   <Outlet></Outlet>
   </>
  )
}

export default Client