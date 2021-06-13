type TWSToServerNames = 'photo' | 'force-update'

export type TWSToServer = { message: TWSToServerNames }

export type TError = { message: string, code: number }

export type photo = { message: 'photo', data: {image?: string, timestamp: number, imageSize_compressed?: number, imageSize_original? :number, piInfo: TPiStatus}}

export type TPiStatus = {[ K in 'internalIp' | 'piTime' | 'piVersion' | 'totalFileSize'] : string }
	& {[ K in 'piUptime' | 'piNodeUptime' | 'numberImages' ] :number }

export type TWSFromPi = { data?: photo, cache?: boolean, unique?: boolean, error?: TError }

export type u<T> = T | undefined
export type su = u<string>
export type nu = u<number>

export type TRootState = { user: { _authenticated: boolean, _api_version?:string } }

export type TSnackbarModule = {
	loading: boolean,
	icon: su,
	message: su,
	timeout: number | undefined,
	visible: boolean
}

export type TSnack = {
		message?: string,
		icon?: string
		timeout?: number,
		loading?: boolean
}

export type TConvertBytes = {
	total: string,
	unit: 'GB' | 'MB' | 'KB'
}
