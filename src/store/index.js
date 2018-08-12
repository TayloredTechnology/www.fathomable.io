import Vue from 'vue'
import Vuex from 'vuex'

import {plugin} from 'vuex-dry'

import md from './docs'

Vue.use(Vuex)

export default function(/* { ssrContext } */) {
	const Store = new Vuex.Store({
		modules: {
			md
		},
		plugins: [plugin]
	})

	return Store
}
