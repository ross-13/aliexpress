<script lang="ts" setup>
async function login(prov: 'google' | 'github') {
  // login by provider
}
watchEffect(() => {
  // todo:
})
</script>

<template>
  <div id="AuthPage" class="w-full h-[100vh] bg-white">
    <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
      <NuxtLink to="/" class="min-w-[170px]">
        <img width="170" src="/AliExpress-logo.png">
      </NuxtLink>
    </div>

    <div class="max-w-[400px] mx-auto px-2">
      <div class="text-center my-6">
        Login / Register
      </div>

      <button
        class="flex items-center justify-center gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold"
        @click="login('google')"
      >
        <img class="w-full max-w-[30px]" src="/google-logo.png">
        <div>Google</div>
      </button>

      <button
        class="mt-4 flex items-center justify-center gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold"
        @click="login('github')"
      >
        <img class="w-full max-w-[30px]" src="/github-logo.png">
        <div>Github</div>
      </button>
    </div>
  </div>
</template>
