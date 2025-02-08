import { useState } from 'react'
import './App.css'
import Fir from './components/fir'
import { ConnectButton } from "@rainbow-me/rainbowkit";
function App() {
  
 // Check if wallet is connected when the app loads
 
  
  return (
   <>
   <Fir/>
    <ConnectButton />
   </>
  )
}

export default App
