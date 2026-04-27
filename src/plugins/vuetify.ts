import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import 'vuetify/styles'
import '@/styles/variables.scss'

const customDarkTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: '#aa8945',
		lip: '#735714',
		success: '#80CBC4',
		secondary: '#402e32',
		danger: '#FB8C00',
		serious: '#B71C1C',
		offwhite: '#ffeecb',
		haze: '#98b0a9',
	},
}

export default createVuetify({
	defaults: {
		VRow: {
			density: 'compact',
		},
	},
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: { mdi },
	},

	theme: {
		defaultTheme: 'customDarkTheme',
		themes: { customDarkTheme },
	},
})
