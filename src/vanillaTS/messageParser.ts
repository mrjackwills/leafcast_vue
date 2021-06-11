import { parse } from 'secure-json-parse';
import { TWSFromPi } from '@/types';
import { isString } from '@/types/typeguard';

export const parseMessage = (message: unknown): TWSFromPi|undefined=> {
	try {
		if (!isString(message)) throw Error('not string');
		const tmpData: TWSFromPi = parse(message, undefined, { protoAction: 'remove', constructorAction: 'remove' });
		if (!tmpData.data && !tmpData?.error) throw Error('Invalid data');
		return tmpData;
	} catch (e) {
		return undefined;
	}
};