/**
 * Single source of truth for every piece of copy on the site.
 * Keeping it here means the résumé and the site never drift apart.
 */

export const profile = {
  name: 'Ramkanta Pramanik',
  first: 'Ramkanta',
  last: 'Pramanik',
  role: 'Full Stack Developer',
  stack: 'TypeScript · React · Next.js · NestJS · Node.js · AWS',
  location: 'Kalyani, West Bengal, India',
  email: 'ramkantapramanik9679@gmail.com',
  phone: '+91 96796 97440',
  phoneHref: '+919679697440',
  linkedin: 'https://www.linkedin.com/in/ramkanta-pramanik-96123a1ba/',
  github: 'https://github.com/ramkanta',
  available: 'Open to full-stack roles',
  summary:
    'Full stack developer building production healthcare and e-commerce systems in TypeScript, NestJS and Next.js. I care about the parts users never see — the schema, the validation layer, the webhook that has to be right the first time.',
}

/** Blueprint-style fact table under the hero. */
export const specs = [
  { key: 'Role',     value: 'Software Developer, Full Stack' },
  { key: 'Company',  value: 'InfluxIQ Tech' },
  { key: 'Based',    value: 'Kalyani, West Bengal, IN' },
  { key: 'Focus',    value: 'Secure APIs · Payments · Cloud' },
]

/** Hero counters. `value` is the real number; `suffix` trails it. */
export const stats = [
  { value: 70, suffix: '+', label: 'REST endpoints shipped' },
  { value: 15, suffix: '+', label: 'Admin modules built' },
  { value: 2,  suffix: '',  label: 'Production domains' },
  { value: 5,  suffix: '',  label: 'Engineers in team' },
]

/** Marquee tech strip — two rows scrolling opposite directions. */
export const marquee = {
  top: [
    'TypeScript', 'React', 'Next.js', 'NestJS', 'Node.js', 'Express',
    'Zod', 'TanStack Query', 'Tailwind CSS', 'shadcn/ui', 'NextAuth.js',
  ],
  bottom: [
    'PostgreSQL', 'MongoDB', 'Redis', 'AWS Lambda', 'Cognito', 'S3',
    'ECS', 'Step Functions', 'Docker', 'Terraform', 'GitHub Actions', 'Razorpay',
  ],
}

/** "How I work" — four principles, each naming a real artefact. */
export const principles = [
  {
    n: '01',
    title: 'Auth and validation come first',
    body: 'JWT, role checks and Zod schemas go in before the handler exists — not bolted on after a review flags them. Every one of the 70+ endpoints I shipped carries them from its first commit.',
    artefact: 'Guards · Zod schemas',
  },
  {
    n: '02',
    title: 'Model the data before the routes',
    body: 'Schema, relationships and the shape of every payload get settled up front. On the appointment system that meant booking, cancellation and record states were designed as one model, not three features.',
    artefact: 'Migrations · Mongoose',
  },
  {
    n: '03',
    title: 'Money needs a reconciliation path',
    body: 'A payment integration is not the checkout call — it is the webhook signature check, the retry, and the reconciliation that catches the order the callback never reached. Zero payment inconsistencies post-launch.',
    artefact: 'Razorpay webhooks · FSM',
  },
  {
    n: '04',
    title: 'Releases should be uneventful',
    body: 'Build, test, migrate and roll out automated in GitHub Actions, services containerised on ECR/ECS. A deploy stops being a decision and becomes a merge.',
    artefact: 'Docker · GitHub Actions',
  },
]

/** Capability matrix — the rail on the left, panels on the right. */
export const capabilities = [
  {
    id: 'languages',
    n: '01',
    name: 'Languages',
    note: 'Typed end to end — the same types travel from the database row to the button.',
    items: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'frontend',
    n: '02',
    name: 'Frontend',
    note: 'Server-rendered by default; hydrated only where interaction earns it.',
    items: [
      'React', 'Next.js (App Router)', 'Server Components', 'Server Actions',
      'TanStack Query', 'Tailwind CSS', 'Material UI', 'shadcn/ui',
    ],
  },
  {
    id: 'backend',
    n: '03',
    name: 'Backend & APIs',
    note: 'Every route validated at the edge before it reaches a handler.',
    items: [
      'Node.js', 'NestJS', 'Express.js', 'REST API design', 'Zod',
      'JWT & OAuth2', 'NextAuth.js', 'Webhooks', 'Server actions',
    ],
  },
  {
    id: 'payments',
    n: '04',
    name: 'Payments',
    note: 'The deepest domain — checkout, verification, refunds and the reconciliation between them.',
    items: [
      'Razorpay', 'Stripe', 'Checkout sessions', 'Webhook verification',
      'Refunds', 'Order-state reconciliation', 'COD workflows',
    ],
  },
  {
    id: 'databases',
    n: '05',
    name: 'Databases',
    note: 'Access rules and indexes designed with the schema, not after the slow query.',
    items: ['PostgreSQL', 'MongoDB', 'Mongoose', 'Redis', 'Schema design', 'Indexing', 'Migrations'],
  },
  {
    id: 'aws',
    n: '06',
    name: 'AWS',
    note: 'Serverless where the work is bursty, containers where it is steady.',
    items: [
      'Lambda', 'EC2', 'S3', 'ECR', 'ECS', 'Step Functions', 'SQS',
      'EventBridge', 'CloudWatch', 'Cognito', 'Secrets Manager', 'SES', 'IAM', 'Route 53',
    ],
  },
  {
    id: 'devops',
    n: '07',
    name: 'DevOps',
    note: 'Infrastructure changes go through pull request, exactly like application code.',
    items: [
      'Docker', 'Terraform', 'GitHub Actions', 'AWS CodeBuild',
      'CI/CD pipelines', 'Git branching', 'PR reviews', 'Agile / Scrum',
    ],
  },
]

