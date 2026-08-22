// One-off migration script: seeds Realtime Database/Storage from src/data/portfolio.js
// using the client (web) Firebase SDK — no service-account key required.
// Database/Storage rules must temporarily allow writes for this to succeed
// (a brand-new Firebase project defaults to this for its first 30 days).
//
// Run with: node --env-file=.env scripts/seed-client.mjs

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref as dbRef, set } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
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

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const storage = getStorage(app)

async function uploadProfilePhoto() {
  const localPath = path.join(__dirname, '..', 'public', 'profile-nobg.png')
  const bytes = readFileSync(localPath)
  const destination = 'images/profile-nobg.png'
  const ref = storageRef(storage, destination)
  await uploadBytes(ref, bytes, { contentType: 'image/png' })
  return getDownloadURL(ref)
}

async function main() {
  const photoUrl = await uploadProfilePhoto()
  console.log('Uploaded profile photo:', photoUrl)

  await set(dbRef(db, 'personal'), { ...personal, photoUrl })
  await set(dbRef(db, 'education'), education)
  await set(dbRef(db, 'skills'), skills)
  await set(dbRef(db, 'skill_categories'), skillCategories)
  await set(dbRef(db, 'experiences'), experiences)
  await set(dbRef(db, 'projects'), projects)
  await set(dbRef(db, 'project_categories'), projectCategories)
  await set(dbRef(db, 'achievements'), achievements)
  await set(dbRef(db, 'stats'), stats)
  await set(dbRef(db, 'nav_links'), navLinks)
  await set(dbRef(db, 'social_links'), socialLinks)
  await set(dbRef(db, 'footer_tagline'), footerTagline)
  await set(dbRef(db, 'hero_tagline'), heroTagline)
  await set(dbRef(db, 'resume_url'), resumeUrl)
  await set(dbRef(db, 'about_info'), aboutInfo)
  await set(dbRef(db, 'about_tags'), aboutTags)
  await set(dbRef(db, 'tech_stack'), techStack)

  console.log('Done.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
