<template>
  <section id="achievements" class="py-24 px-4 dark:bg-slate-900 bg-slate-50 transition-colors duration-500">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-16 section-reveal">
        <span class="text-indigo-500 font-semibold tracking-widest uppercase text-sm">Milestones</span>
        <h2 class="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 mt-2">
          Achievements &amp; <span class="gradient-text">Awards</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
      </div>

      <!-- Achievement cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div
          v-for="(ach, i) in achievements"
          :key="ach.title"
          class="section-reveal card-shine
                 dark:bg-slate-800/60 bg-white
                 border dark:border-slate-700/50 border-slate-200
                 rounded-3xl p-6 text-center
                 hover:border-indigo-500/40 hover:-translate-y-2
                 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <div class="text-5xl mb-4 float-anim" :style="{ animationDelay: `${i * 0.8}s` }">
            {{ ach.icon }}
          </div>
          <h3 class="text-base font-black dark:text-white text-slate-900 mb-2">{{ ach.title }}</h3>
          <p class="text-sm dark:text-slate-400 text-slate-500 leading-relaxed mb-4">{{ ach.description }}</p>
          <span class="text-xs text-indigo-400 font-semibold px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            {{ ach.period }}
          </span>
        </div>
      </div>

      <!-- Stats banner
           Uses a hardcoded dark gradient so white text is always legible
           in BOTH light and dark modes. The indigo→navy palette is consistent
           with the dark hero and fits as an accent block in light mode too.
      -->
      <div class="section-reveal relative overflow-hidden rounded-3xl">
        <!-- Always-dark gradient background — intentional design choice -->
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-cyan-900"
             style="background-size:400% 400%; animation: gradientShift 15s ease infinite;" />

        <!-- Subtle grid pattern -->
        <div class="absolute inset-0 opacity-10"
             style="background-image:url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff opacity=0.15%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')" />

        <!-- Glow accents -->
        <div class="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute bottom-0 right-1/4 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <!-- Stats grid -->
        <div class="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 px-6 sm:px-10 py-12 text-center">
          <div v-for="stat in stats" :key="stat.label" class="group">
            <div class="text-3xl sm:text-5xl font-black text-white mb-2 gradient-text group-hover:scale-110 transition-transform duration-300">
              {{ stat.value }}
            </div>
            <div class="text-white/70 font-medium text-xs sm:text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { achievements, stats } from '../data/portfolio'
</script>
