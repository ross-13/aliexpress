<script setup lang="ts">
const products = [
  { id: 1, title: 'Title 1', description: 'This is description 1', url: 'https://picsum.photos/id/7/800/800', price: 9999 },
  { id: 2, title: 'Title 2', description: 'This is description 2', url: 'https://picsum.photos/id/71/800/800', price: 1234 },
  { id: 3, title: 'Title 3', description: 'This is description 3', url: 'https://picsum.photos/id/72/800/800', price: 99 },
  { id: 4, title: 'Title 4', description: 'This is description 4', url: 'https://picsum.photos/id/73/800/800', price: 100 },
  { id: 5, title: 'Title 5', description: 'This is description 5', url: 'https://picsum.photos/id/74/800/800', price: 9999 },
  { id: 6, title: 'Title 6', description: 'This is description 6', url: 'https://picsum.photos/id/75/800/800', price: 1233 },
  { id: 7, title: 'Title 7', description: 'This is description 7', url: 'https://picsum.photos/id/76/800/800', price: 1111 },
  { id: 8, title: 'Title 8', description: 'This is description 8', url: 'https://picsum.photos/id/77/800/800', price: 3333 },
  { id: 9, title: 'Title 9', description: 'This is description 9', url: 'https://picsum.photos/id/78/800/800', price: 9 },
  { id: 10, title: 'Title 10', description: 'This is description 10', url: 'https://picsum.photos/id/79/800/800', price: 99 },
  { id: 11, title: 'Title 11', description: 'This is description 11', url: 'https://picsum.photos/id/80/800/800', price: 12 },
  { id: 12, title: 'Title 12', description: 'This is description 12', url: 'https://picsum.photos/id/81/800/800', price: 4 },
]

definePageMeta({
  layout: 'main',
})
</script>

<template>
  <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      <template v-if="products">
        <div v-for="product in products" :key="product">
          <Product :product="product" />
        </div>
      </template>
    </div>
  </div>
</template>
