import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import Doctors from './pages/Doctor/Doctors'
import DashboardUser from './pages/DashboardUser/DashboardUser'

function App() {

  return (
    <>
      <Home />
      <Doctors />
      <DashboardUser />
      {/* <h1>Docmate</h1> */}
    </>
  )
}

export default App
