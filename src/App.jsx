import { useState } from 'react'
import './App.css'
import Gallery from './components/Gallery'

function App() {
  // keep minimal App wrapper — the gallery lives in its own component
  return (
    <div id="root">
      <header style={{textAlign: 'center', marginBottom: '1.25rem'}}>
        <h1 style={{margin: 0}}>Modern Image Gallery</h1>
        <p style={{color: '#666', marginTop: '.5rem'}}>Responsive grid with hover effects and a lightbox</p>
      </header>

      <Gallery />

      <footer style={{textAlign: 'center', marginTop: '2rem', color: '#999'}}>
        <small>Built with Vite + React — demo gallery</small>
      </footer>
    </div>
  )
}

export default App
