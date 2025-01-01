<script setup lang="ts">
import getUserInfo from "~/api/user";
import { getToken } from "~/services/auth";

const colorMode = useColorMode();
setTimeout(() => {
  colorMode.value = "light";
  console.log(colorMode.value);
}, 1000);
getUserInfo().then((res) => {
  console.log(res, "r");
});
getToken();
</script>
<template>
  <div>index - index</div>
</template>

<style scoped></style>
