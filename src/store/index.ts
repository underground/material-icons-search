import { ColorMode, State, Dict, Icon, Icons } from '@/types'
import { createStore, createLogger } from 'vuex'
import template from 'lodash.template'
import templatesettings from 'lodash.templatesettings'
import difference from 'lodash.difference'
import orderBy from 'lodash.orderby'
import codePoints from '../data/codePoints.json'
import { host, asset_url_pattern } from '../data/metadata.json'

templatesettings.interpolate = /{([\s\S]+?)}/g
const compiled_asset_url = template('https://' + host + asset_url_pattern)

const debug = process.env.NODE_ENV !== 'production'

const state: State = {
  loading: true,
  icons: {},
  searchText: "",
  tags: [],
  categories: [],
  font: 'filled',
  sort: 'popularity',
  showCodepoint: false,
  selectedName: "",
  colorMode: 'auto',
}

const getters = {
  icons: (state: State) => {
    return orderBy(Object.keys(state.icons?.[state.font] || {}).reduce((acc: Icon[], name: string) => {
      const icon: Icon = state.icons[state.font][name]
      if (state.searchText && icon.name.indexOf(state.searchText) === -1 ||
        state.tags.length > 0 && difference(state.tags, icon.tags).length > 0 ||
        state.categories.length > 0 && difference(state.categories, icon.categories).length > 0) {
        // do nothing
      } else {
        acc.push(icon)
      }
      return acc
    }, []), [state.sort], [state.sort === 'popularity' ? 'desc' : 'asc'])
  },
  iconNums: (state: State) => {
    return Object.keys(state.icons?.[state.font] || {}).length
  },
  selectedIcon: (state: State) => {
    const icon: Icon|undefined = state.icons[state.font][state.selectedName]
    const family = codePoints.find(code => code.font === state.font)?.['family'] || ''
    let svgAssetUrl = null
    let pngAssetUrl = null
    if (icon && !icon?.unsupported_families?.includes(family)) {
      const size = icon.sizes_px?.[icon.sizes_px?.length - 1]
      const font = state.font === 'filled' ? '' : state.font
      const color = 'black'
      svgAssetUrl = compiled_asset_url({
        family: family.replaceAll(' ', '').toLowerCase(),
        icon: icon.name,
        version: icon.version,
        asset: `${size}px.svg`,
      })
      pngAssetUrl = compiled_asset_url({
        family: family.replaceAll(' ', '').toLowerCase(),
        icon: icon.name,
        version: icon.version,
        asset: `${color}-${size}dp.zip`,
      })
    }
    return {
      ...icon,
      svgAssetUrl,
      pngAssetUrl,
    }
  },
}

const mutations = {
  setIcons: (state: State, icons: Icons) => {
    state.loading = false
    state.icons = icons
  },
  setText: (state: State, text: string) => {
    state.searchText = text
  },
  setTags: (state: State, tags: string[]) => {
    state.tags = tags
  },
  setCategories: (state: State, categories: string[]) => {
    state.categories = categories
  },
  setFont: (state: State, value: string) => {
    state.font = value
  },
  selectIcon: (state: State, name: string) => {
    state.selectedName = name
  },
  unselectIcon: (state: State) => {
    state.selectedName = ""
  },
  setColorMode: (state: State, mode: ColorMode) => {
    state.colorMode = mode
  },
  toggleShowCodepoint: (state: State) => {
    state.showCodepoint = !state.showCodepoint
  },
}

export const store = createStore({
  state,
  mutations,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
