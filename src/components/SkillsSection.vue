<template>
  <section id="skills" class="py-24 px-4 dark:bg-slate-950 bg-white transition-colors duration-500">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 section-reveal">
        <span class="text-indigo-500 font-semibold tracking-widest uppercase text-sm">What I Work With</span>
        <h2 class="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 mt-2">
          My <span class="gradient-text">Skills</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
      </div>

      <!-- Category filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-12 section-reveal">
        <button
          v-for="cat in skillCategories"
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
            activeCategory === cat
              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg scale-105'
              : 'dark:bg-slate-800 bg-slate-100 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-700 hover:bg-slate-200'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Skill bars -->
      <!--
        No `section-reveal` on individual cards inside TransitionGroup.
        section-reveal starts opacity:0 and is only toggled to visible by the
        IntersectionObserver. When TransitionGroup re-inserts items (after a
        filter change), the observer never re-fires — items would stay invisible.
        The section wrapper above already handles the scroll-in reveal.
      -->
      <div class="grid sm:grid-cols-2 gap-6 mb-16">
        <TransitionGroup name="skill-fade">
          <div
            v-for="skill in filteredSkills"
            :key="skill.name"
            class="dark:bg-slate-800/60 bg-slate-50 border dark:border-slate-700/50 border-slate-200 rounded-2xl p-6 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 card-shine"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ skill.icon }}</span>
                <span class="dark:text-white text-slate-800 font-semibold">{{ skill.name }}</span>
              </div>
              <span class="text-indigo-400 font-bold text-sm">{{ skill.level }}%</span>
            </div>
            <!-- Bar -->
            <div class="h-2 dark:bg-slate-700 bg-slate-200 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-1000 ease-out"
                :style="{ width: barsAnimated ? `${skill.level}%` : '0%' }"
              />
            </div>
            <!-- Category badge -->
            <div class="mt-3">
              <span class="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                {{ skill.category }}
              </span>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Tech Stack Icons -->
      <div class="section-reveal">
        <h3 class="text-center text-lg font-bold dark:text-slate-300 text-slate-600 mb-8">Technologies & Tools</h3>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="flex flex-col items-center gap-2 px-4 py-4 dark:bg-slate-800/40 bg-slate-100 rounded-2xl border dark:border-slate-700/40 border-slate-200 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group min-w-[80px]"
          >
            <span class="text-3xl group-hover:scale-110 transition-transform duration-300">{{ tech.icon }}</span>
            <span class="text-xs dark:text-slate-400 text-slate-500 font-medium text-center">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { skills as allSkills, skillCategories } from '../data/portfolio'

const activeCategory = ref('All')

// Single boolean flag — toggled once when the section enters the viewport.
// We do NOT mutate the allSkills array objects; instead we track animated state
// separately so TransitionGroup keys (skill.name) never change identity.
const barsAnimated = ref(false)

const filteredSkills = computed(() =>
  activeCategory.value === 'All'
    ? allSkills
    : allSkills.filter(s => s.category === activeCategory.value)
)

const techStack = [
  { name: 'Vue 3', icon: '⚡' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Nuxt.js', icon: '🚀' },
  { name: 'Pinia', icon: '🍍' },
  { name: 'Vite', icon: '⚡' },
  { name: 'Playwright', icon: '🎭' },
  { name: 'Git', icon: '🌿' },
  { name: 'REST API', icon: '🔗' },
  { name: 'Claude AI', icon: '🤖' },
  { name: 'VS Code', icon: '💻' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => { barsAnimated.value = true }, 200)
          observer.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )

  const section = document.getElementById('skills')
  if (section) observer.observe(section)
})
</script>

<style scoped>
.skill-fade-enter-active,
.skill-fade-leave-active {
  transition: all 0.4s ease;
}
.skill-fade-enter-from,
.skill-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.skill-fade-move {
  transition: transform 0.4s ease;
}
</style>
