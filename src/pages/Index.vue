<template>
  <q-page class="flex flex-center view-parallax">
    <video
      id="blog-player"
      class="cld-video-player cld-video-player-skin-dark cld-fluid"
      data-cld-autoplay-mode="on-scroll"
      muted />

    <p>
Ut facilisis risus eget ultricies feugiat. Integer mattis velit id tincidunt facilisis. Sed nec tortor ut lectus luctus fermentum. Mauris lacinia vehicula bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In auctor vel mi sed porttitor. Nulla eu lectus ut enim tristique egestas mollis non neque. Morbi sapien lacus, maximus a dapibus ut, ullamcorper quis eros. Cras eleifend porta vestibulum. Duis maximus pretium ante, sit amet efficitur dui tempor sed. Ut sit amet neque aliquet, condimentum urna bibendum, varius justo. Aenean ut nibh vel dui volutpat suscipit. Cras vel hendrerit quam, ut commodo neque. Aliquam scelerisque mattis efficitur. Nullam ultrices eros sit amet imperdiet accumsan. In sit amet sagittis ligula, non commodo ex.
</p>
<p>
Sed ac porttitor ex, quis mattis diam. Curabitur aliquam diam sit amet leo commodo, non vestibulum libero scelerisque. Mauris elit libero, feugiat et venenatis eget, imperdiet quis velit. Curabitur sit amet urna ultricies, tincidunt enim et, posuere lacus. Ut sapien orci, tincidunt non turpis id, hendrerit malesuada dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras vehicula, velit fermentum suscipit porttitor, nisl nisl hendrerit libero, in auctor est sem eget sem. Praesent mollis cursus vehicula. Proin ante felis, auctor sed lacinia ut, pharetra ut risus.
</p>
<p>
Nulla maximus cursus nisl sed lobortis. Mauris eu est interdum, accumsan risus finibus, convallis orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sollicitudin, nisl vitae consectetur pharetra, metus purus faucibus elit, porttitor venenatis augue nulla sit amet orci. Quisque libero nibh, iaculis nec mollis et, scelerisque eget sem. Cras aliquam sapien a metus ultrices mollis. Nulla nec aliquet tellus. Nunc non nibh sit amet augue sollicitudin accumsan. Aliquam eu blandit metus. Vestibulum ligula sapien, consectetur eu dolor id, finibus porta lacus.
    </p>
    <!--
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg">
      -->
  </q-page>
</template>

<style>
</style>

<script>
//import {VueResponsiveImage} from '../components/ResponsiveImage.vue'
//import VueResponsiveImage from 'vue-responsive-image'

export default {
	name: 'PageIndex',
	data() {
		return {}
	},
	computed: {},
	mounted: () => {
		var cld = cloudinary.Cloudinary.new({
			cloud_name: 'tayloredtechnology',
			secure: true
		})
		var playerHls = cld.videoPlayer('blog-player')
		playerHls
			.source('Fathomable_Teaser_kdm0eh', {
				sourceTypes: ['hls'],
				transformation: {streaming_profile: 'hd'},
				info: {title: 'HLS'}
			})
			.play()
	}
}
</script>
