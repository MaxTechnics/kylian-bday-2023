<template>
  <FancyImage :image_url="bg" darken :make_visible="welcomelines_played" />
  <WelcomeLines @played="handle_welc_played" />

  <CoolMultiViewer :show_alternate="switchd">
    <template #slotA>
      <!-- <FancyImage :image_url="test" /> -->
      <TimelineThing />
    </template>

    <template #slotB>
      <TerminalThing @next="switchd = false" ref="terminal" class="animate_in" :class="{ active: welcomelines_played }" />
    </template>
  </CoolMultiViewer>
</template>

<script setup lang="ts">
import bg from '@/assets/bg2.png';
import FancyImage from './components/FancyImage.vue';
import { ref } from 'vue';
import TerminalThing from './components/TerminalThing.vue';
import WelcomeLines from './components/WelcomeLines.vue';
import funk from '@/assets/crumbs.png';
import CoolMultiViewer from './components/CoolMultiViewer.vue';
import TimelineThing from './components/TimelineThing.vue';

const terminal = ref();
const welcomelines_played = ref(false);

const handle_welc_played = () => {
  welcomelines_played.value = true;
  terminal.value.start_typing();
};

const switchd = ref(true);

</script>

<style scoped lang="scss">
.animate_in {
	scale: 0.85;
	opacity: 0;
	transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
	&.active {
		scale: 1;
		opacity: 1;
	}
}

</style>
