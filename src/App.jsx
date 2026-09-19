import SceneBackground from './components/SceneBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Process from './components/Process'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Profile from './components/Profile'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative">
      <SceneBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Process />
        <Projects />
        <Experience />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}