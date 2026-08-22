import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '.section-reveal') {
  let observer
  let mutationObserver

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

    const scan = () => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains('visible')) observer.observe(el)
      })
    }

    scan()

    // Content behind async data fetches (Firebase, etc.) can render well after
    // mount, so keep watching the DOM for newly-inserted .section-reveal nodes
    // instead of relying on a one-off timed rescan.
    mutationObserver = new MutationObserver(scan)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
    if (mutationObserver) mutationObserver.disconnect()
  })
}
