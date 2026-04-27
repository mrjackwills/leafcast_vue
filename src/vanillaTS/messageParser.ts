import type { TWSFromPi } from '@/types'
import { parse } from 'secure-json-parse'
import { isString } from '@/types/typeguard'

export function parseMessage (message: unknown): TWSFromPi | undefined {
	try {
		if (!isString(message)) {
			throw new Error('not string')
		}
		const tmpData: TWSFromPi = parse(message, undefined, {
			protoAction: 'remove',
			constructorAction: 'remove',
		})
		if (!tmpData.data && !tmpData?.error) {
			throw new Error('Invalid data')
		}
		return tmpData
	} catch {
		return undefined
	}
}
