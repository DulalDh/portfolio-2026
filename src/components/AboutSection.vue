<template>
  <section id="about" class="py-20 sm:py-24 px-4 dark:bg-slate-900 bg-slate-50 transition-colors duration-500">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12 sm:mb-16 section-reveal">
        <span class="text-indigo-500 font-semibold tracking-widest uppercase text-sm">Who I Am</span>
        <h2 class="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 mt-2">
          About <span class="gradient-text">Me</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
      </div>

      <div class="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">

        <!-- Left: Photo -->
        <div class="section-reveal flex justify-center">
          <!--
            The outer wrapper is overflow-hidden on mobile so floating badges
            (which use translate-based positioning) cannot bleed outside.
            On sm+ we give enough horizontal breathing room for the badges.
          -->
          <div class="relative w-full max-w-xs sm:max-w-sm px-8 sm:px-10">

            <!-- Spinning rings — only on sm+ to avoid mobile clipping -->
            <div class="hidden sm:block absolute -inset-4 rounded-full border border-dashed border-indigo-500/30 spin-slow" />
            <div
              class="hidden sm:block absolute -inset-8 rounded-full border border-dashed border-cyan-400/20 spin-slow"
              style="animation-direction:reverse; animation-duration:30s;"
            />

            <!-- Glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 rounded-3xl blur-2xl scale-110 pointer-events-none" />

            <!-- Photo -->
            <div class="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-2 ring-indigo-500/20 pulse-glow
                        dark:bg-gradient-to-br dark:from-indigo-900/60 dark:to-slate-800
                        bg-gradient-to-br from-indigo-100 to-slate-100">
              <img
                src="/profile-nobg.png"
                alt="MD. Dulal Hossin"
                class="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div class="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t dark:from-slate-900/50 from-slate-200/30 to-transparent" />
            </div>

            <!-- Badge: Years (right side, contained within padded wrapper) -->
            <div class="absolute right-0 top-8 sm:top-10
                        glass dark:bg-slate-800/90 bg-white/90
                        dark:border-white/10 border-slate-200 border
                        rounded-2xl px-3 py-2 shadow-xl float-anim z-10">
              <div class="text-xl sm:text-2xl font-black gradient-text">6+</div>
              <div class="text-xs dark:text-slate-400 text-slate-500 font-medium">Years Exp.</div>
            </div>

            <!-- Badge: Team (left side, contained) -->
            <div
              class="absolute left-0 bottom-10 sm:bottom-12
                     glass dark:bg-slate-800/90 bg-white/90
                     dark:border-white/10 border-slate-200 border
                     rounded-2xl px-3 py-2 shadow-xl float-anim z-10"
              style="animation-delay:2s"
            >
              <div class="text-xl sm:text-2xl font-black text-emerald-400">7</div>
              <div class="text-xs dark:text-slate-400 text-slate-500 font-medium">Team Size</div>
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="section-reveal space-y-5 sm:space-y-6">
          <div>
            <h3 class="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 mb-3">
              Frontend Team Lead &amp;<br />
              <span class="gradient-text">Vue.js Specialist</span>
            </h3>
            <p class="dark:text-slate-400 text-slate-600 leading-relaxed text-base sm:text-lg">
              {{ personal.bio }}
            </p>
          </div>

          <!-- Info cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div
              v-for="info in infos"
              :key="info.label"
              class="flex items-center gap-3
                     dark:bg-slate-800/60 bg-white
                     border dark:border-slate-700/50 border-slate-200
                     rounded-2xl p-3 sm:p-4
                     hover:border-indigo-500/50 transition-all duration-300"
            >
              <span class="text-xl sm:text-2xl shrink-0">{{ info.icon }}</span>
              <div class="min-w-0">
                <div class="text-xs dark:text-slate-500 text-slate-400 font-medium uppercase tracking-wide">{{ info.label }}</div>
                <div class="dark:text-white text-slate-800 font-semibold text-sm mt-0.5 truncate">{{ info.value }}</div>
              </div>
            </div>
          </div>

          <!-- Tag pills -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="px-3 py-1.5 text-xs font-semibold rounded-full
                     bg-indigo-500/10 text-indigo-400
                     border border-indigo-500/20
                     hover:bg-indigo-500/20 transition-colors duration-200"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Download -->
          <a
            href="https://docs.google.com/document/d/14IVCB4fYXiCWtjZge3u18209w2D3yWUBY2_mGHTd10E/export?format=pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Dulal_Hossin_Resume.pdf"
            class="inline-flex items-center gap-3 px-5 sm:px-6 py-3
                   bg-gradient-to-r from-indigo-500 to-cyan-500
                   text-white font-bold rounded-2xl
                   hover:opacity-90 hover:scale-105
                   transition-all duration-300 shadow-lg text-sm sm:text-base"
          >
            <span>📄</span> Download Resume
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { personal } from '../data/portfolio'

const infos = [
  { icon: '📍', label: 'Location', value: 'Savar, Dhaka, Bangladesh' },
  { icon: '✉️', label: 'Email',    value: 'dulaldh.cse@gmail.com' },
  { icon: '📱', label: 'Phone',    value: '+880 1751-341563' },
  { icon: '🎓', label: 'Degree',   value: 'BSc in CSE — HSTU' },
]

const tags = [
  'Vue 3 Expert', 'Team Leadership', 'CI/CD Automation',
  'Playwright Testing', 'Agile/Scrum', 'Performance Optimization',
  'Code Review', 'Mentorship',
]
</script>
