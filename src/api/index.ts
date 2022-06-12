import metadata from '../data/metadata.json'
import codePoints from '../data/codePoints.json'
import { Icons, Icon } from '../types'

export const loadMaterialIcons = async() => {
  return Promise.all(codePoints.map(async(source) => {
    const response = await fetch(source.url)
    const data = await response.text()
    const lines = data.split('\n')
    return lines.reduce((acc: Icons, line: string) => {
      const [name, codepoint] = line.split(/\s/)
      if (name) {
        const icon = metadata.icons.find(icon => icon.name === name)
        acc[source.font] = {
          ...acc[source.font],
          [name]: {
            name,
            version: icon?.version,
            codepoint,
            font: source.font,
            unsupported_families: icon?.unsupported_families || [],
            categories: icon?.categories || [],
            tags: icon?.tags || [],
            popularity: icon?.popularity || 0,
            sizes_px: icon?.sizes_px || [],
          }
        }
      }
      return acc
    }, {})
  })).then(results => {
    return Promise.resolve(results.reduce((acc, o) => {
      return {
        ...acc,
        ...o
      }
    }, {}))
  })
}