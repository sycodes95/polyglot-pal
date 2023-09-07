
import './App.css'
import TalkWithPolyGlot from './pages/talkWithPolyglot'
import Header from './components/header/header'
import Footer from './components/footer/footer'

function App() {
 

  return (
    <main className='flex flex-col items-center w-full min-h-screen gap-8'>
      <Header/>
        <TalkWithPolyGlot/>
    </main>
  )
}

export default App
