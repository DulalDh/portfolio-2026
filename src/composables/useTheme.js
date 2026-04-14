import { ref, watch } from 'vue'

// Singleton state — shared across all components, initialized once at module load
const isDark = ref(true)

function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Initialize from localStorage once when the module is first imported
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('theme')
  isDark.value = saved ? saved === 'dark' : true
  applyTheme(isDark.value)
}

// Single watcher at module level — never duplicated regardless of how many
// components call useTheme()
watch(isDark, applyTheme)

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  return { isDark, toggleTheme }
}
