import { register, unregister } from 'register-service-worker';
import { env } from './vanillaTS/env';

if (env.production_mode) {
	register(`${process.env.BASE_URL}service-worker.js`, {
		ready () {
			// console.log('App is being served from cache by a service worker');
		},
		registered () {
			// console.log('Service worker has been registered.');
		},
		cached () {
			// console.log('Content has been cached for offline use.');
		},
		updatefound () {
			// console.log('New content is downloading.');
		},
		updated () {
			const updateEvent = new CustomEvent('updateEvent');
			document.dispatchEvent(updateEvent);
			unregister();
		},
		offline () {
			// console.log('No internet connection found. App is running in offline mode.');
		},
		error (_error: Error) {
			// console.error('Error during service worker registration:', error);
		}
	});
}