/** Roles, newest first. */
export const experience = [
  {
    id: 'sd',
    title: 'Software Developer, Full Stack',
    company: 'InfluxIQ Tech',
    place: 'Kalyani, West Bengal, India',
    period: 'Jun 2025 — Present',
    current: true,
    points: [
      {
        text: 'Architected and delivered {70+ REST endpoints} in NestJS and Node.js across healthcare and e-commerce systems, applying JWT authentication, role-based access control and Zod input validation on every route from day one.',
      },
      {
        text: 'Built a {patient appointment and management system} on MongoDB, with {S3 presigned-URL uploads} for secure document storage and {AWS Cognito} handling authentication and session tokens — covering booking, cancellation and patient record workflows.',
      },
      {
        text: 'Integrated {Razorpay} across a production Next.js platform — checkout sessions, webhook signature verification, refund triggers and order-state reconciliation — with zero payment inconsistencies reported post-launch.',
      },
      {
        text: 'Containerised services with {Docker} on ECR/ECS and maintained {GitHub Actions} pipelines covering build, test, migration and rollout, cutting manual release steps significantly.',
      },
      {
        text: 'Collaborated in a five-person team on two-week Agile sprints, owning API contracts, joining design discussions and reviewing pull requests to keep the codebase consistent.',
      },
    ],
  },
  {
    id: 'tsd',
    title: 'Trainee Software Developer',
    company: 'InfluxIQ Tech',
    place: 'Kalyani, West Bengal, India',
    period: 'Mar 2025 — May 2025',
    current: false,
    points: [
      {
        text: 'Completed a structured three-month programme, building and testing React/Next.js front-end features and NestJS API modules alongside senior developers, following the team’s Git and sprint workflows.',
      },
      {
        text: 'Gained production-grade exposure to PostgreSQL schema design, REST API conventions and cloud deployment practices before moving into a full developer role.',
      },
    ],
  },
]

export const environment = [
  'TypeScript', 'Node.js', 'NestJS', 'React', 'Next.js',
  'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'Git', 'Agile/Scrum',
]

/** The flagship case study. */
export const project = {
  eyebrow: 'Case study',
  kicker: 'E-commerce',
  title: 'Full-Stack E-Commerce Marketplace',
  summary:
    'An end-to-end storefront and operations suite — customer surface, payment rail and a 15+ module admin dashboard — built on Next.js 16 App Router with server components and server actions throughout.',
  stack: [
    'Next.js 16', 'MongoDB', 'Razorpay', 'Redis',
    'NextAuth v5', 'ImageKit', 'Brevo',
  ],
  meta: [
    { key: 'Type',    value: 'Personal project' },
    { key: 'Surface', value: 'Storefront + admin' },
    { key: 'Auth',    value: 'NextAuth v5, role-based' },
    { key: 'Rail',    value: 'Razorpay + COD' },
  ],
  blocks: [
    {
      n: '01',
      title: 'Architecture',
      body: 'Next.js 16 App Router with server components as the default and server actions for mutations, so most pages ship no client JavaScript at all. NextAuth v5 provides role-based authentication across two distinct surfaces — customer and admin — from a single session model.',
    },
    {
      n: '02',
      title: 'Payments and refunds',
      body: 'Razorpay wired with webhook signature verification, plus Cash on Delivery, GST-inclusive pricing and a manual bank/UPI refund tracking workflow that covers both order cancellations and returns. Order and return status changes run through an FSM-guarded transition table, so an order can never reach a state it has no path to.',
    },
    {
      n: '03',
      title: 'Operations dashboard',
      body: 'A 15+ module admin suite spanning orders, returns, refunds, CMS, coupons and settings — API-driven tables with faceted filters, date-range search, paginated CSV export and KPI analytics.',
    },
    {
      n: '04',
      title: 'Performance and delivery',
      body: 'Guest-to-database hybrid cart and wishlist sync so nothing is lost at sign-in, Redis read caching with tag-based invalidation, ImageKit for CDN-backed media, and Brevo for transactional email.',
    },
  ],
  modules: [
    'Orders', 'Returns', 'Refunds', 'Coupons', 'CMS', 'Catalogue',
    'Inventory', 'Customers', 'Shipping', 'Taxes', 'Reports',
    'Analytics', 'Reviews', 'Banners', 'Settings',
  ],
}

export const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'JIS College of Engineering, Kalyani',
  period: 'Aug 2020 — Jun 2024',
}

export const sections = [
  { id: 'top',        n: '00', label: 'Index' },
  { id: 'approach',   n: '01', label: 'Approach' },
  { id: 'capability', n: '02', label: 'Capability' },
  { id: 'experience', n: '03', label: 'Experience' },
  { id: 'work',       n: '04', label: 'Work' },
  { id: 'contact',    n: '05', label: 'Contact' },
]
