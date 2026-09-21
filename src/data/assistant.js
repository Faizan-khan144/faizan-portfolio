import { profile } from './profile'
import { skillCategories } from './skills'
import { journey } from './journey'
import { projects } from './projects'

export const suggestedPrompts = [
  'Who is Faizan?',
  'What is React?',
  'Tell me about OpenTrace',
  'What are his skills?',
  'How did his journey start?',
  'Is he open to work?',
  'How do I contact him?',
]

function greetings() {
  return {
    text: `Hi there! I'm Faizan's AI assistant. I can tell you about ${profile.firstName} - his skills, projects, coding journey, and how to reach him. What would you like to know?`,
    links: [],
  }
}

function about() {
  return {
    text: `${profile.name} is a ${profile.role} based in ${profile.location}. ${profile.intro}\n\n${profile.shortBio.join(' ')}`,
    links: [],
  }
}

function skills() {
  const list = skillCategories
    .map((c) => `• ${c.label}: ${c.skills.join(', ')}`)
    .join('\n')
  return {
    text: `He works with:\n\n${list}\n\nHe's currently learning Node.js, Express.js and MongoDB as part of the MERN stack.`,
    links: [{ label: 'View full skills', url: '/skills' }],
  }
}

const techKnowledge = {
  mern: {
    text: 'MERN is the MongoDB + Express + React + Node stack. Faizan is strong on the React front-end and is currently learning Node.js, Express.js and MongoDB to complete the full stack.',
    links: [{ label: 'Skills', url: '/skills' }],
  },
  mongodb: {
    text: 'MongoDB is a document database that stores data in flexible, JSON-like documents. Faizan is learning it as the "M" of the MERN stack for full-stack apps.',
    links: [],
  },
  tailwind: {
    text: 'Tailwind CSS is a utility-first CSS framework. Faizan styles everything with it - tokens, dark mode and responsive layouts, including this whole portfolio.',
    links: [],
  },
  javascript: {
    text: 'JavaScript is Faizan\'s core language. Every bit of interactivity here - the typewriter, the terminal, the marquee and even this chat - is JavaScript (React) in action.',
    links: [{ label: 'Project: DevDock', url: '/projects' }],
  },
  express: {
    text: 'Express.js is a lightweight web framework for Node.js that handles routes, middleware and REST APIs. Faizan is learning it as the "E" in the MERN stack.',
    links: [],
  },
  nodejs: {
    text: 'Node.js lets JavaScript run on the server. Faizan is currently learning it as part of the MERN stack - building full-stack applications end to end.',
    links: [],
  },
  react: {
    text: 'React is a component-based JavaScript library for building user interfaces. It is Faizan\'s main framework - this portfolio, DevDock, CryptoLens and OpenTrace all run on it.',
    links: [{ label: 'React projects', url: '/projects' }],
  },
  python: {
    text: 'Python is Faizan\'s second language. He uses it for scripting and built his first Python project - a Student Management System covering OOP, records and JSON data storage.',
    links: [],
  },
  vite: {
    text: 'Vite is a fast build tool for modern web apps. This whole site is built and bundled with Vite.',
    links: [],
  },
  github: {
    text: 'GitHub hosts his public repos and deploys. All of his work - including this portfolio - lives under github.com/Faizan-khan144.',
    links: [{ label: 'GitHub', url: profile.github }],
  },
  git: {
    text: 'Git is the version-control tool he uses daily - committing and pushing every change to GitHub.',
    links: [],
  },
  css: {
    text: 'CSS powers the look - layout, color and animation. Combined with Tailwind, it\'s how every page in this portfolio is styled.',
    links: [],
  },
  html: {
    text: 'HTML is the skeleton of every page. Faizan\'s portfolio markup - semantic sections, forms and accessible labels - is all HTML5.',
    links: [],
  },
}

function techReply(input) {
  const keys = Object.keys(techKnowledge).sort((a, b) => b.length - a.length)
  const hit = keys.find((k) => input.includes(k))
  if (!hit) return null
  const t = techKnowledge[hit]
  return {
    text: t.text,
    links: t.links,
  }
}

function focusAreas(tokens) {
  const text = tokens.join(' ')
  const frontend = ['frontend', 'html', 'css', 'react', 'tailwind', 'ui', 'javascript', 'js']
  const backend = ['backend', 'node', 'express', 'mern', 'server', 'api', 'mongodb']
  if (frontend.some((t) => text.includes(t))) {
    return {
      text: `Frontend is his home turf: ${skillCategories[0].skills.join(', ')}. He builds responsive, component-driven interfaces and focuses on clean structure and thoughtful design.`,
      links: [{ label: 'Frontend skills', url: '/skills' }],
    }
  }
  if (backend.some((t) => text.includes(t))) {
    return {
      text: `He's currently learning the backend side of the MERN stack - ${skillCategories[1].skills.join(', ')} and ${skillCategories[2].skills.join(', ')} - to build complete full-stack applications.`,
      links: [],
    }
  }
  if (text.includes('python')) {
    return {
      text: 'He also uses Python for scripting and built his first Python project - a Student Management System applying OOP, records management and JSON data storage.',
      links: [],
    }
  }
  return null
}

