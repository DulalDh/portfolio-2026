<template>
  <div :class="['min-h-screen transition-colors duration-500', isDark ? 'dark' : '']">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
    </main>
    <FooterSection />

    <!-- Back to top -->
    <Transition name="fade-slide">
      <button
        v-if="showBackTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl"
        aria-label="Back to top"
      >
        ↑
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from './composables/useTheme'
import { useScrollReveal } from './composables/useScrollReveal'

import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import AchievementsSection from './components/AchievementsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const { isDark } = useTheme()
useScrollReveal()

const showBackTop = ref(false)

function onScroll() {
  showBackTop.value = window.scrollY > 500
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
