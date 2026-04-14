<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled
        ? isDark
          ? 'glass bg-slate-900/85 border-b border-white/10 shadow-2xl'
          : 'glass bg-white/90 border-b border-slate-200/80 shadow-lg'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <a href="#hero" class="flex items-center gap-2 group">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
            DH
          </div>
          <span
            class="hidden sm:block font-semibold text-sm transition-colors duration-300"
            :class="isDark ? 'text-white/90' : scrolled ? 'text-slate-800' : 'text-slate-800'"
          >
            Dulal Hossin
          </span>
        </a>

        <!-- Desktop Nav links -->
        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            :class="isDark
              ? 'text-slate-300 hover:text-white hover:bg-white/10'
              : scrolled
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60'"
          >
            {{ item.label }}
          </a>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 sm:gap-3">

          <!-- Theme toggle -->
          <button
            @click="toggleTheme"
            class="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            :class="isDark
              ? 'bg-white/10 hover:bg-white/20'
              : scrolled
                ? 'bg-slate-100 hover:bg-slate-200'
                : 'bg-white/40 hover:bg-white/70'"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <span class="text-lg">{{ isDark ? '☀️' : '🌙' }}</span>
          </button>

          <!-- Hire Me -->
          <a
            href="#contact"
            class="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Hire Me
          </a>

          <!-- Mobile hamburger -->
          <button
            @click="menuOpen = !menuOpen"
            class="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
            :class="isDark
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : scrolled
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                : 'bg-white/40 hover:bg-white/70 text-slate-700'"
            aria-label="Toggle menu"
          >
            <span class="text-lg">{{ menuOpen ? '✕' : '☰' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile dropdown -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="menuOpen"
        class="md:hidden border-t px-4 py-4 glass"
        :class="isDark
          ? 'bg-slate-900/95 border-white/10'
          : 'bg-white/95 border-slate-200'"
      >
        <div class="flex flex-col gap-1">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            @click="menuOpen = false"
            class="px-4 py-3 rounded-xl font-medium transition-all duration-200"
            :class="isDark
              ? 'text-slate-300 hover:text-white hover:bg-white/10'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'"
          >
            {{ item.label }}
          </a>
          <a
            href="#contact"
            @click="menuOpen = false"
            class="mt-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl text-center"
          >
            Hire Me
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const scrolled = ref(false)
const menuOpen = ref(false)

const navItems = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

function onScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
