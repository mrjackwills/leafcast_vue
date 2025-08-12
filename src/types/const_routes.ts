export const FrontendRoutes = {
	BASE: '/',
	CATCHALL: '/:pathMatch(.*)*',
	LOGIN: '/login'
} as const;

export type FrontendRoutes = (typeof FrontendRoutes)[keyof typeof FrontendRoutes];
