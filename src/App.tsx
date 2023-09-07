import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TalkWithPolyGlot from './pages/talkWithPolyglot'
import Header from './components/header/header'
import Footer from './components/footer/footer'

function App() {
 

  return (
    <main className='flex flex-col w-full gap-8 min-h-screen'>
      <Header/>
      <TalkWithPolyGlot/>
      <Footer/>
    </main>
  )
}

export default App
