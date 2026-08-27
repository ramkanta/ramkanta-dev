/**
 * Injects the server-rendered markup into the built index.html.
 * Runs after both the client and SSR builds.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = path.join(root, 'dist', 'index.html')

const { render } = await import(path.join(root, 'dist-ssr', 'entry-server.js'))
const { buildJsonLd, buildLlmsTxt } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'seo.js')).href
)

const template = fs.readFileSync(indexPath, 'utf-8')
const appHtml = await render()

const marker = '<div id="app"></div>'
if (!template.includes(marker)) {
  throw new Error(`prerender: could not find "${marker}" in dist/index.html`)
}

const schemaMarker = '<!--seo-jsonld-->'
if (!template.includes(schemaMarker)) {
  throw new Error(`prerender: could not find "${schemaMarker}" in dist/index.html`)
}

// </script> inside JSON would close the tag early.
const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c')

const html = template
  .replace(marker, `<div id="app">${appHtml}</div>`)
  .replace(
    schemaMarker,
    `<script type="application/ld+json">${jsonLd}</script>`,
  )

fs.writeFileSync(indexPath, html)

// Plain-text profile for answer engines that look for it.
const llms = buildLlmsTxt()
fs.writeFileSync(path.join(root, 'dist', 'llms.txt'), llms)

const words = appHtml.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
console.log(
  `prerender: ${(appHtml.length / 1024).toFixed(1)} kB HTML (${words} words), ` +
  `${(jsonLd.length / 1024).toFixed(1)} kB JSON-LD, ${(llms.length / 1024).toFixed(1)} kB llms.txt`,
)
