<script lang="ts" setup></script>
<template>
  <div class="h-100vh">
    <Header />
    <div class="w-full h-90% rounded-2">
      <div class="h-14 w-100%"></div>
      <div class="flex h-100%">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>
