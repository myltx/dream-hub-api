<script setup lang="ts">
import Github from './components/Github.vue';
import User from './components/User.vue';
import Search from './components/Search.vue';
import NavLink from './components/Link.vue';
import Rank from './components/Rank.vue';
</script>

<template>
  <div
    class="flex items-center justify-between static top-0 h-14 shadow dark:shadow-white-500 50 backdrop-blur dark:bg-transparent transition-all py-3 px-4"
  >
    <div class="flex items-center">
      <img
        src="~/assets/images/logo.gif"
        class="h-6 w-6 rounded-full mr-2"
        alt=""
      />
      {{ $config.public.projectName }}
    </div>
    <div class="flex items-center">
      <Rank />
      <Search />
      <ColorMode />
      <Github />
      <User class="ml-2" />
      <!-- <Icon name="dashicons:admin-users" /> -->
    </div>
  </div>
</template>

<style scoped></style>
