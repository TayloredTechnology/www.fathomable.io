import {Module} from 'vuex-dry'
import {Loading} from 'quasar'

export default Module.build({
	config: {
		nonStrictObject: ['docs~usage', 'docs~configuration']
	},
	state() {
		return {
			'docs~usage': [],
			'docs~configuration': []
		}
	},
	actions: {
		async increment({commit, state}, value) {
			Loading.show()
			async function wait(ms) {
				return new Promise(resolve => {
					setTimeout(resolve, ms)
				})
			}

			await wait(3000)
			//await Promise.all(p)
			Loading.hide()
			return commit('count$assign', (state.count += value ? value : 1))
		},
		async decrement({commit}, value) {
			commit('decrement', value ? value : 1)
		}
	}
})
