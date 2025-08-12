export const ModuleName = {
	IMAGE: 'image',
	LOADING: 'loading',
	PI_STATUS: 'piStatus',
	SETTINGS: 'settings',
	SNACKBAR: 'snackbar',
	USER: 'user',
	WEBSOCKET: 'websocket'
} as const;

export type ModuleName = (typeof ModuleName)[keyof typeof ModuleName];
