import PageTransition from '../components/PageTransition'
import Services from '../components/Services'
import Skills from '../components/Skills'
import ContactCta from '../components/ContactCta'

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <Services />
        <Skills />
        <ContactCta />
      </div>
    </PageTransition>
  )
}