function projectsReply() {
  const featured = projects.filter((p) => p.featured)
  const lines = featured
    .map((p) => `• ${p.title}${p.live ? ` - ${p.live}` : ''}`)
    .join('\n')
  return {
    text: `He's shipped ${profile.facts[2].value} projects - ${profile.facts[0].value} public repos on GitHub. Here are his featured ones:\n\n${lines}\n\nHe's also built ecommerce stores, banking sites, agency websites, games and developer tools.`,
    links: [
      { label: 'See all projects', url: '/projects' },
      { label: 'GitHub', url: profile.github },
    ],
  }
}

function projectDetail(tokens) {
  const query = tokens.join(' ')
  const hit = projects.find(
    (p) => p.title.toLowerCase() !== 'faizan portfolio' && query.includes(p.title.toLowerCase())
  )
  if (!hit) return null
  return {
    text: `${hit.title} - ${hit.description}\n\nTech: ${hit.tech.join(', ')}`,
    links: [
      { label: 'Source code', url: hit.github },
      ...(hit.live ? [{ label: 'Live demo', url: hit.live }] : []),
    ],
  }
}

function journeyReply() {
  const steps = journey.map((j) => `${j.period} · ${j.title}: ${j.text}`).join('\n')
  return {
    text: `He started with the fundamentals and kept building:\n\n${steps}`,
    links: [{ label: 'Full journey', url: '/journey' }],
  }
}

function internship() {
  return {
    text: 'In 2026 he completed the CodeAlpha frontend internship - practical, project-based work delivered end to end. His internship tasks live on GitHub.',
    links: [{ label: 'Internship tasks', url: 'https://github.com/Faizan-khan144/codealpha_tasks' }],
  }
}

function contact() {
  return {
    text: `He's ${profile.availability.toLowerCase()} and happy to take on new challenges. Questions, collaborations and job offers - email is the fastest way:\n\n${profile.email}\n\nHe's also on LinkedIn and X.`,
    links: [
      { label: 'Email him', url: `mailto:${profile.email}` },
      { label: 'Contact page', url: '/contact' },
      { label: 'LinkedIn', url: profile.linkedin },
    ],
  }
}

function location() {
  return {
    text: `He's based in ${profile.location} and open to remote-friendly opportunities.`,
    links: [],
  }
}

function current() {
  return {
    text: profile.currentFocus,
    links: [{ label: 'GitHub', url: profile.github }],
  }
}

function thanks() {
  return {
    text: "You're welcome! Anything else you'd like to know about Faizan?",
    links: [],
  }
}

function fallback() {
  return {
    text: `I can only talk about Faizan and the things he works with. Try one of these:\n\n• Who is Faizan?\n• What is React? Tell me about MERN, Tailwind or Python\n• Tell me about OpenTrace or DevDock\n• What are his skills?\n• How did his journey start?\n• Is he open to work?\n• How do I contact him?`,
    links: [],
  }
}

const rules = [
  { keywords: ['hello', 'hi', 'hey', 'salam', 'salaam', 'assalam', 'alo', 'yo'], reply: greetings },
  { keywords: ['who', 'about', 'introduce', 'yourself', 'background', 'tell'], reply: about },
  { keywords: ['skill', 'tech', 'stack', 'know', 'languages', 'expert'], reply: skills },
  { keywords: ['project', 'work', 'build', 'built', 'portfolio', 'create', 'made', 'experience', 'career', 'resume'], reply: projectsReply },
  { keywords: ['journey', 'history', 'start', 'begin', 'timeline', 'learn', 'story', 'how'], reply: journeyReply },
  { keywords: ['intern', 'codealpha', 'program'], reply: internship },
  { keywords: ['contact', 'email', 'reach', 'hire', 'job', 'opportunity', 'collaborate', 'freelance', 'offer'], reply: contact },
  { keywords: ['location', 'where', 'karachi', 'based', 'from', 'city'], reply: location },
  { keywords: ['focus', 'currently', 'now', 'learning', 'current'], reply: current },
  { keywords: ['thank', 'thanks', 'appreciate', 'awesome', 'great', 'cool', 'nice', 'good'], reply: thanks },
]

export function getReply(raw) {
  const input = ` ${raw.toLowerCase()} `.replace(/\s+/g, ' ')
  const tokens = input.split(/\s+/)

  const detail = projectDetail(tokens)
  if (detail) return detail

  const tech = techReply(input)
  if (tech) return tech

  const focused = focusAreas(tokens)
  if (focused) return focused

  let best = null
  let bestScore = 0
  for (const rule of rules) {
    const score = rule.keywords.filter((k) => input.includes(k)).length
    if (score > bestScore) {
      bestScore = score
      best = rule
    }
  }
  if (best) return best.reply()

  return fallback()
}