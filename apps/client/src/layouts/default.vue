<script lang="ts" setup></script>
<template>
  <div class="h-100vh">
    <Header />
    <div class="w-full h-90% rounded-2 flex">
      <slot />
    </div>
    <Footer />
  </div>
</template>
