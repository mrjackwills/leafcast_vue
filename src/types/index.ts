type TWSToServerNames = 'photo' | 'force_update'

export type u<T> = T | undefined
export type su = u<string>
export type nu = u<number>

export type TConvertBytes = {
	total: string,
	unit: 'GB' | 'MB' | 'kB'
}

export type TDataToDisplay = Array<Array< { [ K in 'icon' | 'text' | 'value' ]: string } & { extra?: string } >>

export type TError = { message: string, code: number }

export type TPhoto = { name: 'photo', data: { image?: string, timestamp: string, size_converted?: number, size_original? :number, pi_info: TPiStatus } }

export type TPiStatus = { [ K in 'internal_ip' | 'version' | 'total_file_size']: string } & { [ K in 'uptime' | 'app_uptime' | 'number_images' | 'websocket_uptime' ]: number }

export type TSnackbarModule = {
	loading: boolean,
	icon: su,
	message: su,
	timeout: nu,
	visible: boolean
}

export type TSnack = {
	message?: string,
	icon?: string
	timeout?: number,
	loading?: boolean,
}

export type TVideoName = 'basil' | 'garden'

export type TWSFromPi = { data?: TPhoto, cache?: boolean, unique?: boolean, error?: TError }

export type TWSToServer = { name: TWSToServerNames }
