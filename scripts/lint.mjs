import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()

const ignoredDirs = new Set([
  ".git",
  ".next",
  ".turbo",
  ".vercel",
  "coverage",
  "dist",
  "node_modules",
])

const textExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
])

const errors = []

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.relative(root, fullPath)

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        await walk(fullPath)
      }
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    if (entry.name === ".DS_Store") {
      // Finder metadata is ignored by Git and is not part of repository quality.
      // Do not let machine-local files make the canonical verifier fail.
      continue
    }

    if (!textExtensions.has(path.extname(entry.name))) {
      continue
    }

    const content = await readFile(fullPath, "utf8")
    checkTextFile(relativePath, content)
  }
}

function checkTextFile(file, content) {
  if (content.length > 0 && !content.endsWith("\n")) {
    errors.push(`${file}: missing trailing newline`)
  }

  const lines = content.split("\n")
  lines.forEach((line, index) => {
    if (/[ \t]$/.test(line)) {
      errors.push(`${file}:${index + 1}: trailing whitespace`)
    }
  })
}

await walk(root)

if (errors.length > 0) {
  console.error("Lint failed:")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log("Lint passed")
