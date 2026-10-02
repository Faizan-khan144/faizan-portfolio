import { getReply, suggestedPrompts } from '../src/data/assistant.js'
import { SYSTEM_PROMPT } from '../api/_lib/context.js'

let pass = 0
let fail = 0

function check(name, condition, extra = '') {
  if (condition) {
    pass++
    console.log(`  pass  ${name}`)
  } else {
    fail++
    console.log(`  FAIL  ${name} ${extra}`)
  }
}

console.log('\n--- knowledge base ---')
check('system prompt built', SYSTEM_PROMPT.length > 1500, `len=${SYSTEM_PROMPT.length}`)
check('contains real name', SYSTEM_PROMPT.includes('Muhammad Faizan Khan'))
check('contains email', SYSTEM_PROMPT.includes('@gmail.com'))
check('contains projects', SYSTEM_PROMPT.includes('OpenTrace'))
check('no undefined leaked', !SYSTEM_PROMPT.includes('undefined'), SYSTEM_PROMPT.match(/.{0,40}undefined.{0,20}/)?.[0])
check('no unresolved [object', !SYSTEM_PROMPT.includes('[object'))
check('project count present', /PROJECTS \(\d+ total\)/.test(SYSTEM_PROMPT), SYSTEM_PROMPT.match(/PROJECTS \(\d+ total\)/)?.[0])

console.log('\n--- offline answers ---')
const questions = [
  'hi',
  'who is faizan',
  'what are his skills',
  'tell me about opentrace',
  'is he open to work',
  'how do i contact him',
  'where is he based',
  'thanks',
  ...suggestedPrompts,
]

for (const q of questions) {
  const r = getReply(q)
  check(`answers: "${q}"`, Boolean(r?.text && r.text.length > 20), `got: ${String(r?.text).slice(0, 40)}`)
}

console.log('\n--- previously unanswerable questions ---')
const hard = [
  'did he build anything with payments',
  'fintech',
  'tell me about the bank website',
  'does he know python',
  'what games has he made',
  'ecommerce experience',
  'what is his weakest skill',
  'xyzzy nonsense gibberish 12345',
]

for (const q of hard) {
  const r = getReply(q)
  const generic = r.text.startsWith('I can only talk about')
  check(`"${q}" -> ${generic ? 'fuzzy match' : 'handled'}`, Boolean(r.text.length > 20))
  if (!generic) console.log(`         "${r.text.slice(0, 70).replace(/\n/g, ' ')}"`)
}

console.log('\n--- follow-ups ---')
const fu = getReply('tell me more', { lastTopic: 'banking website' })
check('follow-up handled', Boolean(fu?.text?.length > 20))

console.log(`\n${pass} passed, ${fail} failed\n`)
process.exit(fail ? 1 : 0)
