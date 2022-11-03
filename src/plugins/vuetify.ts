import 'vuetify/styles';
import '../sass/variables.scss';

import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { createVuetify } from 'vuetify';

export default createVuetify({
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		},
	},
	
	theme: {
		cspNonce: 'fjyUZc2Q76Qde9nNwhAX7SA5cFjwEEzG',
		themes: {
			light: {
				colors: {
					primary: '#aa8945',
					lip: '#735714',
					success: '#80CBC4',
					secondary: '#402e32',
					danger: '#FB8C00',
					serious: '#B71C1C',
					offwhite: '#ffeecb',
					haze: '#98b0a9'
				},
			},
		},
	},
});