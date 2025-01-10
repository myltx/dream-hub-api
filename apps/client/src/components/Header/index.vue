<script setup lang="ts">
import Github from './components/Github.vue';
import User from './components/User.vue';
</script>

<template>
  <div
    class="flex items-center justify-between static top-0 h-14 shadow dark:shadow-white-500 50 backdrop-blur dark:bg-transparent transition-all py-3 px-4"
  >
    <div class="logo flex items-center">
      <img
        src="~/assets/images/logo.gif"
        class="h-6 w-6 rounded-full mr-2"
        alt=""
      />
      {{ $config.public.projectName }}
    </div>
    <div class="flex items-center">
      <User />
      <ColorMode class="mx-2" />
      <Github />
    </div>
  </div>
</template>

<style scoped></style>
