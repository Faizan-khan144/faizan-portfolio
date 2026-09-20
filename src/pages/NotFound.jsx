import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <PageTransition>
      <Seo
        title="Page not found - Faizan Khan"
        description="The page you are looking for does not exist."
      />
      <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <p className="font-mono text-6xl font-semibold text-accent">404</p>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">
          This page doesn't exist.
        </h1>
        <p className="mt-3 max-w-sm text-muted">
          The link may be broken, or the page may have been moved to a new home.
        </p>
        <Link
          to="/"
          className="btn-base mt-8 bg-accent text-accent-ink hover:bg-accent/90"
        >
          Back to home
        </Link>
      </Container>
    </PageTransition>
  )
}