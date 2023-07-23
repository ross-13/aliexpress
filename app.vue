<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useUserStore } from '~/stores/user'

const breakpoints = useBreakpoints(breakpointsTailwind)

const largerThanSm = breakpoints.greater('sm') // only larger than sm

const userStore = useUserStore()

const route = useRoute()

onMounted(() => {
  userStore.isLoading = true
})

watch(() => largerThanSm.value, () => {
  if (largerThanSm)
    userStore.isMenuOverlay = false
})

watch(() => route.fullPath, () => {
  userStore.isLoading = true
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <MenuOverlay
    :class="[
      { 'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isMenuOverlay },
      { 'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isMenuOverlay },
    ]"
  />
</template>
