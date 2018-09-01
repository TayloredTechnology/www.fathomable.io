<template>
  <q-layout view="hHh LpR fFf">

    <q-layout-header v-model="header">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          <vue-link
            :to="`/`"/>
          <img src="https://res.cloudinary.com/tayloredtechnology/image/upload/c_scale,q_auto,w_200/v1533550948/fathomable.io/fathomable-portrait.png">
          <vue-link/>
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="rightDrawer = !rightDrawer"
        />
      </q-toolbar>
      <q-tabs>
        <q-route-tab
          slot="title"
          icon="map"
          to="/your/route"
          replace
          label="One Tab"
        />
        <q-route-tab
          slot="title"
          icon="assignment"
          to="/some/other/route"
          replace
          label="Other Tab"
        />
      </q-tabs>
    </q-layout-header>

    <!--
    <q-layout-footer v-model="footer">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Footer
          <span slot="subtitle">Subtile</span>
        </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="rightDrawer = !rightDrawer"
        />
      </q-toolbar>
    </q-layout-footer>
    -->

    <q-layout-drawer
      v-model="leftDrawer"
      :overlay="true"
      side="left"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-layout-drawer>

    <q-layout-drawer
      v-model="rightDrawer"
      :no-hide-on-route-change="rightDrawerHideOnRoute"
      :overlay="false"
      side="right"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <q-breadcrumbs
        align="center"
        separator="->"
        active-color="secondary"
        color="light"
      >
        <q-breadcrumbs-el
          v-for="(crumb, index) in breadcrumbList"
          :key="index"
          :label="crumb.label"
          :to="crumb.to" />
      </q-breadcrumbs>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import {get} from 'vuex-dry'
//import VueLink from 'vue-link'

export default {
	// name: 'LayoutName',

	data() {
		return {
			footer: true,
			header: true,
			leftDrawer: false,
			rightDrawer: false,
			rightDrawerHideOnRoute: !this.$route.path.includes('docs')
		}
	},

	computed: {
		breadcrumbList: get('breadcrumbs/crumbs')
	},

	preFetch({store, currentRoute}) {}
}
</script>

<style>
</style>
