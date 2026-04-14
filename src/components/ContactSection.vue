<template>
  <section id="contact" class="py-24 px-4 dark:bg-slate-950 bg-white transition-colors duration-500">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 section-reveal">
        <span class="text-indigo-500 font-semibold tracking-widest uppercase text-sm">Get In Touch</span>
        <h2 class="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 mt-2">
          Let's <span class="gradient-text">Connect</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
        <p class="dark:text-slate-400 text-slate-600 mt-4 max-w-xl mx-auto">
          Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- Contact info -->
        <div class="section-reveal space-y-6">
          <div
            v-for="item in contactItems"
            :key="item.label"
            class="flex items-center gap-5 dark:bg-slate-800/60 bg-slate-50 border dark:border-slate-700/50 border-slate-200 rounded-2xl p-5 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-x-1 group"
          >
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              :style="{ background: item.gradient }"
            >
              {{ item.icon }}
            </div>
            <div>
              <div class="text-xs dark:text-slate-500 text-slate-400 font-medium uppercase tracking-wide">{{ item.label }}</div>
              <a
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="dark:text-white text-slate-800 font-semibold hover:text-indigo-400 transition-colors duration-200"
              >
                {{ item.value }}
              </a>
            </div>
          </div>

          <!-- Social links -->
          <div class="flex gap-4 pt-4">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="flex items-center gap-2 px-5 py-3 dark:bg-slate-800 bg-slate-100 rounded-2xl border dark:border-slate-700 border-slate-200 hover:border-indigo-500/50 dark:text-slate-300 text-slate-600 hover:text-indigo-400 font-semibold text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span class="text-lg">{{ social.icon }}</span>
              {{ social.label }}
            </a>
          </div>
        </div>

        <!-- Contact form -->
        <div class="section-reveal">
          <form
            @submit.prevent="handleSubmit"
            class="dark:bg-slate-800/60 bg-slate-50 border dark:border-slate-700/50 border-slate-200 rounded-3xl p-8 space-y-5 shadow-xl"
          >
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  :class="['w-full px-4 py-3 dark:bg-slate-700/60 bg-white border rounded-xl dark:text-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200',
                    errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'dark:border-slate-600 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500']"
                />
                <p v-if="errors.name" class="mt-1 text-xs text-red-400">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="john@example.com"
                  :class="['w-full px-4 py-3 dark:bg-slate-700/60 bg-white border rounded-xl dark:text-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200',
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'dark:border-slate-600 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500']"
                />
                <p v-if="errors.email" class="mt-1 text-xs text-red-400">{{ errors.email }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2">Subject</label>
              <input
                v-model="form.subject"
                type="text"
                placeholder="Project Inquiry / Job Opportunity"
                :class="['w-full px-4 py-3 dark:bg-slate-700/60 bg-white border rounded-xl dark:text-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200',
                  errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'dark:border-slate-600 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500']"
              />
              <p v-if="errors.subject" class="mt-1 text-xs text-red-400">{{ errors.subject }}</p>
            </div>

            <div>
              <label class="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2">Message</label>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Tell me about your project or opportunity..."
                :class="['w-full px-4 py-3 dark:bg-slate-700/60 bg-white border rounded-xl dark:text-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 resize-none',
                  errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'dark:border-slate-600 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500']"
              />
              <p v-if="errors.message" class="mt-1 text-xs text-red-400">{{ errors.message }}</p>
            </div>

            <!-- Status message -->
            <Transition name="fade">
              <div
                v-if="submitStatus"
                :class="[
                  'p-4 rounded-xl text-sm font-semibold text-center',
                  submitStatus === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                ]"
              >
                {{ submitStatus === 'success' ? "✅ Message sent! I'll get back to you soon." : '❌ Something went wrong. Please try again or email me directly.' }}
              </div>
            </Transition>

            <button
              type="submit"
              :disabled="submitting"
              class="w-full py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
            >
              <svg v-if="submitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              {{ submitting ? 'Sending…' : 'Send Message →' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'
import { personal } from '../data/portfolio'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const form = reactive({ name: '', email: '', subject: '', message: '' })
const errors = reactive({ name: '', email: '', subject: '', message: '' })
const submitting = ref(false)
const submitStatus = ref(null) // null | 'success' | 'error'

const contactItems = [
  { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, icon: '✉️', gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { label: 'Phone', value: personal.phone, href: `tel:${personal.phone}`, icon: '📱', gradient: 'linear-gradient(135deg,#22d3ee,#3b82f6)' },
  { label: 'Location', value: personal.location, href: '#', icon: '📍', gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
]

const socials = [
  { label: 'GitHub', icon: '🐙', href: personal.github },
  { label: 'LinkedIn', icon: '💼', href: personal.linkedin },
]

function validate() {
  let valid = true
  errors.name = form.name.trim().length < 2 ? 'Name must be at least 2 characters.' : ''
  errors.subject = form.subject.trim().length < 2 ? 'Subject is required.' : ''
  errors.message = form.message.trim().length < 10 ? 'Message must be at least 10 characters.' : ''

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.email = !emailRe.test(form.email.trim()) ? 'Enter a valid email address.' : ''

  for (const k of ['name', 'email', 'subject', 'message']) {
    if (errors[k]) valid = false
  }
  return valid
}

async function handleSubmit() {
  if (!validate()) return

  submitting.value = true
  submitStatus.value = null

  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name:  form.name.trim(),
        from_email: form.email.trim(),
        subject:    form.subject.trim(),
        message:    form.message.trim(),
        reply_to:   form.email.trim(),
      },
      { publicKey: PUBLIC_KEY },
    )
    console.log('[EmailJS] Success:', result.status, result.text)
    submitStatus.value = 'success'
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
    Object.assign(errors, { name: '', email: '', subject: '', message: '' })
  } catch (err) {
    console.error('[EmailJS] Error:', err?.status, err?.text, err)
    submitStatus.value = 'error'
  } finally {
    submitting.value = false
    setTimeout(() => { submitStatus.value = null }, 6000)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
