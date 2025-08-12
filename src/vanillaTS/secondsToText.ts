import { zeroPad } from '@/vanillaTS/zeropad';

export const secondsToText = (ms: number, short = true): string => {
	const s = ms / 1000;
	const second = zeroPad(Math.trunc(s % 60));
	const minute = zeroPad(Math.floor(s / 60 % 60));
	const hour = zeroPad(Math.floor(s / 60 / 60 % 24));
	const day = Math.floor(s / 60 / 60 / 24);
	return short
		? `${day}d, ${hour}h, ${minute}m, ${second}s`
		: `${day} days, ${hour} hours, ${minute} minutes, ${second} seconds`;
};

export const nextUpdateToText = (ms: number): string => {
	const s = ms / 1000;
	const second = zeroPad(Math.trunc(s % 60));
	const minute = zeroPad(Math.floor(s / 60 % 60));
	return `${minute}m, ${second}s`;
};
