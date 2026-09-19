import PageTransition from '../components/PageTransition'
import Projects from '../components/Projects'
import ContactCta from '../components/ContactCta'

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <Projects />
        <ContactCta />
      </div>
    </PageTransition>
  )
}