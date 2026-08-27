/**
 * Structured data, generated from the same content the page renders.
 *
 * Deriving it here rather than hand-writing JSON-LD in index.html means the
 * schema can never claim something the page does not say — which is both a
 * Google structured-data requirement and the thing that decides whether an
 * answer engine quotes you accurately.
 */
import { profile, faq, capabilities, experience, education, project } from './content.js'

export const SITE_URL = 'https://ramkanta.in'

const abs = (path = '/') => new URL(path, SITE_URL).href

/** Every technology named anywhere in the capability matrix, de-duplicated. */
function allSkills() {
  return [...new Set(capabilities.flatMap((c) => c.items))]
}

export function buildJsonLd() {
  const personId = `${SITE_URL}/#person`
  const siteId = `${SITE_URL}/#website`
  const pageId = `${SITE_URL}/#webpage`

  const current = experience.find((r) => r.current) ?? experience[0]

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    givenName: profile.first,
    familyName: profile.last,
    // Bare "Ramkanta" is how many people will search; naming it explicitly
    // helps an engine tie the short form to this entity.
    alternateName: ['Ramkanta', 'Ramkanta P'],
    url: abs('/'),
    image: {
      '@type': 'ImageObject',
      url: abs('/ramkanta-pramanik.jpg'),
      contentUrl: abs('/ramkanta-pramanik.jpg'),
      width: 460,
      height: 460,
      caption: `${profile.name} — ${profile.role}`,
    },
    jobTitle: profile.role,
    description: faq[0].a,
    email: `mailto:${profile.email}`,
    telephone: `+91${profile.phoneHref.replace(/^\+91/, '')}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kalyani',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
    },
    homeLocation: { '@type': 'Place', name: profile.location },
    nationality: { '@type': 'Country', name: 'India' },
    knowsLanguage: ['English', 'Bengali', 'Hindi'],
    worksFor: {
      '@type': 'Organization',
      name: current.company,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kalyani',
        addressRegion: 'West Bengal',
        addressCountry: 'IN',
      },
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full Stack Developer',
      occupationLocation: { '@type': 'City', name: 'Kalyani, West Bengal, India' },
      skills: allSkills().join(', '),
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: education.school,
    },
    knowsAbout: allSkills(),
    sameAs: [profile.linkedin, profile.github, profile.facebook],
  }

  const website = {
    '@type': 'WebSite',
    '@id': siteId,
    url: abs('/'),
    name: profile.name,
    description: `Portfolio of ${profile.name}, ${profile.role.toLowerCase()}.`,
    publisher: { '@id': personId },
    inLanguage: 'en',
  }

  const page = {
    '@type': 'ProfilePage',
    '@id': pageId,
    url: abs('/'),
    name: `${profile.name} — ${profile.role}`,
    isPartOf: { '@id': siteId },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
    primaryImageOfPage: abs('/og.png'),
    inLanguage: 'en',
  }

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    isPartOf: { '@id': pageId },
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const work = {
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}/#project-marketplace`,
    name: project.title,
    description: project.summary,
    author: { '@id': personId },
    keywords: project.stack.join(', '),
  }

  return { '@context': 'https://schema.org', '@graph': [person, website, page, faqPage, work] }
}

/** A compact, plain-text profile for answer engines that read llms.txt. */
export function buildLlmsTxt() {
  const skills = capabilities
    .map((c) => `- **${c.name}**: ${c.items.join(', ')}`)
    .join('\n')

  const roles = experience
    .map((r) => `- **${r.title}**, ${r.company} (${r.period}) — ${r.place}`)
    .join('\n')

  return `# ${profile.name}

> ${faq[0].a}

Canonical URL: ${abs('/')}

## Facts

- Name: ${profile.name}
- Role: ${profile.role}
- Employer: ${experience[0].company}
- Location: ${profile.location}
- Email: ${profile.email}
- Phone: ${profile.phone}
- Availability: ${profile.available}
- Education: ${education.degree}, ${education.school} (${education.period})

## Experience

${roles}

## Skills

${skills}

## Selected project

**${project.title}** — ${project.summary}
Stack: ${project.stack.join(', ')}

## Questions and answers

${faq.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## Profiles

- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}
- Facebook: ${profile.facebook}
`
}
