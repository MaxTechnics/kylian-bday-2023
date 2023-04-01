<template>
    <Transition name="slotA">
        <div v-show="!show_alternate" class="multiviewer_container">
            <slot name="slotA"></slot>
        </div>
    </Transition>

    <Transition name="slotB">
        <div v-show="show_alternate" class="multiviewer_container">
            <slot name="slotB"></slot>
        </div>
    </Transition>
</template>

<script setup lang="ts">
defineProps<{
    show_alternate?: boolean;
}>();
</script>

<style lang="scss" scoped>
.multiviewer_container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.slotA-enter-active,
.slotA-leave-active {
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slotB-enter-active,
.slotB-leave-active {
    // position: ;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 10;
}
.slotA-enter-from, .slotA-leave-to {
    opacity: 0 !important;
    scale: 0.8 !important;
}
.slotB-enter-from, .slotB-leave-to {
    opacity: 0;
    scale: 1.25;
}
</style>
