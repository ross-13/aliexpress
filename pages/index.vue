<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const products = ref<any>(null)

onBeforeMount(async () => {
  userStore.isLoading = true
  products.value = await useFetch('/api/prisma/get-all-products')
  userStore.isLoading = false
})
definePageMeta({
  layout: 'main',
})
</script>

<template>
  <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      <template v-if="products && products.data">
        <div v-for="product in products.data" :key="product.id">
          <Product :product="product" />
        </div>
      </template>
    </div>
  </div>
</template>
