//import fs from 'fsextra'
//import markdown from 'markdown-it'
const matter = require('gray-matter')
const path = require('upath')
const glob = require('fast-glob')
//import axios from 'axios'
const _ = require('lodash')

const ssrContext = true
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
if (ssrContext) {
	const subPath = process.env.NODE_ENV === 'production' ? 'www/' : 'src/'
	const docs = glob.sync([subPath + 'statics/markdown/**/*.md'])
	const storeUpdater = {}
	for (const doc of docs) {
		const toSort = doc.split('/').slice(3)
		const area = toSort.shift()
		const category = toSort.shift()
		const data = matter.read('./' + doc)
		data.slug = toSort.shift().replace('.md', '')
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
	for (const area of _.keys(storeUpdater)) {
		console.log('area: ', area)
	}
}
