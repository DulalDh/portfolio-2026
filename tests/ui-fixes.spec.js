import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5174'

// ── helpers ────────────────────────────────────────────────────────────────────

async function switchToLight(page) {
  await page.click('nav button[aria-label]')
  await page.waitForTimeout(350)
}

async function scrollTo(page, id) {
  await page.evaluate(id => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }), id)
  await page.waitForTimeout(400)
}

async function computedBg(page, selector) {
  return page.evaluate(sel => {
    const el = document.querySelector(sel)
    return el ? window.getComputedStyle(el).backgroundColor : null
  }, selector)
}

async function computedColor(page, selector) {
  return page.evaluate(sel => {
    const el = document.querySelector(sel)
    return el ? window.getComputedStyle(el).color : null
  }, selector)
}

// Luminance helper: darker colour has lower perceived brightness
async function perceivedBrightness(page, selector) {
  return page.evaluate(sel => {
    const el = document.querySelector(sel)
    if (!el) return null
    const c = window.getComputedStyle(el).backgroundColor
    const m = c.match(/[\d.]+/g)
    if (!m || m.length < 3) return null
    // sRGB relative luminance approximation
    return 0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]
  }, selector)
}

// ── 1. Navbar light-mode tests ─────────────────────────────────────────────────

test.describe('Navbar — light mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
    await page.waitForSelector('nav')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await page.waitForSelector('nav')
    await switchToLight(page)
  })

  test('navbar links are dark (readable) in light mode when unscrolled', async ({ page }) => {
    const color = await computedColor(page, 'nav a[href="#about"]')
    expect(color).not.toBeNull()
    // dark text means low brightness — should not be near-white
    const bright = await page.evaluate(c => {
      const m = c.match(/[\d.]+/g)
      return m ? 0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2] : 255
    }, color)
    expect(bright, 'Nav link text must not be near-white in light mode').toBeLessThan(200)
  })

  test('scrolled navbar uses light background class in light mode', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 300))
    await page.waitForTimeout(300)
    // Check that the light-mode glass class is applied (not the dark slate one)
    const classList = await page.evaluate(() => document.querySelector('nav')?.className ?? '')
    expect(classList, 'Nav should have bg-white/90 when scrolled in light mode').toContain('bg-white/90')
    expect(classList, 'Nav should NOT have bg-slate-900 in light mode').not.toContain('bg-slate-900')
  })

  test('scrolled navbar uses dark background class in dark mode', async ({ page }) => {
    // Switch back to dark
    await page.click('nav button[aria-label]')
    await page.waitForTimeout(300)
    await page.evaluate(() => window.scrollTo(0, 300))
    await page.waitForTimeout(300)
    const classList = await page.evaluate(() => document.querySelector('nav')?.className ?? '')
    expect(classList, 'Nav should have bg-slate-900 when scrolled in dark mode').toContain('bg-slate-900')
    expect(classList, 'Nav should NOT have bg-white in dark mode').not.toContain('bg-white/90')
  })

  test('mobile menu opens and closes in light mode', async ({ page, viewport }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.reload()
    await page.waitForSelector('nav')
    await switchToLight(page)

    const burger = page.locator('nav button[aria-label="Toggle menu"]')
    await burger.click()
    await page.waitForTimeout(200)
    await expect(page.locator('nav a[href="#about"]').last()).toBeVisible()

    await burger.click()
    await page.waitForTimeout(250)
    // Menu links should be hidden after close
    await expect(page.locator('nav div.md\\:hidden a[href="#about"]')).not.toBeVisible()
  })

  test('Hire Me button is visible in light mode', async ({ page }) => {
    await expect(page.locator('nav a[href="#contact"]').first()).toBeVisible()
  })
})

// ── 2. Achievements banner always legible ──────────────────────────────────────

test.describe('Achievements section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
    await page.waitForSelector('nav')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await page.waitForSelector('nav')
  })

  test('stats banner has dark gradient in LIGHT mode (white text readable)', async ({ page }) => {
    await switchToLight(page)
    await scrollTo(page, 'achievements')

    // Find the gradient div inside the stats banner — it carries a dark Tailwind bg-gradient class.
    // We verify via className rather than computed color (Tailwind gradients use background-image,
    // and modern browsers may report background-color as transparent for gradient elements).
    const result = await page.evaluate(() => {
      const section = document.getElementById('achievements')
      const reveals = section?.querySelectorAll('.section-reveal')
      const banner = reveals?.[reveals.length - 1]
      if (!banner) return { found: false, reason: 'no banner' }
      const gradDiv = banner.querySelector('.bg-gradient-to-br')
      if (!gradDiv) return { found: false, reason: 'no gradient div' }
      const cls = gradDiv.className
      return {
        found: true,
        hasDarkGradient: cls.includes('from-indigo-900') || cls.includes('via-slate-900'),
        className: cls.substring(0, 120),
      }
    })

    expect(result.found, 'Stats banner gradient div must exist').toBe(true)
    expect(result.hasDarkGradient, 'Stats banner must use dark gradient classes for white-text legibility').toBe(true)
  })

  test('achievement cards visible in light mode', async ({ page }) => {
    await switchToLight(page)
    await scrollTo(page, 'achievements')
    const cards = page.locator('#achievements .card-shine')
    await expect(cards.first()).toBeVisible()
    expect(await cards.count()).toBe(4)
  })

  test('achievement cards visible in dark mode', async ({ page }) => {
    await scrollTo(page, 'achievements')
    const cards = page.locator('#achievements .card-shine')
    await expect(cards.first()).toBeVisible()
    expect(await cards.count()).toBe(4)
  })

  test('achievement section background differs between themes', async ({ page }) => {
    const darkBg = await computedBg(page, '#achievements')
    await switchToLight(page)
    const lightBg = await computedBg(page, '#achievements')
    expect(darkBg).not.toBe(lightBg)
  })
})

