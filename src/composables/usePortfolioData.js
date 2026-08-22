import { ref } from 'vue'
import { ref as dbRef, get } from 'firebase/database'
import { db } from '../firebase'

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
    try {
      const keys = Object.keys(FIELDS)
      const results = await Promise.all(keys.map((key) => fetchPath(FIELDS[key][0])))
      keys.forEach((key, i) => {
        state[key].value = results[i] ?? FIELDS[key][1]
      })
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })()

  return { ...state, loading, error }
}
