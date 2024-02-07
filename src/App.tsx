import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"


import { Login } from './components/login'
import { Register } from './components/register'
import { Navbar } from './components/Header/header'
import { MainPage, ResizableMain } from './pages/MainPage/MainPage'

function App() {


  return (
    <>
   
    <MainPage/>

    
    </>
  )
}

export default App
