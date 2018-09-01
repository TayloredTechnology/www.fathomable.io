import {Module} from 'vuex-dry'

export default Module.build({
	state() {
		return {
			crumbs: []
		}
	}
})
