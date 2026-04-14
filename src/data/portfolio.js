export const personal = {
  name: 'MD. Dulal Hossin',
  title: 'Frontend Team Lead',
  subtitle: 'Vue.js Specialist & Automation Engineer',
  location: 'Savar, Dhaka, Bangladesh',
  email: 'dulaldh.cse@gmail.com',
  phone: '+8801751341563',
  github: 'https://github.com/DulalDh',
  linkedin: 'https://www.linkedin.com/in/DulalDh',
  bio: 'Frontend Team Lead with 6+ years of experience specializing in Vue.js. Known for designing automation pipelines and achieving a 50% reduction in feature delivery time through innovative workflows. Passionate about clean architecture, performance, and team growth.',
  typingPhrases: [
    'Frontend Team Lead',
    'Vue.js Specialist',
    'Automation Engineer',
    'UI/UX Enthusiast',
    'Problem Solver',
  ],
}

export const skills = [
  { name: 'Vue.js / Vue 3', level: 95, category: 'Frontend', icon: '⚡' },
  { name: 'JavaScript (ES6+)', level: 92, category: 'Frontend', icon: '🟨' },
  { name: 'Tailwind CSS', level: 90, category: 'Frontend', icon: '🎨' },
  { name: 'TypeScript', level: 78, category: 'Frontend', icon: '🔷' },
  { name: 'Nuxt.js', level: 75, category: 'Frontend', icon: '🚀' },
  { name: 'REST APIs', level: 88, category: 'Backend', icon: '🔗' },
  { name: 'Playwright Testing', level: 82, category: 'Testing', icon: '🧪' },
  { name: 'State Management (Pinia/Vuex)', level: 90, category: 'Frontend', icon: '🗂️' },
  { name: 'Claude CLI / AI Automation', level: 85, category: 'DevOps', icon: '🤖' },
  { name: 'Git & Version Control', level: 88, category: 'DevOps', icon: '🌿' },
]

export const skillCategories = ['All', 'Frontend', 'Backend', 'Testing', 'DevOps']

export const experiences = [
  {
    company: 'BluBird Interactive Ltd',
    role: 'Software Engineer (Frontend Team Lead)',
    period: 'July 2022 – Present',
    duration: '2+ years',
    type: 'Full-time',
    highlights: [
      'Lead a team of 7 Vue.js developers, mentoring and conducting code reviews',
      'Engineered automated development pipeline managing full SDLC with Claude CLI',
      'Achieved 50% reduction in feature delivery time through innovative workflows',
      'Reduced production bugs by 40% via Playwright end-to-end testing integration',
      'Architected scalable frontend solutions for enterprise-level applications',
    ],
    tech: ['Vue 3', 'Pinia', 'Tailwind CSS', 'Playwright', 'Claude CLI'],
    color: '#6366f1',
  },
  {
    company: 'Swosti Limited',
    role: 'Software Engineer',
    period: 'August 2021 – June 2022',
    duration: '11 months',
    type: 'Full-time',
    highlights: [
      'Developed FinTech SaaS applications using Vue 3 Composition API',
      'Built complex financial dashboards with real-time data visualization',
      'Optimized data processing modules achieving 15% speed improvement',
      'Implemented micro-finance loan and savings workflow systems',
    ],
    tech: ['Vue 3', 'Vuex', 'REST API', 'Chart.js', 'Bootstrap'],
    color: '#22d3ee',
  },
  {
    company: 'Rigg Technologies, Ltd',
    role: 'Jr. Software Engineer',
    period: 'November 2019 – July 2021',
    duration: '1 year 9 months',
    type: 'Full-time',
    highlights: [
      'Developed Queue Management System with real-time monitoring',
      'Reduced average customer wait time by 15% through UI/UX improvements',
      'Built multi-branch support system with live analytics dashboard',
      'Contributed to system architecture decisions and database design',
    ],
    tech: ['Vue.js', 'JavaScript', 'WebSocket', 'MySQL', 'Laravel'],
    color: '#f59e0b',
  },
]

