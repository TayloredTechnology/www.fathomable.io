//import fs from 'fsextra'
//import markdown from 'markdown-it'
import * as matter from 'gray-matter'
import path from 'upath'
import glob from 'fast-glob'
//import axios from 'axios'
import _ from 'lodash'
//import sections from 'sections'
// TODO Table of Contents & Conversion from Markdown-it to Remark
// Remark has a much better integration approach with VUE / Quasar than Markdown-it would have
// Alternatively should TOC be critical, it can be monkey patched in with 'sections'
//import remark from 'remark'
//import toc from 'mdast-util-toc'

const subPath = process.env.NODE_ENV === 'production' ? 'www/' : 'src/'

/*
 * MarkDown Files Structure
 * statics/markdown is root directory, any file with .md in here will be indexed
 * :area/:category/:post
 * TODO subcategory
 * index.md is used as the root for any page structure
 * posts are stored as arrays
 * store structure compacts the lookup to :area:category to take advantage of the helper array functions with vuex-dry
  */
// leave the export, even if you don't use it
export default ({app, store, router, Vue, ssrContext}) => {
	if (ssrContext) {
		const docs = glob.sync([subPath + 'statics/markdown/**/*.md'])
		const storeUpdater = {}
		for (const doc of docs) {
			const toSort = doc.split('/').slice(3)
			const area = toSort.shift()
			const category = toSort.shift()
			const data = matter.read('./' + doc)
			data.slug = toSort.shift().replace('.md', '')

			/*
			const sectionDataRaw = sections.parse(data.content)
			const toc = []

			let treeOps = []
			let treeLevel = 1
			let parent = 0
			for (const item in sectionDataRaw.sections) {
				if (item.level > treeLevel) {
					treeLevel++
					parent = item.count - 1
				} else {
					if (item.level < treeLevel) {
						treeLevel--
						parent = 'bleh'
					}
				}
				_.pick(item, ['level', 'title', 'count'])
      }
      */
			delete data.orig
			const storeLocation = [area, category].join('~')
			if (_.has(storeUpdater, storeLocation)) {
				const dataState = _.get(storeUpdater, storeLocation)
				dataState.push(data)
				_.set(storeUpdater, storeLocation, dataState)
			} else {
				_.set(storeUpdater, storeLocation, [data])
			}
		}
		for (const location of _.keys(storeUpdater)) {
			console.log('location: ', location)
			store.commit('md/' + location + '$assign', _.get(storeUpdater, location))
		}
	}
}
