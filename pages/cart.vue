<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const products = [
  { id: 1, title: 'Title 1', description: 'This is description 1', url: 'https://picsum.photos/id/7/800/800', price: 9999 },
  { id: 2, title: 'Title 2', description: 'This is description 2', url: 'https://picsum.photos/id/71/800/800', price: 1234 },
]
const cards = ref([
  'visa.png',
  'mastercard.png',
  'paypal.png',
  'applepay.png',
])
const selectedArray = ref<any>([])
const totalPriceComputed = computed(() => {
  let price = 0
  userStore.cart.forEach((c: any) => {
    price += c.price
  })
  return price / 100
})

function goToCheckout() {
  const ids: any = []
  userStore.checkout = []

  selectedArray.value.forEach((item: any) => ids.push(item.id))

  const res = userStore.cart.filter((item) => {
    return ids.includes(item.id)
  })

  res.forEach(item => userStore.checkout.push(toRaw(item)))

  return navigateTo('/checkout')
}
function selectedRadioFunc(e: any) {
  if (!selectedArray.value.length) {
    selectedArray.value.push()
    return
  }

  selectedArray.value.forEach((item: any, index: any) => {
    if (e.id !== item.id)
      selectedArray.value.push(e)

    else
      selectedArray.value.splice(index, 1)
  })
}
onMounted(() => {
  setTimeout(() => userStore.isLoading = false, 200)
})
definePageMeta({ layout: 'main' })
</script>

<template>
  <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div v-if="false" class="h-[500px] flex items-center justify-center">
      <div class="pt-20">
        <img
          class="mx-auto"
          width="250"
          src="/cart-empty.png"
        >

        <div class="text-xl text-center mt-4">
          No items yet?
        </div>

        <div v-if="true" class="flex text-center">
          <NuxtLink
            to="/auth"
            class="bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
          >
            Sign in
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[65%]">
        <div class="bg-white rounded-lg p-4">
          <div class="text-2xl font-bold mb-2">
            Shopping Cart (0)
          </div>
        </div>

        <div class="bg-[#FEEEEF] rounded-lg p-4 mt-4">
          <div class="text-red-500 font-bold">
            Welcome Deal applicable on 1 item only
          </div>
        </div>

        <div id="Items" class="bg-white rounded-lg p-4 mt-4">
          <div v-for="product in products" :key="product.id">
            <CartItem
              :product="product"
              :selected-array="selectedArray"
              @selectedRadio="selectedRadioFunc"
            />
          </div>
        </div>
      </div>

      <div class="md:hidden block my-4" />
      <div class="md:w-[35%]">
        <div id="Summary" class="bg-white rounded-lg p-4">
          <div class="text-2xl font-extrabold mb-2">
            Summary
          </div>
          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">
              Total
            </div>
            <div class="text-2xl font-semibold">
              $ <span class="font-extrabold">{{ totalPriceComputed }}</span>
            </div>
          </div>
          <button
            class="flex items-center justify-center bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
            @click="goToCheckout"
          >
            Checkout
          </button>
        </div>

        <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
          <div class="text-lg font-semibold mb-2">
            Payment methods
          </div>
          <div class="flex items-center justify-start gap-8 my-4">
            <div v-for="(card, index) in cards" :key="index">
              <img class="h-6" :src="card">
            </div>
          </div>

          <div class="border-b" />

          <div class="text-lg font-semibold mb-2 mt-2">
            Buyer Protection
          </div>
          <p class="my-2">
            Get full refund if the item is not as described or if is not delivered
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
