import sharp from 'sharp'
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, extname, basename } from 'path'

const inputDir = './src/assets'
const srcDir = './src'

// ── Step 1: Convert all jpg/jpeg/png to webp ──
const convertImages = (dir) => {
  readdirSync(dir, { withFileTypes: true }).forEach(file => {
    const fullPath = join(dir, file.name)
    if (file.isDirectory()) {
      convertImages(fullPath)
    } else if (['.jpg', '.jpeg', '.png'].includes(extname(file.name).toLowerCase())) {
      const outPath = join(dir, basename(file.name, extname(file.name)) + '.webp')
      sharp(fullPath)
        .webp({ quality: 85 })
        .toFile(outPath)
        .then(() => console.log(`✅ ${file.name} → ${basename(outPath)}`))
        .catch(err => console.error(`❌ ${file.name}:`, err))
    }
  })
}

// ── Step 2: Update all .jsx imports to use .webp ──
const updateImports = (dir) => {
  readdirSync(dir, { withFileTypes: true }).forEach(file => {
    const fullPath = join(dir, file.name)
    if (file.isDirectory()) {
      updateImports(fullPath)
    } else if (extname(file.name) === '.jsx') {
      let content = readFileSync(fullPath, 'utf8')
      const updated = content.replace(/\.(jpg|jpeg|png)(['"])/gi, '.webp$2')
      if (updated !== content) {
        writeFileSync(fullPath, updated)
        console.log(`🔄 updated imports in ${file.name}`)
      }
    }
  })
}

convertImages(inputDir)
updateImports(srcDir)