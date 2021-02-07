
const MATERIAL_ICON_CODE_POINTS_FILES = [
  { type: "normal", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints' },
  { type: "outlined", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsOutlined-Regular.codepoints' },
  { type: "round", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsRound-Regular.codepoints' },
  { type: "sharp", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsSharp-Regular.codepoints' },
  { type: "twoTone", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsTwoTone-Regular.codepoints' },
]

export const loadMaterialIcons = async() => {
  return Promise.all(MATERIAL_ICON_CODE_POINTS_FILES.map(async(source) => {
    const response = await fetch(source.url)
    const data = await response.text()
    const lines = data.split('\n')
    return lines.map((line: string) => {
      const [name, hex] = line.split(/\s/)
      return { name, hex, type: source.type }
    })
  }))
}