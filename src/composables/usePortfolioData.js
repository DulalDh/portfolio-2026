import { ref } from 'vue'
import { ref as dbRef, get } from 'firebase/database'
import { db } from '../firebase'

export const skillCategories = ['All', 'Frontend', 'Backend', 'Testing', 'DevOps']
export const projectCategories = ['All', 'Enterprise', 'FinTech', 'E-commerce', 'EdTech']

let cached = null

export function usePortfolioData() {
  if (!cached) cached = load()
  return cached
}

function load() {
  const personal = ref(null)
  const education = ref(null)
  const skills = ref([])
  const experiences = ref([])
  const projects = ref([])
  const achievements = ref([])
  const stats = ref([])
  const loading = ref(true)
  const error = ref(null)

  const fetchPath = (path) => get(dbRef(db, path)).then((snap) => snap.val())

  ;(async () => {
    try {
      const [personalData, educationData, skillsData, experiencesData, projectsData, achievementsData, statsData] =
        await Promise.all([
          fetchPath('personal'),
          fetchPath('education'),
          fetchPath('skills'),
          fetchPath('experiences'),
          fetchPath('projects'),
          fetchPath('achievements'),
          fetchPath('stats'),
        ])

      personal.value = personalData ?? null
      education.value = educationData ?? null
      skills.value = skillsData ?? []
      experiences.value = experiencesData ?? []
      projects.value = projectsData ?? []
      achievements.value = achievementsData ?? []
      stats.value = statsData ?? []
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })()

  return { personal, education, skills, experiences, projects, achievements, stats, loading, error }
}
