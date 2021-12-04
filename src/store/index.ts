import { imageStore } from '@/store/image';
import { loadingStore } from '@/store/loading';
import { piStatusStore } from '@/store/piStatus';
import { snackbarStore } from '@/store/snackbar';
import { userStore } from '@/store/user';
import { websocketStore } from '@/store/websocket';

export const imageModule = imageStore;
export const loadingModule = loadingStore;
export const piStatusModule = piStatusStore;
export const snackbarModule = snackbarStore;
export const userModule = userStore;
export const websocketModule = websocketStore;