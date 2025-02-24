export const ModuleName = {
	IMAGE: 'image' as const,
	LOADING: 'loading' as const,
	PI_STATUS: 'piStatus' as const,
	SETTINGS: 'settings' as const,
	SNACKBAR: 'snackbar' as const,
	USER: 'user' as const,
	WEBSOCKET: 'websocket' as const
};

export type ModuleName = (typeof ModuleName)[keyof typeof ModuleName]; 