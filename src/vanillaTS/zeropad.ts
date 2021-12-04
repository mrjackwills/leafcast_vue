export const zeroPad = (unit: number): string => {
	return String(unit).padStart(2, '0');
};