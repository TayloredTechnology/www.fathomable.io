import VueLink from 'vue-link'
import {sync} from 'vuex-router-sync'

// leave the export, even if you don't use it
export default ({router, store, Vue}) => {
	Vue.prototype.$routersync = sync(store, router)
}
