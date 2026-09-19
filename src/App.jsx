import { useState } from 'react'
import SceneBackground from './components/SceneBackground'
import BootScreen from './components/BootScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Work from './components/Work'
import Experience from './components/Experience'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SceneBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Work />
        <Experience />
        <Stats />
        <Contact />
      </main>
      <Footer />
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
    </div>
  )
}