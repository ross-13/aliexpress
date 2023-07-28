import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [] as IProduct[],
    checkout: [] as IProduct[],
  }),
  persist: true,
})
