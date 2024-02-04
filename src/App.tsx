import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mood-toggle'
import { Login } from './components/login'
import { Register } from './components/register'


function App() {


  return (
    <>
 <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
 
   
    
    <ModeToggle/>
    <Register/>
    </ThemeProvider>
    
    </>
  )
}

export default App
