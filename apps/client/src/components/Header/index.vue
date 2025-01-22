<script setup lang="ts"></script>

<template>
  <div
    class="flex items-center justify-between static top-0 h-14 shadow dark:shadow-white-500 50 backdrop-blur dark:bg-transparent transition-all py-3 px-4"
  >
    <div class="flex items-center">
      <HeaderComponentsLogo />
      {{ $config.public.projectName }}
    </div>
    <div class="flex items-center">
      <LazyHeaderComponentsInCommonUse />
      <HeaderComponentsRanking />
      <HeaderComponentsSearch />
      <ColorMode />
      <HeaderComponentsGithub />
      <HeaderComponentsUser class="ml-2" />
      <!-- <Icon name="dashicons:admin-users" /> -->
    </div>
  </div>
</template>

<style scoped></style>
