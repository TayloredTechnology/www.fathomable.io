<template>
  <q-page padding>
    <div v-html="rawHTML"></div>
  </q-page>
</template>

<script>
import {get, sync, action} from 'vuex-dry'
const md = require('markdown-it')()
import _ from 'lodash'
import {$get} from 'vuex-dry'
import plur from 'pluralize'

// TODO default /index file loading when no match
export default {
	// name: 'PageName',
	data() {
		return {}
	},

	// Reactive into the template not into data()
	computed: {
		postCache() {
			return this.postData(this.$route.params.post)
		},
		rawHTML() {
			return md.render(this.postCache.content)
		}
	},

	watch: {
		postInfo(newInfo) {
			this.rawHTML = this.renderMD(newInfo.content)
		}
	},

	mounted() {
		this.rawHTML = this.renderMD(this.postInfo)
	},

	methods: {
		postData(post) {
			return this.$store.getters['md/docs~usage$find']('slug', post)
		},
		renderMD(content) {
			return md.render(content)
		}
	},

	// process.env.SERVER && process.env.CLIENT differentiate between the two
	preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
		const drillDown = ['category']
		let routeAppend = []
		for (const item of drillDown) {
			if (_.has(currentRoute.params, item))
				routeAppend.push(_.get(currentRoute.params, item))
		}
		const slugWords = currentRoute.path.split('-')
		let slugPluralTest = _.last(slugWords)
		if (_.last(_.last(slugWords)) === '/')
			slugPluralTest = slugPluralTest.slice(0, -1)
		if (plur.isPlural(slugPluralTest)) {
			const singleEnd = plur.singular(slugPluralTest)
			slugWords.pop()
			slugWords.push(singleEnd)
			redirect(slugWords.join('-'))
		}

		const postData = store.getters[
			'md/' + [currentRoute.path.split('/')[1], routeAppend].join('~') + '$find'
		]('slug', currentRoute.params.post)
		//TODO make 404 link
		if (!postData) redirect('/')
	}
}
</script>

<style>
</style>
