import { useEffect } from 'react'
import { profile } from '../data/profile'

const SITE_URL = 'https://faizan-portfolio-kappa.vercel.app'

function upsertMeta(selector, key, value) {
  let meta = document.head.querySelector(selector)
  if (!meta) {
    meta = document.createElement('meta')
    document.head.appendChild(meta)
  }
  meta.setAttribute(key, value)
}

export default function Seo({ title, description, path = '' }) {
  const url = `${SITE_URL}${path}`

  useEffect(() => {
    document.title = title

    upsertMeta('meta[name="description"]', 'name', description)
    upsertMeta('meta[property="og:title"]', 'property', title)
    upsertMeta('meta[property="og:description"]', 'property', description)
    upsertMeta('meta[property="og:url"]', 'property', url)
    upsertMeta('meta[name="twitter:title"]', 'name', title)
    upsertMeta('meta[name="twitter:description"]', 'name', description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, url])

  return null
}

export { SITE_URL }