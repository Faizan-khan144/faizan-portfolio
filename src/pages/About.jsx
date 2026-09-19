import PageTransition from '../components/PageTransition'
import About from '../components/About'
import Process from '../components/Process'
import Profile from '../components/Profile'
import ContactCta from '../components/ContactCta'

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <About />
        <Process />
        <Profile />
        <ContactCta />
      </div>
    </PageTransition>
  )
}