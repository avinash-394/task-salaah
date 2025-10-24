import { useState } from 'react'
import './App.css'
import Gallery from './components/Gallery'

function App() {
  // keep minimal App wrapper — the gallery lives in its own component
  return (
    <div id="root">
      

      <Gallery />

      
    </div>
  )
}

export default App
