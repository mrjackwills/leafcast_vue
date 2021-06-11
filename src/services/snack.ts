import { mdiAlertCircle, mdiCheckCircleOutline } from '@mdi/js';
import { SnackModule } from '@/store';
import { TSnack } from '@/types';

export const snackSuccess = async ({ message = 'Success', icon = mdiCheckCircleOutline, timeout=5000, loading=false }: TSnack): Promise<void> => {
	snackReset();
	await Promise.all([
		SnackModule.dispatch_icon(icon),
		SnackModule.dispatch_loading(loading),
		SnackModule.dispatch_message(message),
		SnackModule.dispatch_timeout(timeout),
		SnackModule.dispatch_visible(true),
	]);
};

export const snackError = async ({ message = 'error', icon = mdiAlertCircle, timeout=7500 }: TSnack): Promise<void> =>{
	snackReset();
	await Promise.all([
		SnackModule.dispatch_icon(icon),
		SnackModule.dispatch_message(message),
		SnackModule.dispatch_timeout(timeout),
		SnackModule.dispatch_visible(true),
	]);
};

export const snackReset = ():void => {
	SnackModule.dispatch_reset();
};