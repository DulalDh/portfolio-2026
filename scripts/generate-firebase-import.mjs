// Generates a Firebase Realtime Database "Import JSON" file from src/data/portfolio.js.
// Mirrors the same root paths that scripts/seed-client.mjs writes via the client SDK,
// so the output can be uploaded directly via the Firebase console's Database > Import JSON.
//
// Run with: node scripts/generate-firebase-import.mjs

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import {
  personal,
  skills,
  skillCategories,
  experiences,
  projects,
  projectCategories,
  education,
  achievements,
  stats,
  navLinks,
  socialLinks,
  footerTagline,
  heroTagline,
  resumeUrl,
  aboutInfo,
  aboutTags,
  techStack,
} from '../src/data/portfolio.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const data = {
  personal,
  education,
  skills,
  skill_categories: skillCategories,
  experiences,
  projects,
  project_categories: projectCategories,
  achievements,
  stats,
  nav_links: navLinks,
  social_links: socialLinks,
  footer_tagline: footerTagline,
  hero_tagline: heroTagline,
  resume_url: resumeUrl,
  about_info: aboutInfo,
  about_tags: aboutTags,
  tech_stack: techStack,
}

const outPath = path.join(__dirname, 'firebase-import.json')
writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n')

console.log('Wrote', outPath)
