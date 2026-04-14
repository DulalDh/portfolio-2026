import { ref, onMounted, onUnmounted } from 'vue'

export function useTypewriter(phrases, { typeSpeed = 80, deleteSpeed = 50, pauseDuration = 2000 } = {}) {
  const displayText = ref('')
  const isDeleting = ref(false)
  const phraseIndex = ref(0)
  let timeout = null

  function type() {
    const current = phrases[phraseIndex.value]

    if (!isDeleting.value) {
      displayText.value = current.slice(0, displayText.value.length + 1)
      if (displayText.value === current) {
        timeout = setTimeout(() => { isDeleting.value = true; type() }, pauseDuration)
        return
      }
    } else {
      displayText.value = current.slice(0, displayText.value.length - 1)
      if (displayText.value === '') {
        isDeleting.value = false
        phraseIndex.value = (phraseIndex.value + 1) % phrases.length
      }
    }

    timeout = setTimeout(type, isDeleting.value ? deleteSpeed : typeSpeed)
  }

  onMounted(() => { timeout = setTimeout(type, 500) })
  onUnmounted(() => clearTimeout(timeout))

  return { displayText }
}
