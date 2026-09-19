import PageTransition from '../components/PageTransition'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <Contact />
      </div>
    </PageTransition>
  )
}