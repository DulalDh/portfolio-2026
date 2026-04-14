<template>
  <section id="experience" class="py-20 sm:py-24 px-4 dark:bg-slate-900 bg-slate-50 transition-colors duration-500">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12 sm:mb-16 section-reveal">
        <span class="text-indigo-500 font-semibold tracking-widest uppercase text-sm">My Journey</span>
        <h2 class="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 mt-2">
          Work <span class="gradient-text">Experience</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
      </div>

      <!-- Timeline
           The wrapper is overflow-hidden so the absolute vertical line
           is clipped to this container and never bleeds into adjacent sections.
      -->
      <div class="relative overflow-hidden">
        <!-- Vertical line — left on mobile, centered on sm+ -->
        <div class="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px
                    bg-gradient-to-b from-indigo-500 via-cyan-400 to-transparent
                    -translate-x-1/2" />

        <div class="space-y-8 sm:space-y-12">
          <div
            v-for="(exp, i) in experiences"
            :key="exp.company"
            :class="[
              'section-reveal relative',
              // Mobile: always left-aligned stack; sm+: alternating sides
              'flex flex-col sm:flex-row sm:gap-0',
              i % 2 !== 0 && 'sm:flex-row-reverse'
            ]"
          >
            <!-- Timeline dot -->
            <div
              class="absolute left-5 sm:left-1/2 -translate-x-1/2 z-10
                     flex items-center justify-center
                     w-10 h-10 sm:w-12 sm:h-12 rounded-2xl shadow-lg shrink-0"
              :style="{ background: `linear-gradient(135deg, ${exp.color}, ${exp.color}88)` }"
            >
              <span class="text-white text-sm sm:text-lg font-bold">{{ i + 1 }}</span>
            </div>

            <!-- Card — pushed right of dot on mobile; 45% wide on sm+ -->
            <div
              :class="[
                'ml-14 sm:ml-0 sm:w-[45%]',
                i % 2 === 0 ? 'sm:pr-14 lg:sm:pr-16' : 'sm:pl-14 lg:sm:pl-16 sm:ml-auto'
              ]"
            >
              <div
                class="card-shine
                       dark:bg-slate-800/70 bg-white
                       border dark:border-slate-700/50 border-slate-200
                       rounded-2xl sm:rounded-3xl p-4 sm:p-6
                       shadow-lg hover:shadow-2xl hover:-translate-y-1
                       transition-all duration-300"
                :style="{ borderTop: `3px solid ${exp.color}` }"
              >
                <!-- Card header -->
                <div class="flex flex-wrap items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div class="min-w-0">
                    <h3 class="text-sm sm:text-lg font-black dark:text-white text-slate-900 leading-snug">{{ exp.role }}</h3>
                    <p class="text-sm font-semibold mt-0.5" :style="{ color: exp.color }">{{ exp.company }}</p>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="text-xs dark:bg-slate-700 bg-slate-100 dark:text-slate-300 text-slate-600 px-2 sm:px-3 py-1 rounded-full font-medium">
                      {{ exp.type }}
                    </span>
                    <p class="text-xs dark:text-slate-400 text-slate-500 mt-1">{{ exp.period }}</p>
                  </div>
                </div>

                <!-- Highlights -->
                <ul class="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <li
                    v-for="h in exp.highlights"
                    :key="h"
                    class="flex items-start gap-2 text-xs sm:text-sm dark:text-slate-300 text-slate-600"
                  >
                    <span class="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {{ h }}
                  </li>
                </ul>

                <!-- Tech tags -->
                <div class="flex flex-wrap gap-1.5 sm:gap-2">
                  <span
                    v-for="t in exp.tech"
                    :key="t"
                    class="text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg font-semibold"
                    :style="{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}30` }"
                  >
                    {{ t }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Education card -->
      <div class="mt-12 sm:mt-20 section-reveal">
        <div class="dark:bg-slate-800/70 bg-white border dark:border-slate-700/50 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-400/5 pointer-events-none" />
          <div class="relative z-10">
            <span class="text-4xl sm:text-5xl mb-3 sm:mb-4 block">🎓</span>
            <h3 class="text-lg sm:text-xl font-black dark:text-white text-slate-900 mb-1">{{ education.degree }}</h3>
            <p class="text-indigo-400 font-semibold mb-2 text-sm sm:text-base">{{ education.institution }}</p>
            <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
              <span class="text-xs sm:text-sm dark:text-slate-400 text-slate-500">📅 {{ education.period }}</span>
              <span class="text-xs sm:text-sm dark:text-slate-400 text-slate-500">📊 CGPA: {{ education.cgpa }}</span>
              <span class="text-xs sm:text-sm dark:text-slate-400 text-slate-500">📍 {{ education.location }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { experiences, education } from '../data/portfolio'
</script>
