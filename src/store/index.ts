import loading from '@/store/modules/loading';
import piStatus from '@/store/modules/piStatus';
import snack from '@/store/modules/snackbar';
import user from '@/store/modules/user';
import ws from '@/store/modules/websocket';
import image from '@/store/modules/image';

import vuex from '@/store/vuex_setup';
export const store = vuex;

export const LoadingModule = loading;
export const PiStatusModule = piStatus;
export const SnackModule = snack;
export const UserModule = user;
export const WSModule = ws;
export const ImageModule = image;