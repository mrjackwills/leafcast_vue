export const FrontendRoutes = {
	BASE: '/' as const,
	CATCHALL: '/:pathMatch(.*)*' as const,
	LOGIN: '/login' as const
};


export type FrontendRoutes = (typeof FrontendRoutes)[keyof typeof FrontendRoutes]; 