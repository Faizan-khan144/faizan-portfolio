import { profile, socials } from '../../src/data/profile.js'
import { skillCategories } from '../../src/data/skills.js'
import { projects } from '../../src/data/projects.js'
import { journey } from '../../src/data/journey.js'
import { studio } from '../../src/data/studio.js'

function projectLine(p) {
  const bits = [`- ${p.name} (${p.category})`]
  if (p.description) bits.push(`  what: ${p.description}`)
  if (p.tech?.length) bits.push(`  tech: ${p.tech.join(', ')}`)
  if (p.stars) bits.push(`  github stars: ${p.stars}`)
  if (p.github) bits.push(`  code: ${p.github}`)
  if (p.live) bits.push(`  live: ${p.live}`)
  return bits.join('\n')
}

export function buildKnowledge() {
  const skills = skillCategories
    .map((c) => `- ${c.label}: ${c.skills.join(', ')}${c.description ? ` (${c.description})` : ''}`)
    .join('\n')

  const timeline = journey
    .map((j) => {
      const head = j.year || j.date || ''
      const title = j.title || j.role || ''
      const org = j.company || j.org ? ` at ${j.company || j.org}` : ''
      return `- ${head} ${title}${org}${j.description ? `: ${j.description}` : ''}`
    })
    .join('\n')

  return `
## WHO HE IS
Name: ${profile.name} (goes by ${profile.firstName})
Role: ${profile.role} - ${profile.tagline}
Founder: ${studio.role} of ${studio.name} (${studio.url})
Location: ${profile.location}
Availability: ${profile.availability}
Email: ${profile.email}

## BIO
${profile.intro}

${profile.shortBio.join('\n\n')}

Hero description: ${profile.heroDescription}

Current focus: ${profile.currentFocus}

## SKILLS
${skills}

Also works with: ${profile.array}

## STATS
${profile.facts.map((f) => `- ${f.value} ${f.label}`).join('\n')}

## STUDIO / COMPANY
${studio.name} - ${studio.tagline}
Role: ${studio.role}
What it is: ${studio.description}
Stack: ${studio.stack.join(', ')}
Website: ${studio.url}
${studio.highlights.map((h) => `- ${h}`).join('\n')}

## PROJECTS (${projects.length} total)
${projects.map(projectLine).join('\n')}

## JOURNEY
${timeline}

## SOCIAL LINKS
${socials.map((s) => `- ${s.label}: ${s.url}`).join('\n')}
`.trim()
}

export const SYSTEM_PROMPT = `You are the AI assistant embedded in ${profile.firstName}'s personal developer portfolio.

Your job: answer ANY question a visitor might ask about ${profile.firstName} - his skills, projects, tech choices, journey, availability, contact details, or the portfolio site itself.

RULES:
1. Use ONLY the KNOWLEDGE BASE below for facts about him. Never invent projects, dates, numbers, clients, or credentials that are not listed there.
2. If a question is outside the knowledge base, say so honestly and offer what you do know. Never guess.
3. Be concise and friendly. 2-4 sentences for simple questions. Use short bullet lists when comparing or listing more than 3 items.
4. When you list projects, mention the tech stack. When asked about skills, tie them to real projects from the knowledge base.
5. If someone asks about hiring, availability or contact, mention he is ${profile.availability} and share the email: ${profile.email}.
6. Keep formatting light - no markdown headings. Occasional **bold** and \`code\` is fine.
7. You are speaking to a potential client, employer or fellow developer. Sound like a knowledgeable, modest representative of him.
8. ${profile.firstName} is the founder and CEO of ${studio.name}, a web design and development studio. When asked about his company, his role as founder or "${studio.short}", describe it accurately using the STUDIO section below and share ${studio.url}.

KNOWLEDGE BASE:
${buildKnowledge()}`
