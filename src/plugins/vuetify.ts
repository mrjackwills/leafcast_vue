import Vue from 'vue';
import { Intersect, Ripple, Touch } from 'vuetify/lib/directives';

import Vuetify, {
	VApp,
	VBtn,
	VCard,
	VCardActions,
	VCardText,
	VChip,
	VCol,
	VContainer,
	VDivider,
	VExpandTransition,
	VFadeTransition,
	VFooter,
	VForm,
	VIcon,
	VImg,
	VMain,
	VProgressCircular,
	VProgressLinear,
	VRow,
	VSpacer,
	VSnackbar,
	VTextField,
	VToolbar,
	VToolbarTitle,
} from 'vuetify/lib';

Vue.use(Vuetify, {
	components: {
		VApp,
		VBtn,
		VCard,
		VCardActions,
		VCardText,
		VChip,
		VCol,
		VContainer,
		VDivider,
		VExpandTransition,
		VFadeTransition,
		VFooter,
		VForm,
		VIcon,
		VImg,
		VMain,
		VProgressCircular,
		VProgressLinear,
		VRow,
		VSnackbar,
		VSpacer,
		VTextField,
		VToolbar,
		VToolbarTitle,
	},
	directives: {
		Intersect,
		Ripple,
		Touch,
	},
});

const opts = {
	icons: {
		iconfont: <const>'mdiSvg'
	},
	theme: {
		options: {
			cspNonce: 'fjyUZc2Q76Qde9nNwhAX7SA5cFjwEEzG'
		},
		themes: {
			light: {
				primary: '#aa8945',
				lip: '#735714',
				success: '#80CBC4',
				secondary: '#402e32',
				danger: '#FB8C00',
				serious: '#B71C1C',
				offwhite: '#ffeecb',
				haze: '#98b0a9'
			},
			options: {
				customProperties: true,
				minifyTheme: (css: string): string => process.env.NODE_ENV === 'production' ? css.replace(/[\s|\r\n|\r|\n]/g, ''): css,
			}
		}
	}
};
export default new Vuetify(opts);