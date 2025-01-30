import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import sass from 'vite-plugin-sass';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
		sass({
			injectGlobalPaths: ['./src/style/global.scss'],
		}),
	],
});
