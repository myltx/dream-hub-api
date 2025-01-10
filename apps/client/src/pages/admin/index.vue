<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});
const router = useRouter();
const toLink = (link: string) => {
  router.push(link);
};
</script>
<template>
  <div class="text-xl font-bold text-center mb-4">
    欢迎来到 {{ $config.public.projectName }} 管理后台
  </div>
  <div class="text-gray-500 text-center">
    您可以在这里配置您自己需要的信息！
  </div>
  <!-- 快捷导航 -->
  <div class="text-xl font-bold mb-4">快捷导航</div>
  <div class="grid grid-cols-2 gap-4">
    <div
      class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      @click="toLink('/admin/website')"
    >
      <div class="text-xl font-bold mb-2">站点管理</div>
      <div class="text-gray-500">配置站点信息，如站点名称、站点描述等</div>
    </div>
    <div
      class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      @click="toLink('/admin/categories')"
    >
      <div class="text-xl font-bold mb-2">分类管理</div>
      <div class="text-gray-500">管理分类信息，如文章分类等</div>
    </div>
    <div
      class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      @click="toLink('/admin/tag')"
    >
      <div class="text-xl font-bold mb-2">标签管理</div>
      <div class="text-gray-500">管理标签信息，如文章标签等</div>
    </div>
  </div>
</template>

<style scoped></style>
