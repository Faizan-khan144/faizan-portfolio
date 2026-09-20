import { useEffect } from 'react'

export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title

    let desc = document.head.querySelector('meta[name="description"]')
    if (!desc) {
      desc = document.createElement('meta')
      desc.setAttribute('name', 'description')
      document.head.appendChild(desc)
    }
    desc.setAttribute('content', description)

    const ogTitle = document.head.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    const ogDesc = document.head.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)
  }, [title, description])

  return null
}