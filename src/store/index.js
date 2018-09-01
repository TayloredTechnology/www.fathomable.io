import Vue from 'vue'
import Vuex from 'vuex'

import {plugin} from 'vuex-dry'

import md from './md'
import breadcrumbs from './breadcrumbs'

Vue.use(Vuex)

export default function(/* { ssrContext } */) {
	const Store = new Vuex.Store({
		modules: {
			breadcrumbs,
			md
		},
		plugins: [plugin]
	})

	return Store
}
