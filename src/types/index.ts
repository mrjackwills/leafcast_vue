type TWSToServerNames = 'photo' | 'force-update'

export type u<T> = T | undefined
export type su = u<string>
export type nu = u<number>

export type TConvertBytes = {
	total: string,
	unit: 'GB' | 'MB' | 'KB'
}

export type TDataToDisplay = Array<Array< { [ K in 'icon' | 'text' | 'value' ]: string } & { extra?: string } >>

export type TError = { message: string, code: number }

export type TPhoto = { message: 'photo', data: { image?: string, timestamp: number, imageSize_compressed?: number, imageSize_original? :number, piInfo: TPiStatus } }

export type TPiStatus = { [ K in 'internalIp' | 'piVersion' | 'totalFileSize'] : string } & {[ K in 'uptime' | 'nodeUptime' | 'numberImages' ] : number }

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

export type TWSFromPi = { data?: TPhoto, cache?: boolean, unique?: boolean, error?: TError }

export type TWSToServer = { message: TWSToServerNames }