export const projects = [
  {
    title: 'My Broker Cloud',
    description: 'Enterprise real estate platform with dynamic forms, role-based dashboards, and property management workflows for brokers and agents.',
    category: 'Enterprise',
    tech: ['Vue 3', 'Pinia', 'Tailwind CSS', 'REST API'],
    icon: '🏠',
    gradient: 'from-indigo-500 to-purple-600',
    features: ['Dynamic form builder', 'Role-based access', 'Real-time dashboards', 'Property analytics'],
  },
  {
    title: 'DeshiCommerce',
    description: 'Full-featured e-commerce admin dashboard with inventory management, order tracking, and sales analytics for Bangladeshi merchants.',
    category: 'E-commerce',
    tech: ['Vue 3', 'Vuex', 'Chart.js', 'Tailwind CSS'],
    icon: '🛒',
    gradient: 'from-cyan-500 to-blue-600',
    features: ['Inventory management', 'Order tracking', 'Sales reports', 'Multi-vendor support'],
  },
  {
    title: 'Swosti MFI247',
    description: 'Micro-finance platform supporting loan origination, savings management, and repayment workflows for underbanked communities.',
    category: 'FinTech',
    tech: ['Vue 3', 'REST API', 'Chart.js', 'Bootstrap'],
    icon: '💰',
    gradient: 'from-emerald-500 to-teal-600',
    features: ['Loan management', 'Savings workflows', 'Repayment tracking', 'Branch reporting'],
  },
  {
    title: 'Queue Management System',
    description: 'Real-time queue monitoring system with multi-branch support, live analytics, and customer flow optimization.',
    category: 'Enterprise',
    tech: ['Vue.js', 'WebSocket', 'Laravel', 'MySQL'],
    icon: '📊',
    gradient: 'from-orange-500 to-red-600',
    features: ['Real-time monitoring', 'Multi-branch support', 'Analytics dashboard', 'SMS notifications'],
  },
  {
    title: 'Ultimate Admission',
    description: 'Online testing platform for university admission preparation with adaptive quizzes, performance analytics, and study materials.',
    category: 'EdTech',
    tech: ['Vue.js', 'Node.js', 'MongoDB', 'REST API'],
    icon: '📚',
    gradient: 'from-pink-500 to-rose-600',
    features: ['Adaptive quizzes', 'Performance tracking', 'Leaderboards', 'Study analytics'],
  },
  {
    title: 'e-Wallet',
    description: 'Digital payment system with peer-to-peer transfers, transaction history, and secure wallet management features.',
    category: 'FinTech',
    tech: ['Vue 3', 'Pinia', 'REST API', 'Tailwind CSS'],
    icon: '💳',
    gradient: 'from-violet-500 to-purple-700',
    features: ['P2P transfers', 'Transaction history', 'Wallet management', 'Security features'],
  },
]

export const projectCategories = ['All', 'Enterprise', 'FinTech', 'E-commerce', 'EdTech']

export const education = {
  institution: 'Hajee Mohammad Danesh Science and Technology University',
  degree: 'Bachelor of Science in Computer Science & Engineering',
  period: '2014 – 2019',
  cgpa: '3.13 / 4.00',
  location: 'Dinajpur, Bangladesh',
}

export const achievements = [
  {
    title: 'Stellar Performance Award',
    description: 'Awarded for exceptional performance and contributions at BluBird Interactive Ltd',
    period: 'Oct 2023 – Mar 2024',
    icon: '🏆',
  },
  {
    title: '1st Place – District Science Fair',
    description: 'Won first place at the District Science Fair for an innovative tech project',
    period: '2019',
    icon: '🥇',
  },
  {
    title: '300+ Programming Problems',
    description: 'Solved over 300 problems across competitive programming platforms including Codeforces and LeetCode',
    period: 'Ongoing',
    icon: '💻',
  },
  {
    title: 'Joint Secretary – CSE Student Association',
    description: 'Served as Joint Secretary of the university CSE Student Association, organizing tech events',
    period: '2017 – 2019',
    icon: '🎓',
  },
]

export const stats = [
  { value: '6+', label: 'Years Experience' },
  { value: '7', label: 'Team Members Led' },
  { value: '50%', label: 'Faster Delivery' },
  { value: '40%', label: 'Fewer Bugs' },
]
