import { useEffect } from 'react'

const SITE_URL = 'https://faizan-portfolio-kappa.vercel.app'
const OG_IMAGE = `${SITE_URL}/og.jpg`

function setMeta(attr, key, content) {
  const selector = `meta[${attr}="${key}"]`
  let meta = document.head.querySelector(selector)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, key)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

export default function Seo({ title, description, path = '' }) {
  const url = path ? `${SITE_URL}${path}` : `${SITE_URL}/`

  useEffect(() => {
    document.title = title

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', OG_IMAGE)

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
