<template>
  <div class="p-2">
    <HeaderAdmin />
    <div class="flex justify-between items-start h-176">
      <UVerticalNavigation
        :links="links"
        class="w-1/8 shadow min-h-100% overflow-y-auto"
        :class="$colorMode.value === 'dark' ? 'shadow-gray' : 'shadow'"
      />
      <div
        class="w-full p-2 h-100% overflow-y-auto mx-3"
        :class="$colorMode.value === 'dark' ? 'bg-gray-800 shadow-gray' : 'bg-gray-50 shadow'"
      >
        <slot />
      </div>
    </div>
    <FooterAdmin />
  </div>
</template>

<script setup lang="ts">
const links = [
//   {
//     label: 'Profile',
//     avatar: {
//       src: 'https://avatars.githubusercontent.com/u/739984?v=4',
//     },
//     badge: 100,
//   },
  {
    label: '首页',
    icon: 'i-heroicons-home',
    to: '/admin/home',
  },
  {
    label: '站点管理',
    icon: 'i-heroicons-chart-bar',
    to: '/admin/website',
  },
  {
    label: '分类管理',
    icon: 'i-heroicons-chart-bar',
    to: '/admin/categories',
  },
  {
    label: '标签管理',
    icon: 'i-heroicons-chart-bar',
    to: '/admin/tag',
  },
]
</script>

<style scoped>

</style>
