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
          <!--<vue-link
            :to="`/docs`"/>
          <img src="https://res.cloudinary.com/tayloredtechnology/image/upload/c_scale,q_auto,w_200/v1533550948/fathomable.io/fathomable-portrait.png">
          <vue-link/>
          -->
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
              <q-breadcrumbs
        separator="->"
        active-color="secondary"
        color="light"
      >
        <q-breadcrumbs-el
          label="Home"
          to="/" />
        <q-breadcrumbs-el
          label="Components"
          to="/components" />
        <q-breadcrumbs-el
          label="Breadcrumbs"
          to="/components/breadcrums" />
        <q-breadcrumbs-el
          label="Bogus"
          to="/components/breadcrums/bogus" />
      </q-breadcrumbs>

        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="rightDrawer = !rightDrawer"
        />
      </q-toolbar>
    </q-layout-footer>

    <q-layout-drawer
      v-model="leftDrawer"
      side="left"
      overlay="true"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-layout-drawer>

    <q-layout-drawer
      v-model="rightDrawer"
      :no-hide-on-route-change="rightDrawerHideOnRoute"
      side="right"
      overlay="false"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <p>{{ $route.metadata.breadcrumbs }}</p>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import _ from 'lodash'
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

  /*
  preFetch({store, currentRoute}) {
		const breadcrumbs = currentRoute.path.split('/')
		const walkCrumbs = []
		let trailCrumbs = '/'
		for (const crumb of breadcrumbs) {
			trailCrumbs += crumb
			walkCrumbs.push({label: crumb, to: trailCrumbs})
		}
		_.set(currentRoute, 'metadata.breadcrumbs', walkCrumbs)
  }
  */
}
</script>

<style>
</style>
