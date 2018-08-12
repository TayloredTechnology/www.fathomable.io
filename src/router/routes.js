const routes = [
	{
		path: '/',
		component: () => import('layouts/content.vue'),
		children: [{path: '', component: () => import('pages/Index.vue')}]
	},
	{
		path: '/docs',
		component: () => import('layouts/content.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/markdown.vue'),
				metadata: {index: true}
			},
			{path: ':category', component: () => import('pages/markdown.vue')},
			{path: ':category/:post', component: () => import('pages/markdown.vue')}
		]
	}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	})
}

export default routes
