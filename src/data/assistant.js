import { profile } from './profile'
import { skillCategories } from './skills'
import { journey } from './journey'
import { projects } from './projects'

export const suggestedPrompts = [
  'Who is Faizan?',
  'What are his skills?',
  'What has he built?',
  'How did he start coding?',
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
    text: `I'm not sure about that one, but I can help with these:\n\n• Who is Faizan?\n• What are his skills?\n• What has he built?\n• How did he start coding?\n• Is he open to work?\n• How do I contact him?`,
    links: [],
  }
}

const rules = [
  { keywords: ['hello', 'hi', 'hey', 'salam', 'salaam', 'assalam', 'alo', 'yo'], reply: greetings },
  { keywords: ['who', 'about', 'introduce', 'yourself', 'background', 'tell'], reply: about },
  { keywords: ['skill', 'tech', 'stack', 'know', 'languages', 'expert'], reply: skills },
  { keywords: ['project', 'work', 'build', 'built', 'portfolio', 'create', 'made'], reply: projectsReply },
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