<template>
  <div>欢迎来到 {{ $config.public.projectName }} 管理后台</div>
  <div>您可以在这里配置您自己需要的信息！</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});
</script>

<style scoped></style>
