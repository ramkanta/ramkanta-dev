/**
 * Injects the server-rendered markup into the built index.html.
 * Runs after both the client and SSR builds.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = path.join(root, 'dist', 'index.html')

const { render } = await import(path.join(root, 'dist-ssr', 'entry-server.js'))

const template = fs.readFileSync(indexPath, 'utf-8')
const appHtml = await render()

const marker = '<div id="app"></div>'
if (!template.includes(marker)) {
  throw new Error(`prerender: could not find "${marker}" in dist/index.html`)
}

fs.writeFileSync(indexPath, template.replace(marker, `<div id="app">${appHtml}</div>`))

const words = appHtml.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} kB of HTML (${words} words)`)
