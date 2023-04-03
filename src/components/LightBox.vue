<template>
    <Transition name="lightboxfade">
        <div v-if="item !== undefined" class="lightbox">
            <picture v-if="item?.type === 'image'">
                <source :srcset="item.url">
                <source v-if="item.fallback" :srcset="item.fallback">
                <img v-if="item.fallback" :src="item.fallback">
                <img v-else :src="item.url">
            </picture>
            <video v-if="item?.type === 'video'" :src="item.url" controls autoplay />
            <div v-if="item !== undefined" class="backdrop" @click="emits('close')"></div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { onKeyDown } from '@vueuse/core';

defineProps<{
    // open: boolean;
    // eslint-disable-next-line no-undef
    item?: FunnyMoment;
}>();

onKeyDown('Escape', () => emits('close'));

const emits = defineEmits(['close'])
</script>

<style lang="scss" scoped>

.lightboxfade-enter-active,
.basicfade-enter-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.basicfade-leave-active,
.lightboxfade-leave-active {
    transition: all 0.25s cubic-bezier(0.7, 0, 0.84, 0);
}

.lightboxfade-enter-from, .lightboxfade-leave-to {
    opacity: 0;
    scale: 0.8;
}

.basicfade-enter-from, .basicfade-leave-to {
    opacity: 0;
}

.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}

.inner {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95vw;
    height: 95vh;
    // box-sizing: border-box;
    // object-fit: cover;
}

video, img {
    max-width: 95vw;
    max-height: 95vh;
    border-radius: 1em;
    z-index: 200;
    // margin: 2.5vw 2.5vh 2.5vw;
    margin: 2em;
    height: 100vh;
    object-fit: contain;
}

picture {
    z-index: 200;

}

.backdrop {
    position: fixed;
    width: 200%;
    height: 200%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: zoom-out;
}
</style>
