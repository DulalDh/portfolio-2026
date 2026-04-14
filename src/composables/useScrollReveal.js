import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '.section-reveal') {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Unobserve after reveal so it doesn't toggle back when scrolling up
            observer.unobserve(entry.target)
          }
        })
      },
      {
        // Fire when 8% of the element is visible.
        // Negative bottom margin means we trigger a bit before the element
        // fully enters the viewport — prevents elements staying invisible
        // on short mobile screens or fast scrolling.
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    // Observe all current + future elements (re-scan on each call)
    const scan = () => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains('visible')) observer.observe(el)
      })
    }

    scan()

    // Re-scan after a short delay to catch elements rendered async (TransitionGroup, etc.)
    setTimeout(scan, 300)
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
