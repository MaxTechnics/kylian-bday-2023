<template>
	<div class="fancy_wrapper">
		<img ref="image_element" class="fancy_image" :class="{ loaded: make_visible && (force_loaded_state_do_not_use_or_i_will_get_mad || loaded), darkened: darken }" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const loaded = ref(false);
const image_element = ref<HTMLImageElement>();

const props = defineProps({
	image_url: {
		type: String,
		required: true
	},
	darken: Boolean,
	make_visible: {
		type: Boolean,
		default: true
	},
	force_loaded_state_do_not_use_or_i_will_get_mad: Boolean
});

const init = () => {
	const source = props.image_url;
	new Promise(function(res, rej) {
		null == source && rej(new Error('No image src passed'));
		// const img = new Image();
		const img = image_element.value;
		img!.src = source;
		img!.onload = function() {
			return res(img);
		};
		img!.onerror = function(e) {
			return rej(e);
		};
	}).then(function() {
		loaded.value = true;
	});
};

watch(() => props.image_url, new_url => {
	console.log('FancyImage: image_url changed, reloading image', new_url);
	loaded.value = false;
	setTimeout(() => {
		init();
	}, 500);
});

onMounted(() => init());

</script>

<style lang="scss" scoped>
@import '@/assets/styles/theming';

.fancy_image {
	position: fixed;
	height: 100%;
	width: 100%;
	object-fit: cover;
	opacity: 0;
	-webkit-transition: opacity 0.2s linear 0.2s, filter 0.2s linear 0.2s;
	transition: opacity 0.2s linear 0.2s, filter 0.2s linear 0.2s;
}

.loaded {
	opacity: 1;
}

.darkened {
	// filter: brightness(80%);
	filter: brightness(60%);
}

.fancy_wrapper {
//   background: -webkit-gradient(linear,right top,left bottom,from(#3d4046),to(#1e1e23));
//   background: linear-gradient(to left bottom,#3d4046,#1e1e23);
  height: 100%;
  position: absolute;
  width: 100%;
}

// @media (min-width:486px) {
//   .fancy_wrapper {
	// background: $dark-background-secondary;
	// overflow-x: hidden;
	// overflow-y: auto;
	// z-index: 1;
//   }
// }

// @media (min-width:1080px) {
//   .fancy_wrapper {
// background: repeat 108% 103% url(@/assets/splashPlaceholderFromOldBuild.png);
//   }
// }
</style>
