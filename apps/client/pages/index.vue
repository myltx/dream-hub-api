<script setup lang="ts">
const colorMode = useColorMode();
setTimeout(() => {
  colorMode.value = 'light';
  console.log(colorMode.value)
}, 1000);
</script>
<template>
  <div>index - index</div>
</template>

<style scoped></style>
