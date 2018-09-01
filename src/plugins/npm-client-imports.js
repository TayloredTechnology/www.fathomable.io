import VueLink from 'vue-link'

// leave the export, even if you don't use it
export default ({router, store, Vue}) => {
	Vue.component('vue-link', VueLink)
}
