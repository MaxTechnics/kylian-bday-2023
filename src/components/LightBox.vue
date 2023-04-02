<template>
    <Transition name="lightboxfade">
        <div v-if="item !== undefined" class="lightbox">
            <div v-if="item !== undefined" class="backdrop" @click="emits('close')"></div>
            <picture v-if="item?.type === 'image'">
                <source :srcset="item.url">
                <source v-if="item.fallback" :srcset="item.fallback">
                <img v-if="item.fallback" :src="item.fallback">
                <img v-else :src="item.url">
            </picture>
            <video v-if="item?.type === 'video'" :src="item.url" controls autoplay />
        </div>
    </Transition>
</template>

<script setup lang="ts">
defineProps<{
    // open: boolean;
    // eslint-disable-next-line no-undef
    item?: FunnyMoment;
}>();

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
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}

picture, video, img {
    max-width: 80vh;
    max-height: 80vh;
    z-index: 200;
    border-radius: 1em;
}

.backdrop {
    position: fixed;
    width: 200%;
    height: 200%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: zoom-out;
}
</style>
