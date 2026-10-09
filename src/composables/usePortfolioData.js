import { ref } from 'vue'
import { ref as dbRef, get } from 'firebase/database'
import { db } from '../firebase'
import fallbackData from '../../scripts/firebase-import.json'

// local (camelCase) state key -> [firebase path (snake_case), defaultValue]
const FIELDS = {
  personal: ['personal', null],
  education: ['education', null],
  skills: ['skills', []],
  skillCategories: ['skill_categories', []],
  experiences: ['experiences', []],
  projects: ['projects', []],
  projectCategories: ['project_categories', []],
  achievements: ['achievements', []],
  stats: ['stats', []],
  navLinks: ['nav_links', []],
  socialLinks: ['social_links', []],
  footerTagline: ['footer_tagline', ''],
  heroTagline: ['hero_tagline', ''],
  resumeUrl: ['resume_url', ''],
  aboutInfo: ['about_info', []],
  aboutTags: ['about_tags', []],
  techStack: ['tech_stack', []],
}

let cached = null

export function usePortfolioData() {
  if (!cached) cached = load()
  return cached
}

function load() {
  const state = {}
  for (const key of Object.keys(FIELDS)) {
    const [, defaultValue] = FIELDS[key]
    state[key] = ref(defaultValue)
  }
  const loading = ref(true)
  const error = ref(null)

  const fetchPath = (path) => get(dbRef(db, path)).then((snap) => snap.val())

  ;(async () => {
    const keys = Object.keys(FIELDS)
    const results = await Promise.allSettled(
      keys.map((key) => fetchPath(FIELDS[key][0]))
    )
    let fallbackUsed = false

    results.forEach((result, i) => {
      const [path, defaultValue] = FIELDS[keys[i]]
      if (result.status === 'fulfilled' && result.value != null) {
        state[keys[i]].value = result.value
      } else {
        fallbackUsed = true
        state[keys[i]].value = fallbackData[path] ?? defaultValue
      }
    })

    if (fallbackUsed) {
      console.warn('Some Firebase portfolio data was unavailable; using scripts/firebase-import.json for those fields.')
    }
    loading.value = false
  })()

  return { ...state, loading, error }
}
