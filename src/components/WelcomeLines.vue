<template>
	<div class="container" :class="{ leaving: leave }" v-if="!left">
		<h3 :class="{ 'slide-in move': show, 'slide-out': leave }">
			<!-- The welcome component has been dedicated to Kylian V. -->
			<!-- For making me feel welcome wherever I went -->
			<span><span>Merry Birthday Kylian!</span></span>
			<span><span></span></span>
			<span><span></span></span>
		</h3>
	</div>
</template>

<script setup lang="ts">
import poof from '@/utils/confetti';
import { d } from '@/utils/delay';
import { onMounted, ref } from 'vue';

const show = ref(false);
const leave = ref(false);
const left = ref(false);

const emits = defineEmits(['played']);

const do_the_thing = async () => {
	poof()
	await d(1000);
	show.value = true;
	await d(3000);
	leave.value = true;
	await d(700);
	emits('played');
	left.value = true;
};

onMounted(() => {
	do_the_thing();
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theming';

$cubic: cubic-bezier(0.19, 1, 0.22, 1);

h3 {
	font-size: 8vh;
	color: $text-normal;
	&.move {
		animation: move 7s linear;
	}
}

@keyframes move {
	0% {
		transform: translateY(3vh);
	}
	100% {
		transform: translateY(-3vh);
	}
}

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	z-index: 100;
	position: fixed;
	width: 100%;

	&.leaving {
		opacity: 0;
		transition: opacity 1s;
	}
}

h3 {
	span {
		display: block;
	}
	> span {
		overflow: hidden;
		// transition-duration: 1s;
		transition-duration: 0.7s;
		transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
		&:nth-child(2) {
			//   transition-delay: .05s;
			transition-delay: 0.1s;
		}
		&:nth-child(3) {
			//   transition-delay: .1s;
			transition-delay: 0.2s;
		}
		> span {
			position: relative;
			transform: translateY(100%);
			transition: inherit;
		}
	}
	&.slide-in {
		> span {
			> span {
				transform: translateY(0);
			}
		}
	}
	&.slide-out {
		> span {
			> span {
				transform: translateY(-100%);
			}
		}
	}
}
</style>
