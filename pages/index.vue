<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { data: products, execute } = await useFetch('/api/prisma/get-all-products')

onMounted(async () => {
  userStore.isLoading = true
  execute()
  userStore.isLoading = false
})
definePageMeta({
  layout: 'main',
})
</script>

<template>
  <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      <template v-if="products">
        <div v-for="product in products" :key="product.id">
          <Product :product="product" />
        </div>
      </template>
    </div>
  </div>
</template>
