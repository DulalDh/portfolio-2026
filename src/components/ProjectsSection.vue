<template>
  <section id="projects" class="py-24 px-4 dark:bg-slate-950 bg-white transition-colors duration-500">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 section-reveal">
        <span class="text-indigo-500 font-semibold tracking-widest uppercase text-sm">What I've Built</span>
        <h2 class="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 mt-2">
          Featured <span class="gradient-text">Projects</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
      </div>

      <!-- Category filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-12 section-reveal">
        <button
          v-for="cat in projectCategories"
          :key="cat"
          @click="activeFilter = cat"
          :class="[
            'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
            activeFilter === cat
              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg scale-105'
              : 'dark:bg-slate-800 bg-slate-100 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-700 hover:bg-slate-200'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Projects grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TransitionGroup name="project-fade">
          <div
            v-for="project in filteredProjects"
            :key="project.title"
            class="card-shine group dark:bg-slate-800/60 bg-slate-50 border dark:border-slate-700/50 border-slate-200 rounded-3xl overflow-hidden hover:border-indigo-500/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-400 flex flex-col"
          >
            <!-- Card top gradient banner -->
            <div :class="`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`">
              <div class="absolute inset-0 bg-black/20" />
              <div class="relative z-10 text-center">
                <span class="text-6xl group-hover:scale-110 transition-transform duration-500 block">{{ project.icon }}</span>
              </div>
              <!-- Category badge -->
              <div class="absolute top-4 right-4">
                <span class="text-xs bg-black/30 text-white px-3 py-1 rounded-full backdrop-blur font-medium">
                  {{ project.category }}
                </span>
              </div>
            </div>

            <!-- Card body -->
            <div class="p-6 flex flex-col flex-1">
              <h3 class="text-xl font-black dark:text-white text-slate-900 mb-2">{{ project.title }}</h3>
              <p class="dark:text-slate-400 text-slate-600 text-sm leading-relaxed mb-4 flex-1">{{ project.description }}</p>

              <!-- Features -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="feature in project.features"
                  :key="feature"
                  class="text-xs px-2.5 py-1 dark:bg-slate-700/60 bg-slate-200 dark:text-slate-300 text-slate-600 rounded-lg font-medium"
                >
                  ✓ {{ feature }}
                </span>
              </div>

              <!-- Tech tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="t in project.tech"
                  :key="t"
                  class="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold"
                >
                  {{ t }}
                </span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Empty state -->
      <div v-if="filteredProjects.length === 0" class="text-center py-20">
        <div class="text-5xl mb-4">🔍</div>
        <p class="dark:text-slate-400 text-slate-500">No projects in this category yet.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects, projectCategories } from '../data/portfolio'

const activeFilter = ref('All')

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter.value)
)
</script>

<style scoped>
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.35s ease;
}
.project-fade-enter-from,
.project-fade-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(10px);
}
.project-fade-move {
  transition: transform 0.35s ease;
}
</style>
