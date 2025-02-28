<script setup lang="ts">
const { data, error } = await useFetch('https://api.moyuhuashui.com/baidu/');
console.log(data.value, 'data');
</script>

<template>
  <div class="px-30 mt-5 flex items-center">
    <!-- <div class="text-xl font-bold">热点:</div> -->
    <div class="flex flex-wrap items-center">
      <div
        class="w-1/4 p-2"
        v-for="item in data?.data.slice(0, 4)"
        :key="item.id"
      >
        <div
          class="text-sm overflow-text-ellipsis cursor-pointer whitespace-nowrap text-ellipsis"
        >
          🔥 百度：
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
