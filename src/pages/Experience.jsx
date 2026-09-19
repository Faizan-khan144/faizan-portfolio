import PageTransition from '../components/PageTransition'
import Experience from '../components/Experience'
import ContactCta from '../components/ContactCta'

export default function ExperiencePage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <Experience />
        <ContactCta />
      </div>
    </PageTransition>
  )
}