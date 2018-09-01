<template>
  <q-page padding>

    <vue-link
      :to="`/feed.xml`"
      :external="true">
      Awesome Linky
    </vue-link>

    <div v-html="rawHTML"/>
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
		},
		postLookupPath() {
			const drillDown = ['category']
			let routeAppend = []
			for (const item of drillDown) {
				if (_.has(this.$route.params, item))
					routeAppend.push(_.get(this.$route.params, item))
			}
			return (
				'md/' +
				[this.$route.path.split('/')[1], routeAppend].join('~') +
				'$find'
			)
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
			let retData = this.$store.getters[this.postLookupPath]('slug', post)
			if (!retData)
				retData = this.$store.getters[this.postLookupPath]('slug', 'index')
			return retData
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

		const getPostPath =
			'md/' + [currentRoute.path.split('/')[1], routeAppend].join('~') + '$find'
		let postData = store.getters[getPostPath]('slug', currentRoute.params.post)

		// Check if the '/index' file is available

		if (!postData) {
			postData = store.getters[getPostPath]('slug', 'index')
		}

		//TODO make 404 link
		if (!postData) redirect('/')
	}
}
</script>

<style>
</style>
