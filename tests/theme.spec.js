import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5174'

// ─── helpers ───────────────────────────────────────────────────────────────────

async function isDarkMode(page) {
  return page.evaluate(() => document.documentElement.classList.contains('dark'))
}

async function clickToggle(page) {
  await page.locator('nav button[aria-label]').first().click()
  await page.waitForTimeout(350)
}

/** Returns computed background-color of a CSS selector */
async function bgColor(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel)
    return el ? window.getComputedStyle(el).backgroundColor : null
  }, selector)
}

/** Returns the resolved background shorthand (catches animated-gradient) */
async function bgImage(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel)
    return el ? window.getComputedStyle(el).backgroundImage : null
  }, selector)
}

/** Clears localStorage then reloads — used by beforeEach */
async function freshPage(page) {
  await page.goto(BASE)
  await page.waitForSelector('nav', { state: 'visible' })
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await page.waitForSelector('nav', { state: 'visible' })
}

// ─── suite ────────────────────────────────────────────────────────────────────

test.describe('Dark / Light mode — full suite', () => {

  test.beforeEach(({ page }) => freshPage(page))

  // ── 1. Default state ──────────────────────────────────────────────────────

  test('1. loads in dark mode by default', async ({ page }) => {
    expect(await isDarkMode(page)).toBe(true)
  })

  // ── 2. Toggle behaviour ───────────────────────────────────────────────────

  test('2. single click → light mode', async ({ page }) => {
    await clickToggle(page)
    expect(await isDarkMode(page)).toBe(false)
  })

  test('3. two clicks → back to dark mode', async ({ page }) => {
    await clickToggle(page)
    await clickToggle(page)
    expect(await isDarkMode(page)).toBe(true)
  })

  test('4. light → dark → light cycle completes correctly', async ({ page }) => {
    await clickToggle(page)
    expect(await isDarkMode(page)).toBe(false)   // light

    await clickToggle(page)
    expect(await isDarkMode(page)).toBe(true)    // dark

    await clickToggle(page)
    expect(await isDarkMode(page)).toBe(false)   // light again
  })

  // ── 3. Persistence ────────────────────────────────────────────────────────

  test('5. light preference persists across reload', async ({ page }) => {
    await clickToggle(page)
    // Reload without clearing storage (beforeEach already cleared → toggle wrote "light")
    await page.reload()
    await page.waitForSelector('nav', { state: 'visible' })
    expect(await isDarkMode(page)).toBe(false)
  })

  test('6. dark preference persists across reload', async ({ page }) => {
    await clickToggle(page)   // → light
    await clickToggle(page)   // → dark
    await page.reload()
    await page.waitForSelector('nav', { state: 'visible' })
    expect(await isDarkMode(page)).toBe(true)
  })

  test('7. localStorage value matches current theme', async ({ page }) => {
    await clickToggle(page)
    const stored = await page.evaluate(() => localStorage.getItem('theme'))
    expect(stored).toBe('light')

    await clickToggle(page)
    const stored2 = await page.evaluate(() => localStorage.getItem('theme'))
    expect(stored2).toBe('dark')
  })

  // ── 4. No-flash on initial load ───────────────────────────────────────────

  test('8. correct class on <html> immediately on reload (no flash)', async ({ page }) => {
    // Set light preference in localStorage
    await page.evaluate(() => localStorage.setItem('theme', 'light'))

    // Navigate fresh — the inline <script> in <head> must apply class before paint
    await page.goto(BASE)
    // Check synchronously right after DOMContentLoaded fires (no waiting)
    const darkOnLoad = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )
    expect(darkOnLoad, 'dark class must NOT be present when localStorage=light').toBe(false)
  })

  test('9. dark class present immediately when preference is dark', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('theme', 'dark'))
    await page.goto(BASE)
    const darkOnLoad = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )
    expect(darkOnLoad).toBe(true)
  })

  // ── 5. Hero section (first page) theme changes ────────────────────────────

  test('10. hero background-image changes between dark and light', async ({ page }) => {
    const darkBg = await bgImage(page, '#hero')

    await clickToggle(page)
    const lightBg = await bgImage(page, '#hero')

    expect(darkBg).not.toBeNull()
    expect(lightBg).not.toBeNull()
    expect(darkBg, 'Hero gradient must differ between dark and light').not.toBe(lightBg)
  })

  test('11. hero text color changes when theme switches', async ({ page }) => {
    // The h1 in hero uses dark:text-white / text-slate-900
    const darkColor = await page.evaluate(() => {
      const h1 = document.querySelector('#hero h1')
      return h1 ? window.getComputedStyle(h1).color : null
    })

    await clickToggle(page)

    const lightColor = await page.evaluate(() => {
      const h1 = document.querySelector('#hero h1')
      return h1 ? window.getComputedStyle(h1).color : null
    })

    expect(darkColor).not.toBeNull()
    expect(lightColor).not.toBeNull()
    expect(darkColor, 'Hero h1 color must differ between dark and light').not.toBe(lightColor)
  })

  test('12. hero CTA "Let\'s Connect" button style changes with theme', async ({ page }) => {
    const darkStyle = await page.evaluate(() => {
      const btn = document.querySelector('#hero a[href="#contact"]')
      const s = btn ? window.getComputedStyle(btn) : null
      return s ? `${s.backgroundColor}|${s.color}` : null
    })

    await clickToggle(page)

    const lightStyle = await page.evaluate(() => {
      const btn = document.querySelector('#hero a[href="#contact"]')
      const s = btn ? window.getComputedStyle(btn) : null
      return s ? `${s.backgroundColor}|${s.color}` : null
    })

    expect(darkStyle).not.toBeNull()
    expect(lightStyle).not.toBeNull()
    expect(darkStyle).not.toBe(lightStyle)
  })

  // ── 6. Other sections respond ─────────────────────────────────────────────

  test('13. about section background changes with theme', async ({ page }) => {
    const dark = await bgColor(page, '#about')
    await clickToggle(page)
    const light = await bgColor(page, '#about')
    expect(dark).not.toBe(light)
  })

  test('14. skills section background changes with theme', async ({ page }) => {
    const dark = await bgColor(page, '#skills')
    await clickToggle(page)
    const light = await bgColor(page, '#skills')
    expect(dark).not.toBe(light)
  })

  test('15. experience section background changes with theme', async ({ page }) => {
    const dark = await bgColor(page, '#experience')
    await clickToggle(page)
    const light = await bgColor(page, '#experience')
    expect(dark).not.toBe(light)
  })

  // ── 7. Toggle icon ────────────────────────────────────────────────────────

  test('16. toggle icon shows ☀️ in dark and 🌙 in light', async ({ page }) => {
    const darkIcon = await page.locator('nav button[aria-label]').first().innerText()
    expect(darkIcon.trim()).toBe('☀️')

    await clickToggle(page)
    const lightIcon = await page.locator('nav button[aria-label]').first().innerText()
    expect(lightIcon.trim()).toBe('🌙')
  })

  // ── 8. Rapid toggle stress test ───────────────────────────────────────────

  test('17. 8 rapid toggles stay in sync (even count → dark)', async ({ page }) => {
    for (let i = 0; i < 8; i++) {
      await page.locator('nav button[aria-label]').first().click()
      await page.waitForTimeout(60)
    }
    expect(await isDarkMode(page)).toBe(true)
  })

  // ── 9. Profile image ─────────────────────────────────────────────────────

  test('18. profile image renders in hero section', async ({ page }) => {
    const img = page.locator('#hero img').first()
    await expect(img).toBeVisible()
    const src = await img.getAttribute('src')
    expect(src).toContain('profile')
  })

  test('19. profile image has no layout shift (naturalWidth > 0)', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    const loaded = await page.evaluate(() => {
      const img = document.querySelector('#hero img')
      return img ? img.naturalWidth > 0 : false
    })
    expect(loaded, 'Profile image must be fully loaded').toBe(true)
  })

  test('20. profile image is visible in both dark and light modes', async ({ page }) => {
    await expect(page.locator('#hero img').first()).toBeVisible()
    await clickToggle(page)
    await expect(page.locator('#hero img').first()).toBeVisible()
  })
})
