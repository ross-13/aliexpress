<script setup lang='ts'>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const user = useSupabaseUser()

const contactName = ref(null)
const address = ref(null)
const zipCode = ref(null)
const city = ref(null)
const country = ref(null)
const currentAddress = ref<IAddress | null>(null)
const isUpdate = ref(false)
const isWorking = ref(false)
const error = ref<{
  type: 'contactName' | 'address' | 'zipCode' | 'city' | 'country'
  message: string
} | null>(null)

async function submit() {
  isWorking.value = true
  error.value = null

  if (!contactName.value) {
    error.value = {
      type: 'contactName',
      message: 'A contact name is required',
    }
  }
  else if (!address.value) {
    error.value = {
      type: 'address',
      message: 'An address is required',
    }
  }
  else if (!zipCode.value) {
    error.value = {
      type: 'zipCode',
      message: 'A zip code is required',
    }
  }
  else if (!city.value) {
    error.value = {
      type: 'city',
      message: 'A city is required',
    }
  }
  else if (!country.value) {
    error.value = {
      type: 'country',
      message: 'A country is required',
    }
  }

  if (error.value) {
    isWorking.value = false
    return
  }

  if (isUpdate.value) {
    await useFetch(`api/prisma/update-address/${currentAddress.value.data.id}`, {
      method: 'POST',
      body: {
        userId: user.value?.id,
        name: contactName.value,
        address: address.value,
        zipCode: zipCode.value,
        city: city.value,
        country: country.value,
      },
    })

    isWorking.value = false

    return navigateTo('/checkout')
  }

  await useFetch('/api/prisma/add-address', {
    method: 'POST',
    body: {
      userId: user.value?.id,
      name: contactName.value,
      address: address.value,
      zipCode: zipCode.value,
      city: city.value,
      country: country.value,
    },
  })

  isWorking.value = false

  return navigateTo('/checkout')
}

watchEffect(async () => {
  currentAddress.value = await useFetch(`/api/prisma/get-address-by-user/${user.value?.id}`)

  if (currentAddress?.value?.data) {
    contactName.value = currentAddress.value.data.name
    address.value = currentAddress.value.data.address
    zipCode.value = currentAddress.value.data.zipCode
    city.value = currentAddress.value.data.city
    country.value = currentAddress.value.data.country

    isUpdate.value = true
  }

  userStore.isLoading = false
})

definePageMeta({ layout: 'main' })
</script>

<template>
  <div
    id="AddressPage"
    class="mt-4 max-w-[500px] mx-auto px-2"
  >
    <div class="mx-auto bg-white rounded-lg p-3">
      <div class="text-xl text-bold mb-2">
        Address Details
      </div>
      <form @submit.prevent="submit()">
        <TextInput
          v-model:input="contactName"
          class="w-full"
          placeholder="Contact Name"
          input-type="text"
          :error="error && error.type === 'contactName' ? error.message : ''"
        />

        <TextInput
          v-model:input="address"
          class="w-full mt-2"
          placeholder="Address"
          input-type="text"
          :error="error && error.type === 'address' ? error.message : ''"
        />

        <TextInput
          v-model:input="zipCode"
          class="w-full mt-2"
          placeholder="Zip Code"
          input-type="text"
          :error="error && error.type === 'zipCode' ? error.message : ''"
        />

        <TextInput
          v-model:input="city"
          class="w-full mt-2"
          placeholder="City"
          input-type="text"
          :error="error && error.type === 'city' ? error.message : ''"
        />

        <TextInput
          v-model:input="country"
          class="w-full mt-2"
          placeholder="Country"
          input-type="text"
          :error="error && error.type === 'country' ? error.message : ''"
        />

        <button
          :disabled="isWorking"
          type="submit"
          class="mt-6 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
        >
          <div v-if="!isWorking">
            Update Address
          </div>
          <Icon
            v-else
            name="eos-icons:loading"
            size="25"
            class="mr-2"
          />
        </button>
      </form>
    </div>
  </div>
</template>
