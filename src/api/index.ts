import metadata from '../data/metadata.json'
import codePoints from '../data/codePoints.json'
import { Icon } from '../types'

export const loadMaterialIcons = async() => {
  return Promise.all(codePoints.map(async(source) => {
    const response = await fetch(source.url)
    const data = await response.text()
    const lines = data.split('\n')
    return lines.reduce((acc: Icon[], line: string) => {
      const [name, codepoint] = line.split(/\s/)
      if (name) {
        const icon = metadata.icons.find(icon => icon.name === name)
        acc.push({
          name,
          codepoint,
          font: source.font,
          category: icon?.categories?.[0],
          tags: icon?.tags || [],
          popularity: icon?.popularity || 0,
        })
      }
      return acc
    }, [])
  }))
}