<template>
  <footer class="dark:bg-slate-900 bg-slate-50 border-t dark:border-slate-800 border-slate-200 py-12 px-4 transition-colors duration-500">
    <div class="max-w-6xl mx-auto">
      <div class="grid sm:grid-cols-3 gap-8 mb-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white">
              DH
            </div>
            <span class="font-black dark:text-white text-slate-900 text-lg">{{ personal?.name }}</span>
          </div>
          <p class="dark:text-slate-400 text-slate-500 text-sm leading-relaxed">
            {{ footerTagline }}
          </p>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="dark:text-white text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                class="dark:text-slate-400 text-slate-500 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="dark:text-white text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <div class="space-y-2 text-sm dark:text-slate-400 text-slate-500">
            <div>✉️ <a :href="`mailto:${personal?.email}`" class="hover:text-indigo-400 transition-colors">{{ personal?.email }}</a></div>
            <div>📱 {{ personal?.phone }}</div>
            <div>📍 {{ personal?.location }}</div>
          </div>
          <div class="flex gap-3 mt-5">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="w-10 h-10 rounded-xl dark:bg-slate-800 bg-slate-200 flex items-center justify-center text-lg hover:bg-indigo-500/20 hover:scale-110 transition-all duration-300"
            >
              {{ social.icon }}
            </a>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mb-8" />

      <!-- Bottom bar -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm dark:text-slate-500 text-slate-400">
        <span>© {{ year }} {{ personal?.name }}. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { usePortfolioData } from '../composables/usePortfolioData'

const { personal, navLinks: links, socialLinks: socials, footerTagline } = usePortfolioData()

const year = new Date().getFullYear()
</script>
