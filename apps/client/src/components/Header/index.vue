<script setup lang="ts"></script>

<template>
  <div
    class="flex items-center justify-between static top-0 h-14 shadow dark:shadow-otherBgColor 50 backdrop-blur dark:bg-bgColor transition-all py-3 px-4"
  >
    <div class="flex items-center">
      <HeaderComponentsLogo />
      {{ $config.public.projectName }}
    </div>
    <div class="flex items-center">
      <HeaderComponentsAi />
      <!-- <LazyHeaderComponentsInCommonUse /> -->
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
