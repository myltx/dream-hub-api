<script setup lang="ts">
import { getToken } from '~/server/auth';

const colorMode = useColorMode();
setTimeout(() => {
  colorMode.value = 'light';
  console.log(colorMode.value)
}, 1000);
getToken()
</script>
<template>
  <div>index - index</div>
</template>

<style scoped></style>
