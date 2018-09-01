import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import _ from 'lodash'
import convertCase from 'js-convert-case'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function({store} /* { store, ssrContext } */) {
	const Router = new VueRouter({
		scrollBehavior: () => ({y: 0}),
		routes,

		// Leave these as is and change from quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		mode: process.env.VUE_ROUTER_MODE,
		base: process.env.VUE_ROUTER_BASE
	})

	Router.afterEach(to => {
		const breadcrumbs = to.path.split('/')
		const walkCrumbs = []
		let trailCrumbs = ''
		for (const crumb of breadcrumbs) {
			if (!_.isEmpty(crumb)) {
				trailCrumbs += '/' + crumb
				walkCrumbs.push({
					label: convertCase.toSentenceCase(crumb),
					to: trailCrumbs
				})
			}
		}
		store.dispatch('breadcrumbs/crumbs$assign', walkCrumbs)
	})

	return Router
}
