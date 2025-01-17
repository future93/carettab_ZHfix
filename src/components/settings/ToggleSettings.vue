<script setup>
import { computed, watch, ref } from 'vue'
import { useSettingsStore } from '@/store.js'
import { storeToRefs } from 'pinia'

const store = useSettingsStore()
const { status, settingsOpen } = storeToRefs(store)
const toggleSettingsEl = ref(null)

const toggleSettings = () => {
  store.$patch({ settingsOpen: !store.settingsOpen })
}

watch(
  () => store.settingsOpen,
  () => {
    if (!store.settingsOpen) toggleSettingsEl.value.focus()
  }
)

const getShadow = computed(() => {
  if (store.config.global.font.shadow && store.config.global.font.shadow[0]) {
    return `${store.config.global.font.shadow[1]}px ${store.config.global.font.shadow[2]}px ${store.config.global.font.shadow[3]}px 0px hsl(${store.config.global.font.shadow[4]}deg ${store.config.global.font.shadow[5]}% ${store.config.global.font.shadow[6]}% / ${store.config.global.font.shadow[7]})`
  }
  return 'none'
})

const getTextColor = computed(() => {
  if (store.config.global.font.color && store.config.global.font.color[0]) {
    return `hsl(${store.config.global.font.color[0]}deg ${store.config.global.font.color[1]}% ${store.config.global.font.color[2]}% / ${store.config.global.font.color[3]})`
  }
  return 'white'
})
</script>

<template>
  <button
    ref="toggleSettingsEl"
    :class="{ settingsToggle: true, open: settingsOpen, hide: store.config.global.hideSettings }"
    :title="
      settingsOpen ? $t('common.closeAndSaveSettings') : status === 'updated' ? $t('common.updated') : $t('common.open')
    "
    @click="toggleSettings"
  >
    <span></span><span></span><span></span>
    <div v-if="status === 'updated'" class="updateNotice"></div>
  </button>
  <div v-if="status === 'highlightSettings'" class="highlightSettings"></div>
</template>

<style lang="scss" scoped>
$optionsToggleLine: 2px;
$optionsToggleSize: 20px;
$optionsToggleSpacing: 3px;
$optionsTogglePadding: 30px;
$optionsToggleHeight: ($optionsToggleSize + ($optionsTogglePadding * 2));
$optionsToggleUpdateNoticeSize: 24px;
$optionsToggleUpdateNoticeOffset: 16px;

.settingsToggle {
  position: fixed;
  z-index: 50;
  bottom: 0;
  right: 0;
  background: transparent;
  border: 0;
  padding: 0;
  width: $optionsToggleHeight;
  height: $optionsToggleHeight;
  color: v-bind(getTextColor);
  cursor: pointer;
  overflow: hidden;

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 3px currentColor;
  }

  span {
    opacity: 0.5;
    display: block;
    position: absolute;
    height: 2px;
    width: $optionsToggleSize;
    background: currentColor;
    border-radius: 2px;
    right: $optionsTogglePadding;
    transition: opacity 0.5s;
    box-shadow: v-bind(getShadow);

    &:nth-of-type(1) {
      bottom: ($optionsToggleSpacing + $optionsTogglePadding);
    }

    &:nth-of-type(2) {
      bottom: calc(calc(calc(#{$optionsToggleSize} - #{$optionsToggleLine}) / 2) + #{$optionsTogglePadding});
    }

    &:nth-of-type(3) {
      bottom: ($optionsToggleSize - $optionsToggleLine - $optionsToggleSpacing + $optionsTogglePadding);
    }
  }

  &:hover,
  &:focus-visible {
    span {
      opacity: 1;
    }
  }

  &.open {
    width: 100vw;
    height: 100vh;

    span {
      // opacity: 0;
    }
  }

  &.hide:not(.open) {
    span {
      opacity: 0;
    }

    &:focus-visible,
    &:hover {
      span {
        opacity: 1;
      }
    }
  }

  .updateNotice {
    position: absolute;
    bottom: 13px;
    right: 15px;
    display: grid;
    place-items: center;
    border: 2px solid currentColor;
    color: currentColor;
    padding: 1px 3px;
    border-radius: 6px;

    &::before {
      content: 'NEW';
      font-family: 'Source Sans 3', sans-serif;
      font-size: 8px;
    }
  }

  &.open .quietUpdateNotice {
    opacity: 0;
  }
}

.highlightSettings {
  position: fixed;
  z-index: 30;
  bottom: 0;
  right: 0;
  width: $optionsToggleHeight;
  height: $optionsToggleHeight;
  cursor: pointer;
  overflow: hidden;
  background-color: hsl(0deg 0% 0% / 0.7);
  border: 3px solid hsl(0deg 0% 100% / 0.7);
  border-radius: 50%;
  animation: pulse 1s ease-in-out 10 forwards;
  animation-direction: alternate;
  pointer-events: none;
}

@keyframes pulse {
  0% {
    opacity: 0;
    scale: 1;
  }

  100% {
    opacity: 1;
    scale: 3;
  }
}
</style>
