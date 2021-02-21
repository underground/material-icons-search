import metadata from '../data/metadata.json'
import Icon from '../types/icon'

export const MATERIAL_ICON_CODE_POINTS_FILES = [
  { font: "filled", label: "Filled", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints' },
  { font: "outlined", label: "Outlined", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsOutlined-Regular.codepoints' },
  { font: "rounded", label: "Rounded", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsRound-Regular.codepoints' },
  { font: "twoTone", label: "Two-Tone", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsTwoTone-Regular.codepoints' },
  { font: "sharp", label: "Sharp", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsSharp-Regular.codepoints' },
]

export const loadMaterialIcons = async() => {
  return Promise.all(MATERIAL_ICON_CODE_POINTS_FILES.map(async(source) => {
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