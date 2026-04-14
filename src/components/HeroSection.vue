<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center overflow-hidden animated-gradient transition-colors duration-500"
  >
    <!-- Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="p in particles" :key="p.id" class="absolute rounded-full" :style="p.style" />
    </div>

    <!-- Subtle grid overlay -->
    <div
      class="absolute inset-0 opacity-20 dark:opacity-40"
      style="background-image:url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none%3E%3Cg fill=%236366f1 opacity=0.1%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')"
    />

    <!-- Glow orbs -->
    <div class="absolute top-1/3 left-1/4 w-80 lg:w-[500px] h-80 lg:h-[500px] bg-indigo-400/10 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute bottom-1/4 right-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-cyan-400/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

    <!-- ── Content ── -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-24 lg:pt-32">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        <!-- LEFT: Text -->
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full
                      dark:bg-white/10 bg-indigo-100/80
                      glass border dark:border-white/20 border-indigo-300/50
                      dark:text-cyan-300 text-indigo-600
                      text-xs sm:text-sm font-medium mb-5 sm:mb-7 fade-in-up">
            <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
            Available for new opportunities
          </div>

          <!-- Name -->
          <h1
            class="text-2xl sm:text-5xl lg:text-7xl font-black dark:text-white text-slate-900 mb-3 sm:mb-4 leading-[1.05] fade-in-up"
            style="animation-delay:0.1s"
          >
            MD. Dulal<br />
            <span class="gradient-text">Hossin</span>
          </h1>

          <!-- Typewriter -->
          <div
            class="text-base sm:text-xl lg:text-2xl dark:text-slate-300 text-slate-600 font-light mb-4 sm:mb-5 flex items-center justify-center lg:justify-start gap-1.5 fade-in-up"
            style="animation-delay:0.2s"
          >
            <span>I'm a </span>
            <span class="text-indigo-500 dark:text-indigo-400 font-semibold">{{ displayText }}</span>
            <span class="cursor-blink text-indigo-500 dark:text-indigo-400 font-thin text-2xl sm:text-3xl leading-none">|</span>
          </div>

          <!-- Bio -->
          <p
            class="dark:text-slate-400 text-slate-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 mb-7 sm:mb-9 leading-relaxed fade-in-up"
            style="animation-delay:0.3s"
          >
            6+ years crafting high-performance Vue.js applications. Team lead who turns complex problems into elegant, automated solutions.
          </p>

          <!-- CTAs -->
          <div
            class="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 w-full sm:w-auto fade-in-up"
            style="animation-delay:0.4s"
          >
            <a
              href="#projects"
              class="group flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5
                     bg-gradient-to-r from-indigo-500 to-cyan-500
                     text-white font-bold rounded-2xl shadow-xl
                     hover:shadow-indigo-500/40 hover:scale-105
                     transition-all duration-300 pulse-glow text-sm sm:text-base"
            >
              View My Work
              <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a
              href="#contact"
              class="flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5
                     dark:bg-white/10 bg-indigo-50/80
                     glass border dark:border-white/20 border-indigo-200
                     dark:text-white text-slate-800
                     font-bold rounded-2xl
                     dark:hover:bg-white/20 hover:bg-indigo-100
                     hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Let's Connect
            </a>
          </div>

          <!-- Stats grid -->
          <div
            class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-sm sm:max-w-xl mx-auto lg:mx-0 fade-in-up"
            style="animation-delay:0.5s"
          >
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="dark:bg-white/5 bg-white/60 glass
                     border dark:border-white/10 border-indigo-200/60
                     rounded-2xl p-2.5 sm:p-3.5
                     dark:hover:bg-white/10 hover:bg-white/80
                     transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div class="text-xl sm:text-2xl font-black gradient-text">{{ stat.value }}</div>
              <div class="dark:text-slate-400 text-slate-600 text-xs mt-0.5 font-medium leading-tight">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Photo -->
        <div
          class="flex justify-center lg:justify-end order-1 lg:order-2 fade-in-up"
          style="animation-delay:0.15s"
        >
          <div class="relative">
            <!-- Rings — hidden on small mobile to avoid overflow -->
            <div
              class="hidden sm:block absolute -inset-4 lg:-inset-5 border-2 border-dashed dark:border-indigo-500/40 border-indigo-400/30 spin-slow"
              style="border-radius:42% 58% 60% 40% / 45% 42% 58% 55%;"
            />
            <div
              class="hidden sm:block absolute -inset-8 lg:-inset-10 border border-dashed dark:border-cyan-400/20 border-cyan-500/15 spin-slow"
              style="animation-direction:reverse; animation-duration:25s; border-radius:60% 40% 42% 58% / 55% 58% 42% 45%;"
            />

            <!-- Glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-400/15 rounded-[2rem] blur-2xl scale-110 pointer-events-none dark:opacity-100 opacity-50" />

            <!-- Photo frame -->
            <div class="relative
                        w-48 h-56 sm:w-64 sm:h-80 lg:w-96 lg:h-[28rem]
                        rounded-[2rem] overflow-hidden shadow-2xl
                        ring-2 dark:ring-white/10 ring-indigo-200/60 pulse-glow">
              <img
                src="/profile-nobg.png"
                alt="MD. Dulal Hossin — Frontend Team Lead"
                width="600" height="450"
                class="w-full h-full object-cover object-top"
                loading="eager"
              />
              <div class="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t dark:from-slate-900/60 from-indigo-100/40 to-transparent" />
            </div>

            <!-- Badge: Years — only on sm+ to avoid overflow on tiny screens -->
            <div class="hidden sm:block absolute -right-4 lg:-right-5 top-6
                        glass dark:bg-slate-900/80 bg-white/90
                        border dark:border-white/15 border-slate-200
                        rounded-2xl px-3 lg:px-4 py-2 lg:py-3 shadow-xl float-anim">
              <div class="text-lg lg:text-xl font-black gradient-text">6+</div>
              <div class="text-xs dark:text-slate-300 text-slate-500 font-medium">Years Exp.</div>
            </div>

            <!-- Badge: Role -->
            <div
              class="hidden sm:block absolute -left-4 lg:-left-5 bottom-8 lg:bottom-10
                     glass dark:bg-slate-900/80 bg-white/90
                     border dark:border-white/15 border-slate-200
                     rounded-2xl px-3 lg:px-4 py-2 lg:py-3 shadow-xl float-anim"
              style="animation-delay:2s"
            >
              <div class="text-base lg:text-xl font-black text-emerald-500 dark:text-emerald-400">Vue Lead</div>
            </div>

            <!-- Tech pill -->
            <div
              class="hidden sm:block absolute right-3 lg:right-4 -bottom-3 lg:-bottom-4
                     glass bg-indigo-600/80 border border-indigo-400/30
                     rounded-xl px-2.5 lg:px-3 py-1.5 lg:py-2 shadow-xl float-anim"
              style="animation-delay:1s"
            >
              <div class="text-xs text-white font-bold whitespace-nowrap">⚡ Vue 2/3</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 dark:text-slate-500 text-slate-500">
      <span class="text-xs font-medium tracking-widest uppercase hidden sm:block">Scroll</span>
      <div class="w-px h-8 sm:h-10 bg-gradient-to-b dark:from-slate-500 from-slate-400 to-transparent animate-pulse" />
    </div>
  </section>
</template>

<script setup>
import { useTypewriter } from '../composables/useTypewriter'
import { personal, stats } from '../data/portfolio'

const { displayText } = useTypewriter(personal.typingPhrases)

const profileSrc = '/profile-nobg.png'

const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  style: {
    width:  `${Math.random() * 4 + 2}px`,
    height: `${Math.random() * 4 + 2}px`,
    left:   `${Math.random() * 100}%`,
    top:    `${Math.random() * 100}%`,
    background: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#22d3ee' : '#a78bfa',
    animation: `particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: 0.2,
    borderRadius: '50%',
  },
}))
</script>