// ── 3. Responsiveness tests ────────────────────────────────────────────────────

const viewports = [
  { name: 'mobile-sm',  width: 375,  height: 812  },
  { name: 'mobile-lg',  width: 430,  height: 932  },
  { name: 'tablet',     width: 768,  height: 1024 },
  { name: 'desktop',    width: 1280, height: 800  },
  { name: 'wide',       width: 1536, height: 900  },
]

for (const vp of viewports) {
  test.describe(`Responsiveness — ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    test(`hero section fills viewport height`, async ({ page }) => {
      await page.goto(BASE)
      await page.waitForSelector('#hero')
      const h = await page.evaluate(() => document.getElementById('hero').offsetHeight)
      const vh = vp.height
      expect(h, 'Hero must be at least as tall as the viewport').toBeGreaterThanOrEqual(vh - 2)
    })

    test(`no horizontal overflow at ${vp.name}`, async ({ page }) => {
      await page.goto(BASE)
      await page.waitForSelector('nav')
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
      expect(overflow, `Page must not have horizontal scroll at ${vp.width}px`).toBe(false)
    })

    test(`all major sections present at ${vp.name}`, async ({ page }) => {
      await page.goto(BASE)
      await page.waitForSelector('nav')
      for (const id of ['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact']) {
        const el = page.locator(`#${id}`)
        await expect(el, `#${id} must exist at ${vp.width}px`).toBeAttached()
      }
    })

    test(`profile image loads at ${vp.name}`, async ({ page }) => {
      await page.goto(BASE)
      await page.waitForLoadState('networkidle')
      const loaded = await page.evaluate(() => {
        const img = document.querySelector('#hero img')
        return img ? img.naturalWidth > 0 : false
      })
      expect(loaded, `Profile image must load at ${vp.width}px`).toBe(true)
    })

    test(`navbar renders correctly at ${vp.name}`, async ({ page }) => {
      await page.goto(BASE)
      await page.waitForSelector('nav')
      const nav = page.locator('nav')
      await expect(nav).toBeVisible()
      // Logo always visible
      await expect(page.locator('nav a[href="#hero"]')).toBeVisible()
    })

    test(`experience section has no horizontal overflow at ${vp.name}`, async ({ page }) => {
      await page.goto(BASE)
      await page.waitForSelector('#experience')
      const overflow = await page.evaluate(() => {
        const el = document.getElementById('experience')
        return el ? el.scrollWidth > el.clientWidth + 2 : false
      })
      expect(overflow, `Experience section must not overflow at ${vp.width}px`).toBe(false)
    })
  })
}

// ── 4. Light mode — all sections render correctly ──────────────────────────────

test.describe('Light mode — all sections render', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
    await page.waitForSelector('nav')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await page.waitForSelector('nav')
    await switchToLight(page)
  })

  const sections = [
    { id: 'hero',         label: 'Hero' },
    { id: 'about',        label: 'About' },
    { id: 'skills',       label: 'Skills' },
    { id: 'experience',   label: 'Experience' },
    { id: 'projects',     label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact',      label: 'Contact' },
  ]

  for (const { id, label } of sections) {
    test(`${label} section is visible in light mode`, async ({ page }) => {
      await scrollTo(page, id)
      await expect(page.locator(`#${id}`), `${label} must be visible`).toBeVisible()
    })
  }

  test('no section has invisible text (near-white text on near-white bg) in light mode', async ({ page }) => {
    // Quick contrast check: text in about, skills, experience, achievements must be dark
    const selectors = [
      '#about h2',
      '#skills h2',
      '#experience h2',
      '#achievements h2',
    ]
    for (const sel of selectors) {
      const bright = await page.evaluate(sel => {
        const el = document.querySelector(sel)
        if (!el) return 0
        const c = window.getComputedStyle(el).color
        const m = c.match(/[\d.]+/g)
        return m ? 0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2] : 255
      }, sel)
      expect(bright, `${sel} text must be dark in light mode`).toBeLessThan(180)
    }
  })
})
